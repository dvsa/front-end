import cookieManager from '@dvsa/cookie-manager';
export class CookieManager {
  constructor() {
    if (typeof cookieManagerConfig === 'object') {
      cookieManager.init(cookieManagerConfig);
    }
  }
}
