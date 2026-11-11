from ep_audio import *
D=18.6
mus=music_track(D,[],duck=[(7.96,9.3,0.0)])
M=Mix(D); M.x+=mus*0.55
M.add(sfx_click(),2.62,0.4)
for s,d in [(2.8,0.85),(5.35,0.55),(7.0,0.32)]:
    M.add(sfx_kaching(),s,0.3); M.add(sfx_whoosh(0.25),s+d-0.08,0.3); M.add(sfx_beep(),s+d*2,0.2); M.add(sfx_thud(),s+d*2,0.45)
M.add(sfx_sad()[:int(1.3*sr)],7.96,0.3)
for c in (9.3,11.8): M.add(sfx_whoosh(),c-0.12,0.35)
M.add(sfx_notif(),9.8,0.4)
for t in (12.0,12.8,13.6): M.add(sfx_ding(1318+ (t-12)*300,0.4),t,0.15)
M.add(sfx_ding(1568,0.6),14.1,0.18)
M.add(sfx_whoosh(0.4),15.5,0.4); M.add(sfx_ding(1318,1.4),15.65,0.3)
x=M.x; x*=np.clip((D-np.arange(len(x))/sr)/0.5,0,1)
save('ep5_audio.wav',x); print('ok')
