const CACHE_NAME = 'my-cute-pwa-cache-v1'; // 每次更新檔案內容時，請更改版本號
const urlsToCache = [
  '/', // 快取根目錄頁面
  '/index.html', // 您的主頁面
  '/css/style.css', // 您的樣式檔案路徑
  '/js/main.js', // 您的 JavaScript 檔案路徑
  '/images/icon-192x192.png' // 快取 ICON 檔案
];

// 監聽 install 事件 (PWA 首次安裝或更新時執行)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache); // 將所有必要檔案加入快取
      })
  );
});

// 監聽 fetch 事件 (App 每次請求資源時執行)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取中有資源，則直接返回
        if (response) {
          return response;
        }
        // 否則，向網路發出請求
        return fetch(event.request);
      })
  );
});

