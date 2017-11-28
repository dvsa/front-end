import './details-polyfill';
import 'core-js/fn/array/from';
import 'core-js/fn/array/for-each';
import 'core-js//es6/promise';
import 'core-js//fn/promise';
import 'element-closest';
import 'blissfuljs';

if (GOVUK && GOVUK.details) {
  GOVUK.details.init();
}
