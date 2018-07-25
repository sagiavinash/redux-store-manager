!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["redux-builder"]=t():e["redux-builder"]=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{!n&&c.return&&c.return()}finally{if(o)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=r(1),u=function(e){return function(t,r){return e.reduce(function(e,t){return t(e,r)},t)}},c={store:null,reducerMap:{},registerReducer:function(e){var t=this;Object.entries(e).foreach(function(e){var r=o(e,2),n=r[0],i=r[1];t.reducerMap[n]||(t.reducerMap[n]=[]),t.reducerMap[n].push(i)})},createRootReducer:function(){var e=this;return(0,i.combineReducers)(Object.keys(this.reducerMap).reduce(function(t,r){return Object.assign(t,n({},r,u(e.reducerMap[r])))},{}))},createStore:function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return this.store=i.createStore.apply(void 0,[this.createRootReducer()].concat(t)),this.store},refreshStore:function(){this.store.replaceReducer(this.createRootReducer())}};t.default=c},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){function n(e){if("object"!==(void 0===e?"undefined":v(e))||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function o(e,t,r){function i(){w===h&&(w=h.slice())}function u(){if(m)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return p}function c(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(m)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");var t=!0;return i(),w.push(e),function(){if(t){if(m)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");t=!1,i();var r=w.indexOf(e);w.splice(r,1)}}}function a(e){if(!n(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(m)throw new Error("Reducers may not dispatch actions.");try{m=!0,p=l(p,e)}finally{m=!1}for(var t=h=w,r=0;r<t.length;r++){(0,t[r])()}return e}function f(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");l=e,a({type:b.REPLACE})}function s(){var e,t=c;return e={subscribe:function(e){function r(){e.next&&e.next(u())}if("object"!==(void 0===e?"undefined":v(e))||null===e)throw new TypeError("Expected the observer to be an object.");return r(),{unsubscribe:t(r)}}},e[y.a]=function(){return this},e}var d;if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error("Expected the enhancer to be a function.");return r(o)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var l=e,p=t,h=[],w=h,m=!1;return a({type:b.INIT}),d={dispatch:a,subscribe:c,getState:u,replaceReducer:f},d[y.a]=s,d}function i(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(e){}}function u(e,t){var r=t&&t.type;return"Given "+(r&&'action "'+String(r)+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function c(e,t,r,o){var i=Object.keys(t),u=r&&r.type===b.INIT?"preloadedState argument passed to createStore":"previous state received by the reducer";if(0===i.length)return"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if(!n(e))return"The "+u+' has unexpected type of "'+{}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1]+'". Expected argument to be an object with the following keys: "'+i.join('", "')+'"';var c=Object.keys(e).filter(function(e){return!t.hasOwnProperty(e)&&!o[e]});return c.forEach(function(e){o[e]=!0}),r&&r.type===b.REPLACE?void 0:c.length>0?"Unexpected "+(c.length>1?"keys":"key")+' "'+c.join('", "')+'" found in '+u+'. Expected to find one of the known reducer keys instead: "'+i.join('", "')+'". Unexpected keys will be ignored.':void 0}function a(e){Object.keys(e).forEach(function(t){var r=e[t];if(void 0===r(void 0,{type:b.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===r(void 0,{type:"@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".")}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+b.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')})}function f(t){for(var r=Object.keys(t),n={},o=0;o<r.length;o++){var f=r[o];"production"!==e.env.NODE_ENV&&void 0===t[f]&&i('No reducer provided for key "'+f+'"'),"function"==typeof t[f]&&(n[f]=t[f])}var s=Object.keys(n),d=void 0;"production"!==e.env.NODE_ENV&&(d={});var l=void 0;try{a(n)}catch(e){l=e}return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments[1];if(l)throw l;if("production"!==e.env.NODE_ENV){var o=c(t,n,r,d);o&&i(o)}for(var a=!1,f={},p=0;p<s.length;p++){var h=s[p],y=n[h],b=t[h],v=y(b,r);if(void 0===v){var w=u(h,r);throw new Error(w)}f[h]=v,a=a||v!==b}return a?f:t}}function s(e,t){return function(){return t(e.apply(this,arguments))}}function d(e,t){if("function"==typeof e)return s(e,t);if("object"!==(void 0===e?"undefined":v(e))||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":void 0===e?"undefined":v(e))+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var r=Object.keys(e),n={},o=0;o<r.length;o++){var i=r[o],u=e[i];"function"==typeof u&&(n[i]=s(u,t))}return n}function l(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}function p(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(){for(var r=arguments.length,n=Array(r),o=0;o<r;o++)n[o]=arguments[o];var i=e.apply(void 0,n),u=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},c={getState:i.getState,dispatch:function(){return u.apply(void 0,arguments)}},a=t.map(function(e){return e(c)});return u=l.apply(void 0,a)(i.dispatch),w({},i,{dispatch:u})}}}function h(){}r.d(t,"createStore",function(){return o}),r.d(t,"combineReducers",function(){return f}),r.d(t,"bindActionCreators",function(){return d}),r.d(t,"applyMiddleware",function(){return p}),r.d(t,"compose",function(){return l}),r.d(t,"__DO_NOT_USE__ActionTypes",function(){return b});var y=r(3),b={INIT:"@@redux/INIT"+Math.random().toString(36).substring(7).split("").join("."),REPLACE:"@@redux/REPLACE"+Math.random().toString(36).substring(7).split("").join(".")},v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};"production"!==e.env.NODE_ENV&&"string"==typeof h.name&&"isCrushed"!==h.name&&i("You are currently using minified code outside of NODE_ENV === 'production'. This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) to ensure you have the correct code for your production build.")}.call(t,r(2))},function(e,t){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function o(e){if(s===setTimeout)return setTimeout(e,0);if((s===r||!s)&&setTimeout)return s=setTimeout,setTimeout(e,0);try{return s(e,0)}catch(t){try{return s.call(null,e,0)}catch(t){return s.call(this,e,0)}}}function i(e){if(d===clearTimeout)return clearTimeout(e);if((d===n||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(e);try{return d(e)}catch(t){try{return d.call(null,e)}catch(t){return d.call(this,e)}}}function u(){y&&p&&(y=!1,p.length?h=p.concat(h):b=-1,h.length&&c())}function c(){if(!y){var e=o(u);y=!0;for(var t=h.length;t;){for(p=h,h=[];++b<t;)p&&p[b].run();b=-1,t=h.length}p=null,y=!1,i(e)}}function a(e,t){this.fun=e,this.array=t}function f(){}var s,d,l=e.exports={};!function(){try{s="function"==typeof setTimeout?setTimeout:r}catch(e){s=r}try{d="function"==typeof clearTimeout?clearTimeout:n}catch(e){d=n}}();var p,h=[],y=!1,b=-1;l.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];h.push(new a(e,t)),1!==h.length||y||o(c)},a.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=f,l.addListener=f,l.once=f,l.off=f,l.removeListener=f,l.removeAllListeners=f,l.emit=f,l.prependListener=f,l.prependOnceListener=f,l.listeners=function(e){return[]},l.binding=function(e){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(e){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},function(e,t,r){"use strict";(function(e,n){var o,i=r(6);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:n;var u=Object(i.a)(o);t.a=u}).call(t,r(4),r(5)(e))},function(e,t){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,r){"use strict";function n(e){var t,r=e.Symbol;return"function"==typeof r?r.observable?t=r.observable:(t=r("observable"),r.observable=t):t="@@observable",t}t.a=n}])});