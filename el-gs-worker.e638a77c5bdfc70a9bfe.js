"use strict";(self.webpackChunkdraw=self.webpackChunkdraw||[]).push([[4194],{49283:(n,e,t)=>{const r=t(32875),s=(n,e,t)=>n.map(((n,e)=>e)).filter((r=>t(e,n,r)));function o(n,e,t,a,i){const c=e.slice(),u=c[a];return c[a]=[t,...u],function(n,e,t){const a=n.findIndex(r.default);if(a<0)return!0;const i=n.slice(),[c,...u]=i[a];return i[a]=u,s(e,c,t).some((n=>o(i,e,c,n,t)))}(n,c,i)}e.UR=(n,e,t,r)=>s(e,t,r).filter((s=>o(n,e,t,s,r))),e.up=(n,e,t,r)=>s(e,t,r).find((s=>o(n,e,t,s,r)))},97532:(n,e,t)=>{t.d(e,{Z:()=>c});var r=t(73303),s=t(16746);var o=t(76303);const a=new Set(["Kazakhstan","Russia","Belarus","Lithuania","Latvia","Estonia","Norway","Finland","Sweden","Iceland","Faroe Islands"]);function i(n,e){const t=e-(e>>1),s=n=>a.has(n.country),o=n=>s(n)?1:0;return n=>r(n,o)<=t}const c=(n,e)=>{const t=(0,o.Z)(n),r=i(0,e);return(n,e,o)=>{const a=e[o],i=(0,s.Z)(e);var c;return!(a.length>i||a.some((c=n.country,n=>n.country===c))||a.some(t(n))||!r([...a,n])||n.pairing&&((n,e)=>{const t=n.length>>1,r=e<t?0:t;return n.slice(r,r+t)})(e,o).some(function(n){const e=function(n){const{id:e}=n;return n=>n.id===e}(n);return n=>n.some(e)}(n.pairing)))}}},76303:(n,e,t)=>{t.d(e,{Z:()=>d});var r=t(95062),s=t(97527);const o=[{countries:["Russia","Ukraine"],predicate:(a=2014,i=Number.MAX_SAFE_INTEGER,n=>n>=a&&n<=i)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var a,i;const c={predicate:s},u=o.map((n=>({...c,...n}))),d=n=>{const e=(n=>{const e=new Map;for(const{countries:t,predicate:r}of u)r(n)&&(e.set(t[0],t[1]),e.set(t[1],t[0]));return e.get.bind(e)})(n);return n=>{const t=e(n.country);return void 0===t?r:n=>n.country===t}}},20070:(n,e,t)=>{t.r(e);var r=t(30845),s=t(49283),o=t(97532);const a=([n,e])=>JSON.stringify({year:n,groupSize:e}),i=(0,r.Z)(o.Z,((n,e)=>a(n)===a(e)));addEventListener("message",(n=>{const{messageId:e,data:{season:t,pots:r,groups:o,selectedTeam:a}}=n.data,c=i(t,r.length),u=(0,s.up)(r,o,a,c);postMessage({messageId:e,data:{pickedGroup:u}})}))}}]);