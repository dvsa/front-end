import { CheckAll } from './check-all';
import { CHECK_ALL_CONFIG } from './config';

export const initCheckAll = () => {
  let components = document.querySelectorAll(`.${CHECK_ALL_CONFIG.classes.groupContainer}`); 
  if (!components) return;

  // Make array of components.
  const componentEls = [...components]; 

  // New Object for each component on the page with its own state
  componentEls.forEach(component =>  new CheckAll(component) );
};
