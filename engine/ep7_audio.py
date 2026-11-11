from ep_audio import *
D=15.0
mus=music_track(D,[],duck=[(9.0,12.0,0.45)])
M=Mix(D); M.x+=mus*0.5
typing(M,0.2,4.4,rate=14,amp=0.1)
t=5.6
while t<8.8: M.add(sfx_heart(),t,0.3); t+=0.5
M.add(sfx_click(),4.58,0.4); M.add(sfx_click(),6.18,0.4); M.add(sfx_ding(1760,0.4),6.2,0.15)
M.add(sfx_thud(),9.0,0.4); M.add(sfx_ding(1046,1.0),9.2,0.15); M.add(sfx_ding(1568,1.0),10.3,0.18)
M.add(sfx_whoosh(0.4),11.9,0.4); M.add(sfx_ding(1318,1.4),12.05,0.3)
x=M.x; x*=np.clip((D-np.arange(len(x))/sr)/0.5,0,1)
save('ep7_audio.wav',x); print('ok')
