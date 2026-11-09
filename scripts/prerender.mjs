import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { render } from '../dist-ssr/prerender.js';

const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const { html, head } = render();
// Remove the home page's default metadata before inserting the franchise metadata.
const assets = await readdir(new URL('../dist/assets/', import.meta.url));
const document = template
  .replace(/<title>[\s\S]*?<\/title>/g, '')
  .replace(/<meta\b[^>]*(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g, '')
  .replace('</head>', `${head}\n</head>`)
  .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  .replace(/\/assets\/([\w.-]+)/g, (url, name) => {
    if (assets.includes(name)) return url;
    // Vite deduplicates identical images under a shared client filename. The
    // content hash is stable between builds even when the chosen name differs.
    const suffix = name.match(/(-[\w-]{8}\.[a-z0-9]+)$/)?.[1];
    const clientAsset = suffix && assets.find(asset => asset.endsWith(suffix));
    if (!clientAsset) throw new Error(`Missing pre-rendered asset: ${name}`);
    return `/assets/${clientAsset}`;
  });
await mkdir(new URL('../dist/franchise-enquiry/', import.meta.url), { recursive: true });
await writeFile(new URL('../dist/franchise-enquiry/index.html', import.meta.url), document);
console.log('Pre-rendered /franchise-enquiry with page content and search metadata.');
