import StickySidebar from 'sticky-sidebar';
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
    this.libraryContainerId = 'library-container';

    // Get elements
    this.navigation = document.getElementById(this.navigationId);
    if (!this.navigation) return;

    this.navigationInner = this.navigation.querySelector('.' + this.navigationInnerClassName);
    this.content = document.getElementById(this.contentId);
    this.mobileNavigation = document.querySelector('.' + this.mobileNavigationClassName);

    if (!this.navigation || !this.content) return;

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
    $.delegate(document, 'click', '.' + this.mobileNavigationClassName, this.mobileNavigationClickHandler);
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
   */
  initSidebar() {
    // If sticky sidebar has been initialized
    // call the destroy function to reset it
    // Initialize sticky sidebar
    if (this.sidebar) {
      this.sidebar.destroy();
    }
    // Check the window width so it shouldn't run the sticky sidebar
    // when less than a certain width
    if (window.innerWidth <= this.maxWidth) return;
    // Fix jumping
    this.content.style.minHeight = this.navigation.offsetHeight + 'px';
    // Initialize the sticky sidebar
    this.sidebar = new StickySidebar(this.navigation, {
      topSpacing: 15,
      bottomSpacing: 15,
      resizeSensor: false,
      containerSelector: '#' + this.libraryContainerId,
      innerWrapperSelector: '.' + this.navigationInnerClassName,
    });
  }

  /**
   * Mobile navigation toggle
   * - Toggles the open class
   */
  mobileNavigationClickHandler = () => {
    toggleClass(this.navigationInner, this.navigationInnerOpenClassName);
  };
}
