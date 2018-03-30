import { delegateEvent } from './../../../shared';

export class FormDisableOnSubmit {
  constructor() {
    this.selectors = {
      form: 'form',
      submitButton: `input[type="submit"]`,
    };

    this.attributes = {
      disabled: 'disabled',
      value: 'value',
      name: 'name',
      formStateIndex: 'data-form-state-index',
    };

    this.elements = {
      forms: Array.from(document.querySelectorAll(this.selectors.form)),
    };

    this.state = {
      forms: [],
    };

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
    this.setupAllFormsInState();
  };

  /**
   * Adds all current DOM forms to the state
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.34
   */
  setupAllFormsInState = () => {
    if (!this.elements.forms) return;
    this.elements.forms.forEach(formElement => {
      this.state.forms.push({
        element: formElement,
        submitted: false,
      });
      formElement.setAttribute(this.attributes.formStateIndex, this.state.forms.length - 1);
    });
  };

  /**
   * Handles form submit
   * - Find submit button
   * - Add disabled attribute
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.21
   */
  onFormSubmit = event => {
    if (!event || !event.target) return;
    const formElement = event.target;
    const formStateIndex = formElement.getAttribute(this.attributes.formStateIndex);
    const formStateObject = this.state.forms[formStateIndex] || false;
    const submitButton = formElement.querySelector(this.selectors.submitButton);
    if (!submitButton || !formStateObject) return;
    if (!formStateObject.submitted) {
      const submitInputValue = submitButton.getAttribute(this.attributes.value);
      const submitButtonName = submitButton.getAttribute(this.attributes.name);
      // Create hidden submit button
      const hiddenSubmitInputField = document.createElement('input');
      hiddenSubmitInputField.type = 'hidden';
      hiddenSubmitInputField.name = submitButtonName;
      hiddenSubmitInputField.value = submitInputValue;
      // Add hidden input field to form
      submitButton.parentNode.appendChild(hiddenSubmitInputField);
      // Reset submit button
      submitButton.name = '';
      // Make button disabled
      submitButton.setAttribute(this.attributes.disabled, this.attributes.disabled);
      // Mark form as submitted in state
      this.state.forms[formStateIndex].submitted = true;
    }
  };
}
