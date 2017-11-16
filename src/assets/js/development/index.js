import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'blissfuljs';

import Turbolinks from 'turbolinks';

import { domReady } from './../shared/misc';
import { initModules } from './modules';

const readyFunction = fn => {
  if (Turbolinks.supported) {
    Turbolinks.start();
    document.addEventListener('turbolinks:load', function() {
      fn();
    });
  } else {
    domReady(fn);
  }
};

readyFunction(function() {
  new initModules();
});
