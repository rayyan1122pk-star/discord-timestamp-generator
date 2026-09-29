import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Evaluator: Evaluates AI search citations for our domain vs competitors
export function evaluateCitations(queryItem) {
  const ourDomain = 'disctimestamps.site';
  const citations = queryItem.simulated_citations || [];

  const isCited = citations.some((c) => c.url && c.url.toLowerCase().includes(ourDomain));
  const competitorCitations = citations.filter((c) => !c.url.toLowerCase().includes(ourDomain));

  const competitorDomains = competitorCitations.map((c) => {
    try {
      const parsed = new URL(c.url);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return c.url;
    }
  });

  // Gap analysis recommendations based on target query topic
  let gapAction = 'Maintain current structured data and backlinks.';
  let priority = 'LOW';

  if (!isCited) {
    priority = 'HIGH';
    const q = queryItem.query.toLowerCase();
    if (q.includes('colored text')) {
      gapAction = 'Add explicit ANSI copy-paste table and mobile Discord app caveat to FAQ.';
    } else if (q.includes('timestamp')) {
      gapAction = 'Increase GitHub Gist / awesome-discord directory citations to boost citation rank.';
    } else if (q.includes('webhook') || q.includes('embed')) {
      gapAction = 'Add discord.js and discord.py export code snippets directly below interactive embed.';
    } else if (q.includes('glitch') || q.includes('zalgo')) {
      gapAction = 'Add 1-click preset intensity buttons and Discord 32-character limit reminder.';
    } else {
      gapAction = 'Add FAQPage schema and quick-answer summary block at top of page.';
    }
  }

  return {
    query: queryItem.query,
    engine: queryItem.engine || 'AI Search',
    target_tool: queryItem.target_tool,
    target_url: queryItem.our_url,
    is_cited: isCited ? 'YES' : 'NO',
    total_citations: citations.length,
    competitor_domains: [...new Set(competitorDomains)],
    gap_action: gapAction,
    priority
  };
}

export function runCitationTracker(queryList) {
  const results = [];
  for (const item of queryList) {
    const evaluation = evaluateCitations(item);
    results.push(evaluation);
  }
  return results;
}

function main() {
  console.log('======================================================');
  console.log('STEP 2: AI SEARCH CITATION TRACKER (GEO MONITOR)');
  console.log('Evaluator: Citation Presence & Competitor Gap Analysis');
  console.log('======================================================\n');

  const inputArg = process.argv[2];
  const inputFilePath = inputArg
    ? path.resolve(process.cwd(), inputArg)
    : path.join(ROOT_DIR, 'data', 'ai-citations-queries.json');

  if (!fs.existsSync(inputFilePath)) {
    console.error(`[ERROR] AI citations query file not found: ${inputFilePath}`);
    process.exit(1);
  }

  const queryList = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));
  console.log(`[INFO] Auditing ${queryList.length} high-value AI search queries from ${path.basename(inputFilePath)}`);

  const results = runCitationTracker(queryList);

  const citedCount = results.filter((r) => r.is_cited === 'YES').length;
  const missingCount = results.filter((r) => r.is_cited === 'NO').length;

  console.log('\n--- GEO CITATION AUDIT RESULTS ---');
  console.table(
    results.map((r) => ({
      Query: r.query,
      Engine: r.engine,
      Cited: r.is_cited,
      Competitors: r.competitor_domains.slice(0, 2).join(', ') || 'None',
      Priority: r.priority
    }))
  );

  console.log('\n--- GEO MONITOR SUMMARY ---');
  console.log(`Total Prompts Monitored: ${results.length}`);
  console.log(`Cited in AI Answers: ${citedCount}`);
  console.log(`Missing from Citations: ${missingCount}`);
  console.log(`Citation Rate: ${Math.round((citedCount / results.length) * 100)}%`);

  // Save JSON report
  const reportsDir = path.join(ROOT_DIR, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const jsonReportPath = path.join(reportsDir, 'geo-citation-report.json');
  fs.writeFileSync(jsonReportPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n[SAVED] JSON report saved to: ${jsonReportPath}`);

  // Generate clean Markdown report
  let mdContent = '# Generative Engine Optimization (GEO) Citation Audit Report\n\n';
  mdContent += `Generated: ${new Date().toISOString()}\n\n`;
  mdContent += `### Citation Health Summary\n`;
  mdContent += `- Total Queries Checked: ${results.length}\n`;
  mdContent += `- disctimestamps.site Cited: ${citedCount}\n`;
  mdContent += `- Missing (Competitors Cited): ${missingCount}\n`;
  mdContent += `- Overall Citation Coverage: ${Math.round((citedCount / results.length) * 100)}%\n\n`;

  mdContent += '### Query by Query Breakdown\n\n';
  for (const r of results) {
    mdContent += `#### Query: "${r.query}"\n`;
    mdContent += `- Target Tool: [${r.target_tool}](${r.target_url})\n`;
    mdContent += `- AI Engine: ${r.engine}\n`;
    mdContent += `- disctimestamps.site Cited: **${r.is_cited}**\n`;
    if (r.competitor_domains.length > 0) {
      mdContent += `- Competitors Cited: ${r.competitor_domains.map((d) => `\`${d}\``).join(', ')}\n`;
    }
    mdContent += `- Action Required: ${r.gap_action}\n`;
    mdContent += `- Priority: **${r.priority}**\n\n`;
  }

  const mdReportPath = path.join(reportsDir, 'geo-citation-report.md');
  fs.writeFileSync(mdReportPath, mdContent, 'utf8');
  console.log(`[SAVED] Markdown report saved to: ${mdReportPath}`);
}

if (process.argv[1] && process.argv[1].endsWith('geo-citation-tracker.mjs')) {
  main();
}
