/* Outbound links. Booking and email match the main site
   (website/src/lib/booking.ts, website/src/lib/contact.ts). */
export const MAIN_SITE_URL = 'https://devotrex.com';
export const BOOKING_URL = 'https://calendly.com/ahsham-devotrex';
export const CONTACT_EMAIL = 'info@devotrex.com';

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  'Devotrex Labs: project enquiry',
)}`;
