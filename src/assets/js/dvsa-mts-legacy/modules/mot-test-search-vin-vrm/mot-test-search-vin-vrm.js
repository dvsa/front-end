import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';

export class MotTestSearchVinVrm {
  constructor() {
    this.elements = {
      listMOTs: document.querySelector('#listMOTs'),
    };

    this.state = {
      data: window.__MOT_TEST_SEARCH_BY_VIN_OR_VRM,
      table: false,
    };

    if (!this.state.data || !this.elements.listMOTs) return;

    if (this.state.data.compareExpanded) {
      console.log('expanded');
    }

    this.initDataTable();
  }

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
