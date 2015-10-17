var assert = require("assert");
var User = require("../models/User");
var Freet = require("../models/Freet");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testsuite');
var db = mongoose.connection;
db.db.dropDatabase();
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("database connected");
});

User.remove({}, function(err) {
   console.log('collection removed');
});
Freet.remove({}, function(err) {
   console.log('collection removed');
});
// There are no Freet methods, so we only need to test User Code.
describe('User Model Code', function() {

  var newFreet = new Freet({posterName: "aylmao", content: "lmaoayy"});
  newFreet.save(function(err) {});

  var newFreet2 = new Freet({posterName: "aylmao", content: "ayylmao"});
  newFreet2.save(function(err) {});

  describe("creating a new User", function( ) {
    it('should create without error', function () {
      var newUser = new User({username: "thatpictureof", password: "danieljackson"});
      newUser.save(function (err) {
         assert(err);
      });
    });

    it('should create without error', function () {
       var newUser = new User({username: "ayy", password: "lmao"});
      newUser.save(function (err) {
         assert(!err);
      });
    });

  });

  describe("doesUserExist", function( ) {
    it('should return object if it does', function () {
      User.doesUserExist("thatpictureof", function(user) {
        assert(user);
      });
    });

    it('should not return object if it doesn\'t', function () {
      User.doesUserExist("notthatpictureof", function(user) {
        assert(!user);
      });
    });
  });

  describe("follow", function( ) {
    it('should be fine if both users exist', function (done) {
      User.follow("thatpictureof", "ayy", function(err) {
          assert.equal(err, null);
         done();
      });
    });

    it('should not be fine if first user doesnt exist', function (done) {
      User.follow("maxandrobert", "ayy", function(err) {
          assert.equal(err, "error");
         done();
      });
    });

    it('should not be fine if second user doesnt exist', function (done) {
      User.follow("thatpictureof", "robertandmax", function(err) {
          assert.equal(err, "error");
         done();
      });
    });

  });

  describe("unfollow", function( ) {
    it('should be fine if both users exist', function (done) {
      User.unfollow("thatpictureof", "ayy", function(err) {
          assert.equal(err, null);
         done();
      });
    });

    it('should not be fine if first user doesnt exist', function (done) {
      User.unfollow("maxandrobert", "ayy", function(err) {
          assert.equal(err, "error");
         done();
      });
    });

    it('should not be fine if second user doesnt exist', function (done) {
      User.unfollow("thatpictureof", "robertandmax", function(err) {
          assert.equal(err, "error");
         done();
      });
    });

  });

  describe("addFreet", function() {
      it('should work without error', function (done) {
        User.doesUserExist("thatpictureof", function(user) {
          user.addFreet(newFreet, function(err) {
             assert.equal(err, null);
             done();
          });
        });
      });
  });

  describe("addReFreet", function() {
      it('should work without error', function (done) {
        User.doesUserExist("thatpictureof", function(user) {
          user.addReFreet(newFreet2, function(err) {
             assert.equal(err, null);
             done();
          });
        });
      });
  });

  describe("getFreets", function( ) {
    it('should be none if neither exist', function (done) {
      User.getFreets("ayy", function(err, freets, refreets) {
        assert.equal(freets.length + refreets.length, 0);
        done();
      });
    });

    it('should be error if doesnt exist', function (done) {
      User.getFreets("thisclasstakestoolongtbh", function(err, freets, refreets) {
        assert(err !== null);
        done();
      });
    });

    it('should return some if exists', function (done) {
      User.getFreets("thatpictureof", function(err, freets, refreets) {
        assert.equal(freets.length * refreets.length, 1);
        done();
      });
    });

  });

}); // End describe Array.
