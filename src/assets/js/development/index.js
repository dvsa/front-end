import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'blissfuljs';

import { domReady } from './../shared/misc';
import { initModules } from './modules';

domReady(function() {
  new initModules();
});
