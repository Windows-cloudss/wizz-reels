// ================= EPISODE 4: "Signal od rođaka" =================
const fmt = v => v.toFixed(2).replace(/\B(?=(\d{3})+\.)/g, ',');
const E0 = {bl: 0.1, br: 0.1, tilt: 0, smile: 0.1, sweat: 0, gx: -0.9, gy: 0, yaw: 0.25, pitch: 0.05, lean: 0.05};
const ex = o => ({...E0, ...o});
const LOOKPHONE = ex({gx: -0.2, gy: -0.4, pitch: 0.12, yaw: 0.45});
const nods = []; for (let t = 15.2; t < 16.6; t += 0.32) nods.push({t, ...P('rest', 'mouse'), e: ex({smile: 0.6, bl: 0.4, br: 0.4, lean: -0.04, pitch: (Math.round((t - 15.2) / 0.32) % 2) ? 0.16 : -0.02})});
TRACKS.DT = [
  {t: 0, ...P('type'), e: ex({})},
  {t: 2.6, ...P('type'), e: ex({bl: 0.3, br: 0.3})},
  {t: 3.2, ...P('desk'), e: LOOKPHONE}, {t: 5.6, ...P('desk'), e: LOOKPHONE},
  {t: 5.9, ...P('desk', 'mouse'), e: ex({smile: 0.8, bl: 0.6, br: 0.6, lean: 0.16})},
  {t: 6.6, ...P('desk', 'mouse'), e: ex({smile: 1.0, bl: 0.7, br: 0.7, lean: 0.18})},
  {t: 7.7, ...P('desk', 'mouse'), e: ex({smile: 0.0, bl: 0.4, br: 0.4, tilt: 0.4, lean: 0.18, sweat: 0.5})},
  {t: 8.5, ...P('head'), e: ex({smile: -0.6, bl: 1, br: 1, tilt: 0.85, sweat: 1, lean: 0.04, yaw: 0.35})},
  {t: 9.3, ...P('head'), e: ex({smile: -0.7, bl: 1, br: 1, tilt: 0.85, sweat: 1, lean: 0.04, yaw: 0.35})},
  {t: 9.9, ...P('facedown'), e: ex({bl: 0.6, br: 0.6, smile: -0.4, tilt: 0.6, sweat: 1, lean: 0.55, pitch: 0.4, yaw: 0.3, gy: -0.6})},
  {t: 10.2, ...P('desk'), e: LOOKPHONE}, {t: 14.8, ...P('desk'), e: LOOKPHONE},
  ...nods,
  {t: 16.9, ...P('rest', 'mouse'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.06, gx: 0.5, yaw: 0.85, pitch: 0})},
  {t: 18, ...P('rest', 'mouse'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.06, gx: 0.5, yaw: 0.85, pitch: 0})}
];
handMug2.visible = false; puddle.visible = false;
const ENTRY_T = 6.5, MC_T = 9.0;
function p1(m) { const n = Math.sin(m * 2.1) * 0.35 + Math.sin(m * 5.3 + 1) * 0.18 + Math.sin(m * 11.7 + 2) * 0.08; return 2350 + n - 20 * sm((m - 6.9) / 2.3); }
function p2(m) { const n = Math.sin(m * 1.7) * 0.4 + Math.sin(m * 4.3 + 1) * 0.2; return 2342 + n + 2.5 * sm((m - 15) / 2); }
const ENTRY = p1(ENTRY_T);
function cursor(g, x, y) { g.save(); g.translate(x, y); g.fillStyle = '#fff'; g.strokeStyle = '#000'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 30); g.lineTo(8, 23); g.lineTo(14, 36); g.lineTo(19, 33); g.lineTo(13, 21); g.lineTo(23, 21); g.closePath(); g.fill(); g.stroke(); g.restore(); }
function candles(g, w, h, m, pf, lo, hi) {
  const Y = p => 40 + (hi - p) / (hi - lo) * (h - 70), step = 0.22, cw = 15, x0 = w - 120, kk = m / step, k = Math.floor(kk), fr = kk - k;
  for (let i = 0; i < 44; i++) {
    const idx = k - i, a = idx * step, b = Math.min(m, (idx + 1) * step), o = pf(a), c = pf(b); let hp = Math.max(o, c), lp2 = Math.min(o, c);
    for (let s = 0; s <= 6; s++) { const pp = pf(a + (b - a) * s / 6); hp = Math.max(hp, pp); lp2 = Math.min(lp2, pp); }
    const x = x0 - (i + fr) * cw - cw * 0.5; g.strokeStyle = g.fillStyle = c >= o ? '#21c17a' : '#ef4b57'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x, Y(hp + 0.15)); g.lineTo(x, Y(lp2 - 0.15)); g.stroke(); g.fillRect(x - 5, Math.min(Y(o), Y(c)), 10, Math.max(2, Math.abs(Y(o) - Y(c))));
  }
  return Y;
}
function drawScreens(T) {
  const A = screens.A, g = A.g, w = A.c.width, h = A.c.height, mc = T >= MC_T && T < 14.8;
  g.fillStyle = '#0b1220'; g.fillRect(0, 0, w, h); g.strokeStyle = '#162033'; g.lineWidth = 1;
  for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
  g.fillStyle = '#6f8aa8'; g.font = 'bold 22px monospace'; g.fillText('XAUUSD · M1', 14, 28);
  const tag = (Y, pp, col, label) => { g.setLineDash([10, 6]); g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); g.moveTo(0, Y(pp)); g.lineTo(w - 112, Y(pp)); g.stroke(); g.setLineDash([]); g.fillStyle = col; g.fillRect(w - 112, Y(pp) - 13, 112, 26); g.fillStyle = '#fff'; g.font = 'bold 17px monospace'; g.fillText(label, w - 106, Y(pp) + 6); };
  if (T < 14.8) {
    const Y = candles(g, w, h, T, p1, 2326, 2356);
    if (T < ENTRY_T + 0.4) { // order panel
      g.fillStyle = 'rgba(20,28,44,0.95)'; g.fillRect(w - 330, 40, 300, 160); g.fillStyle = '#9fb4cc'; g.font = 'bold 20px sans-serif'; g.fillText('Volumen (lot)', w - 315, 72);
      const k = ease(clamp((T - 5.75) / 0.55)), lot = lerp(0.1, 5.0, k);
      g.fillStyle = '#2b3a55'; g.fillRect(w - 315, 92, 260, 8); g.fillStyle = k > 0.95 ? '#ef4b57' : '#4aa8ff'; g.fillRect(w - 315, 92, 260 * k, 8);
      g.beginPath(); g.arc(w - 315 + 260 * k, 96, 12, 0, 7); g.fill(); g.fillStyle = '#fff'; g.font = 'bold 24px monospace'; g.fillText(lot.toFixed(2) + (k > 0.95 ? '  MAX' : ''), w - 315, 135);
      const fl = T >= ENTRY_T && T < ENTRY_T + 0.25; g.fillStyle = fl ? '#7dffb9' : '#21c17a'; g.fillRect(w - 315, 150, 260, 40); g.fillStyle = '#fff'; g.font = '900 22px sans-serif'; g.fillText('BUY  ·  BEZ SL', w - 268, 178);
      if (T > 5.6) { const cx = T < 6.3 ? w - 315 + 260 * k : lerp(w - 55, w - 185, ease((T - 6.3) / 0.18)), cy = T < 6.3 ? 100 : lerp(100, 170, ease((T - 6.3) / 0.18)); cursor(g, cx, cy); }
    }
    if (T >= ENTRY_T && !mc) { tag(Y, ENTRY, '#4aa8ff', 'BUY 5.00'); const pnl = (p1(T) - ENTRY) * 500; g.fillStyle = pnl < 0 ? '#ef4b57' : '#21c17a'; g.font = 'bold 30px monospace'; g.fillText((pnl < 0 ? '-$' : '+$') + fmt(Math.abs(pnl)), 14, h - 22); g.fillStyle = '#ef4b57'; g.font = 'bold 22px sans-serif'; g.fillText('SL: NEMA', 14, h - 60); }
    if (mc) { g.fillStyle = `rgba(220,30,50,${0.5 + 0.2 * Math.sin(T * 12)})`; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.font = '900 72px sans-serif'; g.textAlign = 'center'; g.fillText('MARGIN CALL', w / 2, h / 2 + 10); g.font = 'bold 34px monospace'; g.fillText('Račun: $' + fmt(Math.max(0, 10000 + (p1(MC_T) - ENTRY) * 500)), w / 2, h / 2 + 64); g.textAlign = 'left'; }
  } else {
    const Y = candles(g, w, h, T, p2, 2332, 2360);
    const a = clamp((T - 15.0) / 0.4); g.globalAlpha = a;
    tag(Y, 2355, '#21c17a', 'TP 2355'); tag(Y, 2342, '#4aa8ff', 'ULAZ 2342'); tag(Y, 2336, '#ef4b57', 'SL 2336');
    g.fillStyle = 'rgba(74,168,255,0.25)'; g.fillRect(w * 0.35, Y(2344.5), 150, Y(2341.5) - Y(2344.5)); g.fillStyle = '#9fd0ff'; g.font = '900 22px sans-serif'; g.fillText('FVG', w * 0.35 + 8, Y(2344.5) + 22);
    g.fillStyle = '#ffd34a'; g.font = '900 24px sans-serif'; g.fillText('CHoCH', w * 0.18, Y(2346.5) - 8); g.globalAlpha = 1;
  }
  A.t.needsUpdate = true;
  const B = screens.B, q = B.g, bw = B.c.width, bh = B.c.height;
  q.fillStyle = mc ? '#3a0a12' : '#0d1320'; q.fillRect(0, 0, bw, bh); q.fillStyle = '#6f8aa8'; q.font = 'bold 24px monospace'; q.fillText('ACCOUNT', 20, 40);
  let eq = 10000; if (T >= ENTRY_T && T < 14.8) eq = Math.max(0, 10000 + (p1(Math.min(T, MC_T)) - ENTRY) * 500);
  q.font = '28px monospace'; q.fillStyle = '#9fb4cc'; q.fillText('Equity', 20, 110); q.textAlign = 'right'; q.font = 'bold 40px monospace'; q.fillStyle = eq < 9999 ? '#ef4b57' : '#21c17a'; q.fillText('$' + fmt(eq), bw - 20, 112); q.textAlign = 'left';
  q.fillStyle = '#6f8aa8'; q.font = 'bold 24px monospace'; q.fillText(T >= 14.8 ? 'Rizik po trejdu: 1%' : (T >= ENTRY_T ? 'BUY 5.00 · bez stop lossa' : 'Nema otvorenih pozicija'), 20, 200);
  B.t.needsUpdate = true; drawClock(15, 20 + Math.floor(T * 0.8));
}
function setWorld(T) { animChar(DT, 'DT', T, 0); drawScreens(T); }
const WIDE = {pos: [DX + 3.2, 2.4, 3.4], target: [DX - 0.1, 1.0, 0.1], hh: 1.55};
const WIDE2 = {pos: [DX + 3.2, 2.35, 3.4], target: [DX - 0.05, 1.05, 0.08], hh: 1.38};
const scrA = new THREE.Vector3(DX - 0.62, 1.12, -0.42), nA = new THREE.Vector3(Math.sin(Math.PI / 2 - 0.38), 0, Math.cos(Math.PI / 2 - 0.38));
const MON1 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.toArray(), hh: 0.62};
const MON2 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.toArray(), hh: 0.57};
const FAIL1 = {pos: [DX + 3.0, 2.2, 3.0], target: [DX - 0.1, 1.05, 0.0], hh: 1.15};
const FAIL2 = {pos: [DX + 3.0, 2.2, 3.0], target: [DX - 0.05, 1.0, 0.0], hh: 1.0};
const RLX1 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.0, 1.1, 0.05], hh: 1.3};
const RLX2 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.15, 1.2, 0.05], hh: 1.05};
const ROD = {name: 'Rođak', sub: 'na mreži', av: 'R', col: '#7fd1a8', font: 'Mont'};
const RODMSG = [{at: 0.45, lines: ['Brate'], time: '15:24'}, {at: 0.95, lines: ['BUY GOLD SAD!!!'], time: '15:24'}, {at: 1.5, lines: ['Sigurno 100%'], time: '15:24'}];

window.renderFrame = i => {
  const T = i / FPS;
  if (T < 3.2) { setWorld(T); renderShot(WIDE, WIDE2, T / 3.2, T); hookBox(T, 0.15, 3.1, ['Kad rođak ima', '"siguran" signal'], 400); }
  else if (T < 5.6) {
    setWorld(T); renderShot(WIDE2, WIDE2, 0, T); phoneScene(T, 3.2, RODMSG, true, ROD); fadeIn(T, 3.2, 0.15, '255,255,255');
    caption(T, 4.85, 5.6, ['BEZ STOP LOSSA.', 'BEZ OBJAŠNJENJA.'], 1680, 70);
  } else if (T < 7.6) { setWorld(T); renderShot(MON1, MON2, (T - 5.6) / 2.0, T); caption(T, 6.6, 7.55, ['ULAZIM SA SVIM.'], 1500); }
  else if (T < 10.0) {
    setWorld(T); renderShot(FAIL1, FAIL2, (T - 7.6) / 2.4, T, T > 9.0 ? Math.max(0, 1 - (T - 9.0) / 0.8) : 0);
    if (T > 9.0) { ctx.fillStyle = `rgba(230,30,50,${0.18 + 0.1 * Math.sin(T * 12)})`; ctx.fillRect(0, 0, W, H); }
    caption(T, 9.1, 10.0, ['MARGIN CALL.'], 1480, 92);
  } else if (T < 12.0) {
    setWorld(T); renderShot(WIDE2, WIDE2, 0, T);
    phoneScene(T, 10.0 - 2.2, [...RODMSG, {at: 2.75, lines: ['Tržište je', 'manipulisano brate.'], time: '15:41'}], true, ROD);
    fadeIn(T, 10.0, 0.15);
  } else if (T < 14.8) {
    setWorld(T); renderShot(WIDE2, WIDE2, 0, T);
    phoneScene(T, 12.0, [{at: 0.5, title: 'GOLD · SIGNAL', lines: ['Ulaz: 2342', 'SL: 2336 · TP: 2355', 'Zašto: CHoCH na M15', 'i povrat u FVG.', 'Rizik: max 1%.'], time: '15:30'}], true);
    fadeIn(T, 12.0, 0.15, '255,255,255');
  } else if (T < 17.4) { setWorld(T); renderShot(RLX1, RLX2, (T - 14.8) / 2.6, T); caption(T, 15.5, 17.4, ['SIGNAL BEZ OBJAŠNJENJA', 'JE KOCKA.'], 1450, 80, '#ffd34a'); }
  else { endCard(T, 17.4); fadeIn(T, 17.4, 0.2); }
  return OUT.toDataURL('image/jpeg', 0.92);
};
Promise.all([document.fonts.load('900 40px Mont'), document.fonts.load('700 40px Mont'), document.fonts.load('900 40px Orb'), document.fonts.load('900 40px Mont', 'ČĆŠŽĐ')]).then(() => { window.ready = true; });
