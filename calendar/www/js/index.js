
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


/************************************
* Jonathan Turnbull
* jmturnbu
* 214527872
************************************/

/***********************************
* GLOBAL VARIABLES
************************************/

//// This stores all the months for my months page
//var monthData = ['Jan','Feb','Mar',
//                 'Apr','May','Jun',
//                 'Jul','Aug','Sep',
//                 'Oct','Nov','Dec'];
//
//// This stores all the names of the days
//var dayData = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
//
//// This stores all the Years for my years page
//var YearData = ['17','18','19','20'];


// Sugar Date variables

var time = Sugar.Date().format('%H:%M');
var year = Sugar.Date().format('%Y');

// Today variables
var today = Sugar.Date().format('%d');
var tDay = Sugar.Date().format('%A');
var tMonth = Sugar.Date().format('%b');

// Yesterday variables
var yesterday = Sugar.Date().rewind('1 days', true).format('%d');
var yDay = Sugar.Date().format('%A');
var yMonth = Sugar.Date().format('%b');

// Tomorrow variables
var tomorrow = Sugar.Date().addDays(1).format('%d');
var tomDay = Sugar.Date().format('%A');
var tomMonth = Sugar.Date().format('%b');

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
    
    // Adding the logo to the top of the page
    $("<div class='logo'></div>").appendTo(self.$page);
    
    $("<div class='clock' id='clock'>"+time+"</div>").appendTo(self.$page);
    $("<div class='sun' id='weather'></div>").appendTo(self.$page);
    $("<div class='monthOfYear' id='month'>"+tMonth+"</div>").appendTo(self.$page);
    
    // The ^ button can run the AddDaysPage function if it is clicked
    $("<ons-button modifier='quiet' class='upButton'></ons-button>").appendTo(self.$page).on('click', function(){
        AddDaysPage();
    });
    
    // The + can run the AddEvents function if it is clicked
    $("<ons-button modifier='quiet' class='addButton'></ons-button>").appendTo(self.$page).on('click', function(){
        AddEventsPage();
    });
    
    // Adds the day of the week to the page
    $("<div class='dayOfWeek' id='day'>"+tDay+"</div>").appendTo(self.$page);
    
    // Row container holds the row of days buttons
    var $rowContainer = $("<div class='ground'></div>").appendTo(self.$page);
    
    // row is appeneded to the row container
    var $row = $("<ons-row id='threeDays'></ons-row>").appendTo($rowContainer);
    
    // Then three columns are appended to the row variable
    $("<ons-col align='bottom'><ons-button id='yesterday' modifier='quiet' class='triButtonSml'>"+yesterday+"</ons-button></ons-col>").appendTo($row).on('click', function(){
        
        showEvents();
    });
    
    // The Today button can run the showEvents function if it is clicked
    $("<ons-col><ons-button id='today' modifier='quiet' class='buttonGround triButtonLge'>"+today+"</ons-button></ons-col>").appendTo($row).on('click', function(){
        showEvents();
    });
    $("<ons-col align='bottom'><ons-button id='tomorrow' modifier='quiet' class='buttonGround triButtonSml'>"+tomorrow+"</ons-button></ons-col>").appendTo($row).on('click', function(){
        
        showEvents();
    });
    
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
    $("<ons-col id='day'>"+today+"</ons-col>").appendTo($lRow);
    $("<ons-col id='month'>"+tMonth+"</ons-col>").appendTo($lRow);
    $("<ons-col id='year'>"+year+"</ons-col>").appendTo($lRow);
    
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
    
    // Stores 'this' inside self
    var self = this;
    
    // Makes 'this' the contianer for Add Days Page
    self.$container = $("#AddDaysPage");
    
    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page id='weeks' class='EventsPageBgGrad'></ons-page>");
    
    // The ^ button will run the AddMonthsPage function moving up a page if clicked
    $("<ons-button modifier='quiet' class='upButtonEvents'></ons-button>").appendTo(self.$page).on('click', function(){
        AddMonthsPage();
    });
    
    // Adds an X button to the toolbar and allows the user to exit the page
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click', function(){
        $("#AddDaysPage").html("");
    });
    
    // Adds the Days page title to the toolbar
    $("<div class='weather'>Days</div>").appendTo(self.$page);
    
    // Declares the amount of days for dummy data
    var daysOfMonth = 31;
    
    // A simple loop to generate 31 day buttons down the page
    for(var i=1; i < daysOfMonth; i++){
        // The Text on the buttons is made from the iterater i
        $("<ons-button modifier='quiet' class='dayStyle'>"+i+"</ons-button>").appendTo(self.$page);
        
    }
    
    // The page element is appended to the container element, this presenting it to the screen.
    self.$container.append(self.$page);
    
}
/***********************************
* Function to add Months Page
************************************/
function AddMonthsPage() {
    
    // Stores 'this' inside self
    var self = this;
    
    // Makes 'this' the contianer for Add Months Page
    self.$container = $("#AddMonthsPage");
    
    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page id='weeks' class='EventsPageBgGrad'></ons-page>");
    
    // The ^ button will run the AddYearsPage function moving up a page if clicked
    $("<ons-button modifier='quiet' class='upButtonEvents'></ons-button>").appendTo(self.$page).on('click', function(){
        AddYearsPage();
    });
    
    // Adds an X button to the toolbar and allows the user to exit the page and return to the previous
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click', function(){
        $("#AddMonthsPage").html("");
    });
    
    // Adds the Months page title to the toolbar
    $("<div class='weather'>Months</div>").appendTo(self.$page); 
    
    // Declares the number of months there are in a year
    var monthsOfYear = 12;
    
    // A simple loop to generate 12 month buttons down the page
    for(var i=0; i < monthsOfYear; i++){
        
        // The Text on the buttons is made from the monthData Array and the iterator
        $("<ons-button modifier='quiet' class='monthStyle'>"+monthData[i]+"</ons-button>").appendTo(self.$page); 
    }
    
    // The page element is appended to the container element, this presenting it to the screen.
    self.$container.append(self.$page);
    
}
/***********************************
* Function to add Add Years Page
************************************/
function AddYearsPage() {
    
    // Stores 'this' inside self
    var self = this;
    
    // Makes 'this' the contianer for Add Years Page
    self.$container = $("#AddYearsPage");
    
    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page id='Years' class='EventsPageBgGrad'></ons-page>");
    
    // Adds an X button to the toolbar and allows the user to exit the page and return to the previous
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click', function(){
        $("#AddYearsPage").html("");
    });
    
    // Adds the Years page title to the toolbar
    $("<div class='weather'>Years</div>").appendTo(self.$page);
    
    // Declares the number of Years I wanted for the dummy data on the page
    var years = 4;
    
    // A simple loop to generate 4 Year buttons down the page
    for(var i=0; i < years; i++){
        
        // The Text on the buttons is made from the YearData Array and the iterator
        $("<ons-button modifier='quiet' class='yearStyle'>20"+YearData[i]+"</ons-button>").appendTo(self.$page); 
    }
    
    // The page element is appended to the container element, this presenting it to the screen.
    self.$container.append(self.$page);
}









