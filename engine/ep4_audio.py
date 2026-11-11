from ep_audio import *
D=20.4
mus=music_track(D,[],duck=[(8.9,12.0,0.18)])
M=Mix(D); M.x+=mus*0.55
typing(M,0.3,2.9)
for c in (3.2,5.6,7.6,10.0,12.0,14.8): M.add(sfx_whoosh(),c-0.12,0.35)
for t in (3.65,4.15,4.7): M.add(sfx_notif()*0.7,t,0.3)
L=int(0.55*sr); tt=np.arange(L)/sr; M.add(np.sin(2*np.pi*np.cumsum(300+900*tt/0.55)/sr)*0.5*np.minimum(1,tt/0.02),5.75,0.12)
M.add(sfx_click(),6.48,0.5); M.add(sfx_ding(1760,0.3),6.5,0.12)
t=7.7
while t<9.0: M.add(sfx_heart(),t,0.45); t+=max(0.38,0.6-(t-7.7)*0.12)
for k in range(5): M.add(sfx_beep(),9.0+k*0.18,0.18)
M.add(sfx_thud(),9.0,0.5); M.add(sfx_sad(),9.4,0.3)
M.add(sfx_notif()*0.7,10.55,0.3)
M.add(sfx_notif(),12.5,0.4)
M.add(sfx_ding(1568,0.6),15.5,0.18)
M.add(sfx_whoosh(0.4),17.3,0.4); M.add(sfx_ding(1318,1.4),17.45,0.3)
x=M.x; x*=np.clip((D-np.arange(len(x))/sr)/0.5,0,1)
save('ep4_audio.wav',x); print('ok')
