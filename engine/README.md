# Wizz Trading 2D flat reel engine
- Serve parent dir that contains `node_modules` (three@0.187, @fontsource/montserrat, @fontsource/orbitron) on :8765 and this folder as /v3.
- Build page: `cat engine_head.html ep_common.js epN.js > epN.html && echo '</script>' >> epN.html`
- Render frames: `python3 ep_render.py epN.html epNf 0 <frames>` (60 fps, 1080x1920, Chrome + swiftshader via playwright)
- Audio: `python3 epN_audio.py` -> epN_audio.wav ; encode with ffmpeg (libx264 crf19, 60 fps, loudnorm -14).
- Story rule: relatable mistake -> ironic fail -> Wizz Trading group (Telegram) as the fix -> end card. Daytime room. No profit promises; disclaimer on end card.
