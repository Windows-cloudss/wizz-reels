import base64, sys, os, time
from playwright.sync_api import sync_playwright
page_name, outdir, a, b = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv)>4 else None
frames = [int(x) for x in a.split(',')] if b is None else list(range(int(a), int(b)))
os.makedirs(outdir, exist_ok=True)
with sync_playwright() as p:
    br = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
    pg = br.new_page(viewport={'width':1080,'height':1920})
    pg.on('pageerror', lambda e: print('pageerror:', e, flush=True))
    pg.goto(f'http://localhost:8765/v3/{page_name}?w=1080&h=1920'); pg.wait_for_function('window.ready===true', timeout=120000)
    t0=time.time()
    for n,i in enumerate(frames):
        d = pg.evaluate(f'window.renderFrame({i})'); open(f'{outdir}/f{i:05d}.jpg','wb').write(base64.b64decode(d.split(',')[1]))
        if n==3: print('per frame', round((time.time()-t0)/4,2), flush=True)
    br.close()
print('done', len(frames), round(time.time()-t0,1))
