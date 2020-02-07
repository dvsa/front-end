import cm from '@dvsa/cookie-manager';
export class CookieManager {
  constructor() {
    cm.init(cookieManagerConfig);
  }
}
