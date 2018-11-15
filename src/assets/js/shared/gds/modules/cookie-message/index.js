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
    /*  
      Cookie expiry must be an Integer.
      Check if user either has no cookie, or has an invalid one (String)...
      */
     const cookieExpiryDate = store.getExpiration(this.cookieMessageStoreKey);
     const hasInvalidCookie = !Number.isInteger(cookieExpiryDate);
     
     if (!this.storeValueForCookieMessage || hasInvalidCookie ) {
       /* Show message and set cookie */
     this.cookieMessageElement.style.display = 'block';
     store.set(this.cookieMessageStoreKey, 'yes', this.expireDate.getTime());
    }
  }
}
