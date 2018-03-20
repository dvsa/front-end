import store from './../../../store';

export class CookieMessage {
  constructor() {
    // Variables for later use
    this.cookieMessageStoreKey = 'mot-cookie-message-seen';
    this.cookieMessageDOMId = 'global-cookie-message';
    this.storeValueForCookieMessage = store.get(this.cookieMessageStoreKey);

    // Get the DOM element
    this.cookieMessageElement = document.getElementById(this.cookieMessageDOMId);

    // Get date in 28 days time
    // used for setting expiry
    this.expireDate = new Date();
    this.expireDate.setDate(this.expireDate.getDate() + 28);

    this.setup();
  }

  setup() {
    if (!this.storeValueForCookieMessage) {
      this.cookieMessageElement.style.display = 'block';
      // Add to store so it doesn't show message again
      store.set(this.cookieMessageStoreKey, 'yes', this.expireDate);
    }
  }
}
