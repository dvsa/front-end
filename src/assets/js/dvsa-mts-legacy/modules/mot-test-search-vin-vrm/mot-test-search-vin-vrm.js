import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';

import { triggerClickEventOnElement, toggleClass, delegateEvent, elHasClass } from './../../../shared';

export class MotTestSearchVinVrm {
  constructor() {
    this.classnames = {
      formGroupError: 'form-group-error',
      label: 'dvsa-mot-tests-compare__label',
      compare: 'compare',
      jsHidden: 'js-hidden',
      hideSmall: 'hide-small',
    };

    this.elements = {
      base: document.querySelector('.dvsa-mot-tests-compare'),
      listMOTs: document.querySelector('#listMOTs'),
      motTestNumber: document.querySelector('#motTestNumber'),
      motTestNumberToCompare: document.querySelector('#motTestNumberToCompare'),
      compareTestsButton: document.querySelector('.dvsa-mot-tests-compare__compare-button'),
      validationSummary: document.querySelector('.validation-summary'),
      summaryErrorList: document.querySelector('.error-summary-list'),
      veTestFormGroup: document.querySelector('.dvsa-mot-tests-compare__ve-test-form-group'),
      testerTestFormGroup: document.querySelector('.dvsa-mot-tests-compare__tester-test-form-group'),
    };

    this.attributes = {
      vin: 'data-vin',
      testNumber: 'data-test-number',
      ids: {
        veTestNumber: 'error-message-ve-test-number',
        testerTestNumber: 'error-message-tester-test-number',
      },
    };

    this.state = {
      data: window.__MOT_TEST_SEARCH_BY_VIN_OR_VRM,
      table: false,
      testNumber: false,
      testNumberVin: false,
      testNumberToCompare: false,
      testNumberToCompareVin: false,
      compareExpanded: false,
    };

    if (!this.state.data || !this.elements.listMOTs) return;

    this.expandCompareIfRequired();
    this.initDataTable();
    delegateEvent(this.elements.listMOTs, 'click', `.${this.classnames.compare}`, this.onCompareClick);
  }

  /**
   * Click handler for test number click
   *
   * @param {event} event DOM event object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  onCompareClick = event => {
    if (!event.target) return;
    const vin = event.target.getAttribute(this.attributes.vin);
    const testNumber = event.target.getAttribute(this.attributes.testNumber);

    this.expandCompareIfRequired(true);

    if (!vin || !testNumber || !this.elements.motTestNumber || !this.elements.motTestNumberToCompare) return;

    if (this.state.testNumber) {
      if (this.state.testNumber !== testNumber) {
        this.state.testNumberToCompare = testNumber;
      }
    } else {
      if (this.state.testNumberToCompare !== testNumber) {
        this.state.testNumber = testNumber;
      }
    }

    this.elements.motTestNumber.value = this.state.testNumber || '';
    this.elements.motTestNumber.setAttribute(this.attributes.vin, this.state.testNumberVin || '');

    this.elements.motTestNumberToCompare.value = this.state.testNumberToCompare || '';
    this.elements.motTestNumberToCompare.setAttribute(this.attributes.vin, this.state.testNumberToCompareVin || '');
  };

  /**
   * Expand compare panel if required
   *
   * @param {Boolean} force Wether to force expand or not
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  expandCompareIfRequired = (force = false) => {
    if (!elHasClass(this.elements.base, this.classnames.jsHidden) && !elHasClass(this.elements.base, this.classnames.hideSmall)) {
      return;
    }

    if (this.state.data.compareExpanded || force) {
      triggerClickEventOnElement(this.elements.compareTestsButton);
    }
  };

  /**
   * Creates the datatable instance
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.3
   */
  initDataTable = () => {
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
      serverSide: false,
      deferRender: true,
      dom: "<'row'<'col-lg-12'f><'col-lg-12'l>r>t<'row'<'col-lg-12'i><'col-lg-12'p>>",
      columnDefs: [
        {
          class: 'truncate',
          targets: [7, 8, 9],
        },
        {
          visible: false,
          targets: this.state.data.searchTypeTargets,
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
        $('td:eq(6)', nRow).attr('title', aData[7]);
        $('td:eq(7)', nRow).attr('title', aData[8]);
        $('td:eq(8)', nRow).attr('title', aData[9]);
      },
    });
    $('#listMOTs_filter')
      .find('input')
      .addClass('form-control');
  };
}
