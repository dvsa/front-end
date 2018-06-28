import $ from 'jquery';
import { toggleClass } from './../../../shared';

export class MotTestSearchByVehicle {
  constructor() {
    this.classnames = {
      collapse: 'collapse',
    };

    this.elements = {
      base: document.querySelector('.dvsa-table-responsive--search-vehicle'),
      showHideContainer: document.querySelector('.show-hide-container'),
      listMOTs: document.querySelector('#listMOTs'),
    };

    this.state = {
      table: false,
    };

    if (!this.elements.base || !this.elements.listMOTs) return;

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
      dom: "<'row'<'col-lg-12'f><'col-lg-12'l>r>t<'row'<'col-lg-12'i><'col-lg-12'p>>",
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
  };
}
