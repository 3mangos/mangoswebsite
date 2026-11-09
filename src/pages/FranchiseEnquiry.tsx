import { useState, type FormEvent, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Check, ChevronDown, MessageCircle } from 'lucide-react';
import { ASSETS } from '../data/assets';
import storefrontHero from '../assets/franchise/mangos-storefront-hero.jpg';
import { createEnquiryUrl, FRANCHISE_DESCRIPTION, FRANCHISE_TITLE, FRANCHISE_URL, SITE_URL } from '../data/franchise';
import './FranchiseEnquiry.css';

const states = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

function Field({ name, label, children, optional = false }: { name: string; label: string; children: ReactNode; optional?: boolean }) {
  return <div className="fe-field"><label htmlFor={`fe-${name}`}>{label} <span>{optional ? '(optional)' : '*'}</span></label>{children}</div>;
}

function SelectField({ name, label, options }: { name: string; label: string; options: string[] }) {
  return <Field name={name} label={label}><div className="fe-select"><select id={`fe-${name}`} name={name} defaultValue="" required><option value="" disabled>Select an option</option>{options.map(option => <option key={option}>{option}</option>)}</select><ChevronDown size={16} aria-hidden="true" /></div></Field>;
}

function EnquiryForm() {
  const [whatsappUrl, setWhatsappUrl] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values: Record<string, string> = {};
    new FormData(event.currentTarget).forEach((value, key) => { values[key] = String(value); });
    const url = createEnquiryUrl(values);
    setWhatsappUrl(url);
    // Open synchronously from the submit gesture so mobile browsers allow the handoff.
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return <form className="fe-form" onSubmit={submit} onChange={() => setWhatsappUrl('')} aria-label="Mango’s franchise enquiry">
    <div className="fe-form-heading"><span className="fe-form-icon" aria-hidden="true"><MessageCircle size={24} strokeWidth={1.5} /></span><div><span className="fe-form-eyebrow">Franchise enquiry</span><h2 id="fe-form-title">Tell us about your plans</h2><p>Complete the details below to connect with our franchise team.</p></div><span className="fe-required-note">* Required fields</span></div>
    <fieldset><legend><span>01</span> Your details</legend><div className="fe-fields">
      <Field name="name" label="Full name"><input id="fe-name" name="name" autoComplete="name" placeholder="Your full name" required maxLength={80} pattern=".*\S.*" /></Field>
      <Field name="phone" label="Mobile number"><input id="fe-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="e.g. 98765 43210" required maxLength={18} pattern="(?:\+91[\s\-]?)?[6-9](?:[\s\-]?[0-9]){9}" title="Enter a valid 10-digit Indian mobile number, optionally starting with +91." /></Field>
      <Field name="email" label="Email address"><input id="fe-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={120} /></Field>
    </div></fieldset>
    <fieldset><legend><span>02</span> Preferred location</legend><div className="fe-fields">
      <SelectField name="state" label="State / union territory" options={states} />
      <Field name="city" label="City"><input id="fe-city" name="city" autoComplete="address-level2" placeholder="e.g. Bengaluru" required maxLength={80} pattern=".*\S.*" /></Field>
      <Field name="area" label="Preferred area / locality"><input id="fe-area" name="area" placeholder="e.g. Kalyan Nagar" required maxLength={120} pattern=".*\S.*" /></Field>
      <Field name="pincode" label="PIN code"><input id="fe-pincode" name="pincode" autoComplete="postal-code" inputMode="numeric" placeholder="6-digit PIN code" required pattern="[1-9][0-9]{5}" maxLength={6} title="Enter a valid 6-digit Indian PIN code." /></Field>
    </div></fieldset>
    <fieldset><legend><span>03</span> Business plans</legend><div className="fe-fields">
      <SelectField name="stores" label="Number of stores" options={['1 store', '2–3 stores', '4 or more stores', 'Let’s discuss']} />
      <SelectField name="investment" label="Available investment budget" options={['Under ₹10 lakh', '₹10–20 lakh', '₹20–30 lakh', '₹30–50 lakh', '₹50 lakh or more', 'Would like guidance']} />
      <SelectField name="experience" label="Experience in food & beverages" options={['No prior experience', 'Less than 1 year', '1–3 years', 'More than 3 years']} />
      <SelectField name="franchiseExperience" label="Previously owned / run a franchise?" options={['Yes', 'No']} />
      <SelectField name="property" label="Do you have a property?" options={['Yes, I own a property', 'Yes, I have a rental option', 'Still looking']} />
      <SelectField name="timeline" label="When would you like to open?" options={['Within 3 months', '3–6 months', '6–12 months', 'Just exploring for now']} />
    </div><p className="fe-field-note">Budget ranges help us understand your plans. They are not franchise pricing.</p></fieldset>
    <Field name="message" label="Questions / additional details" optional><textarea id="fe-message" name="message" rows={4} maxLength={1000} placeholder="Share any questions or details about your plans…" /></Field>
    <label className="fe-consent"><input name="consent" type="checkbox" required /><span>I agree to share these details with Mango’s via WhatsApp and be contacted about my franchise enquiry. *</span></label>
    <div className="fe-form-actions"><button type="submit" className="fe-button fe-submit"><MessageCircle size={20} aria-hidden="true" /> Continue to WhatsApp <ArrowUpRight size={20} aria-hidden="true" /></button>
    <p className="fe-handoff-note">Your enquiry opens in WhatsApp.<br />Tap <strong>Send</strong> to share it with +91 99450 41870.</p></div>
    {whatsappUrl && <div className="fe-form-status" role="status"><Check size={19} aria-hidden="true" /><div><strong>Your message is ready.</strong><p>Finish sending it in WhatsApp. If it didn’t open, <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">open your prepared enquiry here <ArrowUpRight size={13} /></a>.</p></div></div>}
  </form>;
}

export default function FranchiseEnquiry() {
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': FRANCHISE_URL, url: FRANCHISE_URL, name: FRANCHISE_TITLE, description: FRANCHISE_DESCRIPTION, inLanguage: 'en-IN', about: { '@type': 'Organization', name: "Mango's Creamery", url: SITE_URL, contactPoint: { '@type': 'ContactPoint', telephone: '+91-9945041870', contactType: 'Franchise enquiries' } } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Franchise enquiry', item: FRANCHISE_URL }] },
    ],
  };
  return <main className="franchise-page" id="top">
    <Helmet><title>{FRANCHISE_TITLE}</title><meta name="description" content={FRANCHISE_DESCRIPTION} /><meta name="robots" content="index,follow" /><link rel="canonical" href={FRANCHISE_URL} /><meta property="og:title" content={FRANCHISE_TITLE} /><meta property="og:description" content={FRANCHISE_DESCRIPTION} /><meta property="og:url" content={FRANCHISE_URL} /><meta property="og:type" content="website" /><meta property="og:site_name" content="Mango’s Creamery" /><meta property="og:locale" content="en_IN" /><meta property="og:image" content={`${SITE_URL}${ASSETS.franchise.campaignOne}`} /><meta property="og:image:alt" content="Mango’s Creamery franchise opportunity" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={FRANCHISE_TITLE} /><meta name="twitter:description" content={FRANCHISE_DESCRIPTION} /><meta name="twitter:image" content={`${SITE_URL}${ASSETS.franchise.campaignOne}`} /><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
    <section className="fe-overview" aria-labelledby="fe-title">
      <div className="fe-overview-storefront" aria-hidden="true"><img src={storefrontHero} alt="" width="1536" height="1024" /></div>
      <div className="fe-overview-inner">
        <div className="fe-overview-copy">
          <nav className="fe-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Franchise enquiry</span></nav>
          <p className="fe-kicker">Partner with Mango’s</p>
          <h1 id="fe-title">Looking for a<br />franchise opportunity?</h1>
          <p className="fe-overview-description">Become a Mango’s franchise partner.</p>
          <p className="fe-overview-detail">We welcome enquiries from entrepreneurs interested in bringing Mango’s ice creams, waffles and shakes to their city. Tell us about your preferred location, investment plans and business experience. Our team will connect with you to discuss the opportunity and next steps.</p>
          <a className="fe-button fe-hero-cta" href="#enquire">Enquire about a franchise <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
    <section className="fe-enquiry-section" id="enquire" aria-labelledby="fe-form-title"><EnquiryForm /></section>
    <footer className="fe-footer"><p>© {new Date().getFullYear()} Mango’s Creamery</p><a href="tel:+919945041870">+91 99450 41870</a></footer>
  </main>;
}
