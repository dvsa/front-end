import { HeaderMenu } from './header-menu';
import { LinksWithRole } from './links-with-role';
import { ShowHideContent } from './show-hide-content';
import { SafarFontFix } from './safar-font-fix';
import { SelectionButtons } from './selection-buttons';
import { initCookieManager } from './cookie-manager';

export const initModules = () => {
  new HeaderMenu();
  new LinksWithRole();
  new ShowHideContent();
  new SafarFontFix();
  new SelectionButtons();
  initCookieManager();
};
