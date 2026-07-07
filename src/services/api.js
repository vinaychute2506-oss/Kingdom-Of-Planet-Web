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
export const submitForm = async (formData) => {
  if (!CMS_API_URL) {
    throw new Error('CMS API URL is not configured in environment variables.');
  }

  try {
    // Google Apps Script always issues a 302 redirect on POST requests.
    // Using mode:'no-cors' with Content-Type:'text/plain' makes it a "simple request"
    // that avoids CORS preflight and follows the redirect transparently.
    // The response will be opaque (type: 'opaque', status: 0), but the data
    // still reaches doPost() on the server side.
    const response = await fetch(CMS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(formData),
      redirect: 'follow'
    });

    // With no-cors, a successful request returns an opaque response (type 'opaque', status 0).
    // A true network failure would throw before reaching here.
    // So if we get here, the request was delivered.
    if (response.type === 'opaque' || response.status === 0 || response.ok) {
      return { status: 'success', message: 'Enquiry submitted successfully!' };
    }

    throw new Error(`Unexpected response: ${response.status}`);
  } catch (error) {
    console.error('submitForm failure:', error);
    throw error;
  }
};
