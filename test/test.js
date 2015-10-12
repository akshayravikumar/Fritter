var assert = require("assert");
var User = require("../models/User");
// Array is the module under test.
describe('User Model Code', function() {
  User.createNewUser("user1", "pass", function() {  });
  User.createNewUser("user2", "pass2", function() {  });
  // testing creating a new user
  describe('createNewUser + findByUsername', function () {
    it('should return user if exists', function () {
      User.findByUsername("user1", function(err, user) {
        assert(user);
      })
    });

    it('should return error if doesnt exist', function () {
      User.findByUsername("userfake", function(err, user) {
        assert.equal(err.msg, 'Invalid user. ');
      })
    });

  });

  // testing creating a new user
  describe('verifyPassword', function () {
    it('should return true if correct', function () {
      User.verifyPassword("user1", "pass", function(err, result) {
        assert(result);
      })
    });


    it('should return false if wrong', function () {
      User.verifyPassword("user1", "passasasdf", function(err, result) {
        assert(!result);
      })
    });

    it('should return error if doesnt exist', function () {
      User.verifyPassword("userfake", "sdasdf", function(err, user) {
        assert.equal(err.msg, 'Invalid user. ');
      })
    });

  });

  describe('addFreet', function () {
    it('should return a freet when added to user that exists', function () {
      User.addFreet("user1", {content: "ayy lmao",creator: "user1"},
      function() {
        User.getFreets("user1", function(err, freets) {
          assert.equal(freets.length, 1);
        })
      });
    });

    it('should return error if user does not exist', function () {
      User.addFreet("userfake", {content: "ayy lmao",creator: "user1"},
      function(err) {
        assert.equal(err.msg, 'Invalid user.');
      });
    });
  });

  describe('getFreets', function () {
    it('should return no freets when the user exists, has no freets', function () {
      User.getFreets("user2", function(err, freets) {
        assert.equal(freets.length, 0);
      })
    });
    it('should return one freet when the user exists, has freets', function () {
      User.getFreets("user1", function(err, freets) {
        assert.equal(freets.length, 1);
      })
    });
    it('should return error when the user does not exist', function () {
      User.getFreets("userfake", function(err, freets) {
        assert.equal(err.msg, 'Invalid user.');
      })
    });
  });

  describe('getFreet', function () {
    it('should return one freet when the user exists', function () {

      User.addFreet("user1", {content: "ayy lmao",creator: "user1"},
      function() {
        User.getFreet("user1", 1, function(err, freets) {
          assert(freets);
        })
      });

    });

    it('should return error when id wrong', function () {
      User.getFreet("user2", 10, function(err, freets) {
        assert.equal(err.msg, 'Invalid note. ');
      })
    });

    it('should return error when the user does not exist', function () {
      User.getFreet("userfake", 10, function(err, freets) {
        assert.equal(err.msg, 'Invalid user. ');
      })
    });
  });

  describe('removeFreet', function () {
    it('should remove one freet when the user exists, id correct', function () {

      User.addFreet("user1", {content: "ayy lmao",creator: "user1"},
      function() {
        User.removeFreet("user1", 1, function(err) {
          User.getFreets("user2", function(err, freets) {
            assert.equal(freets.length, 0);
          })
        })
      });

    });

    it('should return error when id wrong', function () {
      User.addFreet("user1", {content: "ayy lmao",creator: "user1"},
      function() {
        User.removeFreet("user1", 1, function(err) {
          assert.equal(err.msg, 'Invalid note.')
        })
      });

    });

    it('should return error when the user does not exist', function () {
      User.removeFreet("userfake", 10, function(err, freets) {
        assert.equal(err.msg, 'Invalid user.');
      })
    });
  });
}); // End describe Array.
