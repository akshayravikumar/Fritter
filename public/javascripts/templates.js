(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['freet'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr class=\"note\" data-note-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n  <td style = \"width: 200px\">\n  "
    + alias4(((helper = (helper = helpers.orig || (depth0 != null ? depth0.orig : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"orig","hash":{},"data":data}) : helper)))
    + " refreeted  from @"
    + alias4(((helper = (helper = helpers.posterName || (depth0 != null ? depth0.posterName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posterName","hash":{},"data":data}) : helper)))
    + "\n  </td>\n  <td style = \"width: 200px\">\n    ["
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "]\n  </td>\n  <td>"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</td>\n  <td style = \"width: 100px\">\n    <a href=\"#\" class=\"delete-note waves-effect waves-light btn blue darken-3\">Delete</a>\n  </td>\n</tr>\n\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr class=\"note\" data-note-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n   <td style = \"width: 200px\">\n     @"
    + alias4(((helper = (helper = helpers.posterName || (depth0 != null ? depth0.posterName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posterName","hash":{},"data":data}) : helper)))
    + "\n   </td>\n   <td style = \"width: 200px\">\n     ["
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "]\n   </td>\n   <td>"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</td>\n   <td style = \"width: 100px\">\n     <a href=\"#\" class=\"delete-note waves-effect waves-light btn blue darken-3\">Delete</a>\n   </td>\n </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.refreet : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
templates['freet_news'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <tr class=\"note\" data-note-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n   <td style = \"width: 200px\">\n   "
    + alias4(((helper = (helper = helpers.orig || (depth0 != null ? depth0.orig : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"orig","hash":{},"data":data}) : helper)))
    + " refreeted  from @"
    + alias4(((helper = (helper = helpers.posterName || (depth0 != null ? depth0.posterName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posterName","hash":{},"data":data}) : helper)))
    + "\n   </td>\n   <td style = \"width: 200px\">\n     ["
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "]\n   </td>\n   <td>"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</td>\n </tr>\n\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <tr class=\"note\" data-note-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n    <td style = \"width: 200px\">\n      @"
    + alias4(((helper = (helper = helpers.posterName || (depth0 != null ? depth0.posterName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posterName","hash":{},"data":data}) : helper)))
    + "\n    </td>\n    <td style = \"width: 200px\">\n      ["
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "]\n    </td>\n    <td>"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</td>\n  </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.refreet : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
templates['freet_read'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <tr class=\"note\" data-note-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n   <td style = \"width: 200px\">\n   "
    + alias4(((helper = (helper = helpers.orig || (depth0 != null ? depth0.orig : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"orig","hash":{},"data":data}) : helper)))
    + " refreeted  from @"
    + alias4(((helper = (helper = helpers.posterName || (depth0 != null ? depth0.posterName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posterName","hash":{},"data":data}) : helper)))
    + "\n   </td>\n   <td style = \"width: 200px\">\n     ["
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "]\n   </td>\n   <td>"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</td>\n   <td style = \"width: 100px\">\n     <a href=\"#\" class=\"refreet-button waves-effect waves-light btn blue darken-3\" freet-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">Refreet</a>\n   </td>\n </tr>\n\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <tr class=\"note\" data-note-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n    <td style = \"width: 200px\">\n      @"
    + alias4(((helper = (helper = helpers.posterName || (depth0 != null ? depth0.posterName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posterName","hash":{},"data":data}) : helper)))
    + "\n    </td>\n    <td style = \"width: 200px\">\n      ["
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "]\n    </td>\n    <td>"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</td>\n    <td style = \"width: 100px\">\n       <a href=\"#\" class=\"refreet-button waves-effect waves-light btn blue darken-3\" freet-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">Refreet</a>\n    </td>\n  </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.refreet : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
templates['freets'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.freet,depth0,{"name":"freet","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>You haven't posted any freets yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"freets\" class = \"container\">\n\n  <div class = \"row\">\n\n\n  <div class = \"col s6\">\n    <a href=\"#\" id=\"logout-link\" class=\"waves-effect waves-light btn blue darken-3\" style = \"margin-bottom: 0px\">\n      Logout\n    </a>\n    <button class=\"waves-effect waves-light btn blue darken-3 goto-newsfeed\">FritterFeed</button>\n  </div>\n\n<div class = \"col s6 right-align\">\n  <form class = \"right-align\">\n      <div class=\"input-field\" style = \"width: 200px; display: inline-block;\">\n      <label for=\"goto-user-input\">Visit a page</label>\n      <input type=\"text\" id=\"goto-user-input\" autocomplete=\"off\"/>\n    </div>\n    <div class=\"input-field\" style = \"display: inline-block;\">\n      <button id=\"goto-user\" class=\"waves-effect waves-light btn blue darken-3\">Go to User</button>\n    </div>\n  </form>\n</div>\n\n</div>\n\n<div style = \"height: 20px\"></div>\n\n  <div class = \"center-align\" style =\"font-size: 30px\">Welcome, @"
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + "! </div>\n\n  <div>\n    <div class=\"error\"><br/></div>\n    <div class=\"input-field\">\n    <label for=\"new-freet-input\">What do you have to say?</label>\n    <input type=\"text\" id=\"new-freet-input\" length = \"170\"/>\n  </div>\n    <button id=\"submit-new-freet\" class=\"waves-effect waves-light btn blue darken-3\">Submit Freet!</button>\n  </div>\n\n  <div class=\"center-align\" style = \"font-size: 24px\">My Freets</div>\n  <table class = \"highlight\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.freets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</table>\n</div>\n";
},"usePartial":true,"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"homepage\" class = \"center-align\">\n  <div id = \"main_title\" class =\"blue-text text-darken-4\">Fritter</div>\n  <p class = \"center-align\" style = \"font-size: 25px\">Welcome to Fritter! <br/> You must be signed in to continue.</p>\n  <button id=\"signin-btn\" class=\"waves-effect waves-light btn blue darken-3\">Sign in</button>\n  <button id=\"register-btn\" class=\"waves-effect waves-light btn blue darken-3\">Register</button>\n</div>\n";
},"useData":true});
templates['newsfeed'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.freet_news,depth0,{"name":"freet_news","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>You have no freets in your newsfeed!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"freets\" class = \"container\">\n\n  <a href=\"#\" id=\"home-link\" class=\"waves-effect waves-light btn blue darken-3\">\n    <i class=\"fa fa-chevron-left\"></i>\n    Back to Home\n  </a>\n\n  <br/> <br/> <br/>\n\n  <div class = \"center-align\" style =\"font-size: 20px\">Welcome to your FritterFeed, @"
    + alias4(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + "!</div> <br/>\n  <div class = \"center-align\" style =\"font-size: 18px\">"
    + alias4(((helper = (helper = helpers.following || (depth0 != null ? depth0.following : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"following","hash":{},"data":data}) : helper)))
    + "</div>\n   <br/> <br/>\n\n<table class = \"highlight\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.freets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</table>\n\n</div>\n";
},"usePartial":true,"useData":true});
templates['page'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <div class = \"center-align\"> <button class=\"unfollow-button waves-effect waves-light btn blue darken-3\" user=\""
    + container.escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"user","hash":{},"data":data}) : helper)))
    + "\"> Unfollow </button> </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <div class = \"center-align\"> <button class=\"follow-button waves-effect waves-light btn blue darken-3\" user=\""
    + container.escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"user","hash":{},"data":data}) : helper)))
    + "\"> Follow </button> </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.freet_read,depth0,{"name":"freet_read","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "    <p><em>This user has no freets!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"freets\" class = \"container\">\n\n  <a href=\"#\" id=\"home-link\" class=\"waves-effect waves-light btn blue darken-3\">\n    <i class=\"fa fa-chevron-left\"></i>\n    Back to Home\n  </a>\n\n  <br/> <br/> <br/>\n\n  <div class = \"center-align\" style =\"font-size: 20px\">Welcome to @"
    + container.escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "'s Fritter Page!</div> <br/> <br/>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.following : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n<table class = \"highlight\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.freets : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "</table>\n\n</div>\n";
},"usePartial":true,"useData":true});
templates['register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"register\" style = \"width: 50%; margin: auto\">\n  <a href=\"#\" id=\"home-link\" class=\"waves-effect waves-light btn blue darken-3\"><i class=\"fa fa-chevron-left\"></i> Back to Home</a>\n  <h1>Register</h1>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form id=\"register-form\">\n    <div class=\"input-field\">\n      <input type=\"text\" name=\"username\" id = \"usernamefield\" required />\n       <label for=\"usernamefield\">Username</label>\n     </div>\n     <div class=\"input-field\">\n       <input type=\"password\" name=\"password\" id=\"passwordfield\" required />\n        <label for=\"passwordfield\">Password</label>\n      </div>\n      <div class=\"input-field\">\n        <input type=\"password\" name=\"confirm\" id=\"passwordconfirmfield\" required />\n         <label for=\"passwordconfirmfield\">Confirm Password</label>\n       </div>\n       <button class=\"btn waves-effect waves-light\" type=\"submit\">Submit</button>\n  </form>\n</div>\n";
},"useData":true});
templates['signin'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"signin\" style = \"width: 50%; margin: auto\">\n  <a href=\"#\" id=\"home-link\" class=\"waves-effect waves-light btn blue darken-3\"><i class=\"fa fa-chevron-left\"></i> Back to Home</a>\n  <h1>Sign in</h1>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form id=\"signin-form\">\n    <div class=\"input-field col s6\">\n      <div class=\"input-field\">\n        <input type=\"text\" name=\"username\" id = \"usernamefield\" required />\n         <label for=\"usernamefield\">Username</label>\n       </div>\n       <div class=\"input-field\">\n         <input type=\"password\" name=\"password\" id=\"passwordfield\" required />\n          <label for=\"passwordfield\">Password</label>\n        </div>\n     <button class=\"btn waves-effect waves-light  blue darken-3\" type=\"submit\">Submit</button>\n    </div>\n  </form>\n</div>\n";
},"useData":true});
})();