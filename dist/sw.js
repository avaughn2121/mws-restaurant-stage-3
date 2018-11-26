(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'; //Cache Variables

var cache_Name = 'restaurant-sw-3';
var contentImgsCache = 'restaurant-img-1';
var cached_Items = ['/manifest.json', '/', '/restaurant.html', '/js/rest.js', '/css/style1.css', '/css/responsive.css', '/js/index.js']; //Function to install Service Worker

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(cache_Name).then(function (cache) {
    console.log('Opened cache');
    return cache.addAll(cached_Items);
  }));
}); //Function to activate Service Worker

self.addEventListener('activate', function (event) {
  event.waitUntil( // Gets the keys from cache
  caches.keys().then(function (cacheNames) {
    // Used to wait until all promises care completed before deleting and adding in new cache
    return Promise.all( // Filter out cache names not used by restaurant finder
    cacheNames.filter(function (cacheName) {
      // Returns caches names that start with restaurant- that does not match our new cache
      return cacheName.startsWith('restaurant-') && cacheName !== cache_Name;
    }) // Deletes Old Cache out and puts new cache in
    .map(function (cacheName) {
      return caches.delete(cacheName);
    }));
  }));
}); //Function to fetch items out of the cache

self.addEventListener('fetch', function (event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    // Since restaurants has parameters (id) we cannot request it out
    //of cache so instead we just response with the page itself
    if (requestUrl.pathname.startsWith('/restaurant.html')) {
      event.respondWith(caches.match('/restaurant.html'));
      return; // Exit if request matches
    } // If pathname starts with img respone with cached img


    if (requestUrl.pathname.startsWith('/img')) {
      event.respondWith(servecachedImage(event.request));
      return; // Exit if request matches
    }
  }

  event.respondWith( // Searches cache for URL requested
  caches.match(event.request).then(function (response) {
    // Returns the URL if there OR reponds with a request event
    return response || fetch(event.request);
  }));
});

function servecachedImage(request) {
  var imageStorageUrl = request.url;
  return caches.open(contentImgsCache).then(function (cache) {
    return cache.match(imageStorageUrl).then(function (response) {
      // if image is in cache, return it, else fetch from network, cache a clone, then return network response
      return response || fetch(request).then(function (networkResponse) {
        cache.put(imageStorageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxhLENBRUE7O0FBQ0EsSUFBTSxVQUFVLEdBQWhCLGlCQUFBO0FBQ0EsSUFBTSxnQkFBZ0IsR0FBdEIsa0JBQUE7QUFJQSxJQUFNLFlBQVksR0FBRyxDQUFBLGdCQUFBLEVBQUEsR0FBQSxFQUFBLGtCQUFBLEVBQUEsYUFBQSxFQUFBLGlCQUFBLEVBQUEscUJBQUEsRUFBckIsY0FBcUIsQ0FBckIsQyxDQWFBOztBQUNBLElBQUksQ0FBSixnQkFBQSxDQUFBLFNBQUEsRUFBaUMsVUFBQSxLQUFBLEVBQWdCO0FBQ2hELEVBQUEsS0FBSyxDQUFMLFNBQUEsQ0FDQyxNQUFNLENBQU4sSUFBQSxDQUFBLFVBQUEsRUFBQSxJQUFBLENBQ08sVUFBQSxLQUFBLEVBQWdCO0FBQ3JCLElBQUEsT0FBTyxDQUFQLEdBQUEsQ0FBQSxjQUFBO0FBQ0EsV0FBTyxLQUFLLENBQUwsTUFBQSxDQUFQLFlBQU8sQ0FBUDtBQUpILEdBQ0MsQ0FERDtBQURELENBQUEsRSxDQVVBOztBQUNBLElBQUksQ0FBSixnQkFBQSxDQUFBLFVBQUEsRUFBa0MsVUFBQSxLQUFBLEVBQWdCO0FBQ2pELEVBQUEsS0FBSyxDQUFMLFNBQUEsRUFDQztBQUNBLEVBQUEsTUFBTSxDQUFOLElBQUEsR0FBQSxJQUFBLENBQW1CLFVBQUEsVUFBQSxFQUFxQjtBQUN2QztBQUNBLFdBQU8sT0FBTyxDQUFQLEdBQUEsRUFDTjtBQUNBLElBQUEsVUFBVSxDQUFWLE1BQUEsQ0FBa0IsVUFBQSxTQUFBLEVBQW9CO0FBQ3JDO0FBQ0EsYUFBTyxTQUFTLENBQVQsVUFBQSxDQUFBLGFBQUEsS0FBdUMsU0FBUyxLQUF2RCxVQUFBO0FBRkQsS0FBQSxFQUlBO0FBSkEsS0FBQSxHQUFBLENBS00sVUFBQSxTQUFBLEVBQW9CO0FBQ3hCLGFBQU8sTUFBTSxDQUFOLE1BQUEsQ0FBUCxTQUFPLENBQVA7QUFSSCxLQUVDLENBRk0sQ0FBUDtBQUpGLEdBRUMsQ0FGRDtBQURELENBQUEsRSxDQW9CQTs7QUFDQSxJQUFJLENBQUosZ0JBQUEsQ0FBQSxPQUFBLEVBQStCLFVBQUEsS0FBQSxFQUFnQjtBQUU5QyxNQUFNLFVBQVUsR0FBRyxJQUFBLEdBQUEsQ0FBUSxLQUFLLENBQUwsT0FBQSxDQUEzQixHQUFtQixDQUFuQjs7QUFFQSxNQUFJLFVBQVUsQ0FBVixNQUFBLEtBQXNCLFFBQVEsQ0FBbEMsTUFBQSxFQUEyQztBQUUxQztBQUNBO0FBQ0EsUUFBSSxVQUFVLENBQVYsUUFBQSxDQUFBLFVBQUEsQ0FBSixrQkFBSSxDQUFKLEVBQXdEO0FBQ3ZELE1BQUEsS0FBSyxDQUFMLFdBQUEsQ0FBa0IsTUFBTSxDQUFOLEtBQUEsQ0FBbEIsa0JBQWtCLENBQWxCO0FBRHVELGFBQUEsQ0FFL0M7QUFOaUMsS0FBQSxDQVMxQzs7O0FBQ0EsUUFBSSxVQUFVLENBQVYsUUFBQSxDQUFBLFVBQUEsQ0FBSixNQUFJLENBQUosRUFBNEM7QUFDM0MsTUFBQSxLQUFLLENBQUwsV0FBQSxDQUFrQixnQkFBZ0IsQ0FBQyxLQUFLLENBQXhDLE9BQWtDLENBQWxDO0FBRDJDLGFBQUEsQ0FFbkM7QUFDUjtBQUNEOztBQUFDLEVBQUEsS0FBSyxDQUFMLFdBQUEsRUFDRDtBQUNBLEVBQUEsTUFBTSxDQUFOLEtBQUEsQ0FBYSxLQUFLLENBQWxCLE9BQUEsRUFBQSxJQUFBLENBQ08sVUFBQSxRQUFBLEVBQW1CO0FBQ3hCO0FBQ0EsV0FBTyxRQUFRLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBOUIsT0FBd0IsQ0FBeEI7QUFMRCxHQUVELENBRkM7QUFsQkgsQ0FBQTs7QUE0QkEsU0FBQSxnQkFBQSxDQUFBLE9BQUEsRUFBbUM7QUFDbEMsTUFBSSxlQUFlLEdBQUcsT0FBTyxDQUE3QixHQUFBO0FBRUEsU0FBTyxNQUFNLENBQU4sSUFBQSxDQUFBLGdCQUFBLEVBQUEsSUFBQSxDQUFtQyxVQUFBLEtBQUEsRUFBZ0I7QUFDekQsV0FBTyxLQUFLLENBQUwsS0FBQSxDQUFBLGVBQUEsRUFBQSxJQUFBLENBQWtDLFVBQUEsUUFBQSxFQUFtQjtBQUMzRDtBQUNBLGFBQU8sUUFBUSxJQUFJLEtBQUssQ0FBTCxPQUFLLENBQUwsQ0FBQSxJQUFBLENBQW9CLFVBQUEsZUFBQSxFQUEwQjtBQUNoRSxRQUFBLEtBQUssQ0FBTCxHQUFBLENBQUEsZUFBQSxFQUEyQixlQUFlLENBQTFDLEtBQTJCLEVBQTNCO0FBQ0EsZUFBQSxlQUFBO0FBRkQsT0FBbUIsQ0FBbkI7QUFGRCxLQUFPLENBQVA7QUFERCxHQUFPLENBQVA7QUFTQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vQ2FjaGUgVmFyaWFibGVzXHJcbmNvbnN0IGNhY2hlX05hbWUgPSAncmVzdGF1cmFudC1zdy0zJztcclxuY29uc3QgY29udGVudEltZ3NDYWNoZSA9ICdyZXN0YXVyYW50LWltZy0xJztcclxuXHJcblxyXG5cclxuY29uc3QgY2FjaGVkX0l0ZW1zID0gW1xyXG5cdCcvbWFuaWZlc3QuanNvbicsXHJcblx0Jy8nLFxyXG5cdCcvcmVzdGF1cmFudC5odG1sJyxcclxuXHQnL2pzL3Jlc3QuanMnLFxyXG5cdCcvY3NzL3N0eWxlMS5jc3MnLFxyXG5cdCcvY3NzL3Jlc3BvbnNpdmUuY3NzJyxcclxuXHQnL2pzL2luZGV4LmpzJ1xyXG5dO1xyXG5cclxuXHJcblxyXG5cclxuLy9GdW5jdGlvbiB0byBpbnN0YWxsIFNlcnZpY2UgV29ya2VyXHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0ZXZlbnQud2FpdFVudGlsKFxyXG5cdFx0Y2FjaGVzLm9wZW4oY2FjaGVfTmFtZSlcclxuXHRcdFx0LnRoZW4oZnVuY3Rpb24oY2FjaGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnT3BlbmVkIGNhY2hlJyk7XHJcblx0XHRcdFx0cmV0dXJuIGNhY2hlLmFkZEFsbChjYWNoZWRfSXRlbXMpO1xyXG5cdFx0XHR9KVxyXG5cdCk7XHJcbn0pO1xyXG5cclxuLy9GdW5jdGlvbiB0byBhY3RpdmF0ZSBTZXJ2aWNlIFdvcmtlclxyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRldmVudC53YWl0VW50aWwoXHJcblx0XHQvLyBHZXRzIHRoZSBrZXlzIGZyb20gY2FjaGVcclxuXHRcdGNhY2hlcy5rZXlzKCkudGhlbihmdW5jdGlvbihjYWNoZU5hbWVzKSB7XHJcblx0XHRcdC8vIFVzZWQgdG8gd2FpdCB1bnRpbCBhbGwgcHJvbWlzZXMgY2FyZSBjb21wbGV0ZWQgYmVmb3JlIGRlbGV0aW5nIGFuZCBhZGRpbmcgaW4gbmV3IGNhY2hlXHJcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChcclxuXHRcdFx0XHQvLyBGaWx0ZXIgb3V0IGNhY2hlIG5hbWVzIG5vdCB1c2VkIGJ5IHJlc3RhdXJhbnQgZmluZGVyXHJcblx0XHRcdFx0Y2FjaGVOYW1lcy5maWx0ZXIoZnVuY3Rpb24oY2FjaGVOYW1lKSB7XHJcblx0XHRcdFx0XHQvLyBSZXR1cm5zIGNhY2hlcyBuYW1lcyB0aGF0IHN0YXJ0IHdpdGggcmVzdGF1cmFudC0gdGhhdCBkb2VzIG5vdCBtYXRjaCBvdXIgbmV3IGNhY2hlXHJcblx0XHRcdFx0XHRyZXR1cm4gY2FjaGVOYW1lLnN0YXJ0c1dpdGgoJ3Jlc3RhdXJhbnQtJykgJiYgY2FjaGVOYW1lICE9PSBjYWNoZV9OYW1lO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Ly8gRGVsZXRlcyBPbGQgQ2FjaGUgb3V0IGFuZCBwdXRzIG5ldyBjYWNoZSBpblxyXG5cdFx0XHRcdFx0Lm1hcChmdW5jdGlvbihjYWNoZU5hbWUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGNhY2hlcy5kZWxldGUoY2FjaGVOYW1lKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdCk7XHJcblx0XHR9KVxyXG5cdCk7XHJcbn0pO1xyXG5cclxuLy9GdW5jdGlvbiB0byBmZXRjaCBpdGVtcyBvdXQgb2YgdGhlIGNhY2hlXHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRjb25zdCByZXF1ZXN0VXJsID0gbmV3IFVSTChldmVudC5yZXF1ZXN0LnVybCk7XHJcblxyXG5cdGlmIChyZXF1ZXN0VXJsLm9yaWdpbiA9PT0gbG9jYXRpb24ub3JpZ2luKSB7XHJcblxyXG5cdFx0Ly8gU2luY2UgcmVzdGF1cmFudHMgaGFzIHBhcmFtZXRlcnMgKGlkKSB3ZSBjYW5ub3QgcmVxdWVzdCBpdCBvdXRcclxuXHRcdC8vb2YgY2FjaGUgc28gaW5zdGVhZCB3ZSBqdXN0IHJlc3BvbnNlIHdpdGggdGhlIHBhZ2UgaXRzZWxmXHJcblx0XHRpZiAocmVxdWVzdFVybC5wYXRobmFtZS5zdGFydHNXaXRoKCcvcmVzdGF1cmFudC5odG1sJykpIHtcclxuXHRcdFx0ZXZlbnQucmVzcG9uZFdpdGgoY2FjaGVzLm1hdGNoKCcvcmVzdGF1cmFudC5odG1sJykpO1xyXG5cdFx0XHRyZXR1cm47IC8vIEV4aXQgaWYgcmVxdWVzdCBtYXRjaGVzXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSWYgcGF0aG5hbWUgc3RhcnRzIHdpdGggaW1nIHJlc3BvbmUgd2l0aCBjYWNoZWQgaW1nXHJcblx0XHRpZiAocmVxdWVzdFVybC5wYXRobmFtZS5zdGFydHNXaXRoKCcvaW1nJykpIHtcclxuXHRcdFx0ZXZlbnQucmVzcG9uZFdpdGgoc2VydmVjYWNoZWRJbWFnZShldmVudC5yZXF1ZXN0KSk7XHJcblx0XHRcdHJldHVybjsgLy8gRXhpdCBpZiByZXF1ZXN0IG1hdGNoZXNcclxuXHRcdH1cclxuXHR9IGV2ZW50LnJlc3BvbmRXaXRoKFxyXG5cdFx0Ly8gU2VhcmNoZXMgY2FjaGUgZm9yIFVSTCByZXF1ZXN0ZWRcclxuXHRcdGNhY2hlcy5tYXRjaChldmVudC5yZXF1ZXN0KVxyXG5cdFx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdC8vIFJldHVybnMgdGhlIFVSTCBpZiB0aGVyZSBPUiByZXBvbmRzIHdpdGggYSByZXF1ZXN0IGV2ZW50XHJcblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlIHx8IGZldGNoKGV2ZW50LnJlcXVlc3QpO1xyXG5cdFx0XHR9KVxyXG5cdCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2VydmVjYWNoZWRJbWFnZShyZXF1ZXN0KSB7XHJcblx0bGV0IGltYWdlU3RvcmFnZVVybCA9IHJlcXVlc3QudXJsO1xyXG5cclxuXHRyZXR1cm4gY2FjaGVzLm9wZW4oY29udGVudEltZ3NDYWNoZSkudGhlbihmdW5jdGlvbihjYWNoZSkge1xyXG5cdFx0cmV0dXJuIGNhY2hlLm1hdGNoKGltYWdlU3RvcmFnZVVybCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHQvLyBpZiBpbWFnZSBpcyBpbiBjYWNoZSwgcmV0dXJuIGl0LCBlbHNlIGZldGNoIGZyb20gbmV0d29yaywgY2FjaGUgYSBjbG9uZSwgdGhlbiByZXR1cm4gbmV0d29yayByZXNwb25zZVxyXG5cdFx0XHRyZXR1cm4gcmVzcG9uc2UgfHwgZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihuZXR3b3JrUmVzcG9uc2UpIHtcclxuXHRcdFx0XHRjYWNoZS5wdXQoaW1hZ2VTdG9yYWdlVXJsLCBuZXR3b3JrUmVzcG9uc2UuY2xvbmUoKSk7XHJcblx0XHRcdFx0cmV0dXJuIG5ldHdvcmtSZXNwb25zZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iXX0=