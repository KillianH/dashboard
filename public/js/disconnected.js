$(document).ready(function() {
    if(!navigator.onLine){
        $("button:submit").prop('title', "You are currently offline");
        $("button:submit").prop('disabled' , true);

    }else{
        $("button:submit").removeProp("title");
        $("button:submit").removeProp("disabled");
    }
});

window.addEventListener('load', function() {
    function updateOnlineStatus(event) {
        if(!navigator.onLine){
            $("button:submit").prop('title', "You are currently offline");
            $("button:submit").prop('disabled' , true);

        }else{
            $("button:submit").removeAttr("title");
            $("button:submit").removeAttr("disabled");
        }
    }

    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});