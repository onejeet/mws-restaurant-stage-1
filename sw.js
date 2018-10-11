if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(registration => {
    console.log('Service Worker Registration successful!!!');
  }).catch(error => {
    console.log('Service worker registration failed!!!');
  });
}

//Cachingg
const cacheName = 'onejeet-mws-restaurants-1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
        return cache.addAll([
          '/',
          '/sw.js',
          '/css/styles.css',
          '/css/font-awesome-min.css',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/data/restaurants.json',
          '/restaurant.html?id=1',
          '/restaurant.html?id=2',
          '/restaurant.html?id=3',
          '/restaurant.html?id=4',
          '/restaurant.html?id=5',
          '/restaurant.html?id=6',
          '/restaurant.html?id=7',
          '/restaurant.html?id=8',
          '/restaurant.html?id=9',
          '/restaurant.html?id=10'
        ]).catch(error => {
          console.log('Caches Installation failed: ' + error);
        });
      })
  );
});

// Response
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if(response){
          console.log('Serving '+event.request.url+' From Cache');
          return response;
      }
      return fetch(event.request);
    }).catch(error => {
      return new Response('<b>Not connected to the internet</b>', {
          headers:{
              'Content-Type':'text/html'
          }
      });
    })
  );
});
