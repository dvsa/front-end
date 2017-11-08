import stickySidebar from 'sticky-sidebar';
import {
  addEventListenerToEl,
  toggleClass
} from './../../shared/misc';

export class LibraryPageNavigation {
  constructor() {

    // Create values for later use
    this.sidebar = false;
    this.maxWidth = 800;

    // Get elements
    this.navigation = document.getElementById('styleguide-navigation');
    this.navigationInner = this.navigation.querySelector('.styleguide-navigation__inner');
    this.content = document.getElementById('styleguide-content');
    this.mobileNavigation = document.querySelector('.styleguide-navigation__mobile-nav');

    if( !this.navigation || !this.content ) return;

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
    addEventListenerToEl(window, 'resize', this.reizeHandler.bind(this));
    // Mobile navigation
    addEventListenerToEl(this.mobileNavigation, 'click', this.mobileNavigationClickHandler.bind(this));
    // Create sticky sidebar
    this.initSidebar();
  }

  /**
   * Resize handler
   * - Reset and reinitalize the current sticky sidebar
   */
  reizeHandler() {
    if( this.sidebar ) {
      this.sidebar.destroy();
    }
    this.initSidebar();
  }

  /**
   * Initialize sticky sidebar
   * - Set minimum height of the content to be the height of the sidebar
   * - Create new instance of sticky sidebar
   */
  initSidebar() {
    if( window.innerWidth <= this.maxWidth ) return;
    // Fix jumping
    this.content.style.minHeight = this.navigation.offsetHeight + 'px';
    // Initialize sticky sidebar
    this.sidebar = new stickySidebar(this.navigation, {
      topSpacing: 15,
      resizeSensor: false,
      containerSelector: '#library-container',
      innerWrapperSelector: '.styleguide-navigation__inner'
    });
  }

  /**
   * Mobile navigation toggle
   * - Toggles the open class
   */
  mobileNavigationClickHandler() {
    toggleClass(this.navigationInner, 'styleguide-navigation__inner--open');
  }
  
}