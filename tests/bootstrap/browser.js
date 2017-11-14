import puppeteer from 'puppeteer';

class Browser {

  async setupBrowser() {
    this.browser = await puppeteer.launch();
  }

  async setupPage() {
    if( !this.browser ) {
      await this.setupBrowser();
    }
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    if( this.browser ) {
      await this.browser.close();
    }
  }

  setupOptions(options) {
    this.options = options || {};
  }

}

export default new Browser();