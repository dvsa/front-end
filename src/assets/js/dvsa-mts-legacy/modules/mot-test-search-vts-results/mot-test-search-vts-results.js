import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';
import './../../third-party/';

export class MotTestSearchVTSResults {
  constructor() {
    this.elements = {
      listMOTs: $('#listMOTs'),
      infoPopup: $('.info-popup'),
    };

    this.state = {
      data: window.__MOT_TEST_SEARCH_BY_VTS_DATA,
      table: false,
    };

    if (!this.state.data || !this.elements.listMOTs.length) return;

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
    // Usage info here: http://datatables.net/release-datatables/examples/basic_init/filter_only.html
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
            return (
              '<a href="javascript:void(0)" class="info-popup" ' +
              'data-sorting="' +
              data.display_status +
              '" data-toggle="popover" ' +
              'data-placement="auto" role="button" data-content="' +
              data.popover +
              '">' +
              data.display_status +
              '</a>'
            );
          },
        },
        {
          targets: [3],
          render: function(data, type, row) {
            return '<a ' + data.id + '" href="' + data.url + '">' + data.text + '</a>';
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
        $('td:eq(2) a', nRow).attr('href', $('td:eq(2) a', nRow).attr('href') + this.state.dataparamUrlSummaryPage);
      },
      drawCallback: oSettings => {
        this.elements.infoPopup.popover({
          placement: 'right',
          html: true,
          trigger: 'hover',
        });
      },
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

    // The plan is to set up all popovers as clicks for touchscreens / hovers for laptops...
    var is_touch_device = 'ontouchstart' in document.documentElement;

    // If its not a touch-device - then use hovers...
    if (!is_touch_device) {
      // More info here http://getbootstrap.com/javascript/#popovers-examples
      $('[data-toggle=popover]').popover({
        placement: 'top',
        html: true,
        trigger: 'hover',
      });
      // Else - If it IS a touch-device use clicks (rather than hovers)...
    } else {
      $('[data-toggle=popover]').popover({
        placement: 'top',
        html: true,
        trigger: 'click',
      });
    }
  };
}
