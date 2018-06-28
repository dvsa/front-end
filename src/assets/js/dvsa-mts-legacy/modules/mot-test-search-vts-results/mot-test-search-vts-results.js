import $ from 'jquery';
import escape from 'lodash/escape';
import 'datatables.net';
import 'datatables.net-responsive';

export class MotTestSearchVTSResults {
  constructor() {
    this.elements = {
      base: document.querySelector('.dvsa-table-responsive--search-vts'),
      listMOTs: $('#listMOTs'),
    };

    this.state = {
      data: window.__MOT_TEST_SEARCH_BY_VTS_DATA,
      table: false,
    };

    if (!this.state.data || !this.elements.base || !this.elements.listMOTs.length) return;

    this.initMotTestSearchByVTSDataTable();
  }

  /**
   * Creates the datatable instance for
   * MOT test search by VTS results page
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.0
   */
  initMotTestSearchByVTSDataTable = () => {
    // Usage info here:
    // http://datatables.net/release-datatables/examples/basic_init/filter_only.html
    this.state.table = this.elements.listMOTs.dataTable({
      responsive: true,
      // Disable pagination
      paging: true,
      // Disable ability to change the number of rows
      lengthChange: true,
      // Enable filtering
      searching: true,
      // Enable sorting
      ordering: true,
      dom: "<'row'<'col-lg-12'f><'col-lg-12'l>r>t<'row'<'col-lg-12'i><'col-lg-12'p>>",
      language: { search: 'Filter:' },
      // Sort descending by the 1st column (date/time)
      order: [[1, 'desc']],
      autoWidth: false,
      info: false,
      ajax: this.state.data.ajaxUrl,
      columns: [
        { data: 'test_date' },
        { data: 'display_date' },
        { data: 'popover' },
        { data: 'link' },
        { data: 'registration' },
        { data: 'make' },
        { data: 'model' },
        { data: 'display_test_type' },
        { data: 'username' },
      ],
      columnDefs: [
        {
          targets: [2],
          render: function(data, type, row) {
            return data.display_status;
          },
        },
        {
          targets: [3],
          render: function(data, type, row) {
            return `<a ${data.id} href="${escape(data.url)}">${data.text}</a>`;
          },
        },
        {
          className: 'truncate',
          targets: [6, 7],
        },
        {
          visible: false,
          targets: [0],
        },
        {
          orderData: [0],
          targets: [1],
        },
      ],
      rowCallback: (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
        $('td:eq(5)', nRow).attr('title', aData['model']);
        $('td:eq(6)', nRow).attr('title', aData['display_test_type']);
        $('td:eq(2) a', nRow).attr('href', $('td:eq(2) a', nRow).attr('href') + this.state.data.paramUrlSummaryPage);
      },
      drawCallback: oSettings => {},
      fnServerParams: data => {
        data.push({
          name: this.state.data.CSRF.paramName,
          value: this.state.data.CSRF.token,
        });
      },
    });

    $('#listMOTs_filter')
      .find('input')
      .addClass('form-control');

    setInterval(() => {
      this.state.table.api().ajax.reload();
    }, 60000);
  };
}
