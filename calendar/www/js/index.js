
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

// This stores all the months for my months page
var monthData = ['Jan','Feb','Mar',
                 'Apr','May','Jun',
                 'Jul','Aug','Sep',
                 'Oct','Nov','Dec'];

// This stores all the Years for my years page
var YearData = ['17','18','19','20'];

// This sets up my document with the front page.
$(document).ready(function(){
    
    showFrontPage();
    
});


/***********************************
* Function to load the front page
************************************/
function showFrontPage() {
    // Stores 'this' inside self
    var self = this;
    
    // Makes 'this' the contianer for front page
    self.$container = $("#FrontPage");
    
    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page class='FrontPageBgGrad frontPageBg' id='frontPage'></ons-page>");
    $("<div class='clock' id='clock'>12:00</div>").appendTo(self.$page);
    $("<div class='sun' id='weather'></div>").appendTo(self.$page);
    $("<div class='monthOfYear' id='month'>July</div>").appendTo(self.$page);
    
    // The ^ button can run the AddDaysPage function if it is clicked
    $("<ons-button modifier='quiet' class='upButton' ></ons-button>").appendTo(self.$page).on('click', function(){
        AddDaysPage();
    });
    
    // The + can run the AddEvents function if it is clicked
    $("<ons-button modifier='quiet' class='addButton'></ons-button>").appendTo(self.$page).on('click', function(){
        AddEventsPage();
    });
    
    // Adds the day of the week to the page
    $("<div class='dayOfWeek' id='day'>Monday</div>").appendTo(self.$page);
    
    // Row container holds the row of days buttons
    var $rowContainer = $("<div class='ground'></div>").appendTo(self.$page);
    
    // row is appeneded to the row container
    var $row = $("<ons-row id='threeDays'></ons-row>").appendTo($rowContainer);
    
    // Then three columns are appended to the row variable
    $("<ons-col align='bottom'><ons-button id='yesterday' modifier='quiet' class='triButtonSml' >15</ons-button></ons-col>").appendTo($row);
    // The Today button can run the showEvents function if it is clicked
    $("<ons-col><ons-button id='today' modifier='quiet' class='buttonGround triButtonLge' >16</ons-button></ons-col>").appendTo($row).on('click', function(){
        showEvents();
    });
    $("<ons-col align='bottom'><ons-button id='tomorrow' modifier='quiet' class='buttonGround triButtonSml'>17</ons-button></ons-col>").appendTo($row);
    
    // The page element is appended to the container element, this presenting it to the screen.
    self.$container.append(self.$page);
    
}

/***********************************
* Function to load Todays Events
************************************/

function showEvents() {
    
    // Stores 'this' inside self
    var self = this;
    
    // Makes 'this' the contianer for Events Page
    self.$container = $("#EventsPage");
    
    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page id='events' class='EventsPageBgGrad'></ons-page>");
    
    // The ^ button will remove all content from screen and show the Front Page again
    $("<ons-button modifier='quiet' class='upButtonEvents'></ons-button>").appendTo(self.$page).on('click', function(){
        $("#EventsPage").html("");
    });
    
    // The + button can run the AddEventsPage function if it is clicked
    $("<ons-button modifier='quiet' class='addButtonEvents'></ons-button>").appendTo(self.$page).on('click', function(){
        AddEventsPage();
    });
    // Displays todays weather
    $("<div class='weather'>SUNNY</div>").appendTo(self.$page);
    
    // Stores all the list items, - List, List Header, List Row
    var $listContainer = $("<div class='listContainer'></div>").appendTo(self.$page);
    var $list = $("<ons-list></ons-list").appendTo($listContainer);
    var $lHead = $("<ons-list-header class='lHeader'></ons-list-header>").appendTo($list);
    var $lRow = $("<ons-row></ons-row>").appendTo($lHead);
    
    // Creates a row of columns - day, month, year
    $("<ons-col id='day'>16</ons-col>").appendTo($lRow);
    $("<ons-col id='month'>JUL</ons-col>").appendTo($lRow);
    $("<ons-col id='year'>2017</ons-col>").appendTo($lRow);
    
    // Displays a coloured triangle, title and time as a single list item
    var $lItem = $("<ons-list-item></ons-list-item>").appendTo($list);
    $("<div class='left'><div class='triTag blueTag'></div></div>").appendTo($lItem);
    $("<div><span class='list-item__title'>Meeting  </span><span class='list-item__subtitle'>14:00</span></div>").appendTo($lItem);
    
    var $lItem2 = $("<ons-list-item></ons-list-item>").appendTo($list);
    $("<div class='left'><div class='triTag redTag'></div></div>").appendTo($lItem2);
    $("<div><span class='list-item__title'>Walk Dog  </span><span class='list-item__subtitle'>16:00</span></div>").appendTo($lItem2);
    
    var $lItem3 = $("<ons-list-item></ons-list-item>").appendTo($list);
    $("<div class='left'><div class='triTag yellowTag'></div></div>").appendTo($lItem3);
    $("<div><span class='list-item__title'>Party  </span><span class='list-item__subtitle'>17:00</span></div>").appendTo($lItem3);
    
    // The page element is appended to the container element, this presenting it to the screen.
    self.$container.append(self.$page);
    
}

/***********************************
* Function to add Add Event Page
************************************/
function AddEventsPage(){
    
    // Stores 'this' inside self
    var self = this;
    
    // Makes 'this' the contianer for Add Events Page
    self.$container = $("#addEventsPage");
    
    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page class='EventsPageBgGrad'></ons-page>");
    // Adds the toolbar title
    $("<div class='tBar'>New Event</div>").appendTo(self.$page);
    
    // Adds an X button to the toolbar and allows the user to exit the page
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click', function(){
        $("#addEventsPage").html("");
    });
    
    // Adds 4 coloured triangle tags, allowing the user to customize their event
    $("<div class='triContainer'><ons-button modifier='quiet' class='triTag redTag'></ons-button><ons-button modifier='quiet' class='triTag blueTag'></ons-button><ons-button modifier='quiet' class='triTag yellowTag'></ons-button><ons-button modifier='quiet' class='triTag greenTag'></ons-button></div>").appendTo(self.$page);
    
    // Adds an event title input form with placeholder text
    $("<div class='triContainer' ><ons-input type='text' placeholder='Event Title' min='0' max='15' class=''></ons-input></div>").appendTo(self.$page);
    
    // Adds a row of 2 col Hours and Minutes
    $("<div class='timeContainer triContainer'><ons-row><ons-col><ons-input placeholder='HH'></ons-input></ons-col><ons-col><ons-input placeholder='MM'></ons-input></ons-col></ons-row></div>").appendTo(self.$page);
    
    // Adds an input area for notes about the event
    $("<div class='noteContainer triContainer' ><ons-input type='text' placeholder='notes' min='0' max='30'></ons-input></div>").appendTo(self.$page);
    
    // Adds a large button to add the event
    $("<div class='triContainer' ><ons-button modifier='quiet' class='triButtonLge'>+</ons-button></div>").appendTo(self.$page);
    
    // The page element is appended to the container element, this presenting it to the screen.
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
        $("<ons-button modifier='quiet' class='dayStyle'>"+i+"</ons-button>").appendTo(self.$page);
        
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
        $("<ons-button modifier='quiet' class='monthStyle'>"+monthData[i]+"</ons-button>").appendTo(self.$page); 
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
        $("<ons-button modifier='quiet' class='yearStyle'>20"+YearData[i]+"</ons-button>").appendTo(self.$page); 
    }
    
    self.$container.append(self.$page);
}









