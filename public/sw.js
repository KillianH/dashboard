importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/img/color-logo.png',
                '/img/spark-bg.png',
                '/cache-polyfill.js',
                '/js/app.js',
                '/js/sweetalert.min.js',
                '/img/mono-logo.png',
                '/css/app.css',
                '/css/sweetalert.css',
                '/settings',
                '/cache-polyfill.js',
                '/home',
                '/login',
                '/register',
                '/manifest.json',
                '/js/disconnected.js',
                '/logout',
                '/settings#/subscription',
                '/settings#/profile',
                '/settings#/security',
                '/settings#/api',
                '/settings#/payment-method',
                '/settings#/invoices'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
        // Intercept all fetch requests from the parent page
        console.log(event);

        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    // Cache signature post request
                    if (event.request.url.includes('updateSignature') && !navigator.onLine) {
                        var request = event.request;
                        var headers = {};
                        for (var entry of request.headers.entries()) {
                            headers[entry[0]] = entry[1];
                        }
                        var serialized = {
                            url: request.url,
                            headers: headers,
                            method: request.method,
                            mode: request.mode,
                            credentials: request.credentials,
                            cache: request.cache,
                            redirect: request.redirect,
                            referrer: request.referrer
                        };
                        request.clone().text().then(function(body) {
                            serialized.body = body;
                            callsToCache.push(serialized);
                            console.log(callsToCache);
                        });
                    }
                    // Immediately respond if request exists in the cache and user is offline
                    if (response && !navigator.onLine) {
                        return response;
                    }
                    // Resubmit offline signature requests
                    if(navigator.onLine && typeof callsToCache !== "undefined" && callsToCache.length > 0) {
                        callsToCache.forEach(function(signatureRequest) {
                            fetch(signatureRequest.url, {
                                method: signatureRequest.method,
                                body: signatureRequest.body,
                                credentials: 'include',
                            })
                        });
                        callsToCache = [];
                    }


                    // IMPORTANT: Clone the request. A request is a stream and
                    // can only be consumed once. Since we are consuming this
                    // once by cache and once by the browser for fetch, we need
                    // to clone the response
                    var fetchRequest = event.request.clone();

                    // Make the external resource request
                    return fetch(fetchRequest).then(
                        function(response) {
                            // If we do not have a valid response, immediately return the error response
                            // so that we do not put the bad response into cache
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }

                            // IMPORTANT: Clone the response. A response is a stream
                            // and because we want the browser to consume the response
                            // as well as the cache consuming the response, we need
                            // to clone it so we have 2 stream.
                            var responseToCache = response.clone();

                            // Place the request response within the cache
                            caches.open('v1')
                                .then(function(cache) {
                                    if(event.request.method !== "POST")
                                    {
                                        cache.put(event.request, responseToCache);
                                    }
                                });

                            return response;
                        }
                    );
                })
        );

/*    if(event.request.method === "POST"){
        fetch(event.request);
    }

    event.respondWith(
        caches.open('v1').then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
            });
        })
    );*/
});