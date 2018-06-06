import toString from 'lodash/toString';
import { toggleDisabledAttribute } from './toggle-attribute';

/**
 * Select an option based on value
 * 
 * @param {HTMLElement} selectElement 
 * @param {String} value 
 */
export const selectOptionByValue = (selectElement, value) => {
  if(!selectElement) return;
  const options = Array.from(selectElement.querySelectorAll('option'));
  if(!options || !options.length) return;
  options.forEach(optionElement => {
    optionElement.selected = toString(optionElement.value) === toString(value);
  });
}

/**
 * Disabled select option based on its value
 * 
 * @param {HTMLElement} selectElement 
 * @param {String} value 
 */
export const disabledSelectOptionByValue = (selectElement, optionValue) => {
  toggleDisabledSelectOptionByValue(selectElement, optionValue, true);
}

/**
 * Toggle select option based on its value
 * 
 * @param {HTMLElement} selectElement 
 * @param {String} value 
 */
export const toggleDisabledSelectOptionByValue = (selectElement, optionValue, force = false) => {
  if(!selectElement) return;
  const options = Array.from(selectElement.querySelectorAll('option'));
  if(!options || !options.length) return;
  options.forEach(optionElement => {
    if(toString(optionElement.value) === toString(optionValue)) {
      if (typeof force === 'boolean') {
        toggleDisabledAttribute(optionElement, force);
      } else {
        toggleDisabledAttribute(optionElement);
      }
    }
  });
}