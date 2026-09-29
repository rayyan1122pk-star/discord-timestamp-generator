import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Evaluator: Classifies rankings and identifies surgical, targeted patch actions
export function evaluateRankingItem(item) {
  const pos = parseFloat(item.position);
  let decision = 'KEEP';
  let priority = 'LOW';
  let targetSection = 'None (Performing well)';
  let actionDescription = 'Do not modify. Retain current ranking momentum and schema.';

  if (pos > 10.0 && pos <= 30.0) {
    // STRIKING DISTANCE (Position 11 - 30): Highest ROI opportunity
    decision = 'PATCH';
    priority = pos <= 18.0 ? 'CRITICAL' : 'HIGH';

    const q = item.query.toLowerCase();
    if (q.includes('syntax') || q.includes('formats')) {
      targetSection = 'Syntax Quick Reference Table';
      actionDescription = 'Add a compact 7-row markdown copy table comparing each tag (<t:TIMESTAMP:R>, :F, :d) with live visual output.';
    } else if (q.includes('red') || q.includes('color')) {
      targetSection = 'ANSI Escape Code Quick Copy';
      actionDescription = 'Place a dedicated 1-click ANSI snippet for red text (```ansi\\n\\u001b[31mYour Text```) directly below hero.';
    } else if (q.includes('bot') || q.includes('code')) {
      targetSection = 'Developer Bot Snippets (discord.js & discord.py)';
      actionDescription = 'Add tabbed Discord.js v14 time() helper and Python discord.utils.format_dt code blocks with 1-click copy.';
    } else if (q.includes('embed') || q.includes('preview')) {
      targetSection = 'Embed JSON & Code Exporter';
      actionDescription = 'Add 1-click raw embed JSON export and discord.py Embed.from_dict() sample.';
    } else if (q.includes('webhook')) {
      targetSection = 'Webhook Execution Curl Snippet';
      actionDescription = 'Add 1-click copyable curl command and Discord Webhook avatar guide.';
    } else if (q.includes('snowflake')) {
      targetSection = 'Snowflake Math Explanation Block';
      actionDescription = 'Add 1-sentence formula explaining right-shift 22 bits + Discord Epoch 1420070400000.';
    } else if (q.includes('zalgo') || q.includes('glitch')) {
      targetSection = 'Unicode Diacritics & 32-Char Limit Note';
      actionDescription = 'Add quick callout box explaining Discord 32-character nickname limit and crash-prevention safeguards.';
    } else {
      targetSection = 'Targeted FAQ Item';
      actionDescription = `Add specific FAQ answering "${item.query}" directly in 2 sentences with FAQPage schema.`;
    }
  } else if (pos > 30.0) {
    // Out of striking distance
    decision = 'REWRITE';
    priority = item.impressions > 100 ? 'MEDIUM' : 'LOW';
    targetSection = 'Comprehensive Topic Expansion';
    actionDescription = 'Audit intent mismatch. Expand page structure, add schema, and build external contextual backlinks.';
  }

  return {
    query: item.query,
    page: item.page,
    position: pos,
    impressions: item.impressions,
    clicks: item.clicks,
    ctr: item.ctr,
    decision,
    priority,
    target_section: targetSection,
    action_description: actionDescription
  };
}

export function runRewriteQueue(rankings) {
  const evaluated = rankings.map(evaluateRankingItem);
  // Sort by priority and impressions
  const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
  evaluated.sort((a, b) => {
    const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (pDiff !== 0) return pDiff;
    return b.impressions - a.impressions;
  });
  return evaluated;
}

function main() {
  console.log('======================================================');
  console.log('STEP 4: THE TARGETED REWRITE QUEUE');
  console.log('Evaluator: Striking-Distance Surgical Optimization');
  console.log('======================================================\n');

  const inputArg = process.argv[2];
  const inputFilePath = inputArg
    ? path.resolve(process.cwd(), inputArg)
    : path.join(ROOT_DIR, 'data', 'gsc-rankings.json');

  if (!fs.existsSync(inputFilePath)) {
    console.error(`[ERROR] GSC rankings file not found: ${inputFilePath}`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));
  console.log(`[INFO] Auditing ${rawData.length} ranking records from ${path.basename(inputFilePath)}...\n`);

  const results = runRewriteQueue(rawData);

  const patchItems = results.filter((r) => r.decision === 'PATCH');
  const keepItems = results.filter((r) => r.decision === 'KEEP');
  const rewriteItems = results.filter((r) => r.decision === 'REWRITE');

  console.log('--- REWRITE QUEUE SUMMARY ---');
  console.table(
    results.map((r) => ({
      Query: r.query,
      Page: r.page,
      Pos: r.position,
      Impr: r.impressions,
      Decision: r.decision,
      Priority: r.priority
    }))
  );

  console.log('\n--- EVALUATOR DECISION BREAKDOWN ---');
  console.log(`Keep As Is (Top 10): ${keepItems.length}`);
  console.log(`Striking Distance (PATCH specific section): ${patchItems.length}`);
  console.log(`Requires Topic Rewrite / Overhaul: ${rewriteItems.length}`);

  console.log('\n======================================================');
  console.log('HIGH-PRIORITY SURGICAL PATCHES (POSITIONS 11-30)');
  console.log('======================================================');
  for (const item of patchItems) {
    console.log(`\nQuery: "${item.query}" (Pos: ${item.position} | Impressions: ${item.impressions})`);
    console.log(`Target Page: ${item.page}`);
    console.log(`Target Section: ${item.target_section}`);
    console.log(`Action: ${item.action_description}`);
  }

  // Save JSON report
  const reportsDir = path.join(ROOT_DIR, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const jsonOutPath = path.join(reportsDir, 'targeted-rewrite-queue.json');
  fs.writeFileSync(jsonOutPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n[SAVED] JSON queue saved to: ${jsonOutPath}`);

  // Save Markdown action checklist
  let md = '# Targeted SEO Rewrite Queue (Striking Distance Optimization)\n\n';
  md += `Generated: ${new Date().toISOString()}\n\n`;
  md += `### Executive Summary\n`;
  md += `- Queries in Striking Distance (Pos 11-30): **${patchItems.length}**\n`;
  md += `- Top 10 High Performers (Keep Stable): **${keepItems.length}**\n`;
  md += `- Out of Range (Major Overhaul Needed): **${rewriteItems.length}**\n\n`;

  md += '### Surgical Patch Checklist (Prioritized by ROI)\n\n';
  for (const item of patchItems) {
    md += `#### [${item.priority}] "${item.query}"\n`;
    md += `- **Page:** \`${item.page}\`\n`;
    md += `- **Current Average Position:** ${item.position}\n`;
    md += `- **Impressions:** ${item.impressions} | **CTR:** ${item.ctr}\n`;
    md += `- **Target Section:** ${item.target_section}\n`;
    md += `- **Surgical Action:** ${item.action_description}\n\n`;
  }

  const mdOutPath = path.join(reportsDir, 'targeted-rewrite-queue.md');
  fs.writeFileSync(mdOutPath, md, 'utf8');
  console.log(`[SAVED] Markdown checklist saved to: ${mdOutPath}`);
}

if (process.argv[1] && process.argv[1].endsWith('targeted-rewrite-queue.mjs')) {
  main();
}
