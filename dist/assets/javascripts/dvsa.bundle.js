/*!
 * 
 *   Name: dvsa-front-end/dvsa
 *   Version: 1.7.5
 *   Timestamp: July 29th 2022, 9:32:46 am
 *   Source: https://github.com/dvsa/front-end
 *
 */!function(){var e,t={9440:function(e,t,n){"use strict";n(142),n(1786),n(5368),n(6964),n(2152),n(4821),n(9103),n(1303),n(3318),n(162),n(3834),n(8416),n(8184),n(147),n(9192),n(1572),n(2139),n(685),n(5535),n(3049),n(6633),n(8989),n(8270),n(4510),n(3984),n(5769),n(55),n(6014),n(851),n(5767),n(9375),n(3533),n(4672),n(4157),n(5095),n(9892),n(4882),n(1520),n(7476),n(9622),n(5115),n(9176),n(8838),n(6059),n(8306),n(191),n(9539),n(823),n(7732),n(6620),n(2850),n(6774),n(1466),n(9357),n(1876),n(6142),n(522),n(8295),n(2e3),n(2310),n(4899),n(8977),n(6997),n(3403),n(2516),n(6479),n(9371),n(5972),n(1889),n(1736),n(6503),n(6786),n(932),n(7526),n(1591),n(9073),n(347),n(579),n(4669),n(7710),n(3514),n(5789),n(9978),n(8472),n(6946),n(5068),n(413),n(2773),n(6409),n(3276),n(8351),n(1784),n(2770),n(2564),n(4633),n(1181),n(5666),n(1798);var a=n(2218),o=n(3683);(0,a.domReady)((function(){(0,a.initGDS)(),(0,o.initModules)()}))},2666:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Accordion=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=l(n(5635)),r=l(n(2568)),i=l(n(686)),s=n(8276),c=n(9615);function l(e){return e&&e.__esModule?e:{default:e}}t.Accordion=function(){function e(t){var n=this;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.headerClickHandler=function(e){if(e.target&&n.state.sections.length){var t=(0,c.closestParentOfEl)(e.target,"."+s.ACCORDION_CONSTANTS.classNames.section);if(!t.getAttribute(s.ACCORDION_CONSTANTS.attributeNames.preventDefault)){t.getAttribute(s.ACCORDION_CONSTANTS.attributeNames.sectionCategory);var a=Number(t.getAttribute(s.ACCORDION_CONSTANTS.attributeNames.stateIndexId)),o=n.state.sections[a];if(o){var r=!o.sectionOpen;n.state.sections[a].sectionOpen=r,n.refreshState(),n.smoothScroll.animateScroll(t,!0,n.smoothScrollOptions),n.pushDataLayerForAccordion(a)}}}},this.headerMouseEnterHandler=function(e){if(e.target){var t=(0,c.closestParentOfEl)(e.target,"."+s.ACCORDION_CONSTANTS.classNames.header);t&&(0,c.toggleClass)(t,s.ACCORDION_CONSTANTS.classNames.headerHover,!0)}},this.headerMouseLeaveHandler=function(e){if(e.target){var t=(0,c.closestParentOfEl)(e.target,"."+s.ACCORDION_CONSTANTS.classNames.header);t&&(0,c.toggleClass)(t,s.ACCORDION_CONSTANTS.classNames.headerHover,!1)}},this.expandButtonClickHandler=function(e){n.state.expanding=!0,n.state.expandAll=!n.state.expandAll,n.state.expandAll&&(0,c.triggerCustomEvent)(document,s.ACCORDION_CONSTANTS.eventNames.expandAllOpen),n.refreshState(),n.state.expanding=!1,n.smoothScroll.animateScroll(e.target,!0,n.smoothScrollOptions),n.pushDataLayerForAllAccordions()},this.pushDataLayerForAllAccordions=function(){if(window.dataLayer){var e=n.state.expandAll?s.ACCORDION_CONSTANTS.dataLayer.open:s.ACCORDION_CONSTANTS.dataLayer.close,t={event:s.ACCORDION_CONSTANTS.dataLayer.linkClickEvent,link:s.ACCORDION_CONSTANTS.dataLayer.sectionAll,"link-text":n.state.expandAll?s.ACCORDION_CONSTANTS.openAllText:s.ACCORDION_CONSTANTS.closeAllText,"link-action":e,"link-type":s.ACCORDION_CONSTANTS.dataLayer.linkType};n.state.sections.forEach((function(a){var o=n.getSectionDataLayerInfo(a),r=e===s.ACCORDION_CONSTANTS.dataLayer.close?s.ACCORDION_CONSTANTS.dataLayer.closedStatus:e;t["subsection-"+o.category+"-status"]=r})),window.dataLayer.push(t)}},this.pushDataLayerForAccordion=function(e){if(window.dataLayer&&null!=e){var t=n.state.sections[e];if(t&&t.sectionElement){var a=n.getSectionDataLayerInfo(t),o={event:s.ACCORDION_CONSTANTS.dataLayer.linkClickEvent,link:"subsection-"+a.category,"link-text":a.heading,"link-action":a.openState,"link-type":s.ACCORDION_CONSTANTS.dataLayer.linkType},r=a.openState===s.ACCORDION_CONSTANTS.dataLayer.close?s.ACCORDION_CONSTANTS.dataLayer.closedStatus:a.openState;o["subsection-"+a.category+"-status"]=r,window.dataLayer.push(o)}}},this.pushDataLayerForSavedState=function(e){window.dataLayer&&e&&e.forEach((function(e){var t=n.getSectionDataLayerInfo(e);if(t.openState!=s.ACCORDION_CONSTANTS.dataLayer.close){var a={event:s.ACCORDION_CONSTANTS.dataLayer.sectionMemoryEvent,link:"subsection-"+t.category,"link-text":t.heading,"link-action":t.openState,"link-type":s.ACCORDION_CONSTANTS.dataLayer.linkType};a["subsection-"+t.category+"-status"]=t.openState,window.dataLayer.push(a)}}))},this.getSectionDataLayerInfo=function(e){if(e&&e.sectionElement)return{category:e.sectionElement.getAttribute(s.ACCORDION_CONSTANTS.attributeNames.sectionCategory),indexId:Number(e.sectionElement.getAttribute(s.ACCORDION_CONSTANTS.attributeNames.stateIndexId)),heading:e.sectionElement.querySelector("."+s.ACCORDION_CONSTANTS.classNames.title).textContent,openState:e.sectionOpen?s.ACCORDION_CONSTANTS.dataLayer.open:s.ACCORDION_CONSTANTS.dataLayer.close}},this.accordionElement=t,this.accordionElement?(this.accordionElement.setAttribute("role","presentation"),this.smoothScroll=new i.default,this.uniqueIdentifier="js-accordion-"+(0,r.default)(this.accordionElement.innerHTML),this.sections=Array.from(this.accordionElement.querySelectorAll("."+s.ACCORDION_CONSTANTS.classNames.section)),this.headings=Array.from(this.accordionElement.querySelectorAll("."+s.ACCORDION_CONSTANTS.classNames.header)),this.expandButton=this.accordionElement.querySelector("."+s.ACCORDION_CONSTANTS.classNames.expandButton),this.sections&&this.headings&&this.expandButton?((0,c.toggleClass)(this.accordionElement,s.ACCORDION_CONSTANTS.classNames.jsEnabled,!0),this.state={expandAll:!1,expanding:!1,sections:[]},this.smoothScrollOptions={offset:30,speed:300,easing:"easeOutCubic"},this.setup(),void this.refreshState()):console.warn("No sections found","No headings found","No expand button found")):console.warn("Accordion element not found")}return a(e,[{key:"setup",value:function(){var e=this;this.sections.length&&(this.sections.forEach((function(t){if(!t)return console.log("Section element not found");var n=t.querySelector("."+s.ACCORDION_CONSTANTS.classNames.header);if(!n)return console.log("Section header element not found");n.setAttribute("role","heading"),(0,c.addEventListenerToEl)(n,"mouseenter",e.headerMouseEnterHandler),(0,c.addEventListenerToEl)(n,"mouseleave",e.headerMouseLeaveHandler),(0,c.addEventListenerToEl)(n,"click",e.headerClickHandler);var a=t.querySelector("."+s.ACCORDION_CONSTANTS.classNames.content);if(!a)return console.log("Section content element not found");n.setAttribute("role","region");var o=(0,r.default)(t.innerHTML),i=n.getAttribute(s.ACCORDION_CONSTANTS.attributeNames.sectionContentId);e.state.sections.push({sectionUniqueIdentifier:o,sectionElement:t,sectionHeaderElement:n,sectionContentElement:a,sectionContentId:i,sectionOpen:e.isSectionOpen(t)});var l=e.state.sections.length-1;t.setAttribute(s.ACCORDION_CONSTANTS.attributeNames.stateIndexId,l),a.getAttribute("id")||a.setAttribute("id",i||o)})),(0,c.addEventListenerToEl)(this.expandButton,"click",this.expandButtonClickHandler))}},{key:"restoreSavedStateData",value:function(){var e=this,t=o.default.get(this.uniqueIdentifier);if(t&&t.sections){var n=[];t.sections.forEach((function(a){if(a&&a.uniqueIdentifier&&e.state.sections){var o=!1;if(e.state.sections.forEach((function(e,t){e.sectionUniqueIdentifier===a.uniqueIdentifier&&(o=t)})),null!=o){var r=e.state.sections[o];if(r){var i=!1;r.sectionElement&&r.sectionElement.getAttribute(s.ACCORDION_CONSTANTS.attributeNames.disableStateRestore)&&(i=!0),e.state.sections[o].sectionOpen=!i&&(!!t.expandAll||a.open),n.push(e.state.sections[o])}}}})),this.pushDataLayerForSavedState(n)}}},{key:"saveCurrentStateData",value:function(){var e={};e.expandAll=this.state.expandAll,e.sections=[],this.state&&this.state.sections&&(this.state.sections.forEach((function(t){e.sections.push({uniqueIdentifier:t.sectionUniqueIdentifier,open:t.sectionOpen})})),o.default.set(this.uniqueIdentifier,e))}},{key:"refreshState",value:function(){var e=this;if(this.state){if(this.state.sections){var t=0;this.state.sections.forEach((function(n){e.state.expanding&&(n.sectionOpen=e.state.expandAll);n.sectionOpen;(0,c.toggleClass)(n.sectionElement,s.ACCORDION_CONSTANTS.classNames.sectionOpen,n.sectionOpen),n.sectionHeaderElement&&n.sectionContentElement&&(n.sectionContentId||n.sectionUniqueIdentifier)&&(n.sectionHeaderElement.setAttribute(s.ACCORDION_CONSTANTS.ariaAttributes.controls,n.sectionContentId?n.sectionContentId:n.sectionUniqueIdentifier),n.sectionHeaderElement.setAttribute(s.ACCORDION_CONSTANTS.ariaAttributes.expanded,n.sectionOpen?"true":"false"),n.sectionContentElement.setAttribute(s.ACCORDION_CONSTANTS.ariaAttributes.hidden,n.sectionOpen?"false":"true")),n.sectionOpen&&t++,t>=1&&!e.state.expanding&&(e.state.expandAll=!1),t>=e.state.sections.length&&!e.state.expanding&&(e.state.expandAll=!0)}))}this.expandButton.textContent=this.getExpandButtonText()}}},{key:"isSectionOpen",value:function(e){return!!(0,c.elHasClass)(e,s.ACCORDION_CONSTANTS.classNames.sectionOpen)}},{key:"getExpandButtonText",value:function(){return this.state.expandAll?s.ACCORDION_CONSTANTS.closeAllText:s.ACCORDION_CONSTANTS.openAllText}}]),e}()},8276:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ACCORDION_CONSTANTS={closeAllText:"Close All",openAllText:"Open All",attributeNames:{sectionContentId:"data-section-content-id",stateIndexId:"data-section-state-index-id",sectionCategory:"data-section-category",preventDefault:"data-section-prevent-default",disableStateRestore:"data-section-disable-restore-state"},classNames:{accordion:"js-accordion",section:"js-accordion__section",sectionOpen:"js-accordion__section--open",header:"js-accordion__header",headerHover:"js-accordion__header--hover",title:"js-accordion__title-button",content:"js-accordion__content",expandButton:"js-accordion__expand-button",jsEnabled:"js-accordion--js-enabled"},ariaAttributes:{controls:"aria-controls",expanded:"aria-expanded",hidden:"aria-hidden"},dataLayer:{open:"open",close:"close",closedStatus:"closed",linkClickEvent:"link-click",linkType:"accordion",sectionMemoryEvent:"subsection-memory",sectionAll:"subsection-all"},eventNames:{expandAllOpen:"js-accordion:expand-all-open"}},t.RECALLS_ACCORDION_CONSTANTS={selectors:{section:"[data-recalls-accordion]",header:"[data-recalls-accordion-header]"},attributeNames:{ajaxEndpoint:"data-recalls-ajax-endpoint",ajaxData:"data-recalls-ajax-data"},classNames:{content:"recalls-accordion",contentNoJs:"recalls-accordion--no-js",contentLoading:"recalls-accordion--loading",contentShowOutput:"recalls-accordion--show-output",errorMessage:"recalls-accordion__error-message",errorMessageVisible:"recalls-accordion--error-message-visible",noJSAlternative:"recalls-accordion__no-js-alternative",loading:"recalls-accordion__loading",output:"recalls-accordion__output"},dataLayer:{noRecordsHeld:"no-records",submitEvent:"recall-cta-submit",submitElementName:"Recall",submitRecallUi:"cta-submitted",submitRecallOutcome:"Requested",submitTimestamp:"timestamp",responseTimestamp:"response-timestamp",error:{event:"api-response",elementName:"Recall",recallUI:"api-error",detail:"Sorry, something went wrong with the search. Please try again later.",lambdaReturnCode:"",outcome:"Error",outcomeDetail:"Connection error",smmtCall:0}}}},1411:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initAccordions=void 0;var a=n(2666),o=n(9185);t.initAccordions=function(){var e=document.querySelectorAll(".js-accordion");(e=Array.from(e)).length&&e.forEach((function(e){new a.Accordion(e)})),new o.RecallsAccordion}},9185:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RecallsAccordion=void 0;var a,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(9669),c=(a=s)&&a.__esModule?a:{default:a},l=n(8276),u=n(9615);t.RecallsAccordion=function(){function e(){var t=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.recallsHeadingClickHandler=function(e){t.state.ajaxEndpoint&&(t.state.loading||t.state.ajaxContentAddedToDOM||(t.dataLayerPushBeforeAjax(),t.callAjaxWithJSONResponse()))},this.callAjaxWithJSONResponse=function(){t.startLoading(),c.default.post(t.state.ajaxEndpoint,r({},t.state.ajaxRequestBody)).then((function(e){var n=e.data;if(null===n||null===n.result)return t.stopLoading(),console.warn("No HTML result key found in response");if(t.elements.output.innerHTML=n.result,(0,u.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.contentShowOutput,!0),t.state.ajaxContentAddedToDOM=!0,null!==n&&n.smartSurveyLink){var a=document.querySelector(".phase-banner a");a?a.href=n.smartSurveyLink:console.warn("Found smart survey link in response, but could no detect phase banner link in the DOM")}null!==n&&n.dataLayer&&(Array.isArray(n.dataLayer)?n.dataLayer.forEach((function(e,n){0===n&&(e[l.RECALLS_ACCORDION_CONSTANTS.dataLayer.responseTimestamp]=Date.now()),t.dataLayerPush(e)})):null!==n.dataLayer&&"object"===o(n.dataLayer)&&(n.dataLayer[l.RECALLS_ACCORDION_CONSTANTS.dataLayer.responseTimestamp]=Date.now(),t.dataLayerPush(n.dataLayer))),t.stopLoading()})).catch(t.handleError)},this.callAjaxWithHTMLResponse=function(){t.startLoading(),c.default.post(t.state.ajaxEndpoint,r({},t.state.ajaxRequestBody)).then((function(e){if(!e||!e.data)return t.stopLoading(),console.warn("Response has no data");t.elements.output.innerHTML=e.data,t.state.ajaxContentAddedToDOM=!0,(0,u.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.contentShowOutput,!0),t.stopLoading()})).catch(t.handleError)},this.handleError=function(e){t.stopLoading(),t.elements.error&&(0,u.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.errorMessageVisible,!0);var n={event:l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.event,"element-name":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.elementName,"recall-ui":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.recallUI,"recall-ui-detail":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.detail,"lambda-return-code":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.lambdaReturnCode,"recall-outcome":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.outcome,"recall-outcome-detail":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.outcomeDetail,"smmt-call":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.smmtCall};t.dataLayerPush(n)},this.dataLayerPushBeforeAjax=function(){if(window.dataLayer){var e={event:l.RECALLS_ACCORDION_CONSTANTS.dataLayer.submitEvent,"element-name":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.submitElementName,"recall-ui":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.submitRecallUi,"recall-outcome":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.submitRecallOutcome,timestamp:(new Date).getTime()};window.dataLayer.push(e)}},this.startLoading=function(){t.state.loading=!0,(0,u.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.errorMessageVisible,!1),(0,u.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.contentLoading,!0)},this.stopLoading=function(){(0,u.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.contentLoading,!1),t.state.loading=!1},this.dataLayerPush=function(e){if(!window.dataLayer||null===e||"object"!==(void 0===e?"undefined":o(e)))return console.warn("Could not push dataLayer as it was not found");window.dataLayer.push(e)},this.recallsAccordionSectionElement=document.querySelector(l.RECALLS_ACCORDION_CONSTANTS.selectors.section),this.recallsAccordionSectionElement){for(var n in this.elements={parent:(0,u.closestParentOfEl)(this.recallsAccordionSectionElement,"."+l.ACCORDION_CONSTANTS.classNames.accordion),header:document.querySelector(l.RECALLS_ACCORDION_CONSTANTS.selectors.header),content:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.classNames.content),noJSAlternative:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.classNames.noJSAlternative),loading:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.classNames.loading),output:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.classNames.output),error:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.classNames.errorMessage),noRecordsHeld:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.dataLayer.noRecordsHeld)},this.elements)if(!this.elements[n]&&null===!this.elements.noRecordsHeld)return console.warn(n+" - Element was not found");this.state={ajaxRequestBody:!1,ajaxEndpoint:!1,ajaxContentAddedToDOM:!1,loading:!1},this.setup()}}return i(e,[{key:"setup",value:function(){(0,u.toggleClass)(this.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.contentNoJs,!1),this.state.ajaxEndpoint=this.recallsAccordionSectionElement.getAttribute(l.RECALLS_ACCORDION_CONSTANTS.attributeNames.ajaxEndpoint),this.state.ajaxRequestBody=JSON.parse(this.recallsAccordionSectionElement.getAttribute(l.RECALLS_ACCORDION_CONSTANTS.attributeNames.ajaxData)),(0,u.addEventListenerToEl)(this.elements.header,"click",this.recallsHeadingClickHandler),document.addEventListener(l.ACCORDION_CONSTANTS.eventNames.expandAllOpen,this.recallsHeadingClickHandler)}}]),e}()},3683:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initModules=void 0;var a=n(1411);t.initModules=function(){(0,a.initAccordions)()}},5635:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(n(2195)),o=s(n(9627)),r=s(n(5580)),i=s(n(3812));function s(e){return e&&e.__esModule?e:{default:e}}var c=[o.default,r.default],l=[i.default],u=a.default.createStore(c,l);t.default=u},686:function(e,t,n){var a,o;/*! smooth-scroll v12.1.5 | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */o=void 0!==n.g?n.g:"undefined"!=typeof window?window:this,a=function(){return function(e){"use strict";var t="querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype,n={ignore:"[data-scroll-ignore]",header:null,speed:500,offset:0,easing:"easeInOutCubic",customEasing:null,before:function(){},after:function(){}},a=function(){for(var e={},t=0,n=arguments.length;t<n;t++)!function(t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}(arguments[t]);return e},o=function(t){return parseInt(e.getComputedStyle(t).height,10)},r=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),a=n.length,o=-1,r="",i=n.charCodeAt(0);++o<a;){if(0===(t=n.charCodeAt(o)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");r+=t>=1&&t<=31||127==t||0===o&&t>=48&&t<=57||1===o&&t>=48&&t<=57&&45===i?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(o):"\\"+n.charAt(o)}return"#"+r},i=function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.customEasing&&(n=e.customEasing(t)),n||t},s=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},c=function(e,t,n){var a=0;if(e.offsetParent)do{a+=e.offsetTop,e=e.offsetParent}while(e);return Math.max(a-t-n,0)},l=function(e){return e?o(e)+e.offsetTop:0},u=function(t,n,a){a||(t.focus(),document.activeElement.id!==t.id&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))},d=function(t){return!(!("matchMedia"in e)||!e.matchMedia("(prefers-reduced-motion)").matches)};return function(o,f){var C,O,h,p,N,S,A,m={cancelScroll:function(){cancelAnimationFrame(A)},animateScroll:function(t,o,r){var d=a(C||n,r||{}),f="[object Number]"===Object.prototype.toString.call(t),O=f||!t.tagName?null:t;if(f||O){var h=e.pageYOffset;d.header&&!p&&(p=document.querySelector(d.header)),N||(N=l(p));var S,A,g,v=f?t:c(O,N,parseInt("function"==typeof d.offset?d.offset():d.offset,10)),y=v-h,T=s(),_=0,L=function(n,a){var r=e.pageYOffset;if(n==a||r==a||(h<a&&e.innerHeight+r)>=T)return m.cancelScroll(),u(t,a,f),d.after(t,o),S=null,!0},b=function(t){S||(S=t),A=(_+=t-S)/parseInt(d.speed,10),g=h+y*i(d,A=A>1?1:A),e.scrollTo(0,Math.floor(g)),L(g,v)||(e.requestAnimationFrame(b),S=t)};0===e.pageYOffset&&e.scrollTo(0,0),d.before(t,o),m.cancelScroll(),e.requestAnimationFrame(b)}}},g=function(e){O&&(O.id=O.getAttribute("data-scroll-id"),m.animateScroll(O,h),O=null,h=null)},v=function(t){if(!d()&&0===t.button&&!t.metaKey&&!t.ctrlKey&&(h=t.target.closest(o))&&"a"===h.tagName.toLowerCase()&&!t.target.closest(C.ignore)&&h.hostname===e.location.hostname&&h.pathname===e.location.pathname&&/#/.test(h.href)){var n;try{n=r(decodeURIComponent(h.hash))}catch(e){n=r(h.hash)}if("#"===n){t.preventDefault();var a=(O=document.body).id?O.id:"smooth-scroll-top";return O.setAttribute("data-scroll-id",a),O.id="",void(e.location.hash.substring(1)===a?g():e.location.hash=a)}(O=document.querySelector(n))&&(O.setAttribute("data-scroll-id",O.id),O.id="",h.hash===e.location.hash&&(t.preventDefault(),g()))}},y=function(e){S||(S=setTimeout((function(){S=null,N=l(p)}),66))};return m.destroy=function(){C&&(document.removeEventListener("click",v,!1),e.removeEventListener("resize",y,!1),m.cancelScroll(),C=null,O=null,h=null,p=null,N=null,S=null,A=null)},m.init=function(o){t&&(m.destroy(),C=a(n,o||{}),p=C.header?document.querySelector(C.header):null,N=l(p),document.addEventListener("click",v,!1),e.addEventListener("hashchange",g,!1),p&&e.addEventListener("resize",y,!1))},m.init(f),m}}(o)}.apply(t,[]),void 0===a||(e.exports=a)},3812:function(e){var t="expire_mixin";e.exports=function(){var e=this.createStore(this.storage,null,this._namespacePrefix+t);return{set:function(n,a,o,r){this.hasNamespace(t)||e.set(a,r);return n()},get:function(e,a){this.hasNamespace(t)||n.call(this,a);return e()},remove:function(n,a){this.hasNamespace(t)||e.remove(a);return n()},getExpiration:function(t,n){return e.get(n)},removeExpiredKeys:function(e){var t=[];this.each((function(e,n){t.push(n)}));for(var a=0;a<t.length;a++)n.call(this,t[a])}};function n(t){e.get(t,Number.MAX_VALUE)<=(new Date).getTime()&&(this.raw.remove(t),e.remove(t))}}},2195:function(e,t,n){var a=n(9078),o=a.slice,r=a.pluck,i=a.each,s=a.bind,c=a.create,l=a.isList,u=a.isFunction,d=a.isObject;e.exports={createStore:C};var f={version:"2.0.12",enabled:!1,get:function(e,t){var n=this.storage.read(this._namespacePrefix+e);return this._deserialize(n,t)},set:function(e,t){return void 0===t?this.remove(e):(this.storage.write(this._namespacePrefix+e,this._serialize(t)),t)},remove:function(e){this.storage.remove(this._namespacePrefix+e)},each:function(e){var t=this;this.storage.each((function(n,a){e.call(t,t._deserialize(n),(a||"").replace(t._namespaceRegexp,""))}))},clearAll:function(){this.storage.clearAll()},hasNamespace:function(e){return this._namespacePrefix=="__storejs_"+e+"_"},createStore:function(){return C.apply(this,arguments)},addPlugin:function(e){this._addPlugin(e)},namespace:function(e){return C(this.storage,this.plugins,e)}};function C(e,t,n){n||(n=""),e&&!l(e)&&(e=[e]),t&&!l(t)&&(t=[t]);var a=n?"__storejs_"+n+"_":"",C=n?new RegExp("^"+a):null;if(!/^[a-zA-Z0-9_\-]*$/.test(n))throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");var O={_namespacePrefix:a,_namespaceRegexp:C,_testStorage:function(e){try{var t="__storejs__test__";e.write(t,t);var n=e.read(t)===t;return e.remove(t),n}catch(e){return!1}},_assignPluginFnProp:function(e,t){var n=this[t];this[t]=function(){var t=o(arguments,0),a=this;function r(){if(n)return i(arguments,(function(e,n){t[n]=e})),n.apply(a,t)}var s=[r].concat(t);return e.apply(a,s)}},_serialize:function(e){return JSON.stringify(e)},_deserialize:function(e,t){if(!e)return t;var n="";try{n=JSON.parse(e)}catch(t){n=e}return void 0!==n?n:t},_addStorage:function(e){this.enabled||this._testStorage(e)&&(this.storage=e,this.enabled=!0)},_addPlugin:function(e){var t=this;if(l(e))i(e,(function(e){t._addPlugin(e)}));else if(!r(this.plugins,(function(t){return e===t}))){if(this.plugins.push(e),!u(e))throw new Error("Plugins must be function values that return objects");var n=e.call(this);if(!d(n))throw new Error("Plugins must return an object of function properties");i(n,(function(n,a){if(!u(n))throw new Error("Bad plugin property: "+a+" from plugin "+e.name+". Plugins should only return functions.");t._assignPluginFnProp(n,a)}))}},addStorage:function(e){!function(){var e="undefined"==typeof console?null:console;if(e){(e.warn?e.warn:e.log).apply(e,arguments)}}("store.addStorage(storage) is deprecated. Use createStore([storages])"),this._addStorage(e)}},h=c(O,f,{plugins:[]});return h.raw={},i(h,(function(e,t){u(e)&&(h.raw[t]=s(h,e))})),i(e,(function(e){h._addStorage(e)})),i(t,(function(e){h._addPlugin(e)})),h}},9078:function(e,t,n){var a=Object.assign?Object.assign:function(e,t,n,a){for(var o=1;o<arguments.length;o++)c(Object(arguments[o]),(function(t,n){e[n]=t}));return e},o=function(){if(Object.create)return function(e,t,n,o){var r=s(arguments,1);return a.apply(this,[Object.create(e)].concat(r))};{function e(){}return function(t,n,o,r){var i=s(arguments,1);return e.prototype=t,a.apply(this,[new e].concat(i))}}}(),r=String.prototype.trim?function(e){return String.prototype.trim.call(e)}:function(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},i="undefined"!=typeof window?window:n.g;function s(e,t){return Array.prototype.slice.call(e,t||0)}function c(e,t){l(e,(function(e,n){return t(e,n),!1}))}function l(e,t){if(u(e)){for(var n=0;n<e.length;n++)if(t(e[n],n))return e[n]}else for(var a in e)if(e.hasOwnProperty(a)&&t(e[a],a))return e[a]}function u(e){return null!=e&&"function"!=typeof e&&"number"==typeof e.length}e.exports={assign:a,create:o,trim:r,bind:function(e,t){return function(){return t.apply(e,Array.prototype.slice.call(arguments,0))}},slice:s,each:c,map:function(e,t){var n=u(e)?[]:{};return l(e,(function(e,a){return n[a]=t(e,a),!1})),n},pluck:l,isList:u,isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)},isObject:function(e){return e&&"[object Object]"==={}.toString.call(e)},Global:i}},5580:function(e,t,n){var a=n(9078),o=a.Global,r=a.trim;e.exports={name:"cookieStorage",read:function(e){if(!e||!l(e))return null;var t="(?:^|.*;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";return unescape(i.cookie.replace(new RegExp(t),"$1"))},write:function(e,t){if(!e)return;i.cookie=escape(e)+"="+escape(t)+"; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/"},each:s,remove:c,clearAll:function(){s((function(e,t){c(t)}))}};var i=o.document;function s(e){for(var t=i.cookie.split(/; ?/g),n=t.length-1;n>=0;n--)if(r(t[n])){var a=t[n].split("="),o=unescape(a[0]);e(unescape(a[1]),o)}}function c(e){e&&l(e)&&(i.cookie=escape(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/")}function l(e){return new RegExp("(?:^|;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(i.cookie)}},9627:function(e,t,n){var a=n(9078).Global;function o(){return a.localStorage}function r(e){return o().getItem(e)}e.exports={name:"localStorage",read:r,write:function(e,t){return o().setItem(e,t)},each:function(e){for(var t=o().length-1;t>=0;t--){var n=o().key(t);e(r(n),n)}},remove:function(e){return o().removeItem(e)},clearAll:function(){return o().clear()}}}},n={};function a(e){var o=n[e];if(void 0!==o)return o.exports;var r=n[e]={exports:{}};return t[e].call(r.exports,r,r.exports,a),r.exports}a.m=t,e=[],a.O=function(t,n,o,r){if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],r=e[u][2];for(var s=!0,c=0;c<n.length;c++)(!1&r||i>=r)&&Object.keys(a.O).every((function(e){return a.O[e](n[c])}))?n.splice(c--,1):(s=!1,r<i&&(i=r));if(s){e.splice(u--,1);var l=o();void 0!==l&&(t=l)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,o,r]},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={787:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,r,i=n[0],s=n[1],c=n[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(o in s)a.o(s,o)&&(a.m[o]=s[o]);if(c)var u=c(a)}for(t&&t(n);l<i.length;l++)r=i[l],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(u)},n=self.webpackChunkdvsa_front_end=self.webpackChunkdvsa_front_end||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var o=a.O(void 0,[736],(function(){return a(9440)}));o=a.O(o)}();