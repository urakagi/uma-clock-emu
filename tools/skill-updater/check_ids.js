const fs = require('fs');
const data = JSON.parse(fs.readFileSync('skill_data.json', 'utf8'));

for (const [id, skill] of Object.entries(data)) {
    if (skill.name_ja && skill.name_ja.includes('右回り')) {
        console.log(`ID: ${id}, Name: ${skill.name_ja}, Rarity: ${skill.rarity}`);
    }
}
