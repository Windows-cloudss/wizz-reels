from ep_audio import *
D=15.6
mus=music_track(D,[],duck=[])
M=Mix(D); M.x+=mus*0.5
for c in (2.6,5.4,7.0,9.6): M.add(sfx_whoosh(),c-0.12,0.35)
t=2.7; k=0
while t<6.9: M.add(sfx_click(),t,0.35); t+=max(0.12,0.55-(t-2.7)*0.12)
M.add(sfx_notif(),7.5,0.4); M.add(sfx_notif()*0.7,8.3,0.3)
M.add(sfx_clink(),10.2,0.25)
for i in range(3): M.add(sfx_ding(1568+i*200,0.3),10.4+i*0.4,0.12)
M.add(sfx_whoosh(0.4),12.5,0.4); M.add(sfx_ding(1318,1.4),12.65,0.3)
x=M.x; x*=np.clip((D-np.arange(len(x))/sr)/0.5,0,1)
save('ep6_audio.wav',x); print('ok')
