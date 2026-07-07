import { CMS_API_URL } from '../config/cms';

/**
 * Service Layer to communicate with the Google Apps Script Web App
 */

/**
 * Fetch all CMS content from Google Sheets in a single request
 * @returns {Promise<Object>} - Resolved sheet database
 */
export const fetchCMSData = async () => {
  if (!CMS_API_URL) {
    throw new Error('CMS API URL is not configured in environment variables.');
  }

  try {
    const response = await fetch(CMS_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    if (json.status !== 'success' || !json.data) {
      throw new Error(json.message || 'Malformed CMS response from Apps Script.');
    }

    return json.data;
  } catch (error) {
    console.error('fetchCMSData failure:', error);
    throw error;
  }
};

/**
 * Submits contact or admissions form details to the Google Sheet log
 * @param {Object} formData - Full form data including formType ('admission' | 'contact')
 * @returns {Promise<Object>} - Status result
 */
export const submitForm = (formData) => {
  if (!CMS_API_URL) {
    return Promise.reject(new Error('CMS API URL is not configured in environment variables.'));
  }

  console.log('[submitForm] Posting to:', CMS_API_URL);
  console.log('[submitForm] Payload:', formData);

  return new Promise((resolve, reject) => {
    try {
      // Use a hidden iframe + native HTML form to completely bypass CORS.
      // Google Apps Script's 302 redirect is handled natively by the browser,
      // and the form data arrives in e.parameter on the server side.
      const iframeName = 'kol_form_frame_' + Date.now();
      const iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = CMS_API_URL;
      form.target = iframeName;

      // Add each field as a hidden input
      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // The form submission fires and forgets — we can't read the iframe response
      // due to cross-origin restrictions, but the data reaches the server.
      // Clean up after a short delay and resolve as success.
      setTimeout(() => {
        try {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
        } catch (cleanupErr) {
          // ignore cleanup errors
        }
        console.log('[submitForm] Form submitted via hidden iframe — success assumed');
        resolve({ status: 'success', message: 'Enquiry submitted successfully!' });
      }, 3000);

    } catch (error) {
      console.error('submitForm failure:', error);
      reject(error);
    }
  });
};
