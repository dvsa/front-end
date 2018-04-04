var ASCII_0 = 48;
var ASCII_9 = 57;

/**
 * Ensure DD/MM fields are zero padded.
 */
function saPad2() {
    var value = $(this).val();
    if (1 == value.length) {
        $(this).val('0' + value);
    }
}

function dateValidators(status){
    var currentYear = new Date().getFullYear();

    if(status){

        $( '#month1' ).rules( "add", {
            required: true,
            number: true,
            min: 1,
            max: 12,
            messages: {
                required: "Start Month is required.",
                number: 'Start Month must be in the range 1 - 12'
            }
        });
        $( '#month2' ).rules( "add", {
            required: true,
            number: true,
            min: 1,
            max: 12,
            messages: {
                required: "End Month is required.",
                number: 'End Month must be in the range 1 - 12'
            }
        });
        $( '#year1' ).rules( "add", {
            required: true,
            number: true,
            min: 1900,
            max: currentYear,
            messages: {
                required: "Start Year is required.",
                min: 'Please enter a valid year'
            }
        });
        $( '#year2' ).rules( "add", {
            required: true,
            number: true,
            min: 1900,
            max: currentYear,
            messages: {
                required: "End Year is required.",
                min: 'Please enter a valid year'
            }
        });

    } else {
        $( '#month1' ).rules( "remove");
        $( '#month2' ).rules( "remove");
        $( '#year1' ).rules( "remove");
        $( '#year2' ).rules( "remove");
    }

}

$(document).ready(function () {
    var textBox = $('#vts-search'),
        formSearch = $('#vts-search-form'),
        selectedElement = document.getElementById('type').selectedIndex,
        dateRangeFields = $('#dateRangeFields');

    formSearch.validate({
        errorClass: "inputError",
        errorContainer: '#validationBox',
        errorLabelContainer: '#validationErrors ol',
        wrapper: 'li'
    });

    if(selectedElement == 0 || selectedElement == 3 || selectedElement == 4 || selectedElement == 5)
        dateRangeFields.hide();
    else
        dateValidators(true);

    switch (selectedElement) {
        case 0: // VTS
        case 1: // VTS BY DATE
            textBox.attr('placeholder', 'eg. V12345');
            break;
        case 2: // TESTER BY DATE
            textBox.attr('placeholder', 'enter username');
            break;
        case 3: // Registration
            textBox.attr('placeholder', 'eg. VK02 MOT');
            break;
        case 4: // VIN/Chassis
            textBox.attr('placeholder', 'eg. WV1ZZZ8ZH6H091596');
            break;
        case 5: // VIN/Chassis
            textBox.attr('placeholder', 'eg. 999999999014');
            break;
    }

    // If search entity changes - then change the search input placeholder text example..
    // and remove the typeahead

    $('#type').on('change', function () {
        selectedElement = document.getElementById('type').selectedIndex;
        switch (selectedElement) {
            case 0: // VTS
                textBox.attr('placeholder', 'eg. V12345');
                formSearch.attr('action', postUrls.vts);
                dateRangeFields.hide('slow');
                dateValidators(false);
                break;
            case 1: // VTS BY DATE
                textBox.attr('placeholder', 'eg. V12345');
                formSearch.attr('action', postUrls.vtsDate);
                dateRangeFields.show('slow');
                dateValidators(true);
                break;
            case 2: // TESTER BY DATE
                textBox.attr('placeholder', 'enter username');
                formSearch.attr('action', postUrls.tester);
                dateRangeFields.show('slow');
                dateValidators(true);
                break;
            case 3: // Registration
                textBox.attr('placeholder', 'eg. VK02 MOT');
                textBox.unbind();
                formSearch.attr('action',  postUrls.vrm);
                dateRangeFields.hide('slow');
                dateValidators(false);
                break;
            case 4: // VIN/Chassis
                textBox.attr('placeholder', 'eg. WV1ZZZ8ZH6H091596');
                textBox.unbind();
                formSearch.attr('action',  postUrls.vin);
                dateRangeFields.hide('slow');
                dateValidators(false);
                break;
            case 5: // MOT test number
                textBox.attr('placeholder', 'eg. 999999999014');
                textBox.unbind();
                formSearch.attr('action',  postUrls.testNumber);
                dateRangeFields.hide('slow');
                dateValidators(false);
                break;
            default:
                break;
        }
    });

    $('#month1, #month2')
        .blur(saPad2)
        .keyup(function (event) {
            if (event.which >= ASCII_0 && event.which <= ASCII_9) {
                if ($(this).val().trim().length == 2) {
                    if(this.id == 'month1')
                        $('#year1').focus();
                    else
                        $('#year2').focus();
                }
            }
        }
    );
});