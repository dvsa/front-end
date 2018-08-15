import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';

export class MotTestSearchDateRangeResults {
  constructor() {
    this.elements = {
      listMOTs: $('#listMOTs'),
    };

    this.state = {
      data: window.__MOT_TEST_SEARCH_BY_DATE_RANGE,
      table: false,
      tableOptions: false,
    };

    if (!this.state.data || !this.elements.listMOTs.length) return;

    this.initDatatable();
  }

  /**
   * Creates the datatable instance for
   * MOT test search by date range results page
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.0
   */
  initDatatable = () => {
    this.state.tableOptions = {
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
      // processing: true,
      // bServerSide: true,
      // sAjaxSource: this.state.data.ajaxUrl,
      sAjaxDataProp: 'data',
      sServerMethod: 'POST',
      ajax: this.state.data.ajaxUrl,
      dom: "<'row'<'col-lg-12'f><'col-lg-12'l>r>t<'row'<'col-lg-12'i><'col-lg-12'p>>",
      columns: [
        { data: 'test_date' },
        { data: 'display_date' },
        { data: 'status' },
        { data: 'vin' },
        { data: 'registration' },
        { data: 'link' },
        { data: 'make' },
        { data: 'model' },
        { data: 'display_test_type' },
        { data: 'site_number' },
        { data: 'username' },
      ],
      columnDefs: [
        {
          sortable: false,
          targets: [5],
          render: function(data, type, row) {
            return '<a ' + data.id + '" href="' + data.url + '">' + data.text + '</a>';
          },
        },
        { class: 'truncate', targets: [7, 8] },
        {
          visible: false,
          targets: [0],
        },
        {
          dataSort: 0,
          targets: [1],
        },
      ],
      fnCreatedRow: (nRow, aData) => {
        $('td:eq(6)', nRow).attr('title', aData['model']);
        $('td:eq(7)', nRow).attr('title', aData['display_test_type']);
        $('td:eq(4) a', nRow).attr('href', $('td:eq(4) a', nRow).attr('href') + this.state.data.paramUrlSummaryPage);
      },
      fnDrawCallback: function() {},
      fnServerParams: data => {
        data.push({
          name: this.state.data.CSRF.paramName,
          value: this.state.data.CSRF.token,
        });
      },
    };

    if (this.state.data.searchType == 'tester') {
      this.state.tableOptions.columnDefs.push({
        visible: false,
        targets: [10],
      });
    }

    this.elements.listMOTs.dataTable(this.state.tableOptions);
    this.elements.listMOTs.find('thead').attr('style', 'background-color:#DEE0E2;');
    $('#listMOTs_filter')
      .find('input')
      .addClass('form-control');
  };
}
