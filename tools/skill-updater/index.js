/**
 * Skill Updater - Merges skill data from:
 *   1. GitHub (alpha123/uma-skill-tools): Skill conditions & effects
 *   2. GameTora: JP/EN/ZH/KO skill names
 *
 * Usage:
 *   node index.js                   # Merge using cached GameTora data
 *   node index.js --fetch           # Re-download GameTora data via Puppeteer first
 *
 * Output: skill_data.json in this directory
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_SKILL_DATA_URL = 'https://raw.githubusercontent.com/alpha123/uma-skill-tools/master/data/skill_data.json';
const GAMETORA_CACHE = path.join(__dirname, 'gametora_skills_cache.json');
const OUTPUT_PATH = path.join(__dirname, 'skill_data.json');

// ---- Helpers ----

function downloadJsonHttps(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { rejectUnauthorized: false, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

/**
 * Fetch GameTora skills data using Puppeteer stealth.
 * GameTora's data files are behind Cloudflare, so we launch a real browser,
 * navigate to the skills page, and intercept the JSON response.
 */
async function fetchGametoraSkills() {
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());

    console.log('  Launching stealth browser...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    let skillsData = null;

    page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('/data/umamusume/skills') && url.endsWith('.json')) {
            try {
                const text = await response.text();
                skillsData = JSON.parse(text);
                console.log(`  => Intercepted: ${url} (${skillsData.length} skills)`);
            } catch (e) {
                console.error('  Failed to parse intercepted response:', e.message);
            }
        }
    });

    console.log('  Navigating to GameTora skills page...');
    try {
        await page.goto('https://gametora.com/zh-tw/umamusume/skills', {
            waitUntil: 'networkidle0',
            timeout: 120000
        });
    } catch (e) {
        console.log(`  Navigation timeout: ${e.message}`);
    }

    if (!skillsData) {
        console.log('  Waiting 15 more seconds...');
        await new Promise(r => setTimeout(r, 15000));
    }

    await browser.close();

    if (!skillsData) {
        throw new Error('Failed to intercept skills data from GameTora.');
    }

    // Cache the data for future use
    fs.writeFileSync(GAMETORA_CACHE, JSON.stringify(skillsData, null, 2), 'utf8');
    console.log(`  => Cached to ${GAMETORA_CACHE}`);

    return skillsData;
}

// ---- Main ----

async function main() {
    const shouldFetch = process.argv.includes('--fetch');

    // Step 1: Download GitHub skill data (always fresh)
    console.log('[1/3] Downloading skill data from GitHub...');
    const githubSkills = await downloadJsonHttps(GITHUB_SKILL_DATA_URL);
    const totalGithub = Object.keys(githubSkills).length;
    console.log(`  => ${totalGithub} skills.\n`);

    // Step 2: Get GameTora skills (cached or fresh)
    let gametoraSkills;
    if (shouldFetch) {
        console.log('[2/3] Fetching fresh GameTora skill names (via browser)...');
        gametoraSkills = await fetchGametoraSkills();
    } else if (fs.existsSync(GAMETORA_CACHE)) {
        console.log('[2/3] Loading cached GameTora skill names...');
        gametoraSkills = JSON.parse(fs.readFileSync(GAMETORA_CACHE, 'utf8'));
    } else {
        console.log('[2/3] No cache found. Fetching from GameTora (via browser)...');
        gametoraSkills = await fetchGametoraSkills();
    }
    console.log(`  => ${gametoraSkills.length} skills.\n`);

    // Step 3: Merge
    console.log('[3/3] Merging names into GitHub skill data...');
    const gtMap = {};
    for (const gs of gametoraSkills) {
        if (gs.id) gtMap[String(gs.id)] = gs;
    }

    let matched = 0;
    for (const [id, skillObj] of Object.entries(githubSkills)) {
        const gs = gtMap[id];
        if (gs) {
            skillObj.name_ja = gs.jpname || '';
            skillObj.name_en = gs.name_en || '';
            skillObj.name_zh = gs.name_tw || '';
            matched++;
        }
    }

    console.log(`  => Matched ${matched} / ${totalGithub} skills.\n`);

    // Save
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(githubSkills, null, 2), 'utf8');
    console.log(`Done! Output saved to:\n  ${OUTPUT_PATH}`);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
