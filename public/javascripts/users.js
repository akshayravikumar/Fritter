// Wrap in an immediately invoked function expression.

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



(function() {

  $(document).on('submit', '#signin-form', function(evt) {
      evt.preventDefault();
      $.post(
          '/users/login',
          helpers.getFormData(this)
      ).done(function(response) {
          currentUser = response.content.user;
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
  // click to go look at another user's page

  $(document).on('click', '#goto-user', function(evt) {
      var content = $('#goto-user-input').val();
      console.log("aylmao!");
      console.log(content);
       if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.get('/freets/user/' + content,function(response) {
         if (response.err) {
          alert(response.err);
        } else  {
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
            freet.orig = content;
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
          if (content.trim() === currentUser) {
            loadPage("page",
              {"user": content,
                "freets": freetPage,
                "notCurrent": false,
                "following": response.content.following
              });
          } else {
            loadPage("page",
              {"user": content,
                "freets": freetPage,
                "notCurrent": true,
                "following": response.content.following
              });
          }

        }
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          alert(response.err);
      });
  });


  // aylmao
    $(document).on('click', '.goto-newsfeed', function(evt) {
      $.get(
          '/freets/allfreets'
      ).done(function(response) {
        freetPage = [];
        response.content.allFreets.forEach(function (user, index) {
           for (var i = 0; i < user.freets.length; i++) {
            var freet = user.freets[i];
            freet.refreet = false;
            freet.time = moment(freet.time).fromNow();
            freetPage.push(freet);
          }
          for (var i = 0; i < user.refreets.length; i++) {
            var freet = user.refreets[i];
            freet.refreet = true;
             freet.time = moment(freet.time).fromNow();
            freetPage.push(freet);
            freet.orig = user.username;
          }
        });
        function compare(a,b) {
          if (a.time > b.time)
            return -1;
          if (a.time < b.time)
            return 1;
          return 0;
        }
        freetPage.sort(compare);
         var followingString = "You aren't following anyone!";
         if (response.content.following) {
          followingString = "You're following " + response.content.following.join(", ") + "!";
        }
        loadPage("newsfeed",{freets: freetPage, "current": currentUser, following: followingString });
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          alert(response.err);
      });
    });

  // click to go look at another user's page

  $(document).on('click', '.follow-button', function(evt) {
    var user = $(this).attr("user");
     $.get('/users/follow/' + user, function(response) {
        if (response.content) {
         if (response.content.err) {
           alert("Error.");
         }
      } else  {
        alert("You have followed " + user);
        $(".follow-button").text("Unfollow");
        $(".follow-button").removeClass("follow-button").addClass("unfollow-button");
      }
    });
  });

    $(document).on('click', '.unfollow-button', function(evt) {
      var user = $(this).attr("user");
       $.get('/users/unfollow/' + user,function(response) {
        if (response.content) {
          if (response.content.err) {
            alert("Error.");
          }
       } else  {
          alert("You have unfollowed " + user);
          $(".unfollow-button").text("Follow");
          $(".unfollow-button").addClass("follow-buttn").removeClass("unfollow-button");
        }
      });
    });

  $(document).on('submit', '#register-form', function(evt) {
      evt.preventDefault();
      var formData = helpers.getFormData(this);
      if (formData.password !== formData.confirm) {
          $('.error').text('Password and confirmation do not match!');
          return;
      }
      delete formData['confirm'];
      $.post(
          '/users',
          formData
      ).done(function(response) {
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '#logout-link', function(evt) {
      evt.preventDefault();
      $.post(
          '/users/logout'
      ).done(function(response) {
          currentUser = undefined;
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();
