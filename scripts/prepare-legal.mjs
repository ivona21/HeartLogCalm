import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const selector = JSON.parse(fs.readFileSync(path.join(root, 'legal-release.json'), 'utf8'));
const legalRoot = path.join(root, 'shared', 'heartlog-legal');
const mode = process.env.LEGAL_RELEASE_MODE || 'development';

const selectedManifest = path.join(legalRoot, selector.manifest);
if (!fs.existsSync(selectedManifest)) {
  execFileSync('git', ['submodule', 'update', '--init', '--recursive', 'shared/heartlog-legal'], {
    cwd: root,
    stdio: 'inherit',
  });
}

const manifestPath = path.join(legalRoot, selector.manifest);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (!['development', 'production'].includes(mode)) throw new Error(`Unknown LEGAL_RELEASE_MODE: ${mode}`);
if (mode === 'production' && manifest.status !== 'published') {
  throw new Error(`Production builds require a published legal release; found ${manifest.status}`);
}

const items = {
  terms: manifest.documents?.terms,
  privacy: manifest.documents?.privacy,
  savedEntriesConsent: manifest.consents?.savedEntries,
};
if (Object.values(items).some((item) => !item)) throw new Error('Selected legal manifest is missing required items');

const readExact = (relativeFile) => {
  const file = path.resolve(legalRoot, relativeFile);
  if (file !== legalRoot && !file.startsWith(`${legalRoot}${path.sep}`)) throw new Error(`Legal path escapes submodule: ${relativeFile}`);
  const bytes = fs.readFileSync(file);
  const hash = crypto.createHash('sha256').update(bytes).digest('hex');
  return { bytes, hash };
};

for (const [name, item] of Object.entries(items)) {
  const { hash } = readExact(item.file);
  if (hash !== item.sha256) throw new Error(`Legal hash mismatch for ${name}: ${item.file}`);
}

const outputDir = path.join(root, '.generated');
fs.mkdirSync(outputDir, { recursive: true });
const content = Object.fromEntries(Object.entries(items).map(([name, item]) => [
  name,
  { ...item, content: readExact(item.file).bytes.toString('utf8') },
]));
fs.writeFileSync(path.join(outputDir, 'legal.ts'), `export const legalRelease = ${JSON.stringify({ ...manifest, items: content }, null, 2)} as const;\n`);
console.log(`Verified and bundled ${selector.manifest} (${mode})`);
