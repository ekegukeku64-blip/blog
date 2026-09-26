/* 枫迹博客 Service Worker（保守缓存策略）
 * 缓存版本：仅在缓存策略本身变更时递增；新版本激活后清理旧缓存。
 * 注意：不要按提交号自动递增。资源 URL（/_astro/*）已带内容哈希，
 * 一旦每次部署都换缓存名，activate 会把所有哈希资源一并清掉，
 * 返回访客就得重新下载全部资源——那是倒退，不是优化。
 * - 页面 / HTML：network-first（网络优先，网络失败再回退缓存）
 * - /_astro/* 与 /pagefind/* 静态资源：cache-first（缓存优先）
 * - 跨域请求（自建评论 API、外部资源）：不进入 Service Worker 缓存
 */
const CACHE = 'blog-v2'

// 缓存条目上限。此前没有任何淘汰机制：访问过的页面与资源会一直留在缓存里，
// 长期使用会在移动端累积出可观占用（站点有 900+ 页面）。
const MAX_CACHE_ENTRIES = 400
// 低频修剪：每写入这么多次才检查一次，避免每次请求都遍历 keys()。
const TRIM_EVERY_WRITES = 40
let writesSinceTrim = 0

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

// 只缓存成功的 GET 响应（2xx），避免把错误页或重定向写进缓存
function shouldCache(response) {
  return response && response.ok
}

async function putAndMaybeTrim(request, response) {
  const cache = await caches.open(CACHE)
  await cache.put(request, response)

  writesSinceTrim += 1
  if (writesSinceTrim < TRIM_EVERY_WRITES) return
  writesSinceTrim = 0

  const keys = await cache.keys()
  if (keys.length <= MAX_CACHE_ENTRIES) return
  // Cache.keys() 按插入顺序返回，从最旧的开始裁掉多余的条目。
  const excess = keys.length - MAX_CACHE_ENTRIES
  await Promise.all(keys.slice(0, excess).map((key) => cache.delete(key)))
}

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  // 只处理同源请求；自建评论 API 与其他外部资源都是跨域，直接跳过、不缓存
  if (url.origin !== self.location.origin) return

  const isAsset = url.pathname.includes('/_astro/') || url.pathname.includes('/pagefind/')

  if (isAsset) {
    // 静态资源：缓存优先（快）。URL 带内容哈希，所以不会命中过期内容。
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((res) => {
          if (shouldCache(res)) {
            event.waitUntil(putAndMaybeTrim(request, res.clone()))
          }
          return res
        })
      }),
    )
  } else {
    // 页面：网络优先（始终最新），失败时回退缓存
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (shouldCache(res)) {
            event.waitUntil(putAndMaybeTrim(request, res.clone()))
          }
          return res
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('./index.html')),
        ),
    )
  }
})
