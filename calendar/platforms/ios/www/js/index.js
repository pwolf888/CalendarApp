
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
    
    showFrontPage();
    $("#today").on("click", showEvents);
    
    
    
});


/***********************************
* Function to load the front page
************************************/
function showFrontPage() {
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
    
    $("#FrontPage").html(page);
    
}

/***********************************
* Function to load Todays Events
************************************/

function showEvents() {
    
    var page = $("<ons-page id='events'></ons-page>");
    var upBtn = $("<ons-button id='upBtn'>^</ons-button>");
    var addBtn = $("<ons-button id='addBtn' style='float:right'>+</ons-button>");
    var weather = $("<div class='centre'>weather</div>");
    
    var list = $("<ons-list></ons-list");
    
    var lHead = $("<ons-list-header></ons-list-header");
    var lRow = $("<ons-row class='centre'></ons-row");
    var day = $("<ons-col id='day'>16</ons-col>");
    var month = $("<ons-col id='month'>JUL</ons-col>");
    var year = $("<ons-col id='year'>2017</ons-col>");
    
    var lItem = $("<ons-list-item></ons-list-item");
    var lImage = $("<div class='left'><div class='circle'></div></div>");
    var lInfo = $("<div><span class='list-item__title'>Meeting</span><span class='list-item__subtitle'>14:00</span></div>");
    
    upBtn.on('click', function(){
        $("#EventsPage").html("");
    });
    
    addBtn.on('click', function(){
        AddEventsPage();
    })
    
    page.append(upBtn);
    page.append(addBtn);
    page.append(weather);
    page.append(list);
    list.append(lHead);
    lHead.append(lRow);
    lRow.append(day);
    lRow.append(month);
    lRow.append(year);
    list.append(lItem);
    lItem.append(lImage);
    lItem.append(lInfo);
    
    $("#EventsPage").html(page);
    
    
}

/***********************************
* Function to add Add Event Page
************************************/
function AddEventsPage(){
    
    var self = this;
    
    self.$container = $("#addEventsPage");
    
    self.$page = $("<ons-page></ons-page>");
    $("<ons-toolbar><ons-toolbar-button class='left' id='upBtn'>^</ons-toolbar-button><div class='center'>New Event</div><ons-toolbar-button class='right'>X</ons-toolbar-button></ons-toolbar>").appendTo(self.$page);
    
    $("<div class='centre' id='triangles'><ons-button class='circle'></ons-button><ons-button class='circle'></ons-button><ons-button class='circle'></ons-button><ons-button class='circle'></ons-button></div>").appendTo(self.$page);
    
    $("<div class='centre'><ons-input type='text' placeholder='Event Title' min='0' max='15'></ons-input></div>").appendTo(self.$page);
    
    $("<div class='centre'><ons-row><ons-col><ons-input placeholder='HH' ></ons-col><ons-col></ons-input><ons-input placeholder='MM' ></ons-input></ons-col></ons-row></div>").appendTo(self.$page);
    
    $("<div class='centre'><ons-input type='text' placeholder='notes' min='0' max='30'></ons-input></div>").appendTo(self.$page);
    
    $("<div class='centre'><textarea type='text' placeholder='notes' min='0' max='30' rows='3' col='10'></textarea></div>").appendTo(self.$page);
    
    $("<div class='centre'><ons-button id='addEvent'>Add Event</ons-button></div>").appendTo(self.$page);
    
    self.$container.append(self.$page);
}














