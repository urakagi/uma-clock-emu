const fs = require('fs');
const data = JSON.parse(fs.readFileSync('skill_data.json', 'utf8'));

console.log(JSON.stringify(data['200011'], null, 2));
console.log(JSON.stringify(data['200012'], null, 2));
console.log(JSON.stringify(data['200014'], null, 2));
console.log(JSON.stringify(data['106701211'], null, 2));
