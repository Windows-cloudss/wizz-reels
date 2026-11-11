// ================= EPISODE 6: "Trejderi vikendom" =================
const E0 = {bl: 0.1, br: 0.1, tilt: 0, smile: 0.1, sweat: 0, gx: -0.9, gy: 0, yaw: 0.25, pitch: 0.05, lean: 0.05};
const ex = o => ({...E0, ...o});
const LOOKPHONE = ex({gx: -0.2, gy: -0.4, pitch: 0.12, yaw: 0.45});
const TIRED = ex({smile: -0.2, bl: -0.15, br: -0.15, lean: 0.14, gx: -0.9});
TRACKS.DT = [
  {t: 0, ...P('desk', 'mouse'), e: TIRED},
  {t: 5.4, ...P('desk', 'mouse'), e: ex({smile: -0.25, bl: -0.2, br: -0.2, lean: 0.1, gx: 0.6, gy: 0.05, yaw: 0.95, pitch: 0})},
  {t: 7.0, ...P('desk', 'mouse'), e: ex({smile: -0.25, bl: -0.2, br: -0.2, lean: 0.1, gx: 0.6, gy: 0.05, yaw: 0.95, pitch: 0})},
  {t: 7.3, ...P('desk'), e: LOOKPHONE}, {t: 9.6, ...P('desk'), e: LOOKPHONE},
  {t: 10.1, ...P('rest', 'mugup'), e: ex({smile: 0.5, lean: -0.1, gx: -0.8, yaw: 0.3, pitch: 0})},
  {t: 11.0, ...P('rest', 'mugup'), e: ex({smile: 0.6, lean: -0.12, gx: -0.8, yaw: 0.3, pitch: 0})},
  {t: 11.5, ...P('rest', 'mugup'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.12, gx: 0.5, yaw: 0.85, pitch: 0})},
  {t: 13, ...P('rest', 'mugup'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.12, gx: 0.5, yaw: 0.85, pitch: 0})}
];
puddle.visible = false;
function ctr(g, txt, x, y, font, col) { g.font = font; g.fillStyle = col; g.textAlign = 'center'; g.fillText(txt, x, y); g.textAlign = 'left'; }
const WK = [2318, 2326, 2321, 2333, 2329, 2340, 2336, 2349, 2344, 2356, 2350, 2346];
function drawScreens(T) {
  const A = screens.A, g = A.g, w = A.c.width, h = A.c.height;
  g.fillStyle = '#0b1220'; g.fillRect(0, 0, w, h); g.strokeStyle = '#162033'; g.lineWidth = 1; for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
  const Y = p => 50 + (2362 - p) / 48 * (h - 90);
  if (T < 9.6) {
    g.fillStyle = '#6f8aa8'; g.font = 'bold 22px monospace'; g.fillText('XAUUSD · M1', 14, 28);
    for (let i = 0; i < 30; i++) { g.fillStyle = '#21c17a'; g.fillRect(40 + i * 16, Y(2346) - 1, 10, 3); }
    g.strokeStyle = '#6f8aa8'; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(40 + 30 * 16, Y(2346)); g.lineTo(w - 20, Y(2346)); g.stroke(); g.setLineDash([]);
    g.fillStyle = 'rgba(11,18,32,0.75)'; g.fillRect(0, h / 2 - 70, w, 140);
    ctr(g, 'TRŽIŠTE ZATVORENO', w / 2, h / 2 - 8, '900 44px sans-serif', '#ffd34a');
    ctr(g, 'Otvara se u nedjelju u 23:00', w / 2, h / 2 + 36, 'bold 24px sans-serif', '#c4cbe0');
    const sp = T * 9; g.save(); g.translate(w - 50, 40); g.rotate(sp); g.strokeStyle = '#fff'; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 14, 0, 4.7); g.stroke(); g.restore();
    const n = Math.floor(1 + Math.pow(clamp((T - 2.6) / 4.4), 1.6) * 46);
    g.fillStyle = '#ef4b57'; g.font = 'bold 22px monospace'; g.fillText(`Osvježeno: ${n}x`, 14, h - 20);
  } else {
    g.fillStyle = '#6f8aa8'; g.font = 'bold 22px monospace'; g.fillText('XAUUSD · W1', 14, 28);
    WK.forEach((c, i) => { const o = i ? WK[i - 1] : 2312; const x = 50 + i * 46; g.fillStyle = c >= o ? '#21c17a' : '#ef4b57'; g.fillRect(x, Y(Math.max(o, c)), 26, Math.max(3, Math.abs(Y(o) - Y(c)))); g.fillRect(x + 12, Y(Math.max(o, c) + 3), 2, Math.abs(Y(o) - Y(c)) + Y(0) - Y(6)); });
    const a = clamp((T - 10.0) / 0.5);
    for (const [lv, col, lab] of [[2358, '#ef4b57', 'OTPOR 2358'], [2335, '#21c17a', 'PODRŠKA 2335']]) { g.globalAlpha = a; g.setLineDash([10, 6]); g.strokeStyle = col; g.lineWidth = 3; g.beginPath(); g.moveTo(30, Y(lv)); g.lineTo(lerp(30, w - 30, easeOut(a)), Y(lv)); g.stroke(); g.setLineDash([]); g.fillStyle = col; g.font = '900 22px sans-serif'; g.fillText(lab, w - 200, Y(lv) - 8); g.globalAlpha = 1; }
  }
  A.t.needsUpdate = true;
  const B = screens.B, q = B.g, bw = B.c.width, bh = B.c.height;
  if (T < 9.6) { q.fillStyle = '#0d1320'; q.fillRect(0, 0, bw, bh); ctr(q, 'Subota', bw / 2, 150, '900 60px sans-serif', '#fff'); ctr(q, 'Nema svijeća. Nema akcije.', bw / 2, 230, 'bold 30px sans-serif', '#6f8aa8'); }
  else { q.fillStyle = '#f7f2e6'; q.fillRect(0, 0, bw, bh); q.fillStyle = '#20283a'; q.fillRect(0, 0, bw, 60); q.fillStyle = '#ffc94a'; q.font = '900 28px sans-serif'; q.fillText('Plan za ponedjeljak', 20, 40);
    ['☐ Nivoi ucrtani', '☐ Vijesti provjerene', '☐ Rizik: max 1%'].forEach((l, i) => { const done = T > 10.4 + i * 0.4; q.fillStyle = done ? '#21a06a' : '#1b1f2a'; q.font = 'bold 32px sans-serif'; q.fillText(done ? l.replace('☐', '✓') : l, 30, 130 + i * 70); }); }
  B.t.needsUpdate = true; drawClock(11, Math.floor(T * 0.8));
}
function setWorld(T) { const s = animChar(DT, 'DT', T, 0); handMug2.visible = s.R.ex < -1.0; deskMug.visible = !handMug2.visible; drawScreens(T); }
const WIDE = {pos: [DX + 3.2, 2.4, 3.4], target: [DX - 0.1, 1.0, 0.1], hh: 1.55};
const WIDE2 = {pos: [DX + 3.2, 2.35, 3.4], target: [DX - 0.05, 1.05, 0.08], hh: 1.38};
const scrA = new THREE.Vector3(DX - 0.62, 1.12, -0.42), nA = new THREE.Vector3(Math.sin(Math.PI / 2 - 0.38), 0, Math.cos(Math.PI / 2 - 0.38));
const MON1 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.toArray(), hh: 0.62};
const MON2 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.toArray(), hh: 0.58};
const FACE1 = {pos: [DX - 0.25, 1.7, 3.0], target: [DX + 0.15, 1.3, 0.0], hh: 0.75};
const FACE2 = {pos: [DX - 0.25, 1.7, 3.0], target: [DX + 0.22, 1.42, 0.02], hh: 0.5};
const RLX1 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.0, 1.1, 0.05], hh: 1.3};
const RLX2 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.15, 1.2, 0.05], hh: 1.05};

window.renderFrame = i => {
  const T = i / FPS;
  if (T < 2.6) { setWorld(T); renderShot(WIDE, WIDE2, T / 2.6, T); sessionBadge(11, Math.floor(T * 0.8), 1, 'SUBOTA'); hookBox(T, 0.15, 2.5, ['Trejderi vikendom'], 400); }
  else if (T < 5.4) { setWorld(T); renderShot(MON1, MON2, (T - 2.6) / 2.8, T); caption(T, 3.0, 4.2, ['F5.'], 1500, 110); caption(T, 4.2, 5.35, ['F5. F5. F5.'], 1500, 110); }
  else if (T < 7.0) { setWorld(T); renderShot(FACE1, FACE2, (T - 5.4) / 1.6, T); caption(T, 5.6, 7.0, ['...JOŠ JEDNOM.'], 1500); }
  else if (T < 9.6) {
    setWorld(T); renderShot(WIDE2, WIDE2, 0, T);
    phoneScene(T, 7.0, [
      {at: 0.5, title: 'PREGLED SEDMICE · GOLD', lines: ['Ključni nivoi:', '2335 i 2358.'], time: '11:02'},
      {at: 1.3, title: 'PLAN ZA PONEDJELJAK', lines: ['Čekamo London.', 'Vijesti: utorak.'], time: '11:02'}
    ], true);
    fadeIn(T, 7.0, 0.15, '255,255,255');
  } else if (T < 12.6) { setWorld(T); renderShot(RLX1, RLX2, (T - 9.6) / 3.0, T); sessionBadge(11, 8, 1, 'SUBOTA'); caption(T, 10.8, 12.6, ['VIKEND JE', 'ZA PRIPREMU.'], 1450, 92, '#ffd34a'); }
  else { endCard(T, 12.6); fadeIn(T, 12.6, 0.2); }
  return OUT.toDataURL('image/jpeg', 0.92);
};
Promise.all([document.fonts.load('900 40px Mont'), document.fonts.load('700 40px Mont'), document.fonts.load('900 40px Orb'), document.fonts.load('900 40px Mont', 'ČĆŠŽĐ')]).then(() => { window.ready = true; });
