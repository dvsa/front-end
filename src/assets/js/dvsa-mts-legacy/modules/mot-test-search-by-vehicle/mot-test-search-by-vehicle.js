import $ from 'jquery';
import { toggleClass } from './../../../shared';

export class MotTestSearchByVehicle {
  constructor() {
    this.classnames = {
      collapse: 'collapse',
    };

    this.elements = {
      showHideContainer: document.querySelector('.show-hide-container'),
      listMOTs: document.querySelector('#listMOTS'),
    };

    this.state = {
      table: false,
    };

    if (!this.elements.listMOTs) return;

    this.init();
  }

  /**
   * Initializer
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.2
   */
  init = () => {
    toggleClass(this.elements.showHideContainer, this.classnames.collapse, true);
    this.initDatatable();
  };

  /**
   * Creates the datatable instance for
   * MOT test search by date range results page
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.2
   */
  initDatatable = () => {
    this.state.table = $(this.elements.listMOTs).dataTable({
      responsive: true,
      paging: true,
      lengthChange: true,
      filter: false,
      searching: true,
      autoWidth: false,
      bSort: false,
      sorting: [[1, 'desc']],
      info: false,
      language: { search: 'Filter:' },
      processing: false,
      deferRender: true,
      columnDefs: [
        {
          class: 'truncate',
          targets: [8, 9],
        },
        {
          visible: false,
          targets: [0],
        },
        {
          dataSort: 0,
          targets: [1],
        },
      ],
      fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td:eq(7)', nRow).attr('title', aData[8]);
        $('td:eq(8)', nRow).attr('title', aData[9]);
      },
    });

    $('#listMOTs_filter')
      .find('input')
      .addClass('form-control');

    // var formCompare = $('#compareTests'),
    //     btnExpand = $('.btn-expand'),
    //     motTestNumber = $('#motTestNumber'),
    //     motTestNumberToCompare = $('#motTestNumberToCompare');

    // btnExpand.click(function () {
    //   $(this).find('.chevron_toggleable').toggleClass('fa-chevron-up fa-chevron-down');
    // });

    // if (MotTestSeachByVehicle.isEnableExpandBtn) {
    //   btnExpand.click();
    // }

    // // Click Test Number to add primary and secondary Tests to Comp1 & Comp2 fields...
    // $('#listMOTs_wrapper').on('click', '.compare', function () {
    //     var vin = $(this).data('vin');
    //     if (btnExpand.find('.chevron_toggleable').hasClass('fa-chevron-down')) {
    //         btnExpand.click();
    //     }

    //     if (motTestNumber.val().trim() == "") {
    //         if (motTestNumberToCompare.val().trim() == ""
    //             || motTestNumberToCompare.val().trim() != $(this).data('testNumber')) {
    //             motTestNumber.val($(this).data('testNumber'));
    //             motTestNumber.data('vin', vin);
    //         }
    //     } else {
    //         if (motTestNumber.val().trim() != $(this).data('testNumber')) {
    //             motTestNumberToCompare.val($(this).data('testNumber'));
    //             motTestNumberToCompare.data('vin', vin);
    //         }
    //     }

    //     return false;
    // });

    // // Clicking Swap symbol swaps primary and secondary Comp1 & Comp2 fields...
    // $('#swap').on('click', function () {
    //     var tempStore = motTestNumber.val();
    //     motTestNumber.val(motTestNumberToCompare.val());
    //     motTestNumberToCompare.val(tempStore);
    // });

    // function motTestCantMatch(val, elem) {
    //     return motTestNumber.val() != motTestNumberToCompare.val();
    // }

    // jQuery.validator.addMethod('motTestCantMatch', motTestCantMatch);

    // var errorContainer = '#validationBox',
    //     errorLabelContainer = '#validationBox ol';

    // if ($('#validation-summary-id').length) {
    //     errorContainer = '#validation-summary-id';
    //     errorLabelContainer = '#validation-summary-id ol';
    // }

    // formCompare.validate({
    //     errorClass: 'inputError',
    //     messages: {
    //         'motTestNumber': {
    //             required: 'A VE\'s Test Number is required',
    //             motTestCantMatch: 'The Mot test number must be different'
    //         },
    //         'motTestNumberToCompare': 'a Tester\'s Test Number is required'
    //     },
    //     rules: {
    //         'motTestNumber': {required: true, motTestCantMatch: true},
    //         'motTestNumberToCompare': {required: true}
    //     },
    //     errorContainer: errorContainer,
    //     errorLabelContainer: errorLabelContainer,
    //     wrapper: 'li'
    // });
  };
}
