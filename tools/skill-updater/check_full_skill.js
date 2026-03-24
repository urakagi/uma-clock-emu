const fs = require('fs');
const data = JSON.parse(fs.readFileSync('gametora_skills_cache.json', 'utf8'));

// Find any skill that has "右回り" and look at all its keys
for (const s of data) {
    if (s.jpname && s.jpname.includes('右回りの鬼')) {
        console.log(JSON.stringify(s, null, 2));
    }
}
