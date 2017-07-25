
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


$(document).ready(function(){
    
    var $todayBtn = $('#today');
    
    $todayBtn.click(function(){
        
        $("#frontPage").removeClass("show");
        $("#events").addClass("show");
        
    });

});
    
    
    
    
    /*for (var i = 0; i < 30; i++) {
        var $button = $(ons._util.createElement("<ons-button id="+ i + ">button</ons-button>"));
        
        $("#button").append($button);
        
        $button.click(function(){
                alert("You pressed the button!");
        });
    }*/
    
   
    


    
    


