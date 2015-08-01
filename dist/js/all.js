function DataCollection(t){this.data=t.data,this.accumulator=t.accumulator,this.pointer=0}function ItemCollection(){}function categoryCollection(){}function DataController(){this.data={},this.dataJoin={}}function _customDateString(t,e){t.toLocaleString();return t.toLocaleDateString()}function MyRouter(t){this.$el=$(void 0==t?"body":t),this.actions={},this.controllers={},this.tracker=[],this.init()}function ViewController(t){this.$container=$(t),this.defaultContent=""}DataCollection.prototype.addItem=function(t){var e=$.extend({id:++this.accumulator,update:Date.now(),date:Date.now()},t);return this.data.push(e),e.id},DataCollection.prototype.updateItem=function(t,e){var n=this.getItemById(t)[0],r=$.extend({update:Date.now()},e),i=$.extend(n,r);this.deleteItem(t),this.data.push(i)},DataCollection.prototype.deleteItem=function(t){var e=this.data;for(var n in e)if(e[n].id==t){e.splice(n,1);break}},DataCollection.prototype.getItemById=function(t){var e=this.data,n=[];for(var r in e)e[r].id==t&&n.push($.extend(!0,{},e[r]));return n},DataCollection.prototype.getItemsByProperty=function(t,e){var n=[],r=this.data;for(var i in r)r[i][t]==e&&n.push($.extend({},r[i]));return n},DataCollection.prototype.getAll=function(){return $.extend(!0,[],this.data)},DataCollection.prototype.getValueById=function(t,e){return this.getItemById(t)[0][e]},DataController.prototype.dataCollection=function(t,e){e instanceof DataCollection&&(this.data[t]=e,this.dataJoin[t]={})},DataController.prototype.addItem=function(t,e){return this.data[t].addItem(e)},DataController.prototype.updateItem=function(t,e,n){return this.data[t].updateItem(n)},DataController.prototype.deleteItem=function(t,e){return this.data[t].deleteItem(e)},DataController.prototype.getItemById=function(t,e){return this.data[t].getItemById(e)},DataController.prototype.getItemsByProperty=function(t,e,n){return this.data.name.getItemsByProperty(e,n)},DataController.prototype.record=function(){localStorage.setItem("pocketData",JSON.stringify(this.data))},DataController.prototype.addJoin=function(t,e){var n=t.split(".");this.dataJoin[n[0]][n[1]]=[].push(e)},DataController.prototype.generateOutput=function(t,e){var n=this.dataJoin[t];for(var r in n){var i=n[r].split("."),o=this.generateOutput(this.getItemsByProperty(i[0],i[1],e[r]));delete o[i[1]]}},DataController.prototype.outputAll=function(t){},DataController.prototype.outputItem=function(t){},DataController.prototype.outputGroup=function(t){};var demoData=[{id:"1",categoryId:"1",money:12345,date:"2015-07-21",description:"个人月收入"},{id:"2",categoryId:"2",money:1235,date:"2015-07-21",description:"出差车费"},{id:"3",categoryId:"3",money:1345,date:"2015-07-22",description:"淘宝购物"},{id:"4",categoryId:"4",money:2345,date:"2015-07-22",description:"酒店套房"}],categories=[{id:"1",categoryName:"income",categoryTitle:"收入",type:"income"},{id:"2",categoryName:"clothes",categoryTitle:"衣服",type:"payment"},{id:"3",categoryName:"eating",categoryTitle:"饮食",type:"payment"},{id:"4",categoryName:"house",categoryTitle:"住宿",type:"payment"},{id:"5",categoryName:"transport",categoryTitle:"交通",type:"payment"},{id:"6",categoryName:"shopping",categoryTitle:"购物",type:"payment"},{id:"7",categoryName:"others",categoryTitle:"其他",type:"payment"}];$().ready(function(){if(pocketData=new DataController,null!=localStorage.getItem("pocketData")){var t=JSON.parse(localStorage.getItem("pocketData"));pocketData.dataCollection("item",new DataCollection(t.item)),pocketData.dataCollection("category",new DataCollection(t.category))}else pocketData.dataCollection("item",new DataCollection({data:demoData,accumulator:demoData.length})),pocketData.dataCollection("category",new DataCollection({data:categories,accumulator:categories.length}))}),MyRouter.prototype.init=function(){var t=this;$(document).on("click",function(e){if($anchor="A"==e.target.tagName?$(e.target):$(e.target).parents("a"),0!=$anchor.length&&"#"==$anchor[0].hash.substr(0,1)){e.preventDefault();var n=$anchor[0].hash;t.load(n)}})},MyRouter.prototype.load=function(t){var e=this,n=/^^#\/(\w*):(\S*)/.exec(t),r=n[1],i=n[2],o=i,a="",s=i.search("\\?");-1!=s&&(a=i.substr(s),o=i.substr(0,s));var c=e.actions[r][o];void 0!==c.templateURL?e.$el.load(c.templateURL,function(){void 0!=c.controller&&void 0!=e.controllers[c.controller]&&e.controllers[c.controller].apply(e,[o,a])}):void 0!=c.controller&&void 0!=e.controllers[c.controller]&&e.controllers[c.controller].apply(e,[o,a])},MyRouter.prototype.addAction=function(t,e,n){return void 0==this.actions[t]&&(this.actions[t]={}),this.actions[t][e]=n,this},MyRouter.prototype.controller=function(t,e){return this.controllers[t]=e,this},function(t){function e(t,e,n,r){return Math.abs(t-e)>=Math.abs(n-r)?t-e>0?"Left":"Right":n-r>0?"Up":"Down"}function n(){l=null,p.last&&(p.el.trigger("longTap"),p={})}function r(){l&&clearTimeout(l),l=null}function i(){s&&clearTimeout(s),c&&clearTimeout(c),u&&clearTimeout(u),l&&clearTimeout(l),s=c=u=l=null,p={}}function o(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function a(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var s,c,u,l,f,p={},h=750;t(document).ready(function(){var d,m,g,y,v=0,w=0;"MSGesture"in window&&(f=new MSGesture,f.target=document.body),t(document).bind("MSGestureEnd",function(t){var e=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;e&&(p.el.trigger("swipe"),p.el.trigger("swipe"+e))}).on("touchstart MSPointerDown pointerdown",function(e){(!(y=a(e,"down"))||o(e))&&(g=y?e:e.touches[0],e.touches&&1===e.touches.length&&p.x2&&(p.x2=void 0,p.y2=void 0),d=Date.now(),m=d-(p.last||d),p.el=t("tagName"in g.target?g.target:g.target.parentNode),s&&clearTimeout(s),p.x1=g.pageX,p.y1=g.pageY,m>0&&250>=m&&(p.isDoubleTap=!0),p.last=d,l=setTimeout(n,h),f&&y&&f.addPointer(e.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(y=a(t,"move"))||o(t))&&(g=y?t:t.touches[0],r(),p.x2=g.pageX,p.y2=g.pageY,v+=Math.abs(p.x1-p.x2),w+=Math.abs(p.y1-p.y2))}).on("touchend MSPointerUp pointerup",function(n){(!(y=a(n,"up"))||o(n))&&(r(),p.x2&&Math.abs(p.x1-p.x2)>30||p.y2&&Math.abs(p.y1-p.y2)>30?u=setTimeout(function(){p.el.trigger("swipe"),p.el.trigger("swipe"+e(p.x1,p.x2,p.y1,p.y2)),p={}},0):"last"in p&&(30>v&&30>w?c=setTimeout(function(){var e=t.Event("tap");e.cancelTouch=i,p.el.trigger(e),p.isDoubleTap?(p.el&&p.el.trigger("doubleTap"),p={}):s=setTimeout(function(){s=null,p.el&&p.el.trigger("singleTap"),p={}},250)},0):p={}),v=w=0)}).on("touchcancel MSPointerCancel pointercancel",i),t(window).on("scroll",i)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(Zepto),ViewController.prototype.generateListView=function(t){if(0==t)return"";$list=$('<div class="list">'),htmlCode=[];for(var e in t){itemdata=t[e];var n='<div class="list-item">';n+='<div class="item '+itemdata.categoryName+'">',n+='<span class="item-category"><i class="category-icon category-'+itemdata.categoryName+'"></i>'+itemdata.categoryTitle+"</span>",n+='<span class="item-money '+itemdata.type+'">'+itemdata.money+"</span>",n+='<span class="item-date">'+itemdata.date+"</span>",n+="</div>",n+='<div class="item-controls">',n+='<a href="#/edit.html?id='+itemdata.id+'" class="item-edit" data-id="'+itemdata.id+'"><i class="iconfont icon-bianji"></i></a>',n+='<a href="#/action:delete?id='+itemdata.id+'" class="item-delete" data-id="'+itemdata.id+'"><i class="iconfont icon-jian"></i></a>',n+="</div>",n+="</div>",htmlCode.push(n)}return $list.html(htmlCode.join(" ")),$list},ViewController.prototype.updateView=function(t,e){void 0==e&&(e=this.$container),$(e).html(0==t?this.defaultContent:t)},ViewController.prototype.setDefaultContent=function(t){this.defaultContent=t};var Zepto=function(){function t(t){return null==t?String(t):J[H.call(t)]||"object"}function e(e){return"function"==t(e)}function n(t){return null!=t&&t==t.window}function r(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function i(e){return"object"==t(e)}function o(t){return i(t)&&!n(t)&&Object.getPrototypeOf(t)==Object.prototype}function a(t){return"number"==typeof t.length}function s(t){return P.call(t,function(t){return null!=t})}function c(t){return t.length>0?T.fn.concat.apply([],t):t}function u(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(t){return t in O?O[t]:O[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function f(t,e){return"number"!=typeof e||M[u(t)]?e:e+"px"}function p(t){var e,n;return I[t]||(e=$.createElement(t),$.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),I[t]=n),I[t]}function h(t){return"children"in t?N.call(t.children):T.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function d(t,e,n){for(C in e)n&&(o(e[C])||W(e[C]))?(o(e[C])&&!o(t[C])&&(t[C]={}),W(e[C])&&!W(t[C])&&(t[C]=[]),d(t[C],e[C],n)):e[C]!==b&&(t[C]=e[C])}function m(t,e){return null==e?T(t):T(t).filter(e)}function g(t,n,r,i){return e(n)?n.call(t,r,i):n}function y(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function v(t,e){var n=t.className||"",r=n&&n.baseVal!==b;return e===b?r?n.baseVal:n:void(r?n.baseVal=e:t.className=e)}function w(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?T.parseJSON(t):t):t}catch(e){return t}}function x(t,e){e(t);for(var n=0,r=t.childNodes.length;r>n;n++)x(t.childNodes[n],e)}var b,C,T,E,D,S,j=[],N=j.slice,P=j.filter,$=window.document,I={},O={},M={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},L=/^\s*<(\w+|!)[^>]*>/,A=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,R=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,k=/^(?:body|html)$/i,_=/([A-Z])/g,Z=["val","css","html","text","data","width","height","offset"],B=["after","prepend","before","append"],V=$.createElement("table"),z=$.createElement("tr"),F={tr:$.createElement("tbody"),tbody:V,thead:V,tfoot:V,td:z,th:z,"*":$.createElement("div")},U=/complete|loaded|interactive/,q=/^[\w-]*$/,J={},H=J.toString,X={},Y=$.createElement("div"),G={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},W=Array.isArray||function(t){return t instanceof Array};return X.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var r,i=t.parentNode,o=!i;return o&&(i=Y).appendChild(t),r=~X.qsa(i,e).indexOf(t),o&&Y.removeChild(t),r},D=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},S=function(t){return P.call(t,function(e,n){return t.indexOf(e)==n})},X.fragment=function(t,e,n){var r,i,a;return A.test(t)&&(r=T($.createElement(RegExp.$1))),r||(t.replace&&(t=t.replace(R,"<$1></$2>")),e===b&&(e=L.test(t)&&RegExp.$1),e in F||(e="*"),a=F[e],a.innerHTML=""+t,r=T.each(N.call(a.childNodes),function(){a.removeChild(this)})),o(n)&&(i=T(r),T.each(n,function(t,e){Z.indexOf(t)>-1?i[t](e):i.attr(t,e)})),r},X.Z=function(t,e){return t=t||[],t.__proto__=T.fn,t.selector=e||"",t},X.isZ=function(t){return t instanceof X.Z},X.init=function(t,n){var r;if(!t)return X.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&L.test(t))r=X.fragment(t,RegExp.$1,n),t=null;else{if(n!==b)return T(n).find(t);r=X.qsa($,t)}else{if(e(t))return T($).ready(t);if(X.isZ(t))return t;if(W(t))r=s(t);else if(i(t))r=[t],t=null;else if(L.test(t))r=X.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==b)return T(n).find(t);r=X.qsa($,t)}}return X.Z(r,t)},T=function(t,e){return X.init(t,e)},T.extend=function(t){var e,n=N.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){d(t,n,e)}),t},X.qsa=function(t,e){var n,i="#"==e[0],o=!i&&"."==e[0],a=i||o?e.slice(1):e,s=q.test(a);return r(t)&&s&&i?(n=t.getElementById(a))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:N.call(s&&!i?o?t.getElementsByClassName(a):t.getElementsByTagName(e):t.querySelectorAll(e))},T.contains=$.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},T.type=t,T.isFunction=e,T.isWindow=n,T.isArray=W,T.isPlainObject=o,T.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},T.inArray=function(t,e,n){return j.indexOf.call(e,t,n)},T.camelCase=D,T.trim=function(t){return null==t?"":String.prototype.trim.call(t)},T.uuid=0,T.support={},T.expr={},T.map=function(t,e){var n,r,i,o=[];if(a(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&o.push(n);else for(i in t)n=e(t[i],i),null!=n&&o.push(n);return c(o)},T.each=function(t,e){var n,r;if(a(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(r in t)if(e.call(t[r],r,t[r])===!1)return t;return t},T.grep=function(t,e){return P.call(t,e)},window.JSON&&(T.parseJSON=JSON.parse),T.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){J["[object "+e+"]"]=e.toLowerCase()}),T.fn={forEach:j.forEach,reduce:j.reduce,push:j.push,sort:j.sort,indexOf:j.indexOf,concat:j.concat,map:function(t){return T(T.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return T(N.apply(this,arguments))},ready:function(t){return U.test($.readyState)&&$.body?t(T):$.addEventListener("DOMContentLoaded",function(){t(T)},!1),this},get:function(t){return t===b?N.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return j.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return e(t)?this.not(this.not(t)):T(P.call(this,function(e){return X.matches(e,t)}))},add:function(t,e){return T(S(this.concat(T(t,e))))},is:function(t){return this.length>0&&X.matches(this[0],t)},not:function(t){var n=[];if(e(t)&&t.call!==b)this.each(function(e){t.call(this,e)||n.push(this)});else{var r="string"==typeof t?this.filter(t):a(t)&&e(t.item)?N.call(t):T(t);this.forEach(function(t){r.indexOf(t)<0&&n.push(t)})}return T(n)},has:function(t){return this.filter(function(){return i(t)?T.contains(this,t):T(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!i(t)?t:T(t)},last:function(){var t=this[this.length-1];return t&&!i(t)?t:T(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?T(t).filter(function(){var t=this;return j.some.call(n,function(e){return T.contains(e,t)})}):1==this.length?T(X.qsa(this[0],t)):this.map(function(){return X.qsa(this,t)}):T()},closest:function(t,e){var n=this[0],i=!1;for("object"==typeof t&&(i=T(t));n&&!(i?i.indexOf(n)>=0:X.matches(n,t));)n=n!==e&&!r(n)&&n.parentNode;return T(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=T.map(n,function(t){return(t=t.parentNode)&&!r(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return m(e,t)},parent:function(t){return m(S(this.pluck("parentNode")),t)},children:function(t){return m(this.map(function(){return h(this)}),t)},contents:function(){return this.map(function(){return N.call(this.childNodes)})},siblings:function(t){return m(this.map(function(t,e){return P.call(h(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return T.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=p(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var n=e(t);if(this[0]&&!n)var r=T(t).get(0),i=r.parentNode||this.length>1;return this.each(function(e){T(this).wrapAll(n?t.call(this,e):i?r.cloneNode(!0):r)})},wrapAll:function(t){if(this[0]){T(this[0]).before(t=T(t));for(var e;(e=t.children()).length;)t=e.first();T(t).append(this)}return this},wrapInner:function(t){var n=e(t);return this.each(function(e){var r=T(this),i=r.contents(),o=n?t.call(this,e):t;i.length?i.wrapAll(o):r.append(o)})},unwrap:function(){return this.parent().each(function(){T(this).replaceWith(T(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var e=T(this);(t===b?"none"==e.css("display"):t)?e.show():e.hide()})},prev:function(t){return T(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return T(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;T(this).empty().append(g(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=g(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(t,e){var n;return"string"!=typeof t||1 in arguments?this.each(function(n){if(1===this.nodeType)if(i(t))for(C in t)y(this,C,t[C]);else y(this,t,g(this,e,n,this.getAttribute(t)))}):this.length&&1===this[0].nodeType?!(n=this[0].getAttribute(t))&&t in this[0]?this[0][t]:n:b},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){y(this,t)},this)})},prop:function(t,e){return t=G[t]||t,1 in arguments?this.each(function(n){this[t]=g(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(t,e){var n="data-"+t.replace(_,"-$1").toLowerCase(),r=1 in arguments?this.attr(n,e):this.attr(n);return null!==r?w(r):b},val:function(t){return 0 in arguments?this.each(function(e){this.value=g(this,t,e,this.value)}):this[0]&&(this[0].multiple?T(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var n=T(this),r=g(this,t,e,n.offset()),i=n.offsetParent().offset(),o={top:r.top-i.top,left:r.left-i.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(e,n){if(arguments.length<2){var r,i=this[0];if(!i)return;if(r=getComputedStyle(i,""),"string"==typeof e)return i.style[D(e)]||r.getPropertyValue(e);if(W(e)){var o={};return T.each(e,function(t,e){o[e]=i.style[D(e)]||r.getPropertyValue(e)}),o}}var a="";if("string"==t(e))n||0===n?a=u(e)+":"+f(e,n):this.each(function(){this.style.removeProperty(u(e))});else for(C in e)e[C]||0===e[C]?a+=u(C)+":"+f(C,e[C])+";":this.each(function(){this.style.removeProperty(u(C))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(T(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?j.some.call(this,function(t){return this.test(v(t))},l(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){E=[];var n=v(this),r=g(this,t,e,n);r.split(/\s+/g).forEach(function(t){T(this).hasClass(t)||E.push(t)},this),E.length&&v(this,n+(n?" ":"")+E.join(" "))}}):this},removeClass:function(t){return this.each(function(e){if("className"in this){if(t===b)return v(this,"");E=v(this),g(this,t,e,E).split(/\s+/g).forEach(function(t){E=E.replace(l(t)," ")}),v(this,E.trim())}})},toggleClass:function(t,e){return t?this.each(function(n){var r=T(this),i=g(this,t,n,v(this));i.split(/\s+/g).forEach(function(t){(e===b?!r.hasClass(t):e)?r.addClass(t):r.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return t===b?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return t===b?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),r=k.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(T(t).css("margin-top"))||0,n.left-=parseFloat(T(t).css("margin-left"))||0,r.top+=parseFloat(T(e[0]).css("border-top-width"))||0,r.left+=parseFloat(T(e[0]).css("border-left-width"))||0,{top:n.top-r.top,left:n.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||$.body;t&&!k.test(t.nodeName)&&"static"==T(t).css("position");)t=t.offsetParent;return t})}},T.fn.detach=T.fn.remove,["width","height"].forEach(function(t){var e=t.replace(/./,function(t){return t[0].toUpperCase()});T.fn[t]=function(i){var o,a=this[0];return i===b?n(a)?a["inner"+e]:r(a)?a.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){a=T(this),a.css(t,g(this,i,e,a[t]()))})}}),B.forEach(function(e,n){var r=n%2;T.fn[e]=function(){var e,i,o=T.map(arguments,function(n){return e=t(n),"object"==e||"array"==e||null==n?n:X.fragment(n)}),a=this.length>1;return o.length<1?this:this.each(function(t,e){i=r?e:e.parentNode,e=0==n?e.nextSibling:1==n?e.firstChild:2==n?e:null;var s=T.contains($.documentElement,i);o.forEach(function(t){if(a)t=t.cloneNode(!0);else if(!i)return T(t).remove();i.insertBefore(t,e),s&&x(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},T.fn[r?e+"To":"insert"+(n?"Before":"After")]=function(t){return T(t)[e](this),this}}),X.Z.prototype=T.fn,X.uniq=S,X.deserializeValue=w,T.zepto=X,T}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function e(t){return t._zid||(t._zid=p++)}function n(t,n,o,a){if(n=r(n),n.ns)var s=i(n.ns);return(g[e(t)]||[]).filter(function(t){return!(!t||n.e&&t.e!=n.e||n.ns&&!s.test(t.ns)||o&&e(t.fn)!==e(o)||a&&t.sel!=a)})}function r(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function i(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function o(t,e){return t.del&&!v&&t.e in w||!!e}function a(t){return x[t]||v&&w[t]||t}function s(n,i,s,c,l,p,h){var d=e(n),m=g[d]||(g[d]=[]);i.split(/\s/).forEach(function(e){if("ready"==e)return t(document).ready(s);var i=r(e);i.fn=s,i.sel=l,i.e in x&&(s=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?i.fn.apply(this,arguments):void 0}),i.del=p;var d=p||s;i.proxy=function(t){if(t=u(t),!t.isImmediatePropagationStopped()){t.data=c;var e=d.apply(n,t._args==f?[t]:[t].concat(t._args));return e===!1&&(t.preventDefault(),t.stopPropagation()),e}},i.i=m.length,m.push(i),"addEventListener"in n&&n.addEventListener(a(i.e),i.proxy,o(i,h))})}function c(t,r,i,s,c){var u=e(t);(r||"").split(/\s/).forEach(function(e){n(t,e,i,s).forEach(function(e){delete g[u][e.i],"removeEventListener"in t&&t.removeEventListener(a(e.e),e.proxy,o(e,c))})})}function u(e,n){return(n||!e.isDefaultPrevented)&&(n||(n=e),t.each(E,function(t,r){var i=n[t];e[t]=function(){return this[r]=b,i&&i.apply(n,arguments)},e[r]=C}),(n.defaultPrevented!==f?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(e.isDefaultPrevented=b)),e}function l(t){var e,n={originalEvent:t};for(e in t)T.test(e)||t[e]===f||(n[e]=t[e]);return u(n,t)}var f,p=1,h=Array.prototype.slice,d=t.isFunction,m=function(t){return"string"==typeof t},g={},y={},v="onfocusin"in window,w={focus:"focusin",blur:"focusout"},x={mouseenter:"mouseover",mouseleave:"mouseout"};y.click=y.mousedown=y.mouseup=y.mousemove="MouseEvents",t.event={add:s,remove:c},t.proxy=function(n,r){var i=2 in arguments&&h.call(arguments,2);if(d(n)){var o=function(){return n.apply(r,i?i.concat(h.call(arguments)):arguments)};return o._zid=e(n),o}if(m(r))return i?(i.unshift(n[r],n),t.proxy.apply(null,i)):t.proxy(n[r],n);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,r){return this.on(t,e,n,r,1)};var b=function(){return!0},C=function(){return!1},T=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,n,r,i,o){var a,u,p=this;return e&&!m(e)?(t.each(e,function(t,e){p.on(t,n,r,e,o)}),p):(m(n)||d(i)||i===!1||(i=r,r=n,n=f),(d(r)||r===!1)&&(i=r,r=f),i===!1&&(i=C),p.each(function(f,p){o&&(a=function(t){return c(p,t.type,i),i.apply(this,arguments)}),n&&(u=function(e){var r,o=t(e.target).closest(n,p).get(0);return o&&o!==p?(r=t.extend(l(e),{currentTarget:o,liveFired:p}),(a||i).apply(o,[r].concat(h.call(arguments,1)))):void 0}),s(p,e,i,r,n,u||a)}))},t.fn.off=function(e,n,r){var i=this;return e&&!m(e)?(t.each(e,function(t,e){i.off(t,n,e)}),i):(m(n)||d(r)||r===!1||(r=n,n=f),r===!1&&(r=C),i.each(function(){c(this,e,r,n)}))},t.fn.trigger=function(e,n){return e=m(e)||t.isPlainObject(e)?t.Event(e):u(e),e._args=n,this.each(function(){e.type in w&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,r){var i,o;return this.each(function(a,s){i=l(m(e)?t.Event(e):e),i._args=r,i.target=s,t.each(n(s,e.type||e),function(t,e){return o=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),o},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){m(t)||(e=t,t=e.type);var n=document.createEvent(y[t]||"Events"),r=!0;if(e)for(var i in e)"bubbles"==i?r=!!e[i]:n[i]=e[i];return n.initEvent(t,r,!0),u(n)}}(Zepto),function(t){function e(e,n,r){var i=t.Event(n);return t(e).trigger(i,r),!i.isDefaultPrevented()}function n(t,n,r,i){return t.global?e(n||v,r,i):void 0}function r(e){e.global&&0===t.active++&&n(e,null,"ajaxStart")}function i(e){e.global&&!--t.active&&n(e,null,"ajaxStop")}function o(t,e){var r=e.context;return e.beforeSend.call(r,t,e)===!1||n(e,r,"ajaxBeforeSend",[t,e])===!1?!1:void n(e,r,"ajaxSend",[t,e])}function a(t,e,r,i){var o=r.context,a="success";r.success.call(o,t,a,e),i&&i.resolveWith(o,[t,a,e]),n(r,o,"ajaxSuccess",[e,r,t]),c(a,e,r)}function s(t,e,r,i,o){var a=i.context;i.error.call(a,r,e,t),o&&o.rejectWith(a,[r,e,t]),n(i,a,"ajaxError",[r,i,t||e]),c(e,r,i)}function c(t,e,r){var o=r.context;r.complete.call(o,e,t),n(r,o,"ajaxComplete",[e,r]),i(r)}function u(){}function l(t){return t&&(t=t.split(";",2)[0]),t&&(t==T?"html":t==C?"json":x.test(t)?"script":b.test(t)&&"xml")||"text"}function f(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function p(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=f(e.url,e.data),e.data=void 0)}function h(e,n,r,i){return t.isFunction(n)&&(i=r,r=n,n=void 0),t.isFunction(r)||(i=r,r=void 0),{url:e,data:n,success:r,dataType:i}}function d(e,n,r,i){var o,a=t.isArray(n),s=t.isPlainObject(n);t.each(n,function(n,c){o=t.type(c),i&&(n=r?i:i+"["+(s||"object"==o||"array"==o?n:"")+"]"),!i&&a?e.add(c.name,c.value):"array"==o||!r&&"object"==o?d(e,c,r,n):e.add(n,c)})}var m,g,y=0,v=window.document,w=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,x=/^(?:text|application)\/javascript/i,b=/^(?:text|application)\/xml/i,C="application/json",T="text/html",E=/^\s*$/,D=v.createElement("a");D.href=window.location.href,t.active=0,t.ajaxJSONP=function(e,n){if(!("type"in e))return t.ajax(e);var r,i,c=e.jsonpCallback,u=(t.isFunction(c)?c():c)||"jsonp"+ ++y,l=v.createElement("script"),f=window[u],p=function(e){t(l).triggerHandler("error",e||"abort")},h={abort:p};return n&&n.promise(h),t(l).on("load error",function(o,c){clearTimeout(i),t(l).off().remove(),"error"!=o.type&&r?a(r[0],h,e,n):s(null,c||"error",h,e,n),window[u]=f,r&&t.isFunction(f)&&f(r[0]),f=r=void 0}),o(h,e)===!1?(p("abort"),h):(window[u]=function(){r=arguments},l.src=e.url.replace(/\?(.+)=\?/,"?$1="+u),v.head.appendChild(l),e.timeout>0&&(i=setTimeout(function(){p("timeout")},e.timeout)),h)},t.ajaxSettings={type:"GET",beforeSend:u,success:u,error:u,complete:u,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:C,xml:"application/xml, text/xml",html:T,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n,i=t.extend({},e||{}),c=t.Deferred&&t.Deferred();for(m in t.ajaxSettings)void 0===i[m]&&(i[m]=t.ajaxSettings[m]);r(i),i.crossDomain||(n=v.createElement("a"),n.href=i.url,n.href=n.href,i.crossDomain=D.protocol+"//"+D.host!=n.protocol+"//"+n.host),i.url||(i.url=window.location.toString()),p(i);var h=i.dataType,d=/\?.+=\?/.test(i.url);if(d&&(h="jsonp"),i.cache!==!1&&(e&&e.cache===!0||"script"!=h&&"jsonp"!=h)||(i.url=f(i.url,"_="+Date.now())),"jsonp"==h)return d||(i.url=f(i.url,i.jsonp?i.jsonp+"=?":i.jsonp===!1?"":"callback=?")),t.ajaxJSONP(i,c);var y,w=i.accepts[h],x={},b=function(t,e){x[t.toLowerCase()]=[t,e]},C=/^([\w-]+:)\/\//.test(i.url)?RegExp.$1:window.location.protocol,T=i.xhr(),S=T.setRequestHeader;if(c&&c.promise(T),i.crossDomain||b("X-Requested-With","XMLHttpRequest"),b("Accept",w||"*/*"),(w=i.mimeType||w)&&(w.indexOf(",")>-1&&(w=w.split(",",2)[0]),T.overrideMimeType&&T.overrideMimeType(w)),(i.contentType||i.contentType!==!1&&i.data&&"GET"!=i.type.toUpperCase())&&b("Content-Type",i.contentType||"application/x-www-form-urlencoded"),i.headers)for(g in i.headers)b(g,i.headers[g]);if(T.setRequestHeader=b,T.onreadystatechange=function(){if(4==T.readyState){T.onreadystatechange=u,clearTimeout(y);var e,n=!1;if(T.status>=200&&T.status<300||304==T.status||0==T.status&&"file:"==C){h=h||l(i.mimeType||T.getResponseHeader("content-type")),e=T.responseText;try{"script"==h?(1,eval)(e):"xml"==h?e=T.responseXML:"json"==h&&(e=E.test(e)?null:t.parseJSON(e))}catch(r){n=r}n?s(n,"parsererror",T,i,c):a(e,T,i,c)}else s(T.statusText||null,T.status?"error":"abort",T,i,c)}},o(T,i)===!1)return T.abort(),s(null,"abort",T,i,c),T;if(i.xhrFields)for(g in i.xhrFields)T[g]=i.xhrFields[g];var j="async"in i?i.async:!0;T.open(i.type,i.url,j,i.username,i.password);for(g in x)S.apply(T,x[g]);return i.timeout>0&&(y=setTimeout(function(){T.onreadystatechange=u,T.abort(),s(null,"timeout",T,i,c)},i.timeout)),T.send(i.data?i.data:null),T},t.get=function(){return t.ajax(h.apply(null,arguments))},t.post=function(){var e=h.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=h.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,r){if(!this.length)return this;var i,o=this,a=e.split(/\s/),s=h(e,n,r),c=s.success;return a.length>1&&(s.url=a[0],i=a[1]),s.success=function(e){o.html(i?t("<div>").html(e.replace(w,"")).find(i):e),c&&c.apply(o,arguments)},t.ajax(s),this};var S=encodeURIComponent;t.param=function(e,n){var r=[];return r.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(S(e)+"="+S(n))},d(r,e,n),r.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var e,n,r=[],i=function(t){return t.forEach?t.forEach(i):void r.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(r,o){
n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&i(t(o).val())}),r},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);