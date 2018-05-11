import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

import { domReady } from './../shared/misc';
import { initModules } from './modules';

// Development styles
import './../../scss/development.scss';

domReady(function() {
  initModules();
});
