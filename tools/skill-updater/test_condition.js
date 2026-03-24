function parseCondition(conditionStr) {
  if (!conditionStr) return { conditions: {}, tooltip: '' };

  // Some alternates are split by '@' (OR). UMA-Clock-Emu usually just takes the first OR, or combines them. Let's take the first one for simplicity, or try to merge.
  // Actually, UMA uses `invokes: []` for OR conditions if they do different things, 
  // but if it's just "order 1 or order 2", since order is ignored, we can just parse the first side.
  const firstOr = conditionStr.split('@')[0];
  const parts = firstOr.split('&');
  
  const conditions = {};
  const tooltips = [];

  const positionalKeys = [
    'order', 'order_rate', 'bashin_diff_infront', 'bashin_diff_behind',
    'is_overtake', 'blocked_side_continuetime', 'blocked_front',
    'change_order_onetime', 'change_order_up_end_after', 'near_count',
    'temptation_count', 'is_behind_in', 'order_rate_in20_continue'
  ];

  for (const p of parts) {
    // Parse key and value e.g. distance_rate>=50
    const match = p.match(/^([a-zA-Z0-9_]+)(>=|<=|==|!=|>|<)([-0-9.]+)$/);
    if (!match) continue;
    
    const key = match[1];
    const op = match[2];
    const val = parseFloat(match[3]);

    if (positionalKeys.includes(key)) {
      tooltips.push(p);
      continue;
    }

    // Programmatic conditions mapping
    if (key === 'distance_rate' || key === 'remain_distance') {
      if (!conditions[key]) conditions[key] = [];
      conditions[key].push(op + val);
    } else if (key === 'phase') {
      if (!conditions[key]) conditions[key] = [];
      conditions[key].push(op + val);
    } else if (op === '==') {
      conditions[key] = val;
    } else if (op === '!=') {
      // UMA clock rarely uses != except corner!=0 -> corner:0 mapping in UMA is !thiz.isInCorner()
      // Let's just store it as string if needed, or map specific ones
      if (key === 'corner' && val === 0) conditions.corner = 0;
    }
  }

  // Simplify arrays
  if (conditions.distance_rate && conditions.distance_rate.length === 1) {
     conditions.distance_rate = conditions.distance_rate[0];
  }
  if (conditions.remain_distance && conditions.remain_distance.length === 1) {
     conditions.remain_distance = conditions.remain_distance[0];
  }
  if (conditions.phase && conditions.phase.length === 1) {
     conditions.phase = conditions.phase[0];
  } else if (conditions.phase && conditions.phase.length > 1) {
     // Usually >=2 and <=3, UMA might not natively support arrays for phase. 
     // Wait, phase is evaluated as a string like ">=2", let's leave it as array of strings or take the most restrictive
     conditions.phase = conditions.phase[0]; 
  }

  return {
    conditions,
    tooltip: tooltips.join(', ')
  };
}

console.log(parseCondition("phase>=2&is_finalcorner==1&order<=4&overtake_target_time>=1"));
console.log(parseCondition("distance_rate>=50&distance_rate<=60&order_rate>50"));
console.log(parseCondition("is_finalcorner==1&blocked_side_continuetime>=2&order<=3"));
