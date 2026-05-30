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
    // We send payload as a "text/plain" simple request.
    // This avoids CORS preflight checks completely and works flawless with Apps Script doPost.
    const response = await fetch(CMS_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return json;
    } catch (parseErr) {
      // If Apps Script returns raw text on no-cors or redirect issues
      if (text.includes('success') || response.status === 200) {
        return { status: 'success', message: 'Recorded successfully.' };
      }
      throw new Error('Invalid JSON response from server.');
    }
  } catch (error) {
    console.error('submitForm failure:', error);
    throw error;
  }
};
