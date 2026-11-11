// ================= EPISODE 3: "40 tabova" =================
const E0 = {bl: 0.1, br: 0.1, tilt: 0, smile: 0.1, sweat: 0, gx: -0.9, gy: 0, yaw: 0.25, pitch: 0.05, lean: 0.05};
const ex = o => ({...E0, ...o});
const nods = [];
for (let t = 14.0; t < 16.4; t += 0.32) nods.push({t, ...P('rest', 'mouse'), e: ex({smile: 0.7, bl: 0.4, br: 0.4, lean: -0.04, pitch: (Math.round((t - 14) / 0.32) % 2) ? 0.16 : -0.02})});
TRACKS.DT = [
  {t: 0, ...P('desk', 'mouse'), e: ex({smile: 0.4, bl: 0.3, br: 0.3})},
  {t: 3.0, ...P('desk', 'mouse'), e: ex({smile: 0.3, bl: 0.4, br: 0.4, lean: 0.1})},
  {t: 5.0, ...P('desk', 'mouse'), e: ex({smile: -0.1, bl: 0.6, br: 0.6, tilt: 0.3, lean: 0.16, sweat: 0.3})},
  {t: 6.6, ...P('desk', 'mouse'), e: ex({smile: -0.3, bl: 0.8, br: 0.8, tilt: 0.6, lean: 0.18, sweat: 0.8})},
  {t: 7.4, ...P('head'), e: ex({smile: -0.4, bl: 1, br: 1, tilt: 0.85, lean: 0.06, sweat: 1, gx: 0.3, yaw: 0.7})},
  {t: 8.35, ...P('head'), e: ex({smile: -0.5, bl: 1, br: 1, tilt: 0.9, lean: 0.06, sweat: 1, gx: 0.3, yaw: 0.7})},
  {t: 8.7, ...P('slump'), e: ex({smile: -0.2, bl: 1, br: 1, tilt: 0.0, lean: -0.14, sweat: 0.2, gx: 0.5, yaw: 0.8, pitch: -0.05})},
  {t: 10.0, ...P('slump'), e: ex({smile: -0.2, bl: 1, br: 1, tilt: 0.0, lean: -0.14, sweat: 0.2, gx: 0.5, yaw: 0.8, pitch: -0.05})},
  {t: 10.6, ...P('desk'), e: ex({gx: -0.2, gy: -0.4, pitch: 0.12, yaw: 0.45})},
  {t: 13.6, ...P('desk'), e: ex({gx: -0.2, gy: -0.4, pitch: 0.12, yaw: 0.45})},
  ...nods,
  {t: 16.6, ...P('rest', 'mouse'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.06, gx: 0.5, yaw: 0.85, pitch: 0})},
  {t: 18, ...P('rest', 'mouse'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.06, gx: 0.5, yaw: 0.85, pitch: 0})}
];
handMug2.visible = false; puddle.visible = false;
// smoke puffs (no outline)
const smoke = []; { const sm_ = new THREE.MeshBasicMaterial({color: 0x8d929c, transparent: true, opacity: 0.9, depthWrite: false});
  for (let i = 0; i < 8; i++) { const s = mesh(new THREE.SphereGeometry(0.07, 20, 14), sm_, 0, 0, 0, false, false); D.add(s); smoke.push({s, ph: i / 8, dx: Math.sin(i * 2.3) * 0.08}); } }
const hp = new THREE.Vector3();
function updSmoke(T) {
  const amt = clamp((T - 6.9) / 0.6) * (1 - clamp((T - 10.0) / 0.6));
  scene.updateMatrixWorld(); DT.head.getWorldPosition(hp);
  for (const p of smoke) { const u = (T * 0.7 + p.ph) % 1; p.s.visible = amt > 0.01; p.s.position.set(hp.x + p.dx + Math.sin(T * 2 + p.ph * 9) * 0.03, hp.y + 0.25 + u * 0.55, hp.z + p.dx * 0.5); p.s.scale.setScalar(Math.sin(Math.PI * u) * (0.6 + u) * amt + 0.001); }
}
const TITLES = ['ICT JE JEDINO ŠTO RADI', 'NE KORISTI ICT!', 'SMC = PREVARA?', 'NAJBOLJA STRATEGIJA 2026', '99% GUBI ZBOG OVOGA', 'RSI + MACD TAJNA', 'SAMO PRICE ACTION', 'INDIKATORI SU ZAKON', 'NIKAD NE KORISTI SL', 'SCALPING 1 MIN', 'SWING JE BOLJI', 'ORDER BLOCK TAJNA', 'FIBONACCI RADI 100%', 'ZABORAVI FIBONACCI'];
const COLS = ['#d6324a', '#2f6fd6', '#e0a12a', '#2aa06a', '#8a3fd1', '#d65a2a'];
function ctr(g, txt, x, y, font, col) { g.font = font; g.fillStyle = col; g.textAlign = 'center'; g.fillText(txt, x, y); g.textAlign = 'left'; }
function drawScreens(T) {
  const A = screens.A, g = A.g, w = A.c.width, h = A.c.height;
  if (T < 8.45) {
    const k = ease(clamp((T - 2.6) / 3.8)), n = Math.max(2, Math.floor(lerp(2, 40, k)));
    g.fillStyle = '#e9ecf2'; g.fillRect(0, 0, w, h); g.fillStyle = '#cfd5df'; g.fillRect(0, 0, w, 40);
    const tw = (w - 10) / n;
    for (let i = 0; i < n; i++) { g.fillStyle = i === n - 1 ? '#ffffff' : '#dde2ea'; g.fillRect(5 + i * tw, 6, tw - 2, 34); g.fillStyle = '#e33'; g.fillRect(9 + i * tw, 16, Math.min(12, tw - 6), 10); if (tw > 60) { g.fillStyle = '#333'; g.font = '13px sans-serif'; g.fillText(TITLES[i % TITLES.length].slice(0, Math.floor(tw / 9)), 26 + i * tw, 28); } }
    g.fillStyle = '#5a6478'; g.font = 'bold 16px sans-serif'; g.fillText(n + ' tabova', w - 100, 62);
    for (let j = 0; j < 4; j++) {
      const idx = n - 1 - j; if (idx < 0) break; const x = 20 + (j % 2) * 370, y = 76 + Math.floor(j / 2) * 176;
      const pa = j === 0 ? easeBack(clamp(((T - 2.6) / 3.8 * 38) % 1 * 3)) : 1;
      g.save(); g.translate(x + 175, y + 80); g.scale(pa, pa); g.fillStyle = COLS[idx % COLS.length]; g.fillRect(-175, -80, 350, 160);
      g.fillStyle = 'rgba(0,0,0,0.25)'; g.beginPath(); g.moveTo(-18, -22); g.lineTo(-18, 22); g.lineTo(20, 0); g.fill();
      const t = TITLES[idx % TITLES.length]; g.font = '900 24px sans-serif'; g.textAlign = 'center'; g.fillStyle = '#fff'; g.strokeStyle = '#000'; g.lineWidth = 5;
      const ws = t.split(' '), half = Math.ceil(ws.length / 2), l1 = ws.slice(0, half).join(' '), l2 = ws.slice(half).join(' ');
      g.strokeText(l1, 0, -42); g.fillText(l1, 0, -42); g.strokeText(l2, 0, 60); g.fillText(l2, 0, 60); g.textAlign = 'left'; g.restore();
    }
  } else if (T < 13.6) {
    g.fillStyle = '#050505'; g.fillRect(0, 0, w, h);
    const R = rng(11); g.strokeStyle = '#9aa'; g.lineWidth = 3; g.beginPath(); let x = w * 0.55, y = h * 0.45; g.moveTo(x, y); for (let i = 0; i < 6; i++) { x += (R() - 0.5) * 160; y += (R() - 0.3) * 90; g.lineTo(x, y); } g.stroke();
  } else {
    g.fillStyle = '#e9ecf2'; g.fillRect(0, 0, w, h); g.fillStyle = '#cfd5df'; g.fillRect(0, 0, w, 40); g.fillStyle = '#fff'; g.fillRect(5, 6, 300, 34);
    g.fillStyle = '#333'; g.font = 'bold 15px sans-serif'; g.fillText('Wizz Trading – Lekcija 3: FVG', 14, 28);
    g.fillStyle = '#0b1220'; g.fillRect(20, 56, w - 40, h - 76);
    const Y = p => 80 + (12 - p) * 26; const cw = 26;
    const series = [3, 3.5, 4.2, 4, 4.8, 5.6, 7.8, 9.6, 9.2, 8.6, 8.4, 9.4, 10.2, 10.8];
    const shown = Math.min(series.length - 1, Math.floor((T - 13.6) * 6));
    for (let i = 1; i <= shown; i++) { const o = series[i - 1], c = series[i]; g.fillStyle = c >= o ? '#21c17a' : '#ef4b57'; g.fillRect(60 + i * cw * 1.6, Y(Math.max(o, c)), cw, Math.max(3, Math.abs(Y(o) - Y(c)))); }
    const a = clamp((T - 14.6) / 0.4); if (a > 0) { g.globalAlpha = a; g.fillStyle = 'rgba(74,168,255,0.35)'; g.fillRect(60 + 6 * cw * 1.6, Y(7.8), 420, Y(5.6) - Y(7.8)); g.fillStyle = '#9fd0ff'; g.font = '900 30px sans-serif'; g.fillText('FVG', 60 + 6 * cw * 1.6 + 300, Y(7.8) + 34); g.globalAlpha = 1; }
  }
  A.t.needsUpdate = true;
  const B = screens.B, q = B.g, bw = B.c.width, bh = B.c.height;
  if (T < 8.45) {
    q.fillStyle = '#16181f'; q.fillRect(0, 0, bw, bh); q.fillStyle = '#fff'; q.font = 'bold 24px sans-serif'; q.fillText('Preporučeno', 20, 36);
    const off = (T * 60) % 90;
    for (let i = 0; i < 7; i++) { const y = 60 + i * 90 - off, idx = (i + Math.floor(T * 60 / 90)) % TITLES.length; q.fillStyle = COLS[idx % COLS.length]; q.fillRect(20, y, 140, 76); q.fillStyle = '#e8e8e8'; q.font = 'bold 22px sans-serif'; q.fillText(TITLES[idx], 180, y + 34); q.fillStyle = '#888'; q.font = '18px sans-serif'; q.fillText(`${(idx * 37 % 900) + 100}K pregleda`, 180, y + 62); }
  } else if (T < 13.6) { q.fillStyle = '#050505'; q.fillRect(0, 0, bw, bh); }
  else {
    q.fillStyle = '#f7f2e6'; q.fillRect(0, 0, bw, bh); q.fillStyle = '#20283a'; q.fillRect(0, 0, bw, 60);
    q.fillStyle = '#ffc94a'; q.font = '900 28px sans-serif'; q.fillText('Wizz Trading · Redoslijed', 20, 40);
    ['1. BOS ✓', '2. CHoCH ✓', '3. FVG  ◀ danas', '4. Order Block'].forEach((l, i) => { q.fillStyle = i < 2 ? '#21a06a' : (i === 2 ? '#1b1f2a' : '#9aa1b3'); q.font = 'bold 30px sans-serif'; q.fillText(l, 30, 120 + i * 70); });
  }
  B.t.needsUpdate = true;
  drawClock(11, 5 + Math.floor(T * 0.8));
}
function setWorld(T) { animChar(DT, 'DT', T, 0); drawScreens(T); updSmoke(T); }
// confetti
const CONF = []; { const R = rng(77); const cc = ['#ffd34a', '#ef4b57', '#21c17a', '#4aa8ff', '#c45bff', '#ffffff']; for (let i = 0; i < 140; i++) { const a = R() * Math.PI * 2, v = 600 + R() * 1300; CONF.push({vx: Math.cos(a) * v, vy: Math.sin(a) * v - 700, r: R() * 6, vr: (R() - 0.5) * 14, c: cc[i % 6], w: 14 + R() * 16, h: 8 + R() * 10}); } }
function confetti(T, t0, cx, cy) {
  const k = T - t0; if (k < 0 || k > 3) return;
  for (const p of CONF) { const drag = 1 - Math.exp(-k * 2.2), x = cx + p.vx / 2.2 * drag, y = cy + p.vy / 2.2 * drag + 500 * k * k * 0.5 + 300 * k; ctx.save(); ctx.translate(x * S, y * S); ctx.rotate(p.r + p.vr * k); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2 * S, -p.h / 2 * S, p.w * S, p.h * S); ctx.restore(); }
}
const WIDE = {pos: [DX + 3.2, 2.4, 3.4], target: [DX - 0.1, 1.0, 0.1], hh: 1.55};
const WIDE2 = {pos: [DX + 3.2, 2.35, 3.4], target: [DX - 0.05, 1.05, 0.08], hh: 1.38};
const scrA = new THREE.Vector3(DX - 0.62, 1.12, -0.42), nA = new THREE.Vector3(Math.sin(Math.PI / 2 - 0.38), 0, Math.cos(Math.PI / 2 - 0.38));
const MON1 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.toArray(), hh: 0.62};
const MON2 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.toArray(), hh: 0.57};
const FACE1 = {pos: [DX - 0.25, 1.7, 3.0], target: [DX + 0.15, 1.45, 0.0], hh: 0.85};
const FACE2 = {pos: [DX - 0.25, 1.7, 3.0], target: [DX + 0.2, 1.55, 0.02], hh: 0.7};
const RLX1 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.0, 1.1, 0.05], hh: 1.3};
const RLX2 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.15, 1.2, 0.05], hh: 1.05};

window.renderFrame = i => {
  const T = i / FPS;
  if (T < 3.0) { setWorld(T); renderShot(WIDE, WIDE2, T / 3.0, T); hookBox(T, 0.15, 2.9, ['Kad učiš trejding', 'sa YouTubea'], 400); }
  else if (T < 6.6) { setWorld(T); renderShot(MON1, MON2, (T - 3.0) / 3.6, T); caption(T, 4.6, 6.55, ['...I JOŠ JEDAN TAB.'], 1500); }
  else if (T < 9.0) {
    setWorld(T); renderShot(FACE1, FACE2, (T - 6.6) / 2.4, T, T > 8.45 ? Math.max(0, 1 - (T - 8.45) / 0.5) * 0.7 : 0);
    caption(T, 6.75, 7.7, ['ICT? SMC? RSI?'], 1500); caption(T, 7.6, 8.4, ['MACD?? FIBO??'], 1500, 84, '#ffd34a');
    const fl = 1 - clamp((T - 8.45) / 0.3); if (T > 8.45 && fl > 0) { ctx.fillStyle = `rgba(255,255,255,${fl})`; ctx.fillRect(0, 0, W, H); }
    confetti(T, 8.45, 540, 760);
  } else if (T < 10.0) { setWorld(T); renderShot(WIDE2, WIDE2, 0, T); confetti(T, 8.45, 540, 760); }
  else if (T < 13.6) {
    setWorld(T); renderShot(WIDE2, WIDE2, 0, T);
    phoneScene(T, 10.0, [
      {at: 0.55, title: 'DAN 1 · BOS', lines: ['Struktura tržišta.'], time: '09:00'},
      {at: 1.35, title: 'DAN 2 · CHoCH', lines: ['Promjena smjera.'], time: '09:00'},
      {at: 2.15, title: 'DAN 3 · FVG', lines: ['Nebalans cijene.'], time: '09:00'}
    ], true);
    fadeIn(T, 10.0, 0.15, '255,255,255');
  } else if (T < 16.6) { setWorld(T); renderShot(RLX1, RLX2, (T - 13.6) / 3.0, T); caption(T, 14.4, 16.6, ['JEDAN KONCEPT DNEVNO.', 'PRAVIM REDOM.'], 1450, 80, '#ffd34a'); }
  else { endCard(T, 16.6); fadeIn(T, 16.6, 0.2); }
  return OUT.toDataURL('image/jpeg', 0.92);
};
Promise.all([document.fonts.load('900 40px Mont'), document.fonts.load('700 40px Mont'), document.fonts.load('900 40px Orb'), document.fonts.load('900 40px Mont', 'ČĆŠŽĐ')]).then(() => { window.ready = true; });
