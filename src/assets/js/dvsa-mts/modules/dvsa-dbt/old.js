$(document).ready(function () {

	var steering = new CompareScreenSteering({
		selector: '#differences-form table.table-form',
		isPosted: formRepost == 1
	});

	Backbone.Events.on('total-score-changed', function (e) {
		$('#totalScore').text(e.totalScore);
		if (e.suppressCaseOutcome === 0 ) {
			this.preSelectCaseOutcome();
		}
	}, steering);

	Backbone.Events.on('case-outcome-justification-required', function () {
		$('#finalJustification').focus();
	});

	steering.attach();

  // The plan is to set up all popovers as clicks for touchscreens / hovers for laptops...
  var is_touch_device = 'ontouchstart' in document.documentElement;
  if (!is_touch_device) {  // If its not a touch-device - then use hovers...
      $("[data-toggle=popover]").popover({ // Info here http://getbootstrap.com/javascript/#popovers-examples
          "placement": "top",		 // Stick it where there's room
          "html": true,			 // Enable html in popovers
          "trigger": "hover"		 // Set up all popovers as hovers...
      });
  } else { 	// Else - If it IS a touch-device use clicks (rather than hovers)...
      $("[data-toggle=popover]").popover({ // More info here http://getbootstrap.com/javascript/#popovers-examples
          "placement": "top",		 // Stick it where there's room
          "html": true,			 // Enable html in popovers
          "trigger": "click"		 // If a touchscreen device -  set up all popovers as clicks...
      });
  }

	// Always remove the error-class from the selects and textarea's onChange
	if (formRepost) {
	  $('select').on('change', function() {
	      $(this).removeClass('inputError');
	  });
	  $('textarea').on('change keyup paste', function() {
	      if (this.value.length) {
	          $(this).removeClass('inputError');
	      }
	  });
	}

	// Autosize all textarea boxes
	$('textarea').autosize();

	// Show any hidden elements on page load.  Used for hiding the Indicative case outcome score from non-js
	// enabled browsers.
	$('.showOnPageLoad').removeClass('hidden').show();

	$('#differences-form').submit(function(event) {
	  // We are using "disabled" on the select drop-downs to provide read-only functionality.  The side-effect
	  // of this is that these form elements will not get submitted as this is the behaviour of disabled
	  // elements. They are menat to be submitted though, so we can just un-disable them.
	  $('#differences-form select:disabled').removeAttr('disabled');
	});

});
