// ================= EPISODE 5: "Treći challenge" =================
const fmt = v => v.toFixed(2).replace(/\B(?=(\d{3})+\.)/g, ',');
const E0 = {bl: 0.1, br: 0.1, tilt: 0, smile: 0.1, sweat: 0, gx: -0.9, gy: 0, yaw: 0.25, pitch: 0.05, lean: 0.05};
const ex = o => ({...E0, ...o});
const LOOKPHONE = ex({gx: -0.2, gy: -0.4, pitch: 0.12, yaw: 0.45});
// montage: loops of [buy, revenge, failed]
const LOOPS = [[2.8, 0.85], [5.35, 0.55], [7.0, 0.32]]; // start, segment length
const MONT_END = 7.0 + 0.32 * 3; // 7.96
function montage(T) { for (let n = 2; n >= 0; n--) { const [s, d] = LOOPS[n]; if (T >= s) { const k = Math.min(2, Math.floor((T - s) / d)); return {n, seg: k, u: (T - s - k * d) / d, d}; } } return null; }
const tr = [{t: 0, ...P('desk', 'mouse'), e: ex({smile: 0.5, bl: 0.4, br: 0.4})}];
for (const [s, d] of LOOPS) {
  tr.push({t: s, ...P('desk', 'mouse'), e: ex({smile: 0.6, bl: 0.5, br: 0.5, lean: 0.12})});
  tr.push({t: s + d * 1.0, ...P('desk', 'mouse'), e: ex({smile: -0.3, bl: 0.7, br: 0.7, tilt: 0.6, lean: 0.2, sweat: 0.8})});
  tr.push({t: s + d * 2.1, ...P('head'), e: ex({smile: -0.6, bl: 1, br: 1, tilt: 0.85, sweat: 1, lean: 0.04, yaw: 0.35})});
  tr.push({t: s + d * 2.9, ...P('head'), e: ex({smile: -0.6, bl: 1, br: 1, tilt: 0.85, sweat: 1, lean: 0.04, yaw: 0.35})});
}
tr.push({t: 8.3, ...P('desk'), e: ex({smile: -0.25, bl: -0.1, br: -0.1, gx: 0.6, gy: 0.05, yaw: 0.95, pitch: 0, lean: 0})});
tr.push({t: 9.1, ...P('desk'), e: ex({smile: -0.25, bl: -0.1, br: -0.1, gx: 0.6, gy: 0.05, yaw: 0.95, pitch: 0, lean: 0})});
tr.push({t: 9.5, ...P('desk'), e: LOOKPHONE}, {t: 11.6, ...P('desk'), e: LOOKPHONE});
tr.push({t: 12.0, ...P('desk', 'mouse'), e: ex({smile: 0.3, bl: 0.3, br: 0.3, lean: 0.08})});
tr.push({t: 14.6, ...P('rest', 'mouse'), e: ex({smile: 0.6, bl: 0.3, br: 0.3, lean: -0.05})});
tr.push({t: 15.2, ...P('rest', 'mouse'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.06, gx: 0.5, yaw: 0.85, pitch: 0})});
tr.push({t: 17, ...P('rest', 'mouse'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.06, gx: 0.5, yaw: 0.85, pitch: 0})});
TRACKS.DT = tr.sort((a, b) => a.t - b.t);
handMug2.visible = false; puddle.visible = false;
function cursor(g, x, y) { g.save(); g.translate(x, y); g.fillStyle = '#fff'; g.strokeStyle = '#000'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 30); g.lineTo(8, 23); g.lineTo(14, 36); g.lineTo(19, 33); g.lineTo(13, 21); g.lineTo(23, 21); g.closePath(); g.fill(); g.stroke(); g.restore(); }
function ctr(g, txt, x, y, font, col) { g.font = font; g.fillStyle = col; g.textAlign = 'center'; g.fillText(txt, x, y); g.textAlign = 'left'; }
function pDump(u) { return 2350 + Math.sin(u * 13) * 0.4 - 9 * sm(u * 1.2); }
function pCalm(m) { return 2342 + Math.sin(m * 1.7) * 0.6 + Math.sin(m * 4.3 + 1) * 0.25 + 1.5 * sm((m - 12) / 3); }
function chart(g, w, h, pf, m, lo, hi, step = 0.22) {
  g.fillStyle = '#0b1220'; g.fillRect(0, 0, w, h); g.strokeStyle = '#162033'; g.lineWidth = 1; for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
  const Y = p => 40 + (hi - p) / (hi - lo) * (h - 70), cw = 15, x0 = w - 120, kk = m / step, k = Math.floor(kk), fr = kk - k;
  for (let i = 0; i < 44; i++) { const idx = k - i, a = idx * step, b = Math.min(m, (idx + 1) * step), o = pf(a), c = pf(b); let hp = Math.max(o, c), lp2 = Math.min(o, c);
    for (let s = 0; s <= 5; s++) { const pp = pf(a + (b - a) * s / 5); hp = Math.max(hp, pp); lp2 = Math.min(lp2, pp); }
    const x = x0 - (i + fr) * cw - cw * 0.5; g.strokeStyle = g.fillStyle = c >= o ? '#21c17a' : '#ef4b57'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, Y(hp + 0.15)); g.lineTo(x, Y(lp2 - 0.15)); g.stroke(); g.fillRect(x - 5, Math.min(Y(o), Y(c)), 10, Math.max(2, Math.abs(Y(o) - Y(c)))); }
  g.fillStyle = '#6f8aa8'; g.font = 'bold 22px monospace'; g.fillText('XAUUSD · M1', 14, 28); return Y;
}
let MODE = 'shop';
function drawScreens(T) {
  const A = screens.A, g = A.g, w = A.c.width, h = A.c.height, mt = montage(T);
  MODE = T < 2.8 ? 'shop' : (T < MONT_END ? ['buy', 'rev', 'fail'][mt.seg] : 'plan');
  if (MODE === 'shop') {
    const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#10213f'); gr.addColorStop(1, '#173a5e'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    ctr(g, 'PROP CHALLENGE', w / 2, 90, '900 50px sans-serif', '#fff'); ctr(g, 'Račun $10.000', w / 2, 140, 'bold 30px sans-serif', '#9fd0ff');
    ctr(g, '99 €', w / 2, 230, '900 70px sans-serif', '#ffd34a');
    const pu = 1 + Math.sin(T * 6) * 0.04; g.save(); g.translate(w / 2, 320); g.scale(pu, pu); g.fillStyle = '#21c17a'; g.fillRect(-150, -34, 300, 68); ctr(g, 'KUPI', 0, 12, '900 36px sans-serif', '#fff'); g.restore();
    if (T > 1.8) { const q = ease((T - 1.8) / 0.8); cursor(g, lerp(w * 0.8, w / 2 + 30, q), lerp(h * 0.95, 320, q)); }
  } else if (MODE === 'buy') {
    g.fillStyle = '#f2f4f8'; g.fillRect(0, 0, w, h); ctr(g, 'KUPLJENO ✓', w / 2, 170, '900 64px sans-serif', '#21a06a');
    ctr(g, `Challenge #${mt.n + 1}  ·  -99 €`, w / 2, 240, 'bold 34px sans-serif', '#1b2233'); ctr(g, 'Sretno!', w / 2, 300, 'bold 26px sans-serif', '#7a8296');
  } else if (MODE === 'rev') {
    const Y = chart(g, w, h, u => pDump(u / 4), mt.u * 4 + 1, 2336, 2354, 0.12);
    g.fillStyle = '#ef4b57'; g.font = '900 30px sans-serif'; g.fillText('REVENGE TRADE x' + (mt.n + 2), 14, h - 24);
  } else if (MODE === 'fail') {
    g.fillStyle = (Math.floor(T * 8) % 2) ? '#5a0a14' : '#2a0508'; g.fillRect(0, 0, w, h);
    ctr(g, 'ACCOUNT', w / 2, 160, '900 74px sans-serif', '#ff3b4a'); ctr(g, 'FAILED', w / 2, 240, '900 74px sans-serif', '#ff3b4a');
    ctr(g, `Challenge #${mt.n + 1} · Daily drawdown`, w / 2, 310, 'bold 28px monospace', '#ffb3b8');
  } else {
    const Y = chart(g, w, h, pCalm, T, 2332, 2352);
    const a = clamp((T - 12.0) / 0.4); if (a > 0) { g.globalAlpha = a; g.fillStyle = 'rgba(20,28,44,0.95)'; g.fillRect(w - 340, 44, 310, 150);
      g.fillStyle = '#9fb4cc'; g.font = 'bold 20px sans-serif'; g.fillText('Kalkulator rizika', w - 325, 74);
      g.fillStyle = '#fff'; g.font = 'bold 24px monospace'; g.fillText('Rizik: 0,5% = $50', w - 325, 112); g.fillText('SL: 6$ → Lot 0.08', w - 325, 148);
      g.fillStyle = '#21c17a'; g.font = 'bold 22px monospace'; g.fillText('✓ Plan postavljen', w - 325, 182); g.globalAlpha = 1; }
  }
  A.t.needsUpdate = true;
  const B = screens.B, q = B.g, bw = B.c.width, bh = B.c.height;
  if (MODE === 'plan') {
    q.fillStyle = '#0d1320'; q.fillRect(0, 0, bw, bh); q.fillStyle = '#6f8aa8'; q.font = 'bold 24px monospace'; q.fillText('CHALLENGE #4', 20, 40);
    const day = T < 12.6 ? 1 : (T < 13.4 ? 5 : 12); q.fillStyle = '#fff'; q.font = 'bold 40px monospace'; q.fillText('Dan ' + day, 20, 110);
    q.fillStyle = '#21c17a'; q.font = 'bold 34px monospace'; q.fillText('✓ RAČUN AKTIVAN', 20, 180);
    q.fillStyle = '#9fb4cc'; q.font = '26px monospace'; q.fillText('Daily DD: unutar pravila', 20, 250); q.fillText('Rizik po trejdu: 0,5%', 20, 300);
  } else {
    q.fillStyle = MODE === 'fail' ? '#3a0a12' : '#0d1320'; q.fillRect(0, 0, bw, bh); q.fillStyle = '#6f8aa8'; q.font = 'bold 24px monospace'; q.fillText('POTROŠENO NA CHALLENGE', 20, 40);
    const n = T < 2.8 ? 0 : mt.n + 1; q.fillStyle = n ? '#ef4b57' : '#fff'; q.font = 'bold 60px monospace'; q.fillText('-' + (n * 99) + ' €', 20, 130);
  }
  B.t.needsUpdate = true; drawClock(16, 5 + Math.floor(T * 0.8));
}
function setWorld(T) { animChar(DT, 'DT', T, 0); drawScreens(T); }
const WIDE = {pos: [DX + 3.2, 2.4, 3.4], target: [DX - 0.1, 1.0, 0.1], hh: 1.55};
const WIDE2 = {pos: [DX + 3.2, 2.35, 3.4], target: [DX - 0.05, 1.05, 0.08], hh: 1.38};
const scrA = new THREE.Vector3(DX - 0.62, 1.12, -0.42), nA = new THREE.Vector3(Math.sin(Math.PI / 2 - 0.38), 0, Math.cos(Math.PI / 2 - 0.38));
const MON1 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.toArray(), hh: 0.62};
const MON2 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.toArray(), hh: 0.58};
const FAIL1 = {pos: [DX + 3.0, 2.2, 3.0], target: [DX - 0.1, 1.05, 0.0], hh: 1.15};
const FAIL2 = {pos: [DX + 3.0, 2.2, 3.0], target: [DX - 0.05, 1.0, 0.0], hh: 1.05};
const FACE1 = {pos: [DX - 0.25, 1.7, 3.0], target: [DX + 0.15, 1.3, 0.0], hh: 0.75};
const FACE2 = {pos: [DX - 0.25, 1.7, 3.0], target: [DX + 0.22, 1.42, 0.02], hh: 0.5};
const RLX1 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.0, 1.1, 0.05], hh: 1.3};
const RLX2 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.15, 1.2, 0.05], hh: 1.05};
function counterBig(T, t0, txt) { caption(T, t0, t0 + 0.75, [txt], 420, 120, '#ffd34a'); }

window.renderFrame = i => {
  const T = i / FPS;
  if (T < 2.8) { setWorld(T); renderShot(WIDE, WIDE2, T / 2.8, T); hookBox(T, 0.15, 2.7, ['Kupujem treći prop', 'challenge ovaj mjesec'], 400); }
  else if (T < MONT_END) {
    setWorld(T); const mt = montage(T);
    if (mt.seg < 2) renderShot(MON1, MON2, mt.u, T); else renderShot(FAIL1, FAIL2, mt.u, T, 0.6 * (1 - mt.u));
    if (mt.seg === 2) { ctx.fillStyle = `rgba(230,30,50,${0.22 * (1 - mt.u * 0.5)})`; ctx.fillRect(0, 0, W, H); }
    const [s] = LOOPS[mt.n]; caption(T, s, s + LOOPS[mt.n][1] * 3 - 0.02, ['#' + (mt.n + 1)], 380, 130, '#ffd34a');
    if (mt.n === 2) caption(T, 7.0, MONT_END, ['I OPET.'], 1500, 90);
  } else if (T < 9.3) { setWorld(T); renderShot(FACE1, FACE2, (T - MONT_END) / (9.3 - MONT_END), T); caption(T, 8.4, 9.3, ['-297 €.'], 1500, 96, '#ff5a6a'); }
  else if (T < 11.8) {
    setWorld(T); renderShot(WIDE2, WIDE2, 0, T);
    phoneScene(T, 9.3, [{at: 0.5, title: 'ANALIZA DANA · GOLD', lines: ['Bias: bullish', 'iznad 2335.', 'Čekamo NY sesiju.', 'Rizik: max 0,5%.'], time: '08:45'}], true);
    fadeIn(T, 9.3, 0.15, '255,255,255');
  } else if (T < 15.6) {
    setWorld(T); renderShot(RLX1, RLX2, (T - 11.8) / 3.8, T);
    counterBig(T, 12.0, 'DAN 1'); counterBig(T, 12.8, 'DAN 5'); caption(T, 13.6, 15.6, ['DAN 12'], 420, 120, '#21c17a');
    caption(T, 14.1, 15.6, ['PRVO PLAN, PA KLIK.'], 1480, 88, '#ffd34a');
  } else { endCard(T, 15.6); fadeIn(T, 15.6, 0.2); }
  return OUT.toDataURL('image/jpeg', 0.92);
};
Promise.all([document.fonts.load('900 40px Mont'), document.fonts.load('700 40px Mont'), document.fonts.load('900 40px Orb'), document.fonts.load('900 40px Mont', 'ČĆŠŽĐ')]).then(() => { window.ready = true; });
