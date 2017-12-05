import './details-polyfill';
import './npm-polyfills';
import './request-animation-frame';
import 'blissfuljs';

if (GOVUK && GOVUK.details) {
  GOVUK.details.init();
}
