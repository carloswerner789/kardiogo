// KardioGo: Seite immer zuerst aus dem Netz (Updates sofort), offline aus dem Cache
const C='kardiogo-v2';const F=["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-180.png", "icon-192.png", "icon-512.png", "icon-32.png"];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r,{cache:'no-cache'}).then(n=>{if(n.ok){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));}return n;})
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match('./'))));});
