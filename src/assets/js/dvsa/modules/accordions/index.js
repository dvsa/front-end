import { Accordion } from './accordion';

export const initAccordions = () => {
  let accordions = document.querySelectorAll('.js-accordion');
  if (accordions.length) {
    for (let i = 0; i < accordions.length; i++) {
      new Accordion(accordions[i]);
    }
  }
};
