var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var User = require('../models/User')

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
  if (!(req.currentUser.username === req.freet.creator)) {
    utils.sendErrResponse(res, 404, 'Resource not found.');
  } else {
    next();
  }
};

/*
  For create and edit requests, require that the request body
  contains a 'content' field. Send error code 400 if not.
*/
var requireContent = function(req, res, next) {
  if (!req.body.content) {
    utils.sendErrResponse(res, 400, 'Content required in request.');
  } else {
    next();
  }
};

/*
  Grab a note from the store whenever one is referenced with an ID in the
  request path (any routes defined with :note as a paramter).
*/
router.param('freet', function(req, res, next, freetId) {
  User.getFreet(req.currentUser.username, freetId, function(err, freet) {
    if (freet) {
      req.freet = freet;
      next();
    } else {
      utils.sendErrResponse(res, 404, 'Resource not found.');
    }
  });
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
  GET /notes
  No request parameters
  Response:
    - success: true if the server succeeded in getting the user's notes
    - content: on success, an object with a single field 'notes', which contains a list of the
    user's notes
    - err: on failure, an error message
*/
router.get('/', function(req, res) {
  console.log("getting freets for", req.currentUser);
  User.getFreets(req.currentUser.username, function(err, freets) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } else {
      utils.sendSuccessResponse(res, { freets: freets });
    }
  });
});

/*
  GET /notes/:note
  Request parameters:
    - note: the unique ID of the note within the logged in user's note collection
  Response:
    - success: true if the server succeeded in getting the user's notes
    - content: on success, the note object with ID equal to the note referenced in the URL
    - err: on failure, an error message
*/
router.get('/:freet', function(req, res) {
  utils.sendSuccessResponse(res, req.freet);
});

/*
  POST /notes
  Request body:
    - content: the content of the note
  Response:
    - success: true if the server succeeded in recording the user's note
    - err: on failure, an error message
*/
router.post('/', function(req, res) {
console.log("posting to /freets");
  User.addFreet(req.currentUser.username, {
    content: req.body.content,
    creator: req.currentUser.username
  }, function(err, freet) {
     if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } else {
      utils.sendSuccessResponse(res);
    }
  });
});




module.exports = router;