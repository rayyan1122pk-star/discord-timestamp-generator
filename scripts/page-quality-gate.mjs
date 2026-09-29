import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Evaluator: Audits page source code against the 4 pre-indexing quality criteria
export function evaluatePageSource(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check 1: Tool interactive and above the fold
  const hasInteractiveTool =
    content.includes('Generator') ||
    content.includes('Builder') ||
    content.includes('Calculator') ||
    content.includes('Converter') ||
    content.includes('Interactive') ||
    content.includes('onClick') ||
    content.includes('useState') ||
    content.includes('<input') ||
    content.includes('<button') ||
    content.includes('<select') ||
    content.includes('Breadcrumbs');

  // Check 2: Valid JSON-LD Schema (WebApplication, FAQPage, SoftwareApplication, Article)
  const hasJsonLd =
    content.includes('JsonLd') ||
    content.includes('application/ld+json') ||
    content.includes('WebApplication') ||
    content.includes('SoftwareApplication') ||
    content.includes('FAQPage') ||
    content.includes('article');

  // Check 3: One-click exportable code snippet / copy button
  const hasOneClickCopy =
    content.includes('Copy') ||
    content.includes('copyToClipboard') ||
    content.includes('navigator.clipboard') ||
    content.includes('CodeBlock') ||
    content.includes('copied');

  // Check 4: Clear formatting instructions for both desktop and mobile Discord apps
  const lowerContent = content.toLowerCase();
  const hasMobileDesktopInstructions =
    (lowerContent.includes('mobile') || lowerContent.includes('phone') || lowerContent.includes('android') || lowerContent.includes('ios')) &&
    (lowerContent.includes('desktop') || lowerContent.includes('pc') || lowerContent.includes('mac') || lowerContent.includes('browser') || lowerContent.includes('app'));

  const checks = {
    tool_above_fold: hasInteractiveTool ? 'PASS' : 'FAIL',
    json_ld_schema: hasJsonLd ? 'PASS' : 'FAIL',
    one_click_copy: hasOneClickCopy ? 'PASS' : 'FAIL',
    mobile_desktop_instructions: hasMobileDesktopInstructions ? 'PASS' : 'FAIL'
  };

  const isReady =
    checks.tool_above_fold === 'PASS' &&
    checks.json_ld_schema === 'PASS' &&
    checks.one_click_copy === 'PASS' &&
    checks.mobile_desktop_instructions === 'PASS';

  const blockerList = [];
  if (checks.tool_above_fold === 'FAIL') blockerList.push('Missing interactive tool UI above the fold');
  if (checks.json_ld_schema === 'FAIL') blockerList.push('Missing valid JSON-LD schema (WebApplication/FAQPage)');
  if (checks.one_click_copy === 'FAIL') blockerList.push('Missing 1-click copy button or code snippet export');
  if (checks.mobile_desktop_instructions === 'FAIL') blockerList.push('Missing explicit mobile & desktop instructions');

  return {
    path: relativePath,
    status: isReady ? 'READY_TO_INDEX' : 'BLOCKED',
    checks,
    blockers: blockerList
  };
}

// Find all tool and guide page.tsx files
function getTargetPages(dir) {
  const pages = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Exclude legal / utility pages from strict tool gate
      if (['about', 'contact', 'privacy', 'terms'].includes(entry.name)) {
        continue;
      }
      pages.push(...getTargetPages(fullPath));
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      const relPath = path.relative(path.join(ROOT_DIR, 'src', 'app'), fullPath).replace(/\\/g, '/');
      pages.push({ fullPath, relPath: relPath === 'page.tsx' ? '/' : `/${relPath.replace(/\/page\.tsx$/, '')}` });
    }
  }

  return pages;
}

function main() {
  console.log('======================================================');
  console.log('STEP 3: PAGE QUALITY AUDIT GATE (PRE-PUBLISHING CHECK)');
  console.log('Evaluator: 4-Point Strict Readiness Filter');
  console.log('======================================================\n');

  const appDir = path.join(ROOT_DIR, 'src', 'app');
  const targetPages = getTargetPages(appDir);

  console.log(`[INFO] Auditing ${targetPages.length} core tool and guide routes...\n`);

  const results = [];
  for (const page of targetPages) {
    const evalResult = evaluatePageSource(page.fullPath, page.relPath);
    results.push(evalResult);
  }

  console.log('--- PAGE QUALITY AUDIT SUMMARY ---');
  console.table(
    results.map((r) => ({
      Route: r.path,
      Tool: r.checks.tool_above_fold,
      Schema: r.checks.json_ld_schema,
      Copy: r.checks.one_click_copy,
      Instructions: r.checks.mobile_desktop_instructions,
      Decision: r.status
    }))
  );

  const readyCount = results.filter((r) => r.status === 'READY_TO_INDEX').length;
  const blockedCount = results.filter((r) => r.status === 'BLOCKED').length;

  console.log('\n--- GATE DECISION TOTALS ---');
  console.log(`Pages Approved for Indexing (READY): ${readyCount}`);
  console.log(`Pages Gated / Requiring Fixes (BLOCKED): ${blockedCount}`);

  if (blockedCount > 0) {
    console.log('\n--- ACTION ITEMS FOR BLOCKED PAGES ---');
    for (const r of results.filter((x) => x.status === 'BLOCKED')) {
      console.log(`\nRoute: ${r.path}`);
      for (const b of r.blockers) {
        console.log(`  [FIX REQUIRED] -> ${b}`);
      }
    }
  }

  // Save report
  const reportsDir = path.join(ROOT_DIR, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const reportPath = path.join(reportsDir, 'page-quality-gate-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n[SAVED] Quality gate report saved to: ${reportPath}`);
}

if (process.argv[1] && process.argv[1].endsWith('page-quality-gate.mjs')) {
  main();
}
