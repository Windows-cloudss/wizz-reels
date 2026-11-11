// ================= EPISODE 7: "Dan 1 vs Dan 30" (split screen) =================
const E0 = {bl: 0.1, br: 0.1, tilt: 0, smile: 0.1, sweat: 0, gx: -0.9, gy: 0, yaw: 0.25, pitch: 0.05, lean: 0.05};
const ex = o => ({...E0, ...o});
TRACKS.D1 = [
  {t: 0, ...P('type'), e: ex({smile: -0.1, bl: 0.6, br: 0.6, tilt: 0.4, lean: 0.2, sweat: 0.5})},
  {t: 4.4, ...P('desk', 'mouse'), e: ex({smile: 0.6, bl: 0.8, br: 0.8, tilt: 0.1, lean: 0.22, sweat: 0.6})},
  {t: 5.6, ...P('desk', 'mouse'), e: ex({smile: -0.4, bl: 0.9, br: 0.9, tilt: 0.75, lean: 0.24, sweat: 1})},
  {t: 7.0, ...P('head'), e: ex({smile: -0.6, bl: 1, br: 1, tilt: 0.85, sweat: 1, lean: 0.04, yaw: 0.35})},
  {t: 7.6, ...P('head'), e: ex({smile: -0.7, bl: 1, br: 1, tilt: 0.9, sweat: 1, lean: 0.04, gx: 0.5, yaw: 0.85, pitch: 0})},
  {t: 15, ...P('head'), e: ex({smile: -0.7, bl: 1, br: 1, tilt: 0.9, sweat: 1, lean: 0.04, gx: 0.5, yaw: 0.85, pitch: 0})}
];
TRACKS.D30 = [
  {t: 0, ...P('rest', 'mugup'), e: ex({smile: 0.3, lean: -0.1, gx: -0.8, yaw: 0.3, pitch: 0})},
  {t: 5.4, ...P('rest', 'mugup'), e: ex({smile: 0.3, lean: -0.1, gx: -0.8, yaw: 0.3, pitch: 0})},
  {t: 6.0, ...P('rest', 'mouse'), e: ex({smile: 0.5, bl: 0.3, br: 0.3, lean: 0.05})},
  {t: 7.0, ...P('rest', 'mouse'), e: ex({smile: 0.6, bl: 0.3, br: 0.3, lean: -0.04})},
  {t: 7.6, ...P('rest', 'mouse'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.06, gx: 0.5, yaw: 0.85, pitch: 0})},
  {t: 15, ...P('rest', 'mouse'), e: ex({smile: 1.0, bl: 0.5, br: 0.5, lean: -0.06, gx: 0.5, yaw: 0.85, pitch: 0})}
];
puddle.visible = false;
const E1 = 4.6, E30 = 6.2;
function pr(m) { const n = Math.sin(m * 2.1) * 0.5 + Math.sin(m * 5.3 + 1) * 0.25 + Math.sin(m * 11.7 + 2) * 0.1; return 2346 + n - 9 * sm((m - 2.5) / 3.0) + 7 * sm((m - 5.9) / 2.5); }
function chart(g, w, h, m, lo, hi) {
  g.fillStyle = '#0b1220'; g.fillRect(0, 0, w, h); g.strokeStyle = '#162033'; g.lineWidth = 1; for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
  const Y = p => 40 + (hi - p) / (hi - lo) * (h - 70), step = 0.22, cw = 15, x0 = w - 120, kk = m / step, k = Math.floor(kk), fr = kk - k;
  for (let i = 0; i < 44; i++) { const idx = k - i, a = idx * step, b = Math.min(m, (idx + 1) * step), o = pr(a), c = pr(b); let hp = Math.max(o, c), lp2 = Math.min(o, c);
    for (let s = 0; s <= 5; s++) { const pp = pr(a + (b - a) * s / 5); hp = Math.max(hp, pp); lp2 = Math.min(lp2, pp); }
    const x = x0 - (i + fr) * cw - cw * 0.5; g.strokeStyle = g.fillStyle = c >= o ? '#21c17a' : '#ef4b57'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, Y(hp + 0.15)); g.lineTo(x, Y(lp2 - 0.15)); g.stroke(); g.fillRect(x - 5, Math.min(Y(o), Y(c)), 10, Math.max(2, Math.abs(Y(o) - Y(c)))); }
  g.fillStyle = '#6f8aa8'; g.font = 'bold 22px monospace'; g.fillText('XAUUSD · M5', 14, 28); return {Y, x0, cw, step, fr, k};
}
function tagLine(g, w, Y, pp, col, label) { g.setLineDash([10, 6]); g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); g.moveTo(0, Y(pp)); g.lineTo(w - 120, Y(pp)); g.stroke(); g.setLineDash([]); g.fillStyle = col; g.fillRect(w - 120, Y(pp) - 13, 120, 26); g.fillStyle = '#fff'; g.font = 'bold 17px monospace'; g.fillText(label, w - 114, Y(pp) + 6); }
function drawDay(day, T) {
  const A = screens.A, g = A.g, w = A.c.width, h = A.c.height, lo = 2332, hi = 2352;
  const C = chart(g, w, h, T, lo, hi), Y = C.Y;
  if (day === 1) {
    const cols = ['#ff6ad5', '#ffd34a', '#4aa8ff', '#9b6aff', '#ff9a3a', '#5affd2', '#ff4a6a', '#c8ff4a'];
    cols.forEach((c, j) => { g.strokeStyle = c; g.lineWidth = 2; g.beginPath(); for (let x = 0; x <= w - 120; x += 12) { const m = T - (w - 120 - x) / 15 * 0.22; const v = pr(m - j * 0.3) + Math.sin(x * 0.02 + j) * (0.6 + j * 0.15); x ? g.lineTo(x, Y(v)) : g.moveTo(x, Y(v)); } g.stroke(); });
    g.fillStyle = 'rgba(30,20,50,0.9)'; g.fillRect(0, h - 90, w, 90); g.strokeStyle = '#ff6ad5'; g.lineWidth = 2; g.beginPath(); for (let x = 0; x < w; x += 10) { const v = Math.sin(x * 0.05 + T * 3) * 25; x ? g.lineTo(x, h - 45 + v) : g.moveTo(x, h - 45 + v); } g.stroke();
    g.fillStyle = '#fff'; g.font = 'bold 16px monospace'; g.fillText('RSI · MACD · STOCH · BB · EMA x5 · ICHIMOKU', 10, h - 72);
    if (T >= E1) { const ent = pr(E1); tagLine(g, w, Y, ent, '#4aa8ff', 'BUY'); const pnl = (pr(T) - ent) * 100; g.fillStyle = pnl < 0 ? '#ef4b57' : '#21c17a'; g.font = 'bold 30px monospace'; g.fillText((pnl < 0 ? '-$' : '+$') + Math.abs(pnl).toFixed(0), 14, 60); }
  } else {
    const a = 1; tagLine(g, w, Y, 2337, '#21c17a', 'PODRŠKA'); tagLine(g, w, Y, 2350, '#ef4b57', 'OTPOR');
    if (T < E30) { g.fillStyle = '#f5b33a'; g.font = '900 24px sans-serif'; g.fillText('ČEKAM POTVRDU', 14, 60); }
    else { tagLine(g, w, Y, pr(E30), '#4aa8ff', 'ULAZ'); g.fillStyle = '#21c17a'; g.font = '900 24px sans-serif'; g.fillText('POTVRDA ✓  ·  RIZIK 1%', 14, 60); }
  }
  A.t.needsUpdate = true;
  const B = screens.B, q = B.g, bw = B.c.width, bh = B.c.height;
  if (day === 1) { q.fillStyle = '#1a0d14'; q.fillRect(0, 0, bw, bh); q.fillStyle = '#ff9aa6'; q.font = 'bold 26px sans-serif'; ['Kupi?? Prodaj??', 'Video #14: "NIKAD ne čekaj"', 'Video #15: "UVIJEK čekaj"', 'RSI kaže 71... ili 29?'].forEach((l, i) => q.fillText(l, 20, 60 + i * 60)); }
  else { q.fillStyle = '#f7f2e6'; q.fillRect(0, 0, bw, bh); q.fillStyle = '#20283a'; q.fillRect(0, 0, bw, 60); q.fillStyle = '#ffc94a'; q.font = '900 28px sans-serif'; q.fillText('Moj plan', 20, 40); ['✓ Nivoi ucrtani', '✓ Analiza dana pročitana', T >= E30 ? '✓ Potvrda na M5' : '☐ Potvrda na M5', '✓ Rizik: 1%'].forEach((l, i) => { q.fillStyle = l[0] === '✓' ? '#21a06a' : '#1b1f2a'; q.font = 'bold 30px sans-serif'; q.fillText(l, 30, 120 + i * 62); }); }
  B.t.needsUpdate = true; drawClock(15, 30 + Math.floor(T * 0.8));
}
function setDay(day, T) { const s = animChar(DT, day === 1 ? 'D1' : 'D30', T, 0); handMug2.visible = s.R.ex < -1.0; deskMug.visible = !handMug2.visible; drawDay(day, T); }
const HALF_A = {pos: [DX + 3.2, 2.3, 3.4], target: [DX - 0.15, 1.12, 0.0], hh: 0.78};
const HALF_B = {pos: [DX + 3.2, 2.3, 3.4], target: [DX - 0.05, 1.15, 0.0], hh: 0.7};
function renderHalf(top, a, b, k, T) {
  const e = ease(k), L = (i, j) => lerp(i, j, e), hw = H / 2;
  const pos = [0, 1, 2].map(i => L(a.pos[i], b.pos[i])), tg = [0, 1, 2].map(i => L(a.target[i], b.target[i])), hh = L(a.hh, b.hh);
  const dx = Math.sin(T * 0.7 + (top ? 0 : 2)) * 0.01, dy = Math.sin(T * 0.9 + (top ? 1 : 3)) * 0.008, asp = W / hw;
  ocam.left = -hh * asp; ocam.right = hh * asp; ocam.top = hh; ocam.bottom = -hh; ocam.updateProjectionMatrix();
  ocam.position.set(pos[0] + dx, pos[1] + dy, pos[2]); ocam.lookAt(tg[0] + dx, tg[1] + dy, tg[2]);
  renderer.setScissorTest(true); renderer.setViewport(0, 0, W, hw); renderer.setScissor(0, 0, W, hw); renderer.render(scene, ocam); renderer.setScissorTest(false); renderer.setViewport(0, 0, W, H);
  ctx.drawImage(renderer.domElement, 0, H - hw, W, hw, 0, top ? 0 : hw, W, hw);
}
function dayTag(txt, y, col) { ctx.save(); ctx.font = `900 ${64 * S}px Mont`; const tw = ctx.measureText(txt).width; ctx.fillStyle = col; rr(40 * S, y * S, tw + 60 * S, 96 * S, 24 * S); ctx.fill(); ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 70 * S, (y + 50) * S); ctx.restore(); }

window.renderFrame = i => {
  const T = i / FPS;
  if (T < 12.0) {
    const k = clamp(T / 9.0);
    setDay(1, T); renderHalf(true, HALF_A, HALF_B, k, T);
    setDay(30, T); renderHalf(false, HALF_A, HALF_B, k, T);
    ctx.fillStyle = '#111'; ctx.fillRect(0, H / 2 - 5 * S, W, 10 * S);
    dayTag('DAN 1', 60, '#e0344a'); dayTag('DAN 30', 1020, '#1f9e62');
    if (T < 2.7) hookBox(T, 0.15, 2.6, ['Prvi dan u grupi', 'vs trideseti'], 960);
    caption(T, 2.8, 4.5, ['10 INDIKATORA.'], 860, 66); caption(T, 2.8, 4.5, ['2 NIVOA.'], 1820, 66, '#ffd34a');
    caption(T, 4.6, 7.4, ['ULAZ NA PRVU SVIJEĆU.'], 860, 60); caption(T, 4.6, 6.2, ['ČEKAM POTVRDU.'], 1820, 60, '#ffd34a'); caption(T, 6.2, 7.4, ['TEK SAD ULAZIM.'], 1820, 60, '#ffd34a');
    if (T > 9.0) { const a = clamp((T - 9.0) / 0.3); ctx.fillStyle = `rgba(8,10,18,${0.7 * a})`; ctx.fillRect(0, 0, W, H);
      caption(T, 9.2, 12.0, ['RAZLIKA NIJE SREĆA.'], 860, 84); caption(T, 10.3, 12.0, ['RAZLIKA JE ZNANJE.'], 1110, 84, '#ffd34a'); }
  } else { endCard(T, 12.0); fadeIn(T, 12.0, 0.2); }
  return OUT.toDataURL('image/jpeg', 0.92);
};
Promise.all([document.fonts.load('900 40px Mont'), document.fonts.load('700 40px Mont'), document.fonts.load('900 40px Orb'), document.fonts.load('900 40px Mont', 'ČĆŠŽĐ')]).then(() => { window.ready = true; });
