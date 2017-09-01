<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta Information -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title', config('app.name'))</title>

    <!-- Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600' rel="preload" as="style" onload="this.rel='stylesheet'">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css' rel="preload" as="style" onload="this.rel='stylesheet'">

    <!-- CSS -->
    <link href="/css/sweetalert.css" rel="preload" as="style" onload="this.rel='stylesheet'">
    <link href="{{ mix('css/app.css') }}" rel="preload" as="style" onload="this.rel='stylesheet'">

    <!-- Scripts -->
    @yield('scripts', '')

    <!-- Global Spark Object -->
    <script>
        window.Spark = <?php echo json_encode(array_merge(
            Spark::scriptVariables(), []
        )); ?>;
    </script>
    <!-- PWA Imports -->
    <link rel="manifest" href="manifest.json">

    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="Dashboard">
    <meta name="apple-mobile-web-app-title" content="Dashboard">
    <meta name="theme-color" content="#0275D7">
    <meta name="msapplication-navbutton-color" content="#0275D7">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="msapplication-starturl" content="/">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <script>
        if('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(function() { console.log("Service Worker Registered"); });
        }
    </script>
</head>
<body class="with-navbar">
    <div id="spark-app" role="main">
        <!-- Navigation -->
        @if (Auth::check())
            @include('spark::nav.user')
        @else
            @include('spark::nav.guest')
        @endif

        <!-- Main Content -->
        @yield('content')

        <!-- Application Level Modals -->
        @if (Auth::check())
            @include('spark::modals.notifications')
            @include('spark::modals.support')
            @include('spark::modals.session-expired')
        @endif
    </div>

    <!-- JavaScript -->
    <script src="{{ mix('js/app.js') }}"></script>
    <script src="/js/sweetalert.min.js"></script>
    <script src="/js/disconnected.js"></script>
</body>
</html>
