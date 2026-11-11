// ================= EPISODE ENGINE (2D flat, smooth) =================
const FPS = 60;
renderer.shadowMap.enabled = false;
K.visible = false; bills.visible = false;
scene.background = new THREE.Color(0xdfe9ef);

// ---- daytime room ----
{
  const g = deskWall.image.getContext('2d'); const w = deskWall.image.width, h = deskWall.image.height;
  g.fillStyle = '#efe6d6'; g.fillRect(0, 0, w, h);
  for (let x = 0; x < w; x += 64) { g.fillStyle = '#e7dccb'; g.fillRect(x, 0, 30, h); }
  deskWall.needsUpdate = true;
  const c = carpet.image.getContext('2d'); c.fillStyle = '#c8b08c'; c.fillRect(0, 0, 256, 256);
  c.fillStyle = '#b89d76'; for (let y = 0; y < 256; y += 32) c.fillRect(0, y, 256, 3);
  c.fillStyle = '#bba07a'; for (let y = 0; y < 256; y += 32) c.fillRect(((y / 32) % 2) * 128 + 40, y, 3, 32);
  carpet.needsUpdate = true;
}
D.traverse(o => {
  if (!o.isMesh) return; const m = o.material; if (!m || !m.color) return;
  const hx = m.color.getHex();
  if (hx === 0xff2bd6 || hx === 0x2bd9ff) o.visible = false;
  if (o.geometry.type === 'PlaneGeometry' && o.geometry.parameters.width === 0.8 && o.geometry.parameters.height === 0.25) o.visible = false;
  if (hx === 0x2b2b33) m.color.setHex(0xb98a55);
  if (hx === 0x1a1a20) m.color.setHex(0x3a4150);
});
const skyTex = ctex(512, 512, (g, w, h) => {
  const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#8fc6ee'); gr.addColorStop(1, '#d9eefb'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(255,255,255,0.95)';
  for (const [x, y, r] of [[120, 120, 40], [170, 110, 55], [225, 125, 38], [360, 70, 30], [400, 64, 42], [440, 75, 28]]) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
  g.fillStyle = '#9fb4c6'; const R = rng(4);
  for (let x = 0; x < w; x += 44) { const bh = 120 + R() * 170; g.fillRect(x, h - bh, 40, bh); }
  g.fillStyle = '#b8c9d6'; for (let x = 0; x < w; x += 44) for (let y = h - 260; y < h; y += 26) if (R() > 0.45) g.fillRect(x + 8, y, 8, 12);
});
const frameM = std(0xf7f3ea);
function windowAt(parent, x, y, z, ry, ww, wh) {
  const gw = new THREE.Group(); gw.position.set(x, y, z); gw.rotation.y = ry; parent.add(gw);
  const p = mesh(new THREE.PlaneGeometry(ww, wh), new THREE.MeshBasicMaterial({map: skyTex}), 0, 0, 0, false, false); gw.add(p);
  const t = 0.05;
  gw.add(box(ww + t * 2, t, 0.05, frameM, 0, wh / 2, 0.01), box(ww + t * 2, t, 0.05, frameM, 0, -wh / 2, 0.01), box(t, wh, 0.05, frameM, -ww / 2, 0, 0.01), box(t, wh, 0.05, frameM, ww / 2, 0, 0.01), box(0.025, wh, 0.04, frameM, 0, 0, 0.01), box(ww, 0.025, 0.04, frameM, 0, 0, 0.01));
  return gw;
}
windowAt(D, DX - 0.88, 1.88, -1.3, Math.PI / 2, 0.95, 0.8);
windowAt(D, DX + 1.4, 1.8, -2.18, 0, 1.15, 1.0);
// plant
{
  const pot = std(0xd47a52), leaf = std(0x4f9a52), leaf2 = std(0x3d8044);
  D.add(cyl(0.16, 0.12, 0.3, pot, DX + 0.55, 0.15, -1.85));
  for (let i = 0; i < 9; i++) { const a = i * 0.7; const l = sph(0.09, i % 2 ? leaf : leaf2, DX + 0.55 + Math.cos(a) * 0.12, 0.42 + (i % 3) * 0.13, -1.85 + Math.sin(a) * 0.1, 0.45, 1.7, 0.35); l.rotation.z = Math.cos(a) * 0.5; l.rotation.x = Math.sin(a) * 0.4; D.add(l); }
}
// wall clock
const clockCv = document.createElement('canvas'); clockCv.width = clockCv.height = 256; const clockTex = new THREE.CanvasTexture(clockCv); clockTex.colorSpace = THREE.SRGBColorSpace;
{
  const cg = new THREE.Group(); cg.position.set(DX + 0.4, 2.35, -2.17); D.add(cg);
  cg.add(mesh(new THREE.CircleGeometry(0.17, 40), new THREE.MeshBasicMaterial({map: clockTex}), 0, 0, 0.012, false, false));
  cg.add(mesh(new THREE.TorusGeometry(0.17, 0.018, 10, 40), std(0x2a2a30), 0, 0, 0.012));
}
function drawClock(hh, mm) {
  const g = clockCv.getContext('2d'); g.fillStyle = '#fbfaf6'; g.fillRect(0, 0, 256, 256);
  g.translate(128, 128); g.strokeStyle = '#222'; g.lineCap = 'round';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; g.lineWidth = 6; g.beginPath(); g.moveTo(Math.sin(a) * 96, -Math.cos(a) * 96); g.lineTo(Math.sin(a) * 112, -Math.cos(a) * 112); g.stroke(); }
  const ha = ((hh % 12) + mm / 60) / 12 * Math.PI * 2, ma = mm / 60 * Math.PI * 2;
  g.lineWidth = 11; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.sin(ha) * 58, -Math.cos(ha) * 58); g.stroke();
  g.lineWidth = 7; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.sin(ma) * 90, -Math.cos(ma) * 90); g.stroke();
  g.fillStyle = '#d33'; g.beginPath(); g.arc(0, 0, 8, 0, 7); g.fill(); g.setTransform(1, 0, 0, 1, 0, 0); clockTex.needsUpdate = true;
}
// desk mug (spills) + hand mug
const deskMug = new THREE.Group();
{ const mm = std(0xf2f2ee); deskMug.add(cyl(0.045, 0.04, 0.09, mm, 0, 0.045, 0), mesh(new THREE.TorusGeometry(0.03, 0.009, 8, 16), mm, 0.05, 0.047, 0)); deskMug.add(cyl(0.038, 0.038, 0.004, std(0x5a2d14), 0, 0.087, 0)); }
deskMug.position.set(DX - 0.27, 0.763, 0.3); D.add(deskMug);
const handMug2 = new THREE.Group();
{ const mm = std(0xf2f2ee); handMug2.add(cyl(0.045, 0.04, 0.09, mm, 0, 0, 0), mesh(new THREE.TorusGeometry(0.03, 0.009, 8, 16), mm, 0.05, 0, 0), cyl(0.038, 0.038, 0.004, std(0x5a2d14), 0, 0.044, 0)); }
DT.arms[1].el.add(handMug2); handMug2.position.set(0, -0.36, 0.06);
// head scale + outlines
DT.head.scale.setScalar(1.15); DT.head.position.y = 0.9 + 0.0105;
{
  const ms = []; scene.traverse(o => { if (o.isMesh && o.geometry.type !== 'PlaneGeometry' && o.geometry.type !== 'CircleGeometry') ms.push(o); });
  for (const m of ms) { const h = new THREE.Mesh(m.geometry, new THREE.MeshBasicMaterial({color: 0x16121c, side: THREE.BackSide})); h.scale.setScalar(m.geometry.type === 'BoxGeometry' ? 1.03 : 1.05); m.add(h); }
}
// spill puddle + sunbeam (no outline)
const puddle = mesh(new THREE.CircleGeometry(1, 40), new THREE.MeshBasicMaterial({color: 0x6b3a1c}), DX - 0.36, 0.7655, 0.24, false, false); puddle.rotation.x = -Math.PI / 2; D.add(puddle);
{
  const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(1.2, 0); sh.lineTo(1.9, 1.6); sh.lineTo(0.7, 1.6); sh.lineTo(0, 0);
  const sb = mesh(new THREE.ShapeGeometry(sh), new THREE.MeshBasicMaterial({color: 0xfff1c4, transparent: true, opacity: 0.35, depthWrite: false}), DX + 0.6, 0.004, -2.1, false, false); sb.rotation.x = -Math.PI / 2; D.add(sb);
}
Object.assign(POSE, {
  mouse: {sx: -0.72, ex: -0.68, sz: -0.06},
  desk: {sx: -0.7, ex: -0.72, sz: -0.1},
  facedown: {sx: -1.25, ex: -1.25, sz: 0.2}
});

// ---- output canvas + camera ----
const OUT = document.createElement('canvas'); OUT.width = W; OUT.height = H; const ctx = OUT.getContext('2d');
const ocam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 80);
const ease = x => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const easeOut = x => 1 - Math.pow(1 - clamp(x), 3);
const easeBack = x => { x = clamp(x); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
function renderShot(a, b, k, T, shake = 0) {
  const e = ease(k), L = (i, j) => lerp(i, j, e);
  const pos = [0, 1, 2].map(i => L(a.pos[i], b.pos[i])), tg = [0, 1, 2].map(i => L(a.target[i], b.target[i])), hh = L(a.hh, b.hh);
  const dx = Math.sin(T * 0.7) * 0.012 + Math.sin(T * 1.3 + 1) * 0.006 + shake * (Math.sin(T * 31) * 0.6 + Math.sin(T * 47 + 2) * 0.4) * 0.03;
  const dy = Math.sin(T * 0.9 + 2) * 0.01 + shake * (Math.sin(T * 37 + 1) * 0.6 + Math.sin(T * 53) * 0.4) * 0.03;
  const asp = W / H; ocam.left = -hh * asp; ocam.right = hh * asp; ocam.top = hh; ocam.bottom = -hh; ocam.updateProjectionMatrix();
  ocam.position.set(pos[0] + dx, pos[1] + dy, pos[2]); ocam.lookAt(tg[0] + dx, tg[1] + dy, tg[2]);
  renderer.render(scene, ocam); ctx.drawImage(renderer.domElement, 0, 0, W, H);
}
const S = W / 1080; // overlay scale
function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function popA(T, t0, t1) { const a = clamp((T - t0) / 0.22), o = clamp((t1 - T) / 0.18); return {s: lerp(0.7, 1, easeBack(a)), al: Math.min(1, a * 2.5) * o}; }
function caption(T, t0, t1, lines, y, size = 78, color = '#fff') {
  if (T < t0 || T > t1) return; const p = popA(T, t0, t1);
  ctx.save(); ctx.globalAlpha = p.al; ctx.translate(W / 2, y * S); ctx.scale(p.s, p.s);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; let fs = size * S; ctx.font = `900 ${fs}px Mont`;
  const mw = Math.max(...lines.map(l => ctx.measureText(l).width)); if (mw > 960 * S) { fs *= 960 * S / mw; ctx.font = `900 ${fs}px Mont`; }
  lines.forEach((l, i) => { const yy = (i - (lines.length - 1) / 2) * fs * 1.18; ctx.lineJoin = 'round'; ctx.lineWidth = fs * 0.2; ctx.strokeStyle = '#111'; ctx.strokeText(l, 0, yy); ctx.fillStyle = color; ctx.fillText(l, 0, yy); });
  ctx.restore();
}
function hookBox(T, t0, t1, lines, y = 300) {
  if (T < t0 || T > t1) return; const p = popA(T, t0, t1);
  ctx.save(); ctx.globalAlpha = p.al; ctx.translate(W / 2, y * S); ctx.scale(p.s, p.s);
  const fs = 54 * S; ctx.font = `900 ${fs}px Mont`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const mw = Math.max(...lines.map(l => ctx.measureText(l).width)), bh = lines.length * fs * 1.25 + 40 * S;
  ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = 20 * S; rr(-mw / 2 - 34 * S, -bh / 2, mw + 68 * S, bh, 26 * S); ctx.fill(); ctx.shadowBlur = 0;
  ctx.fillStyle = '#111'; lines.forEach((l, i) => ctx.fillText(l, 0, (i - (lines.length - 1) / 2) * fs * 1.25));
  ctx.restore();
}
function sessionBadge(hh, mm, al = 1, label = 'NY SESIJA') {
  ctx.save(); ctx.globalAlpha = al; const x = 40 * S, y = 150 * S;
  ctx.fillStyle = 'rgba(15,18,28,0.82)'; rr(x, y, 410 * S, 70 * S, 35 * S); ctx.fill();
  ctx.fillStyle = '#ff3b4a'; ctx.beginPath(); ctx.arc(x + 38 * S, y + 35 * S, 11 * S, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = `900 ${34 * S}px Mont`; ctx.textBaseline = 'middle'; ctx.fillText(label, x + 62 * S, y + 37 * S);
  ctx.fillStyle = '#ffd36b'; ctx.fillText(`${hh}:${String(mm).padStart(2, '0')}`, x + 290 * S, y + 37 * S); ctx.restore();
}
function vhs(T, i) {
  const src = renderer.domElement, R = rng(i * 7 + 3), band = 24 * S;
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  for (let y = 0; y < H; y += band) { const off = (Math.sin(y * 0.013 + T * 25) * 10 + (R() > 0.92 ? (R() - 0.5) * 80 : 0)) * S; ctx.drawImage(src, 0, y * src.height / H, src.width, band * src.height / H, off, y, W, band); }
  ctx.fillStyle = 'rgba(40,60,140,0.18)'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(0,0,0,0.18)'; for (let y = 0; y < H; y += 6 * S) ctx.fillRect(0, y, W, 2 * S);
  const ny = ((T * 1.7) % 1) * H; ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(0, ny, W, 40 * S);
  ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `900 ${88 * S}px Mont`; ctx.textBaseline = 'top'; ctx.shadowColor = '#000'; ctx.shadowBlur = 8 * S;
  ctx.fillText('◀◀', 60 * S, 120 * S); ctx.font = `900 ${50 * S}px Mont`; ctx.fillText('PREMOTAJ', 60 * S, 230 * S); ctx.restore();
}
function endCard(T, t0) {
  const k = T - t0;
  const gr = ctx.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#0d1426'); gr.addColorStop(1, '#1a1030'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
  // drifting candles
  ctx.save(); ctx.globalAlpha = 0.13;
  for (let i = 0; i < 14; i++) { const R = rng(i + 50); const x = ((R() * 1200 - 60 + k * 30 * (0.5 + R())) % 1200) * S, y = (300 + R() * 1400) * S, hgt = (60 + R() * 160) * S, up = R() > 0.4;
    ctx.fillStyle = up ? '#21c17a' : '#ef4b57'; ctx.fillRect(x, y, 34 * S, hgt); ctx.fillRect(x + 15 * S, y - 40 * S, 4 * S, hgt + 80 * S); }
  ctx.restore();
  const a = easeBack(clamp(k / 0.5)), al = clamp(k / 0.25);
  ctx.save(); ctx.globalAlpha = al; ctx.translate(W / 2, 700 * S); ctx.scale(a, a); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const lg = ctx.createLinearGradient(0, -90 * S, 0, 90 * S); lg.addColorStop(0, '#ffe39a'); lg.addColorStop(1, '#e0a12a');
  ctx.fillStyle = lg; ctx.font = `900 ${190 * S}px Orb`; ctx.shadowColor = 'rgba(255,190,60,0.5)'; ctx.shadowBlur = 40 * S; ctx.fillText('WIZZ', 0, -40 * S);
  ctx.shadowBlur = 0; ctx.fillStyle = '#fff'; ctx.font = `900 ${66 * S}px Orb`; ctx.fillText('T R A D I N G', 0, 110 * S); ctx.restore();
  const l1 = clamp((k - 0.45) / 0.3), l2 = clamp((k - 0.75) / 0.3), l3 = clamp((k - 1.0) / 0.3);
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.globalAlpha = l1; ctx.fillStyle = '#e8ecf6'; ctx.font = `700 ${50 * S}px Mont`;
  ctx.fillText('Besplatna edukacija, analize', W / 2, (1010 + (1 - easeOut(l1)) * 30) * S); ctx.fillText('i signali svaki dan', W / 2, (1075 + (1 - easeOut(l1)) * 30) * S);
  ctx.globalAlpha = l2; const pulse = 1 + Math.sin(k * 5) * 0.025; ctx.translate(W / 2, 1260 * S); ctx.scale(pulse * lerp(0.8, 1, easeBack(l2)), pulse * lerp(0.8, 1, easeBack(l2)));
  ctx.fillStyle = '#ffc94a'; rr(-330 * S, -62 * S, 660 * S, 124 * S, 62 * S); ctx.fill();
  ctx.fillStyle = '#121212'; ctx.font = `900 ${50 * S}px Mont`; ctx.fillText('TELEGRAM · LINK U BIO', 0, 4 * S); ctx.restore();
  ctx.save(); ctx.globalAlpha = l3 * 0.75; ctx.fillStyle = '#c4cbe0'; ctx.textAlign = 'center'; ctx.font = `700 ${28 * S}px Mont`; ctx.fillText('Edukativni sadržaj, nije finansijski savjet.', W / 2, 1800 * S); ctx.restore();
}
// generic phone with group message
function phoneScene(T, t0, msgs, bgDraw, hdr) {
  hdr = hdr || {name: 'Wizz Trading', sub: 'edukacija · analize · signali', av: 'W', col: '#ffc94a', font: 'Orb'};
  const k = T - t0;
  if (bgDraw) { ctx.save(); ctx.filter = `blur(${16 * S}px)`; ctx.drawImage(renderer.domElement, -40 * S, -40 * S, W + 80 * S, H + 80 * S); ctx.restore(); ctx.fillStyle = 'rgba(10,12,20,0.35)'; ctx.fillRect(0, 0, W, H); }
  const up = easeOut(clamp(k / 0.45)), py = lerp(H + 100 * S, 330 * S, up) + Math.sin(T * 1.6) * 6 * S, px = W / 2 - 300 * S, pw = 600 * S, ph = 1240 * S;
  ctx.save(); ctx.translate(Math.sin(T * 1.1) * 5 * S, 0); ctx.rotate(Math.sin(T * 0.8) * 0.01);
  // hand
  ctx.fillStyle = '#d8a070'; ctx.strokeStyle = '#16121c'; ctx.lineWidth = 7 * S;
  rr(px - 70 * S, py + 620 * S, 180 * S, 520 * S, 80 * S); ctx.fill(); ctx.stroke();
  // phone
  ctx.fillStyle = '#16181f'; rr(px, py, pw, ph, 70 * S); ctx.fill(); ctx.lineWidth = 8 * S; ctx.stroke();
  const sx = px + 22 * S, sy = py + 22 * S, sw = pw - 44 * S, sh = ph - 44 * S;
  ctx.save(); rr(sx, sy, sw, sh, 52 * S); ctx.clip();
  ctx.fillStyle = '#dfe7d8'; ctx.fillRect(sx, sy, sw, sh);
  ctx.fillStyle = 'rgba(120,150,110,0.12)'; for (let yy = 0; yy < sh; yy += 70 * S) for (let xx = 0; xx < sw; xx += 70 * S) { ctx.beginPath(); ctx.arc(sx + xx + ((yy / 70 / S) % 2) * 35 * S, sy + yy, 8 * S, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#20283a'; ctx.fillRect(sx, sy, sw, 170 * S);
  ctx.fillStyle = hdr.col; ctx.beginPath(); ctx.arc(sx + 80 * S, sy + 105 * S, 44 * S, 0, 7); ctx.fill();
  ctx.fillStyle = '#121212'; ctx.font = `900 ${44 * S}px ${hdr.font || 'Mont'}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(hdr.av, sx + 80 * S, sy + 108 * S);
  ctx.textAlign = 'left'; ctx.fillStyle = '#fff'; ctx.font = `900 ${38 * S}px Mont`; ctx.fillText(hdr.name, sx + 145 * S, sy + 88 * S);
  ctx.fillStyle = '#9fb0cc'; ctx.font = `700 ${25 * S}px Mont`; ctx.fillText(hdr.sub, sx + 145 * S, sy + 128 * S);
  let y = sy + 220 * S;
  for (const m of msgs) {
    if (k < m.at - 0.5) break;
    if (k < m.at) { // typing dots
      ctx.fillStyle = '#fff'; rr(sx + 30 * S, y, 150 * S, 80 * S, 34 * S); ctx.fill(); ctx.fillStyle = '#8a94a6';
      for (let d = 0; d < 3; d++) { const b = Math.sin(k * 10 - d * 0.9) * 6 * S; ctx.beginPath(); ctx.arc(sx + (72 + d * 34) * S, y + 40 * S - Math.max(0, b), 10 * S, 0, 7); ctx.fill(); }
      break;
    }
    const pa = easeBack(clamp((k - m.at) / 0.3)); ctx.font = `700 ${44 * S}px Mont`;
    const fsc = Math.min(1, (sw - 120 * S) / Math.max(...m.lines.map(l => ctx.measureText(l).width)));
    let tw0 = 0; if (m.title) { ctx.font = `900 ${36 * S}px Mont`; tw0 = ctx.measureText(m.title).width; ctx.font = `700 ${44 * S}px Mont`; }
    const tsc = m.title ? Math.min(1, (sw - 120 * S) / tw0) : 1;
    const lh = 58 * S * fsc, bw = Math.max(Math.max(...m.lines.map(l => ctx.measureText(l).width)) * fsc, tw0 * tsc) + 60 * S, bh = m.lines.length * lh + (m.title ? 60 : 30) * S + 40 * S;
    ctx.save(); ctx.translate(sx + 30 * S, y); ctx.scale(pa, pa); ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,0.12)'; ctx.shadowBlur = 10 * S; rr(0, 0, Math.min(bw, sw - 60 * S), bh, 30 * S); ctx.fill(); ctx.shadowBlur = 0;
    let ty = 30 * S; if (m.title) { ctx.fillStyle = '#d18a00'; ctx.font = `900 ${36 * S * tsc}px Mont`; ctx.fillText(m.title, 30 * S, ty + 10 * S); ty += 56 * S; }
    ctx.fillStyle = '#1b1f2a'; ctx.font = `700 ${44 * S * fsc}px Mont`; m.lines.forEach((l, i) => ctx.fillText(l, 30 * S, ty + 10 * S + i * lh));
    ctx.fillStyle = '#8a94a6'; ctx.font = `700 ${22 * S}px Mont`; ctx.textAlign = 'right'; ctx.fillText(m.time || '', Math.min(bw, sw - 60 * S) - 24 * S, bh - 20 * S); ctx.textAlign = 'left';
    ctx.restore(); y += bh + 26 * S;
  }
  ctx.restore();
  // notch
  ctx.fillStyle = '#16181f'; rr(W / 2 - 90 * S, sy - 2 * S, 180 * S, 40 * S, 20 * S); ctx.fill();
  // thumb over phone edge
  ctx.fillStyle = '#d8a070'; ctx.strokeStyle = '#16121c'; ctx.lineWidth = 7 * S; rr(px - 40 * S, py + 760 * S, 120 * S, 240 * S, 60 * S); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function fadeIn(T, t0, d = 0.25, col = '0,0,0') { const a = 1 - clamp((T - t0) / d); if (a > 0) { ctx.fillStyle = `rgba(${col},${a})`; ctx.fillRect(0, 0, W, H); } }
