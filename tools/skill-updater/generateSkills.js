const fs = require('fs');
const path = require('path');

const gametoraData = JSON.parse(fs.readFileSync(path.join(__dirname, 'gametora_skills_cache.json'), 'utf8'));
const githubData = JSON.parse(fs.readFileSync(path.join(__dirname, 'skill_data.json'), 'utf8'));

const githubTypesToUma = {
  1: 'passiveSpeed', 2: 'passiveStamina', 3: 'passivePower', 4: 'passiveGuts', 5: 'passiveWisdom',
  9: 'heal', 21: 'speedWithDecel', 27: 'targetSpeed', 31: 'acceleration'
};

function parseEffects(effects) {
  const result = {};
  let isHeal = false;
  let isSpeed = false;
  let isAccel = false;
  let isPassive = false;

  for (const effect of effects) {
    if (effect.target !== 1) continue;
    if (effect.type >= 1 && effect.type <= 5) {
      result[githubTypesToUma[effect.type]] = effect.modifier / 10000;
      isPassive = true;
    } else if (effect.type === 9) {
      result['heal'] = effect.modifier;
      isHeal = true;
    } else if (effect.type === 27 || effect.type === 21) {
      result['targetSpeed'] = effect.modifier / 10000;
      isSpeed = true;
    } else if (effect.type === 31) {
      result['acceleration'] = effect.modifier / 10000;
      isAccel = true;
    }
  }

  // Derive Type for MixinSkills
  let type = 'unknown';
  if (isPassive) type = 'passive';
  else if (isSpeed && isAccel) type = 'composite';
  else if (isSpeed) type = 'speed';
  else if (isAccel) type = 'acceleration';
  else if (isHeal) type = 'heal';

  return { result, type };
}

function parseCondition(conditionStr) {
  if (!conditionStr) return { conditions: {}, tooltip: '' };
  const firstOr = conditionStr.split('@')[0];
  const parts = firstOr.split('&');
  const conditions = {};
  const tooltips = [];

  const positionalKeys = [
    'order', 'order_rate', 'bashin_diff_infront', 'bashin_diff_behind',
    'is_overtake', 'blocked_side_continuetime', 'blocked_front',
    'change_order_onetime', 'change_order_up_end_after', 'near_count',
    'temptation_count', 'is_behind_in', 'order_rate_in20_continue',
    'overtake_target_time', 'is_behind_out', 'behind_near_lane_time_set1',
    'bashin_diff_behind_all', 'bashin_diff_infront_all'
  ];

  for (const p of parts) {
    const match = p.match(/^([a-zA-Z0-9_]+)(>=|<=|==|!=|>|<)([-0-9.]+)$/);
    if (!match) continue;
    const key = match[1], op = match[2], val = parseFloat(match[3]);

    if (positionalKeys.includes(key)) {
      tooltips.push(p);
      continue;
    }

    if (key === 'distance_rate' || key === 'remain_distance') {
      if (!conditions[key]) conditions[key] = [];
      conditions[key].push(op + val);
    } else if (key === 'phase') {
      if (!conditions[key]) conditions[key] = [];
      conditions[key].push(op + val);
    } else if (op === '==') {
      conditions[key] = val;
    } else if (op === '!=') {
      if (key === 'corner' && val === 0) conditions.corner = 0;
    }
  }

  if (conditions.distance_rate && conditions.distance_rate.length === 1) conditions.distance_rate = conditions.distance_rate[0];
  if (conditions.remain_distance && conditions.remain_distance.length === 1) conditions.remain_distance = conditions.remain_distance[0];
  if (conditions.phase && conditions.phase.length === 1) conditions.phase = conditions.phase[0];
  
  return { conditions, tooltip: tooltips.join(', ') };
}

// Map Gametora rarity numbers to UMA emulator rarities strings (rough generic check)
function getUmaRarity(ghRarity, id) {
   if (ghRarity === 6) return 'evo';
   if (ghRarity === 5) return 'unique';
   // "rare" vs "normal" vs "double" passives
   if (ghRarity === 4 || ghRarity === 3) {
      // 4 typically gold (rare) in GH? 
      if (ghRarity === 4 || id > 100000) return 'rare';
      return 'normal';
   }
   if (ghRarity === 2 || ghRarity === 1) {
      if (ghRarity === 2) return 'rare';
      if (id % 10 === 1) return 'double';
      return 'normal';
   }
   return 'normal';
}

const skillGroups = [];
const uniqueSkillData = [];
const visited = new Set();

for (const gtSkill of gametoraData) {
    if (visited.has(gtSkill.id)) continue;
    let familyIds = gtSkill.versions && gtSkill.versions.length > 0 ? [...gtSkill.versions] : [gtSkill.id];
    
    // Fallbacks just in case versions array in GT hides the exact ID
    if (!familyIds.includes(gtSkill.id)) familyIds.push(gtSkill.id);
    
    familyIds.sort((a,b) => a - b);
    let variants = [];
    let commonCondition = null;
    let overallType = 'unknown';
    
    let isUniqueGroup = false;

    for (const vid of familyIds) {
        visited.add(vid);
        const gh = githubData[String(vid)];
        if (!gh) continue;
        
        const alt = gh.alternatives && gh.alternatives[0] ? gh.alternatives[0] : null;
        if (!commonCondition && alt) {
            commonCondition = alt.condition;
        }

        const eff = alt ? parseEffects(alt.effects) : { result: {}, type: 'unknown' };
        if (eff.type !== 'unknown') overallType = eff.type;
        
        let rarityStr = getUmaRarity(gh.rarity, vid);
        if (rarityStr === 'unique') {
            isUniqueGroup = true;
            // Uniques map straight to uniqueSkillData instead of grouped arrays
            uniqueSkillData.push({
                id: vid,
                holder: gtSkill.char && gtSkill.char[0] ? gtSkill.char[0] : null,
                name: gh.name_ja || gtSkill.jpname,
                name_en: gh.name_en,
                name_zh: gh.name_zh,
                ...eff.result,
                duration: alt ? alt.baseDuration / 10000 : 0, 
                tooltip: parseCondition(alt ? alt.condition : '').tooltip,
                conditions: parseCondition(alt ? alt.condition : '').conditions,
                type: 'unique'
            });
            continue;
        }
        
        variants.push({
            rarity: rarityStr,
            id: vid,
            name: gh.name_ja || gtSkill.jpname,
            name_en: gh.name_en,
            name_zh: gh.name_zh,
            ...eff.result,
            duration: alt ? alt.baseDuration / 10000 : 0,
            tooltip: parseCondition(alt ? alt.condition : '').tooltip,
            holder: gh.rarity === 6 && gtSkill.char && gtSkill.char.length > 0 ? gtSkill.char[0] : undefined
        });
    }
    
    if (variants.length > 0) {
        skillGroups.push({
            type: overallType,
            variants,
            conditions: parseCondition(commonCondition).conditions,
            ...((parseCondition(commonCondition).tooltip !== '') && {tooltip: parseCondition(commonCondition).tooltip})
        });
    }
}

// Dump files
const outPath = path.join(__dirname, '../../src/components/data/skillDataGen.js');
let genContent = `// AUTO-GENERATED BY tools/skill-updater/generateSkills.js\n\n`;
genContent += `export const normalSkillData = ${JSON.stringify(skillGroups, null, 2)};\n\n`;
genContent += `export const uniqueSkillData = ${JSON.stringify(uniqueSkillData, null, 2)};\n`;

fs.writeFileSync(outPath, genContent, 'utf8');
console.log('Skill generation complete. Wrote to: ' + outPath);
