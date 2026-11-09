export const SITE_URL = 'https://www.mangoscreamery.com';
export const FRANCHISE_URL = `${SITE_URL}/franchise-enquiry`;
export const FRANCHISE_TITLE = "Mangos Franchise Enquiry | Partner with Mango's Creamery";
export const FRANCHISE_DESCRIPTION = "Explore a Mango's Creamery franchise. Share your preferred location, investment budget and business plans to connect with our ice cream, waffle and shake franchise team.";
export const WHATSAPP_NUMBER = '919945041870';

export const enquiryFields = [
  ['name', 'Full name'], ['phone', 'Mobile number'], ['email', 'Email address'],
  ['state', 'State / union territory'], ['city', 'City'], ['area', 'Preferred area / locality'],
  ['pincode', 'PIN code'], ['stores', 'Number of stores'], ['investment', 'Investment budget'],
  ['experience', 'Food & beverage experience'], ['franchiseExperience', 'Previous franchise experience'],
  ['property', 'Property availability'], ['timeline', 'Planned opening'], ['message', 'Questions / additional details'],
] as const;

export function createEnquiryUrl(values: Record<string, string>) {
  const lines = enquiryFields.map(([key, label]) => `${label}: ${values[key]?.trim() || 'Not provided'}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent([
    "Hello Mango's! I'd like to enquire about a franchise.", '', ...lines, '',
    'I agree to be contacted by the Mango’s team about this franchise enquiry.',
  ].join('\n'))}`;
}
