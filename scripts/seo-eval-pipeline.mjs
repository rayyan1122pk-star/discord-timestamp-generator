import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('================================================================');
console.log('JEV-STYLE SEO & GEO EVALUATION PIPELINE: disctimestamps.site');
console.log('System 1 Decision Engine: Discrete Evaluations over Token Burn');
console.log('================================================================\n');

const STEPS = [
  {
    name: 'Step 1: Automated GSC Query Intent Classifier',
    script: 'scripts/classify-queries.mjs'
  },
  {
    name: 'Step 2: AI Search Citation Tracker (GEO Monitor)',
    script: 'scripts/geo-citation-tracker.mjs'
  },
  {
    name: 'Step 3: Page Quality Audit Gate (Pre-Publishing Check)',
    script: 'scripts/page-quality-gate.mjs'
  },
  {
    name: 'Step 4: The Targeted Rewrite Queue (Striking Distance)',
    script: 'scripts/targeted-rewrite-queue.mjs'
  }
];

let allPassed = true;

for (const step of STEPS) {
  console.log(`\n>>> EXECUTING: ${step.name}...`);
  try {
    const scriptPath = path.join(ROOT_DIR, step.script);
    execSync(`node "${scriptPath}"`, { stdio: 'inherit', cwd: ROOT_DIR });
    console.log(`[COMPLETED] ${step.name}`);
  } catch (error) {
    console.error(`[ERROR IN STEP] ${step.name}:`, error.message);
    allPassed = false;
  }
}

console.log('\n================================================================');
if (allPassed) {
  console.log('SUCCESS: All 4 SEO/GEO Evaluation Workflows Completed Cleanly.');
  console.log('Reports generated in: /reports/');
  console.log('  1. reports/classified-queries.json');
  console.log('  2. reports/geo-citation-report.json & .md');
  console.log('  3. reports/page-quality-gate-report.json');
  console.log('  4. reports/targeted-rewrite-queue.json & .md');
  console.log('  5. data/ideas-queue.json');
} else {
  console.log('WARNING: Some steps encountered issues. Review log output above.');
}
console.log('================================================================\n');
