import { toggleClass } from './../../../../shared';

export class HeaderMenu {
  constructor() {
    // Variables for later use
    this.headerToggleClass = 'js-header-toggle';
    this.headerButtonHiddenClass = 'js-hidden';
    this.contentVisibleClass = 'js-visible';

    // DOM Elements
    this.headerToggles = $$('.' + this.headerToggleClass);

    this.setup();
  }

  setup() {
    // Delegate event click of header toggle
    $.delegate(window, 'click', '.' + this.headerToggleClass, e => {
      e.preventDefault();
      let itemsContainerId = $(event.target).getAttribute('href');
      let itemsContainer = $(itemsContainerId);
      toggleClass(event.target, this.headerButtonHiddenClass);
      toggleClass(itemsContainer, this.contentVisibleClass);
    });
  }
}
