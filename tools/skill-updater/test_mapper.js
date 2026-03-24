const githubTypesToUma = {
  1: 'passiveSpeed',
  2: 'passiveStamina',
  3: 'passivePower',
  4: 'passiveGuts',
  5: 'passiveWisdom',
  9: 'heal',
  21: 'speedWithDecel', // or current speed
  27: 'targetSpeed',
  31: 'acceleration'
};

function parseEffects(effects) {
  const result = {};
  for (const effect of effects) {
    if (effect.target !== 1) continue; // Only self effects
    
    // Normal passives: 800000 -> 80
    if (effect.type >= 1 && effect.type <= 5) {
      result[githubTypesToUma[effect.type]] = effect.modifier / 10000;
    }
    // Heals: 150, 350, 550, 750 (modifier comes as 150, 350, 550, etc)
    else if (effect.type === 9) {
      result['heal'] = effect.modifier;
    }
    // Speeds: 1500, 2500, 3500, 4500 (usually mapped to 0.15, 0.25, 0.35, 0.45)
    else if (effect.type === 27 || effect.type === 21) {
      // Type 21 is targetSpeed, 27 is current speed? Let's assume both translate to speed
      const key = githubTypesToUma[effect.type];
      result[key] = effect.modifier / 10000; // 1500 -> 0.15
    }
    // Acceleration: 31
    else if (effect.type === 31) {
      result['acceleration'] = effect.modifier / 10000; // 1000 -> 0.1
    }
  }
  return result;
}

// Test with 100111 (Seishin Ittou) and 100011 (Shooting Star) and 200011 (Right-Handed ◎)
const fs = require('fs');
const githubData = JSON.parse(fs.readFileSync('skill_data.json', 'utf8'));

console.log('Right-Handed ◎ (200011):', parseEffects(githubData['200011'].alternatives[0].effects));
console.log('Shooting Star (100011):', parseEffects(githubData['100011'].alternatives[0].effects));
console.log('Warning Shot (10071):', parseEffects(githubData['10071'].alternatives[0].effects));
console.log('Red Ace (10091):', parseEffects(githubData['10091'].alternatives[0].effects));
