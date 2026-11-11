// ================= EPISODE 2: "Kurs od 2.000 KM" =================
const fmt = v => v.toFixed(2).replace(/\B(?=(\d{3})+\.)/g, ',');
const E0 = {bl: 0.1, br: 0.1, tilt: 0, smile: 0.1, sweat: 0, gx: -0.9, gy: 0, yaw: 0.25, pitch: 0.05, lean: 0.05};
const ex = o => ({...E0, ...o});
TRACKS.DT = [
  {t: 0, ...P('type'), e: ex({smile: 0.3, bl: 0.3, br: 0.3})},
  {t: 2.6, ...P('type'), e: ex({smile: 0.5, bl: 0.5, br: 0.5, lean: 0.12})},
  {t: 3.1, ...P('desk', 'mouse'), e: ex({smile: 0.7, bl: 0.6, br: 0.6, lean: 0.15})},
  {t: 4.4, ...P('desk', 'mouse'), e: ex({smile: 0.9, bl: 0.6, br: 0.6, lean: 0.1})},
  {t: 5.6, ...P('desk', 'mouse'), e: ex({smile: 0.4, bl: 0.4, br: 0.4, lean: 0.15})},
  {t: 7.3, ...P('desk', 'mouse'), e: ex({smile: -0.1, bl: 0.15, br: 0.15, lean: 0.12, tilt: 0.1})},
  {t: 7.9, ...P('desk', 'mouse'), e: ex({smile: -0.1, bl: 0.0, br: 0.0, lean: 0.05, gx: 0.0, yaw: 0.25})},
  {t: 8.35, ...P('desk'), e: ex({smile: -0.15, bl: -0.1, br: -0.1, lean: 0.0, gx: 0.6, gy: 0.05, yaw: 0.95, pitch: 0.0})},
  {t: 9.6, ...P('desk'), e: ex({smile: -0.15, bl: -0.1, br: -0.1, lean: 0.0, gx: 0.6, gy: 0.05, yaw: 0.95, pitch: 0.0})},
  {t: 10.4, ...P('desk'), e: ex({gx: -0.2, gy: -0.4, pitch: 0.12, yaw: 0.45})},
  {t: 13.4, ...P('desk'), e: ex({gx: -0.2, gy: -0.4, pitch: 0.12, yaw: 0.45})},
  {t: 13.9, ...P('desk', 'mouse'), e: ex({smile: 0.6, bl: 0.4, br: 0.4, lean: 0.08})},
  {t: 15.0, ...P('desk', 'mouse'), e: ex({smile: 0.7, bl: 0.5, br: 0.5, lean: 0.08})},
  {t: 15.5, ...P('rest', 'mouse'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.06, gx: 0.5, yaw: 0.85, pitch: 0})},
  {t: 17, ...P('rest', 'mouse'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.06, gx: 0.5, yaw: 0.85, pitch: 0})}
];
handMug2.visible = false; puddle.visible = false;

function cursor(g, x, y) { g.save(); g.translate(x, y); g.fillStyle = '#fff'; g.strokeStyle = '#000'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 30); g.lineTo(8, 23); g.lineTo(14, 36); g.lineTo(19, 33); g.lineTo(13, 21); g.lineTo(23, 21); g.closePath(); g.fill(); g.stroke(); g.restore(); }
function ctr(g, txt, x, y, font, col) { g.font = font; g.fillStyle = col; g.textAlign = 'center'; g.fillText(txt, x, y); g.textAlign = 'left'; }
function uptrend(m) { return 2350 + m * 1.1 + Math.sin(m * 2.1) * 0.9 + Math.sin(m * 5.3 + 1) * 0.35 - 3 * sm((m - 3) / 1.2) * (1 - sm((m - 5) / 1.5)); }

function drawScreens(T) {
  const A = screens.A, g = A.g, w = A.c.width, h = A.c.height;
  if (T < 3.0) { // course sales page
    const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#2a0b4d'); gr.addColorStop(1, '#6b1474'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    ctr(g, 'TRADING MASTERCLASS', w / 2, 70, '900 46px sans-serif', '#ffd34a');
    ctr(g, 'POSTANI PROFESIONALAC ZA 30 DANA', w / 2, 112, 'bold 24px sans-serif', '#fff');
    ctr(g, '5.000 KM', w / 2 - 150, 190, 'bold 34px sans-serif', '#c79bd6'); g.fillStyle = '#ff5a6a'; g.fillRect(w / 2 - 240, 178, 180, 4);
    ctr(g, '2.000 KM', w / 2 + 90, 200, '900 64px sans-serif', '#fff');
    const pu = 1 + Math.sin(T * 6) * 0.04; g.save(); g.translate(w / 2, 280); g.scale(pu, pu); g.fillStyle = '#21c17a'; g.fillRect(-170, -36, 340, 72); ctr(g, 'KUPI ODMAH', 0, 13, '900 36px sans-serif', '#fff'); g.restore();
    const left = 299 - T * 1; const mm = Math.floor(left / 60), ss = Math.floor(left % 60);
    ctr(g, `Ponuda ističe za 00:0${mm}:${String(ss).padStart(2, '0')}`, w / 2, 370, 'bold 26px monospace', '#ffb3c0');
  } else if (T < 5.0) { // checkout
    const k = T - 3.0, paid = T >= 4.0;
    g.fillStyle = '#f2f4f8'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#1b2233'; g.font = 'bold 30px sans-serif'; g.fillText('Plaćanje', 40, 60);
    g.fillStyle = '#5a6478'; g.font = '24px sans-serif'; g.fillText('Trading Masterclass', 40, 110); g.textAlign = 'right'; g.fillText('2.000,00 KM', w - 40, 110); g.textAlign = 'left';
    g.strokeStyle = '#c9cfdb'; g.lineWidth = 2; g.strokeRect(40, 140, w - 80, 56); g.fillStyle = '#9aa3b5'; g.font = '24px monospace'; g.fillText('Kartica  •••• •••• •••• ••••', 60, 177);
    g.fillStyle = paid ? '#21c17a' : '#3d7bff'; g.fillRect(40, 230, w - 80, 80); ctr(g, paid ? 'PLAĆENO ✓' : 'PLATI 2.000 KM', w / 2, 283, '900 36px sans-serif', '#fff');
    if (!paid) { const q = ease(k / 0.85); cursor(g, lerp(w * 0.75, w / 2 + 40, q), lerp(h * 0.92, 270, q)); }
    if (paid) { const a = easeBack(clamp((T - 4.0) / 0.3)); g.save(); g.globalAlpha = clamp((T - 4.0) / 0.15); g.translate(w / 2, 380); g.scale(a, a); ctr(g, 'Hvala na kupovini!', 0, 0, 'bold 28px sans-serif', '#21a06a'); g.restore(); }
  } else if (T < 7.9) { // PDF
    g.fillStyle = '#525866'; g.fillRect(0, 0, w, h);
    if (T < 5.75) {
      const p = clamp((T - 5.0) / 0.7); ctr(g, 'Preuzimanje: Tajna_trejdinga.pdf', w / 2, 170, 'bold 26px sans-serif', '#fff');
      g.fillStyle = '#2d313a'; g.fillRect(140, 200, w - 280, 30); g.fillStyle = '#3d7bff'; g.fillRect(140, 200, (w - 280) * ease(p), 30);
      ctr(g, Math.round(ease(p) * 100) + '%', w / 2, 270, 'bold 24px monospace', '#fff');
    } else {
      const pages = [['Kupuj nisko,', 'prodaj visoko.'], ['Ne gubi', 'novac.'], ['Vjeruj', 'procesu.']];
      const pi = T < 6.75 ? 0 : (T < 7.3 ? 1 : 2), t0 = [5.75, 6.75, 7.3][pi], fl = easeOut(clamp((T - t0) / 0.18));
      g.save(); g.translate(w / 2, h / 2); g.scale(lerp(0.85, 1, fl), 1);
      g.fillStyle = '#fff'; g.fillRect(-170, -200, 340, 400);
      ctr(g, 'TAJNA TREJDINGA', 0, -150, '900 26px serif', '#222');
      g.fillStyle = '#ddd'; g.fillRect(-120, -132, 240, 2);
      pages[pi].forEach((l, i) => ctr(g, l, 0, -40 + i * 50, 'bold 40px serif', '#111'));
      ctr(g, `Stranica ${pi + 1} od 5`, 0, 180, '20px serif', '#888'); g.restore();
    }
  } else { // learning chart with annotations
    const m = T - 9.0; g.fillStyle = '#0b1220'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#162033'; g.lineWidth = 1; for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
    const lo = 2348, hi = 2364, Y = p => 40 + (hi - p) / (hi - lo) * (h - 70);
    const step = 0.22, cw = 15, x0 = w - 60, kk = m / step, k = Math.floor(kk), fr = kk - k;
    for (let i = 0; i < 48; i++) {
      const idx = k - i, a = idx * step, b = Math.min(m, (idx + 1) * step), o = uptrend(a), c = uptrend(b); let hp = Math.max(o, c), lp2 = Math.min(o, c);
      for (let s = 0; s <= 5; s++) { const pp = uptrend(a + (b - a) * s / 5); hp = Math.max(hp, pp); lp2 = Math.min(lp2, pp); }
      const x = x0 - (i + fr) * cw - cw * 0.5; g.strokeStyle = g.fillStyle = c >= o ? '#21c17a' : '#ef4b57'; g.lineWidth = 2;
      g.beginPath(); g.moveTo(x, Y(hp + 0.15)); g.lineTo(x, Y(lp2 - 0.15)); g.stroke(); g.fillRect(x - 5, Math.min(Y(o), Y(c)), 10, Math.max(2, Math.abs(Y(o) - Y(c))));
    }
    g.fillStyle = '#6f8aa8'; g.font = 'bold 22px monospace'; g.fillText('XAUUSD · M5', 14, 28);
    const lvl = 2356.2, a1 = clamp((T - 14.0) / 0.5);
    if (a1 > 0) { g.globalAlpha = a1; g.setLineDash([10, 6]); g.strokeStyle = '#ffd34a'; g.lineWidth = 3; g.beginPath(); g.moveTo(40, Y(lvl)); g.lineTo(lerp(40, w - 70, easeOut(a1)), Y(lvl)); g.stroke(); g.setLineDash([]); g.fillStyle = '#ffd34a'; g.font = '900 30px sans-serif'; g.fillText('BOS', 60, Y(lvl) - 12); g.globalAlpha = 1; }
    const a2 = clamp((T - 14.7) / 0.4); if (a2 > 0) { g.globalAlpha = a2 * 0.8; g.fillStyle = 'rgba(74,168,255,0.35)'; g.fillRect(w * 0.45, Y(2354.5), 160, Y(2352.8) - Y(2354.5)); g.fillStyle = '#9fd0ff'; g.font = '900 24px sans-serif'; g.fillText('FVG', w * 0.45 + 8, Y(2354.5) + 26); g.globalAlpha = 1; }
  }
  A.t.needsUpdate = true;
  const B = screens.B, q = B.g, bw = B.c.width, bh = B.c.height;
  if (T < 9.0) {
    q.fillStyle = '#0d1320'; q.fillRect(0, 0, bw, bh); q.fillStyle = '#6f8aa8'; q.font = 'bold 24px monospace'; q.fillText('RAČUN', 20, 40);
    const bal = T < 4.0 ? 2350 : 350; q.font = '28px monospace'; q.fillStyle = '#9fb4cc'; q.fillText('Stanje', 20, 110);
    q.textAlign = 'right'; q.font = 'bold 40px monospace'; q.fillStyle = T < 4.0 ? '#fff' : '#ef4b57'; q.fillText(bal.toLocaleString('de-DE') + ',00 KM', bw - 20, 112); q.textAlign = 'left';
    if (T >= 4.0) { q.fillStyle = '#ef4b57'; q.font = 'bold 28px monospace'; q.fillText('-2.000,00 KM  Trading Masterclass', 20, 200); }
  } else {
    q.fillStyle = '#f7f2e6'; q.fillRect(0, 0, bw, bh); q.fillStyle = '#20283a'; q.fillRect(0, 0, bw, 60);
    q.fillStyle = '#ffc94a'; q.font = '900 28px sans-serif'; q.fillText('Wizz Trading · Koncept dana', 20, 40);
    q.fillStyle = '#1b1f2a'; q.font = 'bold 30px sans-serif'; ['BOS – Break of Structure', 'CHoCH – Change of Character', 'FVG – Fair Value Gap'].forEach((l, i) => { q.fillStyle = i === 0 ? '#1b1f2a' : '#7a8296'; q.fillText((i === 0 ? '▶ ' : '   ') + l, 30, 130 + i * 70); });
  }
  B.t.needsUpdate = true;
  drawClock(14, 10 + Math.floor(T * 0.8));
}
function setWorld(T) { animChar(DT, 'DT', T, 0); drawScreens(T); }

const WIDE = {pos: [DX + 3.2, 2.4, 3.4], target: [DX - 0.1, 1.0, 0.1], hh: 1.55};
const WIDE2 = {pos: [DX + 3.2, 2.35, 3.4], target: [DX - 0.05, 1.05, 0.08], hh: 1.38};
const scrA = new THREE.Vector3(DX - 0.62, 1.12, -0.42), nA = new THREE.Vector3(Math.sin(Math.PI / 2 - 0.38), 0, Math.cos(Math.PI / 2 - 0.38));
const MON1 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.toArray(), hh: 0.62};
const MON2 = {pos: scrA.clone().addScaledVector(nA, 0.42).toArray(), target: scrA.clone().add(new THREE.Vector3(0, 0.01, 0)).toArray(), hh: 0.52};
const FACE1 = {pos: [DX - 0.25, 1.7, 3.0], target: [DX + 0.15, 1.3, 0.0], hh: 0.75};
const FACE2 = {pos: [DX - 0.25, 1.7, 3.0], target: [DX + 0.22, 1.42, 0.02], hh: 0.48};
const RLX1 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.0, 1.1, 0.05], hh: 1.3};
const RLX2 = {pos: [DX + 3.2, 2.3, 3.4], target: [DX + 0.15, 1.2, 0.05], hh: 1.05};
const KD = {dur: 19.6};

window.renderFrame = i => {
  const T = i / FPS;
  if (T < 3.0) {
    setWorld(T); renderShot(WIDE, WIDE2, T / 3.0, T);
    hookBox(T, 0.15, 2.9, ['Platio sam kurs od 2.000 KM', 'da naučim trejding'], 400);
  } else if (T < 5.0) {
    setWorld(T); renderShot(MON1, MON2, (T - 3.0) / 2.0, T);
    caption(T, 4.15, 4.95, ['ULAGANJE U SEBE.'], 1500);
  } else if (T < 7.9) {
    setWorld(T); renderShot(MON2, MON1, (T - 5.0) / 2.9, T);
    caption(T, 5.85, 7.85, ['5 STRANICA.'], 1500);
  } else if (T < 9.6) {
    setWorld(T); renderShot(FACE1, FACE2, (T - 7.9) / 1.7, T);
  } else if (T < 13.4) {
    setWorld(T); renderShot(WIDE2, WIDE2, 0, T);
    phoneScene(T, 9.6, [
      {at: 0.55, title: 'KONCEPT DANA · BOS', lines: ['Break of Structure,', 'objašnjeno korak', 'po korak.'], time: '09:00'},
      {at: 1.45, title: 'KONCEPT DANA · CHoCH', lines: ['Kad tržište', 'mijenja smjer.'], time: '09:00'},
      {at: 2.35, title: 'KONCEPT DANA · FVG', lines: ['Fair Value Gap', 'na grafikonu.'], time: '09:00'}
    ], true);
    fadeIn(T, 9.6, 0.15, '255,255,255');
  } else if (T < 16.6) {
    setWorld(T); renderShot(RLX1, RLX2, (T - 13.4) / 3.2, T);
    caption(T, 15.1, 16.6, ['ISTO ZNANJE.', '0 KM.'], 1450, 96, '#ffd34a');
  } else { endCard(T, 16.6); fadeIn(T, 16.6, 0.2); }
  return OUT.toDataURL('image/jpeg', 0.92);
};
Promise.all([document.fonts.load('900 40px Mont'), document.fonts.load('700 40px Mont'), document.fonts.load('900 40px Orb'), document.fonts.load('900 40px Mont', 'ČĆŠŽĐ')]).then(() => { window.ready = true; });
