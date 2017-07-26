
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
        console.log("clicked")
        
    });
    frontPage();
});



function frontPage() {
    var page = $("<ons-page id='frontPage'></ons-page>");
    var clock = $("<div class='centre' id='clock'>12:00</div>");
    var weather = $("<div class='centre' id='weather'>0</div>");
    var month = $(" <div class='centre' id='month'>July</div>");
    var upBtn = $("<ons-button >^</ons-button>");
    var addBtn = $("<ons-button style='float:right'>+</ons-button>");
    var day = $("<div class='centre' id='day'>Monday</div>");
    var threeDays = $("<ons-row class='centre' id='threeDays'></ons-row>");
    var yesterday = $("<ons-col id='yesterday'><ons-button>15</ons-button></ons-col>");
    var today = $("<ons-col id='today'><ons-button>16</ons-button></ons-col>");
    var tomorrow = $("<ons-col id='tomorrow'><ons-button>17</ons-button></ons-col>");
    
    page.append(clock);
    page.append(weather);
    page.append(month);
    page.append(upBtn);
    page.append(addBtn);
    page.append(day);
    page.append(threeDays);
    threeDays.append(yesterday);
    threeDays.append(today);
    threeDays.append(tomorrow);
    
    
    $("body").html(page);
    
}

    
   
    


    
    


