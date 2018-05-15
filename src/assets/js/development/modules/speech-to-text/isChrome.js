/**
 * Determines wether the user is using Chrome
 *
 * @since 1.0.14
 * @author James Nelson <j.nelson@kainos.com>
 */
export const isChrome = () => {
  const isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = typeof window.opr !== 'undefined',
        isIEedge = winNav.userAgent.indexOf('Edge') > -1,
        isIOSChrome = winNav.userAgent.match('CriOS');

  if (isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
  ) {
    return true;
  } else if (isIOSChrome) {
    return true;
  }

  return false;
}
