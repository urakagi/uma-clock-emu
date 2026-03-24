const fs = require('fs');
const data = JSON.parse(fs.readFileSync('gametora_skills_cache.json', 'utf8'));

// Print first 5 items to check keys
for (let i = 0; i < 5; i++) {
    const s = data[i];
    console.log(`\n=== Skill ${s.id} ===`);
    console.log('Keys:', Object.keys(s));
    if (s.group_id) console.log('group_id:', s.group_id);
}

// Find 右回り (Right-Handed) skills
for (const s of data) {
    if (s.jpname && s.jpname.includes('右回り')) {
        console.log(`ID: ${s.id}, Name: ${s.jpname}, Group_ID: ${s.group_id}`);
    }
}
