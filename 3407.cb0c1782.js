(()=>{"use strict";var e={97543:(e,r,t)=>{t.d(r,{Z:()=>p});var o=t(62603),s=t(39506);let n=(e,r)=>{let t=e.length>>1,o=r<t?0:t;return e.slice(o,o+t)};var a=t(80411);let i=new Set(["Belarus","Estonia","Faroe Islands","Finland","Iceland","Kazakhstan","Latvia","Lithuania","Norway","Russia","Sweden"]),l=e=>e=>i.has(e.country),c=e=>r=>r.country===e,u=e=>c(e.country),p=(e,r)=>{let t=(0,a.Z)(e),i=function(e,r){let t=r-(r>>1),s=l(e),n=e=>s(e)?1:0;return e=>(0,o.Z)(e,n)<=t}(e,r);return(e,r,o)=>{let a=r[o],l=(0,s.Z)(r),c=a.length>l||a.some(u(e))||a.some(t(e))||!i([...a,e])||e.pairing&&n(r,o).some(function(e){let r=function(e){let{id:r}=e;return e=>e.id===r}(e);return e=>e.some(r)}(e.pairing));return!c}}},80411:(e,r,t)=>{t.d(r,{Z:()=>u});var o,s=t(7979),n=t(46338);let a=[{countries:["Russia","Ukraine"],predicate:(o=Number.MAX_SAFE_INTEGER,e=>e>=2014&&e<=o)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}],i={predicate:n.Z},l=a.map(e=>({...i,...e})),c=e=>{let r=l.filter(r=>r.predicate(e)),t=r.map(e=>e.countries),o=t.map(e=>e.toReversed()),s=function(e){let r=new Map;for(let[t,o]of e)r.has(t)||r.set(t,new Set),r.get(t).add(o);return r}([...t,...o]);return s.get.bind(s)},u=e=>{let r=c(e);return e=>{let t=r(e.country);return void 0===t?s.Z:e=>t.has(e.country)}}},23407:(e,r,t)=>{var o=t(30845),s=t(6284),n=t(97543);let a=([e,r])=>JSON.stringify({year:e,groupSize:r}),i=(0,o.Z)(n.Z,(e,r)=>a(e)===a(r));addEventListener("message",e=>{let{messageId:r,data:{season:t,pots:o,groups:n,selectedTeam:a}}=e.data,l=i(t,o.length),c=(0,s.u)(o,n,a,l);postMessage({messageId:r,data:{pickedGroup:c}})})},39506:(e,r,t)=>{t.d(r,{Z:()=>o});let o=e=>e.reduce((e,r)=>Math.min(r.length,e),Number.MAX_SAFE_INTEGER)}},r={};function t(o){var s=r[o];if(void 0!==s)return s.exports;var n=r[o]={exports:{}};return e[o](n,n.exports,t),n.exports}t.m=e,t.x=()=>{var e=t.O(void 0,[3748,6902,7180,3520,4833],()=>t(23407));return t.O(e)},(()=>{var e=[];t.O=(r,o,s,n)=>{if(o){n=n||0;for(var a=e.length;a>0&&e[a-1][2]>n;a--)e[a]=e[a-1];e[a]=[o,s,n];return}for(var i=1/0,a=0;a<e.length;a++){for(var[o,s,n]=e[a],l=!0,c=0;c<o.length;c++)i>=n&&Object.keys(t.O).every(e=>t.O[e](o[c]))?o.splice(c--,1):(l=!1,n<i&&(i=n));if(l){e.splice(a--,1);var u=s();void 0!==u&&(r=u)}}return r}})(),t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce((r,o)=>(t.f[o](e,r),r),[])),t.u=e=>""+({3520:"vendors-cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~el-gs-worker~wc-gs-worker~~~~",3748:"vendors-cl-gs~cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko~cl-ko-worker~el-gs~el-gs-worker~el-ko~el-ko-worker~wc-gs~wc-gs-worker~~~~~~",4833:"vendors-",6902:"vendors-cl-gs~cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko~el-gs~el-gs-worker~el-ko~wc-gs~wc-gs-worker~~~~",7180:"vendors-cl-gs-allPossibleGroupsWorker~cl-gs-firstPossibleGroupWorker~cl-ko-worker~el-gs-worker~el-ko-worker~wc-gs-worker~~~~~~"})[e]+"."+({3520:"ca6d1ae3",3748:"853ad294",4833:"5ab8ed44",6902:"841bbf1c",7180:"99211f36"})[e]+".js",t.miniCssF=e=>{},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.j=3407,(()=>{t.g.importScripts&&(e=t.g.location+"");var e,r=t.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var o=r.getElementsByTagName("script");if(o.length)for(var s=o.length-1;s>-1&&!e;)e=o[s--].src}if(!e)throw Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),(()=>{var e={3407:1,9039:1};t.f.i=(r,o)=>{e[r]||importScripts(t.p+t.u(r))};var r=self.webpackChunkdraw=self.webpackChunkdraw||[],o=r.push.bind(r);r.push=r=>{var[s,n,a]=r;for(var i in n)t.o(n,i)&&(t.m[i]=n[i]);for(a&&a(t);s.length;)e[s.pop()]=1;o(r)}})(),(()=>{var e=t.x;t.x=()=>Promise.all([3748,6902,7180,3520,4833].map(t.e,t)).then(e)})(),t.x()})();