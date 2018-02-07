import md5 from 'md5';

import { delegateEvent } from './../../../shared';

export class DoubleClickPrevention {
  constructor() {
    this.classnames = {
      preventDoubleClickForm: 'prevent-double-click-form',
    };

    this.attributes = {
      submitButtonId: 'submit-button-id',
      disabled: 'disabled'
    };

    this.selectors = {
      preventDoubleClickForm: `.${this.classnames.preventDoubleClickForm}`
    };

    this.state = {
      validatedForms: []
    };
  }

  /**
   * Initializer which will call all functions to setup
   *
   * - Attaches required events
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    this.addEvents();
  }

  /**
   * Attaches the form submit handler to the event
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  addEvents = () => {
    delegateEvent(document, 'submit', this.selectors.preventDoubleClickForm, this.submitFormHandler);
  }

  /**
   * Form submit event handler
   * 
   * - Creates a hash based on the event object
   * 
   * - If the hash is not in the current state:
   *   -> Adds the hash to the state
   *   -> Finds the submit button and sets the disabled attribute
   * 
   * - If the hash already exists, it would not submit the form
   * 
   *
   * @param {Event} event Event object
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  submitFormHandler = (event) => {
    const eventHash = md5(JSON.stringify(event));
    if(this.state.validatedForms.indexOf(eventHash) === -1) {
      const submitButtonId = event.target.getAttribute(this.attributes.submitButtonId);
      const submitButton = document.querySelector(`#${submitButtonId}`);
      if(submitButton) {
        submitButton.setAttribute(this.attributes.disabled, this.attributes.disabled);
      }
    } else {
      event.preventDefault();
    }
  }
}