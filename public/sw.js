/* 枫迹博客 Service Worker（保守缓存策略）
 * 缓存版本：每次重要缓存策略更新时递增；新版本激活后自动清理旧缓存。
 * - 页面 / HTML：network-first（网络优先，网络失败再回退缓存）
 * - /_astro/* 与 /pagefind/* 静态资源：cache-first（缓存优先）
 * - 跨域请求（Firebase / Firestore / 外部 API）：不进入 Service Worker 缓存
 */
const CACHE = 'blog-v2';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// 只缓存成功的 GET 响应（2xx），避免把错误页或重定向写进缓存
function shouldCache(response) {
  return response && response.ok;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // 只处理同源请求；Firebase / Firestore / 外部 API 均为跨域，直接跳过、不缓存
  if (url.origin !== self.location.origin) return;

  const isAsset = url.pathname.includes('/_astro/') || url.pathname.includes('/pagefind/');

  if (isAsset) {
    // 静态资源：缓存优先（快）
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          if (shouldCache(res)) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        });
      }),
    );
  } else {
    // 页面：网络优先（始终最新），失败时回退缓存
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (shouldCache(res)) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html'))),
    );
  }
});
