let installPromptEvent;
const installAppButton = document.getElementById('installBtn');
const clearCacheButton = document.getElementById('clearCacheBtn');

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js')
      .then(() => console.log("Service Worker registered successfully."))
      .catch(error => console.error("Service Worker registration failed:", error));
  } else {
    console.warn("Browser does not support Service Workers.");
  }
});

clearCacheButton.addEventListener('click', () => {
  caches.keys()
    .then(cacheNames => {
      const deletePromises = cacheNames.map(cacheName => caches.delete(cacheName));
      return Promise.all(deletePromises);
    })
    .then(() => {
      console.log('All caches cleared successfully!');
      alert('All caches cleared successfully!');
    })
    .catch(error => {
      console.error('Failed to clear caches:', error);
      alert('Failed to clear caches. Check console for details.');
    });
});

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPromptEvent = event;
  installAppButton.hidden = false;

  installAppButton.addEventListener('click', () => {
    installAppButton.hidden = true;
    installPromptEvent.prompt();
    installPromptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      installPromptEvent = null;
    });
  });
});
