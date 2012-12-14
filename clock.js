window.addEventListener('load', init, false);

/* =================================================== */
/* === GENERAL UTILITIES ============================= */
/* =================================================== */

function $(selector, parent) { // Get element(s) shortcut
  if ( selector.nodeType ) { // if it an element, return it
		return selector;
	}

	// Set the parent element to search within
	if ( !parent ) {
		parent = document;
	}
	else if ( !parent.nodeType ) { // parent given is an id
		parent = $(parent);
	}

	switch ( selector.charAt(0) ) {
		case ".":	return parent.getElementsByClassName(selector.substr(1))[0]; break;
		case "#": return parent.getElementById(selector.substr(1)); break;
		case ",": return parent.getElementsByClassName(selector.substr(1)); break;
		case ">": return parent.getElementsByTagName(selector.substr(1)); break;
		default:  return parent.getElementsByTagName(selector)[0]; break;
	}
}
function checkForClass(nameOfClass, element) {
	if (typeof element == 'string') { element = $(element); }
	if (element && element.className != '') {
		return new RegExp('\\b' + nameOfClass + '\\b').test(element.className);
	} else {
		return false;
	}
}
function addClass(nameOfClass, element) {
	if (typeof element == 'string') { element = $(element); }
	if (element && !checkForClass(nameOfClass, element)) {
		element.className += (element.className ? ' ' : '') + nameOfClass;
	}
}
function removeClass(nameOfClass, element) {
	if (typeof element == 'string') { element = $(element); }
	if (element && checkForClass(nameOfClass, element)) {
		element.className = element.className.replace( (element.className.indexOf(' ' + nameOfClass) >= 0 ? ' ' + nameOfClass : nameOfClass), '');
	}
}
function toggleClass(nameOfClass, element) {
	if (typeof element == 'string') { element = $(element); }
	if (element && checkForClass(nameOfClass, element)) {
		removeClass(nameOfClass, element);
	} else {
		addClass(nameOfClass, element);
	}
}		


/* =================================================== */
/* === STYLES ======================================== */
/* =================================================== */

// Style options
var fonts = ['neue', 'openSans', 'girl', 'rational', 'georgia'];
var bg = [ 
	{bg:'darkGray',tint:'white'}, 
	{bg:'red',tint:'white'}, 
	{bg:'orange',tint:'black'}, 
	{bg:'yellow',tint:'black'}, 
	{bg:'green',tint:'black'}, 
	{bg:'blue',tint:'white'}, 
	{bg:'purple',tint:'black'}, 
	{bg:'whitebg',tint:'black'},
	{bg:'lightGray',tint:'black'}, 
	{bg:'blackbg',tint:'white'} 
];

// Load options
var currentFontIndex, currentBgIndex;
var body = $('body');

// Set up localStorage of setting on first use
if (localStorage.fontIndex > -1) {
	currentFontIndex = localStorage.fontIndex;
	currentBgIndex = localStorage.bgIndex;
}
else {
	currentFontIndex = 0;
	currentBgIndex = 0;
	localStorage.fontIndex = 0;
	localStorage.bgIndex = 0;
	setTimeout(showTip, 1000);
}
addClass(bg[currentBgIndex].bg, body);
addClass(bg[currentBgIndex].tint, body);
addClass(fonts[currentFontIndex], body);


function cycleBgIndex() {
	if (currentBgIndex == bg.length-1) {
		currentBgIndex = 0;
	}
	else {
		currentBgIndex++;
	}
	localStorage.bgIndex = currentBgIndex;
}

function cycleFontIndex() {
	if (currentFontIndex == fonts.length-1) {
		currentFontIndex = 0;
	}
	else {
		currentFontIndex++;
	}
	localStorage.fontIndex = currentFontIndex;
}

function cycleFont() {
	removeClass(fonts[currentFontIndex], body);
	cycleFontIndex();
	addClass(fonts[currentFontIndex], body);
}

function cycleBg() {
	removeClass(bg[currentBgIndex].bg, body);
	removeClass(bg[currentBgIndex].tint, body);
	cycleBgIndex();
	addClass(bg[currentBgIndex].bg, body);
	addClass(bg[currentBgIndex].tint, body);
}

function cycleOptions() {
	removeClass('showTip', '#topPadding');
	if (event.target.nodeName == 'SPAN') {
		cycleFont();
	}
	else {
		cycleBg();
	}
	event.stopPropagation();
	event.preventDefault();
}

function showTip() {
	addClass('showTip', '#topPadding');
	setTimeout( function() {
		removeClass('showTip', '#topPadding');
	}, 6000);
}


/* =================================================== */
/* === CLOCK ========================================= */
/* =================================================== */

var hour, min, colon;

function date() {
	var currentTime = new Date();

	var miliseconds = currentTime.getSeconds() * 1000;
	setTimeout(startClock, miliseconds);

	var theday = currentTime.getDay();
	var thedate = currentTime.getDate();
	var themonth = currentTime.getMonth();
	
	switch(theday) {
		case 0: theday = 'Sunday'; break;
		case 1: theday = 'Monday'; break;
		case 2: theday = 'Tuesday'; break;
		case 3: theday = 'Wednesday'; break;
		case 4: theday = 'Thursday'; break;
		case 5: theday = 'Friday'; break;
		case 6: theday = 'Saturday'; break;
	}

	switch(themonth) {
		case 0: themonth = 'January'; break;
		case 1: themonth = 'February'; break;
		case 2: themonth = 'March'; break;
		case 3: themonth = 'April'; break;
		case 4: themonth = 'May'; break;
		case 5: themonth = 'June'; break;
		case 6: themonth = 'July'; break;
		case 7: themonth = 'August'; break;
		case 8: themonth = 'September'; break;
		case 9: themonth = 'October'; break;
		case 10: themonth = 'November'; break;
		case 11: themonth = 'December'; break;
	}

	$("#day").innerText = theday;
	$("#month").innerText = themonth;
	$("#date").innerText = thedate;

	// var thehour = currentTime.getHours();
	// var suffix = "AM";
	// if (thehour >= 12) {
	// 	suffix = "PM";
	// }
	// $("#suffix").innerText = suffix;
}

function startClock() {
	clock();
	setInterval(clock, 60000);
}

function clock() {
	var currentTime = new Date();
	var thehour = currentTime.getHours();
	var theminute = currentTime.getMinutes();

	if (thehour >= 12) {
		thehour = thehour - 12;
	}
	if (thehour == 0) {
		thehour = 12;
	}
	if (theminute < 10) {
		theminute = "0" + theminute
	}

	hour.innerText = thehour;
	min.innerText = theminute;
}

function blink() {
	toggleClass("on", colon);
}

// INIT
function init() {
	hour = $("#hour");
	min = $("#minute");
	colon = $("#colon");

	date();
	clock();
	setInterval(blink, 1000);
	addClass('loaded', body);
	body.addEventListener('contextmenu', cycleOptions, false);
	body.addEventListener('click', showTip, false);
}
