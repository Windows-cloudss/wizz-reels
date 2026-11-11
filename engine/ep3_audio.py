from ep_audio import *
D=19.6
mus=music_track(D,[],duck=[(8.4,10.0,0.15)])
M=Mix(D); M.x+=mus*0.55
for c in (3.0,6.6,10.0,13.6): M.add(sfx_whoosh(),c-0.12,0.35)
t=2.6; k=0
while t<6.4: M.add(sfx_click(),t,0.3); M.add(sfx_ding(1200+(k%5)*120,0.12),t+0.02,0.05); t+=max(0.09,0.5-(t-2.6)*0.12); k+=1
t=6.8
while t<8.4: M.add(sfx_heart(),t,0.4); t+=0.45
L=int(1.6*sr); tt=np.arange(L)/sr; M.add(np.sin(2*np.pi*np.cumsum(300+1400*tt/1.6)/sr)*np.minimum(1,tt/0.05),6.8,0.06)  # rising whine
nz=np.random.default_rng(3).normal(0,1,int(1.2*sr)); M.add(lp(nz,3)*np.exp(-np.arange(len(nz))/sr*3.5),8.45,0.9); M.add(sfx_thud(),8.45,0.9)
M.add(sfx_kaching()*0.4,8.55,0.2)
for t in (10.55,11.35,12.15): M.add(sfx_notif(),t,0.35)
M.add(sfx_ding(1568,0.6),14.4,0.18)
M.add(sfx_whoosh(0.4),16.5,0.4); M.add(sfx_ding(1318,1.4),16.65,0.3)
x=M.x; x*=np.clip((D-np.arange(len(x))/sr)/0.5,0,1)
save('ep3_audio.wav',x); print('ok')
