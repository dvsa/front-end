/*!
 * 
 *   Name: dvsa-front-end/dvsa-manuals
 *   Version: 1.3.3
 *   Contributors: Martin D Marriott <martind@kainos.com>, James Nelson <j.nelson@kainos.com>, Tameem Safi <https://github.com/tameemsafi>
 *   Timestamp: February 1st 2019, 4:55:00 pm
 *   Source: https://github.com/dvsa/front-end
 * 
 */
webpackJsonp([2],{174:function(t,e){function n(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}t.exports=n},211:function(t,e,n){var a=n(292),i="object"==typeof self&&self&&self.Object===Object&&self,r=a||i||Function("return this")();t.exports=r},212:function(t,e,n){var a=n(211),i=a.Symbol;t.exports=i},285:function(t,e,n){"use strict";n(47),n(50),n(51),n(53),n(54),n(55),n(56),n(57),n(58),n(59),n(60),n(61),n(64),n(65),n(67),n(68),n(69),n(70),n(71),n(72),n(73),n(74),n(75),n(76),n(77),n(78),n(79),n(80),n(81),n(83),n(84),n(85),n(86),n(87),n(88),n(89),n(90),n(91),n(92),n(93),n(94),n(95),n(96),n(97),n(98),n(99),n(100),n(101),n(102),n(103),n(104),n(105),n(106),n(108),n(109),n(110),n(111),n(112),n(113),n(114),n(115),n(116),n(37),n(117),n(118),n(119),n(120),n(121),n(122),n(123),n(124),n(125),n(126),n(127),n(128),n(129),n(130),n(131),n(132),n(133),n(134),n(135),n(136),n(137),n(138),n(139),n(140),n(141),n(142),n(143),n(144),n(145),n(146),n(147),n(148),n(149),n(150),n(151);var a=n(4),i=n(286);(0,a.domReady)(function(){(0,a.initGDS)(),(0,i.initModules)()})},286:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.initModules=void 0;var a=n(287),i=n(299);e.initModules=function(){(0,a.initManualSmartSurvey)(),(0,i.initDvsaManualMeta)()}},287:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.initManualSmartSurvey=void 0;var a=n(288);e.initManualSmartSurvey=function(){new a.ManualSmartSurvey}},288:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.ManualSmartSurvey=void 0;var r=n(4),s=n(289),o=a(s),u=n(46),l=a(u);e.ManualSmartSurvey=function t(){var e=this;i(this,t),this.init=function(){e.setupAllIframes(),(0,r.addEventListenerToEl)(window,"resize",(0,o.default)(e.updateAllIframes,50)),(0,r.addEventListenerToEl)(window,"scroll",(0,o.default)(e.updateAllIframes,50)),(0,r.addEventListenerToEl)(window,"message",e.onPostMessageReceived)},this.setupAllIframes=function(){e.elements.smartSurveyElements.forEach(function(t){var n=t.getAttribute(e.attributes.heading).trim();n=n.replace(/\n/g,""),e.state.smartsurveys.push({attached:!1,smartSurveyElement:t,src:t.getAttribute(e.attributes.iframeSrc),headingHash:(0,l.default)(n)})}),e.updateAllIframes()},this.updateAllIframes=function(){e.state.smartsurveys&&e.state.smartsurveys.forEach(function(t,n){t.attached||(0,r.isElementInViewport)(t.smartSurveyElement,200)&&(t.smartSurveyElement.innerHTML=e.generateIframeCode(t.src),e.state.smartsurveys[n].attached=!0)})},this.onPostMessageReceived=function(t){if(t&&t.data){var n=JSON.parse(t.data);if(n.event_id&&n.value&&n.event_id===e.events.smartSurveyRadioClicked&&"No"===n.value){var a=(0,l.default)(n.heading),i=!1;if(e.state.smartsurveys.forEach(function(t){t.headingHash===a&&(i=t)}),!i)return;(0,r.toggleClass)(i.smartSurveyElement,e.classnames.manualSmartSurvey.iframeFeedbackOpen,!0)}}},this.generateIframeCode=function(t){return'\n      <iframe\n        src="'+t+'"\n        frameborder="0"\n        class="'+e.classnames.manualSmartSurvey.iframe+'"\n      ></iframe>\n    '},this.classnames={manualSmartSurvey:{base:"manual-smart-survey",iframe:"manual-smart-survey__iframe",iframeFeedbackOpen:"manual-smart-survey--feedback-open"}},this.attributes={heading:"data-heading",iframeSrc:"data-iframe-src",iframeAttached:"data-iframe-attached"},this.elements={smartSurveyElements:Array.from(document.querySelectorAll("."+this.classnames.manualSmartSurvey.base))},this.events={smartSurveyRadioClicked:"smartsurvey_radio_clicked"},this.state={smartsurveys:[]},this.elements.smartSurveyElements&&0!=this.elements.smartSurveyElements.length&&this.init()}},289:function(t,e,n){function a(t,e,n){var a=!0,o=!0;if("function"!=typeof t)throw new TypeError(s);return r(n)&&(a="leading"in n?!!n.leading:a,o="trailing"in n?!!n.trailing:o),i(t,e,{leading:a,maxWait:e,trailing:o})}var i=n(290),r=n(174),s="Expected a function";t.exports=a},290:function(t,e,n){function a(t,e,n){function a(e){var n=S,a=b;return S=b=void 0,w=e,E=t.apply(a,n)}function c(t){return w=t,M=setTimeout(m,e),O?a(t):E}function f(t){var n=t-k,a=t-w,i=e-n;return x?l(i,g-a):i}function d(t){var n=t-k,a=t-w;return void 0===k||n>=e||n<0||x&&a>=g}function m(){var t=r();if(d(t))return v(t);M=setTimeout(m,f(t))}function v(t){return M=void 0,T&&S?a(t):(S=b=void 0,E)}function h(){void 0!==M&&clearTimeout(M),w=0,S=k=b=M=void 0}function p(){return void 0===M?E:v(r())}function y(){var t=r(),n=d(t);if(S=arguments,b=this,k=t,n){if(void 0===M)return c(k);if(x)return M=setTimeout(m,e),a(k)}return void 0===M&&(M=setTimeout(m,e)),E}var S,b,g,E,M,k,w=0,O=!1,x=!1,T=!0;if("function"!=typeof t)throw new TypeError(o);return e=s(e)||0,i(n)&&(O=!!n.leading,x="maxWait"in n,g=x?u(s(n.maxWait)||0,e):g,T="trailing"in n?!!n.trailing:T),y.cancel=h,y.flush=p,y}var i=n(174),r=n(291),s=n(293),o="Expected a function",u=Math.max,l=Math.min;t.exports=a},291:function(t,e,n){var a=n(211),i=function(){return a.Date.now()};t.exports=i},292:function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(e,n(152))},293:function(t,e,n){function a(t){if("number"==typeof t)return t;if(r(t))return s;if(i(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=i(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(o,"");var n=l.test(t);return n||c.test(t)?f(t.slice(2),n?2:8):u.test(t)?s:+t}var i=n(174),r=n(294),s=NaN,o=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,c=/^0o[0-7]+$/i,f=parseInt;t.exports=a},294:function(t,e,n){function a(t){return"symbol"==typeof t||r(t)&&i(t)==s}var i=n(295),r=n(298),s="[object Symbol]";t.exports=a},295:function(t,e,n){function a(t){return null==t?void 0===t?u:o:l&&l in Object(t)?r(t):s(t)}var i=n(212),r=n(296),s=n(297),o="[object Null]",u="[object Undefined]",l=i?i.toStringTag:void 0;t.exports=a},296:function(t,e,n){function a(t){var e=s.call(t,u),n=t[u];try{t[u]=void 0;var a=!0}catch(t){}var i=o.call(t);return a&&(e?t[u]=n:delete t[u]),i}var i=n(212),r=Object.prototype,s=r.hasOwnProperty,o=r.toString,u=i?i.toStringTag:void 0;t.exports=a},297:function(t,e){function n(t){return i.call(t)}var a=Object.prototype,i=a.toString;t.exports=n},298:function(t,e){function n(t){return null!=t&&"object"==typeof t}t.exports=n},299:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.initDvsaManualMeta=void 0;var a=n(300);e.initDvsaManualMeta=function(){new a.DvsaManualMeta}},300:function(t,e,n){"use strict";function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.DvsaManualMeta=void 0;var i=n(4);e.DvsaManualMeta=function t(){var e=this;a(this,t),this.init=function(){e.setupStateFromDOM(),e.updateDOMBasedOnState(),(0,i.delegateEvent)(document,"click","."+e.classnames.linkShowHide,e.onShowHideLinkClick),(0,i.delegateEvent)(document,"click","."+e.classnames.linkTop,e.onTopLinkClick)},this.setupStateFromDOM=function(){e.elements.showHideLinks.forEach(function(t){var n=t.getAttribute(e.attributes.target);if(n){var a=t.getAttribute(e.attributes.openText),i=t.getAttribute(e.attributes.hiddenText);t.setAttribute(e.attributes.aria.controls,n),e.state.historySections.push({targetId:n,showHideLinkElement:t,historyElement:document.querySelector("#"+n),open:!1,openText:a,hiddenText:i})}})},this.onShowHideLinkClick=function(t){t.preventDefault();var n=t.target.getAttribute(e.attributes.target);n&&e.updateOpenStateOfHistorySection(n,!1,function(t){e.updateDOMBasedOnState()})},this.onTopLinkClick=function(t){t.preventDefault();var n=t.target.getAttribute(e.attributes.target);n&&e.updateOpenStateOfHistorySection(n,!0,function(t){e.updateDOMBasedOnState(function(){t.historyElement.scrollIntoView(!0)})})},this.updateOpenStateOfHistorySection=function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=arguments[2];t&&e.state.historySections.forEach(function(i,r){i.targetId===t&&(e.state.historySections[r].open=!!n||!e.state.historySections[r].open,"function"==typeof a&&a(i))})},this.updateDOMBasedOnState=function(t){e.state.historySections.forEach(function(t){t.showHideLinkElement&&t.historyElement&&(t.showHideLinkElement.innerHTML=t.open?t.openText:t.hiddenText,(0,i.toggleClass)(t.historyElement,e.classnames.openHistory,t.open),t.showHideLinkElement.setAttribute(e.attributes.aria.expanded,t.open),t.open?t.historyElement.removeAttribute(e.attributes.aria.hidden):t.historyElement.setAttribute(e.attributes.aria.hidden,"true"))}),"function"==typeof t&&t()},this.classnames={openHistory:"dvsa-manual-meta__history--open",linkShowHide:"dvsa-manual-meta__link--show-hide",linkTop:"dvsa-manual-meta__link--top-link"},this.elements={links:Array.from(document.querySelectorAll(".dvsa-manual-meta__link")),showHideLinks:Array.from(document.querySelectorAll("."+this.classnames.linkShowHide)),openLinks:Array.from(document.querySelectorAll("."+this.classnames.linkTop))},this.attributes={target:"data-target",openText:"data-open-text",hiddenText:"data-hidden-text",aria:{controls:"aria-controls",expanded:"aria-expanded",hidden:"aria-hidden"}},this.state={historySections:[]},this.elements.links&&this.elements.showHideLinks&&this.elements.openLinks&&this.init()}}},[285]);