/**
 * domReady
 * 
 * Runs a callback function when the DOM is ready.
 * Works in IE8+
 * 
 * @param {function} fn Callback for when the DOM is fully loaded.  
 */

export default function domReady(fn) {
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