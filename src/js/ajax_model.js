/**
 * ajax_model.js: this script utilizes ajax to retrieve data from
 *                'retriever_model.py'. Specifically, every 'svm_model' is
 *                returned.
 */

// AJAX Process
  function modelId() {
    $.ajax({
      type: 'POST',
      url: '/retrieve-model/',
      dataType: 'json',
      beforeSend: function() {
        ajaxLoader($('form'));
      }
    }).done(function(data) {

      // Remove AJAX Overlay
      $('form .ajax-overlay').fadeOut(200, function() { $(this).remove(); });

      // Append to DOM
      if (data.error) {
        $('.fieldset-dataset-type').append('<div class="error">' + data.error + '</div>');
      } else {
        $.each(data, function(index, value) {
          var valueId    = value.id;
          var valueTitle = value.title;
          var element     = '<option ' + 'value="' + valueId + '">' + valueId + ': ' + valueTitle + '</option>';

          $('select[name="svm_model_id"]').append(element);
        });
      }

    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Error Thrown: ' + errorThrown);
      console.log('Error Status: ' + textStatus);

      // Remove AJAX Overlay
      $('form .ajax-overlay').fadeOut(200, function() { $(this).remove(); });
    });
  }
