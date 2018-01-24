import { delegateEvent } from './../../../../shared';

export class SelectionButtons {
  constructor() {
    this.classnames = {
      blockLabel: 'block-label',
      selected: 'selected',
      focused: 'focused',
    };

    this.selectors = {
      radio: `.${this.classnames.blockLabel} input[type="radio"]`,
      checkbox: `.${this.classnames.blockLabel} input[type="checkbox"]`,
    };

    // this.elements = {
    //   radios: document.querySelectorAll(`.${this.classnames.blockLabel} input[type="radio"]`),
    //   checkboxes: document.querySelectorAll(`.${this.classnames.blockLabel} input[type="checkbox"]`)
    // };

    this.init();
  }

  init = () => {};

  addEvents = () => {
    delegateEvent(document, 'focus', `${this.selectors.radio}, ${this.selectors.checkbox}`, event => {});
  };
}
