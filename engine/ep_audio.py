import numpy as np, wave, sys, json
sr=44100
def save(name,x):
    x=x/np.abs(x).max()*0.89; st=np.stack([x,x],1)
    with wave.open(name,'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes((st*32767).astype('<i2').tobytes())
class Mix:
    def __init__(s,dur,seed=1): s.n=int(dur*sr); s.x=np.zeros(s.n); s.t=np.arange(s.n)/sr; s.r=np.random.default_rng(seed); s.dur=dur
    def add(s,sig,at,amp=1.0):
        i=int(at*sr)
        if i<0: sig=sig[-i:]; i=0
        if i>=s.n: return
        m=min(len(sig),s.n-i); s.x[i:i+m]+=amp*sig[:m]
def lp(x,k): return np.convolve(x,np.ones(k)/k,mode='same')
def env_ad(L,a,d): tt=np.arange(L)/sr; return np.minimum(1,tt/max(a,1e-4))*np.exp(-tt/d)
# ---- music: lofi loop ----
def music(dur,bpm=84,seed=3,mood='chill'):
    M=Mix(dur,seed); beat=60/bpm; r=M.r
    chords=[[220,261.6,329.6,392],[174.6,220,261.6,329.6],[196,246.9,293.7,349.2],[164.8,207.7,246.9,329.6]]
    bar=beat*4; nb=int(dur/bar)+1
    for b in range(nb):
        ch=chords[b%4]; t0=b*bar; L=int(bar*sr); tt=np.arange(L)/sr
        sig=sum(np.sin(2*np.pi*f*tt)*(1+0.3*np.sin(2*np.pi*f*2*tt)) for f in ch)/len(ch)
        sig*=(0.6+0.4*np.sin(2*np.pi*4*tt/bar))*np.minimum(1,tt/0.05)*np.exp(-tt*0.35)
        M.add(lp(sig,6),t0,0.22)
        M.add(np.sin(2*np.pi*ch[0]/2*tt)*np.exp(-tt*1.2)*np.minimum(1,tt/0.02),t0,0.28)
        for q in range(4):
            tb=t0+q*beat
            if q in (0,2): L2=int(0.35*sr); t2=np.arange(L2)/sr; f=50+70*np.exp(-t2*25); M.add(np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-t2*9),tb,0.55)
            if q in (1,3): L2=int(0.25*sr); nz=r.normal(0,1,L2); M.add(lp(nz,3)*env_ad(L2,0.002,0.07),tb,0.18)
            for h in (0,0.5):
                L2=int(0.06*sr); nz=r.normal(0,1,L2); nz=nz-lp(nz,8); M.add(nz*env_ad(L2,0.001,0.015),tb+beat*h+r.uniform(0,0.012),0.07)
    return M.x
# ---- sfx ----
def sfx_click(): L=int(0.04*sr); nz=np.random.default_rng(1).normal(0,1,L); t=np.arange(L)/sr; return nz*np.sin(2*np.pi*3000*t)*np.exp(-t*160)
def sfx_whoosh(d=0.35): L=int(d*sr); t=np.arange(L)/sr; nz=np.random.default_rng(2).normal(0,1,L); nz=lp(nz,10)-lp(nz,80); return nz*np.sin(np.pi*t/d)**2*3
def sfx_ding(f=1318,d=1.2): L=int(d*sr); t=np.arange(L)/sr; return (np.sin(2*np.pi*f*t)*np.exp(-t*3)+0.4*np.sin(2*np.pi*f*1.5*t)*np.exp(-t*5))
def sfx_notif(): a=sfx_ding(988,0.5); b=sfx_ding(1480,0.7); o=np.zeros(int(0.9*sr)); o[:len(a)]+=a; o[int(0.12*sr):int(0.12*sr)+len(b)]+=b; return o
def sfx_alarm(n=4): o=np.zeros(int(n*0.22*sr)); 
def sfx_beep(f=880,d=0.12): L=int(d*sr); t=np.arange(L)/sr; return np.sign(np.sin(2*np.pi*f*t))*0.5*np.minimum(1,(d-t)/0.01)
def sfx_thud(): L=int(0.5*sr); t=np.arange(L)/sr; f=40+80*np.exp(-t*20); return np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-t*8)
def sfx_splash(): L=int(0.6*sr); t=np.arange(L)/sr; nz=np.random.default_rng(5).normal(0,1,L); nz=lp(nz,4)-lp(nz,40); return nz*np.exp(-t*7)*np.minimum(1,t/0.01)*2
def sfx_clink(): o=sfx_ding(2600,0.25)*0.6; o[:len(o)]+=sfx_ding(3300,0.25)*0.4; return o
def sfx_rewind(d=1.2):
    L=int(d*sr); t=np.arange(L)/sr; nz=np.random.default_rng(7).normal(0,1,L); nz=nz-lp(nz,6)
    f=600+500*np.sin(2*np.pi*7*t); w=np.sin(2*np.pi*np.cumsum(f)/sr)
    return (0.6*nz*(0.5+0.5*np.sin(2*np.pi*13*t))+0.5*w)*np.minimum(1,t/0.05)*np.minimum(1,(d-t)/0.08)
def sfx_heart(): o=sfx_thud()*0.8; b=sfx_thud()*0.55; out=np.zeros(int(0.6*sr)); out[:len(o)]+=o; out[int(0.17*sr):int(0.17*sr)+len(b)]+=b[:len(out)-int(0.17*sr)]; return out
def sfx_kaching(): o=np.zeros(int(1.0*sr)); a=sfx_ding(2093,0.8); b=sfx_ding(2637,0.9); o[:len(a)]+=a; o[int(0.08*sr):int(0.08*sr)+len(b)]+=b; L=int(0.15*sr); o[:L]+=np.random.default_rng(9).normal(0,1,L)*np.exp(-np.arange(L)/sr*40)*0.6; return o
def sfx_sad(): 
    o=np.zeros(int(2.8*sr)); at=0
    for f,d in [(233,0.45),(220,0.45),(208,0.45),(196,1.2)]:
        L=int(d*sr); t=np.arange(L)/sr; ph=2*np.pi*np.cumsum(f*(1+(0.012 if f==196 else 0)*np.sin(2*np.pi*5.5*t)))/sr
        w=lp(2*((ph/(2*np.pi))%1)-1,14)*np.minimum(1,t/0.03)*np.minimum(1,(d-t)/0.08); i=int(at*sr); o[i:i+L]+=w[:len(o)-i]; at+=d
    return o
def typing(M,t0,t1,rate=11,amp=0.12):
    r=np.random.default_rng(int(t0*100)); t=t0
    while t<t1: M.add(sfx_click(),t,amp*(0.6+0.6*r.random())); t+=r.uniform(0.6,1.4)/rate
def music_track(dur,cuts,duck=[],stopat=None):
    m=music(dur); M=np.ones(len(m))
    for a,b,lvl in duck:
        t=np.arange(len(m))/sr; M*=1-(1-lvl)*np.clip((t-a)/0.1,0,1)*np.clip((b-t)/0.1,0,1)
    return m*M
