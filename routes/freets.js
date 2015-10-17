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
var moment = require('moment');
var User = require('../models/User');
var Freet = require('../models/Freet');

/*
  Require authentication on ALL access to /notes/*
  Clients which are not logged in will receive a 403 error code.
*/
var requireAuthentication = function(req, res, next) {
  if (!req.currentUser) {
    utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
  } else {
    next();
  }
};

/*
  Require ownership whenever accessing a particular note
  This means that the client accessing the resource must be logged in
  as the user that originally created the note. Clients who are not owners
  of this particular resource will receive a 404.

  Why 404? We don't want to distinguish between notes that don't exist at all
  and notes that exist but don't belong to the client. This way a malicious client
  that is brute-forcing urls should not gain any information.
*/
var requireOwnership = function(req, res, next) {
  next();
};

/*
  For create and edit requests, require that the request body
  contains a 'content' field. Send error code 400 if not.
*/
var requireContent = function(req, res, next) {
  if (!req.body.content) {
    utils.sendErrResponse(res, 400, 'Content required in request.'); return;
  } else {
    next();
  }
};

/*
  Grab a freet from the store whenever one is referenced with an ID in the
  request path (any routes defined with :note as a paramter).
*/
router.param('freet', function(req, res, next, freetId) {
  User.doesUserExist(req.currentUser.username, function(user) {
      if (user) {
        Freet.findById(freetId, function(err, freet){
          req.freet = freet;
          req.freetCreator = user.username;
          next();
        });
      } else {
         utils.sendErrResponse(res, 500, 'An unknown error occurred.'); return;
      }
    }
  );
});

// Register the middleware handlers above.
router.all('*', requireAuthentication);
router.all('/:freet', requireOwnership);
router.post('*', requireContent);

/*
  At this point, all requests are authenticated and checked:
  1. Clients must be logged into some account
  2. If accessing or modifying a specific resource, the client must own that note
  3. Requests are well-formed
*/

/*
  GET /freets
  No request parameters
  Response:
    - success: true if the server succeeded in getting the user's freets
    - content: on success, an object with a single field 'freets', which contains a list of the
    user's freets
    - err: on failure, an error message
*/
router.get('/', function(req, res) {
  User.getFreets(req.currentUser.username, function(err, freets ,refreets) {
    if(err) {utils.sendErrResponse(res, 500, err); return;}
    else {utils.sendSuccessResponse(res, { 'freets': freets, 'refreets' : refreets });}
  });
});


/*
  GET /allfreets
  No request parameters
  Response:
    - on success, a list of all freets/refreets by the user and his/her followers
*/
router.get('/allfreets', function(req, res) {
  User.doesUserExist(req.currentUser.username, function (user) {
        if (user) {
          User.getFreets(user.username, function (err, userfreets, userrefreets) {
          var allFreets = [];
          var following = [];
          allFreets.push({"username": user.username, "freets" :userfreets, "refreets": userrefreets});
          if (user.following.length === 0) {utils.sendSuccessResponse(res, {"allFreets": allFreets}); return;}
          user.following.forEach(function (id, index) {
            User.findById(id, function(err, user2) {
                if (err)  {utils.sendErrResponse(res, 500, 'An unknown error occurred.'); return;}
                else {
                  following.push(user2.username);
                  User.getFreets(user2.username, function(err, freets, refreets) {
                      if(err) {utils.sendErrResponse(res, 500, 'An unknown error occurred.'); return;}
                      allFreets.push({"username": user2.username, "freets" :freets, "refreets": refreets});
                      if (index === user.following.length - 1) {
                        utils.sendSuccessResponse(res, {"allFreets": allFreets,  "following": following}); return;
                      }
                  });
                }
            });
          });
        });
      }
      else {utils.sendErrResponse(res, 500, 'An unknown error occurred.'); return;}
  });
});


router.get('/user/:username', function(req, res) {
  User.doesUserExist(req.currentUser.username, function(user) {
      if (user) {
        User.doesUserExist(req.params.username, function(user2) {
        if (user2) {
        User.getFreets(req.params.username, function(err, freets ,refreets) {
          if(err) {utils.sendErrResponse(res, 500, 'An unknown error occurred.'); return;}
          else {
            if (user.following.indexOf(user2._id) >= 0) {
               utils.sendSuccessResponse(res, { 'freets': freets, 'refreets': refreets, 'following':true}); return;
            } else {
               utils.sendSuccessResponse(res, { 'freets': freets, 'refreets': refreets, 'following':false}); return;
            }
           }
        });
      }
      else {console.log("user does not exist!"); utils.sendErrResponse(res, 500, 'There is no user named ' + req.params.username + "!"); return; }
      });
    }
    else {utils.sendErrResponse(res, 500, 'An unknown error occurred.'); return; }
  });
});

/*
  GET /freets/:freet
  Request parameters:
    - note: the unique ID of the note within the logged in user's freet collection
  Response:
    - success: true if the server succeeded in getting the user's freets
    - content: on success, the freet object with ID equal to the note referenced in the URL
    - err: on failure, an error message
*/
router.get('/:freet', function(req, res) {
  utils.sendSuccessResponse(res, req.freet);
});

/*
  DELETE /freets/:freet
  Request parameters:
    - freet ID: the unique ID of the freet within the logged in user's freet collection
  Response:
    - success: true if the server succeeded in deleting the user's freet
    - err: on failure, an error message
*/

router.delete('/:freet', function(req, res) {
   User.doesUserExist(req.currentUser.username, function(user) {
    if (user) {
      if (user.freets.indexOf(req.freet._id) >= 0) {
         user.freets.splice(user.freets.indexOf(req.freet._id), 1);
      } else if (user.refreets.indexOf(req.freet._id) >= 0) {
         user.refreets.splice(user.refreets.indexOf(req.freet._id), 1);
      }
      user.save(function(err) {
        if (err) {utils.sendErrResponse(res, 500, 'An unknown error occurred.');}
        else {utils.sendSuccessResponse(res);}
      });
    } else {
       utils.sendErrResponse(res, 500, 'An unknown error occurred.'); return;
    }
  });
});

router.post('/refreet/:freet', function(req, res) {
    User.doesUserExist(req.currentUser.username, function(user) {
      if (user) {
        Freet.findById(req.freet._id, function(err, freet) {
          if (err) {utils.sendErrResponse(res, 500, 'An unknown error occurred.');}
          if (user.refreets.indexOf(freet._id) >= 0) {
              utils.sendErrResponse(res, 403, 'You have already refreeted this!');
          } else {
            user.addReFreet(freet, function (err) {
              if (err) {utils.sendErrResponse(res, 500, 'An unknown error occurred.');}
              else {utils.sendSuccessResponse(res);}
            });
          }
        });
      }
      else { utils.sendErrResponse(res, 500, 'An unknown error occurred.'); }
    });
});

/*
  POST /freets
  Request body:
    - content: the content of the freet
  Response:
    - success: true if the server succeeded in recording the user's freet
    - err: on failure, an error message
*/
router.post('/', function(req, res) {
  User.doesUserExist(req.currentUser.username, function(user) {
    var newFreet = new Freet({posterName: req.currentUser.username, content: req.body.content, creator: req.currentUser.username, type: "posted", freetId : user.freets.length, time: moment()});
    newFreet.save(function(err) {
      if (err) {
       utils.sendErrResponse(res, 500, 'An unknown error occurred.');
     } else {
       user.addFreet(newFreet, function(err) {
         if (err) {utils.sendErrResponse(res, 500, 'An unknown error occurred.');}
         else {utils.sendSuccessResponse(res);}
       });
     }
   });
  });
});

module.exports = router;
