// ================= EPISODE 1: "Sam usred dana" =================
const EP = {dur: 20.0};
const ENTRY_M = 3.55;
function mprice(m) {
  const n = Math.sin(m * 2.1) * 0.35 + Math.sin(m * 5.3 + 1) * 0.18 + Math.sin(m * 11.7 + 2) * 0.08;
  return 2350 + n + 7 * sm((m - 2.0) / 1.3) - 16 * sm((m - 4.0) / 5.6);
}
const ENTRY = mprice(ENTRY_M);
const SLS = [[ENTRY_M, ENTRY - 4.5], [5.45, ENTRY - 8.5], [6.4, ENTRY - 12.5]];
function slAt(m) { let v = SLS[0][1]; for (let i = 1; i < SLS.length; i++) v = lerp(v, SLS[i][1], sm((m - SLS[i][0]) / 0.35)); return v; }
let STOP_M = 99; for (let m = ENTRY_M; m < 12; m += 0.005) if (mprice(m) <= slAt(m)) { STOP_M = m; break; }
const fmt = v => v.toFixed(2).replace(/\B(?=(\d{3})+\.)/g, ',');

function drawMarket(m, tl, T) {
  const sc = screens.A, g = sc.g, w = sc.c.width, h = sc.c.height;
  const stopped = tl === 'A' && m >= STOP_M;
  g.fillStyle = '#0b1220'; g.fillRect(0, 0, w, h);
  g.strokeStyle = '#162033'; g.lineWidth = 1;
  for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
  const lo = 2334, hi = 2362, Y = p => 40 + (hi - p) / (hi - lo) * (h - 70);
  const step = 0.22, cw = 15, x0 = w - 120, kk = m / step, k = Math.floor(kk), fr = kk - k;
  for (let i = 0; i < 44; i++) {
    const idx = k - i; if (idx < -60) break; const a = idx * step, b = Math.min(m, (idx + 1) * step);
    const o = mprice(a), c = mprice(b); let hiP = Math.max(o, c), loP = Math.min(o, c);
    for (let s = 0; s <= 6; s++) { const p = mprice(a + (b - a) * s / 6); hiP = Math.max(hiP, p); loP = Math.min(loP, p); }
    const x = x0 - (i + fr) * cw + cw * 0.5 - cw; const up = c >= o;
    g.strokeStyle = g.fillStyle = up ? '#21c17a' : '#ef4b57'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x, Y(hiP + 0.15)); g.lineTo(x, Y(loP - 0.15)); g.stroke();
    g.fillRect(x - cw * 0.34, Math.min(Y(o), Y(c)), cw * 0.68, Math.max(2, Math.abs(Y(o) - Y(c))));
  }
  const p = mprice(m);
  g.fillStyle = '#6f8aa8'; g.font = 'bold 22px monospace'; g.fillText('XAUUSD · M1', 14, 28);
  const tag = (pp, col, label) => { g.fillStyle = col; g.fillRect(w - 112, Y(pp) - 13, 112, 26); g.fillStyle = '#fff'; g.font = 'bold 17px monospace'; g.fillText(label, w - 106, Y(pp) + 6); };
  const line = (pp, col, label) => { g.setLineDash([10, 6]); g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); g.moveTo(0, Y(pp)); g.lineTo(w - 112, Y(pp)); g.stroke(); g.setLineDash([]); tag(pp, col, label); };
  tag(p, '#2b3a55', p.toFixed(2));
  // trade panel
  const bx = 300, by = 10;
  if (tl === 'A' && m < ENTRY_M + 0.6) {
    const flash = m >= ENTRY_M && m < ENTRY_M + 0.25;
    g.fillStyle = '#ef4b57'; g.fillRect(bx, by, 100, 38); g.fillStyle = flash ? '#7dffb9' : '#21c17a'; g.fillRect(bx + 108, by, 100, 38);
    g.fillStyle = '#fff'; g.font = 'bold 22px sans-serif'; g.fillText('SELL', bx + 22, by + 27); g.fillText('BUY', bx + 132, by + 27);
  }
  if (tl === 'A' && m >= ENTRY_M && !stopped) {
    line(ENTRY, '#4aa8ff', 'BUY ' + ENTRY.toFixed(1));
    const sl = slAt(m); line(sl, '#ef4b57', 'SL ' + sl.toFixed(1));
    const pnl = (p - ENTRY) * 100; g.fillStyle = pnl < 0 ? '#ef4b57' : '#21c17a'; g.font = 'bold 30px monospace'; g.fillText((pnl < 0 ? '-$' : '+$') + fmt(Math.abs(pnl)), 14, h - 22);
  }
  if (tl === 'B') { g.fillStyle = '#f5b33a'; g.font = 'bold 22px sans-serif'; g.fillText('ČEKAM POTVRDU', w - 360, 28); }
  // cursor
  let cur = null;
  if (tl === 'A' && m > 2.9 && m < ENTRY_M + 0.5) { const q = ease((m - 2.9) / 0.55); cur = [lerp(w * 0.45, bx + 160, q), lerp(h * 0.75, by + 22, q)]; }
  for (const [t0, i] of [[5.45, 1], [6.4, 2]]) if (tl === 'A' && m > t0 - 0.35 && m < t0 + 0.55 && !stopped) cur = [w - 60, Y(slAt(m)) + 4];
  if (cur) { g.save(); g.translate(cur[0], cur[1]); g.fillStyle = '#fff'; g.strokeStyle = '#000'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 30); g.lineTo(8, 23); g.lineTo(14, 36); g.lineTo(19, 33); g.lineTo(13, 21); g.lineTo(23, 21); g.closePath(); g.fill(); g.stroke(); g.restore(); }
  if (stopped) {
    const pu = 0.45 + 0.2 * Math.sin(T * 12);
    g.fillStyle = `rgba(220,30,50,${pu})`; g.fillRect(0, 0, w, h);
    g.fillStyle = '#fff'; g.font = '900 78px sans-serif'; g.textAlign = 'center'; g.fillText('STOP OUT', w / 2, h / 2 + 4);
    g.font = 'bold 40px monospace'; g.fillText('-$' + fmt((ENTRY - SLS[2][1]) * 100), w / 2, h / 2 + 64); g.textAlign = 'left';
  }
  sc.t.needsUpdate = true;
  // account monitor
  const B = screens.B, q = B.g, bw = B.c.width, bh = B.c.height;
  q.fillStyle = stopped ? '#3a0a12' : '#0d1320'; q.fillRect(0, 0, bw, bh);
  q.fillStyle = '#6f8aa8'; q.font = 'bold 24px monospace'; q.fillText('ACCOUNT', 20, 40);
  let bal = 10000, eq = 10000;
  if (tl === 'A' && m >= ENTRY_M) { eq = stopped ? 10000 - (ENTRY - SLS[2][1]) * 100 : 10000 + (p - ENTRY) * 100; if (stopped) bal = eq; }
  q.font = '28px monospace'; q.fillStyle = '#9fb4cc'; q.fillText('Balance', 20, 110); q.fillText('Equity', 20, 160);
  q.textAlign = 'right'; q.fillStyle = '#fff'; q.font = 'bold 34px monospace'; q.fillText('$' + fmt(bal), bw - 20, 110);
  q.fillStyle = eq < 9999 ? '#ef4b57' : '#21c17a'; q.fillText('$' + fmt(eq), bw - 20, 160); q.textAlign = 'left';
  q.fillStyle = '#6f8aa8'; q.font = 'bold 24px monospace';
  q.fillText(tl === 'B' ? 'Nema otvorenih pozicija' : (m >= ENTRY_M && !stopped ? 'BUY 1.00 XAUUSD' : (stopped ? 'POZICIJA ZATVORENA (SL)' : 'Nema otvorenih pozicija')), 20, 240);
  B.t.needsUpdate = true;
  const mins = 30 + Math.floor(m * 1.3); drawClock(15, mins);
  return {stopped, mins};
}

// pose tracks (A uses story time, B uses global time)
const E0 = {bl: 0.1, br: 0.1, tilt: 0, smile: 0.1, sweat: 0, gx: -0.9, gy: 0, yaw: 0.25, pitch: 0.05, lean: 0.05};
const ex = o => ({...E0, ...o});
TRACKS.DT = [
  {t: 0, ...P('type'), e: ex({})},
  {t: 2.1, ...P('type'), e: ex({})},
  {t: 2.7, ...P('type'), e: ex({bl: 0.7, br: 0.7, smile: 0.8, lean: 0.16, gx: -0.8})},
  {t: 3.3, ...P('desk', 'mouse'), e: ex({bl: 0.6, br: 0.6, smile: 0.9, lean: 0.18, gx: -0.8})},
  {t: 4.6, ...P('desk', 'mouse'), e: ex({bl: 0.3, br: 0.3, smile: 0.1, lean: 0.12, tilt: 0.2})},
  {t: 5.4, ...P('desk', 'mouse'), e: ex({bl: 0.4, br: 0.4, smile: -0.2, tilt: 0.45, sweat: 0.6, lean: 0.17})},
  {t: 7.0, ...P('desk', 'mouse'), e: ex({bl: 0.7, br: 0.7, smile: -0.45, tilt: 0.75, sweat: 1, lean: 0.22})},
  {t: 7.9, ...P('desk', 'mouse'), e: ex({bl: 0.8, br: 0.8, smile: -0.5, tilt: 0.8, sweat: 1, lean: 0.22})},
  {t: 8.3, ...P('head'), e: ex({bl: 1, br: 1, smile: -0.7, tilt: 0.85, sweat: 1, lean: 0.02, pitch: -0.05, yaw: 0.35})},
  {t: 9.0, ...P('head'), e: ex({bl: 1, br: 1, smile: -0.7, tilt: 0.85, sweat: 1, lean: 0.02, pitch: -0.05, yaw: 0.35})},
  {t: 9.6, ...P('facedown'), e: ex({bl: 0.6, br: 0.6, smile: -0.4, tilt: 0.6, sweat: 1, lean: 0.55, pitch: 0.4, yaw: 0.3, gy: -0.6})},
  {t: 10.2, ...P('facedown'), e: ex({bl: 0.6, br: 0.6, smile: -0.4, tilt: 0.6, sweat: 1, lean: 0.55, pitch: 0.4, yaw: 0.3, gy: -0.6})}
];
TRACKS.DTB = [
  {t: 11.2, ...P('type'), e: ex({})},
  {t: 12.4, ...P('desk'), e: ex({gx: -0.2, gy: -0.4, pitch: 0.12, yaw: 0.45})},
  {t: 13.3, ...P('desk'), e: ex({gx: -0.2, gy: -0.4, pitch: 0.12, yaw: 0.45})},
  {t: 14.1, ...P('rest', 'mugup'), e: ex({smile: 0.45, lean: -0.1, gx: -0.8, yaw: 0.3, pitch: 0})},
  {t: 15.4, ...P('rest', 'mugup'), e: ex({smile: 0.5, lean: -0.12, gx: -0.8, yaw: 0.3, pitch: 0})},
  {t: 15.9, ...P('rest', 'mugup'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.12, gx: 0.5, yaw: 0.85, pitch: 0})},
  {t: 17.5, ...P('rest', 'mugup'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.12, gx: 0.5, yaw: 0.85, pitch: 0})}
];

function setWorld(tl, ts, m, T) {
  const s = animChar(DT, tl === 'A' ? 'DT' : 'DTB', tl === 'A' ? ts : T, 0);
  handMug2.visible = tl === 'B' && s.R.ex < -1.0;
  deskMug.visible = !handMug2.visible;
  // spill (A only, story time)
  const sp = tl === 'A' ? clamp((ts - 8.25) / 0.22) : 0;
  deskMug.rotation.set(0, 0, 0); deskMug.position.set(DX - 0.27, 0.763, 0.3);
  if (sp > 0) { deskMug.rotation.z = easeOut(sp) * 1.45; deskMug.position.x = DX - 0.27 - sp * 0.05; deskMug.position.y = 0.763 + sp * 0.02; }
  const pr = tl === 'A' ? easeOut(clamp((ts - 8.35) / 0.9)) * 0.17 : 0; puddle.visible = pr > 0.002; puddle.scale.set(pr * 1.3 + 0.001, pr + 0.001, 1);
  return drawMarket(m, tl, T);
}

const WIDE = {pos: [DX + 3.2, 2.4, 3.4], target: [DX - 0.1, 1.0, 0.1], hh: 1.55};
const WIDE2 = {pos: [DX + 3.2, 2.35, 3.4], target: [DX - 0.05, 1.05, 0.08], hh: 1.38};
const scrA = new THREE.Vector3(DX - 0.62, 1.12, -0.42), nA = new THREE.Vector3(Math.sin(Math.PI / 2 - 0.38), 0, Math.cos(Math.PI / 2 - 0.38));
const MON1 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.toArray(), hh: 0.62};
const MON2 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.clone().add(new THREE.Vector3(0, 0.02, 0)).toArray(), hh: 0.5};
const OS1 = {pos: [DX - 0.25, 1.7, 3.0], target: [DX + 0.05, 1.25, -0.05], hh: 0.95};
const OS2 = {pos: [DX - 0.25, 1.7, 3.0], target: [DX + 0.12, 1.32, 0.0], hh: 0.8};
const FAIL1 = {pos: [DX + 3.0, 2.2, 3.0], target: [DX - 0.1, 1.05, 0.0], hh: 1.15};
const FAIL2 = {pos: [DX + 3.0, 2.2, 3.0], target: [DX - 0.05, 1.0, 0.0], hh: 1.0};
const RLX1 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.0, 1.1, 0.05], hh: 1.3};
const RLX2 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.15, 1.2, 0.05], hh: 1.05};

window.STOPM = () => [STOP_M, ENTRY];
window.renderFrame = i => {
  const T = i / FPS;
  if (T < 3.2) { // S1 wide
    const r = setWorld('A', T, T, T); renderShot(WIDE, WIDE2, T / 3.2, T);
    sessionBadge(15, r.mins); hookBox(T, 0.15, 3.1, ['POV: NY sesija,', 'a ti trejdaš sam'], 400);
  } else if (T < 5.2) { // S2 monitor
    setWorld('A', T, T, T); renderShot(MON1, MON2, (T - 3.2) / 2, T);
    caption(T, 3.6, 5.15, ['ODMAH ULAZIM.'], 1500);
  } else if (T < 8.0) { // S3 over shoulder
    const r = setWorld('A', T, T, T); renderShot(OS1, OS2, (T - 5.2) / 2.8, T);
    sessionBadge(15, r.mins); caption(T, 5.45, 6.4, ['POMJERIM STOP...'], 1500); caption(T, 6.3, 7.95, ['PA OPET.'], 1500);
  } else if (T < 10.0) { // S4 fail
    const r = setWorld('A', T, T, T); renderShot(FAIL1, FAIL2, (T - 8) / 2, T, Math.max(0, 1 - (T - 8) / 0.8));
    const pu = 0.18 + 0.1 * Math.sin(T * 12); ctx.fillStyle = `rgba(230,30,50,${pu * (1 - clamp((T - 9.2) / 0.8) * 0.6)})`; ctx.fillRect(0, 0, W, H);
    caption(T, 8.55, 10.0, ['NIKO TI NIJE REKAO', 'DA ČEKAŠ.'], 1450, 84);
  } else if (T < 11.2) { // S5 rewind
    const k = ease((T - 10) / 1.2), ts = lerp(9.95, 2.4, k);
    setWorld('A', ts, ts, T); renderShot(WIDE, WIDE, 0.5, T); vhs(T, i);
  } else if (T < 13.6) { // S6 phone
    const m = 2.4 + (T - 11.2); setWorld('B', m, m, T); renderShot(WIDE2, WIDE2, 0, T);
    phoneScene(T, 11.2, [{at: 0.55, title: 'GOLD · NY OTVARANJE', lines: ['Čekamo potvrdu.', 'Ne ulazimo prije.'], time: '15:31'}], true);
    fadeIn(T, 11.2, 0.15, '255,255,255');
  } else if (T < 17.0) { // S7 relaxed alt timeline
    const m = 2.4 + (T - 11.2); const r = setWorld('B', m, m, T); renderShot(RLX1, RLX2, (T - 13.6) / 3.4, T);
    sessionBadge(15, r.mins); caption(T, 15.5, 17.0, ['NE TREJDAJ SAM.'], 1480, 96, '#ffd34a');
  } else { endCard(T, 17.0); fadeIn(T, 17.0, 0.2); }
  return OUT.toDataURL('image/jpeg', 0.92);
};
Promise.all([document.fonts.load('900 40px Mont'), document.fonts.load('700 40px Mont'), document.fonts.load('900 40px Orb'), document.fonts.load('900 40px Mont', 'ČĆŠŽĐ')]).then(() => { window.ready = true; });
