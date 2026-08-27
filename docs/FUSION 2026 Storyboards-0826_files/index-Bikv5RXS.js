var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var ee=Array.isArray;function te(){}var S={H:null,A:null,T:null,S:null},ne=Object.prototype.hasOwnProperty;function re(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ie(e,t){return re(e.type,t,e.props)}function C(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ae(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var oe=/\/+/g;function se(e,t){return typeof e==`object`&&e&&e.key!=null?ae(``+e.key):t.toString(36)}function ce(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(te,te):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function le(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,le(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+se(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(oe,`$&/`)+`/`),le(o,r,i,``,function(e){return e})):o!=null&&(C(o)&&(o=ie(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(oe,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+se(a,u),c+=le(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+se(a,u++),c+=le(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return le(ce(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ue(e,t,n){if(e==null)return e;var r=[],i=0;return le(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function de(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var w=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},T={map:ue,forEach:function(e,t,n){ue(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ue(e,function(){t++}),t},toArray:function(e){return ue(e,function(e){return e})||[]},only:function(e){if(!C(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=T,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ne.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return re(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ne.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return re(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=C,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:de}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=S.T,n={};S.T=n;try{var r=e(),i=S.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(te,w)}catch(e){w(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),S.T=t}},e.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},e.use=function(e){return S.H.use(e)},e.useActionState=function(e,t,n){return S.H.useActionState(e,t,n)},e.useCallback=function(e,t){return S.H.useCallback(e,t)},e.useContext=function(e){return S.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return S.H.useEffect(e,t)},e.useEffectEvent=function(e){return S.H.useEffectEvent(e)},e.useId=function(){return S.H.useId()},e.useImperativeHandle=function(e,t,n){return S.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return S.H.useMemo(e,t)},e.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return S.H.useReducer(e,t,n)},e.useRef=function(e){return S.H.useRef(e)},e.useState=function(e){return S.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return S.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return S.H.useTransition()},e.version=`19.2.8`})),n=e(((e,n)=>{n.exports=t()})),r=e((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,ee||(ee=!0,C());else{var t=n(l);t!==null&&se(x,t.startTime-e)}}}var ee=!1,te=-1,S=5,ne=-1;function re(){return g?!0:!(e.unstable_now()-ne<S)}function ie(){if(g=!1,ee){var t=e.unstable_now();ne=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(te),te=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&re());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&se(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?C():ee=!1}}}var C;if(typeof y==`function`)C=function(){y(ie)};else if(typeof MessageChannel<`u`){var ae=new MessageChannel,oe=ae.port2;ae.port1.onmessage=ie,C=function(){oe.postMessage(null)}}else C=function(){_(ie,0)};function se(t,n){te=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):S=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(te),te=-1):h=!0,se(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ee||(ee=!0,C()))),r},e.unstable_shouldYield=re,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),i=e(((e,t)=>{t.exports=r()})),a=e((e=>{var t=n();function r(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function i(){}var a={d:{f:i,r:function(){throw Error(r(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},o=Symbol.for(`react.portal`);function s(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var c=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function l(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(r(299));return s(e,t,null,n)},e.flushSync=function(e){var t=c.T,n=a.p;try{if(c.T=null,a.p=2,e)return e()}finally{c.T=t,a.p=n,a.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,a.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&a.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin),i=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?a.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:i,fetchPriority:o}):n===`script`&&a.d.X(e,{crossOrigin:r,integrity:i,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=l(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??a.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin);a.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=l(t.as,t.crossOrigin);a.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else a.d.m(e)}},e.requestFormReset=function(e){a.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return c.H.useFormState(e,t,n)},e.useFormStatus=function(){return c.H.useHostTransitionStatus()},e.version=`19.2.8`})),o=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=a()})),s=e((e=>{var t=i(),r=n(),a=o();function s(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function l(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function u(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function d(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function f(e){if(l(e)!==e)throw Error(s(188))}function p(e){var t=e.alternate;if(!t){if(t=l(e),t===null)throw Error(s(188));return t===e?e:null}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return f(i),e;if(a===r)return f(i),t;a=a.sibling}throw Error(s(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,c=i.child;c;){if(c===n){o=!0,n=i,r=a;break}if(c===r){o=!0,r=i,n=a;break}c=c.sibling}if(!o){for(c=a.child;c;){if(c===n){o=!0,n=a,r=i;break}if(c===r){o=!0,r=a,n=i;break}c=c.sibling}if(!o)throw Error(s(189))}}if(n.alternate!==r)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function m(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=m(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),ee=Symbol.for(`react.consumer`),te=Symbol.for(`react.context`),S=Symbol.for(`react.forward_ref`),ne=Symbol.for(`react.suspense`),re=Symbol.for(`react.suspense_list`),ie=Symbol.for(`react.memo`),C=Symbol.for(`react.lazy`),ae=Symbol.for(`react.activity`),oe=Symbol.for(`react.memo_cache_sentinel`),se=Symbol.iterator;function ce(e){return typeof e!=`object`||!e?null:(e=se&&e[se]||e[`@@iterator`],typeof e==`function`?e:null)}var le=Symbol.for(`react.client.reference`);function ue(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===le?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ne:return`Suspense`;case re:return`SuspenseList`;case ae:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case te:return e.displayName||`Context`;case ee:return(e._context.displayName||`Context`)+`.Consumer`;case S:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ie:return t=e.displayName||null,t===null?ue(e.type)||`Memo`:t;case C:t=e._payload,e=e._init;try{return ue(e(t))}catch{}}return null}var de=Array.isArray,w=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,T=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,fe={pending:!1,data:null,method:null,action:null},pe=[],me=-1;function he(e){return{current:e}}function E(e){0>me||(e.current=pe[me],pe[me]=null,me--)}function D(e,t){me++,pe[me]=e.current,e.current=t}var ge=he(null),_e=he(null),ve=he(null),ye=he(null);function be(e,t){switch(D(ve,t),D(_e,e),D(ge,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}E(ge),D(ge,e)}function xe(){E(ge),E(_e),E(ve)}function Se(e){e.memoizedState!==null&&D(ye,e);var t=ge.current,n=Hd(t,e.type);t!==n&&(D(_e,e),D(ge,n))}function Ce(e){_e.current===e&&(E(ge),E(_e)),ye.current===e&&(E(ye),Qf._currentValue=fe)}var we,Te;function Ee(e){if(we===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);we=t&&t[1]||``,Te=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+we+e+Te}var De=!1;function Oe(e,t){if(!e||De)return``;De=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{De=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ee(n):``}function ke(e,t){switch(e.tag){case 26:case 27:case 5:return Ee(e.type);case 16:return Ee(`Lazy`);case 13:return e.child!==t&&t!==null?Ee(`Suspense Fallback`):Ee(`Suspense`);case 19:return Ee(`SuspenseList`);case 0:case 15:return Oe(e.type,!1);case 11:return Oe(e.type.render,!1);case 1:return Oe(e.type,!0);case 31:return Ee(`Activity`);default:return``}}function Ae(e){try{var t=``,n=null;do t+=ke(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var je=Object.prototype.hasOwnProperty,Me=t.unstable_scheduleCallback,Ne=t.unstable_cancelCallback,Pe=t.unstable_shouldYield,Fe=t.unstable_requestPaint,Ie=t.unstable_now,Le=t.unstable_getCurrentPriorityLevel,Re=t.unstable_ImmediatePriority,ze=t.unstable_UserBlockingPriority,Be=t.unstable_NormalPriority,Ve=t.unstable_LowPriority,He=t.unstable_IdlePriority,Ue=t.log,We=t.unstable_setDisableYieldValue,Ge=null,Ke=null;function qe(e){if(typeof Ue==`function`&&We(e),Ke&&typeof Ke.setStrictMode==`function`)try{Ke.setStrictMode(Ge,e)}catch{}}var Je=Math.clz32?Math.clz32:Ze,Ye=Math.log,Xe=Math.LN2;function Ze(e){return e>>>=0,e===0?32:31-(Ye(e)/Xe|0)|0}var Qe=256,$e=262144,et=4194304;function tt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function nt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=tt(n))):i=tt(o):i=tt(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=tt(n))):i=tt(o)):i=tt(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function rt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function it(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function at(){var e=et;return et<<=1,!(et&62914560)&&(et=4194304),e}function ot(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function st(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ct(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Je(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&lt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function lt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Je(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ut(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Je(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function dt(e,t){var n=t&-t;return n=n&42?1:ft(n),(n&(e.suspendedLanes|t))===0?n:0}function ft(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function pt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function mt(){var e=T.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function ht(e,t){var n=T.p;try{return T.p=e,t()}finally{T.p=n}}var gt=Math.random().toString(36).slice(2),_t=`__reactFiber$`+gt,vt=`__reactProps$`+gt,yt=`__reactContainer$`+gt,bt=`__reactEvents$`+gt,xt=`__reactListeners$`+gt,St=`__reactHandles$`+gt,Ct=`__reactResources$`+gt,wt=`__reactMarker$`+gt;function Tt(e){delete e[_t],delete e[vt],delete e[bt],delete e[xt],delete e[St]}function Et(e){var t=e[_t];if(t)return t;for(var n=e.parentNode;n;){if(t=n[yt]||n[_t]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[_t])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function Dt(e){if(e=e[_t]||e[yt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ot(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(s(33))}function kt(e){var t=e[Ct];return t||=e[Ct]={hoistableStyles:new Map,hoistableScripts:new Map},t}function O(e){e[wt]=!0}var At=new Set,jt={};function Mt(e,t){Nt(e,t),Nt(e+`Capture`,t)}function Nt(e,t){for(jt[e]=t,e=0;e<t.length;e++)At.add(t[e])}var Pt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ft={},It={};function Lt(e){return je.call(It,e)?!0:je.call(Ft,e)?!1:Pt.test(e)?It[e]=!0:(Ft[e]=!0,!1)}function Rt(e,t,n){if(Lt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function zt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Bt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Vt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Ht(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Ut(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Wt(e){if(!e._valueTracker){var t=Ht(e)?`checked`:`value`;e._valueTracker=Ut(e,t,``+e[t])}}function Gt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Ht(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function Kt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var qt=/[\n"\\]/g;function Jt(e){return e.replace(qt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Yt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Vt(t)):e.value!==``+Vt(t)&&(e.value=``+Vt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Zt(e,o,Vt(n)):Zt(e,o,Vt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Vt(s):e.removeAttribute(`name`)}function Xt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Wt(e);return}n=n==null?``:``+Vt(n),t=t==null?n:``+Vt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Wt(e)}function Zt(e,t,n){t===`number`&&Kt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Qt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Vt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function $t(e,t,n){if(t!=null&&(t=``+Vt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Vt(n)}function en(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(s(92));if(de(r)){if(1<r.length)throw Error(s(93));r=r[0]}n=r}n??=``,t=n}n=Vt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Wt(e)}function tn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var nn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function rn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||nn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function an(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(s(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var i in t)r=t[i],t.hasOwnProperty(i)&&n[i]!==r&&rn(e,i,r)}else for(var a in t)t.hasOwnProperty(a)&&rn(e,a,t[a])}function on(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var sn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),cn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ln(e){return cn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function un(){}var dn=null;function fn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pn=null,mn=null;function hn(e){var t=Dt(e);if(t&&(e=t.stateNode)){var n=e[vt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Yt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Jt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=r[vt]||null;if(!i)throw Error(s(90));Yt(r,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Gt(r)}break a;case`textarea`:$t(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Qt(e,!!n.multiple,t,!1)}}}var gn=!1;function _n(e,t,n){if(gn)return e(t,n);gn=!0;try{return e(t)}finally{if(gn=!1,(pn!==null||mn!==null)&&(bu(),pn&&(t=pn,e=mn,mn=pn=null,hn(t),e)))for(t=0;t<e.length;t++)hn(e[t])}}function vn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[vt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(s(231,t,typeof n));return n}var yn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),bn=!1;if(yn)try{var xn={};Object.defineProperty(xn,"passive",{get:function(){bn=!0}}),window.addEventListener(`test`,xn,xn),window.removeEventListener(`test`,xn,xn)}catch{bn=!1}var Sn=null,Cn=null,wn=null;function Tn(){if(wn)return wn;var e,t=Cn,n=t.length,r,i=`value`in Sn?Sn.value:Sn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return wn=i.slice(e,1<r?1-r:void 0)}function En(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Dn(){return!0}function On(){return!1}function kn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Dn:On,this.isPropagationStopped=On,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Dn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Dn)},persist:function(){},isPersistent:Dn}),t}var An={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},jn=kn(An),Mn=h({},An,{view:0,detail:0}),Nn=kn(Mn),Pn,Fn,In,Ln=h({},Mn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Jn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==In&&(In&&e.type===`mousemove`?(Pn=e.screenX-In.screenX,Fn=e.screenY-In.screenY):Fn=Pn=0,In=e),Pn)},movementY:function(e){return`movementY`in e?e.movementY:Fn}}),Rn=kn(Ln),zn=kn(h({},Ln,{dataTransfer:0})),Bn=kn(h({},Mn,{relatedTarget:0})),Vn=kn(h({},An,{animationName:0,elapsedTime:0,pseudoElement:0})),Hn=kn(h({},An,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Un=kn(h({},An,{data:0})),Wn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Gn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Kn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function qn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Kn[e])?!!t[e]:!1}function Jn(){return qn}var Yn=kn(h({},Mn,{key:function(e){if(e.key){var t=Wn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=En(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Gn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Jn,charCode:function(e){return e.type===`keypress`?En(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?En(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Xn=kn(h({},Ln,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Zn=kn(h({},Mn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Jn})),Qn=kn(h({},An,{propertyName:0,elapsedTime:0,pseudoElement:0})),$n=kn(h({},Ln,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),er=kn(h({},An,{newState:0,oldState:0})),tr=[9,13,27,32],nr=yn&&`CompositionEvent`in window,rr=null;yn&&`documentMode`in document&&(rr=document.documentMode);var ir=yn&&`TextEvent`in window&&!rr,ar=yn&&(!nr||rr&&8<rr&&11>=rr),or=` `,sr=!1;function cr(e,t){switch(e){case`keyup`:return tr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function lr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var ur=!1;function dr(e,t){switch(e){case`compositionend`:return lr(t);case`keypress`:return t.which===32?(sr=!0,or):null;case`textInput`:return e=t.data,e===or&&sr?null:e;default:return null}}function fr(e,t){if(ur)return e===`compositionend`||!nr&&cr(e,t)?(e=Tn(),wn=Cn=Sn=null,ur=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return ar&&t.locale!==`ko`?null:t.data;default:return null}}var pr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function mr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!pr[e.type]:t===`textarea`}function hr(e,t,n,r){pn?mn?mn.push(r):mn=[r]:pn=r,t=Ed(t,`onChange`),0<t.length&&(n=new jn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var gr=null,_r=null;function vr(e){yd(e,0)}function yr(e){if(Gt(Ot(e)))return e}function br(e,t){if(e===`change`)return t}var xr=!1;if(yn){var Sr;if(yn){var Cr=`oninput`in document;if(!Cr){var wr=document.createElement(`div`);wr.setAttribute(`oninput`,`return;`),Cr=typeof wr.oninput==`function`}Sr=Cr}else Sr=!1;xr=Sr&&(!document.documentMode||9<document.documentMode)}function Tr(){gr&&(gr.detachEvent(`onpropertychange`,Er),_r=gr=null)}function Er(e){if(e.propertyName===`value`&&yr(_r)){var t=[];hr(t,_r,e,fn(e)),_n(vr,t)}}function Dr(e,t,n){e===`focusin`?(Tr(),gr=t,_r=n,gr.attachEvent(`onpropertychange`,Er)):e===`focusout`&&Tr()}function Or(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return yr(_r)}function kr(e,t){if(e===`click`)return yr(t)}function Ar(e,t){if(e===`input`||e===`change`)return yr(t)}function jr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Mr=typeof Object.is==`function`?Object.is:jr;function Nr(e,t){if(Mr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!je.call(t,i)||!Mr(e[i],t[i]))return!1}return!0}function Pr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Fr(e,t){var n=Pr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Pr(n)}}function Ir(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ir(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Lr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Kt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Kt(e.document)}return t}function Rr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var zr=yn&&`documentMode`in document&&11>=document.documentMode,Br=null,Vr=null,Hr=null,Ur=!1;function Wr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ur||Br==null||Br!==Kt(r)||(r=Br,`selectionStart`in r&&Rr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Hr&&Nr(Hr,r)||(Hr=r,r=Ed(Vr,`onSelect`),0<r.length&&(t=new jn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Br)))}function Gr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Kr={animationend:Gr(`Animation`,`AnimationEnd`),animationiteration:Gr(`Animation`,`AnimationIteration`),animationstart:Gr(`Animation`,`AnimationStart`),transitionrun:Gr(`Transition`,`TransitionRun`),transitionstart:Gr(`Transition`,`TransitionStart`),transitioncancel:Gr(`Transition`,`TransitionCancel`),transitionend:Gr(`Transition`,`TransitionEnd`)},qr={},Jr={};yn&&(Jr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Kr.animationend.animation,delete Kr.animationiteration.animation,delete Kr.animationstart.animation),`TransitionEvent`in window||delete Kr.transitionend.transition);function Yr(e){if(qr[e])return qr[e];if(!Kr[e])return e;var t=Kr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Jr)return qr[e]=t[n];return e}var Xr=Yr(`animationend`),Zr=Yr(`animationiteration`),Qr=Yr(`animationstart`),$r=Yr(`transitionrun`),ei=Yr(`transitionstart`),ti=Yr(`transitioncancel`),ni=Yr(`transitionend`),ri=new Map,ii=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ii.push(`scrollEnd`);function ai(e,t){ri.set(e,t),Mt(t,[e])}var oi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},si=[],ci=0,li=0;function ui(){for(var e=ci,t=li=ci=0;t<e;){var n=si[t];si[t++]=null;var r=si[t];si[t++]=null;var i=si[t];si[t++]=null;var a=si[t];if(si[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&mi(n,i,a)}}function di(e,t,n,r){si[ci++]=e,si[ci++]=t,si[ci++]=n,si[ci++]=r,li|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function fi(e,t,n,r){return di(e,t,n,r),hi(e)}function pi(e,t){return di(e,null,null,t),hi(e)}function mi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Je(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function hi(e){if(50<du)throw du=0,fu=null,Error(s(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var gi={};function _i(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function vi(e,t,n,r){return new _i(e,t,n,r)}function yi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function bi(e,t){var n=e.alternate;return n===null?(n=vi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function xi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Si(e,t,n,r,i,a){var o=0;if(r=e,typeof e==`function`)yi(e)&&(o=1);else if(typeof e==`string`)o=Uf(e,n,ge.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ae:return e=vi(31,n,t,i),e.elementType=ae,e.lanes=a,e;case y:return Ci(n.children,i,a,t);case b:o=8,i|=24;break;case x:return e=vi(12,n,t,i|2),e.elementType=x,e.lanes=a,e;case ne:return e=vi(13,n,t,i),e.elementType=ne,e.lanes=a,e;case re:return e=vi(19,n,t,i),e.elementType=re,e.lanes=a,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case te:o=10;break a;case ee:o=9;break a;case S:o=11;break a;case ie:o=14;break a;case C:o=16,r=null;break a}o=29,n=Error(s(130,e===null?`null`:typeof e,``)),r=null}return t=vi(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function Ci(e,t,n,r){return e=vi(7,e,r,t),e.lanes=n,e}function wi(e,t,n){return e=vi(6,e,null,t),e.lanes=n,e}function Ti(e){var t=vi(18,null,null,0);return t.stateNode=e,t}function Ei(e,t,n){return t=vi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Di=new WeakMap;function Oi(e,t){if(typeof e==`object`&&e){var n=Di.get(e);return n===void 0?(t={value:e,source:t,stack:Ae(t)},Di.set(e,t),t):n}return{value:e,source:t,stack:Ae(t)}}var ki=[],Ai=0,ji=null,Mi=0,Ni=[],Pi=0,Fi=null,Ii=1,Li=``;function Ri(e,t){ki[Ai++]=Mi,ki[Ai++]=ji,ji=e,Mi=t}function zi(e,t,n){Ni[Pi++]=Ii,Ni[Pi++]=Li,Ni[Pi++]=Fi,Fi=e;var r=Ii;e=Li;var i=32-Je(r)-1;r&=~(1<<i),n+=1;var a=32-Je(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ii=1<<32-Je(t)+i|n<<i|r,Li=a+e}else Ii=1<<a|n<<i|r,Li=e}function Bi(e){e.return!==null&&(Ri(e,1),zi(e,1,0))}function Vi(e){for(;e===ji;)ji=ki[--Ai],ki[Ai]=null,Mi=ki[--Ai],ki[Ai]=null;for(;e===Fi;)Fi=Ni[--Pi],Ni[Pi]=null,Li=Ni[--Pi],Ni[Pi]=null,Ii=Ni[--Pi],Ni[Pi]=null}function Hi(e,t){Ni[Pi++]=Ii,Ni[Pi++]=Li,Ni[Pi++]=Fi,Ii=t.id,Li=t.overflow,Fi=e}var Ui=null,k=null,A=!1,Wi=null,Gi=!1,Ki=Error(s(519));function qi(e){throw $i(Oi(Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Ki}function Ji(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[_t]=e,t[vt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Xt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),en(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=un),t=!0):t=!1,t||qi(e,!0)}function Yi(e){for(Ui=e.return;Ui;)switch(Ui.tag){case 5:case 31:case 13:Gi=!1;return;case 27:case 3:Gi=!0;return;default:Ui=Ui.return}}function Xi(e){if(e!==Ui)return!1;if(!A)return Yi(e),A=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&k&&qi(e),Yi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));k=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));k=uf(e)}else t===27?(t=k,Zd(e.type)?(e=lf,lf=null,k=e):k=t):k=Ui?cf(e.stateNode.nextSibling):null;return!0}function Zi(){k=Ui=null,A=!1}function Qi(){var e=Wi;return e!==null&&(Ql===null?Ql=e:Ql.push.apply(Ql,e),Wi=null),e}function $i(e){Wi===null?Wi=[e]:Wi.push(e)}var ea=he(null),ta=null,na=null;function ra(e,t,n){D(ea,t._currentValue),t._currentValue=n}function ia(e){e._currentValue=ea.current,E(ea)}function aa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function oa(e,t,n,r){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var a=i.dependencies;if(a!==null){var o=i.child;a=a.firstContext;a:for(;a!==null;){var c=a;a=i;for(var l=0;l<t.length;l++)if(c.context===t[l]){a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),aa(a.return,n,e),r||(o=null);break a}a=c.next}}else if(i.tag===18){if(o=i.return,o===null)throw Error(s(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),aa(o,n,e),o=null}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}}function sa(e,t,n,r){e=null;for(var i=t,a=!1;i!==null;){if(!a){if(i.flags&524288)a=!0;else if(i.flags&262144)break}if(i.tag===10){var o=i.alternate;if(o===null)throw Error(s(387));if(o=o.memoizedProps,o!==null){var c=i.type;Mr(i.pendingProps.value,o.value)||(e===null?e=[c]:e.push(c))}}else if(i===ye.current){if(o=i.alternate,o===null)throw Error(s(387));o.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}i=i.return}e!==null&&oa(t,e,n,r),t.flags|=262144}function ca(e){for(e=e.firstContext;e!==null;){if(!Mr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function la(e){ta=e,na=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function j(e){return da(ta,e)}function ua(e,t){return ta===null&&la(e),da(e,t)}function da(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},na===null){if(e===null)throw Error(s(308));na=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else na=na.next=t;return n}var fa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},pa=t.unstable_scheduleCallback,ma=t.unstable_NormalPriority,M={$$typeof:te,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ha(){return{controller:new fa,data:new Map,refCount:0}}function ga(e){e.refCount--,e.refCount===0&&pa(ma,function(){e.controller.abort()})}var _a=null,va=0,ya=0,ba=null;function xa(e,t){if(_a===null){var n=_a=[];va=0,ya=dd(),ba={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return va++,t.then(Sa,Sa),t}function Sa(){if(--va===0&&_a!==null){ba!==null&&(ba.status=`fulfilled`);var e=_a;_a=null,ya=0,ba=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ca(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var wa=w.S;w.S=function(e,t){tu=Ie(),typeof t==`object`&&t&&typeof t.then==`function`&&xa(e,t),wa!==null&&wa(e,t)};var Ta=he(null);function Ea(){var e=Ta.current;return e===null?G.pooledCache:e}function Da(e,t){t===null?D(Ta,Ta.current):D(Ta,t.pool)}function Oa(){var e=Ea();return e===null?null:{parent:M._currentValue,pool:e}}var ka=Error(s(460)),Aa=Error(s(474)),ja=Error(s(542)),Ma={then:function(){}};function Na(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Pa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(un,un),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ra(e),e;default:if(typeof t.status==`string`)t.then(un,un);else{if(e=G,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ra(e),e}throw Ia=t,ka}}function Fa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ia=e,ka):e}}var Ia=null;function La(){if(Ia===null)throw Error(s(459));var e=Ia;return Ia=null,e}function Ra(e){if(e===ka||e===ja)throw Error(s(483))}var za=null,Ba=0;function Va(e){var t=Ba;return Ba+=1,za===null&&(za=[]),Pa(za,e,t)}function Ha(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ua(e,t){throw t.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(t),Error(s(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Wa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function i(e,t){return e=bi(e,t),e.index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function o(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=wi(n,e.mode,r),t.return=e,t):(t=i(t,n),t.return=e,t)}function l(e,t,n,r){var a=n.type;return a===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===a||typeof a==`object`&&a&&a.$$typeof===C&&Fa(a)===t.type)?(t=i(t,n.props),Ha(t,n),t.return=e,t):(t=Si(n.type,n.key,n.props,null,e.mode,r),Ha(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ei(n,e.mode,r),t.return=e,t):(t=i(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,a){return t===null||t.tag!==7?(t=Ci(n,e.mode,r,a),t.return=e,t):(t=i(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=wi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=Si(t.type,t.key,t.props,null,e.mode,n),Ha(n,t),n.return=e,n;case v:return t=Ei(t,e.mode,n),t.return=e,t;case C:return t=Fa(t),f(e,t,n)}if(de(t)||ce(t))return t=Ci(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Va(t),n);if(t.$$typeof===te)return f(e,ua(e,t),n);Ua(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case C:return n=Fa(n),p(e,t,n,r)}if(de(n)||ce(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Va(n),r);if(n.$$typeof===te)return p(e,t,ua(e,n),r);Ua(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case C:return r=Fa(r),m(e,t,n,r,i)}if(de(r)||ce(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Va(r),i);if(r.$$typeof===te)return m(e,t,n,ua(t,r),i);Ua(t,r)}return null}function h(i,o,s,c){for(var l=null,u=null,d=o,h=o=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),o=a(_,o,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),A&&Ri(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(o=a(d,o,h),u===null?l=d:u.sibling=d,u=d);return A&&Ri(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),o=a(g,o,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),A&&Ri(i,h),l}function g(i,o,c,l){if(c==null)throw Error(s(151));for(var u=null,d=null,h=o,g=o=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(i,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(i,h),o=a(y,o,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(i,h),A&&Ri(i,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(i,v.value,l),v!==null&&(o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return A&&Ri(i,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,i,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(i,e)}),A&&Ri(i,g),u}function b(e,r,a,c){if(typeof a==`object`&&a&&a.type===y&&a.key===null&&(a=a.props.children),typeof a==`object`&&a){switch(a.$$typeof){case _:a:{for(var l=a.key;r!==null;){if(r.key===l){if(l=a.type,l===y){if(r.tag===7){n(e,r.sibling),c=i(r,a.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===C&&Fa(l)===r.type){n(e,r.sibling),c=i(r,a.props),Ha(c,a),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}a.type===y?(c=Ci(a.props.children,e.mode,c,a.key),c.return=e,e=c):(c=Si(a.type,a.key,a.props,null,e.mode,c),Ha(c,a),c.return=e,e=c)}return o(e);case v:a:{for(l=a.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===a.containerInfo&&r.stateNode.implementation===a.implementation){n(e,r.sibling),c=i(r,a.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ei(a,e.mode,c),c.return=e,e=c}return o(e);case C:return a=Fa(a),b(e,r,a,c)}if(de(a))return h(e,r,a,c);if(ce(a)){if(l=ce(a),typeof l!=`function`)throw Error(s(150));return a=l.call(a),g(e,r,a,c)}if(typeof a.then==`function`)return b(e,r,Va(a),c);if(a.$$typeof===te)return b(e,r,ua(e,a),c);Ua(e,a)}return typeof a==`string`&&a!==``||typeof a==`number`||typeof a==`bigint`?(a=``+a,r!==null&&r.tag===6?(n(e,r.sibling),c=i(r,a),c.return=e,e=c):(n(e,r),c=wi(a,e.mode,c),c.return=e,e=c),o(e)):n(e,r)}return function(e,t,n,r){try{Ba=0;var i=b(e,t,n,r);return za=null,i}catch(t){if(t===ka||t===ja)throw t;var a=vi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ga=Wa(!0),Ka=Wa(!1),qa=!1;function Ja(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ya(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Xa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Za(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=hi(e),mi(e,null,n),t}return di(e,r,t,n),hi(e)}function Qa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ut(e,n)}}function $a(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var eo=!1;function to(){if(eo){var e=ba;if(e!==null)throw e}}function no(e,t,n,r){eo=!1;var i=e.updateQueue;qa=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===ya&&(eo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:qa=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Kl|=o,e.lanes=o,e.memoizedState=d}}function ro(e,t){if(typeof e!=`function`)throw Error(s(191,e));e.call(t)}function io(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)ro(n[e],t)}var ao=he(null),oo=he(0);function so(e,t){e=Gl,D(oo,e),D(ao,t),Gl=e|t.baseLanes}function co(){D(oo,Gl),D(ao,ao.current)}function lo(){Gl=oo.current,E(ao),E(oo)}var uo=he(null),fo=null;function po(e){var t=e.alternate;D(N,N.current&1),D(uo,e),fo===null&&(t===null||ao.current!==null||t.memoizedState!==null)&&(fo=e)}function mo(e){D(N,N.current),D(uo,e),fo===null&&(fo=e)}function ho(e){e.tag===22?(D(N,N.current),D(uo,e),fo===null&&(fo=e)):go(e)}function go(){D(N,N.current),D(uo,uo.current)}function _o(e){E(uo),fo===e&&(fo=null),E(N)}var N=he(0);function vo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var yo=0,P=null,F=null,I=null,bo=!1,xo=!1,So=!1,Co=0,wo=0,To=null,Eo=0;function L(){throw Error(s(321))}function Do(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Mr(e[n],t[n]))return!1;return!0}function Oo(e,t,n,r,i,a){return yo=a,P=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,w.H=e===null||e.memoizedState===null?Ws:Gs,So=!1,a=n(r,i),So=!1,xo&&(a=Ao(t,n,r,i)),ko(e),a}function ko(e){w.H=Us;var t=F!==null&&F.next!==null;if(yo=0,I=F=P=null,bo=!1,wo=0,To=null,t)throw Error(s(300));e===null||z||(e=e.dependencies,e!==null&&ca(e)&&(z=!0))}function Ao(e,t,n,r){P=e;var i=0;do{if(xo&&(To=null),wo=0,xo=!1,25<=i)throw Error(s(301));if(i+=1,I=F=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}w.H=Ks,a=t(n,r)}while(xo);return a}function jo(){var e=w.H,t=e.useState()[0];return t=typeof t.then==`function`?Lo(t):t,e=e.useState()[0],(F===null?null:F.memoizedState)!==e&&(P.flags|=1024),t}function Mo(){var e=Co!==0;return Co=0,e}function No(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Po(e){if(bo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}bo=!1}yo=0,I=F=P=null,xo=!1,wo=Co=0,To=null}function Fo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return I===null?P.memoizedState=I=e:I=I.next=e,I}function R(){if(F===null){var e=P.alternate;e=e===null?null:e.memoizedState}else e=F.next;var t=I===null?P.memoizedState:I.next;if(t!==null)I=t,F=e;else{if(e===null)throw P.alternate===null?Error(s(467)):Error(s(310));F=e,e={memoizedState:F.memoizedState,baseState:F.baseState,baseQueue:F.baseQueue,queue:F.queue,next:null},I===null?P.memoizedState=I=e:I=I.next=e}return I}function Io(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Lo(e){var t=wo;return wo+=1,To===null&&(To=[]),e=Pa(To,e,t),t=P,(I===null?t.memoizedState:I.next)===null&&(t=t.alternate,w.H=t===null||t.memoizedState===null?Ws:Gs),e}function Ro(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Lo(e);if(e.$$typeof===te)return j(e)}throw Error(s(438,String(e)))}function zo(e){var t=null,n=P.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=P.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Io(),P.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=oe;return t.index++,n}function Bo(e,t){return typeof t==`function`?t(e):t}function Vo(e){return Ho(R(),F,e)}function Ho(e,t,n){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=n;var i=e.baseQueue,a=r.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}t.baseQueue=i=a,r.pending=null}if(a=e.baseState,i===null)e.memoizedState=a;else{t=i.next;var c=o=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(yo&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ya&&(d=!0);else if((yo&p)===p){u=u.next,p===ya&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,o=a):l=l.next=f,P.lanes|=p,Kl|=p;f=u.action,So&&n(a,f),a=u.hasEagerState?u.eagerState:n(a,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,o=a):l=l.next=p,P.lanes|=f,Kl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?o=a:l.next=c,!Mr(a,e.memoizedState)&&(z=!0,d&&(n=ba,n!==null)))throw n;e.memoizedState=a,e.baseState=o,e.baseQueue=l,r.lastRenderedState=a}return i===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Uo(e){var t=R(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);Mr(a,t.memoizedState)||(z=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Wo(e,t,n){var r=P,i=R(),a=A;if(a){if(n===void 0)throw Error(s(407));n=n()}else n=t();var o=!Mr((F||i).memoizedState,n);if(o&&(i.memoizedState=n,z=!0),i=i.queue,hs(qo.bind(null,r,i,e),[e]),i.getSnapshot!==t||o||I!==null&&I.memoizedState.tag&1){if(r.flags|=2048,us(9,{destroy:void 0},Ko.bind(null,r,i,n,t),null),G===null)throw Error(s(349));a||yo&127||Go(r,t,n)}return n}function Go(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=P.updateQueue,t===null?(t=Io(),P.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ko(e,t,n,r){t.value=n,t.getSnapshot=r,Jo(t)&&Yo(e)}function qo(e,t,n){return n(function(){Jo(t)&&Yo(e)})}function Jo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Mr(e,n)}catch{return!0}}function Yo(e){var t=pi(e,2);t!==null&&hu(t,e,2)}function Xo(e){var t=Fo();if(typeof e==`function`){var n=e;if(e=n(),So){qe(!0);try{n()}finally{qe(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:e},t}function Zo(e,t,n,r){return e.baseState=n,Ho(e,F,typeof r==`function`?r:Bo)}function Qo(e,t,n,r,i){if(Bs(e))throw Error(s(485));if(e=t.action,e!==null){var a={payload:i,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){a.listeners.push(e)}};w.T===null?a.isTransition=!1:n(!0),r(a),n=t.pending,n===null?(a.next=t.pending=a,$o(t,a)):(a.next=n.next,t.pending=n.next=a)}}function $o(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=w.T,o={};w.T=o;try{var s=n(i,r),c=w.S;c!==null&&c(o,s),es(e,t,s)}catch(n){ns(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),w.T=a}}else try{a=n(i,r),es(e,t,a)}catch(n){ns(e,t,n)}}function es(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ts(e,t,n)},function(n){return ns(e,t,n)}):ts(e,t,n)}function ts(e,t,n){t.status=`fulfilled`,t.value=n,rs(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,$o(e,n)))}function ns(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,rs(t),t=t.next;while(t!==r)}e.action=null}function rs(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function is(e,t){return t}function as(e,t){if(A){var n=G.formState;if(n!==null){a:{var r=P;if(A){if(k){b:{for(var i=k,a=Gi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){k=cf(i.nextSibling),r=i.data===`F!`;break a}}qi(r)}r=!1}r&&(t=n[0])}}return n=Fo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:is,lastRenderedState:t},n.queue=r,n=Ls.bind(null,P,r),r.dispatch=n,r=Xo(!1),a=zs.bind(null,P,!1,r.queue),r=Fo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Qo.bind(null,P,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function os(e){return ss(R(),F,e)}function ss(e,t,n){if(t=Ho(e,t,is)[0],e=Vo(Bo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Lo(t)}catch(e){throw e===ka?ja:e}else r=t;t=R();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(P.flags|=2048,us(9,{destroy:void 0},cs.bind(null,i,n),null)),[r,a,e]}function cs(e,t){e.action=t}function ls(e){var t=R(),n=F;if(n!==null)return ss(t,n,e);R(),t=t.memoizedState,n=R();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function us(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=P.updateQueue,t===null&&(t=Io(),P.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ds(){return R().memoizedState}function fs(e,t,n,r){var i=Fo();P.flags|=e,i.memoizedState=us(1|t,{destroy:void 0},n,r===void 0?null:r)}function ps(e,t,n,r){var i=R();r=r===void 0?null:r;var a=i.memoizedState.inst;F!==null&&r!==null&&Do(r,F.memoizedState.deps)?i.memoizedState=us(t,a,n,r):(P.flags|=e,i.memoizedState=us(1|t,a,n,r))}function ms(e,t){fs(8390656,8,e,t)}function hs(e,t){ps(2048,8,e,t)}function gs(e){P.flags|=4;var t=P.updateQueue;if(t===null)t=Io(),P.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function _s(e){var t=R().memoizedState;return gs({ref:t,nextImpl:e}),function(){if(W&2)throw Error(s(440));return t.impl.apply(void 0,arguments)}}function vs(e,t){return ps(4,2,e,t)}function ys(e,t){return ps(4,4,e,t)}function bs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function xs(e,t,n){n=n==null?null:n.concat([e]),ps(4,4,bs.bind(null,t,e),n)}function Ss(){}function Cs(e,t){var n=R();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Do(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ws(e,t){var n=R();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Do(t,r[1]))return r[0];if(r=e(),So){qe(!0);try{e()}finally{qe(!1)}}return n.memoizedState=[r,t],r}function Ts(e,t,n){return n===void 0||yo&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),P.lanes|=e,Kl|=e,n)}function Es(e,t,n,r){return Mr(n,t)?n:ao.current===null?!(yo&42)||yo&1073741824&&!(q&261930)?(z=!0,e.memoizedState=n):(e=mu(),P.lanes|=e,Kl|=e,t):(e=Ts(e,n,r),Mr(e,t)||(z=!0),e)}function Ds(e,t,n,r,i){var a=T.p;T.p=a!==0&&8>a?a:8;var o=w.T,s={};w.T=s,zs(e,!1,t,n);try{var c=i(),l=w.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Rs(e,t,Ca(c,r),pu(e)):Rs(e,t,r,pu(e))}catch(n){Rs(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{T.p=a,o!==null&&s.types!==null&&(o.types=s.types),w.T=o}}function Os(){}function ks(e,t,n,r){if(e.tag!==5)throw Error(s(476));var i=As(e).queue;Ds(e,i,t,fe,n===null?Os:function(){return js(e),n(r)})}function As(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:fe,baseState:fe,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:fe},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function js(e){var t=As(e);t.next===null&&(t=e.alternate.memoizedState),Rs(e,t.next.queue,{},pu())}function Ms(){return j(Qf)}function Ns(){return R().memoizedState}function Ps(){return R().memoizedState}function Fs(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Xa(n);var r=Za(t,e,n);r!==null&&(hu(r,t,n),Qa(r,t,n)),t={cache:ha()},e.payload=t;return}t=t.return}}function Is(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Bs(e)?Vs(t,n):(n=fi(e,t,n,r),n!==null&&(hu(n,e,r),Hs(n,t,r)))}function Ls(e,t,n){Rs(e,t,n,pu())}function Rs(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Bs(e))Vs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Mr(s,o))return di(e,t,i,0),G===null&&ui(),!1}catch{}if(n=fi(e,t,i,r),n!==null)return hu(n,e,r),Hs(n,t,r),!0}return!1}function zs(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Bs(e)){if(t)throw Error(s(479))}else t=fi(e,n,r,2),t!==null&&hu(t,e,2)}function Bs(e){var t=e.alternate;return e===P||t!==null&&t===P}function Vs(e,t){xo=bo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Hs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ut(e,n)}}var Us={readContext:j,use:Ro,useCallback:L,useContext:L,useEffect:L,useImperativeHandle:L,useLayoutEffect:L,useInsertionEffect:L,useMemo:L,useReducer:L,useRef:L,useState:L,useDebugValue:L,useDeferredValue:L,useTransition:L,useSyncExternalStore:L,useId:L,useHostTransitionStatus:L,useFormState:L,useActionState:L,useOptimistic:L,useMemoCache:L,useCacheRefresh:L};Us.useEffectEvent=L;var Ws={readContext:j,use:Ro,useCallback:function(e,t){return Fo().memoizedState=[e,t===void 0?null:t],e},useContext:j,useEffect:ms,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),fs(4194308,4,bs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return fs(4194308,4,e,t)},useInsertionEffect:function(e,t){fs(4,2,e,t)},useMemo:function(e,t){var n=Fo();t=t===void 0?null:t;var r=e();if(So){qe(!0);try{e()}finally{qe(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Fo();if(n!==void 0){var i=n(t);if(So){qe(!0);try{n(t)}finally{qe(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Is.bind(null,P,e),[r.memoizedState,e]},useRef:function(e){var t=Fo();return e={current:e},t.memoizedState=e},useState:function(e){e=Xo(e);var t=e.queue,n=Ls.bind(null,P,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Ss,useDeferredValue:function(e,t){return Ts(Fo(),e,t)},useTransition:function(){var e=Xo(!1);return e=Ds.bind(null,P,e.queue,!0,!1),Fo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=P,i=Fo();if(A){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),G===null)throw Error(s(349));q&127||Go(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,ms(qo.bind(null,r,a,e),[e]),r.flags|=2048,us(9,{destroy:void 0},Ko.bind(null,r,a,n,t),null),n},useId:function(){var e=Fo(),t=G.identifierPrefix;if(A){var n=Li,r=Ii;n=(r&~(1<<32-Je(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Co++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Eo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ms,useFormState:as,useActionState:as,useOptimistic:function(e){var t=Fo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=zs.bind(null,P,!0,n),n.dispatch=t,[e,t]},useMemoCache:zo,useCacheRefresh:function(){return Fo().memoizedState=Fs.bind(null,P)},useEffectEvent:function(e){var t=Fo(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},Gs={readContext:j,use:Ro,useCallback:Cs,useContext:j,useEffect:hs,useImperativeHandle:xs,useInsertionEffect:vs,useLayoutEffect:ys,useMemo:ws,useReducer:Vo,useRef:ds,useState:function(){return Vo(Bo)},useDebugValue:Ss,useDeferredValue:function(e,t){return Es(R(),F.memoizedState,e,t)},useTransition:function(){var e=Vo(Bo)[0],t=R().memoizedState;return[typeof e==`boolean`?e:Lo(e),t]},useSyncExternalStore:Wo,useId:Ns,useHostTransitionStatus:Ms,useFormState:os,useActionState:os,useOptimistic:function(e,t){return Zo(R(),F,e,t)},useMemoCache:zo,useCacheRefresh:Ps};Gs.useEffectEvent=_s;var Ks={readContext:j,use:Ro,useCallback:Cs,useContext:j,useEffect:hs,useImperativeHandle:xs,useInsertionEffect:vs,useLayoutEffect:ys,useMemo:ws,useReducer:Uo,useRef:ds,useState:function(){return Uo(Bo)},useDebugValue:Ss,useDeferredValue:function(e,t){var n=R();return F===null?Ts(n,e,t):Es(n,F.memoizedState,e,t)},useTransition:function(){var e=Uo(Bo)[0],t=R().memoizedState;return[typeof e==`boolean`?e:Lo(e),t]},useSyncExternalStore:Wo,useId:Ns,useHostTransitionStatus:Ms,useFormState:ls,useActionState:ls,useOptimistic:function(e,t){var n=R();return F===null?(n.baseState=e,[e,n.queue.dispatch]):Zo(n,F,e,t)},useMemoCache:zo,useCacheRefresh:Ps};Ks.useEffectEvent=_s;function qs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Js={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Xa(r);i.payload=t,n!=null&&(i.callback=n),t=Za(e,i,r),t!==null&&(hu(t,e,r),Qa(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Xa(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Za(e,i,r),t!==null&&(hu(t,e,r),Qa(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Xa(n);r.tag=2,t!=null&&(r.callback=t),t=Za(e,r,n),t!==null&&(hu(t,e,n),Qa(t,e,n))}};function Ys(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Nr(n,r)||!Nr(i,a):!0}function Xs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Js.enqueueReplaceState(t,t.state,null)}function Zs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Qs(e){oi(e)}function $s(e){console.error(e)}function ec(e){oi(e)}function tc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function nc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function rc(e,t,n){return n=Xa(n),n.tag=3,n.payload={element:null},n.callback=function(){tc(e,t)},n}function ic(e){return e=Xa(e),e.tag=3,e}function ac(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){nc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){nc(t,n,r),typeof i!=`function`&&(iu===null?iu=new Set([this]):iu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function oc(e,t,n,r,i){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&sa(t,n,i,!0),n=uo.current,n!==null){switch(n.tag){case 31:case 13:return fo===null?Du():n.alternate===null&&Y===0&&(Y=3),n.flags&=-257,n.flags|=65536,n.lanes=i,r===Ma?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,i)),!1;case 22:return n.flags|=65536,r===Ma?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,i)),!1}throw Error(s(435,n.tag))}return Gu(e,r,i),Du(),!1}if(A)return t=uo.current,t===null?(r!==Ki&&(t=Error(s(423),{cause:r}),$i(Oi(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,r=Oi(r,n),i=rc(e.stateNode,r,i),$a(e,i),Y!==4&&(Y=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=i,r!==Ki&&(e=Error(s(422),{cause:r}),$i(Oi(e,n)))),!1;var a=Error(s(520),{cause:r});if(a=Oi(a,n),Zl===null?Zl=[a]:Zl.push(a),Y!==4&&(Y=2),t===null)return!0;r=Oi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=rc(n.stateNode,r,e),$a(n,e),!1;case 1:if(t=n.type,a=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||a!==null&&typeof a.componentDidCatch==`function`&&(iu===null||!iu.has(a))))return n.flags|=65536,i&=-i,n.lanes|=i,i=ic(i),ac(i,e,n,r),$a(n,i),!1}n=n.return}while(n!==null);return!1}var sc=Error(s(461)),z=!1;function cc(e,t,n,r){t.child=e===null?Ka(t,null,n,r):Ga(t,e.child,n,r)}function lc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return la(t),r=Oo(e,t,n,o,a,i),s=Mo(),e!==null&&!z?(No(e,t,i),Nc(e,t,i)):(A&&s&&Bi(t),t.flags|=1,cc(e,t,r,i),t.child)}function uc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!yi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,dc(e,t,a,r,i)):(e=Si(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Pc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Nr:n,n(o,r)&&e.ref===t.ref)return Nc(e,t,i)}return t.flags|=1,e=bi(a,r),e.ref=t.ref,e.return=t,t.child=e}function dc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Nr(a,r)&&e.ref===t.ref){if(z=!1,t.pendingProps=r=a,Pc(e,i))e.flags&131072&&(z=!0);else return t.lanes=e.lanes,Nc(e,t,i)}}return yc(e,t,n,r,i)}function fc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return mc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Da(t,a===null?null:a.cachePool),a===null?co():so(t,a),ho(t);else return r=t.lanes=536870912,mc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Da(t,null),co(),go(t)):(Da(t,a.cachePool),so(t,a),go(t),t.memoizedState=null);return cc(e,t,i,n),t.child}function pc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function mc(e,t,n,r,i){var a=Ea();return a=a===null?null:{parent:M._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Da(t,null),co(),ho(t),e!==null&&sa(e,t,r,!0),t.childLanes=i,null}function hc(e,t){return t=Oc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function gc(e,t,n){return Ga(t,e.child,null,n),e=hc(t,t.pendingProps),e.flags|=2,_o(t),t.memoizedState=null,e}function _c(e,t,n){var r=t.pendingProps,i=!!(t.flags&128);if(t.flags&=-129,e===null){if(A){if(r.mode===`hidden`)return e=hc(t,r),t.lanes=536870912,pc(null,e);if(mo(t),(e=k)?(e=rf(e,Gi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Fi===null?null:{id:Ii,overflow:Li},retryLane:536870912,hydrationErrors:null},n=Ti(e),n.return=t,t.child=n,Ui=t,k=null)):e=null,e===null)throw qi(t);return t.lanes=536870912,null}return hc(t,r)}var a=e.memoizedState;if(a!==null){var o=a.dehydrated;if(mo(t),i){if(t.flags&256)t.flags&=-257,t=gc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(s(558))}else if(z||sa(e,t,n,!1),i=(n&e.childLanes)!==0,z||i){if(r=G,r!==null&&(o=dt(r,n),o!==0&&o!==a.retryLane))throw a.retryLane=o,pi(e,o),hu(r,e,o),sc;Du(),t=gc(e,t,n)}else e=a.treeContext,k=cf(o.nextSibling),Ui=t,A=!0,Wi=null,Gi=!1,e!==null&&Hi(t,e),t=hc(t,r),t.flags|=4096;return t}return e=bi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function vc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(s(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function yc(e,t,n,r,i){return la(t),n=Oo(e,t,n,r,void 0,i),r=Mo(),e!==null&&!z?(No(e,t,i),Nc(e,t,i)):(A&&r&&Bi(t),t.flags|=1,cc(e,t,n,i),t.child)}function bc(e,t,n,r,i,a){return la(t),t.updateQueue=null,n=Ao(t,r,n,i),ko(e),r=Mo(),e!==null&&!z?(No(e,t,a),Nc(e,t,a)):(A&&r&&Bi(t),t.flags|=1,cc(e,t,n,a),t.child)}function xc(e,t,n,r,i){if(la(t),t.stateNode===null){var a=gi,o=n.contextType;typeof o==`object`&&o&&(a=j(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Js,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ja(t),o=n.contextType,a.context=typeof o==`object`&&o?j(o):gi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(qs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Js.enqueueReplaceState(a,a.state,null),no(t,r,a,i),to(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Zs(n,s);a.props=c;var l=a.context,u=n.contextType;o=gi,typeof u==`object`&&u&&(o=j(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Xs(t,a,r,o),qa=!1;var f=t.memoizedState;a.state=f,no(t,r,a,i),to(),l=t.memoizedState,s||f!==l||qa?(typeof d==`function`&&(qs(t,n,d,r),l=t.memoizedState),(c=qa||Ys(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ya(e,t),o=t.memoizedProps,u=Zs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=gi,typeof l==`object`&&l&&(c=j(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Xs(t,a,r,c),qa=!1,f=t.memoizedState,a.state=f,no(t,r,a,i),to();var p=t.memoizedState;o!==d||f!==p||qa||e!==null&&e.dependencies!==null&&ca(e.dependencies)?(typeof s==`function`&&(qs(t,n,s,r),p=t.memoizedState),(u=qa||Ys(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ca(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,vc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ga(t,e.child,null,i),t.child=Ga(t,null,n,i)):cc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Nc(e,t,i),e}function Sc(e,t,n,r){return Zi(),t.flags|=256,cc(e,t,n,r),t.child}var Cc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function wc(e){return{baseLanes:e,cachePool:Oa()}}function Tc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Yl),e}function Ec(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(N.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(A){if(i?po(t):go(t),(e=k)?(e=rf(e,Gi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Fi===null?null:{id:Ii,overflow:Li},retryLane:536870912,hydrationErrors:null},n=Ti(e),n.return=t,t.child=n,Ui=t,k=null)):e=null,e===null)throw qi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,i?(go(t),i=t.mode,c=Oc({mode:`hidden`,children:c},i),r=Ci(r,i,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=wc(n),r.childLanes=Tc(e,o,n),t.memoizedState=Cc,pc(null,r)):(po(t),Dc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(a)t.flags&256?(po(t),t.flags&=-257,t=kc(e,t,n)):t.memoizedState===null?(go(t),c=r.fallback,i=t.mode,r=Oc({mode:`visible`,children:r.children},i),c=Ci(c,i,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ga(t,e.child,null,n),r=t.child,r.memoizedState=wc(n),r.childLanes=Tc(e,o,n),t.memoizedState=Cc,t=pc(null,r)):(go(t),t.child=e.child,t.flags|=128,t=null);else if(po(t),of(c)){if(o=c.nextSibling&&c.nextSibling.dataset,o)var u=o.dgst;o=u,r=Error(s(419)),r.stack=``,r.digest=o,$i({value:r,source:null,stack:null}),t=kc(e,t,n)}else if(z||sa(e,t,n,!1),o=(n&e.childLanes)!==0,z||o){if(o=G,o!==null&&(r=dt(o,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,pi(e,r),hu(o,e,r),sc;af(c)||Du(),t=kc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,k=cf(c.nextSibling),Ui=t,A=!0,Wi=null,Gi=!1,e!==null&&Hi(t,e),t=Dc(t,r.children),t.flags|=4096);return t}return i?(go(t),c=r.fallback,i=t.mode,l=e.child,u=l.sibling,r=bi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=Ci(c,i,n,null),c.flags|=2):c=bi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,pc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=wc(n):(i=c.cachePool,i===null?i=Oa():(l=M._currentValue,i=i.parent===l?i:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:i}),r.memoizedState=c,r.childLanes=Tc(e,o,n),t.memoizedState=Cc,pc(e.child,r)):(po(t),n=e.child,e=n.sibling,n=bi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Dc(e,t){return t=Oc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Oc(e,t){return e=vi(22,e,null,t),e.lanes=0,e}function kc(e,t,n){return Ga(t,e.child,null,n),e=Dc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ac(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),aa(e.return,t,n)}function jc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Mc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=N.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,D(N,o),cc(e,t,r,n),r=A?Mi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ac(e,n,t);else if(e.tag===19)Ac(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&vo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),jc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&vo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}jc(t,!0,n,null,a,r);break;case`together`:jc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Nc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Kl|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(sa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=bi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=bi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Pc(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ca(e)))}function Fc(e,t,n){switch(t.tag){case 3:be(t,t.stateNode.containerInfo),ra(t,M,e.memoizedState.cache),Zi();break;case 27:case 5:Se(t);break;case 4:be(t,t.stateNode.containerInfo);break;case 10:ra(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,mo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(po(t),e=Nc(e,t,n),e===null?null:e.sibling):Ec(e,t,n):(po(t),t.flags|=128,null);po(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=(sa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Mc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),D(N,N.current),r)break;return null;case 22:return t.lanes=0,fc(e,t,n,t.pendingProps);case 24:ra(t,M,e.memoizedState.cache)}return Nc(e,t,n)}function Ic(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)z=!0;else{if(!Pc(e,n)&&!(t.flags&128))return z=!1,Fc(e,t,n);z=!!(e.flags&131072)}}else z=!1,A&&t.flags&1048576&&zi(t,Mi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Fa(t.elementType),t.type=e,typeof e==`function`)yi(e)?(r=Zs(e,r),t.tag=1,t=xc(null,t,e,r,n)):(t.tag=0,t=yc(null,t,e,r,n));else{if(e!=null){var i=e.$$typeof;if(i===S){t.tag=11,t=lc(null,t,e,r,n);break a}if(i===ie){t.tag=14,t=uc(null,t,e,r,n);break a}}throw t=ue(e)||e,Error(s(306,t,``))}}return t;case 0:return yc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,i=Zs(r,t.pendingProps),xc(e,t,r,i,n);case 3:a:{if(be(t,t.stateNode.containerInfo),e===null)throw Error(s(387));r=t.pendingProps;var a=t.memoizedState;i=a.element,Ya(e,t),no(t,r,null,n);var o=t.memoizedState;if(r=o.cache,ra(t,M,r),r!==a.cache&&oa(t,[M],n,!0),to(),r=o.element,a.isDehydrated){if(a={element:r,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=Sc(e,t,r,n);break a}if(r!==i){i=Oi(Error(s(424)),t),$i(i),t=Sc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(k=cf(e.firstChild),Ui=t,A=!0,Wi=null,Gi=!0,n=Ka(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Zi(),r===i){t=Nc(e,t,n);break a}cc(e,t,r,n)}t=t.child}return t;case 26:return vc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:A||(n=t.type,e=t.pendingProps,r=Bd(ve.current).createElement(n),r[_t]=t,r[vt]=e,Pd(r,n,e),O(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Se(t),e===null&&A&&(r=t.stateNode=ff(t.type,t.pendingProps,ve.current),Ui=t,Gi=!0,i=k,Zd(t.type)?(lf=i,k=cf(r.firstChild)):k=i),cc(e,t,t.pendingProps.children,n),vc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&A&&((i=r=k)&&(r=tf(r,t.type,t.pendingProps,Gi),r===null?i=!1:(t.stateNode=r,Ui=t,k=cf(r.firstChild),Gi=!1,i=!0)),i||qi(t)),Se(t),i=t.type,a=t.pendingProps,o=e===null?null:e.memoizedProps,r=a.children,Ud(i,a)?r=null:o!==null&&Ud(i,o)&&(t.flags|=32),t.memoizedState!==null&&(i=Oo(e,t,jo,null,null,n),Qf._currentValue=i),vc(e,t),cc(e,t,r,n),t.child;case 6:return e===null&&A&&((e=n=k)&&(n=nf(n,t.pendingProps,Gi),n===null?e=!1:(t.stateNode=n,Ui=t,k=null,e=!0)),e||qi(t)),null;case 13:return Ec(e,t,n);case 4:return be(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ga(t,null,r,n):cc(e,t,r,n),t.child;case 11:return lc(e,t,t.type,t.pendingProps,n);case 7:return cc(e,t,t.pendingProps,n),t.child;case 8:return cc(e,t,t.pendingProps.children,n),t.child;case 12:return cc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,ra(t,t.type,r.value),cc(e,t,r.children,n),t.child;case 9:return i=t.type._context,r=t.pendingProps.children,la(t),i=j(i),r=r(i),t.flags|=1,cc(e,t,r,n),t.child;case 14:return uc(e,t,t.type,t.pendingProps,n);case 15:return dc(e,t,t.type,t.pendingProps,n);case 19:return Mc(e,t,n);case 31:return _c(e,t,n);case 22:return fc(e,t,n,t.pendingProps);case 24:return la(t),r=j(M),e===null?(i=Ea(),i===null&&(i=G,a=ha(),i.pooledCache=a,a.refCount++,a!==null&&(i.pooledCacheLanes|=n),i=a),t.memoizedState={parent:r,cache:i},Ja(t),ra(t,M,i)):((e.lanes&n)!==0&&(Ya(e,t),no(t,null,null,n),to()),i=e.memoizedState,a=t.memoizedState,i.parent===r?(r=a.cache,ra(t,M,r),r!==i.cache&&oa(t,[M],n,!0)):(i={parent:r,cache:r},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),ra(t,M,r))),cc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(s(156,t.tag))}function Lc(e){e.flags|=4}function Rc(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Ia=Ma,Aa}}else e.flags&=-16777217}function zc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(wu())e.flags|=8192;else throw Ia=Ma,Aa}}function Bc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:at(),e.lanes|=t,Xl|=t)}function Vc(e,t){if(!A)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function B(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Hc(e,t,n){var r=t.pendingProps;switch(Vi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return B(t),null;case 1:return B(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ia(M),xe(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Xi(t)?Lc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Qi())),B(t),null;case 26:var i=t.type,a=t.memoizedState;return e===null?(Lc(t),a===null?(B(t),Rc(t,i,null,r,n)):(B(t),zc(t,a))):a?a===e.memoizedState?(B(t),t.flags&=-16777217):(Lc(t),B(t),zc(t,a)):(e=e.memoizedProps,e!==r&&Lc(t),B(t),Rc(t,i,e,r,n)),null;case 27:if(Ce(t),n=ve.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Lc(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return B(t),null}e=ge.current,Xi(t)?Ji(t,e):(e=ff(i,r,n),t.stateNode=e,Lc(t))}return B(t),null;case 5:if(Ce(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Lc(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return B(t),null}if(a=ge.current,Xi(t))Ji(t,a);else{var o=Bd(ve.current);switch(a){case 1:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case 2:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;default:switch(i){case`svg`:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case`math`:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;case`script`:a=o.createElement(`div`),a.innerHTML=`<script><\/script>`,a=a.removeChild(a.firstChild);break;case`select`:a=typeof r.is==`string`?o.createElement(`select`,{is:r.is}):o.createElement(`select`),r.multiple?a.multiple=!0:r.size&&(a.size=r.size);break;default:a=typeof r.is==`string`?o.createElement(i,{is:r.is}):o.createElement(i)}}a[_t]=t,a[vt]=r;a:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)a.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break a;for(;o.sibling===null;){if(o.return===null||o.return===t)break a;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=a;a:switch(Pd(a,i,r),i){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Lc(t)}}return B(t),Rc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Lc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(s(166));if(e=ve.current,Xi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,i=Ui,i!==null)switch(i.tag){case 27:case 5:r=i.memoizedProps}e[_t]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||qi(t,!0)}else e=Bd(e).createTextNode(r),e[_t]=t,t.stateNode=e}return B(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Xi(t),n!==null){if(e===null){if(!r)throw Error(s(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(557));e[_t]=t}else Zi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;B(t),e=!1}else n=Qi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(_o(t),t):(_o(t),null);if(t.flags&128)throw Error(s(558))}return B(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=Xi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(s(318));if(i=t.memoizedState,i=i===null?null:i.dehydrated,!i)throw Error(s(317));i[_t]=t}else Zi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;B(t),i=!1}else i=Qi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(_o(t),t):(_o(t),null)}return _o(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,i=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(i=r.alternate.memoizedState.cachePool.pool),a=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(a=r.memoizedState.cachePool.pool),a!==i&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Bc(t,t.updateQueue),B(t),null);case 4:return xe(),e===null&&Sd(t.stateNode.containerInfo),B(t),null;case 10:return ia(t.type),B(t),null;case 19:if(E(N),r=t.memoizedState,r===null)return B(t),null;if(i=!!(t.flags&128),a=r.rendering,a===null){if(i)Vc(r,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=vo(e),a!==null){for(t.flags|=128,Vc(r,!1),e=a.updateQueue,t.updateQueue=e,Bc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)xi(n,e),n=n.sibling;return D(N,N.current&1|2),A&&Ri(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ie()>nu&&(t.flags|=128,i=!0,Vc(r,!1),t.lanes=4194304)}}else{if(!i){if(e=vo(a),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,Bc(t,e),Vc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!a.alternate&&!A)return B(t),null}else 2*Ie()-r.renderingStartTime>nu&&n!==536870912&&(t.flags|=128,i=!0,Vc(r,!1),t.lanes=4194304)}r.isBackwards?(a.sibling=t.child,t.child=a):(e=r.last,e===null?t.child=a:e.sibling=a,r.last=a)}return r.tail===null?(B(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ie(),e.sibling=null,n=N.current,D(N,i?n&1|2:n&1),A&&Ri(t,r.treeForkCount),e);case 22:case 23:return _o(t),lo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(B(t),t.subtreeFlags&6&&(t.flags|=8192)):B(t),n=t.updateQueue,n!==null&&Bc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&E(Ta),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ia(M),B(t),null;case 25:return null;case 30:return null}throw Error(s(156,t.tag))}function Uc(e,t){switch(Vi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ia(M),xe(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ce(t),null;case 31:if(t.memoizedState!==null){if(_o(t),t.alternate===null)throw Error(s(340));Zi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(_o(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));Zi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return E(N),null;case 4:return xe(),null;case 10:return ia(t.type),null;case 22:case 23:return _o(t),lo(),e!==null&&E(Ta),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ia(M),null;case 25:return null;default:return null}}function Wc(e,t){switch(Vi(t),t.tag){case 3:ia(M),xe();break;case 26:case 27:case 5:Ce(t);break;case 4:xe();break;case 31:t.memoizedState!==null&&_o(t);break;case 13:_o(t);break;case 19:E(N);break;case 10:ia(t.type);break;case 22:case 23:_o(t),lo(),e!==null&&E(Ta);break;case 24:ia(M)}}function Gc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Kc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function qc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{io(t,n)}catch(t){Z(e,e.return,t)}}}function Jc(e,t,n){n.props=Zs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Yc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Xc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Zc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Qc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[vt]=t}catch(t){Z(e,e.return,t)}}function $c(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function el(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||$c(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function tl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=un));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(tl(e,t,n),e=e.sibling;e!==null;)tl(e,t,n),e=e.sibling}function nl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(nl(e,t,n),e=e.sibling;e!==null;)nl(e,t,n),e=e.sibling}function rl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[_t]=e,t[vt]=n}catch(t){Z(e,e.return,t)}}var il=!1,V=!1,al=!1,ol=typeof WeakSet==`function`?WeakSet:Set,H=null;function sl(e,t){if(e=e.containerInfo,Rd=sp,e=Lr(e),Rr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break a}var o=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||i!==0&&f.nodeType!==3||(c=o+i),f!==a||r!==0&&f.nodeType!==3||(l=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===i&&(c=o),p===a&&++d===r&&(l=o),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,H=t;H!==null;)if(t=H,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,H=e;else for(;H!==null;){switch(t=H,a=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)i=e[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&a!==null){e=void 0,n=t,i=a.memoizedProps,a=a.memoizedState,r=n.stateNode;try{var h=Zs(n.type,i);e=r.getSnapshotBeforeUpdate(h,a),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(s(163))}if(e=t.sibling,e!==null){e.return=t.return,H=e;break}H=t.return}}function cl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Sl(e,n),r&4&&Gc(5,n);break;case 1:if(Sl(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Zs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&qc(n),r&512&&Yc(n,n.return);break;case 3:if(Sl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{io(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&rl(n);case 26:case 5:Sl(e,n),t===null&&r&4&&Zc(n),r&512&&Yc(n,n.return);break;case 12:Sl(e,n);break;case 31:Sl(e,n),r&4&&pl(e,n);break;case 13:Sl(e,n),r&4&&ml(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||il,!r){t=t!==null&&t.memoizedState!==null||V,i=il;var a=V;il=r,(V=t)&&!a?wl(e,n,!!(n.subtreeFlags&8772)):Sl(e,n),il=i,V=a}break;case 30:break;default:Sl(e,n)}}function ll(e){var t=e.alternate;t!==null&&(e.alternate=null,ll(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Tt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var U=null,ul=!1;function dl(e,t,n){for(n=n.child;n!==null;)fl(e,t,n),n=n.sibling}function fl(e,t,n){if(Ke&&typeof Ke.onCommitFiberUnmount==`function`)try{Ke.onCommitFiberUnmount(Ge,n)}catch{}switch(n.tag){case 26:V||Xc(n,t),dl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:V||Xc(n,t);var r=U,i=ul;Zd(n.type)&&(U=n.stateNode,ul=!1),dl(e,t,n),pf(n.stateNode),U=r,ul=i;break;case 5:V||Xc(n,t);case 6:if(r=U,i=ul,U=null,dl(e,t,n),U=r,ul=i,U!==null){if(ul)try{(U.nodeType===9?U.body:U.nodeName===`HTML`?U.ownerDocument.body:U).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{U.removeChild(n.stateNode)}catch(e){Z(n,t,e)}}break;case 18:U!==null&&(ul?(e=U,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(U,n.stateNode));break;case 4:r=U,i=ul,U=n.stateNode.containerInfo,ul=!0,dl(e,t,n),U=r,ul=i;break;case 0:case 11:case 14:case 15:Kc(2,n,t),V||Kc(4,n,t),dl(e,t,n);break;case 1:V||(Xc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Jc(n,t,r)),dl(e,t,n);break;case 21:dl(e,t,n);break;case 22:V=(r=V)||n.memoizedState!==null,dl(e,t,n),V=r;break;default:dl(e,t,n)}}function pl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function ml(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function hl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ol),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ol),t;default:throw Error(s(435,e.tag))}}function gl(e,t){var n=hl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function _l(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r],a=e,o=t,c=o;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){U=c.stateNode,ul=!1;break a}break;case 5:U=c.stateNode,ul=!1;break a;case 3:case 4:U=c.stateNode.containerInfo,ul=!0;break a}c=c.return}if(U===null)throw Error(s(160));fl(a,o,i),U=null,ul=!1,a=i.alternate,a!==null&&(a.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)yl(t,e),t=t.sibling}var vl=null;function yl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:_l(t,e),bl(e),r&4&&(Kc(3,e,e.return),Gc(3,e),Kc(5,e,e.return));break;case 1:_l(t,e),bl(e),r&512&&(V||n===null||Xc(n,n.return)),r&64&&il&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var i=vl;if(_l(t,e),bl(e),r&512&&(V||n===null||Xc(n,n.return)),r&4){var a=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,i=i.ownerDocument||i;b:switch(r){case`title`:a=i.getElementsByTagName(`title`)[0],(!a||a[wt]||a[_t]||a.namespaceURI===`http://www.w3.org/2000/svg`||a.hasAttribute(`itemprop`))&&(a=i.createElement(r),i.head.insertBefore(a,i.querySelector(`head > title`))),Pd(a,r,n),a[_t]=e,O(a),r=a;break a;case`link`:var o=Vf(`link`,`href`,i).get(r+(n.href||``));if(o){for(var c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&a.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&a.getAttribute(`title`)===(n.title==null?null:n.title)&&a.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;case`meta`:if(o=Vf(`meta`,`content`,i).get(r+(n.content||``))){for(c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`content`)===(n.content==null?null:``+n.content)&&a.getAttribute(`name`)===(n.name==null?null:n.name)&&a.getAttribute(`property`)===(n.property==null?null:n.property)&&a.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&a.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;default:throw Error(s(468,r))}a[_t]=e,O(a),r=a}e.stateNode=r}else Hf(i,e.type,e.stateNode)}else e.stateNode=If(i,r,e.memoizedProps)}else a===r?r===null&&e.stateNode!==null&&Qc(e,e.memoizedProps,n.memoizedProps):(a===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):a.count--,r===null?Hf(i,e.type,e.stateNode):If(i,r,e.memoizedProps))}break;case 27:_l(t,e),bl(e),r&512&&(V||n===null||Xc(n,n.return)),n!==null&&r&4&&Qc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(_l(t,e),bl(e),r&512&&(V||n===null||Xc(n,n.return)),e.flags&32){i=e.stateNode;try{tn(i,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(i=e.memoizedProps,Qc(e,i,n===null?i:n.memoizedProps)),r&1024&&(al=!0);break;case 6:if(_l(t,e),bl(e),r&4){if(e.stateNode===null)throw Error(s(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,i=vl,vl=gf(t.containerInfo),_l(t,e),vl=i,bl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}al&&(al=!1,xl(e));break;case 4:r=vl,vl=gf(e.stateNode.containerInfo),_l(t,e),bl(e),vl=r;break;case 12:_l(t,e),bl(e);break;case 31:_l(t,e),bl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 13:_l(t,e),bl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(eu=Ie()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 22:i=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=il,d=V;if(il=u||i,V=d||l,_l(t,e),V=d,il=u,bl(e),r&8192)a:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(n===null||l||il||V||Cl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(a=l.stateNode,i)o=a.style,typeof o.setProperty==`function`?o.setProperty(`display`,`none`,`important`):o.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=i?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;i?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,gl(e,n))));break;case 19:_l(t,e),bl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 30:break;case 21:break;default:_l(t,e),bl(e)}}function bl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if($c(r)){n=r;break}r=r.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var i=n.stateNode;nl(e,el(e),i);break;case 5:var a=n.stateNode;n.flags&32&&(tn(a,``),n.flags&=-33),nl(e,el(e),a);break;case 3:case 4:var o=n.stateNode.containerInfo;tl(e,el(e),o);break;default:throw Error(s(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function xl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;xl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Sl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)cl(e,t.alternate,t),t=t.sibling}function Cl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Kc(4,t,t.return),Cl(t);break;case 1:Xc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Jc(t,t.return,n),Cl(t);break;case 27:pf(t.stateNode);case 26:case 5:Xc(t,t.return),Cl(t);break;case 22:t.memoizedState===null&&Cl(t);break;case 30:Cl(t);break;default:Cl(t)}e=e.sibling}}function wl(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:wl(i,a,n),Gc(4,a);break;case 1:if(wl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)ro(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&qc(a),Yc(a,a.return);break;case 27:rl(a);case 26:case 5:wl(i,a,n),n&&r===null&&o&4&&Zc(a),Yc(a,a.return);break;case 12:wl(i,a,n);break;case 31:wl(i,a,n),n&&o&4&&pl(i,a);break;case 13:wl(i,a,n),n&&o&4&&ml(i,a);break;case 22:a.memoizedState===null&&wl(i,a,n),Yc(a,a.return);break;case 30:break;default:wl(i,a,n)}t=t.sibling}}function Tl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ga(n))}function El(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ga(e))}function Dl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ol(e,t,n,r),t=t.sibling}function Ol(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Dl(e,t,n,r),i&2048&&Gc(9,t);break;case 1:Dl(e,t,n,r);break;case 3:Dl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ga(e)));break;case 12:if(i&2048){Dl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Dl(e,t,n,r);break;case 31:Dl(e,t,n,r);break;case 13:Dl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Dl(e,t,n,r):(a._visibility|=2,kl(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?Dl(e,t,n,r):Al(e,t),i&2048&&Tl(o,t);break;case 24:Dl(e,t,n,r),i&2048&&El(t.alternate,t);break;default:Dl(e,t,n,r)}}function kl(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:kl(a,o,s,c,i),Gc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,kl(a,o,s,c,i)):u._visibility&2?kl(a,o,s,c,i):Al(a,o),i&&l&2048&&Tl(o.alternate,o);break;case 24:kl(a,o,s,c,i),i&&l&2048&&El(o.alternate,o);break;default:kl(a,o,s,c,i)}t=t.sibling}}function Al(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Al(n,r),i&2048&&Tl(r.alternate,r);break;case 24:Al(n,r),i&2048&&El(r.alternate,r);break;default:Al(n,r)}t=t.sibling}}var jl=8192;function Ml(e,t,n){if(e.subtreeFlags&jl)for(e=e.child;e!==null;)Nl(e,t,n),e=e.sibling}function Nl(e,t,n){switch(e.tag){case 26:Ml(e,t,n),e.flags&jl&&e.memoizedState!==null&&Gf(n,vl,e.memoizedState,e.memoizedProps);break;case 5:Ml(e,t,n);break;case 3:case 4:var r=vl;vl=gf(e.stateNode.containerInfo),Ml(e,t,n),vl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=jl,jl=16777216,Ml(e,t,n),jl=r):Ml(e,t,n));break;default:Ml(e,t,n)}}function Pl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];H=r,Rl(r,e)}Pl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Il(e),e=e.sibling}function Il(e){switch(e.tag){case 0:case 11:case 15:Fl(e),e.flags&2048&&Kc(9,e,e.return);break;case 3:Fl(e);break;case 12:Fl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ll(e)):Fl(e);break;default:Fl(e)}}function Ll(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];H=r,Rl(r,e)}Pl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Kc(8,t,t.return),Ll(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ll(t));break;default:Ll(t)}e=e.sibling}}function Rl(e,t){for(;H!==null;){var n=H;switch(n.tag){case 0:case 11:case 15:Kc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ga(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,H=r;else a:for(n=e;H!==null;){r=H;var i=r.sibling,a=r.return;if(ll(r),r===n){H=null;break a}if(i!==null){i.return=a,H=i;break a}H=a}}}var zl={getCacheForType:function(e){var t=j(M),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return j(M).controller.signal}},Bl=typeof WeakMap==`function`?WeakMap:Map,W=0,G=null,K=null,q=0,J=0,Vl=null,Hl=!1,Ul=!1,Wl=!1,Gl=0,Y=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=0,Zl=null,Ql=null,$l=!1,eu=0,tu=0,nu=1/0,ru=null,iu=null,X=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return W&2&&q!==0?q&-q:w.T===null?mt():dd()}function mu(){if(Yl===0){if(!(q&536870912)||A){var e=$e;$e<<=1,!($e&3932160)&&($e=262144),Yl=e}else Yl=536870912}return e=uo.current,e!==null&&(e.flags|=32),Yl}function hu(e,t,n){(e===G&&(J===2||J===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,q,Yl,!1)),st(e,n),(!(W&2)||e!==G)&&(e===G&&(!(W&2)&&(ql|=n),Y===4&&yu(e,q,Yl,!1)),rd(e))}function gu(e,t,n){if(W&6)throw Error(s(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||rt(e,t),i=r?Au(e,t):Ou(e,t,!0),a=r;do{if(i===0){Ul&&!r&&yu(e,t,0,!1);break}if(n=e.current.alternate,a&&!vu(n)){i=Ou(e,t,!1),a=!1;continue}if(i===2){if(a=t,e.errorRecoveryDisabledLanes&a)var o=0;else o=e.pendingLanes&-536870913,o=o===0?o&536870912?536870912:0:o;if(o!==0){t=o;a:{var c=e;i=Zl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,o).flags|=256),o=Ou(c,o,!1),o!==2){if(Wl&&!l){c.errorRecoveryDisabledLanes|=a,ql|=a,i=4;break a}a=Ql,Ql=i,a!==null&&(Ql===null?Ql=a:Ql.push.apply(Ql,a))}i=o}if(a=!1,i!==2)continue}}if(i===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,a=i,a){case 0:case 1:throw Error(s(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Yl,!Hl);break a;case 2:Ql=null;break;case 3:case 5:break;default:throw Error(s(329))}if((t&62914560)===t&&(i=eu+300-Ie(),10<i)){if(yu(r,t,Yl,!Hl),nt(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Ql,ru,$l,t,Yl,ql,Xl,Hl,a,`Throttled`,-0,0),i);break a}_u(r,n,Ql,ru,$l,t,Yl,ql,Xl,Hl,a,null,-0,0)}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:un},Nl(t,a,d);var m=(a&62914560)===a?eu-Ie():(a&4194048)===a?tu-Ie():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Mr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~Jl,t&=~ql,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Je(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&lt(e,n,t)}function bu(){return W&6?!0:(id(0,!1),!1)}function xu(){if(K!==null){if(J===0)var e=K.return;else e=K,na=ta=null,Po(e),za=null,Ba=0,e=K;for(;e!==null;)Wc(e.alternate,e),e=e.return;K=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),G=e,K=n=bi(e.current,null),q=t,J=0,Vl=null,Hl=!1,Ul=rt(e,t),Wl=!1,Xl=Yl=Jl=ql=Kl=Y=0,Ql=Zl=null,$l=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Je(r),a=1<<i;t|=e[i],r&=~a}return Gl=t,ui(),n}function Cu(e,t){P=null,w.H=Us,t===ka||t===ja?(t=La(),J=3):t===Aa?(t=La(),J=4):J=t===sc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Vl=t,K===null&&(Y=1,tc(e,Oi(t,e.current)))}function wu(){var e=uo.current;return e===null?!0:(q&4194048)===q?fo===null:(q&62914560)===q||q&536870912?e===fo:!1}function Tu(){var e=w.H;return w.H=Us,e===null?Us:e}function Eu(){var e=w.A;return w.A=zl,e}function Du(){Y=4,Hl||(q&4194048)!==q&&uo.current!==null||(Ul=!0),!(Kl&134217727)&&!(ql&134217727)||G===null||yu(G,q,Yl,!1)}function Ou(e,t,n){var r=W;W|=2;var i=Tu(),a=Eu();(G!==e||q!==t)&&(ru=null,Su(e,t)),t=!1;var o=Y;a:do try{if(J!==0&&K!==null){var s=K,c=Vl;switch(J){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:uo.current===null&&(t=!0);var l=J;if(J=0,Vl=null,Pu(e,s,c,l),n&&Ul){o=0;break a}break;default:l=J,J=0,Vl=null,Pu(e,s,c,l)}}ku(),o=Y;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,na=ta=null,W=r,w.H=i,w.A=a,K===null&&(G=null,q=0,ui()),o}function ku(){for(;K!==null;)Mu(K)}function Au(e,t){var n=W;W|=2;var r=Tu(),i=Eu();G!==e||q!==t?(ru=null,nu=Ie()+500,Su(e,t)):Ul=rt(e,t);a:do try{if(J!==0&&K!==null){t=K;var a=Vl;b:switch(J){case 1:J=0,Vl=null,Pu(e,t,a,1);break;case 2:case 9:if(Na(a)){J=0,Vl=null,Nu(t);break}t=function(){J!==2&&J!==9||G!==e||(J=7),rd(e)},a.then(t,t);break a;case 3:J=7;break a;case 4:J=5;break a;case 7:Na(a)?(J=0,Vl=null,Nu(t)):(J=0,Vl=null,Pu(e,t,a,7));break;case 5:var o=null;switch(K.tag){case 26:o=K.memoizedState;case 5:case 27:var c=K;if(o?Wf(o):c.stateNode.complete){J=0,Vl=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,Fu(u))}break b}}J=0,Vl=null,Pu(e,t,a,5);break;case 6:J=0,Vl=null,Pu(e,t,a,6);break;case 8:xu(),Y=6;break a;default:throw Error(s(462))}}ju();break}catch(t){Cu(e,t)}while(1);return na=ta=null,w.H=r,w.A=i,W=n,K===null?(G=null,q=0,ui(),Y):0}function ju(){for(;K!==null&&!Pe();)Mu(K)}function Mu(e){var t=Ic(e.alternate,e,Gl);e.memoizedProps=e.pendingProps,t===null?Fu(e):K=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=bc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=bc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:Po(t);default:Wc(n,t),t=K=xi(t,Gl),t=Ic(n,t,Gl)}e.memoizedProps=e.pendingProps,t===null?Fu(e):K=t}function Pu(e,t,n,r){na=ta=null,Po(t),za=null,Ba=0;var i=t.return;try{if(oc(e,i,t,n,q)){Y=1,tc(e,Oi(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;Y=1,tc(e,Oi(n,e.current)),K=null;return}t.flags&32768?(A||r===1?e=!0:Ul||q&536870912?e=!1:(Hl=e=!0,(r===2||r===9||r===3||r===6)&&(r=uo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Hl);return}e=t.return;var n=Hc(t.alternate,t,Gl);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Y===0&&(Y=5)}function Iu(e,t){do{var n=Uc(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);Y=6,K=null}function Lu(e,t,n,r,i,a,o,c,l){e.cancelPendingCommit=null;do Hu();while(X!==0);if(W&6)throw Error(s(327));if(t!==null){if(t===e.current)throw Error(s(177));if(a=t.lanes|t.childLanes,a|=li,ct(e,n,a,o,c,l),e===G&&(K=G=null,q=0),ou=t,au=e,su=n,cu=a,lu=i,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Be,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=w.T,w.T=null,i=T.p,T.p=2,o=W,W|=4;try{sl(e,t,n)}finally{W=o,T.p=i,w.T=r}}X=1,Ru(),zu(),Bu()}}function Ru(){if(X===1){X=0;var e=au,t=ou,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=w.T,w.T=null;var r=T.p;T.p=2;var i=W;W|=4;try{yl(t,e);var a=zd,o=Lr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Ir(s.ownerDocument.documentElement,s)){if(c!==null&&Rr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Fr(s,h),v=Fr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{W=i,T.p=r,w.T=n}}e.current=t,X=2}}function zu(){if(X===2){X=0;var e=au,t=ou,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=w.T,w.T=null;var r=T.p;T.p=2;var i=W;W|=4;try{cl(e,t.alternate,t)}finally{W=i,T.p=r,w.T=n}}X=3}}function Bu(){if(X===4||X===3){X=0,Fe();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?X=5:(X=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(iu=null),pt(n),t=t.stateNode,Ke&&typeof Ke.onCommitFiberRoot==`function`)try{Ke.onCommitFiberRoot(Ge,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=w.T,i=T.p,T.p=2,w.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{w.T=t,T.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ga(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(X!==5)return!1;var e=au,t=cu;cu=0;var n=pt(su),r=w.T,i=T.p;try{T.p=32>n?32:n,w.T=null,n=lu,lu=null;var a=au,o=su;if(X=0,ou=au=null,su=0,W&6)throw Error(s(331));var c=W;if(W|=4,Il(a.current),Ol(a,a.current,o,n),W=c,id(0,!1),Ke&&typeof Ke.onPostCommitFiberRoot==`function`)try{Ke.onPostCommitFiberRoot(Ge,a)}catch{}return!0}finally{T.p=i,w.T=r,Vu(e,t)}}function Wu(e,t,n){t=Oi(n,t),t=rc(e.stateNode,t,2),e=Za(e,t,2),e!==null&&(st(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(iu===null||!iu.has(r))){e=Oi(n,e),n=ic(2),r=Za(t,n,2),r!==null&&(ac(n,r,t,e),st(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Bl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Wl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,G===e&&(q&n)===n&&(Y===4||Y===3&&(q&62914560)===q&&300>Ie()-eu?!(W&2)&&Su(e,0):Jl|=n,Xl===q&&(Xl=0)),rd(e)}function qu(e,t){t===0&&(t=at()),e=pi(e,t),e!==null&&(st(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Me(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Je(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=q,a=nt(r,r===G?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||rt(r,a)||(n=!0,ld(r,a))}r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Ie(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}X!==0&&X!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Je(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=it(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=G,n=q,n=nt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(J===2||J===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ne(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||rt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ne(r),pt(n)){case 2:case 8:n=ze;break;case 32:n=Be;break;case 268435456:n=He;break;default:n=Be}return r=cd.bind(null,e),n=Me(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ne(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(X!==0&&X!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=q;return r=nt(e,e===G?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Ie()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){W&6?Me(Re,ad):od()})}function dd(){if(nd===0){var e=ya;e===0&&(e=Qe,Qe<<=1,!(Qe&261888)&&(Qe=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:ln(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[vt]||null).action),o=r.submitter;o&&(t=(t=o[vt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new jn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);ks(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),ks(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<ii.length;hd++){var gd=ii[hd];ai(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}ai(Xr,`onAnimationEnd`),ai(Zr,`onAnimationIteration`),ai(Qr,`onAnimationStart`),ai(`dblclick`,`onDoubleClick`),ai(`focusin`,`onFocus`),ai(`focusout`,`onBlur`),ai($r,`onTransitionRun`),ai(ei,`onTransitionStart`),ai(ti,`onTransitionCancel`),ai(ni,`onTransitionEnd`),Nt(`onMouseEnter`,[`mouseout`,`mouseover`]),Nt(`onMouseLeave`,[`mouseout`,`mouseover`]),Nt(`onPointerEnter`,[`pointerout`,`pointerover`]),Nt(`onPointerLeave`,[`pointerout`,`pointerover`]),Mt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Mt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Mt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Mt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Mt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Mt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){oi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){oi(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[bt];n===void 0&&(n=t[bt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,At.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!bn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&o.stateNode.containerInfo===i)return;o=o.return}for(;s!==null;){if(o=Et(s),o===null)return;if(c=o.tag,c===5||c===6||c===26||c===27){r=a=o;continue a}s=s.parentNode}}r=r.return}_n(function(){var r=a,i=fn(n),o=[];a:{var s=ri.get(e);if(s!==void 0){var c=jn,u=e;switch(e){case`keypress`:if(En(n)===0)break a;case`keydown`:case`keyup`:c=Yn;break;case`focusin`:u=`focus`,c=Bn;break;case`focusout`:u=`blur`,c=Bn;break;case`beforeblur`:case`afterblur`:c=Bn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:c=Rn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:c=zn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:c=Zn;break;case Xr:case Zr:case Qr:c=Vn;break;case ni:c=Qn;break;case`scroll`:case`scrollend`:c=Nn;break;case`wheel`:c=$n;break;case`copy`:case`cut`:case`paste`:c=Hn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:c=Xn;break;case`toggle`:case`beforetoggle`:c=er}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?s===null?null:s+`Capture`:s;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=vn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(s=new c(s,u,null,n,i),o.push({event:s,listeners:d}))}}if(!(t&7)){a:{if(s=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,s&&n!==dn&&(u=n.relatedTarget||n.fromElement)&&(Et(u)||u[yt]))break a;if((c||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,c?(u=n.relatedTarget||n.toElement,c=r,u=u?Et(u):null,u!==null&&(f=l(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(c=null,u=r),c!==u)){if(d=Rn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Xn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?s:Ot(c),h=u==null?s:Ot(u),s=new d(g,m+`leave`,c,n,i),s.target=f,s.relatedTarget=h,g=null,Et(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,c&&u)b:{for(d=Dd,p=c,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;c!==null&&Od(o,s,c,d,!1),u!==null&&f!==null&&Od(o,f,u,d,!0)}}a:{if(s=r?Ot(r):window,c=s.nodeName&&s.nodeName.toLowerCase(),c===`select`||c===`input`&&s.type===`file`)var v=br;else if(mr(s)){if(xr)v=Ar;else{v=Or;var y=Dr}}else c=s.nodeName,!c||c.toLowerCase()!==`input`||s.type!==`checkbox`&&s.type!==`radio`?r&&on(r.elementType)&&(v=br):v=kr;if(v&&=v(e,r)){hr(o,v,n,i);break a}y&&y(e,s,r),e===`focusout`&&r&&s.type===`number`&&r.memoizedProps.value!=null&&Zt(s,`number`,s.value)}switch(y=r?Ot(r):window,e){case`focusin`:(mr(y)||y.contentEditable===`true`)&&(Br=y,Vr=r,Hr=null);break;case`focusout`:Hr=Vr=Br=null;break;case`mousedown`:Ur=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Ur=!1,Wr(o,n,i);break;case`selectionchange`:if(zr)break;case`keydown`:case`keyup`:Wr(o,n,i)}var b;if(nr)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else ur?cr(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(ar&&n.locale!==`ko`&&(ur||x!==`onCompositionStart`?x===`onCompositionEnd`&&ur&&(b=Tn()):(Sn=i,Cn=`value`in Sn?Sn.value:Sn.textContent,ur=!0)),y=Ed(r,x),0<y.length&&(x=new Un(x,e,null,n,i),o.push({event:x,listeners:y}),b?x.data=b:(b=lr(n),b!==null&&(x.data=b)))),(b=ir?dr(e,n):fr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Un(`onBeforeInput`,`beforeinput`,null,n,i),o.push({event:y,listeners:x}),y.data=b)),md(o,e,r,n,i)}yd(o,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=vn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=vn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=vn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=vn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,i,a){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||tn(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&tn(e,``+r);break;case`className`:zt(e,`class`,r);break;case`tabIndex`:zt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:zt(e,n,r);break;case`style`:an(e,r,a);break;case`data`:if(t!==`object`){zt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=ln(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof a==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,i.name,i,null),$(e,t,`formEncType`,i.formEncType,i,null),$(e,t,`formMethod`,i.formMethod,i,null),$(e,t,`formTarget`,i.formTarget,i,null)):($(e,t,`encType`,i.encType,i,null),$(e,t,`method`,i.method,i,null),$(e,t,`target`,i.target,i,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=ln(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=un);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=ln(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Rt(e,`popover`,r);break;case`xlinkActuate`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Rt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=sn.get(n)||n,Rt(e,n,r))}}function Nd(e,t,n,r,i,a){switch(n){case`style`:an(e,r,a);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?tn(e,r):(typeof r==`number`||typeof r==`bigint`)&&tn(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=un);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!jt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(i=n.endsWith(`Capture`),t=n.slice(2,i?n.length-7:void 0),a=e[vt]||null,a=a==null?null:a[n],typeof a==`function`&&e.removeEventListener(t,a,i),typeof r==`function`)){typeof a!=`function`&&a!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,i);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Rt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,i=!1,a;for(a in n)if(n.hasOwnProperty(a)){var o=n[a];if(o!=null)switch(a){case`src`:r=!0;break;case`srcSet`:i=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,a,o,n,null)}}i&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=a=o=i=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:i=d;break;case`type`:o=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:a=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(s(137,t));break;default:$(e,t,r,d,n,null)}}Xt(e,a,c,l,u,o,i,!1);return;case`select`:for(i in Q(`invalid`,e),r=o=a=null,n)if(n.hasOwnProperty(i)&&(c=n[i],c!=null))switch(i){case`value`:a=c;break;case`defaultValue`:o=c;break;case`multiple`:r=c;default:$(e,t,i,c,n,null)}t=a,n=o,e.multiple=!!r,t==null?n!=null&&Qt(e,!!r,n,!0):Qt(e,!!r,t,!1);return;case`textarea`:for(o in Q(`invalid`,e),a=i=r=null,n)if(n.hasOwnProperty(o)&&(c=n[o],c!=null))switch(o){case`value`:r=c;break;case`defaultValue`:i=c;break;case`children`:a=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(s(91));break;default:$(e,t,o,c,n,null)}en(e,r,i,a);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,u,r,n,null)}return;default:if(on(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var i=null,a=null,o=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:a=m;break;case`name`:i=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:o=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(s(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Yt(e,o,c,l,u,d,a,i);return;case`select`:for(a in m=o=c=p=null,n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(a)||$(e,t,a,null,r,l)}for(i in r)if(a=r[i],l=n[i],r.hasOwnProperty(i)&&(a!=null||l!=null))switch(i){case`value`:p=a;break;case`defaultValue`:c=a;break;case`multiple`:o=a;default:a!==l&&$(e,t,i,a,r,l)}t=c,n=o,r=m,p==null?!!r!=!!n&&(t==null?Qt(e,!!n,n?[]:``,!1):Qt(e,!!n,t,!0)):Qt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(i=n[c],n.hasOwnProperty(c)&&i!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,i)}for(o in r)if(i=r[o],a=n[o],r.hasOwnProperty(o)&&(i!=null||a!=null))switch(o){case`value`:p=i;break;case`defaultValue`:m=i;break;case`children`:break;case`dangerouslySetInnerHTML`:if(i!=null)throw Error(s(91));break;default:i!==a&&$(e,t,o,i,r,a)}$t(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(s(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(on(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[wt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),Tt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[wt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(s(452));return e;case`head`:if(e=t.head,!e)throw Error(s(453));return e;case`body`:if(e=t.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Tt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=T.d;T.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=Dt(e);t!==null&&t.tag===5&&t.type===`form`?js(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Jt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),O(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Jt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Jt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Jt(n.imageSizes)+`"]`)):i+=`[href="`+Jt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),O(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Jt(r)+`"][href="`+Jt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),O(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=kt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);O(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=kt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),O(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=kt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),O(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var i=(i=ve.current)?gf(i):null;if(!i)throw Error(s(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=kt(i).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var a=kt(i).hoistableStyles,o=a.get(e);if(o||(i=i.ownerDocument||i,o={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},a.set(e,o),(a=i.querySelector(jf(e)))&&!a._p&&(o.instance=a,o.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),a||Nf(i,e,n,o.state))),t&&r===null)throw Error(s(528,``));return o}if(t&&r!==null)throw Error(s(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=kt(i).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Af(e){return`href="`+Jt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),O(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Jt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Jt(n.href)+`"]`);if(r)return t.instance=r,O(r),r;var i=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),O(r),Pd(r,`style`,i),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:i=Af(n.href);var a=e.querySelector(jf(i));if(a)return t.state.loading|=4,t.instance=a,O(a),a;r=Mf(n),(i=mf.get(i))&&Rf(r,i),a=(e.ownerDocument||e).createElement(`link`),O(a);var o=a;return o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),t.state.loading|=4,Lf(a,n.precedence,e),t.instance=a;case`script`:return a=Pf(n.src),(i=e.querySelector(Ff(a)))?(t.instance=i,O(i),i):(r=n,(i=mf.get(a))&&(r=h({},n),zf(r,i)),e=e.ownerDocument||e,i=e.createElement(`script`),O(i),Pd(i,`link`,r),e.head.appendChild(i),t.instance=i);case`void`:return null;default:throw Error(s(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[wt]||a[_t]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,O(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),O(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:te,Provider:null,Consumer:null,_currentValue:fe,_currentValue2:fe,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ot(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ot(0),this.hiddenUpdates=ot(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=vi(3,null,null,t),e.current=a,a.stateNode=e,t=ha(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ja(a),e}function tp(e){return e?(e=gi,e):gi}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Xa(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Za(e,r,t),n!==null&&(hu(n,e,t),Qa(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=pi(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=ft(t);var n=pi(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=w.T;w.T=null;var a=T.p;try{T.p=2,up(e,t,n,r)}finally{T.p=a,w.T=i}}function lp(e,t,n,r){var i=w.T;w.T=null;var a=T.p;try{T.p=8,up(e,t,n,r)}finally{T.p=a,w.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=Dt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=tt(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Je(o);s.entanglements[1]|=c,o&=~c}rd(a),!(W&6)&&(nu=Ie()+500,id(0,!1))}}break;case 31:case 13:s=pi(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=fn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=Et(e),e!==null){var t=l(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=u(t),e!==null)return e;e=null}else if(n===31){if(e=d(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Le()){case Re:return 2;case ze:return 8;case Be:case Ve:return 32;case He:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Dt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=Et(e.target);if(t!==null){var n=l(t);if(n!==null){if(t=n.tag,t===13){if(t=u(n),t!==null){e.blockedOn=t,ht(e.priority,function(){op(n)});return}}else if(t===31){if(t=d(n),t!==null){e.blockedOn=t,ht(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);dn=r,n.target.dispatchEvent(r),dn=null}else return t=Dt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=Dt(n);a!==null&&(e.splice(t,3),t-=3,ks(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[vt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[vt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[yt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=mt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=r.version;if(Lp!==`19.2.8`)throw Error(s(527,Lp,`19.2.8`));T.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(s(188)):(e=Object.keys(e).join(`,`),Error(s(268,e)));return e=p(t),e=e===null?null:m(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:w,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ge=zp.inject(Rp),Ke=zp}catch{}}e.createRoot=function(e,t){if(!c(e))throw Error(s(299));var n=!1,r=``,i=Qs,a=$s,o=ec;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,i,a,o,Pp),e[yt]=t.current,Sd(e),new Fp(t)}})),c=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=s()})),l=n(),u=c(),d=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7.5' fill='%230b7285'/><rect x='6' y='6' width='8.8' height='8.8' rx='1.6' fill='%23fa4616'/><rect x='17.2' y='6' width='8.8' height='8.8' rx='1.6' fill='%23fff' opacity='.92'/><rect x='6' y='17.2' width='8.8' height='8.8' rx='1.6' fill='%23fff' opacity='.72'/><rect x='17.2' y='17.2' width='8.8' height='8.8' rx='1.6' fill='%23fff' opacity='.45'/></svg>">
<title>FUSION 2026 · Keynote 2 · the whole flow</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
  :root{
    --bg:#f6f7f9; --card:#fff; --ink:#1c2530; --muted:#6b7684; --line:#e4e8ee;
    --teal:#0b7285; --teal-soft:#e6f4f6; --amber:#b7791f; --evt:#9a5bc7;
    --ag-bg:#ddf3e4; --ag-ink:#20794d; --pr-bg:#fde3dc; --pr-ink:#c2542e;
    --ht-bg:#e0e7ff; --ht-ink:#4650b8; --api-bg:#eceef1; --api-ink:#5b6572;
    --done:#1d9d64; --orange:#fa4616; --orange-soft:#fdece6;
    /* ---- real product tokens, taken from the Maestro Use Case Explorer demo app ---- */
    --serif:Newsreader,"Newsreader Fallback",Georgia,"Times New Roman",serif;
    --sans:"IBM Plex Sans","Segoe UI",system-ui,-apple-system,sans-serif;
    --pmono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    --p-bg:#f4f6f9; --p-ink:#171d2d; --p-teal:#0b57d0; --p-teal-700:#174c96;
    --p-teal-50:#e9f2fc; --p-teal-surf:#f2f7fd; --p-teal-line:#b9ceea;
    --p-paper:#fbfbfa; --p-line:#eae8e3; --p-line-2:#d9d6cf; --p-mute:#787774; --p-muted-bg:#f1f0ec;
    --p-blue:#e1f3fe; --p-blue-ink:#1f6c9f; --p-green:#edf3ec; --p-green-ink:#346538;
    --p-yellow:#fbf3db; --p-yellow-ink:#956400; --p-red:#fdebec; --p-red-ink:#9f2f2d;
    --p-violet:#f0edfa; --p-violet-ink:#5748b6;

    /* ---- real cigui tokens (github.com/UiPath/cigui, app/globals.css) ----
       The improvement surface lives inside Cartographer, so it is teal, and
       must never read as the same product as the blue Maestro Case App. ---- */
    --ci:#0db4b9; --ci-hover:#0b9fa3; --ci-canvas:#f7f9fb; --ci-card:#fff;
    --ci-float:#fff; --ci-text:#0e1b1b; --ci-muted:#5f6b6c; --ci-border:#d4dfe1;
    --ci-tint:#f0f7f8; --ci-tint-strong:#c9f5fc; --ci-tint-neutral:#d8dde2;
    --ci-row:#2b3542; --ci-sel:rgba(13,180,185,.12);
    --ci-ok:#10b981; --ci-err:#ef4444; --ci-warn:#f59e0b; --ci-info:#3b82f6;
    --ci-wait:#6b4ea8; --ci-mutedot:#94a3b8;
    --ci-inter:Inter,"IBM Plex Sans","Segoe UI",system-ui,-apple-system,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:var(--sans);background:var(--bg);color:var(--ink);line-height:1.45;-webkit-font-smoothing:antialiased}
  .mono{font-family:var(--pmono);font-size:9.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);font-weight:600}
  .page{max-width:1460px;margin:0 auto;padding:0 26px 90px;display:flex;gap:28px;align-items:flex-start}
  a:focus-visible,[tabindex]:focus-visible{outline:2px solid var(--p-teal);outline-offset:2px;border-radius:6px}
  /* ---- sidebar (contents) ---- */
  .toc{position:sticky;top:18px;width:250px;flex:none;background:#fff;border:1px solid var(--line);border-radius:12px;
       padding:14px 10px 16px;box-shadow:0 1px 2px rgba(20,28,36,.04),0 10px 24px rgba(20,28,36,.06);
       max-height:calc(100vh - 36px);overflow:auto}
  .toc h2{font-family:var(--pmono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin:0 0 10px 8px}
  .tgroup{margin-bottom:4px;border-radius:8px;padding:2px 0}
  .tgroup.on{background:var(--teal-soft)}
  .tgroup>a{display:flex;gap:8px;align-items:baseline;text-decoration:none;color:var(--ink);padding:5px 8px;border-radius:7px}
  .tgroup>a:hover .tt{color:var(--teal)}
  .tn{font-family:var(--pmono);font-size:9px;color:var(--muted);flex:none;line-height:1.3;white-space:pre-line}
  .tt{flex:1;font-size:12.5px;font-weight:600}
  .tgroup.on .tt{color:var(--teal)}
  .tm{font-size:9.5px;color:var(--muted);white-space:nowrap}
  .tframes{margin:0 0 7px 24px;border-left:1px solid #e8ecef;padding-left:9px}
  .tframes a{display:flex;gap:6px;align-items:center;text-decoration:none;color:#4a5461;font-size:10.5px;padding:2.5px 4px;border-radius:5px;line-height:1.35}
  .tframes a:hover{background:#f2f4f7}
  .tframes a.on{background:var(--teal-soft);color:var(--teal);font-weight:600}
  .fn{font-family:var(--pmono);font-size:9px;color:#b3bbc2;flex:none;width:15px}
  .fd{width:6px;height:6px;border-radius:50%;flex:none}
  .fd.built{background:var(--done)} .fd.partial{background:var(--amber)} .fd.build{background:#e35b5b}
  .toc .leg{margin:10px 8px 0;font-size:9px;color:var(--muted);display:flex;gap:9px;flex-wrap:wrap}
  .toc .leg span{display:flex;gap:4px;align-items:center}
  /* ---- main ---- */
  .content{flex:1;min-width:0}
  .mast{padding:34px 0 14px;border-bottom:2px solid var(--ink);margin-bottom:10px}
  .mast h1{font-family:var(--serif);font-size:32px;font-weight:500;letter-spacing:-.02em;line-height:1.15;margin:8px 0 10px}
  .mast .dek{font-size:14px;color:#3d4754;max-width:840px;margin-bottom:12px}
  .mast .dek b{color:var(--ink)}
  .capbox{background:var(--teal-soft);border:1px solid var(--teal-line,#bfdde3);border-radius:12px;padding:14px 18px;margin-top:12px;max-width:860px}
  .capbox>p{font-size:13.5px;color:var(--ink);margin-bottom:10px}
  .capbox ol{margin:0;padding-left:20px;display:grid;gap:6px}
  .capbox li{font-size:13px;color:#333c46;line-height:1.4}
  .capbox li b{color:var(--ink)}
  .pivot{font-size:11.5px;color:var(--orange);background:var(--orange-soft);border:1px solid #fbd0c0;border-radius:8px;padding:8px 11px;margin-top:10px;max-width:840px}
  .legend{display:flex;gap:14px;flex-wrap:wrap;align-items:center;font-size:10.5px;color:var(--muted);padding:10px 0 4px}
  .legend b{font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink)}
  .tag{font-size:8.5px;font-weight:700;border-radius:4px;padding:2px 4px}
  .tag.AG{background:var(--ag-bg);color:var(--ag-ink)} .tag.PR{background:var(--pr-bg);color:var(--pr-ink)}
  .tag.HT{background:var(--ht-bg);color:var(--ht-ink)} .tag.API{background:var(--api-bg);color:var(--api-ink)}
  .m{font-size:8.5px;font-weight:700;border:1px solid var(--line);border-radius:4px;padding:1px 5px;background:#fff;color:#7d8794}
  .m.evt{color:var(--evt);border-color:#dcc7ee;background:#f7f0fc}
  .act{margin:34px 0 12px;display:flex;flex-wrap:wrap;align-items:baseline;gap:12px;border-bottom:1px solid var(--ink);padding-bottom:6px;scroll-margin-top:18px}
  .act h2{font-family:var(--serif);font-size:21px;font-weight:500;letter-spacing:-.02em;flex:0 1 auto;min-width:0}
  .act .rt{margin-left:auto;flex:none;white-space:nowrap;font-family:var(--pmono);font-size:10px;color:var(--muted);letter-spacing:.06em;text-align:right}
  .act .goal{font-size:11px;color:var(--muted);flex:1 1 100%;margin-top:2px}
  .actrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(680px,1fr));gap:34px;align-items:start}
  .scene{min-width:0;scroll-margin-top:18px}
  .scene.wide{grid-column:1 / -1}
  .sc-head{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:5px}
  .sc-num{font-family:var(--pmono);font-size:12px;font-weight:600;color:var(--teal)}
  .actor{font-size:9px;font-weight:700;letter-spacing:.06em;border-radius:4px;padding:2.5px 7px}
  .actor.Human{background:var(--ht-bg);color:var(--ht-ink)} .actor.Agent{background:var(--ag-bg);color:var(--ag-ink)}
  .actor.API{background:var(--api-bg);color:var(--api-ink)} .actor.Robot{background:var(--pr-bg);color:var(--pr-ink)}
  .actor.Event{background:#f7f0fc;color:var(--evt)} .actor.System{background:#eef1f5;color:#5b6572}
  .persona{font-size:10px;color:var(--muted)}
  .status{font-size:9px;color:var(--muted);display:flex;gap:4px;align-items:center;margin-left:auto}
  .scene h3{font-family:var(--serif);font-size:17.5px;font-weight:500;letter-spacing:-.02em;margin-bottom:4px}
  .scene .narr{font-size:12px;color:#3d4754;margin-bottom:11px;max-width:1000px}
  .scenebody{display:flex;gap:16px;align-items:flex-start}
  .scenebody .framewrap{flex:1;min-width:0}
  .sidecol{flex:0 0 200px;display:flex;flex-direction:column;gap:10px}
  .talktrack{background:#fff;border:1px solid var(--line);border-radius:10px;padding:11px 12px}
  .talktrack .lbl2{font-family:ui-monospace,Menlo,monospace;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--teal);font-weight:700;display:block;margin-bottom:6px}
  .talktrack p{font-family:Georgia,serif;font-size:11.5px;font-style:italic;line-height:1.5;color:#333c46}
  .demonotes{background:#f8f9fb;border:1px solid var(--line);border-radius:10px;padding:11px 12px}
  .demonotes .lbl2{font-family:ui-monospace,Menlo,monospace;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:700;display:block;margin-bottom:6px}
  .demonotes ul{padding-left:15px;margin:0}
  .demonotes li{font-size:11px;line-height:1.45;color:#3d4754;margin-bottom:5px}
  .demonotes li.dont{color:var(--pr-ink)}
  .demonotes li.dont::marker{content:"\\2717  "}
  @media(max-width:900px){
    /* stacked: the frame has to stretch, so flex-start would shrink it to min-content */
    .scenebody{flex-direction:column;align-items:stretch}
    .sidecol{flex:none;width:100%;flex-direction:row}.sidecol>*{flex:1}
    .page{flex-direction:column;gap:16px}
    .toc{position:static;width:100%;max-height:none}
    .toc .tframes{margin-left:16px}
  }
  @media(max-width:600px){.sidecol{flex-direction:column}}
  .framelabel{display:inline-flex;align-items:center;gap:6px;font-family:ui-monospace,Menlo,monospace;font-size:9px;
    letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--teal);background:var(--teal-soft);
    border-radius:999px;padding:4px 10px;margin-bottom:8px}
  .scene .beat{font-size:10.5px;color:var(--teal);font-weight:600;margin-bottom:5px}
  .scene .cxnote{font-size:11px;color:var(--evt);background:#f7f0fc;border:1px solid #dcc7ee;border-radius:8px;padding:7px 10px;margin-bottom:9px}


  /* ==========================================================
     MASTHEAD: plain-language synopsis, then a collapsible
     words-only walkthrough. A reader must be able to learn the
     whole flow without looking at a single screen.
     ========================================================== */
  .synopsis{font-family:var(--serif);font-size:19px;line-height:1.5;color:var(--ink);max-width:820px;margin:6px 0 14px}
  .synopsis b{font-weight:600}
  .flowbrief{max-width:860px;margin:0 0 14px;border:1px solid var(--line);border-radius:12px;background:#fff}
  .flowbrief>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:9px;
    padding:11px 15px;font-size:12.5px;font-weight:600;color:var(--teal)}
  .flowbrief>summary::-webkit-details-marker{display:none}
  .flowbrief>summary::before{content:"\\203A";font-family:var(--pmono);font-size:15px;line-height:1;
    color:var(--teal);transition:transform .15s ease;display:inline-block}
  .flowbrief[open]>summary::before{transform:rotate(90deg)}
  .flowbrief>summary .hint{margin-left:auto;font-family:var(--pmono);font-size:9px;letter-spacing:.1em;
    text-transform:uppercase;color:var(--muted);font-weight:500}
  .flowbrief .fb{padding:2px 16px 15px}
  .fb ol{margin:0;padding-left:0;list-style:none;counter-reset:fbn}
  .fb li{counter-increment:fbn;position:relative;padding:5px 0 5px 30px;font-size:13px;line-height:1.5;color:#333c46;
    border-top:1px solid #f0f2f5}
  .fb li:first-child{border-top:0}
  .fb li::before{content:counter(fbn);position:absolute;left:0;top:6px;font-family:var(--pmono);font-size:9.5px;
    font-weight:600;color:var(--teal);background:var(--teal-soft);border-radius:5px;width:19px;height:16px;
    display:flex;align-items:center;justify-content:center}
  .fb li b{color:var(--ink);font-weight:600}
  .fb .grp{margin:12px 0 3px;font-family:var(--pmono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;
    color:var(--muted);font-weight:600}
  .fb .grp:first-child{margin-top:4px}
  .illus{font-size:11px;color:var(--muted);border-left:2px solid var(--line);padding:2px 0 2px 10px;margin-top:12px;max-width:820px}

  /* ==========================================================
     VIEW SWITCH: Flow (detailed, default) vs Strip (condensed).
     One render, two layouts - the scene data is never duplicated.
     ========================================================== */
  .viewsw{position:fixed;top:14px;right:16px;z-index:55;display:flex;align-items:center;gap:9px;
    background:#fff;border:1px solid #d7dde4;border-radius:10px;padding:5px 6px 5px 13px;
    box-shadow:0 2px 4px rgba(20,28,36,.06),0 14px 30px -12px rgba(20,28,36,.28)}
  .viewsw .swlbl{font-family:var(--pmono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;
    font-weight:600;color:var(--muted)}
  .viewsw .sw{display:flex;gap:2px;background:#eceff3;border:1px solid var(--line);border-radius:8px;padding:2px}
  .viewsw button{font-family:var(--sans);font-size:12px;font-weight:600;padding:6px 13px;border-radius:6px;
    border:0;background:transparent;color:var(--muted);cursor:pointer}
  .viewsw button:hover{color:var(--ink)}
  .viewsw button[aria-pressed="true"]{background:var(--teal);color:#fff;box-shadow:0 1px 2px rgba(20,28,36,.18)}
  .swnote{font-size:11px;color:var(--muted);margin:14px 0 0;max-width:660px;line-height:1.5}
  @media(max-width:1050px){.viewsw{position:static;margin:14px 0 0;justify-content:flex-start;box-shadow:none}}
  /* narrative view: the plain-language walkthrough becomes the page */
  @media screen{
    body.view-brief #story,body.view-brief .toc{display:none}
    body.view-brief .flowbrief{max-width:760px}
    body.view-brief .flowbrief>summary{pointer-events:none}
    body.view-brief .flowbrief>summary .hint,body.view-brief .flowbrief>summary::before{display:none}
  }

  body.view-strip .actrow{grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:24px 14px}
  body.view-strip .scene.wide{grid-column:auto}
  body.view-strip .scene .narr,body.view-strip .sidecol,body.view-strip .scene .cxnote{display:none}
  body.view-strip .scenebody{display:block}
  body.view-strip .framewrap{width:100%}
  body.view-strip .framelabel{display:none}
  body.view-strip .framewrap>br{display:none}
  body.view-strip .scene h3{min-height:2.7em}
  #lb .lbcap .lbsurface{display:inline-block;font-family:ui-monospace,Menlo,monospace;font-size:9px;
    letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:#7fd9e2;margin-bottom:7px}
  body.view-strip .scene h3{font-family:var(--sans);font-size:11.5px;font-weight:600;line-height:1.35;letter-spacing:0;
    margin:6px 0 0;color:#3d4754}
  body.view-strip .sc-head{margin-bottom:4px;gap:5px}
  body.view-strip .sc-num{font-size:10px}
  body.view-strip .actor{font-size:7.5px;padding:1.5px 5px}
  body.view-strip .persona{display:none}
  body.view-strip .frame{max-width:none;cursor:zoom-in;transition:transform .16s cubic-bezier(.2,.7,.3,1),box-shadow .16s}
  body.view-strip .frame:hover{transform:translateY(-3px);box-shadow:0 1px 2px rgba(20,30,40,.06),0 26px 46px -16px rgba(18,28,40,.4)}
  body.view-strip .act{margin-top:30px}
  body.view-strip .act .goal{display:none}

  /* lightbox - every frame is expandable here, not only the screenshots */
  #lb{position:fixed;inset:0;z-index:60;display:none;background:rgba(12,18,24,.86);padding:26px;
      flex-direction:column;align-items:center;justify-content:center;cursor:zoom-out}
  #lb.on{display:flex}
  #lb .lbframe{width:min(1180px,100%);max-height:calc(100vh - 132px)}
  #lb .lbcap{margin-top:14px;max-width:1180px;text-align:center}
  #lb .lbcap b{display:block;font-family:var(--serif);font-size:17px;font-weight:500;color:#fff;margin-bottom:5px}
  #lb .lbcap p{font-size:12px;color:#c8d3da;line-height:1.5}
  #lb .lbhint{margin-top:12px;font-family:var(--pmono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;
    color:rgba(255,255,255,.42)}
  @media print{.viewsw,#lb{display:none!important}.flowbrief{border-color:#ccc}.flowbrief .fb{display:block!important}}

  /* ==========================================================
     LAPTOP BROWSER FRAME
     The whole window (chrome + page) is authored at a real
     laptop viewport of 1280x800 CSS px and uniformly scaled
     down to the column width, so proportions and type sizes
     stay exactly those of a 16:10 laptop screenshot.
     ========================================================== */
  .frame{position:relative;width:100%;max-width:1100px;aspect-ratio:1280 / 800;overflow:hidden;
         background:#fff;border:1px solid #cbd3dc;border-radius:12px;
         box-shadow:0 1px 2px rgba(20,30,40,.05),0 22px 44px -18px rgba(18,28,40,.32)}
  .win{position:absolute;top:0;left:0;width:1280px;height:800px;transform-origin:0 0;transform:scale(var(--s,1));
       display:flex;flex-direction:column;background:var(--p-bg);font-family:var(--sans)}
  /* tab strip */
  .chrome{flex:none;height:36px;display:flex;align-items:flex-end;gap:8px;padding:0 12px;
          background:linear-gradient(#eef0f3,#e6e9ed);border-bottom:1px solid #d7dce2}
  .chrome .dots{display:flex;gap:7px;align-items:center;height:36px}
  .win .dots i{width:11px;height:11px;border-radius:50%}
  .win .dots i.r{background:#f2635b} .win .dots i.y{background:#f2bd4c} .win .dots i.g{background:#4cc35f}
  .chrome .btab{display:flex;align-items:center;gap:8px;height:28px;padding:0 12px;margin-left:6px;
                background:#fff;border:1px solid #d7dce2;border-bottom:0;border-radius:8px 8px 0 0;
                font-size:11.5px;color:var(--p-ink);max-width:430px}
  .chrome .btab .fav{width:14px;height:14px;flex:none;border-radius:4px;background:var(--p-teal);color:#fff;
                     font-family:var(--serif);font-size:9px;line-height:14px;text-align:center;font-weight:500}
  .chrome .btab .ttl{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .chrome .btab .x{color:#9aa3ad;font-size:12px}
  .chrome .plus{color:#8e97a1;font-size:14px;line-height:1;padding-bottom:8px}
  /* address bar */
  .omni{flex:none;height:38px;display:flex;align-items:center;gap:11px;padding:0 12px;background:#f7f8fa;border-bottom:1px solid #e3e7ec}
  .omni .onav{display:flex;gap:10px;color:#98a1ab;flex:none}
  .omni .url{flex:1;min-width:0;display:flex;align-items:center;gap:8px;height:25px;padding:0 11px;
             background:#fff;border:1px solid #e3e7ec;border-radius:999px;
             font-family:var(--pmono);font-size:10.5px;color:#7c8792;letter-spacing:.005em}
  .omni .url .u{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .omni .url b{color:var(--p-ink);font-weight:500}
  .omni .url .star{margin-left:auto;color:#b3bbc4;flex:none}
  .omni .oacts{display:flex;align-items:center;gap:9px;flex:none;color:#98a1ab}
  .omni .oacts .ava{width:20px;height:20px;border-radius:50%;background:var(--p-teal-50);color:var(--p-teal-700);
                    font-family:var(--pmono);font-size:8.5px;font-weight:600;display:flex;align-items:center;justify-content:center}

  /* ==========================================================
     NATIVE macOS APP WINDOW — Claude Code Desktop (scenes 02 and 04)
     Deliberately dark and native: these two moments are run in
     the coding-agent desktop app, not in the Maestro product.
     ========================================================== */
  .win.native{background:#1b1b1b}
  .titlebar{position:relative;flex:none;height:38px;display:flex;align-items:center;gap:8px;padding:0 12px;
            background:#262626;border-bottom:1px solid #333330}
  .titlebar .dots{display:flex;gap:7px;align-items:center;z-index:1}
  .titlebar .tt{position:absolute;left:0;right:0;text-align:center;font-family:var(--sans);font-size:11.5px;
                font-weight:500;color:#a7a7a3}
  .titlebar .tr{margin-left:auto;display:flex;gap:11px;color:#7d7d79;z-index:1}
  .cx{flex:1;min-height:0;display:flex;background:#1e1e1e;color:#e8e8e5;font-family:var(--sans);font-size:13.5px;line-height:1.55}
  .cx-side{width:258px;flex:none;background:#171717;border-right:1px solid #2b2b29;display:flex;flex-direction:column;padding:13px 10px 10px}
  .cx-lbl{display:block;font-family:var(--pmono);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#77776f;padding:0 6px;margin-bottom:9px}
  .cx-search{display:flex;align-items:center;gap:7px;height:27px;border:1px solid #2f2f2c;border-radius:7px;background:#202020;
             padding:0 9px;margin-bottom:12px;font-size:11.5px;color:#6f6f6a}
  .cx-th{border-radius:8px;padding:9px 10px;margin-bottom:3px;border:1px solid transparent}
  .cx-th.on{background:#2b2b28;border-color:#3a3a36}
  .cx-th b{display:block;font-size:12.5px;font-weight:500;color:#e8e8e5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cx-th span{display:block;font-size:11px;color:#8b8b85;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:1px}
  .cx-th u{display:block;text-decoration:none;font-family:var(--pmono);font-size:8.5px;letter-spacing:.1em;color:#6d6d67;margin-top:4px}
  .cx-th.on u{color:#9ad7ae}
  .cx-foot{margin-top:auto;border-top:1px solid #2b2b29;padding:10px 6px 0;font-family:var(--pmono);font-size:9.5px;
           line-height:1.7;color:#6d6d67}
  .cx-main{flex:1;min-width:0;display:flex;flex-direction:column}
  .cx-head{flex:none;display:flex;align-items:center;gap:10px;padding:12px 18px;border-bottom:1px solid #2b2b29}
  .cx-head b{font-size:13.5px;font-weight:500}
  .cx-body{flex:1;min-height:0;overflow:hidden;padding:18px 20px 4px;display:flex;flex-direction:column;gap:15px}
  .cx-chip{font-family:var(--pmono);font-size:9px;letter-spacing:.09em;text-transform:uppercase;border:1px solid #3a3a36;
           border-radius:999px;padding:3px 9px;color:#a5a5a0;white-space:nowrap}
  .cx-chip.ok{border-color:#33553c;background:#1c2b20;color:#8ed6a3}
  .cx-role{display:block;font-family:var(--pmono);font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:#77776f;margin-bottom:5px}
  .cx-you{align-self:flex-end;max-width:78%;background:#2f2f2c;border:1px solid #3a3a36;border-radius:12px;padding:11px 14px;
          font-size:13px;color:#eaeae6}
  .cx-agent{display:flex;gap:11px;min-width:0}
  .cx-agent .av{width:24px;height:24px;flex:none;border-radius:6px;background:#e8e8e5;color:#1b1b1b;
                font-family:var(--serif);font-size:13px;display:flex;align-items:center;justify-content:center}
  .cx-agent .txt{flex:1;min-width:0}
  .cx-agent p{font-size:13px;color:#dedeD9}
  .cx-plan{margin-top:10px;border:1px solid #2f2f2c;border-radius:9px;background:#232320;overflow:hidden}
  .cx-plan .ph{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid #2f2f2c;
               font-family:var(--pmono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:#8b8b85}
  .cx-plan .pi{display:flex;gap:10px;align-items:flex-start;padding:8px 12px;border-bottom:1px solid #292926;font-size:12.5px;color:#dedeD9}
  .cx-plan .pi:last-child{border-bottom:0}
  .cx-plan .pi i{font-style:normal;font-family:var(--pmono);font-size:11px;color:#8ed6a3;flex:none}
  .cx-diff{margin-top:10px;border:1px solid #2f2f2c;border-radius:9px;overflow:hidden;background:#1c1c1a}
  .cx-diff .fh{display:flex;align-items:center;gap:9px;padding:8px 12px;background:#232320;border-bottom:1px solid #2f2f2c;
               font-family:var(--pmono);font-size:10px;letter-spacing:.04em;color:#9a9a94}
  .cx-diff .dl{display:grid;grid-template-columns:26px minmax(0,1fr);font-family:var(--pmono);font-size:11px;line-height:1.65;padding:4px 12px 4px 0}
  .cx-diff .dl .g{text-align:center;color:#6d6d67}
  .cx-diff .dl.ctx{color:#8b8b85}
  .cx-diff .dl.add{background:rgba(72,180,112,.10);color:#8ed6a3} .cx-diff .dl.add .g{color:#8ed6a3}
  .cx-diff .dl.mod{background:rgba(206,168,80,.10);color:#e0c68b} .cx-diff .dl.mod .g{color:#e0c68b}
  .cx-diff .dl.ind{padding-left:0}
  .cx-acts{display:flex;gap:8px;margin-top:12px;justify-content:flex-end}
  .cx-btn{display:inline-flex;align-items:center;height:27px;padding:0 13px;border-radius:7px;border:1px solid #3a3a36;
          background:#2a2a27;color:#e8e8e5;font-size:12px;font-weight:500;white-space:nowrap}
  .cx-btn.pri{background:#e8e8e5;border-color:#e8e8e5;color:#1b1b1b}
  .cx-composer{flex:none;margin:8px 20px 18px;display:flex;align-items:center;gap:10px;height:38px;padding:0 13px;
               border:1px solid #333330;border-radius:10px;background:#242422;font-size:12.5px;color:#7d7d78}
  .cx-composer .send{margin-left:auto;font-family:var(--pmono);font-size:9.5px;color:#6d6d67}
  /* mode switch: Terminal (default) vs. chat UI */
  .modesw{margin-left:auto;display:flex;gap:2px;background:#111110;border:1px solid #333330;border-radius:7px;padding:2px;z-index:1}
  .modesw span{font-family:var(--pmono);font-size:9px;letter-spacing:.05em;padding:3px 9px;border-radius:5px;color:#8b8b85;cursor:pointer}
  .modesw span.on{background:#2f2f2c;color:#e8e8e5}
  .cx{display:none}
  .win.mode-ui .cx{display:flex}
  .win.mode-ui .term-wrap{display:none}
  .term-wrap{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;background:#0d0e0d}
  .term-bar{flex:none;padding:7px 14px;font-family:var(--pmono);font-size:9.5px;color:#6d6d67;border-bottom:1px solid #222220}
  .term{flex:1;min-height:0;overflow:hidden;padding:16px 18px;font-family:var(--pmono);font-size:12.5px;line-height:1.85;color:#c9d1d9}
  .term .l{white-space:pre-wrap}
  .term .prompt{color:#e8e8e5}
  .term .car{color:#8ed6a3}
  .term .dim{color:#5c6169}
  .term .ok{color:#8ed6a3}
  .term .add{color:#8ed6a3}
  .term .mod{color:#e0c68b}
  .term .gap{height:8px}

  /* ==========================================================
     NATIVE DESKTOP APP WINDOW — Cartographer, inside Delegate
     Apollo, matching the prototype Max demos, so the audience sees
     one product rather than two takes on it. Distinct from the Case
     App (blue) and Claude Code (dark) by shape: a tabbed desktop
     window with an app-level sidebar, not a browser.
     ========================================================== */
  .cg-win{background:#fff}
  .cg-titlebar{flex:none;height:40px;display:flex;align-items:center;gap:10px;padding:0 10px;
               background:var(--ap-bg-2);border-bottom:1px solid var(--ap-line)}
  .cg-titlebar .dots{display:flex;gap:7px;align-items:center}
  .cg-titlebar .wtool{display:flex;gap:9px;color:var(--ap-ink-300);margin-left:2px}
  .cg-tabs{display:flex;gap:4px;margin-left:6px}
  .cg-tab{display:flex;align-items:center;gap:6px;height:27px;padding:0 11px 0 8px;border-radius:7px;
          font-size:11.5px;color:var(--ap-ink-500);white-space:nowrap}
  .cg-tab .ic{width:14px;height:14px;border-radius:3px;display:flex;align-items:center;justify-content:center;
              font-size:8px;font-weight:800;color:#fff;flex:none}
  .cg-tab .ic.d{background:var(--ap-orange)}
  .cg-tab .ic.c{background:var(--ap-blue)}
  .cg-tab.on{background:#fff;color:var(--ap-ink);font-weight:500;box-shadow:0 1px 2px rgba(24,32,39,.08);
             border:1px solid var(--ap-line)}
  .cg-titlebar .brand{margin-left:auto;display:flex;align-items:center;gap:12px}
  .cg-titlebar .brand b{font-family:var(--sans);font-size:13px;font-weight:700;letter-spacing:-.01em;color:var(--ap-ink)}
  .cg-titlebar .bell{color:var(--ap-ink-300)}
  .cg-body{flex:1;min-height:0;display:flex;background:#fff}
  .cg-side{width:186px;flex:none;background:#fff;border-right:1px solid var(--ap-line);display:flex;
           flex-direction:column;padding:12px 10px}
  .cg-new{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ap-ink-600);padding:6px 7px;
          border-radius:7px;background:var(--ap-bg-2);margin-bottom:2px}
  .cg-search{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ap-ink-500);padding:6px 7px}
  .cg-navgroup{font-family:var(--pmono);font-size:9px;letter-spacing:.1em;font-weight:600;color:var(--ap-ink-400);
               margin:14px 0 6px 7px}
  .cg-navitem{font-size:12px;color:var(--ap-ink);padding:5px 7px;border-radius:6px;overflow:hidden;
              text-overflow:ellipsis;white-space:nowrap}
  .cg-navitem.on{background:var(--ap-blue-50);color:var(--ap-blue-700);font-weight:500}
  .cg-navitem .ct{float:right;font-family:var(--pmono);font-size:9.5px;color:var(--ap-ink-400)}
  .cg-side .cg-foot{margin-top:auto;border-top:1px solid var(--ap-line);padding-top:10px;display:flex;
                    flex-direction:column;gap:9px}
  .cg-addons{font-size:11.5px;color:var(--ap-ink-500);display:flex;align-items:center;gap:7px}
  .cg-user{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ap-ink)}
  .cg-user .av{width:22px;height:22px;border-radius:50%;background:var(--ap-blue);color:#fff;font-size:10px;
               font-weight:700;display:flex;align-items:center;justify-content:center}
  .cg-main{flex:1;min-width:0;overflow:hidden;padding:16px 18px;background:var(--ap-canvas)}
  /* Cartographer's accent is Apollo blue. The teal belongs to cigui. */
  .cg-main .docnav div.on{background:var(--ap-blue-50);color:var(--ap-blue-700);box-shadow:inset 2px 0 0 var(--ap-blue)}
  .cg-main .fic{background:var(--ap-blue-50);color:var(--ap-blue-700)}
  .cg-main .ptag.tl,.cg-main .lbl.tl{background:var(--ap-blue-50);color:var(--ap-blue-700)}
  .cg-main .pt tr.hero td{background:var(--ap-blue-50)}
  .cg-main .pref{color:var(--ap-blue)}
  .cg-main .btn.primary{background:var(--ap-blue);border-color:var(--ap-blue)}
  .cg-main .paper-sheet{border-color:var(--ap-ink-200)}

  /* ==========================================================
     UiPath Studio — case-agent rules (Act I: what the coding agent produced)
     ========================================================== */
  .stu-top{flex:none;display:flex;align-items:center;gap:12px;padding:10px 16px;background:#fff;border-bottom:1px solid var(--p-line)}
  .stu-grid{color:#6b7280}
  .stu-top b.wm{font-family:var(--sans);font-weight:700;font-size:13px;color:#1f2937}
  .stu-crumb{font-size:12.5px;color:#6b7280;display:flex;align-items:center;gap:6px}
  .stu-crumb b{color:#1f2937;font-weight:600}
  .stu-crumb .sep{color:#c1c6cd}
  .stu-toggle{margin-left:auto;display:flex;gap:2px;background:#f3f4f6;border-radius:7px;padding:2px}
  .stu-toggle span{font-size:11.5px;padding:4px 12px;border-radius:6px;color:#6b7280}
  .stu-toggle span.on{background:#fff;color:#1f2937;font-weight:500;box-shadow:0 1px 2px rgba(20,28,36,.08)}
  .stu-icons{display:flex;gap:12px;color:#9aa1a8}
  .stu-ava{width:24px;height:24px;border-radius:50%;background:#e6432e;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .stu-body{flex:1;min-height:0;overflow:hidden;background:#fbfbfc;padding:16px 22px;display:flex;flex-direction:column;gap:14px}
  .stu-pagecrumb{font-size:11.5px;color:#9aa1a8;display:flex;align-items:center;gap:6px}
  .stu-h1{display:flex;align-items:center;gap:9px}
  .stu-h1 span{font-family:var(--sans);font-size:19px;font-weight:600;color:#1f2937}
  .stu-h1 i{color:#9aa1a8}
  .stu-cmpanel{align-self:center;display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--p-line);
               border-radius:12px;padding:9px 12px;box-shadow:0 4px 14px rgba(20,28,36,.06)}
  .stu-cmpanel .icn{width:30px;height:30px;border-radius:8px;background:#eef1ff;display:flex;align-items:center;justify-content:center;color:#5b6fea}
  .stu-cmpanel .lab b{display:block;font-size:12.5px;font-weight:600;color:#1f2937}
  .stu-cmpanel .lab u{display:block;text-decoration:none;font-size:10px;color:#9aa1a8}
  .stu-cmtabs{display:flex;gap:4px;margin-left:8px}
  .stu-cmtabs span{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;padding:6px 10px;border-radius:7px;border:1px solid transparent}
  .stu-cmtabs span.on{border-color:#0db4b9;color:#1f2937;font-weight:500}
  .stu-banner{display:flex;gap:12px;align-items:flex-start;background:#e6f3f4;border-radius:10px;padding:12px 14px}
  .stu-banner .icn2{width:24px;height:24px;flex:none;color:#0db4b9}
  .stu-banner b{display:block;font-size:12.5px;color:#1f2937;margin-bottom:2px}
  .stu-banner p{font-size:11.5px;color:#4b5563;margin:0}
  .stu-banner .x{margin-left:auto;color:#9aa1a8;font-size:13px}
  .stu-toolbar{display:flex;align-items:center;gap:8px}
  .stu-search{flex:1;display:flex;align-items:center;gap:7px;height:30px;padding:0 10px;border:1px solid var(--p-line);
              border-radius:7px;font-size:12px;color:#9aa1a8;background:#fff}
  .stu-filt{font-size:11.5px;color:#4b5563;border:1px solid var(--p-line);border-radius:7px;padding:5px 9px;background:#fff}
  .stu-add{margin-left:auto;background:#0db4b9;color:#fff;font-size:12px;font-weight:500;border-radius:7px;padding:7px 13px;white-space:nowrap}
  table.stu{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--p-line);border-radius:10px;overflow:hidden}
  table.stu th{background:#f9fafb;font-size:10.5px;font-weight:600;color:#6b7280;text-align:left;padding:8px 12px;border-bottom:1px solid var(--p-line)}
  table.stu td{font-size:11.5px;color:#1f2937;padding:8px 12px;border-bottom:1px solid #f1f2f4;vertical-align:middle;white-space:nowrap}
  table.stu tr:last-child td{border-bottom:0}
  table.stu .stu-auto{font-size:9.5px;background:#eef1ff;color:#4a5ac9;border-radius:5px;padding:1.5px 6px;margin-left:6px}
  table.stu .stu-if{font-family:var(--pmono);font-size:10.5px;background:#f3f4f6;border-radius:5px;padding:2px 7px;color:#4b5563}


  /* ==========================================================
     CONTINUOUS IMPROVEMENT SURFACE - real cigui tokens.
     Lives inside Cartographer, so it is teal and must never be
     mistaken for the blue Maestro Case App next to it.
     Vocabulary is cigui's own, except the section name: Feed / Suggestions /
     Ledger / Dashboard / Settings, Overrode / Agreed / Unclear,
     Online vs Offline, Apply vs Raise change request.
     ========================================================== */
  .ci{font-family:var(--ci-inter);color:var(--ci-text);background:var(--ci-canvas);
      flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}
  .ci-head{flex:none;height:44px;display:flex;align-items:center;gap:10px;padding:0 18px;
           background:var(--ci-card);border-bottom:1px solid var(--ci-border)}
  .ci-crumb{font-size:12.5px;color:var(--ci-muted);display:flex;align-items:center;gap:7px}
  .ci-crumb b{color:var(--ci-text);font-weight:600}
  .ci-crumb .sep{color:#b3c2c4}
  .ci-horizon{margin-left:auto;display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--ci-muted);
              border:1px solid var(--ci-border);border-radius:6px;padding:4px 10px;background:var(--ci-card)}
  .ci-tabs{flex:none;height:38px;display:flex;align-items:stretch;gap:2px;padding:0 14px;
           background:var(--ci-card);border-bottom:1px solid var(--ci-border)}
  .ci-tabs span{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--ci-muted);padding:0 12px;
                border-bottom:2px solid transparent;white-space:nowrap}
  .ci-tabs span.on{color:var(--ci-text);font-weight:600;border-bottom-color:var(--ci)}
  .ci-body{flex:1;min-height:0;overflow:hidden;padding:15px 18px;display:flex;flex-direction:column;gap:12px}
  .ci-lbl{display:block;font-family:var(--pmono);font-size:8.5px;font-weight:600;letter-spacing:.13em;
          text-transform:uppercase;color:var(--ci-muted)}
  .ci-card{background:var(--ci-card);border:1px solid var(--ci-border);border-radius:8px}
  .ci-card.pad{padding:13px 15px}
  .ci-tool{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .ci-search{flex:1;min-width:150px;display:flex;align-items:center;gap:7px;height:29px;padding:0 10px;
             background:var(--ci-card);border:1px solid var(--ci-border);border-radius:6px;font-size:12px;color:#93a2a3}
  .ci-filt{font-size:11.5px;color:var(--ci-text);background:var(--ci-card);border:1px solid var(--ci-border);
           border-radius:6px;padding:5px 9px;white-space:nowrap}
  .ci-filt b{font-weight:600}
  .ci-count{margin-left:auto;font-family:var(--pmono);font-size:10px;color:var(--ci-muted);white-space:nowrap;
            font-variant-numeric:tabular-nums}
  .ci-count b{color:var(--ci-text)}
  .ci-chip{display:inline-flex;align-items:center;gap:4px;border-radius:100px;padding:2px 8px;font-size:9px;
           font-weight:600;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
  .ci-chip.tl{background:var(--ci-tint);color:#0b7c86}
  .ci-chip.ok{background:#e9f7ee;color:#12703a}
  .ci-chip.warn{background:#fdf4e3;color:#8a6110}
  .ci-chip.err{background:#fdedec;color:#a92f2c}
  .ci-chip.info{background:#e9f1fa;color:#1665b3}
  .ci-chip.vio{background:#f0ebfd;color:#6d4bc4}
  .ci-chip.gy{background:var(--ci-tint-neutral);color:#4a5556}
  .ci-dot{width:6px;height:6px;border-radius:50%;flex:none}
  table.ci-t{width:100%;border-collapse:collapse;font-size:11.5px}
  table.ci-t th{font-family:var(--pmono);font-size:8px;letter-spacing:.11em;text-transform:uppercase;
    color:var(--ci-muted);font-weight:600;text-align:left;padding:7px 10px;border-bottom:1px solid var(--ci-border);
    background:#fafcfc}
  table.ci-t td{padding:6px 10px;border-bottom:1px solid #eef3f3;vertical-align:middle;white-space:nowrap}
  table.ci-t tr:last-child td{border-bottom:0}
  table.ci-t tr.hl td{background:var(--ci-sel)}
  table.ci-t tr.dim td{color:var(--ci-muted)}
  table.ci-t td.k{font-family:var(--pmono);font-size:10.5px;color:var(--ci-muted)}
  table.ci-t td.val{font-size:12px}
  /* an override rides a left accent rather than costing a column, and it is
     info-toned, never warning: cigui treats it as the densest useful signal */
  table.ci-t tr.ovr td:first-child{box-shadow:inset 3px 0 0 var(--ci-info)}
  .ci-sug{background:var(--ci-card);border:1px solid var(--ci-border);border-radius:8px;padding:13px 15px}
  .ci-sug.pri{border-color:#9fdde1;box-shadow:0 1px 2px rgba(13,180,185,.10)}
  .ci-sug h4{font-family:var(--ci-inter);font-size:13.5px;font-weight:600;margin:7px 0 4px;line-height:1.35}
  .ci-sug p{font-size:11.5px;line-height:1.55;color:var(--ci-text);margin:3px 0}
  .ci-sug p.dim{color:var(--ci-muted);font-size:11px}
  .ci-meter{display:inline-flex;gap:2px;align-items:flex-end;height:11px}
  .ci-meter i{width:3px;border-radius:1px;background:var(--ci-mutedot)}
  .ci-meter i.f{background:var(--ci)}
  .ci-meter i:nth-child(1){height:5px}.ci-meter i:nth-child(2){height:8px}.ci-meter i:nth-child(3){height:11px}
  .ci-ev{display:flex;gap:16px;flex-wrap:wrap;margin:8px 0 2px}
  .ci-ev span{font-size:10.5px;color:var(--ci-muted)}
  .ci-ev b{color:var(--ci-text);font-weight:600;font-variant-numeric:tabular-nums}
  .ci-blind{font-size:10.5px;color:var(--ci-muted);border-left:2px solid var(--ci-tint-neutral);
            padding:2px 0 2px 9px;margin-top:8px}
  .ci-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:28px;padding:0 13px;
          border-radius:6px;border:1px solid var(--ci-border);background:var(--ci-card);font-size:12px;
          font-weight:500;color:var(--ci-text);white-space:nowrap}
  .ci-btn.pri{background:var(--ci);border-color:var(--ci);color:#fff}
  .ci-btn.sm{height:24px;font-size:11px;padding:0 10px}
  .ci-rule{border:1px solid var(--ci-border);border-radius:7px;overflow:hidden;margin:7px 0}
  .ci-rule .rh{display:flex;gap:8px;align-items:center;background:#fafcfc;padding:6px 11px;
               border-bottom:1px solid var(--ci-border);font-size:11px;font-weight:600}
  .ci-rule .rb{padding:8px 11px;font-family:var(--pmono);font-size:10.5px;line-height:1.75;color:var(--ci-text)}
  .ci-rule .rb .kw{color:#0b7c86;font-weight:700}
  .ci-rule.add{border-color:#a8dcc0}.ci-rule.add .rh{background:#f0f8f3}
  .ci-fx{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
  .ci-fx .b{background:var(--ci-card);border:1px solid var(--ci-border);border-radius:8px;padding:10px 12px}
  .ci-fx .v{font-size:20px;font-weight:600;line-height:1.1;font-variant-numeric:tabular-nums}
  .ci-fx .v small{font-size:11px;font-weight:600;color:var(--ci-muted)}
  .ci-fx .k{font-family:var(--pmono);font-size:8px;letter-spacing:.1em;text-transform:uppercase;
            color:var(--ci-muted);margin-top:3px}
  .ci-fx .d{font-size:9.5px;font-weight:600;color:#12703a;margin-top:2px}
  .ci-kv{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 12px;align-items:baseline}
  .ci-kv dt{font-family:var(--pmono);font-size:9.5px;color:var(--ci-muted);white-space:nowrap}
  .ci-kv dd{font-size:12px;color:var(--ci-text)}
  .ci-act{display:flex;align-items:flex-start;gap:9px;padding:6px 0;border-top:1px solid #eef3f3;font-size:11px}
  .ci-act:first-of-type{border-top:0}
  .ci-act .who{font-weight:600;color:var(--ci-text);white-space:nowrap}
  .ci-act .what{color:var(--ci-muted)}

  /* ---- the injected signal-capture widget, sitting on the Case App ----
     Alin's design intent: one panel injected on top of whatever app is
     underneath. It carries context and feedback only. The decision itself
     stays in the form, so the buttons are never duplicated. ---- */
  .aug{position:absolute;top:0;bottom:0;right:560px;width:302px;z-index:4;background:var(--ci-card);
       border-left:1px solid var(--ci-border);border-right:1px solid var(--ci-border);
       box-shadow:-10px 0 26px -14px rgba(14,27,27,.24);display:flex;flex-direction:column;
       font-family:var(--ci-inter)}
  .aug .ah{flex:none;display:flex;align-items:center;gap:8px;padding:11px 13px;border-bottom:1px solid var(--ci-border);
           background:var(--ci-tint)}
  .aug .ah .ic{width:22px;height:22px;flex:none;border-radius:6px;background:var(--ci);color:#fff;font-size:11px;
               font-weight:700;display:flex;align-items:center;justify-content:center}
  .aug .ah b{font-size:12px;font-weight:600;color:var(--ci-text)}
  .aug .ah u{display:block;text-decoration:none;font-family:var(--pmono);font-size:8px;letter-spacing:.1em;
             text-transform:uppercase;color:#0b7c86}
  .aug .ab{flex:1;min-height:0;overflow:hidden;padding:12px 13px;display:flex;flex-direction:column;gap:11px}
  .aug .why{font-size:11.5px;line-height:1.5;color:var(--ci-text)}
  .aug .why b{font-weight:600}
  .aug .erow{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--ci-text);padding:5px 0;
             border-top:1px solid #eef3f3}
  .aug .erow:first-of-type{border-top:0}
  .aug .erow .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .aug .erow .tb{display:flex;gap:3px;flex:none}
  .aug .erow .tb i{font-style:normal;font-size:10px;width:19px;height:19px;border-radius:5px;
                   border:1px solid var(--ci-border);display:flex;align-items:center;justify-content:center;color:#93a2a3}
  .aug .erow .tb i.up{border-color:var(--ci);color:var(--ci);background:var(--ci-tint)}
  .aug .agg{font-size:11px;color:var(--ci-muted);line-height:1.5;background:var(--ci-tint);
            border-radius:7px;padding:8px 10px}
  .aug .agg b{color:var(--ci-text);font-weight:600}
  .aug .opt2{font-size:11px;color:#93a2a3;border:1px dashed var(--ci-border);border-radius:7px;padding:8px 10px}
  .aug .af{flex:none;padding:9px 13px;border-top:1px solid var(--ci-border);background:#fafcfc;
           font-family:var(--pmono);font-size:8.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ci-muted)}


  /* ---------- Cartographer: map of work ---------- */
  .mw{display:flex;flex-direction:column;gap:12px;min-width:0}
  .mw-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .mw-top h4{font-family:var(--serif);font-size:19px;font-weight:500;letter-spacing:-.01em}
  .mw-prog{display:flex;align-items:center;gap:8px;margin-left:auto;font-size:11.5px;color:var(--p-mute)}
  .mw-bar{width:120px;height:6px;border-radius:100px;background:var(--ap-ink-150);overflow:hidden}
  .mw-bar i{display:block;height:100%;background:var(--ap-blue)}
  .mw-grid{display:grid;gap:7px}
  .mw-band{display:grid;grid-template-columns:88px repeat(6,minmax(0,1fr));gap:6px;align-items:stretch}
  .mw-bl{font-family:var(--pmono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--p-mute);
         display:flex;align-items:center}
  .mw-c{background:#fff;border:1px solid var(--p-line);border-radius:7px;padding:7px 8px;min-width:0;font-size:11px;
        line-height:1.35;color:var(--p-ink)}
  .mw-c b{display:block;font-size:11px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .mw-c u{display:block;text-decoration:none;font-size:10px;color:var(--p-mute);overflow:hidden;
          text-overflow:ellipsis;white-space:nowrap}
  .mw-c.case{border-top:2px solid var(--ap-blue)}
  .mw-c.wf{border-top:2px solid var(--ap-purple)}
  .mw-c.gap{border-color:#f0b6b6;background:repeating-linear-gradient(45deg,#fff,#fff 4px,#fdeaea 4px,#fdeaea 8px)}
  .mw-c.gap b{color:#a92f2c}
  .mw-c.ok{border-color:#bfe0cc;background:#f4faf6}
  .mw-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:10.5px;color:var(--p-mute);align-items:center}
  .mw-legend span{display:flex;gap:5px;align-items:center}
  .mw-legend i{width:16px;height:3px;border-radius:2px;display:inline-block}
  .mw-item{display:flex;gap:9px;align-items:flex-start;padding:7px 0;border-top:1px solid var(--p-line);font-size:11.5px}
  .mw-item:first-of-type{border-top:0}
  .mw-item .n{font-family:var(--pmono);font-size:9.5px;color:var(--p-mute);flex:none;padding-top:2px}
  .mw-item .t{flex:1;min-width:0}
  .mw-item .t b{font-weight:600}
  .mw-item .t u{display:block;text-decoration:none;font-size:10.5px;color:var(--p-mute);margin-top:1px}
  /* estate view */
  .est{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:7px}
  .est .d{border-radius:7px;border:1px solid var(--p-line);background:#fff;padding:7px 8px;font-size:10.5px}
  .est .d b{display:block;font-size:10.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .est .d .m{display:block;font-family:var(--pmono);font-size:9px;color:var(--p-mute);margin-top:2px}
  .est .d.hi{border-color:var(--ap-blue);box-shadow:0 0 0 2px rgba(0,103,223,.14)}
  .est .d.lo{border-color:#f0b6b6;background:#fdf6f6}
  .est .d.mid{border-color:#e6d5a8;background:#fdfaf1}

  /* ==========================================================
     THE ESTATE AT DAY 90 - Max's Beat 6, all six frames.
     Apollo, because this is the surface he demos. The radial is
     drawn from the domain table, so the picture and the numbers
     cannot drift apart: coverage weighted across 134 processes
     comes to 47%, which is the figure his frame 21 shows.
     ========================================================== */
  .apbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .apbar h4{font-family:var(--serif);font-size:19px;font-weight:500;letter-spacing:-.01em;color:var(--ap-ink)}
  .apbar .crumb{font-size:12px;color:var(--ap-ink-500)}
  .ap-seg{display:flex;gap:2px;background:var(--ap-bg-2);border-radius:7px;padding:2px;margin-left:auto}
  .ap-seg span{font-size:11.5px;padding:4px 11px;border-radius:6px;color:var(--ap-ink-500);white-space:nowrap}
  .ap-seg span.on{background:#fff;color:var(--ap-ink);font-weight:500;box-shadow:0 1px 2px rgba(24,32,39,.09)}
  .ap-stat{display:flex;gap:22px;flex-wrap:wrap;padding:10px 14px;background:#fff;border:1px solid var(--ap-line);
           border-radius:10px}
  .ap-stat div{display:flex;flex-direction:column;gap:1px;min-width:0}
  .ap-stat b{font-family:var(--sans);font-size:19px;font-weight:600;letter-spacing:-.02em;color:var(--ap-ink)}
  .ap-stat span{font-family:var(--pmono);font-size:9px;letter-spacing:.11em;text-transform:uppercase;
                color:var(--ap-ink-400)}
  .ap-stat b.warn{color:var(--ap-red-700)}
  .apwrap{display:flex;gap:14px;align-items:flex-start;min-width:0}
  .apf{flex:none;background:#fff;border:1px solid var(--ap-line);border-radius:10px;padding:6px}
  .apf svg{display:block}
  .apf .sp{stroke-width:1;stroke:var(--ap-ink-200)}
  .apf .sp.trunk{stroke:var(--ap-ink-300);stroke-width:1.4}
  .apf .sp.hi{stroke:#93c9a0}   .apf .nd.hi{fill:var(--ap-green)}
  .apf .sp.mid{stroke:#e3c98a}  .apf .nd.mid{fill:var(--ap-yellow)}
  .apf .sp.lo{stroke:#f0b4b4}   .apf .nd.lo{fill:var(--ap-red)}
  .apf .sp.own{stroke:#9dc2ef}  .apf .nd.own{fill:var(--ap-blue)}
  .apf .sp.non{stroke:var(--ap-ink-200)} .apf .nd.non{fill:#fff;stroke:var(--ap-red);stroke-width:1.3}
  .apf .hub{fill:#fff;stroke:var(--ap-ink-300);stroke-width:1.2}
  .apf .core{fill:var(--ap-ink);}
  .apf .coret{fill:#fff;font-size:10px;font-weight:700;font-family:var(--sans)}
  .apf .dl{font-size:9px;fill:var(--ap-ink-500);font-family:var(--sans)}
  .apf .ring{fill:none;stroke:var(--ap-orange);stroke-width:1.6}
  .apf .pin{font-size:9px;fill:var(--ap-orange);font-weight:600;font-family:var(--sans)}
  .apf .guide{fill:none;stroke:var(--ap-ink-150);stroke-dasharray:3 4}
  .apf .sp.ghost{stroke:var(--ap-ink-150)}
  .apf .hub.ghost{stroke:var(--ap-ink-200);fill:var(--ap-bg-2)}
  .apf .dl.ghost{fill:var(--ap-ink-300)}
  .apf .nd.seed{fill:#fff;stroke:var(--ap-yellow);stroke-width:1.6}
  .apf .nd.hole{fill:#fff;stroke:#cc3d45;stroke-width:2}
  /* setup wizard + Maestro import — Max's frames 02 and 03, which the
     merge dropped entirely. Kept deliberately sparse: one question per
     screen, so the room reads it in a glance. */
  .wz{display:flex;flex-direction:column;gap:0;height:100%}
  .wz-bar{display:flex;align-items:center;padding:0 0 14px;border-bottom:1px solid var(--ap-line)}
  .wz-bar .back{font-size:12px;color:var(--ap-ink-500)}
  .wz-bar .step{margin-left:auto;font-family:var(--pmono);font-size:9.5px;letter-spacing:.1em;
                text-transform:uppercase;color:var(--ap-ink-400)}
  .wz-mid{max-width:600px;margin:0 auto;padding-top:44px}
  .wz-mid h3{font-family:var(--serif);font-size:27px;font-weight:500;letter-spacing:-.02em;margin-bottom:8px}
  .wz-sub{font-size:12.5px;color:var(--ap-ink-500);line-height:1.6;margin-bottom:18px;max-width:520px}
  .wz-opts{border:1px solid var(--ap-line);border-radius:10px;overflow:hidden;background:#fff}
  .wz-opt{display:flex;gap:11px;padding:12px 14px;border-top:1px solid var(--ap-line)}
  .wz-opt:first-child{border-top:0}
  .wz-opt .cb{width:16px;height:16px;flex:none;border-radius:4px;border:1.5px solid var(--ap-ink-300);
              background:#fff;color:#fff;font-size:11px;line-height:14px;text-align:center;margin-top:1px}
  .wz-opt.on .cb{background:var(--ap-ink);border-color:var(--ap-ink)}
  .wz-opt .tx{min-width:0}
  .wz-opt .tx b{font-size:12.5px;font-weight:600;display:block}
  .wz-opt .tx b .ct{font-family:var(--pmono);font-size:9px;font-weight:500;color:var(--ap-ink-400);margin-left:7px}
  .wz-opt .tx u{display:block;text-decoration:none;font-size:11.5px;color:var(--ap-ink-500);margin-top:2px;line-height:1.5}
  .wz-sel{display:inline-block;margin-top:7px;font-size:11px;border:1px solid var(--ap-border);border-radius:6px;
          padding:3px 9px;color:var(--ap-ink)}
  .wz-acts{display:flex;gap:9px;margin-top:18px}
  .im{display:flex;gap:18px;padding-top:30px;align-items:flex-start}
  .im-main{flex:1;min-width:0;max-width:600px}
  .im-main h3{font-family:var(--serif);font-size:25px;font-weight:500;letter-spacing:-.02em;margin:3px 0 7px}
  .im-card{background:#fff;border:1px solid var(--ap-line);border-radius:9px;padding:10px 13px;margin-bottom:8px}
  .im-card b{font-size:12.5px;font-weight:600;display:block}
  .im-card b .v{font-family:var(--pmono);font-size:8.5px;font-weight:600;letter-spacing:.08em;
                background:var(--ap-bg-2);border-radius:4px;padding:2px 6px;margin-left:8px;color:var(--ap-ink-500)}
  .im-card u{display:block;text-decoration:none;font-size:11px;color:var(--ap-ink-500);margin-top:3px}
  .im-chip{display:inline-block;font-size:10px;background:var(--ap-bg-2);border-radius:5px;padding:3px 8px;
           margin:0 5px 5px 0;color:var(--ap-ink-500)}
  .im-side{width:250px;flex:none;display:flex;flex-direction:column;gap:10px}
  .im-note{background:#fff;border:1px solid var(--ap-line);border-radius:9px;padding:11px 13px}
  .im-note b{display:block;font-size:11.5px;font-weight:600;margin-top:9px}
  .im-note b:first-of-type{margin-top:7px}
  .im-note u{display:block;text-decoration:none;font-size:10.5px;color:var(--ap-ink-500);line-height:1.5;margin-top:2px}
  .im-note.cant u{padding-left:13px;position:relative}
  .im-note.cant i{position:absolute;left:0;top:5px;width:6px;height:6px;border-radius:50%;background:#cc3d45}
  /* the Analysis artifact — Max's frame 10 */
  .an{display:grid;grid-template-columns:190px minmax(0,1fr);gap:18px;align-items:start}
  .an-side{min-width:0}
  .an-st{font-size:12px;color:var(--ap-ink-500);padding:5px 8px;border-radius:6px;position:relative}
  .an-st.on{background:var(--ap-blue-50);color:var(--ap-blue-700);font-weight:600}
  .an-st.on i{position:absolute;right:8px;top:11px;width:6px;height:6px;border-radius:50%;background:var(--ap-blue)}
  .an-res{display:flex;font-size:11.5px;color:var(--ap-ink-500);padding:4px 8px}
  .an-res span{margin-left:auto;font-family:var(--pmono);font-size:10px;color:var(--ap-ink-400)}
  .an-main{min-width:0;max-width:660px}
  .an-said{font-size:13px;line-height:1.65;color:var(--ap-ink);margin-bottom:14px}
  .an-card{background:#fff;border:1px solid var(--ap-line);border-radius:10px;overflow:hidden}
  .an-hd{display:flex;align-items:center;gap:9px;padding:10px 14px;border-bottom:1px solid var(--ap-line)}
  .an-hd b{font-family:var(--serif);font-size:16px;font-weight:500}
  .an-sec{display:flex;align-items:center;gap:9px;padding:7px 14px;border-top:1px solid var(--ap-ink-150)}
  .an-sec:first-of-type{border-top:0}
  .an-sec .cv{font-size:13px;color:var(--ap-ink-300);flex:none;line-height:1}
  .an-sec .nm{flex:1;min-width:0;font-family:var(--pmono);font-size:9.5px;letter-spacing:.09em;
              text-transform:uppercase;color:var(--ap-ink-600);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .an-sec .dots{flex:none;display:flex;gap:3px}
  .an-sec .dots i{width:5px;height:5px;border-radius:50%;background:var(--ap-ink-150)}
  .an-sec .dots i.f{background:var(--ap-blue)}
  .an-foot{padding:9px 14px;border-top:1px solid var(--ap-line);background:var(--ap-bg-2);
           font-size:11px;color:var(--ap-ink-500)}
  .pj-ask{margin-top:14px;background:#fff;border:1px solid var(--ap-border);border-radius:10px;
          padding:12px 14px;font-size:12px;color:var(--ap-ink-400);max-width:520px}
  .pj-chip{display:inline-block;font-size:11px;border:1px solid var(--ap-border);border-radius:999px;
           padding:5px 11px;margin:0 6px 6px 0;color:var(--ap-ink-600);background:#fff}
  .dgl{fill:var(--ap-bg-2);stroke:var(--ap-line)}
  /* the published record, compacted to fit inside the Cartographer chrome */
  .cg-main .ah-top{padding:4px 16px 0}
  .cg-main .ah-gov{padding:9px 16px;gap:8px 18px}
  .cg-main .ah-tabs{padding:8px 16px 0}
  .cg-main .ah-toc{padding:9px 10px}
  .cg-main .ah-body{padding:10px 18px}
  .cg-main .ah-sign{padding:8px 11px;margin-top:8px}
  .dgll{font-family:var(--pmono);font-size:9px;letter-spacing:.11em;fill:var(--ap-ink-400)}
  .dgn{fill:#fff;stroke:var(--ap-blue);stroke-width:1.4}
  .dgn.wf{stroke:var(--ap-purple)}
  .dgn.gap{stroke:#cc3d45;stroke-dasharray:5 4;fill:#fdf6f6}
  .dgt{font-family:var(--sans);font-size:11.5px;font-weight:600;fill:var(--ap-ink)}
  .dgu{font-family:var(--sans);font-size:9.5px;fill:var(--ap-ink-400)}
  .dge{fill:none;stroke:var(--ap-ink-300);stroke-width:1.3;marker-end:none}
  .dge.down{stroke:#cc3d45;stroke-dasharray:4 4}
  .apside{flex:1;min-width:0;display:flex;flex-direction:column;gap:9px}
  .aplens{display:flex;gap:5px;flex-wrap:wrap}
  .aplens span{font-size:10.5px;padding:3px 10px;border-radius:999px;border:1px solid var(--ap-border);
               color:var(--ap-ink-500);white-space:nowrap}
  .aplens span.on{background:var(--ap-blue-50);border-color:var(--ap-blue);color:var(--ap-blue-700);font-weight:600}
  .apkey{display:flex;gap:13px;flex-wrap:wrap;font-size:10.5px;color:var(--ap-ink-500);align-items:center}
  .apkey span{display:flex;gap:5px;align-items:center}
  .apkey i{width:9px;height:9px;border-radius:50%;display:inline-block}

  table.apt{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--ap-line);
            border-radius:10px;overflow:hidden}
  table.apt th{background:var(--ap-bg-2);font-family:var(--pmono);font-size:9px;letter-spacing:.11em;
               text-transform:uppercase;font-weight:600;color:var(--ap-ink-400);text-align:left;
               padding:7px 12px;border-bottom:1px solid var(--ap-line);white-space:nowrap}
  table.apt td{font-size:11.5px;color:var(--ap-ink);padding:7px 12px;border-bottom:1px solid var(--ap-ink-150);
               vertical-align:middle}
  table.apt tr:last-child td{border-bottom:0}
  table.apt td.num{font-family:var(--pmono);font-size:11px;color:var(--ap-ink-500);white-space:nowrap}
  table.apt tr.grp td{background:#fcfdfd;font-weight:600}
  table.apt .pct{display:inline-flex;align-items:center;gap:7px;white-space:nowrap}
  table.apt .pct i{width:46px;height:5px;border-radius:99px;background:var(--ap-ink-150);overflow:hidden;flex:none}
  table.apt .pct i u{display:block;height:100%;text-decoration:none}
  .apchip{display:inline-flex;align-items:center;border-radius:5px;padding:1.5px 7px;font-size:9.5px;
          font-weight:600;white-space:nowrap}
  .apchip.un{background:var(--ap-red-100);color:var(--ap-red-700)}
  .apchip.ok{background:var(--ap-green-100);color:var(--ap-green)}
  .apchip.blu{background:var(--ap-blue-50);color:var(--ap-blue-700)}
  .apchip.amb{background:var(--ap-yellow-100);color:#8a5a00}
  .apchip.pur{background:var(--ap-purple-100);color:var(--ap-purple)}

  .apfind{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .apfind .f{background:#fff;border:1px solid var(--ap-line);border-radius:9px;padding:9px 11px;min-width:0}
  .apfind .f .h{display:flex;align-items:center;gap:7px;margin-bottom:3px}
  .apfind .f b{font-size:11.5px;font-weight:600;color:var(--ap-ink);line-height:1.35}
  .apfind .f p{font-size:10.5px;color:var(--ap-ink-500);margin:2px 0 0;line-height:1.45}
  .apfind .f.mine{border-color:var(--ap-blue-200);background:#fbfdff}
  .aphome{display:flex;flex-direction:column;gap:8px}
  .aphome .r{display:flex;gap:11px;align-items:flex-start;background:#fff;border:1px solid var(--ap-line);
             border-radius:9px;padding:10px 12px}
  .aphome .r .n{width:20px;height:20px;flex:none;border-radius:6px;background:var(--ap-ink);color:#fff;
                font-family:var(--pmono);font-size:10px;font-weight:700;display:flex;align-items:center;
                justify-content:center}
  .aphome .r .bd{flex:1;min-width:0}
  .aphome .r b{display:block;font-size:12px;font-weight:600;color:var(--ap-ink)}
  .aphome .r p{font-size:10.5px;color:var(--ap-ink-500);margin:2px 0 0;line-height:1.45}
  .aphome .r .win{flex:none;font-family:var(--pmono);font-size:11px;font-weight:600;color:var(--ap-green);
                  white-space:nowrap;padding-top:1px}
  .aphome .r .win.blk{color:var(--ap-red-700)}
  .apbtn{display:inline-flex;align-items:center;gap:6px;height:27px;padding:0 11px;border-radius:6px;
         font-size:11.5px;font-weight:500;white-space:nowrap}
  .apbtn.pri{background:var(--ap-blue);color:#fff}
  .apbtn.sec{background:#fff;border:1px solid var(--ap-border);color:var(--ap-ink)}
  /* review comments */
  .rv{display:flex;gap:9px;align-items:flex-start;padding:9px 0;border-top:1px solid var(--p-line)}
  .rv:first-of-type{border-top:0}
  .rv .av{width:24px;height:24px;flex:none;border-radius:50%;background:#e6f3f4;color:#0b7c86;font-size:9.5px;
          font-weight:700;display:flex;align-items:center;justify-content:center}
  .rv .bd{flex:1;min-width:0}
  .rv .bd b{font-size:11.5px;font-weight:600}
  .rv .bd .rl{font-size:10px;color:var(--p-mute)}
  .rv .bd p{font-size:11.5px;line-height:1.5;color:var(--p-ink);margin-top:3px}


  /* ==========================================================
     APOLLO - the design system Max's prototype uses, so both the
     Cartographer screens and the published governed record read as the
     product the audience will see him demo. Values are lifted from
     the token CSS the prototype ships, not eyeballed.
     ========================================================== */
  :root{
    /* Apollo light, read from the token CSS the prototype ships. */
    --ap-ink:#182027; --ap-ink-600:#374652; --ap-ink-500:#526069; --ap-ink-400:#8a97a0;
    --ap-ink-300:#a4b1b8; --ap-ink-200:#cfd8dd; --ap-ink-100:#ecedee;
    --ap-line:#e1e2e4; --ap-border:#cfd8dd; --ap-canvas:#f8f9fa; --ap-bg-2:#f4f5f7;
    --ap-ink-150:#f4f5f7;
    --ap-orange:#fa4616; --ap-orange-100:#fee3dc;
    --ap-blue:#0067df; --ap-blue-700:#00489d; --ap-blue-300:#66adff; --ap-blue-200:#badaff;
    --ap-blue-100:#dae8fa; --ap-blue-50:#e9f1fa;
    --ap-green:#038108; --ap-green-400:#74c94b; --ap-green-100:#eeffe5;
    --ap-yellow:#ffb40e; --ap-yellow-100:#fff3db;
    --ap-red:#cc3d45; --ap-red-700:#a6040a; --ap-red-100:#fff0f1;
    --ap-purple:#6b4ea8; --ap-purple-100:#eee1ee;
  }
  .ah{flex:1;min-height:0;display:flex;background:#fff;color:var(--ap-ink);font-family:var(--sans);
      font-size:13.5px;overflow:hidden}
  .ah-side{width:176px;flex:none;border-right:1px solid var(--ap-line);padding:12px 9px;
           display:flex;flex-direction:column;gap:1px;background:#fff}
  .ah-side .brand{display:flex;align-items:center;gap:7px;padding:0 6px 11px;font-size:12.5px;font-weight:600}
  .ah-side .brand i{width:18px;height:18px;border-radius:5px;background:var(--ap-orange);flex:none;
                    display:block}
  .ah-nav{font-size:12px;color:#414244;padding:5px 8px;border-radius:6px;white-space:nowrap;
          overflow:hidden;text-overflow:ellipsis}
  .ah-nav.on{background:var(--ap-ink-150);color:var(--ap-ink);font-weight:600}
  .ah-main{flex:1;min-width:0;display:flex;flex-direction:column;overflow:hidden}
  .ah-top{flex:none;padding:11px 20px 0}
  .ah-crumb{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--ap-ink-500)}
  .ah-crumb b{color:var(--ap-ink);font-weight:600}
  .ah-crumb .sep{color:var(--ap-ink-300)}
  .ah-h1{display:flex;align-items:center;gap:9px;margin:9px 0 2px}
  .ah-h1 h2{font-size:20px;font-weight:600;letter-spacing:-.5px}
  .ah-h1 .acts{margin-left:auto;display:flex;gap:7px}
  .ah-btn{display:inline-flex;align-items:center;gap:5px;height:27px;padding:0 11px;border-radius:6px;
          border:1px solid var(--ap-line);font-size:12px;color:var(--ap-ink);background:#fff;white-space:nowrap}
  .ah-sub{font-size:12px;color:var(--ap-ink-500)}
  .ah-pill{display:inline-flex;align-items:center;gap:5px;border-radius:100px;padding:2.5px 9px;
           font-size:10px;font-weight:600;letter-spacing:.04em;white-space:nowrap}
  .ah-pill.proc{background:#e2f1f4;color:#0b6b7c}
  .ah-pill.phase{background:var(--ap-yellow-100);color:#9e6100}
  .ah-pill.ok{background:var(--ap-green-100);color:var(--ap-green)}
  /* the governance strip - the point of this screen */
  .ah-gov{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px 22px;
          padding:14px 20px;margin:13px 0 0;border-top:1px solid var(--ap-line);
          border-bottom:1px solid var(--ap-line)}
  .ah-gov div span{display:block;font-family:var(--pmono);font-size:8px;letter-spacing:.11em;
                   text-transform:uppercase;color:var(--ap-ink-500);margin-bottom:2px}
  .ah-gov div b{font-size:12.5px;font-weight:500}
  .ah-gov div b.mono{font-family:var(--pmono);font-size:11.5px;letter-spacing:.02em;color:var(--ap-ink)}
  .ah-tabs{flex:none;display:flex;gap:2px;padding:11px 20px 0}
  .ah-tabs span{font-size:12px;font-weight:500;color:var(--ap-ink-500);padding:6px 13px;border-radius:8px 8px 0 0}
  .ah-tabs span.on{background:var(--ap-ink-150);color:var(--ap-ink);font-weight:600}
  .ah-doc{flex:1;min-height:0;display:grid;grid-template-columns:216px minmax(0,1fr);gap:0;
          border-top:1px solid var(--ap-line);overflow:hidden}
  .ah-toc{border-right:1px solid var(--ap-line);padding:13px 12px;overflow:hidden;background:#fff}
  .ah-toc div{font-size:11.5px;color:#414244;padding:4px 8px;border-radius:6px;white-space:nowrap;
              overflow:hidden;text-overflow:ellipsis}
  .ah-toc div.on{background:#e2f1f4;color:#0b6b7c;font-weight:600}
  .ah-toc div.sub{padding-left:20px;font-size:11px;color:var(--ap-ink-500)}
  .ah-body{overflow:hidden;padding:15px 22px}
  .ah-body .dh{display:flex;align-items:baseline;gap:10px;margin-bottom:2px}
  .ah-body h3{font-size:19px;font-weight:600;letter-spacing:-.4px}
  .ah-body .dsub{font-size:11.5px;color:var(--ap-ink-500);margin-bottom:12px}
  .ah-body h4{font-size:13.5px;font-weight:600;margin:12px 0 5px}
  .ah-body p{font-size:12px;line-height:1.65;color:#2c3338;margin-bottom:7px}
  .ah-body p b{font-weight:600;color:var(--ap-ink)}
  .ah-kpi{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:11px 0}
  .ah-kpi .k{border:1px solid var(--ap-line);border-radius:8px;padding:9px 12px}
  .ah-kpi .k span{display:block;font-family:var(--pmono);font-size:8px;letter-spacing:.11em;
                  text-transform:uppercase;color:var(--ap-ink-500);margin-bottom:3px}
  .ah-kpi .k b{font-size:17px;font-weight:600;letter-spacing:-.3px}
  .ah-kpi .k u{display:block;text-decoration:none;font-size:10.5px;color:var(--ap-ink-500);margin-top:2px}
  .ah-sign{border:1px solid var(--ap-line);border-radius:8px;padding:11px 13px;margin-top:11px}
  .ah-sign .sh{display:flex;align-items:center;gap:8px;margin-bottom:8px}
  .ah-sign .sh span{font-family:var(--pmono);font-size:8px;letter-spacing:.11em;text-transform:uppercase;
                    color:var(--ap-ink-500)}
  .ah-sr{display:flex;align-items:center;gap:9px;font-size:11.5px;padding:4px 0;border-top:1px solid #f0f1f2}
  .ah-sr:first-of-type{border-top:0}
  .ah-sr .av{width:20px;height:20px;flex:none;border-radius:50%;background:var(--ap-ink-150);
             color:#414244;font-family:var(--pmono);font-size:8.5px;font-weight:600;display:flex;
             align-items:center;justify-content:center}
  .ah-sr .rl{flex:1;min-width:0;color:var(--ap-ink-500);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .ah-sr .rl b{color:var(--ap-ink);font-weight:600}


  /* ==========================================================
     COVERAGE DECISION CONSOLE - Alin's design, adopted 25 Aug.
     Original: vendor/alin-console/coverage-decision-console.html.
     Three columns: context rail with the 302px widget lane, the
     assembled case, and a decision column where the money, the
     authority meter and the rationale live. His mechanics, our
     narrative facts (torque 42->50 Nm, 4,100 hours, SR-440).
     ========================================================== */
  .cn{flex:1;min-height:0;display:flex;flex-direction:column;background:var(--p-bg);font-size:11.5px}
  .cn-top{flex:none;display:flex;align-items:center;gap:9px;padding:5px 14px;background:#fff;
          border-bottom:1px solid var(--p-line)}
  .cn-top .lg{width:20px;height:20px;border-radius:6px;background:var(--p-teal);color:#fff;font-size:11px;
              font-weight:700;display:flex;align-items:center;justify-content:center}
  .cn-top .nm{font-weight:600;font-size:12.5px}
  .cn-top .who{margin-left:auto;display:flex;align-items:center;gap:8px;text-align:right}
  .cn-top .who b{display:block;font-size:11px;font-weight:600;line-height:1.25}
  .cn-top .who u{display:block;text-decoration:none;font-size:9.5px;color:var(--p-mute);line-height:1.25}
  .cn-top .who i{width:22px;height:22px;border-radius:50%;background:var(--p-teal-50);color:var(--p-teal-700);
                 font-style:normal;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .cn-head{flex:none;padding:5px 14px 5px;background:#fff;border-bottom:1px solid var(--p-line-2)}
  .cn-head .r1{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .cn-head h4{font-family:var(--serif);font-size:15px;font-weight:500;letter-spacing:-.02em}
  .cn-id{display:flex;align-items:center;gap:5px 9px;flex-wrap:wrap;font-size:10.3px;color:var(--p-mute);margin-top:3px}
  .cn-id b{color:var(--p-ink);font-weight:500}
  .cn-id .ok{color:var(--p-green-ink);font-weight:500}
  .cn-src{font-family:var(--pmono);font-size:7.5px;font-weight:500;letter-spacing:.09em;text-transform:uppercase;
          color:var(--p-mute);background:var(--p-muted-bg);border-radius:3px;padding:1.5px 4px;white-space:nowrap}
  .cn-tiles{display:flex;gap:7px;margin-top:4px}
  .cn-tile{flex:1;display:flex;align-items:baseline;gap:8px;background:#fff;border:1px solid var(--p-line);border-radius:8px;padding:3px 10px}
  .cn-tile b{font-family:var(--serif);font-size:14px;font-weight:500;letter-spacing:-.02em;line-height:1.15}
  .cn-tile u{text-decoration:none;font-family:var(--pmono);font-size:7.5px;letter-spacing:.08em;
             text-transform:uppercase;color:var(--p-mute);margin-top:1px}
  .cn-tile.alarm{border-color:var(--p-red-line);background:linear-gradient(#fff,var(--p-red))}
  .cn-tile.alarm b{color:var(--p-red-ink)}
  .cn-tile.clock{border-color:#e6d9b0;background:linear-gradient(#fff,var(--p-yellow))}
  .cn-tile.clock b{color:var(--p-yellow-ink)}
  .cn3{flex:1;min-height:0;display:grid;grid-template-columns:232px minmax(0,1fr) 316px;gap:8px;
       padding:8px 14px 10px;align-items:start;overflow:hidden}
  .cn3 .col{display:grid;gap:7px;min-width:0}
  .cn-duo{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:7px;align-items:start}
  .cn .pad{padding:6px 10px}
  .cn .lbl{font-size:8px}
  .cn .drow{display:flex;align-items:baseline;gap:8px;padding:2px 0;border-top:1px solid var(--p-line);font-size:10.5px}
  .cn .drow:first-of-type{border-top:0}
  .cn .drow .k{flex:none;width:88px;color:var(--p-mute)}
  .cn .drow .v{flex:1;min-width:0;font-weight:500;text-align:right}
  .cn .drow .v.warn{color:var(--p-red-ink)}
  .cn-tl{display:flex;gap:8px;padding:2.5px 0;border-top:1px solid var(--p-line);font-size:10.3px;line-height:1.4}
  .cn-tl:first-of-type{border-top:0}
  .cn-tl .t{flex:none;width:38px;font-family:var(--pmono);font-size:9px;color:var(--p-mute);padding-top:1px}
  .cn-tl .c em{font-style:normal;display:block;color:var(--p-mute);font-size:9.3px}
  .cn-tl.now{background:var(--p-teal-surf);margin:0 -6px;padding:4px 6px;border-radius:5px;border-top-color:transparent}
  .cn-tl.now .t,.cn-tl.now .c{color:var(--p-teal-700);font-weight:500}
  .cn-gain{background:var(--p-green);border-radius:6px;padding:3px 9px;margin-top:4px}
  .cn-gain{display:flex;align-items:baseline;gap:7px}
  .cn-gain b{font-family:var(--serif);font-size:13px;font-weight:500;color:var(--p-green-ink)}
  .cn-gain span{font-family:var(--pmono);font-size:7.5px;letter-spacing:.08em;text-transform:uppercase;
                color:var(--p-green-ink);opacity:.85}
  .cn-lane{border:1.5px dashed var(--p-teal-line);border-radius:9px;padding:5px 10px;background:var(--p-teal-surf)}
  .cn-lane .rowu{display:flex;align-items:center;gap:7px;padding:2px 0;border-top:1px solid var(--p-teal-line);font-size:10.3px}
  .cn-lane .rowu:first-of-type{border-top:0}
  .cn-lane .rowu i{margin-left:auto;font-style:normal;font-size:10px;color:var(--p-mute);letter-spacing:2px}
  .cn-lane .rowu i.on{color:var(--p-green-ink);font-weight:700}
  .cn-lane .agg{font-size:10px;color:#3b5a63;line-height:1.4;margin-top:4px;padding-top:4px;border-top:1px solid var(--p-teal-line)}
  .cn-basis{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:10px;color:var(--p-mute)}
  .cn-basis b{color:var(--p-ink);font-weight:500}
  .cn-cause2{display:grid;grid-template-columns:1fr 1fr;gap:11px}
  .cn-cause{border:1px solid var(--p-line);border-radius:9px;padding:11px 13px;background:#fff;min-width:0}
  .cn-cause.pro{border-color:var(--p-green-line);background:linear-gradient(#fff 55%,var(--p-green))}
  .cn-cause.con{border-color:var(--p-red-line);background:linear-gradient(#fff 55%,var(--p-red))}
  .cn-cause h5{font-family:var(--serif);font-size:16px;font-weight:500;letter-spacing:-.015em;line-height:1.25;margin:5px 0 6px}
  .cn-cause p{font-size:12px;line-height:1.55;color:#3b444f}
  .cn-cause .pts{font-family:var(--pmono);font-size:7.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
                 margin-top:6px;display:flex;align-items:center;gap:6px}
  .cn-cause.pro .pts{color:var(--p-green-ink)}
  .cn-cause.con .pts{color:var(--p-red-ink)}
  .cn-cause .pts .srcs{margin-left:auto;display:inline-flex;gap:3px}
  .cn-verdict{margin-top:11px;margin-top:6px;border:1px solid var(--p-line-2);border-radius:7px;background:var(--p-paper);padding:4px 10px}
  .cn-verdict b{font-family:var(--serif);font-size:12px;font-weight:500}
  .cn-verdict p{font-size:10.3px;color:var(--p-mute);margin-top:2px;line-height:1.45}
  table.cn-pt{width:100%;border-collapse:collapse}
  table.cn-pt td{border-top:1px solid var(--p-line);padding:1.5px 0;font-size:10.2px;vertical-align:top}
  table.cn-pt tr:first-child td{border-top:0}
  table.cn-pt .g{width:18px;font-family:var(--pmono);font-size:10.5px;font-weight:600}
  table.cn-pt .g.p{color:var(--p-green-ink)}
  table.cn-pt .g.f{color:var(--p-red-ink)}
  table.cn-pt .g.u{color:var(--p-mute)}
  table.cn-pt .n{font-weight:500}
  table.cn-pt .d{color:var(--p-mute);font-size:9.8px;display:block}
  table.cn-pt tr.fail .n{color:var(--p-red-ink)}
  table.cn-pt .s{width:64px;text-align:right;white-space:nowrap}
  table.cn-cost{width:100%;border-collapse:collapse}
  table.cn-cost td{border-top:1px solid var(--p-line);padding:1.5px 0;font-size:10.2px}
  table.cn-cost tr:first-child td{border-top:0}
  table.cn-cost .amt{text-align:right;font-family:var(--pmono);font-size:10.3px;white-space:nowrap;padding-left:10px}
  table.cn-cost .s{width:64px;text-align:right}
  table.cn-cost tr.tot td{border-top:1.5px solid var(--p-line-2);font-weight:600;padding-top:5px}
  .cn-hist{display:flex;gap:9px;font-size:10.3px;line-height:1.45}
  .cn-hist .hl{flex:none;width:86px}
  .cn-hist .hl b{font-family:var(--pmono);font-size:9.5px;font-weight:600;display:block}
  .cn-hist .hl u{text-decoration:none;font-family:var(--pmono);font-size:8px;letter-spacing:.06em;
                 text-transform:uppercase;color:var(--p-mute)}
  .cn-flag{margin-top:5px;border:1px dashed var(--p-line-2);border-radius:7px;padding:5px 9px;
           font-size:10px;line-height:1.45;color:#4a5560;background:var(--p-paper)}
  .cn-flag b{font-weight:600;color:var(--p-ink)}
  .cn-dec{background:#fff;border:1px solid var(--p-teal-line);border-radius:10px;overflow:hidden;
          box-shadow:0 1px 2px rgba(20,28,36,.04),0 8px 22px rgba(20,28,36,.055)}
  .cn-dec .dhd{display:flex;align-items:center;gap:8px;padding:4px 11px;border-bottom:1px solid var(--p-line);
               background:var(--p-teal-surf)}
  .cn-dec .dhd b{font-family:var(--serif);font-size:13px;font-weight:500}
  .cn-dec .dbody{padding:5px 10px;display:flex;flex-direction:column;gap:4px}
  .cn-opt{display:flex;gap:8px;align-items:flex-start;border:1px solid var(--p-line-2);border-radius:8px;
          padding:3px 8px;background:#fff}
  .cn-opt .rad{flex:none;width:12px;height:12px;border-radius:50%;border:1.5px solid #b3b0a8;margin-top:2px;background:#fff}
  .cn-opt b{display:block;font-size:11px;font-weight:600;line-height:1.3}
  .cn-opt em{font-style:normal;display:block;font-size:9.8px;color:var(--p-mute);line-height:1.35}
  .cn-opt.on{border-color:var(--p-teal);background:var(--p-teal-surf);box-shadow:inset 0 0 0 1px var(--p-teal)}
  .cn-opt.on .rad{border-color:var(--p-teal);border-width:3.5px}
  .cn-split{border:1px solid var(--p-line);border-radius:8px;background:var(--p-paper);overflow:hidden}
  .cn-split .shd{display:flex;padding:4px 9px 3px;border-bottom:1px solid var(--p-line);background:#fff}
  .cn-split .shd .lbl{flex:1}
  .cn-split .shd .h{font-family:var(--pmono);font-size:7.5px;letter-spacing:.06em;text-transform:uppercase;
                    color:var(--p-mute);width:62px;text-align:right;flex:none}
  .cn-srow{display:flex;align-items:baseline;padding:1.5px 8px;border-top:1px solid var(--p-line);font-size:10.2px}
  .cn-srow:first-of-type{border-top:0}
  .cn-srow .nm2{flex:1;min-width:0}
    .cn-srow .a{width:62px;flex:none;text-align:right;font-family:var(--pmono);font-size:10px;white-space:nowrap}
  .cn-srow .a.z{color:#c3c0b9}
  .cn-srow .a.gw{color:var(--p-green-ink);font-weight:600}
  .cn-srow.tot{border-top:1.5px solid var(--p-line-2);background:#fff;padding:5px 9px}
  .cn-srow.tot .nm2{font-weight:600}
  .cn-srow.tot .a{font-weight:600;color:var(--p-ink)}
  .cn-auth{border:1px solid var(--p-green-line);border-radius:8px;padding:5px 9px;
           background:linear-gradient(#fff,var(--p-green))}
  .cn-auth .atop{display:flex;align-items:baseline;gap:8px;margin-bottom:5px}
  .cn-auth .atop b{font-family:var(--pmono);font-size:11px;font-weight:600;margin-left:auto}
  .cn-meter{height:6px;border-radius:999px;background:var(--p-muted-bg);position:relative;overflow:hidden}
  .cn-meter i{position:absolute;left:0;top:0;bottom:0;border-radius:999px;background:var(--p-green-ink)}
  .cn-auth .mtick{display:flex;justify-content:space-between;margin-top:3px}
  .cn-auth .mtick span{font-family:var(--pmono);font-size:7.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--p-mute)}
  .cn-auth .amsg{font-size:10px;line-height:1.4;margin-top:5px;font-weight:500;color:var(--p-green-ink)}
  .cn-idstrip{display:flex;background:#fff;border:1px solid var(--p-line);border-radius:9px;overflow:hidden}
  .cn-idstrip div{flex:1;min-width:0;padding:8px 12px;border-left:1px solid var(--p-line)}
  .cn-idstrip div:first-child{border-left:0}
  .cn-idstrip span{display:block;font-family:var(--pmono);font-size:7.5px;letter-spacing:.11em;
                   text-transform:uppercase;color:var(--p-mute);margin-bottom:3px}
  .cn-idstrip b{display:block;font-size:11.5px;font-weight:600;line-height:1.3}
  .cn-idstrip div.rec{background:var(--p-teal-surf)}
  .cn-idstrip div.rec b{color:var(--p-teal-700)}
  .cn-slaline{display:flex;align-items:center;gap:10px;font-size:11.5px;color:var(--p-mute)}
  .cn2{flex:1;min-height:0;display:grid;grid-template-columns:302px minmax(0,1fr) 372px;gap:13px;align-items:start}
  .cn-more{display:flex;gap:9px;align-items:center;background:#fff;border:1px solid var(--p-line);
           border-radius:9px;padding:10px 13px;font-size:11.5px;color:var(--p-mute);line-height:1.5}
  .cn-more .chev{font-size:15px;color:var(--p-mute);flex:none;line-height:1}
  .cn-agree{border:1px solid var(--p-teal-line);border-radius:8px;padding:8px 10px;background:var(--p-teal-surf)}
  .cn-tri{display:flex;gap:7px;align-items:center;font-size:10.8px;padding:3.5px 0;color:var(--p-ink)}
  .cn-tri .rad{width:11px;height:11px;flex:none;border-radius:50%;border:1.5px solid #b3b0a8;background:#fff}
  .cn-tri.on{font-weight:600}
  .cn-tri.on .rad{border-color:var(--p-teal);border-width:3.5px}
  .cn-rat{border:1px solid var(--p-line-2);border-radius:8px;padding:4px 9px;background:#fff}
  .cn-rat p{font-size:10px;line-height:1.4;color:var(--p-ink);margin-top:3px}
  .cn-rat .dr{font-family:var(--pmono);font-size:7.5px;letter-spacing:.08em;text-transform:uppercase;
              color:var(--p-mute);margin-top:5px;display:flex;gap:7px}
  .cn-rat .dr a{color:var(--p-teal-700);text-decoration:none;border-bottom:1px solid var(--p-teal-line)}
  .cn-ds{display:flex;gap:7px;align-items:flex-start;padding:2.5px 0;font-size:10px;line-height:1.4}
  .cn-ds i{flex:none;width:4px;height:4px;border-radius:50%;background:var(--p-teal);margin-top:5px;font-style:normal}
  .cn-ds u{text-decoration:none;color:var(--p-mute)}
  .cn-foot{border-top:1px solid var(--p-line);padding:5px 10px;background:var(--p-paper);
           display:flex;flex-direction:column;gap:3px}
  .cn-foot .othr{display:flex;gap:5px}
  .cn-foot .othr .btn{flex:1;height:22px;padding:0 5px;font-size:9.5px}
  .cn-foot .btn.primary{height:26px}
  .cn-foot .esc{font-family:var(--pmono);font-size:7.5px;letter-spacing:.07em;text-transform:uppercase;
                color:var(--p-mute);text-align:center;line-height:1.5}

  /* ==========================================================
     PRODUCT UI (everything below the address bar)
     ========================================================== */
  .screen{position:relative;flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;
          background:var(--p-bg);color:var(--p-ink);font-family:var(--sans);font-size:13.5px;line-height:1.55}
  .screen .tag{font-family:var(--pmono);font-size:8.5px;font-weight:600;border-radius:4px;padding:1.5px 4px;letter-spacing:.02em}
  .screen .tag.EVT{background:#f4eefb;color:var(--p-violet-ink)}
  /* app top nav */
  .ptop{flex:none;display:flex;align-items:center;gap:12px;padding:9px 18px;background:rgba(255,255,255,.92);border-bottom:1px solid var(--p-line)}
  .plogo{width:30px;height:30px;flex:none;border-radius:7px;background:var(--p-teal);color:#fff;
         font-family:var(--serif);font-size:15px;font-weight:500;display:flex;align-items:center;justify-content:center}
  .pname{font-family:var(--serif);font-size:16px;font-weight:500;letter-spacing:-.01em;white-space:nowrap}
  .pnav{display:flex;gap:16px;margin-left:12px;font-size:12.5px;color:var(--p-mute)}
  .pnav span{padding-bottom:2px;border-bottom:2px solid transparent;white-space:nowrap}
  .pnav span.on{color:var(--p-ink);font-weight:500;border-bottom-color:var(--p-teal)}
  .ptools{margin-left:auto;display:flex;align-items:center;gap:8px}
  .pchip{display:flex;align-items:center;gap:7px;border:1px solid var(--p-line);border-radius:7px;background:#fff;padding:4px 9px}
  .pchip i{width:7px;height:7px;border-radius:50%;background:var(--p-teal);opacity:.55;flex:none}
  .pchip b{display:block;font-size:11.5px;font-weight:500;line-height:1.3}
  .pchip u{display:block;text-decoration:none;font-size:10.5px;color:var(--p-mute);line-height:1.3}
  /* main region */
  .pmain{flex:1;min-height:0;overflow:hidden;padding:18px 20px;display:flex;flex-direction:column;gap:14px}
  .pmain.p0{padding:0}
  .prow{display:flex;align-items:center;gap:14px;flex-wrap:nowrap}
  /* primitives */
  .pcard{background:#fff;border:1px solid var(--p-line);border-radius:10px}
  .pcard.paper{background:var(--p-paper)}
  .pcard.flat{border-radius:10px}
  .pad{padding:14px 16px}
  .pad-s{padding:11px 13px}
  .lbl{font-family:var(--pmono);font-size:9px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--p-mute);display:block}
  .lbl.tl{color:var(--p-teal-700)}
  .ptitle{font-family:var(--serif);font-size:16.5px;font-weight:500;letter-spacing:-.02em;line-height:1.25}
  .phead{font-family:var(--serif);font-size:22px;font-weight:500;letter-spacing:-.025em;line-height:1.2}
  .psub{font-size:12.5px;color:var(--p-mute)}
  .pbody{font-size:12.5px;line-height:1.6}
  .pmono{font-family:var(--pmono);font-size:10.5px;color:var(--p-mute);letter-spacing:.04em}
  .prule{height:1px;background:var(--p-line);border:0}
  .ptag{display:inline-flex;align-items:center;border-radius:999px;padding:2.5px 9px;font-size:9.5px;font-weight:600;
        letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
  .ptag.tl{background:var(--p-teal-50);color:var(--p-teal-700)}
  .ptag.bl{background:var(--p-blue);color:var(--p-blue-ink)}
  .ptag.gn{background:var(--p-green);color:var(--p-green-ink)}
  .ptag.yl{background:var(--p-yellow);color:var(--p-yellow-ink)}
  .ptag.rd{background:var(--p-red);color:var(--p-red-ink)}
  .ptag.gy{background:var(--p-muted-bg);color:var(--p-mute)}
  .ptag.vt{background:var(--p-violet);color:var(--p-violet-ink)}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:29px;padding:0 13px;border-radius:6px;
       border:1px solid var(--p-line-2);background:#fff;font-size:12px;font-weight:500;color:var(--p-ink);white-space:nowrap}
  .btn.primary{background:var(--p-teal);border-color:var(--p-teal);color:#fff}
  .btn.sm{height:25px;font-size:11px;padding:0 10px}
  .psearch{display:flex;align-items:center;gap:7px;height:28px;min-width:236px;border:1px solid var(--p-line-2);
           border-radius:6px;padding:0 10px;background:#fff;color:#9aa1a8;font-size:12px}
  .ptabs{display:flex;gap:18px;font-size:12.5px;color:var(--p-mute)}
  .ptabs span{padding-bottom:3px;border-bottom:2px solid transparent;white-space:nowrap}
  .ptabs span.on{color:var(--p-ink);font-weight:500;border-bottom-color:var(--p-teal)}
  /* tables */
  table.pt{width:100%;border-collapse:collapse;table-layout:fixed}
  .pt th{height:28px;background:var(--p-paper);border-top:1px solid var(--p-line);border-bottom:1px solid var(--p-line);
         font-family:var(--pmono);font-size:9px;font-weight:400;letter-spacing:.12em;text-transform:uppercase;
         color:var(--p-mute);text-align:left;padding:0 14px;white-space:nowrap}
  .pt td{border-bottom:1px solid var(--p-line);padding:11px 14px;font-size:12.5px;vertical-align:middle}
  .pt tr.hero td{background:var(--p-teal-surf)}
  .pt tbody tr:last-child td{border-bottom:0}
  .pt .nm{display:block;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .pref{font-family:var(--pmono);font-size:11.5px;color:var(--p-teal);font-weight:500;display:block}
  .psubx{display:block;font-size:11.5px;color:var(--p-mute);margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .ptail td{font-family:var(--pmono);font-size:10.5px;letter-spacing:.04em;color:var(--p-mute);padding:9px 14px;background:var(--p-paper)}
  /* KPI cells */
  .kval{font-family:var(--serif);font-size:33px;font-weight:500;letter-spacing:-.03em;line-height:1}
  .kval small{font-size:15px;color:var(--p-mute);font-family:var(--serif)}
  .kval.txt{font-size:18px;letter-spacing:-.015em;line-height:1.2}
  .kdelta{font-family:var(--pmono);font-size:10.5px;color:var(--p-yellow-ink)}
  svg.spark{display:block;width:100%;height:36px;margin-top:11px}
  /* facts strip under a case header */
  .facts{display:flex;border-top:1px solid var(--p-line)}
  .fact{flex:1;min-width:0;padding:9px 16px;border-right:1px solid var(--p-line)}
  .fact:last-child{border-right:0}
  .fact b{display:block;font-size:12.5px;font-weight:500;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  /* vertical stage timeline */
  .stline{border-left:1px solid var(--p-line-2);margin-left:3px}
  .st{position:relative;display:flex;gap:10px;align-items:baseline;padding:5px 0 5px 15px;font-size:12.5px}
  .st::before{content:"";position:absolute;left:-4.5px;top:10px;width:8px;height:8px;border-radius:50%;background:var(--p-line-2)}
  .st.done{color:var(--p-mute)} .st.done::before{background:var(--p-green-ink)}
  .st.cur{font-weight:500} .st.cur::before{background:var(--p-teal);box-shadow:0 0 0 4px var(--p-teal-50)}
  .st.dim{color:#a9aca6}
  .st .when{margin-left:auto;font-family:var(--pmono);font-size:9.5px;color:var(--p-mute)}
  /* document + detail + update rows */
  .docrow{display:grid;grid-template-columns:30px minmax(0,1fr) auto;align-items:center;gap:9px;padding:7px 0;
          border-bottom:1px dashed var(--p-line);font-size:12px}
  .docrow:last-child{border-bottom:0}
  .docrow .ext{font-family:var(--pmono);font-size:8px;color:var(--p-mute);text-transform:uppercase;
               border:1px solid var(--p-line);border-radius:4px;padding:2px 0;text-align:center;letter-spacing:.06em}
  .docrow .nm{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .docrow .meta{font-family:var(--pmono);font-size:9.5px;color:var(--p-mute)}
  .drow{display:flex;justify-content:space-between;gap:12px;align-items:baseline;padding:5.5px 0;border-bottom:1px dashed var(--p-line);font-size:12px}
  .drow:last-child{border-bottom:0}
  .drow .k{color:var(--p-mute)}
  .drow .v{font-family:var(--pmono);font-size:10.5px;text-align:right;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .upd{display:flex;gap:10px;align-items:baseline;padding:6px 0;border-bottom:1px dashed var(--p-line);font-size:12px}
  .upd:last-child{border-bottom:0}
  .upd .when{margin-left:auto;font-family:var(--pmono);font-size:9.5px;color:var(--p-mute);white-space:nowrap}
  /* feature icon */
  .fic{width:26px;height:26px;flex:none;border-radius:7px;background:var(--p-teal-50);color:var(--p-teal-700);
       display:flex;align-items:center;justify-content:center;font-size:12px}
  /* ---------- process scribe (PDD) ---------- */
  .docnav div{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:var(--p-mute);padding:6px 9px;border-radius:6px;line-height:1.4}
  .docnav div.on{background:var(--p-teal-surf);color:var(--p-teal-700);font-weight:500;box-shadow:inset 2px 0 0 var(--p-teal)}
  .docnav div em{font-family:var(--pmono);font-size:9.5px;font-style:normal;flex:none;opacity:.8}
  .paper-sheet{background:#fff;border:1px solid var(--p-line);border-radius:10px;padding:20px 26px;overflow:hidden}
  .paper-sheet h1{font-family:var(--serif);font-size:24px;font-weight:500;letter-spacing:-.025em;line-height:1.2;margin:8px 0 6px}
  .paper-sheet h2{font-family:var(--serif);font-size:15px;font-weight:500;letter-spacing:-.015em;margin:0 0 6px}
  .paper-sheet p{font-size:12.5px;line-height:1.65;color:#3f4550}
  /* ---------- coding agent session ---------- */
  .thread{display:flex;flex-direction:column;gap:12px}
  .msg{display:flex;gap:10px;align-items:flex-start}
  .msg .who{width:26px;height:26px;flex:none;border-radius:7px;display:flex;align-items:center;justify-content:center;
            font-family:var(--pmono);font-size:9px;font-weight:600}
  .msg .who.u{background:var(--p-muted-bg);color:#5f625c}
  .msg .who.a{background:var(--p-teal);color:#fff;font-family:var(--serif);font-size:13px}
  .msg .bub{flex:1;min-width:0;border:1px solid var(--p-line);border-radius:10px;background:#fff;padding:11px 13px}
  .msg.u .bub{background:var(--p-teal-surf);border-color:var(--p-teal-line)}
  .msg .bub p{font-size:12.5px;line-height:1.6}
  .cklist{display:grid;gap:6px;margin-top:9px}
  .cki{display:flex;gap:9px;align-items:center;font-size:12px;border:1px solid var(--p-line);border-radius:7px;
       padding:7px 10px;background:var(--p-paper)}
  .cki .ck{width:15px;height:15px;flex:none;border-radius:50%;background:var(--p-green);color:var(--p-green-ink);
           font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .prompt-in{display:flex;align-items:center;gap:9px;height:34px;border:1px solid var(--p-line-2);border-radius:8px;
             background:#fff;padding:0 12px;font-size:12px;color:#a3a8a1}
  /* ---------- case-plan design canvas ---------- */
  /* ---------- instance management: single-instance + migrate modal, close to the real OOTB screens ---------- */
  .iv-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .iv-back{color:var(--p-mute);font-size:12px}
  .iv-crumb{font-size:12px;color:var(--p-mute)}
  .iv-crumb b{color:var(--p-ink);font-weight:500}
  .iv-status{margin-left:auto;display:flex;align-items:center;gap:10px}
  .iv-status .lbl2{font-size:11px;color:var(--p-mute)}
  .iv-title{font-family:var(--serif);font-size:19px;font-weight:500;letter-spacing:-.02em}
  .iv-diagram{position:relative;border:1px solid var(--p-line);border-radius:10px;background:#fbfbfc;padding:22px 16px 16px}
  .iv-cmchip{position:absolute;top:-16px;left:50%;transform:translateX(-50%);background:#fff;border:1px solid var(--p-line);
             border-radius:10px;padding:6px 12px;display:flex;align-items:center;gap:8px;box-shadow:0 4px 10px rgba(20,28,36,.08)}
  .iv-row{display:flex;align-items:center;justify-content:center;gap:0;overflow-x:auto;padding:4px 0}
  .iv-node{flex:none;width:108px;border:1.3px solid var(--p-line);border-radius:8px;background:#fff;padding:6px 8px;position:relative}
  .iv-node.on{border-color:var(--p-teal)}
  .iv-node b{display:block;font-size:9.5px;font-weight:600;color:var(--p-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .iv-node span{display:block;font-size:7.5px;color:var(--p-mute);margin-top:1px}
  .iv-node .tasks{margin-top:4px;display:grid;gap:1.5px}
  .iv-node .tasks i{display:block;height:2px;border-radius:2px;background:#e4e8ee}
  .iv-node .tasks i.on{background:var(--p-teal)}
  .iv-arrow2{flex:none;color:#c1c6cd;font-size:12px;padding:0 4px}
  .iv-band{margin-top:10px;background:#fbf4e6;border:1px solid #f0dfb3;border-radius:8px;padding:8px 10px}
  .iv-band .cap{font-size:9px;color:#946300;font-weight:600;margin-bottom:6px}
  .iv-band .iv-row{gap:8px}
  .iv-zoom{position:absolute;bottom:8px;right:10px;display:flex;gap:5px}
  .iv-zoom span{width:20px;height:20px;border:1px solid var(--p-line);border-radius:5px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--p-mute)}
  .iv-tabbar{display:flex;align-items:center;padding:9px 12px;border-bottom:1px solid var(--p-line)}
  .iv-tabbar span{font-size:11.5px;color:var(--p-mute);margin-right:16px}
  .iv-tabbar span.on{color:var(--p-teal);font-weight:600;border-bottom:2px solid var(--p-teal);padding-bottom:9px;margin-bottom:-9px}
  .iv-tabbar .ic{margin-left:auto;display:flex;gap:9px;color:var(--p-mute)}
  /* migrate modal, styled after the OOTB dialog */
  .iv-backdrop{position:absolute;inset:0;background:rgba(23,29,45,.42);display:flex;align-items:center;justify-content:center;z-index:2}
  .iv-modal{width:460px;background:#fff;border-radius:12px;box-shadow:0 30px 60px rgba(0,0,0,.35);padding:20px 22px}
  .iv-modal h4{font-family:var(--serif);font-size:16px;font-weight:600;margin-bottom:8px}
  .iv-modal p{font-size:11.5px;color:var(--p-mute);line-height:1.5;margin-bottom:14px}
  .iv-verrow{display:flex;align-items:center;gap:10px;margin-bottom:14px}
  .iv-verfield{flex:1;border:1px solid var(--p-line);border-radius:7px;padding:7px 10px}
  .iv-verfield .l{font-size:9px;color:var(--p-mute);display:block;margin-bottom:2px}
  .iv-verfield .v{font-size:12px;color:var(--p-ink)}
  .iv-modal table.pt{margin-bottom:12px}
  .iv-cfield{border:1px solid var(--p-line);border-radius:7px;padding:8px 10px;font-size:11px;color:var(--p-mute);margin-bottom:16px}
  .canvas{flex:1;min-height:0;border:1px solid var(--p-line);border-radius:10px;background:#fff;
          background-image:radial-gradient(#dfe3e8 1px,transparent 1px);background-size:22px 22px;
          padding:13px 15px;display:flex;flex-direction:column;gap:11px;overflow:hidden}
  .cbar{display:flex;align-items:center;gap:10px}
  .cm-chip{display:inline-flex;gap:9px;align-items:center;background:#fff;border:1px solid var(--p-line-2);
           border-radius:9px;padding:6px 11px;box-shadow:0 1px 2px rgba(20,30,40,.05)}
  .cm-chip .fic{width:24px;height:24px}
  .cm-chip b{display:block;font-family:var(--serif);font-size:13px;font-weight:500;line-height:1.25}
  .cm-chip u{display:block;text-decoration:none;font-size:10.5px;color:var(--p-mute);line-height:1.25}
  .zoom{margin-left:auto;display:flex;align-items:center;gap:2px;border:1px solid var(--p-line-2);border-radius:6px;
        background:#fff;height:26px;padding:0 4px;font-family:var(--pmono);font-size:10px;color:var(--p-mute)}
  .zoom s{text-decoration:none;padding:0 6px;color:#6f7a85}
  .srow{display:grid;gap:19px}
  .pstage{position:relative;background:#fff;border:1px solid var(--p-line-2);border-radius:9px;padding:9px 10px;min-width:0}
  .pstage .n{font-family:var(--pmono);font-size:8.5px;color:var(--p-mute);letter-spacing:.1em}
  .pstage h5{font-size:11.5px;font-weight:600;line-height:1.3;margin:2px 0 3px;letter-spacing:-.005em}
  .pstage .sla{font-family:var(--pmono);font-size:8.5px;color:var(--p-mute);letter-spacing:.04em;margin-bottom:7px}
  .pstage .thead{font-family:var(--pmono);font-size:8px;letter-spacing:.13em;text-transform:uppercase;color:var(--p-mute);
                 border-top:1px solid var(--p-line);padding-top:6px;margin-bottom:5px}
  .pstage.new{border-color:var(--p-teal);box-shadow:0 0 0 3px rgba(12,127,149,.12)}
  .pstage .bdg{position:absolute;top:-7px;right:-7px;min-width:16px;height:16px;padding:0 4px;border-radius:999px;
               display:none;align-items:center;justify-content:center;font-family:var(--pmono);font-size:8px;font-weight:600;color:#fff}
  .pstage.new .bdg{display:flex;background:var(--p-teal)}
  .srow .pstage:not(:last-child)::after{content:"";position:absolute;right:-19px;top:26px;width:19px;height:1px;background:#c9d0d8}
  .srow .pstage:not(:last-child)::before{content:"";position:absolute;right:-7px;top:23px;width:0;height:0;
                                          border-left:5px solid #c9d0d8;border-top:3.5px solid transparent;border-bottom:3.5px solid transparent}
  .ptask{display:flex;gap:6px;align-items:flex-start;border:1px solid var(--p-line);border-radius:6px;
         padding:4px 6px;margin-bottom:4px;font-size:9.5px;line-height:1.35;background:#fff}
  .ptask span{min-width:0}
  .ptask:last-child{margin-bottom:0}
  .ptask.new{border-color:var(--p-teal-line);background:var(--p-teal-surf)}
  .secband{border:1px dashed var(--p-line-2);border-radius:9px;background:rgba(241,240,236,.6);padding:10px 12px}
  .clegend{display:flex;gap:14px;align-items:center;font-size:10.5px;color:var(--p-mute);margin-top:auto}
  /* ---------- live edit diff ---------- */
  .diff{border:1px solid var(--p-line);border-radius:9px;background:#fff;overflow:hidden}
  .diff .dh{display:flex;align-items:center;gap:9px;background:var(--p-paper);border-bottom:1px solid var(--p-line);
            padding:8px 12px;font-family:var(--pmono);font-size:10px;color:var(--p-mute);letter-spacing:.05em}
  .dl{display:grid;grid-template-columns:22px 1fr;gap:8px;padding:9px 12px;border-bottom:1px solid var(--p-line);
      font-family:var(--pmono);font-size:11px;line-height:1.5}
  .dl:last-child{border-bottom:0}
  .dl .g{text-align:center;font-weight:600;color:#9aa3ad}
  .dl.add{background:#f4faf5;color:#2c5a34} .dl.add .g{color:var(--p-green-ink)}
  .dl.mod{background:#fdfaf1;color:#6d5411} .dl.mod .g{color:var(--p-yellow-ink)}
  .quote{font-family:var(--serif);font-size:14.5px;font-style:italic;line-height:1.5;color:var(--p-ink)}
  /* ---------- action center sheet ---------- */
  .scrim{position:absolute;inset:0;background:rgba(23,29,45,.34);z-index:2}
  .sheet{position:absolute;top:0;right:0;bottom:0;width:560px;z-index:3;background:#fff;border-left:1px solid var(--p-line-2);
         display:flex;flex-direction:column;box-shadow:-26px 0 64px -30px rgba(23,29,45,.3)}
  .sheet .sh{display:flex;align-items:center;gap:10px;padding:12px 18px;border-bottom:1px solid var(--p-line)}
  .sheet .sb{flex:1;min-height:0;overflow:hidden;padding:16px 18px;display:flex;flex-direction:column;gap:12px}
  .sheet .sf{flex:none;display:flex;align-items:center;gap:9px;padding:12px 18px;border-top:1px solid var(--p-line);background:var(--p-paper)}
  .instr{font-size:12.5px;line-height:1.6;background:var(--p-teal-surf);border:1px solid var(--p-teal-line);
         border-radius:8px;padding:11px 13px;color:#33474b}
  .opt{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--p-line-2);border-radius:9px;padding:10px 12px;margin-bottom:8px}
  .opt .radio{width:15px;height:15px;flex:none;margin-top:1px;border:1.5px solid var(--p-line-2);border-radius:50%}
  .opt b{display:block;font-size:12.5px;font-weight:500}
  .opt em{display:block;font-style:normal;font-size:11.5px;color:var(--p-mute);margin-top:1px}
  .opt.chosen{border-color:var(--p-teal);background:var(--p-teal-surf);box-shadow:0 0 0 2px rgba(12,127,149,.1)}
  .opt.chosen .radio{border-color:var(--p-teal);background:var(--p-teal);box-shadow:inset 0 0 0 2.5px #fff}
  .opt.chosen b::after{content:" · Selected";font-family:var(--pmono);font-size:9px;letter-spacing:.08em;
                       text-transform:uppercase;color:var(--p-teal-700)}
  /* ---------- case agent diagram ---------- */
  .cmwrap{flex:1;min-height:0;display:flex;flex-direction:column;gap:14px}
  .cmcanvas{flex:1;min-height:0;border:1px solid var(--p-line);border-radius:10px;background:#fff;
            background-image:radial-gradient(#e3e6ea 1px,transparent 1px);background-size:22px 22px;
            display:grid;grid-template-columns:1fr 76px 1.06fr 76px 1fr;align-items:center;padding:22px 24px}
  .cmnode{border:1px solid var(--p-line-2);border-radius:11px;background:#fff;padding:15px 16px;box-shadow:0 1px 2px rgba(20,30,40,.05)}
  .cmnode.hub{border-color:var(--p-teal);background:linear-gradient(#fff,var(--p-teal-surf));
              box-shadow:0 0 0 4px rgba(12,127,149,.1),0 6px 18px -8px rgba(12,127,149,.35)}
  .cmnode b{display:block;font-family:var(--serif);font-size:17px;font-weight:500;letter-spacing:-.02em}
  .cmnode em{display:block;font-style:normal;font-size:12px;color:var(--p-mute);margin-top:3px;line-height:1.45}
  .cmpills{display:flex;flex-wrap:wrap;gap:5px;margin-top:10px}
  .cmpills span{font-family:var(--pmono);font-size:8.5px;letter-spacing:.06em;text-transform:uppercase;
                border:1px solid var(--p-line);border-radius:999px;padding:3px 8px;color:var(--p-mute);background:var(--p-paper)}
  .cmarrow{display:flex;align-items:center;justify-content:center;color:#c2cad2}
  .cmrules{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  /* ---------- closing slide: a real PPT slide, not a product screen ---------- */
  .slide{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;
         background:radial-gradient(120% 100% at 50% 0%,#232b36 0%,#161b22 55%,#12161c 100%);overflow:hidden}
  .slide::before{content:"";position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg,#fa4616,#ff8a5c)}
  .slide::after{content:"";position:absolute;width:640px;height:640px;border-radius:50%;
               background:radial-gradient(circle,rgba(250,70,22,.16),transparent 70%);top:-260px;right:-160px}
  .slide .kicker{font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#ff8a5c;position:relative;z-index:1}
  .slide h2{font-family:var(--serif);font-size:46px;font-weight:500;letter-spacing:-.03em;line-height:1.15;text-align:center;color:#fff;position:relative;z-index:1}
  .chain{display:flex;align-items:stretch;gap:14px;position:relative;z-index:1}
  .chain .lnk{display:flex;flex-direction:column;align-items:center;gap:10px;background:rgba(255,255,255,.06);
              border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:18px 26px;min-width:196px;backdrop-filter:blur(2px)}
  .chain .lnk .b{width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#fa4616,#ff8a5c);color:#fff;font-family:var(--serif);
                 font-size:17px;display:flex;align-items:center;justify-content:center;font-weight:600}
  .chain .lnk b{font-family:var(--serif);font-size:15.5px;font-weight:500;letter-spacing:-.015em;text-align:center;color:#fff}
  /* mini "screenshot" thumbnails for the closing slide */
  .thumb{width:126px;height:78px;border-radius:7px;overflow:hidden;box-shadow:0 6px 16px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12)}
  .thumb .hd{height:14px;display:flex;align-items:center;gap:3px;padding:0 6px}
  .thumb .hd i{width:4px;height:4px;border-radius:50%}
  .thumb-cg{background:linear-gradient(160deg,#eef8ee,#ffffff)}
  .thumb-cg .hd{background:#fff}
  .thumb-cg .hd i{background:#bfdde3}
  .thumb-cg .bd{padding:6px 8px;display:flex;gap:6px}
  .thumb-cg .doc{flex:1;background:#fff;border-radius:3px;padding:5px 6px;box-shadow:0 1px 2px rgba(20,30,40,.08)}
  .thumb-cg .doc .r1{height:3px;width:70%;background:var(--ap-blue);border-radius:2px;margin-bottom:4px}
  .thumb-cg .doc .r2{height:2px;width:90%;background:#e2e6ea;border-radius:2px;margin-bottom:3px}
  .thumb-cg .doc .r3{height:2px;width:60%;background:#e2e6ea;border-radius:2px}
  .thumb-cx{background:#161615}
  .thumb-cx .hd{background:#1e1e1c}
  .thumb-cx .hd i{background:#3a3a36}
  .thumb-cx .bd{padding:7px 8px;display:flex;flex-direction:column;gap:3px}
  .thumb-cx .tl{height:2.5px;border-radius:2px;background:#3a3a36}
  .thumb-cx .tl.ok{background:#5fae7b;width:80%}
  .thumb-cx .tl.dim{width:55%}
  .thumb-cx .tl.full{width:92%}
  .thumb-mm{background:#fff}
  .thumb-mm .hd{background:#0c7f95}
  .thumb-mm .hd i{background:rgba(255,255,255,.5)}
  .thumb-mm .bd{padding:6px 7px;display:flex;gap:4px}
  .thumb-mm .stg{flex:1;background:#f4f6f9;border:1px solid #e4e8ee;border-radius:2px;height:52px;padding:3px}
  .thumb-mm .stg .d1{height:2px;width:80%;background:#c7ced8;border-radius:2px;margin-bottom:3px}
  .thumb-mm .stg .d2{height:2px;width:60%;background:#dfe3ea;border-radius:2px}
  .thumb-mm .stg.on{border-color:#0c7f95;box-shadow:0 0 0 1px rgba(12,127,149,.25)}
  .chain .arw{display:flex;align-items:center;color:#5b6572;font-size:19px}
  .slide .foot{position:absolute;bottom:22px;left:0;right:0;display:flex;justify-content:center;gap:8px;
               font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.1em;color:#5b6572}
  /* coda */
  .coda{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-top:32px}
  .coda h2{font-family:var(--serif);font-size:19px;font-weight:500;letter-spacing:-.02em;margin-bottom:9px}
  .coda p{font-size:12px;color:#3d4754;margin-bottom:8px}
  footer{font-size:10px;color:var(--muted);padding:20px 0 0}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
  @media(max-width:1050px){.page{flex-direction:column}.toc{position:static;width:100%;max-height:none}
    .actrow{grid-template-columns:1fr}.mast h1{font-size:26px}}
/* == review-notes:css:start == */
/* ===========================================================================
   Review notes — styles. Canonical source; inlined into the storyboards by
   tools/inject-review-notes.py. Deliberately quiet so it never competes with
   the mockups it sits on top of.
   =========================================================================== */

/* ---------- floating bar ---------- */
#fbBar {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 70;
  display: flex;
  gap: 2px;
  padding: 3px;
  background: #fff;
  border: 1px solid #d7dde4;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(20, 28, 36, .06), 0 14px 30px -12px rgba(20, 28, 36, .28);
  font-family: var(--sans, system-ui), sans-serif;
}
#fbBar button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  color: #4a5461;
  cursor: pointer;
}
#fbBar button:hover { background: #f1f4f7; }
#fbToggle[aria-pressed="true"] {
  background: #0b7285;
  color: #fff;
}
#fbOpen b {
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 11px;
  font-weight: 600;
}
#fbBar.has #fbOpen { color: #0b7285; font-weight: 600; }
#fbBar button:focus-visible { outline: 2px solid #0b7285; outline-offset: 2px; }

/* ---------- comment mode ---------- */
body.fb-on { cursor: crosshair; }
body.fb-on .talktrack,
body.fb-on .demonotes,
body.fb-on .scene > h3,
body.fb-on .scene > .narr,
body.fb-on .frame,
body.fb-on .act,
body.fb-on .flowbrief,
body.fb-on .capbox,
body.fb-on .synopsis,
body.fb-on .mast .dek {
  outline: 1px dashed transparent;
  outline-offset: 3px;
  transition: outline-color .12s ease, background-color .12s ease;
}
body.fb-on .talktrack:hover,
body.fb-on .demonotes:hover,
body.fb-on .scene > h3:hover,
body.fb-on .scene > .narr:hover,
body.fb-on .frame:hover,
body.fb-on .flowbrief:hover,
body.fb-on .capbox:hover,
body.fb-on .synopsis:hover,
body.fb-on .mast .dek:hover {
  outline-color: #0b7285;
  background-color: rgba(11, 114, 133, .045);
}
/* the storyboard's own hover lift would fight the outline in strip view */
body.fb-on .frame:hover { transform: none; }
body.fb-on #fbBar, body.fb-on #fbPanel, body.fb-on #fbComposer { cursor: default; }

/* a marker on anything already commented on */
.fb-flag { position: relative; }
.fb-pin {
  position: absolute;
  top: -8px;
  left: -8px;
  z-index: 6;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: #fa4616;
  color: #fff;
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 10px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(20, 28, 36, .3);
  pointer-events: none;
}

/* ---------- composer ---------- */
#fbComposer {
  position: fixed;
  z-index: 80;
  width: 320px;
  padding: 13px 14px 12px;
  background: #fff;
  border: 1px solid #cbd3dc;
  border-radius: 11px;
  box-shadow: 0 2px 6px rgba(20, 28, 36, .08), 0 22px 44px -14px rgba(20, 28, 36, .38);
  font-family: var(--sans, system-ui), sans-serif;
}
.fbc-h { display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px; }
.fbc-h b { font-size: 12.5px; font-weight: 600; color: #1c2530; }
.fbc-h span {
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 8.5px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #0b7285;
  background: #e6f4f6;
  border-radius: 4px;
  padding: 2px 6px;
}
.fbc-ex {
  font-size: 11.5px;
  line-height: 1.5;
  color: #6b7684;
  border-left: 2px solid #e4e8ee;
  padding: 1px 0 1px 9px;
  margin-bottom: 9px;
  max-height: 58px;
  overflow: hidden;
}
#fbComposer textarea {
  width: 100%;
  border: 1px solid #cbd3dc;
  border-radius: 8px;
  padding: 8px 10px;
  font: inherit;
  font-size: 12.5px;
  line-height: 1.5;
  color: #1c2530;
  resize: vertical;
}
#fbComposer textarea:focus { outline: 2px solid #0b7285; outline-offset: -1px; border-color: #0b7285; }
.fbc-f { display: flex; gap: 7px; margin-top: 9px; }

.fbb {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 12px;
  border: 1px solid #cbd3dc;
  border-radius: 7px;
  background: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  color: #1c2530;
  cursor: pointer;
  white-space: nowrap;
}
.fbb:hover { background: #f6f7f9; }
.fbb.pri { background: #0b7285; border-color: #0b7285; color: #fff; }
.fbb.pri:hover { background: #095e6e; }
.fbb.danger { color: #9f2f2d; }
.fbb:focus-visible { outline: 2px solid #0b7285; outline-offset: 2px; }

/* ---------- notes panel ---------- */
#fbPanel {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 75;
  width: 380px;
  max-width: 92vw;
  display: none;
  flex-direction: column;
  background: #fff;
  border-left: 1px solid #d7dde4;
  box-shadow: -14px 0 40px -18px rgba(20, 28, 36, .32);
  font-family: var(--sans, system-ui), sans-serif;
}
#fbPanel.on { display: flex; }
.fbp-h {
  flex: none;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 13px 15px;
  border-bottom: 1px solid #e4e8ee;
}
.fbp-h b { font-size: 14px; font-weight: 600; }
#fbWho {
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 9.5px;
  letter-spacing: .07em;
  color: #6b7684;
}
#fbClose {
  margin-left: auto;
  width: 26px;
  height: 26px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  font-size: 17px;
  line-height: 1;
  color: #6b7684;
  cursor: pointer;
}
#fbClose:hover { background: #f1f4f7; }
.fbp-warn {
  flex: none;
  padding: 9px 15px;
  background: #fbf3db;
  border-bottom: 1px solid #f0e2bd;
  font-size: 11px;
  line-height: 1.5;
  color: #7a5300;
}
.fbp-b { flex: 1; min-height: 0; overflow: auto; padding: 12px 15px; }
.fbp-empty { font-size: 12px; line-height: 1.6; color: #6b7684; }
.fbp-f {
  flex: none;
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  padding: 11px 15px;
  border-top: 1px solid #e4e8ee;
  background: #fbfcfd;
}

.fbn {
  border: 1px solid #e4e8ee;
  border-radius: 9px;
  padding: 10px 12px;
  margin-bottom: 9px;
  background: #fff;
}
.fbn:last-child { margin-bottom: 0; }
.fbn-h { display: flex; align-items: baseline; gap: 7px; }
.fbn-h b { font-size: 12px; font-weight: 600; }
.fbn-k {
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 8px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #0b7285;
  background: #e6f4f6;
  border-radius: 4px;
  padding: 2px 5px;
}
.fbn-x {
  margin-left: auto;
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  font-size: 14px;
  line-height: 1;
  color: #9aa3ad;
  cursor: pointer;
}
.fbn-x:hover { background: #fdebec; color: #9f2f2d; }
.fbn-t { font-size: 11.5px; color: #3d4754; margin-top: 3px; }
.fbn-e {
  font-size: 11px;
  line-height: 1.5;
  color: #6b7684;
  border-left: 2px solid #e4e8ee;
  padding-left: 8px;
  margin-top: 6px;
}
.fbn-n { font-size: 12.5px; line-height: 1.55; color: #1c2530; margin-top: 7px; }
.fbn-m {
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 9px;
  letter-spacing: .05em;
  color: #9aa3ad;
  margin-top: 7px;
}
.fbn-go { color: #0b7285; text-decoration: none; font-weight: 600; }
.fbn-go:hover { text-decoration: underline; }

@media print { #fbBar, #fbPanel, #fbComposer, .fb-pin { display: none !important; } }
@media (max-width: 640px) {
  #fbBar { right: 10px; bottom: 10px; }
  #fbBar #fbToggle span { display: none; }
}
/* == review-notes:css:end == */
</style>
</head>
<body data-board-id="fusion-2026-keynote-storyboard">
<div class="page">
<nav class="toc" id="toc"><h2>Storyboard</h2><div id="tocBody"></div>
</nav>

<div class="content">
  <div class="mast">
    <span class="mono">FUSION 2026 &middot; Keynote 2 &middot; the whole flow, end to end &middot; merged 25 Aug</span>
    <h1>Map it. Build it. Run it. Improve it.</h1>

    <p class="synopsis">Somebody bought a very expensive machine and it broke. They want it fixed
    under warranty. Their production line is down while they wait, so <b>every hour costs them
    money</b>.</p>

    <p class="dek">That is the whole scenario, and this is the whole flow: Max's Cartographer
    beats and the Maestro Case segment merged into one document, per the 25 Aug alignment call.
    It happens at <b>Cobalt Ridge Automation</b>, a fictional industrial-equipment manufacturer,
    and the machine is a conveyor system that sorts packages for shipping at a customer's
    distribution center. One warranty claim carries all four acts: nobody has written the process down
    yet, so it gets mapped; the map gets built into something that runs; it runs mostly on its own;
    and what people decided while it ran makes both the process and the map better.</p>

    <details class="flowbrief" id="flowbrief">
      <summary>The flow in brief<span class="hint">plain language, no screens needed</span></summary>
      <div class="fb">
        <p class="grp">Map the work</p>
        <ol>
          <li>The map starts <b>genuinely empty</b> — the domains exist because the org chart does,
              and there are four ways to begin.</li>
          <li>Day 0: Maestro hands over the three processes that already run, four candidates arrive
              as seeds, and warranty resolution is the empty slot. <b>This is the picture the demo
              comes back to at the end.</b></li>
          <li>Rather than start from nothing, start from a process UiPath has already mapped and had
              reviewed.</li>
          <li>The project opens with everything attached: five sources the analysis will cite line by
              line (one in conflict, one that nothing cites), ten stakeholders, four declared
              deliverables.</li>
          <li>One prompt, and the analysis assembles itself. It asks the one thing no document could
              answer.</li>
          <li>The map is honest about what it does not know. One step decides something and states no
              rule. Another records nothing at all.</li>
          <li>The map <b>draws itself</b> — two department flows stitched into one diagram, with the
              undocumented step drawn as a gap rather than smoothed over.</li>
          <li>The gap the documents cannot close goes to the person who owns it — four questions,
              answered the same day. Her answer that <b>nothing gets recorded</b> is the finding.</li>
          <li>The people who own the work correct it. Coverage sits with warranty operations, not
              field service. Substitution needs a standard, not just an approver. Two failures on the
              same machine inside a year should stop a case closing.</li>
          <li>The corrected design publishes as <b>one versioned, signed record</b> with an owner, a
              risk tier, a compliance scope and three constraints no build may change, so the handoff
              can be audited.</li>
        </ol>
        <p class="grp">Build it</p>
        <ol start="11">
          <li>A coding agent reads it and builds a <b>case</b>, not a folder of activities, because
              the map showed this work waits on people and branches when things go wrong.</li>
          <li>The rules the reviewers wrote down are the rules the case agent now reads at run time.
              Then the business changes one, and the agent makes the change.</li>
        </ol>
        <p class="grp">Run it</p>
        <ol start="13">
          <li><b>93 out of every 100 claims finish without anybody touching them.</b></li>
          <li>Sarah gets one of the rest. A part failed early, which is on us, and somebody also
              raised the torque limit past the approved envelope without sign-off, which is on them.
              Both are true, so neither full coverage nor a denial fits.</li>
          <li>She decides in a console with the evidence in front of her, and marks which of it
              actually helped. A few seconds, nothing held up.</li>
          <li>Later the customer sends photos, after coverage was already decided. Nobody routes
              them. The case agent reroutes to engineering on its own.</li>
          <li>The execution trail shows why it went there and who signed off. Engineering confirms,
              the machine is fixed, and <b>the case closes</b>.</li>
        </ol>
        <p class="grp">Improve it</p>
        <ol start="18">
          <li>Every decision is on the record, Sarah's included, and so is the same decision at other
              customers.</li>
          <li>Reading across them surfaces two patterns. A particular part under a small amount gets
              approved every time and <b>the answer is never different</b>. And repeat failures of
              that same part keep closing with nobody checking the part itself.</li>
          <li>Approve the first as a rule once and those claims stop waiting for a person. The second
              <b>adds</b> a check rather than removing one.</li>
          <li>That rule is now written down in the map. The map made the process, and the process
              improved the map.</li>
          <li><b>Ninety days later</b>, the survey has run across the business. A hundred and
              thirty four processes, 47% of the work mapped, nine rules written down that had only
              ever lived in somebody's head — and warranty resolution, the empty dot we opened on,
              is the best mapped process here.</li>
          <li>Switch the lens and the map answers a different question: <b>eleven processes have
              nobody accountable for them</b>, which is why their exceptions leave the system
              instead of getting escalated.</li>
          <li>Twelve findings are open across the whole business, sorted by whether two procedures
              contradict each other, a system has drifted from the floor, or the telemetry knows
              before a person does.</li>
          <li>The VP of service opens it and gets <b>a ranked list rather than a dashboard</b>. The
              top item is not an automation at all: nobody owns the claim end to end.</li>
          <li>And it still says out loud what it has not got to. Fifty eight processes remain
              unmapped, listed as a queue with the ownerless ones first.</li>
        </ol>
      </div>
    </details>

    <div class="capbox">
      <p>What's on screen, in order:</p>
      <ol>
        <li><b>Cartographer.</b> The empty estate, the Use Case Explorer inside it, the analysis, and
            the map of work as it fills in and gets corrected.</li>
        <li><b>Cartographer, the published record.</b> The design as a governed, signed, versioned entry &mdash; which surface hosts it (Cartographer or Automation Hub) is a Thursday question.</li>
        <li><b>Coding agent.</b> Turning that record into a Maestro case.</li>
        <li><b>UiPath Studio.</b> The case plan and the rules the case agent reads.</li>
        <li><b>Maestro Case App.</b> The queue, Sarah's console, and the execution trail.</li>
        <li><b>Cartographer, Suggestions.</b> The decision ledger, the suggestions it produces, and
            applying one as a rule.</li>
        <li><b>Cartographer, the estate at day 90.</b> Six frames: the map of work by coverage and
            again by ownership, the same thing as a table, the twelve open findings, the ranked list
            the VP sees, and the backlog it has not got to.</li>
      </ol>
    </div>

    <p class="illus">All names, values and clocks are illustrative. Continuous improvement is shown
    as it will work, and is coming soon rather than shipping today. Cartographer and the verticalized
    processes are generally available. UiPath orchestrates the warranty response across teams, agents
    and systems; it does not control the physical equipment.</p>

    <div class="viewsw">
      <span class="swlbl">View</span>
      <span class="sw" role="group" aria-label="Storyboard view">
        <button type="button" id="vBrief" aria-pressed="false">Narrative</button>
        <button type="button" id="vStrip" aria-pressed="true">Strip</button>
        <button type="button" id="vFlow"  aria-pressed="false">Flow</button>
      </span>
    </div>
    <p class="swnote">Three ways to read this, switched top right: <b>Narrative</b> tells the whole
      flow in plain sentences, <b>Strip</b> fits every scene on a screen or two &mdash; click any
      screen to open it full size &mdash; and <b>Flow</b> adds the talk track and director's notes
      to every scene.</p>
  </div>

  <div id="story"></div>

<div id="lb" role="dialog" aria-modal="true" aria-label="Expanded screen">
  <div class="lbframe" id="lbFrame"></div>
  <div class="lbcap" id="lbCap"></div>
  <div class="lbhint">click anywhere or press esc to close</div>
</div>

  <footer>Concept / placeholder: no live connections. UiPath does not control the physical equipment.</footer>
</div>
</div>

<script>
// ---------- case plan (reused from the warranty use-case detail page) ----------
const STAGES = [
  {id:"s1", name:"Intake and impact triage", sla:"SLA: 30 min", tasks:[["PR","Create and correlate warranty case"],["API","Identify installed asset, confirm coverage"],["AG","Assemble first evidence: alarms, photos, notes"],["HT","Classify customer impact"]]},
  {id:"s2", name:"Coverage and evidence review", sla:"SLA: 4 hr", tasks:[["API","Pull warranty terms and service history"],["AG","Flag missing or conflicting facts"],["HT","Review configuration changes, form coverage position"]]},
  {id:"s3", name:"Diagnose and contain", sla:"SLA: 2 hr", tasks:[["AG","Correlate alarms with service history, propose containment"],["HT","Approve containment as safe"],["PR","Coordinate containment with the customer's site team"],["HT","Confirm root cause and repair scope"]]},
  {id:"s4", name:"Resolution decision", sla:"SLA: 4 hr", tasks:[["AG","Build options: repair, replace, credit, with cost and downtime"],["API","Check each option against policy and delegated authority"],["HT","Authorize the commercial outcome"]]},
  {id:"s5", name:"Restore and validate", sla:"SLA: 2 hr to dispatch", tasks:[["API","Reserve and track approved parts"],["PR","Dispatch qualified field engineer"],["HT","Validate the real outcome: line at full speed"]]},
  {id:"s6", name:"Close and learn", sla:"SLA: 1 business day", tasks:[["API","Reconcile coverage vs. actual cost"],["AG","Finalize decision ledger"],["AG","Check for recurrence across other machines"],["HT","Confirm closure"]]},
  {id:"s7", name:"Product-quality escalation", sla:"NEW · added live in Act I", tasks:[["AG","Find related failures across other customers' assets"],["HT","Confirm this is a pattern, not a coincidence"],["PR","Open linked quality investigation with a named owner"]], isNew:true}
];
const T = t => \`<span class="tag \${t}">\${t}</span>\`;

// ---------- shared product-shell helpers ----------
const PERSONAS = [
  ["Sarah Chen","Warranty Resolution Lead"],
  ["Miguel Alvarez","Reliability and Controls Engineer"],
  ["Ryan Ochoa","Product Quality Lead"]
];
const CASE_FACTS = [
  ["Customer","Northstar Retail Distribution"],
  ["Site","Joliet DC"],
  ["Asset","SR-440"]
];
const ICO = {
  search:\`<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="6" cy="6" r="4.4"/><path d="m9.4 9.4 3 3"/></svg>\`,
  back:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5"/></svg>\`,
  fwd:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5"/></svg>\`,
  reload:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13 8a5 5 0 1 1-1.6-3.7"/><path d="M13 2.6V5h-2.4"/></svg>\`,
  lock:\`<svg width="9" height="11" viewBox="0 0 10 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="1.2" y="5" width="7.6" height="6" rx="1.4"/><path d="M3.2 5V3.6a1.8 1.8 0 0 1 3.6 0V5"/></svg>\`,
  dots:\`<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/></svg>\`,
  doc:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 2h5l3 3v9H4z"/><path d="M9 2v3h3"/></svg>\`,
  plan:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="2" y="2.5" width="5" height="4" rx="1"/><rect x="9" y="9.5" width="5" height="4" rx="1"/><path d="M4.5 6.5v3.5a1.5 1.5 0 0 0 1.5 1.5H9"/></svg>\`,
  bolt:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M9 1.5 4 8.8h3l-.8 5.7L11.5 7H8.4z"/></svg>\`,
  arrow:\`<svg width="52" height="14" viewBox="0 0 52 14" fill="none" aria-hidden="true"><path d="M0 7h44" stroke="currentColor" stroke-width="1.3"/><path d="M43 3.2 49.5 7 43 10.8z" fill="currentColor"/></svg>\`,
  layout:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="1.5" y="2.5" width="13" height="11" rx="1.6"/><path d="M6.2 2.5v11"/></svg>\`,
  newwin:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="2" y="3.5" width="10" height="9" rx="1.4"/><path d="M6 2h6.5A1.5 1.5 0 0 1 14 3.5V10"/></svg>\`,
  clock:\`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>\`,
  bell:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M4 6.6a4 4 0 0 1 8 0v2.3l1.2 2H2.8l1.2-2z"/><path d="M6.4 12.6a1.6 1.6 0 0 0 3.2 0"/></svg>\`
};
function cartographerChrome(body, nav){
  const side = nav === "record" ? \`
        <div class="cg-navgroup">Published records</div>
        <div class="cg-navitem on">Industrial Equipment Warranty Resolution</div>
        <div class="cg-navitem">PO Intake &amp; Customer Order Mgmt</div>
        <div class="cg-navgroup">Business processes</div>
        <div class="cg-navitem">Map of work</div>\` : nav === "estate" ? \`
        <div class="cg-navitem on">Home</div>
        <div class="cg-navitem">Suggestions<span class="ct">12</span></div>
        <div class="cg-navitem">Ledger</div>
        <div class="cg-navgroup">My processes</div>
        <div class="cg-navitem">Claim adjudication</div>
        <div class="cg-navitem">Evidence loop</div>
        <div class="cg-navitem">Cost posting</div>
        <div class="cg-navgroup">Recents</div>
        <div class="cg-navitem">WR-2026-0417</div>\` : \`
        <div class="cg-navgroup">Business processes</div>
        <div class="cg-navitem on">Industrial Equipment Warranty Resolution</div>
        <div class="cg-navgroup">Business tasks</div>
        <div class="cg-navgroup">Recents</div>\`;
  return \`<div class="win cg-win">
    <div class="cg-titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="wtool">\${ICO.layout}\${ICO.newwin}</span>
      <span class="cg-tabs">
        <span class="cg-tab"><span class="ic d">D</span>Delegate (preview)</span>
        <span class="cg-tab on"><span class="ic c">C</span>Cartographer (preview)</span>
      </span>
      <span class="brand"><b>UiPath</b><span class="bell">\${ICO.bell}</span></span>
    </div>
    <div class="cg-body">
      <div class="cg-side">
        <div class="cg-new">\${ICO.plan} New</div>
        <div class="cg-search">\${ICO.search} Search</div>
        \${side}
        <div class="cg-foot">
          <div class="cg-addons">\${ICO.dots} Add-ons &amp; Integrations</div>
          <div class="cg-user"><span class="av">RL</span>Robert Love</div>
        </div>
      </div>
      <div class="cg-main">\${body}</div>
    </div>
  </div>\`;
}
function appTop(o){
  const nav = (o.nav||[]).map(n=>\`<span class="\${n===o.active?"on":""}">\${n}</span>\`).join("");
  const chips = PERSONAS.slice(0,o.personas===undefined?3:o.personas)
    .map(p=>\`<span class="pchip"><i></i><span><b>\${p[0]}</b><u>\${p[1]}</u></span></span>\`).join("");
  return \`<div class="ptop"><span class="plogo">\${o.badge||"I"}</span><span class="pname">\${o.name}</span>
    <span class="pnav">\${nav}</span>
    <span class="ptools">\${o.tag?\`<span class="ptag tl">\${o.tag}</span>\`:""}\${chips}</span></div>\`;
}
function spark(vals,w,h){
  w=w||240; h=h||36;
  const max=Math.max.apply(null,vals), min=Math.min.apply(null,vals), rng=(max-min)||1;
  const pts=vals.map((v,i)=>[i*(w/(vals.length-1)), (h-3)-((v-min)/rng)*(h-8)]);
  const d=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
  return \`<svg class="spark" viewBox="0 0 \${w} \${h}" preserveAspectRatio="none" aria-hidden="true">
    <path d="\${d} L \${w} \${h} L 0 \${h} Z" fill="rgba(12,127,149,.09)"/>
    <path d="\${d}" fill="none" stroke="#0c7f95" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>\`;
}
function statStrip(items){
  const segs = items.map(it=>\`<div style="flex:1;min-width:0;padding:13px 16px">
      <span class="lbl">\${it[0]}</span>
      <div style="display:flex;align-items:baseline;gap:7px;margin-top:8px">
        <span class="kval" style="font-size:26px">\${it[1]}\${it[2]&&it[2]!=="txt"?\`<small>\${it[2]}</small>\`:""}</span>
        \${it[3]&&it[3].delta?\`<span class="kdelta">\${it[3].delta}</span>\`:""}
      </div>
      \${it[3]&&it[3].note?\`<div class="pmono" style="margin-top:7px">\${it[3].note}</div>\`:""}
    </div>\`).join(\`<div style="width:1px;background:var(--p-line);align-self:stretch"></div>\`);
  return \`<div class="pcard" style="display:flex;align-items:stretch;overflow:hidden">\${segs}</div>\`;
}
function kpiTile(label,value,unit,extra){
  return \`<div class="pcard pad"><span class="lbl">\${label}</span>
    <div style="display:flex;align-items:baseline;gap:9px;margin-top:9px">
      <span class="kval\${unit==="txt"?" txt":""}">\${value}\${unit&&unit!=="txt"?\`<small>\${unit}</small>\`:""}</span>
      \${extra&&extra.delta?\`<span class="kdelta">\${extra.delta}</span>\`:""}
    </div>
    \${extra&&extra.series?spark(extra.series):(extra&&extra.note?\`<div class="pmono" style="margin-top:9px">\${extra.note}</div>\`:"")}</div>\`;
}
function stageTimeline(activeIdx,opts){
  opts = opts||{};
  const rows = STAGES.slice(0,6).map((s,i)=>{
    const cls = i<activeIdx?"done":(i===activeIdx?"cur":"");
    return \`<div class="st \${cls}"><span>\${s.name}</span>\${i===activeIdx?\`<span class="when">now</span>\`:""}</div>\`;
  }).join("");
  const cond = opts.conditional===false?"":\`<div style="border-top:1px dashed var(--p-line);margin-top:9px;padding-top:9px">
      <span class="lbl" style="margin-bottom:4px">Conditional stages</span>
      <div class="stline"><div class="st dim"><span>Waiting for customer evidence</span></div>
        <div class="st \${opts.exception==="eng"?"cur":"dim"}"><span>Engineering exception</span>\${opts.exception==="eng"?\`<span class="when">proposed</span>\`:""}</div>
        <div class="st dim"><span>Parts substitution review</span></div>
        <div class="st dim"><span>Product-quality escalation</span></div></div></div>\`;
  return \`<span class="lbl" style="margin-bottom:7px">Stage progress</span><div class="stline">\${rows}</div>\${cond}\`;
}
function caseHeader(o){
  const facts = (o.facts||CASE_FACTS).map(f=>\`<div class="fact"><span class="lbl">\${f[0]}</span><b>\${f[1]}</b></div>\`).join("");
  return \`<div class="pcard" style="overflow:hidden">
    <div class="pad" style="padding-bottom:12px">
      <div style="display:flex;align-items:flex-start;gap:14px">
        <div style="flex:1;min-width:0">
          <span class="lbl">Queue / <span style="color:var(--p-teal)">\${o.ref}</span></span>
          <div class="phead" style="margin-top:5px">\${o.title}</div>
        </div>
        \${o.action||""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap">\${o.pills||""}</div>
    </div>
    <div class="facts">\${facts}</div></div>\`;
}

// ---------- view renderers ----------
function scribeView(){
  /* Max's frame 10, which the merge lost: the Analysis artifact itself.
     This scene used to render a finished PDD, which contradicted its own
     talk track and put the deliverable before the map. Now it shows what
     one prompt actually produced — 77 findings across fifteen sections,
     each with a completeness reading — with his six-stage progress rail. */
  const STAGE6 = ["Discovery","Define as-is","Design to-be","Validate to-be","Architect","Handoff"]
    .map((n,i)=>\`<div class="an-st\${i===1?" on":""}">\${n}\${i===1?'<i></i>':""}</div>\`).join("");
  const SECTIONS = [
    ["Process stages",10,8],["Process identity &amp; context",6,5],["Scope &amp; boundaries",5,3],
    ["Stakeholders &amp; roles (RACI)",8,5],["Inputs, outputs &amp; data",6,4],
    ["Process steps &amp; logic",7,5],["Systems &amp; technology",6,4],
    ["Volume, frequency &amp; performance",8,6],["Exceptions &amp; edge cases",8,4],
    ["Controls, compliance &amp; risk",7,5],["Pain points &amp; opportunities",7,3],
    ["Metrics &amp; KPIs",5,3],["Future state &amp; change readiness",8,7]
  ].map(r=>{
    let dots = "";
    for (let i=0;i<r[1];i++) dots += \`<i class="\${i<r[2]?"f":""}"></i>\`;
    return \`<div class="an-sec"><span class="cv">&rsaquo;</span><span class="nm">\${r[0]}</span>
        <span class="dots">\${dots}</span></div>\`;
  }).join("");
  return cartographerChrome(\`<div class="an">
    <div class="an-side">
      <span class="lbl" style="margin-bottom:7px">Progress</span>
      \${STAGE6}
      <hr class="prule" style="margin:12px 0">
      <span class="lbl" style="margin-bottom:6px">Resources</span>
      <div class="an-res">Analysis<span>1</span></div>
      <div class="an-res">Documents<span>4</span></div>
      <div class="an-res">Integrations<span>15</span></div>
      <div class="an-res">Controls<span>6</span></div>
    </div>
    <div class="an-main">
      <p class="an-said">Cross-referenced the four sources and the volume figure into <b>one first-pass
        analysis</b> &mdash; stages, systems, checkpoints and exception paths, synthesised. Here it is
        <b>to confirm</b>.</p>
      <div class="an-card">
        <div class="an-hd"><b>Analysis</b><span class="ptag bl">Discovery artefact</span>
          <span class="pmono" style="margin-left:auto">77 FINDINGS &middot; 15 SECTIONS</span></div>
        \${SECTIONS}
        <div class="an-foot">Two sections are still thin, and it says which. Confirming publishes this
          as version 1.</div>
      </div>
    </div>
  </div>\`);
}
function nativeChrome(title, sideActive, sideOther, body, termBody){
  return \`<div class="win native">
    <div class="titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="tt">\${title}</span>
      <span class="modesw" role="group" aria-label="View mode">
        <span class="on" onclick="codexMode(this,'term')">Terminal</span>
        <span onclick="codexMode(this,'ui')">UI</span>
      </span>
    </div>
    <div class="term-wrap">
      <div class="term-bar">claude — cobalt-ridge/warranty-case-plan</div>
      <div class="term">\${termBody}</div>
    </div>
    <div class="cx">
      <div class="cx-side">
        <span class="cx-lbl">Threads</span>
        <div class="cx-search">Search threads…</div>
        <div class="cx-th on"><b>\${sideActive[0]}</b><span>\${sideActive[1]}</span><u>ACTIVE</u></div>
        \${sideOther.map(t=>\`<div class="cx-th"><b>\${t[0]}</b><span>\${t[1]}</span></div>\`).join("")}
        <div class="cx-foot">cobalt-ridge/warranty-case-plan<br>main · clean</div>
      </div>
      <div class="cx-main">\${body}</div>
    </div>
  </div>\`;
}
function codexMode(btn, mode){
  const win = btn.closest(".win");
  win.classList.toggle("mode-ui", mode==="ui");
  btn.parentElement.querySelectorAll("span").forEach(s=>s.classList.remove("on"));
  btn.classList.add("on");
}
function term(lines){
  return lines.map(l=>{
    if(l===null) return \`<div class="gap"></div>\`;
    const cls = l[0], txt = l[1];
    const prefix = cls==="prompt" ? \`<span class="car">&#10095;</span> \` : "";
    return \`<div class="l \${cls}">\${prefix}\${txt}</div>\`;
  }).join("");
}
function agentBuildView(){
  const checks = [
    "6 stages, matching the PDD exactly",
    "Case data model: asset, site, coverage, evidence, decision ledger",
    "20+ tasks across agent, API, process, and human owners",
    "Rules governing stage entry/exit and escalation thresholds",
    "4 exception paths wired as event-driven secondary stages"
  ].map(c=>\`<div class="pi"><i>&#10003;</i><span>\${c}</span></div>\`).join("");
  const body = \`
    <div class="cx-head"><b>warranty-resolution case plan</b><span class="cx-chip ok">Proposal ready</span></div>
    <div class="cx-body">
      <div class="cx-you"><span class="cx-role">You</span>Here is the PDD Cartographer just built for warranty resolution. Propose the full Maestro case plan: stages, data model, tasks, integrations, and rules.</div>
      <div class="cx-agent"><span class="av">C</span><div class="txt"><span class="cx-role">Claude Code</span><p>Read the PDD. Proposing:</p>
        <div class="cx-plan"><div class="ph">Proposed plan</div>\${checks}</div>
        <div class="cx-acts"><span class="cx-btn">Review plan</span><span class="cx-btn pri">Approve &amp; build</span></div>
      </div></div>
    </div>
    <div class="cx-composer">Ask for a change…<span class="send">&#8629; SEND</span></div>\`;
  const termBody = term([
    ["prompt","Here is the PDD Cartographer just built for warranty resolution. Propose the full Maestro case plan: stages, data model, tasks, integrations, and rules."],
    null,
    ["dim","Reading warranty-resolution-pdd.md..."],
    ["dim","Proposing case plan..."],
    null,
    ["ok","&#10003; 6 stages, matching the PDD exactly"],
    ["ok","&#10003; Case data model: asset, site, coverage, evidence, decision ledger"],
    ["ok","&#10003; 20+ tasks across agent, API, process, and human owners"],
    ["ok","&#10003; Rules governing stage entry/exit and escalation thresholds"],
    ["ok","&#10003; 4 exception paths wired as event-driven secondary stages"],
    null,
    ["dim","Review the plan, then approve to build."],
    null,
    ["prompt","approve &amp; build"],
    ["ok","Building warranty-resolution-case-plan… done."]
  ]);
  return nativeChrome("Claude Code — cobalt-ridge-warranty-case",
    ["warranty-resolution case plan","Propose Maestro case plan from PDD"],
    [["uce-warranty content sync","compile:content, catalog rebuild"],["process-skills lint pass","lint-sources, evaluate-kb"]],
    body, termBody);
}

function stageCard(s,i,compact){
  const rows = s.tasks.map(t=>\`<div class="ptask\${s.isNew?" new":""}">\${T(t[0])}<span>\${t[1]}</span></div>\`).join("");
  return \`<div class="pstage\${s.isNew?" new":""}"><span class="bdg">NEW</span>
    <span class="n">STAGE \${String(i+1).padStart(2,"0")}</span>
    <h5>\${s.name}</h5><div class="sla">\${s.sla}</div>
    <div class="thead">Tasks · \${s.tasks.length}</div>\${rows}</div>\`;
}
function studioShell(activeTab, innerHtml){
  const tabDef = [["Plan",ICO.plan],["Rules",ICO.doc],["Case Agent",ICO.search]];
  const tabs = tabDef.map(t=>\`<span class="\${t[0]===activeTab?"on":""}">\${t[1]} \${t[0]}</span>\`).join("");
  return \`<div class="win">
    <div class="stu-top">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="stu-grid">\${ICO.dots}</span><b class="wm">UiPath Studio</b>
      <span class="stu-crumb">Warranty Resolution <span class="sep">&rsaquo;</span> <b>Case · Industrial Equipment Warranty Resolution</b></span>
      <span class="stu-toggle"><span class="on">Build</span><span>Manage</span></span>
      <span class="stu-icons">\${ICO.reload}\${ICO.doc}\${ICO.bell}</span>
      <span class="stu-ava">RL</span>
    </div>
    <div class="stu-body">
      <div class="stu-pagecrumb">\${ICO.doc} Case plan</div>
      <div class="stu-h1"><span>Case · Industrial Equipment Warranty Resolution</span><i>\${ICO.dots}</i></div>
      <div class="stu-cmpanel">
        <span class="icn">\${ICO.bolt}</span>
        <span class="lab"><b>Case agent</b><u>rules and contextual judgment</u></span>
        <span class="stu-cmtabs">\${tabs}</span>
      </div>
      \${innerHtml}
    </div>
  </div>\`;
}
function planCanvas(highlightNew){
  const base = STAGES.slice(0,6).map((s,i)=>stageCard(s,i)).join("");
  const inner = \`<div class="canvas" style="margin-top:2px">
      <div class="cbar">
        <span class="pmono" style="font-size:10px">CASE PLAN · v2, \${highlightNew?"WITH PRODUCT-QUALITY GATE":"AS DESIGNED"}</span>
        <span class="zoom"><s>−</s>90%<s>+</s></span>
        <span class="btn sm">Validate</span><span class="btn sm primary">Publish</span>
      </div>
      <div class="srow" style="grid-template-columns:repeat(6,1fr)">\${base}</div>
      <div class="secband">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:9px">
          <span class="lbl">Conditional stages · event-driven</span>
          <span class="ptag gy">Entered only when a rule or event fires</span>
        </div>
        <div class="srow" style="grid-template-columns:repeat(4,1fr)">
          \${stageCard(STAGES[6],6)}
          <div class="pstage" style="opacity:.5"><span class="n">CONDITIONAL</span><h5>Waiting for customer evidence</h5><div class="sla">Dormant</div></div>
          <div class="pstage" style="opacity:.5"><span class="n">CONDITIONAL</span><h5>Engineering exception</h5><div class="sla">Dormant</div></div>
          <div class="pstage" style="opacity:.5"><span class="n">CONDITIONAL</span><h5>Parts substitution review</h5><div class="sla">Dormant</div></div>
        </div>
      </div>
      <div class="clegend">\${T("AG")} Agent \${T("PR")} Process \${T("HT")} Human \${T("API")} API
        <span class="pmono" style="margin-left:auto">Counts illustrative</span></div>
    </div>\`;
  return studioShell("Plan", inner);
}

function liveEditView(){
  const body = \`
    <div class="cx-head"><b>warranty-resolution case plan</b><span class="cx-chip">v1 → v2 draft</span></div>
    <div class="cx-body">
      <div class="cx-you"><span class="cx-role">You</span>Add a product-quality escalation gate before a case can close, if the recurrence check finds a pattern and it hasn't been reviewed.</div>
      <div class="cx-agent"><span class="av">C</span><div class="txt"><span class="cx-role">Claude Code</span><p>Identified the affected stage and rules. Change summary:</p>
        <div class="cx-diff">
          <div class="fh">warranty-resolution / case-plan.yaml</div>
          <div class="dl add"><span class="g">+</span><span>Stage added: Product-quality escalation (3 tasks)</span></div>
          <div class="dl mod"><span class="g">~</span><span>Rule updated: Close and learn now requires "recurrence reviewed = true"</span></div>
          <div class="dl mod"><span class="g">~</span><span>Routing: recurrence-detected event now targets the new stage</span></div>
          <div class="dl ctx ind"><span class="g"></span><span>3 changes · 1 stage, 1 rule, 1 route · case plan version 1 → 2</span></div>
        </div>
        <p style="margin-top:9px;color:#8b8b85">Running cases can be migrated onto v2 without restarting.</p>
        <div class="cx-acts"><span class="cx-btn">Discard</span><span class="cx-btn pri">Approve change</span></div>
      </div></div>
    </div>
    <div class="cx-composer">Ask for a change…<span class="send">&#8629; SEND</span></div>\`;
  const termBody = term([
    ["prompt","Add a product-quality escalation gate before a case can close, if the recurrence check finds a pattern and it hasn't been reviewed."],
    null,
    ["dim","Identifying affected stage and rules..."],
    null,
    ["dim","warranty-resolution / case-plan.yaml"],
    ["add","+ Stage added: Product-quality escalation (3 tasks)"],
    ["mod","~ Rule updated: Close and learn now requires \\"recurrence reviewed = true\\""],
    ["mod","~ Routing: recurrence-detected event now targets the new stage"],
    null,
    ["dim","3 changes · 1 stage, 1 rule, 1 route · case plan version 1 → 2"],
    ["dim","Running cases can be migrated onto v2 without restarting."],
    null,
    ["prompt","approve change"],
    ["ok","Applied. case-plan.yaml · v1 → v2."]
  ]);
  return nativeChrome("Claude Code — cobalt-ridge-warranty-case",
    ["warranty-resolution case plan","v1 → v2 · product-quality gate"],
    [["uce-warranty content sync","compile:content, catalog rebuild"],["process-skills lint pass","lint-sources, evaluate-kb"]],
    body, termBody);
}

function worklistView(){
  const rows = [
    ["WR-2026-0417","Coverage disputed — combined cause finding","Sarah Chen","No rule resolves a combined cause","Resolution decision",true],
    ["WR-2026-0421","Repeat-failure pattern needs a human call","Ryan Ochoa","Recurrence confirmed, gates closure","Close and learn",false],
    ["WR-2026-0409","Engineering sign-off on a spec deviation","Miguel Alvarez","Repair exceeds standard spec","Diagnose and contain",false]
  ];
  const role = n => (PERSONAS.find(p=>p[0]===n)||["",""])[1];
  const body = rows.map(r=>\`<tr class="\${r[5]?"hero":""}">
      <td><span class="pref">\${r[0]}</span><span class="psubx">Northstar Retail Distribution</span></td>
      <td><span class="nm">\${r[1]}</span><span class="psubx">\${r[4]}</span></td>
      <td><span class="nm">\${r[2]}</span><span class="psubx">\${role(r[2])}</span></td>
      <td><span class="psubx" style="color:var(--p-ink);white-space:normal">\${r[3]}</span></td>
      <td><span class="ptag yl">Action required</span></td></tr>\`).join("");
  return appTop({badge:"I",name:"Industrial Equipment Warranty Resolution",nav:["Cases","Performance","Case plans"],active:"Cases"})+
  \`<div class="pmain">
    <div style="display:grid;grid-template-columns:1.45fr 1fr 1fr;gap:13px">
      <div class="pcard paper pad" style="display:flex;flex-direction:column;gap:9px;grid-row:span 2">
        <span class="ptag bl" style="align-self:flex-start">Agent summary</span>
        <div class="phead">3 cases need a person today, out of 41 open.</div>
        <div class="psub">The other 38 are progressing on their own.</div>
        <hr class="prule">
        <div class="pbody" style="font-weight:500">Each one arrives with a reason and a recommendation.</div>
        <div class="pmono" style="margin-top:auto">3 OPEN TASKS ASSIGNED TO YOU</div>
      </div>
      \${kpiTile("Avg. coverage decision time","1.8"," days",{series:[3.4,3.1,3.2,2.7,2.4,2.5,2.1,1.8]})}
      \${kpiTile("Restoration commitment adherence","71","%",{series:[54,57,61,60,66,69,68,71]})}
      \${kpiTile("Critical cases at SLA risk","5","",{delta:"&#9650; 1"})}
      \${kpiTile("Repeat-failure candidates","7","",{note:"4 LINKED TO ONE DRIVE FAMILY"})}
    </div>
    <div class="pcard" style="overflow:hidden">
      <div style="display:flex;align-items:center;gap:14px;padding:12px 16px">
        <span class="ptitle">Work queue</span>
        <span class="psearch">\${ICO.search}Search cases, names, stages…</span>
        <span class="ptabs" style="margin-left:auto"><span class="on">Action required · 3</span><span>Waiting on others</span><span>All open · 41</span></span>
      </div>
      <table class="pt"><colgroup><col style="width:186px"><col><col style="width:186px"><col style="width:250px"><col style="width:142px"></colgroup>
        <thead><tr><th>Case</th><th>Description</th><th>Owner</th><th>Why it's here</th><th>Status</th></tr></thead>
        <tbody>\${body}
          <tr class="ptail"><td colspan="5">38 OF 41 OPEN CASES ARE PROGRESSING WITHOUT A PERSON</td></tr></tbody></table>
    </div>
  </div>\`;
}

function opsDashView(){
  const bars = [["Coverage and evidence review",100],["Diagnose and contain",62],["Resolution decision",44],
                ["Intake and impact triage",31],["Restore and validate",22],["Close and learn",14]];
  const barRows = bars.map(b=>\`<div style="display:flex;align-items:center;gap:11px;padding:5px 0">
      <span style="width:196px;font-size:12px;color:var(--p-mute);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${b[0]}</span>
      <span style="flex:1;height:9px;border-radius:999px;background:var(--p-muted-bg);overflow:hidden">
        <span style="display:block;height:9px;width:\${b[1]}%;border-radius:999px;background:\${b[1]===100?"var(--p-teal)":"rgba(12,127,149,.42)"}"></span></span></div>\`).join("");
  const area = (function(){
    const v=[92,88,84,79,71,66,58,49,41,34,29,24];
    const w=520,h=118,max=Math.max.apply(null,v),min=Math.min.apply(null,v);
    const pts=v.map((x,i)=>[i*(w/(v.length-1)),(h-6)-((x-min)/((max-min)||1))*(h-18)]);
    const d=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
    return \`<svg viewBox="0 0 \${w} \${h}" preserveAspectRatio="none" style="display:block;width:100%;height:118px;margin-top:10px" aria-hidden="true">
      \${[0,1,2,3].map(i=>\`<line x1="0" y1="\${8+i*33}" x2="\${w}" y2="\${8+i*33}" stroke="#eae8e3" stroke-width="1" vector-effect="non-scaling-stroke"/>\`).join("")}
      <path d="\${d} L \${w} \${h} L 0 \${h} Z" fill="rgba(12,127,149,.09)"/>
      <path d="\${d}" fill="none" stroke="#0c7f95" stroke-width="1.8" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>\`;
  })();
  return appTop({badge:"I",name:"Industrial Equipment Warranty Resolution",nav:["Cases","Performance","Case plans"],active:"Performance"})+
  \`<div class="pmain">
    <div style="display:flex;align-items:center;gap:12px">
      <span class="ptitle">Operational insights</span>
      <span class="ptabs" style="margin-left:auto"><span class="on">Last 30 days</span><span>Quarter</span><span>Year</span></span>
      <span class="btn sm">Export</span>
    </div>
    \${statStrip([
      ["Progressing autonomously","93","%",{}],
      ["Human-intervention rate","7","%",{}],
      ["At SLA risk","4","",{delta:"&#9650;",note:"WATCHLIST"}],
      ["Bottleneck stage","Evidence review","txt",{note:"LONGEST DWELL TIME"}]
    ])}
    <div style="display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:13px;align-items:start">
      <div class="pcard pad">
        <div style="display:flex;align-items:baseline;gap:10px">
          <span class="lbl">Cases entering the human queue</span>
          <span class="pmono" style="margin-left:auto">ILLUSTRATIVE</span></div>
        \${area}
      </div>
      <div class="pcard paper pad">
        <span class="ptag bl" style="margin-bottom:8px">What changed</span>
        <div class="ptitle">Fewer cases enter the queue, not a faster queue</div>
        <p class="pbody" style="color:var(--p-mute);margin-top:6px">Straight-through completion is up because most cases never reach Sarah at all, not because she processes them quicker.</p>
      </div>
    </div>
    <div class="pcard pad">
      <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:4px">
        <span class="lbl">Where work accumulates, by stage</span>
        <span class="pmono" style="margin-left:auto">ILLUSTRATIVE</span></div>
      \${barRows}
    </div>
  </div>\`;
}

function caseManagerView(){
  const rules = [
    ["Case","Portal","Case entry","Warranty claim submitted","","Enter case",false],
    ["Stage","Intake and impact triage","Enter case","Case entered","","Enter Intake and impact triage",false],
    ["Sequential task","Assemble evidence (Agent)","Task entry","Stage entered","","Enter Assemble evidence",true],
    ["Sequential task","Classify impact (Human)","Task entry","Upstream task completed","","Enter Classify impact",true],
    ["Stage","Intake and impact triage","Stage complete","Required tasks completed","","Complete Intake and impact triage",false],
    ["Stage","Coverage and evidence review","Stage complete","Required tasks completed","","Complete Coverage and evidence review",false],
    ["Event-driven task","Engineering exception","Task entry","New evidence uploaded","estimate.scope !== approved.scope","Enter Engineering exception",false],
    ["Stage","Close and learn","Recurrence gate","Tasks completed: Recurrence scan","relatedFailures &gt;= 4","Enter Product-quality escalation",true],
    ["Manually triggered","Waiting for customer evidence","Entry rule 1","Manual activation","","Enter Waiting for customer evidence",false]
  ].map(r=>\`<tr><td>\${r[0]}</td><td>\${r[1]}</td><td>\${r[2]}</td><td>\${r[3]}</td>
      <td>\${r[4]?\`<span class="stu-if">\${r[4]}</span>\`:""}</td>
      <td>\${r[5]}\${r[6]?'<span class="stu-auto">Auto-generated</span>':""}</td></tr>\`).join("");
  const inner = \`<div class="stu-banner"><span class="icn2">\${ICO.bolt}</span>
        <div><b>Rules decide how your case moves</b><p>Rules are the conditions that control the case. They decide when stages and tasks start, complete, or exit.</p></div>
        <span class="x">×</span></div>
      <div class="stu-toolbar">
        <span class="stu-search">\${ICO.search} Search rules</span>
        <span class="stu-filt">Scope: All</span><span class="stu-filt">Stage: All</span><span class="stu-filt">When: All</span><span class="stu-filt">Then: All</span>
        <span class="stu-add">+ Add rule</span>
      </div>
      <table class="stu"><colgroup><col style="width:126px"><col style="width:220px"><col style="width:118px"><col style="width:190px"><col style="width:180px"><col></colgroup>
        <thead><tr><th>Scope</th><th>Element</th><th>Rule</th><th>When</th><th>If</th><th>Then</th></tr></thead>
        <tbody>\${rules}</tbody></table>\`;
  return studioShell("Rules", inner);
}

function eventReassessView(){
  return appTop({badge:"I",name:"Industrial Equipment Warranty Resolution",nav:["Cases","Performance","Case plans"],active:"Cases"})+
  \`<div class="pmain" style="display:grid;grid-template-columns:minmax(0,1fr) 316px;gap:14px;align-items:start">
    <div style="display:grid;gap:13px">
      \${caseHeader({ref:"WR-2026-0417",title:"New evidence lands on the case, mid-resolution",
        pills:\`<span class="ptag vt">Event received</span><span class="ptag bl">Stage · Resolution decision</span><span class="pmono">SLA 4 HR</span>\`,
        action:\`<span class="btn sm">\${ICO.plan} Case plan</span>\`})}
      <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:13px">
        <div class="pcard pad">
          <div style="display:flex;gap:9px;align-items:center;margin-bottom:9px"><span class="fic">\${ICO.doc}</span>
            <span class="lbl">Uploaded evidence</span></div>
          <div class="ptitle">Customer-submitted photos of the failed drive</div>
          <p class="pbody" style="color:var(--p-mute);margin-top:6px">The customer uploads new photos through the portal. It behaves the same way new proof-of-loss evidence does when it lands on an insurance claim mid-case.</p>
          <hr class="prule" style="margin:11px 0">
          <div class="docrow"><span class="ext">zip</span><span class="nm">customer-photos-sr440.zip</span><span class="meta">new</span></div>
        </div>
        <div class="pcard pad" style="border-color:var(--p-teal-line);background:linear-gradient(#fff,var(--p-teal-surf))">
          <div style="display:flex;gap:9px;align-items:center;margin-bottom:9px"><span class="fic">\${ICO.bolt}</span>
            <span class="lbl tl">Case agent reassessment</span></div>
          <div class="ptitle">Coverage position may no longer hold</div>
          <p class="pbody" style="color:#4a5560;margin-top:6px">Nobody routed this. The upload event woke the case agent, which checked the new photos against Sarah's combined-cause finding and flagged that the wear pattern no longer clearly supports it.</p>
          <hr class="prule" style="margin:11px 0">
          <div class="pbody" style="color:var(--p-teal-700);font-weight:500">Recommended: send to engineering to re-examine cause before the coverage position is finalized</div>
          <div class="pmono" style="margin-top:5px">CONFIDENCE HIGH · EVIDENCE: COMBINED-CAUSE FINDING, NEW CUSTOMER PHOTOS, WEAR-PATTERN DELTA</div>
          <div style="display:flex;gap:8px;margin-top:11px"><span class="btn sm">Override</span><span class="btn sm primary">Route to engineering exception</span></div>
        </div>
      </div>
    </div>
    <div style="display:grid;gap:13px">
      <div class="pcard pad">\${stageTimeline(3,{exception:"eng"})}</div>
      <div class="pcard pad">
        <span class="lbl" style="margin-bottom:8px">Details</span>
        \${CASE_FACTS.map(f=>\`<div class="drow"><span class="k">\${f[0]}</span><span class="v">\${f[1]}</span></div>\`).join("")}
        <div class="drow"><span class="k">Stage</span><span class="v">Resolution decision</span></div>
      </div>
    </div>
  </div>\`;
}

function miniNode(name, on, taskCount){
  const ticks = Array.from({length:taskCount||3},(_,i)=>\`<i class="\${on&&i===0?"on":""}"></i>\`).join("");
  return \`<div class="iv-node\${on?" on":""}"><b>\${name}</b><span>Stage</span><div class="tasks">\${ticks}</div></div>\`;
}
function auditTrailView(){
  const trail = [
    ["EVT","New customer photos uploaded to the case","Intake","09:14 AM"],
    ["AG","Case manager: checks photos against the combined-cause finding","Resolution decision","09:14 AM"],
    ["AG","Case manager: selects route to engineering exception, confidence high","Resolution decision","09:15 AM"],
    ["HT","Miguel confirms the cause before coverage is finalized","Engineering exception","09:41 AM"]
  ].map((e,i)=>\`<tr><td class="pmono" style="color:var(--p-mute)">\${String(i+1).padStart(2,"0")}</td>
      <td>\${T(e[0])}</td><td><span class="nm">\${e[1]}</span></td>
      <td><span class="psubx">\${e[2]}</span></td><td class="pmono" style="font-size:10.5px">\${e[3]}</td></tr>\`).join("");
  const globals = [
    ["Case.Id","—","WR-2026-0417"],
    ["Asset.Id","—","SR-440"],
    ["Coverage.Position","Resolution decision","Partial + goodwill"],
    ["Recurrence.Count","Close and learn","4"]
  ].map(g=>\`<tr><td class="pmono" style="font-size:10.5px">\${g[0]}</td><td class="psubx">\${g[1]}</td>
      <td class="pmono" style="font-size:10.5px;color:var(--p-ink)">\${g[2]}</td></tr>\`).join("");
  const primary = ["Intake and impact triage","Coverage and evidence review","Diagnose and contain","Resolution decision","Restore and validate","Close and learn"];
  const nodes = primary.map((n,i)=>\`\${i?'<span class="iv-arrow2">→</span>':""}\${miniNode(n, n==="Resolution decision")}\`).join("");
  const adhoc = ["Waiting for customer evidence","Engineering exception","Parts substitution review","Product-quality escalation"]
    .map(n=>miniNode(n, n==="Engineering exception", 2)).join("");
  return \`<div class="pmain" style="gap:10px;position:relative">
    <div class="iv-top">
      <span class="iv-back">&larr; Back</span>
      <span class="iv-crumb">warranty-resolution.case &rsaquo; <b>WR-2026-0417</b></span>
      <span class="iv-status">
        <span class="lbl2">Status</span> <span class="ptag gn">Running</span>
        <span class="btn sm">\${ICO.bolt} Pause</span><span class="btn sm">Cancel</span>
      </span>
    </div>
    <div class="iv-title">Case · Industrial Equipment Warranty Resolution</div>
    <div class="iv-diagram">
      <div class="iv-cmchip"><span class="fic" style="width:20px;height:20px">\${ICO.bolt}</span><span><b style="font-size:10.5px">Case agent</b><u style="display:block;font-size:8px;color:var(--p-mute)">next best action</u></span></div>
      <div class="iv-row">\${nodes}</div>
      <div class="iv-band"><div class="cap">Adhoc stages</div><div class="iv-row">\${adhoc}</div></div>
      <div class="iv-zoom"><span>−</span><span>90%</span><span>+</span></div>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:12px;align-items:start">
      <div class="pcard" style="overflow:hidden">
        <div class="iv-tabbar"><span class="on">Execution trail</span><span>Action history</span>
          <span class="ic">\${ICO.reload}\${ICO.dots}</span></div>
        <table class="pt"><colgroup><col style="width:44px"><col style="width:58px"><col><col style="width:170px"><col style="width:90px"></colgroup>
          <thead><tr><th>Seq</th><th>Actor</th><th>Step</th><th>Stage</th><th>End time</th></tr></thead>
          <tbody>\${trail}</tbody></table>
      </div>
      <div class="pcard" style="overflow:hidden">
        <div class="iv-tabbar"><span class="on">Global variables</span><span>Incidents</span></div>
        <table class="pt"><colgroup><col><col style="width:96px"><col></colgroup>
          <thead><tr><th>Name</th><th>Source</th><th>Value</th></tr></thead>
          <tbody>\${globals}</tbody></table>
      </div>
    </div>
    <div class="iv-backdrop">
      <div class="iv-modal">
        <h4>Migrate instance to a new version</h4>
        <p>You are about to migrate <b>1 instance</b> to a different version of the process. This operation allows you to update the running instance with the latest logic, configurations, or workflows from the target version.</p>
        <div class="iv-verrow">
          <span class="iv-verfield"><span class="l">Source version</span><span class="v">v1</span></span>
          <span class="pmono">→</span>
          <span class="iv-verfield" style="border-color:var(--p-teal)"><span class="l">Target version</span><span class="v" style="color:var(--p-teal-700)">v2 · product-quality gate</span></span>
        </div>
        <table class="pt"><colgroup><col style="width:60px"><col><col style="width:100px"></colgroup>
          <thead><tr><th>Status</th><th>Case ID</th><th>Last update</th></tr></thead>
          <tbody><tr><td><span class="ptag gn" style="padding:1.5px 6px">&#9679;</span></td><td><span class="pref">WR-2026-0417</span></td><td class="pmono" style="font-size:10.5px">—</td></tr></tbody></table>
        <div class="iv-cfield">Add a comment about this migration…</div>
        <div style="display:flex;gap:8px;justify-content:flex-end"><span class="btn sm">Cancel</span><span class="btn sm primary">Continue</span></div>
      </div>
    </div>
  </div>\`;
}

function closeView(){
  const thumbs = {
    cg: \`<span class="thumb thumb-cg"><span class="hd"><i></i><i></i><i></i></span>
      <span class="bd"><span class="doc"><span class="r1"></span><span class="r2"></span><span class="r3"></span></span></span></span>\`,
    cx: \`<span class="thumb thumb-cx"><span class="hd"><i></i><i></i><i></i></span>
      <span class="bd"><span class="tl ok"></span><span class="tl dim"></span><span class="tl full"></span><span class="tl dim"></span></span></span>\`,
    mm: \`<span class="thumb thumb-mm"><span class="hd"><i></i><i></i><i></i></span>
      <span class="bd"><span class="stg on"><span class="d1"></span><span class="d2"></span></span><span class="stg"><span class="d1"></span><span class="d2"></span></span><span class="stg"><span class="d1"></span><span class="d2"></span></span></span></span>\`
  };
  const links = [[thumbs.cg,"Cartographer"],[thumbs.cx,"Coding agents"],[thumbs.mm,"Maestro"],[thumbs.cg,"Back to the map"]];
  const chain = links.map((l,i)=>\`\${i?\`<span class="arw">→</span>\`:""}
    <span class="lnk">\${l[0]}<b>\${l[1]}</b></span>\`).join("");
  return \`<div class="slide">
    <span class="kicker">FUSION 2026 · Cartographer to a running case</span>
    <h2>Map it. Build it.<br>Run it. Improve it.</h2>
    <div class="chain">\${chain}</div>
    <div class="foot">COBALT RIDGE AUTOMATION · INDUSTRIAL EQUIPMENT WARRANTY RESOLUTION</div>
  </div>\`;
}



/* ==========================================================
   CONTINUOUS IMPROVEMENT VIEWS
   Content follows the Aug 24 Robert/Tuan/Alin call and cigui's
   own vocabulary. Threshold is a named component under $5,000,
   which is where that call landed, not the earlier $25,000.
   ========================================================== */
function suggestionsChrome(tab, crumb, body){
  const tabs = ["Feed","Suggestions","Ledger","Dashboard","Settings"]
    .map(t=>\`<span class="\${t===tab?"on":""}">\${t}</span>\`).join("");
  return \`<div class="win cg-win">
    <div class="cg-titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="wtool">\${ICO.layout}\${ICO.newwin}</span>
      <span class="cg-tabs">
        <span class="cg-tab"><span class="ic d">D</span>Delegate</span>
        <span class="cg-tab on"><span class="ic c">C</span>Cartographer</span>
        <span class="cg-tab"><span class="ic" style="background:#4338ca">A</span>Autopilot</span>
      </span>
      <span class="brand"><b>UiPath</b><span class="bell">\${ICO.bell}</span></span>
    </div>
    <div class="cg-body">
      <div class="cg-side">
        <div class="cg-new">\${ICO.plan} New conversation</div>
        <div class="cg-search">\${ICO.search} Search</div>
        <div class="cg-navgroup">Workspace</div>
        <div class="cg-navitem">Map of work</div>
        <div class="cg-navitem on">Suggestions</div>
        <div class="cg-navitem">Ledger</div>
        <div class="cg-navgroup">My processes</div>
        <div class="cg-navitem">Warranty Resolution</div>
        <div class="cg-navitem">Claims Intake</div>
        <div class="cg-foot">
          <div class="cg-addons">\${ICO.dots} Add-ons &amp; Integrations</div>
          <div class="cg-user"><span class="av">RL</span>Robert Love</div>
        </div>
      </div>
      <div class="ci">
        <div class="ci-head">
          <span class="ci-crumb"><b>Suggestions</b><span class="sep">/</span>Warranty Resolution<span class="sep">/</span>\${crumb}</span>
          <span class="ci-horizon">\${ICO.clock} 365 days</span>
        </div>
        <div class="ci-tabs">\${tabs}</div>
        <div class="ci-body">\${body}</div>
      </div>
    </div>
  </div>\`;
}

function ledgerView(){
  const rows = [
    ["hl","ok","Agreed","WR-2026-0417","PARTIAL + GOODWILL","Partial + goodwill","Sarah Chen","Resolution decision","1:42 PM"],
    ["","ok","Agreed","WR-2026-0411","APPROVE · SR-440 drive · $3,180","Approve","Sarah Chen","Coverage and evidence review","21 Aug"],
    ["","ok","Agreed","WR-2026-0404","APPROVE · SR-440 drive · $2,940","Approve","T. Beckerman","Coverage and evidence review","19 Aug"],
    ["","ok","Agreed","WR-2026-0396","APPROVE · SR-440 drive · $4,410","Approve","Sarah Chen","Coverage and evidence review","16 Aug"],
    ["dim","ok","Agreed","…38 more, SR-440 drive under $5,000","APPROVE","Approve","4 reviewers","Coverage and evidence review","90 days"],
    ["ovr","info","Overrode","WR-2026-0398","DENY","Approve partial","Sarah Chen","Resolution decision","14 Aug"],
    ["","gy","Unclear","WR-2026-0389","APPROVE","Sent back for evidence","M. Alvarez","Coverage and evidence review","11 Aug"]
  ].map(r=>\`<tr class="\${r[0]}">
      <td><span class="ci-chip \${r[1]}">\${r[2]}</span></td>
      <td class="val">\${r[3]}</td>
      <td class="k">\${r[4]}</td>
      <td class="val">\${r[5]}</td>
      <td>\${r[6]}</td>
      <td style="color:var(--ci-muted)">\${r[7]}</td>
      <td class="k">\${r[8]}</td></tr>\`).join("");
  return suggestionsChrome("Ledger","Ledger",\`
    <div class="ci-tool">
      <span class="ci-search">\${ICO.search} Search subject, outcome, rationale</span>
      <span class="ci-filt">Decided by: <b>Human</b></span>
      <span class="ci-filt">Status: <b>All</b></span>
      <span class="ci-filt">Stage: <b>All</b></span>
      <span class="ci-count"><b>412</b> decisions · <b>6</b> overrides (1.5%)</span>
    </div>
    <div class="ci-card" style="overflow:hidden">
      <table class="ci-t">
        <tr><th>Status</th><th>Subject</th><th>Proposed</th><th>Decided</th><th>Actor</th><th>Where</th><th>When</th></tr>
        \${rows}
      </table>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:12px;align-items:start">
      <div class="ci-card pad">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
          <span class="ci-lbl">Decision · WR-2026-0417</span>
          <span class="ci-chip ok" style="margin-left:auto">Agreed</span>
          <span class="ci-chip gy">Immutable</span>
        </div>
        <dl class="ci-kv" style="grid-template-columns:auto minmax(0,1fr)">
          <dt>Proposed</dt><dd>Partial coverage plus goodwill · confidence medium-high</dd>
          <dt>Decided</dt><dd>Partial coverage plus goodwill, unchanged</dd>
          <dt>Decided by</dt><dd>Sarah Chen, inside her delegated authority</dd>
          <dt>Rationale</dt><dd>A part failed inside term, and a controls change was never approved. Both contributed.</dd>
          <dt>Rules read</dt><dd>Combined-cause allocation · goodwill delegation</dd>
          <dt>Took</dt><dd>4 minutes, 9 days after the customer first called</dd>
        </dl>
        <p style="font-size:10.5px;color:var(--ci-muted);margin-top:8px;border-top:1px solid #eef3f3;padding-top:7px">
          The decision was never the hard part. The wait was.</p>
      </div>
      <div class="ci-card pad">
        <span class="ci-lbl" style="margin-bottom:7px">Signals captured with it</span>
        <div class="erow" style="border:0;padding:4px 0;font-size:11px;display:flex;gap:7px;align-items:center">
          <span style="flex:1">Approved configuration baseline</span><span class="ci-chip ok">Useful</span></div>
        <div class="erow" style="border-top:1px solid #eef3f3;padding:4px 0;font-size:11px;display:flex;gap:7px;align-items:center">
          <span style="flex:1">Controls change audit</span><span class="ci-chip ok">Useful</span></div>
        <div class="erow" style="border-top:1px solid #eef3f3;padding:4px 0;font-size:11px;display:flex;gap:7px;align-items:center">
          <span style="flex:1">Third-party service report</span><span class="ci-chip gy">Not marked</span></div>
        <p style="font-size:10.5px;color:var(--ci-muted);margin-top:8px">Sarah spent a few seconds on this and it
          blocked nothing. It is what the suggestions are read from.</p>
      </div>
    </div>
    <p style="font-size:11px;color:var(--ci-muted)">Proposed and Decided sit next to each other on purpose. The eye
      runs down two columns and catches a disagreement without reading.</p>\`);
}

function suggestionsView(){
  const meter = n => \`<span class="ci-meter" aria-label="\${n===3?"High":n===2?"Medium":"Low"} importance">
    \${[1,2,3].map(i=>\`<i class="\${i<=n?"f":""}"></i>\`).join("")}</span>\`;
  const row = (on,n,type,tone,title,sub) => \`<div class="ci-card pad" style="padding:10px 12px;\${on?"border-color:#9fdde1;background:var(--ci-sel)":""}">
      <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px">
        \${meter(n)}<span class="ci-chip \${tone}">\${type}</span></div>
      <b style="font-size:11.5px;font-weight:600;line-height:1.35;display:block">\${title}</b>
      <span style="font-size:10.5px;color:var(--ci-muted)">\${sub}</span>
    </div>\`;
  return suggestionsChrome("Feed","Feed",\`
    <div style="display:flex;align-items:baseline;gap:10px">
      <b style="font-size:13.5px">2 suggestions</b>
      <span class="ci-filt">Sort: <b>Worsening first</b></span>
      <span class="ci-count">clustered from the ledger · last run 02:00 UTC</span>
    </div>
    <div style="display:grid;grid-template-columns:264px minmax(0,1fr);gap:12px;align-items:start;min-width:0">
      <div style="display:grid;gap:8px">
        <span class="ci-lbl">Assigned to me</span>
        \${row(true,3,"Drift signal","info","Nobody has ever disagreed with an SR-440 drive approval under $5,000","41 decisions · worsening")}
        \${row(false,2,"Blind spot","vio","The same drive keeps failing and nobody is checking the part itself","4 failures, 3 customers · steady")}
        <p style="font-size:10.5px;color:var(--ci-muted);margin-top:2px">One removes a human step. One adds one.
          The loop tunes involvement in both directions.</p>
      </div>
      <div class="ci-sug pri" style="min-width:0">
        <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap">
          \${meter(3)}<span class="ci-chip info">Drift signal</span><span class="ci-chip ok">Confirmed</span>
          <span class="ci-chip tl">Improves · Human touchpoints</span>
        </div>
        <h4>Nobody has ever disagreed with an SR-440 drive approval under $5,000</h4>
        <p>41 of these decisions in the last 90 days. Every one was approved, and the reviewer never changed the
          recommendation. None was reversed afterwards. Review added a median 3.1 hours to a stage that has a
          4-hour target.</p>
        <div class="ci-ev">
          <span>decisions <b>41</b></span><span>overturned <b>0</b></span>
          <span>persistence <b>90 days</b>, persistent not a blip</span>
          <span>reviewer hours <b>127</b></span>
          <span>cluster cohesion <b>high</b>, the cases are alike</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
          <div>
            <span class="ci-lbl" style="margin-bottom:5px">Classification</span>
            <dl class="ci-kv">
              <dt>Source</dt><dd>Decision ledger</dd>
              <dt>Analyzer</dt><dd>Human signals</dd>
              <dt>Stage</dt><dd>Coverage and evidence review</dd>
              <dt>Root cause</dt><dd>reads clearly</dd>
            </dl>
          </div>
          <div>
            <span class="ci-lbl" style="margin-bottom:5px">Adversarial verification</span>
            <p style="font-size:11px;color:var(--ci-text);line-height:1.5">A verifier tried to refute this and it
              held. It did narrow the claim: the pattern is specific to this drive family, not to small claims
              generally, so the rule names the part.</p>
          </div>
        </div>
        <p class="ci-blind"><b>What this analysis could not see.</b> Three claims in the window were withdrawn
          before anyone reviewed them, so their outcome is unknown and they are not counted here.</p>
        <div>
          <span class="ci-lbl" style="margin:9px 0 5px">Proposed improvement</span>
          <p style="font-size:11.5px;line-height:1.5">Approve this class by rule. Keep sending combined cause,
            amounts above the threshold, and commercial exceptions to a person.</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:9px;
                    border-top:1px solid #eef3f3;padding-top:9px">
          <div>
            <span class="ci-lbl" style="margin-bottom:5px">Lifecycle</span>
            <dl class="ci-kv">
              <dt>Status</dt><dd>Open</dd>
              <dt>Assignee</dt><dd>Sarah Chen</dd>
              <dt>Trend</dt><dd>Worsening</dd>
              <dt>Updated</dt><dd>this morning, 02:00 UTC run</dd>
            </dl>
          </div>
          <div>
            <span class="ci-lbl" style="margin-bottom:5px">Linked ledger items</span>
            <p style="font-size:11px;color:var(--ci-muted);line-height:1.5">WR-2026-0411 · WR-2026-0404 ·
              WR-2026-0396 and 38 more, across 4 reviewers and 3 customers. Every one cites the decisions it was
              clustered from, so the ledger is the only input.</p>
          </div>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
          <span class="ci-btn pri">Create improvement</span>
          <span class="ci-btn sm">View the 41 decisions</span>
          <span class="ci-btn sm">Dismiss</span>
          <span class="ci-count" style="margin-left:auto">coming soon, not shipping today</span>
        </div>
      </div>
    </div>\`);
}

function improvementView(){
  return suggestionsChrome("Suggestions","Suggestions <span class='sep'>/</span> IMP-0142",\`
    <div style="display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:13px;align-items:start">
      <div style="display:grid;gap:11px;min-width:0">
        <div>
          <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin-bottom:5px">
            <span class="ci-chip warn">Needs review</span><span class="ci-chip tl">Online</span>
            <span class="ci-chip gy">Lever · Rules</span>
            <span class="ci-count">from the SR-440 suggestion</span>
          </div>
          <b style="font-size:15px;font-weight:600">Approve small SR-440 drive claims by rule</b>
        </div>
        <div class="ci-card pad">
          <span class="ci-lbl" style="margin-bottom:6px">Why this exists</span>
          <p style="font-size:11.5px;line-height:1.55">41 decisions, all approved, none reversed. The judgement was
            never hard. The wait was the problem.</p>
        </div>
        <div>
          <span class="ci-lbl" style="margin-bottom:5px">What changes</span>
          <div class="ci-rule add">
            <div class="rh"><span class="ci-chip ok">New rule</span> Coverage and evidence review
              <span class="ci-count">generated</span></div>
            <div class="rb"><span class="kw">WHEN</span> a coverage recommendation is ready<br>
              <span class="kw">IF</span> failed part = SR-440 drive <span class="kw">AND</span> claim &lt; $5,000
              <span class="kw">AND</span> cause is not disputed<br>
              <span class="kw">THEN</span> approve by rule and skip the human task</div>
          </div>
          <div class="ci-rule">
            <div class="rh"><span class="ci-chip gy">Unchanged</span> Everything else still routes to a person</div>
            <div class="rb">Combined cause, claims of $5,000 or more, and commercial exceptions are untouched.</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">
          <div class="ci-card pad">
            <span class="ci-lbl" style="margin-bottom:6px">Adversarial verification</span>
            <span class="ci-chip ok" style="margin-bottom:5px">Held</span>
            <p style="font-size:11px;line-height:1.5;color:var(--ci-muted)">A verifier narrowed it: the pattern is
              specific to this drive family, so the rule names the part rather than the amount alone.</p>
          </div>
          <div class="ci-card pad">
            <span class="ci-lbl" style="margin-bottom:6px">Risks</span>
            <p style="font-size:11px;line-height:1.5;color:var(--ci-muted)">A design change to the drive would make
              the 90 days of history stale. Sampling catches that within a month, and the rule can be withdrawn.</p>
          </div>
        </div>
        <div class="ci-card pad">
          <span class="ci-lbl" style="margin-bottom:6px">And the next case, handled better</span>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px">
            <span class="ci-chip ok">WR-2026-0468 &middot; approved by rule</span>
            <span class="ci-count">SR-440 drive &middot; $2,730 &middot; single cause</span>
          </div>
          <p style="font-size:11px;color:var(--ci-muted)">The first claim this rule covers finishes in 4 hours
            instead of 4.2 days, and nobody was asked. If it misfires, roll the rule back from here &mdash;
            one in ten is audited for 30 days.</p>
        </div>
      </div>
      <div style="display:grid;gap:11px">
        <div class="ci-card pad">
          <span class="ci-lbl" style="margin-bottom:7px">Projected impact</span>
          <div style="display:grid;gap:8px">
            <div><div class="ci-fx" style="grid-template-columns:1fr"><div class="b" style="border:0;padding:0">
              <div class="v">93<small>%</small> → 96<small>%</small></div>
              <div class="k">Finishing without a person</div></div></div></div>
            <dl class="ci-kv">
              <dt>Reviewer hours</dt><dd>127 back over 90 days</dd>
              <dt>Routine wait</dt><dd>3.1 hours removed per claim</dd>
              <dt>Claims affected</dt><dd>roughly 41 in 90 days</dd>
            </dl>
          </div>
        </div>
        <div class="ci-card pad">
          <span class="ci-lbl" style="margin-bottom:7px">Rollout</span>
          <dl class="ci-kv">
            <dt>Takes effect</dt><dd>Immediately on apply, read at run time, no redeployment</dd>
            <dt>Reversible</dt><dd>Yes, the rule can be withdrawn</dd>
            <dt>Environment</dt><dd>Production</dd>
            <dt>Sampling</dt><dd>1 in 10 audited for 30 days</dd>
          </dl>
        </div>
        <div class="ci-card pad">
          <span class="ci-lbl" style="margin-bottom:7px">Activity</span>
          <div class="ci-act"><span class="who">Human signals analyzer</span>
            <span class="what">Clustered 41 decisions from the ledger.</span></div>
          <div class="ci-act"><span class="who">Improvement agent</span>
            <span class="what">Drafted the rule and one new eval.</span></div>
          <div class="ci-act"><span class="who">You, on apply</span>
            <span class="what">The rule takes effect and can be rolled back.</span></div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="ci-btn sm">Decline</span>
          <span class="ci-btn pri" style="flex:1;justify-content:center">\${ICO.bolt} Apply</span>
        </div>
        <p style="font-size:10.5px;color:var(--ci-muted)">A person approves this rule once, instead of approving
          every claim it covers. Nothing applies itself.</p>
        <div class="ci-card pad" style="border-color:var(--ci-teal)">
          <span class="ci-lbl" style="margin-bottom:5px">And it flows back into the map</span>
          <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap">
            <span class="ci-chip tl">SI-0007 &middot; submitted</span>
            <span class="ci-count">substitution standard &middot; awaiting Priya's sign-off</span></div>
          <p style="font-size:10.5px;color:var(--ci-muted);margin-top:5px">The applied rule lands in the map of
            work as a submitted proposal &mdash; which is where the estate screens that follow pick it up.</p>
        </div>
      </div>
    </div>\`);
}



/* ==========================================================
   CARTOGRAPHER MAP VIEWS
   Max's beats 1, 3, 4 and 6 have no equivalent in the Case
   storyboard, so they are built here. Authored at 1280 and
   scaled like every other frame, which is the fix for the
   5px wireframes in the current prototype.
   ========================================================== */
const MWSTEPS = [
  ["01","Report the failure","Customer / site contact","wf"],
  ["02","Identify the asset","Support","case"],
  ["03","Assemble evidence","Warranty Ops","case"],
  ["04","Decide coverage","Warranty Ops","case"],
  ["05","Substitute a part","Parts / Logistics","gap"],
  ["06","Raise the work order","Field Service","wf"]
];
function mwBands(mode){
  const rows = [
    ["Steps",  MWSTEPS.map(x=>\`<span class="mw-c \${x[3]}"><b>\${x[1]}</b><u>\${x[0]}</u></span>\`)],
    ["Owner",  MWSTEPS.map(x=>\`<span class="mw-c"><u>\${x[2]}</u></span>\`)],
    ["Systems",["CRSC","AssetVault","WT-9","WT-9","Vault-PLM","FieldLink"].map((y,i)=>
        \`<span class="mw-c \${i===4&&mode!=="done"?"gap":""}"><u>\${y}</u></span>\`)],
    ["Rules",  ["stated","stated","stated","stated",mode==="done"?"stated":"not stated","stated"].map((y,i)=>
        \`<span class="mw-c \${y==="stated"?"ok":"gap"}"><u>\${y}</u></span>\`)],
    ["Ledger", ["records","records","records","records",mode==="done"?"records":"records nothing","records"].map(y=>
        \`<span class="mw-c \${y==="records"?"ok":"gap"}"><u>\${y}</u></span>\`)]
  ];
  return rows.map(r=>\`<div class="mw-band"><span class="mw-bl">\${r[0]}</span>\${r[1].join("")}</div>\`).join("");
}
function mapEmptyView(){
  return cartographerChrome(\`<div class="mw">
    <div class="mw-top"><h4>Cobalt Ridge Automation &middot; Map of work</h4>
      <span class="ptag gy">Nothing surveyed</span></div>
    <div class="apwrap">\${apFlower("cov","empty")}
      <div class="apside">
        <p style="font-size:12.5px;color:var(--p-mute);line-height:1.6">Cartographer draws a map of the work this
          company actually does, process by process, owner by owner. Nothing has been surveyed yet &mdash; the
          domains exist because the org chart does, and every one of them is empty.</p>
        <span class="lbl">Four ways to begin</span>
        <div class="est" style="grid-template-columns:1fr 1fr">
          <div class="d hi"><b>Modelled in Maestro</b><span class="m">import what already runs</span></div>
          <div class="d mid"><b>Industry seeds</b><span class="m">manufacturing blueprints</span></div>
          <div class="d"><b>Documents &amp; recordings</b><span class="m">whatever was written down</span></div>
          <div class="d lo"><b>Nothing</b><span class="m">start from scratch</span></div>
        </div>
        <p style="font-size:11px;color:var(--p-mute);line-height:1.55">Anything picked here is a starting point,
          not a commitment.</p>
      </div></div>
  </div>\`);
}
function setupView(){
  const OPT = [
    [1,"Processes modelled in UiPath Maestro","3 found","BPMN models already running, imported with 90 days of run history."],
    [1,"Seed candidates from my industry","","Common processes for your vertical, placed on the map as unmapped candidates."],
    [0,"Documents, diagrams &amp; recordings","","SOPs, Visio exports and screen recordings &mdash; added later, from any process page."],
    [0,"Nothing yet &mdash; start from scratch","","Open the empty map and build it one conversation at a time."]
  ].map(o=>\`<div class="wz-opt\${o[0]?" on":""}">
      <span class="cb">\${o[0]?"&#10003;":""}</span>
      <span class="tx"><b>\${o[1]}\${o[2]?\`<span class="ct">\${o[2]}</span>\`:""}</b><u>\${o[3]}</u>
        \${o[1].indexOf("industry")>0?\`<span class="wz-sel">Manufacturing &#9662;</span>\`:""}</span>
    </div>\`).join("");
  return cartographerChrome(\`<div class="wz">
    <div class="wz-bar"><span class="back">&larr; Back</span><span class="step">Step 2 of 4</span></div>
    <div class="wz-mid">
      <h3>What do you already have?</h3>
      <p class="wz-sub">Anything you pick becomes a starting point, not a commitment &mdash; the map fills in
        from whatever exists, and everything here is optional.</p>
      <div class="wz-opts">\${OPT}</div>
      <div class="wz-acts"><span class="btn primary">Continue</span><span class="btn">Skip setup</span></div>
    </div>
  </div>\`);
}
function importView(){
  const M = [
    ["Spare-parts order fulfilment","BPMN V4","14 steps &middot; agent + robot + human &middot; 1,240 runs / 90 d &middot; median 6 h &middot; owner Parts &amp; Logistics"],
    ["Purchase order &rarr; invoice matching","BPMN V7","11 steps &middot; robot + human &middot; 2,980 runs / 90 d &middot; median 40 min &middot; owner Finance"],
    ["RMA / returns authorisation","BPMN V2","9 steps &middot; human-led &middot; 410 runs / 90 d &middot; median 2.4 d &middot; owner Customer Support"]
  ].map(m=>\`<div class="im-card"><b>\${m[0]}<span class="v">\${m[1]}</span></b><u>\${m[2]}</u></div>\`).join("");
  const CHIPS = ["steps","participants","decision points","systems","cycle time","path frequency"]
    .map(c=>\`<span class="im-chip">\${c}</span>\`).join("");
  return cartographerChrome(\`<div class="wz">
    <div class="wz-bar"><span class="back">&larr; Back</span><span class="step">Step 3 of 4</span></div>
    <div class="im">
      <div class="im-main">
        <span class="lbl">Connected to Maestro</span>
        <h3>Import from Maestro</h3>
        <p class="wz-sub">Reading BPMN models plus 90 days of run history &mdash; three found.</p>
        \${M}
        <span class="lbl" style="margin:11px 0 5px">Arrives with the model</span>
        <div>\${CHIPS}</div>
        <div class="wz-acts"><span class="btn primary">Import 3 models</span><span class="btn">Keep in sync</span></div>
      </div>
      <div class="im-side">
        <div class="im-note">
          <span class="lbl">What this gives you</span>
          <b>Mapped, not guessed</b><u>The model is the map &mdash; steps and decision points arrive drawn.</u>
          <b>Owner already named</b><u>Each model carries the team accountable for it.</u>
          <b>Numbers from runs, not interviews</b><u>Cycle time and path frequency come from 90 days of execution.</u>
        </div>
        <div class="im-note cant">
          <span class="lbl">What it can't do</span>
          <u><i></i>Maestro only knows the work that runs. Warranty resolution has no model, so it arrives as an
            empty red dot &mdash; which is the point.</u>
        </div>
      </div>
    </div>
  </div>\`);
}
function day0View(){
  return cartographerChrome(\`<div class="mw">
    <div class="mw-top"><h4>Cobalt Ridge Automation &middot; Map</h4>
      <span class="ptag bl">Day 0</span></div>
    <div class="ap-stat">
      <div><b>10</b><span>processes</span></div>
      <div><b>5</b><span>domains</span></div>
      <div><b>0%</b><span>median coverage</span></div>
      <div><b class="warn">1</b><span>empty &mdash; warranty resolution</span></div>
    </div>
    <div class="apwrap">\${apFlower("cov","day0")}
      <div class="apside">
        <div class="apkey">
          <span><i style="background:#0067df"></i>imported from Maestro</span>
          <span><i style="background:#fff;border:1.6px solid #ffb40e"></i>industry seed</span>
          <span><i style="background:#fff;border:2px solid #cc3d45"></i>empty</span>
        </div>
        <div class="pcard pad">
          <span class="lbl" style="margin-bottom:6px">Ten processes, and nothing mapped</span>
          <p style="font-size:11.5px;line-height:1.6;color:var(--p-ink)">Three arrived from Maestro with real run
            history. Seven are industry seeds &mdash; candidates, not knowledge. Median coverage is zero, and the
            one that matters is the empty red dot.</p>
        </div>
        <p style="font-size:11px;color:var(--p-mute);line-height:1.55">This is the picture the demo comes back
          to at the end.</p>
      </div></div>
  </div>\`);
}
function projectOpensView(){
  const PROG = ["Discovery","Define as-is","Design to-be","Validate to-be","Architect","Handoff"]
    .map((n,i)=>\`<div class="an-st\${i===0?" on":""}">\${n}\${i===0?'<i></i>':""}</div>\`).join("");
  const DOCS = ["current-process-v2.bpmn","warranty-SOP-v3.pdf","stakeholders.csv","vendor-cycle-times.xlsx"]
    .map(d=>\`<div class="an-res" style="font-family:var(--pmono);font-size:10px">\${d}</div>\`).join("");
  const CHIPS = ["Summarize the current AS-IS process","What changed in the latest TO-BE?",
    "Draft the substitution exception rules","List open questions for stakeholders"]
    .map(c=>\`<span class="pj-chip">\${c}</span>\`).join("");
  return cartographerChrome(\`<div class="an">
    <div class="an-side">
      <span class="lbl" style="margin-bottom:7px">Progress</span>
      \${PROG}
      <hr class="prule" style="margin:12px 0">
      <span class="lbl" style="margin-bottom:6px">Resources &middot; documents 4</span>
      \${DOCS}
      <div class="an-res">Integrations<span>15</span></div>
      <div class="an-res">Controls<span>6</span></div>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:16px;align-items:start">
      <div style="min-width:0">
        <h3 style="font-family:var(--serif);font-size:25px;font-weight:500;letter-spacing:-.02em">Industrial Equipment Warranty Resolution</h3>
        <p style="font-size:11.5px;color:var(--ap-ink-400);margin:2px 0 9px">Created by you &middot; Business process</p>
        <p style="font-size:12.5px;line-height:1.65;color:var(--ap-ink);max-width:520px">Model a business process
          end to end &mdash; from AS-IS through TO-BE &mdash; and hand a buildable design to delivery.</p>
        <p style="font-size:11.5px;line-height:1.6;color:var(--ap-ink-500);margin-top:7px;max-width:520px">
          <b>Deliverables:</b> Process Design Document &middot; AS-IS / TO-BE diagram &middot;
          Solution architecture &middot; Stakeholder sign-off</p>
        <div class="pj-ask">Ask Cartographer to refine, extend, or edit this project&hellip;</div>
        <div style="margin-top:9px">\${CHIPS}</div>
      </div>
      <div style="display:grid;gap:10px">
        <div class="im-note">
          <span class="lbl">Stakeholders</span>
          <div class="rv" style="padding:6px 0"><span class="av">PR</span><span class="bd"><b>Priya Raghunathan</b>
            <span class="rl">Director, Global Warranty Ops &middot; process owner</span></span></div>
          <div class="rv" style="padding:6px 0"><span class="av">TB</span><span class="bd"><b>Tom Beckerman</b>
            <span class="rl">Warranty Claims &middot; project owner</span></span></div>
          <span class="pmono" style="font-size:8px;display:block;margin-top:6px">NAMED BY THE SOURCES, NOT YET IN &middot; 4 MORE</span>
        </div>
        <div class="im-note">
          <span class="lbl">Sources</span>
          <u style="margin-top:6px">Kickoff interview &middot; <b>17 cites</b></u>
          <u>As-is deck &middot; <b>11 cites</b></u>
          <u style="color:#a92f2c">Legacy Visio sketch &middot; <b>conflict</b></u>
          <u style="color:#b5b1a8">Handbook (2019) &middot; <b>0 cites</b></u>
        </div>
      </div>
    </div>
  </div>\`);
}
function smeDelegationView(){
  const Q = [
    ["Who may approve an alternate part today, in practice?","Answered &middot; “whoever picks up the phone at the DC”","ok"],
    ["Is there an equivalence standard, written or informal?","Answered &middot; informal &mdash; form, fit and function, never written down","ok"],
    ["When the alternate is off the approved list, who decides?","Answered &middot; engineering should, support usually does","ok"],
    ["What gets recorded when a substitution is approved?","Answered &middot; nothing","ok"]
  ].map((q,i)=>\`<div class="mw-item"><span class="n">Q\${i+1}</span><span class="t"><b>\${q[0]}</b>
      <u>\${q[1]}</u></span></div>\`).join("");
  return cartographerChrome(\`<div class="mw">
    <div class="mw-top"><h4>Industrial Equipment Warranty Resolution</h4>
      <span class="ptag yl">1 item delegated</span>
      <span class="mw-prog">waiting on nobody &mdash; answered same day</span></div>
    <div style="display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:12px;align-items:start">
      <div class="pcard pad" style="border-color:#e6d5a8;background:linear-gradient(#fff 70%,#fdfaf1)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
          <span class="ptag yl">Confirm</span>
          <span class="lbl">The one gap the documents cannot close</span></div>
        <p style="font-size:12px;line-height:1.6;color:var(--p-ink);margin-bottom:9px">Step 05, parts substitution,
          decides something and no source states the rule. The documents have been read; the answer is not in them.
          So the agent drafted four questions and routed them to the person the sources name for parts.</p>
        <div style="display:flex;align-items:center;gap:9px;padding:9px 11px;background:#fff;border:1px solid var(--p-line);border-radius:8px">
          <span class="av" style="width:26px;height:26px;border-radius:50%;background:var(--ap-blue);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">KN</span>
          <span style="min-width:0"><b style="font-size:12px">Kelsey Nordstrom</b>
            <u style="display:block;text-decoration:none;font-size:10.5px;color:var(--p-mute)">Parts &amp; Logistics Planner &middot; sent a link, answered in it herself</u></span>
          <span class="pmono" style="margin-left:auto;font-size:8.5px">SENT 10:41 &middot; ANSWERED 14:06</span>
        </div>
      </div>
      <div class="pcard pad">
        <span class="lbl" style="margin-bottom:7px">Her four answers, folded into the map</span>
        \${Q}
        <p style="font-size:10.5px;color:var(--p-mute);margin-top:8px;line-height:1.55">“Nothing” is the finding.
          The map now says substitution has no rule and records nothing &mdash; which is the gap the review makes a
          standard for, and the rule Act IV finally writes down.</p>
      </div>
    </div>
  </div>\`);
}
function mapDiagramView(){
  // Two department lanes, stitched; the undocumented step drawn as a gap.
  const node = (x,y,w,label,sub,cls) => \`<rect x="\${x}" y="\${y}" width="\${w}" height="46" rx="8" class="dgn \${cls||""}"/>
      <text x="\${x+w/2}" y="\${y+20}" text-anchor="middle" class="dgt">\${label}</text>
      <text x="\${x+w/2}" y="\${y+34}" text-anchor="middle" class="dgu">\${sub}</text>\`;
  const edge = (x1,y1,x2,y2,cls) => \`<path d="M\${x1} \${y1} C \${x1+28} \${y1}, \${x2-28} \${y2}, \${x2} \${y2}" class="dge \${cls||""}"/>\`;
  return cartographerChrome(\`<div class="mw">
    <div class="mw-top"><h4>Industrial Equipment Warranty Resolution &middot; Diagram</h4>
      <span class="ptag gn">Generated from the map</span>
      <span class="mw-prog">both department flows, stitched</span></div>
    <div class="apf" style="align-self:stretch"><svg viewBox="0 0 960 300" width="100%" role="img"
        aria-label="The process as a diagram: six steps across two department lanes, with the undocumented substitution step drawn as a gap">
      <rect x="8" y="26" width="944" height="112" rx="10" class="dgl"/>
      <text x="22" y="46" class="dgll">SUPPORT &middot; WARRANTY OPS</text>
      <rect x="8" y="160" width="944" height="112" rx="10" class="dgl"/>
      <text x="22" y="180" class="dgll">PARTS &middot; FIELD SERVICE</text>
      \${node(30,66,130,"Report the failure","customer &middot; CRSC","wf")}
      \${node(196,66,130,"Identify the asset","Support &middot; AssetVault","")}
      \${node(362,66,130,"Assemble evidence","Warranty Ops &middot; WT-9","")}
      \${node(528,66,140,"Decide coverage","Warranty Ops &middot; WT-9","")}
      \${node(528,196,140,"Substitute a part","no rule stated","gap")}
      \${node(724,196,140,"Raise the work order","Field Service &middot; FieldLink","wf")}
      \${edge(160,89,196,89)}\${edge(326,89,362,89)}\${edge(492,89,528,89)}
      \${edge(668,89,724,219)}
      \${edge(598,112,598,196,"down")}
      \${edge(668,219,724,219)}
      <text x="700" y="152" class="dgu" text-anchor="middle">exception &middot; only when the part is off the list</text>
    </svg></div>
    <div class="mw-legend">
      <span><i style="background:#0067df"></i>case step, judgment and waiting</span>
      <span><i style="background:#6b4ea8"></i>workflow step, straight through</span>
      <span><i style="background:#f0b6b6"></i>drawn as a gap &mdash; decides with no rule</span>
    </div>
    <p style="font-size:11.5px;color:var(--p-mute);line-height:1.55;max-width:760px">The same map, drawn. Both
      department flows are stitched into one picture, and the undocumented step is not smoothed over &mdash; it is
      drawn as a gap, because a decision with no rule is a gap in the map, not an empty field.</p>
  </div>\`);
}
function mapWipView(){
  return cartographerChrome(\`<div class="mw">
    <div class="mw-top"><h4>Industrial Equipment Warranty Resolution</h4>
      <span class="ptag yl">In progress</span>
      <span class="mw-prog">62% complete<span class="mw-bar"><i style="width:62%"></i></span>6 open items</span></div>
    <div class="pmono" style="font-size:9px">11 OF 14 SECTIONS PRESENT &middot; ABSENT: SUBSTITUTION STANDARD, RECURRENCE, COST RECONCILIATION</div>
    <div class="mw-grid">\${mwBands("wip")}</div>
    <div class="mw-legend">
      <span><i style="background:#0067df"></i>Case step, judgment and waiting</span>
      <span><i style="background:#6b4ea8"></i>Workflow step, runs start to finish</span>
      <span><i style="background:#f0b6b6"></i>Nothing recorded here</span>
    </div>
    <div class="pcard pad">
      <span class="lbl" style="margin-bottom:7px">What the documents could not answer</span>
      <div class="mw-item"><span class="n">01</span><span class="t"><b>Step 05 decides something and states no rule.</b>
        <u>A decision with no rule is a gap in the map, not an empty field &mdash; the map cannot say what happens next. Routed to Kelsey Nordstrom.</u></span></div>
      <div class="mw-item"><span class="n">02</span><span class="t"><b>Nobody checks whether a failure has happened before.</b>
        <u>There is no recurrence step at close, so there is no trace to read. The absence is the finding.</u></span></div>
      <div class="mw-item"><span class="n">03</span><span class="t"><b>Monthly volume is unknown.</b>
        <u>Answered inline: roughly 7,400 claims a year.</u></span></div>
    </div>
  </div>\`);
}
function mapDoneView(){
  return cartographerChrome(\`<div class="mw">
    <div class="mw-top"><h4>Industrial Equipment Warranty Resolution</h4>
      <span class="ptag gn">Complete</span>
      <span class="mw-prog">100%<span class="mw-bar"><i style="width:100%"></i></span>0 open items</span></div>
    <div class="mw-grid">\${mwBands("done")}</div>
    <div class="mw-legend">
      <span><i style="background:#0067df"></i>Case step</span>
      <span><i style="background:#6b4ea8"></i>Workflow step</span>
      <span><i style="background:#bfe0cc"></i>Owner, rule and record all present</span>
    </div>
    <div class="pcard pad" style="max-width:760px">
      <span class="lbl" style="margin-bottom:6px">Why this is a case and not a flow</span>
      <p style="font-size:11.5px;line-height:1.6;color:var(--p-ink)">Four of these six steps wait on a person or on
        the customer, and four more paths only open when something goes wrong. The map says so before anybody
        builds anything, which is what decides the shape of what gets built next.</p>
    </div>
  </div>\`);
}
function reviewView(){
  return cartographerChrome(\`<div class="mw">
    <div class="mw-top"><h4>Shared for review</h4><span class="ptag bl">4 reviewers · v3</span>
      <span class="mw-prog">5 comments · 3 accepted</span></div>
    <div class="pcard pad">
      <div class="rv"><span class="av">PR</span><span class="bd"><b>Priya Raghunathan</b>
        <span class="rl">Director, Global Warranty Operations</span>
        <p>Coverage does not sit with Field Service. It is ours, and the written rationale is a requirement, not a
          nicety. Please move the owner.</p>
        <span class="ptag gn" style="margin-top:5px">Accepted, map updated</span></span></div>
      <div class="rv"><span class="av">KN</span><span class="bd"><b>Kelsey Nordstrom</b>
        <span class="rl">Parts &amp; Logistics Planner</span>
        <p>Substitution needs an equivalence standard, not just an approver. Engineering owns that call when the
          alternate is not on the approved list.</p>
        <span class="ptag gn" style="margin-top:5px">Accepted, rule written down</span></span></div>
      <div class="rv"><span class="av">RO</span><span class="bd"><b>Ryan Ochoa</b>
        <span class="rl">Product Quality Lead</span>
        <p>Two failures on the same asset inside twelve months is a repeat failure and should block closure. A prior
          claim closed as operator error still counts.</p>
        <span class="ptag gn" style="margin-top:5px">Accepted, gate added at close</span></span></div>
      <div class="rv"><span class="av">TB</span><span class="bd"><b>Tom Beckerman</b>
        <span class="rl">Senior Warranty Claims Administrator</span>
        <p>The weekly coverage board is the reason claims sit. If that is staying, the map should say so.</p>
        <span class="ptag yl" style="margin-top:5px">Open, needs a decision</span></span></div>
    </div>
    <p style="font-size:11.5px;color:var(--p-mute)">The analyst stops driving here. The people who own the work
      correct the map, and the accepted edits change it and bump the version.</p>
  </div>\`);
}
function uceView(){
  const rows = [
    ["Industrial Equipment Warranty Resolution","Manufacturing","Case","Attested",true],
    ["Distributor Claims Adjudication","Manufacturing","Case","Attested",false],
    ["Facility Maintenance Reports","Real estate","Flow","Attested",false],
    ["Property Claims Lodgement","Insurance","Case","Attested",false],
    ["Source to Pay","Cross-industry","Packaged","Attested",false]
  ].map(r=>\`<tr class="\${r[4]?"hero":""}"><td><span class="nm">\${r[0]}</span></td>
      <td style="color:var(--p-mute)">\${r[1]}</td><td><span class="ptag bl">\${r[2]}</span></td>
      <td><span class="ptag gn">\${r[3]}</span></td></tr>\`).join("");
  return cartographerChrome(\`<div class="mw">
    <div class="mw-top"><h4>Start from a process UiPath has already attested</h4>
      <span class="ptag tl">Use Case Explorer, inside Cartographer</span></div>
    <p style="font-size:12.5px;color:var(--p-mute);max-width:700px;line-height:1.6">Rather than starting from a blank
      map, pick a process UiPath has already mapped, reviewed with industry experts, and published. It arrives with
      stages, owners, rules and a data model, and becomes the starting point this company then corrects.</p>
    <div class="pcard" style="overflow:hidden">
      <table class="pt">
        <tr><th>Curated process</th><th>Industry</th><th>Shape</th><th>Status</th></tr>
        \${rows}
      </table>
    </div>
    <div class="pcard pad" style="max-width:720px">
      <span class="lbl" style="margin-bottom:6px">What arrives with it</span>
      <p style="font-size:11.5px;line-height:1.6">Six primary stages and four conditional ones, forty four pieces of
        work, the systems each step touches, and the rules that were worth writing down. Everything here is a
        starting point, not a commitment.</p>
    </div>
  </div>\`);
}
/* ==========================================================
   THE ESTATE AT DAY 90 - Max's Beat 6, all six of his frames.
   One dataset feeds the radial, the table and the counters, so
   the picture and the numbers cannot drift apart. Coverage
   weighted across all 134 processes is 47%, which is the number
   his frame 21 shows. Domain counts and the four percentages he
   published are his; the rest are filled in to reach his totals.
   ========================================================== */
const ESTATE = [
  // domain, processes, % mapped, unowned
  ["Support",           22, 68, 0],
  ["Warranty Ops",      19, 64, 0],
  ["Field Service",     22, 38, 2],
  ["Parts &amp; Logistics", 17, 41, 2],
  ["Finance",           14, 55, 0],
  ["Eng &amp; Quality", 14, 29, 4],
  ["Commercial",        11, 24, 2],
  ["IT",                15, 44, 1]
];
/* Day 0 is a smaller, honest picture: Max's frame 04 shows 10 processes
   across 5 domains at 0% median coverage. Three arrive from the Maestro
   import, seven as industry seeds, and warranty resolution is the empty
   red dot his frame 03 promises. */
const DAY0 = [
  ["Support",        3, "seed"],
  ["Parts & Logistics", 2, "import"],
  ["Finance",        2, "import"],
  ["Field Service",  2, "seed"],
  ["Warranty Ops",   1, "empty"]
];
const EST_BAND = p => p >= 65 ? "hi" : (p >= 40 ? "mid" : "lo");
const EST_HEX = {hi:"#038108", mid:"#ffb40e", lo:"#cc3d45", own:"#0067df"};

/* The estate radial, restyled 26 Aug to the idiom Max's live prototype
   actually draws (vendor/max-prototype/live-capture-2026-08-26/07): the
   organisation at the core, domain hubs on spokes, and every process as
   a dot on the outer ring, sector by domain. Numbers stay the storyboard's
   (134 / 47%) per Robert's call; only the drawing changed. Deterministic:
   the same input draws the same picture, so screenshots stay stable. */
function apFlower(lens, mode){
  mode = mode || "full";
  const W = 520, H = 372, cx = W/2, cy = H/2, HUB = 62, RING = 148, JIT = 13;
  const TOTAL = ESTATE.reduce((n,d)=>n+d[1],0);
  let out = \`<circle cx="\${cx}" cy="\${cy}" r="\${RING}" class="guide"/>\`;
  let dots = "", labs = "", mark = "";
  let acc = 0;
  (mode === "day0" ? [] : ESTATE).forEach((d, i) => {
    const frac = d[1] / TOTAL, pad = 0.012;
    const a0 = (acc + pad) * Math.PI*2 - Math.PI/2,
          a1 = (acc + frac - pad) * Math.PI*2 - Math.PI/2,
          am = (a0 + a1) / 2;
    acc += frac;
    const hx = cx + Math.cos(am) * HUB, hy = cy + Math.sin(am) * HUB;
    const ghost = mode === "empty" ? " ghost" : "";
    out += \`<line x1="\${cx}" y1="\${cy}" x2="\${hx.toFixed(1)}" y2="\${hy.toFixed(1)}" class="sp trunk\${ghost}"/>\`
         + \`<circle cx="\${hx.toFixed(1)}" cy="\${hy.toFixed(1)}" r="6" class="hub\${ghost}"/>\`;
    if (mode === "full"){
      const rx = cx + Math.cos(am) * (RING - 26), ry = cy + Math.sin(am) * (RING - 26);
      out += \`<line x1="\${hx.toFixed(1)}" y1="\${hy.toFixed(1)}" x2="\${rx.toFixed(1)}" y2="\${ry.toFixed(1)}" class="sp"/>\`;
    }
    // label between hub and ring, pushed outward past the dots
    const lx = cx + Math.cos(am) * (RING + 24), ly = cy + Math.sin(am) * (RING + 24);
    const anch = Math.abs(Math.cos(am)) < .35 ? "middle" : (Math.cos(am) > 0 ? "start" : "end");
    labs += \`<text x="\${lx.toFixed(1)}" y="\${(ly+3).toFixed(1)}" class="dl\${ghost}" text-anchor="\${anch}">\${d[0]}</text>\`;
    if (mode === "full"){
      for (let k = 0; k < d[1]; k++){
        const t = d[1] === 1 ? 0.5 : k / (d[1] - 1);
        const a = a0 + t * (a1 - a0);
        const j = Math.sin((i + 1) * 7.31 + k * 2.174);          // deterministic jitter
        const r = RING + j * JIT * ((k % 2) ? .55 : 1);
        const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
        const unowned = k < d[3];
        const cls = lens === "own" ? (unowned ? "non" : "own") : EST_BAND(d[2]);
        dots += \`<circle cx="\${px.toFixed(1)}" cy="\${py.toFixed(1)}" r="\${unowned && lens === "own" ? 3.4 : 2.4}" class="nd \${cls}"/>\`;
        if (i === 1 && k === 2){
          const right = Math.cos(a) > 0;
          mark = \`<circle cx="\${px.toFixed(1)}" cy="\${py.toFixed(1)}" r="8" class="ring"/>\`
               + \`<text x="\${(px + (right ? -12 : 12)).toFixed(1)}" y="\${(py + 3).toFixed(1)}" class="pin"
                    text-anchor="\${right ? "end" : "start"}">warranty resolution</text>\`;
        }
      }
    }
    // day-0 dots are drawn from DAY0 below, not from this loop
  });
  if (mode === "day0"){
    let accH = 0;
    const TH = DAY0.reduce((n,d)=>n+d[1],0);
    DAY0.forEach(d=>{
      const frac = d[1]/TH;
      const am = (accH + frac/2)*Math.PI*2 - Math.PI/2; accH += frac;
      const hx = cx + Math.cos(am)*HUB, hy = cy + Math.sin(am)*HUB;
      out += \`<line x1="\${cx}" y1="\${cy}" x2="\${hx.toFixed(1)}" y2="\${hy.toFixed(1)}" class="sp trunk"/>\`
           + \`<circle cx="\${hx.toFixed(1)}" cy="\${hy.toFixed(1)}" r="6" class="hub"/>\`;
    });
    let acc0 = 0;
    const T0 = DAY0.reduce((n,d)=>n+d[1],0);
    DAY0.forEach((d,i)=>{
      const frac = d[1]/T0;
      const a0 = (acc0 + .014)*Math.PI*2 - Math.PI/2,
            a1 = (acc0 + frac - .014)*Math.PI*2 - Math.PI/2,
            am = (a0+a1)/2;
      acc0 += frac;
      for (let k=0;k<d[1];k++){
        const t = d[1]===1 ? .5 : k/(d[1]-1);
        const ang = a0 + t*(a1-a0);
        const px = cx + Math.cos(ang)*RING, py = cy + Math.sin(ang)*RING;
        const cls = d[2]==="import" ? "own" : d[2]==="empty" ? "hole" : "seed";
        dots += \`<circle cx="\${px.toFixed(1)}" cy="\${py.toFixed(1)}" r="\${d[2]==="empty"?4.4:3.4}" class="nd \${cls}"/>\`;
        if (d[2]==="empty"){
          const right = Math.cos(ang) > 0;
          mark = \`<circle cx="\${px.toFixed(1)}" cy="\${py.toFixed(1)}" r="9" class="ring"/>\`
               + \`<text x="\${(px + (right?-13:13)).toFixed(1)}" y="\${(py+3).toFixed(1)}" class="pin"
                    text-anchor="\${right?"end":"start"}">warranty resolution</text>\`;
        }
      }
      const lx = cx + Math.cos(am)*(RING+24), ly = cy + Math.sin(am)*(RING+24);
      const anch = Math.abs(Math.cos(am)) < .35 ? "middle" : (Math.cos(am) > 0 ? "start" : "end");
      labs += \`<text x="\${lx.toFixed(1)}" y="\${(ly+3).toFixed(1)}" class="dl" text-anchor="\${anch}">\${d[0]}</text>\`;
    });
  }
  const n = mode === "full" ? "134 processes across eight domains"
          : mode === "day0" ? "Day 0: ten processes across five domains, nothing mapped"
          : "An empty estate: no processes mapped";
  return \`<div class="apf"><svg viewBox="0 0 \${W} \${H}" width="\${W}" height="\${H}" role="img"
      aria-label="\${n}">
    \${out}\${dots}\${mark}
    <circle cx="\${cx}" cy="\${cy}" r="17" class="core"/>
    <text x="\${cx}" y="\${cy + 3.5}" class="coret" text-anchor="middle">CRA</text>
    \${labs}</svg></div>\`;
}

function apCounters(extra){
  return \`<div class="ap-stat">
    <div><b>1,486</b><span>entities</span></div>
    <div><b>134</b><span>processes</span></div>
    <div><b class="warn">11</b><span>unowned</span></div>
    <div><b>47%</b><span>mapped</span></div>
    \${extra || ""}</div>\`;
}

function apTop(title, seg){
  return \`<div class="apbar"><h4>\${title}</h4>
    <span class="ap-seg">\${["Radial","Treemap","Table"].map(s =>
      \`<span class="\${s === seg ? "on" : ""}">\${s}</span>\`).join("")}</span></div>\`;
}

/* 21 - the payoff. Coverage lens. */
function estateView(){
  return cartographerChrome(\`<div class="mw">
    \${apTop("Cobalt Ridge Automation · Map of work", "Radial")}
    \${apCounters()}
    <div class="apwrap">\${apFlower("cov")}
      <div class="apside">
        <span class="lbl">Lens</span>
        <div class="aplens"><span class="on">Coverage</span><span>Ownership</span><span>Rings</span></div>
        <div class="apkey">
          <span><i style="background:#038108"></i>65% and above</span>
          <span><i style="background:#ffb40e"></i>40 to 64%</span>
          <span><i style="background:#cc3d45"></i>under 40%</span>
        </div>
        <div class="pcard pad">
          <span class="lbl" style="margin-bottom:6px">Ninety days of surveying</span>
          <div class="mw-item"><span class="n">01</span><span class="t"><b>Warranty resolution is the best mapped process here.</b>
            <u>It started as the one empty dot. Compare this against the first screen of the demo.</u></span></div>
          <div class="mw-item"><span class="n">02</span><span class="t"><b>Nine rules are written down that only lived in people's heads.</b>
            <u>The newest came out of decisions Sarah's team made while the process was running.</u></span></div>
          <div class="mw-item"><span class="n">03</span><span class="t"><b>Coverage is an average, not a count.</b>
            <u>Seventy six processes have some map. Weighted across all 134, coverage is 47%.</u></span></div>
        </div>
      </div></div>
  </div>\`, "estate");
}

/* 22 - the same coverage as a table, grouped by domain and owner. */
function estateTableView(){
  const PROC = {
    "Eng &amp; Quality":[["Repeat-failure link","",1],["Deviation approval","",1],["CAPA intake","Reliability",0]],
    "Field Service":[["Dispatch &amp; scheduling","Regional Svc",0],["On-site diagnosis","Regional Svc",0]],
    "Parts &amp; Logistics":[["Substitution approval","",1]],
    "Warranty Ops":[["Claim adjudication","Warranty Ops",0],["Evidence collection","Warranty Ops",0]]
  };
  const rows = ESTATE.filter(d => PROC[d[0]]).map(d => {
    const head = \`<tr class="grp"><td>\${d[0]}</td><td class="num">\${d[1]}</td>
      <td><span class="pct"><i><u style="width:\${d[2]}%;background:\${EST_HEX[EST_BAND(d[2])]}"></u></i>\${d[2]}%</span></td>
      <td>\${d[3] ? \`<span class="apchip un">\${d[3]} unowned</span>\` : \`<span class="apchip ok">all owned</span>\`}</td></tr>\`;
    const kids = PROC[d[0]].map(p => \`<tr><td style="padding-left:26px;color:var(--ap-ink-500)">\${p[0]}</td>
      <td class="num"></td><td class="num">\${p[1] || "—"}</td>
      <td>\${p[2] ? \`<span class="apchip un">unowned</span>\` : ""}</td></tr>\`).join("");
    return head + kids;
  }).join("");
  return cartographerChrome(\`<div class="mw">
    \${apTop("Map of work · Table", "Table")}
    <table class="apt"><thead><tr><th>Domain and process</th><th>Processes</th><th>Mapped</th><th>Owner</th></tr></thead>
      <tbody>\${rows}</tbody></table>
    <p style="font-size:11.5px;color:var(--ap-ink-500);line-height:1.55;max-width:760px">The same coverage as the
      radial, grouped by domain and owner. Engineering and Quality is the weak corner: four of its fourteen processes
      have nobody accountable, and two of them decide something.</p>
  </div>\`, "estate");
}

/* 23 - ownership lens: the processes nobody is accountable for. */
function estateOwnView(){
  return cartographerChrome(\`<div class="mw">
    \${apTop("Map of work · Ownership", "Radial")}
    \${apCounters()}
    <div class="apwrap">\${apFlower("own")}
      <div class="apside">
        <span class="lbl">Lens</span>
        <div class="aplens"><span>Coverage</span><span class="on">Ownership</span><span>Rings</span></div>
        <div class="apkey">
          <span><i style="background:#0067df"></i>has a named owner</span>
          <span><i style="background:#fff;border:1.5px solid #cc3d45"></i>nobody accountable</span>
        </div>
        <div class="pcard pad">
          <span class="lbl" style="margin-bottom:6px">Eleven of 134 have no owner</span>
          <div class="mw-item"><span class="n">01</span><span class="t"><b>Four sit in Engineering and Quality.</b>
            <u>Repeat-failure link and deviation approval both decide something and answer to nobody.</u></span></div>
          <div class="mw-item"><span class="n">02</span><span class="t"><b>Two sit in Parts and Logistics.</b>
            <u>Substitution approval is one of them, which is the rule this demo just wrote down.</u></span></div>
          <div class="mw-item"><span class="n">03</span><span class="t"><b>Ownership blocks routing.</b>
            <u>A process with no owner has nowhere to send an exception, so it leaves the system.</u></span></div>
        </div>
      </div></div>
  </div>\`, "estate");
}

/* 24 - twelve findings by kind and source. Called Suggestions. */
function estateFindView(){
  const F = [
    ["contradiction","pur","The two flows do not join up","Settled on warranty resolution. The same pattern is still open on three other cross-department handoffs.",1],
    ["signal","blu","Telemetry leads the phone call by 74 minutes","Sentinel alarms fire first and warranty has no Sentinel login. Meridian runs 88 minutes.",1],
    ["proposal","ok","Auto-adjudicate the obvious 90%","Coverage decision, 4.2 days down to 4 hours. Awaiting your review.",1],
    ["drift","amb","AssetVault drifts from the floor","Twenty three percent of asset records disagree with what is installed.",0],
    ["signal","blu","Claims fail the first coverage review","Fifty seven percent come back for more evidence before anyone can decide.",0],
    ["signal","blu","Substitution decided by phone","Three days, and recorded nowhere. This is the rule the demo just captured.",0],
    ["drift","amb","Cost truth posts 30 to 60 days late","Four thousand one hundred and eighty dollars unexplained on the last close.",0],
    ["signal","blu","Repeat failures are not linked","Fourteen percent of claims are repeats and 22% reach an investigation.",0]
  ];
  return cartographerChrome(\`<div class="mw">
    <div class="apbar"><h4>Cartographer · Suggestions</h4>
      <span class="ap-seg"><span class="on">All 12</span><span>Assigned to you · 3</span></span></div>
    <div class="apfind">\${F.map(f => \`<div class="f\${f[4] ? " mine" : ""}">
      <div class="h"><span class="apchip \${f[1]}">\${f[0]}</span>\${f[4] ? \`<span class="apchip blu">yours</span>\` : ""}</div>
      <b>\${f[2]}</b><p>\${f[3]}</p></div>\`).join("")}</div>
    <p style="font-size:11.5px;color:var(--ap-ink-500);line-height:1.55;max-width:800px">Twelve findings across the
      estate, sorted by kind and by where the evidence came from. Four more sit below the fold. Three are assigned to
      the person looking at this screen.</p>
  </div>\`, "estate");
}

/* 25 - Home: what to work on next. */
function estateHomeView(){
  const R = [
    ["Name an owner for the claim end to end","Adjudication has an owner. The claim itself does not, so exceptions have nowhere to go. This one is above Priya.","blocks everything","blk"],
    ["Auto-adjudicate the obvious 90%","Six and a half of the 11.4 days sit inside warranty operations. Measured baseline, one authority to change it.","4.2 d → 4 h",""],
    ["Write the substitution rule down and record it","Submitted, awaiting the VP gate. Came out of a decision Sarah's team made on a live claim.","−$3.1M",""],
    ["Link repeat failures to QualityOne","Fourteen percent of claims are repeats. Four in five never reach an investigation.","22% → 80%",""]
  ];
  return cartographerChrome(\`<div class="mw">
    <div class="apbar"><h4>Cobalt Ridge Automation · Home</h4></div>
    <div class="ap-stat">
      <div><b>47%</b><span>estate mapped, up 6 this quarter</span></div>
      <div><b>9</b><span>rules written down</span></div>
      <div><b class="warn">11</b><span>unowned, blocks routing</span></div>
    </div>
    <span class="lbl">What to work on next</span>
    <div class="aphome">\${R.map((r, i) => \`<div class="r"><span class="n">\${i + 1}</span>
      <span class="bd"><b>\${r[0]}</b><p>\${r[1]}</p></span>
      <span class="win \${r[3]}">\${r[2]}</span></div>\`).join("")}</div>
  </div>\`, "estate");
}

/* 26 - the unmapped, as a working queue. */
function estateBacklogView(){
  const B = [
    ["Substitution approval", 9, "—", 0], ["Repeat-failure link", 12, "—", 0],
    ["Deviation approval", 18, "—", 0], ["On-site diagnosis", 26, "Regional Svc", 1],
    ["Goodwill decisions", 28, "—", 0], ["CAPA intake", 34, "Reliability", 1],
    ["SLA credit assessment", 37, "Commercial", 1]
  ];
  return cartographerChrome(\`<div class="mw">
    <div class="apbar"><h4>Map of work · Unmapped · 58</h4>
      <span class="ap-seg"><span>Under 40%</span><span class="on">Unowned</span><span>Has telemetry</span></span></div>
    <table class="apt"><thead><tr><th>Process</th><th>Mapped</th><th>Owner</th><th></th></tr></thead>
      <tbody>\${B.map(b => \`<tr><td>\${b[0]}</td>
        <td><span class="pct"><i><u style="width:\${b[1]}%;background:\${EST_HEX.lo}"></u></i>\${b[1]}%</span></td>
        <td>\${b[2] === "—" ? \`<span class="apchip un">unowned</span>\` : \`<span style="color:var(--ap-ink-500)">\${b[2]}</span>\`}</td>
        <td style="text-align:right"><span class="apbtn sec">Map this</span></td></tr>\`).join("")}</tbody></table>
    <div style="display:flex;gap:8px;align-items:center">
      <span class="apbtn pri">Assign one to a business analyst</span>
      <span class="apbtn sec">Export</span>
      <span style="font-size:11px;color:var(--ap-ink-500);margin-left:4px">Fifty one more below</span>
    </div>
  </div>\`, "estate");
}

/* ==========================================================
   AUTOMATION HUB - the design becomes a governed record.
   This is the screen Max built in his prototype at /repository,
   re-framed from PO Intake to warranty. It is the beat where the
   PDD stops being a document in a chat and becomes something with
   an owner, a risk tier, a compliance scope and a sign-off - which
   is what makes the handoff to a coding agent auditable.
   Numbers are Jose's PDD; personas are Max's and Jose's, which agree.
   ========================================================== */
function governanceView(){
  const gov = [
    ["Process ID","CRA-PRC-4712",true],
    ["Business unit","Global Warranty Operations",false],
    ["Data classification","Confidential — Internal",false],
    ["Compliance scope","SOX · GDPR · SOC 2",false],
    ["Risk tier","Tier 2 — Medium",false],
    ["Review cadence","Quarterly",false],
    ["Next review","Sep 30, 2026",false],
    ["Approval status","Approved · Automation Council",false]
  ].map(g=>\`<div><span>\${g[0]}</span><b class="\${g[2]?"mono":""}">\${g[1]}</b></div>\`).join("");
  const toc = [
    ["1. Executive Summary",0,1],["2. Process Overview",0,0],
    ["3. Process Summary",0,0],["4. Process Detail",0,0],
    ["4.1 Intake and impact triage",1,0],["4.2 Coverage and evidence review",1,0],
    ["4.3 Diagnose and contain",1,0],["4.4 Resolution decision",1,0],
    ["4.5 Restore and validate",1,0],["4.6 Close and learn",1,0],
    ["5. Conditional paths",0,0],["6. Data and systems",0,0],
    ["7. Compliance and controls",0,0],["8. KPIs and SLAs",0,0]
  ].map(t=>\`<div class="\${t[1]?"sub ":""}\${t[2]?"on":""}">\${t[0]}</div>\`).join("");
  const sign = [
    ["PR","Priya Raghunathan","Director, Global Warranty Operations"],
    ["TB","Tom Beckerman","Senior Warranty Claims Administrator"],
    ["KN","Kelsey Nordstrom","Parts &amp; Logistics Planner"],
    ["RO","Ryan Ochoa","Product Quality Lead"]
  ].map(r=>\`<div class="ah-sr"><span class="av">\${r[0]}</span>
      <span class="rl"><b>\${r[1]}</b> · \${r[2]}</span>
      <span class="ah-pill ok">Approved</span></div>\`).join("");
  return cartographerChrome(\`<div class="ah">
      <div class="ah-main" style="width:100%">
        <div class="ah-top">
          <div class="ah-crumb"><b>Published records</b><span class="sep">/</span>Business processes
            <span class="sep">/</span>Industrial Equipment Warranty Resolution</div>
          <div class="ah-h1">
            <h2>Industrial Equipment Warranty Resolution</h2>
            <span class="ah-pill proc">Business process</span>
            <span class="ah-pill phase">Handoff</span>
            <span class="acts"><span class="ah-btn">Delegate</span>
              <span class="ah-btn">Studio</span></span>
          </div>
          <div class="ah-sub">v2 · Owner Priya Raghunathan · Updated Aug 25, 2026 ·
            one versioned entry, published where it was made</div>
        </div>
        <div class="ah-gov">\${gov}</div>
        <div class="ah-tabs"><span>Analysis</span><span>Diagram</span>
          <span class="on">Process Design</span><span>Solution Design</span></div>
        <div class="ah-doc">
          <div class="ah-toc">\${toc}</div>
          <div class="ah-body">
            <div class="dh"><h3>Industrial Equipment Warranty Resolution</h3>
              <span class="ah-btn" style="margin-left:auto">Download</span></div>
            <div class="dsub">Process Design Document · Version 2 · Approved</div>
            <h4>1. Executive Summary</h4>
            <p>Cobalt Ridge handles roughly <b>7,400 warranty claims a year</b>. Global Warranty
              Operations owns the process end to end, with six other functions joining at named
              stages. The trigger is a customer-reported failure; the close-out is a restored line,
              a validated outcome, and a reconciled cost posting.</p>
            <div class="ah-kpi">
              <div class="k"><span>Time to resolution</span><b>11.4 → 3.5 d</b>
                <u>Primary KPI, FY2027 target</u></div>
              <div class="k"><span>First-time fix</span><b>61 → 85%</b><u>Secondary KPI</u></div>
              <div class="k"><span>Annual claims</span><b>~7,400</b><u>Trailing 12 months</u></div>
            </div>
            <p>Six stages always run. Four more open only on an exception, which is what makes
              this a case rather than a straight line. Forty-four pieces of work sit across them:
              ten agent tasks, seven processes, seven API calls and <b>twenty human decisions</b>.
              Three constraints are marked as <b>unable to change</b> in any build: the coverage
              rationale is written, the recurrence gate blocks closure, and substitutions off the
              approved list go to engineering.</p>
            <div class="ah-sign">
              <div class="sh"><span>Stakeholder sign-off</span>
                <span class="ah-pill ok" style="margin-left:auto">All four approved</span></div>
              \${sign}
            </div>
          </div>
        </div>
      </div>
    </div>\`, "record");
}


/* The human decision, as a console rather than a form. Alin's ask on the
   25 Aug call; Tuan named the three evidence sources. The evidence is
   readable here, not linked, which is what gives the combined-cause call
   a spine. Exactly one decision on the screen, and the rail decides nothing. */
function consoleView(){
  /* Simplified 26 Aug on Robert's note that it was still too busy to follow
     from a keynote seat. Five visual objects, not fourteen: the identity
     strip, Alin's widget lane, the two causes, one supporting-detail line,
     and the decision. Vikram's six facts survive as one strip rather than
     six cards; the detail he wanted progressively disclosed is one row. */
  const FACTS = [
    ["Claim","Warranty &middot; combined cause"],
    ["Claim ID","WR-2026-0417"],
    ["Customer","Northstar Retail Distribution"],
    ["Transaction","$16,272.50 &middot; 4 lines"],
    ["Issue","Two causes, different payers"],
    ["Recommended","Partial coverage + goodwill"]
  ].map((f,i)=>\`<div\${i===5?' class="rec"':''}><span>\${f[0]}</span><b>\${f[1]}</b></div>\`).join("");
  const SPLIT = [
    ["Parts &mdash; failed in its rated life","8,450.00","",false],
    ["Labour &mdash; caused by the change","","2,682.50",false],
    ["Travel &mdash; goodwill","1,240.00","",true],
    ["Freight &mdash; the expedite it caused","","3,900.00",false]
  ].map(r=>\`<div class="cn-srow"><span class="nm2">\${r[0]}</span>
      <span class="a \${r[1]?(r[3]?"gw":""):"z"}">\${r[1]||"&mdash;"}</span>
      <span class="a \${r[2]?"":"z"}">\${r[2]||"&mdash;"}</span></div>\`).join("");
  return \`<div class="cn">
    <div class="cn-top"><span class="lg">C</span>
      <span class="nm">Warranty Resolution Console</span>
      <span class="who"><span><b>Sarah Chen</b><u>Warranty Resolution Lead</u></span><i>SC</i></span></div>

    <div class="cn-idstrip">\${FACTS}</div>
    <div class="cn-slaline"><span class="ptag yl">Action required</span>
      <span>Line down since the 06:14 alarm &middot; ready for a decision in 1 hr 38 min, against a 4.2-day baseline</span>
      <span class="pmono" style="margin-left:auto">DUE 1:46 PM</span></div>

    <div class="cn2">
      <div class="cn-lane">
        <span class="lbl tl" style="margin-bottom:6px">Signal capture &middot; Cartographer widget &middot; 302 px lane</span>
        <div class="rowu">Service report<i class="on">&#10003; useful</i></div>
        <div class="rowu">Config baseline<i class="on">&#10003; useful</i></div>
        <div class="rowu">Controls audit<i>&mdash;</i></div>
        <div class="agg">Across similar combined-cause claims, 78% ended in partial plus goodwill.</div>
        <div class="pmono" style="margin-top:6px;font-size:7.5px">NON-BLOCKING &middot; NEVER DECIDES</div>
      </div>

      <div class="col">
        <div class="cn-cause2">
          <div class="cn-cause pro"><span class="lbl">Cause 1 &middot; on us</span>
            <h5>The part failed early</h5>
            <p>Bearing failed at <b>4,100 of 20,000 rated hours</b>. A manufacturing defect, not overload.</p>
            <span class="pts">&rarr; Points to covered</span></div>
          <div class="cn-cause con"><span class="lbl">Cause 2 &middot; on them</span>
            <h5>The machine was changed without approval</h5>
            <p>Torque limit raised <b>19% above the approved envelope</b>, with no sign-off. ESA &sect;4.2 requires it in writing.</p>
            <span class="pts">&rarr; Points to excluded</span></div>
        </div>
        <div class="cn-verdict"><b>Both are established. Neither is sole.</b>
          <p>No rule resolves a combined cause &mdash; which is why it is in front of a person.</p></div>
        <div class="cn-more"><span class="chev">&rsaquo;</span>
          <span>Policy test, the four cost lines, three evidence sources and the prior claim
            <b>WR-2025-0331</b> &mdash; all one click away</span></div>
      </div>

      <div class="cn-dec">
        <div class="dhd"><b>The decision</b><span class="ptag yl" style="margin-left:auto">Yours</span></div>
        <div class="dbody">
          <div class="cn-opt"><span class="rad"></span><span><b>Deny</b></span></div>
          <div class="cn-opt"><span class="rad"></span><span><b>Approve in full</b></span></div>
          <div class="cn-opt on"><span class="rad"></span><span>
            <b>Split it &mdash; partial + goodwill <span class="ptag tl">Recommended</span></b></span></div>
          <div class="cn-split">
            <div class="shd"><span class="lbl">Who pays</span>
              <span class="h">Cobalt&nbsp;Ridge</span><span class="h">Customer</span></div>
            \${SPLIT}
            <div class="cn-srow tot"><span class="nm2">Total</span>
              <span class="a">9,690.00</span><span class="a">6,582.50</span></div>
          </div>
          <div class="cn-auth">
            <div class="atop"><span class="lbl">Your authority</span><b>$9,690 of $10,000</b></div>
            <div class="cn-meter"><i style="width:96.9%"></i></div>
            <div class="amsg">&#10003; You sign this alone. A denial goes to the VP.</div>
          </div>
          <div class="cn-agree">
            <span class="lbl">And the reasoning</span>
            <div class="cn-tri on"><span class="rad"></span>I agree with the reasoning</div>
            <div class="cn-tri"><span class="rad"></span>I agree, but keep asking me</div>
            <div class="cn-tri"><span class="rad"></span>Stop asking for cases like this</div>
          </div>
        </div>
        <div class="cn-foot">
          <span class="btn primary">Submit</span>
          <span class="esc">RATIONALE ATTACHED &middot; WRITES TO THE LEDGER</span>
        </div>
      </div>
    </div>
  </div>\`;
}

// ---------- acts & scenes ----------
const ACTS = [
  {t:"Act I &middot; Map the work", goal:"From a genuinely empty map to a governed record: the cartographer agent reads what this company already had, draws the work gap and all, asks a person the one thing the documents could not say, and the people who own the work correct it. Four names end up against the result.", rt:"~7 MIN", scenes:[
    {actor:"Human", who:"Priya Raghunathan · Director, Global Warranty Operations", views:["mapempty"], status:"partial", short:"Nothing surveyed yet",
     frameLabel:"Cartographer · the empty estate",
     title:"At the start, the whole map is empty",
     narr:"Max's frame 01, now shown as it actually is: a genuinely empty estate — domains exist because the org chart does, nothing else. THE OPENING IS STILL UNDECIDED: Max and Raghu lean toward opening on the finished estate and descending; Anvita's alternative opens in Delegate on the Use Case Explorer. Pick one on Thursday.",
     tt:"This is the starting point, and it is honestly empty. Twelve hundred people do work here every day, and none of it is written down anywhere a system can read. So the first thing the product does is ask what this company already has.",
     demo:["Let the emptiness sit for a beat. Say nothing for two seconds.","Do not show any processes yet. Setup is next; this one is day nothing.","Decision needed: this opening, the finished estate, or the Use Case Explorer."]},
    {actor:"Human", views:["setup"], status:"built", short:"What do you already have?",
     frameLabel:"Cartographer · initial setup, step 2 of 4",
     title:"It asks one question first: what do you already have?",
     narr:"Max's frame 02, restored — a real screen in his prototype, and the merge lost it. One question, four checkboxes, two of them already ticked. This is the import experience Robert asked for; the four ways in are a decision the user makes, not a caption we read out.",
     tt:"Before anything is drawn, it asks one question. What do you already have? Processes modelled in Maestro — it found three. Seed candidates for your industry, which is manufacturing here. Documents, diagrams and recordings. Or nothing at all, and you build it one conversation at a time. Two are already ticked because the system checked. And read the line under the heading: anything you pick is a starting point, not a commitment.",
     demo:["One question on screen. Do not rush it — this is the shape of the whole product.","Say two are pre-ticked because it already looked.","Read 'a starting point, not a commitment' out loud. It defuses the accuracy objection."]},
    {actor:"System", views:["maestroimport"], status:"built", short:"Three models, with run history",
     frameLabel:"Cartographer · import from Maestro, step 3 of 4",
     title:"Maestro hands over three running processes, with ninety days of history",
     narr:"Max's frame 03, restored. The three BPMN models are his, verbatim, with real run counts and owners. The two side notes are the argument: what the import gives you, and what it cannot do — and the second one is where warranty resolution becomes the empty red dot.",
     tt:"Three models come across, and they are not documents — they are the processes that actually run. Spare-parts fulfilment, twelve hundred runs in ninety days. Purchase order to invoice matching, nearly three thousand. Returns authorisation, four hundred and ten. Each arrives already drawn, with an owner named and a cycle time measured from executions rather than from interviews. And then the honest part, on the right: Maestro only knows the work that runs. Warranty resolution has no model. It arrives as an empty red dot, and that is the point of the whole demo.",
     demo:["Name one run count. Numbers from runs, not interviews, is the claim.","Then read the 'what it can't do' box. It sets up the empty dot on the next frame.","Import 3 models, and move."]},
    {actor:"System", views:["day0"], status:"build", short:"Day 0: three imported, four seeded",
     frameLabel:"Cartographer · day 0",
     title:"Day 0: ten processes on the map, and the one that matters is empty",
     narr:"Max's frame 04, with his numbers: ten processes across five domains, 0% median coverage. Three came from the import, seven are industry seeds, and warranty resolution is the empty red dot his import screen promised. The estate payoff in Act IV must call back to THIS frame.",
     tt:"Day zero, and here is the whole estate: ten processes across five domains, median coverage zero. Three of them came across from Maestro with real history. Seven are seeds — candidates, not knowledge. And there it is, the empty red dot. Warranty resolution runs every day, it touches revenue, and nobody has ever written it down. Hold this picture. The whole demo is the story of what happens to it.",
     demo:["Name the three imported and the four seeded. Small numbers are fine, they are honest.","Point at the empty slot and promise to come back to this exact picture.","This is the bookend for the day-90 estate in Act IV."]},
    {actor:"System", views:["uce"], status:"build", short:"Or start from an attested process",
     frameLabel:"Cartographer · Use Case Explorer",
     title:"Rather than start from nothing, pick a process UiPath has already mapped",
     narr:"Anvita's candidate opening, and her ask regardless: show the Use Case Explorer living inside the Cartographer agent. Pick a process UiPath has already mapped and had reviewed, and let this company correct it rather than invent it.",
     tt:"There is a shortcut. Some processes we have already mapped, reviewed with industry experts, and published. Warranty resolution is one of them. So this company starts from a process that already has stages, owners, rules and a data model, instead of from a blank map, and their job becomes correcting it. Everything here is a starting point, not a commitment.",
     demo:["Show the curated list with warranty resolution highlighted.","Say attested, reviewed, published, and mention the process skills behind it.","Don't claim it is finished. The next four scenes are this company correcting it."]},
    {actor:"System", views:["project"], status:"build", short:"Sources and people, attached",
     frameLabel:"Cartographer · project",
     title:"The project opens with the sources, the people and the deliverables attached",
     narr:"Max's frame 05, restored — it is what makes the one-prompt beat credible, and it carries Anvita's collaboration ask. Five sources with live cite counts (one in conflict, one that nothing cites), ten stakeholders split into in-Cartographer and mentioned-only, four deliverables named up front.",
     tt:"Before the first prompt runs, look at what the project already holds. Five sources, and the agent will cite them line by line — the kickoff interview seventeen times, the old Visio sketch is flagged because it disagrees with the risk table, and the 2019 handbook gets cited exactly zero times, which tells you something about the handbook. Ten people, two already working in here, eight named by the sources. And the four deliverables are declared before any work starts: the analysis, the diagram, the process design, the solution design.",
     demo:["Read the cite counts, especially the zero. Honesty is the feature.","Name the conflict — two sources disagree — and say it gets resolved by a person, not silently.","The four deliverables here are the four tabs on the published record in scene 11."]},
    {actor:"Agent", views:["scribe"], status:"partial", short:"Sources read, analysis written",
     frameLabel:"Cartographer · analysis",
     title:"One prompt, and the agent reads everything the company did have",
     narr:"Max's frames 06, 08 and 10 compressed into one frame &mdash; deliberately, since the intake prompt and the volume question are each a single sentence of talk track. What the frame shows is his frame 10, the Analysis artifact: 77 findings across fifteen sections, each with its own completeness reading, alongside the six-stage progress rail his product actually has. Corrected 26 Aug: this scene used to render a finished PDD, which put the deliverable before the map and contradicted its own talk track.",
     tt:"One prompt, and the documents this company already had: an as-is deck, a Visio diagram, an interview with the process owner, and a workshop recording. It reads all of it and comes back with the stages, the systems each one touches, and where the checkpoints are. It also asks me the one thing no document could answer, which was annual claim volume, because that number sizes everything downstream. I answer it inline and it publishes the analysis.",
     demo:["Run this in the real product wherever it exists.","One montage, not three demos: prompt, the one question, the analysis.","Point at a thin section. It admits what it does not have yet.","End on 77 findings across 15 sections."]},
    {actor:"System", views:["mapwip"], status:"build", short:"62% done, and honest",
     frameLabel:"Cartographer · map of work, in progress",
     title:"The map is 62% complete and honest about the rest",
     narr:"Key frame. Every step carries an owner, a system, a rule, and whether anything is recorded when a person decides. The gaps are drawn as gaps. This is also where case and workflow steps get named out loud, because that distinction decides what gets built in scene 08.",
     tt:"Here is the map so far, and the useful thing about it is what it admits. Every step has an owner, the systems it touches, whether a rule was ever written down, and whether anything gets recorded when a person decides. Look at step five. Somebody substitutes a part, no rule is stated, and nothing is recorded. And look at the colours along the top. Some of these steps run start to finish on their own. Others wait on a person or on the customer, and those are the ones that make this a case rather than a straight line.",
     demo:["Point at step 05 and say the rule was never written down.","Name the case versus workflow colours. This is the setup for the case plan.","Read the three open items, then move."]},
    {actor:"System", views:["mapdiagram"], status:"build", short:"The map, drawn, gap and all",
     frameLabel:"Cartographer · diagram",
     title:"The same map, drawn, and the missing rule is drawn as a gap, not smoothed over",
     narr:"Max's frame 15, restored. Both department flows stitched into one picture; the substitution step renders as a dashed gap because a decision with no rule is a gap in the map, not an empty field. His live prototype draws exactly this idiom on the record's Diagram tab (see the 26 Aug capture).",
     tt:"And the map is not just a table — it draws itself. Two departments, stitched into one flow, case steps in blue, straight-through steps in purple. And look at substitution. The diagram refuses to smooth it over. It is drawn as a gap, dashed, because the map cannot say what happens next when nobody ever wrote the rule down.",
     demo:["Let the room read the diagram; it is faster than the bands.","Point at the dashed node. The drawing-the-gap idiom is the honesty beat, visualised.","This diagram is also a tab on the published record later — same artifact, governed."]},
    {actor:"Agent", views:["sme"], status:"build", short:"The gap goes to Kelsey",
     frameLabel:"Cartographer · delegation",
     title:"The gap goes to Kelsey as four questions, and she answers them the same day",
     narr:"Max's frame 13, restored — the collaboration beat he walked on the 25 Aug call, and the only one where the agent pulls a human in rather than being corrected afterwards. Recast to our cast: the substitution questions route to Kelsey Nordstrom with a link she answers herself. Her 'nothing gets recorded' answer is the finding that seeds the Act IV rule.",
     tt:"The documents have been read and the answer is not in them, so the agent stops guessing and asks. Four questions, routed to the person the sources name for parts, with a link she opens herself. Sent at ten forty-one, answered by two. And her fourth answer is the finding: when a substitution is approved today, nothing gets recorded. The map writes that down as fact — and it is the same gap that becomes a written rule at the end of this demo.",
     demo:["Say the agent asked a person, and name her. Delegation, not hallucination.","Read answer four out loud. 'Nothing' is the setup for Act IV.","Same-day turnaround matters: the map never sat waiting."]},
    {actor:"System", views:["mapdone"], status:"build", short:"Complete, and it says why",
     frameLabel:"Cartographer · map of work, complete",
     title:"Now every step names its owner, its rule, and whether anything is recorded",
     narr:"All open items answered. The panel underneath says plainly why this is a case: four of six steps wait on somebody, and four more paths open only when something goes wrong.",
     tt:"The open items are answered, and now every step has an owner, a system, a rule and a record. The map has told us something before anybody has built anything. Four of these six steps wait on a person or on the customer, and there are four more paths that only open when something goes wrong. That is not a straight-through process, and that shape is what decides how we build it.",
     demo:["Contrast against the previous frame. The gaps are gone.","Read the why-this-is-a-case panel. It is the hinge into the build."]},
    {actor:"Human", views:["review"], status:"build", short:"They push back, the map changes",
     frameLabel:"Cartographer · review",
     title:"Then the people who own the work correct it, and the map changes",
     narr:"Shared with four named people who own the work. They comment, they correct, and accepted edits change the map and bump the version. One is still open, which is honest.",
     tt:"Then it goes to the people who actually own this work, and they correct me. Coverage does not sit with field service, it sits with warranty operations, and the written rationale is a requirement. Substitution needs an equivalence standard, not just an approver. And two failures on the same machine inside a year is a repeat failure that should stop a case from closing. Three of those became changes to the map. One is still open, because somebody has to decide whether the weekly coverage board survives at all.",
     demo:["Show four named reviewers, not anonymous avatars.","Three accepted, one still open. Don't pretend everything resolved.","Note the version bumped."]},
    {actor:"System", views:["governance"], status:"build", short:"The design becomes a governed record",
     frameLabel:"Cartographer · published record",
     title:"The design is now a record with an owner, a risk tier and four signatures",
     narr:"NEW, and not something the group has reviewed yet. Max built this record in his prototype (branded Automation Hub there); Robert pulled the AH branding on 26 Aug since no call chose it, so it renders as Cartographer&rsquo;s own publish surface. The content is the point: one versioned entry, an owner, a risk tier, a compliance scope, a review date, four sign-offs, and three constraints marked unable to change. Which product hosts it is a Thursday question.",
     tt:"Before any of this reaches a builder, it lands here. The design, the diagram and the solution architecture publish as one versioned, governed entry, and it stops being a document in a chat window. It has an owner. It has a risk tier and a compliance scope, because a warranty claim touches revenue recognition and customer data. It has a review date. And it has four names against it, from the people who corrected the map two screens ago. That is what makes the next step something an auditor can follow rather than something that just happened.",
     demo:["Walk the governance strip once: owner, risk tier, compliance scope, approval status.","Point at the four sign-offs and tie them back to the review scene.","Flag to the group that this screen is new and not yet agreed."]},
  ]},
  {t:"Act II &middot; Build it", goal:"A coding agent takes that record and turns it into a running Maestro case, carrying the rules it was given across into the build. Changing one of them afterwards is a sentence, not a project.", rt:"~2 MIN", scenes:[
    {actor:"Agent", views:["agentbuild"], status:"build", short:"The design goes to the coding agent",
     title:"That record stops being the deliverable and becomes the input",
     narr:"The handoff. The approved design, with the corrections the business made, goes to the coding agent. It proposes stages, the data model, tasks, integrations and rules, and waits for approval.",
     tt:"Now the document stops being the deliverable and becomes the input. The approved design goes to the coding agent, and it comes back with a proposal first: the stages, the data model, the tasks, the integrations, the rules. I read it, adjust it, approve it. Every part of it cites the clause and the map step it came from, so I am reviewing decisions rather than re-deriving them.",
     demo:["Show a prepared session.","Say the traceability line out loud: every activity carries its clause.","Don't type the prompt live."]},
    {actor:"System", views:["plan"], status:"build", short:"A case plan, not a folder of activities",
     frameLabel:"Design time &middot; Studio &middot; the case plan it produced",
     title:"A coding agent turns the record into a case plan, not a folder of activities",
     narr:"The map said this work waits, branches and needs approvals, so what gets built is a Maestro case: six primary stages, four conditional ones, forty-four pieces of work.",
     stagesToShow:"base",
     tt:"And here is what it built. Not a folder of activities, a Maestro case. Six stages that every claim runs, four more that only open when something goes wrong, and forty-four pieces of work across them. Remember the map telling us this work waits on people and branches when things go wrong. That is why this is a case. The map decided the shape, and the shape is what got built.",
     demo:["Say plainly that the output is a case plan.","Tie each conditional stage back to a path the map surfaced.","Open one stage and show the agent, API, process and human task together."]},
    {actor:"System", views:["casemanager"], status:"build", short:"The rules it carried across",
     frameLabel:"Design time &middot; Studio &middot; what the coding agent produced",
     title:"The rules the reviewers wrote down are the rules the case agent now reads",
     narr:"The case agent, in its design-time register. The rules the reviewers wrote down are the rules it reads at run time. Framed as coding-agent output, not as a tour of the designer.",
     tt:"And the rules the reviewers gave me in the review are these rules. The equivalence standard for a substitution. The repeat-failure gate before a case can close. They came out of a conversation with the people who own the work, and now a case agent reads them at run time and works out the next best action when no rule fully settles the question.",
     demo:["Point at two rules and name the reviewer each came from.","Don't tour the designer. One look, then move on."]},
    {actor:"Agent", views:["liveedit"], status:"build", short:"Change a rule live",
     title:"When the business changes a rule, the coding agent makes the change",
     narr:"Close should now wait on a recurrence review. Tell the coding agent what changed and it finds the stage and rules affected, adds the gate, and brings the change back. That is the first outcome: building and changing this takes hours, not release cycles.",
     tt:"Now the business changes its mind. Before a case can close, somebody has to check whether this failure has happened before. Normally that is a change request, a development cycle, and another round of translation. Here I tell the coding agent what changed. It finds the stage and the rules involved, adds the gate, updates the routing, and brings the change back to me.",
     demo:["Submit the change live.","Show the affected stage found, the gate added, the rules updated.","Stop talking while the agent works."]}
  ]},
  {t:"Act III &middot; Run it", goal:"Most claims finish without anybody. The few that reach a person arrive assembled, and what the person does there is captured. The act ends when the case does.", rt:"~4 MIN", scenes:[
    {actor:"System", views:["opsdash"], status:"build", short:"93 out of 100 need nobody",
     frameLabel:"Fleet-wide view &middot; Performance tab",
     title:"Once it runs, 93 out of every 100 claims finish without a person",
     narr:"Lead with this, before the Case App and before Sarah. Anvita's sequencing, backed by Raghu. Hold on to the 93, because the last act moves it. Note the tab says Performance, not Insights: this is the case overview, not the Insights product, and labelling it Insights would claim we are showing something we are not.",
     tt:"Let me start with the whole operation rather than one case. Ninety three percent of warranty claims are finishing on their own, start to end, without anybody moving them along. I can see which ones are at risk of missing their target and where work is piling up. Hold on to that ninety three, because I am going to come back to it. Now let me show you the seven percent that do reach a person.",
     demo:["Open Performance first. This is the establishing shot for the act.","Say 93 percent and flag that you will return to it.","Don't introduce Sarah yet."]},
    {actor:"Human", who:"Sarah Chen &middot; Warranty Resolution Lead", views:["worklist"], status:"build", short:"A short queue, each with a reason",
     frameLabel:"Personal queue &middot; Cases tab",
     title:"The seven that need a person reach Sarah, and each says why it is there",
     narr:"Now the Case App, built by the coding agent two acts ago. Her queue holds only the claims where her judgment can change the outcome.",
     tt:"This is the warranty resolution lead's own view, and it is the app the coding agent built. Traditionally her day starts with every claim in a queue, each one something she has to open, understand, chase and push forward. Here the queue holds only the ones where a person can change the outcome, and each one tells her why it is there.",
     demo:["Say out loud that this app came out of the coding agent.","Show the short list with the reason beside each case."]},
    {actor:"Human", who:"Sarah Chen", views:["ac"], status:"built", short:"One decision, in a console",
     frameLabel:"Runtime &middot; Case App &middot; the console, with signal capture",
     title:"Everything she needs is on one screen, and what she marks useful is kept",
     narr:"Alin's console (vendored at vendor/alin-console/), reshaped 26 Aug to Vikram's feedback: the six facts he named sit legible at the top, supporting detail is collapsed to one-line rows that open on click, and only the two-cause finding stays expanded. Below the outcome, the tri-state agreement — agree / agree but keep asking / don't ask again for similar cases — with the editable rationale labelled as the learning signal the Act IV suggestions cite. The $10,000 authority meter at $9,690 stays; the widget owns the 302px left lane and never decides. Stage 4 per the SDD.",
     tt:"One glance and Sarah has the case: the claim, the customer, sixteen thousand across four lines, two causes pointing at different payers, and a recommendation. The detail is all here — the policy test, the cost lines, the prior history — but folded, one line each, opened only if she wants it. What stays open is the finding, because that is the judgment. The recommendation splits the claim by cause: nine thousand six hundred and ninety to Cobalt Ridge, three hundred and ten dollars under her limit, so she signs alone. And then the part that matters later: she does not just pick an outcome, she says whether she agrees with the reasoning, and she can tell it to stop asking for cases like this one. That sentence, in her words, is the learning signal.",
     demo:["Open the console and stop. Let the six facts at the top land before touching anything.","Open exactly one folded row to show detail exists on demand, then close it.","Point at the split, then the meter. $9,690 against $10,000 is the beat.","Read the tri-state out loud — agree, keep asking, stop asking — and say her rationale is the learning signal.","The widget lane is 302px on the left. Never put decision controls in it."],},
    {actor:"Event", views:["eventreassess"], status:"build", short:"New evidence, reassessed on its own",
     frameLabel:"Runtime &middot; Case App &middot; case detail",
     title:"New evidence arrives after her decision, and the case agent reassesses",
     narr:"The customer uploads photos after coverage was already decided. Nobody routes them. The case agent checks them against the earlier finding and sends the case to engineering rather than deciding a technical question itself.",
     tt:"The customer uploads photos of the failed drive through the portal, after coverage has already been decided. That upload becomes an event, and the event wakes the case agent, because new evidence can change a decision that has already been made. It checks the photos against the earlier finding and sends the case to engineering to confirm the cause. It does not decide the technical question itself, because confirming a defect from a photograph is a judgment call, not a rule. Nobody routed any of that.",
     demo:["Run it as one continuous sequence: upload, event, case agent picks it up, engineering path opens.","Say that the case agent chose the path and a person still makes the technical call."]},
    {actor:"System", views:["audittrail"], status:"build", short:"The execution trail, and the case finishes",
     frameLabel:"Runtime &middot; instance management",
     title:"The trail shows what rerouted it and who signed off, and the case closes",
     narr:"The case agent's second register, and the answer the group landed on for showing it: the execution trail. What triggered the decision, what action was selected, who signed off, next to the running case plan. Then engineering confirms, the machine is fixed, the customer signs off, and the case closes. This is where Act II ends.",
     tt:"Because this ran on its own, visibility matters more, not less. Here is the execution trail: what triggered the decision, the action the case agent selected, and who signed off, right next to the running case plan. When somebody asks why this claim went to engineering, the answer is part of the case. And remember the recurrence gate we added earlier. This running case can move onto that version without restarting. Engineering confirms the cause, the machine gets fixed, the customer signs off, and the case closes.",
     demo:["Show the trail: triggering event, action selected, who signed off.","Open Migrate and point at the version picker for the recurrence gate. Migrate is a bulk action from the list, not a button in the sidebar.","Point at Pause and Cancel but don't execute them.","End the act here. The bridge to Act III is spoken: I'm going to go to the decision ledger."]}
  ]},
  {t:"Act IV &middot; Improve it", goal:"Every decision people made along the way is on the record. Reading across it produces suggestions, one gets applied as a rule, and ninety days later the map of work is better than the one we started on.", rt:"~6 MIN", scenes:[
    {actor:"System", views:["ledger"], status:"build", short:"Every decision is on the record",
     frameLabel:"Cartographer &middot; Suggestions &middot; Ledger",
     title:"Every decision anybody made is on the record, here and at other customers",
     narr:"Deliberately after the case finishes, not a pivot out of the middle of it. Sarah's decision, and the same decision at other customers. Proposed sits next to Decided so a disagreement is visible without reading.",
     tt:"The case is done, and I want to show you what it left behind. Every decision made anywhere in this process is on the record, including the one Sarah just made, and including the same decision made at other customers. What was proposed sits next to what was decided, so you can run your eye down two columns and see where a person disagreed. Look at these rows. The same drive, small claims, approved every single time, and the recommendation was never changed.",
     demo:["Filter to human decisions and let the repeated rows stack up.","Point at Proposed next to Decided.","Say an override is the most useful row here, not a fault.","Don't show a thirty column table. Only the fields that carry the story."]},
    {actor:"Agent", views:["suggestions"], status:"build", short:"Two suggestions, opposite directions",
     frameLabel:"Cartographer &middot; Suggestions &middot; Feed",
     title:"Reading across those decisions turns up two suggestions",
     narr:"Called Suggestions, not Insights. Renamed on the 25 Aug call because Insights is a real product and this is not it. The same reasoning renamed the Case App overview to Performance earlier in the flow. One suggestion removes a human step where the record proves it changes nothing. The other adds one, and it is the repeat-failure gate the reviewers asked for in Act I.",
     tt:"Reading across the ledger turns up patterns, and here are two. The first: forty one claims on this drive under five thousand dollars, all approved, none reversed, and review added three hours to a stage with a four hour target. The judgment was never hard. The waiting was the problem. The second runs the other way. The same drive keeps failing at different customers and those cases keep closing without anybody checking the part itself, so that one adds a step instead of removing one. The loop tunes human involvement in both directions.",
     demo:["Open the first suggestion. Show the evidence count and what the analysis could not see.","Gesture at the second and tie it back to the reviewer who asked for it in Act I.","Say once that this is coming soon rather than shipping today."]},
    {actor:"Human", views:["improvement"], status:"build", short:"Approve the rule once",
     frameLabel:"Cartographer &middot; Suggestions &middot; Improvement",
     title:"Approve one of them as a rule, and the very next claim sails through",
     narr:"Reshaped 26 Aug to Vikram's flow: pattern &rarr; existing rule vs proposed change &rarr; Apply &rarr; a similar next case handled better. The eval panel is gone per his feedback (no evals, no developer workflows on stage); the safety story is rollback plus one-in-ten sampling. Max's frame 29 folds in at the bottom: the applied rule lands back in the map of work as a submitted proposal, which the estate screens that follow pick up.",
     tt:"A person approves this rule once, instead of approving every claim it covers. The change is one gated rule in the coverage stage, everything else still routes to a person, and it takes effect on apply with no redeployment. Watch what happens next: the first claim the rule covers finishes in four hours instead of four days, and nobody was asked. If it ever misfires, roll it back from right here — one claim in ten is audited for the first month. And the loop closes: the rule lands back in the map of work as a submitted proposal, so the map got better because the process ran.",
     demo:["Walk Vikram's four steps in order: the pattern, the rule diff, Apply, the next case.","Do not mention evals. Rollback and sampling are the safety story.","End on the proposal chip: Beat 7 feeding Beat 6, in his words."]},
    {actor:"System", views:["estate"], status:"build", short:"The estate, ninety days on",
     frameLabel:"Cartographer &middot; the estate &middot; day 90",
     title:"Ninety days on, the process nobody had mapped is the best mapped one here",
     narr:"Key frame, the callback to scene 02's Day 0 picture, and the first of Max\\u2019s six-frame payoff. His persona for the whole block is Nadia Brennan-Kowalczyk, VP Global Service, who appears by name three frames on. The empty dot is now the best mapped process here, and the rule Sarah's decisions produced is written down in the map. If the opening changes to estate-first, this is the frame that moves to the front.",
     tt:"Ninety days on. A hundred and thirty four processes surveyed, forty seven percent of the work mapped, nine rules written down that had only ever lived in somebody's head. And warranty resolution, the empty dot we started on, is now the best mapped process in this business. That last rule came from decisions Sarah and her team made while the process was running. The map made the process, and the process improved the map.",
     demo:["Put this next to scene 02, Day 0, if you can. The callback is the payoff.","Say the loop closes back into the map.","This opens a run of six. Budget three minutes for the whole block.","If the opening becomes estate-first, this frame leads instead."]},
    {actor:"System", views:["estatetable"], status:"build", short:"The same picture as a table",
     frameLabel:"Cartographer &middot; map of work, table",
     title:"Zoom out, and the whole business is mapped, domain by domain, owner by owner",
     narr:"Max's frame 22. The radial is the picture, this is the receipt. Engineering and Quality is the weak corner and it is the corner this story keeps returning to, because the repeat-failure link lives there.",
     tt:"The same survey as a table. Engineering and quality is the thinnest, and look at what sits in it: the repeat-failure link and deviation approval. Both decide something. Neither has anybody accountable for it. That is the gap the rule we just wrote closes from the other side.",
     demo:["Switch from Radial to Table in front of them. Same data, second view.","Land on Engineering and Quality. It sets up the ownership frame.","Do not linger. This frame is evidence, not the argument."]},
    {actor:"System", views:["estateown"], status:"build", short:"Eleven processes own nobody",
     frameLabel:"Cartographer &middot; map of work, ownership",
     title:"Switch the lens, and eleven of the 134 processes answer to nobody",
     narr:"Max's frame 23. One dataset, second lens. The point is that the map answers a different question without being rebuilt, and that ownership is the thing that blocks routing.",
     tt:"Same map. This time the question is who is accountable, and eleven processes out of a hundred and thirty four answer to nobody. That matters more than it sounds, because a process with no owner has nowhere to send an exception. It leaves the system and turns into a phone call.",
     demo:["Click the lens rather than opening a new screen. The re-render is the point.","Say eleven out of 134, then say why it matters.","Four of them are in engineering and quality, which the last frame set up."]},
    {actor:"System", views:["estatefind"], status:"build", short:"Twelve findings, three are yours",
     frameLabel:"Cartographer &middot; Suggestions, all findings",
     title:"The map surfaces twelve findings of its own, sorted by what kind they are",
     narr:"Max's frame 24, renamed. He called it Insights; the 25 Aug call settled that it is Suggestions. Note the scope difference from scene 18: that one is this process after this case ran, this one is the whole estate. Same feed, wider lens.",
     tt:"And this is the estate reading itself. Twelve findings, sorted by what kind of thing they are. Contradictions where two written procedures disagree. Signals where the telemetry knows before a person does. Drift where a system has quietly stopped matching the floor. Three of them are assigned to the person looking at this screen. One of them is the substitution rule we watched get written earlier.",
     demo:["Say Suggestions out loud. Never Insights, it is a different product.","Point at the one finding they have already seen get created.","Contrast the scope against scene 18 if anyone asks."]},
    {actor:"Human", who:"Nadia Brennan-Kowalczyk &middot; VP, Global Service", views:["estatehome"], status:"build", short:"What to work on next",
     frameLabel:"Cartographer &middot; Home",
     title:"The VP opens it on a Monday and gets a ranked list, not a dashboard",
     narr:"Max's frame 25, and his persona for this beat. She is above Priya, which his own copy makes explicit: the first item says name an owner, and that it is not Priya's to fix. This is the frame that turns the map into a plan.",
     tt:"Here is what the VP of service opens on a Monday. Four things, ranked by what they are worth and what they block. The one at the top is an ownership decision: nobody owns the claim end to end, and until somebody does, everything under it has nowhere to route. Underneath it, three changes worth three point one million dollars and four days of cycle time between them. The map stopped being a picture and became a plan.",
     demo:["Name Nadia. She is the audience for this beat, and she is above Priya.","Read item one out loud, including that it is not Priya's to fix.","Do not read all four. Read one and the total."]},
    {actor:"System", views:["estatebacklog"], status:"build", short:"And it is honest about the rest",
     frameLabel:"Cartographer &middot; unmapped backlog",
     title:"And the map still says out loud what it has not got to",
     narr:"Max's frame 26, and the honesty beat that pairs with the 62% frame in Act I. The same virtue at estate scale: the tool is straight about its own coverage. Good place to hand back before the close.",
     tt:"And it is as honest at the end as it was at the start. Fifty eight processes are still unmapped, listed as a queue rather than buried in a number, with the ones nobody owns at the top. You can hand one to an analyst from here. That is the difference between a survey that finishes and a map that keeps going.",
     demo:["Call back to the 62% frame in Act I. Same honesty, bigger scale.","Say fifty eight, then hand one off.","Then go straight to the close."]},
    {actor:"System", views:["close"], status:"build", short:"Close",
     title:"We started with an empty map, and now the whole business is on it",
     narr:"Map it, build it, run it, improve it. And the map is better than when you started.",
     tt:"Think about the whole path. We started on an empty map. Cartographer read what this company already had, drew the work, and the people who own it corrected it. That corrected design became a governed record with four names against it, and went to a coding agent that turned it into a running Maestro case. The case ran, and most claims finished without anybody. The decisions people did make came back as rules that are now written down. Map it, build it, run it, improve it. Thank you.",
     demo:["End on the closing visual with no product chrome.","Underneath: Cartographer, coding agents, Maestro, and back to Cartographer."]}
  ]}
];

// ---------- render ----------
const VNAME = {scribe:"Cartographer · PDD", agentbuild:"Coding agent · build proposal", plan:"Case plan (design canvas)", liveedit:"Live edit · change summary",
  worklist:"Case App · work queue", ac:"Warranty resolution console", opsdash:"Case performance", casemanager:"UiPath Studio · case-agent rules",
  eventreassess:"Case App · case detail", audittrail:"Instance management", close:"Closing", governance:"Cartographer · published record", mapempty:"Cartographer · the empty estate", setup:"Cartographer · initial setup, step 2 of 4", maestroimport:"Cartographer · import from Maestro, step 3 of 4", day0:"Cartographer · map, day 0", project:"Cartographer · project", mapdiagram:"Cartographer · diagram", sme:"Cartographer · delegation", mapwip:"Cartographer · map of work, in progress", mapdone:"Cartographer · map of work, complete", review:"Cartographer · review", uce:"Cartographer · Use Case Explorer", estate:"Cartographer · map of work, coverage", estatetable:"Cartographer · map of work, table", estateown:"Cartographer · map of work, ownership", estatefind:"Cartographer · Suggestions, all findings", estatehome:"Cartographer · Home", estatebacklog:"Cartographer · unmapped backlog", ledger:"Cartographer \\u00b7 Suggestions \\u00b7 Ledger", suggestions:"Cartographer \\u00b7 Suggestions \\u00b7 Feed", improvement:"Cartographer \\u00b7 Suggestions \\u00b7 Improvement"};
const VMETA = {
  scribe:{badge:"P",url:"cloud.uipath.com/orgs/cobalt-ridge/cartographer/documents/warranty-resolution-pdd"},
  agentbuild:{badge:"A",url:"cloud.uipath.com/orgs/cobalt-ridge/coding-agents/sessions/warranty-case-plan"},
  plan:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/case-plans/warranty-resolution/design"},
  liveedit:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/case-plans/warranty-resolution/changes/v2"},
  worklist:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/cases?view=action-required"},
  ac:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/cases/WR-2026-0417/tasks/coverage-decision"},
  opsdash:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/insights"},
  casemanager:{badge:"S",url:"cloud.uipath.com/studio/cobalt-ridge/case-plans/warranty-resolution/rules"},
  eventreassess:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/cases/WR-2026-0417"},
  audittrail:{badge:"I",url:"cloud.uipath.com/businessorchestration/cobalt-ridge/maestro_/cases/warranty-resolution/instances/WR-2026-0417"},
  close:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/overview"}
};
const STATUS = {built:["built","In demo app"], partial:["partial","Partial"], build:["build","To build"]};
function bodyFor(v, sc){
  if(v==="scribe") return scribeView();
  if(v==="agentbuild") return agentBuildView();
  if(v==="plan") return planCanvas(false);
  if(v==="liveedit") return liveEditView();
  if(v==="worklist") return worklistView();
  if(v==="ac") return consoleView();
  if(v==="opsdash") return opsDashView();
  if(v==="casemanager") return caseManagerView();
  if(v==="eventreassess") return eventReassessView();
  if(v==="audittrail") return auditTrailView();
  if(v==="mapempty") return mapEmptyView();
  if(v==="setup") return setupView();
  if(v==="maestroimport") return importView();
  if(v==="day0") return day0View();
  if(v==="project") return projectOpensView();
  if(v==="mapdiagram") return mapDiagramView();
  if(v==="sme") return smeDelegationView();
  if(v==="mapwip") return mapWipView();
  if(v==="mapdone") return mapDoneView();
  if(v==="review") return reviewView();
  if(v==="uce") return uceView();
  if(v==="estate") return estateView();
  if(v==="estatetable") return estateTableView();
  if(v==="estateown") return estateOwnView();
  if(v==="estatefind") return estateFindView();
  if(v==="estatehome") return estateHomeView();
  if(v==="estatebacklog") return estateBacklogView();
  if(v==="governance") return governanceView();
  if(v==="ledger") return ledgerView();
  if(v==="suggestions") return suggestionsView();
  if(v==="improvement") return improvementView();
  if(v==="close") return closeView();
  return "";
}
const NATIVE_VIEWS = new Set(["agentbuild","liveedit","scribe","plan","casemanager","ledger","suggestions","improvement","mapempty","setup","maestroimport","day0","project","mapdiagram","sme","mapwip","mapdone","review","uce","estate","estatetable","estateown","estatefind","estatehome","estatebacklog","governance"]);
function browserFrame(sc){
  const v = sc.views[0];
  const tab = sc.views.map(x=>VNAME[x]).join(" + ");
  if(v==="close"){
    return \`<div class="frame" role="group" aria-label="Closing slide">
      <div class="win" style="background:#12161c">\${closeView()}</div></div>\`;
  }
  if(NATIVE_VIEWS.has(v)){
    return \`<div class="frame" role="group" aria-label="Mockup of \${tab}">\${bodyFor(v,sc)}</div>\`;
  }
  const meta = VMETA[v] || {badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro"};
  const dom = meta.url.split("/")[0], rest = meta.url.slice(dom.length);
  return \`<div class="frame" role="group" aria-label="Mockup of \${tab}">
    <div class="win">
      <div class="chrome" aria-hidden="true">
        <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
        <span class="btab"><span class="fav">\${meta.badge}</span><span class="ttl">\${tab}</span><span class="x">×</span></span>
        <span class="plus">+</span>
      </div>
      <div class="omni" aria-hidden="true">
        <span class="onav">\${ICO.back}\${ICO.fwd}\${ICO.reload}</span>
        <span class="url">\${ICO.lock}<span class="u"><b>\${dom}</b>\${rest}</span><span class="star">&#9734;</span></span>
        <span class="oacts">\${ICO.dots}<span class="ava">SC</span></span>
      </div>
      <div class="screen">\${sc.views.map(x=>bodyFor(x,sc)).join("")}</div>
    </div></div>\`;
}
let num = 0, tocHtml = "", storyHtml = "";
ACTS.forEach((act,ai)=>{
  const first = num+1, last = num+act.scenes.length;
  let frameLinks = "";
  storyHtml += \`<div class="act" id="act\${ai}"><h2>\${act.t}</h2><span class="rt">\${act.rt} · SCENES \${String(first).padStart(2,"0")}-\${String(last).padStart(2,"0")}</span><div class="goal">\${act.goal}</div></div><div class="actrow">\`;
  act.scenes.forEach(sc=>{
    num++;
    frameLinks += \`<a href="#scene\${num}" data-scene="\${num}" title="\${STATUS[sc.status]?STATUS[sc.status][1]:""}"><span class="fn">\${String(num).padStart(2,"0")}</span><span class="fd \${sc.status||"build"}"></span><span>\${sc.short}</span></a>\`;
    const wide = sc.views.some(v=>["plan","casemanager","worklist","opsdash","close","ledger","suggestions","improvement","ac","eventreassess"].includes(v));
    storyHtml += \`<div class="scene\${wide?" wide":""}" id="scene\${num}" data-scene="\${num}" data-act="\${ai}">
      <div class="sc-head">
        <span class="sc-num">\${String(num).padStart(2,"0")}</span>
        <span class="actor \${sc.actor}">\${sc.actor.toUpperCase()}</span>
        \${sc.who?\`<span class="persona">\${sc.who}</span>\`:""}
      </div>
      <h3>\${sc.title}</h3>
      <div class="scenebody">
        <div class="sidecol">
          <aside class="talktrack"><span class="lbl2">Talk track</span><p>“\${sc.tt||""}”</p></aside>
          <aside class="demonotes"><span class="lbl2">Demo</span><ul>\${(sc.demo||[]).map(d=>\`<li\${d.startsWith("Don't")||d.startsWith("Do not")?' class="dont"':""}>\${d}</li>\`).join("")}</ul></aside>
        </div>
        <div class="framewrap">\${sc.frameLabel?\`<span class="framelabel">\${sc.frameLabel}</span><br>\`:""}\${browserFrame(sc)}</div>
      </div>
    </div>\`;
  });
  storyHtml += \`</div>\`;
  tocHtml += \`<div class="tgroup" data-act="\${ai}">
    <a href="#act\${ai}"><span class="tn">ACT\\n\${"I II III IV V VI".split(" ")[ai]}</span><span class="tt">\${act.t.replace(/^Act [IV]+ · /,"")}</span><span class="tm">\${act.rt.replace("~","").toLowerCase()}</span></a>
    <div class="tframes">\${frameLinks}</div></div>\`;
});
document.getElementById("tocBody").innerHTML = tocHtml;
document.getElementById("story").innerHTML = storyHtml;

// ---------- scale each 1280x800 laptop window to its column width ----------
function fitFrames(){
  document.querySelectorAll(".frame").forEach(f=>{
    const w = f.clientWidth;
    if(w) f.style.setProperty("--s", (w/1280).toFixed(5));
  });
}
(function(){
  fitFrames();
  if("ResizeObserver" in window){
    const ro = new ResizeObserver(fitFrames);
    document.querySelectorAll(".frame").forEach(f=>ro.observe(f));
  }
  window.addEventListener("resize", fitFrames);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(fitFrames);
})();

(function(){
  const groups = [...document.querySelectorAll(".tgroup")];
  const links = [...document.querySelectorAll(".tframes a")];
  if(!("IntersectionObserver" in window)) return;
  const seen = {};
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ seen[e.target.dataset.scene] = e.isIntersecting ? e.intersectionRatio : 0; });
    let best=null, bv=0;
    Object.keys(seen).forEach(k=>{ if(seen[k]>bv){ bv=seen[k]; best=k; } });
    if(!best) return;
    const act = document.getElementById("scene"+best).dataset.act;
    groups.forEach(g=>g.classList.toggle("on", g.dataset.act===act));
    links.forEach(a=>a.classList.toggle("on", a.dataset.scene===best));
  },{rootMargin:"-15% 0px -55% 0px",threshold:[0,.2,.5,1]});
  document.querySelectorAll(".scene").forEach(s=>io.observe(s));
})();

/* ---------- Flow / Strip layout switch ----------
   Same ACTS data, two layouts. Strip borrows Max's condensed idiom:
   one act per line, click a screen to open it. Ours expands every
   frame, not only the ones that happen to be screenshots. */
(function(){
  const bBrief = document.getElementById("vBrief"),
        bStrip = document.getElementById("vStrip"),
        bFlow  = document.getElementById("vFlow"),
        fb = document.getElementById("flowbrief"),
        KEY = "fusion.mergedView";
  let fbWasOpen = null;
  function apply(mode, remember){
    if(mode !== "brief" && mode !== "flow") mode = "strip";
    document.body.classList.toggle("view-strip", mode === "strip");
    document.body.classList.toggle("view-brief", mode === "brief");
    if(mode === "brief"){ if(fbWasOpen === null) fbWasOpen = fb.open; fb.open = true; }
    else if(fbWasOpen !== null){ fb.open = fbWasOpen; fbWasOpen = null; }
    bBrief.setAttribute("aria-pressed", String(mode === "brief"));
    bStrip.setAttribute("aria-pressed", String(mode === "strip"));
    bFlow.setAttribute("aria-pressed", String(mode === "flow"));
    if(remember){ try{ localStorage.setItem(KEY, mode); }catch(e){} }
    requestAnimationFrame(fitFrames);
  }
  bBrief.addEventListener("click", ()=>apply("brief", true));
  bStrip.addEventListener("click", ()=>apply("strip", true));
  bFlow.addEventListener("click", ()=>apply("flow", true));
  let saved = null;
  try{ saved = localStorage.getItem(KEY); }catch(e){}
  /* an earlier explicit choice is respected; everyone else lands on Strip */
  apply(saved === "flow" || saved === "brief" ? saved : "strip", false);

  /* remember whether the walkthrough is open, in the views where it is collapsible */
  const FK = "fusion.mergedBrief";
  try{ if(localStorage.getItem(FK) === "1") fb.open = true; }catch(e){}
  fb.addEventListener("toggle", ()=>{
    if(document.body.classList.contains("view-brief")) return;
    try{ localStorage.setItem(FK, fb.open?"1":"0"); }catch(e){}
  });
})();

/* ---------- srcdoc-safe in-page navigation ----------
   The Coded App shell renders these boards in an iframe via srcDoc. In that
   context a bare "#id" href has no document URL to resolve against, so the
   browser resolves it against the PARENT page and the iframe navigates to the
   app itself — which is why clicking the side rail stacked extra app banners
   instead of scrolling. Intercept in-page anchors and scroll directly. */
document.addEventListener("click", function(e){
  const a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
  if(!a) return;
  const id = (a.getAttribute("href") || "").slice(1);
  if(!id) return;
  const el = document.getElementById(id);
  if(!el) return;
  e.preventDefault();
  el.scrollIntoView({behavior:"smooth", block:"start"});
  try{ history.replaceState(null, "", "#" + id); }catch(_){}
});

/* ---------- lightbox: open any frame full size from the strip ---------- */
(function(){
  const lb = document.getElementById("lb"),
        host = document.getElementById("lbFrame"),
        cap = document.getElementById("lbCap");
  function close(){
    lb.classList.remove("on");
    host.innerHTML = ""; cap.innerHTML = "";
    document.body.style.overflow = "";
  }
  document.addEventListener("click", e=>{
    if(!document.body.classList.contains("view-strip")) return;
    const frame = e.target.closest(".frame");
    if(!frame || lb.contains(frame)) return;
    const scene = frame.closest(".scene");
    host.innerHTML = "";
    host.appendChild(frame.cloneNode(true));
    const h3 = scene.querySelector("h3"), narr = scene.querySelector(".narr"),
          lbl = scene.querySelector(".framelabel");
    cap.innerHTML = \`\${lbl?\`<span class="lbsurface">\${lbl.textContent}</span>\`:""}\`
      + \`<b>\${h3?h3.innerHTML:""}</b>\${narr?\`<p>\${narr.innerHTML}</p>\`:""}\`;
    lb.classList.add("on");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(fitFrames);
  });
  lb.addEventListener("click", close);
  document.addEventListener("keydown", e=>{ if(e.key === "Escape" && lb.classList.contains("on")) close(); });
})();
/* == review-notes:js:start == */
/* ===========================================================================
   Review notes — click any screen, title, talk track or line of copy and say
   what needs to change.

   Canonical source. Do not edit the copies inlined in the storyboard HTML —
   edit this file and run \`tools/inject-review-notes.py\` to push it into them.
   The storyboards have to stay single self-contained files, so it is inlined
   rather than linked.

   WHERE NOTES GO. Nowhere on its own. They are held in this browser's
   localStorage and the reviewer copies or downloads them. That is a deliberate
   limit, not an oversight: the deployed Coded App has no OAuth client in the
   businessorchestration org, so it cannot write to Data Fabric, a queue or a
   bucket, and putting a webhook secret in client-side JS would publish the
   secret. The UI says this plainly so nobody assumes their notes were
   submitted. See the README for the upgrade path.
   =========================================================================== */
(function () {
  "use strict";

  var KEY = "fusion.reviewNotes." + (document.body.dataset.boardId || "board");
  var NAMEKEY = "fusion.reviewer";
  var notes = [];
  var mode = false;

  try { notes = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { notes = []; }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch (e) { /* private mode */ }
    paint();
  }
  function reviewer() {
    var n = "";
    try { n = localStorage.getItem(NAMEKEY) || ""; } catch (e) {}
    if (!n) {
      n = (window.prompt("Your name, so Robert knows whose note this is:", "") || "").trim();
      if (n) { try { localStorage.setItem(NAMEKEY, n); } catch (e) {} }
    }
    return n || "anonymous";
  }

  /* ---------- what can be commented on ---------- */
  // Order matters: the most specific target wins, so a click on a talk track
  // attributes to the talk track rather than to the whole scene.
  var TARGETS = [
    [".talktrack", "talk track"],
    [".demonotes", "director's notes"],
    [".scene > h3", "scene title"],
    [".scene > .narr", "scene description"],
    [".frame", "screen"],
    [".act", "act heading"],
    [".flowbrief", "the flow in brief"],
    [".capbox", "what's on screen"],
    [".synopsis", "synopsis"],
    [".mast .dek", "masthead"],
  ];

  function resolve(el) {
    for (var i = 0; i < TARGETS.length; i++) {
      var hit = el.closest(TARGETS[i][0]);
      if (hit) return { el: hit, kind: TARGETS[i][1] };
    }
    return null;
  }
  function sceneOf(el) {
    var s = el.closest(".scene");
    if (s) {
      var t = s.querySelector("h3");
      return {
        anchor: s.id || "",
        label: "Scene " + (s.dataset.scene || "?"),
        title: t ? t.textContent.trim() : "",
      };
    }
    var a = el.closest(".act");
    if (a) {
      var h = a.querySelector("h2");
      return { anchor: a.id || "", label: "Act heading", title: h ? h.textContent.trim() : "" };
    }
    return { anchor: "", label: "Masthead", title: "" };
  }
  function excerpt(el, sel) {
    if (sel) return sel.replace(/^[\\u201C\\u201D"']+/, "").replace(/[\\u201C\\u201D"']+$/, "").slice(0, 180);
    // a screen has no useful prose, so name it by its surface label instead
    if (el.classList.contains("frame")) {
      var sc = el.closest(".scene");
      var lbl = sc && sc.querySelector(".framelabel");
      return lbl ? lbl.textContent.trim() : "(the screen mockup)";
    }
    // drop the block's own label ("Talk track", "Demo") so the quote starts at
    // the actual copy rather than at the heading
    var clone = el.cloneNode(true);
    clone.querySelectorAll(".lbl2, .lbl, .framelabel, .fb-pin").forEach(function (n) { n.remove(); });
    var t = (clone.textContent || "").replace(/\\s+/g, " ").trim();
    // talk tracks already ship wrapped in smart quotes, and we add our own
    t = t.replace(/^[\\u201C\\u201D"']+/, "").replace(/[\\u201C\\u201D"']+$/, "");
    return t.slice(0, 180);
  }

  /* ---------- UI ---------- */
  var bar = document.createElement("div");
  bar.id = "fbBar";
  bar.innerHTML =
    '<button type="button" id="fbToggle" aria-pressed="false">' +
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/></svg>' +
      "<span>Comment</span></button>" +
    '<button type="button" id="fbOpen"><b id="fbCount">0</b> notes</button>';
  document.body.appendChild(bar);

  var panel = document.createElement("div");
  panel.id = "fbPanel";
  panel.setAttribute("aria-hidden", "true");
  panel.innerHTML =
    '<div class="fbp-h"><b>Review notes</b>' +
      '<span id="fbWho"></span>' +
      '<button type="button" id="fbClose" aria-label="Close">&times;</button></div>' +
    '<div class="fbp-warn">Saved in this browser only. Nothing is submitted. ' +
      "Copy or download them and send them to Robert.</div>" +
    '<div class="fbp-b" id="fbList"></div>' +
    '<div class="fbp-f">' +
      '<button type="button" class="fbb pri" id="fbCopy">Copy as Markdown</button>' +
      '<button type="button" class="fbb" id="fbDl">Download JSON</button>' +
      '<button type="button" class="fbb danger" id="fbClear">Clear all</button></div>';
  document.body.appendChild(panel);

  var composer = null;

  function closeComposer() {
    if (composer) { composer.remove(); composer = null; }
  }

  function openComposer(target, sel, x, y) {
    closeComposer();
    var scene = sceneOf(target.el);
    var ex = excerpt(target.el, sel);
    composer = document.createElement("div");
    composer.id = "fbComposer";
    composer.innerHTML =
      '<div class="fbc-h"><b>' + scene.label + "</b><span>" + target.kind + "</span></div>" +
      '<div class="fbc-ex"></div>' +
      '<textarea id="fbText" rows="4" placeholder="What needs to change?"></textarea>' +
      '<div class="fbc-f"><button type="button" class="fbb pri" id="fbSave">Save note</button>' +
      '<button type="button" class="fbb" id="fbCancel">Cancel</button></div>';
    // excerpt is page text or a raw user selection, so set it as text
    if (ex) composer.querySelector(".fbc-ex").textContent = "\\u201C" + ex + "\\u201D";
    document.body.appendChild(composer);
    var w = composer.offsetWidth, h = composer.offsetHeight;
    var left = Math.min(Math.max(10, x - w / 2), window.innerWidth - w - 10);
    var top = y + 14;
    if (top + h > window.innerHeight - 10) top = Math.max(10, y - h - 14);
    composer.style.left = left + "px";
    composer.style.top = top + "px";
    composer.querySelector("#fbText").focus();

    composer.querySelector("#fbCancel").onclick = closeComposer;
    composer.querySelector("#fbSave").onclick = function () {
      var txt = composer.querySelector("#fbText").value.trim();
      if (!txt) { composer.querySelector("#fbText").focus(); return; }
      notes.push({
        id: "n" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
        board: document.title,
        scene: scene.label, sceneTitle: scene.title, anchor: scene.anchor,
        kind: target.kind, excerpt: ex, note: txt,
        who: reviewer(), when: new Date().toISOString(),
      });
      closeComposer();
      save();
    };
    composer.querySelector("#fbText").onkeydown = function (e) {
      if (e.key === "Escape") { closeComposer(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { composer.querySelector("#fbSave").click(); }
    };
  }

  /* ---------- render ---------- */
  function paint() {
    document.getElementById("fbCount").textContent = notes.length;
    bar.classList.toggle("has", notes.length > 0);

    var who = "";
    try { who = localStorage.getItem(NAMEKEY) || ""; } catch (e) {}
    document.getElementById("fbWho").textContent = who ? who : "";

    // pins on commented elements
    document.querySelectorAll(".fb-pin").forEach(function (p) { p.remove(); });
    document.querySelectorAll(".fb-flag").forEach(function (p) { p.classList.remove("fb-flag"); });
    var byAnchor = {};
    notes.forEach(function (n) { byAnchor[n.anchor] = (byAnchor[n.anchor] || 0) + 1; });
    Object.keys(byAnchor).forEach(function (a) {
      if (!a) return;
      var el = document.getElementById(a);
      if (!el) return;
      el.classList.add("fb-flag");
      var pin = document.createElement("span");
      pin.className = "fb-pin";
      pin.textContent = byAnchor[a];
      pin.title = byAnchor[a] + " note(s) here";
      el.appendChild(pin);
    });

    var list = document.getElementById("fbList");
    if (!notes.length) {
      list.innerHTML =
        '<p class="fbp-empty">No notes yet. Turn on <b>Comment</b>, then click a screen, a ' +
        "title, a talk track or any line of copy. Select text first to quote it exactly.</p>";
      return;
    }
    list.textContent = "";
    notes.forEach(function (n, i) {
      function add(parent, tag, cls, text) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text != null) e.textContent = text;
        parent.appendChild(e);
        return e;
      }
      var card = add(list, "div", "fbn");
      var h = add(card, "div", "fbn-h");
      add(h, "b", null, n.scene);
      add(h, "span", "fbn-k", n.kind);
      var x = add(h, "button", "fbn-x", "\\u00D7");
      x.type = "button";
      x.setAttribute("aria-label", "Delete note");
      x.dataset.i = i;
      if (n.sceneTitle) add(card, "div", "fbn-t", n.sceneTitle);
      if (n.excerpt) add(card, "div", "fbn-e", "\\u201C" + n.excerpt + "\\u201D");
      add(card, "div", "fbn-n", n.note);
      var m = add(card, "div", "fbn-m", n.who + " \\u00B7 " + new Date(n.when).toLocaleString());
      if (n.anchor) {
        m.appendChild(document.createTextNode(" \\u00B7 "));
        var a = add(m, "a", "fbn-go", "jump");
        a.setAttribute("href", "#" + n.anchor);
      }
    });
    list.querySelectorAll(".fbn-x").forEach(function (b) {
      b.onclick = function () { notes.splice(+b.dataset.i, 1); save(); };
    });
  }

  function asMarkdown() {
    var who = notes.length ? notes[0].who : "";
    var out = ["# Review notes — " + document.title,
               "", (notes.length + " note(s)") + (who ? " · " + who : "") +
               " · " + new Date().toLocaleString(), ""];
    var groups = {};
    notes.forEach(function (n) { (groups[n.scene] = groups[n.scene] || []).push(n); });
    Object.keys(groups).forEach(function (g) {
      out.push("## " + g + (groups[g][0].sceneTitle ? " — " + groups[g][0].sceneTitle : ""));
      groups[g].forEach(function (n) {
        out.push("- **" + n.kind + "**" + (n.excerpt ? ' — "' + n.excerpt + '"' : ""));
        out.push("  - " + n.note);
        out.push("  - _" + n.who + ", " + new Date(n.when).toLocaleString() + "_");
      });
      out.push("");
    });
    return out.join("\\n");
  }

  /* ---------- wiring ---------- */
  document.getElementById("fbToggle").onclick = function () {
    mode = !mode;
    document.body.classList.toggle("fb-on", mode);
    this.setAttribute("aria-pressed", String(mode));
    if (!mode) closeComposer();
  };
  document.getElementById("fbOpen").onclick = function () {
    panel.classList.add("on");
    panel.setAttribute("aria-hidden", "false");
  };
  document.getElementById("fbClose").onclick = function () {
    panel.classList.remove("on");
    panel.setAttribute("aria-hidden", "true");
  };
  document.getElementById("fbCopy").onclick = function () {
    var md = asMarkdown(), btn = this;
    navigator.clipboard.writeText(md).then(function () {
      btn.textContent = "Copied";
      setTimeout(function () { btn.textContent = "Copy as Markdown"; }, 1600);
    }, function () {
      // clipboard can be blocked; fall back to something the reviewer can act on
      window.prompt("Copy these notes:", md);
    });
  };
  document.getElementById("fbDl").onclick = function () {
    var blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "review-notes-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  };
  document.getElementById("fbClear").onclick = function () {
    if (!notes.length) return;
    if (window.confirm("Delete all " + notes.length + " note(s)? This cannot be undone.")) {
      notes = []; save();
    }
  };

  // capture-phase so comment mode wins over the storyboard's own click handlers
  // (the strip view opens a lightbox on frame click)
  document.addEventListener("click", function (e) {
    if (!mode) return;
    if (e.target.closest("#fbBar, #fbPanel, #fbComposer")) return;
    var t = resolve(e.target);
    if (!t) return;
    e.preventDefault();
    e.stopPropagation();
    var sel = "";
    var s = window.getSelection();
    if (s && !s.isCollapsed && t.el.contains(s.anchorNode)) sel = s.toString().trim();
    openComposer(t, sel, e.clientX, e.clientY);
  }, true);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("on") && !composer) {
      document.getElementById("fbClose").click();
    }
  });

  paint();
})();
/* == review-notes:js:end == */
<\/script>
</body>
</html>
`,f=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7.5' fill='%230b7285'/><rect x='6' y='6' width='8.8' height='8.8' rx='1.6' fill='%23fa4616'/><rect x='17.2' y='6' width='8.8' height='8.8' rx='1.6' fill='%23fff' opacity='.92'/><rect x='6' y='17.2' width='8.8' height='8.8' rx='1.6' fill='%23fff' opacity='.72'/><rect x='17.2' y='17.2' width='8.8' height='8.8' rx='1.6' fill='%23fff' opacity='.45'/></svg>">
<title>Maestro Case · FUSION Storyboard v2</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
  :root{
    --bg:#f6f7f9; --card:#fff; --ink:#1c2530; --muted:#6b7684; --line:#e4e8ee;
    --teal:#0b7285; --teal-soft:#e6f4f6; --amber:#b7791f; --evt:#9a5bc7;
    --ag-bg:#ddf3e4; --ag-ink:#20794d; --pr-bg:#fde3dc; --pr-ink:#c2542e;
    --ht-bg:#e0e7ff; --ht-ink:#4650b8; --api-bg:#eceef1; --api-ink:#5b6572;
    --done:#1d9d64; --orange:#fa4616; --orange-soft:#fdece6;
    /* ---- real product tokens, taken from the Maestro Use Case Explorer demo app ---- */
    --serif:Newsreader,"Newsreader Fallback",Georgia,"Times New Roman",serif;
    --sans:"IBM Plex Sans","Segoe UI",system-ui,-apple-system,sans-serif;
    --pmono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    --p-bg:#f4f6f9; --p-ink:#171d2d; --p-teal:#0b57d0; --p-teal-700:#174c96;
    --p-teal-50:#e9f2fc; --p-teal-surf:#f2f7fd; --p-teal-line:#b9ceea;
    --p-paper:#fbfbfa; --p-line:#eae8e3; --p-line-2:#d9d6cf; --p-mute:#787774; --p-muted-bg:#f1f0ec;
    --p-blue:#e1f3fe; --p-blue-ink:#1f6c9f; --p-green:#edf3ec; --p-green-ink:#346538;
    --p-yellow:#fbf3db; --p-yellow-ink:#956400; --p-red:#fdebec; --p-red-ink:#9f2f2d;
    --p-violet:#f0edfa; --p-violet-ink:#5748b6;

    /* ---- real cigui tokens (github.com/UiPath/cigui, app/globals.css) ----
       The improvement surface lives inside Cartographer, so it is teal, and
       must never read as the same product as the blue Maestro Case App. ---- */
    --ci:#0db4b9; --ci-hover:#0b9fa3; --ci-canvas:#f7f9fb; --ci-card:#fff;
    --ci-float:#fff; --ci-text:#0e1b1b; --ci-muted:#5f6b6c; --ci-border:#d4dfe1;
    --ci-tint:#f0f7f8; --ci-tint-strong:#c9f5fc; --ci-tint-neutral:#d8dde2;
    --ci-row:#2b3542; --ci-sel:rgba(13,180,185,.12);
    --ci-ok:#10b981; --ci-err:#ef4444; --ci-warn:#f59e0b; --ci-info:#3b82f6;
    --ci-wait:#6b4ea8; --ci-mutedot:#94a3b8;
    --ci-inter:Inter,"IBM Plex Sans","Segoe UI",system-ui,-apple-system,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:var(--sans);background:var(--bg);color:var(--ink);line-height:1.45;-webkit-font-smoothing:antialiased}
  .mono{font-family:var(--pmono);font-size:9.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);font-weight:600}
  .page{max-width:1460px;margin:0 auto;padding:0 26px 90px;display:flex;gap:28px;align-items:flex-start}
  a:focus-visible,[tabindex]:focus-visible{outline:2px solid var(--p-teal);outline-offset:2px;border-radius:6px}
  /* ---- sidebar (contents) ---- */
  .toc{position:sticky;top:18px;width:250px;flex:none;background:#fff;border:1px solid var(--line);border-radius:12px;
       padding:14px 10px 16px;box-shadow:0 1px 2px rgba(20,28,36,.04),0 10px 24px rgba(20,28,36,.06);
       max-height:calc(100vh - 36px);overflow:auto}
  .toc h2{font-family:var(--pmono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin:0 0 10px 8px}
  .tgroup{margin-bottom:4px;border-radius:8px;padding:2px 0}
  .tgroup.on{background:var(--teal-soft)}
  .tgroup>a{display:flex;gap:8px;align-items:baseline;text-decoration:none;color:var(--ink);padding:5px 8px;border-radius:7px}
  .tgroup>a:hover .tt{color:var(--teal)}
  .tn{font-family:var(--pmono);font-size:9px;color:var(--muted);flex:none;line-height:1.3;white-space:pre-line}
  .tt{flex:1;font-size:12.5px;font-weight:600}
  .tgroup.on .tt{color:var(--teal)}
  .tm{font-size:9.5px;color:var(--muted);white-space:nowrap}
  .tframes{margin:0 0 7px 24px;border-left:1px solid #e8ecef;padding-left:9px}
  .tframes a{display:flex;gap:6px;align-items:center;text-decoration:none;color:#4a5461;font-size:10.5px;padding:2.5px 4px;border-radius:5px;line-height:1.35}
  .tframes a:hover{background:#f2f4f7}
  .tframes a.on{background:var(--teal-soft);color:var(--teal);font-weight:600}
  .fn{font-family:var(--pmono);font-size:9px;color:#b3bbc2;flex:none;width:15px}
  .fd{width:6px;height:6px;border-radius:50%;flex:none}
  .fd.built{background:var(--done)} .fd.partial{background:var(--amber)} .fd.build{background:#e35b5b}
  .toc .leg{margin:10px 8px 0;font-size:9px;color:var(--muted);display:flex;gap:9px;flex-wrap:wrap}
  .toc .leg span{display:flex;gap:4px;align-items:center}
  /* ---- main ---- */
  .content{flex:1;min-width:0}
  .mast{padding:34px 0 14px;border-bottom:2px solid var(--ink);margin-bottom:10px}
  .mast h1{font-family:var(--serif);font-size:32px;font-weight:500;letter-spacing:-.02em;line-height:1.15;margin:8px 0 10px}
  .mast .dek{font-size:14px;color:#3d4754;max-width:840px;margin-bottom:12px}
  .mast .dek b{color:var(--ink)}
  .capbox{background:var(--teal-soft);border:1px solid var(--teal-line,#bfdde3);border-radius:12px;padding:14px 18px;margin-top:12px;max-width:860px}
  .capbox>p{font-size:13.5px;color:var(--ink);margin-bottom:10px}
  .capbox ol{margin:0;padding-left:20px;display:grid;gap:6px}
  .capbox li{font-size:13px;color:#333c46;line-height:1.4}
  .capbox li b{color:var(--ink)}
  .pivot{font-size:11.5px;color:var(--orange);background:var(--orange-soft);border:1px solid #fbd0c0;border-radius:8px;padding:8px 11px;margin-top:10px;max-width:840px}
  .legend{display:flex;gap:14px;flex-wrap:wrap;align-items:center;font-size:10.5px;color:var(--muted);padding:10px 0 4px}
  .legend b{font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink)}
  .tag{font-size:8.5px;font-weight:700;border-radius:4px;padding:2px 4px}
  .tag.AG{background:var(--ag-bg);color:var(--ag-ink)} .tag.PR{background:var(--pr-bg);color:var(--pr-ink)}
  .tag.HT{background:var(--ht-bg);color:var(--ht-ink)} .tag.API{background:var(--api-bg);color:var(--api-ink)}
  .m{font-size:8.5px;font-weight:700;border:1px solid var(--line);border-radius:4px;padding:1px 5px;background:#fff;color:#7d8794}
  .m.evt{color:var(--evt);border-color:#dcc7ee;background:#f7f0fc}
  .act{margin:34px 0 12px;display:flex;flex-wrap:wrap;align-items:baseline;gap:12px;border-bottom:1px solid var(--ink);padding-bottom:6px;scroll-margin-top:18px}
  .act h2{font-family:var(--serif);font-size:21px;font-weight:500;letter-spacing:-.02em;flex:0 1 auto;min-width:0}
  .act .rt{margin-left:auto;flex:none;white-space:nowrap;font-family:var(--pmono);font-size:10px;color:var(--muted);letter-spacing:.06em;text-align:right}
  .act .goal{font-size:11px;color:var(--muted);flex:1 1 100%;margin-top:2px}
  .actrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(680px,1fr));gap:34px;align-items:start}
  .scene{min-width:0;scroll-margin-top:18px}
  .scene.wide{grid-column:1 / -1}
  .sc-head{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:5px}
  .sc-num{font-family:var(--pmono);font-size:12px;font-weight:600;color:var(--teal)}
  .actor{font-size:9px;font-weight:700;letter-spacing:.06em;border-radius:4px;padding:2.5px 7px}
  .actor.Human{background:var(--ht-bg);color:var(--ht-ink)} .actor.Agent{background:var(--ag-bg);color:var(--ag-ink)}
  .actor.API{background:var(--api-bg);color:var(--api-ink)} .actor.Robot{background:var(--pr-bg);color:var(--pr-ink)}
  .actor.Event{background:#f7f0fc;color:var(--evt)} .actor.System{background:#eef1f5;color:#5b6572}
  .persona{font-size:10px;color:var(--muted)}
  .status{font-size:9px;color:var(--muted);display:flex;gap:4px;align-items:center;margin-left:auto}
  .scene h3{font-family:var(--serif);font-size:17.5px;font-weight:500;letter-spacing:-.02em;margin-bottom:4px}
  .scene .narr{font-size:12px;color:#3d4754;margin-bottom:11px;max-width:1000px}
  .scenebody{display:flex;gap:16px;align-items:flex-start}
  .scenebody .framewrap{flex:1;min-width:0}
  .sidecol{flex:0 0 200px;display:flex;flex-direction:column;gap:10px}
  .talktrack{background:#fff;border:1px solid var(--line);border-radius:10px;padding:11px 12px}
  .talktrack .lbl2{font-family:ui-monospace,Menlo,monospace;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--teal);font-weight:700;display:block;margin-bottom:6px}
  .talktrack p{font-family:Georgia,serif;font-size:11.5px;font-style:italic;line-height:1.5;color:#333c46}
  .demonotes{background:#f8f9fb;border:1px solid var(--line);border-radius:10px;padding:11px 12px}
  .demonotes .lbl2{font-family:ui-monospace,Menlo,monospace;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:700;display:block;margin-bottom:6px}
  .demonotes ul{padding-left:15px;margin:0}
  .demonotes li{font-size:11px;line-height:1.45;color:#3d4754;margin-bottom:5px}
  .demonotes li.dont{color:var(--pr-ink)}
  .demonotes li.dont::marker{content:"\\2717  "}
  @media(max-width:900px){
    /* stacked: the frame has to stretch, so flex-start would shrink it to min-content */
    .scenebody{flex-direction:column;align-items:stretch}
    .sidecol{flex:none;width:100%;flex-direction:row}.sidecol>*{flex:1}
    .page{flex-direction:column;gap:16px}
    .toc{position:static;width:100%;max-height:none}
    .toc .tframes{margin-left:16px}
  }
  @media(max-width:600px){.sidecol{flex-direction:column}}
  .framelabel{display:inline-flex;align-items:center;gap:6px;font-family:ui-monospace,Menlo,monospace;font-size:9px;
    letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--teal);background:var(--teal-soft);
    border-radius:999px;padding:4px 10px;margin-bottom:8px}
  .scene .beat{font-size:10.5px;color:var(--teal);font-weight:600;margin-bottom:5px}
  .scene .cxnote{font-size:11px;color:var(--evt);background:#f7f0fc;border:1px solid #dcc7ee;border-radius:8px;padding:7px 10px;margin-bottom:9px}


  /* ==========================================================
     MASTHEAD: plain-language synopsis, then a collapsible
     words-only walkthrough. A reader must be able to learn the
     whole flow without looking at a single screen.
     ========================================================== */
  .synopsis{font-family:var(--serif);font-size:19px;line-height:1.5;color:var(--ink);max-width:820px;margin:6px 0 14px}
  .synopsis b{font-weight:600}
  .flowbrief{max-width:860px;margin:0 0 14px;border:1px solid var(--line);border-radius:12px;background:#fff}
  .flowbrief>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:9px;
    padding:11px 15px;font-size:12.5px;font-weight:600;color:var(--teal)}
  .flowbrief>summary::-webkit-details-marker{display:none}
  .flowbrief>summary::before{content:"\\203A";font-family:var(--pmono);font-size:15px;line-height:1;
    color:var(--teal);transition:transform .15s ease;display:inline-block}
  .flowbrief[open]>summary::before{transform:rotate(90deg)}
  .flowbrief>summary .hint{margin-left:auto;font-family:var(--pmono);font-size:9px;letter-spacing:.1em;
    text-transform:uppercase;color:var(--muted);font-weight:500}
  .flowbrief .fb{padding:2px 16px 15px}
  .fb ol{margin:0;padding-left:0;list-style:none;counter-reset:fbn}
  .fb li{counter-increment:fbn;position:relative;padding:5px 0 5px 30px;font-size:13px;line-height:1.5;color:#333c46;
    border-top:1px solid #f0f2f5}
  .fb li:first-child{border-top:0}
  .fb li::before{content:counter(fbn);position:absolute;left:0;top:6px;font-family:var(--pmono);font-size:9.5px;
    font-weight:600;color:var(--teal);background:var(--teal-soft);border-radius:5px;width:19px;height:16px;
    display:flex;align-items:center;justify-content:center}
  .fb li b{color:var(--ink);font-weight:600}
  .fb .grp{margin:12px 0 3px;font-family:var(--pmono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;
    color:var(--muted);font-weight:600}
  .fb .grp:first-child{margin-top:4px}
  .illus{font-size:11px;color:var(--muted);border-left:2px solid var(--line);padding:2px 0 2px 10px;margin-top:12px;max-width:820px}

  /* ==========================================================
     VIEW SWITCH: Flow (detailed, default) vs Strip (condensed).
     One render, two layouts - the scene data is never duplicated.
     ========================================================== */
  .viewsw{position:fixed;top:14px;right:16px;z-index:55;display:flex;align-items:center;gap:9px;
    background:#fff;border:1px solid #d7dde4;border-radius:10px;padding:5px 6px 5px 13px;
    box-shadow:0 2px 4px rgba(20,28,36,.06),0 14px 30px -12px rgba(20,28,36,.28)}
  .viewsw .swlbl{font-family:var(--pmono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;
    font-weight:600;color:var(--muted)}
  .viewsw .sw{display:flex;gap:2px;background:#eceff3;border:1px solid var(--line);border-radius:8px;padding:2px}
  .viewsw button{font-family:var(--sans);font-size:12px;font-weight:600;padding:6px 13px;border-radius:6px;
    border:0;background:transparent;color:var(--muted);cursor:pointer}
  .viewsw button:hover{color:var(--ink)}
  .viewsw button[aria-pressed="true"]{background:var(--teal);color:#fff;box-shadow:0 1px 2px rgba(20,28,36,.18)}
  .swnote{font-size:11px;color:var(--muted);margin:14px 0 0;max-width:660px;line-height:1.5}
  @media(max-width:1050px){.viewsw{position:static;margin:14px 0 0;justify-content:flex-start;box-shadow:none}}
  /* narrative view: the plain-language walkthrough becomes the page */
  @media screen{
    body.view-brief #story,body.view-brief .toc{display:none}
    body.view-brief .flowbrief{max-width:760px}
    body.view-brief .flowbrief>summary{pointer-events:none}
    body.view-brief .flowbrief>summary .hint,body.view-brief .flowbrief>summary::before{display:none}
  }

  body.view-strip .actrow{grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:24px 14px}
  body.view-strip .scene.wide{grid-column:auto}
  body.view-strip .scene .narr,body.view-strip .sidecol,body.view-strip .scene .cxnote{display:none}
  body.view-strip .scenebody{display:block}
  body.view-strip .framewrap{width:100%}
  body.view-strip .framelabel{display:none}
  body.view-strip .framewrap>br{display:none}
  body.view-strip .scene h3{min-height:2.7em}
  #lb .lbcap .lbsurface{display:inline-block;font-family:ui-monospace,Menlo,monospace;font-size:9px;
    letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:#7fd9e2;margin-bottom:7px}
  body.view-strip .scene h3{font-family:var(--sans);font-size:11.5px;font-weight:600;line-height:1.35;letter-spacing:0;
    margin:6px 0 0;color:#3d4754}
  body.view-strip .sc-head{margin-bottom:4px;gap:5px}
  body.view-strip .sc-num{font-size:10px}
  body.view-strip .actor{font-size:7.5px;padding:1.5px 5px}
  body.view-strip .persona{display:none}
  body.view-strip .frame{max-width:none;cursor:zoom-in;transition:transform .16s cubic-bezier(.2,.7,.3,1),box-shadow .16s}
  body.view-strip .frame:hover{transform:translateY(-3px);box-shadow:0 1px 2px rgba(20,30,40,.06),0 26px 46px -16px rgba(18,28,40,.4)}
  body.view-strip .act{margin-top:30px}
  body.view-strip .act .goal{display:none}

  /* lightbox - every frame is expandable here, not only the screenshots */
  #lb{position:fixed;inset:0;z-index:60;display:none;background:rgba(12,18,24,.86);padding:26px;
      flex-direction:column;align-items:center;justify-content:center;cursor:zoom-out}
  #lb.on{display:flex}
  #lb .lbframe{width:min(1180px,100%);max-height:calc(100vh - 132px)}
  #lb .lbcap{margin-top:14px;max-width:1180px;text-align:center}
  #lb .lbcap b{display:block;font-family:var(--serif);font-size:17px;font-weight:500;color:#fff;margin-bottom:5px}
  #lb .lbcap p{font-size:12px;color:#c8d3da;line-height:1.5}
  #lb .lbhint{margin-top:12px;font-family:var(--pmono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;
    color:rgba(255,255,255,.42)}
  @media print{.viewsw,#lb{display:none!important}.flowbrief{border-color:#ccc}.flowbrief .fb{display:block!important}}

  /* ==========================================================
     LAPTOP BROWSER FRAME
     The whole window (chrome + page) is authored at a real
     laptop viewport of 1280x800 CSS px and uniformly scaled
     down to the column width, so proportions and type sizes
     stay exactly those of a 16:10 laptop screenshot.
     ========================================================== */
  .frame{position:relative;width:100%;max-width:1100px;aspect-ratio:1280 / 800;overflow:hidden;
         background:#fff;border:1px solid #cbd3dc;border-radius:12px;
         box-shadow:0 1px 2px rgba(20,30,40,.05),0 22px 44px -18px rgba(18,28,40,.32)}
  .win{position:absolute;top:0;left:0;width:1280px;height:800px;transform-origin:0 0;transform:scale(var(--s,1));
       display:flex;flex-direction:column;background:var(--p-bg);font-family:var(--sans)}
  /* tab strip */
  .chrome{flex:none;height:36px;display:flex;align-items:flex-end;gap:8px;padding:0 12px;
          background:linear-gradient(#eef0f3,#e6e9ed);border-bottom:1px solid #d7dce2}
  .chrome .dots{display:flex;gap:7px;align-items:center;height:36px}
  .win .dots i{width:11px;height:11px;border-radius:50%}
  .win .dots i.r{background:#f2635b} .win .dots i.y{background:#f2bd4c} .win .dots i.g{background:#4cc35f}
  .chrome .btab{display:flex;align-items:center;gap:8px;height:28px;padding:0 12px;margin-left:6px;
                background:#fff;border:1px solid #d7dce2;border-bottom:0;border-radius:8px 8px 0 0;
                font-size:11.5px;color:var(--p-ink);max-width:430px}
  .chrome .btab .fav{width:14px;height:14px;flex:none;border-radius:4px;background:var(--p-teal);color:#fff;
                     font-family:var(--serif);font-size:9px;line-height:14px;text-align:center;font-weight:500}
  .chrome .btab .ttl{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .chrome .btab .x{color:#9aa3ad;font-size:12px}
  .chrome .plus{color:#8e97a1;font-size:14px;line-height:1;padding-bottom:8px}
  /* address bar */
  .omni{flex:none;height:38px;display:flex;align-items:center;gap:11px;padding:0 12px;background:#f7f8fa;border-bottom:1px solid #e3e7ec}
  .omni .onav{display:flex;gap:10px;color:#98a1ab;flex:none}
  .omni .url{flex:1;min-width:0;display:flex;align-items:center;gap:8px;height:25px;padding:0 11px;
             background:#fff;border:1px solid #e3e7ec;border-radius:999px;
             font-family:var(--pmono);font-size:10.5px;color:#7c8792;letter-spacing:.005em}
  .omni .url .u{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .omni .url b{color:var(--p-ink);font-weight:500}
  .omni .url .star{margin-left:auto;color:#b3bbc4;flex:none}
  .omni .oacts{display:flex;align-items:center;gap:9px;flex:none;color:#98a1ab}
  .omni .oacts .ava{width:20px;height:20px;border-radius:50%;background:var(--p-teal-50);color:var(--p-teal-700);
                    font-family:var(--pmono);font-size:8.5px;font-weight:600;display:flex;align-items:center;justify-content:center}

  /* ==========================================================
     NATIVE macOS APP WINDOW — Claude Code Desktop (scenes 02 and 04)
     Deliberately dark and native: these two moments are run in
     the coding-agent desktop app, not in the Maestro product.
     ========================================================== */
  .win.native{background:#1b1b1b}
  .titlebar{position:relative;flex:none;height:38px;display:flex;align-items:center;gap:8px;padding:0 12px;
            background:#262626;border-bottom:1px solid #333330}
  .titlebar .dots{display:flex;gap:7px;align-items:center;z-index:1}
  .titlebar .tt{position:absolute;left:0;right:0;text-align:center;font-family:var(--sans);font-size:11.5px;
                font-weight:500;color:#a7a7a3}
  .titlebar .tr{margin-left:auto;display:flex;gap:11px;color:#7d7d79;z-index:1}
  .cx{flex:1;min-height:0;display:flex;background:#1e1e1e;color:#e8e8e5;font-family:var(--sans);font-size:13.5px;line-height:1.55}
  .cx-side{width:258px;flex:none;background:#171717;border-right:1px solid #2b2b29;display:flex;flex-direction:column;padding:13px 10px 10px}
  .cx-lbl{display:block;font-family:var(--pmono);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#77776f;padding:0 6px;margin-bottom:9px}
  .cx-search{display:flex;align-items:center;gap:7px;height:27px;border:1px solid #2f2f2c;border-radius:7px;background:#202020;
             padding:0 9px;margin-bottom:12px;font-size:11.5px;color:#6f6f6a}
  .cx-th{border-radius:8px;padding:9px 10px;margin-bottom:3px;border:1px solid transparent}
  .cx-th.on{background:#2b2b28;border-color:#3a3a36}
  .cx-th b{display:block;font-size:12.5px;font-weight:500;color:#e8e8e5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cx-th span{display:block;font-size:11px;color:#8b8b85;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:1px}
  .cx-th u{display:block;text-decoration:none;font-family:var(--pmono);font-size:8.5px;letter-spacing:.1em;color:#6d6d67;margin-top:4px}
  .cx-th.on u{color:#9ad7ae}
  .cx-foot{margin-top:auto;border-top:1px solid #2b2b29;padding:10px 6px 0;font-family:var(--pmono);font-size:9.5px;
           line-height:1.7;color:#6d6d67}
  .cx-main{flex:1;min-width:0;display:flex;flex-direction:column}
  .cx-head{flex:none;display:flex;align-items:center;gap:10px;padding:12px 18px;border-bottom:1px solid #2b2b29}
  .cx-head b{font-size:13.5px;font-weight:500}
  .cx-body{flex:1;min-height:0;overflow:hidden;padding:18px 20px 4px;display:flex;flex-direction:column;gap:15px}
  .cx-chip{font-family:var(--pmono);font-size:9px;letter-spacing:.09em;text-transform:uppercase;border:1px solid #3a3a36;
           border-radius:999px;padding:3px 9px;color:#a5a5a0;white-space:nowrap}
  .cx-chip.ok{border-color:#33553c;background:#1c2b20;color:#8ed6a3}
  .cx-role{display:block;font-family:var(--pmono);font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:#77776f;margin-bottom:5px}
  .cx-you{align-self:flex-end;max-width:78%;background:#2f2f2c;border:1px solid #3a3a36;border-radius:12px;padding:11px 14px;
          font-size:13px;color:#eaeae6}
  .cx-agent{display:flex;gap:11px;min-width:0}
  .cx-agent .av{width:24px;height:24px;flex:none;border-radius:6px;background:#e8e8e5;color:#1b1b1b;
                font-family:var(--serif);font-size:13px;display:flex;align-items:center;justify-content:center}
  .cx-agent .txt{flex:1;min-width:0}
  .cx-agent p{font-size:13px;color:#dedeD9}
  .cx-plan{margin-top:10px;border:1px solid #2f2f2c;border-radius:9px;background:#232320;overflow:hidden}
  .cx-plan .ph{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid #2f2f2c;
               font-family:var(--pmono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:#8b8b85}
  .cx-plan .pi{display:flex;gap:10px;align-items:flex-start;padding:8px 12px;border-bottom:1px solid #292926;font-size:12.5px;color:#dedeD9}
  .cx-plan .pi:last-child{border-bottom:0}
  .cx-plan .pi i{font-style:normal;font-family:var(--pmono);font-size:11px;color:#8ed6a3;flex:none}
  .cx-diff{margin-top:10px;border:1px solid #2f2f2c;border-radius:9px;overflow:hidden;background:#1c1c1a}
  .cx-diff .fh{display:flex;align-items:center;gap:9px;padding:8px 12px;background:#232320;border-bottom:1px solid #2f2f2c;
               font-family:var(--pmono);font-size:10px;letter-spacing:.04em;color:#9a9a94}
  .cx-diff .dl{display:grid;grid-template-columns:26px minmax(0,1fr);font-family:var(--pmono);font-size:11px;line-height:1.65;padding:4px 12px 4px 0}
  .cx-diff .dl .g{text-align:center;color:#6d6d67}
  .cx-diff .dl.ctx{color:#8b8b85}
  .cx-diff .dl.add{background:rgba(72,180,112,.10);color:#8ed6a3} .cx-diff .dl.add .g{color:#8ed6a3}
  .cx-diff .dl.mod{background:rgba(206,168,80,.10);color:#e0c68b} .cx-diff .dl.mod .g{color:#e0c68b}
  .cx-diff .dl.ind{padding-left:0}
  .cx-acts{display:flex;gap:8px;margin-top:12px;justify-content:flex-end}
  .cx-btn{display:inline-flex;align-items:center;height:27px;padding:0 13px;border-radius:7px;border:1px solid #3a3a36;
          background:#2a2a27;color:#e8e8e5;font-size:12px;font-weight:500;white-space:nowrap}
  .cx-btn.pri{background:#e8e8e5;border-color:#e8e8e5;color:#1b1b1b}
  .cx-composer{flex:none;margin:8px 20px 18px;display:flex;align-items:center;gap:10px;height:38px;padding:0 13px;
               border:1px solid #333330;border-radius:10px;background:#242422;font-size:12.5px;color:#7d7d78}
  .cx-composer .send{margin-left:auto;font-family:var(--pmono);font-size:9.5px;color:#6d6d67}
  /* mode switch: Terminal (default) vs. chat UI */
  .modesw{margin-left:auto;display:flex;gap:2px;background:#111110;border:1px solid #333330;border-radius:7px;padding:2px;z-index:1}
  .modesw span{font-family:var(--pmono);font-size:9px;letter-spacing:.05em;padding:3px 9px;border-radius:5px;color:#8b8b85;cursor:pointer}
  .modesw span.on{background:#2f2f2c;color:#e8e8e5}
  .cx{display:none}
  .win.mode-ui .cx{display:flex}
  .win.mode-ui .term-wrap{display:none}
  .term-wrap{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;background:#0d0e0d}
  .term-bar{flex:none;padding:7px 14px;font-family:var(--pmono);font-size:9.5px;color:#6d6d67;border-bottom:1px solid #222220}
  .term{flex:1;min-height:0;overflow:hidden;padding:16px 18px;font-family:var(--pmono);font-size:12.5px;line-height:1.85;color:#c9d1d9}
  .term .l{white-space:pre-wrap}
  .term .prompt{color:#e8e8e5}
  .term .car{color:#8ed6a3}
  .term .dim{color:#5c6169}
  .term .ok{color:#8ed6a3}
  .term .add{color:#8ed6a3}
  .term .mod{color:#e0c68b}
  .term .gap{height:8px}

  /* ==========================================================
     NATIVE DESKTOP APP WINDOW — Cartographer, inside Delegate
     Distinct from both the Maestro browser (teal) and Claude Code
     (dark): light, blue-accent, tabbed desktop app chrome with
     an app-level left sidebar, not a browser window.
     ========================================================== */
  .cg-win{background:#fff}
  .cg-titlebar{flex:none;height:40px;display:flex;align-items:center;gap:10px;padding:0 10px;
               background:#f6f7f8;border-bottom:1px solid #e2e4e8}
  .cg-titlebar .dots{display:flex;gap:7px;align-items:center}
  .cg-titlebar .wtool{display:flex;gap:9px;color:#9aa1a8;margin-left:2px}
  .cg-tabs{display:flex;gap:4px;margin-left:6px}
  .cg-tab{display:flex;align-items:center;gap:6px;height:27px;padding:0 11px 0 8px;border-radius:7px;
          font-size:11.5px;color:#6b7280;white-space:nowrap}
  .cg-tab .ic{width:14px;height:14px;border-radius:3px;display:flex;align-items:center;justify-content:center;
              font-size:8px;font-weight:800;color:#fff;flex:none}
  .cg-tab .ic.d{background:#e6432e}
  .cg-tab .ic.c{background:#047857}
  .cg-tab.on{background:#fff;color:#1f2937;font-weight:500;box-shadow:0 1px 2px rgba(20,28,36,.07);border:1px solid #e2e4e8}
  .cg-titlebar .brand{margin-left:auto;display:flex;align-items:center;gap:12px}
  .cg-titlebar .brand b{font-family:var(--sans);font-size:13px;font-weight:700;letter-spacing:-.01em;color:#1f2937}
  .cg-titlebar .bell{color:#9aa1a8}
  .cg-body{flex:1;min-height:0;display:flex;background:#fff}
  .cg-side{width:186px;flex:none;background:#fff;border-right:1px solid #eceef1;display:flex;flex-direction:column;padding:12px 10px}
  .cg-new{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#374151;padding:6px 7px;border-radius:7px;background:#f3f4f6;margin-bottom:2px}
  .cg-search{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280;padding:6px 7px}
  .cg-navgroup{font-family:var(--pmono);font-size:9px;letter-spacing:.1em;font-weight:600;color:#9aa1a8;margin:14px 0 6px 7px}
  .cg-navitem{font-size:12px;color:#1f2937;padding:5px 7px;border-radius:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cg-navitem.on{background:#eef2ff;color:#3949ab;font-weight:500}
  .cg-side .cg-foot{margin-top:auto;border-top:1px solid #eceef1;padding-top:10px;display:flex;flex-direction:column;gap:9px}
  .cg-addons{font-size:11.5px;color:#6b7280;display:flex;align-items:center;gap:7px}
  .cg-user{display:flex;align-items:center;gap:8px;font-size:12px;color:#1f2937}
  .cg-user .av{width:22px;height:22px;border-radius:50%;background:#2f4bd6;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .cg-main{flex:1;min-width:0;overflow:hidden;padding:16px 18px;
           background:radial-gradient(120% 90% at 20% -10%,#eef8ee 0%,#fdfefb 46%,#ffffff 78%)}
  /* Cartographer gets its own accent (blue/green), never the Maestro teal */
  .cg-main .docnav div.on{background:#e6f3f4;color:#0b7c86;box-shadow:inset 2px 0 0 #0db4b9}
  .cg-main .fic{background:#e6f3f4;color:#0b7c86}
  .cg-main .ptag.tl,.cg-main .lbl.tl{background:#e6f3f4;color:#0b7c86}
  .cg-main .pt tr.hero td{background:#f2f8f9}
  .cg-main .pref{color:#0db4b9}
  .cg-main .btn.primary{background:#0db4b9;border-color:#0db4b9}
  .cg-main .paper-sheet{border-color:#bfdde3}

  /* ==========================================================
     UiPath Studio — case-agent rules (Act I: what the coding agent produced)
     ========================================================== */
  .stu-top{flex:none;display:flex;align-items:center;gap:12px;padding:10px 16px;background:#fff;border-bottom:1px solid var(--p-line)}
  .stu-grid{color:#6b7280}
  .stu-top b.wm{font-family:var(--sans);font-weight:700;font-size:13px;color:#1f2937}
  .stu-crumb{font-size:12.5px;color:#6b7280;display:flex;align-items:center;gap:6px}
  .stu-crumb b{color:#1f2937;font-weight:600}
  .stu-crumb .sep{color:#c1c6cd}
  .stu-toggle{margin-left:auto;display:flex;gap:2px;background:#f3f4f6;border-radius:7px;padding:2px}
  .stu-toggle span{font-size:11.5px;padding:4px 12px;border-radius:6px;color:#6b7280}
  .stu-toggle span.on{background:#fff;color:#1f2937;font-weight:500;box-shadow:0 1px 2px rgba(20,28,36,.08)}
  .stu-icons{display:flex;gap:12px;color:#9aa1a8}
  .stu-ava{width:24px;height:24px;border-radius:50%;background:#e6432e;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .stu-body{flex:1;min-height:0;overflow:hidden;background:#fbfbfc;padding:16px 22px;display:flex;flex-direction:column;gap:14px}
  .stu-pagecrumb{font-size:11.5px;color:#9aa1a8;display:flex;align-items:center;gap:6px}
  .stu-h1{display:flex;align-items:center;gap:9px}
  .stu-h1 span{font-family:var(--sans);font-size:19px;font-weight:600;color:#1f2937}
  .stu-h1 i{color:#9aa1a8}
  .stu-cmpanel{align-self:center;display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--p-line);
               border-radius:12px;padding:9px 12px;box-shadow:0 4px 14px rgba(20,28,36,.06)}
  .stu-cmpanel .icn{width:30px;height:30px;border-radius:8px;background:#eef1ff;display:flex;align-items:center;justify-content:center;color:#5b6fea}
  .stu-cmpanel .lab b{display:block;font-size:12.5px;font-weight:600;color:#1f2937}
  .stu-cmpanel .lab u{display:block;text-decoration:none;font-size:10px;color:#9aa1a8}
  .stu-cmtabs{display:flex;gap:4px;margin-left:8px}
  .stu-cmtabs span{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;padding:6px 10px;border-radius:7px;border:1px solid transparent}
  .stu-cmtabs span.on{border-color:#0db4b9;color:#1f2937;font-weight:500}
  .stu-banner{display:flex;gap:12px;align-items:flex-start;background:#e6f3f4;border-radius:10px;padding:12px 14px}
  .stu-banner .icn2{width:24px;height:24px;flex:none;color:#0db4b9}
  .stu-banner b{display:block;font-size:12.5px;color:#1f2937;margin-bottom:2px}
  .stu-banner p{font-size:11.5px;color:#4b5563;margin:0}
  .stu-banner .x{margin-left:auto;color:#9aa1a8;font-size:13px}
  .stu-toolbar{display:flex;align-items:center;gap:8px}
  .stu-search{flex:1;display:flex;align-items:center;gap:7px;height:30px;padding:0 10px;border:1px solid var(--p-line);
              border-radius:7px;font-size:12px;color:#9aa1a8;background:#fff}
  .stu-filt{font-size:11.5px;color:#4b5563;border:1px solid var(--p-line);border-radius:7px;padding:5px 9px;background:#fff}
  .stu-add{margin-left:auto;background:#0db4b9;color:#fff;font-size:12px;font-weight:500;border-radius:7px;padding:7px 13px;white-space:nowrap}
  table.stu{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--p-line);border-radius:10px;overflow:hidden}
  table.stu th{background:#f9fafb;font-size:10.5px;font-weight:600;color:#6b7280;text-align:left;padding:8px 12px;border-bottom:1px solid var(--p-line)}
  table.stu td{font-size:11.5px;color:#1f2937;padding:8px 12px;border-bottom:1px solid #f1f2f4;vertical-align:middle;white-space:nowrap}
  table.stu tr:last-child td{border-bottom:0}
  table.stu .stu-auto{font-size:9.5px;background:#eef1ff;color:#4a5ac9;border-radius:5px;padding:1.5px 6px;margin-left:6px}
  table.stu .stu-if{font-family:var(--pmono);font-size:10.5px;background:#f3f4f6;border-radius:5px;padding:2px 7px;color:#4b5563}


  /* ==========================================================
     CONTINUOUS IMPROVEMENT SURFACE - real cigui tokens.
     Lives inside Cartographer, so it is teal and must never be
     mistaken for the blue Maestro Case App next to it.
     Vocabulary is cigui's own, except the section name: Feed / Improvements /
     Ledger / Dashboard / Settings, Overrode / Agreed / Unclear,
     Online vs Offline, Apply vs Raise change request.
     ========================================================== */
  .ci{font-family:var(--ci-inter);color:var(--ci-text);background:var(--ci-canvas);
      flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}
  .ci-head{flex:none;height:44px;display:flex;align-items:center;gap:10px;padding:0 18px;
           background:var(--ci-card);border-bottom:1px solid var(--ci-border)}
  .ci-crumb{font-size:12.5px;color:var(--ci-muted);display:flex;align-items:center;gap:7px}
  .ci-crumb b{color:var(--ci-text);font-weight:600}
  .ci-crumb .sep{color:#b3c2c4}
  .ci-horizon{margin-left:auto;display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--ci-muted);
              border:1px solid var(--ci-border);border-radius:6px;padding:4px 10px;background:var(--ci-card)}
  .ci-tabs{flex:none;height:38px;display:flex;align-items:stretch;gap:2px;padding:0 14px;
           background:var(--ci-card);border-bottom:1px solid var(--ci-border)}
  .ci-tabs span{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--ci-muted);padding:0 12px;
                border-bottom:2px solid transparent;white-space:nowrap}
  .ci-tabs span.on{color:var(--ci-text);font-weight:600;border-bottom-color:var(--ci)}
  .ci-body{flex:1;min-height:0;overflow:hidden;padding:15px 18px;display:flex;flex-direction:column;gap:12px}
  .ci-lbl{display:block;font-family:var(--pmono);font-size:8.5px;font-weight:600;letter-spacing:.13em;
          text-transform:uppercase;color:var(--ci-muted)}
  .ci-card{background:var(--ci-card);border:1px solid var(--ci-border);border-radius:8px}
  .ci-card.pad{padding:13px 15px}
  .ci-tool{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .ci-search{flex:1;min-width:150px;display:flex;align-items:center;gap:7px;height:29px;padding:0 10px;
             background:var(--ci-card);border:1px solid var(--ci-border);border-radius:6px;font-size:12px;color:#93a2a3}
  .ci-filt{font-size:11.5px;color:var(--ci-text);background:var(--ci-card);border:1px solid var(--ci-border);
           border-radius:6px;padding:5px 9px;white-space:nowrap}
  .ci-filt b{font-weight:600}
  .ci-count{margin-left:auto;font-family:var(--pmono);font-size:10px;color:var(--ci-muted);white-space:nowrap;
            font-variant-numeric:tabular-nums}
  .ci-count b{color:var(--ci-text)}
  .ci-chip{display:inline-flex;align-items:center;gap:4px;border-radius:100px;padding:2px 8px;font-size:9px;
           font-weight:600;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
  .ci-chip.tl{background:var(--ci-tint);color:#0b7c86}
  .ci-chip.ok{background:#e9f7ee;color:#12703a}
  .ci-chip.warn{background:#fdf4e3;color:#8a6110}
  .ci-chip.err{background:#fdedec;color:#a92f2c}
  .ci-chip.info{background:#e9f1fa;color:#1665b3}
  .ci-chip.vio{background:#f0ebfd;color:#6d4bc4}
  .ci-chip.gy{background:var(--ci-tint-neutral);color:#4a5556}
  .ci-dot{width:6px;height:6px;border-radius:50%;flex:none}
  table.ci-t{width:100%;border-collapse:collapse;font-size:11.5px}
  table.ci-t th{font-family:var(--pmono);font-size:8px;letter-spacing:.11em;text-transform:uppercase;
    color:var(--ci-muted);font-weight:600;text-align:left;padding:7px 10px;border-bottom:1px solid var(--ci-border);
    background:#fafcfc}
  table.ci-t td{padding:6px 10px;border-bottom:1px solid #eef3f3;vertical-align:middle;white-space:nowrap}
  table.ci-t tr:last-child td{border-bottom:0}
  table.ci-t tr.hl td{background:var(--ci-sel)}
  table.ci-t tr.dim td{color:var(--ci-muted)}
  table.ci-t td.k{font-family:var(--pmono);font-size:10.5px;color:var(--ci-muted)}
  table.ci-t td.val{font-size:12px}
  /* an override rides a left accent rather than costing a column, and it is
     info-toned, never warning: cigui treats it as the densest useful signal */
  table.ci-t tr.ovr td:first-child{box-shadow:inset 3px 0 0 var(--ci-info)}
  .ci-sug{background:var(--ci-card);border:1px solid var(--ci-border);border-radius:8px;padding:13px 15px}
  .ci-sug.pri{border-color:#9fdde1;box-shadow:0 1px 2px rgba(13,180,185,.10)}
  .ci-sug h4{font-family:var(--ci-inter);font-size:13.5px;font-weight:600;margin:7px 0 4px;line-height:1.35}
  .ci-sug p{font-size:11.5px;line-height:1.55;color:var(--ci-text);margin:3px 0}
  .ci-sug p.dim{color:var(--ci-muted);font-size:11px}
  .ci-meter{display:inline-flex;gap:2px;align-items:flex-end;height:11px}
  .ci-meter i{width:3px;border-radius:1px;background:var(--ci-mutedot)}
  .ci-meter i.f{background:var(--ci)}
  .ci-meter i:nth-child(1){height:5px}.ci-meter i:nth-child(2){height:8px}.ci-meter i:nth-child(3){height:11px}
  .ci-ev{display:flex;gap:16px;flex-wrap:wrap;margin:8px 0 2px}
  .ci-ev span{font-size:10.5px;color:var(--ci-muted)}
  .ci-ev b{color:var(--ci-text);font-weight:600;font-variant-numeric:tabular-nums}
  .ci-blind{font-size:10.5px;color:var(--ci-muted);border-left:2px solid var(--ci-tint-neutral);
            padding:2px 0 2px 9px;margin-top:8px}
  .ci-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:28px;padding:0 13px;
          border-radius:6px;border:1px solid var(--ci-border);background:var(--ci-card);font-size:12px;
          font-weight:500;color:var(--ci-text);white-space:nowrap}
  .ci-btn.pri{background:var(--ci);border-color:var(--ci);color:#fff}
  .ci-btn.sm{height:24px;font-size:11px;padding:0 10px}
  .ci-rule{border:1px solid var(--ci-border);border-radius:7px;overflow:hidden;margin:7px 0}
  .ci-rule .rh{display:flex;gap:8px;align-items:center;background:#fafcfc;padding:6px 11px;
               border-bottom:1px solid var(--ci-border);font-size:11px;font-weight:600}
  .ci-rule .rb{padding:8px 11px;font-family:var(--pmono);font-size:10.5px;line-height:1.75;color:var(--ci-text)}
  .ci-rule .rb .kw{color:#0b7c86;font-weight:700}
  .ci-rule.add{border-color:#a8dcc0}.ci-rule.add .rh{background:#f0f8f3}
  .ci-fx{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
  .ci-fx .b{background:var(--ci-card);border:1px solid var(--ci-border);border-radius:8px;padding:10px 12px}
  .ci-fx .v{font-size:20px;font-weight:600;line-height:1.1;font-variant-numeric:tabular-nums}
  .ci-fx .v small{font-size:11px;font-weight:600;color:var(--ci-muted)}
  .ci-fx .k{font-family:var(--pmono);font-size:8px;letter-spacing:.1em;text-transform:uppercase;
            color:var(--ci-muted);margin-top:3px}
  .ci-fx .d{font-size:9.5px;font-weight:600;color:#12703a;margin-top:2px}
  .ci-kv{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 12px;align-items:baseline}
  .ci-kv dt{font-family:var(--pmono);font-size:9.5px;color:var(--ci-muted);white-space:nowrap}
  .ci-kv dd{font-size:12px;color:var(--ci-text)}
  .ci-act{display:flex;align-items:flex-start;gap:9px;padding:6px 0;border-top:1px solid #eef3f3;font-size:11px}
  .ci-act:first-of-type{border-top:0}
  .ci-act .who{font-weight:600;color:var(--ci-text);white-space:nowrap}
  .ci-act .what{color:var(--ci-muted)}

  /* ---- the injected signal-capture widget, sitting on the Case App ----
     Alin's design intent: one panel injected on top of whatever app is
     underneath. It carries context and feedback only. The decision itself
     stays in the form, so the buttons are never duplicated. ---- */
  .aug{position:absolute;top:0;bottom:0;right:560px;width:302px;z-index:4;background:var(--ci-card);
       border-left:1px solid var(--ci-border);border-right:1px solid var(--ci-border);
       box-shadow:-10px 0 26px -14px rgba(14,27,27,.24);display:flex;flex-direction:column;
       font-family:var(--ci-inter)}
  .aug .ah{flex:none;display:flex;align-items:center;gap:8px;padding:11px 13px;border-bottom:1px solid var(--ci-border);
           background:var(--ci-tint)}
  .aug .ah .ic{width:22px;height:22px;flex:none;border-radius:6px;background:var(--ci);color:#fff;font-size:11px;
               font-weight:700;display:flex;align-items:center;justify-content:center}
  .aug .ah b{font-size:12px;font-weight:600;color:var(--ci-text)}
  .aug .ah u{display:block;text-decoration:none;font-family:var(--pmono);font-size:8px;letter-spacing:.1em;
             text-transform:uppercase;color:#0b7c86}
  .aug .ab{flex:1;min-height:0;overflow:hidden;padding:12px 13px;display:flex;flex-direction:column;gap:11px}
  .aug .why{font-size:11.5px;line-height:1.5;color:var(--ci-text)}
  .aug .why b{font-weight:600}
  .aug .erow{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--ci-text);padding:5px 0;
             border-top:1px solid #eef3f3}
  .aug .erow:first-of-type{border-top:0}
  .aug .erow .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .aug .erow .tb{display:flex;gap:3px;flex:none}
  .aug .erow .tb i{font-style:normal;font-size:10px;width:19px;height:19px;border-radius:5px;
                   border:1px solid var(--ci-border);display:flex;align-items:center;justify-content:center;color:#93a2a3}
  .aug .erow .tb i.up{border-color:var(--ci);color:var(--ci);background:var(--ci-tint)}
  .aug .agg{font-size:11px;color:var(--ci-muted);line-height:1.5;background:var(--ci-tint);
            border-radius:7px;padding:8px 10px}
  .aug .agg b{color:var(--ci-text);font-weight:600}
  .aug .opt2{font-size:11px;color:#93a2a3;border:1px dashed var(--ci-border);border-radius:7px;padding:8px 10px}
  .aug .af{flex:none;padding:9px 13px;border-top:1px solid var(--ci-border);background:#fafcfc;
           font-family:var(--pmono);font-size:8.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ci-muted)}


  /* ==========================================================
     COVERAGE DECISION CONSOLE - Alin's design, adopted 25 Aug.
     Original: vendor/alin-console/coverage-decision-console.html.
     Three columns: context rail with the 302px widget lane, the
     assembled case, and a decision column where the money, the
     authority meter and the rationale live. His mechanics, our
     narrative facts (torque 42->50 Nm, 4,100 hours, SR-440).
     ========================================================== */
  .cn{flex:1;min-height:0;display:flex;flex-direction:column;background:var(--p-bg);font-size:11.5px}
  .cn-top{flex:none;display:flex;align-items:center;gap:9px;padding:5px 14px;background:#fff;
          border-bottom:1px solid var(--p-line)}
  .cn-top .lg{width:20px;height:20px;border-radius:6px;background:var(--p-teal);color:#fff;font-size:11px;
              font-weight:700;display:flex;align-items:center;justify-content:center}
  .cn-top .nm{font-weight:600;font-size:12.5px}
  .cn-top .who{margin-left:auto;display:flex;align-items:center;gap:8px;text-align:right}
  .cn-top .who b{display:block;font-size:11px;font-weight:600;line-height:1.25}
  .cn-top .who u{display:block;text-decoration:none;font-size:9.5px;color:var(--p-mute);line-height:1.25}
  .cn-top .who i{width:22px;height:22px;border-radius:50%;background:var(--p-teal-50);color:var(--p-teal-700);
                 font-style:normal;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .cn-head{flex:none;padding:5px 14px 5px;background:#fff;border-bottom:1px solid var(--p-line-2)}
  .cn-head .r1{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .cn-head h4{font-family:var(--serif);font-size:15px;font-weight:500;letter-spacing:-.02em}
  .cn-id{display:flex;align-items:center;gap:5px 9px;flex-wrap:wrap;font-size:10.3px;color:var(--p-mute);margin-top:3px}
  .cn-id b{color:var(--p-ink);font-weight:500}
  .cn-id .ok{color:var(--p-green-ink);font-weight:500}
  .cn-src{font-family:var(--pmono);font-size:7.5px;font-weight:500;letter-spacing:.09em;text-transform:uppercase;
          color:var(--p-mute);background:var(--p-muted-bg);border-radius:3px;padding:1.5px 4px;white-space:nowrap}
  .cn-tiles{display:flex;gap:7px;margin-top:4px}
  .cn-tile{flex:1;display:flex;align-items:baseline;gap:8px;background:#fff;border:1px solid var(--p-line);border-radius:8px;padding:3px 10px}
  .cn-tile b{font-family:var(--serif);font-size:14px;font-weight:500;letter-spacing:-.02em;line-height:1.15}
  .cn-tile u{text-decoration:none;font-family:var(--pmono);font-size:7.5px;letter-spacing:.08em;
             text-transform:uppercase;color:var(--p-mute);margin-top:1px}
  .cn-tile.alarm{border-color:var(--p-red-line);background:linear-gradient(#fff,var(--p-red))}
  .cn-tile.alarm b{color:var(--p-red-ink)}
  .cn-tile.clock{border-color:#e6d9b0;background:linear-gradient(#fff,var(--p-yellow))}
  .cn-tile.clock b{color:var(--p-yellow-ink)}
  .cn3{flex:1;min-height:0;display:grid;grid-template-columns:232px minmax(0,1fr) 316px;gap:8px;
       padding:8px 14px 10px;align-items:start;overflow:hidden}
  .cn3 .col{display:grid;gap:7px;min-width:0}
  .cn-duo{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:7px;align-items:start}
  .cn .pad{padding:6px 10px}
  .cn .lbl{font-size:8px}
  .cn .drow{display:flex;align-items:baseline;gap:8px;padding:2px 0;border-top:1px solid var(--p-line);font-size:10.5px}
  .cn .drow:first-of-type{border-top:0}
  .cn .drow .k{flex:none;width:88px;color:var(--p-mute)}
  .cn .drow .v{flex:1;min-width:0;font-weight:500;text-align:right}
  .cn .drow .v.warn{color:var(--p-red-ink)}
  .cn-tl{display:flex;gap:8px;padding:2.5px 0;border-top:1px solid var(--p-line);font-size:10.3px;line-height:1.4}
  .cn-tl:first-of-type{border-top:0}
  .cn-tl .t{flex:none;width:38px;font-family:var(--pmono);font-size:9px;color:var(--p-mute);padding-top:1px}
  .cn-tl .c em{font-style:normal;display:block;color:var(--p-mute);font-size:9.3px}
  .cn-tl.now{background:var(--p-teal-surf);margin:0 -6px;padding:4px 6px;border-radius:5px;border-top-color:transparent}
  .cn-tl.now .t,.cn-tl.now .c{color:var(--p-teal-700);font-weight:500}
  .cn-gain{background:var(--p-green);border-radius:6px;padding:3px 9px;margin-top:4px}
  .cn-gain{display:flex;align-items:baseline;gap:7px}
  .cn-gain b{font-family:var(--serif);font-size:13px;font-weight:500;color:var(--p-green-ink)}
  .cn-gain span{font-family:var(--pmono);font-size:7.5px;letter-spacing:.08em;text-transform:uppercase;
                color:var(--p-green-ink);opacity:.85}
  .cn-lane{border:1.5px dashed var(--p-teal-line);border-radius:9px;padding:5px 10px;background:var(--p-teal-surf)}
  .cn-lane .rowu{display:flex;align-items:center;gap:7px;padding:2px 0;border-top:1px solid var(--p-teal-line);font-size:10.3px}
  .cn-lane .rowu:first-of-type{border-top:0}
  .cn-lane .rowu i{margin-left:auto;font-style:normal;font-size:10px;color:var(--p-mute);letter-spacing:2px}
  .cn-lane .rowu i.on{color:var(--p-green-ink);font-weight:700}
  .cn-lane .agg{font-size:10px;color:#3b5a63;line-height:1.4;margin-top:4px;padding-top:4px;border-top:1px solid var(--p-teal-line)}
  .cn-basis{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:10px;color:var(--p-mute)}
  .cn-basis b{color:var(--p-ink);font-weight:500}
  .cn-cause2{display:grid;grid-template-columns:1fr 1fr;gap:11px}
  .cn-cause{border:1px solid var(--p-line);border-radius:9px;padding:11px 13px;background:#fff;min-width:0}
  .cn-cause.pro{border-color:var(--p-green-line);background:linear-gradient(#fff 55%,var(--p-green))}
  .cn-cause.con{border-color:var(--p-red-line);background:linear-gradient(#fff 55%,var(--p-red))}
  .cn-cause h5{font-family:var(--serif);font-size:16px;font-weight:500;letter-spacing:-.015em;line-height:1.25;margin:5px 0 6px}
  .cn-cause p{font-size:12px;line-height:1.55;color:#3b444f}
  .cn-cause .pts{font-family:var(--pmono);font-size:7.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
                 margin-top:6px;display:flex;align-items:center;gap:6px}
  .cn-cause.pro .pts{color:var(--p-green-ink)}
  .cn-cause.con .pts{color:var(--p-red-ink)}
  .cn-cause .pts .srcs{margin-left:auto;display:inline-flex;gap:3px}
  .cn-verdict{margin-top:6px;border:1px solid var(--p-line-2);border-radius:7px;background:var(--p-paper);padding:4px 10px}
  .cn-verdict b{font-family:var(--serif);font-size:12px;font-weight:500}
  .cn-verdict p{font-size:10.3px;color:var(--p-mute);margin-top:2px;line-height:1.45}
  table.cn-pt{width:100%;border-collapse:collapse}
  table.cn-pt td{border-top:1px solid var(--p-line);padding:1.5px 0;font-size:10.2px;vertical-align:top}
  table.cn-pt tr:first-child td{border-top:0}
  table.cn-pt .g{width:18px;font-family:var(--pmono);font-size:10.5px;font-weight:600}
  table.cn-pt .g.p{color:var(--p-green-ink)}
  table.cn-pt .g.f{color:var(--p-red-ink)}
  table.cn-pt .g.u{color:var(--p-mute)}
  table.cn-pt .n{font-weight:500}
  table.cn-pt .d{color:var(--p-mute);font-size:9.8px;display:block}
  table.cn-pt tr.fail .n{color:var(--p-red-ink)}
  table.cn-pt .s{width:64px;text-align:right;white-space:nowrap}
  table.cn-cost{width:100%;border-collapse:collapse}
  table.cn-cost td{border-top:1px solid var(--p-line);padding:1.5px 0;font-size:10.2px}
  table.cn-cost tr:first-child td{border-top:0}
  table.cn-cost .amt{text-align:right;font-family:var(--pmono);font-size:10.3px;white-space:nowrap;padding-left:10px}
  table.cn-cost .s{width:64px;text-align:right}
  table.cn-cost tr.tot td{border-top:1.5px solid var(--p-line-2);font-weight:600;padding-top:5px}
  .cn-hist{display:flex;gap:9px;font-size:10.3px;line-height:1.45}
  .cn-hist .hl{flex:none;width:86px}
  .cn-hist .hl b{font-family:var(--pmono);font-size:9.5px;font-weight:600;display:block}
  .cn-hist .hl u{text-decoration:none;font-family:var(--pmono);font-size:8px;letter-spacing:.06em;
                 text-transform:uppercase;color:var(--p-mute)}
  .cn-flag{margin-top:5px;border:1px dashed var(--p-line-2);border-radius:7px;padding:5px 9px;
           font-size:10px;line-height:1.45;color:#4a5560;background:var(--p-paper)}
  .cn-flag b{font-weight:600;color:var(--p-ink)}
  .cn-dec{background:#fff;border:1px solid var(--p-teal-line);border-radius:10px;overflow:hidden;
          box-shadow:0 1px 2px rgba(20,28,36,.04),0 8px 22px rgba(20,28,36,.055)}
  .cn-dec .dhd{display:flex;align-items:center;gap:8px;padding:4px 11px;border-bottom:1px solid var(--p-line);
               background:var(--p-teal-surf)}
  .cn-dec .dhd b{font-family:var(--serif);font-size:13px;font-weight:500}
  .cn-dec .dbody{padding:5px 10px;display:flex;flex-direction:column;gap:4px}
  .cn-opt{display:flex;gap:8px;align-items:flex-start;border:1px solid var(--p-line-2);border-radius:8px;
          padding:3px 8px;background:#fff}
  .cn-opt .rad{flex:none;width:12px;height:12px;border-radius:50%;border:1.5px solid #b3b0a8;margin-top:2px;background:#fff}
  .cn-opt b{display:block;font-size:11px;font-weight:600;line-height:1.3}
  .cn-opt em{font-style:normal;display:block;font-size:9.8px;color:var(--p-mute);line-height:1.35}
  .cn-opt.on{border-color:var(--p-teal);background:var(--p-teal-surf);box-shadow:inset 0 0 0 1px var(--p-teal)}
  .cn-opt.on .rad{border-color:var(--p-teal);border-width:3.5px}
  .cn-split{border:1px solid var(--p-line);border-radius:8px;background:var(--p-paper);overflow:hidden}
  .cn-split .shd{display:flex;padding:4px 9px 3px;border-bottom:1px solid var(--p-line);background:#fff}
  .cn-split .shd .lbl{flex:1}
  .cn-split .shd .h{font-family:var(--pmono);font-size:7.5px;letter-spacing:.06em;text-transform:uppercase;
                    color:var(--p-mute);width:62px;text-align:right;flex:none}
  .cn-srow{display:flex;align-items:baseline;padding:1.5px 8px;border-top:1px solid var(--p-line);font-size:10.2px}
  .cn-srow:first-of-type{border-top:0}
  .cn-srow .nm2{flex:1;min-width:0}
    .cn-srow .a{width:62px;flex:none;text-align:right;font-family:var(--pmono);font-size:10px;white-space:nowrap}
  .cn-srow .a.z{color:#c3c0b9}
  .cn-srow .a.gw{color:var(--p-green-ink);font-weight:600}
  .cn-srow.tot{border-top:1.5px solid var(--p-line-2);background:#fff;padding:5px 9px}
  .cn-srow.tot .nm2{font-weight:600}
  .cn-srow.tot .a{font-weight:600;color:var(--p-ink)}
  .cn-auth{border:1px solid var(--p-green-line);border-radius:8px;padding:5px 9px;
           background:linear-gradient(#fff,var(--p-green))}
  .cn-auth .atop{display:flex;align-items:baseline;gap:8px;margin-bottom:5px}
  .cn-auth .atop b{font-family:var(--pmono);font-size:11px;font-weight:600;margin-left:auto}
  .cn-meter{height:6px;border-radius:999px;background:var(--p-muted-bg);position:relative;overflow:hidden}
  .cn-meter i{position:absolute;left:0;top:0;bottom:0;border-radius:999px;background:var(--p-green-ink)}
  .cn-auth .mtick{display:flex;justify-content:space-between;margin-top:3px}
  .cn-auth .mtick span{font-family:var(--pmono);font-size:7.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--p-mute)}
  .cn-auth .amsg{font-size:10px;line-height:1.4;margin-top:5px;font-weight:500;color:var(--p-green-ink)}
  .cn-idstrip{display:flex;background:#fff;border:1px solid var(--p-line);border-radius:9px;overflow:hidden}
  .cn-idstrip div{flex:1;min-width:0;padding:8px 12px;border-left:1px solid var(--p-line)}
  .cn-idstrip div:first-child{border-left:0}
  .cn-idstrip span{display:block;font-family:var(--pmono);font-size:7.5px;letter-spacing:.11em;
                   text-transform:uppercase;color:var(--p-mute);margin-bottom:3px}
  .cn-idstrip b{display:block;font-size:11.5px;font-weight:600;line-height:1.3}
  .cn-idstrip div.rec{background:var(--p-teal-surf)}
  .cn-idstrip div.rec b{color:var(--p-teal-700)}
  .cn-slaline{display:flex;align-items:center;gap:10px;font-size:11.5px;color:var(--p-mute)}
  .cn2{flex:1;min-height:0;display:grid;grid-template-columns:302px minmax(0,1fr) 372px;gap:13px;align-items:start}
  .cn-more{display:flex;gap:9px;align-items:center;background:#fff;border:1px solid var(--p-line);
           border-radius:9px;padding:10px 13px;font-size:11.5px;color:var(--p-mute);line-height:1.5}
  .cn-more .chev{font-size:15px;color:var(--p-mute);flex:none;line-height:1}
  .cn-agree{border:1px solid var(--p-teal-line);border-radius:8px;padding:8px 10px;background:var(--p-teal-surf)}
  .cn-tri{display:flex;gap:7px;align-items:center;font-size:10.8px;padding:3.5px 0;color:var(--p-ink)}
  .cn-tri .rad{width:11px;height:11px;flex:none;border-radius:50%;border:1.5px solid #b3b0a8;background:#fff}
  .cn-tri.on{font-weight:600}
  .cn-tri.on .rad{border-color:var(--p-teal);border-width:3.5px}
  .cn-rat{border:1px solid var(--p-line-2);border-radius:8px;padding:4px 9px;background:#fff}
  .cn-rat p{font-size:10px;line-height:1.4;color:var(--p-ink);margin-top:3px}
  .cn-rat .dr{font-family:var(--pmono);font-size:7.5px;letter-spacing:.08em;text-transform:uppercase;
              color:var(--p-mute);margin-top:5px;display:flex;gap:7px}
  .cn-rat .dr a{color:var(--p-teal-700);text-decoration:none;border-bottom:1px solid var(--p-teal-line)}
  .cn-ds{display:flex;gap:7px;align-items:flex-start;padding:2.5px 0;font-size:10px;line-height:1.4}
  .cn-ds i{flex:none;width:4px;height:4px;border-radius:50%;background:var(--p-teal);margin-top:5px;font-style:normal}
  .cn-ds u{text-decoration:none;color:var(--p-mute)}
  .cn-foot{border-top:1px solid var(--p-line);padding:5px 10px;background:var(--p-paper);
           display:flex;flex-direction:column;gap:3px}
  .cn-foot .othr{display:flex;gap:5px}
  .cn-foot .othr .btn{flex:1;height:22px;padding:0 5px;font-size:9.5px}
  .cn-foot .btn.primary{height:26px}
  .cn-foot .esc{font-family:var(--pmono);font-size:7.5px;letter-spacing:.07em;text-transform:uppercase;
                color:var(--p-mute);text-align:center;line-height:1.5}

  /* ==========================================================
     PRODUCT UI (everything below the address bar)
     ========================================================== */
  .screen{position:relative;flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;
          background:var(--p-bg);color:var(--p-ink);font-family:var(--sans);font-size:13.5px;line-height:1.55}
  .screen .tag{font-family:var(--pmono);font-size:8.5px;font-weight:600;border-radius:4px;padding:1.5px 4px;letter-spacing:.02em}
  .screen .tag.EVT{background:#f4eefb;color:var(--p-violet-ink)}
  /* app top nav */
  .ptop{flex:none;display:flex;align-items:center;gap:12px;padding:9px 18px;background:rgba(255,255,255,.92);border-bottom:1px solid var(--p-line)}
  .plogo{width:30px;height:30px;flex:none;border-radius:7px;background:var(--p-teal);color:#fff;
         font-family:var(--serif);font-size:15px;font-weight:500;display:flex;align-items:center;justify-content:center}
  .pname{font-family:var(--serif);font-size:16px;font-weight:500;letter-spacing:-.01em;white-space:nowrap}
  .pnav{display:flex;gap:16px;margin-left:12px;font-size:12.5px;color:var(--p-mute)}
  .pnav span{padding-bottom:2px;border-bottom:2px solid transparent;white-space:nowrap}
  .pnav span.on{color:var(--p-ink);font-weight:500;border-bottom-color:var(--p-teal)}
  .ptools{margin-left:auto;display:flex;align-items:center;gap:8px}
  .pchip{display:flex;align-items:center;gap:7px;border:1px solid var(--p-line);border-radius:7px;background:#fff;padding:4px 9px}
  .pchip i{width:7px;height:7px;border-radius:50%;background:var(--p-teal);opacity:.55;flex:none}
  .pchip b{display:block;font-size:11.5px;font-weight:500;line-height:1.3}
  .pchip u{display:block;text-decoration:none;font-size:10.5px;color:var(--p-mute);line-height:1.3}
  /* main region */
  .pmain{flex:1;min-height:0;overflow:hidden;padding:18px 20px;display:flex;flex-direction:column;gap:14px}
  .pmain.p0{padding:0}
  .prow{display:flex;align-items:center;gap:14px;flex-wrap:nowrap}
  /* primitives */
  .pcard{background:#fff;border:1px solid var(--p-line);border-radius:10px}
  .pcard.paper{background:var(--p-paper)}
  .pcard.flat{border-radius:10px}
  .pad{padding:14px 16px}
  .pad-s{padding:11px 13px}
  .lbl{font-family:var(--pmono);font-size:9px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--p-mute);display:block}
  .lbl.tl{color:var(--p-teal-700)}
  .ptitle{font-family:var(--serif);font-size:16.5px;font-weight:500;letter-spacing:-.02em;line-height:1.25}
  .phead{font-family:var(--serif);font-size:22px;font-weight:500;letter-spacing:-.025em;line-height:1.2}
  .psub{font-size:12.5px;color:var(--p-mute)}
  .pbody{font-size:12.5px;line-height:1.6}
  .pmono{font-family:var(--pmono);font-size:10.5px;color:var(--p-mute);letter-spacing:.04em}
  .prule{height:1px;background:var(--p-line);border:0}
  .ptag{display:inline-flex;align-items:center;border-radius:999px;padding:2.5px 9px;font-size:9.5px;font-weight:600;
        letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
  .ptag.tl{background:var(--p-teal-50);color:var(--p-teal-700)}
  .ptag.bl{background:var(--p-blue);color:var(--p-blue-ink)}
  .ptag.gn{background:var(--p-green);color:var(--p-green-ink)}
  .ptag.yl{background:var(--p-yellow);color:var(--p-yellow-ink)}
  .ptag.rd{background:var(--p-red);color:var(--p-red-ink)}
  .ptag.gy{background:var(--p-muted-bg);color:var(--p-mute)}
  .ptag.vt{background:var(--p-violet);color:var(--p-violet-ink)}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:29px;padding:0 13px;border-radius:6px;
       border:1px solid var(--p-line-2);background:#fff;font-size:12px;font-weight:500;color:var(--p-ink);white-space:nowrap}
  .btn.primary{background:var(--p-teal);border-color:var(--p-teal);color:#fff}
  .btn.sm{height:25px;font-size:11px;padding:0 10px}
  .psearch{display:flex;align-items:center;gap:7px;height:28px;min-width:236px;border:1px solid var(--p-line-2);
           border-radius:6px;padding:0 10px;background:#fff;color:#9aa1a8;font-size:12px}
  .ptabs{display:flex;gap:18px;font-size:12.5px;color:var(--p-mute)}
  .ptabs span{padding-bottom:3px;border-bottom:2px solid transparent;white-space:nowrap}
  .ptabs span.on{color:var(--p-ink);font-weight:500;border-bottom-color:var(--p-teal)}
  /* tables */
  table.pt{width:100%;border-collapse:collapse;table-layout:fixed}
  .pt th{height:28px;background:var(--p-paper);border-top:1px solid var(--p-line);border-bottom:1px solid var(--p-line);
         font-family:var(--pmono);font-size:9px;font-weight:400;letter-spacing:.12em;text-transform:uppercase;
         color:var(--p-mute);text-align:left;padding:0 14px;white-space:nowrap}
  .pt td{border-bottom:1px solid var(--p-line);padding:11px 14px;font-size:12.5px;vertical-align:middle}
  .pt tr.hero td{background:var(--p-teal-surf)}
  .pt tbody tr:last-child td{border-bottom:0}
  .pt .nm{display:block;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .pref{font-family:var(--pmono);font-size:11.5px;color:var(--p-teal);font-weight:500;display:block}
  .psubx{display:block;font-size:11.5px;color:var(--p-mute);margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .ptail td{font-family:var(--pmono);font-size:10.5px;letter-spacing:.04em;color:var(--p-mute);padding:9px 14px;background:var(--p-paper)}
  /* KPI cells */
  .kval{font-family:var(--serif);font-size:33px;font-weight:500;letter-spacing:-.03em;line-height:1}
  .kval small{font-size:15px;color:var(--p-mute);font-family:var(--serif)}
  .kval.txt{font-size:18px;letter-spacing:-.015em;line-height:1.2}
  .kdelta{font-family:var(--pmono);font-size:10.5px;color:var(--p-yellow-ink)}
  svg.spark{display:block;width:100%;height:36px;margin-top:11px}
  /* facts strip under a case header */
  .facts{display:flex;border-top:1px solid var(--p-line)}
  .fact{flex:1;min-width:0;padding:9px 16px;border-right:1px solid var(--p-line)}
  .fact:last-child{border-right:0}
  .fact b{display:block;font-size:12.5px;font-weight:500;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  /* vertical stage timeline */
  .stline{border-left:1px solid var(--p-line-2);margin-left:3px}
  .st{position:relative;display:flex;gap:10px;align-items:baseline;padding:5px 0 5px 15px;font-size:12.5px}
  .st::before{content:"";position:absolute;left:-4.5px;top:10px;width:8px;height:8px;border-radius:50%;background:var(--p-line-2)}
  .st.done{color:var(--p-mute)} .st.done::before{background:var(--p-green-ink)}
  .st.cur{font-weight:500} .st.cur::before{background:var(--p-teal);box-shadow:0 0 0 4px var(--p-teal-50)}
  .st.dim{color:#a9aca6}
  .st .when{margin-left:auto;font-family:var(--pmono);font-size:9.5px;color:var(--p-mute)}
  /* document + detail + update rows */
  .docrow{display:grid;grid-template-columns:30px minmax(0,1fr) auto;align-items:center;gap:9px;padding:7px 0;
          border-bottom:1px dashed var(--p-line);font-size:12px}
  .docrow:last-child{border-bottom:0}
  .docrow .ext{font-family:var(--pmono);font-size:8px;color:var(--p-mute);text-transform:uppercase;
               border:1px solid var(--p-line);border-radius:4px;padding:2px 0;text-align:center;letter-spacing:.06em}
  .docrow .nm{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .docrow .meta{font-family:var(--pmono);font-size:9.5px;color:var(--p-mute)}
  .drow{display:flex;justify-content:space-between;gap:12px;align-items:baseline;padding:5.5px 0;border-bottom:1px dashed var(--p-line);font-size:12px}
  .drow:last-child{border-bottom:0}
  .drow .k{color:var(--p-mute)}
  .drow .v{font-family:var(--pmono);font-size:10.5px;text-align:right;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .upd{display:flex;gap:10px;align-items:baseline;padding:6px 0;border-bottom:1px dashed var(--p-line);font-size:12px}
  .upd:last-child{border-bottom:0}
  .upd .when{margin-left:auto;font-family:var(--pmono);font-size:9.5px;color:var(--p-mute);white-space:nowrap}
  /* feature icon */
  .fic{width:26px;height:26px;flex:none;border-radius:7px;background:var(--p-teal-50);color:var(--p-teal-700);
       display:flex;align-items:center;justify-content:center;font-size:12px}
  /* ---------- process scribe (PDD) ---------- */
  .docnav div{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:var(--p-mute);padding:6px 9px;border-radius:6px;line-height:1.4}
  .docnav div.on{background:var(--p-teal-surf);color:var(--p-teal-700);font-weight:500;box-shadow:inset 2px 0 0 var(--p-teal)}
  .docnav div em{font-family:var(--pmono);font-size:9.5px;font-style:normal;flex:none;opacity:.8}
  .paper-sheet{background:#fff;border:1px solid var(--p-line);border-radius:10px;padding:20px 26px;overflow:hidden}
  .paper-sheet h1{font-family:var(--serif);font-size:24px;font-weight:500;letter-spacing:-.025em;line-height:1.2;margin:8px 0 6px}
  .paper-sheet h2{font-family:var(--serif);font-size:15px;font-weight:500;letter-spacing:-.015em;margin:0 0 6px}
  .paper-sheet p{font-size:12.5px;line-height:1.65;color:#3f4550}
  /* ---------- coding agent session ---------- */
  .thread{display:flex;flex-direction:column;gap:12px}
  .msg{display:flex;gap:10px;align-items:flex-start}
  .msg .who{width:26px;height:26px;flex:none;border-radius:7px;display:flex;align-items:center;justify-content:center;
            font-family:var(--pmono);font-size:9px;font-weight:600}
  .msg .who.u{background:var(--p-muted-bg);color:#5f625c}
  .msg .who.a{background:var(--p-teal);color:#fff;font-family:var(--serif);font-size:13px}
  .msg .bub{flex:1;min-width:0;border:1px solid var(--p-line);border-radius:10px;background:#fff;padding:11px 13px}
  .msg.u .bub{background:var(--p-teal-surf);border-color:var(--p-teal-line)}
  .msg .bub p{font-size:12.5px;line-height:1.6}
  .cklist{display:grid;gap:6px;margin-top:9px}
  .cki{display:flex;gap:9px;align-items:center;font-size:12px;border:1px solid var(--p-line);border-radius:7px;
       padding:7px 10px;background:var(--p-paper)}
  .cki .ck{width:15px;height:15px;flex:none;border-radius:50%;background:var(--p-green);color:var(--p-green-ink);
           font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .prompt-in{display:flex;align-items:center;gap:9px;height:34px;border:1px solid var(--p-line-2);border-radius:8px;
             background:#fff;padding:0 12px;font-size:12px;color:#a3a8a1}
  /* ---------- case-plan design canvas ---------- */
  /* ---------- instance management: single-instance + migrate modal, close to the real OOTB screens ---------- */
  .iv-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .iv-back{color:var(--p-mute);font-size:12px}
  .iv-crumb{font-size:12px;color:var(--p-mute)}
  .iv-crumb b{color:var(--p-ink);font-weight:500}
  .iv-status{margin-left:auto;display:flex;align-items:center;gap:10px}
  .iv-status .lbl2{font-size:11px;color:var(--p-mute)}
  .iv-title{font-family:var(--serif);font-size:19px;font-weight:500;letter-spacing:-.02em}
  .iv-diagram{position:relative;border:1px solid var(--p-line);border-radius:10px;background:#fbfbfc;padding:22px 16px 16px}
  .iv-cmchip{position:absolute;top:-16px;left:50%;transform:translateX(-50%);background:#fff;border:1px solid var(--p-line);
             border-radius:10px;padding:6px 12px;display:flex;align-items:center;gap:8px;box-shadow:0 4px 10px rgba(20,28,36,.08)}
  .iv-row{display:flex;align-items:center;justify-content:center;gap:0;overflow-x:auto;padding:4px 0}
  .iv-node{flex:none;width:108px;border:1.3px solid var(--p-line);border-radius:8px;background:#fff;padding:6px 8px;position:relative}
  .iv-node.on{border-color:var(--p-teal)}
  .iv-node b{display:block;font-size:9.5px;font-weight:600;color:var(--p-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .iv-node span{display:block;font-size:7.5px;color:var(--p-mute);margin-top:1px}
  .iv-node .tasks{margin-top:4px;display:grid;gap:1.5px}
  .iv-node .tasks i{display:block;height:2px;border-radius:2px;background:#e4e8ee}
  .iv-node .tasks i.on{background:var(--p-teal)}
  .iv-arrow2{flex:none;color:#c1c6cd;font-size:12px;padding:0 4px}
  .iv-band{margin-top:10px;background:#fbf4e6;border:1px solid #f0dfb3;border-radius:8px;padding:8px 10px}
  .iv-band .cap{font-size:9px;color:#946300;font-weight:600;margin-bottom:6px}
  .iv-band .iv-row{gap:8px}
  .iv-zoom{position:absolute;bottom:8px;right:10px;display:flex;gap:5px}
  .iv-zoom span{width:20px;height:20px;border:1px solid var(--p-line);border-radius:5px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--p-mute)}
  .iv-tabbar{display:flex;align-items:center;padding:9px 12px;border-bottom:1px solid var(--p-line)}
  .iv-tabbar span{font-size:11.5px;color:var(--p-mute);margin-right:16px}
  .iv-tabbar span.on{color:var(--p-teal);font-weight:600;border-bottom:2px solid var(--p-teal);padding-bottom:9px;margin-bottom:-9px}
  .iv-tabbar .ic{margin-left:auto;display:flex;gap:9px;color:var(--p-mute)}
  /* migrate modal, styled after the OOTB dialog */
  .iv-backdrop{position:absolute;inset:0;background:rgba(23,29,45,.42);display:flex;align-items:center;justify-content:center;z-index:2}
  .iv-modal{width:460px;background:#fff;border-radius:12px;box-shadow:0 30px 60px rgba(0,0,0,.35);padding:20px 22px}
  .iv-modal h4{font-family:var(--serif);font-size:16px;font-weight:600;margin-bottom:8px}
  .iv-modal p{font-size:11.5px;color:var(--p-mute);line-height:1.5;margin-bottom:14px}
  .iv-verrow{display:flex;align-items:center;gap:10px;margin-bottom:14px}
  .iv-verfield{flex:1;border:1px solid var(--p-line);border-radius:7px;padding:7px 10px}
  .iv-verfield .l{font-size:9px;color:var(--p-mute);display:block;margin-bottom:2px}
  .iv-verfield .v{font-size:12px;color:var(--p-ink)}
  .iv-modal table.pt{margin-bottom:12px}
  .iv-cfield{border:1px solid var(--p-line);border-radius:7px;padding:8px 10px;font-size:11px;color:var(--p-mute);margin-bottom:16px}
  .canvas{flex:1;min-height:0;border:1px solid var(--p-line);border-radius:10px;background:#fff;
          background-image:radial-gradient(#dfe3e8 1px,transparent 1px);background-size:22px 22px;
          padding:13px 15px;display:flex;flex-direction:column;gap:11px;overflow:hidden}
  .cbar{display:flex;align-items:center;gap:10px}
  .cm-chip{display:inline-flex;gap:9px;align-items:center;background:#fff;border:1px solid var(--p-line-2);
           border-radius:9px;padding:6px 11px;box-shadow:0 1px 2px rgba(20,30,40,.05)}
  .cm-chip .fic{width:24px;height:24px}
  .cm-chip b{display:block;font-family:var(--serif);font-size:13px;font-weight:500;line-height:1.25}
  .cm-chip u{display:block;text-decoration:none;font-size:10.5px;color:var(--p-mute);line-height:1.25}
  .zoom{margin-left:auto;display:flex;align-items:center;gap:2px;border:1px solid var(--p-line-2);border-radius:6px;
        background:#fff;height:26px;padding:0 4px;font-family:var(--pmono);font-size:10px;color:var(--p-mute)}
  .zoom s{text-decoration:none;padding:0 6px;color:#6f7a85}
  .srow{display:grid;gap:19px}
  .pstage{position:relative;background:#fff;border:1px solid var(--p-line-2);border-radius:9px;padding:9px 10px;min-width:0}
  .pstage .n{font-family:var(--pmono);font-size:8.5px;color:var(--p-mute);letter-spacing:.1em}
  .pstage h5{font-size:11.5px;font-weight:600;line-height:1.3;margin:2px 0 3px;letter-spacing:-.005em}
  .pstage .sla{font-family:var(--pmono);font-size:8.5px;color:var(--p-mute);letter-spacing:.04em;margin-bottom:7px}
  .pstage .thead{font-family:var(--pmono);font-size:8px;letter-spacing:.13em;text-transform:uppercase;color:var(--p-mute);
                 border-top:1px solid var(--p-line);padding-top:6px;margin-bottom:5px}
  .pstage.new{border-color:var(--p-teal);box-shadow:0 0 0 3px rgba(12,127,149,.12)}
  .pstage .bdg{position:absolute;top:-7px;right:-7px;min-width:16px;height:16px;padding:0 4px;border-radius:999px;
               display:none;align-items:center;justify-content:center;font-family:var(--pmono);font-size:8px;font-weight:600;color:#fff}
  .pstage.new .bdg{display:flex;background:var(--p-teal)}
  .srow .pstage:not(:last-child)::after{content:"";position:absolute;right:-19px;top:26px;width:19px;height:1px;background:#c9d0d8}
  .srow .pstage:not(:last-child)::before{content:"";position:absolute;right:-7px;top:23px;width:0;height:0;
                                          border-left:5px solid #c9d0d8;border-top:3.5px solid transparent;border-bottom:3.5px solid transparent}
  .ptask{display:flex;gap:6px;align-items:flex-start;border:1px solid var(--p-line);border-radius:6px;
         padding:4px 6px;margin-bottom:4px;font-size:9.5px;line-height:1.35;background:#fff}
  .ptask span{min-width:0}
  .ptask:last-child{margin-bottom:0}
  .ptask.new{border-color:var(--p-teal-line);background:var(--p-teal-surf)}
  .secband{border:1px dashed var(--p-line-2);border-radius:9px;background:rgba(241,240,236,.6);padding:10px 12px}
  .clegend{display:flex;gap:14px;align-items:center;font-size:10.5px;color:var(--p-mute);margin-top:auto}
  /* ---------- live edit diff ---------- */
  .diff{border:1px solid var(--p-line);border-radius:9px;background:#fff;overflow:hidden}
  .diff .dh{display:flex;align-items:center;gap:9px;background:var(--p-paper);border-bottom:1px solid var(--p-line);
            padding:8px 12px;font-family:var(--pmono);font-size:10px;color:var(--p-mute);letter-spacing:.05em}
  .dl{display:grid;grid-template-columns:22px 1fr;gap:8px;padding:9px 12px;border-bottom:1px solid var(--p-line);
      font-family:var(--pmono);font-size:11px;line-height:1.5}
  .dl:last-child{border-bottom:0}
  .dl .g{text-align:center;font-weight:600;color:#9aa3ad}
  .dl.add{background:#f4faf5;color:#2c5a34} .dl.add .g{color:var(--p-green-ink)}
  .dl.mod{background:#fdfaf1;color:#6d5411} .dl.mod .g{color:var(--p-yellow-ink)}
  .quote{font-family:var(--serif);font-size:14.5px;font-style:italic;line-height:1.5;color:var(--p-ink)}
  /* ---------- action center sheet ---------- */
  .scrim{position:absolute;inset:0;background:rgba(23,29,45,.34);z-index:2}
  .sheet{position:absolute;top:0;right:0;bottom:0;width:560px;z-index:3;background:#fff;border-left:1px solid var(--p-line-2);
         display:flex;flex-direction:column;box-shadow:-26px 0 64px -30px rgba(23,29,45,.3)}
  .sheet .sh{display:flex;align-items:center;gap:10px;padding:12px 18px;border-bottom:1px solid var(--p-line)}
  .sheet .sb{flex:1;min-height:0;overflow:hidden;padding:16px 18px;display:flex;flex-direction:column;gap:12px}
  .sheet .sf{flex:none;display:flex;align-items:center;gap:9px;padding:12px 18px;border-top:1px solid var(--p-line);background:var(--p-paper)}
  .instr{font-size:12.5px;line-height:1.6;background:var(--p-teal-surf);border:1px solid var(--p-teal-line);
         border-radius:8px;padding:11px 13px;color:#33474b}
  .opt{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--p-line-2);border-radius:9px;padding:10px 12px;margin-bottom:8px}
  .opt .radio{width:15px;height:15px;flex:none;margin-top:1px;border:1.5px solid var(--p-line-2);border-radius:50%}
  .opt b{display:block;font-size:12.5px;font-weight:500}
  .opt em{display:block;font-style:normal;font-size:11.5px;color:var(--p-mute);margin-top:1px}
  .opt.chosen{border-color:var(--p-teal);background:var(--p-teal-surf);box-shadow:0 0 0 2px rgba(12,127,149,.1)}
  .opt.chosen .radio{border-color:var(--p-teal);background:var(--p-teal);box-shadow:inset 0 0 0 2.5px #fff}
  .opt.chosen b::after{content:" · Selected";font-family:var(--pmono);font-size:9px;letter-spacing:.08em;
                       text-transform:uppercase;color:var(--p-teal-700)}
  /* ---------- case agent diagram ---------- */
  .cmwrap{flex:1;min-height:0;display:flex;flex-direction:column;gap:14px}
  .cmcanvas{flex:1;min-height:0;border:1px solid var(--p-line);border-radius:10px;background:#fff;
            background-image:radial-gradient(#e3e6ea 1px,transparent 1px);background-size:22px 22px;
            display:grid;grid-template-columns:1fr 76px 1.06fr 76px 1fr;align-items:center;padding:22px 24px}
  .cmnode{border:1px solid var(--p-line-2);border-radius:11px;background:#fff;padding:15px 16px;box-shadow:0 1px 2px rgba(20,30,40,.05)}
  .cmnode.hub{border-color:var(--p-teal);background:linear-gradient(#fff,var(--p-teal-surf));
              box-shadow:0 0 0 4px rgba(12,127,149,.1),0 6px 18px -8px rgba(12,127,149,.35)}
  .cmnode b{display:block;font-family:var(--serif);font-size:17px;font-weight:500;letter-spacing:-.02em}
  .cmnode em{display:block;font-style:normal;font-size:12px;color:var(--p-mute);margin-top:3px;line-height:1.45}
  .cmpills{display:flex;flex-wrap:wrap;gap:5px;margin-top:10px}
  .cmpills span{font-family:var(--pmono);font-size:8.5px;letter-spacing:.06em;text-transform:uppercase;
                border:1px solid var(--p-line);border-radius:999px;padding:3px 8px;color:var(--p-mute);background:var(--p-paper)}
  .cmarrow{display:flex;align-items:center;justify-content:center;color:#c2cad2}
  .cmrules{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  /* ---------- closing slide: a real PPT slide, not a product screen ---------- */
  .slide{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;
         background:radial-gradient(120% 100% at 50% 0%,#232b36 0%,#161b22 55%,#12161c 100%);overflow:hidden}
  .slide::before{content:"";position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg,#fa4616,#ff8a5c)}
  .slide::after{content:"";position:absolute;width:640px;height:640px;border-radius:50%;
               background:radial-gradient(circle,rgba(250,70,22,.16),transparent 70%);top:-260px;right:-160px}
  .slide .kicker{font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#ff8a5c;position:relative;z-index:1}
  .slide h2{font-family:var(--serif);font-size:46px;font-weight:500;letter-spacing:-.03em;line-height:1.15;text-align:center;color:#fff;position:relative;z-index:1}
  .chain{display:flex;align-items:stretch;gap:14px;position:relative;z-index:1}
  .chain .lnk{display:flex;flex-direction:column;align-items:center;gap:10px;background:rgba(255,255,255,.06);
              border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:18px 26px;min-width:196px;backdrop-filter:blur(2px)}
  .chain .lnk .b{width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#fa4616,#ff8a5c);color:#fff;font-family:var(--serif);
                 font-size:17px;display:flex;align-items:center;justify-content:center;font-weight:600}
  .chain .lnk b{font-family:var(--serif);font-size:15.5px;font-weight:500;letter-spacing:-.015em;text-align:center;color:#fff}
  /* mini "screenshot" thumbnails for the closing slide */
  .thumb{width:126px;height:78px;border-radius:7px;overflow:hidden;box-shadow:0 6px 16px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12)}
  .thumb .hd{height:14px;display:flex;align-items:center;gap:3px;padding:0 6px}
  .thumb .hd i{width:4px;height:4px;border-radius:50%}
  .thumb-cg{background:linear-gradient(160deg,#eef8ee,#ffffff)}
  .thumb-cg .hd{background:#fff}
  .thumb-cg .hd i{background:#bfdde3}
  .thumb-cg .bd{padding:6px 8px;display:flex;gap:6px}
  .thumb-cg .doc{flex:1;background:#fff;border-radius:3px;padding:5px 6px;box-shadow:0 1px 2px rgba(20,30,40,.08)}
  .thumb-cg .doc .r1{height:3px;width:70%;background:#0db4b9;border-radius:2px;margin-bottom:4px}
  .thumb-cg .doc .r2{height:2px;width:90%;background:#e2e6ea;border-radius:2px;margin-bottom:3px}
  .thumb-cg .doc .r3{height:2px;width:60%;background:#e2e6ea;border-radius:2px}
  .thumb-cx{background:#161615}
  .thumb-cx .hd{background:#1e1e1c}
  .thumb-cx .hd i{background:#3a3a36}
  .thumb-cx .bd{padding:7px 8px;display:flex;flex-direction:column;gap:3px}
  .thumb-cx .tl{height:2.5px;border-radius:2px;background:#3a3a36}
  .thumb-cx .tl.ok{background:#5fae7b;width:80%}
  .thumb-cx .tl.dim{width:55%}
  .thumb-cx .tl.full{width:92%}
  .thumb-mm{background:#fff}
  .thumb-mm .hd{background:#0c7f95}
  .thumb-mm .hd i{background:rgba(255,255,255,.5)}
  .thumb-mm .bd{padding:6px 7px;display:flex;gap:4px}
  .thumb-mm .stg{flex:1;background:#f4f6f9;border:1px solid #e4e8ee;border-radius:2px;height:52px;padding:3px}
  .thumb-mm .stg .d1{height:2px;width:80%;background:#c7ced8;border-radius:2px;margin-bottom:3px}
  .thumb-mm .stg .d2{height:2px;width:60%;background:#dfe3ea;border-radius:2px}
  .thumb-mm .stg.on{border-color:#0c7f95;box-shadow:0 0 0 1px rgba(12,127,149,.25)}
  .chain .arw{display:flex;align-items:center;color:#5b6572;font-size:19px}
  .slide .foot{position:absolute;bottom:22px;left:0;right:0;display:flex;justify-content:center;gap:8px;
               font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.1em;color:#5b6572}
  /* coda */
  .coda{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-top:32px}
  .coda h2{font-family:var(--serif);font-size:19px;font-weight:500;letter-spacing:-.02em;margin-bottom:9px}
  .coda p{font-size:12px;color:#3d4754;margin-bottom:8px}
  footer{font-size:10px;color:var(--muted);padding:20px 0 0}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
  @media(max-width:1050px){.page{flex-direction:column}.toc{position:static;width:100%;max-height:none}
    .actrow{grid-template-columns:1fr}.mast h1{font-size:26px}}
/* == review-notes:css:start == */
/* ===========================================================================
   Review notes — styles. Canonical source; inlined into the storyboards by
   tools/inject-review-notes.py. Deliberately quiet so it never competes with
   the mockups it sits on top of.
   =========================================================================== */

/* ---------- floating bar ---------- */
#fbBar {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 70;
  display: flex;
  gap: 2px;
  padding: 3px;
  background: #fff;
  border: 1px solid #d7dde4;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(20, 28, 36, .06), 0 14px 30px -12px rgba(20, 28, 36, .28);
  font-family: var(--sans, system-ui), sans-serif;
}
#fbBar button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  color: #4a5461;
  cursor: pointer;
}
#fbBar button:hover { background: #f1f4f7; }
#fbToggle[aria-pressed="true"] {
  background: #0b7285;
  color: #fff;
}
#fbOpen b {
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 11px;
  font-weight: 600;
}
#fbBar.has #fbOpen { color: #0b7285; font-weight: 600; }
#fbBar button:focus-visible { outline: 2px solid #0b7285; outline-offset: 2px; }

/* ---------- comment mode ---------- */
body.fb-on { cursor: crosshair; }
body.fb-on .talktrack,
body.fb-on .demonotes,
body.fb-on .scene > h3,
body.fb-on .scene > .narr,
body.fb-on .frame,
body.fb-on .act,
body.fb-on .flowbrief,
body.fb-on .capbox,
body.fb-on .synopsis,
body.fb-on .mast .dek {
  outline: 1px dashed transparent;
  outline-offset: 3px;
  transition: outline-color .12s ease, background-color .12s ease;
}
body.fb-on .talktrack:hover,
body.fb-on .demonotes:hover,
body.fb-on .scene > h3:hover,
body.fb-on .scene > .narr:hover,
body.fb-on .frame:hover,
body.fb-on .flowbrief:hover,
body.fb-on .capbox:hover,
body.fb-on .synopsis:hover,
body.fb-on .mast .dek:hover {
  outline-color: #0b7285;
  background-color: rgba(11, 114, 133, .045);
}
/* the storyboard's own hover lift would fight the outline in strip view */
body.fb-on .frame:hover { transform: none; }
body.fb-on #fbBar, body.fb-on #fbPanel, body.fb-on #fbComposer { cursor: default; }

/* a marker on anything already commented on */
.fb-flag { position: relative; }
.fb-pin {
  position: absolute;
  top: -8px;
  left: -8px;
  z-index: 6;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: #fa4616;
  color: #fff;
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 10px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(20, 28, 36, .3);
  pointer-events: none;
}

/* ---------- composer ---------- */
#fbComposer {
  position: fixed;
  z-index: 80;
  width: 320px;
  padding: 13px 14px 12px;
  background: #fff;
  border: 1px solid #cbd3dc;
  border-radius: 11px;
  box-shadow: 0 2px 6px rgba(20, 28, 36, .08), 0 22px 44px -14px rgba(20, 28, 36, .38);
  font-family: var(--sans, system-ui), sans-serif;
}
.fbc-h { display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px; }
.fbc-h b { font-size: 12.5px; font-weight: 600; color: #1c2530; }
.fbc-h span {
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 8.5px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #0b7285;
  background: #e6f4f6;
  border-radius: 4px;
  padding: 2px 6px;
}
.fbc-ex {
  font-size: 11.5px;
  line-height: 1.5;
  color: #6b7684;
  border-left: 2px solid #e4e8ee;
  padding: 1px 0 1px 9px;
  margin-bottom: 9px;
  max-height: 58px;
  overflow: hidden;
}
#fbComposer textarea {
  width: 100%;
  border: 1px solid #cbd3dc;
  border-radius: 8px;
  padding: 8px 10px;
  font: inherit;
  font-size: 12.5px;
  line-height: 1.5;
  color: #1c2530;
  resize: vertical;
}
#fbComposer textarea:focus { outline: 2px solid #0b7285; outline-offset: -1px; border-color: #0b7285; }
.fbc-f { display: flex; gap: 7px; margin-top: 9px; }

.fbb {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 12px;
  border: 1px solid #cbd3dc;
  border-radius: 7px;
  background: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  color: #1c2530;
  cursor: pointer;
  white-space: nowrap;
}
.fbb:hover { background: #f6f7f9; }
.fbb.pri { background: #0b7285; border-color: #0b7285; color: #fff; }
.fbb.pri:hover { background: #095e6e; }
.fbb.danger { color: #9f2f2d; }
.fbb:focus-visible { outline: 2px solid #0b7285; outline-offset: 2px; }

/* ---------- notes panel ---------- */
#fbPanel {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 75;
  width: 380px;
  max-width: 92vw;
  display: none;
  flex-direction: column;
  background: #fff;
  border-left: 1px solid #d7dde4;
  box-shadow: -14px 0 40px -18px rgba(20, 28, 36, .32);
  font-family: var(--sans, system-ui), sans-serif;
}
#fbPanel.on { display: flex; }
.fbp-h {
  flex: none;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 13px 15px;
  border-bottom: 1px solid #e4e8ee;
}
.fbp-h b { font-size: 14px; font-weight: 600; }
#fbWho {
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 9.5px;
  letter-spacing: .07em;
  color: #6b7684;
}
#fbClose {
  margin-left: auto;
  width: 26px;
  height: 26px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  font-size: 17px;
  line-height: 1;
  color: #6b7684;
  cursor: pointer;
}
#fbClose:hover { background: #f1f4f7; }
.fbp-warn {
  flex: none;
  padding: 9px 15px;
  background: #fbf3db;
  border-bottom: 1px solid #f0e2bd;
  font-size: 11px;
  line-height: 1.5;
  color: #7a5300;
}
.fbp-b { flex: 1; min-height: 0; overflow: auto; padding: 12px 15px; }
.fbp-empty { font-size: 12px; line-height: 1.6; color: #6b7684; }
.fbp-f {
  flex: none;
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  padding: 11px 15px;
  border-top: 1px solid #e4e8ee;
  background: #fbfcfd;
}

.fbn {
  border: 1px solid #e4e8ee;
  border-radius: 9px;
  padding: 10px 12px;
  margin-bottom: 9px;
  background: #fff;
}
.fbn:last-child { margin-bottom: 0; }
.fbn-h { display: flex; align-items: baseline; gap: 7px; }
.fbn-h b { font-size: 12px; font-weight: 600; }
.fbn-k {
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 8px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #0b7285;
  background: #e6f4f6;
  border-radius: 4px;
  padding: 2px 5px;
}
.fbn-x {
  margin-left: auto;
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  font-size: 14px;
  line-height: 1;
  color: #9aa3ad;
  cursor: pointer;
}
.fbn-x:hover { background: #fdebec; color: #9f2f2d; }
.fbn-t { font-size: 11.5px; color: #3d4754; margin-top: 3px; }
.fbn-e {
  font-size: 11px;
  line-height: 1.5;
  color: #6b7684;
  border-left: 2px solid #e4e8ee;
  padding-left: 8px;
  margin-top: 6px;
}
.fbn-n { font-size: 12.5px; line-height: 1.55; color: #1c2530; margin-top: 7px; }
.fbn-m {
  font-family: var(--pmono, ui-monospace), monospace;
  font-size: 9px;
  letter-spacing: .05em;
  color: #9aa3ad;
  margin-top: 7px;
}
.fbn-go { color: #0b7285; text-decoration: none; font-weight: 600; }
.fbn-go:hover { text-decoration: underline; }

@media print { #fbBar, #fbPanel, #fbComposer, .fb-pin { display: none !important; } }
@media (max-width: 640px) {
  #fbBar { right: 10px; bottom: 10px; }
  #fbBar #fbToggle span { display: none; }
}
/* == review-notes:css:end == */
</style>
</head>
<body data-board-id="maestro-case-storyboard-v2">
<div class="page">
<nav class="toc" id="toc"><h2>Storyboard</h2><div id="tocBody"></div>
</nav>

<div class="content">
  <div class="mast">
    <span class="mono">FUSION 2026 · Keynote 2 · Maestro Case section · v2</span>
    <h1>Build it. Run it. Improve it.</h1>

    <p class="synopsis">Somebody bought a very expensive machine and it broke. They want it fixed
    under warranty. Their production line is down while they wait, so <b>every hour costs them
    money</b>.</p>

    <p class="dek">That is the whole scenario. It happens at <b>Cobalt Ridge Automation</b>, a
    fictional industrial-equipment manufacturer, and the machine is a conveyor system that sorts
    packages for shipping at a customer's distribution center. One warranty case carries the entire
    demo: it gets built, it runs mostly on its own, and then it gets better.</p>

    <details class="flowbrief" id="flowbrief">
      <summary>The flow in brief<span class="hint">plain language, no screens needed</span></summary>
      <div class="fb">
        <p class="grp">Build it</p>
        <ol>
          <li>A process expert works with the <b>Cartographer agent</b> to map how warranty
              resolution actually runs today, across support, engineering, parts, field service
              and finance.</li>
          <li>Cartographer writes that map up as a design document.</li>
          <li>A <b>coding agent</b> reads the design and builds the working case from it: the
              stages, the data, the integrations, and the rules that govern each step.</li>
          <li>The business then changes one rule. The coding agent finds what that affects and
              makes the change, without a new development cycle.</li>
        </ol>
        <p class="grp">Run it</p>
        <ol start="5">
          <li>Cases run. <b>93 out of every 100 finish without anyone touching them.</b></li>
          <li>The rest reach a person. Sarah gets one where the evidence points two ways: a part
              failed, and somebody also made a change to the machine that was never approved.</li>
          <li>Everything is assembled before she opens it. The evidence, a recommendation, and the
              reasoning behind the recommendation.</li>
          <li>She makes the call. She also marks which evidence helped and which did not, which
              takes a few seconds and holds nothing up.</li>
          <li>Later the customer sends photos of the broken part, after coverage was already
              decided. Nobody routes them. The <b>case agent</b> checks them against the earlier
              finding, sees the position may not hold, and sends the case to engineering.</li>
          <li>Engineering confirms the cause, the machine gets fixed, and the case closes.</li>
        </ol>
        <p class="grp">Improve it</p>
        <ol start="11">
          <li>Every decision made along the way is on the record, Sarah's included, and so is the
              same decision made at other customers.</li>
          <li>Reading across those records surfaces patterns. One of them: whenever a particular
              part fails and the amount is small, a person approves it, and <b>the answer is never
              different</b>.</li>
          <li>Approve that rule once and those cases stop waiting for a person at all.</li>
          <li>A second pattern runs the other way. Repeat failures of the same part keep closing
              with nobody checking whether the part itself is the problem, so that one <b>adds</b>
              a check rather than removing one.</li>
        </ol>
      </div>
    </details>

    <div class="capbox">
      <p>What's on screen, in order:</p>
      <ol>
        <li><b>Cartographer.</b> Maps the work, then writes the design document.</li>
        <li><b>Coding agent.</b> Builds and changes the Maestro case from that design.</li>
        <li><b>UiPath Studio.</b> Where the case plan and its rules live.</li>
        <li><b>Maestro Case App.</b> Where Sarah works her queue and decides.</li>
        <li><b>Cartographer, Suggestions.</b> The decision ledger, the suggestions it produces,
            and applying one.</li>
      </ol>
    </div>

    <p class="illus">All names, values and clocks are illustrative, modeled on what real long-running
    case processes look like in production. Continuous improvement is shown as it will work, and is
    coming soon rather than shipping today.</p>

    <div class="viewsw">
      <span class="swlbl">View</span>
      <span class="sw" role="group" aria-label="Storyboard view">
        <button type="button" id="vBrief" aria-pressed="false">Narrative</button>
        <button type="button" id="vStrip" aria-pressed="true">Strip</button>
        <button type="button" id="vFlow"  aria-pressed="false">Flow</button>
      </span>
    </div>
    <p class="swnote">Three ways to read this, switched top right: <b>Narrative</b> tells the whole
      flow in plain sentences, <b>Strip</b> fits every scene on a screen or two &mdash; click any
      screen to open it full size &mdash; and <b>Flow</b> adds the talk track and director's notes
      to every scene.</p>
  </div>

  <div id="story"></div>

<div id="lb" role="dialog" aria-modal="true" aria-label="Expanded screen">
  <div class="lbframe" id="lbFrame"></div>
  <div class="lbcap" id="lbCap"></div>
  <div class="lbhint">click anywhere or press esc to close</div>
</div>

  <footer>Concept / placeholder: no live connections. UiPath does not control the physical equipment.</footer>
</div>
</div>

<script>
// ---------- case plan (reused from the warranty use-case detail page) ----------
const STAGES = [
  {id:"s1", name:"Intake and impact triage", sla:"SLA: 30 min", tasks:[["PR","Create and correlate warranty case"],["API","Identify installed asset, confirm coverage"],["AG","Assemble first evidence: alarms, photos, notes"],["HT","Classify customer impact"]]},
  {id:"s2", name:"Coverage and evidence review", sla:"SLA: 4 hr", tasks:[["API","Pull warranty terms and service history"],["AG","Flag missing or conflicting facts"],["HT","Review configuration changes, form coverage position"]]},
  {id:"s3", name:"Diagnose and contain", sla:"SLA: 2 hr", tasks:[["AG","Correlate alarms with service history, propose containment"],["HT","Approve containment as safe"],["PR","Coordinate containment with the customer's site team"],["HT","Confirm root cause and repair scope"]]},
  {id:"s4", name:"Resolution decision", sla:"SLA: 4 hr", tasks:[["AG","Build options: repair, replace, credit, with cost and downtime"],["API","Check each option against policy and delegated authority"],["HT","Authorize the commercial outcome"]]},
  {id:"s5", name:"Restore and validate", sla:"SLA: 2 hr to dispatch", tasks:[["API","Reserve and track approved parts"],["PR","Dispatch qualified field engineer"],["HT","Validate the real outcome: line at full speed"]]},
  {id:"s6", name:"Close and learn", sla:"SLA: 1 business day", tasks:[["API","Reconcile coverage vs. actual cost"],["AG","Finalize decision ledger"],["AG","Check for recurrence across other machines"],["HT","Confirm closure"]]},
  {id:"s7", name:"Product-quality escalation", sla:"NEW · added live in Act I", tasks:[["AG","Find related failures across other customers' assets"],["HT","Confirm this is a pattern, not a coincidence"],["PR","Open linked quality investigation with a named owner"]], isNew:true}
];
const T = t => \`<span class="tag \${t}">\${t}</span>\`;

// ---------- shared product-shell helpers ----------
const PERSONAS = [
  ["Sarah Chen","Warranty Resolution Lead"],
  ["Miguel Alvarez","Reliability and Controls Engineer"],
  ["Ryan Ochoa","Product Quality Lead"]
];
const CASE_FACTS = [
  ["Customer","Northstar Retail Distribution"],
  ["Site","Joliet DC"],
  ["Asset","SR-440"]
];
const ICO = {
  search:\`<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="6" cy="6" r="4.4"/><path d="m9.4 9.4 3 3"/></svg>\`,
  back:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5"/></svg>\`,
  fwd:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5"/></svg>\`,
  reload:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13 8a5 5 0 1 1-1.6-3.7"/><path d="M13 2.6V5h-2.4"/></svg>\`,
  lock:\`<svg width="9" height="11" viewBox="0 0 10 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="1.2" y="5" width="7.6" height="6" rx="1.4"/><path d="M3.2 5V3.6a1.8 1.8 0 0 1 3.6 0V5"/></svg>\`,
  dots:\`<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/></svg>\`,
  doc:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 2h5l3 3v9H4z"/><path d="M9 2v3h3"/></svg>\`,
  plan:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="2" y="2.5" width="5" height="4" rx="1"/><rect x="9" y="9.5" width="5" height="4" rx="1"/><path d="M4.5 6.5v3.5a1.5 1.5 0 0 0 1.5 1.5H9"/></svg>\`,
  bolt:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M9 1.5 4 8.8h3l-.8 5.7L11.5 7H8.4z"/></svg>\`,
  arrow:\`<svg width="52" height="14" viewBox="0 0 52 14" fill="none" aria-hidden="true"><path d="M0 7h44" stroke="currentColor" stroke-width="1.3"/><path d="M43 3.2 49.5 7 43 10.8z" fill="currentColor"/></svg>\`,
  layout:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="1.5" y="2.5" width="13" height="11" rx="1.6"/><path d="M6.2 2.5v11"/></svg>\`,
  newwin:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="2" y="3.5" width="10" height="9" rx="1.4"/><path d="M6 2h6.5A1.5 1.5 0 0 1 14 3.5V10"/></svg>\`,
  clock:\`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>\`,
  bell:\`<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M4 6.6a4 4 0 0 1 8 0v2.3l1.2 2H2.8l1.2-2z"/><path d="M6.4 12.6a1.6 1.6 0 0 0 3.2 0"/></svg>\`
};
function cartographerChrome(body){
  return \`<div class="win cg-win">
    <div class="cg-titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="wtool">\${ICO.layout}\${ICO.newwin}</span>
      <span class="cg-tabs">
        <span class="cg-tab"><span class="ic d">D</span>Delegate (preview)</span>
        <span class="cg-tab on"><span class="ic c">C</span>Cartographer (preview)</span>
      </span>
      <span class="brand"><b>UiPath</b><span class="bell">\${ICO.bell}</span></span>
    </div>
    <div class="cg-body">
      <div class="cg-side">
        <div class="cg-new">\${ICO.plan} New</div>
        <div class="cg-search">\${ICO.search} Search</div>
        <div class="cg-navgroup">Business processes</div>
        <div class="cg-navitem on">Industrial Equipment Warranty Resolution</div>
        <div class="cg-navgroup">Business tasks</div>
        <div class="cg-navgroup">Recents</div>
        <div class="cg-foot">
          <div class="cg-addons">\${ICO.dots} Add-ons &amp; Integrations</div>
          <div class="cg-user"><span class="av">RL</span>Robert Love</div>
        </div>
      </div>
      <div class="cg-main">\${body}</div>
    </div>
  </div>\`;
}
function appTop(o){
  const nav = (o.nav||[]).map(n=>\`<span class="\${n===o.active?"on":""}">\${n}</span>\`).join("");
  const chips = PERSONAS.slice(0,o.personas===undefined?3:o.personas)
    .map(p=>\`<span class="pchip"><i></i><span><b>\${p[0]}</b><u>\${p[1]}</u></span></span>\`).join("");
  return \`<div class="ptop"><span class="plogo">\${o.badge||"I"}</span><span class="pname">\${o.name}</span>
    <span class="pnav">\${nav}</span>
    <span class="ptools">\${o.tag?\`<span class="ptag tl">\${o.tag}</span>\`:""}\${chips}</span></div>\`;
}
function spark(vals,w,h){
  w=w||240; h=h||36;
  const max=Math.max.apply(null,vals), min=Math.min.apply(null,vals), rng=(max-min)||1;
  const pts=vals.map((v,i)=>[i*(w/(vals.length-1)), (h-3)-((v-min)/rng)*(h-8)]);
  const d=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
  return \`<svg class="spark" viewBox="0 0 \${w} \${h}" preserveAspectRatio="none" aria-hidden="true">
    <path d="\${d} L \${w} \${h} L 0 \${h} Z" fill="rgba(12,127,149,.09)"/>
    <path d="\${d}" fill="none" stroke="#0c7f95" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>\`;
}
function statStrip(items){
  const segs = items.map(it=>\`<div style="flex:1;min-width:0;padding:13px 16px">
      <span class="lbl">\${it[0]}</span>
      <div style="display:flex;align-items:baseline;gap:7px;margin-top:8px">
        <span class="kval" style="font-size:26px">\${it[1]}\${it[2]&&it[2]!=="txt"?\`<small>\${it[2]}</small>\`:""}</span>
        \${it[3]&&it[3].delta?\`<span class="kdelta">\${it[3].delta}</span>\`:""}
      </div>
      \${it[3]&&it[3].note?\`<div class="pmono" style="margin-top:7px">\${it[3].note}</div>\`:""}
    </div>\`).join(\`<div style="width:1px;background:var(--p-line);align-self:stretch"></div>\`);
  return \`<div class="pcard" style="display:flex;align-items:stretch;overflow:hidden">\${segs}</div>\`;
}
function kpiTile(label,value,unit,extra){
  return \`<div class="pcard pad"><span class="lbl">\${label}</span>
    <div style="display:flex;align-items:baseline;gap:9px;margin-top:9px">
      <span class="kval\${unit==="txt"?" txt":""}">\${value}\${unit&&unit!=="txt"?\`<small>\${unit}</small>\`:""}</span>
      \${extra&&extra.delta?\`<span class="kdelta">\${extra.delta}</span>\`:""}
    </div>
    \${extra&&extra.series?spark(extra.series):(extra&&extra.note?\`<div class="pmono" style="margin-top:9px">\${extra.note}</div>\`:"")}</div>\`;
}
function stageTimeline(activeIdx,opts){
  opts = opts||{};
  const rows = STAGES.slice(0,6).map((s,i)=>{
    const cls = i<activeIdx?"done":(i===activeIdx?"cur":"");
    return \`<div class="st \${cls}"><span>\${s.name}</span>\${i===activeIdx?\`<span class="when">now</span>\`:""}</div>\`;
  }).join("");
  const cond = opts.conditional===false?"":\`<div style="border-top:1px dashed var(--p-line);margin-top:9px;padding-top:9px">
      <span class="lbl" style="margin-bottom:4px">Conditional stages</span>
      <div class="stline"><div class="st dim"><span>Waiting for customer evidence</span></div>
        <div class="st \${opts.exception==="eng"?"cur":"dim"}"><span>Engineering exception</span>\${opts.exception==="eng"?\`<span class="when">proposed</span>\`:""}</div>
        <div class="st dim"><span>Parts substitution review</span></div>
        <div class="st dim"><span>Product-quality escalation</span></div></div></div>\`;
  return \`<span class="lbl" style="margin-bottom:7px">Stage progress</span><div class="stline">\${rows}</div>\${cond}\`;
}
function caseHeader(o){
  const facts = (o.facts||CASE_FACTS).map(f=>\`<div class="fact"><span class="lbl">\${f[0]}</span><b>\${f[1]}</b></div>\`).join("");
  return \`<div class="pcard" style="overflow:hidden">
    <div class="pad" style="padding-bottom:12px">
      <div style="display:flex;align-items:flex-start;gap:14px">
        <div style="flex:1;min-width:0">
          <span class="lbl">Queue / <span style="color:var(--p-teal)">\${o.ref}</span></span>
          <div class="phead" style="margin-top:5px">\${o.title}</div>
        </div>
        \${o.action||""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap">\${o.pills||""}</div>
    </div>
    <div class="facts">\${facts}</div></div>\`;
}

// ---------- view renderers ----------
function scribeView(){
  const secs = ["Company and problem statement","Stages and exit conditions","Participants and ownership",
    "Exception paths (evidence gaps, disputed coverage, engineering, substitution, recurrence)",
    "Data model and system integrations"];
  const nav = secs.map((s,i)=>\`<div class="\${i===1?"on":""}"><em>\${i+1}.</em><span>\${s}</span></div>\`).join("");
  const rows = STAGES.slice(0,6).map((s,i)=>{
    return \`<tr><td class="pmono" style="color:var(--p-mute)">\${String(i+1).padStart(2,"0")}</td>
      <td><span class="nm">\${s.name}</span></td>
      <td class="pmono" style="font-size:10.5px">\${s.sla}</td></tr>\`;
  }).join("");
  return cartographerChrome(
  \`<div class="pmain" style="display:grid;grid-template-columns:210px minmax(0,1fr) 230px;gap:14px;align-items:start;padding:0">
    <div class="pcard pad" style="align-self:stretch;background:rgba(255,255,255,.75)">
      <span class="lbl" style="margin-bottom:8px">Document sections</span>
      <div class="docnav">\${nav}</div>
      <hr class="prule" style="margin:11px 0">
      <span class="lbl" style="margin-bottom:6px">Source material</span>
      <div class="docrow"><span class="ext">pdf</span><span class="nm">Cobalt Ridge service documentation</span><span class="meta">ingested</span></div>
      <div class="docrow"><span class="ext">log</span><span class="nm">Support-portal traces</span><span class="meta">ingested</span></div>
    </div>
    <div class="paper-sheet">
      <div style="display:flex;align-items:center;gap:9px">
        <span class="ptag bl">Process definition document</span>
        <span class="pmono" style="margin-left:auto">v1.0 · READ-ONLY</span>
      </div>
      <h1>Industrial Equipment Warranty Resolution — PDD</h1>
      <div class="pmono" style="letter-spacing:.1em">6 STAGES · 4 EXCEPTION PATHS · 9 PARTICIPANT ROLES</div>
      <hr class="prule" style="margin:13px 0">
      <p>Six stages, four exception paths, nine participant roles, sourced from Cobalt Ridge's service documentation and support-portal traces. Same document the audience just watched Cartographer produce.</p>
      <h2 style="margin:16px 0 8px">2. Stages and exit conditions</h2>
      <table class="pt"><colgroup><col style="width:44px"><col><col style="width:150px"></colgroup>
        <thead><tr><th>#</th><th>Stage</th><th>Exit condition</th></tr></thead>
        <tbody>\${rows}</tbody></table>
    </div>
    <div style="display:grid;gap:14px">
      <div class="pcard pad">
        <span class="lbl" style="margin-bottom:8px">Document facts</span>
        <div class="drow"><span class="k">Stages</span><span class="v">6</span></div>
        <div class="drow"><span class="k">Exception paths</span><span class="v">4</span></div>
        <div class="drow"><span class="k">Participant roles</span><span class="v">9</span></div>
        <div class="drow"><span class="k">Status</span><span class="v">Ready to build</span></div>
      </div>
      <div class="pcard paper pad">
        <div style="display:flex;gap:9px;align-items:center;margin-bottom:8px"><span class="fic">\${ICO.doc}</span>
          <span class="lbl">Next step</span></div>
        <div class="pbody">Hand this PDD to a coding agent to propose the Maestro case plan.</div>
        <div style="display:flex;gap:8px;margin-top:11px"><span class="btn sm">Export</span><span class="btn sm primary">Send to coding agent</span></div>
      </div>
    </div>
  </div>\`);
}

function nativeChrome(title, sideActive, sideOther, body, termBody){
  return \`<div class="win native">
    <div class="titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="tt">\${title}</span>
      <span class="modesw" role="group" aria-label="View mode">
        <span class="on" onclick="codexMode(this,'term')">Terminal</span>
        <span onclick="codexMode(this,'ui')">UI</span>
      </span>
    </div>
    <div class="term-wrap">
      <div class="term-bar">claude — cobalt-ridge/warranty-case-plan</div>
      <div class="term">\${termBody}</div>
    </div>
    <div class="cx">
      <div class="cx-side">
        <span class="cx-lbl">Threads</span>
        <div class="cx-search">Search threads…</div>
        <div class="cx-th on"><b>\${sideActive[0]}</b><span>\${sideActive[1]}</span><u>ACTIVE</u></div>
        \${sideOther.map(t=>\`<div class="cx-th"><b>\${t[0]}</b><span>\${t[1]}</span></div>\`).join("")}
        <div class="cx-foot">cobalt-ridge/warranty-case-plan<br>main · clean</div>
      </div>
      <div class="cx-main">\${body}</div>
    </div>
  </div>\`;
}
function codexMode(btn, mode){
  const win = btn.closest(".win");
  win.classList.toggle("mode-ui", mode==="ui");
  btn.parentElement.querySelectorAll("span").forEach(s=>s.classList.remove("on"));
  btn.classList.add("on");
}
function term(lines){
  return lines.map(l=>{
    if(l===null) return \`<div class="gap"></div>\`;
    const cls = l[0], txt = l[1];
    const prefix = cls==="prompt" ? \`<span class="car">&#10095;</span> \` : "";
    return \`<div class="l \${cls}">\${prefix}\${txt}</div>\`;
  }).join("");
}
function agentBuildView(){
  const checks = [
    "6 stages, matching the PDD exactly",
    "Case data model: asset, site, coverage, evidence, decision ledger",
    "20+ tasks across agent, API, process, and human owners",
    "Rules governing stage entry/exit and escalation thresholds",
    "4 exception paths wired as event-driven secondary stages"
  ].map(c=>\`<div class="pi"><i>&#10003;</i><span>\${c}</span></div>\`).join("");
  const body = \`
    <div class="cx-head"><b>warranty-resolution case plan</b><span class="cx-chip ok">Proposal ready</span></div>
    <div class="cx-body">
      <div class="cx-you"><span class="cx-role">You</span>Here is the PDD Cartographer just built for warranty resolution. Propose the full Maestro case plan: stages, data model, tasks, integrations, and rules.</div>
      <div class="cx-agent"><span class="av">C</span><div class="txt"><span class="cx-role">Claude Code</span><p>Read the PDD. Proposing:</p>
        <div class="cx-plan"><div class="ph">Proposed plan</div>\${checks}</div>
        <div class="cx-acts"><span class="cx-btn">Review plan</span><span class="cx-btn pri">Approve &amp; build</span></div>
      </div></div>
    </div>
    <div class="cx-composer">Ask for a change…<span class="send">&#8629; SEND</span></div>\`;
  const termBody = term([
    ["prompt","Here is the PDD Cartographer just built for warranty resolution. Propose the full Maestro case plan: stages, data model, tasks, integrations, and rules."],
    null,
    ["dim","Reading warranty-resolution-pdd.md..."],
    ["dim","Proposing case plan..."],
    null,
    ["ok","&#10003; 6 stages, matching the PDD exactly"],
    ["ok","&#10003; Case data model: asset, site, coverage, evidence, decision ledger"],
    ["ok","&#10003; 20+ tasks across agent, API, process, and human owners"],
    ["ok","&#10003; Rules governing stage entry/exit and escalation thresholds"],
    ["ok","&#10003; 4 exception paths wired as event-driven secondary stages"],
    null,
    ["dim","Review the plan, then approve to build."],
    null,
    ["prompt","approve &amp; build"],
    ["ok","Building warranty-resolution-case-plan… done."]
  ]);
  return nativeChrome("Claude Code — cobalt-ridge-warranty-case",
    ["warranty-resolution case plan","Propose Maestro case plan from PDD"],
    [["uce-warranty content sync","compile:content, catalog rebuild"],["process-skills lint pass","lint-sources, evaluate-kb"]],
    body, termBody);
}

function stageCard(s,i,compact){
  const rows = s.tasks.map(t=>\`<div class="ptask\${s.isNew?" new":""}">\${T(t[0])}<span>\${t[1]}</span></div>\`).join("");
  return \`<div class="pstage\${s.isNew?" new":""}"><span class="bdg">NEW</span>
    <span class="n">STAGE \${String(i+1).padStart(2,"0")}</span>
    <h5>\${s.name}</h5><div class="sla">\${s.sla}</div>
    <div class="thead">Tasks · \${s.tasks.length}</div>\${rows}</div>\`;
}
function studioShell(activeTab, innerHtml){
  const tabDef = [["Plan",ICO.plan],["Rules",ICO.doc],["Case Agent",ICO.search]];
  const tabs = tabDef.map(t=>\`<span class="\${t[0]===activeTab?"on":""}">\${t[1]} \${t[0]}</span>\`).join("");
  return \`<div class="win">
    <div class="stu-top">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="stu-grid">\${ICO.dots}</span><b class="wm">UiPath Studio</b>
      <span class="stu-crumb">Warranty Resolution <span class="sep">&rsaquo;</span> <b>Case · Industrial Equipment Warranty Resolution</b></span>
      <span class="stu-toggle"><span class="on">Build</span><span>Manage</span></span>
      <span class="stu-icons">\${ICO.reload}\${ICO.doc}\${ICO.bell}</span>
      <span class="stu-ava">RL</span>
    </div>
    <div class="stu-body">
      <div class="stu-pagecrumb">\${ICO.doc} Case plan</div>
      <div class="stu-h1"><span>Case · Industrial Equipment Warranty Resolution</span><i>\${ICO.dots}</i></div>
      <div class="stu-cmpanel">
        <span class="icn">\${ICO.bolt}</span>
        <span class="lab"><b>Case agent</b><u>rules and contextual judgment</u></span>
        <span class="stu-cmtabs">\${tabs}</span>
      </div>
      \${innerHtml}
    </div>
  </div>\`;
}
function planCanvas(highlightNew){
  const base = STAGES.slice(0,6).map((s,i)=>stageCard(s,i)).join("");
  const inner = \`<div class="canvas" style="margin-top:2px">
      <div class="cbar">
        <span class="pmono" style="font-size:10px">CASE PLAN · v2, \${highlightNew?"WITH PRODUCT-QUALITY GATE":"AS DESIGNED"}</span>
        <span class="zoom"><s>−</s>90%<s>+</s></span>
        <span class="btn sm">Validate</span><span class="btn sm primary">Publish</span>
      </div>
      <div class="srow" style="grid-template-columns:repeat(6,1fr)">\${base}</div>
      <div class="secband">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:9px">
          <span class="lbl">Conditional stages · event-driven</span>
          <span class="ptag gy">Entered only when a rule or event fires</span>
        </div>
        <div class="srow" style="grid-template-columns:repeat(4,1fr)">
          \${stageCard(STAGES[6],6)}
          <div class="pstage" style="opacity:.5"><span class="n">CONDITIONAL</span><h5>Waiting for customer evidence</h5><div class="sla">Dormant</div></div>
          <div class="pstage" style="opacity:.5"><span class="n">CONDITIONAL</span><h5>Engineering exception</h5><div class="sla">Dormant</div></div>
          <div class="pstage" style="opacity:.5"><span class="n">CONDITIONAL</span><h5>Parts substitution review</h5><div class="sla">Dormant</div></div>
        </div>
      </div>
      <div class="clegend">\${T("AG")} Agent \${T("PR")} Process \${T("HT")} Human \${T("API")} API
        <span class="pmono" style="margin-left:auto">Counts illustrative</span></div>
    </div>\`;
  return studioShell("Plan", inner);
}

function liveEditView(){
  const body = \`
    <div class="cx-head"><b>warranty-resolution case plan</b><span class="cx-chip">v1 → v2 draft</span></div>
    <div class="cx-body">
      <div class="cx-you"><span class="cx-role">You</span>Add a product-quality escalation gate before a case can close, if the recurrence check finds a pattern and it hasn't been reviewed.</div>
      <div class="cx-agent"><span class="av">C</span><div class="txt"><span class="cx-role">Claude Code</span><p>Identified the affected stage and rules. Change summary:</p>
        <div class="cx-diff">
          <div class="fh">warranty-resolution / case-plan.yaml</div>
          <div class="dl add"><span class="g">+</span><span>Stage added: Product-quality escalation (3 tasks)</span></div>
          <div class="dl mod"><span class="g">~</span><span>Rule updated: Close and learn now requires "recurrence reviewed = true"</span></div>
          <div class="dl mod"><span class="g">~</span><span>Routing: recurrence-detected event now targets the new stage</span></div>
          <div class="dl ctx ind"><span class="g"></span><span>3 changes · 1 stage, 1 rule, 1 route · case plan version 1 → 2</span></div>
        </div>
        <p style="margin-top:9px;color:#8b8b85">Running cases can be migrated onto v2 without restarting.</p>
        <div class="cx-acts"><span class="cx-btn">Discard</span><span class="cx-btn pri">Approve change</span></div>
      </div></div>
    </div>
    <div class="cx-composer">Ask for a change…<span class="send">&#8629; SEND</span></div>\`;
  const termBody = term([
    ["prompt","Add a product-quality escalation gate before a case can close, if the recurrence check finds a pattern and it hasn't been reviewed."],
    null,
    ["dim","Identifying affected stage and rules..."],
    null,
    ["dim","warranty-resolution / case-plan.yaml"],
    ["add","+ Stage added: Product-quality escalation (3 tasks)"],
    ["mod","~ Rule updated: Close and learn now requires \\"recurrence reviewed = true\\""],
    ["mod","~ Routing: recurrence-detected event now targets the new stage"],
    null,
    ["dim","3 changes · 1 stage, 1 rule, 1 route · case plan version 1 → 2"],
    ["dim","Running cases can be migrated onto v2 without restarting."],
    null,
    ["prompt","approve change"],
    ["ok","Applied. case-plan.yaml · v1 → v2."]
  ]);
  return nativeChrome("Claude Code — cobalt-ridge-warranty-case",
    ["warranty-resolution case plan","v1 → v2 · product-quality gate"],
    [["uce-warranty content sync","compile:content, catalog rebuild"],["process-skills lint pass","lint-sources, evaluate-kb"]],
    body, termBody);
}

function worklistView(){
  const rows = [
    ["WR-2026-0417","Coverage disputed — combined cause finding","Sarah Chen","No rule resolves a combined cause","Resolution decision",true],
    ["WR-2026-0421","Repeat-failure pattern needs a human call","Ryan Ochoa","Recurrence confirmed, gates closure","Close and learn",false],
    ["WR-2026-0409","Engineering sign-off on a spec deviation","Miguel Alvarez","Repair exceeds standard spec","Diagnose and contain",false]
  ];
  const role = n => (PERSONAS.find(p=>p[0]===n)||["",""])[1];
  const body = rows.map(r=>\`<tr class="\${r[5]?"hero":""}">
      <td><span class="pref">\${r[0]}</span><span class="psubx">Northstar Retail Distribution</span></td>
      <td><span class="nm">\${r[1]}</span><span class="psubx">\${r[4]}</span></td>
      <td><span class="nm">\${r[2]}</span><span class="psubx">\${role(r[2])}</span></td>
      <td><span class="psubx" style="color:var(--p-ink);white-space:normal">\${r[3]}</span></td>
      <td><span class="ptag yl">Action required</span></td></tr>\`).join("");
  return appTop({badge:"I",name:"Industrial Equipment Warranty Resolution",nav:["Cases","Performance","Case plans"],active:"Cases"})+
  \`<div class="pmain">
    <div style="display:grid;grid-template-columns:1.45fr 1fr 1fr;gap:13px">
      <div class="pcard paper pad" style="display:flex;flex-direction:column;gap:9px;grid-row:span 2">
        <span class="ptag bl" style="align-self:flex-start">Agent summary</span>
        <div class="phead">3 cases need a person today, out of 41 open.</div>
        <div class="psub">The other 38 are progressing on their own.</div>
        <hr class="prule">
        <div class="pbody" style="font-weight:500">Each one arrives with a reason and a recommendation.</div>
        <div class="pmono" style="margin-top:auto">3 OPEN TASKS ASSIGNED TO YOU</div>
      </div>
      \${kpiTile("Avg. coverage decision time","1.8"," days",{series:[3.4,3.1,3.2,2.7,2.4,2.5,2.1,1.8]})}
      \${kpiTile("Restoration commitment adherence","71","%",{series:[54,57,61,60,66,69,68,71]})}
      \${kpiTile("Critical cases at SLA risk","5","",{delta:"&#9650; 1"})}
      \${kpiTile("Repeat-failure candidates","7","",{note:"4 LINKED TO ONE DRIVE FAMILY"})}
    </div>
    <div class="pcard" style="overflow:hidden">
      <div style="display:flex;align-items:center;gap:14px;padding:12px 16px">
        <span class="ptitle">Work queue</span>
        <span class="psearch">\${ICO.search}Search cases, names, stages…</span>
        <span class="ptabs" style="margin-left:auto"><span class="on">Action required · 3</span><span>Waiting on others</span><span>All open · 41</span></span>
      </div>
      <table class="pt"><colgroup><col style="width:186px"><col><col style="width:186px"><col style="width:250px"><col style="width:142px"></colgroup>
        <thead><tr><th>Case</th><th>Description</th><th>Owner</th><th>Why it's here</th><th>Status</th></tr></thead>
        <tbody>\${body}
          <tr class="ptail"><td colspan="5">38 OF 41 OPEN CASES ARE PROGRESSING WITHOUT A PERSON</td></tr></tbody></table>
    </div>
  </div>\`;
}

function opsDashView(){
  const bars = [["Coverage and evidence review",100],["Diagnose and contain",62],["Resolution decision",44],
                ["Intake and impact triage",31],["Restore and validate",22],["Close and learn",14]];
  const barRows = bars.map(b=>\`<div style="display:flex;align-items:center;gap:11px;padding:5px 0">
      <span style="width:196px;font-size:12px;color:var(--p-mute);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${b[0]}</span>
      <span style="flex:1;height:9px;border-radius:999px;background:var(--p-muted-bg);overflow:hidden">
        <span style="display:block;height:9px;width:\${b[1]}%;border-radius:999px;background:\${b[1]===100?"var(--p-teal)":"rgba(12,127,149,.42)"}"></span></span></div>\`).join("");
  const area = (function(){
    const v=[92,88,84,79,71,66,58,49,41,34,29,24];
    const w=520,h=118,max=Math.max.apply(null,v),min=Math.min.apply(null,v);
    const pts=v.map((x,i)=>[i*(w/(v.length-1)),(h-6)-((x-min)/((max-min)||1))*(h-18)]);
    const d=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
    return \`<svg viewBox="0 0 \${w} \${h}" preserveAspectRatio="none" style="display:block;width:100%;height:118px;margin-top:10px" aria-hidden="true">
      \${[0,1,2,3].map(i=>\`<line x1="0" y1="\${8+i*33}" x2="\${w}" y2="\${8+i*33}" stroke="#eae8e3" stroke-width="1" vector-effect="non-scaling-stroke"/>\`).join("")}
      <path d="\${d} L \${w} \${h} L 0 \${h} Z" fill="rgba(12,127,149,.09)"/>
      <path d="\${d}" fill="none" stroke="#0c7f95" stroke-width="1.8" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>\`;
  })();
  return appTop({badge:"I",name:"Industrial Equipment Warranty Resolution",nav:["Cases","Performance","Case plans"],active:"Performance"})+
  \`<div class="pmain">
    <div style="display:flex;align-items:center;gap:12px">
      <span class="ptitle">Operational insights</span>
      <span class="ptabs" style="margin-left:auto"><span class="on">Last 30 days</span><span>Quarter</span><span>Year</span></span>
      <span class="btn sm">Export</span>
    </div>
    \${statStrip([
      ["Progressing autonomously","93","%",{}],
      ["Human-intervention rate","7","%",{}],
      ["At SLA risk","4","",{delta:"&#9650;",note:"WATCHLIST"}],
      ["Bottleneck stage","Evidence review","txt",{note:"LONGEST DWELL TIME"}]
    ])}
    <div style="display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:13px;align-items:start">
      <div class="pcard pad">
        <div style="display:flex;align-items:baseline;gap:10px">
          <span class="lbl">Cases entering the human queue</span>
          <span class="pmono" style="margin-left:auto">ILLUSTRATIVE</span></div>
        \${area}
      </div>
      <div class="pcard paper pad">
        <span class="ptag bl" style="margin-bottom:8px">What changed</span>
        <div class="ptitle">Fewer cases enter the queue, not a faster queue</div>
        <p class="pbody" style="color:var(--p-mute);margin-top:6px">Straight-through completion is up because most cases never reach Sarah at all, not because she processes them quicker.</p>
      </div>
    </div>
    <div class="pcard pad">
      <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:4px">
        <span class="lbl">Where work accumulates, by stage</span>
        <span class="pmono" style="margin-left:auto">ILLUSTRATIVE</span></div>
      \${barRows}
    </div>
  </div>\`;
}

function caseManagerView(){
  const rules = [
    ["Case","Portal","Case entry","Warranty claim submitted","","Enter case",false],
    ["Stage","Intake and impact triage","Enter case","Case entered","","Enter Intake and impact triage",false],
    ["Sequential task","Assemble evidence (Agent)","Task entry","Stage entered","","Enter Assemble evidence",true],
    ["Sequential task","Classify impact (Human)","Task entry","Upstream task completed","","Enter Classify impact",true],
    ["Stage","Intake and impact triage","Stage complete","Required tasks completed","","Complete Intake and impact triage",false],
    ["Stage","Coverage and evidence review","Stage complete","Required tasks completed","","Complete Coverage and evidence review",false],
    ["Event-driven task","Engineering exception","Task entry","New evidence uploaded","estimate.scope !== approved.scope","Enter Engineering exception",false],
    ["Stage","Close and learn","Recurrence gate","Tasks completed: Recurrence scan","relatedFailures &gt;= 4","Enter Product-quality escalation",true],
    ["Manually triggered","Waiting for customer evidence","Entry rule 1","Manual activation","","Enter Waiting for customer evidence",false]
  ].map(r=>\`<tr><td>\${r[0]}</td><td>\${r[1]}</td><td>\${r[2]}</td><td>\${r[3]}</td>
      <td>\${r[4]?\`<span class="stu-if">\${r[4]}</span>\`:""}</td>
      <td>\${r[5]}\${r[6]?'<span class="stu-auto">Auto-generated</span>':""}</td></tr>\`).join("");
  const inner = \`<div class="stu-banner"><span class="icn2">\${ICO.bolt}</span>
        <div><b>Rules decide how your case moves</b><p>Rules are the conditions that control the case. They decide when stages and tasks start, complete, or exit.</p></div>
        <span class="x">×</span></div>
      <div class="stu-toolbar">
        <span class="stu-search">\${ICO.search} Search rules</span>
        <span class="stu-filt">Scope: All</span><span class="stu-filt">Stage: All</span><span class="stu-filt">When: All</span><span class="stu-filt">Then: All</span>
        <span class="stu-add">+ Add rule</span>
      </div>
      <table class="stu"><colgroup><col style="width:126px"><col style="width:220px"><col style="width:118px"><col style="width:190px"><col style="width:180px"><col></colgroup>
        <thead><tr><th>Scope</th><th>Element</th><th>Rule</th><th>When</th><th>If</th><th>Then</th></tr></thead>
        <tbody>\${rules}</tbody></table>\`;
  return studioShell("Rules", inner);
}

function eventReassessView(){
  return appTop({badge:"I",name:"Industrial Equipment Warranty Resolution",nav:["Cases","Performance","Case plans"],active:"Cases"})+
  \`<div class="pmain" style="display:grid;grid-template-columns:minmax(0,1fr) 316px;gap:14px;align-items:start">
    <div style="display:grid;gap:13px">
      \${caseHeader({ref:"WR-2026-0417",title:"New evidence lands on the case, mid-resolution",
        pills:\`<span class="ptag vt">Event received</span><span class="ptag bl">Stage · Resolution decision</span><span class="pmono">SLA 4 HR</span>\`,
        action:\`<span class="btn sm">\${ICO.plan} Case plan</span>\`})}
      <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:13px">
        <div class="pcard pad">
          <div style="display:flex;gap:9px;align-items:center;margin-bottom:9px"><span class="fic">\${ICO.doc}</span>
            <span class="lbl">Uploaded evidence</span></div>
          <div class="ptitle">Customer-submitted photos of the failed drive</div>
          <p class="pbody" style="color:var(--p-mute);margin-top:6px">The customer uploads new photos through the portal. It behaves the same way new proof-of-loss evidence does when it lands on an insurance claim mid-case.</p>
          <hr class="prule" style="margin:11px 0">
          <div class="docrow"><span class="ext">zip</span><span class="nm">customer-photos-sr440.zip</span><span class="meta">new</span></div>
        </div>
        <div class="pcard pad" style="border-color:var(--p-teal-line);background:linear-gradient(#fff,var(--p-teal-surf))">
          <div style="display:flex;gap:9px;align-items:center;margin-bottom:9px"><span class="fic">\${ICO.bolt}</span>
            <span class="lbl tl">Case agent reassessment</span></div>
          <div class="ptitle">Coverage position may no longer hold</div>
          <p class="pbody" style="color:#4a5560;margin-top:6px">Nobody routed this. The upload event woke the case agent, which checked the new photos against Sarah's combined-cause finding and flagged that the wear pattern no longer clearly supports it.</p>
          <hr class="prule" style="margin:11px 0">
          <div class="pbody" style="color:var(--p-teal-700);font-weight:500">Recommended: send to engineering to re-examine cause before the coverage position is finalized</div>
          <div class="pmono" style="margin-top:5px">CONFIDENCE HIGH · EVIDENCE: COMBINED-CAUSE FINDING, NEW CUSTOMER PHOTOS, WEAR-PATTERN DELTA</div>
          <div style="display:flex;gap:8px;margin-top:11px"><span class="btn sm">Override</span><span class="btn sm primary">Route to engineering exception</span></div>
        </div>
      </div>
    </div>
    <div style="display:grid;gap:13px">
      <div class="pcard pad">\${stageTimeline(3,{exception:"eng"})}</div>
      <div class="pcard pad">
        <span class="lbl" style="margin-bottom:8px">Details</span>
        \${CASE_FACTS.map(f=>\`<div class="drow"><span class="k">\${f[0]}</span><span class="v">\${f[1]}</span></div>\`).join("")}
        <div class="drow"><span class="k">Stage</span><span class="v">Resolution decision</span></div>
      </div>
    </div>
  </div>\`;
}

function miniNode(name, on, taskCount){
  const ticks = Array.from({length:taskCount||3},(_,i)=>\`<i class="\${on&&i===0?"on":""}"></i>\`).join("");
  return \`<div class="iv-node\${on?" on":""}"><b>\${name}</b><span>Stage</span><div class="tasks">\${ticks}</div></div>\`;
}
function auditTrailView(){
  const trail = [
    ["EVT","New customer photos uploaded to the case","Intake","09:14 AM"],
    ["AG","Case manager: checks photos against the combined-cause finding","Resolution decision","09:14 AM"],
    ["AG","Case manager: selects route to engineering exception, confidence high","Resolution decision","09:15 AM"],
    ["HT","Miguel confirms the cause before coverage is finalized","Engineering exception","09:41 AM"]
  ].map((e,i)=>\`<tr><td class="pmono" style="color:var(--p-mute)">\${String(i+1).padStart(2,"0")}</td>
      <td>\${T(e[0])}</td><td><span class="nm">\${e[1]}</span></td>
      <td><span class="psubx">\${e[2]}</span></td><td class="pmono" style="font-size:10.5px">\${e[3]}</td></tr>\`).join("");
  const globals = [
    ["Case.Id","—","WR-2026-0417"],
    ["Asset.Id","—","SR-440"],
    ["Coverage.Position","Resolution decision","Partial + goodwill"],
    ["Recurrence.Count","Close and learn","4"]
  ].map(g=>\`<tr><td class="pmono" style="font-size:10.5px">\${g[0]}</td><td class="psubx">\${g[1]}</td>
      <td class="pmono" style="font-size:10.5px;color:var(--p-ink)">\${g[2]}</td></tr>\`).join("");
  const primary = ["Intake and impact triage","Coverage and evidence review","Diagnose and contain","Resolution decision","Restore and validate","Close and learn"];
  const nodes = primary.map((n,i)=>\`\${i?'<span class="iv-arrow2">→</span>':""}\${miniNode(n, n==="Resolution decision")}\`).join("");
  const adhoc = ["Waiting for customer evidence","Engineering exception","Parts substitution review","Product-quality escalation"]
    .map(n=>miniNode(n, n==="Engineering exception", 2)).join("");
  return \`<div class="pmain" style="gap:10px;position:relative">
    <div class="iv-top">
      <span class="iv-back">&larr; Back</span>
      <span class="iv-crumb">warranty-resolution.case &rsaquo; <b>WR-2026-0417</b></span>
      <span class="iv-status">
        <span class="lbl2">Status</span> <span class="ptag gn">Running</span>
        <span class="btn sm">\${ICO.bolt} Pause</span><span class="btn sm">Cancel</span>
      </span>
    </div>
    <div class="iv-title">Case · Industrial Equipment Warranty Resolution</div>
    <div class="iv-diagram">
      <div class="iv-cmchip"><span class="fic" style="width:20px;height:20px">\${ICO.bolt}</span><span><b style="font-size:10.5px">Case agent</b><u style="display:block;font-size:8px;color:var(--p-mute)">next best action</u></span></div>
      <div class="iv-row">\${nodes}</div>
      <div class="iv-band"><div class="cap">Adhoc stages</div><div class="iv-row">\${adhoc}</div></div>
      <div class="iv-zoom"><span>−</span><span>90%</span><span>+</span></div>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:12px;align-items:start">
      <div class="pcard" style="overflow:hidden">
        <div class="iv-tabbar"><span class="on">Execution trail</span><span>Action history</span>
          <span class="ic">\${ICO.reload}\${ICO.dots}</span></div>
        <table class="pt"><colgroup><col style="width:44px"><col style="width:58px"><col><col style="width:170px"><col style="width:90px"></colgroup>
          <thead><tr><th>Seq</th><th>Actor</th><th>Step</th><th>Stage</th><th>End time</th></tr></thead>
          <tbody>\${trail}</tbody></table>
      </div>
      <div class="pcard" style="overflow:hidden">
        <div class="iv-tabbar"><span class="on">Global variables</span><span>Incidents</span></div>
        <table class="pt"><colgroup><col><col style="width:96px"><col></colgroup>
          <thead><tr><th>Name</th><th>Source</th><th>Value</th></tr></thead>
          <tbody>\${globals}</tbody></table>
      </div>
    </div>
    <div class="iv-backdrop">
      <div class="iv-modal">
        <h4>Migrate instance to a new version</h4>
        <p>You are about to migrate <b>1 instance</b> to a different version of the process. This operation allows you to update the running instance with the latest logic, configurations, or workflows from the target version.</p>
        <div class="iv-verrow">
          <span class="iv-verfield"><span class="l">Source version</span><span class="v">v1</span></span>
          <span class="pmono">→</span>
          <span class="iv-verfield" style="border-color:var(--p-teal)"><span class="l">Target version</span><span class="v" style="color:var(--p-teal-700)">v2 · product-quality gate</span></span>
        </div>
        <table class="pt"><colgroup><col style="width:60px"><col><col style="width:100px"></colgroup>
          <thead><tr><th>Status</th><th>Case ID</th><th>Last update</th></tr></thead>
          <tbody><tr><td><span class="ptag gn" style="padding:1.5px 6px">&#9679;</span></td><td><span class="pref">WR-2026-0417</span></td><td class="pmono" style="font-size:10.5px">—</td></tr></tbody></table>
        <div class="iv-cfield">Add a comment about this migration…</div>
        <div style="display:flex;gap:8px;justify-content:flex-end"><span class="btn sm">Cancel</span><span class="btn sm primary">Continue</span></div>
      </div>
    </div>
  </div>\`;
}

function closeView(){
  const thumbs = {
    cg: \`<span class="thumb thumb-cg"><span class="hd"><i></i><i></i><i></i></span>
      <span class="bd"><span class="doc"><span class="r1"></span><span class="r2"></span><span class="r3"></span></span></span></span>\`,
    cx: \`<span class="thumb thumb-cx"><span class="hd"><i></i><i></i><i></i></span>
      <span class="bd"><span class="tl ok"></span><span class="tl dim"></span><span class="tl full"></span><span class="tl dim"></span></span></span>\`,
    mm: \`<span class="thumb thumb-mm"><span class="hd"><i></i><i></i><i></i></span>
      <span class="bd"><span class="stg on"><span class="d1"></span><span class="d2"></span></span><span class="stg"><span class="d1"></span><span class="d2"></span></span><span class="stg"><span class="d1"></span><span class="d2"></span></span></span></span>\`
  };
  const links = [[thumbs.cg,"Cartographer"],[thumbs.cx,"UiPath Coding Agents"],[thumbs.mm,"Maestro"],[thumbs.cg,"Cartographer"]];
  const chain = links.map((l,i)=>\`\${i?\`<span class="arw">→</span>\`:""}
    <span class="lnk">\${l[0]}<b>\${l[1]}</b></span>\`).join("");
  return \`<div class="slide">
    <span class="kicker">FUSION 2026 · Maestro Case</span>
    <h2>Build it.<br>Run it.<br>Improve it.</h2>
    <div class="chain">\${chain}</div>
    <div class="foot">COBALT RIDGE AUTOMATION · INDUSTRIAL EQUIPMENT WARRANTY RESOLUTION</div>
  </div>\`;
}



/* ==========================================================
   CONTINUOUS IMPROVEMENT VIEWS
   Content follows the Aug 24 Robert/Tuan/Alin call and cigui's
   own vocabulary. Threshold is a named component under $5,000,
   which is where that call landed, not the earlier $25,000.
   ========================================================== */
function suggestionsChrome(tab, crumb, body){
  const tabs = ["Feed","Suggestions","Ledger","Dashboard","Settings"]
    .map(t=>\`<span class="\${t===tab?"on":""}">\${t}</span>\`).join("");
  return \`<div class="win cg-win">
    <div class="cg-titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="wtool">\${ICO.layout}\${ICO.newwin}</span>
      <span class="cg-tabs">
        <span class="cg-tab"><span class="ic d">D</span>Delegate</span>
        <span class="cg-tab on"><span class="ic c">C</span>Cartographer</span>
        <span class="cg-tab"><span class="ic" style="background:#4338ca">A</span>Autopilot</span>
      </span>
      <span class="brand"><b>UiPath</b><span class="bell">\${ICO.bell}</span></span>
    </div>
    <div class="cg-body">
      <div class="cg-side">
        <div class="cg-new">\${ICO.plan} New conversation</div>
        <div class="cg-search">\${ICO.search} Search</div>
        <div class="cg-navgroup">Workspace</div>
        <div class="cg-navitem">Map of work</div>
        <div class="cg-navitem on">Suggestions</div>
        <div class="cg-navitem">Ledger</div>
        <div class="cg-navgroup">My processes</div>
        <div class="cg-navitem">Warranty Resolution</div>
        <div class="cg-navitem">Claims Intake</div>
        <div class="cg-foot">
          <div class="cg-addons">\${ICO.dots} Add-ons &amp; Integrations</div>
          <div class="cg-user"><span class="av">RL</span>Robert Love</div>
        </div>
      </div>
      <div class="ci">
        <div class="ci-head">
          <span class="ci-crumb"><b>Suggestions</b><span class="sep">/</span>Warranty Resolution<span class="sep">/</span>\${crumb}</span>
          <span class="ci-horizon">\${ICO.clock} 365 days</span>
        </div>
        <div class="ci-tabs">\${tabs}</div>
        <div class="ci-body">\${body}</div>
      </div>
    </div>
  </div>\`;
}

function ledgerView(){
  const rows = [
    ["hl","ok","Agreed","WR-2026-0417","PARTIAL + GOODWILL","Partial + goodwill","Sarah Chen","Resolution decision","1:42 PM"],
    ["","ok","Agreed","WR-2026-0411","APPROVE · SR-440 drive · $3,180","Approve","Sarah Chen","Coverage and evidence review","21 Aug"],
    ["","ok","Agreed","WR-2026-0404","APPROVE · SR-440 drive · $2,940","Approve","T. Beckerman","Coverage and evidence review","19 Aug"],
    ["","ok","Agreed","WR-2026-0396","APPROVE · SR-440 drive · $4,410","Approve","Sarah Chen","Coverage and evidence review","16 Aug"],
    ["dim","ok","Agreed","…38 more, SR-440 drive under $5,000","APPROVE","Approve","4 reviewers","Coverage and evidence review","90 days"],
    ["ovr","info","Overrode","WR-2026-0398","DENY","Approve partial","Sarah Chen","Resolution decision","14 Aug"],
    ["","gy","Unclear","WR-2026-0389","APPROVE","Sent back for evidence","M. Alvarez","Coverage and evidence review","11 Aug"]
  ].map(r=>\`<tr class="\${r[0]}">
      <td><span class="ci-chip \${r[1]}">\${r[2]}</span></td>
      <td class="val">\${r[3]}</td>
      <td class="k">\${r[4]}</td>
      <td class="val">\${r[5]}</td>
      <td>\${r[6]}</td>
      <td style="color:var(--ci-muted)">\${r[7]}</td>
      <td class="k">\${r[8]}</td></tr>\`).join("");
  return suggestionsChrome("Ledger","Ledger",\`
    <div class="ci-tool">
      <span class="ci-search">\${ICO.search} Search subject, outcome, rationale</span>
      <span class="ci-filt">Decided by: <b>Human</b></span>
      <span class="ci-filt">Status: <b>All</b></span>
      <span class="ci-filt">Stage: <b>All</b></span>
      <span class="ci-count"><b>412</b> decisions · <b>6</b> overrides (1.5%)</span>
    </div>
    <div class="ci-card" style="overflow:hidden">
      <table class="ci-t">
        <tr><th>Status</th><th>Subject</th><th>Proposed</th><th>Decided</th><th>Actor</th><th>Where</th><th>When</th></tr>
        \${rows}
      </table>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:12px;align-items:start">
      <div class="ci-card pad">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
          <span class="ci-lbl">Decision · WR-2026-0417</span>
          <span class="ci-chip ok" style="margin-left:auto">Agreed</span>
          <span class="ci-chip gy">Immutable</span>
        </div>
        <dl class="ci-kv" style="grid-template-columns:auto minmax(0,1fr)">
          <dt>Proposed</dt><dd>Partial coverage plus goodwill · confidence medium-high</dd>
          <dt>Decided</dt><dd>Partial coverage plus goodwill, unchanged</dd>
          <dt>Decided by</dt><dd>Sarah Chen, inside her delegated authority</dd>
          <dt>Rationale</dt><dd>A part failed inside term, and a controls change was never approved. Both contributed.</dd>
          <dt>Rules read</dt><dd>Combined-cause allocation · goodwill delegation</dd>
          <dt>Took</dt><dd>4 minutes, 9 days after the customer first called</dd>
        </dl>
        <p style="font-size:10.5px;color:var(--ci-muted);margin-top:8px;border-top:1px solid #eef3f3;padding-top:7px">
          The decision was never the hard part. The wait was.</p>
      </div>
      <div class="ci-card pad">
        <span class="ci-lbl" style="margin-bottom:7px">Signals captured with it</span>
        <div class="erow" style="border:0;padding:4px 0;font-size:11px;display:flex;gap:7px;align-items:center">
          <span style="flex:1">Approved configuration baseline</span><span class="ci-chip ok">Useful</span></div>
        <div class="erow" style="border-top:1px solid #eef3f3;padding:4px 0;font-size:11px;display:flex;gap:7px;align-items:center">
          <span style="flex:1">Controls change audit</span><span class="ci-chip ok">Useful</span></div>
        <div class="erow" style="border-top:1px solid #eef3f3;padding:4px 0;font-size:11px;display:flex;gap:7px;align-items:center">
          <span style="flex:1">Third-party service report</span><span class="ci-chip gy">Not marked</span></div>
        <p style="font-size:10.5px;color:var(--ci-muted);margin-top:8px">Sarah spent a few seconds on this and it
          blocked nothing. It is what the suggestions are read from.</p>
      </div>
    </div>
    <p style="font-size:11px;color:var(--ci-muted)">Proposed and Decided sit next to each other on purpose. The eye
      runs down two columns and catches a disagreement without reading.</p>\`);
}

function suggestionsView(){
  const meter = n => \`<span class="ci-meter" aria-label="\${n===3?"High":n===2?"Medium":"Low"} importance">
    \${[1,2,3].map(i=>\`<i class="\${i<=n?"f":""}"></i>\`).join("")}</span>\`;
  const row = (on,n,type,tone,title,sub) => \`<div class="ci-card pad" style="padding:10px 12px;\${on?"border-color:#9fdde1;background:var(--ci-sel)":""}">
      <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px">
        \${meter(n)}<span class="ci-chip \${tone}">\${type}</span></div>
      <b style="font-size:11.5px;font-weight:600;line-height:1.35;display:block">\${title}</b>
      <span style="font-size:10.5px;color:var(--ci-muted)">\${sub}</span>
    </div>\`;
  return suggestionsChrome("Feed","Feed",\`
    <div style="display:flex;align-items:baseline;gap:10px">
      <b style="font-size:13.5px">2 suggestions</b>
      <span class="ci-filt">Sort: <b>Worsening first</b></span>
      <span class="ci-count">clustered from the ledger · last run 02:00 UTC</span>
    </div>
    <div style="display:grid;grid-template-columns:264px minmax(0,1fr);gap:12px;align-items:start;min-width:0">
      <div style="display:grid;gap:8px">
        <span class="ci-lbl">Assigned to me</span>
        \${row(true,3,"Drift signal","info","Nobody has ever disagreed with an SR-440 drive approval under $5,000","41 decisions · worsening")}
        \${row(false,2,"Blind spot","vio","The same drive keeps failing and nobody is checking the part itself","4 failures, 3 customers · steady")}
        <p style="font-size:10.5px;color:var(--ci-muted);margin-top:2px">One removes a human step. One adds one.
          The loop tunes involvement in both directions.</p>
      </div>
      <div class="ci-sug pri" style="min-width:0">
        <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap">
          \${meter(3)}<span class="ci-chip info">Drift signal</span><span class="ci-chip ok">Confirmed</span>
          <span class="ci-chip tl">Improves · Human touchpoints</span>
        </div>
        <h4>Nobody has ever disagreed with an SR-440 drive approval under $5,000</h4>
        <p>41 of these decisions in the last 90 days. Every one was approved, and the reviewer never changed the
          recommendation. None was reversed afterwards. Review added a median 3.1 hours to a stage that has a
          4-hour target.</p>
        <div class="ci-ev">
          <span>decisions <b>41</b></span><span>overturned <b>0</b></span>
          <span>persistence <b>90 days</b>, persistent not a blip</span>
          <span>reviewer hours <b>127</b></span>
          <span>cluster cohesion <b>high</b>, the cases are alike</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
          <div>
            <span class="ci-lbl" style="margin-bottom:5px">Classification</span>
            <dl class="ci-kv">
              <dt>Source</dt><dd>Decision ledger</dd>
              <dt>Analyzer</dt><dd>Human signals</dd>
              <dt>Stage</dt><dd>Coverage and evidence review</dd>
              <dt>Root cause</dt><dd>reads clearly</dd>
            </dl>
          </div>
          <div>
            <span class="ci-lbl" style="margin-bottom:5px">Adversarial verification</span>
            <p style="font-size:11px;color:var(--ci-text);line-height:1.5">A verifier tried to refute this and it
              held. It did narrow the claim: the pattern is specific to this drive family, not to small claims
              generally, so the rule names the part.</p>
          </div>
        </div>
        <p class="ci-blind"><b>What this analysis could not see.</b> Three claims in the window were withdrawn
          before anyone reviewed them, so their outcome is unknown and they are not counted here.</p>
        <div>
          <span class="ci-lbl" style="margin:9px 0 5px">Proposed improvement</span>
          <p style="font-size:11.5px;line-height:1.5">Approve this class by rule. Keep sending combined cause,
            amounts above the threshold, and commercial exceptions to a person.</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:9px;
                    border-top:1px solid #eef3f3;padding-top:9px">
          <div>
            <span class="ci-lbl" style="margin-bottom:5px">Lifecycle</span>
            <dl class="ci-kv">
              <dt>Status</dt><dd>Open</dd>
              <dt>Assignee</dt><dd>Sarah Chen</dd>
              <dt>Trend</dt><dd>Worsening</dd>
              <dt>Updated</dt><dd>this morning, 02:00 UTC run</dd>
            </dl>
          </div>
          <div>
            <span class="ci-lbl" style="margin-bottom:5px">Linked ledger items</span>
            <p style="font-size:11px;color:var(--ci-muted);line-height:1.5">WR-2026-0411 · WR-2026-0404 ·
              WR-2026-0396 and 38 more, across 4 reviewers and 3 customers. Every one cites the decisions it was
              clustered from, so the ledger is the only input.</p>
          </div>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
          <span class="ci-btn pri">Create improvement</span>
          <span class="ci-btn sm">View the 41 decisions</span>
          <span class="ci-btn sm">Dismiss</span>
          <span class="ci-count" style="margin-left:auto">coming soon, not shipping today</span>
        </div>
      </div>
    </div>\`);
}

function improvementView(){
  return suggestionsChrome("Suggestions","Suggestions <span class='sep'>/</span> IMP-0142",\`
    <div style="display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:13px;align-items:start">
      <div style="display:grid;gap:11px;min-width:0">
        <div>
          <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin-bottom:5px">
            <span class="ci-chip warn">Needs review</span><span class="ci-chip tl">Online</span>
            <span class="ci-chip gy">Lever · Rules</span>
            <span class="ci-count">from the SR-440 suggestion</span>
          </div>
          <b style="font-size:15px;font-weight:600">Approve small SR-440 drive claims by rule</b>
        </div>
        <div class="ci-card pad">
          <span class="ci-lbl" style="margin-bottom:6px">Why this exists</span>
          <p style="font-size:11.5px;line-height:1.55">41 decisions, all approved, none reversed. The judgement was
            never hard. The wait was the problem.</p>
        </div>
        <div>
          <span class="ci-lbl" style="margin-bottom:5px">What changes</span>
          <div class="ci-rule add">
            <div class="rh"><span class="ci-chip ok">New rule</span> Coverage and evidence review
              <span class="ci-count">generated</span></div>
            <div class="rb"><span class="kw">WHEN</span> a coverage recommendation is ready<br>
              <span class="kw">IF</span> failed part = SR-440 drive <span class="kw">AND</span> claim &lt; $5,000
              <span class="kw">AND</span> cause is not disputed<br>
              <span class="kw">THEN</span> approve by rule and skip the human task</div>
          </div>
          <div class="ci-rule">
            <div class="rh"><span class="ci-chip gy">Unchanged</span> Everything else still routes to a person</div>
            <div class="rb">Combined cause, claims of $5,000 or more, and commercial exceptions are untouched.</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">
          <div class="ci-card pad">
            <span class="ci-lbl" style="margin-bottom:6px">Adversarial verification</span>
            <span class="ci-chip ok" style="margin-bottom:5px">Held</span>
            <p style="font-size:11px;line-height:1.5;color:var(--ci-muted)">A verifier narrowed it: the pattern is
              specific to this drive family, so the rule names the part rather than the amount alone.</p>
          </div>
          <div class="ci-card pad">
            <span class="ci-lbl" style="margin-bottom:6px">Risks</span>
            <p style="font-size:11px;line-height:1.5;color:var(--ci-muted)">A design change to the drive would make
              the 90 days of history stale. Sampling catches that within a month, and the rule can be withdrawn.</p>
          </div>
        </div>
        <div class="ci-card pad">
          <span class="ci-lbl" style="margin-bottom:6px">And the next case, handled better</span>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px">
            <span class="ci-chip ok">WR-2026-0468 &middot; approved by rule</span>
            <span class="ci-count">SR-440 drive &middot; $2,730 &middot; single cause</span>
          </div>
          <p style="font-size:11px;color:var(--ci-muted)">The first claim this rule covers finishes in 4 hours
            instead of 4.2 days, and nobody was asked. If it misfires, roll the rule back from here &mdash;
            one in ten is audited for 30 days.</p>
        </div>
      </div>
      <div style="display:grid;gap:11px">
        <div class="ci-card pad">
          <span class="ci-lbl" style="margin-bottom:7px">Projected impact</span>
          <div style="display:grid;gap:8px">
            <div><div class="ci-fx" style="grid-template-columns:1fr"><div class="b" style="border:0;padding:0">
              <div class="v">93<small>%</small> → 96<small>%</small></div>
              <div class="k">Finishing without a person</div></div></div></div>
            <dl class="ci-kv">
              <dt>Reviewer hours</dt><dd>127 back over 90 days</dd>
              <dt>Routine wait</dt><dd>3.1 hours removed per claim</dd>
              <dt>Claims affected</dt><dd>roughly 41 in 90 days</dd>
            </dl>
          </div>
        </div>
        <div class="ci-card pad">
          <span class="ci-lbl" style="margin-bottom:7px">Rollout</span>
          <dl class="ci-kv">
            <dt>Takes effect</dt><dd>Immediately on apply, read at run time, no redeployment</dd>
            <dt>Reversible</dt><dd>Yes, the rule can be withdrawn</dd>
            <dt>Environment</dt><dd>Production</dd>
            <dt>Sampling</dt><dd>1 in 10 audited for 30 days</dd>
          </dl>
        </div>
        <div class="ci-card pad">
          <span class="ci-lbl" style="margin-bottom:7px">Activity</span>
          <div class="ci-act"><span class="who">Human signals analyzer</span>
            <span class="what">Clustered 41 decisions from the ledger.</span></div>
          <div class="ci-act"><span class="who">Improvement agent</span>
            <span class="what">Drafted the rule and one new eval.</span></div>
          <div class="ci-act"><span class="who">You, on apply</span>
            <span class="what">The rule takes effect and can be rolled back.</span></div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="ci-btn sm">Decline</span>
          <span class="ci-btn pri" style="flex:1;justify-content:center">\${ICO.bolt} Apply</span>
        </div>
        <p style="font-size:10.5px;color:var(--ci-muted)">A person approves this rule once, instead of approving
          every claim it covers. Nothing applies itself.</p>
        <div class="ci-card pad" style="border-color:var(--ci-teal)">
          <span class="ci-lbl" style="margin-bottom:5px">And it flows back into the map</span>
          <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap">
            <span class="ci-chip tl">SI-0007 &middot; submitted</span>
            <span class="ci-count">substitution standard &middot; awaiting Priya's sign-off</span></div>
          <p style="font-size:10.5px;color:var(--ci-muted);margin-top:5px">The applied rule lands in the map of
            work as a submitted proposal &mdash; which is where the estate screens that follow pick it up.</p>
        </div>
      </div>
    </div>\`);
}




/* The human decision, as a console rather than a form. Alin's ask on the
   25 Aug call; Tuan named the three evidence sources. The evidence is
   readable here, not linked, which is what gives the combined-cause call
   a spine. Exactly one decision on the screen, and the rail decides nothing. */
function consoleView(){
  /* Simplified 26 Aug on Robert's note that it was still too busy to follow
     from a keynote seat. Five visual objects, not fourteen: the identity
     strip, Alin's widget lane, the two causes, one supporting-detail line,
     and the decision. Vikram's six facts survive as one strip rather than
     six cards; the detail he wanted progressively disclosed is one row. */
  const FACTS = [
    ["Claim","Warranty &middot; combined cause"],
    ["Claim ID","WR-2026-0417"],
    ["Customer","Northstar Retail Distribution"],
    ["Transaction","$16,272.50 &middot; 4 lines"],
    ["Issue","Two causes, different payers"],
    ["Recommended","Partial coverage + goodwill"]
  ].map((f,i)=>\`<div\${i===5?' class="rec"':''}><span>\${f[0]}</span><b>\${f[1]}</b></div>\`).join("");
  const SPLIT = [
    ["Parts &mdash; failed in its rated life","8,450.00","",false],
    ["Labour &mdash; caused by the change","","2,682.50",false],
    ["Travel &mdash; goodwill","1,240.00","",true],
    ["Freight &mdash; the expedite it caused","","3,900.00",false]
  ].map(r=>\`<div class="cn-srow"><span class="nm2">\${r[0]}</span>
      <span class="a \${r[1]?(r[3]?"gw":""):"z"}">\${r[1]||"&mdash;"}</span>
      <span class="a \${r[2]?"":"z"}">\${r[2]||"&mdash;"}</span></div>\`).join("");
  return \`<div class="cn">
    <div class="cn-top"><span class="lg">C</span>
      <span class="nm">Warranty Resolution Console</span>
      <span class="who"><span><b>Sarah Chen</b><u>Warranty Resolution Lead</u></span><i>SC</i></span></div>

    <div class="cn-idstrip">\${FACTS}</div>
    <div class="cn-slaline"><span class="ptag yl">Action required</span>
      <span>Line down since the 06:14 alarm &middot; ready for a decision in 1 hr 38 min, against a 4.2-day baseline</span>
      <span class="pmono" style="margin-left:auto">DUE 1:46 PM</span></div>

    <div class="cn2">
      <div class="cn-lane">
        <span class="lbl tl" style="margin-bottom:6px">Signal capture &middot; Cartographer widget &middot; 302 px lane</span>
        <div class="rowu">Service report<i class="on">&#10003; useful</i></div>
        <div class="rowu">Config baseline<i class="on">&#10003; useful</i></div>
        <div class="rowu">Controls audit<i>&mdash;</i></div>
        <div class="agg">Across similar combined-cause claims, 78% ended in partial plus goodwill.</div>
        <div class="pmono" style="margin-top:6px;font-size:7.5px">NON-BLOCKING &middot; NEVER DECIDES</div>
      </div>

      <div class="col">
        <div class="cn-cause2">
          <div class="cn-cause pro"><span class="lbl">Cause 1 &middot; on us</span>
            <h5>The part failed early</h5>
            <p>Bearing failed at <b>4,100 of 20,000 rated hours</b>. A manufacturing defect, not overload.</p>
            <span class="pts">&rarr; Points to covered</span></div>
          <div class="cn-cause con"><span class="lbl">Cause 2 &middot; on them</span>
            <h5>The machine was changed without approval</h5>
            <p>Torque limit raised <b>19% above the approved envelope</b>, with no sign-off. ESA &sect;4.2 requires it in writing.</p>
            <span class="pts">&rarr; Points to excluded</span></div>
        </div>
        <div class="cn-verdict"><b>Both are established. Neither is sole.</b>
          <p>No rule resolves a combined cause &mdash; which is why it is in front of a person.</p></div>
        <div class="cn-more"><span class="chev">&rsaquo;</span>
          <span>Policy test, the four cost lines, three evidence sources and the prior claim
            <b>WR-2025-0331</b> &mdash; all one click away</span></div>
      </div>

      <div class="cn-dec">
        <div class="dhd"><b>The decision</b><span class="ptag yl" style="margin-left:auto">Yours</span></div>
        <div class="dbody">
          <div class="cn-opt"><span class="rad"></span><span><b>Deny</b></span></div>
          <div class="cn-opt"><span class="rad"></span><span><b>Approve in full</b></span></div>
          <div class="cn-opt on"><span class="rad"></span><span>
            <b>Split it &mdash; partial + goodwill <span class="ptag tl">Recommended</span></b></span></div>
          <div class="cn-split">
            <div class="shd"><span class="lbl">Who pays</span>
              <span class="h">Cobalt&nbsp;Ridge</span><span class="h">Customer</span></div>
            \${SPLIT}
            <div class="cn-srow tot"><span class="nm2">Total</span>
              <span class="a">9,690.00</span><span class="a">6,582.50</span></div>
          </div>
          <div class="cn-auth">
            <div class="atop"><span class="lbl">Your authority</span><b>$9,690 of $10,000</b></div>
            <div class="cn-meter"><i style="width:96.9%"></i></div>
            <div class="amsg">&#10003; You sign this alone. A denial goes to the VP.</div>
          </div>
          <div class="cn-agree">
            <span class="lbl">And the reasoning</span>
            <div class="cn-tri on"><span class="rad"></span>I agree with the reasoning</div>
            <div class="cn-tri"><span class="rad"></span>I agree, but keep asking me</div>
            <div class="cn-tri"><span class="rad"></span>Stop asking for cases like this</div>
          </div>
        </div>
        <div class="cn-foot">
          <span class="btn primary">Submit</span>
          <span class="esc">RATIONALE ATTACHED &middot; WRITES TO THE LEDGER</span>
        </div>
      </div>
    </div>
  </div>\`;
}

// ---------- acts & scenes ----------
const ACTS = [
  {t:"Act I · Build it", goal:"The cartographer agent maps the work, the scribe writes the design, a coding agent builds the case from it. Then the business changes a rule and the agent makes the change.", rt:"~2.5 MIN", scenes:[
    {actor:"System", views:["scribe"], status:"partial", short:"The design, handed over",
     frameLabel:"Cartographer",
     title:"Cartographer has already turned the documents into a design",
     narr:"Picks up straight after the Cartographer demo. Three named steps got us here: the cartographer agent produced the map of work, the scribe turned it into the design document, and that document is what goes to the coding agent next. Establish it is real and detailed, then stop. Do not read it section by section.",
     tt:"You have just watched the cartographer agent map how warranty resolution actually runs at this company, and the scribe turn that map into a design document. That is real progress, but it is still a document. For most companies this is where the slow part starts. Somebody has to turn it into tasks, data, rules, integrations and the screens people use, and when a requirement changes, that translation starts over. I want to show you two things. How this design becomes a working process, and how that process then runs on its own and gets better while it does.",
     demo:["Open the finished design document and scroll briefly so it reads as real.","Say all three steps out loud: map of work, then scribe, then the design.","End on the stage list.","Don't walk it section by section. Don't dwell on the document itself."]},
    {actor:"Agent", views:["agentbuild"], status:"build", short:"The coding agent proposes the case",
     title:"The coding agent proposes the whole case before building any of it",
     narr:"You are the developer now. The same design goes to the coding agent you already use. It comes back with stages, the data model, tasks, integrations and rules, and waits for your approval. The build is delegated. The judgment is not.",
     tt:"I am the developer this time. Instead of translating this document by hand, I bring in the coding agent I already work with. It can build directly on the platform, so I give it the exact design that was just produced and ask it to build warranty resolution end to end. It comes back with a proposal first: the stages, the data model, the tasks, the integrations, the rules. I read it, adjust what I want, and approve. I delegate the building. I keep the judgment.",
     demo:["Show a prepared coding-agent session.","Point at the proposal: stages, data model, tasks, integrations, rules, then your approval.","Don't type the original prompt live."]},
    {actor:"System", views:["plan"], status:"build", short:"Six stages, and four more",
     frameLabel:"Design time · Studio",
     title:"Six stages run every time, and four more open only when something goes wrong",
     narr:"Six stages that always run and four more that only open when something goes wrong, which is the part that makes this a case and not a straight line. Then open Diagnose and contain: an agent correlates the evidence, an API checks coverage against policy, a process coordinates the on-site work, and a person approves before anything happens.",
     stagesToShow:"base",
     tt:"Here is what that approval delivers. Six stages that every case runs, and four more that only open when something goes wrong: evidence is missing, engineering has to weigh in, a part has to be substituted, the same failure keeps coming back. Forty four pieces of work across them, and rules governing when each stage opens, closes or escalates. Let me open one. An agent correlates the evidence. An API checks coverage against policy. A process coordinates the containment on site. And a person approves before anything happens. Four different kinds of worker in one stage, and what holds them together is the case.",
     demo:["Pan the full plan while narrating the scale. The screen does not show totals, so the narration carries them.","Say the conditional stages out loud. They are what make this a case rather than a flow.","Open Diagnose and contain and point at the agent, the API, the process and the human task."]},
    {actor:"System", views:["casemanager"], status:"build", short:"The rules it wrote, and the case agent",
     frameLabel:"Design time · Studio · what the coding agent produced",
     title:"The rules the coding agent wrote, and the case agent that reads them",
     narr:"Framed as coding-agent output, not as a design-time tour. These are the rules that came out of the mapping phase, and the case agent is what reads them at run time and works out the next best action when no rule settles the question.",
     tt:"Remember the rules that got written down during the mapping phase. Here is what they look like now that the coding agent has built them. Rules for the decisions we can state plainly, and a case agent that reads them at run time and works out the next best action when no rule fully settles the question. That is the split: rules where we can be definite, an agent for judgment inside the guardrails, and people where accountability actually sits.",
     demo:["Open the case plan's rules and say plainly that the coding agent wrote these.","Tie them back to the mapping phase.","Don't tour the designer or explain what a sequential task is. This is one look, then move on."]},
    {actor:"Agent", views:["liveedit"], status:"build", short:"Change a rule live",
     title:"The business changes a rule, and the coding agent makes the change",
     narr:"Close should now wait on a recurrence review. Tell the coding agent what changed, and it finds the stage and rules affected, adds the gate, and brings the change back for review. That is the first outcome: building and changing this takes hours, not release cycles.",
     tt:"Now the business changes its mind. Before a case can close, somebody has to check whether this failure has happened before. Normally that is a change request, a development cycle, and another round of translation. Here I tell the coding agent what changed. It finds the stage and the rules involved, adds the gate, updates the routing, and brings the change back to me. That is the first outcome. We compress the original build, and every change after it.",
     demo:["Submit the change live.","Show the affected stage found, the gate added, the rules updated, the summary returned.","Stop talking while the agent works. Pick back up when the change lands."]}
  ]},
  {t:"Act II · Run it", goal:"Most cases finish without anybody. The few that reach a person arrive assembled, with a recommendation and the reasoning behind it, and what the person does there is captured.", rt:"~2 MIN", scenes:[
    {actor:"System", views:["opsdash"], status:"build", short:"93 out of 100 need nobody",
     frameLabel:"Fleet-wide view · Performance tab",
     title:"93 out of every 100 cases finish without a person",
     narr:"Lead with this, before the Case App and before Sarah. Most cases never reach anybody, and that number is the one the improvement loop moves later. Also on screen: where cases are at risk of missing their target, and where work is piling up.",
     tt:"Let me start with the whole operation rather than one case. Ninety three percent of warranty cases are finishing on their own, start to end, without anybody moving them along. I can see which ones are at risk of missing their target and where work is piling up. Hold on to that ninety three, because I am going to come back to it. Now let me show you the seven percent that do reach a person.",
     demo:["Open Performance first. This is the establishing shot for the act.","Say 93 percent out loud and flag that you will return to it.","Point at SLA risk and where work is accumulating.","Don't introduce Sarah yet."]},
    {actor:"Human", who:"Sarah Chen · Warranty Resolution Lead", views:["worklist"], status:"build", short:"A short queue, each with a reason",
     frameLabel:"Personal queue · Cases tab",
     title:"Sarah's queue is short, and each case says why it is there",
     narr:"Now the Case App. Her queue holds only the cases where her judgment can change the outcome, and each one carries the reason it was escalated.",
     tt:"This is the warranty resolution lead's own view. Traditionally her day starts with every claim in a queue, each one something she has to open, understand, chase and push forward. Here the queue holds only the cases where a person can change the outcome, and each one tells her why it is there.",
     demo:["Switch to the Case App and introduce it as the app the business user works in.","Show the short list, with the reason beside each case."]},
    {actor:"Human", who:"Sarah Chen", views:["ac"], status:"built", short:"One decision, in a console",
     frameLabel:"Runtime · Case App · the coverage decision console",
     title:"Everything she needs is on one screen, and what she marks useful is kept",
     narr:"Alin's console (vendored at vendor/alin-console/), reshaped 26 Aug to Vikram's feedback: the six facts he named sit legible at the top, supporting detail is collapsed to one-line rows that open on click, and only the two-cause finding stays expanded. Below the outcome, the tri-state agreement — agree / agree but keep asking / don't ask again for similar cases — with the editable rationale labelled as the learning signal the Act IV suggestions cite. The $10,000 authority meter at $9,690 stays; the widget owns the 302px left lane and never decides. Stage 4 per the SDD.",
     tt:"One glance and Sarah has the case: the claim, the customer, sixteen thousand across four lines, two causes pointing at different payers, and a recommendation. The detail is all here — the policy test, the cost lines, the prior history — but folded, one line each, opened only if she wants it. What stays open is the finding, because that is the judgment. The recommendation splits the claim by cause: nine thousand six hundred and ninety to Cobalt Ridge, three hundred and ten dollars under her limit, so she signs alone. And then the part that matters later: she does not just pick an outcome, she says whether she agrees with the reasoning, and she can tell it to stop asking for cases like this one. That sentence, in her words, is the learning signal.",
     demo:["Open the console and stop. Let the six facts at the top land before touching anything.","Open exactly one folded row to show detail exists on demand, then close it.","Point at the split, then the meter. $9,690 against $10,000 is the beat.","Read the tri-state out loud — agree, keep asking, stop asking — and say her rationale is the learning signal.","The widget lane is 302px on the left. Never put decision controls in it."],}
  ]},
  {t:"Act III · Improve it", goal:"The case agent handles new evidence on its own. Then every decision made along the way turns into suggestions, and approving one rule stops a whole class of cases from waiting for a person.", rt:"~2.5 MIN", scenes:[
    {actor:"Event", views:["eventreassess"], status:"build", short:"New evidence, reassessed on its own",
     frameLabel:"Runtime · Case App · case detail",
     title:"New evidence arrives after the decision, and the case agent reassesses it on its own",
     narr:"The customer uploads photos of the failed drive after coverage was already decided. Nobody routes them. The upload wakes the case agent, which checks them against the earlier combined-cause finding, sees the position may not hold, and sends the case to engineering rather than deciding a technical question itself. Then the case runs to completion.",
     tt:"The customer uploads photos of the failed drive through the portal, after coverage has already been decided. That upload becomes an event, and the event wakes the case agent, because new evidence can change a decision that has already been made. It checks the photos against the earlier finding, sees the coverage position may no longer hold, and sends the case to engineering to confirm the cause. It does not decide the technical question itself, because confirming a defect from a photograph is a judgment call, not a rule. Nobody routed any of that. Engineering confirms, the machine gets fixed, the customer signs off, and the case closes.",
     demo:["Run it as one continuous sequence: upload, event created, case agent picks it up, engineering path opens.","Then open instance management briefly. Show the execution trail, what triggered the decision, and who signed off.","While you are there, point at the version picker and say the running case can move onto the version you changed in Act I without restarting.","Don't execute pause or cancel. Point at them and move on."]},
    {actor:"System", views:["ledger"], status:"build", short:"Every decision is on the record",
     frameLabel:"After the case closes · Cartographer · Suggestions",
     title:"Every decision anybody made is on the record, Sarah's included",
     narr:"Deliberately after the case finishes, not a pivot out of the middle of it. The same decision shows up across other customers too. Proposed and Decided sit side by side so a disagreement is visible without reading, and an override is treated as the most useful row on the page rather than as a fault.",
     tt:"Now the case is done, and I want to show you what it left behind. Every decision made anywhere in this process is on the record, including the one Sarah just made, and including the same decision made at other customers. What was proposed sits next to what was decided, so you can run your eye down two columns and see where a person disagreed. Look at these rows. The same drive, small claims, approved every single time, and the recommendation was never changed.",
     demo:["Filter to human decisions and let the SR-440 rows stack up visibly.","Point at Proposed next to Decided.","Say that an override is the most useful row here, not a problem.","Don't show a thirty column table. Only the fields that carry the story."]},
    {actor:"Agent", views:["suggestions"], status:"build", short:"Two suggestions, opposite directions",
     frameLabel:"Cartographer · Suggestions · Feed",
     title:"Reading across those decisions produces two suggestions",
     narr:"The first removes a human step where 41 decisions prove it changes nothing. The second adds one where its absence is costing something. Click into the first. Gesture at the second, because it is the one that shows the loop is not just an efficiency argument.",
     tt:"Reading across the ledger turns up patterns, and here are two. The first one: forty one claims on this drive under five thousand dollars, all approved, none reversed, and review added three hours to a stage with a four hour target. The judgment was never hard. The waiting was the problem. The second one runs the other way. The same drive keeps failing at different customers and those cases keep closing without anybody checking whether the part itself is the problem, so that suggestion adds a step instead of removing one. The loop tunes human involvement in both directions.",
     demo:["Open the first suggestion. Show the evidence count and what the analysis could not see.","Gesture at the second and say it adds a human step. Do not open it.","Say once that this is coming soon rather than shipping today."]},
    {actor:"Human", views:["improvement"], status:"build", short:"Approve the rule once",
     frameLabel:"Cartographer · Suggestions · Improvement",
     title:"Approve the rule once, instead of approving every claim",
     narr:"A rule change, which is what makes a single Apply honest. It takes effect at run time with no redeployment, it can be withdrawn, and one in ten is audited for thirty days. This is where the 93 becomes 96.",
     tt:"So I take the suggestion. The platform drafts the change, runs it against the existing checks plus one written for this change, and shows me what it would do. It is a rule change, which means it takes effect at run time with no redeployment and I can take it back if I am wrong. Eight of eight passed, including a case just over the threshold that still has to reach a person. And here is the number I asked you to hold on to. Ninety three percent becomes ninety six. I approve this rule once, instead of approving every claim it covers. A person still gates the change. Nothing applies itself.",
     demo:["Walk the rule, the evals, then Projected impact.","Say 93 to 96 here, and call the number projected.","Press Apply.","Don't call it a deploy. Apply and a change request are different things in this product."]},
    {actor:"System", views:["close"], status:"build", short:"Close",
     title:"Close",
     narr:"Cartographer understood the work. A coding agent built it. Maestro ran it. And the decisions people made while it ran are what made it better.",
     tt:"Think about the whole path. The cartographer agent mapped how this work actually happens, the scribe wrote the design, and a coding agent turned that design into a running case with six stages, four exception paths and the rules to govern them, then changed it when the business changed its mind. That is building it. Maestro then ran that case across agents, robots, systems and people, and most cases finished without anybody touching them. That is running it. And the decisions people did make were the raw material for making it better, so fewer cases need a person next month than needed one last month. Build it, run it, improve it. Thank you.",
     demo:["End on the closing visual with no product chrome around it.","Underneath: Cartographer, then coding agents, then Maestro, then back to Cartographer."]}
  ]}
];

// ---------- render ----------
const VNAME = {scribe:"Cartographer · PDD", agentbuild:"Coding agent · build proposal", plan:"Case plan (design canvas)", liveedit:"Live edit · change summary",
  worklist:"Case App · work queue", ac:"Warranty resolution console", opsdash:"Case performance", casemanager:"UiPath Studio · case-agent rules",
  eventreassess:"Case App · case detail", audittrail:"Instance management", close:"Closing", ledger:"Cartographer \\u00b7 Suggestions \\u00b7 Ledger", suggestions:"Cartographer \\u00b7 Suggestions \\u00b7 Feed", improvement:"Cartographer \\u00b7 Suggestions \\u00b7 Improvement"};
const VMETA = {
  scribe:{badge:"P",url:"cloud.uipath.com/orgs/cobalt-ridge/cartographer/documents/warranty-resolution-pdd"},
  agentbuild:{badge:"A",url:"cloud.uipath.com/orgs/cobalt-ridge/coding-agents/sessions/warranty-case-plan"},
  plan:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/case-plans/warranty-resolution/design"},
  liveedit:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/case-plans/warranty-resolution/changes/v2"},
  worklist:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/cases?view=action-required"},
  ac:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/cases/WR-2026-0417/tasks/coverage-decision"},
  opsdash:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/insights"},
  casemanager:{badge:"S",url:"cloud.uipath.com/studio/cobalt-ridge/case-plans/warranty-resolution/rules"},
  eventreassess:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/cases/WR-2026-0417"},
  audittrail:{badge:"I",url:"cloud.uipath.com/businessorchestration/cobalt-ridge/maestro_/cases/warranty-resolution/instances/WR-2026-0417"},
  close:{badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro/overview"}
};
const STATUS = {built:["built","In demo app"], partial:["partial","Partial"], build:["build","To build"]};
function bodyFor(v, sc){
  if(v==="scribe") return scribeView();
  if(v==="agentbuild") return agentBuildView();
  if(v==="plan") return planCanvas(false);
  if(v==="liveedit") return liveEditView();
  if(v==="worklist") return worklistView();
  if(v==="ac") return consoleView();
  if(v==="opsdash") return opsDashView();
  if(v==="casemanager") return caseManagerView();
  if(v==="eventreassess") return eventReassessView();
  if(v==="audittrail") return auditTrailView();
  if(v==="ledger") return ledgerView();
  if(v==="suggestions") return suggestionsView();
  if(v==="improvement") return improvementView();
  if(v==="close") return closeView();
  return "";
}
const NATIVE_VIEWS = new Set(["agentbuild","liveedit","scribe","plan","casemanager","ledger","suggestions","improvement"]);
function browserFrame(sc){
  const v = sc.views[0];
  const tab = sc.views.map(x=>VNAME[x]).join(" + ");
  if(v==="close"){
    return \`<div class="frame" role="group" aria-label="Closing slide">
      <div class="win" style="background:#12161c">\${closeView()}</div></div>\`;
  }
  if(NATIVE_VIEWS.has(v)){
    return \`<div class="frame" role="group" aria-label="Mockup of \${tab}">\${bodyFor(v,sc)}</div>\`;
  }
  const meta = VMETA[v] || {badge:"I",url:"cloud.uipath.com/orgs/cobalt-ridge/maestro"};
  const dom = meta.url.split("/")[0], rest = meta.url.slice(dom.length);
  return \`<div class="frame" role="group" aria-label="Mockup of \${tab}">
    <div class="win">
      <div class="chrome" aria-hidden="true">
        <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
        <span class="btab"><span class="fav">\${meta.badge}</span><span class="ttl">\${tab}</span><span class="x">×</span></span>
        <span class="plus">+</span>
      </div>
      <div class="omni" aria-hidden="true">
        <span class="onav">\${ICO.back}\${ICO.fwd}\${ICO.reload}</span>
        <span class="url">\${ICO.lock}<span class="u"><b>\${dom}</b>\${rest}</span><span class="star">&#9734;</span></span>
        <span class="oacts">\${ICO.dots}<span class="ava">SC</span></span>
      </div>
      <div class="screen">\${sc.views.map(x=>bodyFor(x,sc)).join("")}</div>
    </div></div>\`;
}
let num = 0, tocHtml = "", storyHtml = "";
ACTS.forEach((act,ai)=>{
  const first = num+1, last = num+act.scenes.length;
  let frameLinks = "";
  storyHtml += \`<div class="act" id="act\${ai}"><h2>\${act.t}</h2><span class="rt">\${act.rt} · SCENES \${String(first).padStart(2,"0")}-\${String(last).padStart(2,"0")}</span><div class="goal">\${act.goal}</div></div><div class="actrow">\`;
  act.scenes.forEach(sc=>{
    num++;
    frameLinks += \`<a href="#scene\${num}" data-scene="\${num}" title="\${STATUS[sc.status]?STATUS[sc.status][1]:""}"><span class="fn">\${String(num).padStart(2,"0")}</span><span class="fd \${sc.status||"build"}"></span><span>\${sc.short}</span></a>\`;
    const wide = sc.views.some(v=>["plan","casemanager","worklist","opsdash","close","ledger","suggestions","improvement","ac","eventreassess"].includes(v));
    storyHtml += \`<div class="scene\${wide?" wide":""}" id="scene\${num}" data-scene="\${num}" data-act="\${ai}">
      <div class="sc-head">
        <span class="sc-num">\${String(num).padStart(2,"0")}</span>
        <span class="actor \${sc.actor}">\${sc.actor.toUpperCase()}</span>
        \${sc.who?\`<span class="persona">\${sc.who}</span>\`:""}
      </div>
      <h3>\${sc.title}</h3>
      <div class="scenebody">
        <div class="sidecol">
          <aside class="talktrack"><span class="lbl2">Talk track</span><p>“\${sc.tt||""}”</p></aside>
          <aside class="demonotes"><span class="lbl2">Demo</span><ul>\${(sc.demo||[]).map(d=>\`<li\${d.startsWith("Don't")||d.startsWith("Do not")?' class="dont"':""}>\${d}</li>\`).join("")}</ul></aside>
        </div>
        <div class="framewrap">\${sc.frameLabel?\`<span class="framelabel">\${sc.frameLabel}</span><br>\`:""}\${browserFrame(sc)}</div>
      </div>
    </div>\`;
  });
  storyHtml += \`</div>\`;
  tocHtml += \`<div class="tgroup" data-act="\${ai}">
    <a href="#act\${ai}"><span class="tn">ACT\\n\${"I II III IV V VI".split(" ")[ai]}</span><span class="tt">\${act.t.replace(/^Act [IV]+ · /,"")}</span><span class="tm">\${act.rt.replace("~","").toLowerCase()}</span></a>
    <div class="tframes">\${frameLinks}</div></div>\`;
});
document.getElementById("tocBody").innerHTML = tocHtml;
document.getElementById("story").innerHTML = storyHtml;

// ---------- scale each 1280x800 laptop window to its column width ----------
function fitFrames(){
  document.querySelectorAll(".frame").forEach(f=>{
    const w = f.clientWidth;
    if(w) f.style.setProperty("--s", (w/1280).toFixed(5));
  });
}
(function(){
  fitFrames();
  if("ResizeObserver" in window){
    const ro = new ResizeObserver(fitFrames);
    document.querySelectorAll(".frame").forEach(f=>ro.observe(f));
  }
  window.addEventListener("resize", fitFrames);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(fitFrames);
})();

(function(){
  const groups = [...document.querySelectorAll(".tgroup")];
  const links = [...document.querySelectorAll(".tframes a")];
  if(!("IntersectionObserver" in window)) return;
  const seen = {};
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ seen[e.target.dataset.scene] = e.isIntersecting ? e.intersectionRatio : 0; });
    let best=null, bv=0;
    Object.keys(seen).forEach(k=>{ if(seen[k]>bv){ bv=seen[k]; best=k; } });
    if(!best) return;
    const act = document.getElementById("scene"+best).dataset.act;
    groups.forEach(g=>g.classList.toggle("on", g.dataset.act===act));
    links.forEach(a=>a.classList.toggle("on", a.dataset.scene===best));
  },{rootMargin:"-15% 0px -55% 0px",threshold:[0,.2,.5,1]});
  document.querySelectorAll(".scene").forEach(s=>io.observe(s));
})();

/* ---------- Flow / Strip layout switch ----------
   Same ACTS data, two layouts. Strip borrows Max's condensed idiom:
   one act per line, click a screen to open it. Ours expands every
   frame, not only the ones that happen to be screenshots. */
(function(){
  const bBrief = document.getElementById("vBrief"),
        bStrip = document.getElementById("vStrip"),
        bFlow  = document.getElementById("vFlow"),
        fb = document.getElementById("flowbrief"),
        KEY = "fusion.sbView";
  let fbWasOpen = null;
  function apply(mode, remember){
    if(mode !== "brief" && mode !== "flow") mode = "strip";
    document.body.classList.toggle("view-strip", mode === "strip");
    document.body.classList.toggle("view-brief", mode === "brief");
    if(mode === "brief"){ if(fbWasOpen === null) fbWasOpen = fb.open; fb.open = true; }
    else if(fbWasOpen !== null){ fb.open = fbWasOpen; fbWasOpen = null; }
    bBrief.setAttribute("aria-pressed", String(mode === "brief"));
    bStrip.setAttribute("aria-pressed", String(mode === "strip"));
    bFlow.setAttribute("aria-pressed", String(mode === "flow"));
    if(remember){ try{ localStorage.setItem(KEY, mode); }catch(e){} }
    requestAnimationFrame(fitFrames);
  }
  bBrief.addEventListener("click", ()=>apply("brief", true));
  bStrip.addEventListener("click", ()=>apply("strip", true));
  bFlow.addEventListener("click", ()=>apply("flow", true));
  let saved = null;
  try{ saved = localStorage.getItem(KEY); }catch(e){}
  /* an earlier explicit choice is respected; everyone else lands on Strip */
  apply(saved === "flow" || saved === "brief" ? saved : "strip", false);

  /* remember whether the walkthrough is open, in the views where it is collapsible */
  const FK = "fusion.sbBrief";
  try{ if(localStorage.getItem(FK) === "1") fb.open = true; }catch(e){}
  fb.addEventListener("toggle", ()=>{
    if(document.body.classList.contains("view-brief")) return;
    try{ localStorage.setItem(FK, fb.open?"1":"0"); }catch(e){}
  });
})();

/* ---------- srcdoc-safe in-page navigation ----------
   The Coded App shell renders these boards in an iframe via srcDoc. In that
   context a bare "#id" href has no document URL to resolve against, so the
   browser resolves it against the PARENT page and the iframe navigates to the
   app itself — which is why clicking the side rail stacked extra app banners
   instead of scrolling. Intercept in-page anchors and scroll directly. */
document.addEventListener("click", function(e){
  const a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
  if(!a) return;
  const id = (a.getAttribute("href") || "").slice(1);
  if(!id) return;
  const el = document.getElementById(id);
  if(!el) return;
  e.preventDefault();
  el.scrollIntoView({behavior:"smooth", block:"start"});
  try{ history.replaceState(null, "", "#" + id); }catch(_){}
});

/* ---------- lightbox: open any frame full size from the strip ---------- */
(function(){
  const lb = document.getElementById("lb"),
        host = document.getElementById("lbFrame"),
        cap = document.getElementById("lbCap");
  function close(){
    lb.classList.remove("on");
    host.innerHTML = ""; cap.innerHTML = "";
    document.body.style.overflow = "";
  }
  document.addEventListener("click", e=>{
    if(!document.body.classList.contains("view-strip")) return;
    const frame = e.target.closest(".frame");
    if(!frame || lb.contains(frame)) return;
    const scene = frame.closest(".scene");
    host.innerHTML = "";
    host.appendChild(frame.cloneNode(true));
    const h3 = scene.querySelector("h3"), narr = scene.querySelector(".narr"),
          lbl = scene.querySelector(".framelabel");
    cap.innerHTML = \`\${lbl?\`<span class="lbsurface">\${lbl.textContent}</span>\`:""}\`
      + \`<b>\${h3?h3.innerHTML:""}</b>\${narr?\`<p>\${narr.innerHTML}</p>\`:""}\`;
    lb.classList.add("on");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(fitFrames);
  });
  lb.addEventListener("click", close);
  document.addEventListener("keydown", e=>{ if(e.key === "Escape" && lb.classList.contains("on")) close(); });
})();
/* == review-notes:js:start == */
/* ===========================================================================
   Review notes — click any screen, title, talk track or line of copy and say
   what needs to change.

   Canonical source. Do not edit the copies inlined in the storyboard HTML —
   edit this file and run \`tools/inject-review-notes.py\` to push it into them.
   The storyboards have to stay single self-contained files, so it is inlined
   rather than linked.

   WHERE NOTES GO. Nowhere on its own. They are held in this browser's
   localStorage and the reviewer copies or downloads them. That is a deliberate
   limit, not an oversight: the deployed Coded App has no OAuth client in the
   businessorchestration org, so it cannot write to Data Fabric, a queue or a
   bucket, and putting a webhook secret in client-side JS would publish the
   secret. The UI says this plainly so nobody assumes their notes were
   submitted. See the README for the upgrade path.
   =========================================================================== */
(function () {
  "use strict";

  var KEY = "fusion.reviewNotes." + (document.body.dataset.boardId || "board");
  var NAMEKEY = "fusion.reviewer";
  var notes = [];
  var mode = false;

  try { notes = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { notes = []; }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch (e) { /* private mode */ }
    paint();
  }
  function reviewer() {
    var n = "";
    try { n = localStorage.getItem(NAMEKEY) || ""; } catch (e) {}
    if (!n) {
      n = (window.prompt("Your name, so Robert knows whose note this is:", "") || "").trim();
      if (n) { try { localStorage.setItem(NAMEKEY, n); } catch (e) {} }
    }
    return n || "anonymous";
  }

  /* ---------- what can be commented on ---------- */
  // Order matters: the most specific target wins, so a click on a talk track
  // attributes to the talk track rather than to the whole scene.
  var TARGETS = [
    [".talktrack", "talk track"],
    [".demonotes", "director's notes"],
    [".scene > h3", "scene title"],
    [".scene > .narr", "scene description"],
    [".frame", "screen"],
    [".act", "act heading"],
    [".flowbrief", "the flow in brief"],
    [".capbox", "what's on screen"],
    [".synopsis", "synopsis"],
    [".mast .dek", "masthead"],
  ];

  function resolve(el) {
    for (var i = 0; i < TARGETS.length; i++) {
      var hit = el.closest(TARGETS[i][0]);
      if (hit) return { el: hit, kind: TARGETS[i][1] };
    }
    return null;
  }
  function sceneOf(el) {
    var s = el.closest(".scene");
    if (s) {
      var t = s.querySelector("h3");
      return {
        anchor: s.id || "",
        label: "Scene " + (s.dataset.scene || "?"),
        title: t ? t.textContent.trim() : "",
      };
    }
    var a = el.closest(".act");
    if (a) {
      var h = a.querySelector("h2");
      return { anchor: a.id || "", label: "Act heading", title: h ? h.textContent.trim() : "" };
    }
    return { anchor: "", label: "Masthead", title: "" };
  }
  function excerpt(el, sel) {
    if (sel) return sel.replace(/^[\\u201C\\u201D"']+/, "").replace(/[\\u201C\\u201D"']+$/, "").slice(0, 180);
    // a screen has no useful prose, so name it by its surface label instead
    if (el.classList.contains("frame")) {
      var sc = el.closest(".scene");
      var lbl = sc && sc.querySelector(".framelabel");
      return lbl ? lbl.textContent.trim() : "(the screen mockup)";
    }
    // drop the block's own label ("Talk track", "Demo") so the quote starts at
    // the actual copy rather than at the heading
    var clone = el.cloneNode(true);
    clone.querySelectorAll(".lbl2, .lbl, .framelabel, .fb-pin").forEach(function (n) { n.remove(); });
    var t = (clone.textContent || "").replace(/\\s+/g, " ").trim();
    // talk tracks already ship wrapped in smart quotes, and we add our own
    t = t.replace(/^[\\u201C\\u201D"']+/, "").replace(/[\\u201C\\u201D"']+$/, "");
    return t.slice(0, 180);
  }

  /* ---------- UI ---------- */
  var bar = document.createElement("div");
  bar.id = "fbBar";
  bar.innerHTML =
    '<button type="button" id="fbToggle" aria-pressed="false">' +
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/></svg>' +
      "<span>Comment</span></button>" +
    '<button type="button" id="fbOpen"><b id="fbCount">0</b> notes</button>';
  document.body.appendChild(bar);

  var panel = document.createElement("div");
  panel.id = "fbPanel";
  panel.setAttribute("aria-hidden", "true");
  panel.innerHTML =
    '<div class="fbp-h"><b>Review notes</b>' +
      '<span id="fbWho"></span>' +
      '<button type="button" id="fbClose" aria-label="Close">&times;</button></div>' +
    '<div class="fbp-warn">Saved in this browser only. Nothing is submitted. ' +
      "Copy or download them and send them to Robert.</div>" +
    '<div class="fbp-b" id="fbList"></div>' +
    '<div class="fbp-f">' +
      '<button type="button" class="fbb pri" id="fbCopy">Copy as Markdown</button>' +
      '<button type="button" class="fbb" id="fbDl">Download JSON</button>' +
      '<button type="button" class="fbb danger" id="fbClear">Clear all</button></div>';
  document.body.appendChild(panel);

  var composer = null;

  function closeComposer() {
    if (composer) { composer.remove(); composer = null; }
  }

  function openComposer(target, sel, x, y) {
    closeComposer();
    var scene = sceneOf(target.el);
    var ex = excerpt(target.el, sel);
    composer = document.createElement("div");
    composer.id = "fbComposer";
    composer.innerHTML =
      '<div class="fbc-h"><b>' + scene.label + "</b><span>" + target.kind + "</span></div>" +
      '<div class="fbc-ex"></div>' +
      '<textarea id="fbText" rows="4" placeholder="What needs to change?"></textarea>' +
      '<div class="fbc-f"><button type="button" class="fbb pri" id="fbSave">Save note</button>' +
      '<button type="button" class="fbb" id="fbCancel">Cancel</button></div>';
    // excerpt is page text or a raw user selection, so set it as text
    if (ex) composer.querySelector(".fbc-ex").textContent = "\\u201C" + ex + "\\u201D";
    document.body.appendChild(composer);
    var w = composer.offsetWidth, h = composer.offsetHeight;
    var left = Math.min(Math.max(10, x - w / 2), window.innerWidth - w - 10);
    var top = y + 14;
    if (top + h > window.innerHeight - 10) top = Math.max(10, y - h - 14);
    composer.style.left = left + "px";
    composer.style.top = top + "px";
    composer.querySelector("#fbText").focus();

    composer.querySelector("#fbCancel").onclick = closeComposer;
    composer.querySelector("#fbSave").onclick = function () {
      var txt = composer.querySelector("#fbText").value.trim();
      if (!txt) { composer.querySelector("#fbText").focus(); return; }
      notes.push({
        id: "n" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
        board: document.title,
        scene: scene.label, sceneTitle: scene.title, anchor: scene.anchor,
        kind: target.kind, excerpt: ex, note: txt,
        who: reviewer(), when: new Date().toISOString(),
      });
      closeComposer();
      save();
    };
    composer.querySelector("#fbText").onkeydown = function (e) {
      if (e.key === "Escape") { closeComposer(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { composer.querySelector("#fbSave").click(); }
    };
  }

  /* ---------- render ---------- */
  function paint() {
    document.getElementById("fbCount").textContent = notes.length;
    bar.classList.toggle("has", notes.length > 0);

    var who = "";
    try { who = localStorage.getItem(NAMEKEY) || ""; } catch (e) {}
    document.getElementById("fbWho").textContent = who ? who : "";

    // pins on commented elements
    document.querySelectorAll(".fb-pin").forEach(function (p) { p.remove(); });
    document.querySelectorAll(".fb-flag").forEach(function (p) { p.classList.remove("fb-flag"); });
    var byAnchor = {};
    notes.forEach(function (n) { byAnchor[n.anchor] = (byAnchor[n.anchor] || 0) + 1; });
    Object.keys(byAnchor).forEach(function (a) {
      if (!a) return;
      var el = document.getElementById(a);
      if (!el) return;
      el.classList.add("fb-flag");
      var pin = document.createElement("span");
      pin.className = "fb-pin";
      pin.textContent = byAnchor[a];
      pin.title = byAnchor[a] + " note(s) here";
      el.appendChild(pin);
    });

    var list = document.getElementById("fbList");
    if (!notes.length) {
      list.innerHTML =
        '<p class="fbp-empty">No notes yet. Turn on <b>Comment</b>, then click a screen, a ' +
        "title, a talk track or any line of copy. Select text first to quote it exactly.</p>";
      return;
    }
    list.textContent = "";
    notes.forEach(function (n, i) {
      function add(parent, tag, cls, text) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text != null) e.textContent = text;
        parent.appendChild(e);
        return e;
      }
      var card = add(list, "div", "fbn");
      var h = add(card, "div", "fbn-h");
      add(h, "b", null, n.scene);
      add(h, "span", "fbn-k", n.kind);
      var x = add(h, "button", "fbn-x", "\\u00D7");
      x.type = "button";
      x.setAttribute("aria-label", "Delete note");
      x.dataset.i = i;
      if (n.sceneTitle) add(card, "div", "fbn-t", n.sceneTitle);
      if (n.excerpt) add(card, "div", "fbn-e", "\\u201C" + n.excerpt + "\\u201D");
      add(card, "div", "fbn-n", n.note);
      var m = add(card, "div", "fbn-m", n.who + " \\u00B7 " + new Date(n.when).toLocaleString());
      if (n.anchor) {
        m.appendChild(document.createTextNode(" \\u00B7 "));
        var a = add(m, "a", "fbn-go", "jump");
        a.setAttribute("href", "#" + n.anchor);
      }
    });
    list.querySelectorAll(".fbn-x").forEach(function (b) {
      b.onclick = function () { notes.splice(+b.dataset.i, 1); save(); };
    });
  }

  function asMarkdown() {
    var who = notes.length ? notes[0].who : "";
    var out = ["# Review notes — " + document.title,
               "", (notes.length + " note(s)") + (who ? " · " + who : "") +
               " · " + new Date().toLocaleString(), ""];
    var groups = {};
    notes.forEach(function (n) { (groups[n.scene] = groups[n.scene] || []).push(n); });
    Object.keys(groups).forEach(function (g) {
      out.push("## " + g + (groups[g][0].sceneTitle ? " — " + groups[g][0].sceneTitle : ""));
      groups[g].forEach(function (n) {
        out.push("- **" + n.kind + "**" + (n.excerpt ? ' — "' + n.excerpt + '"' : ""));
        out.push("  - " + n.note);
        out.push("  - _" + n.who + ", " + new Date(n.when).toLocaleString() + "_");
      });
      out.push("");
    });
    return out.join("\\n");
  }

  /* ---------- wiring ---------- */
  document.getElementById("fbToggle").onclick = function () {
    mode = !mode;
    document.body.classList.toggle("fb-on", mode);
    this.setAttribute("aria-pressed", String(mode));
    if (!mode) closeComposer();
  };
  document.getElementById("fbOpen").onclick = function () {
    panel.classList.add("on");
    panel.setAttribute("aria-hidden", "false");
  };
  document.getElementById("fbClose").onclick = function () {
    panel.classList.remove("on");
    panel.setAttribute("aria-hidden", "true");
  };
  document.getElementById("fbCopy").onclick = function () {
    var md = asMarkdown(), btn = this;
    navigator.clipboard.writeText(md).then(function () {
      btn.textContent = "Copied";
      setTimeout(function () { btn.textContent = "Copy as Markdown"; }, 1600);
    }, function () {
      // clipboard can be blocked; fall back to something the reviewer can act on
      window.prompt("Copy these notes:", md);
    });
  };
  document.getElementById("fbDl").onclick = function () {
    var blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "review-notes-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  };
  document.getElementById("fbClear").onclick = function () {
    if (!notes.length) return;
    if (window.confirm("Delete all " + notes.length + " note(s)? This cannot be undone.")) {
      notes = []; save();
    }
  };

  // capture-phase so comment mode wins over the storyboard's own click handlers
  // (the strip view opens a lightbox on frame click)
  document.addEventListener("click", function (e) {
    if (!mode) return;
    if (e.target.closest("#fbBar, #fbPanel, #fbComposer")) return;
    var t = resolve(e.target);
    if (!t) return;
    e.preventDefault();
    e.stopPropagation();
    var sel = "";
    var s = window.getSelection();
    if (s && !s.isCollapsed && t.el.contains(s.anchorNode)) sel = s.toString().trim();
    openComposer(t, sel, e.clientX, e.clientY);
  }, true);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("on") && !composer) {
      document.getElementById("fbClose").click();
    }
  });

  paint();
})();
/* == review-notes:js:end == */
<\/script>
</body>
</html>
`,p=e((e=>{var t=Symbol.for(`react.transitional.element`);function n(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.jsx=n,e.jsxs=n})),m=e(((e,t)=>{t.exports=p()}))(),h={merged:{label:`The whole flow`,sub:`4 acts · 32 scenes · merged`,html:d},case:{label:`Case only`,sub:`3 acts · 13 scenes`,html:f}},g=`fusion.activeBoard`;function _(){let[e,t]=(0,l.useState)(()=>{try{let e=localStorage.getItem(g);if(e===`merged`||e===`case`)return e}catch{}return`merged`});return(0,l.useEffect)(()=>{try{localStorage.setItem(g,e)}catch{}},[e]),(0,m.jsxs)(`div`,{className:`sb-shell`,children:[(0,m.jsxs)(`header`,{className:`sb-bar`,children:[(0,m.jsx)(`span`,{className:`sb-kicker`,children:`FUSION 2026 · Keynote 2`}),(0,m.jsx)(`nav`,{className:`sb-tabs`,"aria-label":`Storyboard`,children:Object.keys(h).map(n=>(0,m.jsxs)(`button`,{type:`button`,className:n===e?`on`:``,"aria-pressed":n===e,onClick:()=>t(n),children:[(0,m.jsx)(`b`,{children:h[n].label}),(0,m.jsx)(`span`,{children:h[n].sub})]},n))}),(0,m.jsx)(`span`,{className:`sb-note`,children:`Illustrative demo material`})]}),(0,m.jsx)(`iframe`,{title:`${h[e].label} storyboard`,srcDoc:h[e].html,className:`sb-frame`},e)]})}(0,u.createRoot)(document.getElementById(`root`)).render((0,m.jsx)(l.StrictMode,{children:(0,m.jsx)(_,{})}));