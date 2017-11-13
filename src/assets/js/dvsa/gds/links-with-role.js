export class LinksWithRole {
  constructor() {
    this.roleButtonSelector = '[role="button"]';
    this.setup();
  }

  setup() {
    $.delegate(document, 'keydown', this.roleButtonSelector, (event) => {
      // if the keyCode (which) is 32 it's a space, let's simulate a click.
      if (event.which === 32) {
        event.preventDefault()
        // trigger the target's click event
        event.target.click()
      }
    });
  }
}