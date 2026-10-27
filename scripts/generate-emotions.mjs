import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), 'VITE_');
const backendUrl = env.VITE_API_URL;

const outputPath = resolve('public/emotions.json');
const temporaryOutputPath = `${outputPath}.tmp`;
const timeoutMs = 120_000;

if (!backendUrl) {
  throw new Error('VITE_API_URL must be set to generate emotions.json.');
}

const endpoint = new URL('/api/emotions', `${backendUrl.replace(/\/$/, '')}/`);
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), timeoutMs);

function validateEmotionTree(response) {
  if (!response || response.success !== true || !Array.isArray(response.data)) {
    throw new Error('Emotion API response is missing a successful, array-valued data field.');
  }

  const ids = new Set();
  let nodeCount = 0;

  function validateNode(node, level) {
    if (!node || typeof node !== 'object') {
      throw new Error(`Emotion ${level} node is invalid.`);
    }

    if (typeof node.id !== 'string' || node.id.length === 0) {
      throw new Error(`Emotion ${level} node has no valid id.`);
    }
    if (typeof node.label !== 'string' || node.label.length === 0) {
      throw new Error(`Emotion ${level} node has no valid label.`);
    }
    if (ids.has(node.id)) {
      throw new Error(`Emotion hierarchy contains duplicate id: ${node.id}.`);
    }
    ids.add(node.id);
    nodeCount += 1;

    if (level === 'core' && (typeof node.color !== 'string' || node.color.length === 0)) {
      throw new Error(`Core emotion ${node.id} has no valid color.`);
    }

    if (level !== 'tertiary' && !Array.isArray(node.children)) {
      throw new Error(`Emotion ${node.id} has no valid children array.`);
    }

    for (const child of node.children ?? []) {
      validateNode(child, level === 'core' ? 'secondary' : 'tertiary');
    }
  }

  for (const node of response.data) {
    validateNode(node, 'core');
  }

  if (response.data.length === 0 || nodeCount === 0) {
    throw new Error('Emotion hierarchy is empty.');
  }
}

async function generate() {
  let response;
  try {
    response = await fetch(endpoint, { signal: controller.signal });
  } catch (error) {
    clearTimeout(timeout);
    if (error?.name === 'AbortError') {
      throw new Error(`Emotion API request timed out after ${timeoutMs / 1000} seconds.`);
    }
    throw new Error(`Emotion API request failed: ${error.message}`);
  }

  if (!response.ok) {
    clearTimeout(timeout);
    throw new Error(`Emotion API returned HTTP ${response.status} ${response.statusText}.`);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Emotion API returned invalid JSON.');
  } finally {
    clearTimeout(timeout);
  }

  validateEmotionTree(data);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(temporaryOutputPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  await rename(temporaryOutputPath, outputPath);
  console.log(`Generated ${outputPath} from ${endpoint}`);
}

generate().catch((error) => {
  console.error(`Failed to generate emotions.json: ${error.message}`);
  process.exitCode = 1;
});
