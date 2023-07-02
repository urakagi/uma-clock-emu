const distance = 3200;

const midSpeed = 18.64;
const spurtSpeed = 22.97;
const skillSpeed = 0.25;
const duration = 5 * (distance / 1000);
const midStart = distance / 6;
const spurtStart = distance * (2 / 3);
const midDistance = distance / 2;
const baseAcc = 0.412;
const skillAcc = 0.3;
const originalAccTime = (spurtSpeed - midSpeed) / baseAcc;
const originalAccEndAt =
  spurtStart + ((midSpeed + spurtSpeed) * originalAccTime) / 2;

const TRIAL = 100000;
// const TRIAL = 10;

// exec(0, 3, 2, false, 800);

console.log("wis 7 f r s * act mid con exp mid-only exp-con con-max con-min");
for (let f = 0; f <= 2; f++) {
  for (let r = 3; r <= 4; r++) {
    for (let s = 0; s <= 0; s++) {
      for (const s777 of [false]) {
        for (const star of [true, false]) {
          for (const wis of [1000]) {
            exec(f, r, s, s777, star, wis);
          }
        }
      }
    }
  }
}

function exec(f, r, s, s777, star, wis) {
  const prob = 90 / wis;
  let sum = 0;
  let connectedSum = 0;
  let connectedMax = 0;
  let connectedMin = distance;
  let connected = 0;
  let activated = 0;
  let midActivated = 0;
  let midSum = 0;
  for (let trial = 0; trial < TRIAL; trial++) {
    let eff = 0;
    const triggers = [];
    for (let i = 0; i < f; i++) {
      if (Math.random() > prob) {
        triggers.push(distance / 2);
      }
    }
    for (let i = 0; i < r; i++) {
      if (Math.random() > prob) {
        triggers.push(midStart + Math.random() * midDistance);
      }
    }
    for (let i = 0; i < s; i++) {
      if (Math.random() > prob) {
        const straight = Math.random();
        if (straight < 1 / 3) {
          triggers.push(1250);
        } else if (straight < 2 / 3) {
          triggers.push(1375 + Math.random() * 325);
        } else {
          triggers.push(2200 + Math.random() * 300);
        }
      }
    }
    if (s777) {
      if (Math.random() > prob) {
        triggers.push(distance - 777);
      }
    }
    if (star) {
      triggers.push(distance / 2 + Math.random() * distance);
    }
    if (triggers.length < 3) {
      continue;
    }
    activated++;
    triggers.sort((a, b) => (a < b ? -1 : 1));
    const pos = triggers[2];
    if (pos > spurtStart) {
      if (pos < originalAccEndAt) {
        // 加速段開
        const d1 = pos - spurtStart;
        const t1 =
          (-2 * midSpeed +
            Math.sqrt(4 * midSpeed * midSpeed + 8 * baseAcc * d1)) /
          (2 * baseAcc);
        const v1 = midSpeed + baseAcc * t1;
        const t2 = (spurtSpeed + skillSpeed - v1) / (baseAcc + skillAcc);
        const d2 = ((v1 + spurtSpeed + skillSpeed) * t2) / 2;
        const d3 = (duration - t1 - t2) * (spurtSpeed + skillSpeed);
        const o1 = ((midSpeed + spurtSpeed) * originalAccTime) / 2;
        const o2 = (duration - originalAccTime) * spurtSpeed;
        eff = d1 + d2 + d3 - o1 - o2;
      } else {
        // 加速完才開
        eff =
          Math.min((distance - pos) / (spurtSpeed + skillSpeed), duration) *
          skillSpeed;
      }
    } else {
      // 中期開
      midActivated++;
      const spdTime = (spurtStart - pos) / (midSpeed + skillSpeed);
      if (spdTime > duration) {
        // 沒存速
        eff = (duration * skillSpeed * spurtSpeed) / midSpeed;
      } else {
        // 有存速
        connected++;
        eff = spdTime * skillSpeed;
        const accTime = duration - spdTime;
        const maxAccTime = (spurtSpeed - midSpeed) / (baseAcc + skillAcc);
        if (accTime > maxAccTime) {
          // 超出加速段
          const d1 = ((spurtSpeed + skillSpeed + midSpeed) * maxAccTime) / 2;
          const d2 = (spurtSpeed + skillSpeed) * (accTime - maxAccTime);
          if (accTime > originalAccTime) {
            const o1 = (originalAccTime * (spurtSpeed + midSpeed)) / 2;
            const o2 = spurtSpeed * (accTime - originalAccTime);
            eff += d1 + d2 - o1 - o2;
            if (eff < 3) {
              console.log({ eff, d1, d2, o1, o2 });
            }
          } else {
            const d3 = (originalAccTime - accTime) * spurtSpeed;
            const o = (originalAccTime * (spurtSpeed + midSpeed)) / 2;
            eff += d1 + d2 + d3 - o;
          }
        } else {
          // 加速途中效果結束
          const v1 = midSpeed + skillSpeed + accTime * (baseAcc + skillAcc);
          const d1 = ((v1 + midSpeed + skillSpeed) * accTime) / 2;
          const t2 = (spurtSpeed - v1) / baseAcc;
          const d2 = ((v1 + spurtSpeed) * t2) / 2;
          const d3 = spurtSpeed * (originalAccTime - accTime - t2);
          const o = ((midSpeed + spurtSpeed) * originalAccTime) / 2;
          eff += d1 + d2 + d3 - o;
        }
        connectedSum += eff;
        if (eff > connectedMax) {
          connectedMax = eff;
        }
        if (eff < connectedMin) {
          connectedMin = eff;
        }
      }
      midSum += eff;
    }
    sum += eff;
  }
  // console.log(`${f}F ${r}R ${s}S ${wis >= 1000 ? '' : ' '}${wis}|${(sum / connected).toFixed(2)}|${(connected * 100 / TRIAL).toFixed(2)}%|`);
  console.log(
    `${f} ${r} ${star ? 1 : 0} ` +
      // `${wis} ${s777 ? 1 : 0} ${f} ${r} ${s} ${star ? 1 : 0} ` +
      `${((activated * 100) / TRIAL).toFixed(2)}% ` +
      `${((midActivated * 100) / TRIAL).toFixed(2)}% ` +
      `${((connected * 100) / TRIAL).toFixed(2)}% ` +
      `${(sum / 2.5 / TRIAL).toFixed(2)} ` +
      `${(midSum / 2.5 / TRIAL).toFixed(2)} ` +
      `${connected === 0 ? 0 : (connectedSum / 2.5 / connected).toFixed(2)} `
    // `${(connectedMax / 2.5).toFixed(2)} ` +
    // `${connectedMin > 50 ? 0 : (connectedMin / 2.5).toFixed(2)} `
  );
}
