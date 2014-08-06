/*@author Mingli Guo (guomilo@gmail.com)
 * @Date 2014-03-12 
 */
define("src/lib/animate",["../tools/timer","../tools/util","../tools/observer","../tools/requestAnimationFrame","./core","../tools/easing"],function(a){function b(){this.timer=new c;var a=this;this.timer.addHandler(function(){for(var b,c=0;b=a.animates[c];c++)b.frame()}),this.animates=[]}var c=a("../tools/timer"),d=a("./core"),e=a("../tools/util");return b.prototype=function(){var a={from:{},to:{},easing:"",delay:0,duration:1e3};return{create:function(b,c,f){var g=e.extend(a,b),h=new d(g.duration,g.fps);return h.from(g.from),h.to(g.to),h.easing(g.easing),h.delay(g.delay),e.isFunction(c)&&h.onstep(c),e.isFunction(f)&&h.oncompleted(f),this.animates.push(h),h},start:function(){this.timer.start()},stop:function(){this.timer.stop()}}}(),b}),define("src/tools/timer",["src/tools/util","src/tools/observer","src/tools/requestAnimationFrame"],function(a){function b(){this.interval=void 0,this._handler=new d(this)}var c=a("src/tools/util"),d=a("src/tools/observer");return a("src/tools/requestAnimationFrame"),b.prototype={addHandler:function(a,b){c.isUndefined(b)||(a=c.bind(a,b)),this._handler.attach("timer",a)},start:function(){var a=this;!function(){a.interval=window.requestAnimationFrame(arguments.callee),a._handler.notifyByKey("timer")}()},stop:function(){window.cancelAnimationFrame(this.interval)}},b}),define("src/tools/util",[],function(){function a(a){var b=typeof a;return"object"==b?(b=Object.prototype.toString.call(a),b.replace(/^\[object\s*/gi,"").replace(/\]$/,"").toLowerCase()):b.toLocaleLowerCase()}function b(b){return"number"==a(b)}function c(b){return"boolean"==a(b)}function d(b){return"function"==a(b)}function e(b){var c=a(b);return"undefined"==c||"null"==c}function f(b){return"array"==a(b)}function g(a){var b;for(b in a)return!1;return!0}function h(b){return"object"==typeof b&&"object"==a(b)}function i(b){return"string"==a(b)}function j(b){return k(b)&&"htmlcanvaselement"==a(b)}function k(b){return a(b).search(/^html[a-z]*?element$/)>=0}function l(b){return a(b).search(/^svg[a-z]*?element$/)>=0}function m(b){return a(b).search(/^svgsvgelement$/)>=0}function n(b){var c,d=Array.prototype.slice.call(arguments,1);if("undefined"!=a(d)&&0!=d.length){"create"in Object||(Object.create=function(a){function b(){}return b.prototype=a,new b});for(var e,f=0;e=d[f];f++){c=Object.create(e.prototype),c.constructor=b;for(var g in c)b.prototype[g]=c[g]}}}function o(a){var b,c,d={"[object Function]":1,"[object RegExp]":1,"[object Date]":1,"[object Error]":1,"[object CanvasGradient]":1},e=a;if(!a||a instanceof Number||a instanceof String||a instanceof Boolean)return e;if(a instanceof Array){e=[];var f=0;for(b=0,c=a.length;c>b;b++)e[f++]=this.clone(a[b])}else if("object"==typeof a){if(d[Object.prototype.toString.call(a)]||a.__nonRecursion)return e;e={};for(b in a)a.hasOwnProperty(b)&&(e[b]=this.clone(a[b]))}return e}function p(b,c,d){for(var c,e,b=arguments[0]||{},g=1,h=arguments.length;h>g;g++)if(null!=(c=arguments[g]))for(e in c)if(d&&!f(c[e])&&"object"==a(c[e]))b[e]=arguments.callee(b[e],c[e]);else if(d&&f(c[e]))if(e in b)if(f(b[e]))b[e]=b[e].concat(c[e]);else{var i=[];b[e]=i.concat(b[e]).concat(c[e])}else b[e]=c[e];else b[e]=d&&f(b[e])?b[e].concat(c[e]):c[e];return b}function q(a,b){return d(a)&&!e(b)?a.bind(b):a}function r(){function a(){return(65536*(1+Math.random())|0).toString(16).substring(1)}return(a()+a()+"-"+a()+"-4"+a().substr(0,3)+"-"+a()+"-"+a()+a()+a()).toLowerCase()}var s=function(){return window.getComputedStyle?function(a){return k(a)?window.getComputedStyle(a):l(a)?a:a.style||a}:function(a){return k(a)?a.currentStyle:l(a)?a:a.style||a}}(),t=function(){return"createEvent"in document?function(a,b,c){var d=document.createEvent("Event");d.initEvent(a,!0,!0);for(var e in c)d[e]=c[e];b.dispatchEvent(d)}:function(a,b,c){var d=document.createEventObject();for(var e in c)d[e]=c[e];b.fireEvent(a,d)}}();return"bind"in Function||(Function.prototype.bind=function(){var a=Array.prototype.slice.call(arguments),b=a.shift(),c=this;return function(){return c.apply(b,a.concat(Array.prototype.slice.call(arguments)))}}),{getType:a,isFunction:d,isString:i,isNumber:b,isUndefined:e,isObject:h,isArray:f,isBool:c,isEmptyOrNullObject:g,isCanvas:j,isHtmlElement:k,isSvgElement:l,isSvg:m,getStyles:s,inheritPrototype:n,clone:o,extend:p,bind:q,newId:r,fireCustomEvent:t}}),define("src/tools/observer",["src/tools/util"],function(a){var b,c=a("src/tools/util");return b=function(a){this._sender=a,this._listeners={}},b.prototype={attach:function(a,b){c.isUndefined(a)||c.isFunction(b)&&(c.isUndefined(this._listeners[a])&&(this._listeners[a]=[]),this._listeners[a].push(b))},notify:function(){var a=this._listeners,b=Array.prototype.slice.call(arguments);for(var c in a)this.notifyByKey.apply(this,Array.prototype.concat([c],b))},notifyByKey:function(a){if(!c.isUndefined(a)){var b=this._listeners;if(!c.isUndefined(b[a]))for(var d,e=0;d=b[a][e];e++)d.apply(this._sender,Array.prototype.slice.call(arguments,1))}},remove:function(a,b){c.isUndefined(a)||(c.isUndefined(b)?delete this._listeners[a]:this._listeners[a].splice(b,1))},getHandlerByKey:function(a){if(c.isUndefined(a))return void 0;var b=this._listeners;return c.isUndefined(b[a])?void 0:b[a]},clear:function(){this._listeners={}}},b}),define("src/tools/requestAnimationFrame",[],function(){for(var a,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){a=setTimeout(b,16)}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}),define("src/lib/core",["src/tools/util","src/tools/observer","src/tools/easing"],function(a){function b(a,g){function h(a){return c.isString(a)&&a in e||(a="linear"),c.bind(e[a],e)}function i(a){_animateState=a}function j(){var a,b,d=Date.now(),e=p,g={};if(v&&this.getStates()!=f.STOP&&(a=e-n,d-q>=m())){if(e>=n){for(b in x)startValue=w[b]||0,endValue=Number(x[b]),c.isNumber(endValue)||(endValue=startValue),g[b]=t(n,startValue,endValue-startValue,e);n++,i(f.RUNNING),u.notifyByKey("frame",g)}else v=!1,n=0,i(f.COMPLETED),u.notifyByKey("completed");q=Date.now()}}var k=a||1e3,l=g||20,m=function(){return 1e3/l},n=0,o=function(){return parseInt((k/m()).toFixed(0),10)},p=o(),q=0,r=0,s=0,t=h("linear"),u=new d(this),v=!1,w={},x={},y=0;_animateState=f.READY,this._guid=c.newId(),this.getStates=function(){return _animateState},this.start=function(){v=!0;var a=this.getStates();a!=f.PAUSE&&(r=Date.now()),a==f.PAUSE&&(r+=Date.now()-y),i(f.START)},this.stop=function(){v=!1,p>=n&&(i(f.PAUSE),y=Date.now())},this.setDuration=function(a){return k=a,p=o(),this},this.setDuration=function(a){return l=a,p=o(),this},this.from=function(a){return w=a,this},this.to=function(a){return x=a,this},this.easing=function(a){return t=h(a),this},this.delay=function(a){s=a},this.onframe=function(a){c.isFunction(a)&&u.attach("frame",a)},this.oncompleted=function(a){c.isFunction(a)&&u.attach("completed",a)},this.clone=function(){var a=new b;return a.setDuration(k).from(w).to(x).delay(s).easing(t),a},this.frame=function(){Date.now()-r<s||j.apply(this)}}var c=a("src/tools/util"),d=a("src/tools/observer"),e=a("src/tools/easing");!1 in Date&&(Date.now=function(){return(new Date).getTime()});var f={READY:"1",START:"2",RUNNING:"3",PAUSE:"4",COMPLETED:"5"};return b}),define("src/tools/easing",[],function(){return{linear:function(a,b,c,d){return b+a/d*c},easeInQuad:function(a,b,c,d){return c*(a/=d)*a+b},easeOutQuad:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},easeInOutQuad:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b},easeInCubic:function(a,b,c,d){return c*(a/=d)*a*a+b},easeOutCubic:function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b},easeInOutCubic:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a+b:c/2*((a-=2)*a*a+2)+b},easeInQuart:function(a,b,c,d){return c*(a/=d)*a*a*a+b},easeOutQuart:function(a,b,c,d){return-c*((a=a/d-1)*a*a*a-1)+b},easeInOutQuart:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a+b:-c/2*((a-=2)*a*a*a-2)+b},easeInQuint:function(a,b,c,d){return c*(a/=d)*a*a*a*a+b},easeOutQuint:function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b},easeInOutQuint:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(a,b,c,d){return-c*Math.cos(a/d*(Math.PI/2))+c+b},easeOutSine:function(a,b,c,d){return c*Math.sin(a/d*(Math.PI/2))+b},easeInOutSine:function(a,b,c,d){return-c/2*(Math.cos(Math.PI*a/d)-1)+b},easeInExpo:function(a,b,c,d){return 0==a?b:c*Math.pow(2,10*(a/d-1))+b},easeOutExpo:function(a,b,c,d){return a==d?b+c:c*(-Math.pow(2,-10*a/d)+1)+b},easeInOutExpo:function(a,b,c,d){return 0==a?b:a==d?b+c:(a/=d/2)<1?c/2*Math.pow(2,10*(a-1))+b:c/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(a,b,c,d){return-c*(Math.sqrt(1-(a/=d)*a)-1)+b},easeOutCirc:function(a,b,c,d){return c*Math.sqrt(1-(a=a/d-1)*a)+b},easeInOutCirc:function(a,b,c,d){return(a/=d/2)<1?-c/2*(Math.sqrt(1-a*a)-1)+b:c/2*(Math.sqrt(1-(a-=2)*a)+1)+b},easeInElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;if(0==a)return b;if(1==(a/=d))return b+c;if(f||(f=.3*d),g<Math.abs(c)){g=c;var e=f/4}else var e=f/(2*Math.PI)*Math.asin(c/g);return-(g*Math.pow(2,10*(a-=1))*Math.sin(2*(a*d-e)*Math.PI/f))+b},easeOutElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;if(0==a)return b;if(1==(a/=d))return b+c;if(f||(f=.3*d),g<Math.abs(c)){g=c;var e=f/4}else var e=f/(2*Math.PI)*Math.asin(c/g);return g*Math.pow(2,-10*a)*Math.sin(2*(a*d-e)*Math.PI/f)+c+b},easeInOutElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;if(0==a)return b;if(2==(a/=d/2))return b+c;if(f||(f=.3*d*1.5),g<Math.abs(c)){g=c;var e=f/4}else var e=f/(2*Math.PI)*Math.asin(c/g);return 1>a?-.5*g*Math.pow(2,10*(a-=1))*Math.sin(2*(a*d-e)*Math.PI/f)+b:g*Math.pow(2,-10*(a-=1))*Math.sin(2*(a*d-e)*Math.PI/f)*.5+c+b},easeInBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),c*(a/=d)*a*((e+1)*a-e)+b},easeOutBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),c*((a=a/d-1)*a*((e+1)*a+e)+1)+b},easeInOutBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),(a/=d/2)<1?c/2*a*a*(((e*=1.525)+1)*a-e)+b:c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b},easeInBounce:function(a,b,c,d){return c-this.easeOutBounce(d-a,0,c,d)+b},easeOutBounce:function(a,b,c,d){return(a/=d)<1/2.75?7.5625*c*a*a+b:2/2.75>a?c*(7.5625*(a-=1.5/2.75)*a+.75)+b:2.5/2.75>a?c*(7.5625*(a-=2.25/2.75)*a+.9375)+b:c*(7.5625*(a-=2.625/2.75)*a+.984375)+b},easeInOutBounce:function(a,b,c,d){return d/2>a?.5*this.easeInBounce(2*a,0,c,d)+b:.5*this.easeOutBounce(2*a-d,0,c,d)+.5*c+b}}});