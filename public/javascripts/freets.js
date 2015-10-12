// Wrapped in an immediately invoked function expression.
(function() {
  $(document).on('click', '#submit-new-freet', function(evt) {
      var content = $('#new-freet-input').val();
      console.log(content);
      if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.post(
          '/freets',
          { content: content }
      ).done(function(response) {
        console.log(response);
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '#goto-user', function(evt) {
      var content = $('#goto-user-input').val();
      console.log(content);
      if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.get('/freets/user/' + content,function(response) {
        console.log(response);
        if (response.content.err) {
          alert("There is no user by that username");
        } else  {
          loadPage("page", {user: content, freets: response.content.freets, currentUser: false});
        }
      });
  });

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


  $(document).on('click', '.cancel-button', function(evt) {
      var item = $(this).parent();
      item.prev().show();
      item.remove();
  });

  $(document).on('click', '.submit-button', function(evt) {
      var item = $(this).parent();
      var id = item.data('note-id');
      var content = item.find('input').val();
      if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.post(
          '/freets/' + id,
          { content: content }
      ).done(function(response) {
          item.after(Handlebars.templates['freet']({
              _id: id,
              content: content,
              currentUser: true
          }));
          item.prev().remove();
          item.remove();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();
