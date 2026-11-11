from ep_audio import *
D=20.0
mus=music_track(D,[],duck=[(7.7,11.2,0.2)])
M=Mix(D); M.x+=mus*0.55
typing(M,0.3,2.1)
M.add(sfx_whoosh(0.5),2.1,0.25)
for c in (3.2,5.2,8.0,13.6): M.add(sfx_whoosh(),c-0.12,0.35)
M.add(sfx_click(),3.52,0.5); M.add(sfx_ding(1760,0.3),3.55,0.12)
for t in (5.45,6.4): M.add(sfx_click(),t-0.3,0.35); M.add(sfx_click(),t+0.33,0.35)
t=5.3
while t<7.7: M.add(sfx_heart(),t,0.45); t+=max(0.42,0.75-(t-5.3)*0.14)
for k in range(4): M.add(sfx_beep(),7.7+k*0.2,0.18)
M.add(sfx_thud(),8.0,0.5); M.add(sfx_splash(),8.27,0.5); M.add(sfx_sad(),8.5,0.35)
M.add(sfx_rewind(1.2),10.0,0.45)
M.add(sfx_notif(),11.75,0.45)
M.add(sfx_clink(),14.05,0.25)
M.add(sfx_ding(1568,0.6),15.5,0.18)
M.add(sfx_whoosh(0.4),16.9,0.4); M.add(sfx_ding(1318,1.4),17.05,0.3)
x=M.x; x*=np.clip((D-np.arange(len(x))/sr)/0.5,0,1)
save('ep1_audio.wav',x); print('ok')
