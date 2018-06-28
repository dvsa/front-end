import { toggleClass, addEventListenerToEl, toggleAttribute } from './../../../shared';

export class DvsaEnforcementTestSummary {
  constructor() {
    this.elements = {
      base: document.querySelector('.dvsa-enforcement-test-summary'),
      form: document.querySelector('.dvsa-enforcement-test-summary__form'),
      motTestTypes: Array.from(document.querySelectorAll(`input[name="motTestType"]`)),
      complaintReference: document.querySelector('#complaint-ref-panel'),
      complaintRefInput: document.querySelector('#complaintRef'),
    };

    this.classnames = {
      jsHidden: 'js-hidden',
    };

    if (
      !this.elements.base ||
      !this.elements.form ||
      !this.elements.motTestTypes.length ||
      !this.elements.complaintReference ||
      !this.elements.complaintRefInput
    )
      return;

    this.init();
  }

  /**
   * Initializer
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    this.toggleComplaintReference();
    this.elements.motTestTypes.forEach(element => {
      addEventListenerToEl(element, 'change', this.toggleComplaintReference);
    });
  };

  toggleComplaintReference = () => {
    const showComplaintReference = this.getSelectedMotTestType() === 'ES' || this.getSelectedMotTestType() === 'EI';
    toggleClass(this.elements.complaintReference, this.classnames.jsHidden, !showComplaintReference);
    toggleAttribute(this.elements.complaintRefInput, 'required', 'required', showComplaintReference);
  };

  /**
   * Get the selected MOT test type radio value
   *
   * @return {String|False} selected mot test type radio value
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  getSelectedMotTestType = () => {
    let selectedValue = false;
    this.elements.motTestTypes.forEach(element => {
      if (element.checked) {
        selectedValue = element.value;
      }
    });
    return selectedValue;
  };
}
