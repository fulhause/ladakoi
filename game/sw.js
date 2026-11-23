// ラダ恋！ サービスワーカー
// - ゲーム本体（index.html）はネット優先。つながらない・遅いときは保存しておいた版を出す。
// - 画像（assets/）は名前に中身のハッシュが入っているので、一度保存したら使い回す。
// - インストール時に画像をまとめて保存しておき、電波のない場所でも遊べるようにする。
// VERSION と ASSETS は tools/split_assets.py が index.html に合わせて書き換える。
const VERSION='0.26.1';
const ASSETS=/*@ASSETS*/[
"./assets/bgdata.e1ecfb93.webp",
"./assets/bgs-office.d399172d.webp",
"./assets/bgs-rack.4d93e462.webp",
"./assets/bgs-roof.035163c9.webp",
"./assets/cgs-all.7558e7fd.webp",
"./assets/cgs-all2.df645956.webp",
"./assets/cgs-bonus.9369891d.webp",
"./assets/cgs-bonus10.11d460ea.webp",
"./assets/cgs-bonus2.8303e469.webp",
"./assets/cgs-bonus3.426cbcc2.webp",
"./assets/cgs-bonus4.fd42967c.webp",
"./assets/cgs-bonus5.735e9540.webp",
"./assets/cgs-bonus6.a4a2fcd5.webp",
"./assets/cgs-bonus7.1d222fdf.webp",
"./assets/cgs-bonus8.563bc2b9.webp",
"./assets/cgs-bonus9.c37c4f65.webp",
"./assets/cgs-kanade.7c7e8238.webp",
"./assets/cgs-kanade2.7fbf7463.webp",
"./assets/cgs-rire.3988992a.webp",
"./assets/cgs-rire2.4d4ba690.webp",
"./assets/cgs-tsunagi.7ee96f91.webp",
"./assets/cgs-tsunagi2.95809dd4.webp",
"./assets/figs-airbasic.9b56d5f8.webp",
"./assets/figs-aircaution.a1ccfdc4.webp",
"./assets/figs-airdouble.6d0d1ecb.webp",
"./assets/figs-airsingle.d623893c.webp",
"./assets/figs-airtrouble.cc930c65.webp",
"./assets/figs-airvalve.fe71eec9.webp",
"./assets/figs-alarmack.f202229c.webp",
"./assets/figs-alarmlatch.ed8810ed.webp",
"./assets/figs-alarmstop.00264624.webp",
"./assets/figs-and.c56a8fe8.webp",
"./assets/figs-ascii.56bebb07.webp",
"./assets/figs-bug1.f1b72ba1.webp",
"./assets/figs-bug2.47c4c1b7.webp",
"./assets/figs-checksum.65510b0b.webp",
"./assets/figs-cmp.56fe969e.webp",
"./assets/figs-commdiag.42cfab7c.webp",
"./assets/figs-conveyor.2f8243a0.webp",
"./assets/figs-ctu.f416adf3.webp",
"./assets/figs-eacia.fe3b7669.webp",
"./assets/figs-eafb.5cc08fee.webp",
"./assets/figs-eahand.149d2a5d.webp",
"./assets/figs-eahome.f0efd749.webp",
"./assets/figs-eaptbasic.1882ab92.webp",
"./assets/figs-eatable.25b2b70b.webp",
"./assets/figs-ecatbasic.116ba32a.webp",
"./assets/figs-ecatesi.024f4355.webp",
"./assets/figs-ecatpdo.c2ccb2b1.webp",
"./assets/figs-ecatwire.7a66f2ab.webp",
"./assets/figs-enipbasic.7ab55550.webp",
"./assets/figs-enipeds.ecea2f2e.webp",
"./assets/figs-enipio.951a6034.webp",
"./assets/figs-enipmsg.9e791589.webp",
"./assets/figs-except.477e7818.webp",
"./assets/figs-fc06.e72274ef.webp",
"./assets/figs-final.b3d01458.webp",
"./assets/figs-flicker.ff9829f9.webp",
"./assets/figs-frame.0f193d81.webp",
"./assets/figs-hexbasic.2b884367.webp",
"./assets/figs-hyst.3fc519ee.webp",
"./assets/figs-ilbasic.9edfa981.webp",
"./assets/figs-ilcyclic.344fe58c.webp",
"./assets/figs-ilevent.9d3f969b.webp",
"./assets/figs-ilisdu.0cb1f84d.webp",
"./assets/figs-ilport.1908c103.webp",
"./assets/figs-ilreplace.2a219d5e.webp",
"./assets/figs-interlock.77735112.webp",
"./assets/figs-ivalarm.d3a6042e.webp",
"./assets/figs-ivbasic.97a3020a.webp",
"./assets/figs-ivmulti.84c3191b.webp",
"./assets/figs-ivnet.652a1c08.webp",
"./assets/figs-ivparam.57a026d9.webp",
"./assets/figs-ivterm.b00088a3.webp",
"./assets/figs-ldavg.d86ed5d5.webp",
"./assets/figs-ldrate.4ee0f706.webp",
"./assets/figs-ldstep.06a57ab9.webp",
"./assets/figs-ma420.590f125b.webp",
"./assets/figs-modbusq.e6671fd1.webp",
"./assets/figs-mode.471f1589.webp",
"./assets/figs-mov.f2ee3856.webp",
"./assets/figs-nc.a8d19ff5.webp",
"./assets/figs-netport.39feedd8.webp",
"./assets/figs-no.19c86a93.webp",
"./assets/figs-numbase.35e0ea5d.webp",
"./assets/figs-or.54a2c87b.webp",
"./assets/figs-pulse.e827a636.webp",
"./assets/figs-regmap.8dc53ac3.webp",
"./assets/figs-retry.20601b32.webp",
"./assets/figs-rs485.709ac5bf.webp",
"./assets/figs-rtureq.c38f4cc6.webp",
"./assets/figs-rturesp.933aca28.webp",
"./assets/figs-scale.e0533d05.webp",
"./assets/figs-selfhold.c623a2c6.webp",
"./assets/figs-serial.30df7c59.webp",
"./assets/figs-setrst.393946a4.webp",
"./assets/figs-sfcact.f50c6811.webp",
"./assets/figs-sfcat.c3d620ac.webp",
"./assets/figs-sfcbranch.693b4aca.webp",
"./assets/figs-sfcmon.9e40c5dc.webp",
"./assets/figs-sfcont.541c3851.webp",
"./assets/figs-sfctrl.5ebd735f.webp",
"./assets/figs-sfctrouble.d8f9ae81.webp",
"./assets/figs-sfcvs.5479717e.webp",
"./assets/figs-sfestop.da3ce73c.webp",
"./assets/figs-sflc.00c6256b.webp",
"./assets/figs-sfpower.3c001fe0.webp",
"./assets/figs-stbasic.c230d5f6.webp",
"./assets/figs-stcase.b65922e0.webp",
"./assets/figs-step.2732bef6.webp",
"./assets/figs-stfb.e5ef4089.webp",
"./assets/figs-stinline.9fa74474.webp",
"./assets/figs-stladder.eb0886fc.webp",
"./assets/figs-stloop.9046eb9e.webp",
"./assets/figs-sttype.f4716a66.webp",
"./assets/figs-stvar.c7fb4901.webp",
"./assets/figs-svbasic.592888a7.webp",
"./assets/figs-svmove.04f27894.webp",
"./assets/figs-svplcopen.9eb9abf2.webp",
"./assets/figs-svpower.330d005e.webp",
"./assets/figs-svreset.8419dff0.webp",
"./assets/figs-svstop.06ef84e2.webp",
"./assets/figs-tcp.d1ffa0df.webp",
"./assets/figs-tcpnet.aafe7c8a.webp",
"./assets/figs-timeout.2c87beb5.webp",
"./assets/figs-ton.faf8cc3d.webp",
"./assets/figs-tower.b79d8839.webp",
"./assets/figs-uabasic.cdd1d328.webp",
"./assets/figs-uacert.400d2905.webp",
"./assets/figs-uaendpoint.2022d946.webp",
"./assets/figs-uanode.8e65c523.webp",
"./assets/figs-uaserver.4c8def4a.webp",
"./assets/figs-uasub.178b7235.webp",
"./assets/figs-word32.5ec4d735.webp",
"./assets/imgdata-kanade-a.3a62036f.webp",
"./assets/imgdata-kanade-av.7ac50f26.webp",
"./assets/imgdata-kanade-av_a.9d99f362.webp",
"./assets/imgdata-kanade-av_b.9efa39a5.webp",
"./assets/imgdata-kanade-av_h.e16e33d3.webp",
"./assets/imgdata-kanade-av_s.0bc4987d.webp",
"./assets/imgdata-kanade-av_t.ff4aef8a.webp",
"./assets/imgdata-kanade-av_w.1aa26dcc.webp",
"./assets/imgdata-kanade-b.e823fca2.webp",
"./assets/imgdata-kanade-h.f58d846b.webp",
"./assets/imgdata-kanade-n.e196d51e.webp",
"./assets/imgdata-kanade-s.09fbb253.webp",
"./assets/imgdata-kanade-t.d5c55a9b.webp",
"./assets/imgdata-kanade-w.231a7db3.webp",
"./assets/imgdata-rire-a.c5f379cc.webp",
"./assets/imgdata-rire-av.9879d605.webp",
"./assets/imgdata-rire-av_a.7027b213.webp",
"./assets/imgdata-rire-av_b.3a983f23.webp",
"./assets/imgdata-rire-av_h.20bcf652.webp",
"./assets/imgdata-rire-av_s.1910c811.webp",
"./assets/imgdata-rire-av_t.3db7ec10.webp",
"./assets/imgdata-rire-av_w.e8295dee.webp",
"./assets/imgdata-rire-b.414bbafc.webp",
"./assets/imgdata-rire-h.6eed5daa.webp",
"./assets/imgdata-rire-n.371413c9.webp",
"./assets/imgdata-rire-s.c2c9013e.webp",
"./assets/imgdata-rire-t.c7e52c5a.webp",
"./assets/imgdata-rire-w.f623cf8c.webp",
"./assets/imgdata-tsunagi-a.2986af8c.webp",
"./assets/imgdata-tsunagi-av.a1a358be.webp",
"./assets/imgdata-tsunagi-av_a.2686da0f.webp",
"./assets/imgdata-tsunagi-av_b.4b408c65.webp",
"./assets/imgdata-tsunagi-av_h.30252ef8.webp",
"./assets/imgdata-tsunagi-av_s.80ab8e2e.webp",
"./assets/imgdata-tsunagi-av_t.6350bf18.webp",
"./assets/imgdata-tsunagi-av_w.76d96fe8.webp",
"./assets/imgdata-tsunagi-b.025a56e5.webp",
"./assets/imgdata-tsunagi-h.4a0c578b.webp",
"./assets/imgdata-tsunagi-n.4fdfa8e2.webp",
"./assets/imgdata-tsunagi-s.06cadc14.webp",
"./assets/imgdata-tsunagi-t.49dc461b.webp",
"./assets/imgdata-tsunagi-w.43bd6146.webp",
"./assets/logo.140927be.webp",
"./assets/spon_gugen.4a2fde2a.webp"
]/*@/ASSETS*/;
const CORE='ladakoi-core-'+VERSION, IMG='ladakoi-img', FONT='ladakoi-font', MEDIA='ladakoi-media';
const CORE_FILES=['./','./manifest.webmanifest','./assets/icon-180.png','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable-512.png'];
const PAGE=new URL('./',self.registration.scope).href;

self.addEventListener('install',e=>{e.waitUntil((async()=>{
  const core=await caches.open(CORE);
  await core.addAll(CORE_FILES.map(u=>new Request(u,{cache:'reload'})));
  const img=await caches.open(IMG);
  const have=new Set((await img.keys()).map(r=>r.url));
  const todo=ASSETS.map(u=>new URL(u,self.registration.scope).href).filter(u=>!have.has(u));
  // 同時に取りに行く数をしぼって、ゆっくり保存する（失敗しても遊ぶときに取り直す）
  let i=0;
  const worker=async()=>{while(i<todo.length){const u=todo[i++];try{const r=await fetch(u);if(r.ok)await img.put(u,r);}catch(_){}}};
  await Promise.all([worker(),worker(),worker(),worker()]);
  await self.skipWaiting();
})());});

self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys()){if(k.startsWith('ladakoi-core-')&&k!==CORE)await caches.delete(k);}
  const keep=new Set(ASSETS.map(u=>new URL(u,self.registration.scope).href));
  const img=await caches.open(IMG);
  for(const r of await img.keys()){if(!keep.has(r.url))await img.delete(r);}
  await self.clients.claim();
})());});

async function pageFirst(req){
  const cache=await caches.open(CORE);
  const net=fetch(req).then(r=>{if(r.ok)cache.put(PAGE,r.clone());return r;});
  const cached=await cache.match(PAGE);
  if(!cached)return net;
  net.catch(()=>{});
  // 3.5秒待ってもネットから来なければ、保存しておいた版を出す（ネットの分は裏で保存される）
  return Promise.race([net.catch(()=>cached),new Promise(res=>setTimeout(()=>res(cached),3500))]);
}
async function cacheFirst(req,name){
  const cache=await caches.open(name);
  const hit=await cache.match(req,{ignoreSearch:true});
  if(hit)return hit;
  const r=await fetch(req);
  if(r.ok||r.type==='opaque')cache.put(req,r.clone());
  return r;
}
async function staleWhileRevalidate(req,name){
  const cache=await caches.open(name);
  const hit=await cache.match(req);
  const net=fetch(req).then(r=>{if(r.ok||r.type==='opaque')cache.put(req,r.clone());return r;}).catch(()=>hit);
  return hit||net;
}

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  const scope=new URL(self.registration.scope);
  if(url.origin===scope.origin){
    if(!url.pathname.startsWith(scope.pathname))return;
    const rel=url.pathname.slice(scope.pathname.length);
    if(req.mode==='navigate'||rel===''||rel==='index.html'){e.respondWith(pageFirst(req));return;}
    if(rel.startsWith('assets/')){e.respondWith(cacheFirst(req,IMG));return;}
    if(rel.startsWith('audio/')){e.respondWith(cacheFirst(req,MEDIA));return;}
    if(rel==='manifest.webmanifest'){e.respondWith(staleWhileRevalidate(req,CORE));return;}
    return;
  }
  if(url.hostname==='fonts.googleapis.com'||url.hostname==='fonts.gstatic.com'){e.respondWith(staleWhileRevalidate(req,FONT));}
});
