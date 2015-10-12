// Data for each User is stored in memory instead of in
// a database. This store (and internal code within the User model)
// could in principle be replaced by a database without needing to
// modify any code in the controller.
var _store = { };

// Model code for a User object in the note-taking app.
// Each User object stores a username, password, and collection
// of notes. Each note has some textual content and is specified
// by the owner's username as well as an ID. Each ID is unique
// only within the space of each User, so a (username, noteID)
// uniquely specifies any note.
var User = (function User(_store) {

  var that = Object.create(User.prototype);

  var userExists = function(username) {
    return _store[username] !== undefined;
  }

  var getUser = function(username) {
    if (userExists(username)) {
      return _store[username];
    }
  }

  that.findByUsername = function (username, callback) {
    if (userExists(username)) {
      callback(null, getUser(username));
    } else {
      callback({ msg : 'No such user!' });
    }
  }

  that.verifyPassword = function(username, candidatepw, callback) {
    if (userExists(username)) {
      var user = getUser(username);
      if (candidatepw === user.password) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    } else {
      callback(null, false);
    }
  }

  that.createNewUser = function (username, password, callback) {
    if (userExists(username)) {
      callback({ taken: true });
    } else {
      _store[username] = { 'username' : username,
                 'password' : password,
                 'freets' : [] };
      callback(null, getUser(username));
    }
  };

  that.getFreet = function(username, freetId, callback) {
    if (userExists(username)) {
      var user = getUser(username);
      if (user.freets[freetId]) {
        var freet = user.freets[freetId];
        callback(null, freet);
      } else {
        callback({ msg : 'Invalid note. '});
      }
    } else {
      callback({ msg : 'Invalid user. '});
    }
  };

  that.getFreets = function(username, callback) {
    console.log("getting freets for this user");
    if (userExists(username)) {
      var user = getUser(username);
      callback(null, user.freets);
    } else {
      callback({ msg : 'Invalid user.' });
    }
  }

  that.addFreet = function(username, freet, callback) {
    console.log("adding freet", freet, username);
    if (userExists(username)) {
      var user = getUser(username);
      freet._id = user.freets.length;
      user.freets.push(freet);
      callback(null);
      console.log(_store);
    } else {
      callback({ msg : 'Invalid user.' });
    }
  };

  that.removeFreet = function(username, freetId, callback) {
    console.log(username, freetId);
   if (userExists(username)) {
     var freets = getUser(username).freets;
     if (freets[freetId]) {
       delete freets[freetId];
       callback(null);
     } else {
       callback({ msg : 'Invalid note.' });
     }
   } else {
     callback({ msg : 'Invalid user.' });
   }
 };

 that.createNewUser("akshay", "akshay", function(){});
  Object.freeze(that);
  return that;

})(_store);


module.exports = User;
