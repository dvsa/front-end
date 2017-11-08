/**
 * addEventListenerToEl
 * 
 * Adds an event listener to an element.
 * 
 * Supported: IE8+
 * 
 * @param {DOMElement} el Element to add the event to.
 * @param {string} eventName Name of the event.
 * @param {function} handler Callback function to handle event.
 */
export function addEventListenerToEl(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
    return;
  }
  el.attachEvent('on' + eventName, function(){
    handler.call(el);
  });
}