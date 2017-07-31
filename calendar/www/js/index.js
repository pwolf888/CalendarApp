
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

/***********************************
* GLOBAL VARIABLES
************************************/

var monthData = ['Jan','Feb','Mar',
                 'Apr','May','Jun',
                 'Jul','Aug','Sep',
                 'Oct','Nov','Dec'];

var YearData = ['17','18','19','20'];

$(document).ready(function(){
    
    showFrontPage();
    
});


/***********************************
* Function to load the front page
************************************/
function showFrontPage() {
    
    var self = this;
    
    self.$container = $("#FrontPage");
    
    self.$page = $("<ons-page class='FrontPageBgGrad frontPageBg' id='frontPage'></ons-page>");
    $("<div class='clock' id='clock'>12:00</div>").appendTo(self.$page);
    $("<div class='sun' id='weather'></div>").appendTo(self.$page);
    $("<div class='monthOfYear' id='month'>July</div>").appendTo(self.$page);
    $("<ons-button modifier='quiet' class='upButton' ></ons-button>").appendTo(self.$page).on('click', function(){
        AddDaysPage();
    });
    $("<ons-button modifier='quiet' class='addButton'></ons-button>").appendTo(self.$page).on('click', function(){
        AddEventsPage();
    });
    $("<div class='dayOfWeek' id='day'>Monday</div>").appendTo(self.$page);
    
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
    
    self.$page = $("<ons-page id='events' class='EventsPageBgGrad'></ons-page>");
    
    $("<ons-button modifier='quiet' class='upButtonEvents'></ons-button>").appendTo(self.$page).on('click', function(){
        $("#EventsPage").html("");
    });
    
    $("<ons-button modifier='quiet' class='addButtonEvents'></ons-button>").appendTo(self.$page).on('click', function(){
        AddEventsPage();
    });
    
    $("<div class='weather'>SUNNY</div>").appendTo(self.$page);
    
    var $listContainer = $("<div class='listContainer'></div>").appendTo(self.$page);
    var $list = $("<ons-list></ons-list").appendTo($listContainer);
    var $lHead = $("<ons-list-header class='lHeader'></ons-list-header>").appendTo($list);
    var $lRow = $("<ons-row></ons-row>").appendTo($lHead);
    
    $("<ons-col id='day'>16</ons-col>").appendTo($lRow);
    $("<ons-col id='month'>JUL</ons-col>").appendTo($lRow);
    $("<ons-col id='year'>2017</ons-col>").appendTo($lRow);
    
    var $lItem = $("<ons-list-item></ons-list-item>").appendTo($list);
    $("<div class='left'><div class='triButtonSml'></div></div>").appendTo($lItem);
    $("<div><span class='list-item__title'>Meeting  </span><span class='list-item__subtitle'>14:00</span></div>").appendTo($lItem);
    
    var $lItem2 = $("<ons-list-item></ons-list-item>").appendTo($list);
    $("<div class='left'><div class='triButtonSml'></div></div>").appendTo($lItem2);
    $("<div><span class='list-item__title'>Walk Dog  </span><span class='list-item__subtitle'>16:00</span></div>").appendTo($lItem2);
    
    var $lItem3 = $("<ons-list-item></ons-list-item>").appendTo($list);
    $("<div class='left'><div class='triButtonSml'></div></div>").appendTo($lItem3);
    $("<div><span class='list-item__title'>Party  </span><span class='list-item__subtitle'>17:00</span></div>").appendTo($lItem3);
    
    self.$container.append(self.$page);
    
}

/***********************************
* Function to add Add Event Page
************************************/
function AddEventsPage(){
    
    var self = this;
    
    self.$container = $("#addEventsPage");
    
    self.$page = $("<ons-page class='EventsPageBgGrad'></ons-page>");
    $("<div class='tBar'>New Event</div>").appendTo(self.$page);
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click', function(){
        $("#addEventsPage").html("");
    });
    
    $("<div class='triContainer'><ons-button modifier='quiet' class='triButtonSml'></ons-button><ons-button modifier='quiet' class='triButtonSml'></ons-button><ons-button modifier='quiet' class='triButtonSml'></ons-button><ons-button modifier='quiet' class='triButtonSml'></ons-button></div>").appendTo(self.$page);
    
    $("<div class='triContainer' ><ons-input type='text' placeholder='Event Title' min='0' max='15' class=''></ons-input></div>").appendTo(self.$page);
    
    $("<div class='timeContainer triContainer'><ons-row><ons-col><ons-input placeholder='HH'></ons-input></ons-col><ons-col><ons-input placeholder='MM'></ons-input></ons-col></ons-row></div>").appendTo(self.$page);
    
    $("<div class='noteContainer triContainer' ><ons-input type='text' placeholder='notes' min='0' max='30'></ons-input></div>").appendTo(self.$page);
    
    
    $("<div class='triContainer' ><ons-button modifier='quiet' class='triButtonLge'>+</ons-button></div>").appendTo(self.$page);
    
    self.$container.append(self.$page);
}


/***********************************
* Function to add Days Page
************************************/
function AddDaysPage() {
    var self = this;
    
    self.$container = $("#AddDaysPage");
    
    self.$page = $("<ons-page id='weeks' class='EventsPageBgGrad'></ons-page>");
    
    $("<ons-button modifier='quiet' class='upButtonEvents'></ons-button>").appendTo(self.$page).on('click', function(){
        AddMonthsPage();
    });
    
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click', function(){
        $("#AddDaysPage").html("");
    });
    
    $("<div class='weather'>Days</div>").appendTo(self.$page);
    
    var daysOfMonth = 31;
    for(var i=1; i < daysOfMonth; i++){
        $("<ons-button modifier='quiet' class='triButtonSml'>"+i+"</ons-button>").appendTo(self.$page);
        
    }
    
    self.$container.append(self.$page);
    
}
/***********************************
* Function to add Months Page
************************************/
function AddMonthsPage() {
   var self = this;
    
    self.$container = $("#AddMonthsPage");
    
    self.$page = $("<ons-page id='weeks' class='EventsPageBgGrad'></ons-page>");
    
    $("<ons-button modifier='quiet' class='upButtonEvents'></ons-button>").appendTo(self.$page).on('click', function(){
        AddYearsPage();
    });
    
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click', function(){
        $("#AddMonthsPage").html("");
    });
    
    $("<div class='weather'>Months</div>").appendTo(self.$page); 
    
    var monthsOfYear = 12;
    for(var i=0; i < monthsOfYear; i++){
        $("<ons-button modifier='quiet' class='triButtonLge'>"+monthData[i]+"</ons-button>").appendTo(self.$page); 
    }
    
    self.$container.append(self.$page);
    
}
/***********************************
* Function to add Add Years Page
************************************/
function AddYearsPage() {
    var self = this;
    
    self.$container = $("#AddYearsPage");
    
    self.$page = $("<ons-page id='Years' class='EventsPageBgGrad'></ons-page>");
    
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click', function(){
        $("#AddYearsPage").html("");
    });
    
    $("<div class='weather'>Years</div>").appendTo(self.$page);
    
    var years = 4;
    for(var i=0; i < years; i++){
        $("<ons-button modifier='quiet' class='triButtonLge'>20"+YearData[i]+"</ons-button>").appendTo(self.$page); 
    }
    
    self.$container.append(self.$page);
}









