// Wrapped in an immediately invoked function expression.
(function() {

  // submits a new freet for the current user

  $(document).on('click', '#submit-new-freet', function(evt) {
      var content = $('#new-freet-input').val();
       if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.post(
          '/freets',
          { content: content }
      ).done(function(response) {
           loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  // click to go look at another user's page

  $(document).on('click', '#goto-user', function(evt) {
      var content = $('#goto-user-input').val();
       if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.get('/freets/user/' + content,function(response) {
         if (response.content.err) {
          alert("There is no user by that username");
        } else  {
          loadPage("page", {user: content, freets: response.content.freets, currentUser: false});
        }
      });
  });

  // deletes a freet for the current user

  $(document).on('click', '.delete-note', function(evt) {
      var item = $(this).parent().parent();
      var id = item.data('note-id');
      $.ajax({
          url: '/freets/' + id,
          type: 'DELETE'
      }).done(function(response) {
           item.remove();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

})();
