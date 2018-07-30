/*!
 * 
 *   Name: dvsa-front-end/development
 *   Version: 1.2.19
 *   Author: Tameem Safi <https://github.com/tameemsafi>
 *   Contributors: Tameem Safi <https://github.com/tameemsafi>, James Nelson <j.nelson@kainos.com>
 *   Timestamp: July 30th 2018, 3:13:58 pm
 *   Source: https://github.com/dvsa/front-end
 * 
 */
webpackJsonp([0],{213:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.TEXT_TO_SPEECH_CONFIG={classes:{wrapper:"text-to-speech__wrapper",readerItem:"text-to-speech__item",readerItemHighlight:"text-to-speech__item--highlight",audioBtn:"text-to-speech__button",audioBtnPlaying:"text-to-speech__button--playing"},audioBtnText:"Play audio",dataAttributes:{readerID:"data-item-id"},DOMTargets:["p","ul"],buttonInnerHtml:"<span class='sr-only'>Play Audio</span>\n  <i class='text-to-speech__icon text-to-speech__icon--play' role='presentation'></i>"}},329:function(e,t,n){"use strict";n(330),n(331),n(332),n(333);var i=n(19),r=n(334);n(351),(0,i.domReady)(function(){(0,r.initModules)()})},330:function(e,t,n){(function(t){var n="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},i=function(){var e=/\blang(?:uage)?-([\w-]+)\b/i,t=0,i=n.Prism={manual:n.Prism&&n.Prism.manual,disableWorkerMessageHandler:n.Prism&&n.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof r?new r(e.type,i.util.encode(e.content),e.alias):"Array"===i.util.type(e)?e.map(i.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e,t){var n=i.util.type(e);switch(t=t||{},n){case"Object":if(t[i.util.objId(e)])return t[i.util.objId(e)];var r={};t[i.util.objId(e)]=r;for(var a in e)e.hasOwnProperty(a)&&(r[a]=i.util.clone(e[a],t));return r;case"Array":if(t[i.util.objId(e)])return t[i.util.objId(e)];var r=[];return t[i.util.objId(e)]=r,e.forEach(function(e,n){r[n]=i.util.clone(e,t)}),r}return e}},languages:{extend:function(e,t){var n=i.util.clone(i.languages[e]);for(var r in t)n[r]=t[r];return n},insertBefore:function(e,t,n,r){r=r||i.languages;var a=r[e];if(2==arguments.length){n=arguments[1];for(var s in n)n.hasOwnProperty(s)&&(a[s]=n[s]);return a}var o={};for(var l in a)if(a.hasOwnProperty(l)){if(l==t)for(var s in n)n.hasOwnProperty(s)&&(o[s]=n[s]);o[l]=a[l]}return i.languages.DFS(i.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,n,r){r=r||{};for(var a in e)e.hasOwnProperty(a)&&(t.call(e,a,e[a],n||a),"Object"!==i.util.type(e[a])||r[i.util.objId(e[a])]?"Array"!==i.util.type(e[a])||r[i.util.objId(e[a])]||(r[i.util.objId(e[a])]=!0,i.languages.DFS(e[a],t,a,r)):(r[i.util.objId(e[a])]=!0,i.languages.DFS(e[a],t,null,r)))}},plugins:{},highlightAll:function(e,t){i.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var r={callback:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",r);for(var a,s=r.elements||e.querySelectorAll(r.selector),o=0;a=s[o++];)i.highlightElement(a,!0===t,r.callback)},highlightElement:function(t,r,a){for(var s,o,l=t;l&&!e.test(l.className);)l=l.parentNode;l&&(s=(l.className.match(e)||[,""])[1].toLowerCase(),o=i.languages[s]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+s,t.parentNode&&(l=t.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+s));var c=t.textContent,u={element:t,language:s,grammar:o,code:c};if(i.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return u.code&&(i.hooks.run("before-highlight",u),u.element.textContent=u.code,i.hooks.run("after-highlight",u)),void i.hooks.run("complete",u);if(i.hooks.run("before-highlight",u),r&&n.Worker){var d=new Worker(i.filename);d.onmessage=function(e){u.highlightedCode=e.data,i.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,a&&a.call(u.element),i.hooks.run("after-highlight",u),i.hooks.run("complete",u)},d.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=i.highlight(u.code,u.grammar,u.language),i.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,a&&a.call(t),i.hooks.run("after-highlight",u),i.hooks.run("complete",u)},highlight:function(e,t,n){var a={code:e,grammar:t,language:n};return i.hooks.run("before-tokenize",a),a.tokens=i.tokenize(a.code,a.grammar),i.hooks.run("after-tokenize",a),r.stringify(i.util.encode(a.tokens),a.language)},matchGrammar:function(e,t,n,r,a,s,o){var l=i.Token;for(var c in n)if(n.hasOwnProperty(c)&&n[c]){if(c==o)return;var u=n[c];u="Array"===i.util.type(u)?u:[u];for(var d=0;d<u.length;++d){var g=u[d],m=g.inside,h=!!g.lookbehind,p=!!g.greedy,f=0,v=g.alias;if(p&&!g.pattern.global){var b=g.pattern.toString().match(/[imuy]*$/)[0];g.pattern=RegExp(g.pattern.source,b+"g")}g=g.pattern||g;for(var y=r,w=a;y<t.length;w+=t[y].length,++y){var _=t[y];if(t.length>e.length)return;if(!(_ instanceof l)){if(p&&y!=t.length-1){g.lastIndex=w;var T=g.exec(e);if(!T)break;for(var E=T.index+(h?T[1].length:0),P=T.index+T[0].length,S=y,C=w,F=t.length;S<F&&(C<P||!t[S].type&&!t[S-1].greedy);++S)C+=t[S].length,E>=C&&(++y,w=C);if(t[y]instanceof l)continue;O=S-y,_=e.slice(w,C),T.index-=w}else{g.lastIndex=0;var T=g.exec(_),O=1}if(T){h&&(f=T[1]?T[1].length:0);var E=T.index+f,T=T[0].slice(f),P=E+T.length,k=_.slice(0,E),N=_.slice(P),x=[y,O];k&&(++y,w+=k.length,x.push(k));var B=new l(c,m?i.tokenize(T,m):T,v,T,p);if(x.push(B),N&&x.push(N),Array.prototype.splice.apply(t,x),1!=O&&i.matchGrammar(e,t,n,y,w,!0,c),s)break}else if(s)break}}}}},tokenize:function(e,t,n){var r=[e],a=t.rest;if(a){for(var s in a)t[s]=a[s];delete t.rest}return i.matchGrammar(e,r,t,0,0,!1),r},hooks:{all:{},add:function(e,t){var n=i.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=i.hooks.all[e];if(n&&n.length)for(var r,a=0;r=n[a++];)r(t)}}},r=i.Token=function(e,t,n,i,r){this.type=e,this.content=t,this.alias=n,this.length=0|(i||"").length,this.greedy=!!r};if(r.stringify=function(e,t,n){if("string"==typeof e)return e;if("Array"===i.util.type(e))return e.map(function(n){return r.stringify(n,t,e)}).join("");var a={type:e.type,content:r.stringify(e.content,t,n),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:n};if(e.alias){var s="Array"===i.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(a.classes,s)}i.hooks.run("wrap",a);var o=Object.keys(a.attributes).map(function(e){return e+'="'+(a.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+(o?" "+o:"")+">"+a.content+"</"+a.tag+">"},!n.document)return n.addEventListener?(i.disableWorkerMessageHandler||n.addEventListener("message",function(e){var t=JSON.parse(e.data),r=t.language,a=t.code,s=t.immediateClose;n.postMessage(i.highlight(a,i.languages[r],r)),s&&n.close()},!1),n.Prism):n.Prism;var a=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return a&&(i.filename=a.src,i.manual||a.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(i.highlightAll):window.setTimeout(i.highlightAll,16):document.addEventListener("DOMContentLoaded",i.highlightAll))),n.Prism}();void 0!==e&&e.exports&&(e.exports=i),void 0!==t&&(t.Prism=i),i.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/(^|[^\\])["']/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},i.languages.markup.tag.inside["attr-value"].inside.entity=i.languages.markup.entity,i.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),i.languages.xml=i.languages.markup,i.languages.html=i.languages.markup,i.languages.mathml=i.languages.markup,i.languages.svg=i.languages.markup,i.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(?:;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^{}\s][^{};]*?(?=\s*\{)/,string:{pattern:/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/\B!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},i.languages.css.atrule.inside.rest=i.languages.css,i.languages.markup&&(i.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:i.languages.css,alias:"language-css",greedy:!0}}),i.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:i.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:i.languages.css}},alias:"language-css"}},i.languages.markup.tag)),i.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},i.languages.javascript=i.languages.extend("clike",{keyword:/\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,function:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),i.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,alias:"function"},constant:/\b[A-Z][A-Z\d_]*\b/}),i.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,greedy:!0,inside:{interpolation:{pattern:/\${[^}]+}/,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}}}),i.languages.javascript["template-string"].inside.interpolation.inside.rest=i.languages.javascript,i.languages.markup&&i.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:i.languages.javascript,alias:"language-javascript",greedy:!0}}),i.languages.js=i.languages.javascript,function(){"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,r=t.getAttribute("data-src"),a=t,s=/\blang(?:uage)?-([\w-]+)\b/i;a&&!s.test(a.className);)a=a.parentNode;if(a&&(n=(t.className.match(s)||[,""])[1]),!n){var o=(r.match(/\.(\w+)$/)||[,""])[1];n=e[o]||o}var l=document.createElement("code");l.className="language-"+n,t.textContent="",l.textContent="Loading…",t.appendChild(l);var c=new XMLHttpRequest;c.open("GET",r,!0),c.onreadystatechange=function(){4==c.readyState&&(c.status<400&&c.responseText?(l.textContent=c.responseText,i.highlightElement(l)):c.status>=400?l.textContent="✖ Error "+c.status+" while fetching file: "+c.statusText:l.textContent="✖ Error: File does not exist or is empty")},c.send(null)}),i.plugins.toolbar&&i.plugins.toolbar.registerButton("download-file",function(e){var t=e.element.parentNode;if(t&&/pre/i.test(t.nodeName)&&t.hasAttribute("data-src")&&t.hasAttribute("data-download-link")){var n=t.getAttribute("data-src"),i=document.createElement("a");return i.textContent=t.getAttribute("data-download-link-label")||"Download",i.setAttribute("download",""),i.href=n,i}})},document.addEventListener("DOMContentLoaded",self.Prism.fileHighlight))}()}).call(t,n(152))},331:function(e,t){!function(){if("undefined"!=typeof self&&self.Prism&&self.document){var e=[],t={},n=function(){};Prism.plugins.toolbar={};var i=Prism.plugins.toolbar.registerButton=function(n,i){var r;r="function"==typeof i?i:function(e){var t;return"function"==typeof i.onClick?(t=document.createElement("button"),t.type="button",t.addEventListener("click",function(){i.onClick.call(this,e)})):"string"==typeof i.url?(t=document.createElement("a"),t.href=i.url):t=document.createElement("span"),t.textContent=i.text,t},e.push(t[n]=r)},r=Prism.plugins.toolbar.hook=function(i){var r=i.element.parentNode;if(r&&/pre/i.test(r.nodeName)&&!r.parentNode.classList.contains("code-toolbar")){var a=document.createElement("div");a.classList.add("code-toolbar"),r.parentNode.insertBefore(a,r),a.appendChild(r);var s=document.createElement("div");s.classList.add("toolbar"),document.body.hasAttribute("data-toolbar-order")&&(e=document.body.getAttribute("data-toolbar-order").split(",").map(function(e){return t[e]||n})),e.forEach(function(e){var t=e(i);if(t){var n=document.createElement("div");n.classList.add("toolbar-item"),n.appendChild(t),s.appendChild(n)}}),a.appendChild(s)}};i("label",function(e){var t=e.element.parentNode;if(t&&/pre/i.test(t.nodeName)&&t.hasAttribute("data-label")){var n,i,r=t.getAttribute("data-label");try{i=document.querySelector("template#"+r)}catch(e){}return i?n=i.content:(t.hasAttribute("data-url")?(n=document.createElement("a"),n.href=t.getAttribute("data-url")):n=document.createElement("span"),n.textContent=r),n}}),Prism.hooks.add("complete",r)}}()},332:function(e,t){!function(){function t(e){this.defaults=r({},e)}function n(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})}function i(e){for(var t=0,n=0;n<e.length;++n)e.charCodeAt(n)=="\t".charCodeAt(0)&&(t+=3);return e.length+t}var r=Object.assign||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e};t.prototype={setDefaults:function(e){this.defaults=r(this.defaults,e)},normalize:function(e,t){t=r(this.defaults,t);for(var i in t){var a=n(i);"normalize"!==i&&"setDefaults"!==a&&t[i]&&this[a]&&(e=this[a].call(this,e,t[i]))}return e},leftTrim:function(e){return e.replace(/^\s+/,"")},rightTrim:function(e){return e.replace(/\s+$/,"")},tabsToSpaces:function(e,t){return t=0|t||4,e.replace(/\t/g,new Array(++t).join(" "))},spacesToTabs:function(e,t){return t=0|t||4,e.replace(new RegExp(" {"+t+"}","g"),"\t")},removeTrailing:function(e){return e.replace(/\s*?$/gm,"")},removeInitialLineFeed:function(e){return e.replace(/^(?:\r?\n|\r)/,"")},removeIndent:function(e){var t=e.match(/^[^\S\n\r]*(?=\S)/gm);return t&&t[0].length?(t.sort(function(e,t){return e.length-t.length}),t[0].length?e.replace(new RegExp("^"+t[0],"gm"),""):e):e},indent:function(e,t){return e.replace(/^[^\S\n\r]*(?=\S)/gm,new Array(++t).join("\t")+"$&")},breakLines:function(e,t){t=!0===t?80:0|t||80;for(var n=e.split("\n"),r=0;r<n.length;++r)if(!(i(n[r])<=t)){for(var a=n[r].split(/(\s+)/g),s=0,o=0;o<a.length;++o){var l=i(a[o]);s+=l,s>t&&(a[o]="\n"+a[o],s=l)}n[r]=a.join("")}return n.join("\n")}},void 0!==e&&e.exports&&(e.exports=t),"undefined"!=typeof Prism&&(Prism.plugins.NormalizeWhitespace=new t({"remove-trailing":!0,"remove-indent":!0,"left-trim":!0,"right-trim":!0}),Prism.hooks.add("before-sanity-check",function(e){var t=Prism.plugins.NormalizeWhitespace;if(!e.settings||!1!==e.settings["whitespace-normalization"]){if((!e.element||!e.element.parentNode)&&e.code)return void(e.code=t.normalize(e.code,e.settings));var n=e.element.parentNode,i=/\bno-whitespace-normalization\b/;if(e.code&&n&&"pre"===n.nodeName.toLowerCase()&&!i.test(n.className)&&!i.test(e.element.className)){for(var r=n.childNodes,a="",s="",o=!1,l=0;l<r.length;++l){var c=r[l];c==e.element?o=!0:"#text"===c.nodeName&&(o?s+=c.nodeValue:a+=c.nodeValue,n.removeChild(c),--l)}if(e.element.children.length&&Prism.plugins.KeepMarkup){var u=a+e.element.innerHTML+s;e.element.innerHTML=t.normalize(u,e.settings),e.code=e.element.textContent}else e.code=a+e.code+s,e.code=t.normalize(e.code,e.settings)}}}))}()},333:function(e,t){!function(){if("undefined"!=typeof self&&self.Prism&&self.document){var e=/\n(?!$)/g,t=function(t){var i=n(t),r=i["white-space"];if("pre-wrap"===r||"pre-line"===r){var a=t.querySelector("code"),s=t.querySelector(".line-numbers-rows"),o=t.querySelector(".line-numbers-sizer"),l=a.textContent.split(e);o||(o=document.createElement("span"),o.className="line-numbers-sizer",a.appendChild(o)),o.style.display="block",l.forEach(function(e,t){o.textContent=e||"\n";var n=o.getBoundingClientRect().height;s.children[t].style.height=n+"px"}),o.textContent="",o.style.display="none"}},n=function(e){return e?window.getComputedStyle?getComputedStyle(e):e.currentStyle||null:null};window.addEventListener("resize",function(){Array.prototype.forEach.call(document.querySelectorAll("pre.line-numbers"),t)}),Prism.hooks.add("complete",function(n){if(n.code){var i=n.element.parentNode,r=/\s*\bline-numbers\b\s*/;if(i&&/pre/i.test(i.nodeName)&&(r.test(i.className)||r.test(n.element.className))&&!n.element.querySelector(".line-numbers-rows")){r.test(n.element.className)&&(n.element.className=n.element.className.replace(r," ")),r.test(i.className)||(i.className+=" line-numbers");var a,s=n.code.match(e),o=s?s.length+1:1,l=new Array(o+1);l=l.join("<span></span>"),a=document.createElement("span"),a.setAttribute("aria-hidden","true"),a.className="line-numbers-rows",a.innerHTML=l,i.hasAttribute("data-start")&&(i.style.counterReset="linenumber "+(parseInt(i.getAttribute("data-start"),10)-1)),n.element.appendChild(a),t(i),Prism.hooks.run("line-numbers",n)}}}),Prism.hooks.add("line-numbers",function(e){e.plugins=e.plugins||{},e.plugins.lineNumbers=!0}),Prism.plugins.lineNumbers={getLine:function(e,t){if("PRE"===e.tagName&&e.classList.contains("line-numbers")){var n=e.querySelector(".line-numbers-rows"),i=parseInt(e.getAttribute("data-start"),10)||1,r=i+(n.children.length-1);t<i&&(t=i),t>r&&(t=r);var a=t-i;return n.children[a]}}}}}()},334:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initModules=void 0;var i=n(335),r=n(337),a=n(340),s=n(343),o=n(346),l=n(349);t.initModules=function(){(0,i.initLibraryNavigation)(),(0,r.initDevPreview)(),(0,a.initTextToSpeechToggle)(),(0,s.initFontSizeToggle)(),(0,o.initSpeechToText)(),(0,l.initThemeToggle)()}},335:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initLibraryNavigation=void 0;var i=n(336);t.initLibraryNavigation=function(){new i.LibraryPageNavigation}},336:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.LibraryPageNavigation=void 0;var r=n(4);t.LibraryPageNavigation=function e(){var t=this;if(i(this,e),this.mobileNavigationClickHandler=function(){(0,r.toggleClass)(t.navigationInner,t.navigationInnerOpenClassName)},this.sidebar=!1,this.maxWidth=800,this.navigationId="styleguide-navigation",this.navigationInnerClassName="styleguide-navigation__inner",this.navigationInnerOpenClassName="styleguide-navigation__inner--open",this.contentId="styleguide-content",this.mobileNavigationClassName="styleguide-navigation__mobile-nav",this.mobileNavigationContainerClassName="styleguide-navigation",this.libraryContainerId="library-container",this.libraryContainerElement=document.getElementById(this.libraryContainerId),this.navigation=document.getElementById(this.navigationId),this.navigation&&this.libraryContainerElement)return this.mobileNavigationContainer=document.querySelector("."+this.mobileNavigationClassName),this.navigationInner=this.navigation.querySelector("."+this.navigationInnerClassName),this.content=document.getElementById(this.contentId),this.mobileNavigationContainer?this.navigationInner?this.content?void(0,r.addEventListenerToEl)(this.mobileNavigationContainer,"click",this.mobileNavigationClickHandler):console.warn("Library content not found"):console.warn("Navigation inner not found"):console.warn("Mobile navigation container not found")}},337:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initDevPreview=void 0;var i=n(338),r=n(339);t.initDevPreview=function(){new i.DevPreview,new r.DevPreviewFullscreen}},338:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.DevPreview=void 0;var r=n(46),a=(function(e){e&&e.__esModule}(r),n(4));t.DevPreview=function e(){var t=this;i(this,e),this.init=function(){t.addBodyPaddingToAccountForFloatingButton(),t.movePreviewElementToChildOfBody(),t.addEvents()},this.addBodyPaddingToAccountForFloatingButton=function(){if(t.elements.devPreviewFloatingButton&&t.elements.footer){var e=t.elements.devPreviewFloatingButton.offsetHeight,n=window.getComputedStyle(t.elements.footer,null).getPropertyValue("padding-bottom")||0;n=n.replace("px",""),n+=e,t.elements.footer.style.paddingBottom=n+"px"}},this.movePreviewElementToChildOfBody=function(){t.elements.body.appendChild(t.elements.devPreviewFullPage),t.elements.devPreviewFloatingButton&&t.elements.body.appendChild(t.elements.devPreviewFloatingButton)},this.addEvents=function(){t.elements.devPreviewFloatingButton.addEventListener("click",t.toggleFullPagePreview),(0,a.delegateEvent)(document,"click",t.selectors.devPreviewCloseButton,t.toggleFullPagePreview)},this.toggleFullPagePreview=function(){t.state.fullPagePreviewHidden=!t.state.fullPagePreviewHidden,(0,a.toggleClass)(t.elements.devPreviewFullPage,t.classnames.devPreviewHidden,t.state.fullPagePreviewHidden),(0,a.toggleClass)(t.elements.devPreviewFloatingButton,t.classnames.devPreviewHidden,!t.state.fullPagePreviewHidden),(0,a.toggleClass)(t.elements.body,t.classnames.devPreviewBodyOverflowHidden,!t.state.fullPagePreviewHidden)},this.classnames={devPreviewHidden:"dev-preview--hidden",devPreviewBodyOverflowHidden:"dev-preview__body-overflow-hidden"},this.selectors={devPreviewFullPage:".dev-preview--full-page",devPreviewFloatingButton:".dev-preview__floating-button",devPreviewCloseButton:".dev-preview__close-button",content:"#content",body:"body",footer:"#footer"},this.elements={body:document.querySelector(this.selectors.body),devPreviewFullPage:document.querySelector(this.selectors.devPreviewFullPage),devPreviewFloatingButton:document.querySelector(this.selectors.devPreviewFloatingButton),content:document.querySelector(this.selectors.content),footer:document.querySelector(this.selectors.footer)},this.state={fullPagePreviewHidden:!0},this.elements.body&&this.elements.devPreviewFullPage&&this.elements.content&&this.init()}},339:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.DevPreviewFullscreen=void 0;var r=n(46),a=(function(e){e&&e.__esModule}(r),n(4));t.DevPreviewFullscreen=function e(){var t=this;i(this,e),this.init=function(){t.setupState(),(0,a.delegateEvent)(document,"click",t.selectors.devPreviewFullscreenButton,t.onFullscreenPreviewClick)},this.setupState=function(){t.elements.previewElements.forEach(function(e){var n=e.querySelector(t.selectors.devPreviewFullscreenButton),i=e.querySelector(t.selectors.devPreviewExample),r=e.querySelector(t.selectors.devPreviewPismCode);t.state.previewElements.push({devPreviewElement:e,fullscreenButton:n,devPreviewExample:i,devPreviewPismCode:r,isFullscreen:!1});var a=t.state.previewElements.length-1;e&&e.setAttribute(t.attributes.stateItemId,a),n&&n.setAttribute(t.attributes.stateItemId,a)})},this.onFullscreenPreviewClick=function(e){if(e&&e.target){var n=e.target.getAttribute(t.attributes.stateItemId),i=t.state.previewElements[n];i&&(i.isFullscreen?(i.devPreviewElement.insertBefore(i.devPreviewExample,i.devPreviewPismCode),(0,a.toggleClass)(i.devPreviewExample,t.classnames.devPreviewExample.fullscreen,!1),(0,a.toggleClass)(t.elements.body,t.classnames.devPreview.overflowBodyHidden,!1),window.scrollTo(0,t.state.previousYOffset),t.state.previousYOffset=0):(t.state.previousYOffset=window.pageYOffset,t.elements.body.appendChild(i.devPreviewExample),(0,a.toggleClass)(i.devPreviewExample,t.classnames.devPreviewExample.fullscreen,!0),(0,a.toggleClass)(t.elements.body,t.classnames.devPreview.overflowBodyHidden,!0),console.log(t.state.previousYOffset)),i.isFullscreen=!i.isFullscreen,i.fullscreenButton.innerText=i.isFullscreen?t.i18n.hideFullscreenPreview:t.i18n.fullScreenPreview)}},this.classnames={devPreview:{overflowBodyHidden:"dev-preview__body-overflow-hidden"},devPreviewExample:{fullscreen:"dev-preview__example--fullscreen"}},this.selectors={devPreview:".dev-preview",devPreviewExample:".dev-preview__example",devPreviewFullscreenButton:".dev-preview__fullscreen-button",devPreviewPismCode:".dev-preview__prism-code",body:"body"},this.attributes={exampleId:"data-example-id",stateItemId:"data-state-item-id"},this.i18n={fullScreenPreview:"Fullscreen preview",hideFullscreenPreview:"Hide fullscreen"},this.elements={body:document.querySelector(this.selectors.body),previewElements:Array.from(document.querySelectorAll(this.selectors.devPreview))},this.state={previousYOffset:0,previewElements:[]},this.elements.previewElements&&Array.isArray(this.elements.previewElements)&&this.init()}},340:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initTextToSpeechToggle=void 0;var i=n(341);t.initTextToSpeechToggle=function(){var e=document.querySelector(".text-to-speech-toggle");e&&new i.TextToSpeechToggle(e)}},341:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.TextToSpeechToggle=void 0;var r=n(19),a=n(342),s=n(213);t.TextToSpeechToggle=function e(t){var n=this;i(this,e),this.setup=function(){return(0,r.addEventListenerToEl)(n.state.form,"change",n.formChangeHandler)},this.formChangeHandler=function(e){var t=e.target.value.toLowerCase();return t?"on"==t?n.enableReader():void n.disableReader():console.warn("Failed to read radio value")},this.enableReader=function(){return n.state.readerReference=new a.TextToSpeech},this.disableReader=function(){n.state.readerReference&&(delete n.state.readerReference,n.cleanReaderElements())},this.cleanReaderElements=function(){var e=document.querySelectorAll("."+s.TEXT_TO_SPEECH_CONFIG.classes.readerItem);e=Array.from(e),e.forEach(function(e){e.classList.remove(""+s.TEXT_TO_SPEECH_CONFIG.classes.readerItem),e.removeAttribute(""+s.TEXT_TO_SPEECH_CONFIG.dataAttributes.id),e.querySelector("."+s.TEXT_TO_SPEECH_CONFIG.classes.audioBtn).remove()})},t||console.warn("Failed to initialise text to speech toggle");var o=t.querySelector(".text-to-speech-toggle__form");o||console.warn("Text to speech toggle form not found"),this.state={form:o,readerReference:"",readerConfig:{}},this.setup()}},342:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.TextToSpeech=void 0;var r=n(19),a=n(213);t.TextToSpeech=function e(){var t=this;i(this,e),this.setup=function(){var e=document.querySelector("."+a.TEXT_TO_SPEECH_CONFIG.classes.wrapper);if(e){var n=Array.from(e.querySelectorAll(t.state.targets));n&&n.forEach(function(e,n){var i=void 0,r=void 0,s=void 0;i=e.innerText,r=t.createUtterance(i,n),s=t.createButton(),i&&r&&s&&(e.classList.add(""+a.TEXT_TO_SPEECH_CONFIG.classes.readerItem),e.setAttribute(a.TEXT_TO_SPEECH_CONFIG.dataAttributes.readerID,n),e.appendChild(t.createButton()),t.state.elements.push({id:n,element:e,isPlaying:!1,isHighlighted:!1,utterance:r}))})}},this.playAudioClickHandler=function(e){e.preventDefault(),t.state.synth.cancel();var n=(0,r.closestParentOfEl)(e.target,".text-to-speech__item").getAttribute(""+a.TEXT_TO_SPEECH_CONFIG.dataAttributes.readerID);if(!n)return console.warn("Failed to retrieve data content id attribute");t.state.synth.speak(t.state.elements[n].utterance)},this.createButton=function(){var e=document.createElement("button");return e.classList.add(""+a.TEXT_TO_SPEECH_CONFIG.classes.audioBtn),e.innerHTML=a.TEXT_TO_SPEECH_CONFIG.buttonInnerHtml,(0,r.addEventListenerToEl)(e,"click",t.playAudioClickHandler),e},this.createUtterance=function(e,n){var i=new SpeechSynthesisUtterance;return i.lang="en-uk",i.text=e,i.id=n,i.onstart=function(){t.state.current=t.state.elements[i.id],t.resetAll(),t.state.current.isPlaying=!0,t.state.current.isHighlighted=!0,t.state.current.element.classList.add(""+a.TEXT_TO_SPEECH_CONFIG.classes.readerItemHighlight),t.state.current.element.querySelector("."+a.TEXT_TO_SPEECH_CONFIG.classes.audioBtn).classList.add(""+a.TEXT_TO_SPEECH_CONFIG.classes.audioBtnPlaying)},i.onend=function(){t.resetAll(),t.state.current.element.classList.remove(""+a.TEXT_TO_SPEECH_CONFIG.classes.readerItemHighlight),t.state.current.element.querySelector("."+a.TEXT_TO_SPEECH_CONFIG.classes.audioBtn).classList.remove(""+a.TEXT_TO_SPEECH_CONFIG.classes.audioBtnPlaying),t.state.current={}},i},this.resetAll=function(){t.state.elements.map(function(e){e.isPlaying=!1,e.isHighlighted=!1})},this.state={synth:window.speechSynthesis,elements:[],current:{},targets:a.TEXT_TO_SPEECH_CONFIG.DOMTargets},this.setup()}},343:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initFontSizeToggle=void 0;var i=n(344);t.initFontSizeToggle=function(){var e=document.querySelector(".font-size-toggle");e&&new i.FontSizeToggle(e)}},344:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.FontSizeToggle=void 0;var r=n(19),a=n(345);t.FontSizeToggle=function e(t){var n=this;if(i(this,e),this.setup=function(){n.state.pageElements=n.getTargetDOMElements(),n.state.pageElements&&((0,r.addEventListenerToEl)(n.state.buttons.increaseButton,"click",n.increaseClickHandler),(0,r.addEventListenerToEl)(n.state.buttons.decreaseButton,"click",n.decreaseClickHandler),(0,r.addEventListenerToEl)(n.state.buttons.resetButton,"click",n.resetButtonClickHandler))},this.increaseClickHandler=function(e){e.preventDefault(),n.testRanges(n.state.currentSize+1)&&(n.state.currentSize+=1,n.updateDOMElements())},this.decreaseClickHandler=function(e){e.preventDefault(),n.testRanges(n.state.currentSize-1)&&(n.state.currentSize-=1,n.updateDOMElements(!1))},this.resetButtonClickHandler=function(e){e.preventDefault(),n.resetState(),n.convertToArray(n.state.pageElements).forEach(function(e){return n.removeAttribute(e,"style")})},this.testRanges=function(e){var t=!0;return e>n.state.maxSize?(n.disableButton(n.state.buttons.increaseButton),n.enableButton(n.state.buttons.decreaseButton),t=!1):e<n.state.minSize?(n.disableButton(n.state.buttons.decreaseButton),n.enableButton(n.state.buttons.increaseButton),t=!1):n.resetState(),t},this.disableButton=function(e){e.disabled=!0,e.classList.add("font-size-toggle__button--disabled")},this.enableButton=function(e){e.disabled=!1,e.classList.remove("font-size-toggle__button--disabled")},this.resetState=function(){n.enableButton(n.state.buttons.decreaseButton),n.enableButton(n.state.buttons.increaseButton)},this.updateDOMElements=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];n.convertToArray(n.state.pageElements).forEach(function(t){var i={fontSize:parseInt(n.getComputedProperty(t,"font-size"),10),lineHeight:parseInt(n.getComputedProperty(t,"line-height"))};t.style.fontSize=e?i.fontSize+1+"px":i.fontSize-1+"px"})},this.removeAttribute=function(e,t){return e.removeAttribute(t)},this.getComputedProperty=function(e,t){return window.getComputedStyle(e).getPropertyValue(t)},this.getTargetDOMElements=function(){return document.body.querySelectorAll(n.state.targets)},this.convertToArray=function(e){return Array.from(e)},t){var s=void 0,o=void 0,l=void 0;s=t.querySelector("."+a.FONT_SIZE_TOGGLE_CONFIG.classes.increaseBtn),o=t.querySelector("."+a.FONT_SIZE_TOGGLE_CONFIG.classes.decreaseBtn),l=t.querySelector("."+a.FONT_SIZE_TOGGLE_CONFIG.classes.resetBtn),this.state={currentSize:0,maxSize:a.FONT_SIZE_TOGGLE_CONFIG.maxSize,minSize:a.FONT_SIZE_TOGGLE_CONFIG.minSize,buttons:{increaseButton:s,decreaseButton:o,resetButton:l},pageElements:"",targets:a.FONT_SIZE_TOGGLE_CONFIG.DOMTargets},this.state.buttons.increaseButton&&this.state.buttons.decreaseButton&&this.state.buttons.resetButton&&this.setup()}}},345:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.FONT_SIZE_TOGGLE_CONFIG={classes:{increaseBtn:"font-size-toggle__button--increase",decreaseBtn:"font-size-toggle__button--decrease",resetBtn:"font-size-toggle__button--reset",hidden:"font-size-toggle__button--hidden"},maxSize:5,minSize:-2,dataAttributes:{type:"data-toggle-type"},DOMTargets:["h1","h2","h3","h4","p","li","td","th","thead","caption","legend","button","dd"]}},346:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initSpeechToText=void 0;var i=n(347);t.initSpeechToText=function(){if(window.webkitSpeechRecognition){var e=document.querySelectorAll(".search-bar__search-voice");e=Array.from(e),e&&e.length&&e.forEach(function(e){e.classList.add("search-bar__search-voice--is-supported"),new i.SpeechToText(e)})}}},347:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.SpeechToText=void 0;var r=n(19),a=n(348);t.SpeechToText=function e(t){var n=this;if(i(this,e),this.setup=function(){(0,r.addEventListenerToEl)(n.elements.recordButton,"click",n.listenBtnClickHandler),n.state.speechRecognition.onstart=n.isRecording,n.state.speechRecognition.onend=n.isStoppedRecording,n.state.speechRecognition.onresult=n.handleOnSpeechResult},this.listenBtnClickHandler=function(e){if(e.preventDefault(),n.state.isRecording)return n.state.speechRecognition.abort(),void n.isStoppedRecording();n.state.speechRecognition.start()},this.handleOnSpeechResult=function(e){var t=e.results[0][0].transcript;""!=n.elements.input.value.trim()&&(t=n.elements.input.value+" "+t),n.elements.input.value=t},this.isRecording=function(){n.state.isRecording=!0,n.elements.submitBtn.disabled=!0,n.elements.input.disabled=!0,n.elements.recordButton.innerHTML=a.SPEECH_TO_TEXT_CONFIG.content.recording},this.isStoppedRecording=function(){n.state.isRecording=!1,n.elements.submitBtn.disabled=!1,n.elements.input.disabled=!1,n.elements.recordButton.innerHTML=a.SPEECH_TO_TEXT_CONFIG.content.init},t){var s=(0,r.closestParentOfEl)(t,"."+a.SPEECH_TO_TEXT_CONFIG.classes.wrapper);this.elements={recordButton:t,wrapper:s,input:s.querySelector("."+a.SPEECH_TO_TEXT_CONFIG.classes.input),submitBtn:s.querySelector("."+a.SPEECH_TO_TEXT_CONFIG.classes.submitBtn)},this.state={speechRecognition:new webkitSpeechRecognition,isRecording:!1},this.elements.wrapper&&this.elements.input&&this.elements.submitBtn&&this.setup()}}},348:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SPEECH_TO_TEXT_CONFIG={classes:{wrapper:"search-bar__control-group",input:"search-bar__search-input",submitBtn:"search-bar__search-submit"},content:{init:"Start voice search",recording:"Cancel recording"}}},349:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initThemeToggle=void 0;var i=n(350);t.initThemeToggle=function(){var e=document.querySelector(".theme-toggle");e&&new i.ThemeToggle(e)}},350:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.ThemeToggle=void 0;var r=n(19);t.ThemeToggle=function e(t){var n=this;i(this,e),this.setup=function(){(0,r.addEventListenerToEl)(n.state.elements.form,"change",n.formChangeHandler)},this.formChangeHandler=function(e){e.preventDefault();var t=void 0,i=void 0;t=e.target.value,t=t.toLowerCase().split(" ").join("-"),t||console.warn("Failed to retreive radio value"),i=n.state.themes.get(t),i||console.warn("Failed to retrive new theme class"),i!=n.state.currentTheme&&n.setNewTheme(i)},this.setNewTheme=function(e){n.state.currentTheme&&document.body.classList.remove(n.state.currentTheme),n.state.currentTheme=e,document.body.classList.add(e)},t||console.warn("theme toggle wrapper failed to initialize.");var a=t.querySelector(".theme-toggle__form");if(a){var s=new Map;s.set("default",""),s.set("high-contrast-yellow","theme__high-contrast-yellow"),s.set("low-contrast-grey","theme__low-contrast-grey"),s.set("sepia","theme__sepia"),s.set("medium-contrast-yellow","theme__medium-contrast-yellow"),this.state={currentTheme:"",themes:s,elements:{form:a}},this.setup()}}},351:function(e,t){}},[329]);