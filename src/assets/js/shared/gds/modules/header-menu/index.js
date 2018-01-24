import { toggleClass, delegateEvent } from './../../../../shared';

export class HeaderMenu {
  constructor() {
    // Class names
    this.classnames = {
      headerToggle: 'js-header-toggle',
      hidden: 'js-hidden',
      visible: 'js-visible',
    };
    // Initialize
    this.init();
  }

  /**
   * GDS Header navigation
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init() {
    // Delegate event click of header toggle
    delegateEvent(document, 'click', `.${this.classnames.headerToggle}`, event => {
      // Prevent default behaviour
      event.preventDefault();

      // Check if target element exists
      if (!event.target) return;

      // Get the target element based on href
      let target = document.getElementById(event.target.getAttribute('href').substr(1));

      toggleClass(target, this.classnames.visible);
      toggleClass(event.target, this.classnames.hidden);
    });
  }
}
