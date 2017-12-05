import { Accordion } from './accordion';
import { RecallsAccordion } from './recalls-accordion';

export const initAccordions = () => {
  // Get all accordions on the page
  let accordions = document.querySelectorAll('.js-accordion');

  // Convert accordion to array
  accordions = Array.from(accordions);

  // Check if atleast one accordion exists
  if (accordions.length) {
    // Initialize all the accordions on the page
    accordions.forEach(accordion => {
      new Accordion(accordion);
    });
  }

  // Initialize ajax for recalls accordion
  new RecallsAccordion();
};
