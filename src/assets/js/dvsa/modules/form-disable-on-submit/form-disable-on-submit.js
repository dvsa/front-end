import { delegateEvent } from './../../../shared';

export class FormDisableOnSubmit {
  constructor() {
    this.selectors = {
      form: 'form',
      submitButton: `input[type="submit"]`
    };

    this.attributes = {
      disabled: 'disabled'
    }

    this.init();
  }

  /**
   * Initializer
   * - Add events
   * 
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.21
   */
  init = () => {
    delegateEvent(document, 'submit', this.selectors.form, this.onFormSubmit);
  }

  /**
   * Handles form submit
   * - Find submit button
   * - Add disabled attribute
   * 
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.21
   */
  onFormSubmit = (event) => {
    if(!event || !event.target) return;
    const submitButton = event.target.querySelector(this.selectors.submitButton);
    if(!submitButton) return;
    submitButton.setAttribute(this.attributes.disabled, this.attributes.disabled);
  }
}