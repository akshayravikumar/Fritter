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
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("on home page");
  res.render('index');
});

module.exports = router;
