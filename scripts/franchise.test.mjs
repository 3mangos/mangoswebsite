import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { createEnquiryUrl, enquiryFields } from '../dist-ssr/prerender.js';

test('WhatsApp enquiry includes every field and safely encodes visitor text', () => {
  const values = Object.fromEntries(enquiryFields.map(([key]) => [key, `${key}: ₹20 lakh & more + details\nSecond line`]));
  values.name = '  Asha & Ravi  ';
  const url = new URL(createEnquiryUrl(values));
  assert.equal(url.origin + url.pathname, 'https://wa.me/919945041870');
  assert.equal([...url.searchParams.keys()].length, 1);
  const message = url.searchParams.get('text');
  for (const [key, label] of enquiryFields) assert.ok(message.includes(`${label}: ${values[key].trim()}`));
  assert.ok(message.includes('I agree to be contacted'));
});

test('optional empty fields remain explicit in the enquiry', () => {
  assert.ok(new URL(createEnquiryUrl({})).searchParams.get('text').includes('Questions / additional details: Not provided'));
});

test('built franchise page has crawlable content, canonical metadata and working assets', async () => {
  const html = await readFile(new URL('../dist/franchise-enquiry/index.html', import.meta.url), 'utf8');
  assert.match(html, /<h1[^>]*>Looking for a<br\s*\/?>franchise opportunity\?/);
  assert.match(html, /https:\/\/www\.mangoscreamery\.com\/franchise-enquiry/);
  assert.equal((html.match(/<title\b/g) || []).length, 1);
  assert.equal((html.match(/name="description"/g) || []).length, 1);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /name="consent"[^>]*required/);
  for (const [key] of enquiryFields) assert.ok(html.includes(`name="${key}"`));
  const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map(match => match[1]);
  assert.ok(assets.length >= 3);
  for (const asset of assets) await readFile(new URL(`../dist${asset}`, import.meta.url));
  assert.ok(!html.includes('https://www.mangoscreamery.com/src/'));
});
