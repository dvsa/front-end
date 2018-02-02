import { 
  toggleClass,
  delegateEvent
} from './../../../../shared';

export class HeaderMenu {
  constructor() {
    // Variables for later use
    this.headerToggleClass = 'js-header-toggle';
    this.headerButtonHiddenClass = 'js-hidden';
    this.contentVisibleClass = 'js-visible';

    this.setup();
  }

  setup() {
    // Delegate event click of header toggle
    // $.delegate(window, 'click', '.' + this.headerToggleClass, e => {
    //   e.preventDefault();
    //   let itemsContainerId = $(event.target).getAttribute('href');
    //   let itemsContainer = $(itemsContainerId);
    //   toggleClass(event.target, this.headerButtonHiddenClass);
    //   toggleClass(itemsContainer, this.contentVisibleClass);
    // });
    delegateEvent(document, 'click', '.' + this.headerToggleClass, e => {
      e.preventDefault();
      let itemsContainerId = event.target.getAttribute('href');
      let itemsContainer = document.querySelector(itemsContainerId);
      toggleClass(event.target, this.headerButtonHiddenClass);
      toggleClass(itemsContainer, this.contentVisibleClass);
    });
  }
}
