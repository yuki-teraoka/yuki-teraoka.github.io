self.addEventListener('install', function(e) {console.log('Service Worker oninstall: ', e)});

self.addEventListener('activate', function(e) {
  console.log('Service Worker onactivate: ', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(e) {console.log('Service Worker onfetch: ', e)});

self.addEventListener('push', function(e) {
  console.log('Service Worker onpush: ', e);
  e.waitUntil(
    self.registration.showNotification('おしらせ！', {
      body: 'おしらせがありますよー！！',
      icon: 'http://placehold.it/192x192',
      tag: 'push-notification-tag'
    })
  );
});