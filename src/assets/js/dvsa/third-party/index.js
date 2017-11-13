import 'blissfuljs';
import './details-polyfill';

if( GOVUK && GOVUK.details ) {
  GOVUK.details.init();
}