import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Map of existing site tools and content routes
const SITE_ROUTING_MAP = [
  {
    path: '/',
    tool: 'Discord Timestamp Generator',
    keywords: ['timestamp', 'relative time', 'dynamic time', 'unix timestamp discord', 'discord time']
  },
  {
    path: '/discord-colored-text',
    tool: 'Discord Colored Text Generator',
    keywords: ['color', 'colored', 'ansi', 'red text', 'blue text', 'green text', 'colored text']
  },
  {
    path: '/discord-webhook-timestamps',
    tool: 'Discord Webhook Timestamps Builder',
    keywords: ['webhook', 'webhook message', 'webhook timestamp', 'webhook payload']
  },
  {
    path: '/discord-embed-generator',
    tool: 'Discord Embed Generator',
    keywords: ['embed', 'embed generator', 'embed builder', 'embed preview', 'rich embed']
  },
  {
    path: '/discord-glitch-text',
    tool: 'Discord Glitch Text Generator',
    keywords: ['glitch', 'zalgo', 'corrupted', 'scary text', 'crazy text', 'diacritics']
  },
  {
    path: '/discord-invisible-name',
    tool: 'Discord Invisible Name Generator',
    keywords: ['invisible name', 'blank name', 'empty character', 'invisible character', 'hangul filler', 'blank message']
  },
  {
    path: '/discord-snowflake-to-timestamp',
    tool: 'Discord Snowflake to Timestamp',
    keywords: ['snowflake', 'account age', 'server id creation date', 'user id to date', 'snowflake id']
  },
  {
    path: '/discord-timestamp-formats',
    tool: 'Discord Timestamp Formats Reference',
    keywords: ['formats', 'format table', 't:R', 't:F', 'syntax reference', 'relative timestamp syntax']
  },
  {
    path: '/discord-bot-timestamps',
    tool: 'Discord Bot Timestamps Guide',
    keywords: ['bot', 'discord.js', 'discord.py', 'code for bot', 'bot timestamps']
  },
  {
    path: '/discord-markdown',
    tool: 'Discord Markdown Guide',
    keywords: ['markdown', 'bold text', 'italic', 'strikethrough', 'spoiler tag']
  },
  {
    path: '/unix-timestamp',
    tool: 'Unix Timestamp Converter',
    keywords: ['unix timestamp', 'epoch converter', 'utc epoch']
  }
];

// Evaluate Query Intent using Jev System 1 evaluation principles
export function evaluateQuery(queryText) {
  const normalized = queryText.toLowerCase().trim();

  // 1. Evaluate Intent Category
  let intent = 'INFORMATIONAL';
  if (
    normalized.includes('generator') ||
    normalized.includes('builder') ||
    normalized.includes('converter') ||
    normalized.includes('maker') ||
    normalized.includes('tool') ||
    normalized.includes('calculator') ||
    normalized.includes('copy paste') ||
    normalized.includes('how to make') ||
    normalized.includes('how to create')
  ) {
    intent = 'TOOL_USAGE';
  } else if (
    normalized.includes('best') ||
    normalized.includes('free') ||
    normalized.includes('online') ||
    normalized.includes('vs') ||
    normalized.includes('alternative')
  ) {
    intent = 'COMMERCIAL';
  } else if (
    normalized.includes('disctimestamps') ||
    normalized.includes('disc timestamps')
  ) {
    intent = 'NAVIGATIONAL';
  }

  // 2. Evaluate Matched Page
  let matchedPage = null;
  let highestScore = 0;

  for (const route of SITE_ROUTING_MAP) {
    let score = 0;
    for (const kw of route.keywords) {
      if (normalized.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      matchedPage = route;
    }
  }

  // 3. Evaluate Status (COVERED vs NOT_COVERED)
  const isCovered = matchedPage !== null && highestScore >= 4;

  return {
    query: queryText,
    intent,
    matched_page: isCovered ? matchedPage.path : null,
    matched_tool: isCovered ? matchedPage.tool : null,
    status: isCovered ? 'COVERED' : 'NOT_COVERED',
    confidence: isCovered ? Math.min(1.0, highestScore / 15) : 0.95
  };
}

// Run classification on queries
export function runClassification(queries) {
  const classified = [];
  const ideasQueue = [];

  for (const item of queries) {
    const queryText = typeof item === 'string' ? item : item.query;
    const evaluation = evaluateQuery(queryText);

    const fullRecord = {
      ...evaluation,
      impressions: item.impressions || 0,
      clicks: item.clicks || 0,
      position: item.position || null
    };

    classified.push(fullRecord);

    if (evaluation.status === 'NOT_COVERED') {
      ideasQueue.push({
        query: queryText,
        intent: evaluation.intent,
        impressions: fullRecord.impressions,
        opportunity_score: Math.round((fullRecord.impressions * 1.5) + (evaluation.intent === 'TOOL_USAGE' ? 50 : 20)),
        suggested_action: 'Build dedicated tool or page section',
        date_added: new Date().toISOString().split('T')[0]
      });
    }
  }

  return { classified, ideasQueue };
}

// Main execution
function main() {
  console.log('======================================================');
  console.log('STEP 1: AUTOMATED GSC QUERY INTENT CLASSIFIER');
  console.log('Evaluator: Jev-Style System 1 Discrete Decision Model');
  console.log('======================================================\n');

  const inputArg = process.argv[2];
  const inputFilePath = inputArg
    ? path.resolve(process.cwd(), inputArg)
    : path.join(ROOT_DIR, 'data', 'gsc-queries-sample.json');

  if (!fs.existsSync(inputFilePath)) {
    console.error(`[ERROR] Input queries file not found: ${inputFilePath}`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));
  console.log(`[INFO] Loaded ${rawData.length} queries from ${path.basename(inputFilePath)}`);

  const { classified, ideasQueue } = runClassification(rawData);

  // Summary counts
  const coveredCount = classified.filter((c) => c.status === 'COVERED').length;
  const notCoveredCount = classified.filter((c) => c.status === 'NOT_COVERED').length;
  const toolIntentCount = classified.filter((c) => c.intent === 'TOOL_USAGE').length;

  console.log('\n--- CLASSIFICATION RESULTS ---');
  console.table(
    classified.map((c) => ({
      Query: c.query,
      Intent: c.intent,
      Status: c.status,
      Page: c.matched_page || '(None: Opportunity)'
    }))
  );

  console.log('\n--- EVALUATOR METRICS ---');
  console.log(`Total Queries Analyzed: ${classified.length}`);
  console.log(`Covered by Existing Tools: ${coveredCount}`);
  console.log(`Gaps (New Tool Opportunities): ${notCoveredCount}`);
  console.log(`High-Action Tool Intent Queries: ${toolIntentCount}`);

  // Save reports
  const reportsDir = path.join(ROOT_DIR, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const outClassifiedPath = path.join(reportsDir, 'classified-queries.json');
  fs.writeFileSync(outClassifiedPath, JSON.stringify(classified, null, 2), 'utf8');
  console.log(`[SAVED] Full classified queries saved to: ${outClassifiedPath}`);

  // Save/Update Ideas Queue
  const dataDir = path.join(ROOT_DIR, 'data');
  const ideasQueuePath = path.join(dataDir, 'ideas-queue.json');
  let existingIdeas = [];
  if (fs.existsSync(ideasQueuePath)) {
    try {
      existingIdeas = JSON.parse(fs.readFileSync(ideasQueuePath, 'utf8'));
    } catch {
      existingIdeas = [];
    }
  }

  // Merge without duplicates
  const existingQuerySet = new Set(existingIdeas.map((i) => i.query.toLowerCase()));
  for (const idea of ideasQueue) {
    if (!existingQuerySet.has(idea.query.toLowerCase())) {
      existingIdeas.push(idea);
      existingQuerySet.add(idea.query.toLowerCase());
    }
  }

  fs.writeFileSync(ideasQueuePath, JSON.stringify(existingIdeas, null, 2), 'utf8');
  console.log(`[SAVED] New tool ideas queue updated (${existingIdeas.length} total) at: ${ideasQueuePath}`);
}

if (process.argv[1] && process.argv[1].endsWith('classify-queries.mjs')) {
  main();
}
