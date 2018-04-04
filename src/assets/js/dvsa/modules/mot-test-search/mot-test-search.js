import { addEventListenerToEl } from './../../../shared';

export class MOTTestSearch {
  constructor() {
    this.elements = {
      form: document.querySelector('#vts-search-form'),
      type: document.querySelector('#type'),
      dateRangeFields: document.querySelector('#dateRangeFields'),
      dates: {
        month1: document.querySelector('#month1'),
        year1: document.querySelector('#year1'),
        month2: document.querySelector('#month2'),
        year2: document.querySelector('#year2')
      },
      searchFieldRow: document.querySelector('#search-field-row'),
      searchValueLabel: document.querySelector('#search-value-label'),
      vtsSearch: document.querySelector('#vts-search')
    };
    
    this.attributes = {
      baseUrl: 'data-base-url',
      action: 'action',
      placeholder: 'placeholder'
    };

    this.state = {
      baseUrl: '',
      typeOptions: {
        vts: 'vts',
        vtsDate: 'vtsDate',
        tester: 'tester',
        vrm: 'vrm',
        vin: 'vin',
        testNumber: 'testNumber'
      }
    };

    this.messages = {
      placeholders: {
        vts: 'eg. V12345',
        vtsDate: 'eg. V12345',
        tester: 'enter username',
        vrm: 'eg. VK02 MOT',
        vin: 'eg. WV1ZZZ8ZH6H091596',
        testNumber: 'eg. 999999999014'
      },
      inputLabels: {
        vts: 'Site name',
        vtsDate: 'Site name',
        tester: 'Tester name',
        vrm: 'Vehicle registration',
        vin: 'Vehicle VIN',
        testNumber: 'MOT test number'
      }
    };

    if(!this.elements.form) return;

    this.state.baseUrl = this.elements.form.getAttribute(this.attributes.baseUrl);

    this.init();
  }

  /**
   * Initializer
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.36
   */
  init = () => {
    addEventListenerToEl(this.elements.type, 'change', this.updateFormBasedOnTypeValue);
    this.updateFormBasedOnTypeValue();
  }

  /**
   * Updates the form fields based on the type select value
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.36
   */
  updateFormBasedOnTypeValue = () => {
    // Set correct placeholder for input field
    this.elements.vtsSearch.setAttribute(this.attributes.placeholder, this.messages.placeholders[this.elements.type.value]);

    // Set correct search input box label
    this.elements.searchValueLabel.innerText = this.messages.inputLabels[this.elements.type.value];
    
    // Set correct form action
    this.elements.form.setAttribute(this.attributes.action, `${this.state.baseUrl}/${this.elements.type.value}`);

    // Setup all types which require date field
    const dateFieldTypes = [
      this.state.typeOptions.vtsDate,
      this.state.typeOptions.tester
    ];

    // Show/hide date range
    if(dateFieldTypes.indexOf(this.elements.type.value) !== -1) {
      this.elements.dateRangeFields.style.display = 'block';
    } else {
      this.elements.dateRangeFields.style.display = 'none';
    }
  };
}