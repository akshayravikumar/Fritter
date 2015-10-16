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


  // deletes a freet for the current user
  $(document).on('click', '.delete-note', function(evt) {
      var item = $(this).parent().parent();
      var id = item.data('note-id');
      console.log(item, id);
      $.ajax({
          url: '/freets/' + id,
          type: 'DELETE'
      }).done(function(response) {
        console.log("response", response);
           item.remove();
      }).fail(function(responseObject) {
        console.log("responseObject", responseObject);
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '.refreet-button', function(evt) {
      var id = $(this).attr("freet-id");
      $.post(
          '/freets/refreet/' + id,
          {content: {"freetId" : id}}
      ).done(function(response) {
          alert("You have refreeted this.");
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          // $('.error').text(response.err);
          alert(response.err);
      });
  });

})();
