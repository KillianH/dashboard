# dashboard
Personnal dashboard

# Google Compliant
Score almost 100% in every audits tests in LightHouse

# Almost offline ready

Yay service worker :)

# Service worker issues

Still having some redirect issue when I connect into the app and then go on the /home view or /settings view or /logout view.
You can find the sw.js in the /public directory

# Here's some logs for the Service worker issue

FetchEvent {isTrusted: true, request: Request, clientId: null, isReload: false, preloadResponse: Promise, …}

request:Request
bodyUsed:false
credentials:"include"
headers:Headers {}
integrity:""
method:"GET"
mode:"navigate"
redirect:"manual"
referrer:""
referrerPolicy:"no-referrer-when-downgrade"
url:"https://ssh.killianh.fr/settings#/subscription"

The FetchEvent for "https://ssh.killianh.fr/settings#/subscription" resulted in a network error response: a redirected response was used for a request whose redirect mode is not "follow".

Promise resolved (async)
(anonymous) @ sw.js:39
