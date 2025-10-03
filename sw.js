// Nama cache
const CACHE_NAME = 'kalkulator-tray-cache-v1';
// Daftar file yang akan di-cache
const urlsToCache = [
  './kalkulator-tray-individu.html'
  // Jika Anda punya file CSS atau JS terpisah, tambahkan di sini.
];

// Event 'install': Dipicu saat service worker pertama kali diinstal.
self.addEventListener('install', event => {
  // Tunggu hingga proses caching selesai
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event 'fetch': Dipicu setiap kali ada permintaan sumber daya (misal: membuka halaman).
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika sumber daya ditemukan di cache, kembalikan dari cache.
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan.
        return fetch(event.request);
      }
    )
  );
});