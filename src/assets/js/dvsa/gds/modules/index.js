import { CookieMessage } from './cookie-message';
import { HeaderMenu } from './header-menu';
import { LinksWithRole } from './links-with-role';
import { ShowHideContent } from './show-hide-content';

export const initModules = () => {
  new CookieMessage();
  new HeaderMenu();
  new LinksWithRole();
  new ShowHideContent();
};
