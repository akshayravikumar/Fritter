//
//  ++///////::::::::::::::------------::------:::::::
// +//////:::::::::::-------------------------::--:::
// //////::::::::---------------....-----....--------
// ///:::::::::---------------........-......--------
// /::::::::---------------...-...............--...--
// /::::::--------...-/yyyyyoshs+/:.`````.....--.....
// :::::-------...--+ydmmmmmddmmddhs+-.````..........
// ::::----------/ydmmmmmmmmmmmmddddhs+/-.```........
// ::-------...:ymmmmdddddmmmmmdmdddddhhyo.```..```..
// :------..../hNNNmhyyyyyyyhhhhhhhhddddhhs-``.``````
// :-----....:dNNNmhyssoooooooooooossyhddys:.````````
// :----....-hmNNmhssoooo++++++o+++ooooymmy+-````````
// :-----...+dmmddhsooo++++++++++++ooooodNd/.````````
// ::-----../ddddhysooo++++++//+++++++++ymmo`````````
// :::------+yhhhhsooooo++++++++++++++++sdh:`````````
// /::::--/ssshhysssssoo+++++++++++++o++shy-`````````
// //::::-:sssyssssyhhhyso+++++++++++o++yy+.`````````
// ///:::::syossssyyyyhddhyso+ooossssso+y+..`..``````
// //::::::oysssooosyyddsyyysooyhdddhhyoo:..`````````
// +/:---::/yyyssoooosssosssoosyydhyhsso:...`````````
// /--.--::/syyyssooo+++oosso+oossooooo/.````````````
// :..----::ysyyssso++++ooss++oo+++++++-`````````````
// -..-..-::yyyyysso+++ossso++oo++++++/.`````````````
// -..-.--:-ohsyysooooosssso/+o+++++++/.`````````````
// -.-..-:--:hyssssossssssooooo+++++++/-.````````````
// -----::-..ohyssooossssooooooooooo/:::-````````````
// -----:-...-yhyssossssssossssss+/:-:-/-````````````
// -----::---:+yyyysssooosossyss/-::-::/:````````````
// :----:---:-:-/yhyssssooooshys/-::::/::````````.```
// :-------------:ydhhyssssooso/::::/:/:.```````..```
// :---:----------+ddhooo+++////::::/:-.  `````.....`
// :---:-----:----:hdyo++++////++/-..`  ``````......`
// :::-:-----::---:sys+++++oo+-.`````````````........
// :::-------:/-::/+ss++//+os:.`````````````.........
// /::---:::::/:://+soo+++oso:.....```````...........
// +/:-::::::://:/+sso++++ooo+-....`````.....--......
// o/::////////+/++ysoooooooo+-....````...-..---.....
// o////////+/+oo+sssooooooooo-..........------------

/// in case you dont get it, its that picture of daniel jackson ^^


// See handlebarsjs.com for details. Here, we register
// a re-usable fragment of HTML called a "partial" which
// may be inserted somewhere in the DOM using a function
// call instead of manual insertion of an HTML String.
Handlebars.registerPartial('freet', Handlebars.templates['freet']);
Handlebars.registerPartial('freet_read', Handlebars.templates['freet_read']);
Handlebars.registerPartial('freet_news', Handlebars.templates['freet_news']);


// Global variable set when a user is logged in. Note
// that this is unsafe on its own to determine this: we
// must still verify every server request. This is just
// for convenience across all client-side code.
currentUser = undefined;

// A few global convenience methods for rendering HTML
// on the client. Note that the loadPage methods below
// fills the main container div with some specified
// template based on the relevant action.

var loadPage = function(template, data) {
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
};

var loadHomePage = function() {
	if (currentUser) {
		loadFreetsPage();
	} else {
		$.get('/users/allusers', function(response) {
			loadPage('index', {users: response.content.allUsers});
		});
	}
};

var loadFreetsPage = function() {
	$.get('/freets', function(response) {
 		freetPage = [];
		for (var i = 0; i < response.content.freets.length; i++) {
			var freet = response.content.freets[i];
			freet.refreet = false;
			freet.time = moment(freet.time).fromNow();
			freetPage.push(freet);
		}
		for (var i = 0; i < response.content.refreets.length; i++) {
			var freet = response.content.refreets[i];
			freet.refreet = true;
			freet.orig = currentUser;
 			freet.time = moment(freet.time).fromNow();
			freetPage.push(freet);
		}
		function compare(a,b) {
		  if (a.time > b.time)
		    return -1;
		  if (a.time < b.time)
		    return 1;
		  return 0;
		}
		freetPage.sort(compare);

 		loadPage('freets', { "freets": freetPage, "currentUser": currentUser });
	});
};

$(document).ready(function() {
	$.get('/users/current', function(response) {
		if (response.content.loggedIn) {
			currentUser = response.content.user;
		}
		loadHomePage();
	});
});

$(document).on('click', '#home-link', function(evt) {
	evt.preventDefault();
	loadHomePage();
});

$(document).on('click', '#signin-btn', function(evt) {
	loadPage('signin');
});

$(document).on('click', '#register-btn', function(evt) {
	loadPage('register');
});
