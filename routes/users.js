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
var utils = require('../utils/utils');

var User = require('../models/User');

 /*
  For both login and create user, we want to send an error code if the user
  is logged in, or if the client did not provide a username and password
  This function returns true if an error code was sent; the caller should return
  immediately in this case.
*/
var isLoggedInOrInvalidBody = function(req, res) {
  if (req.currentUser) {
    utils.sendErrResponse(res, 403, 'There is already a user logged in.');
    return true;
  } else if (!(req.body.username && req.body.password)) {
    utils.sendErrResponse(res, 400, 'Username or password not provided.');
    return true;
  }
  return false;
};

/*
  This function will check to see that the provided username-password combination
  is valid. For empty username or password, or if the combination is not correct,
  an error will be returned.

  An user already logged in is not allowed to call the login API again; an attempt
  to do so will result in an error code 403.

  POST /users/login
  Request body:
    - username
    - password
  Response:
    - success: true if login succeeded; false otherwise
    - content: on success, an object with a single field 'user', the object of the logged in user
    - err: on error, an error message
*/
router.post('/login', function(req, res) {

  if (isLoggedInOrInvalidBody(req, res)) {
    return;
  }
  User.doesUserExist(req.body.username, function (user) {
    if (user) {
      if (req.body.password === user.password) {
        req.session.username = req.body.username;
        utils.sendSuccessResponse(res, { user : req.body.username });
      } else {
        utils.sendErrResponse(res, 403, 'Username or password invalid.');
      }
    } else {
      utils.sendErrResponse(res, 403, 'Username or password invalid.');
    }
  });

});

/*
  POST /users/logout
  Request body: empty
  Response:
    - success: true if logout succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/logout', function(req, res) {
  if (req.currentUser) {
    req.session.destroy();
    utils.sendSuccessResponse(res);
  } else {
    utils.sendErrResponse(res, 403, 'There is no user currently logged in.');
  }
});

/*
  Create a new user in the system.

  All usernames in the system must be distinct. If a request arrives with a username that
  already exists, the response will be an error.

  This route may only be called accessed without an existing user logged in. If an existing user
  is already logged in, it will result in an error code 403.

  Does NOT automatically log in the user.

  POST /users
  Request body:
    - username
    - password
  Response:
    - success: true if user creation succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/', function(req, res) {
  if (isLoggedInOrInvalidBody(req, res)) {
    return;
  }

  User.doesUserExist( req.body.username, function (user) {
    if (user) {
        utils.sendErrResponse(res, 403, 'Username already exists!');
    } else {
        var newUser = new User({username: req.body.username, password: req.body.password});
          newUser.save(function (err) {
          if (err) {utils.sendErrResponse(res, 500, 'An error has occurred.'); return;}
          utils.sendSuccessResponse(res, newUser.username);
          return;
        });
    }
  });

});


router.get('/follow/:username', function(req, res) {
    User.follow(req.currentUser.username, req.params.username, function(err) {
      if(err) {utils.sendErrResponse(res, 403, err); return;}
      else {utils.sendSuccessResponse(res); return;}
    });
  });

  router.get('/unfollow/:username', function(req, res) {
      User.unfollow(req.currentUser.username, req.params.username, function(err) {
        if(err) {utils.sendErrResponse(res, 403, err); return;}
        else {utils.sendSuccessResponse(res); return;}
      });
    });
/*
  Determine whether there is a current user logged in

  GET /users/current
  No request parameters
  Response:
    - success.loggedIn: true if there is a user logged in; false otherwise
    - success.user: if success.loggedIn, the currently logged in user
*/
router.get('/current', function(req, res) {
  if (req.currentUser) {
    utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.username });
  } else {
    utils.sendSuccessResponse(res, { loggedIn : false });
  }
});

module.exports = router;
