import './npm-polyfills';
import './details-polyfill';
import './request-animation-frame';
import './custom-event';

if (window.GOVUK && window.GOVUK.details) {
  window.GOVUK.details.init();
}
