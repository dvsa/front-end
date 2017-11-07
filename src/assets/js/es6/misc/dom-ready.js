/**
 * domReady
 * 
 * Runs a callback function when the DOM is ready.
 * 
 * Supported: IE8+
 * 
 * @param {function} fn Callback for when the DOM is fully loaded.  
 */

export function domReady(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
};