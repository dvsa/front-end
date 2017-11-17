import { addEventListenerToEl, removeAllEventsFromEl, toggleClass } from './../../../shared/misc';

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
    this.mobileNavigationContainerClassName = 'styleguide-navigation__mobile';
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

    this.setup();
  }

  /**
   * Setup functions
   * - Create sticky sidebar
   * - Add resize event listener
   * - Setup events for mobile menu
   */
  setup() {
    // Add resize event listener
    $.events(window, {
      resize: this.reizeHandler,
    });
    // Mobile navigation
    $.delegate(document, 'click', '.' + this.mobileNavigationContainerClassName, this.mobileNavigationClickHandler);
    // Create sticky sidebar
    this.initSidebar();
  }

  /**
   * Resize handler
   * - Reset and reinitalize the current sticky sidebar
   */
  reizeHandler = () => {
    this.initSidebar();
  };

  /**
   * Initialize sticky sidebar
   * - Set minimum height of the content to be the height of the sidebar
   * - Create new instance of sticky sidebar
   * @todo: Create sticky sidebar
   */
  initSidebar() {
    // Check the window width so it shouldn't run the sticky sidebar
    // when less than a certain width
    if (window.innerWidth <= this.maxWidth) return;
  }

  /**
   * Mobile navigation toggle
   * - Toggles the open class
   */
  mobileNavigationClickHandler = () => {
    toggleClass(this.navigationInner, this.navigationInnerOpenClassName);
  };
}
