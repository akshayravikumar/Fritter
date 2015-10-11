// Wrapped in an immediately invoked function expression.
(function() {
  $(document).on('click', '#submit-new-freet', function(evt) {
    alert("clicked");
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
              content: content
          }));
          item.prev().remove();
          item.remove();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();
