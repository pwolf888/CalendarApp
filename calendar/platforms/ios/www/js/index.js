
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
    
    
    
    
});


/***********************************
* Function to load the front page
************************************/
function showFrontPage() {
    
    var self = this;
    
    self.$container = $("#FrontPage");
    
    self.$page = $("<ons-page class='frontPageBg' id='frontPage'></ons-page>");
    $("<div class='centre' id='clock'>12:00</div>").appendTo(self.$page);
    $("<div class='centre' id='weather'>Sunny</div>").appendTo(self.$page);
    $("<div class='centre' id='month'>July</div>").appendTo(self.$page);
    $("<ons-button >^</ons-button>").appendTo(self.$page);
    $("<ons-button style='float:right'>+</ons-button>").appendTo(self.$page).on('click', function(){
        AddEventsPage();
    });
    $("<div class='centre' id='day'>Monday</div>").appendTo(self.$page);
    
    var $rowContainer = $("<div class='ground'></div>").appendTo(self.$page);
    
    var $row = $("<ons-row id='threeDays'></ons-row>").appendTo($rowContainer);
    
    $("<ons-col align='bottom'><ons-button id='yesterday' modifier='quiet' class='triButtonSml' >15</ons-button></ons-col>").appendTo($row);
    $("<ons-col><ons-button id='today' modifier='quiet' class='buttonGround triButtonLge' >16</ons-button></ons-col>").appendTo($row).on('click', function(){
        showEvents();
    });
    $("<ons-col align='bottom'><ons-button id='tomorrow' modifier='quiet' class='buttonGround triButtonSml'>17</ons-button></ons-col>").appendTo($row);
    
    self.$container.append(self.$page);
    
}

/***********************************
* Function to load Todays Events
************************************/

function showEvents() {
    
    var self = this;
    
    self.$container = $("#EventsPage");
    
    self.$page = $("<ons-page id='events'></ons-page>");
    
    $("<ons-button id='upBtn'>^</ons-button>").appendTo(self.$page).on('click', function(){
        $("#EventsPage").html("");
    });
    
    $("<ons-button id='addBtn' style='float:right'>+</ons-button>").appendTo(self.$page).on('click', function(){
        AddEventsPage();
    });
    
    $("<div class='centre'>weather</div>").appendTo(self.$page);
    
    var $list = $("<ons-list></ons-list").appendTo(self.$page);
    var $lHead = $("<ons-list-header></ons-list-header>").appendTo($list);
    var $lRow = $("<ons-row class='centre'></ons-row>").appendTo($lHead);
    
    $("<ons-col id='day'>16</ons-col>").appendTo($lRow);
    $("<ons-col id='month'>JUL</ons-col>").appendTo($lRow);
    $("<ons-col id='year'>2017</ons-col>").appendTo($lRow);
    
    var $lItem = $("<ons-list-item></ons-list-item>").appendTo($list);
    $("<div class='left'><div class='circle'></div></div>").appendTo($lItem);
    $("<div><span class='list-item__title'>Meeting</span><span class='list-item__subtitle'>14:00</span></div>").appendTo($lItem);
    
    
    self.$container.append(self.$page);
    
}

/***********************************
* Function to add Add Event Page
************************************/
function AddEventsPage(){
    
    var self = this;
    
    self.$container = $("#addEventsPage");
    
    self.$page = $("<ons-page></ons-page>");
    var $toolBar = $("<ons-toolbar><div class='left'></div><div class='center'>New Event</div></ons-toolbar>").appendTo(self.$page);
    $("<div class='right'><ons-toolbar-button>X</ons-toolbar-button></div>").appendTo($toolBar).on('click', function(){
        $("#addEventsPage").html("");
    });
    
    $("<div class='centre' id='triangles'><ons-button class='circle'></ons-button><ons-button class='circle'></ons-button><ons-button class='circle'></ons-button><ons-button class='circle'></ons-button></div>").appendTo(self.$page);
    
    $("<div class='centre'><ons-input type='text' placeholder='Event Title' min='0' max='15'></ons-input></div>").appendTo(self.$page);
    
    $("<div class='centre'><ons-row><ons-col><ons-input placeholder='HH' ></ons-col><ons-col></ons-input><ons-input placeholder='MM' ></ons-input></ons-col></ons-row></div>").appendTo(self.$page);
    
    //$("<div class='centre'><ons-input type='text' placeholder='notes' min='0' max='30'></ons-input></div>").appendTo(self.$page);
    
    $("<div class='centre'><textarea type='text' placeholder='notes' min='0' max='30' rows='3' col='10'></textarea></div>").appendTo(self.$page);
    
    $("<div class='centre'><ons-button id='addEvent'>Add Event</ons-button></div>").appendTo(self.$page);
    
    self.$container.append(self.$page);
}


/***********************************
* Function to add Weeks Page
************************************/

/***********************************
* Function to add Months Page
************************************/

/***********************************
* Function to add Add Years Page
************************************/











