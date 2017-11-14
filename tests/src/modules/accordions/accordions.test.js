import { expect } from 'chai';
import puppeteer from 'puppeteer';
import Browser from './../../../bootstrap/browser';


describe('Accordions', () => {

  beforeEach(async () => {
    // Create new browser instance
    await Browser.setupBrowser();
    // Create new page instance
    await Browser.setupPage();
    // Goto accordions page before every test
    await Browser.page.goto(`${Browser.options.baseURL}/library/components/accordions`);
  });

  afterEach(async () => {
    // Close the browser after tests
    await Browser.closeBrowser();
  });

  it('should display accordion', async () => {
    let accordion = await Browser.page.evaluate(() => {
      return document.querySelector('.js-accordion').innerHTML;
    });
    expect(accordion).to.not.equal(false);
  });

  it('should display accordion after clicking header', async () => {
    let accordionHeading = await Browser.page.$('.js-accordion > .js-accordion__wrapper > .js-accordion__section:nth-child(1) > .js-accordion__header');
    await accordionHeading.click();
    let accordionContentClass = await Browser.page.evaluate(() => {
      let firstAccordion = document.querySelector('.js-accordion > .js-accordion__wrapper > .js-accordion__section:nth-child(1)');
      return firstAccordion.getAttribute('class');
    });
    expect(accordionContentClass).to.contain('js-accordion__section--open');
  });

  it('should close after click header twice', async () => {
    let accordionHeading = await Browser.page.$('.js-accordion > .js-accordion__wrapper > .js-accordion__section:nth-child(1) > .js-accordion__header');
    await accordionHeading.click();
    await accordionHeading.click();
    let accordionContentClass = await Browser.page.evaluate(() => {
      let firstAccordion = document.querySelector('.js-accordion > .js-accordion__wrapper > .js-accordion__section:nth-child(1)');
      return firstAccordion.getAttribute('class');
    });
    expect(accordionContentClass).to.not.contain('js-accordion__section--open');
  });

  it('should open all accordions after clicking expand button', async () => {
    let accordion = await Browser.page.$('.js-accordion');
    let expandButton = await accordion.$('.js-accordion__expand-button');
    await expandButton.click();
    let openSections = await accordion.$$('.js-accordion__section--open');
    expect(openSections.length).to.equal(2);
  });

  it('should close all accordions after clicking expand button twice', async () => {
    let accordion = await Browser.page.$('.js-accordion');
    let expandButton = await accordion.$('.js-accordion__expand-button');
    await expandButton.click();
    let openSections = await accordion.$$('.js-accordion__section--open');
    expect(openSections.length).to.equal(2);
    await expandButton.click();
    openSections = await accordion.$$('.js-accordion__section--open');
    expect(openSections.length).to.equal(0);
  });

});