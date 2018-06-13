import showdown from 'showdown';
import trim from 'lodash/trim';

export class DvsaSpecialNotices {
  constructor() {
    this.elements = {
      base: document.querySelector('.dvsa-special-notices'),
      notices: {
        contents: Array.from(document.querySelectorAll('.dvsa-special-notices__content')),
      }
    };

    if(
      !this.elements.base
    ) return;

    this.init();
  }

  /**
   * Initializer
   * 
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    this.setupMarkdownToHTMLForAllContents();
  }

  /**
   * Convert all text within the content elements from markdown to html
   * 
   * @author Tameem Safi <t.safi@kainos.com>
   */
  setupMarkdownToHTMLForAllContents = () => {
    if(!this.elements.notices.contents) return;
    this.elements.notices.contents.forEach(element => {
      const text = trim(element.textContent);
      const converter = new showdown.Converter();
      const html = converter.makeHtml(text);
      element.innerHTML = html;
    });
  }
}