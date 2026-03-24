const fs = require('fs');

const gametoraData = JSON.parse(fs.readFileSync('gametora_skills_cache.json', 'utf8'));
const githubData = JSON.parse(fs.readFileSync('skill_data.json', 'utf8'));

// 1. Create a grouping logic based on Gametora's versions
const skillGroups = [];
const visited = new Set();

for (const gtSkill of gametoraData) {
    if (visited.has(gtSkill.id)) continue;
    
    // Some skills have 'versions' array which groups them
    let familyIds = [];
    if (gtSkill.versions && gtSkill.versions.length > 0) {
        familyIds = [...gtSkill.versions];
    } else {
        familyIds = [gtSkill.id];
    }
    
    // Sort family so base/normal comes first, then rare, evo, etc.
    // Usually UMA IDs: 200012 = normal, 200011 = rare. Let's just keep as is for now.
    familyIds.sort((a,b) => a - b);
    
    let variants = [];
    let commonCondition = null;
    
    for (const vid of familyIds) {
        visited.add(vid);
        
        // Grab the stats from github Data
        const gh = githubData[String(vid)];
        if (!gh) continue;
        
        // If an alternative exists, use first defined condition as baseline
        if (!commonCondition && gh.alternatives && gh.alternatives[0]) {
            commonCondition = gh.alternatives[0].condition;
        }
        
        variants.push({
            id: vid,
            rarity: gh.rarity,
            name_ja: gh.name_ja,
            name_en: gh.name_en,
            name_zh: gh.name_zh,
            effects: gh.alternatives && gh.alternatives[0] ? gh.alternatives[0].effects : [],
            duration: gh.alternatives && gh.alternatives[0] ? gh.alternatives[0].baseDuration : 0
        });
    }
    
    if (variants.length > 0) {
        skillGroups.push({
            conditionStr: commonCondition,
            variants
        });
    }
}

console.log(`Generated ${skillGroups.length} distinct grouped families.`);
console.log('Sample group (Right-Handed):');

const sample = skillGroups.find(g => g.variants.some(v => v.name_ja && v.name_ja.includes('右回りの鬼')));
if (sample) console.log(JSON.stringify(sample, null, 2));

const sampleUnique = skillGroups.find(g => g.variants.some(v => v.name_ja && v.name_ja.includes('究極テイオーステップ')));
if (sampleUnique) console.log(JSON.stringify(sampleUnique, null, 2));

fs.writeFileSync('skillDataGen_preview.json', JSON.stringify(skillGroups.slice(0, 50), null, 2));
console.log('Wrote 50 groups to skillDataGen_preview.json');
