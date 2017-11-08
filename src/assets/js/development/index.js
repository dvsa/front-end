import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

import { LibraryPageNavigation } from './components/library-page-navigation';
import { domReady } from './../shared/misc';

domReady(function() {

  new LibraryPageNavigation();

});