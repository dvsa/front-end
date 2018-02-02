import './npm-polyfills';
import './details-polyfill';
import './request-animation-frame';

if (window.GOVUK && window.GOVUK.details) {
  window.GOVUK.details.init();
}
