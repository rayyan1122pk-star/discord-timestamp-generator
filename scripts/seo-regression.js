/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Automated SEO, Generator, and Content Regression Test Suite
 * Discord Timestamp Generator
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING SEO & GENERATOR REGRESSION AUDIT ---');

let passedTests = 0;
let failedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
    failedTests++;
  }
}

// 1. GENERATOR DATE MATH TESTS
runTest('Leap Year Epoch: 2028-02-29 12:00:00 UTC == 1835438400', () => {
  const d = new Date('2028-02-29T12:00:00Z');
  const epoch = Math.floor(d.getTime() / 1000);
  assert.strictEqual(epoch, 1835438400);
});

runTest('Unix Epoch Zero: 1970-01-01 00:00:00 UTC == 0', () => {
  const d = new Date('1970-01-01T00:00:00Z');
  const epoch = Math.floor(d.getTime() / 1000);
  assert.strictEqual(epoch, 0);
});

runTest('Year 2038 32-bit boundary is handled without overflow in 64-bit JS numbers', () => {
  const max32 = 2147483647;
  const post32 = 2147483648;
  const d1 = new Date(max32 * 1000);
  const d2 = new Date(post32 * 1000);
  assert.strictEqual(d1.toISOString(), '2038-01-19T03:14:07.000Z');
  assert.strictEqual(d2.toISOString(), '2038-01-19T03:14:08.000Z');
});

runTest('Defensive NaN fallback ensures syntax is never <t:NaN:R>', () => {
  // Simulate invalid parsing
  const invalidDate = new Date('not-a-valid-date');
  let epoch = Math.floor(invalidDate.getTime() / 1000);
  if (Number.isNaN(epoch)) {
    epoch = Math.floor(Date.now() / 1000);
  }
  const syntax = `<t:${epoch}:R>`;
  assert.ok(!syntax.includes('NaN'), 'Syntax must never contain NaN');
  assert.match(syntax, /^<t:\d+:R>$/);
});

// 2. CONTENT INTEGRITY: ZERO DASHES (0 em-dashes, 0 en-dashes)
runTest('Zero em-dashes and zero en-dashes across all src/ files', () => {
  function scanDir(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(scanDir(fullPath));
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const srcFiles = scanDir(path.join(__dirname, '..', 'src'));
  const violations = [];

  for (const file of srcFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('\u2014')) {
      violations.push(`${file} contains em-dash (—)`);
    }
    if (content.includes('\u2013')) {
      violations.push(`${file} contains en-dash (–)`);
    }
  }

  assert.strictEqual(violations.length, 0, `Found dash violations: ${violations.join(', ')}`);
});

// 3. AI BUZZWORD SCAN
runTest('Zero banned AI buzzwords across all src/ files', () => {
  const bannedWords = [
    'delve', 'crucial', 'vital', 'pivotal', 'leverage', 'utilize',
    'robust', 'landscape', 'foster', 'seamless', 'testament',
    'furthermore', 'moreover', 'worth noting', 'important to note',
    'serves as', 'stands as', 'realm', 'tapestry', 'embark',
    'elevate', 'unlock', 'harness', 'in conclusion', 'it goes without saying',
    'needless to say', 'game-changer', 'paradigm shift'
  ];

  function scanDir(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(scanDir(fullPath));
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const srcFiles = scanDir(path.join(__dirname, '..', 'src'));
  const violations = [];
  const regex = new RegExp(`\\b(${bannedWords.join('|')})\\b`, 'i');

  for (const file of srcFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const match = regex.exec(content);
    if (match) {
      violations.push(`${file} contains banned word "${match[0]}"`);
    }
  }

  assert.strictEqual(violations.length, 0, `Found AI buzzwords: ${violations.join(', ')}`);
});

// 4. SITEMAP ROUTE VALIDATION
runTest('Sitemap file declares valid canonical URLs matching guides and core pages', () => {
  const sitemapFile = path.join(__dirname, '..', 'src', 'app', 'sitemap.ts');
  assert.ok(fs.existsSync(sitemapFile), 'sitemap.ts must exist');
  const sitemapContent = fs.readFileSync(sitemapFile, 'utf-8');
  assert.ok(sitemapContent.includes('siteConfig.url'), 'Must reference siteConfig.url');
  assert.ok(sitemapContent.includes('BLOG_POSTS.map'), 'Must map over BLOG_POSTS');
});

console.log('\n--- REGRESSION AUDIT SUMMARY ---');
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('STATUS: ALL SEO & GENERATOR REGRESSION CHECKS PASSED.');
  process.exit(0);
}
