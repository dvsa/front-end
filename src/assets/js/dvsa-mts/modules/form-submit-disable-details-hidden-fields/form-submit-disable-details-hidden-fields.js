import { delegateEvent, isElementHidden } from './../../../shared';

export class FormSubmitDisableDetailsHiddenFields {
  constructor() {
    this.selectors = {
      form: 'form',
      details: 'details',
    };

    this.attributes = {
      disabled: 'disabled',
      ignoreFormDisableDetails: 'data-ignore-form-disable-details',
    };

    this.init();
  }

  /**
   * Initializer
   * - Attach DOM event
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.7
   */
  init = () => {
    delegateEvent(document, 'submit', this.selectors.form, this.onFormSubmit);
  };

  /**
   * Handles form submit to disable all hidden input fields
   *
   * @param {Event} event Event object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.7
   */
  onFormSubmit = event => {
    // Check if this form should be ignored
    if (event.target && event.target.getAttribute(this.attributes.ignoreFormDisableDetails)) {
      return;
    }

    // Get the details elements
    const detailElements = Array.from(document.querySelectorAll(this.selectors.details));

    // Check if details elements exist and is an array
    if (!detailElements || !Array.isArray(detailElements)) return;

    // Loop through each detail element
    detailElements.forEach(detailElement => {
      // Check if element exists
      if (!detailElement) return;

      // Get all hidden input fields inside the details elements
      const inputFieldElements = Array.from(detailElement.querySelectorAll('input'));

      // Check if input fields exist and is an array
      if (!inputFieldElements || !Array.isArray(inputFieldElements)) return;

      // Loop through each input field element
      inputFieldElements.forEach(inputFieldElement => {
        // Check that element exists
        if (!inputFieldElement) return;

        // Chech if element is hidden
        if (isElementHidden(inputFieldElement)) {
          // Add disabled attribtue to input
          inputFieldElement.setAttribute(this.attributes.disabled, this.attributes.disabled);
        }
      });
    });
  };
}
