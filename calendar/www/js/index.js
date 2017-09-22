var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

//var CryptoJS = require("crypto-js");
/************************************
 * Jonathan Turnbull
 * jmturnbu
 * 214527872
 ************************************/

/***********************************
 * GLOBAL VARIABLES
 ************************************/

// Used to keep track of what date is pressed
var counter = 0;

//// This stores all the months for my months page
var monthData = ['Jan', 'Feb', 'Mar',
                 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sept',
                 'Oct', 'Nov', 'Dec'];

// Checks if the month has changed
var monthChange = false;
var changedMonth;

// This stores all the names of the days
//var dayData = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

//// This stores all the Years for my years page
var YearData = ['17', '18', '19', '20'];


// Sugar Date variables
var time = Sugar.Date().format('%H:%M');
var year = Sugar.Date().format('%Y');
console.log(year);

// Today variables
var today = Sugar.Date().format('%d');
var tDay = Sugar.Date().format('%A');
var tMonth = Sugar.Date().format('%b');

// Yesterday variables
var yesterday = Sugar.Date().rewind('1 days', true).format('%d');
var yDay = Sugar.Date().rewind('1 days', true).format('%A');
var yMonth = Sugar.Date().rewind('1 days', true).format('%b');

// Tomorrow variables
var tomorrow = Sugar.Date().addDays(1).format('%d');
var tomDay = Sugar.Date().addDays(1).format('%A');
var tomMonth = Sugar.Date().addDays(1).format('%b');


// New Date variables 
var nToday;
var nMonth;

// Moment days in a month
var daysInAMonth = moment().daysInMonth();
var daysInChangedMonth;

// Tri color array
var triArray = [
    "triTag redTag",
    "triTag blueTag",
    "triTag yellowTag",
    "triTag greenTag"
];

// Global date and username variables
var date;
var userName;
// This sets up my document with the front page.
$(document).ready(function () {
    showLoginPage();



});

/***********************************
 * Function to load the Login Page
 ************************************/
function showLoginPage() {
    // Stores 'this' inside self
    var self = this;
    // Load default
    var savedDefault = localStorage.setItem('savedDefault', '');
    // Makes 'this' the contianer for login page
    self.$container = $("#LoginPage");

    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page class='FrontPageBgGrad frontPageBg' id='frontPage'></ons-page>");

    // Try load local storage

    try {
        // Load previous username if available
        var saved = true;
        var savedName = localStorage.getItem("savedUsername");

    } catch (e) {
        saved = false;
        savedDefault = localStorage.getItem('savedDefault');
    }

    // Adding the logo to the top of the page
    $("<div class='logoLogin'></div>").appendTo(self.$page);

    // Add 2 input boxes username and password
    if (saved == true) {
        $("<div class='inputLogin'><ons-input id='userName' type='text' placeholder='Welcome " + savedName + "' min='0' max='15' class=''></ons-input></div>").appendTo(self.$page);
    } else {
        $("<div class='inputLogin'><ons-input id='userName' type='text' placeholder='Welcome " + savedDefault + "' min='0' max='15' class=''></ons-input></div>").appendTo(self.$page);
    }

    $("<div class='inputPassword'><ons-input id='passWord' type='text' placeholder='Password' min='0' max='15' class=''></ons-input></div>").appendTo(self.$page);

    // add a login button and a register button
    $("<div class='inputLogin'><ons-button class='triLogin' modifier='quiet'>Login</ons-button></div>").appendTo(self.$page).on('click', function () {

        // Save the input values
        userName = $('#userName').val();
        $('#userName').val(userName);
        var passWord = $('#passWord').val();
        $('#passWord').val(passWord);

        // Hash the password before requesting from datastore
        var hasher = CryptoJS.SHA256(passWord);
        var stringHash = JSON.stringify(hasher);

        console.log(hasher);

        // Save username to local storage
        if (typeof (Storage) !== "undefined") {
            // Local Storage
            localStorage.setItem("savedUsername", userName);
        } else {
            // Error message
            alert("Browser Not supported");
        }

        // Load user data
        loadUser(userName, stringHash);

    });
    $("<div class='inputLogin'><ons-button class='registerButton' modifier='quiet'>Register</ons-button></div>").appendTo(self.$page).on('click', function () {
        $("#RegisterPage").html("");
        showRegisterPage();
    });

    // The page element is appended to the container element, this presenting it to the screen.
    self.$container.append(self.$page);
}


/***********************************
 * Function to load the Register Page
 ************************************/
function showRegisterPage() {
    // Stores 'this' inside self
    var self = this;

    // Makes 'this' the contianer for login page
    self.$container = $("#RegisterPage");

    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page class='FrontPageBgGrad frontPageBg' id='frontPage'></ons-page>");

    // Adding the logo to the top of the page
    $("<div class='logoLogin'></div>").appendTo(self.$page);

    // Add 2 input boxes username and password
    $("<div class='inputLogin'><ons-input id='usernameText' type='text'  placeholder='Username' min='0' max='15' class=''></ons-input></div>").appendTo(self.$page);
    $("<div class='inputPassword'><ons-input id='passwordText'type='text' placeholder='Password' min='0' max='15' class=''></ons-input></div>").appendTo(self.$page);

    // add a login button and a register button
    $("<div class='inputLogin'><ons-button modifier='quiet' class='triLogin'>Register</ons-button></div>").appendTo(self.$page).on('click', function () {
        var userName = $('#usernameText').val();
        $('#usernameText').val(userName);
        var passWord = $('#passwordText').val();
        $('#passwordText').val(passWord);

        // Hash password before sending to datastore
        var ciphertext = CryptoJS.SHA256(passWord);
        var stringCipher = JSON.stringify(ciphertext);

        // Check if the length of the username and password are greater than 8
        if (userName.length >= 8 & passWord.length >= 8) {

            // Create new user
            createUser(userName, stringCipher);

            // Alert user that details were accepted
            alert("Username and password saved, welcome" + userName + "'")
        } else {
            // Prompt user to try again
            alert("Please use 8 or more characters for your username and password.")
        }

        // Return to login page
        $("#RegisterPage").html("");
        showLoginPage();
    });

    // The page element is appended to the container element, this presenting it to the screen.
    self.$container.append(self.$page);
}

/***********************************
 * Function to load the front page
 ************************************/
function showFrontPage() {

    counter = 2;
    // Stores 'this' inside self
    var self = this;

    // Makes 'this' the contianer for front page
    self.$container = $("#FrontPage");

    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page class='FrontPageBgGrad frontPageBg' id='frontPage'></ons-page>");

    // Adding the logo to the top of the page
    $("<div class='logo'></div>").appendTo(self.$page);

    $("<div class='clock' id='clock'>" + time + "</div>").appendTo(self.$page);
    $("<div class='sun' id='weather'></div>").appendTo(self.$page);
    $("<div class='monthOfYear' id='month'>" + tMonth + "</div>").appendTo(self.$page);


    // Adds an X button to the toolbar and allows the user to exit the page
    $("<ons-button modifier='quiet' class='logOutxBtn'></ons-button>").appendTo(self.$page).on('click', function () {
        $("#FrontPage").html("");
        showLoginPage();
    });

    // The ^ button can run the AddDaysPage function if it is clicked
    $("<ons-button modifier='quiet' class='upButton'></ons-button>").appendTo(self.$page).on('click', function () {
        AddDaysPage();
        $("#FrontPage").html("");
    });

    // The + can run the AddEvents function if it is clicked
    $("<ons-button modifier='quiet' class='addButton'></ons-button>").appendTo(self.$page).on('click', function () {
        AddEventsPage();
        $("#FrontPage").html("");
    });

    // Adds the day of the week to the page
    $("<div class='dayOfWeek' id='day'>" + tDay + "</div>").appendTo(self.$page);

    // Row container holds the row of days buttons
    var $rowContainer = $("<div class='ground'></div>").appendTo(self.$page);

    // row is appeneded to the row container
    var $row = $("<ons-row id='threeDays'></ons-row>").appendTo($rowContainer);

    // Then three columns are appended to the row variable
    $("<ons-col align='bottom'><ons-button id='yesterday' modifier='quiet' class='triButtonSml'>" + yesterday + "</ons-button></ons-col>").appendTo($row).on('tap', function () {
        // Collect the date details of yesterday
        counter = 3;
        date = Sugar.Date("'" + yMonth + "" + yesterday + ", " + year + "'").toLocaleDateString().valueOf();
        loadEvent(date);
        console.log(date);
        showEvents(yesterday, yMonth);
    });

    // The Today button can run the showEvents function if it is clicked
    $("<ons-col><ons-button id='today' modifier='quiet' class='buttonGround triButtonLge'>" + today + "</ons-button></ons-col>").appendTo($row).on('tap', function () {

        // Collect the date details of today
        counter = 2;
        date = Sugar.Date("'" + tMonth + "" + today + ", " + year + "'").toLocaleDateString().valueOf();
        loadEvent(date);
        showEvents(today, tMonth);
    });
    $("<ons-col align='bottom'><ons-button id='tomorrow' modifier='quiet' class='buttonGround triButtonSml'>" + tomorrow + "</ons-button></ons-col>").appendTo($row).on('tap', function () {

        // Collect the date details of tomorrow
        counter = 4;
        date = Sugar.Date("'" + tomMonth + "" + tomorrow + ", " + year + "'").toLocaleDateString().valueOf();
        loadEvent(date);
        showEvents(tomorrow, tomMonth);
    });

    // The page element is appended to the container element, this presenting it to the screen.
    self.$container.append(self.$page);

}

/***********************************
 * Function to load Todays Events
 ************************************/

function showEvents(_today, _month) {

    // Event day and month are parsed through
    var eventDay = _today;
    var eventMonth = _month;

    // If the user is in todays month
    monthChange = false;

    // Stores 'this' inside self
    var self = this;

    // Makes 'this' the contianer for Events Page
    self.$container = $("#EventsPage");

    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page id='events' class='EventsPageBgGrad'></ons-page>");

    // The ^ button will remove all content from screen and show the Front Page again
    $("<ons-button modifier='quiet' class='upButtonEvents'></ons-button>").appendTo(self.$page).on('tap', function () {
        $("#EventsPage").html("");
        showFrontPage();
    });

    // The + button can run the AddEventsPage function if it is clicked
    $("<ons-button modifier='quiet' class='addButtonEvents'></ons-button>").appendTo(self.$page).on('tap', function () {
        $("#EventsPage").html("");
        AddEventsPage();

    });
    // Displays todays weather
    $("<div class='weather'>SUNNY</div>").appendTo(self.$page);

    // Stores all the list items, - List, List Header, List Row
    var $listContainer = $("<div class='listContainer'></div>").appendTo(self.$page);
    var $list = $("<ons-list></ons-list>").appendTo($listContainer);
    var $lHead = $("<ons-list-header class='lHeader'></ons-list-header>").appendTo($list);
    var $lRow = $("<ons-row></ons-row>").appendTo($lHead);

    // Creates a row of columns - day, month, year
    $("<ons-col id='day'>" + eventDay + "</ons-col>").appendTo($lRow);
    $("<ons-col id='month'>" + eventMonth + "</ons-col>").appendTo($lRow);
    $("<ons-col id='year'>" + year + "</ons-col>").appendTo($lRow);

    $("<div id='content'></div>").appendTo($list);

    // Example of loaded content
    // Displays a coloured triangle, title and time as a single list item
    //    var $lItem = $("<ons-list-item></ons-list-item>").appendTo($list);
    //    $("<div class='left'><div class='triTag blueTag'></div></div>").appendTo($lItem);
    //    $("<div><span class='list-item__title'>Meeting  </span><span class='list-item__subtitle'>14:00</span></div>").appendTo($lItem);

    // The page element is appended to the container element, this presenting it to the screen.
    self.$container.append(self.$page);

}

/***********************************
 * Function to add Add Event Page
 ************************************/
function AddEventsPage() {

    // Stores 'this' inside self
    var self = this;

    // Makes 'this' the contianer for Add Events Page
    self.$container = $("#AddEventsPage");

    // All of my elements are then appended to the ons-page element
    self.$page = $("<ons-page class='EventsPageBgGrad'></ons-page>");
    // Adds the toolbar title
    $("<div class='tBar'>New Event</div>").appendTo(self.$page);

    // Adds an X button to the toolbar and allows the user to exit the page
    $("<ons-button modifier='quiet' class='addEventsxBtn'></ons-button>").appendTo(self.$page).on('click', function () {
        $("#AddEventsPage").html("");
        showFrontPage();
    });

    var $triContainer = $("<div class='triContainer'></div>").appendTo(self.$page);

    // Default color
    var triColor = 0;
    // Adds 4 coloured triangle tags, allowing the user to customize their event
    $("<ons-button modifier='quiet' class='triTag redTag'></ons-button>").appendTo($triContainer).on('click', function () {
        triColor = 0;
    });
    $("<ons-button modifier='quiet' class='triTag blueTag'></ons-button>").appendTo($triContainer).appendTo($triContainer).on('click', function () {
        triColor = 1;
    });
    $("<ons-button modifier='quiet' class='triTag yellowTag'></ons-button>").appendTo($triContainer).appendTo($triContainer).on('click', function () {
        triColor = 2;
    });
    $("<ons-button modifier='quiet' class='triTag greenTag'></ons-button>").appendTo($triContainer).appendTo($triContainer).on('click', function () {
        triColor = 3;
    });


    // Adds an event title input form with placeholder text
    $("<div class='triContainer' ><ons-input id = 'eventTitle' type='text' placeholder='Event Title' min='0' max='15' class=''></ons-input></div>").appendTo(self.$page);

    // Adds a row of 2 col Hours and Minutes
    $("<div class='timeContainer triContainer'><ons-row><ons-col><ons-input placeholder='HH' id='hours'></ons-input></ons-col><ons-col><ons-input id = 'minutes' placeholder='MM'></ons-input></ons-col></ons-row></div>").appendTo(self.$page);

    // Adds a large button to add the event
    $("<div class='triContainer' ><ons-button modifier='quiet' class='triButtonLge'>+</ons-button></div>").appendTo(self.$page).on('click tap touchstart', function () {

        // Store event data
        var eventTitle = $('#eventTitle').val();
        $('#eventTitle').val(eventTitle);
        var hours = $('#hours').val();
        $('#hours').val(hours);
        var mins = $('#minutes').val();
        $('#minutes').val(mins);

        // Concat hours to mins eg. 12:30
        var time = hours.concat(":" + mins);

        // Changes the date variable to parse to the load event
        switch (counter) {

            case 1:
                // A Date chosen fromt he month area
                date = Sugar.Date("'" + nMonth + "" + nToday + ", " + year + "'").toLocaleDateString().valueOf();
                $("#AddEventsPage").html("");
                showEvents(nToday, nMonth);
                break;

            case 2:
                // A Date created inside todays area
                date = Sugar.Date("'" + tMonth + "" + today + ", " + year + "'").toLocaleDateString().valueOf();
                $("#AddEventsPage").html("");
                showEvents(today, tMonth);
                break;

            case 3:
                // A Date created inside yesterday area
                date = Sugar.Date("'" + yMonth + "" + yesterday + ", " + year + "'").toLocaleDateString().valueOf();
                $("#AddEventsPage").html("");
                showEvents(yesterday, yMonth);
                break;

            case 4:
                // A Date created inside tomorrow area
                date = Sugar.Date("'" + tomMonth + "" + tomorrow + ", " + year + "'").toLocaleDateString().valueOf();
                $("#AddEventsPage").html("");
                showEvents(tomorrow, tomMonth);
                break;

            case 5:
                // A Date created inside todays month area
                date = Sugar.Date("'" + tMonth + "" + nToday + ", " + year + "'").toLocaleDateString().valueOf();
                $("#AddEventsPage").html("");
                showEvents(nToday, tMonth);
                break;

            default:
                alert("no such date")
                break;


        }

        // Validation for the input data
        if (eventTitle.length <= 20 && eventTitle.length > 0) {
            if (hours >= 0 && hours <= 23 && mins >= 0 && mins <= 59) {
                storeEvent(date, time, triColor, eventTitle);
                loadEvent(date);
            } else {
                alert("Hours must be between 0 and 23, mins must be between 0 and 59");
            }
        } else {
            alert("Event title must be between 0 and 10 characters");
        }
    });


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
    $("<ons-button modifier='quiet' class='upButtonEvents'></ons-button>").appendTo(self.$page).on('click tap touchstart', function () {
        $("#AddDaysPage").html("");
        AddMonthsPage();
    });

    // Adds an X button to the toolbar and allows the user to exit the page
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click tap touchstart', function () {
        $("#AddDaysPage").html("");
        showFrontPage();
    });

    // Adds the Days page title to the toolbar
    $("<div class='weather'>Days</div>").appendTo(self.$page);


    // Change the month size depending on what month is clicked
    var monthSize;
    if (monthChange == false) {
        monthSize = daysInAMonth;
        //alert("FALSE");
    } else {
        monthSize = daysInChangedMonth;
        //alert("TRUE" + monthSize);
    }


    // A simple loop to generate the correct amount of day buttons down the page
    for (var i = 1; i <= monthSize; i++) {
        // The Text on the buttons is made from the iterater i
        $("<ons-button id='" + i + "' modifier='quiet' class='dayStyle'>" + i + "</ons-button>").appendTo(self.$page).on('tap', function () {

            // Id of the button
            var id = $(this).attr('id');

            // Dummy loaddate created
            var loadDate = Sugar.Date("'" + tMonth + "" + id + ", " + year + "'").toLocaleDateString().valueOf();
            // If the month is this month send the altered day and todays month
            if (monthChange == false) {

                // Date and events loaded by the clicked day in todays month
                counter = 5;
                nToday = new Sugar.Date("'" + tMonth + "" + id + ", " + year + "'").format('%d');
                $("#AddDaysPage").html("");
                loadDate = new Sugar.Date("'" + tMonth + "" + nToday + ", " + year + "'").toLocaleDateString().valueOf();
                loadEvent(loadDate);
                showEvents(nToday, tMonth);

                // If the month is changed then a new day and new month will be returned    
            } else {

                // Date and events loaded by the clicked day inside the new month selected
                counter = 1;
                nToday = new Sugar.Date("'" + nMonth + "" + id + ", " + year + "'").format('%d');
                $("#AddDaysPage").html("");
                loadDate = new Sugar.Date("'" + nMonth + "" + nToday + ", " + year + "'").toLocaleDateString().valueOf();
                loadEvent(loadDate);
                showEvents(nToday, nMonth);
                alert("click 3: " + loadDate);
            }
        });
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
    $("<ons-button modifier='quiet' class='upButtonEvents'></ons-button>").appendTo(self.$page).on('click', function () {
        $("#AddMonthsPage").html("");
        AddYearsPage();
    });

    // Adds an X button to the toolbar and allows the user to exit the page and return to the previous
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click', function () {
        $("#AddMonthsPage").html("");
        showFrontPage();
    });

    // Adds the Months page title to the toolbar
    $("<div class='weather'>Months</div>").appendTo(self.$page);

    // Declares the number of months there are in a year
    var monthsOfYear = 12;

    // A simple loop to generate 12 month buttons down the page
    for (var i = 0; i < monthsOfYear; i++) {

        // The Text on the buttons is made from the monthData Array and the iterator
        $("<ons-button id='" + i + "' modifier='quiet' class='monthStyle'>" + monthData[i] + "</ons-button>").appendTo(self.$page).on('click', function () {
            // Get the id of the button
            var id = $(this).attr('id');

            // New month item to format to 'Jan'
            nMonth = new Sugar.Date("'" + monthData[id] + " " + nToday + ", " + year + "'").format('%b');

            // Check how many days are in the new month
            daysInChangedMonth = moment().month(id).year(year).daysInMonth();

            // Month has changed
            monthChange = true;

            // Clear screen and addDays page
            $("#AddMonthsPage").html("");
            AddDaysPage();

        });
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
    $("<ons-button modifier='quiet' class='xBtn'></ons-button>").appendTo(self.$page).on('click', function () {
        $("#AddYearsPage").html("");
        showFrontPage();
    });

    // Adds the Years page title to the toolbar
    $("<div class='weather'>Years</div>").appendTo(self.$page);

    // Declares the number of Years I wanted for the dummy data on the page
    var years = 4;

    // A simple loop to generate 4 Year buttons down the page
    for (var i = 0; i < years; i++) {

        // The Text on the buttons is made from the YearData Array and the iterator
        $("<ons-button modifier='quiet' class='yearStyle'>20" + YearData[i] + "</ons-button>").appendTo(self.$page);
    }

    // The page element is appended to the container element, this presenting it to the screen.
    self.$container.append(self.$page);
}


/***********************************
 * Function to create a new user
 ************************************/

window.baseUrl = "http://introtoapps.com/datastore.php?appid=214527872";

function createUser(_username, _password) {

    // User variable is accesible in the window
    window.username = _username;

    // User object created
    var userObj = {
        username: _username,
        password: _password,

    };

    // Event Array created and stringified
    var eventArray = JSON.stringify([]);

    // Base URL for ajax calls
    var data = JSON.stringify(userObj);
    var url = baseUrl + "&action=save&objectid=" + encodeURIComponent(_username) + ".user&data=" + encodeURIComponent(data);

    // Ajax call to save the username and password
    $.ajax({
        url: url,
        cache: false
    }).done(function (data) {
        //alert("result:" + data);                       
    }).fail(function (jqXHR, testStatus) {
        alert("request failed: ", testStatus);
    });

    // Saves event array to .events
    var url = baseUrl + "&action=save&objectid=" + encodeURIComponent(_username) + ".events&data=" + encodeURIComponent(eventArray);

    // Ajax call to save events array
    $.ajax({
        url: url,
        cache: false
    }).done(function (eventsArray) {
        //alert("result:" + eventsArray);                       
    }).fail(function (jqXHR, testStatus) {
        alert("request failed: ", testStatus);
    });


}

/***********************************
 * Function to Load User
 ************************************/
function loadUser(_username, _password) {

    // Username and password variables
    var userName = _username;
    var passWord = _password;

    // Load url to load user data
    var url = baseUrl + "&action=load&objectid=" + encodeURIComponent(_username) + ".user";
    
    // Ajax call to load user and test if the input is the same as the stored data
    $.ajax({
        url: url,
        cache: false
    }).
    done(function (data) {
        alert("result:" + data);
        // Load events 
        var loadedData = JSON.parse(data);
        if (_username == loadedData.username && _password == loadedData.password) {
            loggedIn = true;
            alert("logged in");
            $("#LoginPage").html("");
            showFrontPage();
        } else {
            alert("Username or password is incorrect!");
        }

    }).fail(function (jqXHR, testStatus) {
        alert("No such user, try again");

    });


}
/***********************************
 * Function to collect event data and store into an object
 ************************************/
function storeEvent(_date, _time, _colorTri, _eventTitle) {
    
    // Event Object
    var eventObj = {
        date: _date,
        time: _time,
        colorTri: _colorTri,
        event: _eventTitle
    };

    // Turn the object into JSON
    var data = JSON.stringify(eventObj);
    
    // Append the object to the user.events datastore
    var url = baseUrl + "&action=append&objectid=" + encodeURIComponent(userName) + ".events&data=" + encodeURIComponent(data);
    
    // Ajax call to save data
    $.ajax({
        url: url,
        cache: false
    }).
    done(function (data) {
        alert("result:" + data);
    }).fail(function (jqXHR, testStatus) {
        alert("request failed: ", testStatus);
    });
}


/***********************************
 * Function to load event data and parse it into an object
 ************************************/
function loadEvent(_date) {
    
    // Date stamp parsed through
    var newDateStamp = _date;
    
    // Load username.events
    var url = baseUrl + "&action=load&objectid=" + encodeURIComponent(userName) + ".events";
    
    // Ajax call loads and outputs event to screen
    $.ajax({
        url: url,
        cache: false
    }).
    done(function (data) {
        
        // Load events 
        var loadedData = JSON.parse(data);
        
        // Content is taken from the loaded data 
        var contents = '';
        var dateCounter = 0;
        for (var i = 0; i < loadedData.length; i++) {
            if (loadedData[i].date == newDateStamp) {
                
                // Event is created on the show events page
                contents += "<ons-list-item>";
                contents += "<div class='left'><div class='" + triArray[loadedData[i].colorTri] + "'></div></div>";
                contents += "<div><span class='list-item__title'>" + loadedData[i].event + "</span><span class='list-item__subtitle'>" + loadedData[i].time + "</span></div></ons-list-item>";
                
                // Output to the div with the id of content
                document.getElementById('content').innerHTML = contents;
                dateCounter++;

            }
        }
        // If there is no data just output this simple message
        if (dateCounter == 0) {
            contents += "Add a new event"
            contents += "<ons-list-item>";
            contents += "<div class='left'><div class='" + triArray[0] + "'></div></div>";
            contents += "<div><span class='list-item__title'></span><span class='list-item__subtitle'></span></div></ons-list-item>";
            document.getElementById('content').innerHTML = contents;
            dateCounter++;

        }


    }).fail(function (jqXHR, testStatus) {
        alert("request failed: ", testStatus);

    });
}
