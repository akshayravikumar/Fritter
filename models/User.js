var mongoose = require("mongoose");
var Freet = require("./Freet");

var userSchema = mongoose.Schema({
  /* Exercise 1: Declare schema here */
  username: String,
  freets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Freet'}],
  refreets : [{type: mongoose.Schema.Types.ObjectId, ref: 'Freet'}],
  password: String,
  following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

// var User = mongoose.model("User", userSchema);

userSchema.statics.doesUserExist = function (username, cb) {
  return this.findOne({'username' : username}, function (err, user) {
      if (err) {cb(undefined);}
      else {cb(user);}
    });
}


userSchema.statics.unfollow = function (username1, username2, cb) {
  var User = this;
  User.doesUserExist(username1, function (user) {
      if (user) {
        User.doesUserExist(username2, function(user2) {
          if (user2) {
            user.following.splice(user.following.indexOf(user2._id), 1);
            user.save(function(err) {
              if (err) {cb(err); return;}
              else {cb(null);return;}
            });
          }
          else {cb("error"); return;}
        });
      } else {
        cb("error");
      }
    });
}

userSchema.statics.getFreets = function(username, cb) {
  var User = this;
  User.doesUserExist(username, function(user) {
      if (user) {
        Freet.find({'_id': { $in: user.freets}}, function(err, freets){
          if(err) {cb("An unknown error occurred."); return;}
          else {
            Freet.find({'_id': { $in: user.refreets}}, function(err, refreets){
              if(err) {cb("An unknown error occurred."); return;}
              else {cb(null, freets, refreets);}
            });
           }
        });
      } else {
        cb("An unknown error occurred."); return;
      }
    });
}

userSchema.statics.follow = function (username1, username2, cb) {
  var User = this;
  User.doesUserExist(username1, function (user) {
      if (user) {
        User.doesUserExist(username2, function(user2) {
          if (user2) {
            user.following.push(user2);
            user.save(function(err) {
              if (err) {cb(err); return;}
              else {cb(null);return;}
            });
          }
          else {cb("error"); return;}
        });
      } else {
        cb("error");
      }
    });
}

userSchema.methods.addFreet = function(freet, cb) {
  this.freets.push(freet);
  this.save(cb);
}

userSchema.methods.addReFreet = function(freet, cb) {
  this.refreets.push(freet);
  this.save(cb);
}



// When we 'require' this model in another file (e.g. routes),
// we specify what we are importing form this file via module.exports.
// Here, we are 'exporting' the mongoose model object created from
// the specified schema.

module.exports = mongoose.model("User", userSchema);
