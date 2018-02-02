import { 
  addEventListenerToEl,
  removeAllEventsFromEl,
  toggleClass,
  delegateEvent
} from './../../../shared';

export class LibraryPageNavigation {
  constructor() {
    // Create values for later use
    this.sidebar = false;
    this.maxWidth = 800;

    // Create variables for later use
    this.navigationId = 'styleguide-navigation';
    this.navigationInnerClassName = 'styleguide-navigation__inner';
    this.navigationInnerOpenClassName = 'styleguide-navigation__inner--open';
    this.contentId = 'styleguide-content';
    this.mobileNavigationClassName = 'styleguide-navigation__mobile-nav';
    this.mobileNavigationContainerClassName = 'styleguide-navigation';
    this.libraryContainerId = 'library-container';

    // Get elements
    this.libraryContainerElement = document.getElementById(this.libraryContainerId);
    this.navigation = document.getElementById(this.navigationId);

    // Check if elements exist
    if (!this.navigation || !this.libraryContainerElement) return;

    // Get elements
    this.mobileNavigationContainer = document.querySelector('.' + this.mobileNavigationClassName);
    this.navigationInner = this.navigation.querySelector('.' + this.navigationInnerClassName);
    this.content = document.getElementById(this.contentId);

    // Check if elements exist
    if (!this.mobileNavigationContainer) {
      return console.warn('Mobile navigation container not found');
    }

    if (!this.navigationInner) {
      return console.warn('Navigation inner not found');
    }

    if (!this.content) {
      return console.warn('Library content not found');
    }

    // Mobile navigation
    delegateEvent(document, 'click', '.' + this.mobileNavigationClassName, this.mobileNavigationClickHandler);
  }

  /**
   * Mobile navigation toggle
   * - Toggles the open class
   */
  mobileNavigationClickHandler = () => {
    console.log('test');
    toggleClass(this.navigationInner, this.navigationInnerOpenClassName);
  };
}
