/**
 * Spam honeypot (P7.3): a field real users never see. The form pretends to succeed when it is
 * filled, and the form-submissions hook rejects submissions that include it.
 */
export const HONEYPOT_FIELD = 'company_website'
