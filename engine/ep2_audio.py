from ep_audio import *
D=19.6
mus=music_track(D,[],duck=[(7.9,9.6,0.0)])
M=Mix(D); M.x+=mus*0.55
typing(M,0.3,2.8)
for c in (3.0,5.0,7.9,9.6,13.4): M.add(sfx_whoosh(),c-0.12,0.35)
M.add(sfx_click(),3.95,0.5); M.add(sfx_kaching(),4.0,0.4)
M.add(sfx_click(),5.0,0.3); M.add(sfx_ding(1760,0.3),5.7,0.12)
for t in (6.75,7.3): M.add(sfx_whoosh(0.18),t-0.05,0.3)
M.add(sfx_ding(523,1.6)*0.5,7.95,0.12)  # awkward silence tone
for k,t in enumerate((10.15,11.05,11.95)): M.add(sfx_notif(),t,0.35)
M.add(sfx_click(),14.0,0.25); M.add(sfx_click(),14.7,0.25)
M.add(sfx_ding(1568,0.6),15.1,0.18)
M.add(sfx_whoosh(0.4),16.5,0.4); M.add(sfx_ding(1318,1.4),16.65,0.3)
x=M.x; x*=np.clip((D-np.arange(len(x))/sr)/0.5,0,1)
save('ep2_audio.wav',x); print('ok')
