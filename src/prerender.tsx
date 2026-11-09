import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import FranchiseEnquiry from './pages/FranchiseEnquiry';

export { createEnquiryUrl, enquiryFields } from './data/franchise';

// Generate crawlable content and social metadata without requiring a browser.
export function render() {
  const context = {};
  const html = renderToString(<HelmetProvider context={context}><Layout><FranchiseEnquiry /></Layout></HelmetProvider>);
  const { helmet } = context as { helmet: { title: { toString(): string }; meta: { toString(): string }; link: { toString(): string }; script: { toString(): string } } };
  return { html, head: [helmet.title, helmet.meta, helmet.link, helmet.script].map(tag => tag.toString()).join('\n') };
}
