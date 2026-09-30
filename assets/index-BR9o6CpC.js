(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var wp=["0","1","2","3","4","5","6","7","8","9"],Js=new Map,Ap=/[\u0590-\u08ff\u200e\u200f\u202a-\u202e\u2066-\u2069\ufb1d-\ufeff]/u;function Rp(n={}){let e=Intl.getCanonicalLocales(n.locales),t=Object.fromEntries(Object.entries(n.format??{}).sort(([r],[a])=>r.localeCompare(a))),i=JSON.stringify([e,t]),s=Js.get(i);if(!s){s=new Intl.NumberFormat(e,t);let r=Js.keys().next().value;Js.size>=64&&r!==void 0&&Js.delete(r),Js.set(i,s)}return s}function Cp(n,e={}){let t=Rp(e),i=t.formatToParts(n),s=i.map(p=>p.value).join(""),r=t.resolvedOptions(),a=r.numberingSystem==="latn"&&r.notation==="standard"&&!Ap.test(s)&&!i.some(p=>p.type==="nan"||p.type==="infinity"),o=JSON.stringify(r);if(!a)return{text:s,tokens:[],rollable:a,signature:o,magnitude:""};let l=i.filter(p=>p.type==="integer").reduce((p,_)=>p+_.value.length,0),c=-1,h=new Map,u=[],d="",f="";for(let p of i)if(p.type==="integer"||p.type==="fraction"){p.type==="integer"?d+=p.value:f+=p.value;for(let _ of p.value){let m=`digit:${p.type==="integer"?--l:c--}`;u.push({key:m,identity:m,text:_,wheel:wp,index:Number(_)})}}else if(p.type==="group"){let _=`group:${l}`;u.push({key:`${_}:${p.value}`,identity:_,text:p.value})}else{let _=h.get(p.type)??0;h.set(p.type,_+1);let m=p.type==="plusSign"||p.type==="minusSign"?"sign":p.type;u.push({key:`${p.type}:${_}:${p.value}`,identity:`${m}:${_}`,text:p.value})}return{text:s,tokens:u,rollable:a,signature:o,magnitude:`${d.replace(/^0+(?=\d)/u,"")}.${f}`}}function Dp(n,e){let[t="",i=""]=n.magnitude.split("."),[s="",r=""]=e.magnitude.split(".");if(t.length!==s.length)return s.length>t.length?1:-1;if(t!==s)return s>t?1:-1;let a=Math.max(i.length,r.length),o=i.padEnd(a,"0"),l=r.padEnd(a,"0");return l===o?0:l>o?1:-1}function Pp(n,e,t=.14){return{target:0,duration:e,points:Array.from({length:49},(i,s)=>{if(s===48)return 0;let r=Math.max(0,Math.min(1,(s/48-t)/(1-t)));return n*(1+10*r)*Math.exp(-10*r)})}}function Lr(n,e){if(e<=0||n.duration<=0)return n;let t=n.duration+e,i=Math.round((n.points.length-1)*t/n.duration)+1,s=n.points[0]??n.target;return{target:n.target,duration:t,points:Array.from({length:i},(r,a)=>{if(a===i-1)return n.target;let o=a/(i-1)*t-e;return o<=0?s:wd(n,o).position})}}function di(n,e,t,i){if(i<=0)return{points:[e,e],duration:0,target:e};let s=i/1e3,r=n-e,a=Math.max(Math.abs(r),1)*12/s,o=Math.max(-a,Math.min(a,t))*s;return{points:Array.from({length:49},(l,c)=>{if(c===48)return e;let h=c/48;return e+(r+(o+10*r)*h)*Math.exp(-10*h)}),duration:i,target:e}}function Ip(n,e=0,t=24){if(n.duration<=0)return{points:[0,0],duration:0,target:0};let i=n.duration/(n.points.length-1)/1e3;return{duration:n.duration,target:0,points:n.points.map((s,r,a)=>{if(r===0)return Math.max(0,Math.min(1,e));if(r===a.length-1)return 0;let o=Math.abs((a[r+1]-a[r-1])/(2*i)),l=t/6;return Math.max(0,Math.min(1,(o-l)/(t-l)))})}}function wd(n,e){if(e>=n.duration||n.duration===0)return{position:n.target,velocity:0};let t=Math.max(0,e)/n.duration*(n.points.length-1),i=Math.min(Math.floor(t),n.points.length-2),s=n.points[i]??n.target,r=n.points[i+1]??n.target;return{position:s+(r-s)*(t-i),velocity:(r-s)*(n.points.length-1)*1e3/n.duration}}function fh(n,e,t,i=10){let s=Math.floor(n/i)*i+e;return t>0&&s<n-.001?s+=i:t<0&&s>n+.001?s-=i:t===0&&(s+=Math.round((n-s)/i)*i),s}var wa=(n,e)=>n[(e%n.length+n.length)%n.length];function Lp(n,e,t){let i=Math.floor(e),s=e-i,r=[wa(n,i)];return s>1e-5&&r.push(wa(n,i+1)),r.at(-1)!==t&&r.push(t),{wheel:r,from:s,target:r.length-1}}function Np(n,e="outward"){if(e!=="outward"){let s=n.map((a,o)=>a?-1:o).filter(a=>a>=0);e==="end"&&s.reverse();let r=n.map(a=>a?0:1);return e!=="none"&&s.forEach((a,o)=>{r[a]=o+1}),r}let t=n.map((s,r)=>s?0:r+1);if(!n.includes(!0))return t;let i=-1/0;for(let s=0;s<n.length;s++)n[s]?i=s:t[s]=s-i;i=1/0;for(let s=n.length-1;s>=0;s--)n[s]?i=s:t[s]=Math.min(t[s],i-s);return t}function ph(n,e){let t=new Map,i=[],s=0;for(let r of n){let a=e.get(r);if(!a){i.push(r);continue}for(let o of i)t.set(o,a.x);i.length=0,s=a.x+a.width}for(let r of i)t.set(r,s);return t}var no=new WeakMap;class xc{view;media;members=new Set;pending=new Set;sizes=new WeakMap;intersections=new WeakMap;resize;intersection;frame=0;static for(e){let t=no.get(e);return t||(t=new xc(e),no.set(e,t)),t}constructor(e){this.view=e,this.media=e.matchMedia("(prefers-reduced-motion: reduce)"),this.media.addEventListener("change",this.refresh),e.document.addEventListener("visibilitychange",this.refresh),e.document.fonts?.addEventListener("loadingdone",this.refresh),e.document.fonts?.ready.then(this.refresh),e.ResizeObserver&&(this.resize=new e.ResizeObserver(t=>{for(let i of t){let s=this.sizes.get(i.target);s?.sizeChanged(i.target,i.contentRect.width,i.contentRect.height)&&s.refresh()}})),e.IntersectionObserver&&(this.intersection=new e.IntersectionObserver(t=>{for(let i of t)this.intersections.get(i.target)?.visibility(i.isIntersecting)},{rootMargin:"64px"}))}refresh=()=>{for(let e of this.members)e.refresh()};add(e,t){this.members.add(e),this.intersections.set(t,e),this.intersection?.observe(t)}watch(e,t){this.sizes.set(e,t),this.resize?.observe(e)}unwatch(e){this.resize?.unobserve(e),this.sizes.delete(e)}enqueue(e){this.pending.add(e),!this.frame&&(this.frame=this.view.requestAnimationFrame(()=>{this.frame=0;let t=[...this.pending];this.pending.clear();let i=t.map(r=>r.stage());for(let r of i)r?.();let s=t.map(r=>r.measure());for(let r of s)r?.()}))}remove(e,t){this.pending.delete(e),this.members.delete(e),this.intersection?.unobserve(t),this.intersections.delete(t),!this.members.size&&(this.view.cancelAnimationFrame(this.frame),this.resize?.disconnect(),this.intersection?.disconnect(),this.media.removeEventListener("change",this.refresh),this.view.document.removeEventListener("visibilitychange",this.refresh),this.view.document.fonts?.removeEventListener("loadingdone",this.refresh),no.delete(this.view))}}var mh=new WeakMap;function xs(n,e,t){let i=n.animate(e,t),s=n.ownerDocument.timeline?.currentTime;return typeof s=="number"&&i.playState==="running"&&(i.startTime=s),i}function gh(n){let e=n.ownerDocument.defaultView;if(!e)return!1;let t=mh.get(e);return t===void 0&&(t=e.CSS?.supports("animation-timing-function","linear(0, 1)")??!1,mh.set(e,t)),t}class bs{element;property;animation;motion;value=0;constructor(e,t){this.element=e,this.property=t}read(){let e=this.animation?.currentTime;return this.animation&&this.motion?wd(this.motion,typeof e=="number"?e:0):{position:this.value,velocity:0}}set(e,t){this.cancel(),this.value=e,this.element.style.setProperty(this.property,t(e))}play(e,t,i){if(this.cancel(),this.value=e.target,this.element.style.setProperty(this.property,t(e.target)),!e.duration||e.points.every(u=>u===e.target)){i?.();return}let s=e.points[0]??e.target,r=e.target-s,a=this.property==="opacity"&&gh(this.element),o=this.property==="transform"&&Math.abs(r)>1e-5&&gh(this.element),l=a?[{opacity:0},{opacity:1}]:o?[{[this.property]:t(s)},{[this.property]:t(e.target)}]:e.points.map(u=>({[this.property]:t(u)})),c=a?`linear(${e.points.map(t).join(",")})`:o?`linear(${e.points.map(u=>Number(((u-s)/r).toFixed(6))).join(",")})`:"linear",h=xs(this.element,l,{duration:e.duration,easing:c});this.animation=h,this.motion=e,h.onfinish=()=>{this.animation===h&&(this.animation=void 0,this.motion=void 0,h.onfinish=null,h.cancel(),i?.())}}cancel(){this.animation&&(this.animation.onfinish=null,this.animation.cancel(),this.animation=void 0),this.motion=void 0}}var io="http://www.w3.org/2000/svg",Fp=0;class so{host;layers=new Map;filter;intensity=1;constructor(e){this.host=e}filterUrl(e){if(!this.filter){let i=this.host.ownerDocument,s=i.createElementNS(io,"svg");s.classList.add("rn-blur-defs"),s.setAttribute("aria-hidden","true"),s.setAttribute("focusable","false");let r=i.createElementNS(io,"filter"),a;do a=`rn-vertical-blur-${++Fp}`;while(i.getElementById(a));r.id=a,r.setAttribute("x","-15%"),r.setAttribute("width","130%"),r.setAttribute("color-interpolation-filters","sRGB");let o=i.createElementNS(io,"feGaussianBlur");r.append(o),s.append(r),this.host.append(s),this.filter={svg:s,blur:o,id:a,height:0}}let t=e*.035*this.intensity;return this.filter.height!==t&&(this.filter.blur.setAttribute("stdDeviation",`0 ${t}`),this.filter.height=t),`url("#${this.filter.id}")`}apply(e,t,i,s,r="roll"){let a=Ip(t,s,r==="entry"?6:24);if(a.points.every(u=>u===0))return!1;let o=this.host.ownerDocument.createElement("span");o.className="rn-sharp",o.append(...e.childNodes);let l=o.cloneNode(!0);l.className="rn-smear",l.style.filter=this.filterUrl(i),e.append(o,l);let c=new bs(o,"opacity"),h=new bs(l,"opacity");return this.layers.set(e,{sharp:o,sharpOpacity:c,smearOpacity:h}),c.play(a,u=>String(1-u)),h.play(a,String),!0}remove(e){let t=this.layers.get(e);if(!t)return 0;let i=t.smearOpacity.read().position;return t.sharpOpacity.cancel(),t.smearOpacity.cancel(),e.replaceChildren(...t.sharp.childNodes),this.layers.delete(e),i}destroy(){for(let e of this.layers.keys())this.remove(e);this.filter?.svg.remove(),this.filter=void 0}}function Up(n){return Math.max(45,Math.min(110,n/7))}function kp(n,e,t){let i=Math.abs(e-n);return{points:[n,e],target:e,duration:i*t}}function Op(n){let e=Array.from({length:n+1},(s,r)=>({"--rn-flap-step":String(r),offset:r/n,easing:"steps(1, end)"})),t=[],i=[];for(let s=0;s<n;s++){let r=s/n,a=(s+.5)/n,o=(s+1)/n;t.push({transform:"perspective(5em) rotateX(0deg)",filter:"brightness(1)",offset:r,easing:"cubic-bezier(.6, 0, 1, .5)"},{transform:"perspective(5em) rotateX(-90deg)",filter:"brightness(.45)",offset:a},{transform:"perspective(5em) rotateX(-90deg)",filter:"brightness(.45)",offset:o}),i.push({transform:"perspective(5em) rotateX(90deg)",filter:"brightness(.45)",offset:r},{transform:"perspective(5em) rotateX(90deg)",filter:"brightness(.45)",offset:a,easing:"linear(0, 0.58, 0.9, 1, 1.045 78%, 1)"},{transform:"perspective(5em) rotateX(0deg)",filter:"brightness(1)",offset:o})}return{index:e,falls:t,lands:i}}function Bp(n){for(let e of n.querySelectorAll(".rn-flap-smear")){for(let t of e.getAnimations())t.cancel();e.remove()}for(let e of n.querySelectorAll(".rn-flap-sharp")){for(let t of e.getAnimations())t.cancel();e.classList.remove("rn-flap-sharp")}}function zp(n,e,t,i,s,r,a,o){let l=n.ownerDocument,c=Math.abs(i-t),h=i>=t?1:-1;if(!c){n.replaceChildren();return}let u=Op(c),d=Array.from({length:c+1},(M,w)=>wa(e,t+w*h)),f=[...d.slice(1),d.at(-1)],p=d.some(M=>/[\r\n\f\u2028\u2029]/u.test(M)),_=l.createElement("span");_.style.cssText=`display:block;position:relative;height:${s}px`,xs(_,u.index,{delay:a,duration:c*r,fill:"both"});let m=(M,w)=>{let C=l.createElement("span");C.className=`rn-face rn-flap rn-flap-${M}`,C.style.height=`${s}px`,C.style.overflow="hidden";let x=l.createElement("span");x.style.cssText=`display:block;white-space:pre;line-height:${s}px`;let E=w?f:d;if(p)for(let D of E){let A=l.createElement("span");A.style.cssText=`display:block;height:${s}px`,A.textContent=D,x.append(A)}else x.textContent=E.join(`
`);return C.append(x),x.style.transform=`translateY(calc(var(--rn-flap-step) * ${-s}px))`,C},g=m("bottom",!1),y=m("top",!0),S=m("top",!1),v=m("bottom",!0);if(o){let M=(w,C)=>{let x=w.firstElementChild,E=x.cloneNode(!0);x.classList.add("rn-flap-sharp");let D=l.createElement("span");D.className="rn-flap-smear",D.style.cssText="display:block;position:absolute;inset:0;overflow:hidden",D.style.filter=o,D.append(E),w.append(D);let A=C.map(F=>({offset:F.offset,easing:F.easing??"linear",opacity:F.filter==="brightness(1)"?0:1})),I={delay:a,duration:c*r,fill:"both"};xs(D,A,I),xs(x,A.map(F=>({...F,opacity:1-F.opacity})),I)};M(S,u.falls),M(v,u.lands)}S.style.transform="perspective(5em) rotateX(-90deg)",xs(S,u.falls,{delay:a,duration:c*r,fill:"backwards"}),v.style.transform="perspective(5em) rotateX(90deg)",xs(v,u.lands,{delay:a,duration:c*r,fill:"forwards"}),n.style.height=`${s}px`,_.append(g,y,v,S),n.replaceChildren(_)}var Vp=new WeakMap,hl=new WeakSet,ro=n=>`translateX(${n}px)`,ao=n=>`scale(${n})`,oo=n=>String(Math.max(0,Math.min(1,n))),lo=n=>"transition"in n&&n.transition==="direct";function Hp(n){if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0||n.duration>1e4))throw RangeError("duration must be between 0 and 10000 milliseconds");if(n.flipDuration!==void 0&&(!Number.isFinite(n.flipDuration)||n.flipDuration<1||n.flipDuration>1e4))throw RangeError("flipDuration must be between 1 and 10000 milliseconds")}var Gp={validate(n){if(typeof n.value!="number"&&typeof n.value!="bigint")throw TypeError("value must be a number or bigint");Hp(n)},model:n=>Cp(n.value,n),direction:Dp};class Wp{host;source;options;target;displayed;semantic;measurement;visual;measures=new Map;columns=new Map;sizes=new Map;scheduler;enhanced=!1;destroyed=!1;visible=!0;reset=!0;measurementPending=!1;hadClass;previousLeft;blur;blurIntensity=1;constructor(e,t,i){this.host=e,this.source=i,i.validate(t),this.options={...t},this.target=this.displayed=i.model(t);let s=e.ownerDocument,r=o=>{let l=s.createElement("span");return l.className=o,l};this.semantic=r("rn-value"),this.measurement=r("rn-measure"),this.visual=r("rn-visual"),this.measurement.setAttribute("aria-hidden","true"),this.visual.setAttribute("aria-hidden","true"),this.semantic.textContent=this.target.text,this.hadClass=e.classList.contains("rn-root"),e.classList.add("rn-root"),e.replaceChildren(this.semantic,this.measurement,this.visual);let a=s.defaultView;a&&typeof a.matchMedia=="function"&&typeof a.requestAnimationFrame=="function"&&typeof e.animate=="function"&&(this.scheduler=xc.for(a),this.scheduler.add(this,e),this.scheduler.watch(this.measurement,this)),this.prepare()}canAnimate(){return!!this.scheduler&&this.options.animated!==!1&&(this.options.duration??500)>0&&!this.scheduler.media.matches&&!this.host.ownerDocument.hidden&&(this.visible||this.options.pauseOffscreen===!1)&&this.target.rollable&&this.host.isConnected}update(e){if(this.destroyed)return;let t={...this.options,...e};this.source.validate(t);let i=this.source.model(t),s=i.text===this.target.text&&i.signature===this.target.signature;if(this.options.motionBlur&&!t.motionBlur&&(this.blur?.destroy(),this.blur=void 0,Bp(this.visual)),lo(this.options)!==lo(t)&&(this.reset=!0),this.options=t,this.target=i,!this.canAnimate()){this.finish();return}s&&this.enhanced&&!this.reset||(this.semantic.textContent=i.text,this.prepare())}prepare(){if(!this.canAnimate()){this.finish();return}this.measurementPending=!0,this.scheduler?.enqueue(this)}stage(){if(!this.destroyed)return this.canAnimate()?(this.previousLeft=this.enhanced&&!this.reset?this.measurement.getBoundingClientRect().left:void 0,()=>this.stageMeasurement()):()=>this.finish()}stageMeasurement(){let e=new Set(this.target.tokens.map(i=>i.key));for(let[i,s]of this.measures)e.has(i)||(this.scheduler?.unwatch(s),this.sizes.delete(s),s.remove(),this.measures.delete(i));let t=null;for(let i of this.target.tokens){let s=this.measures.get(i.key);s||(s=this.host.ownerDocument.createElement("span"),s.className="rn-token",this.measures.set(i.key,s),this.scheduler?.watch(s,this)),s.textContent!==i.text&&(s.textContent=i.text);let r=t?t.nextSibling:this.measurement.firstChild;s!==r&&this.measurement.insertBefore(s,r),t=s}this.host.dataset.rnMeasuring=""}measure(){if(this.destroyed)return;if(!this.canAnimate())return()=>this.finish();let e=this.measurement.getBoundingClientRect(),t=this.host.ownerDocument.defaultView;if(!t)return()=>this.finish();let i=t.getComputedStyle(this.measurement);if(i.direction==="rtl")return()=>this.finish();let s=parseFloat(i.width),r=parseFloat(i.height);if(!s||!r||!e.width||!e.height)return()=>this.finish();let a=e.width/s,o=e.height/r,l=parseFloat(i.getPropertyValue("--rn-blur"));this.blurIntensity=Number.isFinite(l)?Math.max(0,l):1,this.sizes.set(this.measurement,{width:s,height:r});let c=new Map;for(let[u,d]of this.measures){let f=d.getBoundingClientRect(),p={width:f.width/a,height:f.height/o};this.sizes.set(d,p),c.set(u,{...p,x:(f.left-e.left)/a,y:(f.top-e.top)/o})}let h=this.previousLeft===void 0?0:(this.previousLeft-e.left)/a;return()=>this.commit(c,h)}makeColumn(e){let t=this.host.ownerDocument.createElement("span");t.className="rn-slot",t.dataset.rnKey=e.key,e.index!==void 0&&(t.dataset.rnWheel=""),this.options.mode==="flap"&&(t.dataset.rnFlap="");let i=this.host.ownerDocument.createElement("span");return i.className="rn-reel",t.append(i),this.visual.append(t),{token:e,element:t,reel:i,x:new bs(t,"transform"),opacity:new bs(t,"opacity"),roll:new bs(i,"transform"),exiting:!1,height:0,width:0}}face(e,t){let i=this.host.ownerDocument.createElement("span");i.className="rn-face",i.textContent=t,i.style.height=`${e.height}px`;let s=e.reel.children.length;i.style.position="absolute",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.transform=`translateY(${s*e.height}px)`,e.reel.style.height=`${(s+1)*e.height}px`,e.reel.append(i)}rest(e){this.blur?.remove(e.reel),e.reel.replaceChildren(),e.reel.style.removeProperty("height"),this.face(e,e.token.text),this.wrapInk(e),e.token.index===void 0?e.roll.set(1,ao):e.roll.set(e.token.index,()=>"translateY(0px)")}wrapInk(e){if(this.options.mode==="flap")return;let t=this.host.ownerDocument.createElement("span");t.className="rn-ink",t.append(...e.reel.childNodes),e.reel.append(t)}finishEntry(e){e.entry&&(e.entry.blurred&&this.blur?.remove(e.reel),e.entry.track.cancel(),e.entry.element.replaceWith(e.reel),e.entry=void 0)}enter(e,t,i,s){let r=this.host.ownerDocument.createElement("span");r.className="rn-enter",e.reel.replaceWith(r),r.append(e.reel);let a=new bs(r,"transform");e.entry={element:r,track:a,blurred:!1};let o=Lr(Pp(e.height*(s?.entryDistance??1),s?.entryDuration??t,s?.entryHold),i);if(this.options.motionBlur&&e.token.text.trim()){this.blur??=new so(this.host),this.blur.intensity=this.blurIntensity;let l={...o,points:o.points.map(c=>c/e.height)};e.entry.blurred=this.blur.apply(e.reel,l,e.height,0,"entry")}a.play(o,l=>`translateY(${l}px)`,()=>this.finishEntry(e))}commit(e,t){if(this.destroyed)return;this.measurementPending=!1;let i=this.enhanced&&!this.reset,s=i?this.options.duration??500:0,r=Vp.get(this.host),a=s?r?.widthDuration??s:0,o=this.options.mode==="flap",l=this.options.direction==="up"?1:this.options.direction==="down"?-1:this.source.direction(this.displayed,this.target);this.target.text!==this.displayed.text&&(this.host.dataset.rnTrend=l>0?"up":l<0?"down":"none");let c=new Map([...this.columns].map(([v,M])=>{let w=M.x.read();return[v,{...w,x:w.position,width:M.width}]})),h=ph(this.target.tokens.map(v=>v.key),c),u=[...c.keys()].sort((v,M)=>c.get(v).x-c.get(M).x),d=ph(u,e),f=new Map(this.displayed.tokens.filter(v=>v.index===void 0).map(v=>[v.identity,v.key])),p=new Map(this.target.tokens.filter(v=>v.index===void 0).map(v=>[v.identity,v.key])),_=this.options.stagger==="start"||this.options.stagger==="end",m=this.target.tokens.map(v=>{let M=this.columns.get(v.key);return!M||M.exiting||_&&v.index!==void 0&&M.token.text!==v.text}),g=Np(this.target.tokens.map((v,M)=>v.index!==void 0&&!m[M]),this.options.stagger),y=Math.max(0,...this.target.tokens.map((v,M)=>m[M]?g[M]-1:0)),S=Math.min(s*.045,s*.3/Math.max(1,y));for(let[v,M]of this.target.tokens.entries()){let w=e.get(M.key);if(!w)continue;let C=Math.max(0,g[v]-1)*S,x=f.get(M.identity),E=x!==void 0&&x!==M.key?c.get(x):void 0,D=this.columns.get(M.key),A=!D;if(!D){D=this.makeColumn(M),this.columns.set(M.key,D);let z=(E?.x??h.get(M.key)??w.x)+t;D.x.set(i?z+(w.x-z)*(E?0:r?.entryOrigin??0):w.x,ro),D.opacity.set(i?0:1,oo)}let I=D.token.text!==M.text,F=Math.abs(D.height-w.height)>.1,H=D.exiting;D.exiting=!1,D.element.style.width=`${w.width}px`,D.element.style.height=`${w.height}px`,D.element.style.top=`${w.y}px`;let B=c.get(M.key);if(D.x.play(di(B?B.position+t:D.x.read().position,w.x,B?.velocity??0,a),ro),A||H||!i){let z=D.opacity.read(),k=di(z.position,1,z.velocity,M.index===void 0?Math.min(s,180):s?r?.fadeDuration??s:0),Q=!o&&M.identity.startsWith("group:")&&!E?(r?.entryDuration??s)*(r?.entryHold??.14):0;D.opacity.play(A?Lr(k,C+Q):k,oo)}if(D.height=w.height,D.width=w.width,(!i||F)&&this.finishEntry(D),A&&o&&M.wheel&&s&&D.roll.set(Math.max(0,M.wheel.indexOf(" ")),()=>"translateY(0px)"),o&&!F&&(I||A)&&M.index!==void 0&&M.wheel&&s&&D.roll.read().position!==M.index){let z=D.roll.read(),k=Math.round(z.position),Q=fh(k,M.index,l,M.wheel.length),$=this.options.flipDuration??Up(s);this.blur?.remove(D.reel);let se;this.options.motionBlur&&this.blurIntensity>0&&(this.blur??=new so(this.host),this.blur.intensity=this.blurIntensity,se=this.blur.filterUrl(w.height)),zp(D.reel,M.wheel,k,Q,w.height,$,C,se),D.token=M;let he=D;D.roll.play(Lr(kp(k,Q,$),C),()=>"translateY(0px)",()=>this.rest(he))}else if(!A&&!F&&I&&M.index!==void 0&&M.wheel&&D.token.index!==void 0&&s){let z=D.roll.read(),k=lo(this.options)?Lp(D.token.wheel,z.position,M.text):void 0,Q=k?.from??z.position,$=k?.target??fh(z.position,M.index,l,M.wheel.length),se=k?.wheel??M.wheel,he=k?Math.min(Math.max(0,z.velocity),($-Q)*1e4/s):z.velocity,le=_?Lr(di(Q,$,he,s),C):di(Q,$,he,s),K=Math.floor(Math.min(...le.points)),ce=Math.ceil(Math.max(...le.points));D.entry&&(D.entry.blurred=!1);let Ce=this.blur?.remove(D.reel)??0;D.reel.replaceChildren();for(let Z=K;Z<=ce;Z++)this.face(D,wa(se,Z));this.wrapInk(D),this.options.motionBlur&&(this.blur??=new so(this.host),this.blur.intensity=this.blurIntensity,this.blur.apply(D.reel,le,w.height,Ce)),D.token=k?{...M,wheel:se,index:$}:M;let W=D;D.roll.play(le,Z=>`translateY(${(K-Z)*w.height}px)`,()=>this.rest(W))}else(A||F||I||!i)&&(D.token=M,this.rest(D));if(A&&s&&M.index!==void 0&&!o&&this.enter(D,s,C,r),E&&s&&(A||H)){let z=D.roll.read(),k=D;D.roll.play(di(A?.96:z.position,1,z.velocity,Math.min(s,180)),ao,()=>this.rest(k))}}for(let[v,M]of this.columns){if(e.has(v))continue;let w=c.get(v),C=p.get(M.token.identity),x=C?e.get(C):void 0;if(M.x.play(di(w.position+t,x?.x??d.get(v)??w.position,w.velocity,a),ro),M.exiting)continue;if(M.exiting=!0,x&&s){let D=M.roll.read();M.roll.play(di(D.position,1.04,D.velocity,Math.min(s,180)),ao)}let E=M.opacity.read();M.opacity.play(di(E.position,0,E.velocity,M.token.index===void 0?Math.min(s,180):s*.65),oo,()=>{M.exiting&&(this.removeColumn(M),this.columns.delete(v))})}this.enhanced=!0,this.reset=!1,this.displayed=this.target,this.host.dataset.rnReady=""}removeColumn(e){this.blur?.remove(e.reel),this.finishEntry(e),e.x.cancel(),e.roll.cancel(),e.opacity.cancel(),e.element.remove()}refresh(){this.destroyed||(this.reset=!0,this.prepare())}sizeChanged(e,t,i){if(this.measurementPending||!this.host.hasAttribute("data-rn-measuring"))return!1;let s=this.sizes.get(e);return!s||Math.abs(s.width-t)>.2||Math.abs(s.height-i)>.2}visibility(e){this.visible!==e&&(this.visible=e,(e||this.options.pauseOffscreen!==!1)&&this.refresh())}finish(){if(!this.destroyed){this.measurementPending=!1;for(let e of this.columns.values())this.removeColumn(e);this.columns.clear(),this.blur?.destroy(),this.blur=void 0,this.semantic.textContent=this.target.text,delete this.host.dataset.rnReady,delete this.host.dataset.rnMeasuring,delete this.host.dataset.rnTrend,this.enhanced=!1,this.reset=!0,this.displayed=this.target}}destroy(){if(!this.destroyed){this.finish(),this.destroyed=!0;for(let e of this.measures.values())this.scheduler?.unwatch(e);this.scheduler?.unwatch(this.measurement),this.scheduler?.remove(this,this.host),this.host.replaceChildren(this.host.ownerDocument.createTextNode(this.target.text)),!this.hadClass&&this.host.classList.remove("rn-root"),hl.delete(this.host)}}}function Va(n,e){if(hl.has(n))throw Error("A rolling number is already mounted on this element");let t=new Wp(n,e,Gp);return hl.add(n),t}const bc="183",Ms={ROTATE:0,DOLLY:1,PAN:2},ys={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Xp=0,_h=1,jp=2,va=1,Ad=2,cr=3,oi=0,Kt=1,Fn=2,Vt=0,Ss=1,vh=2,xh=3,bh=4,Rd=5,ni=100,qp=101,Yp=102,$p=103,Kp=104,ul=200,Zp=201,Jp=202,Qp=203,dl=204,fl=205,Cd=206,em=207,Dd=208,tm=209,nm=210,im=211,sm=212,rm=213,am=214,pl=0,ml=1,gl=2,Ps=3,_l=4,vl=5,xl=6,bl=7,yc=0,om=1,lm=2,Hn=0,Mc=1,Sc=2,Ec=3,Cr=4,Tc=5,wc=6,Ac=7,yh="attached",cm="detached",Pd=300,Xi=301,Is=302,co=303,ho=304,Ha=306,Ci=1e3,Un=1001,Aa=1002,yt=1003,Id=1004,hr=1005,Pt=1006,xa=1007,si=1008,on=1009,Ld=1010,Nd=1011,gr=1012,Rc=1013,Gn=1014,ln=1015,un=1016,Cc=1017,Dc=1018,Ls=1020,Fd=35902,Ud=35899,kd=1021,Od=1022,mn=1023,li=1026,Ti=1027,Ga=1028,Pc=1029,Ns=1030,Ic=1031,Lc=1033,ba=33776,ya=33777,Ma=33778,Sa=33779,yl=35840,Ml=35841,Sl=35842,El=35843,Tl=36196,wl=37492,Al=37496,Rl=37488,Cl=37489,Dl=37490,Pl=37491,Il=37808,Ll=37809,Nl=37810,Fl=37811,Ul=37812,kl=37813,Ol=37814,Bl=37815,zl=37816,Vl=37817,Hl=37818,Gl=37819,Wl=37820,Xl=37821,jl=36492,ql=36494,Yl=36495,$l=36283,Kl=36284,Zl=36285,Jl=36286,_r=2300,vr=2301,uo=2302,Mh=2303,Sh=2400,Eh=2401,Th=2402,hm=2500,um=0,Bd=1,Ql=2,dm=3200,fm=3201,Wa=0,pm=1,Si="",Ct="srgb",Jt="srgb-linear",Ra="linear",nt="srgb",es=7680,wh=519,mm=512,gm=513,_m=514,Nc=515,vm=516,xm=517,Fc=518,bm=519,ec=35044,ym=35048,Ah="300 es",kn=2e3,xr=2001;function Mm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Sm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function br(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Em(){const n=br("canvas");return n.style.display="block",n}const Rh={};function Ca(...n){const e="THREE."+n.shift();console.log(e,...n)}function zd(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Pe(...n){n=zd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ue(...n){n=zd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Da(...n){const e=n.join(" ");e in Rh||(Rh[e]=!0,Pe(...n))}function Tm(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const wm={[pl]:ml,[gl]:xl,[_l]:bl,[Ps]:vl,[ml]:pl,[xl]:gl,[bl]:_l,[vl]:Ps};class Yi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ch=1234567;const fr=Math.PI/180,Fs=180/Math.PI;function Tn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]).toLowerCase()}function je(n,e,t){return Math.max(e,Math.min(t,n))}function Uc(n,e){return(n%e+e)%e}function Am(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Rm(n,e,t){return n!==e?(t-n)/(e-n):0}function pr(n,e,t){return(1-t)*n+t*e}function Cm(n,e,t,i){return pr(n,e,1-Math.exp(-t*i))}function Dm(n,e=1){return e-Math.abs(Uc(n,e*2)-e)}function Pm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Im(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Lm(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Nm(n,e){return n+Math.random()*(e-n)}function Fm(n){return n*(.5-Math.random())}function Um(n){n!==void 0&&(Ch=n);let e=Ch+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function km(n){return n*fr}function Om(n){return n*Fs}function Bm(n){return(n&n-1)===0&&n!==0}function zm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Vm(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Hm(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),d=a((e-i)/2),f=r((i-e)/2),p=a((i-e)/2);switch(s){case"XYX":n.set(o*h,l*u,l*d,o*c);break;case"YZY":n.set(l*d,o*h,l*u,o*c);break;case"ZXZ":n.set(l*u,l*d,o*h,o*c);break;case"XZX":n.set(o*h,l*p,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*p,o*c);break;case"ZYZ":n.set(l*p,l*f,o*h,o*c);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Mn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function st(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const $e={DEG2RAD:fr,RAD2DEG:Fs,generateUUID:Tn,clamp:je,euclideanModulo:Uc,mapLinear:Am,inverseLerp:Rm,lerp:pr,damp:Cm,pingpong:Dm,smoothstep:Pm,smootherstep:Im,randInt:Lm,randFloat:Nm,randFloatSpread:Fm,seededRandom:Um,degToRad:km,radToDeg:Om,isPowerOfTwo:Bm,ceilPowerOfTwo:zm,floorPowerOfTwo:Vm,setQuaternionFromProperEuler:Hm,normalize:st,denormalize:Mn};class Le{constructor(e=0,t=0){Le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class wn{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[a+0],f=r[a+1],p=r[a+2],_=r[a+3];if(u!==_||l!==d||c!==f||h!==p){let m=l*d+c*f+h*p+u*_;m<0&&(d=-d,f=-f,p=-p,_=-_,m=-m);let g=1-o;if(m<.9995){const y=Math.acos(m),S=Math.sin(y);g=Math.sin(g*y)/S,o=Math.sin(o*y)/S,l=l*g+d*o,c=c*g+f*o,h=h*g+p*o,u=u*g+_*o}else{l=l*g+d*o,c=c*g+f*o,h=h*g+p*o,u=u*g+_*o;const y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],d=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-o*f,e[t+2]=c*p+h*f+o*d-l*u,e[t+3]=h*p-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),d=l(i/2),f=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>u){const f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-i-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-r*s),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return fo.copy(this).projectOnVector(e),this.sub(fo)}reflect(e){return this.sub(fo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fo=new L,Dh=new wn;class Ge{constructor(e,t,i,s,r,a,o,l,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],p=i[8],_=s[0],m=s[3],g=s[6],y=s[1],S=s[4],v=s[7],M=s[2],w=s[5],C=s[8];return r[0]=a*_+o*y+l*M,r[3]=a*m+o*S+l*w,r[6]=a*g+o*v+l*C,r[1]=c*_+h*y+u*M,r[4]=c*m+h*S+u*w,r[7]=c*g+h*v+u*C,r[2]=d*_+f*y+p*M,r[5]=d*m+f*S+p*w,r[8]=d*g+f*v+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,p=t*u+i*d+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=u*_,e[1]=(s*c-h*i)*_,e[2]=(o*i-s*a)*_,e[3]=d*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(po.makeScale(e,t)),this}rotate(e){return this.premultiply(po.makeRotation(-e)),this}translate(e,t){return this.premultiply(po.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const po=new Ge,Ph=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ih=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gm(){const n={enabled:!0,workingColorSpace:Jt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===nt&&(s.r=ai(s.r),s.g=ai(s.g),s.b=ai(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===nt&&(s.r=Es(s.r),s.g=Es(s.g),s.b=Es(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Si?Ra:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Da("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Da("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Jt]:{primaries:e,whitePoint:i,transfer:Ra,toXYZ:Ph,fromXYZ:Ih,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ct},outputColorSpaceConfig:{drawingBufferColorSpace:Ct}},[Ct]:{primaries:e,whitePoint:i,transfer:nt,toXYZ:Ph,fromXYZ:Ih,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ct}}}),n}const Ke=Gm();function ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Es(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ts;class Wm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ts===void 0&&(ts=br("canvas")),ts.width=e.width,ts.height=e.height;const s=ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ts}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=br("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ai(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ai(t[i]/255)*255):t[i]=ai(t[i]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xm=0;class kc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=Tn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(mo(s[a].image)):r.push(mo(s[a]))}else r=mo(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function mo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Wm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}let jm=0;const go=new L;class It extends Yi{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,i=Un,s=Un,r=Pt,a=si,o=mn,l=on,c=It.DEFAULT_ANISOTROPY,h=Si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=Tn(),this.name="",this.source=new kc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(go).x}get height(){return this.source.getSize(go).y}get depth(){return this.source.getSize(go).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ci:e.x=e.x-Math.floor(e.x);break;case Un:e.x=e.x<0?0:1;break;case Aa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ci:e.y=e.y-Math.floor(e.y);break;case Un:e.y=e.y<0?0:1;break;case Aa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=Pd;It.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,i=0,s=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,v=(f+1)/2,M=(g+1)/2,w=(h+d)/4,C=(u+_)/4,x=(p+m)/4;return S>v&&S>M?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=w/i,r=C/i):v>M?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=w/s,r=x/s):M<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),i=C/r,s=x/r),this.set(i,s,r,t),this}let y=Math.sqrt((m-p)*(m-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-p)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qm extends Yi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new It(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Pt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new kc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends qm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Vd extends It{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=yt,this.minFilter=yt,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ym extends It{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=yt,this.minFilter=yt,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ve{constructor(e,t,i,s,r,a,o,l,c,h,u,d,f,p,_,m){Ve.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,h,u,d,f,p,_,m)}set(e,t,i,s,r,a,o,l,c,h,u,d,f,p,_,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ve().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ns.setFromMatrixColumn(e,0).length(),r=1/ns.setFromMatrixColumn(e,1).length(),a=1/ns.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,p=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d+_*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,p=o*h,_=o*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($m,e,Km)}lookAt(e,t,i){const s=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),fi.crossVectors(i,rn),fi.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),fi.crossVectors(i,rn)),fi.normalize(),Nr.crossVectors(rn,fi),s[0]=fi.x,s[4]=Nr.x,s[8]=rn.x,s[1]=fi.y,s[5]=Nr.y,s[9]=rn.y,s[2]=fi.z,s[6]=Nr.z,s[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],p=i[2],_=i[6],m=i[10],g=i[14],y=i[3],S=i[7],v=i[11],M=i[15],w=s[0],C=s[4],x=s[8],E=s[12],D=s[1],A=s[5],I=s[9],F=s[13],H=s[2],B=s[6],z=s[10],k=s[14],Q=s[3],$=s[7],se=s[11],he=s[15];return r[0]=a*w+o*D+l*H+c*Q,r[4]=a*C+o*A+l*B+c*$,r[8]=a*x+o*I+l*z+c*se,r[12]=a*E+o*F+l*k+c*he,r[1]=h*w+u*D+d*H+f*Q,r[5]=h*C+u*A+d*B+f*$,r[9]=h*x+u*I+d*z+f*se,r[13]=h*E+u*F+d*k+f*he,r[2]=p*w+_*D+m*H+g*Q,r[6]=p*C+_*A+m*B+g*$,r[10]=p*x+_*I+m*z+g*se,r[14]=p*E+_*F+m*k+g*he,r[3]=y*w+S*D+v*H+M*Q,r[7]=y*C+S*A+v*B+M*$,r[11]=y*x+S*I+v*z+M*se,r[15]=y*E+S*F+v*k+M*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],_=e[7],m=e[11],g=e[15],y=l*f-c*d,S=o*f-c*u,v=o*d-l*u,M=a*f-c*h,w=a*d-l*h,C=a*u-o*h;return t*(_*y-m*S+g*v)-i*(p*y-m*M+g*w)+s*(p*S-_*M+g*C)-r*(p*v-_*w+m*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],_=e[13],m=e[14],g=e[15],y=t*o-i*a,S=t*l-s*a,v=t*c-r*a,M=i*l-s*o,w=i*c-r*o,C=s*c-r*l,x=h*_-u*p,E=h*m-d*p,D=h*g-f*p,A=u*m-d*_,I=u*g-f*_,F=d*g-f*m,H=y*F-S*I+v*A+M*D-w*E+C*x;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/H;return e[0]=(o*F-l*I+c*A)*B,e[1]=(s*I-i*F-r*A)*B,e[2]=(_*C-m*w+g*M)*B,e[3]=(d*w-u*C-f*M)*B,e[4]=(l*D-a*F-c*E)*B,e[5]=(t*F-s*D+r*E)*B,e[6]=(m*v-p*C-g*S)*B,e[7]=(h*C-d*v+f*S)*B,e[8]=(a*I-o*D+c*x)*B,e[9]=(i*D-t*I-r*x)*B,e[10]=(p*w-_*v+g*y)*B,e[11]=(u*v-h*w-f*y)*B,e[12]=(o*E-a*A-l*x)*B,e[13]=(t*A-i*E+s*x)*B,e[14]=(_*S-p*M-m*y)*B,e[15]=(h*M-u*S+d*y)*B,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,p=r*u,_=a*h,m=a*u,g=o*u,y=l*c,S=l*h,v=l*u,M=i.x,w=i.y,C=i.z;return s[0]=(1-(_+g))*M,s[1]=(f+v)*M,s[2]=(p-S)*M,s[3]=0,s[4]=(f-v)*w,s[5]=(1-(d+g))*w,s[6]=(m+y)*w,s[7]=0,s[8]=(p+S)*C,s[9]=(m-y)*C,s[10]=(1-(d+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ns.set(s[0],s[1],s[2]).length();const o=ns.set(s[4],s[5],s[6]).length(),l=ns.set(s[8],s[9],s[10]).length();r<0&&(a=-a),vn.copy(this);const c=1/a,h=1/o,u=1/l;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=h,vn.elements[5]*=h,vn.elements[6]*=h,vn.elements[8]*=u,vn.elements[9]*=u,vn.elements[10]*=u,t.setFromRotationMatrix(vn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=kn,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),f=(i+s)/(i-s);let p,_;if(l)p=r/(a-r),_=a*r/(a-r);else if(o===kn)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===xr)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=kn,l=!1){const c=this.elements,h=2/(t-e),u=2/(i-s),d=-(t+e)/(t-e),f=-(i+s)/(i-s);let p,_;if(l)p=1/(a-r),_=a/(a-r);else if(o===kn)p=-2/(a-r),_=-(a+r)/(a-r);else if(o===xr)p=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ns=new L,vn=new Ve,$m=new L(0,0,0),Km=new L(1,1,1),fi=new L,Nr=new L,rn=new L,Lh=new Ve,Nh=new wn;class An{constructor(e=0,t=0,i=0,s=An.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Lh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Lh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nh.setFromEuler(this),this.setFromQuaternion(Nh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}An.DEFAULT_ORDER="XYZ";class Oc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zm=0;const Fh=new L,is=new wn,Kn=new Ve,Fr=new L,Qs=new L,Jm=new L,Qm=new wn,Uh=new L(1,0,0),kh=new L(0,1,0),Oh=new L(0,0,1),Bh={type:"added"},eg={type:"removed"},ss={type:"childadded",child:null},_o={type:"childremoved",child:null};class mt extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zm++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new L,t=new An,i=new wn,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ve},normalMatrix:{value:new Ge}}),this.matrix=new Ve,this.matrixWorld=new Ve,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(Uh,e)}rotateY(e){return this.rotateOnAxis(kh,e)}rotateZ(e){return this.rotateOnAxis(Oh,e)}translateOnAxis(e,t){return Fh.copy(e).applyQuaternion(this.quaternion),this.position.add(Fh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Uh,e)}translateY(e){return this.translateOnAxis(kh,e)}translateZ(e){return this.translateOnAxis(Oh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Fr.copy(e):Fr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Qs,Fr,this.up):Kn.lookAt(Fr,Qs,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),is.setFromRotationMatrix(Kn),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ue("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bh),ss.child=e,this.dispatchEvent(ss),ss.child=null):Ue("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(eg),_o.child=e,this.dispatchEvent(_o),_o.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bh),ss.child=e,this.dispatchEvent(ss),ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,e,Jm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,Qm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}mt.DEFAULT_UP=new L(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class On extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tg={type:"move"};class vo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new On,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new On,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new On,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new On;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function xo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ne{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ke.workingColorSpace){if(e=Uc(e,1),t=je(t,0,1),i=je(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=xo(a,r,e+1/3),this.g=xo(a,r,e),this.b=xo(a,r,e-1/3)}return Ke.colorSpaceToWorking(this,s),this}setStyle(e,t=Ct){function i(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){const i=Hd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}copyLinearToSRGB(e){return this.r=Es(e.r),this.g=Es(e.g),this.b=Es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return Ke.workingToColorSpace(jt.copy(this),e),Math.round(je(jt.r*255,0,255))*65536+Math.round(je(jt.g*255,0,255))*256+Math.round(je(jt.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(jt.copy(this),t);const i=jt.r,s=jt.g,r=jt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=Ct){Ke.workingToColorSpace(jt.copy(this),e);const t=jt.r,i=jt.g,s=jt.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(pi),this.setHSL(pi.h+e,pi.s+t,pi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(pi),e.getHSL(Ur);const i=pr(pi.h,Ur.h,t),s=pr(pi.s,Ur.s,t),r=pr(pi.l,Ur.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const jt=new Ne;Ne.NAMES=Hd;class Xa{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ne(e),this.near=t,this.far=i}clone(){return new Xa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Bc extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const xn=new L,Zn=new L,bo=new L,Jn=new L,rs=new L,as=new L,zh=new L,yo=new L,Mo=new L,So=new L,Eo=new _t,To=new _t,wo=new _t;class Sn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),xn.subVectors(e,t),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){xn.subVectors(s,t),Zn.subVectors(i,t),bo.subVectors(e,t);const a=xn.dot(xn),o=xn.dot(Zn),l=xn.dot(bo),c=Zn.dot(Zn),h=Zn.dot(bo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Jn.x),l.addScaledVector(a,Jn.y),l.addScaledVector(o,Jn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Eo.setScalar(0),To.setScalar(0),wo.setScalar(0),Eo.fromBufferAttribute(e,t),To.fromBufferAttribute(e,i),wo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Eo,r.x),a.addScaledVector(To,r.y),a.addScaledVector(wo,r.z),a}static isFrontFacing(e,t,i,s){return xn.subVectors(i,t),Zn.subVectors(e,t),xn.cross(Zn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),xn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Sn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;rs.subVectors(s,i),as.subVectors(r,i),yo.subVectors(e,i);const l=rs.dot(yo),c=as.dot(yo);if(l<=0&&c<=0)return t.copy(i);Mo.subVectors(e,s);const h=rs.dot(Mo),u=as.dot(Mo);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(rs,a);So.subVectors(e,r);const f=rs.dot(So),p=as.dot(So);if(p>=0&&f<=p)return t.copy(r);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(as,o);const m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return zh.subVectors(r,s),o=(u-h)/(u-h+(f-p)),t.copy(s).addScaledVector(zh,o);const g=1/(m+_+d);return a=_*g,o=d*g,t.copy(i).addScaledVector(rs,a).addScaledVector(as,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ci{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bn):bn.fromBufferAttribute(r,a),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),kr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),kr.copy(i.boundingBox)),kr.applyMatrix4(e.matrixWorld),this.union(kr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(er),Or.subVectors(this.max,er),os.subVectors(e.a,er),ls.subVectors(e.b,er),cs.subVectors(e.c,er),mi.subVectors(ls,os),gi.subVectors(cs,ls),Li.subVectors(os,cs);let t=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Li.z,Li.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Li.z,0,-Li.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Li.y,Li.x,0];return!Ao(t,os,ls,cs,Or)||(t=[1,0,0,0,1,0,0,0,1],!Ao(t,os,ls,cs,Or))?!1:(Br.crossVectors(mi,gi),t=[Br.x,Br.y,Br.z],Ao(t,os,ls,cs,Or))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Qn=[new L,new L,new L,new L,new L,new L,new L,new L],bn=new L,kr=new ci,os=new L,ls=new L,cs=new L,mi=new L,gi=new L,Li=new L,er=new L,Or=new L,Br=new L,Ni=new L;function Ao(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Ni.fromArray(n,r);const o=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),l=e.dot(Ni),c=t.dot(Ni),h=i.dot(Ni);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const At=new L,zr=new Le;let ng=0;class Zt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ng++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ec,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)zr.fromBufferAttribute(this,t),zr.applyMatrix3(e),this.setXY(t,zr.x,zr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Mn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ec&&(e.usage=this.usage),e}}class Gd extends Zt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Wd extends Zt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class hn extends Zt{constructor(e,t,i){super(new Float32Array(e),t,i)}}const ig=new ci,tr=new L,Ro=new L;class Wn{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):ig.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;tr.subVectors(e,this.center);const t=tr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(tr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ro.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(tr.copy(e.center).add(Ro)),this.expandByPoint(tr.copy(e.center).sub(Ro))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let sg=0;const fn=new Ve,Co=new mt,hs=new L,an=new ci,nr=new ci,Ut=new L;class dn extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mm(e)?Wd:Gd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ge().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,i){return fn.makeTranslation(e,t,i),this.applyMatrix4(fn),this}scale(e,t,i){return fn.makeScale(e,t,i),this.applyMatrix4(fn),this}lookAt(e){return Co.lookAt(e),Co.updateMatrix(),this.applyMatrix4(Co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new hn(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ci);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];nr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(an.min,nr.min),an.expandByPoint(Ut),Ut.addVectors(an.max,nr.max),an.expandByPoint(Ut)):(an.expandByPoint(nr.min),an.expandByPoint(nr.max))}an.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ut));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ut.fromBufferAttribute(o,c),l&&(hs.fromBufferAttribute(e,c),Ut.add(hs)),s=Math.max(s,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new L,l[x]=new L;const c=new L,h=new L,u=new L,d=new Le,f=new Le,p=new Le,_=new L,m=new L;function g(x,E,D){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,E),u.fromBufferAttribute(i,D),d.fromBufferAttribute(r,x),f.fromBufferAttribute(r,E),p.fromBufferAttribute(r,D),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const A=1/(f.x*p.y-p.x*f.y);isFinite(A)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(A),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(A),o[x].add(_),o[E].add(_),o[D].add(_),l[x].add(m),l[E].add(m),l[D].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let x=0,E=y.length;x<E;++x){const D=y[x],A=D.start,I=D.count;for(let F=A,H=A+I;F<H;F+=3)g(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const S=new L,v=new L,M=new L,w=new L;function C(x){M.fromBufferAttribute(s,x),w.copy(M);const E=o[x];S.copy(E),S.sub(M.multiplyScalar(M.dot(E))).normalize(),v.crossVectors(w,E);const A=v.dot(l[x])<0?-1:1;a.setXYZW(x,S.x,S.y,S.z,A)}for(let x=0,E=y.length;x<E;++x){const D=y[x],A=D.start,I=D.count;for(let F=A,H=A+I;F<H;F+=3)C(e.getX(F+0)),C(e.getX(F+1)),C(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,u=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let g=0;g<h;g++)d[p++]=c[f++]}return new Zt(d,h,u)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new dn,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ec,this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Yt=new L;class zc{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Mn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Mn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ca("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new zc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ca("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let ag=0;class gn extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ag++}),this.uuid=Tn(),this.name="",this.type="Material",this.blending=Ss,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dl,this.blendDst=fl,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ss&&(i.blending=this.blending),this.side!==oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==dl&&(i.blendSrc=this.blendSrc),this.blendDst!==fl&&(i.blendDst=this.blendDst),this.blendEquation!==ni&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ps&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(i.stencilFail=this.stencilFail),this.stencilZFail!==es&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ei=new L,Do=new L,Vr=new L,_i=new L,Po=new L,Hr=new L,Io=new L;class Xs{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Do.copy(e).add(t).multiplyScalar(.5),Vr.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(Do);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Vr),o=_i.dot(this.direction),l=-_i.dot(Vr),c=_i.lengthSq(),h=Math.abs(1-a*a);let u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=r*h,u>=0)if(d>=-p)if(d<=p){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Do).addScaledVector(Vr,d),f}intersectSphere(e,t){ei.subVectors(e.center,this.origin);const i=ei.dot(this.direction),s=ei.dot(ei)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,i,s,r){Po.subVectors(t,e),Hr.subVectors(i,e),Io.crossVectors(Po,Hr);let a=this.direction.dot(Io),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_i.subVectors(this.origin,e);const l=o*this.direction.dot(Hr.crossVectors(_i,Hr));if(l<0)return null;const c=o*this.direction.dot(Po.cross(_i));if(c<0||l+c>a)return null;const h=-o*_i.dot(Io);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bn extends gn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vh=new Ve,Fi=new Xs,Gr=new Wn,Hh=new L,Wr=new L,Xr=new L,jr=new L,Lo=new L,qr=new L,Gh=new L,Yr=new L;class ct extends mt{constructor(e=new dn,t=new Bn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){qr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Lo.fromBufferAttribute(u,e),a?qr.addScaledVector(Lo,h):qr.addScaledVector(Lo.sub(t),h))}t.add(qr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Gr.copy(i.boundingSphere),Gr.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!(Gr.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Gr,Hh)===null||Fi.origin.distanceToSquared(Hh)>(e.far-e.near)**2))&&(Vh.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(Vh),!(i.boundingBox!==null&&Fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const m=d[p],g=a[m.materialIndex],y=Math.max(m.start,f.start),S=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,M=S;v<M;v+=3){const w=o.getX(v),C=o.getX(v+1),x=o.getX(v+2);s=$r(this,g,e,i,c,h,u,w,C,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){const y=o.getX(m),S=o.getX(m+1),v=o.getX(m+2);s=$r(this,a,e,i,c,h,u,y,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const m=d[p],g=a[m.materialIndex],y=Math.max(m.start,f.start),S=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,M=S;v<M;v+=3){const w=v,C=v+1,x=v+2;s=$r(this,g,e,i,c,h,u,w,C,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){const y=m,S=m+1,v=m+2;s=$r(this,a,e,i,c,h,u,y,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function og(n,e,t,i,s,r,a,o){let l;if(e.side===Kt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===oi,o),l===null)return null;Yr.copy(o),Yr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Yr);return c<t.near||c>t.far?null:{distance:c,point:Yr.clone(),object:n}}function $r(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Wr),n.getVertexPosition(l,Xr),n.getVertexPosition(c,jr);const h=og(n,e,t,i,Wr,Xr,jr,Gh);if(h){const u=new L;Sn.getBarycoord(Gh,Wr,Xr,jr,u),s&&(h.uv=Sn.getInterpolatedAttribute(s,o,l,c,u,new Le)),r&&(h.uv1=Sn.getInterpolatedAttribute(r,o,l,c,u,new Le)),a&&(h.normal=Sn.getInterpolatedAttribute(a,o,l,c,u,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new L,materialIndex:0};Sn.getNormal(Wr,Xr,jr,d.normal),h.face=d,h.barycoord=u}return h}const Wh=new L,Xh=new _t,jh=new _t,lg=new L,qh=new Ve,Kr=new L,No=new Wn,Yh=new Ve,Fo=new Xs;class cg extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=yh,this.bindMatrix=new Ve,this.bindMatrixInverse=new Ve,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ci),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Kr),this.boundingBox.expandByPoint(Kr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Wn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Kr),this.boundingSphere.expandByPoint(Kr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),No.copy(this.boundingSphere),No.applyMatrix4(s),e.ray.intersectsSphere(No)!==!1&&(Yh.copy(s).invert(),Fo.copy(e.ray).applyMatrix4(Yh),!(this.boundingBox!==null&&Fo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Fo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new _t,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===yh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===cm?this.bindMatrixInverse.copy(this.bindMatrix).invert():Pe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,s=this.geometry;Xh.fromBufferAttribute(s.attributes.skinIndex,e),jh.fromBufferAttribute(s.attributes.skinWeight,e),Wh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=jh.getComponent(r);if(a!==0){const o=Xh.getComponent(r);qh.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(lg.copy(Wh).applyMatrix4(qh),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Xd extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ja extends It{constructor(e=null,t=1,i=1,s,r,a,o,l,c=yt,h=yt,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $h=new Ve,hg=new Ve;class Vc{constructor(e=[],t=[]){this.uuid=Tn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Pe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Ve)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new Ve;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:hg;$h.multiplyMatrices(o,t[r]),$h.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Vc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new ja(t,e,e,mn,ln);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const r=e.bones[i];let a=t[r];a===void 0&&(Pe("Skeleton: No bone found with UUID:",r),a=new Xd),this.bones.push(a),this.boneInverses.push(new Ve().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=i[s];e.boneInverses.push(o.toArray())}return e}}class tc extends Zt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const us=new Ve,Kh=new Ve,Zr=[],Zh=new ci,ug=new Ve,ir=new ct,sr=new Wn;class Hc extends ct{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new tc(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,ug)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ci),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,us),Zh.copy(e.boundingBox).applyMatrix4(us),this.boundingBox.union(Zh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,us),sr.copy(e.boundingSphere).applyMatrix4(us),this.boundingSphere.union(sr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(ir.geometry=this.geometry,ir.material=this.material,ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sr.copy(this.boundingSphere),sr.applyMatrix4(i),e.ray.intersectsSphere(sr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,us),Kh.multiplyMatrices(i,us),ir.matrixWorld=Kh,ir.raycast(e,Zr);for(let a=0,o=Zr.length;a<o;a++){const l=Zr[a];l.instanceId=r,l.object=this,t.push(l)}Zr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new tc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new ja(new Float32Array(s*this.count),s,this.count,Ga,ln));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Uo=new L,dg=new L,fg=new Ge;class yi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Uo.subVectors(i,t).cross(dg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Uo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||fg.getNormalMatrix(e),s=this.coplanarPoint(Uo).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ui=new Wn,pg=new Le(.5,.5),Jr=new L;class Gc{constructor(e=new yi,t=new yi,i=new yi,s=new yi,r=new yi,a=new yi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=kn,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],_=r[9],m=r[10],g=r[11],y=r[12],S=r[13],v=r[14],M=r[15];if(s[0].setComponents(c-a,f-h,g-p,M-y).normalize(),s[1].setComponents(c+a,f+h,g+p,M+y).normalize(),s[2].setComponents(c+o,f+u,g+_,M+S).normalize(),s[3].setComponents(c-o,f-u,g-_,M-S).normalize(),i)s[4].setComponents(l,d,m,v).normalize(),s[5].setComponents(c-l,f-d,g-m,M-v).normalize();else if(s[4].setComponents(c-l,f-d,g-m,M-v).normalize(),t===kn)s[5].setComponents(c+l,f+d,g+m,M+v).normalize();else if(t===xr)s[5].setComponents(l,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(e){Ui.center.set(0,0,0);const t=pg.distanceTo(e.center);return Ui.radius=.7071067811865476+t,Ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Jr.x=s.normal.x>0?e.max.x:e.min.x,Jr.y=s.normal.y>0?e.max.y:e.min.y,Jr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Jr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class jd extends gn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Pa=new L,Ia=new L,Jh=new Ve,rr=new Xs,Qr=new Wn,ko=new L,Qh=new L;class Wc extends mt{constructor(e=new dn,t=new jd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Pa.fromBufferAttribute(t,s-1),Ia.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Pa.distanceTo(Ia);e.setAttribute("lineDistance",new hn(i,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qr.copy(i.boundingSphere),Qr.applyMatrix4(s),Qr.radius+=r,e.ray.intersectsSphere(Qr)===!1)return;Jh.copy(s).invert(),rr.copy(e.ray).applyMatrix4(Jh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,m=p-1;_<m;_+=c){const g=h.getX(_),y=h.getX(_+1),S=ea(this,e,rr,l,g,y,_);S&&t.push(S)}if(this.isLineLoop){const _=h.getX(p-1),m=h.getX(f),g=ea(this,e,rr,l,_,m,p-1);g&&t.push(g)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=f,m=p-1;_<m;_+=c){const g=ea(this,e,rr,l,_,_+1,_);g&&t.push(g)}if(this.isLineLoop){const _=ea(this,e,rr,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ea(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Pa.fromBufferAttribute(o,s),Ia.fromBufferAttribute(o,r),t.distanceSqToSegment(Pa,Ia,ko,Qh)>i)return;ko.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ko);if(!(c<e.near||c>e.far))return{distance:c,point:Qh.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const eu=new L,tu=new L;class mg extends Wc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)eu.fromBufferAttribute(t,s),tu.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+eu.distanceTo(tu);e.setAttribute("lineDistance",new hn(i,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class gg extends Wc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class qd extends gn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const nu=new Ve,nc=new Xs,ta=new Wn,na=new L;class _g extends mt{constructor(e=new dn,t=new qd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ta.copy(i.boundingSphere),ta.applyMatrix4(s),ta.radius+=r,e.ray.intersectsSphere(ta)===!1)return;nu.copy(s).invert(),nc.copy(e.ray).applyMatrix4(nu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=d,_=f;p<_;p++){const m=c.getX(p);na.fromBufferAttribute(u,m),iu(na,m,l,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let p=d,_=f;p<_;p++)na.fromBufferAttribute(u,p),iu(na,p,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function iu(n,e,t,i,s,r,a){const o=nc.distanceSqToPoint(n);if(o<t){const l=new L;nc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Yd extends It{constructor(e=[],t=Xi,i,s,r,a,o,l,c,h){super(e,t,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Oo extends It{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Us extends It{constructor(e,t,i=Gn,s,r,a,o=yt,l=yt,c,h=li,u=1){if(h!==li&&h!==Ti)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new kc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class vg extends Us{constructor(e,t=Gn,i=Xi,s,r,a=yt,o=yt,l,c=li){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class $d extends It{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class js extends dn{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,i,t,e,a,r,0),p("z","y","x",1,-1,i,t,-e,a,r,1),p("x","z","y",1,1,e,i,t,s,a,2),p("x","z","y",1,-1,e,i,-t,s,a,3),p("x","y","z",1,-1,e,t,i,s,r,4),p("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new hn(c,3)),this.setAttribute("normal",new hn(h,3)),this.setAttribute("uv",new hn(u,2));function p(_,m,g,y,S,v,M,w,C,x,E){const D=v/C,A=M/x,I=v/2,F=M/2,H=w/2,B=C+1,z=x+1;let k=0,Q=0;const $=new L;for(let se=0;se<z;se++){const he=se*A-F;for(let le=0;le<B;le++){const K=le*D-I;$[_]=K*y,$[m]=he*S,$[g]=H,c.push($.x,$.y,$.z),$[_]=0,$[m]=0,$[g]=w>0?1:-1,h.push($.x,$.y,$.z),u.push(le/C),u.push(1-se/x),k+=1}}for(let se=0;se<x;se++)for(let he=0;he<C;he++){const le=d+he+B*se,K=d+he+B*(se+1),ce=d+(he+1)+B*(se+1),Ce=d+(he+1)+B*se;l.push(le,K,Ce),l.push(K,ce,Ce),Q+=6}o.addGroup(f,Q,E),f+=Q,d+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Gi extends dn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,f=[],p=[],_=[],m=[];for(let g=0;g<h;g++){const y=g*d-a;for(let S=0;S<c;S++){const v=S*u-r;p.push(v,-y,0),_.push(0,0,1),m.push(S/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<o;y++){const S=y+c*g,v=y+c*(g+1),M=y+1+c*(g+1),w=y+1+c*g;f.push(S,v,w),f.push(v,M,w)}this.setIndex(f),this.setAttribute("position",new hn(p,3)),this.setAttribute("normal",new hn(_,3)),this.setAttribute("uv",new hn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.width,e.height,e.widthSegments,e.heightSegments)}}function ks(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function $t(n){const e={};for(let t=0;t<n.length;t++){const i=ks(n[t]);for(const s in i)e[s]=i[s]}return e}function xg(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Kd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const wi={clone:ks,merge:$t};var bg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ht extends gn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bg,this.fragmentShader=yg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ks(e.uniforms),this.uniformsGroups=xg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Zd extends Ht{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Os extends gn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wa,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Xn extends Os{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Mg extends gn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wa,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Sg extends gn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wa,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=yc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Jd extends gn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Eg extends gn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function ia(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Tg(n){function e(s,r){return n[s]-n[r]}const t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function su(n,e,t){const i=n.length,s=new n.constructor(i);for(let r=0,a=0;a!==i;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=n[o+l]}return s}function Qd(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=n[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=n[s++];while(r!==void 0)}class qs{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,s=t[i],r=t[i-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break t}a=i,i=0;break n}break e}for(;i<a;){const o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class wg extends qs{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Sh,endingEnd:Sh}}intervalChanged_(e,t,i){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Eh:r=e,o=2*t-i;break;case Th:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Eh:a=e,l=2*i-t;break;case Th:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(i-t)/(s-t),_=p*p,m=_*p,g=-d*m+2*d*_-d*p,y=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*p+1,S=(-1-f)*m+(1.5+f)*_+.5*p,v=f*m-f*_;for(let M=0;M!==o;++M)r[M]=g*a[h+M]+y*a[c+M]+S*a[l+M]+v*a[u+M];return r}}class Ag extends qs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}}class Rg extends qs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Cg extends qs{interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.settings||this.DefaultSettings_,u=h.inTangents,d=h.outTangents;if(!u||!d){const _=(i-t)/(s-t),m=1-_;for(let g=0;g!==o;++g)r[g]=a[c+g]*m+a[l+g]*_;return r}const f=o*2,p=e-1;for(let _=0;_!==o;++_){const m=a[c+_],g=a[l+_],y=p*f+_*2,S=d[y],v=d[y+1],M=e*f+_*2,w=u[M],C=u[M+1];let x=(i-t)/(s-t),E,D,A,I,F;for(let H=0;H<8;H++){E=x*x,D=E*x,A=1-x,I=A*A,F=I*A;const z=F*t+3*I*x*S+3*A*E*w+D*s-i;if(Math.abs(z)<1e-10)break;const k=3*I*(S-t)+6*A*x*(w-S)+3*E*(s-w);if(Math.abs(k)<1e-10)break;x=x-z/k,x=Math.max(0,Math.min(1,x))}r[_]=F*m+3*I*x*v+3*A*E*C+D*g}return r}}class Rn{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ia(t,this.TimeBufferType),this.values=ia(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ia(e.times,Array),values:ia(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Rg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ag(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new wg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Cg(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case _r:t=this.InterpolantFactoryMethodDiscrete;break;case vr:t=this.InterpolantFactoryMethodLinear;break;case uo:t=this.InterpolantFactoryMethodSmooth;break;case Mh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Pe("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return _r;case this.InterpolantFactoryMethodLinear:return vr;case this.InterpolantFactoryMethodSmooth:return uo;case this.InterpolantFactoryMethodBezier:return Mh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){const i=this.times,s=i.length;let r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Ue("KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,s=this.values,r=i.length;r===0&&(Ue("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){Ue("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ue("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Sm(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){Ue("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===uo,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{const u=o*i,d=u-i,f=u+i;for(let p=0;p!==i;++p){const _=t[u+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*i,d=a*i;for(let f=0;f!==i;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Rn.prototype.ValueTypeName="";Rn.prototype.TimeBufferType=Float32Array;Rn.prototype.ValueBufferType=Float32Array;Rn.prototype.DefaultInterpolation=vr;class Ys extends Rn{constructor(e,t,i){super(e,t,i)}}Ys.prototype.ValueTypeName="bool";Ys.prototype.ValueBufferType=Array;Ys.prototype.DefaultInterpolation=_r;Ys.prototype.InterpolantFactoryMethodLinear=void 0;Ys.prototype.InterpolantFactoryMethodSmooth=void 0;class ef extends Rn{constructor(e,t,i,s){super(e,t,i,s)}}ef.prototype.ValueTypeName="color";class Bs extends Rn{constructor(e,t,i,s){super(e,t,i,s)}}Bs.prototype.ValueTypeName="number";class Dg extends qs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t);let c=e*o;for(let h=c+o;c!==h;c+=4)wn.slerpFlat(r,0,a,c-o,a,c,l);return r}}class zs extends Rn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new Dg(this.times,this.values,this.getValueSize(),e)}}zs.prototype.ValueTypeName="quaternion";zs.prototype.InterpolantFactoryMethodSmooth=void 0;class $s extends Rn{constructor(e,t,i){super(e,t,i)}}$s.prototype.ValueTypeName="string";$s.prototype.ValueBufferType=Array;$s.prototype.DefaultInterpolation=_r;$s.prototype.InterpolantFactoryMethodLinear=void 0;$s.prototype.InterpolantFactoryMethodSmooth=void 0;class Vs extends Rn{constructor(e,t,i,s){super(e,t,i,s)}}Vs.prototype.ValueTypeName="vector";class Pg{constructor(e="",t=-1,i=[],s=hm){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=Tn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(Lg(i[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=i.length;r!==a;++r)t.push(Rn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=Tg(l);l=su(l,1,h),c=su(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Bs(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return a}static parseAnimation(e,t){if(Pe("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Ue("AnimationClip: No animation in JSONLoader data."),null;const i=function(u,d,f,p,_){if(f.length!==0){const m=[],g=[];Qd(f,m,g,p),m.length!==0&&_.push(new u(d,m,g))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(const _ in f){const m=[],g=[];for(let y=0;y!==d[p].morphTargets.length;++y){const S=d[p];m.push(S.time),g.push(S.morphTarget===_?1:0)}s.push(new Bs(".morphTargetInfluence["+_+"]",m,g))}l=f.length*a}else{const f=".bones["+t[u].name+"]";i(Vs,f+".position",d,"pos",s),i(zs,f+".quaternion",d,"rot",s),i(Vs,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,s=e.length;i!==s;++i){const r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Ig(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Bs;case"vector":case"vector2":case"vector3":case"vector4":return Vs;case"color":return ef;case"quaternion":return zs;case"bool":case"boolean":return Ys;case"string":return $s}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function Lg(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Ig(n.type);if(n.times===void 0){const t=[],i=[];Qd(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}const ri={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(ru(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!ru(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function ru(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Ng{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Fg=new Ng;class Ks{constructor(e){this.manager=e!==void 0?e:Fg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ks.DEFAULT_MATERIAL_NAME="__DEFAULT";const ti={};class Ug extends Error{constructor(e,t){super(e),this.response=t}}class tf extends Ks{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ri.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ti[e]!==void 0){ti[e].push({onLoad:t,onProgress:i,onError:s});return}ti[e]=[],ti[e].push({onLoad:t,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=ti[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let _=0;const m=new ReadableStream({start(g){y();function y(){u.read().then(({done:S,value:v})=>{if(S)g.close();else{_+=v.byteLength;const M=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let w=0,C=h.length;w<C;w++){const x=h[w];x.onProgress&&x.onProgress(M)}g.enqueue(v),y()}},S=>{g.error(S)})}}});return new Response(m)}else throw new Ug(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{ri.add(`file:${e}`,c);const h=ti[e];delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=ti[e];if(h===void 0)throw this.manager.itemError(e),c;delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ds=new WeakMap;class kg extends Ks{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ri.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=ds.get(a);u===void 0&&(u=[],ds.set(a,u)),u.push({onLoad:t,onError:s})}return a}const o=br("img");function l(){h(),t&&t(this);const u=ds.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}ds.delete(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),ri.remove(`image:${e}`);const d=ds.get(this)||[];for(let f=0;f<d.length;f++){const p=d[f];p.onError&&p.onError(u)}ds.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ri.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class Og extends Ks{constructor(e){super(e)}load(e,t,i,s){const r=new It,a=new kg(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class qa extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Bg extends qa{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Bo=new Ve,au=new L,ou=new L;class Xc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new Ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gc,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;au.setFromMatrixPosition(e.matrixWorld),t.position.copy(au),ou.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ou),t.updateMatrixWorld(),Bo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===xr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Bo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const sa=new L,ra=new wn,Dn=new L;class nf extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ve,this.projectionMatrix=new Ve,this.projectionMatrixInverse=new Ve,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(sa,ra,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sa,ra,Dn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(sa,ra,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sa,ra,Dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const vi=new L,lu=new Le,cu=new Le;class qt extends nf{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Fs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Fs*2*Math.atan(Math.tan(fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,lu,cu),t.subVectors(cu,lu)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class zg extends Xc{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=Fs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Vg extends qa{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new zg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Hg extends Xc{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}}class sf extends qa{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Hg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Dr extends nf{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Gg extends Xc{constructor(){super(new Dr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ic extends qa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new Gg}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class mr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const zo=new WeakMap;class Wg extends Ks{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Pe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Pe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ri.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(zo.has(a)===!0)s&&s(zo.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ri.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),zo.set(l,c),ri.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ri.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const fs=-90,ps=1;class Xg extends mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qt(fs,ps,e,t);s.layers=this.layers,this.add(s);const r=new qt(fs,ps,e,t);r.layers=this.layers,this.add(r);const a=new qt(fs,ps,e,t);a.layers=this.layers,this.add(a);const o=new qt(fs,ps,e,t);o.layers=this.layers,this.add(o);const l=new qt(fs,ps,e,t);l.layers=this.layers,this.add(l);const c=new qt(fs,ps,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===kn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===xr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class jg extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class qg{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Yg.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Yg(){this._document.hidden===!1&&this.reset()}const jc="\\[\\]\\.:\\/",$g=new RegExp("["+jc+"]","g"),qc="[^"+jc+"]",Kg="[^"+jc.replace("\\.","")+"]",Zg=/((?:WC+[\/:])*)/.source.replace("WC",qc),Jg=/(WCOD+)?/.source.replace("WCOD",Kg),Qg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",qc),e0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",qc),t0=new RegExp("^"+Zg+Jg+Qg+e0+"$"),n0=["material","materials","bones","map"];class i0{constructor(e,t,i){const s=i||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class rt{constructor(e,t,i){this.path=t,this.parsedPath=i||rt.parseTrackName(t),this.node=rt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new rt.Composite(e,t,i):new rt(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($g,"")}static parseTrackName(e){const t=t0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);n0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=rt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Pe("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ue("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ue("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ue("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Ue("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Ue("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;Ue("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}rt.Composite=i0;rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray];rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const hu=new Ve;class s0{constructor(e,t,i=0,s=1/0){this.ray=new Xs(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Oc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ue("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hu),this}intersectObject(e,t=!0,i=[]){return sc(e,this,i,t),i.sort(uu),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)sc(e[s],this,i,t);return i.sort(uu),i}}function uu(n,e){return n.distance-e.distance}function sc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)sc(r[a],e,t,!0)}}class du{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=je(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(je(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class r0 extends Yi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Pe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function fu(n,e,t,i){const s=a0(i);switch(t){case kd:return n*e;case Ga:return n*e/s.components*s.byteLength;case Pc:return n*e/s.components*s.byteLength;case Ns:return n*e*2/s.components*s.byteLength;case Ic:return n*e*2/s.components*s.byteLength;case Od:return n*e*3/s.components*s.byteLength;case mn:return n*e*4/s.components*s.byteLength;case Lc:return n*e*4/s.components*s.byteLength;case ba:case ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ma:case Sa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ml:case El:return Math.max(n,16)*Math.max(e,8)/4;case yl:case Sl:return Math.max(n,8)*Math.max(e,8)/2;case Tl:case wl:case Rl:case Cl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Al:case Dl:case Pl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Il:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ll:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Nl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Fl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case kl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ol:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Bl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case zl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Vl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Hl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Gl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Wl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Xl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case jl:case ql:case Yl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case $l:case Kl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Zl:case Jl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function a0(n){switch(n){case on:case Ld:return{byteLength:1,components:1};case gr:case Nd:case un:return{byteLength:2,components:1};case Cc:case Dc:return{byteLength:2,components:4};case Gn:case Rc:case ln:return{byteLength:4,components:1};case Fd:case Ud:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bc}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bc);function rf(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function o0(n){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],_=u[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const _=u[f];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var l0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,c0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,h0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,u0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,d0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,f0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,p0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,m0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,g0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,_0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,v0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,x0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,b0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,y0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,M0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,S0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,E0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,T0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,w0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,A0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,R0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,C0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,D0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,P0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,I0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,L0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,N0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,F0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,U0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,k0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,O0="gl_FragColor = linearToOutputTexel( gl_FragColor );",B0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,z0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,V0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,H0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,G0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,W0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,X0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,j0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,q0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Y0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,K0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Z0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,J0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Q0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,e_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,t_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,n_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,i_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,s_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,r_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,a_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,o_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,l_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,c_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,h_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,u_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,p_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,m_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,g_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,__=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,v_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,x_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,b_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,y_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,M_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,E_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,w_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,A_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,D_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,P_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,I_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,L_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,N_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,F_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,U_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,k_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,O_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,B_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,z_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,H_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,G_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,W_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,X_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,j_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,q_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Y_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,K_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Z_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,J_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Q_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ev=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,nv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,iv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,av=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ov=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,pv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,mv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,_v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Mv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ev=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Av=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Rv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Iv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Uv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ov=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:l0,alphahash_pars_fragment:c0,alphamap_fragment:h0,alphamap_pars_fragment:u0,alphatest_fragment:d0,alphatest_pars_fragment:f0,aomap_fragment:p0,aomap_pars_fragment:m0,batching_pars_vertex:g0,batching_vertex:_0,begin_vertex:v0,beginnormal_vertex:x0,bsdfs:b0,iridescence_fragment:y0,bumpmap_pars_fragment:M0,clipping_planes_fragment:S0,clipping_planes_pars_fragment:E0,clipping_planes_pars_vertex:T0,clipping_planes_vertex:w0,color_fragment:A0,color_pars_fragment:R0,color_pars_vertex:C0,color_vertex:D0,common:P0,cube_uv_reflection_fragment:I0,defaultnormal_vertex:L0,displacementmap_pars_vertex:N0,displacementmap_vertex:F0,emissivemap_fragment:U0,emissivemap_pars_fragment:k0,colorspace_fragment:O0,colorspace_pars_fragment:B0,envmap_fragment:z0,envmap_common_pars_fragment:V0,envmap_pars_fragment:H0,envmap_pars_vertex:G0,envmap_physical_pars_fragment:e_,envmap_vertex:W0,fog_vertex:X0,fog_pars_vertex:j0,fog_fragment:q0,fog_pars_fragment:Y0,gradientmap_pars_fragment:$0,lightmap_pars_fragment:K0,lights_lambert_fragment:Z0,lights_lambert_pars_fragment:J0,lights_pars_begin:Q0,lights_toon_fragment:t_,lights_toon_pars_fragment:n_,lights_phong_fragment:i_,lights_phong_pars_fragment:s_,lights_physical_fragment:r_,lights_physical_pars_fragment:a_,lights_fragment_begin:o_,lights_fragment_maps:l_,lights_fragment_end:c_,logdepthbuf_fragment:h_,logdepthbuf_pars_fragment:u_,logdepthbuf_pars_vertex:d_,logdepthbuf_vertex:f_,map_fragment:p_,map_pars_fragment:m_,map_particle_fragment:g_,map_particle_pars_fragment:__,metalnessmap_fragment:v_,metalnessmap_pars_fragment:x_,morphinstance_vertex:b_,morphcolor_vertex:y_,morphnormal_vertex:M_,morphtarget_pars_vertex:S_,morphtarget_vertex:E_,normal_fragment_begin:T_,normal_fragment_maps:w_,normal_pars_fragment:A_,normal_pars_vertex:R_,normal_vertex:C_,normalmap_pars_fragment:D_,clearcoat_normal_fragment_begin:P_,clearcoat_normal_fragment_maps:I_,clearcoat_pars_fragment:L_,iridescence_pars_fragment:N_,opaque_fragment:F_,packing:U_,premultiplied_alpha_fragment:k_,project_vertex:O_,dithering_fragment:B_,dithering_pars_fragment:z_,roughnessmap_fragment:V_,roughnessmap_pars_fragment:H_,shadowmap_pars_fragment:G_,shadowmap_pars_vertex:W_,shadowmap_vertex:X_,shadowmask_pars_fragment:j_,skinbase_vertex:q_,skinning_pars_vertex:Y_,skinning_vertex:$_,skinnormal_vertex:K_,specularmap_fragment:Z_,specularmap_pars_fragment:J_,tonemapping_fragment:Q_,tonemapping_pars_fragment:ev,transmission_fragment:tv,transmission_pars_fragment:nv,uv_pars_fragment:iv,uv_pars_vertex:sv,uv_vertex:rv,worldpos_vertex:av,background_vert:ov,background_frag:lv,backgroundCube_vert:cv,backgroundCube_frag:hv,cube_vert:uv,cube_frag:dv,depth_vert:fv,depth_frag:pv,distance_vert:mv,distance_frag:gv,equirect_vert:_v,equirect_frag:vv,linedashed_vert:xv,linedashed_frag:bv,meshbasic_vert:yv,meshbasic_frag:Mv,meshlambert_vert:Sv,meshlambert_frag:Ev,meshmatcap_vert:Tv,meshmatcap_frag:wv,meshnormal_vert:Av,meshnormal_frag:Rv,meshphong_vert:Cv,meshphong_frag:Dv,meshphysical_vert:Pv,meshphysical_frag:Iv,meshtoon_vert:Lv,meshtoon_frag:Nv,points_vert:Fv,points_frag:Uv,shadow_vert:kv,shadow_frag:Ov,sprite_vert:Bv,sprite_frag:zv},ue={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Ln={basic:{uniforms:$t([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:$t([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ne(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:$t([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:$t([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:$t([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Ne(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:$t([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:$t([ue.points,ue.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:$t([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:$t([ue.common,ue.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:$t([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:$t([ue.sprite,ue.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:$t([ue.common,ue.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:$t([ue.lights,ue.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Ln.physical={uniforms:$t([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const aa={r:0,b:0,g:0},ki=new An,Vv=new Ve;function Hv(n,e,t,i,s,r){const a=new Ne(0);let o=s===!0?0:1,l,c,h=null,u=0,d=null;function f(y){let S=y.isScene===!0?y.background:null;if(S&&S.isTexture){const v=y.backgroundBlurriness>0;S=e.get(S,v)}return S}function p(y){let S=!1;const v=f(y);v===null?m(a,o):v&&v.isColor&&(m(v,1),S=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(y,S){const v=f(S);v&&(v.isCubeTexture||v.mapping===Ha)?(c===void 0&&(c=new ct(new js(1,1,1),new Ht({name:"BackgroundCubeMaterial",uniforms:ks(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),ki.copy(S.backgroundRotation),ki.x*=-1,ki.y*=-1,ki.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),c.material.uniforms.envMap.value=v,c.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Vv.makeRotationFromEuler(ki)),c.material.toneMapped=Ke.getTransfer(v.colorSpace)!==nt,(h!==v||u!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ct(new Gi(2,2),new Ht({name:"BackgroundMaterial",uniforms:ks(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(v.colorSpace)!==nt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,d=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,S){y.getRGB(aa,Kd(n)),t.buffers.color.setClear(aa.r,aa.g,aa.b,S,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,S=1){a.set(y),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:p,addToRenderList:_,dispose:g}}function Gv(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(A,I,F,H,B){let z=!1;const k=u(A,H,F,I);r!==k&&(r=k,c(r.object)),z=f(A,H,F,B),z&&p(A,H,F,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,v(A,I,F,H),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(A){return n.bindVertexArray(A)}function h(A){return n.deleteVertexArray(A)}function u(A,I,F,H){const B=H.wireframe===!0;let z=i[I.id];z===void 0&&(z={},i[I.id]=z);const k=A.isInstancedMesh===!0?A.id:0;let Q=z[k];Q===void 0&&(Q={},z[k]=Q);let $=Q[F.id];$===void 0&&($={},Q[F.id]=$);let se=$[B];return se===void 0&&(se=d(l()),$[B]=se),se}function d(A){const I=[],F=[],H=[];for(let B=0;B<t;B++)I[B]=0,F[B]=0,H[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:H,object:A,attributes:{},index:null}}function f(A,I,F,H){const B=r.attributes,z=I.attributes;let k=0;const Q=F.getAttributes();for(const $ in Q)if(Q[$].location>=0){const he=B[$];let le=z[$];if(le===void 0&&($==="instanceMatrix"&&A.instanceMatrix&&(le=A.instanceMatrix),$==="instanceColor"&&A.instanceColor&&(le=A.instanceColor)),he===void 0||he.attribute!==le||le&&he.data!==le.data)return!0;k++}return r.attributesNum!==k||r.index!==H}function p(A,I,F,H){const B={},z=I.attributes;let k=0;const Q=F.getAttributes();for(const $ in Q)if(Q[$].location>=0){let he=z[$];he===void 0&&($==="instanceMatrix"&&A.instanceMatrix&&(he=A.instanceMatrix),$==="instanceColor"&&A.instanceColor&&(he=A.instanceColor));const le={};le.attribute=he,he&&he.data&&(le.data=he.data),B[$]=le,k++}r.attributes=B,r.attributesNum=k,r.index=H}function _(){const A=r.newAttributes;for(let I=0,F=A.length;I<F;I++)A[I]=0}function m(A){g(A,0)}function g(A,I){const F=r.newAttributes,H=r.enabledAttributes,B=r.attributeDivisors;F[A]=1,H[A]===0&&(n.enableVertexAttribArray(A),H[A]=1),B[A]!==I&&(n.vertexAttribDivisor(A,I),B[A]=I)}function y(){const A=r.newAttributes,I=r.enabledAttributes;for(let F=0,H=I.length;F<H;F++)I[F]!==A[F]&&(n.disableVertexAttribArray(F),I[F]=0)}function S(A,I,F,H,B,z,k){k===!0?n.vertexAttribIPointer(A,I,F,B,z):n.vertexAttribPointer(A,I,F,H,B,z)}function v(A,I,F,H){_();const B=H.attributes,z=F.getAttributes(),k=I.defaultAttributeValues;for(const Q in z){const $=z[Q];if($.location>=0){let se=B[Q];if(se===void 0&&(Q==="instanceMatrix"&&A.instanceMatrix&&(se=A.instanceMatrix),Q==="instanceColor"&&A.instanceColor&&(se=A.instanceColor)),se!==void 0){const he=se.normalized,le=se.itemSize,K=e.get(se);if(K===void 0)continue;const ce=K.buffer,Ce=K.type,W=K.bytesPerElement,Z=Ce===n.INT||Ce===n.UNSIGNED_INT||se.gpuType===Rc;if(se.isInterleavedBufferAttribute){const ee=se.data,Re=ee.stride,ve=se.offset;if(ee.isInstancedInterleavedBuffer){for(let ke=0;ke<$.locationSize;ke++)g($.location+ke,ee.meshPerAttribute);A.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ke=0;ke<$.locationSize;ke++)m($.location+ke);n.bindBuffer(n.ARRAY_BUFFER,ce);for(let ke=0;ke<$.locationSize;ke++)S($.location+ke,le/$.locationSize,Ce,he,Re*W,(ve+le/$.locationSize*ke)*W,Z)}else{if(se.isInstancedBufferAttribute){for(let ee=0;ee<$.locationSize;ee++)g($.location+ee,se.meshPerAttribute);A.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ee=0;ee<$.locationSize;ee++)m($.location+ee);n.bindBuffer(n.ARRAY_BUFFER,ce);for(let ee=0;ee<$.locationSize;ee++)S($.location+ee,le/$.locationSize,Ce,he,le*W,le/$.locationSize*ee*W,Z)}}else if(k!==void 0){const he=k[Q];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv($.location,he);break;case 3:n.vertexAttrib3fv($.location,he);break;case 4:n.vertexAttrib4fv($.location,he);break;default:n.vertexAttrib1fv($.location,he)}}}}y()}function M(){E();for(const A in i){const I=i[A];for(const F in I){const H=I[F];for(const B in H){const z=H[B];for(const k in z)h(z[k].object),delete z[k];delete H[B]}}delete i[A]}}function w(A){if(i[A.id]===void 0)return;const I=i[A.id];for(const F in I){const H=I[F];for(const B in H){const z=H[B];for(const k in z)h(z[k].object),delete z[k];delete H[B]}}delete i[A.id]}function C(A){for(const I in i){const F=i[I];for(const H in F){const B=F[H];if(B[A.id]===void 0)continue;const z=B[A.id];for(const k in z)h(z[k].object),delete z[k];delete B[A.id]}}}function x(A){for(const I in i){const F=i[I],H=A.isInstancedMesh===!0?A.id:0,B=F[H];if(B!==void 0){for(const z in B){const k=B[z];for(const Q in k)h(k[Q].object),delete k[Q];delete B[z]}delete F[H],Object.keys(F).length===0&&delete i[I]}}}function E(){D(),a=!0,r!==s&&(r=s,c(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:D,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function Wv(n,e,t){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),t.update(h,i,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];t.update(f,i,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)a(c[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let p=0;for(let _=0;_<u;_++)p+=h[_]*d[_];t.update(p,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Xv(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==mn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const x=C===un&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==on&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==ln&&!x)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Pe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:v,maxSamples:M,samples:w}}function jv(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new yi,o=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,g=n.get(u);if(!s||p===null||p.length===0||r&&!m)r?h(null):c();else{const y=r?0:i,S=y*4;let v=g.clippingState||null;l.value=v,v=h(p,d,S,f);for(let M=0;M!==S;++M)v[M]=t[M];g.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,p){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,p!==!0||m===null){const g=f+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<g)&&(m=new Float32Array(g));for(let S=0,v=f;S!==_;++S,v+=4)a.copy(u[S]).applyMatrix4(y,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const Ai=4,pu=[.125,.215,.35,.446,.526,.582],Hi=20,qv=256,ar=new Dr,mu=new Ne;let Vo=null,Ho=0,Go=0,Wo=!1;const Yv=new L;class rc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=Yv}=r;Vo=this._renderer.getRenderTarget(),Ho=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_u(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Vo,Ho,Go),this._renderer.xr.enabled=Wo,e.scissorTest=!1,ms(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xi||e.mapping===Is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vo=this._renderer.getRenderTarget(),Ho=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:un,format:mn,colorSpace:Jt,depthBuffer:!1},s=gu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gu(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=$v(r)),this._blurMaterial=Zv(r,e,t),this._ggxMaterial=Kv(r,e,t)}return s}_compileMaterial(e){const t=new ct(new dn,e);this._renderer.compile(t,ar)}_sceneToCubeUV(e,t,i,s,r){const l=new qt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(mu),u.toneMapping=Hn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ct(new js,new Bn({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let g=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,g=!0):(m.color.copy(mu),g=!0);for(let S=0;S<6;S++){const v=S%3;v===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[S],r.y,r.z)):v===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[S]));const M=this._cubeSize;ms(s,v*M,S>2?M:0,M,M),u.setRenderTarget(s),g&&u.render(_,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Xi||e.mapping===Is;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_u());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ms(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,ar)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:p}=this,_=this._sizeLods[i],m=3*_*(i>p-Ai?i-p+Ai:0),g=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,ms(r,m,g,3*_,2*_),s.setRenderTarget(r),s.render(o,ar),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-i,ms(e,m,g,3*_,2*_),s.setRenderTarget(e),s.render(o,ar)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ue("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=c;const d=c.uniforms,f=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Hi-1),_=r/p,m=isFinite(r)?1+Math.floor(h*_):Hi;m>Hi&&Pe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);const g=[];let y=0;for(let C=0;C<Hi;++C){const x=C/_,E=Math.exp(-x*x/2);g.push(E),C===0?y+=E:C<m&&(y+=2*E)}for(let C=0;C<g.length;C++)g[C]=g[C]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=p,d.mipInt.value=S-i;const v=this._sizeLods[s],M=3*v*(s>S-Ai?s-S+Ai:0),w=4*(this._cubeSize-v);ms(t,M,w,3*v,2*v),l.setRenderTarget(t),l.render(u,ar)}}function $v(n){const e=[],t=[],i=[];let s=n;const r=n-Ai+1+pu.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Ai?l=pu[a-n+Ai-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,_=3,m=2,g=1,y=new Float32Array(_*p*f),S=new Float32Array(m*p*f),v=new Float32Array(g*p*f);for(let w=0;w<f;w++){const C=w%3*2/3-1,x=w>2?0:-1,E=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];y.set(E,_*p*w),S.set(d,m*p*w);const D=[w,w,w,w,w,w];v.set(D,g*p*w)}const M=new dn;M.setAttribute("position",new Zt(y,_)),M.setAttribute("uv",new Zt(S,m)),M.setAttribute("faceIndex",new Zt(v,g)),i.push(new ct(M,null)),s>Ai&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function gu(n,e,t){const i=new nn(n,e,t);return i.texture.mapping=Ha,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ms(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Kv(n,e,t){return new Ht({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:qv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ya(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function Zv(n,e,t){const i=new Float32Array(Hi),s=new L(0,1,0);return new Ht({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function _u(){return new Ht({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function vu(){return new Ht({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function Ya(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class af extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Yd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new js(5,5,5),r=new Ht({name:"CubemapFromEquirect",uniforms:ks(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Kt,blending:Vt});r.uniforms.tEquirect.value=t;const a=new ct(s,r),o=t.minFilter;return t.minFilter===si&&(t.minFilter=Pt),new Xg(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function Jv(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===co||f===ho)if(e.has(d)){const p=e.get(d).texture;return o(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const _=new af(p.height);return _.fromEquirectangularTexture(n,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,p=f===co||f===ho,_=f===Xi||f===Is;if(p||_){let m=t.get(d);const g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return i===null&&(i=new rc(n)),m=p?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const y=d.image;return p&&y&&y.height>0||_&&y&&l(y)?(i===null&&(i=new rc(n)),m=p?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,f){return f===co?d.mapping=Xi:f===ho&&(d.mapping=Is),d}function l(d){let f=0;const p=6;for(let _=0;_<p;_++)d[_]!==void 0&&f++;return f===p}function c(d){const f=d.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){const f=d.target;f.removeEventListener("dispose",h);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:u}}function Qv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Da("WebGLRenderer: "+i+" extension not supported."),s}}}function ex(n,e,t,i){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,p=u.attributes.position;let _=0;if(p===void 0)return;if(f!==null){const y=f.array;_=f.version;for(let S=0,v=y.length;S<v;S+=3){const M=y[S+0],w=y[S+1],C=y[S+2];d.push(M,w,w,C,C,M)}}else{const y=p.array;_=p.version;for(let S=0,v=y.length/3-1;S<v;S+=3){const M=S+0,w=S+1,C=S+2;d.push(M,w,w,C,C,M)}}const m=new(p.count>=65535?Wd:Gd)(d,1);m.version=_;const g=r.get(u);g&&e.remove(g),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function tx(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){n.drawElements(i,f,r,d*a),t.update(f,i,1)}function c(d,f,p){p!==0&&(n.drawElementsInstanced(i,f,r,d*a,p),t.update(f,i,p))}function h(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,p);let m=0;for(let g=0;g<p;g++)m+=f[g];t.update(m,i,1)}function u(d,f,p,_){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<d.length;g++)c(d[g]/a,f[g],_[g]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,_,0,p);let g=0;for(let y=0;y<p;y++)g+=f[y]*_[y];t.update(g,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function nx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Ue("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function ix(n,e,t){const i=new WeakMap,s=new _t;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let D=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",D)};var f=D;d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let v=0;p===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let M=o.attributes.position.count*v,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const C=new Float32Array(M*w*4*u),x=new Vd(C,M,w,u);x.type=ln,x.needsUpdate=!0;const E=v*4;for(let A=0;A<u;A++){const I=g[A],F=y[A],H=S[A],B=M*w*4*A;for(let z=0;z<I.count;z++){const k=z*E;p===!0&&(s.fromBufferAttribute(I,z),C[B+k+0]=s.x,C[B+k+1]=s.y,C[B+k+2]=s.z,C[B+k+3]=0),_===!0&&(s.fromBufferAttribute(F,z),C[B+k+4]=s.x,C[B+k+5]=s.y,C[B+k+6]=s.z,C[B+k+7]=0),m===!0&&(s.fromBufferAttribute(H,z),C[B+k+8]=s.x,C[B+k+9]=s.y,C[B+k+10]=s.z,C[B+k+11]=H.itemSize===4?s.w:1)}}d={count:u,texture:x,size:new Le(M,w)},i.set(o,d),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];const _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function sx(n,e,t,i,s){let r=new WeakMap;function a(c){const h=s.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const rx={[Mc]:"LINEAR_TONE_MAPPING",[Sc]:"REINHARD_TONE_MAPPING",[Ec]:"CINEON_TONE_MAPPING",[Cr]:"ACES_FILMIC_TONE_MAPPING",[wc]:"AGX_TONE_MAPPING",[Ac]:"NEUTRAL_TONE_MAPPING",[Tc]:"CUSTOM_TONE_MAPPING"};function ax(n,e,t,i,s){const r=new nn(e,t,{type:n,depthBuffer:i,stencilBuffer:s}),a=new nn(e,t,{type:un,depthBuffer:!1,stencilBuffer:!1}),o=new dn;o.setAttribute("position",new hn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new hn([0,2,0,0,2,0],2));const l=new Zd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new ct(o,l),h=new Dr(-1,1,1,-1,0,1);let u=null,d=null,f=!1,p,_=null,m=[],g=!1;this.setSize=function(y,S){r.setSize(y,S),a.setSize(y,S);for(let v=0;v<m.length;v++){const M=m[v];M.setSize&&M.setSize(y,S)}},this.setEffects=function(y){m=y,g=m.length>0&&m[0].isRenderPass===!0;const S=r.width,v=r.height;for(let M=0;M<m.length;M++){const w=m[M];w.setSize&&w.setSize(S,v)}},this.begin=function(y,S){if(f||y.toneMapping===Hn&&m.length===0)return!1;if(_=S,S!==null){const v=S.width,M=S.height;(r.width!==v||r.height!==M)&&this.setSize(v,M)}return g===!1&&y.setRenderTarget(r),p=y.toneMapping,y.toneMapping=Hn,!0},this.hasRenderPass=function(){return g},this.end=function(y,S){y.toneMapping=p,f=!0;let v=r,M=a;for(let w=0;w<m.length;w++){const C=m[w];if(C.enabled!==!1&&(C.render(y,M,v,S),C.needsSwap!==!1)){const x=v;v=M,M=x}}if(u!==y.outputColorSpace||d!==y.toneMapping){u=y.outputColorSpace,d=y.toneMapping,l.defines={},Ke.getTransfer(u)===nt&&(l.defines.SRGB_TRANSFER="");const w=rx[d];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=v.texture,y.setRenderTarget(_),y.render(c,h),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const of=new It,ac=new Us(1,1),lf=new Vd,cf=new Ym,hf=new Yd,xu=[],bu=[],yu=new Float32Array(16),Mu=new Float32Array(9),Su=new Float32Array(4);function Zs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=xu[s];if(r===void 0&&(r=new Float32Array(s),xu[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Nt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function $a(n,e){let t=bu[e];t===void 0&&(t=new Int32Array(e),bu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function ox(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function lx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2fv(this.addr,e),Nt(t,e)}}function cx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;n.uniform3fv(this.addr,e),Nt(t,e)}}function hx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4fv(this.addr,e),Nt(t,e)}}function ux(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,i))return;Su.set(i),n.uniformMatrix2fv(this.addr,!1,Su),Nt(t,i)}}function dx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,i))return;Mu.set(i),n.uniformMatrix3fv(this.addr,!1,Mu),Nt(t,i)}}function fx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,i))return;yu.set(i),n.uniformMatrix4fv(this.addr,!1,yu),Nt(t,i)}}function px(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function mx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2iv(this.addr,e),Nt(t,e)}}function gx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3iv(this.addr,e),Nt(t,e)}}function _x(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4iv(this.addr,e),Nt(t,e)}}function vx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function xx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2uiv(this.addr,e),Nt(t,e)}}function bx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3uiv(this.addr,e),Nt(t,e)}}function yx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4uiv(this.addr,e),Nt(t,e)}}function Mx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ac.compareFunction=t.isReversedDepthBuffer()?Fc:Nc,r=ac):r=of,t.setTexture2D(e||r,s)}function Sx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||cf,s)}function Ex(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||hf,s)}function Tx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||lf,s)}function wx(n){switch(n){case 5126:return ox;case 35664:return lx;case 35665:return cx;case 35666:return hx;case 35674:return ux;case 35675:return dx;case 35676:return fx;case 5124:case 35670:return px;case 35667:case 35671:return mx;case 35668:case 35672:return gx;case 35669:case 35673:return _x;case 5125:return vx;case 36294:return xx;case 36295:return bx;case 36296:return yx;case 35678:case 36198:case 36298:case 36306:case 35682:return Mx;case 35679:case 36299:case 36307:return Sx;case 35680:case 36300:case 36308:case 36293:return Ex;case 36289:case 36303:case 36311:case 36292:return Tx}}function Ax(n,e){n.uniform1fv(this.addr,e)}function Rx(n,e){const t=Zs(e,this.size,2);n.uniform2fv(this.addr,t)}function Cx(n,e){const t=Zs(e,this.size,3);n.uniform3fv(this.addr,t)}function Dx(n,e){const t=Zs(e,this.size,4);n.uniform4fv(this.addr,t)}function Px(n,e){const t=Zs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Ix(n,e){const t=Zs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Lx(n,e){const t=Zs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Nx(n,e){n.uniform1iv(this.addr,e)}function Fx(n,e){n.uniform2iv(this.addr,e)}function Ux(n,e){n.uniform3iv(this.addr,e)}function kx(n,e){n.uniform4iv(this.addr,e)}function Ox(n,e){n.uniform1uiv(this.addr,e)}function Bx(n,e){n.uniform2uiv(this.addr,e)}function zx(n,e){n.uniform3uiv(this.addr,e)}function Vx(n,e){n.uniform4uiv(this.addr,e)}function Hx(n,e,t){const i=this.cache,s=e.length,r=$a(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=ac:a=of;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Gx(n,e,t){const i=this.cache,s=e.length,r=$a(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||cf,r[a])}function Wx(n,e,t){const i=this.cache,s=e.length,r=$a(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||hf,r[a])}function Xx(n,e,t){const i=this.cache,s=e.length,r=$a(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||lf,r[a])}function jx(n){switch(n){case 5126:return Ax;case 35664:return Rx;case 35665:return Cx;case 35666:return Dx;case 35674:return Px;case 35675:return Ix;case 35676:return Lx;case 5124:case 35670:return Nx;case 35667:case 35671:return Fx;case 35668:case 35672:return Ux;case 35669:case 35673:return kx;case 5125:return Ox;case 36294:return Bx;case 36295:return zx;case 36296:return Vx;case 35678:case 36198:case 36298:case 36306:case 35682:return Hx;case 35679:case 36299:case 36307:return Gx;case 35680:case 36300:case 36308:case 36293:return Wx;case 36289:case 36303:case 36311:case 36292:return Xx}}class qx{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=wx(t.type)}}class Yx{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jx(t.type)}}class $x{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Xo=/(\w+)(\])?(\[|\.)?/g;function Eu(n,e){n.seq.push(e),n.map[e.id]=e}function Kx(n,e,t){const i=n.name,s=i.length;for(Xo.lastIndex=0;;){const r=Xo.exec(i),a=Xo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Eu(t,c===void 0?new qx(o,n,e):new Yx(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new $x(o),Eu(t,u)),t=u}}}class Ea{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Kx(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Tu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Zx=37297;let Jx=0;function Qx(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const wu=new Ge;function eb(n){Ke._getMatrix(wu,Ke.workingColorSpace,n);const e=`mat3( ${wu.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(n)){case Ra:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Au(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Qx(n.getShaderSource(e),o)}else return r}function tb(n,e){const t=eb(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const nb={[Mc]:"Linear",[Sc]:"Reinhard",[Ec]:"Cineon",[Cr]:"ACESFilmic",[wc]:"AgX",[Ac]:"Neutral",[Tc]:"Custom"};function ib(n,e){const t=nb[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const oa=new L;function sb(){Ke.getLuminanceCoefficients(oa);const n=oa.x.toFixed(4),e=oa.y.toFixed(4),t=oa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ur).join(`
`)}function ab(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ob(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ur(n){return n!==""}function Ru(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lb=/^[ \t]*#include +<([\w\d./]+)>/gm;function oc(n){return n.replace(lb,hb)}const cb=new Map;function hb(n,e){let t=We[e];if(t===void 0){const i=cb.get(e);if(i!==void 0)t=We[i],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return oc(t)}const ub=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Du(n){return n.replace(ub,db)}function db(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pu(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const fb={[va]:"SHADOWMAP_TYPE_PCF",[cr]:"SHADOWMAP_TYPE_VSM"};function pb(n){return fb[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const mb={[Xi]:"ENVMAP_TYPE_CUBE",[Is]:"ENVMAP_TYPE_CUBE",[Ha]:"ENVMAP_TYPE_CUBE_UV"};function gb(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":mb[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const _b={[Is]:"ENVMAP_MODE_REFRACTION"};function vb(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":_b[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const xb={[yc]:"ENVMAP_BLENDING_MULTIPLY",[om]:"ENVMAP_BLENDING_MIX",[lm]:"ENVMAP_BLENDING_ADD"};function bb(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":xb[n.combine]||"ENVMAP_BLENDING_NONE"}function yb(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Mb(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=pb(t),c=gb(t),h=vb(t),u=bb(t),d=yb(t),f=rb(t),p=ab(r),_=s.createProgram();let m,g,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ur).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ur).join(`
`),g.length>0&&(g+=`
`)):(m=[Pu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ur).join(`
`),g=[Pu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?We.tonemapping_pars_fragment:"",t.toneMapping!==Hn?ib("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,tb("linearToOutputTexel",t.outputColorSpace),sb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ur).join(`
`)),a=oc(a),a=Ru(a,t),a=Cu(a,t),o=oc(o),o=Ru(o,t),o=Cu(o,t),a=Du(a),o=Du(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Ah?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ah?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const S=y+m+a,v=y+g+o,M=Tu(s,s.VERTEX_SHADER,S),w=Tu(s,s.FRAGMENT_SHADER,v);s.attachShader(_,M),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(A){if(n.debug.checkShaderErrors){const I=s.getProgramInfoLog(_)||"",F=s.getShaderInfoLog(M)||"",H=s.getShaderInfoLog(w)||"",B=I.trim(),z=F.trim(),k=H.trim();let Q=!0,$=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,M,w);else{const se=Au(s,M,"vertex"),he=Au(s,w,"fragment");Ue("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+B+`
`+se+`
`+he)}else B!==""?Pe("WebGLProgram: Program Info Log:",B):(z===""||k==="")&&($=!1);$&&(A.diagnostics={runnable:Q,programLog:B,vertexShader:{log:z,prefix:m},fragmentShader:{log:k,prefix:g}})}s.deleteShader(M),s.deleteShader(w),x=new Ea(s,_),E=ob(s,_)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(_,Zx)),D},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Jx++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=w,this}let Sb=0;class Eb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Tb(e),t.set(e,i)),i}}class Tb{constructor(e){this.id=Sb++,this.code=e,this.usedTimes=0}}function wb(n,e,t,i,s,r){const a=new Oc,o=new Eb,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer;let d=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,E,D,A,I){const F=A.fog,H=I.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?A.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,k=e.get(x.envMap||B,z),Q=k&&k.mapping===Ha?k.image.height:null,$=f[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&Pe("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const se=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,he=se!==void 0?se.length:0;let le=0;H.morphAttributes.position!==void 0&&(le=1),H.morphAttributes.normal!==void 0&&(le=2),H.morphAttributes.color!==void 0&&(le=3);let K,ce,Ce,W;if($){const it=Ln[$];K=it.vertexShader,ce=it.fragmentShader}else K=x.vertexShader,ce=x.fragmentShader,o.update(x),Ce=o.getVertexShaderID(x),W=o.getFragmentShaderID(x);const Z=n.getRenderTarget(),ee=n.state.buffers.depth.getReversed(),Re=I.isInstancedMesh===!0,ve=I.isBatchedMesh===!0,ke=!!x.map,Mt=!!x.matcap,Ye=!!k,Je=!!x.aoMap,et=!!x.lightMap,ze=!!x.bumpMap,gt=!!x.normalMap,P=!!x.displacementMap,vt=!!x.emissiveMap,Ze=!!x.metalnessMap,tt=!!x.roughnessMap,be=x.anisotropy>0,R=x.clearcoat>0,b=x.dispersion>0,U=x.iridescence>0,Y=x.sheen>0,J=x.transmission>0,j=be&&!!x.anisotropyMap,ge=R&&!!x.clearcoatMap,re=R&&!!x.clearcoatNormalMap,Te=R&&!!x.clearcoatRoughnessMap,Fe=U&&!!x.iridescenceMap,te=U&&!!x.iridescenceThicknessMap,ae=Y&&!!x.sheenColorMap,ye=Y&&!!x.sheenRoughnessMap,Me=!!x.specularMap,fe=!!x.specularColorMap,Oe=!!x.specularIntensityMap,N=J&&!!x.transmissionMap,oe=J&&!!x.thicknessMap,ne=!!x.gradientMap,xe=!!x.alphaMap,ie=x.alphaTest>0,q=!!x.alphaHash,Se=!!x.extensions;let Be=Hn;x.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Be=n.toneMapping);const ft={shaderID:$,shaderType:x.type,shaderName:x.name,vertexShader:K,fragmentShader:ce,defines:x.defines,customVertexShaderID:Ce,customFragmentShaderID:W,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:ve,batchingColor:ve&&I._colorsTexture!==null,instancing:Re,instancingColor:Re&&I.instanceColor!==null,instancingMorph:Re&&I.morphTexture!==null,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Jt,alphaToCoverage:!!x.alphaToCoverage,map:ke,matcap:Mt,envMap:Ye,envMapMode:Ye&&k.mapping,envMapCubeUVHeight:Q,aoMap:Je,lightMap:et,bumpMap:ze,normalMap:gt,displacementMap:P,emissiveMap:vt,normalMapObjectSpace:gt&&x.normalMapType===pm,normalMapTangentSpace:gt&&x.normalMapType===Wa,metalnessMap:Ze,roughnessMap:tt,anisotropy:be,anisotropyMap:j,clearcoat:R,clearcoatMap:ge,clearcoatNormalMap:re,clearcoatRoughnessMap:Te,dispersion:b,iridescence:U,iridescenceMap:Fe,iridescenceThicknessMap:te,sheen:Y,sheenColorMap:ae,sheenRoughnessMap:ye,specularMap:Me,specularColorMap:fe,specularIntensityMap:Oe,transmission:J,transmissionMap:N,thicknessMap:oe,gradientMap:ne,opaque:x.transparent===!1&&x.blending===Ss&&x.alphaToCoverage===!1,alphaMap:xe,alphaTest:ie,alphaHash:q,combine:x.combine,mapUv:ke&&p(x.map.channel),aoMapUv:Je&&p(x.aoMap.channel),lightMapUv:et&&p(x.lightMap.channel),bumpMapUv:ze&&p(x.bumpMap.channel),normalMapUv:gt&&p(x.normalMap.channel),displacementMapUv:P&&p(x.displacementMap.channel),emissiveMapUv:vt&&p(x.emissiveMap.channel),metalnessMapUv:Ze&&p(x.metalnessMap.channel),roughnessMapUv:tt&&p(x.roughnessMap.channel),anisotropyMapUv:j&&p(x.anisotropyMap.channel),clearcoatMapUv:ge&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:re&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:te&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:ye&&p(x.sheenRoughnessMap.channel),specularMapUv:Me&&p(x.specularMap.channel),specularColorMapUv:fe&&p(x.specularColorMap.channel),specularIntensityMapUv:Oe&&p(x.specularIntensityMap.channel),transmissionMapUv:N&&p(x.transmissionMap.channel),thicknessMapUv:oe&&p(x.thicknessMap.channel),alphaMapUv:xe&&p(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(gt||be),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!H.attributes.uv&&(ke||xe),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&gt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ee,skinning:I.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:le,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Be,decodeVideoTexture:ke&&x.map.isVideoTexture===!0&&Ke.getTransfer(x.map.colorSpace)===nt,decodeVideoTextureEmissive:vt&&x.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(x.emissiveMap.colorSpace)===nt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Fn,flipSided:x.side===Kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Se&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&x.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ft.vertexUv1s=l.has(1),ft.vertexUv2s=l.has(2),ft.vertexUv3s=l.has(3),l.clear(),ft}function m(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)E.push(D),E.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(g(E,x),y(E,x),E.push(n.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function g(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function y(x,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),x.push(a.mask)}function S(x){const E=f[x.type];let D;if(E){const A=Ln[E];D=wi.clone(A.uniforms)}else D=x.uniforms;return D}function v(x,E){let D=h.get(E);return D!==void 0?++D.usedTimes:(D=new Mb(n,E,x,s),c.push(D),h.set(E,D)),D}function M(x){if(--x.usedTimes===0){const E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:S,acquireProgram:v,releaseProgram:M,releaseShaderCache:w,programs:c,dispose:C}}function Ab(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Rb(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Iu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Lu(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,_,m,g){let y=n[e];return y===void 0?(y={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:m,group:g},n[e]=y):(y.id=d.id,y.object=d,y.geometry=f,y.material=p,y.materialVariant=a(d),y.groupOrder=_,y.renderOrder=d.renderOrder,y.z=m,y.group=g),e++,y}function l(d,f,p,_,m,g){const y=o(d,f,p,_,m,g);p.transmission>0?i.push(y):p.transparent===!0?s.push(y):t.push(y)}function c(d,f,p,_,m,g){const y=o(d,f,p,_,m,g);p.transmission>0?i.unshift(y):p.transparent===!0?s.unshift(y):t.unshift(y)}function h(d,f){t.length>1&&t.sort(d||Rb),i.length>1&&i.sort(f||Iu),s.length>1&&s.sort(f||Iu)}function u(){for(let d=e,f=n.length;d<f;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function Cb(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Lu,n.set(i,[a])):s>=r.length?(a=new Lu,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Db(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ne};break;case"SpotLight":t={position:new L,direction:new L,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function Pb(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Ib=0;function Lb(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Nb(n){const e=new Db,t=Pb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const s=new L,r=new Ve,a=new Ve;function o(c){let h=0,u=0,d=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let f=0,p=0,_=0,m=0,g=0,y=0,S=0,v=0,M=0,w=0,C=0;c.sort(Lb);for(let E=0,D=c.length;E<D;E++){const A=c[E],I=A.color,F=A.intensity,H=A.distance;let B=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===Ns?B=A.shadow.map.texture:B=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)h+=I.r*F,u+=I.g*F,d+=I.b*F;else if(A.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(A.sh.coefficients[z],F);C++}else if(A.isDirectionalLight){const z=e.get(A);if(z.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const k=A.shadow,Q=t.get(A);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,i.directionalShadow[f]=Q,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=A.shadow.matrix,y++}i.directional[f]=z,f++}else if(A.isSpotLight){const z=e.get(A);z.position.setFromMatrixPosition(A.matrixWorld),z.color.copy(I).multiplyScalar(F),z.distance=H,z.coneCos=Math.cos(A.angle),z.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),z.decay=A.decay,i.spot[_]=z;const k=A.shadow;if(A.map&&(i.spotLightMap[M]=A.map,M++,k.updateMatrices(A),A.castShadow&&w++),i.spotLightMatrix[_]=k.matrix,A.castShadow){const Q=t.get(A);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,i.spotShadow[_]=Q,i.spotShadowMap[_]=B,v++}_++}else if(A.isRectAreaLight){const z=e.get(A);z.color.copy(I).multiplyScalar(F),z.halfWidth.set(A.width*.5,0,0),z.halfHeight.set(0,A.height*.5,0),i.rectArea[m]=z,m++}else if(A.isPointLight){const z=e.get(A);if(z.color.copy(A.color).multiplyScalar(A.intensity),z.distance=A.distance,z.decay=A.decay,A.castShadow){const k=A.shadow,Q=t.get(A);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,Q.shadowCameraNear=k.camera.near,Q.shadowCameraFar=k.camera.far,i.pointShadow[p]=Q,i.pointShadowMap[p]=B,i.pointShadowMatrix[p]=A.shadow.matrix,S++}i.point[p]=z,p++}else if(A.isHemisphereLight){const z=e.get(A);z.skyColor.copy(A.color).multiplyScalar(F),z.groundColor.copy(A.groundColor).multiplyScalar(F),i.hemi[g]=z,g++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_FLOAT_1,i.rectAreaLTC2=ue.LTC_FLOAT_2):(i.rectAreaLTC1=ue.LTC_HALF_1,i.rectAreaLTC2=ue.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const x=i.hash;(x.directionalLength!==f||x.pointLength!==p||x.spotLength!==_||x.rectAreaLength!==m||x.hemiLength!==g||x.numDirectionalShadows!==y||x.numPointShadows!==S||x.numSpotShadows!==v||x.numSpotMaps!==M||x.numLightProbes!==C)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=p,i.hemi.length=g,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=v+M-w,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,x.directionalLength=f,x.pointLength=p,x.spotLength=_,x.rectAreaLength=m,x.hemiLength=g,x.numDirectionalShadows=y,x.numPointShadows=S,x.numSpotShadows=v,x.numSpotMaps=M,x.numLightProbes=C,i.version=Ib++)}function l(c,h){let u=0,d=0,f=0,p=0,_=0;const m=h.matrixWorldInverse;for(let g=0,y=c.length;g<y;g++){const S=c[g];if(S.isDirectionalLight){const v=i.directional[u];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(S.isSpotLight){const v=i.spot[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(S.isRectAreaLight){const v=i.rectArea[p];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),p++}else if(S.isPointLight){const v=i.point[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function Nu(n){const e=new Nb(n),t=[],i=[];function s(h){c.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Fb(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Nu(n),e.set(s,[o])):r>=a.length?(o=new Nu(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Ub=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ob=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Bb=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Fu=new Ve,or=new L,jo=new L;function zb(n,e,t){let i=new Gc;const s=new Le,r=new Le,a=new _t,o=new Jd,l=new Eg,c={},h=t.maxTextureSize,u={[oi]:Kt,[Kt]:oi,[Fn]:Fn},d=new Ht({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:Ub,fragmentShader:kb}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new dn;p.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ct(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=va;let g=this.type;this.render=function(w,C,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Ad&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=va);const E=n.getRenderTarget(),D=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Vt),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=g!==this.type;F&&C.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(B=>B.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,B=w.length;H<B;H++){const z=w[H],k=z.shadow;if(k===void 0){Pe("WebGLShadowMap:",z,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const Q=k.getFrameExtents();s.multiply(Q),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,k.mapSize.y=r.y));const $=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=$,k.map===null||F===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===cr){if(z.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new nn(s.x,s.y,{format:Ns,type:un,minFilter:Pt,magFilter:Pt,generateMipmaps:!1}),k.map.texture.name=z.name+".shadowMap",k.map.depthTexture=new Us(s.x,s.y,ln),k.map.depthTexture.name=z.name+".shadowMapDepth",k.map.depthTexture.format=li,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=yt,k.map.depthTexture.magFilter=yt}else z.isPointLight?(k.map=new af(s.x),k.map.depthTexture=new vg(s.x,Gn)):(k.map=new nn(s.x,s.y),k.map.depthTexture=new Us(s.x,s.y,Gn)),k.map.depthTexture.name=z.name+".shadowMap",k.map.depthTexture.format=li,this.type===va?(k.map.depthTexture.compareFunction=$?Fc:Nc,k.map.depthTexture.minFilter=Pt,k.map.depthTexture.magFilter=Pt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=yt,k.map.depthTexture.magFilter=yt);k.camera.updateProjectionMatrix()}const se=k.map.isWebGLCubeRenderTarget?6:1;for(let he=0;he<se;he++){if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,he),n.clear();else{he===0&&(n.setRenderTarget(k.map),n.clear());const le=k.getViewport(he);a.set(r.x*le.x,r.y*le.y,r.x*le.z,r.y*le.w),I.viewport(a)}if(z.isPointLight){const le=k.camera,K=k.matrix,ce=z.distance||le.far;ce!==le.far&&(le.far=ce,le.updateProjectionMatrix()),or.setFromMatrixPosition(z.matrixWorld),le.position.copy(or),jo.copy(le.position),jo.add(Ob[he]),le.up.copy(Bb[he]),le.lookAt(jo),le.updateMatrixWorld(),K.makeTranslation(-or.x,-or.y,-or.z),Fu.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Fu,le.coordinateSystem,le.reversedDepth)}else k.updateMatrices(z);i=k.getFrustum(),v(C,x,k.camera,z,this.type)}k.isPointLightShadow!==!0&&this.type===cr&&y(k,x),k.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(E,D,A)};function y(w,C){const x=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new nn(s.x,s.y,{format:Ns,type:un})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(C,null,x,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(C,null,x,f,_,null)}function S(w,C,x,E){let D=null;const A=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(A!==void 0)D=A;else if(D=x.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const I=D.uuid,F=C.uuid;let H=c[I];H===void 0&&(H={},c[I]=H);let B=H[F];B===void 0&&(B=D.clone(),H[F]=B,C.addEventListener("dispose",M)),D=B}if(D.visible=C.visible,D.wireframe=C.wireframe,E===cr?D.side=C.shadowSide!==null?C.shadowSide:C.side:D.side=C.shadowSide!==null?C.shadowSide:u[C.side],D.alphaMap=C.alphaMap,D.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,D.map=C.map,D.clipShadows=C.clipShadows,D.clippingPlanes=C.clippingPlanes,D.clipIntersection=C.clipIntersection,D.displacementMap=C.displacementMap,D.displacementScale=C.displacementScale,D.displacementBias=C.displacementBias,D.wireframeLinewidth=C.wireframeLinewidth,D.linewidth=C.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const I=n.properties.get(D);I.light=x}return D}function v(w,C,x,E,D){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&D===cr)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);const F=e.update(w),H=w.material;if(Array.isArray(H)){const B=F.groups;for(let z=0,k=B.length;z<k;z++){const Q=B[z],$=H[Q.materialIndex];if($&&$.visible){const se=S(w,$,E,D);w.onBeforeShadow(n,w,C,x,F,se,Q),n.renderBufferDirect(x,null,F,se,w,Q),w.onAfterShadow(n,w,C,x,F,se,Q)}}}else if(H.visible){const B=S(w,H,E,D);w.onBeforeShadow(n,w,C,x,F,B,null),n.renderBufferDirect(x,null,F,B,w,null),w.onAfterShadow(n,w,C,x,F,B,null)}}const I=w.children;for(let F=0,H=I.length;F<H;F++)v(I[F],C,x,E,D)}function M(w){w.target.removeEventListener("dispose",M);for(const x in c){const E=c[x],D=w.target.uuid;D in E&&(E[D].dispose(),delete E[D])}}}function Vb(n,e){function t(){let N=!1;const oe=new _t;let ne=null;const xe=new _t(0,0,0,0);return{setMask:function(ie){ne!==ie&&!N&&(n.colorMask(ie,ie,ie,ie),ne=ie)},setLocked:function(ie){N=ie},setClear:function(ie,q,Se,Be,ft){ft===!0&&(ie*=Be,q*=Be,Se*=Be),oe.set(ie,q,Se,Be),xe.equals(oe)===!1&&(n.clearColor(ie,q,Se,Be),xe.copy(oe))},reset:function(){N=!1,ne=null,xe.set(-1,0,0,0)}}}function i(){let N=!1,oe=!1,ne=null,xe=null,ie=null;return{setReversed:function(q){if(oe!==q){const Se=e.get("EXT_clip_control");q?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT),oe=q;const Be=ie;ie=null,this.setClear(Be)}},getReversed:function(){return oe},setTest:function(q){q?Z(n.DEPTH_TEST):ee(n.DEPTH_TEST)},setMask:function(q){ne!==q&&!N&&(n.depthMask(q),ne=q)},setFunc:function(q){if(oe&&(q=wm[q]),xe!==q){switch(q){case pl:n.depthFunc(n.NEVER);break;case ml:n.depthFunc(n.ALWAYS);break;case gl:n.depthFunc(n.LESS);break;case Ps:n.depthFunc(n.LEQUAL);break;case _l:n.depthFunc(n.EQUAL);break;case vl:n.depthFunc(n.GEQUAL);break;case xl:n.depthFunc(n.GREATER);break;case bl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=q}},setLocked:function(q){N=q},setClear:function(q){ie!==q&&(ie=q,oe&&(q=1-q),n.clearDepth(q))},reset:function(){N=!1,ne=null,xe=null,ie=null,oe=!1}}}function s(){let N=!1,oe=null,ne=null,xe=null,ie=null,q=null,Se=null,Be=null,ft=null;return{setTest:function(it){N||(it?Z(n.STENCIL_TEST):ee(n.STENCIL_TEST))},setMask:function(it){oe!==it&&!N&&(n.stencilMask(it),oe=it)},setFunc:function(it,Yn,$n){(ne!==it||xe!==Yn||ie!==$n)&&(n.stencilFunc(it,Yn,$n),ne=it,xe=Yn,ie=$n)},setOp:function(it,Yn,$n){(q!==it||Se!==Yn||Be!==$n)&&(n.stencilOp(it,Yn,$n),q=it,Se=Yn,Be=$n)},setLocked:function(it){N=it},setClear:function(it){ft!==it&&(n.clearStencil(it),ft=it)},reset:function(){N=!1,oe=null,ne=null,xe=null,ie=null,q=null,Se=null,Be=null,ft=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,_=!1,m=null,g=null,y=null,S=null,v=null,M=null,w=null,C=new Ne(0,0,0),x=0,E=!1,D=null,A=null,I=null,F=null,H=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,k=0;const Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(Q)[1]),z=k>=1):Q.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),z=k>=2);let $=null,se={};const he=n.getParameter(n.SCISSOR_BOX),le=n.getParameter(n.VIEWPORT),K=new _t().fromArray(he),ce=new _t().fromArray(le);function Ce(N,oe,ne,xe){const ie=new Uint8Array(4),q=n.createTexture();n.bindTexture(N,q),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Se=0;Se<ne;Se++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,ie):n.texImage2D(oe+Se,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ie);return q}const W={};W[n.TEXTURE_2D]=Ce(n.TEXTURE_2D,n.TEXTURE_2D,1),W[n.TEXTURE_CUBE_MAP]=Ce(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[n.TEXTURE_2D_ARRAY]=Ce(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),W[n.TEXTURE_3D]=Ce(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(n.DEPTH_TEST),a.setFunc(Ps),ze(!1),gt(_h),Z(n.CULL_FACE),Je(Vt);function Z(N){h[N]!==!0&&(n.enable(N),h[N]=!0)}function ee(N){h[N]!==!1&&(n.disable(N),h[N]=!1)}function Re(N,oe){return u[N]!==oe?(n.bindFramebuffer(N,oe),u[N]=oe,N===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=oe),N===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function ve(N,oe){let ne=f,xe=!1;if(N){ne=d.get(oe),ne===void 0&&(ne=[],d.set(oe,ne));const ie=N.textures;if(ne.length!==ie.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let q=0,Se=ie.length;q<Se;q++)ne[q]=n.COLOR_ATTACHMENT0+q;ne.length=ie.length,xe=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,xe=!0);xe&&n.drawBuffers(ne)}function ke(N){return p!==N?(n.useProgram(N),p=N,!0):!1}const Mt={[ni]:n.FUNC_ADD,[qp]:n.FUNC_SUBTRACT,[Yp]:n.FUNC_REVERSE_SUBTRACT};Mt[$p]=n.MIN,Mt[Kp]=n.MAX;const Ye={[ul]:n.ZERO,[Zp]:n.ONE,[Jp]:n.SRC_COLOR,[dl]:n.SRC_ALPHA,[nm]:n.SRC_ALPHA_SATURATE,[Dd]:n.DST_COLOR,[Cd]:n.DST_ALPHA,[Qp]:n.ONE_MINUS_SRC_COLOR,[fl]:n.ONE_MINUS_SRC_ALPHA,[tm]:n.ONE_MINUS_DST_COLOR,[em]:n.ONE_MINUS_DST_ALPHA,[im]:n.CONSTANT_COLOR,[sm]:n.ONE_MINUS_CONSTANT_COLOR,[rm]:n.CONSTANT_ALPHA,[am]:n.ONE_MINUS_CONSTANT_ALPHA};function Je(N,oe,ne,xe,ie,q,Se,Be,ft,it){if(N===Vt){_===!0&&(ee(n.BLEND),_=!1);return}if(_===!1&&(Z(n.BLEND),_=!0),N!==Rd){if(N!==m||it!==E){if((g!==ni||v!==ni)&&(n.blendEquation(n.FUNC_ADD),g=ni,v=ni),it)switch(N){case Ss:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vh:n.blendFunc(n.ONE,n.ONE);break;case xh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case bh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ue("WebGLState: Invalid blending: ",N);break}else switch(N){case Ss:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vh:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case xh:Ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bh:Ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ue("WebGLState: Invalid blending: ",N);break}y=null,S=null,M=null,w=null,C.set(0,0,0),x=0,m=N,E=it}return}ie=ie||oe,q=q||ne,Se=Se||xe,(oe!==g||ie!==v)&&(n.blendEquationSeparate(Mt[oe],Mt[ie]),g=oe,v=ie),(ne!==y||xe!==S||q!==M||Se!==w)&&(n.blendFuncSeparate(Ye[ne],Ye[xe],Ye[q],Ye[Se]),y=ne,S=xe,M=q,w=Se),(Be.equals(C)===!1||ft!==x)&&(n.blendColor(Be.r,Be.g,Be.b,ft),C.copy(Be),x=ft),m=N,E=!1}function et(N,oe){N.side===Fn?ee(n.CULL_FACE):Z(n.CULL_FACE);let ne=N.side===Kt;oe&&(ne=!ne),ze(ne),N.blending===Ss&&N.transparent===!1?Je(Vt):Je(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const xe=N.stencilWrite;o.setTest(xe),xe&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),vt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Z(n.SAMPLE_ALPHA_TO_COVERAGE):ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function ze(N){D!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),D=N)}function gt(N){N!==Xp?(Z(n.CULL_FACE),N!==A&&(N===_h?n.cullFace(n.BACK):N===jp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ee(n.CULL_FACE),A=N}function P(N){N!==I&&(z&&n.lineWidth(N),I=N)}function vt(N,oe,ne){N?(Z(n.POLYGON_OFFSET_FILL),(F!==oe||H!==ne)&&(F=oe,H=ne,a.getReversed()&&(oe=-oe),n.polygonOffset(oe,ne))):ee(n.POLYGON_OFFSET_FILL)}function Ze(N){N?Z(n.SCISSOR_TEST):ee(n.SCISSOR_TEST)}function tt(N){N===void 0&&(N=n.TEXTURE0+B-1),$!==N&&(n.activeTexture(N),$=N)}function be(N,oe,ne){ne===void 0&&($===null?ne=n.TEXTURE0+B-1:ne=$);let xe=se[ne];xe===void 0&&(xe={type:void 0,texture:void 0},se[ne]=xe),(xe.type!==N||xe.texture!==oe)&&($!==ne&&(n.activeTexture(ne),$=ne),n.bindTexture(N,oe||W[N]),xe.type=N,xe.texture=oe)}function R(){const N=se[$];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function b(){try{n.compressedTexImage2D(...arguments)}catch(N){Ue("WebGLState:",N)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(N){Ue("WebGLState:",N)}}function Y(){try{n.texSubImage2D(...arguments)}catch(N){Ue("WebGLState:",N)}}function J(){try{n.texSubImage3D(...arguments)}catch(N){Ue("WebGLState:",N)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(N){Ue("WebGLState:",N)}}function ge(){try{n.compressedTexSubImage3D(...arguments)}catch(N){Ue("WebGLState:",N)}}function re(){try{n.texStorage2D(...arguments)}catch(N){Ue("WebGLState:",N)}}function Te(){try{n.texStorage3D(...arguments)}catch(N){Ue("WebGLState:",N)}}function Fe(){try{n.texImage2D(...arguments)}catch(N){Ue("WebGLState:",N)}}function te(){try{n.texImage3D(...arguments)}catch(N){Ue("WebGLState:",N)}}function ae(N){K.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),K.copy(N))}function ye(N){ce.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),ce.copy(N))}function Me(N,oe){let ne=c.get(oe);ne===void 0&&(ne=new WeakMap,c.set(oe,ne));let xe=ne.get(N);xe===void 0&&(xe=n.getUniformBlockIndex(oe,N.name),ne.set(N,xe))}function fe(N,oe){const xe=c.get(oe).get(N);l.get(oe)!==xe&&(n.uniformBlockBinding(oe,xe,N.__bindingPointIndex),l.set(oe,xe))}function Oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},$=null,se={},u={},d=new WeakMap,f=[],p=null,_=!1,m=null,g=null,y=null,S=null,v=null,M=null,w=null,C=new Ne(0,0,0),x=0,E=!1,D=null,A=null,I=null,F=null,H=null,K.set(0,0,n.canvas.width,n.canvas.height),ce.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Z,disable:ee,bindFramebuffer:Re,drawBuffers:ve,useProgram:ke,setBlending:Je,setMaterial:et,setFlipSided:ze,setCullFace:gt,setLineWidth:P,setPolygonOffset:vt,setScissorTest:Ze,activeTexture:tt,bindTexture:be,unbindTexture:R,compressedTexImage2D:b,compressedTexImage3D:U,texImage2D:Fe,texImage3D:te,updateUBOMapping:Me,uniformBlockBinding:fe,texStorage2D:re,texStorage3D:Te,texSubImage2D:Y,texSubImage3D:J,compressedTexSubImage2D:j,compressedTexSubImage3D:ge,scissor:ae,viewport:ye,reset:Oe}}function Hb(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Le,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,b){return f?new OffscreenCanvas(R,b):br("canvas")}function _(R,b,U){let Y=1;const J=be(R);if((J.width>U||J.height>U)&&(Y=U/Math.max(J.width,J.height)),Y<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const j=Math.floor(Y*J.width),ge=Math.floor(Y*J.height);u===void 0&&(u=p(j,ge));const re=b?p(j,ge):u;return re.width=j,re.height=ge,re.getContext("2d").drawImage(R,0,0,j,ge),Pe("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+j+"x"+ge+")."),re}else return"data"in R&&Pe("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function m(R){return R.generateMipmaps}function g(R){n.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(R,b,U,Y,J=!1){if(R!==null){if(n[R]!==void 0)return n[R];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let j=b;if(b===n.RED&&(U===n.FLOAT&&(j=n.R32F),U===n.HALF_FLOAT&&(j=n.R16F),U===n.UNSIGNED_BYTE&&(j=n.R8)),b===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.R8UI),U===n.UNSIGNED_SHORT&&(j=n.R16UI),U===n.UNSIGNED_INT&&(j=n.R32UI),U===n.BYTE&&(j=n.R8I),U===n.SHORT&&(j=n.R16I),U===n.INT&&(j=n.R32I)),b===n.RG&&(U===n.FLOAT&&(j=n.RG32F),U===n.HALF_FLOAT&&(j=n.RG16F),U===n.UNSIGNED_BYTE&&(j=n.RG8)),b===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RG8UI),U===n.UNSIGNED_SHORT&&(j=n.RG16UI),U===n.UNSIGNED_INT&&(j=n.RG32UI),U===n.BYTE&&(j=n.RG8I),U===n.SHORT&&(j=n.RG16I),U===n.INT&&(j=n.RG32I)),b===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RGB8UI),U===n.UNSIGNED_SHORT&&(j=n.RGB16UI),U===n.UNSIGNED_INT&&(j=n.RGB32UI),U===n.BYTE&&(j=n.RGB8I),U===n.SHORT&&(j=n.RGB16I),U===n.INT&&(j=n.RGB32I)),b===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),U===n.UNSIGNED_INT&&(j=n.RGBA32UI),U===n.BYTE&&(j=n.RGBA8I),U===n.SHORT&&(j=n.RGBA16I),U===n.INT&&(j=n.RGBA32I)),b===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),b===n.RGBA){const ge=J?Ra:Ke.getTransfer(Y);U===n.FLOAT&&(j=n.RGBA32F),U===n.HALF_FLOAT&&(j=n.RGBA16F),U===n.UNSIGNED_BYTE&&(j=ge===nt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function v(R,b){let U;return R?b===null||b===Gn||b===Ls?U=n.DEPTH24_STENCIL8:b===ln?U=n.DEPTH32F_STENCIL8:b===gr&&(U=n.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Gn||b===Ls?U=n.DEPTH_COMPONENT24:b===ln?U=n.DEPTH_COMPONENT32F:b===gr&&(U=n.DEPTH_COMPONENT16),U}function M(R,b){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==yt&&R.minFilter!==Pt?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function w(R){const b=R.target;b.removeEventListener("dispose",w),x(b),b.isVideoTexture&&h.delete(b)}function C(R){const b=R.target;b.removeEventListener("dispose",C),D(b)}function x(R){const b=i.get(R);if(b.__webglInit===void 0)return;const U=R.source,Y=d.get(U);if(Y){const J=Y[b.__cacheKey];J.usedTimes--,J.usedTimes===0&&E(R),Object.keys(Y).length===0&&d.delete(U)}i.remove(R)}function E(R){const b=i.get(R);n.deleteTexture(b.__webglTexture);const U=R.source,Y=d.get(U);delete Y[b.__cacheKey],a.memory.textures--}function D(R){const b=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(b.__webglFramebuffer[Y]))for(let J=0;J<b.__webglFramebuffer[Y].length;J++)n.deleteFramebuffer(b.__webglFramebuffer[Y][J]);else n.deleteFramebuffer(b.__webglFramebuffer[Y]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[Y])}else{if(Array.isArray(b.__webglFramebuffer))for(let Y=0;Y<b.__webglFramebuffer.length;Y++)n.deleteFramebuffer(b.__webglFramebuffer[Y]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Y=0;Y<b.__webglColorRenderbuffer.length;Y++)b.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[Y]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const U=R.textures;for(let Y=0,J=U.length;Y<J;Y++){const j=i.get(U[Y]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),a.memory.textures--),i.remove(U[Y])}i.remove(R)}let A=0;function I(){A=0}function F(){const R=A;return R>=s.maxTextures&&Pe("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),A+=1,R}function H(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function B(R,b){const U=i.get(R);if(R.isVideoTexture&&Ze(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&U.__version!==R.version){const Y=R.image;if(Y===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{W(U,R,b);return}}else R.isExternalTexture&&(U.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+b)}function z(R,b){const U=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&U.__version!==R.version){W(U,R,b);return}else R.isExternalTexture&&(U.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+b)}function k(R,b){const U=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&U.__version!==R.version){W(U,R,b);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+b)}function Q(R,b){const U=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&U.__version!==R.version){Z(U,R,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+b)}const $={[Ci]:n.REPEAT,[Un]:n.CLAMP_TO_EDGE,[Aa]:n.MIRRORED_REPEAT},se={[yt]:n.NEAREST,[Id]:n.NEAREST_MIPMAP_NEAREST,[hr]:n.NEAREST_MIPMAP_LINEAR,[Pt]:n.LINEAR,[xa]:n.LINEAR_MIPMAP_NEAREST,[si]:n.LINEAR_MIPMAP_LINEAR},he={[mm]:n.NEVER,[bm]:n.ALWAYS,[gm]:n.LESS,[Nc]:n.LEQUAL,[_m]:n.EQUAL,[Fc]:n.GEQUAL,[vm]:n.GREATER,[xm]:n.NOTEQUAL};function le(R,b){if(b.type===ln&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Pt||b.magFilter===xa||b.magFilter===hr||b.magFilter===si||b.minFilter===Pt||b.minFilter===xa||b.minFilter===hr||b.minFilter===si)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,$[b.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,$[b.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,$[b.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,se[b.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,se[b.minFilter]),b.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,he[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===yt||b.minFilter!==hr&&b.minFilter!==si||b.type===ln&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(R,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function K(R,b){let U=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",w));const Y=b.source;let J=d.get(Y);J===void 0&&(J={},d.set(Y,J));const j=H(b);if(j!==R.__cacheKey){J[j]===void 0&&(J[j]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,U=!0),J[j].usedTimes++;const ge=J[R.__cacheKey];ge!==void 0&&(J[R.__cacheKey].usedTimes--,ge.usedTimes===0&&E(b)),R.__cacheKey=j,R.__webglTexture=J[j].texture}return U}function ce(R,b,U){return Math.floor(Math.floor(R/U)/b)}function Ce(R,b,U,Y){const j=R.updateRanges;if(j.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,U,Y,b.data);else{j.sort((te,ae)=>te.start-ae.start);let ge=0;for(let te=1;te<j.length;te++){const ae=j[ge],ye=j[te],Me=ae.start+ae.count,fe=ce(ye.start,b.width,4),Oe=ce(ae.start,b.width,4);ye.start<=Me+1&&fe===Oe&&ce(ye.start+ye.count-1,b.width,4)===fe?ae.count=Math.max(ae.count,ye.start+ye.count-ae.start):(++ge,j[ge]=ye)}j.length=ge+1;const re=n.getParameter(n.UNPACK_ROW_LENGTH),Te=n.getParameter(n.UNPACK_SKIP_PIXELS),Fe=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let te=0,ae=j.length;te<ae;te++){const ye=j[te],Me=Math.floor(ye.start/4),fe=Math.ceil(ye.count/4),Oe=Me%b.width,N=Math.floor(Me/b.width),oe=fe,ne=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Oe),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Oe,N,oe,ne,U,Y,b.data)}R.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,re),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Te),n.pixelStorei(n.UNPACK_SKIP_ROWS,Fe)}}function W(R,b,U){let Y=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Y=n.TEXTURE_3D);const J=K(R,b),j=b.source;t.bindTexture(Y,R.__webglTexture,n.TEXTURE0+U);const ge=i.get(j);if(j.version!==ge.__version||J===!0){t.activeTexture(n.TEXTURE0+U);const re=Ke.getPrimaries(Ke.workingColorSpace),Te=b.colorSpace===Si?null:Ke.getPrimaries(b.colorSpace),Fe=b.colorSpace===Si||re===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);let te=_(b.image,!1,s.maxTextureSize);te=tt(b,te);const ae=r.convert(b.format,b.colorSpace),ye=r.convert(b.type);let Me=S(b.internalFormat,ae,ye,b.colorSpace,b.isVideoTexture);le(Y,b);let fe;const Oe=b.mipmaps,N=b.isVideoTexture!==!0,oe=ge.__version===void 0||J===!0,ne=j.dataReady,xe=M(b,te);if(b.isDepthTexture)Me=v(b.format===Ti,b.type),oe&&(N?t.texStorage2D(n.TEXTURE_2D,1,Me,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,Me,te.width,te.height,0,ae,ye,null));else if(b.isDataTexture)if(Oe.length>0){N&&oe&&t.texStorage2D(n.TEXTURE_2D,xe,Me,Oe[0].width,Oe[0].height);for(let ie=0,q=Oe.length;ie<q;ie++)fe=Oe[ie],N?ne&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,fe.width,fe.height,ae,ye,fe.data):t.texImage2D(n.TEXTURE_2D,ie,Me,fe.width,fe.height,0,ae,ye,fe.data);b.generateMipmaps=!1}else N?(oe&&t.texStorage2D(n.TEXTURE_2D,xe,Me,te.width,te.height),ne&&Ce(b,te,ae,ye)):t.texImage2D(n.TEXTURE_2D,0,Me,te.width,te.height,0,ae,ye,te.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){N&&oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Me,Oe[0].width,Oe[0].height,te.depth);for(let ie=0,q=Oe.length;ie<q;ie++)if(fe=Oe[ie],b.format!==mn)if(ae!==null)if(N){if(ne)if(b.layerUpdates.size>0){const Se=fu(fe.width,fe.height,b.format,b.type);for(const Be of b.layerUpdates){const ft=fe.data.subarray(Be*Se/fe.data.BYTES_PER_ELEMENT,(Be+1)*Se/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,Be,fe.width,fe.height,1,ae,ft)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,te.depth,ae,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ie,Me,fe.width,fe.height,te.depth,0,fe.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?ne&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,te.depth,ae,ye,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ie,Me,fe.width,fe.height,te.depth,0,ae,ye,fe.data)}else{N&&oe&&t.texStorage2D(n.TEXTURE_2D,xe,Me,Oe[0].width,Oe[0].height);for(let ie=0,q=Oe.length;ie<q;ie++)fe=Oe[ie],b.format!==mn?ae!==null?N?ne&&t.compressedTexSubImage2D(n.TEXTURE_2D,ie,0,0,fe.width,fe.height,ae,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ie,Me,fe.width,fe.height,0,fe.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?ne&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,fe.width,fe.height,ae,ye,fe.data):t.texImage2D(n.TEXTURE_2D,ie,Me,fe.width,fe.height,0,ae,ye,fe.data)}else if(b.isDataArrayTexture)if(N){if(oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Me,te.width,te.height,te.depth),ne)if(b.layerUpdates.size>0){const ie=fu(te.width,te.height,b.format,b.type);for(const q of b.layerUpdates){const Se=te.data.subarray(q*ie/te.data.BYTES_PER_ELEMENT,(q+1)*ie/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,q,te.width,te.height,1,ae,ye,Se)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ae,ye,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,te.width,te.height,te.depth,0,ae,ye,te.data);else if(b.isData3DTexture)N?(oe&&t.texStorage3D(n.TEXTURE_3D,xe,Me,te.width,te.height,te.depth),ne&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ae,ye,te.data)):t.texImage3D(n.TEXTURE_3D,0,Me,te.width,te.height,te.depth,0,ae,ye,te.data);else if(b.isFramebufferTexture){if(oe)if(N)t.texStorage2D(n.TEXTURE_2D,xe,Me,te.width,te.height);else{let ie=te.width,q=te.height;for(let Se=0;Se<xe;Se++)t.texImage2D(n.TEXTURE_2D,Se,Me,ie,q,0,ae,ye,null),ie>>=1,q>>=1}}else if(Oe.length>0){if(N&&oe){const ie=be(Oe[0]);t.texStorage2D(n.TEXTURE_2D,xe,Me,ie.width,ie.height)}for(let ie=0,q=Oe.length;ie<q;ie++)fe=Oe[ie],N?ne&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,ae,ye,fe):t.texImage2D(n.TEXTURE_2D,ie,Me,ae,ye,fe);b.generateMipmaps=!1}else if(N){if(oe){const ie=be(te);t.texStorage2D(n.TEXTURE_2D,xe,Me,ie.width,ie.height)}ne&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,ye,te)}else t.texImage2D(n.TEXTURE_2D,0,Me,ae,ye,te);m(b)&&g(Y),ge.__version=j.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Z(R,b,U){if(b.image.length!==6)return;const Y=K(R,b),J=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+U);const j=i.get(J);if(J.version!==j.__version||Y===!0){t.activeTexture(n.TEXTURE0+U);const ge=Ke.getPrimaries(Ke.workingColorSpace),re=b.colorSpace===Si?null:Ke.getPrimaries(b.colorSpace),Te=b.colorSpace===Si||ge===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Fe=b.isCompressedTexture||b.image[0].isCompressedTexture,te=b.image[0]&&b.image[0].isDataTexture,ae=[];for(let q=0;q<6;q++)!Fe&&!te?ae[q]=_(b.image[q],!0,s.maxCubemapSize):ae[q]=te?b.image[q].image:b.image[q],ae[q]=tt(b,ae[q]);const ye=ae[0],Me=r.convert(b.format,b.colorSpace),fe=r.convert(b.type),Oe=S(b.internalFormat,Me,fe,b.colorSpace),N=b.isVideoTexture!==!0,oe=j.__version===void 0||Y===!0,ne=J.dataReady;let xe=M(b,ye);le(n.TEXTURE_CUBE_MAP,b);let ie;if(Fe){N&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Oe,ye.width,ye.height);for(let q=0;q<6;q++){ie=ae[q].mipmaps;for(let Se=0;Se<ie.length;Se++){const Be=ie[Se];b.format!==mn?Me!==null?N?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Se,0,0,Be.width,Be.height,Me,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Se,Oe,Be.width,Be.height,0,Be.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Se,0,0,Be.width,Be.height,Me,fe,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Se,Oe,Be.width,Be.height,0,Me,fe,Be.data)}}}else{if(ie=b.mipmaps,N&&oe){ie.length>0&&xe++;const q=be(ae[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Oe,q.width,q.height)}for(let q=0;q<6;q++)if(te){N?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ae[q].width,ae[q].height,Me,fe,ae[q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Oe,ae[q].width,ae[q].height,0,Me,fe,ae[q].data);for(let Se=0;Se<ie.length;Se++){const ft=ie[Se].image[q].image;N?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Se+1,0,0,ft.width,ft.height,Me,fe,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Se+1,Oe,ft.width,ft.height,0,Me,fe,ft.data)}}else{N?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Me,fe,ae[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Oe,Me,fe,ae[q]);for(let Se=0;Se<ie.length;Se++){const Be=ie[Se];N?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Se+1,0,0,Me,fe,Be.image[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Se+1,Oe,Me,fe,Be.image[q])}}}m(b)&&g(n.TEXTURE_CUBE_MAP),j.__version=J.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function ee(R,b,U,Y,J,j){const ge=r.convert(U.format,U.colorSpace),re=r.convert(U.type),Te=S(U.internalFormat,ge,re,U.colorSpace),Fe=i.get(b),te=i.get(U);if(te.__renderTarget=b,!Fe.__hasExternalTextures){const ae=Math.max(1,b.width>>j),ye=Math.max(1,b.height>>j);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,j,Te,ae,ye,b.depth,0,ge,re,null):t.texImage2D(J,j,Te,ae,ye,0,ge,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),vt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,J,te.__webglTexture,0,P(b)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,J,te.__webglTexture,j),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Re(R,b,U){if(n.bindRenderbuffer(n.RENDERBUFFER,R),b.depthBuffer){const Y=b.depthTexture,J=Y&&Y.isDepthTexture?Y.type:null,j=v(b.stencilBuffer,J),ge=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;vt(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,P(b),j,b.width,b.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,P(b),j,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,j,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ge,n.RENDERBUFFER,R)}else{const Y=b.textures;for(let J=0;J<Y.length;J++){const j=Y[J],ge=r.convert(j.format,j.colorSpace),re=r.convert(j.type),Te=S(j.internalFormat,ge,re,j.colorSpace);vt(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,P(b),Te,b.width,b.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,P(b),Te,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Te,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ve(R,b,U){const Y=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=i.get(b.depthTexture);if(J.__renderTarget=b,(!J.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Y){if(J.__webglInit===void 0&&(J.__webglInit=!0,b.depthTexture.addEventListener("dispose",w)),J.__webglTexture===void 0){J.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),le(n.TEXTURE_CUBE_MAP,b.depthTexture);const Fe=r.convert(b.depthTexture.format),te=r.convert(b.depthTexture.type);let ae;b.depthTexture.format===li?ae=n.DEPTH_COMPONENT24:b.depthTexture.format===Ti&&(ae=n.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,ae,b.width,b.height,0,Fe,te,null)}}else B(b.depthTexture,0);const j=J.__webglTexture,ge=P(b),re=Y?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,Te=b.depthTexture.format===Ti?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===li)vt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Te,re,j,0,ge):n.framebufferTexture2D(n.FRAMEBUFFER,Te,re,j,0);else if(b.depthTexture.format===Ti)vt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Te,re,j,0,ge):n.framebufferTexture2D(n.FRAMEBUFFER,Te,re,j,0);else throw new Error("Unknown depthTexture format")}function ke(R){const b=i.get(R),U=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const Y=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Y){const J=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Y.removeEventListener("dispose",J)};Y.addEventListener("dispose",J),b.__depthDisposeCallback=J}b.__boundDepthTexture=Y}if(R.depthTexture&&!b.__autoAllocateDepthBuffer)if(U)for(let Y=0;Y<6;Y++)ve(b.__webglFramebuffer[Y],R,Y);else{const Y=R.texture.mipmaps;Y&&Y.length>0?ve(b.__webglFramebuffer[0],R,0):ve(b.__webglFramebuffer,R,0)}else if(U){b.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[Y]),b.__webglDepthbuffer[Y]===void 0)b.__webglDepthbuffer[Y]=n.createRenderbuffer(),Re(b.__webglDepthbuffer[Y],R,!1);else{const J=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,j)}}else{const Y=R.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),Re(b.__webglDepthbuffer,R,!1);else{const J=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,j)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Mt(R,b,U){const Y=i.get(R);b!==void 0&&ee(Y.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&ke(R)}function Ye(R){const b=R.texture,U=i.get(R),Y=i.get(b);R.addEventListener("dispose",C);const J=R.textures,j=R.isWebGLCubeRenderTarget===!0,ge=J.length>1;if(ge||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=b.version,a.memory.textures++),j){U.__webglFramebuffer=[];for(let re=0;re<6;re++)if(b.mipmaps&&b.mipmaps.length>0){U.__webglFramebuffer[re]=[];for(let Te=0;Te<b.mipmaps.length;Te++)U.__webglFramebuffer[re][Te]=n.createFramebuffer()}else U.__webglFramebuffer[re]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){U.__webglFramebuffer=[];for(let re=0;re<b.mipmaps.length;re++)U.__webglFramebuffer[re]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(ge)for(let re=0,Te=J.length;re<Te;re++){const Fe=i.get(J[re]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=n.createTexture(),a.memory.textures++)}if(R.samples>0&&vt(R)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){const Te=J[re];U.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[re]);const Fe=r.convert(Te.format,Te.colorSpace),te=r.convert(Te.type),ae=S(Te.internalFormat,Fe,te,Te.colorSpace,R.isXRRenderTarget===!0),ye=P(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,ae,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,U.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Re(U.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),le(n.TEXTURE_CUBE_MAP,b);for(let re=0;re<6;re++)if(b.mipmaps&&b.mipmaps.length>0)for(let Te=0;Te<b.mipmaps.length;Te++)ee(U.__webglFramebuffer[re][Te],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Te);else ee(U.__webglFramebuffer[re],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(b)&&g(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let re=0,Te=J.length;re<Te;re++){const Fe=J[re],te=i.get(Fe);let ae=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ae=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,te.__webglTexture),le(ae,Fe),ee(U.__webglFramebuffer,R,Fe,n.COLOR_ATTACHMENT0+re,ae,0),m(Fe)&&g(ae)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(re=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,Y.__webglTexture),le(re,b),b.mipmaps&&b.mipmaps.length>0)for(let Te=0;Te<b.mipmaps.length;Te++)ee(U.__webglFramebuffer[Te],R,b,n.COLOR_ATTACHMENT0,re,Te);else ee(U.__webglFramebuffer,R,b,n.COLOR_ATTACHMENT0,re,0);m(b)&&g(re),t.unbindTexture()}R.depthBuffer&&ke(R)}function Je(R){const b=R.textures;for(let U=0,Y=b.length;U<Y;U++){const J=b[U];if(m(J)){const j=y(R),ge=i.get(J).__webglTexture;t.bindTexture(j,ge),g(j),t.unbindTexture()}}}const et=[],ze=[];function gt(R){if(R.samples>0){if(vt(R)===!1){const b=R.textures,U=R.width,Y=R.height;let J=n.COLOR_BUFFER_BIT;const j=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=i.get(R),re=b.length>1;if(re)for(let Fe=0;Fe<b.length;Fe++)t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const Te=R.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let Fe=0;Fe<b.length;Fe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ge.__webglColorRenderbuffer[Fe]);const te=i.get(b[Fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,te,0)}n.blitFramebuffer(0,0,U,Y,0,0,U,Y,J,n.NEAREST),l===!0&&(et.length=0,ze.length=0,et.push(n.COLOR_ATTACHMENT0+Fe),R.depthBuffer&&R.resolveDepthBuffer===!1&&(et.push(j),ze.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ze)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,et))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let Fe=0;Fe<b.length;Fe++){t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.RENDERBUFFER,ge.__webglColorRenderbuffer[Fe]);const te=i.get(b[Fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.TEXTURE_2D,te,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const b=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function P(R){return Math.min(s.maxSamples,R.samples)}function vt(R){const b=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ze(R){const b=a.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function tt(R,b){const U=R.colorSpace,Y=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||U!==Jt&&U!==Si&&(Ke.getTransfer(U)===nt?(Y!==mn||J!==on)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ue("WebGLTextures: Unsupported texture color space:",U)),b}function be(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=I,this.setTexture2D=B,this.setTexture2DArray=z,this.setTexture3D=k,this.setTextureCube=Q,this.rebindTextures=Mt,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=Je,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=vt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Gb(n,e){function t(i,s=Si){let r;const a=Ke.getTransfer(s);if(i===on)return n.UNSIGNED_BYTE;if(i===Cc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Dc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Fd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ud)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ld)return n.BYTE;if(i===Nd)return n.SHORT;if(i===gr)return n.UNSIGNED_SHORT;if(i===Rc)return n.INT;if(i===Gn)return n.UNSIGNED_INT;if(i===ln)return n.FLOAT;if(i===un)return n.HALF_FLOAT;if(i===kd)return n.ALPHA;if(i===Od)return n.RGB;if(i===mn)return n.RGBA;if(i===li)return n.DEPTH_COMPONENT;if(i===Ti)return n.DEPTH_STENCIL;if(i===Ga)return n.RED;if(i===Pc)return n.RED_INTEGER;if(i===Ns)return n.RG;if(i===Ic)return n.RG_INTEGER;if(i===Lc)return n.RGBA_INTEGER;if(i===ba||i===ya||i===Ma||i===Sa)if(a===nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ba)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ba)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ya)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Sa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===yl||i===Ml||i===Sl||i===El)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===yl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ml)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Sl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===El)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Tl||i===wl||i===Al||i===Rl||i===Cl||i===Dl||i===Pl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Tl||i===wl)return a===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Al)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Rl)return r.COMPRESSED_R11_EAC;if(i===Cl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Dl)return r.COMPRESSED_RG11_EAC;if(i===Pl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Il||i===Ll||i===Nl||i===Fl||i===Ul||i===kl||i===Ol||i===Bl||i===zl||i===Vl||i===Hl||i===Gl||i===Wl||i===Xl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Il)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ll)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Nl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Fl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ul)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===kl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ol)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===zl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Vl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Hl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Gl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xl)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===jl||i===ql||i===Yl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===jl)return a===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ql)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Yl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===$l||i===Kl||i===Zl||i===Jl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===$l)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Kl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Zl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Jl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ls?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Wb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class jb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new $d(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ht({vertexShader:Wb,fragmentShader:Xb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new Gi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qb extends Yi{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const _=typeof XRWebGLBinding<"u",m=new jb,g={},y=t.getContextAttributes();let S=null,v=null;const M=[],w=[],C=new Le;let x=null;const E=new qt;E.viewport=new _t;const D=new qt;D.viewport=new _t;const A=[E,D],I=new jg;let F=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Z=M[W];return Z===void 0&&(Z=new vo,M[W]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(W){let Z=M[W];return Z===void 0&&(Z=new vo,M[W]=Z),Z.getGripSpace()},this.getHand=function(W){let Z=M[W];return Z===void 0&&(Z=new vo,M[W]=Z),Z.getHandSpace()};function B(W){const Z=w.indexOf(W.inputSource);if(Z===-1)return;const ee=M[Z];ee!==void 0&&(ee.update(W.inputSource,W.frame,c||a),ee.dispatchEvent({type:W.type,data:W.inputSource}))}function z(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",k);for(let W=0;W<M.length;W++){const Z=w[W];Z!==null&&(w[W]=null,M[W].disconnect(Z))}F=null,H=null,m.reset();for(const W in g)delete g[W];e.setRenderTarget(S),f=null,d=null,u=null,s=null,v=null,Ce.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",z),s.addEventListener("inputsourceschange",k),y.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Re=null,ve=null;y.depth&&(ve=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=y.stencil?Ti:li,Re=y.stencil?Ls:Gn);const ke={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(ke),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new nn(d.textureWidth,d.textureHeight,{format:mn,type:on,depthTexture:new Us(d.textureWidth,d.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ee={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new nn(f.framebufferWidth,f.framebufferHeight,{format:mn,type:on,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ce.setContext(s),Ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function k(W){for(let Z=0;Z<W.removed.length;Z++){const ee=W.removed[Z],Re=w.indexOf(ee);Re>=0&&(w[Re]=null,M[Re].disconnect(ee))}for(let Z=0;Z<W.added.length;Z++){const ee=W.added[Z];let Re=w.indexOf(ee);if(Re===-1){for(let ke=0;ke<M.length;ke++)if(ke>=w.length){w.push(ee),Re=ke;break}else if(w[ke]===null){w[ke]=ee,Re=ke;break}if(Re===-1)break}const ve=M[Re];ve&&ve.connect(ee)}}const Q=new L,$=new L;function se(W,Z,ee){Q.setFromMatrixPosition(Z.matrixWorld),$.setFromMatrixPosition(ee.matrixWorld);const Re=Q.distanceTo($),ve=Z.projectionMatrix.elements,ke=ee.projectionMatrix.elements,Mt=ve[14]/(ve[10]-1),Ye=ve[14]/(ve[10]+1),Je=(ve[9]+1)/ve[5],et=(ve[9]-1)/ve[5],ze=(ve[8]-1)/ve[0],gt=(ke[8]+1)/ke[0],P=Mt*ze,vt=Mt*gt,Ze=Re/(-ze+gt),tt=Ze*-ze;if(Z.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(tt),W.translateZ(Ze),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),ve[10]===-1)W.projectionMatrix.copy(Z.projectionMatrix),W.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const be=Mt+Ze,R=Ye+Ze,b=P-tt,U=vt+(Re-tt),Y=Je*Ye/R*be,J=et*Ye/R*be;W.projectionMatrix.makePerspective(b,U,Y,J,be,R),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function he(W,Z){Z===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Z.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let Z=W.near,ee=W.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),I.near=D.near=E.near=Z,I.far=D.far=E.far=ee,(F!==I.near||H!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),F=I.near,H=I.far),I.layers.mask=W.layers.mask|6,E.layers.mask=I.layers.mask&-5,D.layers.mask=I.layers.mask&-3;const Re=W.parent,ve=I.cameras;he(I,Re);for(let ke=0;ke<ve.length;ke++)he(ve[ke],Re);ve.length===2?se(I,E,D):I.projectionMatrix.copy(E.projectionMatrix),le(W,I,Re)};function le(W,Z,ee){ee===null?W.matrix.copy(Z.matrixWorld):(W.matrix.copy(ee.matrixWorld),W.matrix.invert(),W.matrix.multiply(Z.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Z.projectionMatrix),W.projectionMatrixInverse.copy(Z.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Fs*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(W){return g[W]};let K=null;function ce(W,Z){if(h=Z.getViewerPose(c||a),p=Z,h!==null){const ee=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Re=!1;ee.length!==I.cameras.length&&(I.cameras.length=0,Re=!0);for(let Ye=0;Ye<ee.length;Ye++){const Je=ee[Ye];let et=null;if(f!==null)et=f.getViewport(Je);else{const gt=u.getViewSubImage(d,Je);et=gt.viewport,Ye===0&&(e.setRenderTargetTextures(v,gt.colorTexture,gt.depthStencilTexture),e.setRenderTarget(v))}let ze=A[Ye];ze===void 0&&(ze=new qt,ze.layers.enable(Ye),ze.viewport=new _t,A[Ye]=ze),ze.matrix.fromArray(Je.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Je.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(et.x,et.y,et.width,et.height),Ye===0&&(I.matrix.copy(ze.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Re===!0&&I.cameras.push(ze)}const ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=i.getBinding();const Ye=u.getDepthInformation(ee[0]);Ye&&Ye.isValid&&Ye.texture&&m.init(Ye,s.renderState)}if(ve&&ve.includes("camera-access")&&_){e.state.unbindTexture(),u=i.getBinding();for(let Ye=0;Ye<ee.length;Ye++){const Je=ee[Ye].camera;if(Je){let et=g[Je];et||(et=new $d,g[Je]=et);const ze=u.getCameraImage(Je);et.sourceTexture=ze}}}}for(let ee=0;ee<M.length;ee++){const Re=w[ee],ve=M[ee];Re!==null&&ve!==void 0&&ve.update(Re,Z,c||a)}K&&K(W,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),p=null}const Ce=new rf;Ce.setAnimationLoop(ce),this.setAnimationLoop=function(W){K=W},this.dispose=function(){}}}const Oi=new An,Yb=new Ve;function $b(n,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,Kd(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,y,S,v){g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,v)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,y,S):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Kt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Kt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const y=e.get(g),S=y.envMap,v=y.envMapRotation;S&&(m.envMap.value=S,Oi.copy(v),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),m.envMapRotation.value.setFromMatrix4(Yb.makeRotationFromEuler(Oi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,y,S){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*y,m.scale.value=S*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,y){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Kt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){const y=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Kb(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,S){const v=S.program;i.uniformBlockBinding(y,v)}function c(y,S){let v=s[y.id];v===void 0&&(p(y),v=h(y),s[y.id]=v,y.addEventListener("dispose",m));const M=S.program;i.updateUBOMapping(y,M);const w=e.render.frame;r[y.id]!==w&&(d(y),r[y.id]=w)}function h(y){const S=u();y.__bindingPointIndex=S;const v=n.createBuffer(),M=y.__size,w=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,M,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,v),v}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Ue("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const S=s[y.id],v=y.uniforms,M=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let w=0,C=v.length;w<C;w++){const x=Array.isArray(v[w])?v[w]:[v[w]];for(let E=0,D=x.length;E<D;E++){const A=x[E];if(f(A,w,E,M)===!0){const I=A.__offset,F=Array.isArray(A.value)?A.value:[A.value];let H=0;for(let B=0;B<F.length;B++){const z=F[B],k=_(z);typeof z=="number"||typeof z=="boolean"?(A.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,I+H,A.__data)):z.isMatrix3?(A.__data[0]=z.elements[0],A.__data[1]=z.elements[1],A.__data[2]=z.elements[2],A.__data[3]=0,A.__data[4]=z.elements[3],A.__data[5]=z.elements[4],A.__data[6]=z.elements[5],A.__data[7]=0,A.__data[8]=z.elements[6],A.__data[9]=z.elements[7],A.__data[10]=z.elements[8],A.__data[11]=0):(z.toArray(A.__data,H),H+=k.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,S,v,M){const w=y.value,C=S+"_"+v;if(M[C]===void 0)return typeof w=="number"||typeof w=="boolean"?M[C]=w:M[C]=w.clone(),!0;{const x=M[C];if(typeof w=="number"||typeof w=="boolean"){if(x!==w)return M[C]=w,!0}else if(x.equals(w)===!1)return x.copy(w),!0}return!1}function p(y){const S=y.uniforms;let v=0;const M=16;for(let C=0,x=S.length;C<x;C++){const E=Array.isArray(S[C])?S[C]:[S[C]];for(let D=0,A=E.length;D<A;D++){const I=E[D],F=Array.isArray(I.value)?I.value:[I.value];for(let H=0,B=F.length;H<B;H++){const z=F[H],k=_(z),Q=v%M,$=Q%k.boundary,se=Q+$;v+=$,se!==0&&M-se<k.storage&&(v+=M-se),I.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=k.storage}}}const w=v%M;return w>0&&(v+=M-w),y.__size=v,y.__cache={},this}function _(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Pe("WebGLRenderer: Unsupported uniform value type.",y),S}function m(y){const S=y.target;S.removeEventListener("dispose",m);const v=a.indexOf(S.__bindingPointIndex);a.splice(v,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function g(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:g}}const Zb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Pn=null;function Jb(){return Pn===null&&(Pn=new ja(Zb,16,16,Ns,un),Pn.name="DFG_LUT",Pn.minFilter=Pt,Pn.magFilter=Pt,Pn.wrapS=Un,Pn.wrapT=Un,Pn.generateMipmaps=!1,Pn.needsUpdate=!0),Pn}class uf{constructor(e={}){const{canvas:t=Em(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=on}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const _=f,m=new Set([Lc,Ic,Pc]),g=new Set([on,Gn,gr,Ls,Cc,Dc]),y=new Uint32Array(4),S=new Int32Array(4);let v=null,M=null;const w=[],C=[];let x=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let D=!1;this._outputColorSpace=Ct;let A=0,I=0,F=null,H=-1,B=null;const z=new _t,k=new _t;let Q=null;const $=new Ne(0);let se=0,he=t.width,le=t.height,K=1,ce=null,Ce=null;const W=new _t(0,0,he,le),Z=new _t(0,0,he,le);let ee=!1;const Re=new Gc;let ve=!1,ke=!1;const Mt=new Ve,Ye=new L,Je=new _t,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ze=!1;function gt(){return F===null?K:1}let P=i;function vt(T,O){return t.getContext(T,O)}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bc}`),t.addEventListener("webglcontextlost",Se,!1),t.addEventListener("webglcontextrestored",Be,!1),t.addEventListener("webglcontextcreationerror",ft,!1),P===null){const O="webgl2";if(P=vt(O,T),P===null)throw vt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw Ue("WebGLRenderer: "+T.message),T}let Ze,tt,be,R,b,U,Y,J,j,ge,re,Te,Fe,te,ae,ye,Me,fe,Oe,N,oe,ne,xe;function ie(){Ze=new Qv(P),Ze.init(),oe=new Gb(P,Ze),tt=new Xv(P,Ze,e,oe),be=new Vb(P,Ze),tt.reversedDepthBuffer&&d&&be.buffers.depth.setReversed(!0),R=new nx(P),b=new Ab,U=new Hb(P,Ze,be,b,tt,oe,R),Y=new Jv(E),J=new o0(P),ne=new Gv(P,J),j=new ex(P,J,R,ne),ge=new sx(P,j,J,ne,R),fe=new ix(P,tt,U),ae=new jv(b),re=new wb(E,Y,Ze,tt,ne,ae),Te=new $b(E,b),Fe=new Cb,te=new Fb(Ze),Me=new Hv(E,Y,be,ge,p,l),ye=new zb(E,ge,tt),xe=new Kb(P,R,tt,be),Oe=new Wv(P,Ze,R),N=new tx(P,Ze,R),R.programs=re.programs,E.capabilities=tt,E.extensions=Ze,E.properties=b,E.renderLists=Fe,E.shadowMap=ye,E.state=be,E.info=R}ie(),_!==on&&(x=new ax(_,t.width,t.height,s,r));const q=new qb(E,P);this.xr=q,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=Ze.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ze.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(T){T!==void 0&&(K=T,this.setSize(he,le,!1))},this.getSize=function(T){return T.set(he,le)},this.setSize=function(T,O,X=!0){if(q.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}he=T,le=O,t.width=Math.floor(T*K),t.height=Math.floor(O*K),X===!0&&(t.style.width=T+"px",t.style.height=O+"px"),x!==null&&x.setSize(t.width,t.height),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(he*K,le*K).floor()},this.setDrawingBufferSize=function(T,O,X){he=T,le=O,K=X,t.width=Math.floor(T*X),t.height=Math.floor(O*X),this.setViewport(0,0,T,O)},this.setEffects=function(T){if(_===on){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let O=0;O<T.length;O++)if(T[O].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(z)},this.getViewport=function(T){return T.copy(W)},this.setViewport=function(T,O,X,G){T.isVector4?W.set(T.x,T.y,T.z,T.w):W.set(T,O,X,G),be.viewport(z.copy(W).multiplyScalar(K).round())},this.getScissor=function(T){return T.copy(Z)},this.setScissor=function(T,O,X,G){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,O,X,G),be.scissor(k.copy(Z).multiplyScalar(K).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(T){be.setScissorTest(ee=T)},this.setOpaqueSort=function(T){ce=T},this.setTransparentSort=function(T){Ce=T},this.getClearColor=function(T){return T.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(T=!0,O=!0,X=!0){let G=0;if(T){let V=!1;if(F!==null){const pe=F.texture.format;V=m.has(pe)}if(V){const pe=F.texture.type,_e=g.has(pe),me=Me.getClearColor(),we=Me.getClearAlpha(),De=me.r,He=me.g,Xe=me.b;_e?(y[0]=De,y[1]=He,y[2]=Xe,y[3]=we,P.clearBufferuiv(P.COLOR,0,y)):(S[0]=De,S[1]=He,S[2]=Xe,S[3]=we,P.clearBufferiv(P.COLOR,0,S))}else G|=P.COLOR_BUFFER_BIT}O&&(G|=P.DEPTH_BUFFER_BIT),X&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Se,!1),t.removeEventListener("webglcontextrestored",Be,!1),t.removeEventListener("webglcontextcreationerror",ft,!1),Me.dispose(),Fe.dispose(),te.dispose(),b.dispose(),Y.dispose(),ge.dispose(),ne.dispose(),xe.dispose(),re.dispose(),q.dispose(),q.removeEventListener("sessionstart",rh),q.removeEventListener("sessionend",ah),Pi.stop()};function Se(T){T.preventDefault(),Ca("WebGLRenderer: Context Lost."),D=!0}function Be(){Ca("WebGLRenderer: Context Restored."),D=!1;const T=R.autoReset,O=ye.enabled,X=ye.autoUpdate,G=ye.needsUpdate,V=ye.type;ie(),R.autoReset=T,ye.enabled=O,ye.autoUpdate=X,ye.needsUpdate=G,ye.type=V}function ft(T){Ue("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function it(T){const O=T.target;O.removeEventListener("dispose",it),Yn(O)}function Yn(T){$n(T),b.remove(T)}function $n(T){const O=b.get(T).programs;O!==void 0&&(O.forEach(function(X){re.releaseProgram(X)}),T.isShaderMaterial&&re.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,X,G,V,pe){O===null&&(O=et);const _e=V.isMesh&&V.matrixWorld.determinant()<0,me=bp(T,O,X,G,V);be.setMaterial(G,_e);let we=X.index,De=1;if(G.wireframe===!0){if(we=j.getWireframeAttribute(X),we===void 0)return;De=2}const He=X.drawRange,Xe=X.attributes.position;let Ie=He.start*De,at=(He.start+He.count)*De;pe!==null&&(Ie=Math.max(Ie,pe.start*De),at=Math.min(at,(pe.start+pe.count)*De)),we!==null?(Ie=Math.max(Ie,0),at=Math.min(at,we.count)):Xe!=null&&(Ie=Math.max(Ie,0),at=Math.min(at,Xe.count));const Tt=at-Ie;if(Tt<0||Tt===1/0)return;ne.setup(V,G,me,X,we);let St,ot=Oe;if(we!==null&&(St=J.get(we),ot=N,ot.setIndex(St)),V.isMesh)G.wireframe===!0?(be.setLineWidth(G.wireframeLinewidth*gt()),ot.setMode(P.LINES)):ot.setMode(P.TRIANGLES);else if(V.isLine){let Wt=G.linewidth;Wt===void 0&&(Wt=1),be.setLineWidth(Wt*gt()),V.isLineSegments?ot.setMode(P.LINES):V.isLineLoop?ot.setMode(P.LINE_LOOP):ot.setMode(P.LINE_STRIP)}else V.isPoints?ot.setMode(P.POINTS):V.isSprite&&ot.setMode(P.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Da("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ot.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Ze.get("WEBGL_multi_draw"))ot.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Wt=V._multiDrawStarts,Ae=V._multiDrawCounts,sn=V._multiDrawCount,Qe=we?J.get(we).bytesPerElement:1,_n=b.get(G).currentProgram.getUniforms();for(let Cn=0;Cn<sn;Cn++)_n.setValue(P,"_gl_DrawID",Cn),ot.render(Wt[Cn]/Qe,Ae[Cn])}else if(V.isInstancedMesh)ot.renderInstances(Ie,Tt,V.count);else if(X.isInstancedBufferGeometry){const Wt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ae=Math.min(X.instanceCount,Wt);ot.renderInstances(Ie,Tt,Ae)}else ot.render(Ie,Tt)};function sh(T,O,X){T.transparent===!0&&T.side===Fn&&T.forceSinglePass===!1?(T.side=Kt,T.needsUpdate=!0,Ir(T,O,X),T.side=oi,T.needsUpdate=!0,Ir(T,O,X),T.side=Fn):Ir(T,O,X)}this.compile=function(T,O,X=null){X===null&&(X=T),M=te.get(X),M.init(O),C.push(M),X.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(M.pushLight(V),V.castShadow&&M.pushShadow(V))}),T!==X&&T.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(M.pushLight(V),V.castShadow&&M.pushShadow(V))}),M.setupLights();const G=new Set;return T.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const pe=V.material;if(pe)if(Array.isArray(pe))for(let _e=0;_e<pe.length;_e++){const me=pe[_e];sh(me,X,V),G.add(me)}else sh(pe,X,V),G.add(pe)}),M=C.pop(),G},this.compileAsync=function(T,O,X=null){const G=this.compile(T,O,X);return new Promise(V=>{function pe(){if(G.forEach(function(_e){b.get(_e).currentProgram.isReady()&&G.delete(_e)}),G.size===0){V(T);return}setTimeout(pe,10)}Ze.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let eo=null;function xp(T){eo&&eo(T)}function rh(){Pi.stop()}function ah(){Pi.start()}const Pi=new rf;Pi.setAnimationLoop(xp),typeof self<"u"&&Pi.setContext(self),this.setAnimationLoop=function(T){eo=T,q.setAnimationLoop(T),T===null?Pi.stop():Pi.start()},q.addEventListener("sessionstart",rh),q.addEventListener("sessionend",ah),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){Ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;const X=q.enabled===!0&&q.isPresenting===!0,G=x!==null&&(F===null||X)&&x.begin(E,F);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(q.cameraAutoUpdate===!0&&q.updateCamera(O),O=q.getCamera()),T.isScene===!0&&T.onBeforeRender(E,T,O,F),M=te.get(T,C.length),M.init(O),C.push(M),Mt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Re.setFromProjectionMatrix(Mt,kn,O.reversedDepth),ke=this.localClippingEnabled,ve=ae.init(this.clippingPlanes,ke),v=Fe.get(T,w.length),v.init(),w.push(v),q.enabled===!0&&q.isPresenting===!0){const _e=E.xr.getDepthSensingMesh();_e!==null&&to(_e,O,-1/0,E.sortObjects)}to(T,O,0,E.sortObjects),v.finish(),E.sortObjects===!0&&v.sort(ce,Ce),ze=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,ze&&Me.addToRenderList(v,T),this.info.render.frame++,ve===!0&&ae.beginShadows();const V=M.state.shadowsArray;if(ye.render(V,T,O),ve===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset(),(G&&x.hasRenderPass())===!1){const _e=v.opaque,me=v.transmissive;if(M.setupLights(),O.isArrayCamera){const we=O.cameras;if(me.length>0)for(let De=0,He=we.length;De<He;De++){const Xe=we[De];lh(_e,me,T,Xe)}ze&&Me.render(T);for(let De=0,He=we.length;De<He;De++){const Xe=we[De];oh(v,T,Xe,Xe.viewport)}}else me.length>0&&lh(_e,me,T,O),ze&&Me.render(T),oh(v,T,O)}F!==null&&I===0&&(U.updateMultisampleRenderTarget(F),U.updateRenderTargetMipmap(F)),G&&x.end(E),T.isScene===!0&&T.onAfterRender(E,T,O),ne.resetDefaultState(),H=-1,B=null,C.pop(),C.length>0?(M=C[C.length-1],ve===!0&&ae.setGlobalState(E.clippingPlanes,M.state.camera)):M=null,w.pop(),w.length>0?v=w[w.length-1]:v=null};function to(T,O,X,G){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)M.pushLight(T),T.castShadow&&M.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Re.intersectsSprite(T)){G&&Je.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Mt);const _e=ge.update(T),me=T.material;me.visible&&v.push(T,_e,me,X,Je.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Re.intersectsObject(T))){const _e=ge.update(T),me=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Je.copy(T.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Je.copy(_e.boundingSphere.center)),Je.applyMatrix4(T.matrixWorld).applyMatrix4(Mt)),Array.isArray(me)){const we=_e.groups;for(let De=0,He=we.length;De<He;De++){const Xe=we[De],Ie=me[Xe.materialIndex];Ie&&Ie.visible&&v.push(T,_e,Ie,X,Je.z,Xe)}}else me.visible&&v.push(T,_e,me,X,Je.z,null)}}const pe=T.children;for(let _e=0,me=pe.length;_e<me;_e++)to(pe[_e],O,X,G)}function oh(T,O,X,G){const{opaque:V,transmissive:pe,transparent:_e}=T;M.setupLightsView(X),ve===!0&&ae.setGlobalState(E.clippingPlanes,X),G&&be.viewport(z.copy(G)),V.length>0&&Pr(V,O,X),pe.length>0&&Pr(pe,O,X),_e.length>0&&Pr(_e,O,X),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function lh(T,O,X,G){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[G.id]===void 0){const Ie=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[G.id]=new nn(1,1,{generateMipmaps:!0,type:Ie?un:on,minFilter:si,samples:Math.max(4,tt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const pe=M.state.transmissionRenderTarget[G.id],_e=G.viewport||z;pe.setSize(_e.z*E.transmissionResolutionScale,_e.w*E.transmissionResolutionScale);const me=E.getRenderTarget(),we=E.getActiveCubeFace(),De=E.getActiveMipmapLevel();E.setRenderTarget(pe),E.getClearColor($),se=E.getClearAlpha(),se<1&&E.setClearColor(16777215,.5),E.clear(),ze&&Me.render(X);const He=E.toneMapping;E.toneMapping=Hn;const Xe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),M.setupLightsView(G),ve===!0&&ae.setGlobalState(E.clippingPlanes,G),Pr(T,X,G),U.updateMultisampleRenderTarget(pe),U.updateRenderTargetMipmap(pe),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let at=0,Tt=O.length;at<Tt;at++){const St=O[at],{object:ot,geometry:Wt,material:Ae,group:sn}=St;if(Ae.side===Fn&&ot.layers.test(G.layers)){const Qe=Ae.side;Ae.side=Kt,Ae.needsUpdate=!0,ch(ot,X,G,Wt,Ae,sn),Ae.side=Qe,Ae.needsUpdate=!0,Ie=!0}}Ie===!0&&(U.updateMultisampleRenderTarget(pe),U.updateRenderTargetMipmap(pe))}E.setRenderTarget(me,we,De),E.setClearColor($,se),Xe!==void 0&&(G.viewport=Xe),E.toneMapping=He}function Pr(T,O,X){const G=O.isScene===!0?O.overrideMaterial:null;for(let V=0,pe=T.length;V<pe;V++){const _e=T[V],{object:me,geometry:we,group:De}=_e;let He=_e.material;He.allowOverride===!0&&G!==null&&(He=G),me.layers.test(X.layers)&&ch(me,O,X,we,He,De)}}function ch(T,O,X,G,V,pe){T.onBeforeRender(E,O,X,G,V,pe),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),V.onBeforeRender(E,O,X,G,T,pe),V.transparent===!0&&V.side===Fn&&V.forceSinglePass===!1?(V.side=Kt,V.needsUpdate=!0,E.renderBufferDirect(X,O,G,V,T,pe),V.side=oi,V.needsUpdate=!0,E.renderBufferDirect(X,O,G,V,T,pe),V.side=Fn):E.renderBufferDirect(X,O,G,V,T,pe),T.onAfterRender(E,O,X,G,V,pe)}function Ir(T,O,X){O.isScene!==!0&&(O=et);const G=b.get(T),V=M.state.lights,pe=M.state.shadowsArray,_e=V.state.version,me=re.getParameters(T,V.state,pe,O,X),we=re.getProgramCacheKey(me);let De=G.programs;G.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?O.environment:null,G.fog=O.fog;const He=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;G.envMap=Y.get(T.envMap||G.environment,He),G.envMapRotation=G.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,De===void 0&&(T.addEventListener("dispose",it),De=new Map,G.programs=De);let Xe=De.get(we);if(Xe!==void 0){if(G.currentProgram===Xe&&G.lightsStateVersion===_e)return uh(T,me),Xe}else me.uniforms=re.getUniforms(T),T.onBeforeCompile(me,E),Xe=re.acquireProgram(me,we),De.set(we,Xe),G.uniforms=me.uniforms;const Ie=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ie.clippingPlanes=ae.uniform),uh(T,me),G.needsLights=Mp(T),G.lightsStateVersion=_e,G.needsLights&&(Ie.ambientLightColor.value=V.state.ambient,Ie.lightProbe.value=V.state.probe,Ie.directionalLights.value=V.state.directional,Ie.directionalLightShadows.value=V.state.directionalShadow,Ie.spotLights.value=V.state.spot,Ie.spotLightShadows.value=V.state.spotShadow,Ie.rectAreaLights.value=V.state.rectArea,Ie.ltc_1.value=V.state.rectAreaLTC1,Ie.ltc_2.value=V.state.rectAreaLTC2,Ie.pointLights.value=V.state.point,Ie.pointLightShadows.value=V.state.pointShadow,Ie.hemisphereLights.value=V.state.hemi,Ie.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ie.spotLightMatrix.value=V.state.spotLightMatrix,Ie.spotLightMap.value=V.state.spotLightMap,Ie.pointShadowMatrix.value=V.state.pointShadowMatrix),G.currentProgram=Xe,G.uniformsList=null,Xe}function hh(T){if(T.uniformsList===null){const O=T.currentProgram.getUniforms();T.uniformsList=Ea.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function uh(T,O){const X=b.get(T);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function bp(T,O,X,G,V){O.isScene!==!0&&(O=et),U.resetTextureUnits();const pe=O.fog,_e=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?O.environment:null,me=F===null?E.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Jt,we=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,De=Y.get(G.envMap||_e,we),He=G.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Xe=!!X.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ie=!!X.morphAttributes.position,at=!!X.morphAttributes.normal,Tt=!!X.morphAttributes.color;let St=Hn;G.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(St=E.toneMapping);const ot=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Wt=ot!==void 0?ot.length:0,Ae=b.get(G),sn=M.state.lights;if(ve===!0&&(ke===!0||T!==B)){const Ft=T===B&&G.id===H;ae.setState(G,T,Ft)}let Qe=!1;G.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==sn.state.version||Ae.outputColorSpace!==me||V.isBatchedMesh&&Ae.batching===!1||!V.isBatchedMesh&&Ae.batching===!0||V.isBatchedMesh&&Ae.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Ae.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Ae.instancing===!1||!V.isInstancedMesh&&Ae.instancing===!0||V.isSkinnedMesh&&Ae.skinning===!1||!V.isSkinnedMesh&&Ae.skinning===!0||V.isInstancedMesh&&Ae.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ae.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ae.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ae.instancingMorph===!1&&V.morphTexture!==null||Ae.envMap!==De||G.fog===!0&&Ae.fog!==pe||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==ae.numPlanes||Ae.numIntersection!==ae.numIntersection)||Ae.vertexAlphas!==He||Ae.vertexTangents!==Xe||Ae.morphTargets!==Ie||Ae.morphNormals!==at||Ae.morphColors!==Tt||Ae.toneMapping!==St||Ae.morphTargetsCount!==Wt)&&(Qe=!0):(Qe=!0,Ae.__version=G.version);let _n=Ae.currentProgram;Qe===!0&&(_n=Ir(G,O,V));let Cn=!1,Ii=!1,Ji=!1;const ht=_n.getUniforms(),Bt=Ae.uniforms;if(be.useProgram(_n.program)&&(Cn=!0,Ii=!0,Ji=!0),G.id!==H&&(H=G.id,Ii=!0),Cn||B!==T){be.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ht.setValue(P,"projectionMatrix",T.projectionMatrix),ht.setValue(P,"viewMatrix",T.matrixWorldInverse);const ui=ht.map.cameraPosition;ui!==void 0&&ui.setValue(P,Ye.setFromMatrixPosition(T.matrixWorld)),tt.logarithmicDepthBuffer&&ht.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ht.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),B!==T&&(B=T,Ii=!0,Ji=!0)}if(Ae.needsLights&&(sn.state.directionalShadowMap.length>0&&ht.setValue(P,"directionalShadowMap",sn.state.directionalShadowMap,U),sn.state.spotShadowMap.length>0&&ht.setValue(P,"spotShadowMap",sn.state.spotShadowMap,U),sn.state.pointShadowMap.length>0&&ht.setValue(P,"pointShadowMap",sn.state.pointShadowMap,U)),V.isSkinnedMesh){ht.setOptional(P,V,"bindMatrix"),ht.setOptional(P,V,"bindMatrixInverse");const Ft=V.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),ht.setValue(P,"boneTexture",Ft.boneTexture,U))}V.isBatchedMesh&&(ht.setOptional(P,V,"batchingTexture"),ht.setValue(P,"batchingTexture",V._matricesTexture,U),ht.setOptional(P,V,"batchingIdTexture"),ht.setValue(P,"batchingIdTexture",V._indirectTexture,U),ht.setOptional(P,V,"batchingColorTexture"),V._colorsTexture!==null&&ht.setValue(P,"batchingColorTexture",V._colorsTexture,U));const hi=X.morphAttributes;if((hi.position!==void 0||hi.normal!==void 0||hi.color!==void 0)&&fe.update(V,X,_n),(Ii||Ae.receiveShadow!==V.receiveShadow)&&(Ae.receiveShadow=V.receiveShadow,ht.setValue(P,"receiveShadow",V.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&O.environment!==null&&(Bt.envMapIntensity.value=O.environmentIntensity),Bt.dfgLUT!==void 0&&(Bt.dfgLUT.value=Jb()),Ii&&(ht.setValue(P,"toneMappingExposure",E.toneMappingExposure),Ae.needsLights&&yp(Bt,Ji),pe&&G.fog===!0&&Te.refreshFogUniforms(Bt,pe),Te.refreshMaterialUniforms(Bt,G,K,le,M.state.transmissionRenderTarget[T.id]),Ea.upload(P,hh(Ae),Bt,U)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ea.upload(P,hh(Ae),Bt,U),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ht.setValue(P,"center",V.center),ht.setValue(P,"modelViewMatrix",V.modelViewMatrix),ht.setValue(P,"normalMatrix",V.normalMatrix),ht.setValue(P,"modelMatrix",V.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Ft=G.uniformsGroups;for(let ui=0,Qi=Ft.length;ui<Qi;ui++){const dh=Ft[ui];xe.update(dh,_n),xe.bind(dh,_n)}}return _n}function yp(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Mp(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(T,O,X){const G=b.get(T);G.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),b.get(T.texture).__webglTexture=O,b.get(T.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:X,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,O){const X=b.get(T);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0};const Sp=P.createFramebuffer();this.setRenderTarget=function(T,O=0,X=0){F=T,A=O,I=X;let G=null,V=!1,pe=!1;if(T){const me=b.get(T);if(me.__useDefaultFramebuffer!==void 0){be.bindFramebuffer(P.FRAMEBUFFER,me.__webglFramebuffer),z.copy(T.viewport),k.copy(T.scissor),Q=T.scissorTest,be.viewport(z),be.scissor(k),be.setScissorTest(Q),H=-1;return}else if(me.__webglFramebuffer===void 0)U.setupRenderTarget(T);else if(me.__hasExternalTextures)U.rebindTextures(T,b.get(T.texture).__webglTexture,b.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const He=T.depthTexture;if(me.__boundDepthTexture!==He){if(He!==null&&b.has(He)&&(T.width!==He.image.width||T.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(T)}}const we=T.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(pe=!0);const De=b.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(De[O])?G=De[O][X]:G=De[O],V=!0):T.samples>0&&U.useMultisampledRTT(T)===!1?G=b.get(T).__webglMultisampledFramebuffer:Array.isArray(De)?G=De[X]:G=De,z.copy(T.viewport),k.copy(T.scissor),Q=T.scissorTest}else z.copy(W).multiplyScalar(K).floor(),k.copy(Z).multiplyScalar(K).floor(),Q=ee;if(X!==0&&(G=Sp),be.bindFramebuffer(P.FRAMEBUFFER,G)&&be.drawBuffers(T,G),be.viewport(z),be.scissor(k),be.setScissorTest(Q),V){const me=b.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,me.__webglTexture,X)}else if(pe){const me=O;for(let we=0;we<T.textures.length;we++){const De=b.get(T.textures[we]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+we,De.__webglTexture,X,me)}}else if(T!==null&&X!==0){const me=b.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,me.__webglTexture,X)}H=-1},this.readRenderTargetPixels=function(T,O,X,G,V,pe,_e,me=0){if(!(T&&T.isWebGLRenderTarget)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=b.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(we=we[_e]),we){be.bindFramebuffer(P.FRAMEBUFFER,we);try{const De=T.textures[me],He=De.format,Xe=De.type;if(T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+me),!tt.textureFormatReadable(He)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!tt.textureTypeReadable(Xe)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-G&&X>=0&&X<=T.height-V&&P.readPixels(O,X,G,V,oe.convert(He),oe.convert(Xe),pe)}finally{const De=F!==null?b.get(F).__webglFramebuffer:null;be.bindFramebuffer(P.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(T,O,X,G,V,pe,_e,me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=b.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(we=we[_e]),we)if(O>=0&&O<=T.width-G&&X>=0&&X<=T.height-V){be.bindFramebuffer(P.FRAMEBUFFER,we);const De=T.textures[me],He=De.format,Xe=De.type;if(T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+me),!tt.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!tt.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ie),P.bufferData(P.PIXEL_PACK_BUFFER,pe.byteLength,P.STREAM_READ),P.readPixels(O,X,G,V,oe.convert(He),oe.convert(Xe),0);const at=F!==null?b.get(F).__webglFramebuffer:null;be.bindFramebuffer(P.FRAMEBUFFER,at);const Tt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Tm(P,Tt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ie),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,pe),P.deleteBuffer(Ie),P.deleteSync(Tt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,O=null,X=0){const G=Math.pow(2,-X),V=Math.floor(T.image.width*G),pe=Math.floor(T.image.height*G),_e=O!==null?O.x:0,me=O!==null?O.y:0;U.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,X,0,0,_e,me,V,pe),be.unbindTexture()};const Ep=P.createFramebuffer(),Tp=P.createFramebuffer();this.copyTextureToTexture=function(T,O,X=null,G=null,V=0,pe=0){let _e,me,we,De,He,Xe,Ie,at,Tt;const St=T.isCompressedTexture?T.mipmaps[pe]:T.image;if(X!==null)_e=X.max.x-X.min.x,me=X.max.y-X.min.y,we=X.isBox3?X.max.z-X.min.z:1,De=X.min.x,He=X.min.y,Xe=X.isBox3?X.min.z:0;else{const Bt=Math.pow(2,-V);_e=Math.floor(St.width*Bt),me=Math.floor(St.height*Bt),T.isDataArrayTexture?we=St.depth:T.isData3DTexture?we=Math.floor(St.depth*Bt):we=1,De=0,He=0,Xe=0}G!==null?(Ie=G.x,at=G.y,Tt=G.z):(Ie=0,at=0,Tt=0);const ot=oe.convert(O.format),Wt=oe.convert(O.type);let Ae;O.isData3DTexture?(U.setTexture3D(O,0),Ae=P.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(U.setTexture2DArray(O,0),Ae=P.TEXTURE_2D_ARRAY):(U.setTexture2D(O,0),Ae=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);const sn=P.getParameter(P.UNPACK_ROW_LENGTH),Qe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),_n=P.getParameter(P.UNPACK_SKIP_PIXELS),Cn=P.getParameter(P.UNPACK_SKIP_ROWS),Ii=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,St.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,St.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,De),P.pixelStorei(P.UNPACK_SKIP_ROWS,He),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Xe);const Ji=T.isDataArrayTexture||T.isData3DTexture,ht=O.isDataArrayTexture||O.isData3DTexture;if(T.isDepthTexture){const Bt=b.get(T),hi=b.get(O),Ft=b.get(Bt.__renderTarget),ui=b.get(hi.__renderTarget);be.bindFramebuffer(P.READ_FRAMEBUFFER,Ft.__webglFramebuffer),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,ui.__webglFramebuffer);for(let Qi=0;Qi<we;Qi++)Ji&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,b.get(T).__webglTexture,V,Xe+Qi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,b.get(O).__webglTexture,pe,Tt+Qi)),P.blitFramebuffer(De,He,_e,me,Ie,at,_e,me,P.DEPTH_BUFFER_BIT,P.NEAREST);be.bindFramebuffer(P.READ_FRAMEBUFFER,null),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(V!==0||T.isRenderTargetTexture||b.has(T)){const Bt=b.get(T),hi=b.get(O);be.bindFramebuffer(P.READ_FRAMEBUFFER,Ep),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,Tp);for(let Ft=0;Ft<we;Ft++)Ji?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Bt.__webglTexture,V,Xe+Ft):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Bt.__webglTexture,V),ht?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,hi.__webglTexture,pe,Tt+Ft):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,hi.__webglTexture,pe),V!==0?P.blitFramebuffer(De,He,_e,me,Ie,at,_e,me,P.COLOR_BUFFER_BIT,P.NEAREST):ht?P.copyTexSubImage3D(Ae,pe,Ie,at,Tt+Ft,De,He,_e,me):P.copyTexSubImage2D(Ae,pe,Ie,at,De,He,_e,me);be.bindFramebuffer(P.READ_FRAMEBUFFER,null),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ht?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(Ae,pe,Ie,at,Tt,_e,me,we,ot,Wt,St.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(Ae,pe,Ie,at,Tt,_e,me,we,ot,St.data):P.texSubImage3D(Ae,pe,Ie,at,Tt,_e,me,we,ot,Wt,St):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,pe,Ie,at,_e,me,ot,Wt,St.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,pe,Ie,at,St.width,St.height,ot,St.data):P.texSubImage2D(P.TEXTURE_2D,pe,Ie,at,_e,me,ot,Wt,St);P.pixelStorei(P.UNPACK_ROW_LENGTH,sn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Qe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,_n),P.pixelStorei(P.UNPACK_SKIP_ROWS,Cn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ii),pe===0&&O.generateMipmaps&&P.generateMipmap(Ae),be.unbindTexture()},this.initRenderTarget=function(T){b.get(T).__webglFramebuffer===void 0&&U.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?U.setTextureCube(T,0):T.isData3DTexture?U.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?U.setTexture2DArray(T,0):U.setTexture2D(T,0),be.unbindTexture()},this.resetState=function(){A=0,I=0,F=null,be.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}function Uu(n,e){if(e===um)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Ql||e===Bd){let t=n.getIndex();if(t===null){const a=[],o=n.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);n.setIndex(a),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=t.count-2,s=[];if(e===Ql)for(let a=1;a<=i;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}function Qb(n){const e=new Map,t=new Map,i=n.clone();return df(n,i,function(s,r){e.set(r,s),t.set(s,r)}),i.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),i}function df(n,e,t){t(n,e);for(let i=0;i<n.children.length;i++)df(n.children[i],e.children[i],t)}class ku extends Ks{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new sy(t)}),this.register(function(t){return new ry(t)}),this.register(function(t){return new py(t)}),this.register(function(t){return new my(t)}),this.register(function(t){return new gy(t)}),this.register(function(t){return new oy(t)}),this.register(function(t){return new ly(t)}),this.register(function(t){return new cy(t)}),this.register(function(t){return new hy(t)}),this.register(function(t){return new iy(t)}),this.register(function(t){return new uy(t)}),this.register(function(t){return new ay(t)}),this.register(function(t){return new fy(t)}),this.register(function(t){return new dy(t)}),this.register(function(t){return new ty(t)}),this.register(function(t){return new Ou(t,qe.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ou(t,qe.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new _y(t)})}load(e,t,i,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=mr.extractUrlBase(e);a=mr.resolveURL(c,this.path)}else a=mr.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new tf(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===ff){try{a[qe.KHR_BINARY_GLTF]=new vy(e)}catch(u){s&&s(u);return}r=JSON.parse(a[qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Py(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case qe.KHR_MATERIALS_UNLIT:a[u]=new ny;break;case qe.KHR_DRACO_MESH_COMPRESSION:a[u]=new xy(r,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:a[u]=new by;break;case qe.KHR_MESH_QUANTIZATION:a[u]=new yy;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,s)}parseAsync(e,t){const i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}}function ey(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}function wt(n,e,t){const i=n.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}const qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class ty{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let s=t.cache.get(i);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Ne(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Jt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ic(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new sf(h),c.distance=u;break;case"spot":c=new Vg(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),In(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}}class ny{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return Bn}extendParams(e,t,i){const s=[];e.color=new Ne(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Jt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,Ct))}return Promise.all(s)}}class iy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class sy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return wt(this.parser,e,this.name)!==null?Xn:null}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Le(r,r)}return Promise.all(s)}}class ry{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){return wt(this.parser,e,this.name)!==null?Xn:null}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class ay{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return wt(this.parser,e,this.name)!==null?Xn:null}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(s)}}class oy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){return wt(this.parser,e,this.name)!==null?Xn:null}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];if(t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Jt)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,Ct)),i.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(s)}}class ly{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return wt(this.parser,e,this.name)!==null?Xn:null}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(s)}}class cy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){return wt(this.parser,e,this.name)!==null?Xn:null}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return t.attenuationColor=new Ne().setRGB(r[0],r[1],r[2],Jt),Promise.all(s)}}class hy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){return wt(this.parser,e,this.name)!==null?Xn:null}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5),Promise.resolve()}}class uy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){return wt(this.parser,e,this.name)!==null?Xn:null}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return t.specularColor=new Ne().setRGB(r[0],r[1],r[2],Jt),i.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,Ct)),Promise.all(s)}}class dy{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){return wt(this.parser,e,this.name)!==null?Xn:null}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(s)}}class fy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return wt(this.parser,e,this.name)!==null?Xn:null}extendMaterialParams(e,t){const i=wt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(s)}}class py{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class my{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}}class gy{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}}class Ou{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class _y{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=t.meshes[i.mesh];for(const c of s.primitives)if(c.mode!==pn.TRIANGLES&&c.mode!==pn.TRIANGLE_STRIP&&c.mode!==pn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=i.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const p of u){const _=new Ve,m=new L,g=new wn,y=new L(1,1,1),S=new Hc(p.geometry,p.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,v),l.SCALE&&y.fromBufferAttribute(l.SCALE,v),S.setMatrixAt(v,_.compose(m,g,y));for(const v in l)if(v==="_COLOR_0"){const M=l[v];S.instanceColor=new tc(M.array,M.itemSize,M.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&p.geometry.setAttribute(v,l[v]);mt.prototype.copy.call(S,p),this.parser.assignFinalMaterial(S),f.push(S)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const ff="glTF",lr=12,Bu={JSON:1313821514,BIN:5130562};class vy{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,lr),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ff)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-lr,r=new DataView(e,lr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Bu.JSON){const c=new Uint8Array(e,lr+a,o);this.content=i.decode(c)}else if(l===Bu.BIN){const c=lr+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class xy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=lc[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=lc[h]||h.toLowerCase();if(a[h]!==void 0){const d=i.accessors[e.attributes[h]],f=Ts[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const p in f.attributes){const _=f.attributes[p],m=l[p];m!==void 0&&(_.normalized=m)}u(f)},o,c,Jt,d)})})}}class by{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class yy{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}}class pf extends qs{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=s-t,u=(i-t)/h,d=u*u,f=d*u,p=e*c,_=p-c,m=-2*f+3*d,g=f-d,y=1-m,S=g-d+u;for(let v=0;v!==o;v++){const M=a[_+v+o],w=a[_+v+l]*h,C=a[p+v+o],x=a[p+v]*h;r[v]=y*M+S*w+m*C+g*x}return r}}const My=new wn;class Sy extends pf{interpolate_(e,t,i,s){const r=super.interpolate_(e,t,i,s);return My.fromArray(r).normalize().toArray(r),r}}const pn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ts={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},zu={9728:yt,9729:Pt,9984:Id,9985:xa,9986:hr,9987:si},Vu={33071:Un,33648:Aa,10497:Ci},qo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},lc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},xi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Ey={CUBICSPLINE:void 0,LINEAR:vr,STEP:_r},Yo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ty(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new Os({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:oi})),n.DefaultMaterial}function Bi(n,e,t){for(const i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function In(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function wy(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(i){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):n.attributes.position;a.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):n.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):n.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return i&&(n.morphAttributes.position=h),s&&(n.morphAttributes.normal=u),r&&(n.morphAttributes.color=d),n.morphTargetsRelative=!0,n})}function Ay(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ry(n){let e;const t=n.extensions&&n.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+$o(t.attributes):e=n.indices+":"+$o(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+$o(n.targets[i]);return e}function $o(n){let e="";const t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function cc(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Cy(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Dy=new Ve;class Py{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ey,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=i&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&a<98?this.textureLoader=new Og(this.options.manager):this.textureLoader=new Wg(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new tf(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};return Bi(r,o,s),In(o,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const s=i.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const s=e(t[i]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){const i=e+":"+t;let s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){i.load(mr.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){const t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=qo[s.type],o=Ts[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Zt(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=qo[s.type],c=Ts[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,f=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0;let _,m;if(f&&f!==u){const g=Math.floor(d/f),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count;let S=t.cache.get(y);S||(_=new c(o,g*f,s.count*f/h),S=new rg(_,f/h),t.cache.add(y,S)),m=new zc(S,l,d%f/h,p)}else o===null?_=new c(s.count*l):_=new c(o,d,s.count*l),m=new Zt(_,l,p);if(s.sparse!==void 0){const g=qo.SCALAR,y=Ts[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,M=new y(a[1],S,s.sparse.count*g),w=new c(a[2],v,s.sparse.count*l);o!==null&&(m=new Zt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,x=M.length;C<x;C++){const E=M[C];if(m.setX(E,w[C*l]),l>=2&&m.setY(E,w[C*l+1]),l>=3&&m.setZ(E,w[C*l+2]),l>=4&&m.setW(E,w[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){const t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=zu[d.magFilter]||Pt,h.minFilter=zu[d.minFilter]||si,h.wrapS=Vu[d.wrapS]||Ci,h.wrapT=Vu[d.wrapT]||Ci,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==yt&&h.minFilter!==Pt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(_){const m=new It(_);m.needsUpdate=!0,d(m)}),t.load(mr.resolveURL(u,r.path),p,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),In(u,a),u.userData.mimeType=a.mimeType||Cy(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,i,s){const r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[qe.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new qd,gn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new jd,gn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(s||r||a){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return Os}loadMaterial(e){const t=this,i=this.json,s=this.extensions,r=i.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[qe.KHR_MATERIALS_UNLIT]){const u=s[qe.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new Ne(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Jt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Ct)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Fn);const h=r.alphaMode||Yo.OPAQUE;if(h===Yo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Yo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Bn&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Le(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Bn&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Bn){const u=r.emissiveFactor;o.emissive=new Ne().setRGB(u[0],u[1],u[2],Jt)}return r.emissiveTexture!==void 0&&a!==Bn&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Ct)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),In(u,r),t.associations.set(u,{materials:e}),r.extensions&&Bi(s,u,r),u})}createUniqueName(e){const t=rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,s=this.primitiveCache;function r(o){return i[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Hu(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=Ry(c),u=s[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Hu(new dn,c,t),s[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,i=this.json,s=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?Ty(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){const _=h[f],m=a[f];let g;const y=c[f];if(m.mode===pn.TRIANGLES||m.mode===pn.TRIANGLE_STRIP||m.mode===pn.TRIANGLE_FAN||m.mode===void 0)g=r.isSkinnedMesh===!0?new cg(_,y):new ct(_,y),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===pn.TRIANGLE_STRIP?g.geometry=Uu(g.geometry,Bd):m.mode===pn.TRIANGLE_FAN&&(g.geometry=Uu(g.geometry,Ql));else if(m.mode===pn.LINES)g=new mg(_,y);else if(m.mode===pn.LINE_STRIP)g=new Wc(_,y);else if(m.mode===pn.LINE_LOOP)g=new gg(_,y);else if(m.mode===pn.POINTS)g=new _g(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&Ay(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),In(g,r),m.extensions&&Bi(s,g,m),t.assignFinalMaterial(g),u.push(g)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Bi(s,u[0],r),u[0];const d=new On;r.extensions&&Bi(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t;const i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new qt($e.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new Dr(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),In(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Ve;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Vc(o,l)})}loadAnimation(e){const t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],p=s.samplers[f.sampler],_=f.target,m=_.node,g=s.parameters!==void 0?s.parameters[p.input]:p.input,y=s.parameters!==void 0?s.parameters[p.output]:p.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",y)),c.push(p),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],p=u[2],_=u[3],m=u[4],g=[];for(let S=0,v=d.length;S<v;S++){const M=d[S],w=f[S],C=p[S],x=_[S],E=m[S];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const D=i._createAnimationTracks(M,w,C,x,E);if(D)for(let A=0;A<D.length;A++)g.push(D[A])}const y=new Pg(r,void 0,g);return In(y,s),y})}createNodeMesh(e){const t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const a=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Dy)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){const f=h.userData.pivot,p=u[0];h.pivot=new L().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new Xd:c.length>1?h=new On:c.length===1?h=c[0]:h=new mt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),In(h,r),r.extensions&&Bi(i,h,r),r.matrix!==void 0){const u=new Ve;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],s=this,r=new On;i.name&&(r.name=s.createUniqueName(i.name)),In(r,i),i.extensions&&Bi(t,r,i);const a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++){const d=l[h];d.parent!==null?r.add(Qb(d)):r.add(d)}const c=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof gn||d instanceof It)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,i,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];xi[r.path]===xi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(xi[r.path]){case xi.weights:c=Bs;break;case xi.rotation:c=zs;break;case xi.translation:case xi.scale:c=Vs;break;default:i.itemSize===1?c=Bs:c=Vs;break}const h=s.interpolation!==void 0?Ey[s.interpolation]:vr,u=this._getArrayFromAccessor(i);for(let d=0,f=l.length;d<f;d++){const p=new c(l[d]+"."+xi[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),a.push(p)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=cc(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const s=this instanceof zs?Sy:pf;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Iy(n,e,t){const i=e.attributes,s=new ci;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new L(l[0],l[1],l[2]),new L(c[0],c[1],c[2])),o.normalized){const h=cc(Ts[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new L,l=new L;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const _=cc(Ts[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;const a=new Wn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=a}function Hu(n,e,t){const i=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){n.setAttribute(o,l)})}for(const a in i){const o=lc[a]||a.toLowerCase();o in n.attributes||s.push(r(i[a],o))}if(e.indices!==void 0&&!n.index){const a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(a)}return Ke.workingColorSpace!==Jt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),In(n,e),Iy(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?wy(n,e.targets,t):n})}class Ly extends Bc{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new js;e.deleteAttribute("uv");const t=new Os({side:Kt}),i=new Os,s=new sf(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new ct(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Hc(e,i,6),o=new mt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new ct(e,gs(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new ct(e,gs(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new ct(e,gs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new ct(e,gs(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new ct(e,gs(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new ct(e,gs(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function gs(n){return new Sg({color:0,emissive:16777215,emissiveIntensity:n})}function mf(n,e,t="baseline"){const i=t==="refined";n.toneMappingExposure=i?1:1.05;const s=new rc(n),r=new Ly;e.environment=s.fromScene(r,.04).texture,r.dispose(),s.dispose(),e.environmentIntensity=i?.52:.48,e.add(new Bg("#fffaf5",i?"#b49b80":"#b4a18c",i?.5:.65));const a=new ic(i?"#fff4e5":"#fff7ed",i?1.7:1.4);a.position.set(...i?[-8,14,4]:[-6,14,-5]);const o=new ic("#ffffff",i?.3:.6);return o.position.set(7,8,-10),e.add(a,o),a}const Ta={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class $i{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ny=new Dr(-1,1,1,-1,0,1);class Fy extends dn{constructor(){super(),this.setAttribute("position",new hn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new hn([0,2,0,0,2,0],2))}}const Uy=new Fy;class Ka{constructor(e){this._mesh=new ct(Uy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ny)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ky extends $i{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ht?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=wi.clone(e.uniforms),this.material=new Ht({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ka(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Gu extends $i{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Oy extends $i{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class By{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Le);this._width=i.width,this._height=i.height,t=new nn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:un}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ky(Ta),this.copyPass.material.blending=Vt,this.timer=new qg}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Gu!==void 0&&(a instanceof Gu?i=!0:a instanceof Oy&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Le);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class zy extends $i{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ne}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}class Vy{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,s,r;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,f=c-u,p=e-d,_=t-f;let m,g;p>_?(m=1,g=0):(m=0,g=1);const y=p-m+h,S=_-g+h,v=p-1+2*h,M=_-1+2*h,w=l&255,C=c&255,x=this.perm[w+this.perm[C]]%12,E=this.perm[w+m+this.perm[C+g]]%12,D=this.perm[w+1+this.perm[C+1]]%12;let A=.5-p*p-_*_;A<0?i=0:(A*=A,i=A*A*this._dot(this.grad3[x],p,_));let I=.5-y*y-S*S;I<0?s=0:(I*=I,s=I*I*this._dot(this.grad3[E],y,S));let F=.5-v*v-M*M;return F<0?r=0:(F*=F,r=F*F*this._dot(this.grad3[D],v,M)),70*(i+s+r)}noise3d(e,t,i){let s,r,a,o;const c=(e+t+i)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),d=Math.floor(i+c),f=1/6,p=(h+u+d)*f,_=h-p,m=u-p,g=d-p,y=e-_,S=t-m,v=i-g;let M,w,C,x,E,D;y>=S?S>=v?(M=1,w=0,C=0,x=1,E=1,D=0):y>=v?(M=1,w=0,C=0,x=1,E=0,D=1):(M=0,w=0,C=1,x=1,E=0,D=1):S<v?(M=0,w=0,C=1,x=0,E=1,D=1):y<v?(M=0,w=1,C=0,x=0,E=1,D=1):(M=0,w=1,C=0,x=1,E=1,D=0);const A=y-M+f,I=S-w+f,F=v-C+f,H=y-x+2*f,B=S-E+2*f,z=v-D+2*f,k=y-1+3*f,Q=S-1+3*f,$=v-1+3*f,se=h&255,he=u&255,le=d&255,K=this.perm[se+this.perm[he+this.perm[le]]]%12,ce=this.perm[se+M+this.perm[he+w+this.perm[le+C]]]%12,Ce=this.perm[se+x+this.perm[he+E+this.perm[le+D]]]%12,W=this.perm[se+1+this.perm[he+1+this.perm[le+1]]]%12;let Z=.6-y*y-S*S-v*v;Z<0?s=0:(Z*=Z,s=Z*Z*this._dot3(this.grad3[K],y,S,v));let ee=.6-A*A-I*I-F*F;ee<0?r=0:(ee*=ee,r=ee*ee*this._dot3(this.grad3[ce],A,I,F));let Re=.6-H*H-B*B-z*z;Re<0?a=0:(Re*=Re,a=Re*Re*this._dot3(this.grad3[Ce],H,B,z));let ve=.6-k*k-Q*Q-$*$;return ve<0?o=0:(ve*=ve,o=ve*ve*this._dot3(this.grad3[W],k,Q,$)),32*(s+r+a+o)}noise4d(e,t,i,s){const r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,u,d,f,p;const _=(e+t+i+s)*l,m=Math.floor(e+_),g=Math.floor(t+_),y=Math.floor(i+_),S=Math.floor(s+_),v=(m+g+y+S)*c,M=m-v,w=g-v,C=y-v,x=S-v,E=e-M,D=t-w,A=i-C,I=s-x,F=E>D?32:0,H=E>A?16:0,B=D>A?8:0,z=E>I?4:0,k=D>I?2:0,Q=A>I?1:0,$=F+H+B+z+k+Q,se=a[$][0]>=3?1:0,he=a[$][1]>=3?1:0,le=a[$][2]>=3?1:0,K=a[$][3]>=3?1:0,ce=a[$][0]>=2?1:0,Ce=a[$][1]>=2?1:0,W=a[$][2]>=2?1:0,Z=a[$][3]>=2?1:0,ee=a[$][0]>=1?1:0,Re=a[$][1]>=1?1:0,ve=a[$][2]>=1?1:0,ke=a[$][3]>=1?1:0,Mt=E-se+c,Ye=D-he+c,Je=A-le+c,et=I-K+c,ze=E-ce+2*c,gt=D-Ce+2*c,P=A-W+2*c,vt=I-Z+2*c,Ze=E-ee+3*c,tt=D-Re+3*c,be=A-ve+3*c,R=I-ke+3*c,b=E-1+4*c,U=D-1+4*c,Y=A-1+4*c,J=I-1+4*c,j=m&255,ge=g&255,re=y&255,Te=S&255,Fe=o[j+o[ge+o[re+o[Te]]]]%32,te=o[j+se+o[ge+he+o[re+le+o[Te+K]]]]%32,ae=o[j+ce+o[ge+Ce+o[re+W+o[Te+Z]]]]%32,ye=o[j+ee+o[ge+Re+o[re+ve+o[Te+ke]]]]%32,Me=o[j+1+o[ge+1+o[re+1+o[Te+1]]]]%32;let fe=.6-E*E-D*D-A*A-I*I;fe<0?h=0:(fe*=fe,h=fe*fe*this._dot4(r[Fe],E,D,A,I));let Oe=.6-Mt*Mt-Ye*Ye-Je*Je-et*et;Oe<0?u=0:(Oe*=Oe,u=Oe*Oe*this._dot4(r[te],Mt,Ye,Je,et));let N=.6-ze*ze-gt*gt-P*P-vt*vt;N<0?d=0:(N*=N,d=N*N*this._dot4(r[ae],ze,gt,P,vt));let oe=.6-Ze*Ze-tt*tt-be*be-R*R;oe<0?f=0:(oe*=oe,f=oe*oe*this._dot4(r[ye],Ze,tt,be,R));let ne=.6-b*b-U*U-Y*Y-J*J;return ne<0?p=0:(ne*=ne,p=ne*ne*this._dot4(r[Me],b,U,Y,J)),27*(h+u+d+f+p)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,s){return e[0]*t+e[1]*i+e[2]*s}_dot4(e,t,i,s,r){return e[0]*t+e[1]*i+e[2]*s+e[3]*r}}const la={defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new Le},cameraProjectionMatrix:{value:new Ve},cameraInverseProjectionMatrix:{value:new Ve},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		#ifdef USE_REVERSED_DEPTH_BUFFER

			const float depthThreshold = 0.0;

		#else

			const float depthThreshold = 1.0;

		#endif

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == depthThreshold ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background

			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},ca={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ha={uniforms:{tDiffuse:{value:null},resolution:{value:new Le}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`};class Ei extends $i{constructor(e,t,i=512,s=512,r=32){super(),this.width=i,this.height=s,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=[],this._generateSampleKernel(r),this._generateRandomKernelRotations();const a=new Us;a.format=Ti,a.type=Ls,this.normalRenderTarget=new nn(this.width,this.height,{minFilter:yt,magFilter:yt,type:un,depthTexture:a}),this.ssaoRenderTarget=new nn(this.width,this.height,{type:un}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new Ht({defines:Object.assign({},la.defines),uniforms:wi.clone(la.uniforms),vertexShader:la.vertexShader,fragmentShader:la.fragmentShader,blending:Vt}),this.ssaoMaterial.defines.KERNEL_SIZE=r,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Mg,this.normalMaterial.blending=Vt,this.blurMaterial=new Ht({defines:Object.assign({},ha.defines),uniforms:wi.clone(ha.uniforms),vertexShader:ha.vertexShader,fragmentShader:ha.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Ht({defines:Object.assign({},ca.defines),uniforms:wi.clone(ca.uniforms),vertexShader:ca.vertexShader,fragmentShader:ca.fragmentShader,blending:Vt}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Ht({uniforms:wi.clone(Ta.uniforms),vertexShader:Ta.vertexShader,fragmentShader:Ta.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Dd,blendDst:ul,blendEquation:ni,blendSrcAlpha:Cd,blendDstAlpha:ul,blendEquationAlpha:ni}),this._fsQuad=new Ka(null),this._originalClearColor=new Ne}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}render(e,t,i){switch(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this._renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this._renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case Ei.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=Vt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case Ei.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Vt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case Ei.OUTPUT.Depth:this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:i);break;case Ei.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Vt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case Ei.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Rd,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}_renderPass(e,t,i,s,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,s,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_generateSampleKernel(e){const t=this.kernel;for(let i=0;i<e;i++){const s=new L;s.x=Math.random()*2-1,s.y=Math.random()*2-1,s.z=Math.random(),s.normalize();let r=i/e;r=$e.lerp(.1,1,r*r),s.multiplyScalar(r),t.push(s)}}_generateRandomKernelRotations(){const i=new Vy,s=16,r=new Float32Array(s);for(let a=0;a<s;a++){const o=Math.random()*2-1,l=Math.random()*2-1,c=0;r[a]=i.noise3d(o,l,c)}this.noiseTexture=new ja(r,4,4,Ga,ln),this.noiseTexture.wrapS=Ci,this.noiseTexture.wrapT=Ci,this.noiseTexture.needsUpdate=!0}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}}Ei.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};const ua={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Hy extends $i{constructor(){super(),this.isOutputPass=!0,this.uniforms=wi.clone(ua.uniforms),this.material=new Zd({name:ua.name,uniforms:this.uniforms,vertexShader:ua.vertexShader,fragmentShader:ua.fragmentShader}),this._fsQuad=new Ka(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ke.getTransfer(this._outputColorSpace)===nt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Mc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Sc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ec?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Cr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===wc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ac?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Tc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const da={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class Gy extends $i{constructor(e,t,i){super(),this.scene=e,this.camera=t;const s=i.focus!==void 0?i.focus:1,r=i.aperture!==void 0?i.aperture:.025,a=i.maxblur!==void 0?i.maxblur:1;this._renderTargetDepth=new nn(1,1,{minFilter:yt,magFilter:yt,type:un}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new Jd,this._materialDepth.depthPacking=fm,this._materialDepth.blending=Vt;const o=wi.clone(da.uniforms);o.tDepth.value=this._renderTargetDepth.texture,o.focus.value=s,o.aspect.value=t.aspect,o.aperture.value=r,o.maxblur.value=a,o.nearClip.value=t.near,o.farClip.value=t.far,this.materialBokeh=new Ht({defines:Object.assign({},da.defines),uniforms:o,vertexShader:da.vertexShader,fragmentShader:da.fragmentShader}),this.uniforms=o,this._fsQuad=new Ka(this.materialBokeh),this._oldClearColor=new Ne}render(e,t,i){this.scene.overrideMaterial=this._materialDepth,e.getClearColor(this._oldClearColor);const s=e.getClearAlpha(),r=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this._renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=i.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this._fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(s),e.autoClear=r}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this._renderTargetDepth.setSize(e,t)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}}class Wy{palettes=new Map;register(e,t,i){this.palettes.set(e,{high:t,low:i})}prepare(e){for(const t of e.children){const i=t,s=i.userData.surface,r=this.palettes.get(s);if(!r)continue;const a=r.high.clone(),o={value:0};i.material=a,i.userData.appearance=o,a.onBeforeCompile=l=>{l.uniforms.archiveQuality=o,l.fragmentShader=`uniform float archiveQuality;
`+l.fragmentShader,s==="Frosted_Polymer"?(l.vertexShader=`varying float vArchiveHeight;
`+l.vertexShader,l.vertexShader=l.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vArchiveHeight = position.y / 3.7;`),l.fragmentShader=`varying float vArchiveHeight;
`+l.fragmentShader,l.fragmentShader=l.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= mix(mix(vec3(0.40, 0.30, 0.20), vec3(1.0, 0.98, 0.94), smoothstep(0.1, 1.0, vArchiveHeight)), vec3(1.0), archiveQuality);`),l.fragmentShader=l.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(0.28, mix(0.48, 0.035, smoothstep(0.36, 0.68, vArchiveHeight)), archiveQuality);`)):r.low||(l.fragmentShader=l.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
float coverage = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
if (archiveQuality <= coverage) discard;`))},a.customProgramCacheKey=()=>`archive-surface-${s}-${!!r.low}`}}apply(e,t){for(const i of e.children){const s=i,r=this.palettes.get(s.userData.surface);if(!r){s.material.opacity=t;continue}s.userData.appearance.value=t;const{high:a,low:o}=r;if(!o)continue;const l=s.material;l.color.copy(o.color).lerp(a.color,t),l.attenuationColor&&o.attenuationColor&&a.attenuationColor&&(l.attenuationColor.copy(o.attenuationColor).lerp(a.attenuationColor,t),l.attenuationDistance=Number.isFinite(o.attenuationDistance)&&Number.isFinite(a.attenuationDistance)?$e.lerp(o.attenuationDistance,a.attenuationDistance,t):a.attenuationDistance);for(const c of["roughness","metalness","transmission","thickness","clearcoat","clearcoatRoughness"])l[c]=$e.lerp(o[c]??0,a[c]??0,t);a.transmission>0&&(l.transmission=Math.max(1e-6,l.transmission))}}dispose(e){for(const t of e.children){const i=t,s=i.material;i.userData.surface||s.map?.dispose(),s.dispose()}}}const Xy=`+++
date = '2026-09-08T20:43:16+08:00'
draft = false
title = '开始-搭建博客'
featured_image = "https://fastcdn.mihoyo.com/content-v2/bh3/129536/e518d3fb0f7fcb4aedb367d3022303a2_7955999685661020599.png"
toc = true
+++

# git使用以及搭建Hugo的Ananke主题博客
## 一、环境搭建
### 1.习惯养成
* 每次通过apt install <包名>下载时，先用apt update更新软件包列表（其实有些时候好像并不好使）
### 2.安装go、hugo
* 安装go
\`\`\`bash
apt update
apt install golang-go 
\`\`\`
* 安装hugo
\`\`\`bash
#官方推荐debian系统使用apt安装
apt install hugo
\`\`\`
不知道是apt问题还是什么原因，下载出来的版本是0.111.0（肯定更新完了啊）。。。。
**官方最新版本发布页：https://github.com/gohugoio/hugo/releases**
从这个页面获取最新版本的安装包，这里我找到的是0.165.0，https://github.com/gohugoio/hugo/releases/download/v0.165.0/hugo_withdeploy_0.165.0_linux-amd64.deb
\`\`\`bash
wget https://github.com/gohugoio/hugo/releases/download/v0.165.0/hugo_withdeploy_0.165.0_linux-amd64.deb
dpkg -i  <文件目录>/安装包.deb
\`\`\`
其他步骤和官网相同。
## 二 、git基础命令
\`\`\`bash
git add .  #自动扫描项目中所有非排除文件的更改并上传
git add <文件路径>  #精准上传指定的文件夹或者文件
git commit -m "文件修改描述"  #提交时备注的修改描述
git push -f origin <分支名>  #选择要上传的分支
git init  #新建本地仓库
git branch  #查看当前有的分支
git checkout <分支名>  #切换分支
git push origin --delete <分支名>  #删除所选分支，删之前记得切换分支。
\`\`\`
## 任务清单
- [x] 熟悉git命令
- [x] 搭建个人博客
- [x] 发布第一篇blog
> ~~嗯，同时清晰认知到自己是一个废物。~~
`,jy=`+++
date = '2026-09-17T21:25:51+08:00'
draft = false
title = '01 Hugo+ananke的基础美化'
toc = true
featured_image = "https://fastcdn.mihoyo.com/content-v2/bh3/126656/dbce0de13c5512586e7d61774ada79fd_8179618609892126936.png"

+++
# Hugo的Ananke主题优化技巧
## 一、关于Hugo的各个目录功能
* content：博客.md的文章存放位置。
* layout：用于存放覆盖主题默认样式，修改外观的文件。
* assets：存放自定义CSS和JS的位置。
* static：图片等资源的存放地。
* hugo.toml：全局设置配置文件。
* themes/ananke：原始外观文件。
## 二、通过使用配置文件美化
在全局设置文件hugo.toml
\`\`\`bash
[params]
  background_color_class = "bg-washed-blue"
#更换网页背景颜色
  featured_image_class = "cover bg-center"
#cover:覆盖，bg-center：覆盖
\`\`\`
想要相关配置生效，还需要在文章开头加上
\`\`\`bash
featured_image = "<相对路径>/在线URL"
#由于github的静态网页可能加载很慢，这里选择在线URL
\`\`\`\`
## 三、开启文章目录
 在每篇文章的 Front Matter 里加一行
 \`\`\`bash

toc = true 
 
 \`\`\`
## 四、创建关于界面
先新建一个md文章，写入关于界面内容
然后在hugo.toml内加上
\`\`\`toml
[[menu.main]]
  name = "关于"
  pageRef = "文件名（无需.md）"
  weight = 30
\`\`\`

## 五、创建归档页面
在 content/ 下新建 archives.md

\`\`\`toml
+++
title = "归档"
layout = "archives"
+++
\`\`\`
在layouts/_default创建archives.html
\`\`\`html
{{ define "main" }}
<div class="archives">
  {{ range (where .Site.RegularPages "Section" "posts").GroupByDate "2006" }}
    <h2>{{ .Key }}</h2>
    <ul>
      {{ range .Pages }}
        <li>
          <a href="{{ .Permalink }}">{{ .Title }}</a>
          <span class="date">{{ .Date.Format "2006-01-02" }}</span>
        </li>
      {{ end }}
    </ul>
  {{ end }}
</div>
{{ end }}
#写的很烂，上网学的，能用就行，以后在优化吧。
\`\`\`
~~真的会优化吗?~~
在hugo.toml添加
\`\`\`toml
[[menu.main]]
  name = "归档"
  pageRef = "archives"
  weight = 20
\`\`\`


## 任务清单

✅ 开启文章目录
✅ 创建关于界面
✅ 创建归档页面
`,qy=`+++
date = '2026-09-23T23:45:41+08:00'
draft = false
title = 'RE01 第一周周报'
toc = true 
featured_image = "/images/dsh.png"
+++
# ~~自力更生~~Re第一周

~~我说大肥鱼实在是太可爱了有没有反对的。~~

## 一、微软大战代码的C环境配置
下载文件：
https://gh-proxy.org/https://github.com/brechtsanders/winlibs_mingw/releases/download/16.2.0posix-14.0.0-ucrt-r1/winlibs-x86_64-posix-seh-gcc-16.2.0-mingw-w64ucrt-14.0.0-r1.7z 
这是GCC必须的前置，需要把bin配置到path
https://vscode.download.prss.microsoft.com/dbazure/download/stable/7debcd0e2acdea1c52de81bf9ee1620444407dda/VSCodeUserSetup-x64-1.138.0.exe
VSC下载链接
~~其他没什么好说的，这个搞不明白的话可能会被从窗户扔出去的吧？~~
## 二、相关知识

\`\`\`c++
#include <stdio.h>
 
int main()
{
    printf("Hello, World!");
    return 0;
}
\`\`\`
<u>#include <stdio.h></u>：预处理器指令，引入标准输入输出库，使 printf 函数可用。

<u>int main()</u>：主函数，C 程序的唯一入口，程序从这里开始执行。

<u>printf("Hello, World!");</u>：将字符串 Hello, World! 原样输出到屏幕，末尾未加 \\n，因此输出后不换行，正好符合题目要求的“输出一行”且内容完全匹配。

<u>return 0;</u>：终止 main() 函数并返回 0，表示程序成功执行
记住了，***要写;***，必须写！！！！！！！！！
常见的转义字符有：

| 转义字符 | 含义 |
| --- | --- |
| \\n | 换行 |
| \\t | 制表符 |
| \\ \\ | 反斜杠 |
| \\ " | 双引号 |

\`\`\`c++
#include <stdio.h>

int main(void)
{
    int i = 10;                      
    long long l = 10000000000;       
    float f = 3.14f;                
    double d = 2.71828;             
    char c = 'A';                    

    printf("int: %d\\n", i);
    printf("long long: %lld\\n", l);
    printf("float: %.2f\\n", f);
    printf("double: %.5f\\n", d);
    printf("char: %c\\n", c);

    return 0;
}
\`\`\`
### 数据类型
数据类型及对应的printf格式说明符
| 类别 | 类型 | 典型存储大小 | 用途 |
| --- | --- | --- | --- |
| 整型 | int | 4 字节 | 存储普通整数 |
| 整型 | long long | 8 字节 | 存储更大的整数 |
| 浮点型 | float | 4 字节 | 单精度小数 |
| 浮点型 | double | 8 字节 | 双精度小数 |
| 字符型 | char | 1 字节 | 存储单个字符 |

| 格式说明符 | 对应数据类型 | 作用 |
| --- | --- | --- |
| %d | int | 输出有符号十进制整数 |
| %lld | long long | 输出 long long 类型的长整型 |
| %f | float / double | 输出浮点数（默认 6 位小数） |
| %c | char | 输出单个字符 |
| %s |  | 字符串 |

<u>备注：格式为 %.Nf	，其中 N 为需要保留的小数位数。</u>

（1）int i = 10;
int 是 C 语言中最常用的整型，取值范围为 -2,147,483,648 到 2,147,483,647。10 在 int 范围内，可以直接赋值。
（2）long long l = 10000000000;
10000000000（一百亿）超出了 int 的最大范围（约 21 亿），如果使用 int 会导致溢出，因此必须用 long long。
（3）float f = 3.14;
float提供约 6 位有效数字的精度。
（4）double d = 2.71828;
double提供约 15 位有效数字的精度。2.71828
（5）char c = 'A';
char 是字符型，占 1 个字节，本质上是一个小整数类型。保存的是该字符的ASCII值。
### 变量命名规则
**只能由字母（A–Z, a–z）、数字（0–9）和下划线（_）组成**
**第一个字符必须是字母或下划线，不能是数**
**区分大小写，例如 i 和 I 是不同的变量**
**不能使用 C 语言的关键字（如 int、return 等）作为变量名。**

\`\`\`c++
#include <stdio.h>

int main(void) {
    char letter = 'B';
    int code = letter;

    printf("%c\\n", letter);  
    printf("%d\\n", code);    

    return 0;
}
\`\`\`

\`\`\`c++
#include <stdio.h>
int main()
{
    int a, b, sum;                         
    scanf("%d %d", &a, &b);               
    sum = a + b;                            
    printf("%d\\n", sum);                    
    return 0;
}
\`\`\`
<u>scanf()</u>:C 标准库中用于从键盘读取输入的函数。

### 运算符

| 运算符 | 描述 | 示例 | （A=10, B=20） |
| --- | --- | --- | --- |
| + | 把两个操作数相加 | A + B | 得到 30 |
| - | 从第一个操作数中减去第二个 | A - B | 得到 -10 |
| * | 把两个操作数相乘 | A * B | 得到 200 |
| / | 分子除以分母 | B / A | 得到 2 |
| % | 取模（求余数） | B % A | 得到 0 |
| ++ | 自增运算符 | A++ | 使 A 变为 1 |
| -- | 自减运算符 | A-- | 使 A 变为 9 |

\`\`\`C++
#include <stdio.h>

int main()
{
    int num;                          
    scanf("%d", &num);               
    if (num % 2 == 0)                 
        printf("even\\n");          
    else
        printf("odd\\n");            
    return 0;
}

\`\`\`

| 部分 | 含义 |
| --- | --- |
| if (num % 2 == 0) | 条件判断：如果 num 除以 2 的余数等于 0 |
| printf("even\\n"); | 条件为真（是偶数）时执行 |
| else 否则 | （条件为假） |
| printf("odd\\n"); | 条件为假（是奇数）时执行 |

\`\`\`c++
if (条件表达式)
{
    // 条件为真（true）时执行的语句
}
else
{
    // 条件为假（false）时执行的语句
}

\`\`\`

\`\`\`c++
#include <stdio.h>
int main()
{
    int day;                                    
    scanf("%d", &day);                         
    switch (day)                                
    {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        case 4:
            printf("Thursday\\n");
            break;
        case 5:
            printf("Friday\\n");
            break;
        case 6:
            printf("Saturday\\n");
            break;
        case 7:
            printf("Sunday\\n");
            break;
        default:                               
            break;
    }
    return 0;
}
\`\`\`
switch:用于根据一个整型表达式的值
每个 case 后面跟一个常量，表示当 switch 表达式的值等于该常量时，就执行该分支下的语句。
case 1: 表示当 day == 1 时，执行下面的语句。
printf("Monday\\n"); :输出 Monday 并换行。
break; :表示跳出整个 switch 语句，不再继续执行后面的 case。
default :分支用于处理所有 case 都不匹配的情况。

\`\`\`c++
#include <stdio.h>
int main()
{
    int n, i;                        
    scanf("%d", &n);                
    for (i = 1; i <= n; i++)        
    {
        printf("%d\\n", i);          
    }
    return 0;
}
\`\`\`

| 部分 | 含义 |
| --- | --- |
| i = 1 | 初始化：循环控制变量 i 从 1 开始 |
| i <= n | 条件判断：只要 i 不超过 n，就继续循环 |
| i++ | 更新：每次循环后，i 增加 1 |
| printf("%d\\n", i); | 循环体：输出当前 i 的值并换行 |

\`\`\`c++
#include <stdio.h>
int main()
{
    int n;                          
    scanf("%d", &n);               
    while (n >= 1)                  
    {
        printf("%d\\n", n);          
        n--;                        
    }
    return 0;
}

\`\`\`
| 部分 | 含义 |
| --- | --- |
| while (n >= 1) | 循环条件：只要 n 大于等于 1，就继续循环 |
| printf("%d\\n", n); | 输出当前 n 的值，并换行 |
| n--; | 每次循环后，把 n 减 1 |


### 两种循环的对比


| 对比项 | while 循环 | for循环 |
| --- | --- | --- |
| 适用场景 | 条件循环，循环次数不一定明确 | 次数循环，循环次数通常已知 |
| 初始化位置 | 循环外 | for 的第一个表达式中 |
| 条件判断 | while 括号内 | for 的第二个表达式中 |
| 更新变量 | 循环体内手动更新 | for 的第三个表达式中 |
| 是否先判断 | 是，先判断后执行 | 是，先判断后执行 |

\`\`\`c++
#include <stdio.h>
int add(int a, int b);
int main()
{
    int x, y, result;                  
    scanf("%d %d", &x, &y);            
    result = add(x, y);                
    printf("%d\\n", result);           
    return 0;
}
int add(int a, int b)
{
    return a + b;                     
}
\`\`\`
函数写法一般如下：
\`\`\`c++
返回类型 函数名(参数列表)
{
    函数体
}

int add(int a, int b)
{
    return a + b;
}
\`\`\`


| 部分 | 说明 |
| --- | --- |
| \`int\` | 返回类型：函数执行完毕后返回给调用者的数据类型 |
| \`add\` | 函数名：遵循标识符命名规则，见名知意 |
| \`(int a, int b)\` | 参数列表：两个整型形式参数 |
| \`{ return a + b; }\` | 函数体：实现具体功能的语句 |

函数的一般调用形式

\`\`\`c++
函数名(实际参数列表);
result = add(x, y);
\`\`\`
x和y的值被传递给 add 函数的形参 a 和 b

add(x, y) 的返回值被赋给变量 result

### 数组
\`\`\`c++
#include <stdio.h>
int main()
{
    int arr[5] = {1, 2, 3, 4, 5};    
    for (int i = 0; i < 5; i++)      
    {
        printf("%d\\n", arr[i]);         
    }
    return 0;
}
\`\`\`

| 部分 | 含义 |
| --- | --- |
| int | 元素的类型为整型 |
| arr | 数组名 |
| [5] | 数组长度为 5，即可以存放 5 个整数 |
| = {1, 2, 3, 4, 5} | 初始化列表，依次给 5 个元素赋值 |

\`\`\`C++
#include <stdio.h>
int main()
{
    int a = 10; 
    int *p = &a; 
    printf("%d\\n", *p);  
    *p = 20;            
    printf("%d\\n", a);   
    return 0;
}
\`\`\`

int *p = &a;
定义一个整型指针变量p，并将a的地址赋给它。&a取出变量a在内存中的地址；int *表示p只能指向int类型的数据。此时p就"指向"了a，即p中存储的是a的地址。


**用指针交换两个数**
\`\`\`c++
#include <stdio.h>
void swap(int *x, int *y);
int main()
{
    int a, b;                       
    scanf("%d %d", &a, &b);         
    swap(&a, &b);                   
    printf("%d %d\\n", a, b);       
    return 0;
}
void swap(int *x, int *y)
{
    int temp = *x;                 
    *x = *y;                        
    *y = temp;                      
}

\`\`\`




要累死了喵。~~想要狠狠的rua大肥鱼的鱼尾巴啊。~~
`,Yy=`+++
date = '2026-09-08T13:42:55+08:00'
draft = false
title = '关于我'
featured_image = "https://fastcdn.mihoyo.com/content-v2/bh3/162551/2e46f89fdeaf3c88da4553ebfd48862b_1268325734843629952.png"
toc = true
+++
## 你好，我是Mofox-Elysia
欢迎来到我的博客，这里记录了我的学习历程，思考，或者用于分享我喜欢或者感兴趣的项目。
`,Wu={};function $y(n){let e=Wu[n];if(e)return e;e=Wu[n]=[];for(let t=0;t<128;t++){const i=String.fromCharCode(t);e.push(i)}for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);e[i]="%"+("0"+i.toString(16).toUpperCase()).slice(-2)}return e}function Hs(n,e){typeof e!="string"&&(e=Hs.defaultChars);const t=$y(e);return n.replace(/(%[a-f0-9]{2})+/gi,function(i){let s="";for(let r=0,a=i.length;r<a;r+=3){const o=parseInt(i.slice(r+1,r+3),16);if(o<128){s+=t[o];continue}if((o&224)===192&&r+3<a){const l=parseInt(i.slice(r+4,r+6),16);if((l&192)===128){const c=o<<6&1984|l&63;c<128?s+="��":s+=String.fromCharCode(c),r+=3;continue}}if((o&240)===224&&r+6<a){const l=parseInt(i.slice(r+4,r+6),16),c=parseInt(i.slice(r+7,r+9),16);if((l&192)===128&&(c&192)===128){const h=o<<12&61440|l<<6&4032|c&63;h<2048||h>=55296&&h<=57343?s+="���":s+=String.fromCharCode(h),r+=6;continue}}if((o&248)===240&&r+9<a){const l=parseInt(i.slice(r+4,r+6),16),c=parseInt(i.slice(r+7,r+9),16),h=parseInt(i.slice(r+10,r+12),16);if((l&192)===128&&(c&192)===128&&(h&192)===128){let u=o<<18&1835008|l<<12&258048|c<<6&4032|h&63;u<65536||u>1114111?s+="����":(u-=65536,s+=String.fromCharCode(55296+(u>>10),56320+(u&1023))),r+=9;continue}}s+="�"}return s})}Hs.defaultChars=";/?:@&=+$,#";Hs.componentChars="";const Xu={};function Ky(n){let e=Xu[n];if(e)return e;e=Xu[n]=[];for(let t=0;t<128;t++){const i=String.fromCharCode(t);/^[0-9a-z]$/i.test(i)?e.push(i):e.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<n.length;t++)e[n.charCodeAt(t)]=n[t];return e}function ii(n,e,t){typeof e!="string"&&(t=e,e=ii.defaultChars),typeof t>"u"&&(t=!0);const i=Ky(e);let s="";for(let r=0,a=n.length;r<a;r++){const o=n.charCodeAt(r);if(t&&o===37&&r+2<a&&/^[0-9a-f]{2}$/i.test(n.slice(r+1,r+3))){s+=n.slice(r,r+3),r+=2;continue}if(o<128){s+=i[o];continue}if(o>=55296&&o<=57343){if(o>=55296&&o<=56319&&r+1<a){const l=n.charCodeAt(r+1);if(l>=56320&&l<=57343){s+=encodeURIComponent(n[r]+n[r+1]),r++;continue}}s+="%EF%BF%BD";continue}s+=encodeURIComponent(n[r])}return s}ii.defaultChars=";/?:@&=+$,-_.!~*'()#";ii.componentChars="-_.!~*'()";function hc(n){let e="";return e+=n.protocol||"",e+=n.slashes?"//":"",e+=n.auth?n.auth+"@":"",n.hostname&&n.hostname.indexOf(":")!==-1?e+="["+n.hostname+"]":e+=n.hostname||"",e+=n.port?":"+n.port:"",e+=n.pathname||"",e+=n.search||"",e+=n.hash||"",e}function La(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const Zy=/^([a-z0-9.+-]+:)/i,Jy=/:[0-9]*$/,Qy=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,eM=["<",">",'"',"`"," ","\r",`
`,"	"],tM=["{","}","|","\\","^","`"].concat(eM),nM=["'"].concat(tM),ju=["%","/","?",";","#"].concat(nM),qu=["/","?","#"],iM=255,Yu=/^[+a-z0-9A-Z_-]{0,63}$/,sM=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,$u={javascript:!0,"javascript:":!0},Ku={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function uc(n,e){if(n&&n instanceof La)return n;const t=new La;return t.parse(n,e),t}La.prototype.parse=function(n,e){let t,i,s,r=n;if(r=r.trim(),!e&&n.split("#").length===1){const c=Qy.exec(r);if(c)return this.pathname=c[1],c[2]&&(this.search=c[2]),this}let a=Zy.exec(r);if(a&&(a=a[0],t=a.toLowerCase(),this.protocol=a,r=r.substr(a.length)),(e||a||r.match(/^\/\/[^@\/]+@[^@\/]+/))&&(s=r.substr(0,2)==="//",s&&!(a&&$u[a])&&(r=r.substr(2),this.slashes=!0)),!$u[a]&&(s||a&&!Ku[a])){let c=-1;for(let p=0;p<qu.length;p++)i=r.indexOf(qu[p]),i!==-1&&(c===-1||i<c)&&(c=i);let h,u;c===-1?u=r.lastIndexOf("@"):u=r.lastIndexOf("@",c),u!==-1&&(h=r.slice(0,u),r=r.slice(u+1),this.auth=h),c=-1;for(let p=0;p<ju.length;p++)i=r.indexOf(ju[p]),i!==-1&&(c===-1||i<c)&&(c=i);c===-1&&(c=r.length),r[c-1]===":"&&c--;const d=r.slice(0,c);r=r.slice(c),this.parseHost(d),this.hostname=this.hostname||"";const f=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!f){const p=this.hostname.split(/\./);for(let _=0,m=p.length;_<m;_++){const g=p[_];if(g&&!g.match(Yu)){let y="";for(let S=0,v=g.length;S<v;S++)g.charCodeAt(S)>127?y+="x":y+=g[S];if(!y.match(Yu)){const S=p.slice(0,_),v=p.slice(_+1),M=g.match(sM);M&&(S.push(M[1]),v.unshift(M[2])),v.length&&(r=v.join(".")+r),this.hostname=S.join(".");break}}}}this.hostname.length>iM&&(this.hostname=""),f&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const o=r.indexOf("#");o!==-1&&(this.hash=r.substr(o),r=r.slice(0,o));const l=r.indexOf("?");return l!==-1&&(this.search=r.substr(l),r=r.slice(0,l)),r&&(this.pathname=r),Ku[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};La.prototype.parseHost=function(n){let e=Jy.exec(n);e&&(e=e[0],e!==":"&&(this.port=e.substr(1)),n=n.substr(0,n.length-e.length)),n&&(this.hostname=n)};const rM=Object.freeze(Object.defineProperty({__proto__:null,decode:Hs,encode:ii,format:hc,parse:uc},Symbol.toStringTag,{value:"Module"})),gf=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,_f=/[\0-\x1F\x7F-\x9F]/,aM=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Yc=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B60\u1B7D-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDEAD\uDED0\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]/,vf=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C1\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD803[\uDD8E\uDD8F\uDED1-\uDED8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDEE0-\uDEF0\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED8\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8\uDF00-\uDF92\uDF94-\uDFEF\uDFFA]/,xf=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,oM=Object.freeze(Object.defineProperty({__proto__:null,Any:gf,Cc:_f,Cf:aM,P:Yc,S:vf,Z:xf},Symbol.toStringTag,{value:"Module"})),lM=[8364,0,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,0,381,0,0,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,0,382,376];function cM(n){return n===0||n>=55296&&n<=57343||n>1114111}function hM(n){return cM(n)?65533:n>=128&&n<=159&&lM[n-128]||n}function uM(n){return n-1>>>0<127||n-160>>>0<55136?String.fromCharCode(n):String.fromCodePoint(hM(n))}const yn=(()=>{const n=new Uint8Array(127);let e=0;for(let t=33;t<=126;t++)t!==34&&t!==36&&t!==92&&(n[t]=e++);return n})();function dM(n,e,t,i,s,r){const o=n.length,l=r*90;let c=0;const h=()=>{const E=yn[n.charCodeAt(c++)];return E<r?E:E*91-l+yn[n.charCodeAt(c++)]},u=t-i,d=t+s,f=new Int32Array(d);f.fill(-1,i,r),f.fill(-1,r+u,d);const p=new Int32Array(d),_=new Int32Array(d);function m(E,D){let A=0,I=D;const F=D+E;for(;I<F;){const H=yn[n.charCodeAt(c++)];if(H<89)A+=H,f[I++]=A;else if(H===89){let B=yn[n.charCodeAt(c++)]+2;for(;B--;)f[I++]=++A}else{const B=yn[n.charCodeAt(c++)];A+=89+(B<90?B*91+yn[n.charCodeAt(c++)]:yn[n.charCodeAt(c++)]*8281+yn[n.charCodeAt(c++)]*91+yn[n.charCodeAt(c++)]),f[I++]=A}}}m(i,0),m(u,r);const g=new Int32Array(s*2);let y=0,S=0;function v(E,D){for(let A=0;A<E;A++){const I=D+A,F=h(),H=h();g[S*2]=F,g[S*2+1]=H,S+=1,p[I]=y;const B=(f[F]<0?_[F]:1)+(f[H]<0?_[H]:1);_[I]=B,y+=B}}v(s-r+i,r+u),v(r-i,i);const M=new Uint16Array(y);let w=0;for(let E=0;E<S;E++)for(let D=0;D<2;D++){const A=g[E*2+D],I=f[A];if(I<0){let F=p[A];const H=F+_[A];for(;F<H;)M[w++]=M[F++]}else M[w++]=I}const C=new Uint16Array(e);let x=0;for(;c<o;){let E=yn[n.charCodeAt(c++)];E>=r&&(E=E*91-l+yn[n.charCodeAt(c++)]);const D=f[E];if(D<0){let A=p[E];const I=A+_[E];for(;A<I;)C[x++]=M[A++]}else C[x++]=D}return C}const fM=dM("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P",13494,2713,49,25,61);var kt;(function(n){n[n.VALUE_LENGTH=49152]="VALUE_LENGTH",n[n.FLAG13=8192]="FLAG13",n[n.BRANCH_LENGTH=8064]="BRANCH_LENGTH",n[n.JUMP_TABLE=127]="JUMP_TABLE",n[n.VALUE_MASK=8191]="VALUE_MASK"})(kt||(kt={}));var en;(function(n){n[n.AMP=38]="AMP",n[n.NUM=35]="NUM",n[n.SEMI=59]="SEMI",n[n.EQUALS=61]="EQUALS",n[n.ZERO=48]="ZERO",n[n.NINE=57]="NINE",n[n.LOWER_A=97]="LOWER_A",n[n.LOWER_X=120]="LOWER_X"})(en||(en={}));const Na=32,bf=21,pM=2097151,dc=2047;let yf=0;function mM(n){const e=n>>>bf;return e===dc?yf:e}function gM(n){return n-en.ZERO>>>0<=9}function _M(n){return(n|Na)-en.LOWER_A>>>0<=5}function vM(n){return(n|Na)-en.LOWER_A>>>0<=25}var Zu;(function(n){n[n.EntityStart=0]="EntityStart",n[n.NumericStart=1]="NumericStart",n[n.NumericDecimal=2]="NumericDecimal",n[n.NumericHex=3]="NumericHex",n[n.NamedEntity=4]="NamedEntity"})(Zu||(Zu={}));var Ju;(function(n){n[n.Legacy=0]="Legacy",n[n.Strict=1]="Strict",n[n.Attribute=2]="Attribute"})(Ju||(Ju={}));function xM(n,e,t,i){const s=(e&kt.BRANCH_LENGTH)>>7,r=e&kt.JUMP_TABLE;if(r){if(s===0)return i===r?t:-1;const l=i-r;if(l>>>0>=s)return-1;const c=n[t+l];return c===0?-1:t+s+c-1&65535}if(s===0)return-1;const a=s+1>>1,o=t+a+s;for(let l=0;l<s;l++){const h=n[t+(l>>1)]>>((l&1)<<3)&255;if(h===i){const u=t+a+l;return o+n[u]&65535}if(h>i)return-1}return-1}function Qu(n,e,t){return t===1?String.fromCharCode(n[e]&kt.VALUE_MASK):t===2?String.fromCharCode(n[e+1]):String.fromCharCode(n[e+1],n[e+2])}function bM(n,e,t){let i=e+1,s=0,r=i;if(i<t&&(n.charCodeAt(i)|Na)===en.LOWER_X)for(i+=1,r=i;i<t;){const o=n.charCodeAt(i);if(gM(o))s=s*16+(o-en.ZERO);else if(_M(o))s=s*16+((o|Na)-en.LOWER_A+10);else break;i+=1}else for(;i<t;){const o=n.charCodeAt(i)-en.ZERO;if(o>>>0>9)break;s=s*10+o,i+=1}if(i===r)return 0;i<t&&n.charCodeAt(i)===en.SEMI&&(i+=1),s>1114111&&(s=1114112);let a=i-e;return a>=dc&&(yf=a,a=dc),a<<bf|s}function yM(n,e,t){const i=fM;let s=n.indexOf("&");if(s<0)return n;const r=n.length;let a=0,o="";const l=i[0],c=l&kt.JUMP_TABLE,h=(l&kt.BRANCH_LENGTH)>>7;do{const u=s+1,d=n.charCodeAt(u);let f,p;if(d===en.NUM){const _=bM(n,u,r);f=mM(_),f>0&&n.charCodeAt(u+f-1)!==en.SEMI&&(f=0),p=f===0?"":uM(_&pM)}else if(vM(d)){f=0,p="";const _=d-c;let m;if(_>>>0<h){const M=i[1+_];m=M===0?-1:h+M&65535}else m=-1;let g=0,y=0,S=m<0?0:i[m],v=u+1;e:for(;v<r;){for(;(S&(kt.VALUE_LENGTH|kt.FLAG13))===0&&(S&kt.JUMP_TABLE)!==0;){const x=S&kt.JUMP_TABLE,E=(S&kt.BRANCH_LENGTH)>>7;if(E===0){if(n.charCodeAt(v)!==x)break e;m+=1}else{const D=n.charCodeAt(v)-x;if(D>>>0>=E)break e;const A=i[m+1+D];if(A===0)break e;m=m+E+A&65535}if(S=i[m],v+=1,v>=r)break e}if((S&(kt.VALUE_LENGTH|kt.FLAG13))===kt.FLAG13){const x=(S&kt.BRANCH_LENGTH)>>7;if(n.charCodeAt(v)!==(S&kt.JUMP_TABLE))break;v+=1;const E=x-1;let D=m+1,A=0;for(;A+1<E;A+=2){const I=i[D];if(n.charCodeAt(v)!==(I&255)||(v+=1,n.charCodeAt(v)!==(I>>8&255)))break e;v+=1,D+=1}if(A<E){if(n.charCodeAt(v)!==(i[D]&255))break;v+=1}m+=1+(x>>1),S=i[m];continue}const M=S>>>14,w=n.charCodeAt(v);if(M!==0){if(w===en.SEMI){f=v-u+1,p=M===1?String.fromCharCode(S&kt.VALUE_MASK):Qu(i,m,M);break}if(M===1)break}const C=xM(i,S,m+(M||1),w);if(C<0)break;m=C,S=i[m],v+=1}p===""&&f>0&&(p=Qu(i,g,y))}else f=0,p="";f===0||t?s=u:(a<s&&(o+=n.slice(a,s)),o+=p,s=a=u+f),n.charCodeAt(s)!==en.AMP&&(s=n.indexOf("&",s))}while(s>=0);return o+n.slice(a)}function Mf(n){return yM(n,!0,!1)}var MM=class{src_Any=gf.source;src_Cc=_f.source;src_Z=xf.source;src_P=Yc.source;src_ZPCc=[this.src_Z,this.src_P,this.src_Cc].join("|");src_ZCc=[this.src_Z,this.src_Cc].join("|");cache={};opts={maxLength:1e4,urlAuth:!1,schema_names:[]};constructor(n={}){this.opts={...this.opts,...n}}set(n={}){return this.opts={...this.opts,...n},this.cache={},this}escapeRE(n){return n.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}nestedPairRE(n,e,t=4){const i=this.escapeRE(n),s=this.escapeRE(e),r=`(?:(?!${this.src_ZCc}|${i}|${s}).)`;let a=`${i}${r}{0,1000}${s}`;for(let o=2;o<=t;o++)a=`${i}(?:${r}|${a}){0,1000}${s}`;return a}get_text_separators(){return this.cache.text_separators??=/[><\uff5c]/}get_pseudo_letter(){return this.cache.src_pseudo_letter??=new RegExp(`(?:(?!${this.get_text_separators().source}|${this.src_ZPCc})${this.src_Any})`)}get_ipv4_addr(){return this.cache.src_ip4??=new RegExp("(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])[.]){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])")}get_ipv6_addr(){const n="[0-9A-Fa-f]{1,4}",e=`(?:(?:${n}:${n})|${this.get_ipv4_addr().source})`;return this.cache.src_ip6_addr??=new RegExp(`(?:(?:${n}:){6}${e}|::(?:${n}:){5}${e}|(?:${n})?::(?:${n}:){4}${e}|(?:(?:${n}:){0,1}${n})?::(?:${n}:){3}${e}|(?:(?:${n}:){0,2}${n})?::(?:${n}:){2}${e}|(?:(?:${n}:){0,3}${n})?::${n}:${e}|(?:(?:${n}:){0,4}${n})?::${e}|(?:(?:${n}:){0,5}${n})?::${n}|(?:(?:${n}:){0,6}${n})?::)`)}get_ipv6_url_host(){return this.cache.src_ip6_host??=new RegExp(`\\[${this.get_ipv6_addr().source}\\]`)}get_ipv6_mail_host(){return this.cache.src_ipv6_mail_host??=new RegExp(`\\[IPv6:${this.get_ipv6_addr().source}\\]`)}get_auth(){return this.cache.src_auth??=new RegExp(`(?:(?:(?!${this.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`)}get_port(){return this.cache.src_port??=new RegExp("(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?")}get_host_terminator(){return this.cache.src_host_terminator??=new RegExp(`(?=$|${this.get_text_separators().source}|${this.src_ZPCc})(?!${this.opts["---"]?"-(?!--)|":"-|"}_|:\\d|\\.-|\\.(?!$|${this.src_ZPCc}))`)}get_path_terminator(){return this.cache.src_path_terminator??=new RegExp(`${this.src_ZPCc}|${this.get_text_separators().source}`)}get_path(){return this.cache.src_path??=new RegExp(`(?:[/?#](?:${this.nestedPairRE("[","]")}|${this.nestedPairRE("(",")")}|${this.nestedPairRE("{","}")}|\\"(?:(?!${this.src_ZCc}|["]).){1,100}\\"|\\'(?:(?!${this.src_ZCc}|[']).){1,100}\\'|\\'(?=${this.get_pseudo_letter().source}|[-])|\\.{2,20}[:]?[a-zA-Z0-9%/&]|\\.(?!${this.src_ZCc}|[.]|$)|`+(this.opts["---"]?"\\-(?!--(?:[^-]|$))(?:-{0,19})|":"\\-{1,20}|")+`,(?!${this.src_ZCc}|$)|;(?!${this.src_ZCc}|$)|\\!{1,20}(?!${this.src_ZCc}|[!]|$)|\\?(?!${this.src_ZCc}|[?]|$)|`+this.get_path_extra().source+`[\\\\/:%@#&=_~*]|(?!${this.get_path_terminator().source}).){1,${this.opts.maxLength}}|\\/)?`)}get_mail_name(){return this.cache.src_mail_name??=new RegExp("[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9](?:[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9]|[.](?=[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9])){0,63}")}get_xn(){return this.cache.src_xn??=new RegExp("xn--[a-z0-9\\-]{1,59}")}get_tld(){if(this.cache.tld)return this.cache.tld;const n=[...new Set(this.opts.tlds||[])].sort().reverse().join("|");return this.cache.tld=new RegExp(`${n||"$#none#$"}|${this.get_xn().source}`),this.cache.tld}get_domain_root(){return this.cache.src_domain_root??=new RegExp("(?:"+this.get_xn().source+`|${this.get_pseudo_letter().source}{1,63})`)}get_domain(){return this.cache.src_domain??=new RegExp("(?:"+this.get_xn().source+`|(?:${this.get_pseudo_letter().source})|(?:${this.get_pseudo_letter().source}(?:-|${this.get_pseudo_letter().source}){0,61}${this.get_pseudo_letter().source}))`)}get_url_host_port(){return this.cache.url_host_port??=new RegExp("(?:"+this.get_ipv6_url_host().source+`|(?:(?:(?:${this.get_domain().source})\\.){0,10}${this.get_domain().source}))`+this.get_port().source+this.get_host_terminator().source)}get_fuzzy_url_host_port(){return this.cache.fuzzy_url_host_port??=new RegExp("(?:"+(this.opts.fuzzyIP?this.get_ipv4_addr().source+"|":"")+`(?:(?:(?:${this.get_domain().source})\\.){1,10}(?:${this.get_tld().source})))`+this.get_host_terminator().source)}get_mail_host(){return this.cache.src_mail_host??=new RegExp("(?:"+this.get_ipv6_mail_host().source+`|(?:(?:(?:${this.get_domain().source})\\.){0,4}${this.get_domain().source}))`+this.get_host_terminator().source)}get_fuzzy_mail_host(){return this.cache.src_fuzzy_mail_host??=new RegExp("(?:"+this.get_ipv6_mail_host().source+`|(?:(?:(?:${this.get_domain().source})[.]){1,4}${this.get_domain_root().source}))`+this.get_host_terminator().source)}get_path_extra(){return this.cache.src_path_extra??=new RegExp("")}get_fuzzy_mail_host_search(){return this.cache.mail_fuzzy_host_search??=new RegExp(`@${this.get_fuzzy_mail_host().source}`,"ig")}get_fuzzy_link_search(){return this.cache.link_fuzzy_search??=new RegExp(`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${this.src_ZPCc}))(?:(?![$+<=>^\`|｜])${this.get_fuzzy_url_host_port().source}${this.get_path().source})`,"ig")}get_http_validator(){return this.cache.http_validator??=new RegExp("\\/\\/"+(this.opts.urlAuth?this.get_auth().source:"")+this.get_url_host_port().source+this.get_path().source,"iy")}get_relative_proto_validator(){return this.cache.relative_proto_validator??=new RegExp((this.opts.urlAuth?this.get_auth().source:"")+`(?:localhost|${this.get_ipv6_url_host().source}|(?:(?:${this.get_domain().source})[.]){1,10}${this.get_domain_root().source})`+this.get_port().source+this.get_host_terminator().source+this.get_path().source,"iy")}get_mail_name_validator(){return this.cache.mail_name_validator??=new RegExp(`(?:^|${this.get_text_separators().source}|"|\\(|${this.src_ZCc})(${this.get_mail_name().source})$`)}get_mailto_validator(){return this.cache.mailto_validator??=new RegExp(`${this.get_mail_name().source}@${this.get_mail_host().source}`,"iy")}get_schema_names(){return this.cache.schema_names??=new RegExp((this.opts.schema_names||[]).map(n=>this.escapeRE(n)).join("|"))}get_schema_search(){return this.cache.schema_search??=new RegExp(`(^|(?!_)(?:[><｜]|${this.src_ZPCc}))(${this.get_schema_names().source})`,"ig")}get_schema_at_start(){return this.cache.schema_at_start??=new RegExp(`^${this.get_schema_search().source}`,"i")}},Ko={validate:(n,e,t)=>{const i=t.re.get_http_validator();i.lastIndex=e;const s=i.exec(n);return s?s[0].length:0},normalize:(n,e)=>e.normalize(n)},SM={"http:":Ko,"https:":Ko,"ftp:":Ko,"//":{validate:function(n,e,t){const i=t.re.get_relative_proto_validator();i.lastIndex=e;const s=i.exec(n);return s?e>=3&&n[e-3]===":"||e>=3&&n[e-3]==="/"?0:s[0].length:0},normalize:(n,e)=>e.normalize(n)},"mailto:":{validate:function(n,e,t){const i=t.re.get_mailto_validator();i.lastIndex=e;const s=i.exec(n);return s?s[0].length:0},normalize:(n,e)=>e.normalize(n)}},EM="a:cdefgilmnoqrstuwxz|b:abdefghijmnorstvwyz|c:acdfghiklmnoruvwxyz|d:ejkmoz|e:cegrstu|f:ijkmor|g:abdefghilmnpqrstuwy|h:kmnrtu|i:delmnoqrst|j:emop|k:eghimnprwyz|l:abcikrstuvy|m:acdeghklmnopqrstuvwxyz|n:acefgilopruz|o:m|p:aefghklmnrstwy|q:a|r:eosuw|s:abcdeghijklmnortuvxyz|t:cdfghjklmnortvwz|u:agksyz|v:aceginu|w:fs|y:et|z:amw",TM="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф";function wM(){const n=TM.split("|");return EM.split("|").forEach(e=>{const t=e.indexOf(":"),i=e.slice(0,t);for(const s of e.slice(t+1))n.push(i+s)}),n}var AM={fuzzyLink:!1,fuzzyEmail:!0,fuzzyIP:!1,"---":!1,tlds:wM(),urlAuth:!1,maxLength:1e4},ed=class{schema;index;lastIndex;raw;text;url;constructor(n,e,t,i){const s=n.slice(t,i);this.schema=e.toLowerCase(),this.index=t,this.lastIndex=i,this.raw=s,this.text=s,this.url=s}},RM=class{__opts__;__schemas__;re;constructor(n={}){const{rebuilder:e,...t}=n;this.__opts__={...AM,...t},this.__schemas__={...SM},this.re=e||new MM,this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)})}add(n,e=null){if(!e)delete this.__schemas__[n];else{const t={normalize:(i,s)=>s.normalize(i),...e};this.__schemas__[n]=t}return this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)}),this}set(n={}){return this.__opts__={...this.__opts__,...n},this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)}),this}test(n){if(!n.length)return!1;let e,t;for(t=this.re.get_schema_search(),t.lastIndex=0;(e=t.exec(n))!==null;)if(this.testSchemaAt(n,e[2],t.lastIndex))return!0;if(this.__opts__.fuzzyLink&&this.__schemas__["http:"]&&(t=this.re.get_fuzzy_link_search(),t.lastIndex=0,t.exec(n)!==null))return!0;if(this.__opts__.fuzzyEmail&&this.__schemas__["mailto:"]&&n.indexOf("@")>=0){const i=this.re.get_fuzzy_mail_host_search(),s=this.re.get_mail_name_validator();for(i.lastIndex=0;(e=i.exec(n))!==null;){const r=n.slice(Math.max(0,e.index-65),e.index);if(s.test(r))return!0}}return!1}testSchemaAt(n,e,t){return this.__schemas__[e.toLowerCase()]?this.__schemas__[e.toLowerCase()].validate(n.slice(0,t+this.__opts__.maxLength),t,this):0}match(n){const e=[],t=this.re.get_schema_search();let i,s,r,a,o,l,c=!1,h=!1,u=!1,d=0;if(!n.length)return null;for(t.lastIndex=0,this.__opts__.fuzzyLink&&this.__schemas__["http:"]&&(i=this.re.get_fuzzy_link_search(),i.lastIndex=0),this.__opts__.fuzzyEmail&&this.__schemas__["mailto:"]&&(s=this.re.get_fuzzy_mail_host_search(),s.lastIndex=0,r=this.re.get_mail_name_validator());;){const f=Math.max(d-1,0);if(s&&r&&!u&&(!o||o.index<d))for(s.lastIndex<f&&(s.lastIndex=f);;){const y=s.exec(n);if(!y){u=!0,o=void 0;break}const S=r.exec(n.slice(Math.max(0,y.index-65),y.index));if(S){if(o={schema:"mailto:",index:y.index-S[1].length,lastIndex:y.index+y[0].length},o.index>=d)break;s.lastIndex<f&&(s.lastIndex=f)}}if(i&&!h&&(!a||a.index<d))for(i.lastIndex<f&&(i.lastIndex=f);;){const y=i.exec(n);if(!y){h=!0,a=void 0;break}if(a={schema:"",index:y.index+y[1].length,lastIndex:y.index+y[0].length},a.index>=d)break;i.lastIndex<f&&(i.lastIndex=f)}let p=o;(!p||a&&(a.index<p.index||a.index===p.index&&a.lastIndex>p.lastIndex))&&(p=a);let _;if(!c)for(;;){if(!l){t.lastIndex<f&&(t.lastIndex=f);const v=t.exec(n);if(!v){c=!0;break}l={schema:v[2],index:v.index+v[1].length,lastIndex:v.index+v[0].length}}if(l.index<d){l=void 0;continue}if(p&&l.index>p.index)break;const y=l;l=void 0;const S=this.testSchemaAt(n,y.schema,y.lastIndex);if(S){_={schema:y.schema,index:y.index,lastIndex:y.lastIndex+S};break}}let m=_;if((!m||o&&(o.index<m.index||o.index===m.index&&o.lastIndex>m.lastIndex))&&(m=o),(!m||a&&(a.index<m.index||a.index===m.index&&a.lastIndex>m.lastIndex))&&(m=a),!m)break;m===o?o=void 0:m===a&&(a=void 0);const g=new ed(n,m.schema,m.index,m.lastIndex);g.schema?this.__schemas__[g.schema].normalize(g,this):this.normalize(g),e.push(g),d=m.lastIndex}return e.length?e:null}matchAtStart(n){if(!n.length)return null;const e=this.re.get_schema_at_start().exec(n);if(!e)return null;const t=this.testSchemaAt(n,e[2],e[0].length);if(!t)return null;const i=new ed(n,e[2],e.index+e[1].length,e.index+e[0].length+t);return this.__schemas__[i.schema].normalize(i,this),i}tlds(n,e=!1){return n=Array.isArray(n)?n:[n],e?this.__opts__.tlds=this.__opts__.tlds.concat(n):this.__opts__.tlds=n,this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)}),this}normalize(n){n.schema||(n.url=`http://${n.url}`),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url=`mailto:${n.url}`)}};const ws=2147483647,zn=36,$c=1,yr=26,CM=38,DM=700,Sf=72,Ef=128,Tf="-",PM=/^xn--/,IM=/[^\0-\x7F]/,LM=/[\x2E\u3002\uFF0E\uFF61]/g,NM={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Zo=zn-$c,Vn=Math.floor,Jo=String.fromCharCode;function Mi(n){throw new RangeError(NM[n])}function FM(n,e){const t=[];let i=n.length;for(;i--;)t[i]=e(n[i]);return t}function wf(n,e){const t=n.split("@");let i="";t.length>1&&(i=t[0]+"@",n=t[1]),n=n.replace(LM,".");const s=n.split("."),r=FM(s,e).join(".");return i+r}function Af(n){const e=[];let t=0;const i=n.length;for(;t<i;){const s=n.charCodeAt(t++);if(s>=55296&&s<=56319&&t<i){const r=n.charCodeAt(t++);(r&64512)==56320?e.push(((s&1023)<<10)+(r&1023)+65536):(e.push(s),t--)}else e.push(s)}return e}const UM=n=>String.fromCodePoint(...n),kM=function(n){return n>=48&&n<58?26+(n-48):n>=65&&n<91?n-65:n>=97&&n<123?n-97:zn},td=function(n,e){return n+22+75*(n<26)-((e!=0)<<5)},Rf=function(n,e,t){let i=0;for(n=t?Vn(n/DM):n>>1,n+=Vn(n/e);n>Zo*yr>>1;i+=zn)n=Vn(n/Zo);return Vn(i+(Zo+1)*n/(n+CM))},Cf=function(n){const e=[],t=n.length;let i=0,s=Ef,r=Sf,a=n.lastIndexOf(Tf);a<0&&(a=0);for(let o=0;o<a;++o)n.charCodeAt(o)>=128&&Mi("not-basic"),e.push(n.charCodeAt(o));for(let o=a>0?a+1:0;o<t;){const l=i;for(let h=1,u=zn;;u+=zn){o>=t&&Mi("invalid-input");const d=kM(n.charCodeAt(o++));d>=zn&&Mi("invalid-input"),d>Vn((ws-i)/h)&&Mi("overflow"),i+=d*h;const f=u<=r?$c:u>=r+yr?yr:u-r;if(d<f)break;const p=zn-f;h>Vn(ws/p)&&Mi("overflow"),h*=p}const c=e.length+1;r=Rf(i-l,c,l==0),Vn(i/c)>ws-s&&Mi("overflow"),s+=Vn(i/c),i%=c,e.splice(i++,0,s)}return String.fromCodePoint(...e)},Df=function(n){const e=[];n=Af(n);const t=n.length;let i=Ef,s=0,r=Sf;for(const l of n)l<128&&e.push(Jo(l));const a=e.length;let o=a;for(a&&e.push(Tf);o<t;){let l=ws;for(const h of n)h>=i&&h<l&&(l=h);const c=o+1;l-i>Vn((ws-s)/c)&&Mi("overflow"),s+=(l-i)*c,i=l;for(const h of n)if(h<i&&++s>ws&&Mi("overflow"),h===i){let u=s;for(let d=zn;;d+=zn){const f=d<=r?$c:d>=r+yr?yr:d-r;if(u<f)break;const p=u-f,_=zn-f;e.push(Jo(td(f+p%_,0))),u=Vn(p/_)}e.push(Jo(td(u,0))),r=Rf(s,c,o===a),s=0,++o}++s,++i}return e.join("")},OM=function(n){return wf(n,function(e){return PM.test(e)?Cf(e.slice(4).toLowerCase()):e})},BM=function(n){return wf(n,function(e){return IM.test(e)?"xn--"+Df(e):e})},nd={version:"2.3.1",ucs2:{decode:Af,encode:UM},decode:Cf,encode:Df,toASCII:BM,toUnicode:OM};var id=Object.defineProperty,Pf=(n,e)=>{let t={};for(var i in n)id(t,i,{get:n[i],enumerable:!0});return id(t,Symbol.toStringTag,{value:"Module"}),t},zM=Pf({arrayReplaceAt:()=>VM,asciiTrim:()=>Ja,callable:()=>If,escapeHtml:()=>Di,escapeRE:()=>ZM,fromCodePoint:()=>Mr,isMdAsciiPunct:()=>Tr,isPunctChar:()=>Nf,isPunctCharCode:()=>Er,isSpace:()=>pt,isValidEntityCode:()=>Kc,isWhiteSpace:()=>Sr,lib:()=>JM,normalizeReference:()=>Za,unescapeAll:()=>Gs,unescapeMd:()=>XM});function If(n){const e=function(...t){return Reflect.construct(n,t,new.target&&new.target!==e?new.target:n)};return Object.defineProperty(e,"name",{value:n.name}),Object.setPrototypeOf(e,n),e.prototype=n.prototype,e}function VM(n,e,t){return[].concat(n.slice(0,e),t,n.slice(e+1))}function Kc(n){return!(n>=55296&&n<=57343||n>=64976&&n<=65007||(n&65535)===65535||(n&65535)===65534||n>=0&&n<=8||n===11||n>=14&&n<=31||n>=127&&n<=159||n>1114111)}function Mr(n){if(n>65535){n-=65536;const e=55296+(n>>10),t=56320+(n&1023);return String.fromCharCode(e,t)}return String.fromCharCode(n)}var Lf=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,HM=new RegExp(`${Lf.source}|${/&([a-z#][a-z0-9]{1,31});/gi.source}`,"gi"),GM=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function WM(n,e){if(e.charCodeAt(0)===35&&GM.test(e)){const i=e[1].toLowerCase()==="x"?parseInt(e.slice(2),16):parseInt(e.slice(1),10);return Kc(i)?Mr(i):n}const t=Mf(n);return t!==n?t:n}function XM(n){return n.indexOf("\\")<0?n:n.replace(Lf,"$1")}function Gs(n){return n.indexOf("\\")<0&&n.indexOf("&")<0?n:n.replace(HM,function(e,t,i){return t||WM(e,i)})}var jM=/[&<>"]/,qM=/[&<>"]/g,YM={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function $M(n){return YM[n]}function Di(n){return jM.test(n)?n.replace(qM,$M):n}var KM=/[.?*+^$[\]\\(){}|-]/g;function ZM(n){return n.replace(KM,"\\$&")}function pt(n){switch(n){case 9:case 32:return!0}return!1}function Sr(n){if(n>=8192&&n<=8202)return!0;switch(n){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Nf(n){return Yc.test(n)||vf.test(n)}function Er(n){return Nf(Mr(n))}function Tr(n){switch(n){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function Za(n){return n=n.trim().replace(/\s+/g," "),n.toLowerCase().toUpperCase()}function sd(n){return n===32||n===9||n===10||n===13}function Ja(n){let e=0;for(;e<n.length&&sd(n.charCodeAt(e));e++);let t=n.length-1;for(;t>=e&&sd(n.charCodeAt(t));t--);return n.slice(e,t+1)}var JM={mdurl:rM,ucmicro:oM};function QM(n,e,t){let i,s,r,a;const o=n.posMax,l=n.pos;for(n.pos=e+1,i=1;n.pos<o;){if(r=n.src.charCodeAt(n.pos),r===93&&(i--,i===0)){s=!0;break}if(a=n.pos,n.md.inline.skipToken(n),r===91){if(a===n.pos-1)i++;else if(t)return n.pos=l,-1}}let c=-1;return s&&(c=n.pos),n.pos=l,c}function eS(n,e,t){let i,s=e;const r={ok:!1,pos:0,str:""};if(n.charCodeAt(s)===60){for(s++;s<t;){if(i=n.charCodeAt(s),i===10||i===60)return r;if(i===62)return r.pos=s+1,r.str=Gs(n.slice(e+1,s)),r.ok=!0,r;if(i===92&&s+1<t){s+=2;continue}s++}return r}let a=0;for(;s<t&&(i=n.charCodeAt(s),!(i===32||i<32||i===127));){if(i===92&&s+1<t){if(n.charCodeAt(s+1)===32){s++;continue}s+=2;continue}if(i===40&&(a++,a>32))return r;if(i===41){if(a===0)break;a--}s++}return e===s||a!==0||(r.str=Gs(n.slice(e,s)),r.pos=s,r.ok=!0),r}function tS(n,e,t,i){let s,r=e;const a={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(i)a.str=i.str,a.marker=i.marker;else{if(r>=t)return a;let o=n.charCodeAt(r);if(o!==34&&o!==39&&o!==40)return a;e++,r++,o===40&&(o=41),a.marker=o}for(;r<t;){if(s=n.charCodeAt(r),s===a.marker)return a.pos=r+1,a.str+=Gs(n.slice(e,r)),a.ok=!0,a;if(s===40&&a.marker===41)return a;s===92&&r+1<t&&r++,r++}return a.can_continue=!0,a.str+=Gs(n.slice(e,r)),a}var nS=Pf({parseLinkDestination:()=>eS,parseLinkLabel:()=>QM,parseLinkTitle:()=>tS});function wr(n){"@babel/helpers - typeof";return wr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},wr(n)}function iS(n,e){if(wr(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e);if(wr(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function sS(n){var e=iS(n,"string");return wr(e)=="symbol"?e:e+""}function Ee(n,e,t){return(e=sS(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var Wi=class{constructor(n,e,t){Ee(this,"map",null),Ee(this,"level",0),Ee(this,"children",null),Ee(this,"content",""),Ee(this,"markup",""),Ee(this,"info",""),Ee(this,"block",!1),Ee(this,"hidden",!1),this.type=n,this.tag=e,this.attrs=null,this.nesting=t,this.meta=null}attrIndex(n){if(!this.attrs)return-1;const e=this.attrs;for(let t=0,i=e.length;t<i;t++)if(e[t][0]===n)return t;return-1}attrPush(n){this.attrs?this.attrs.push(n):this.attrs=[n]}attrSet(n,e){const t=this.attrIndex(n),i=[n,e];t<0?this.attrPush(i):this.attrs[t]=i}attrGet(n){const e=this.attrIndex(n);let t=null;return e>=0&&(t=this.attrs[e][1]),t}attrJoin(n,e){const t=this.attrIndex(n);t<0?this.attrPush([n,e]):this.attrs[t][1]=`${this.attrs[t][1]} ${e}`}},Ar=class{constructor(){Ee(this,"__rules__",[]),Ee(this,"__cache__",null)}__find__(n){for(let e=0;e<this.__rules__.length;e++)if(this.__rules__[e].name===n)return e;return-1}__compile__(){const n=new Set;this.__rules__.forEach(e=>{e.enabled&&e.alt.forEach(t=>{t&&n.add(t)})}),this.__cache__=Object.create(null),this.__cache__[""]=[],this.__rules__.forEach(e=>{e.enabled&&this.__cache__[""].push(e.fn)}),n.forEach(e=>{this.__cache__[e]=[],this.__rules__.forEach(t=>{t.enabled&&t.alt.indexOf(e)>=0&&this.__cache__[e].push(t.fn)})})}at(n,e,t={}){const i=this.__find__(n);if(i===-1)throw new Error(`Parser rule not found: ${n}`);this.__rules__[i].fn=e,this.__rules__[i].alt=t.alt||[],this.__cache__=null}before(n,e,t,i={}){const s=this.__find__(n);if(s===-1)throw new Error(`Parser rule not found: ${n}`);this.__rules__.splice(s,0,{name:e,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null}after(n,e,t,i={}){const s=this.__find__(n);if(s===-1)throw new Error(`Parser rule not found: ${n}`);this.__rules__.splice(s+1,0,{name:e,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null}push(n,e,t={}){this.__rules__.push({name:n,enabled:!0,fn:e,alt:t.alt||[]}),this.__cache__=null}enable(n,e=!1){Array.isArray(n)||(n=[n]);const t=[];return n.forEach(i=>{const s=this.__find__(i);if(s<0){if(e)return;throw new Error(`Rules manager: invalid rule name ${i}`)}this.__rules__[s].enabled=!0,t.push(i)}),this.__cache__=null,t}enableOnly(n,e=!1){Array.isArray(n)||(n=[n]),this.__rules__.forEach(t=>{t.enabled=!1}),this.enable(n,e)}disable(n,e=!1){Array.isArray(n)||(n=[n]);const t=[];return n.forEach(i=>{const s=this.__find__(i);if(s<0){if(e)return;throw new Error(`Rules manager: invalid rule name ${i}`)}this.__rules__[s].enabled=!1,t.push(i)}),this.__cache__=null,t}getRules(n){return this.__cache__||this.__compile__(),this.__cache__[n]||[]}},jn={};jn.code_inline=function(n,e,t,i,s){const r=n[e];return`<code${s.renderAttrs(r)}>${Di(r.content)}</code>`};jn.code_block=function(n,e,t,i,s){const r=n[e];return`<pre${s.renderAttrs(r)}><code>${Di(n[e].content)}</code></pre>
`};jn.fence=function(n,e,t,i,s){const r=n[e],a=r.info?Gs(r.info).trim():"";let o="",l="";if(a){const h=a.split(/(\s+)/g);o=h[0],l=h.slice(2).join("")}let c;if(t.highlight?c=t.highlight(r.content,o,l)||Di(r.content):c=Di(r.content),c.indexOf("<pre")===0)return c+`
`;if(a){const h=r.attrIndex("class"),u=r.attrs?r.attrs.slice():[];h<0?u.push(["class",`${t.langPrefix}${o}`]):(u[h]=[u[h][0],u[h][1]],u[h][1]+=` ${t.langPrefix}${o}`);const d={attrs:u};return`<pre><code${s.renderAttrs(d)}>${c}</code></pre>
`}return`<pre><code${s.renderAttrs(r)}>${c}</code></pre>
`};jn.image=function(n,e,t,i,s){const r=n[e];return r.attrs[r.attrIndex("alt")][1]=s.renderInlineAsText(r.children,t,i),s.renderToken(n,e,t)};jn.hardbreak=function(n,e,t){return t.xhtmlOut?`<br />
`:`<br>
`};jn.softbreak=function(n,e,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};jn.text=function(n,e){return Di(n[e].content)};jn.html_block=function(n,e){return n[e].content};jn.html_inline=function(n,e){return n[e].content};var Ff=class{constructor(){Ee(this,"rules",Object.assign({},jn))}renderAttrs(n){let e,t,i;if(!n.attrs)return"";for(i="",e=0,t=n.attrs.length;e<t;e++)i+=` ${Di(n.attrs[e][0])}="${Di(String(n.attrs[e][1]))}"`;return i}renderToken(n,e,t){const i=n[e];let s="";if(i.hidden)return"";let r=e-1;for(;r>=0&&n[r].hidden&&n[r].nesting===0;)r--;i.block&&i.nesting!==-1&&r>=0&&n[r].hidden&&n[r].nesting===-1&&(s+=`
`),s+=(i.nesting===-1?"</":"<")+i.tag,s+=this.renderAttrs(i),i.nesting===0&&t.xhtmlOut&&(s+=" /");let a=!1;if(i.block&&(a=!0,i.nesting===1)){let o=e+1;for(;o<n.length&&n[o].hidden&&n[o].nesting===0;)o++;if(o<n.length){const l=n[o];(l.type==="inline"||l.hidden||l.nesting===-1&&l.tag===i.tag)&&(a=!1)}}return s+=a?`>
`:">",s}renderInline(n,e,t){let i="";const s=this.rules;for(let r=0,a=n.length;r<a;r++){const o=n[r].type;typeof s[o]<"u"?i+=s[o](n,r,e,t,this):i+=this.renderToken(n,r,e)}return i}renderInlineAsText(n,e,t){let i="";for(let s=0,r=n.length;s<r;s++)switch(n[s].type){case"text":case"code_inline":i+=n[s].content;break;case"image":i+=this.renderInlineAsText(n[s].children,e,t);break;case"html_inline":case"html_block":i+=n[s].content;break;case"softbreak":case"hardbreak":i+=`
`}return i}render(n,e,t){let i="";const s=this.rules;for(let r=0,a=n.length;r<a;r++){const o=n[r].type;o==="inline"?i+=this.renderInline(n[r].children,e,t):typeof s[o]<"u"?i+=s[o](n,r,e,t,this):i+=this.renderToken(n,r,e)}return i}},Uf=class{constructor(n,e,t){Ee(this,"tokens",[]),Ee(this,"inlineMode",!1),Ee(this,"Token",Wi),this.src=n,this.env=t,this.md=e}},rS=/\r\n?/g,aS=/\0/g;function oS(n){let e;e=n.src.replace(rS,`
`),e=e.replace(aS,"�"),n.src=e}function lS(n){let e;n.inlineMode?(e=new n.Token("inline","",0),e.content=n.src,e.map=[0,1],e.children=[],n.tokens.push(e)):n.md.block.parse(n.src,n.md,n.env,n.tokens)}function cS(n){const e=n.tokens;let t=0;for(let i=0;i<e.length;i++)e[i].type!=="reference_definition"&&(i!==t&&(e[t]=e[i]),t++);e.length!==t&&(e.length=t)}function hS(n){const e=n.tokens;for(let t=0,i=e.length;t<i;t++){const s=e[t];s.type==="inline"&&n.md.inline.parse(s.content,n.md,n.env,s.children)}}function uS(n){return/^<a[>\s]/i.test(n)}function dS(n){return/^<\/a\s*>/i.test(n)}function fS(n){const e=n.tokens;if(n.md.options.linkify)for(let t=0,i=e.length;t<i;t++){if(e[t].type!=="inline"||!n.md.linkify.test(e[t].content))continue;const s=e[t].children,r=[];let a=0;for(let o=s.length-1;o>=0;o--){const l=s[o];if(l.type==="link_close"){for(o--;s[o].level!==l.level&&s[o].type!=="link_open";)o--;continue}if(l.type==="html_inline"&&(uS(l.content)&&a>0&&a--,dS(l.content)&&a++),!(a>0)&&l.type==="text"&&n.md.linkify.test(l.content)){const c=l.content;let h=n.md.linkify.match(c);const u=[];let d=l.level,f=0;h.length>0&&h[0].index===0&&o>0&&s[o-1].type==="text_special"&&(h=h.slice(1));for(let p=0;p<h.length;p++){const _=h[p].url,m=n.md.normalizeLink(_);if(!n.md.validateLink(m))continue;let g=h[p].text;h[p].schema?h[p].schema==="mailto:"&&!/^mailto:/i.test(g)?g=n.md.normalizeLinkText(`mailto:${g}`).replace(/^mailto:/,""):g=n.md.normalizeLinkText(g):g=n.md.normalizeLinkText(`http://${g}`).replace(/^http:\/\//,"");const y=h[p].index;if(y>f){const w=new n.Token("text","",0);w.content=c.slice(f,y),w.level=d,u.push(w)}const S=new n.Token("link_open","a",1);S.attrs=[["href",m]],S.level=d++,S.markup="linkify",S.info="auto",u.push(S);const v=new n.Token("text","",0);v.content=g,v.level=d,u.push(v);const M=new n.Token("link_close","a",-1);M.level=--d,M.markup="linkify",M.info="auto",u.push(M),f=h[p].lastIndex}if(f<c.length){const p=new n.Token("text","",0);p.content=c.slice(f),p.level=d,u.push(p)}r.push({index:o,nodes:u})}}if(r.length>0){let o=s.length;for(const u of r)o+=u.nodes.length-1;const l=new Array(o);let c=0,h=0;r.reverse();for(let u=0;u<s.length;u++){const d=r[c];if(d?.index===u){for(const f of d.nodes)l[h++]=f;c++}else l[h++]=s[u]}e[t].children=l}}}var kf=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,pS=/\((c|tm|r)\)/i,mS=/\((c|tm|r)\)/gi,gS={c:"©",r:"®",tm:"™"};function _S(n,e){return gS[e.toLowerCase()]}function vS(n){let e=0;for(let t=n.length-1;t>=0;t--){const i=n[t];i.type==="text"&&!e&&(i.content=i.content.replace(mS,_S)),i.type==="link_open"&&i.info==="auto"&&e--,i.type==="link_close"&&i.info==="auto"&&e++}}function xS(n){let e=0;for(let t=n.length-1;t>=0;t--){const i=n[t];i.type==="text"&&!e&&kf.test(i.content)&&(i.content=i.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/gm,"$1—").replace(/(^|\s)--(?=\s|$)/gm,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm,"$1–")),i.type==="link_open"&&i.info==="auto"&&e--,i.type==="link_close"&&i.info==="auto"&&e++}}function bS(n){let e;if(n.md.options.typographer)for(e=n.tokens.length-1;e>=0;e--)n.tokens[e].type==="inline"&&(pS.test(n.tokens[e].content)&&vS(n.tokens[e].children),kf.test(n.tokens[e].content)&&xS(n.tokens[e].children))}var yS=/['"]/,rd=/['"]/g,ad="’",MS=1e3;function od(n,e,t){for(;n.length>t;){const i=n.pop();i.isSingleQuote?e.single=i.prevSameQuoteIdx:e.double=i.prevSameQuoteIdx}}function fa(n,e,t,i){n[e]||(n[e]=[]),n[e].push({pos:t,ch:i})}function SS(n,e){let t="",i=0;e.sort((s,r)=>s.pos-r.pos);for(let s=0;s<e.length;s++){const r=e[s];t+=n.slice(i,r.pos)+r.ch,i=r.pos+1}return t+n.slice(i)}function ES(n,e){let t;const i=[],s={single:-1,double:-1},r={};for(let a=0;a<n.length;a++){const o=n[a],l=n[a].level;for(t=i.length-1;t>=0&&!(i[t].level<=l);t--);if(od(i,s,t+1),o.type!=="text")continue;const c=o.content;let h=0;const u=c.length;e:for(;h<u;){rd.lastIndex=h;const d=rd.exec(c);if(!d)break;let f=!0,p=!0;h=d.index+1;const _=d[0]==="'";let m=32;if(d.index-1>=0)m=c.charCodeAt(d.index-1);else for(t=a-1;t>=0&&!(n[t].type==="softbreak"||n[t].type==="hardbreak");t--)if(n[t].content){m=n[t].content.charCodeAt(n[t].content.length-1);break}let g=32;if(h<u)g=c.charCodeAt(h);else for(t=a+1;t<n.length&&!(n[t].type==="softbreak"||n[t].type==="hardbreak");t++)if(n[t].content){g=n[t].content.charCodeAt(0);break}const y=Tr(m)||Er(m),S=Tr(g)||Er(g),v=Sr(m),M=Sr(g);if(M?f=!1:S&&(v||y||(f=!1)),v?p=!1:y&&(M||S||(p=!1)),g===34&&d[0]==='"'&&m>=48&&m<=57&&(p=f=!1),f&&p&&(f=y,p=S),!f&&!p){_&&fa(r,a,d.index,ad);continue}if(p&&(t=_?s.single:s.double,t>=0&&i[t].level===l)){const w=i[t];let C,x;_?(C=e.md.options.quotes[2],x=e.md.options.quotes[3]):(C=e.md.options.quotes[0],x=e.md.options.quotes[1]),fa(r,a,d.index,x),fa(r,w.tokenIdx,w.contentPos,C),od(i,s,t);continue e}if(f){if(i.length>=MS)return;i.push({tokenIdx:a,contentPos:d.index,isSingleQuote:_,level:l,prevSameQuoteIdx:_?s.single:s.double}),_?s.single=i.length-1:s.double=i.length-1}else p&&_&&fa(r,a,d.index,ad)}}Object.keys(r).forEach(function(a){const o=Number(a);n[o].content=SS(n[o].content,r[a])})}function TS(n){if(n.md.options.typographer)for(let e=n.tokens.length-1;e>=0;e--)n.tokens[e].type!=="inline"||!yS.test(n.tokens[e].content)||ES(n.tokens[e].children,n)}function wS(n){let e,t;const i=n.length;for(e=0;e<i;e++)n[e].type==="text_special"&&(n[e].type="text");for(e=t=0;e<i;e++)n[e].type==="text"&&e+1<i&&n[e+1].type==="text"?n[e+1].content=n[e].content+n[e+1].content:(e!==t&&(n[t]=n[e]),t++);e!==t&&(n.length=t)}function AS(n){let e,t;const i=n.tokens,s=i.length;for(let r=0;r<s;r++){if(i[r].type!=="inline")continue;const a=i[r].children,o=a.length;for(e=0;e<o;e++)a[e].type==="text_special"&&(a[e].type="text"),a[e].children&&wS(a[e].children);for(e=t=0;e<o;e++)a[e].type==="text"&&e+1<o&&a[e+1].type==="text"?a[e+1].content=a[e].content+a[e+1].content:(e!==t&&(a[t]=a[e]),t++);e!==t&&(a.length=t)}}var Qo=[["normalize",oS],["block",lS],["strip_references",cS],["inline",hS],["linkify",fS],["replacements",bS],["smartquotes",TS],["text_join",AS]],Of=class{constructor(){Ee(this,"ruler",new Ar),Ee(this,"State",Uf);for(let n=0;n<Qo.length;n++)this.ruler.push(Qo[n][0],Qo[n][1])}process(n){const e=this.ruler.getRules("");for(let t=0,i=e.length;t<i;t++)e[t](n)}},Bf=class{constructor(n,e,t,i){Ee(this,"bMarks",[]),Ee(this,"eMarks",[]),Ee(this,"tShift",[]),Ee(this,"sCount",[]),Ee(this,"bsCount",[]),Ee(this,"blkIndent",0),Ee(this,"line",0),Ee(this,"lineMax",0),Ee(this,"tight",!1),Ee(this,"listIndent",-1),Ee(this,"parentType","root"),Ee(this,"level",0),Ee(this,"Token",Wi),this.src=n,this.md=e,this.env=t,this.tokens=i;const s=this.src;for(let r=0,a=0,o=0,l=0,c=s.length,h=!1;a<c;a++){const u=s.charCodeAt(a);if(!h)if(pt(u)){o++,u===9?l+=4-l%4:l++;continue}else h=!0;(u===10||a===c-1)&&(u!==10&&a++,this.bMarks.push(r),this.eMarks.push(a),this.tShift.push(o),this.sCount.push(l),this.bsCount.push(0),h=!1,o=0,l=0,r=a+1)}this.bMarks.push(s.length),this.eMarks.push(s.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}push(n,e,t){const i=new Wi(n,e,t);return i.block=!0,t<0&&this.level--,i.level=this.level,t>0&&this.level++,this.tokens.push(i),i}isEmpty(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]}skipEmptyLines(n){for(let e=this.lineMax;n<e&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n}skipSpaces(n){for(let e=this.src.length;n<e&&pt(this.src.charCodeAt(n));n++);return n}skipSpacesBack(n,e){if(n<=e)return n;for(;n>e;)if(!pt(this.src.charCodeAt(--n)))return n+1;return n}skipChars(n,e){for(let t=this.src.length;n<t&&this.src.charCodeAt(n)===e;n++);return n}skipCharsBack(n,e,t){if(n<=t)return n;for(;n>t;)if(e!==this.src.charCodeAt(--n))return n+1;return n}getLines(n,e,t,i){if(n>=e)return"";const s=new Array(e-n);for(let r=0,a=n;a<e;a++,r++){let o=0;const l=this.bMarks[a];let c=l,h;for(a+1<e||i?h=this.eMarks[a]+1:h=this.eMarks[a];c<h&&o<t;){const u=this.src.charCodeAt(c);if(pt(u))u===9?o+=4-(o+this.bsCount[a])%4:o++;else if(c-l<this.tShift[a])o++;else break;c++}o>t?s[r]=new Array(o-t+1).join(" ")+this.src.slice(c,h):s[r]=this.src.slice(c,h)}return s.join("")}},RS=65536;function el(n,e){const t=n.bMarks[e]+n.tShift[e],i=n.eMarks[e];return n.src.slice(t,i)}function ld(n){const e=[],t=n.length;let i=0,s=n.charCodeAt(i),r=!1,a=0,o="";for(;i<t;)s===124&&(r?(o+=n.substring(a,i-1),a=i):(e.push(o+n.substring(a,i)),o="",a=i+1)),r=s===92,i++,s=n.charCodeAt(i);return e.push(o+n.substring(a)),e}function CS(n,e,t,i){if(e+2>t)return!1;let s=e+1;if(n.sCount[s]<n.blkIndent||n.sCount[s]-n.blkIndent>=4)return!1;let r=n.bMarks[s]+n.tShift[s];if(r>=n.eMarks[s])return!1;const a=n.src.charCodeAt(r++);if(a!==124&&a!==45&&a!==58||r>=n.eMarks[s])return!1;const o=n.src.charCodeAt(r++);if(o!==124&&o!==45&&o!==58&&!pt(o)||a===45&&pt(o))return!1;for(;r<n.eMarks[s];){const v=n.src.charCodeAt(r);if(v!==124&&v!==45&&v!==58&&!pt(v))return!1;r++}let l=el(n,e+1),c=l.split("|");const h=[];for(let v=0;v<c.length;v++){const M=c[v].trim();if(!M){if(v===0||v===c.length-1)continue;return!1}if(!/^:?-+:?$/.test(M))return!1;M.charCodeAt(M.length-1)===58?h.push(M.charCodeAt(0)===58?"center":"right"):M.charCodeAt(0)===58?h.push("left"):h.push("")}if(l=el(n,e).trim(),l.indexOf("|")===-1||n.sCount[e]-n.blkIndent>=4)return!1;c=ld(l),c.length&&c[0]===""&&c.shift(),c.length&&c[c.length-1]===""&&c.pop();const u=c.length;if(u===0||u!==h.length)return!1;if(i)return!0;const d=n.parentType;n.parentType="table";const f=n.md.block.ruler.getRules("blockquote"),p=n.push("table_open","table",1),_=[e,0];p.map=_;const m=n.push("thead_open","thead",1);m.map=[e,e+1];const g=n.push("tr_open","tr",1);g.map=[e,e+1];for(let v=0;v<c.length;v++){const M=n.push("th_open","th",1);h[v]&&(M.attrs=[["style",`text-align:${h[v]}`]]);const w=n.push("inline","",0);w.content=c[v].trim(),w.children=[],n.push("th_close","th",-1)}n.push("tr_close","tr",-1),n.push("thead_close","thead",-1);let y,S=0;for(s=e+2;s<t&&!(n.sCount[s]<n.blkIndent);s++){let v=!1;for(let w=0,C=f.length;w<C;w++)if(f[w](n,s,t,!0)){v=!0;break}if(v||(l=el(n,s).trim(),!l)||n.sCount[s]-n.blkIndent>=4||(c=ld(l),c.length&&c[0]===""&&c.shift(),c.length&&c[c.length-1]===""&&c.pop(),S+=u-c.length,S>RS))break;if(s===e+2){const w=n.push("tbody_open","tbody",1);w.map=y=[e+2,0]}const M=n.push("tr_open","tr",1);M.map=[s,s+1];for(let w=0;w<u;w++){const C=n.push("td_open","td",1);h[w]&&(C.attrs=[["style",`text-align:${h[w]}`]]);const x=n.push("inline","",0);x.content=c[w]?c[w].trim():"",x.children=[],n.push("td_close","td",-1)}n.push("tr_close","tr",-1)}return y&&(n.push("tbody_close","tbody",-1),y[1]=s),n.push("table_close","table",-1),_[1]=s,n.parentType=d,n.line=s,!0}function DS(n,e,t){if(n.sCount[e]-n.blkIndent<4)return!1;let i=e+1,s=i;for(;i<t;){if(n.isEmpty(i)){i++;continue}if(n.sCount[i]-n.blkIndent>=4){i++,s=i;continue}break}n.line=s;const r=n.push("code_block","code",0);return r.content=n.getLines(e,s,4+n.blkIndent,!1)+`
`,r.map=[e,n.line],!0}function PS(n,e,t,i){let s=n.bMarks[e]+n.tShift[e],r=n.eMarks[e];if(n.sCount[e]-n.blkIndent>=4||s+3>r)return!1;const a=n.src.charCodeAt(s);if(a!==126&&a!==96)return!1;let o=s;s=n.skipChars(s,a);let l=s-o;if(l<3)return!1;const c=n.src.slice(o,s),h=n.src.slice(s,r);if(a===96&&h.indexOf(String.fromCharCode(a))>=0)return!1;if(i)return!0;let u=e,d=!1;for(;u++,!(u>=t||(s=o=n.bMarks[u]+n.tShift[u],r=n.eMarks[u],s<r&&n.sCount[u]<n.blkIndent));)if(n.src.charCodeAt(s)===a&&!(n.sCount[u]-n.blkIndent>=4)&&(s=n.skipChars(s,a),!(s-o<l)&&(s=n.skipSpaces(s),!(s<r)))){d=!0;break}l=n.sCount[e],n.line=u+(d?1:0);const f=n.push("fence","code",0);return f.info=h,f.content=n.getLines(e+1,u,l,!0),f.markup=c,f.map=[e,n.line],!0}function IS(n,e,t,i){let s=n.bMarks[e]+n.tShift[e],r=n.eMarks[e];const a=n.lineMax;if(n.sCount[e]-n.blkIndent>=4||n.src.charCodeAt(s)!==62)return!1;if(i)return!0;const o=[],l=[],c=[],h=[],u=n.md.block.ruler.getRules("blockquote"),d=n.parentType;n.parentType="blockquote";let f=!1,p;for(p=e;p<t;p++){const S=n.sCount[p]<n.blkIndent;if(s=n.bMarks[p]+n.tShift[p],r=n.eMarks[p],s>=r)break;if(n.src.charCodeAt(s++)===62&&!S){let M=n.sCount[p]+1,w,C;n.src.charCodeAt(s)===32?(s++,M++,C=!1,w=!0):n.src.charCodeAt(s)===9?(w=!0,(n.bsCount[p]+M)%4===3?(s++,M++,C=!1):C=!0):w=!1;let x=M;for(o.push(n.bMarks[p]),n.bMarks[p]=s;s<r;){const E=n.src.charCodeAt(s);if(pt(E))E===9?x+=4-(x+n.bsCount[p]+(C?1:0))%4:x++;else break;s++}f=s>=r,l.push(n.bsCount[p]),n.bsCount[p]=n.sCount[p]+1+(w?1:0),c.push(n.sCount[p]),n.sCount[p]=x-M,h.push(n.tShift[p]),n.tShift[p]=s-n.bMarks[p];continue}if(f)break;let v=!1;for(let M=0,w=u.length;M<w;M++)if(u[M](n,p,t,!0)){v=!0;break}if(v){n.lineMax=p,n.blkIndent!==0&&(o.push(n.bMarks[p]),l.push(n.bsCount[p]),h.push(n.tShift[p]),c.push(n.sCount[p]),n.sCount[p]-=n.blkIndent);break}o.push(n.bMarks[p]),l.push(n.bsCount[p]),h.push(n.tShift[p]),c.push(n.sCount[p]),n.sCount[p]=-1}const _=n.blkIndent;n.blkIndent=0;const m=n.push("blockquote_open","blockquote",1);m.markup=">";const g=[e,0];m.map=g,n.md.block.tokenize(n,e,p);const y=n.push("blockquote_close","blockquote",-1);y.markup=">",n.lineMax=a,n.parentType=d,g[1]=n.line;for(let S=0;S<h.length;S++)n.bMarks[S+e]=o[S],n.tShift[S+e]=h[S],n.sCount[S+e]=c[S],n.bsCount[S+e]=l[S];return n.blkIndent=_,!0}function LS(n,e,t,i){const s=n.eMarks[e];if(n.sCount[e]-n.blkIndent>=4)return!1;let r=n.bMarks[e]+n.tShift[e];const a=n.src.charCodeAt(r++);if(a!==42&&a!==45&&a!==95)return!1;let o=1;for(;r<s;){const c=n.src.charCodeAt(r++);if(c!==a&&!pt(c))return!1;c===a&&o++}if(o<3)return!1;if(i)return!0;n.line=e+1;const l=n.push("hr","hr",0);return l.map=[e,n.line],l.markup=Array(o+1).join(String.fromCharCode(a)),!0}function cd(n,e){const t=n.eMarks[e];let i=n.bMarks[e]+n.tShift[e];const s=n.src.charCodeAt(i++);return s!==42&&s!==45&&s!==43||i<t&&!pt(n.src.charCodeAt(i))?-1:i}function hd(n,e){const t=n.bMarks[e]+n.tShift[e],i=n.eMarks[e];let s=t;if(s+1>=i)return-1;let r=n.src.charCodeAt(s++);if(r<48||r>57)return-1;for(;;){if(s>=i)return-1;if(r=n.src.charCodeAt(s++),r>=48&&r<=57){if(s-t>=10)return-1;continue}if(r===41||r===46)break;return-1}return s<i&&(r=n.src.charCodeAt(s),!pt(r))?-1:s}function NS(n,e){const t=n.level+2;for(let i=e+2,s=n.tokens.length-2;i<s;i++)n.tokens[i].level===t&&n.tokens[i].type==="paragraph_open"&&(n.tokens[i+2].hidden=!0,n.tokens[i].hidden=!0,i+=2)}function FS(n,e,t,i){let s,r,a,o,l=e,c=!0;if(n.sCount[l]-n.blkIndent>=4||n.listIndent>=0&&n.sCount[l]-n.listIndent>=4&&n.sCount[l]<n.blkIndent)return!1;let h=!1;i&&n.parentType==="paragraph"&&n.sCount[l]>=n.blkIndent&&(h=!0);let u,d,f;if((f=hd(n,l))>=0){if(u=!0,a=n.bMarks[l]+n.tShift[l],d=Number(n.src.slice(a,f-1)),h&&d!==1)return!1}else if((f=cd(n,l))>=0)u=!1;else return!1;if(h&&n.skipSpaces(f)>=n.eMarks[l])return!1;if(i)return!0;const p=n.src.charCodeAt(f-1),_=n.tokens.length;u?(o=n.push("ordered_list_open","ol",1),d!==1&&(o.attrs=[["start",d]])):o=n.push("bullet_list_open","ul",1);const m=[l,0];o.map=m,o.markup=String.fromCharCode(p);let g=!1;const y=n.md.block.ruler.getRules("list"),S=n.parentType;for(n.parentType="list";l<t;){r=f,s=n.eMarks[l];const v=n.sCount[l]+f-(n.bMarks[l]+n.tShift[l]);let M=v;for(;r<s;){const B=n.src.charCodeAt(r);if(B===9)M+=4-(M+n.bsCount[l])%4;else if(B===32)M++;else break;r++}const w=r;let C;w>=s?C=1:C=M-v,C>4&&(C=1);const x=v+C;o=n.push("list_item_open","li",1),o.markup=String.fromCharCode(p);const E=[l,0];o.map=E,u&&(o.info=n.src.slice(a,f-1));const D=n.tight,A=n.tShift[l],I=n.sCount[l],F=n.listIndent;if(n.listIndent=n.blkIndent,n.blkIndent=x,n.tight=!0,n.tShift[l]=w-n.bMarks[l],n.sCount[l]=M,w>=s&&n.isEmpty(l+1)?n.line=Math.min(n.line+2,t):n.md.block.tokenize(n,l,t),(!n.tight||g)&&(c=!1),g=n.line-l>1&&n.isEmpty(n.line-1),n.blkIndent=n.listIndent,n.listIndent=F,n.tShift[l]=A,n.sCount[l]=I,n.tight=D,o=n.push("list_item_close","li",-1),o.markup=String.fromCharCode(p),l=n.line,E[1]=l,l>=t||n.sCount[l]<n.blkIndent||n.sCount[l]-n.blkIndent>=4)break;let H=!1;for(let B=0,z=y.length;B<z;B++)if(y[B](n,l,t,!0)){H=!0;break}if(H)break;if(u){if(f=hd(n,l),f<0)break;a=n.bMarks[l]+n.tShift[l]}else if(f=cd(n,l),f<0)break;if(p!==n.src.charCodeAt(f-1))break}return u?o=n.push("ordered_list_close","ol",-1):o=n.push("bullet_list_close","ul",-1),o.markup=String.fromCharCode(p),m[1]=l,n.line=l,n.parentType=S,c&&NS(n,_),!0}function US(n,e,t,i){let s=n.bMarks[e]+n.tShift[e],r=n.eMarks[e],a=e+1;if(n.sCount[e]-n.blkIndent>=4||n.src.charCodeAt(s)!==91)return!1;function o(v){const M=n.lineMax;if(v>=M||n.isEmpty(v))return null;let w=!1;if(n.sCount[v]-n.blkIndent>3&&(w=!0),n.sCount[v]<0&&(w=!0),!w){const E=n.md.block.ruler.getRules("reference"),D=n.parentType;n.parentType="reference";let A=!1;for(let I=0,F=E.length;I<F;I++)if(E[I](n,v,M,!0)){A=!0;break}if(n.parentType=D,A)return null}const C=n.bMarks[v]+n.tShift[v],x=n.eMarks[v];return n.src.slice(C,x+1)}let l=n.src.slice(s,r+1);r=l.length;let c=-1;for(s=1;s<r;s++){const v=l.charCodeAt(s);if(v===91)return!1;if(v===93){c=s;break}else if(v===10){const M=o(a);M!==null&&(l+=M,r=l.length,a++)}else if(v===92&&(s++,s<r&&l.charCodeAt(s)===10)){const M=o(a);M!==null&&(l+=M,r=l.length,a++)}}if(c<0||l.charCodeAt(c+1)!==58)return!1;for(s=c+2;s<r;s++){const v=l.charCodeAt(s);if(v===10){const M=o(a);M!==null&&(l+=M,r=l.length,a++)}else if(!pt(v))break}const h=n.md.helpers.parseLinkDestination(l,s,r);if(!h.ok)return!1;const u=n.md.normalizeLink(h.str);if(!n.md.validateLink(u))return!1;s=h.pos;const d=s,f=a,p=s;for(;s<r;s++){const v=l.charCodeAt(s);if(v===10){const M=o(a);M!==null&&(l+=M,r=l.length,a++)}else if(!pt(v))break}let _=n.md.helpers.parseLinkTitle(l,s,r);for(;_.can_continue;){const v=o(a);if(v===null)break;l+=v,s=r,r=l.length,a++,_=n.md.helpers.parseLinkTitle(l,s,r,_)}let m;for(s<r&&p!==s&&_.ok?(m=_.str,s=_.pos):(m="",s=d,a=f);s<r&&pt(l.charCodeAt(s));)s++;if(s<r&&l.charCodeAt(s)!==10&&m)for(m="",s=d,a=f;s<r&&pt(l.charCodeAt(s));)s++;if(s<r&&l.charCodeAt(s)!==10)return!1;const g=Za(l.slice(1,c));if(!g)return!1;if(i)return!0;typeof n.env.references>"u"&&(n.env.references={}),typeof n.env.references[g]>"u"&&(n.env.references[g]={title:m,href:u});const y=n.push("reference_definition","",0);y.map=[e,a],y.hidden=!0;const S=Object.create(null);return S.label=g,y.meta=S,n.line=a,!0}var kS=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],zf=`<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`,Vf="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",OS=new RegExp(`^(?:${zf}|${Vf}|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)`),BS=new RegExp(`^(?:${zf}|${Vf})`),zi=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Za-z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp(`^</?(${kS.join("|")})(?=(\\s|/?>|$))`,"i"),/^$/,!0],[new RegExp(`${BS.source}\\s*$`),/^$/,!1]];function zS(n,e,t,i){let s=n.bMarks[e]+n.tShift[e],r=n.eMarks[e];if(n.sCount[e]-n.blkIndent>=4||!n.md.options.html||n.src.charCodeAt(s)!==60)return!1;let a=n.src.slice(s,r),o=0;for(;o<zi.length&&!zi[o][0].test(a);o++);if(o===zi.length)return!1;if(i)return zi[o][2];let l=e+1;const c=zi[o][1].test("");if(!zi[o][1].test(a)){for(;l<t&&!(n.sCount[l]<n.blkIndent&&(c||!n.isEmpty(l)));l++)if(s=n.bMarks[l]+n.tShift[l],r=n.eMarks[l],a=n.src.slice(s,r),zi[o][1].test(a)){a.length!==0&&l++;break}}n.line=l;const h=n.push("html_block","",0);return h.map=[e,l],h.content=n.getLines(e,l,n.blkIndent,!0),!0}function VS(n,e,t,i){let s=n.bMarks[e]+n.tShift[e],r=n.eMarks[e];if(n.sCount[e]-n.blkIndent>=4)return!1;let a=n.src.charCodeAt(s);if(a!==35||s>=r)return!1;let o=1;for(a=n.src.charCodeAt(++s);a===35&&s<r&&o<=6;)o++,a=n.src.charCodeAt(++s);if(o>6||s<r&&!pt(a))return!1;if(i)return!0;r=n.skipSpacesBack(r,s);const l=n.skipCharsBack(r,35,s);l>s&&pt(n.src.charCodeAt(l-1))&&(r=l),n.line=e+1;const c=n.push("heading_open",`h${o}`,1);c.markup="########".slice(0,o),c.map=[e,n.line];const h=n.push("inline","",0);h.content=Ja(n.src.slice(s,r)),h.map=[e,n.line],h.children=[];const u=n.push("heading_close",`h${o}`,-1);return u.markup="########".slice(0,o),!0}function HS(n,e,t){const i=n.md.block.ruler.getRules("paragraph");if(n.sCount[e]-n.blkIndent>=4)return!1;const s=n.parentType;n.parentType="paragraph";let r=0,a,o=e+1;for(;o<t&&!n.isEmpty(o);o++){if(n.sCount[o]-n.blkIndent>3)continue;if(n.sCount[o]>=n.blkIndent){let f=n.bMarks[o]+n.tShift[o];const p=n.eMarks[o];if(f<p&&(a=n.src.charCodeAt(f),(a===45||a===61)&&(f=n.skipChars(f,a),f=n.skipSpaces(f),f>=p))){r=a===61?1:2;break}}if(n.sCount[o]<0)continue;let d=!1;for(let f=0,p=i.length;f<p;f++)if(i[f](n,o,t,!0)){d=!0;break}if(d)break}if(!r)return n.parentType=s,!1;const l=Ja(n.getLines(e,o,n.blkIndent,!1));n.line=o+1;const c=n.push("heading_open",`h${r}`,1);c.markup=String.fromCharCode(a),c.map=[e,n.line];const h=n.push("inline","",0);h.content=l,h.map=[e,n.line-1],h.children=[];const u=n.push("heading_close",`h${r}`,-1);return u.markup=String.fromCharCode(a),n.parentType=s,!0}function GS(n,e,t){const i=n.md.block.ruler.getRules("paragraph"),s=n.parentType;let r=e+1;for(n.parentType="paragraph";r<t&&!n.isEmpty(r);r++){if(n.sCount[r]-n.blkIndent>3||n.sCount[r]<0)continue;let c=!1;for(let h=0,u=i.length;h<u;h++)if(i[h](n,r,t,!0)){c=!0;break}if(c)break}const a=Ja(n.getLines(e,r,n.blkIndent,!1));n.line=r;const o=n.push("paragraph_open","p",1);o.map=[e,n.line];const l=n.push("inline","",0);return l.content=a,l.map=[e,n.line],l.children=[],n.push("paragraph_close","p",-1),n.parentType=s,!0}var pa=[["table",CS,["paragraph","reference"]],["code",DS],["fence",PS,["paragraph","reference","blockquote","list"]],["blockquote",IS,["paragraph","reference","blockquote","list"]],["hr",LS,["paragraph","reference","blockquote","list"]],["list",FS,["paragraph","reference","blockquote"]],["reference",US],["html_block",zS,["paragraph","reference","blockquote"]],["heading",VS,["paragraph","reference","blockquote"]],["lheading",HS],["paragraph",GS]],Hf=class{constructor(){Ee(this,"ruler",new Ar),Ee(this,"State",Bf);for(let n=0;n<pa.length;n++)this.ruler.push(pa[n][0],pa[n][1],{alt:(pa[n][2]||[]).slice()})}tokenize(n,e,t){const i=this.ruler.getRules(""),s=i.length,r=n.md.options.maxNesting;let a=e,o=!1;for(;a<t&&(n.line=a=n.skipEmptyLines(a),!(a>=t||n.sCount[a]<n.blkIndent));){if(n.level>=r){n.line=t;break}const l=n.line;let c=!1;for(let h=0;h<s;h++)if(c=i[h](n,a,t,!1),c){if(l>=n.line)throw new Error("block rule didn't increment state.line");break}if(!c)throw new Error("none of the block rules matched");n.tight=!o,n.isEmpty(n.line-1)&&(o=!0),a=n.line,a<t&&n.isEmpty(a)&&(o=!0,a++,n.line=a)}}parse(n,e,t,i){if(!n)return;const s=new this.State(n,e,t,i);this.tokenize(s,s.line,s.lineMax)}},Gf=class{constructor(n,e,t,i){Ee(this,"pos",0),Ee(this,"level",0),Ee(this,"pending",""),Ee(this,"pendingLevel",0),Ee(this,"cache",{}),Ee(this,"backticks",{}),Ee(this,"backticksScanned",!1),Ee(this,"linkLevel",0),Ee(this,"delimiters",[]),Ee(this,"_prev_delimiters",[]),Ee(this,"Token",Wi),this.src=n,this.env=t,this.md=e,this.tokens=i,this.tokens_meta=Array(i.length),this.posMax=this.src.length}pushPending(){const n=new Wi("text","",0);return n.content=this.pending,n.level=this.pendingLevel,this.tokens.push(n),this.pending="",n}push(n,e,t){this.pending&&this.pushPending();const i=new Wi(n,e,t);let s;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),i.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],s={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(i),this.tokens_meta.push(s),i}scanDelims(n,e){const t=this.posMax,i=this.src.charCodeAt(n);let s;if(n===0)s=32;else if(n===1)s=this.src.charCodeAt(0),(s&63488)===55296&&(s=65533);else if(s=this.src.charCodeAt(n-1),(s&64512)===56320){const p=this.src.charCodeAt(n-2);s=(p&64512)===55296?65536+(p-55296<<10)+(s-56320):65533}else(s&64512)===55296&&(s=65533);let r=n;for(;r<t&&this.src.charCodeAt(r)===i;)r++;const a=r-n;let o=r<t?this.src.charCodeAt(r):32;if((o&64512)===55296){const p=this.src.charCodeAt(r+1);o=(p&64512)===56320?65536+(o-55296<<10)+(p-56320):65533}else(o&64512)===56320&&(o=65533);const l=Tr(s)||Er(s),c=Tr(o)||Er(o),h=Sr(s),u=Sr(o),d=!u&&(!c||h||l),f=!h&&(!l||u||c);return{can_open:d&&(e||!f||l),can_close:f&&(e||!d||c),length:a}}};function WS(n){switch(n){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function XS(n,e){let t=n.pos;for(;t<n.posMax&&!WS(n.src.charCodeAt(t));)t++;return t===n.pos?!1:(e||(n.pending+=n.src.slice(n.pos,t)),n.pos=t,!0)}function jS(n){return n>=65&&n<=90||n>=97&&n<=122}function qS(n){return n>=65&&n<=90||n>=97&&n<=122||n>=48&&n<=57||n===43||n===45||n===46}function YS(n,e){if(!n.md.options.linkify||n.linkLevel>0)return!1;const t=n.pos,i=n.posMax;if(t+3>i||n.src.charCodeAt(t)!==58||n.src.charCodeAt(t+1)!==47||n.src.charCodeAt(t+2)!==47)return!1;const s=t-Math.min(10,n.pending.length,t);let r=t;for(;r>s&&qS(n.src.charCodeAt(r-1));)r--;if(r===t||!jS(n.src.charCodeAt(r)))return!1;const a=t-r,o=n.md.linkify.matchAtStart(n.src.slice(r));if(!o)return!1;let l=o.url;if(l.length<=a)return!1;let c=l.length;for(;c>0&&l.charCodeAt(c-1)===42;)c--;c!==l.length&&(l=l.slice(0,c));const h=n.md.normalizeLink(l);if(!n.md.validateLink(h))return!1;if(!e){n.pending=n.pending.slice(0,-a);const u=n.push("link_open","a",1);u.attrs=[["href",h]],u.markup="linkify",u.info="auto";const d=n.push("text","",0);d.content=n.md.normalizeLinkText(l);const f=n.push("link_close","a",-1);f.markup="linkify",f.info="auto"}return n.pos+=l.length-a,!0}function $S(n,e){let t=n.pos;if(n.src.charCodeAt(t)!==10)return!1;const i=n.pending.length-1,s=n.posMax;if(!e)if(i>=0&&n.pending.charCodeAt(i)===32)if(i>=1&&n.pending.charCodeAt(i-1)===32){let r=i-1;for(;r>=1&&n.pending.charCodeAt(r-1)===32;)r--;n.pending=n.pending.slice(0,r),n.push("hardbreak","br",0)}else n.pending=n.pending.slice(0,-1),n.push("softbreak","br",0);else n.push("softbreak","br",0);for(t++;t<s&&pt(n.src.charCodeAt(t));)t++;return n.pos=t,!0}var Zc=[];for(let n=0;n<256;n++)Zc.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(n){Zc[n.charCodeAt(0)]=1});function KS(n,e){let t=n.pos;const i=n.posMax;if(n.src.charCodeAt(t)!==92||(t++,t>=i))return!1;let s=n.src.charCodeAt(t);if(s===10){for(e||n.push("hardbreak","br",0),t++;t<i&&(s=n.src.charCodeAt(t),!!pt(s));)t++;return n.pos=t,!0}if(s===32){if(!e){const o=n.push("text_special","",0);o.content="\\",o.markup="\\",o.info="escape"}return n.pos=t,!0}let r=n.src[t];if(s>=55296&&s<=56319&&t+1<i){const o=n.src.charCodeAt(t+1);o>=56320&&o<=57343&&(r+=n.src[t+1],t++)}const a="\\"+r;if(!e){const o=n.push("text_special","",0);s<256&&Zc[s]!==0?o.content=r:o.content=a,o.markup=a,o.info="escape"}return n.pos=t+1,!0}function ZS(n){const e={};let t=0;for(;(t=n.indexOf("`",t))!==-1;){const i=t;for(;n.charCodeAt(++t)===96;);e[t-i]=i}return e}function JS(n,e){var t;const i=n.pos;if(n.src.charCodeAt(i)!==96)return!1;const s=n.posMax;let r=i+1;for(;r<s&&n.src.charCodeAt(r)===96;)r++;const a=n.src.slice(i,r),o=a.length;if(n.backticksScanned||(n.backticks=ZS(n.src),n.backticksScanned=!0),((t=n.backticks[o])!==null&&t!==void 0?t:-1)>=r){let l=r,c;for(;(c=n.src.indexOf("`",l))!==-1&&c<s;){for(l=c+1;n.src.charCodeAt(l)===96;)l++;if(l>s)break;if(l-c===o){if(!e){const h=n.push("code_inline","code",0);h.markup=a;let u=n.src.slice(r,c).replace(/\n/g," ");u.startsWith(" ")&&u.endsWith(" ")&&/[^ ]/.test(u)&&(u=u.slice(1,-1)),h.content=u}return n.pos=l,!0}}}return e||(n.pending+=a),n.pos=r,!0}function QS(n,e){const t=n.pos,i=n.src.charCodeAt(t);if(e||i!==126)return!1;const s=n.scanDelims(n.pos,!0);let r=s.length;const a=String.fromCharCode(i);if(r<2)return!1;let o;r%2&&(o=n.push("text","",0),o.content=a,r--);for(let l=0;l<r;l+=2)o=n.push("text","",0),o.content=a+a,n.delimiters.push({marker:i,length:0,token:n.tokens.length-1,end:-1,open:s.can_open,close:s.can_close});return n.pos+=s.length,!0}function ud(n,e){let t;const i=[],s=e.length;for(let r=0;r<s;r++){const a=e[r];if(a.marker!==126||a.end===-1)continue;const o=e[a.end];t=n.tokens[a.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=n.tokens[o.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",n.tokens[o.token-1].type==="text"&&n.tokens[o.token-1].content==="~"&&i.push(o.token-1)}for(;i.length;){const r=i.pop();let a=r+1;for(;a<n.tokens.length&&n.tokens[a].type==="s_close";)a++;a--,r!==a&&(t=n.tokens[a],n.tokens[a]=n.tokens[r],n.tokens[r]=t)}}function eE(n){const e=n.tokens_meta,t=n.tokens_meta.length;ud(n,n.delimiters);for(let s=0;s<t;s++){var i;const r=(i=e[s])===null||i===void 0?void 0:i.delimiters;r&&ud(n,r)}}var Wf={tokenize:QS,postProcess:eE};function tE(n,e){const t=n.pos,i=n.src.charCodeAt(t);if(e||i!==95&&i!==42)return!1;const s=n.scanDelims(n.pos,i===42);for(let r=0;r<s.length;r++){const a=n.push("text","",0);a.content=String.fromCharCode(i),n.delimiters.push({marker:i,length:s.length,token:n.tokens.length-1,end:-1,open:s.can_open,close:s.can_close})}return n.pos+=s.length,!0}function dd(n,e){const t=e.length;for(let i=t-1;i>=0;i--){const s=e[i];if(s.marker!==95&&s.marker!==42||s.end===-1)continue;const r=e[s.end],a=i>0&&e[i-1].end===s.end+1&&e[i-1].marker===s.marker&&e[i-1].token===s.token-1&&e[s.end+1].token===r.token+1,o=String.fromCharCode(s.marker),l=n.tokens[s.token];l.type=a?"strong_open":"em_open",l.tag=a?"strong":"em",l.nesting=1,l.markup=a?o+o:o,l.content="";const c=n.tokens[r.token];c.type=a?"strong_close":"em_close",c.tag=a?"strong":"em",c.nesting=-1,c.markup=a?o+o:o,c.content="",a&&(n.tokens[e[i-1].token].content="",n.tokens[e[s.end+1].token].content="",i--)}}function nE(n){const e=n.tokens_meta,t=n.tokens_meta.length;dd(n,n.delimiters);for(let s=0;s<t;s++){var i;const r=(i=e[s])===null||i===void 0?void 0:i.delimiters;r&&dd(n,r)}}var Xf={tokenize:tE,postProcess:nE};function iE(n,e){let t,i,s,r,a="",o="",l=n.pos,c=!0;if(n.src.charCodeAt(n.pos)!==91)return!1;const h=n.pos,u=n.posMax,d=n.pos+1,f=n.md.helpers.parseLinkLabel(n,n.pos,!0);if(f<0)return!1;let p=f+1;if(p<u&&n.src.charCodeAt(p)===40){for(c=!1,p++;p<u&&(t=n.src.charCodeAt(p),!(!pt(t)&&t!==10));p++);if(p>=u)return!1;if(l=p,s=n.md.helpers.parseLinkDestination(n.src,p,n.posMax),s.ok){for(a=n.md.normalizeLink(s.str),n.md.validateLink(a)?p=s.pos:a="",l=p;p<u&&(t=n.src.charCodeAt(p),!(!pt(t)&&t!==10));p++);if(s=n.md.helpers.parseLinkTitle(n.src,p,n.posMax),p<u&&l!==p&&s.ok)for(o=s.str,p=s.pos;p<u&&(t=n.src.charCodeAt(p),!(!pt(t)&&t!==10));p++);}(p>=u||n.src.charCodeAt(p)!==41)&&(c=!0),p++}if(c){if(typeof n.env.references>"u")return!1;if(p<u&&n.src.charCodeAt(p)===91?(l=p+1,p=n.md.helpers.parseLinkLabel(n,p),p>=0?i=n.src.slice(l,p++):p=f+1):p=f+1,i||(i=n.src.slice(d,f)),i=Za(i),r=n.env.references[i],!r)return n.pos=h,!1;a=r.href,o=r.title}if(!e){n.pos=d,n.posMax=f;const _=n.push("link_open","a",1),m=[["href",a]];if(_.attrs=m,o&&m.push(["title",o]),i){const g=Object.create(null);g.label=i,_.meta=g}n.linkLevel++,n.md.inline.tokenize(n),n.linkLevel--,n.push("link_close","a",-1)}return n.pos=p,n.posMax=u,!0}function sE(n,e){let t,i,s,r,a,o,l,c,h="";const u=n.pos,d=n.posMax;if(n.src.charCodeAt(n.pos)!==33||n.src.charCodeAt(n.pos+1)!==91)return!1;const f=n.pos+2,p=n.md.helpers.parseLinkLabel(n,n.pos+1,!1);if(p<0)return!1;if(r=p+1,r<d&&n.src.charCodeAt(r)===40){for(r++;r<d&&(t=n.src.charCodeAt(r),!(!pt(t)&&t!==10));r++);if(r>=d)return!1;for(c=r,o=n.md.helpers.parseLinkDestination(n.src,r,n.posMax),o.ok&&(h=n.md.normalizeLink(o.str),n.md.validateLink(h)?r=o.pos:h=""),c=r;r<d&&(t=n.src.charCodeAt(r),!(!pt(t)&&t!==10));r++);if(o=n.md.helpers.parseLinkTitle(n.src,r,n.posMax),r<d&&c!==r&&o.ok)for(l=o.str,r=o.pos;r<d&&(t=n.src.charCodeAt(r),!(!pt(t)&&t!==10));r++);else l="";if(r>=d||n.src.charCodeAt(r)!==41)return n.pos=u,!1;r++}else{if(typeof n.env.references>"u")return!1;if(r<d&&n.src.charCodeAt(r)===91?(c=r+1,r=n.md.helpers.parseLinkLabel(n,r),r>=0?s=n.src.slice(c,r++):r=p+1):r=p+1,s||(s=n.src.slice(f,p)),s=Za(s),a=n.env.references[s],!a)return n.pos=u,!1;h=a.href,l=a.title}if(!e){i=n.src.slice(f,p);const _=[];n.md.inline.parse(i,n.md,n.env,_);const m=n.push("image","img",0),g=[["src",h],["alt",""]];if(m.attrs=g,m.children=_,m.content=i,l&&g.push(["title",l]),s){const y=Object.create(null);y.label=s,m.meta=y}}return n.pos=r,n.posMax=d,!0}var rE=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,aE=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function oE(n,e){let t=n.pos;if(n.src.charCodeAt(t)!==60)return!1;const i=n.pos,s=n.posMax;for(;;){if(++t>=s)return!1;const a=n.src.charCodeAt(t);if(a===60)return!1;if(a===62)break}const r=n.src.slice(i+1,t);if(aE.test(r)){const a=n.md.normalizeLink(r);if(!n.md.validateLink(a))return!1;if(!e){const o=n.push("link_open","a",1);o.attrs=[["href",a]],o.markup="autolink",o.info="auto";const l=n.push("text","",0);l.content=n.md.normalizeLinkText(r);const c=n.push("link_close","a",-1);c.markup="autolink",c.info="auto"}return n.pos+=r.length+2,!0}if(rE.test(r)){const a=n.md.normalizeLink(`mailto:${r}`);if(!n.md.validateLink(a))return!1;if(!e){const o=n.push("link_open","a",1);o.attrs=[["href",a]],o.markup="autolink",o.info="auto";const l=n.push("text","",0);l.content=n.md.normalizeLinkText(r);const c=n.push("link_close","a",-1);c.markup="autolink",c.info="auto"}return n.pos+=r.length+2,!0}return!1}function lE(n){return/^<a[>\s]/i.test(n)}function cE(n){return/^<\/a\s*>/i.test(n)}function hE(n){const e=n|32;return e>=97&&e<=122}function uE(n,e){if(!n.md.options.html)return!1;const t=n.posMax,i=n.pos;if(n.src.charCodeAt(i)!==60||i+2>=t)return!1;const s=n.src.charCodeAt(i+1);if(s!==33&&s!==63&&s!==47&&!hE(s))return!1;const r=n.src.slice(i).match(OS);if(!r)return!1;if(!e){const a=n.push("html_inline","",0);a.content=r[0],lE(a.content)&&n.linkLevel++,cE(a.content)&&n.linkLevel--}return n.pos+=r[0].length,!0}var dE=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,fE=/^&([a-z][a-z0-9]{1,31});/i;function pE(n,e){const t=n.pos,i=n.posMax;if(n.src.charCodeAt(t)!==38||t+1>=i)return!1;if(n.src.charCodeAt(t+1)===35){const s=n.src.slice(t).match(dE);if(s){if(!e){const r=s[1][0].toLowerCase()==="x"?parseInt(s[1].slice(1),16):parseInt(s[1],10),a=n.push("text_special","",0);a.content=Kc(r)?Mr(r):Mr(65533),a.markup=s[0],a.info="entity"}return n.pos+=s[0].length,!0}}else{const s=n.src.slice(t).match(fE);if(s){const r=Mf(s[0]);if(r!==s[0]){if(!e){const a=n.push("text_special","",0);a.content=r,a.markup=s[0],a.info="entity"}return n.pos+=s[0].length,!0}}}return!1}function fd(n){const e={},t=n.length;if(!t)return;let i=0,s=-2;const r=[];for(let a=0;a<t;a++){const o=n[a];if(r.push(0),(n[i].marker!==o.marker||s!==o.token-1)&&(i=a),s=o.token,o.length=o.length||0,!o.close)continue;e.hasOwnProperty(o.marker)||(e[o.marker]=[-1,-1,-1,-1,-1,-1]);const l=e[o.marker][(o.open?3:0)+o.length%3];let c=i-r[i]-1,h=c;for(;c>l;c-=r[c]+1){const u=n[c];if(u.marker===o.marker&&u.open&&u.end<0){let d=!1;if((u.close||o.open)&&(u.length+o.length)%3===0&&(u.length%3!==0||o.length%3!==0)&&(d=!0),!d){const f=c>0&&!n[c-1].open?r[c-1]+1:0;r[a]=a-c+f,r[c]=f,o.open=!1,u.end=a,u.close=!1,h=-1,s=-2;break}}}h!==-1&&(e[o.marker][(o.open?3:0)+(o.length||0)%3]=h)}}function mE(n){const e=n.tokens_meta,t=n.tokens_meta.length;fd(n.delimiters);for(let s=0;s<t;s++){var i;const r=(i=e[s])===null||i===void 0?void 0:i.delimiters;r&&fd(r)}}function gE(n){let e,t,i=0;const s=n.tokens,r=n.tokens.length;for(e=t=0;e<r;e++)s[e].nesting<0&&i--,s[e].level=i,s[e].nesting>0&&i++,s[e].type==="text"&&e+1<r&&s[e+1].type==="text"?s[e+1].content=s[e].content+s[e+1].content:(e!==t&&(s[t]=s[e]),t++);e!==t&&(s.length=t)}var tl=[["text",XS],["linkify",YS],["newline",$S],["escape",KS],["backticks",JS],["strikethrough",Wf.tokenize],["emphasis",Xf.tokenize],["link",iE],["image",sE],["autolink",oE],["html_inline",uE],["entity",pE]],nl=[["balance_pairs",mE],["strikethrough",Wf.postProcess],["emphasis",Xf.postProcess],["fragments_join",gE]],jf=class{constructor(){Ee(this,"ruler",new Ar),Ee(this,"ruler2",new Ar),Ee(this,"State",Gf);for(let n=0;n<tl.length;n++)this.ruler.push(tl[n][0],tl[n][1]);for(let n=0;n<nl.length;n++)this.ruler2.push(nl[n][0],nl[n][1])}skipToken(n){const e=n.pos,t=this.ruler.getRules(""),i=t.length,s=n.md.options.maxNesting,r=n.cache;if(typeof r[e]<"u"){n.pos=r[e];return}let a=!1;if(n.level<s){for(let o=0;o<i;o++)if(n.level++,a=t[o](n,!0),n.level--,a){if(e>=n.pos)throw new Error("inline rule didn't increment state.pos");break}}else n.pos=n.posMax;a||n.pos++,r[e]=n.pos}tokenize(n){const e=this.ruler.getRules(""),t=e.length,i=n.posMax,s=n.md.options.maxNesting;for(;n.pos<i;){const r=n.pos;let a=!1;if(n.level<s){for(let o=0;o<t;o++)if(a=e[o](n,!1),a){if(r>=n.pos)throw new Error("inline rule didn't increment state.pos");break}}if(a){if(n.pos>=i)break;continue}n.pending+=n.src[n.pos++]}n.pending&&n.pushPending()}parse(n,e,t,i){const s=new this.State(n,e,t,i);this.tokenize(s);const r=this.ruler2.getRules(""),a=r.length;for(let o=0;o<a;o++)r[o](s)}},_E={default:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},zero:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","strip_references","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},commonmark:{options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","strip_references","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}}},vE=/^(vbscript|javascript|file|data):/,xE=/^data:image\/(gif|png|jpeg|webp);/,pd=["http:","https:","mailto:"],qn=class{validateLink(n){const e=n.trim().toLowerCase();return vE.test(e)?xE.test(e):!0}normalizeLink(n){const e=uc(n,!0);if(e.hostname&&(!e.protocol||pd.indexOf(e.protocol)>=0))try{e.hostname=nd.toASCII(e.hostname)}catch{}return e.auth&&(e.auth=ii(e.auth)),e.hostname&&(e.hostname=ii(e.hostname)),e.pathname&&(e.pathname=ii(e.pathname)),e.search&&(e.search=ii(e.search)),e.hash&&(e.hash=ii(e.hash)),hc(e)}normalizeLinkText(n){const e=uc(n,!0);if(e.hostname&&(!e.protocol||pd.indexOf(e.protocol)>=0))try{e.hostname=nd.toUnicode(e.hostname)}catch{}return Hs(hc(e),Hs.defaultChars+"%")}constructor(...n){Ee(this,"inline",new jf),Ee(this,"block",new Hf),Ee(this,"core",new Of),Ee(this,"renderer",new Ff),Ee(this,"linkify",new RM),Ee(this,"utils",zM),Ee(this,"helpers",Object.assign({},nS));const[e,t]=n;typeof e=="string"?(this.configure(e),t&&this.set(t)):(this.configure("default"),this.set(e||{}))}set(n){return Object.assign(this.options,n),this}configure(n){let e;if(typeof n=="string"){const s=n;if(e=_E[s],!e)throw new Error(`Wrong 'markdown-it' preset "${s}", check name`)}else e=n;if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");e.options&&(this.options={...e.options});const t=e.components;if(t){var i;["core","block","inline"].forEach(r=>{var a;const o=(a=t[r])===null||a===void 0?void 0:a.rules;o&&this[r].ruler.enableOnly(o)});const s=(i=t.inline)===null||i===void 0?void 0:i.rules2;s&&this.inline.ruler2.enableOnly(s)}return this}enable(n,e=!1){let t=[];Array.isArray(n)||(n=[n]),["core","block","inline"].forEach(s=>{t=t.concat(this[s].ruler.enable(n,!0))}),t=t.concat(this.inline.ruler2.enable(n,!0));const i=n.filter(s=>t.indexOf(s)<0);if(i.length&&!e)throw new Error(`MarkdownIt. Failed to enable unknown rule(s): ${i}`);return this}disable(n,e=!1){let t=[];Array.isArray(n)||(n=[n]),["core","block","inline"].forEach(s=>{t=t.concat(this[s].ruler.disable(n,!0))}),t=t.concat(this.inline.ruler2.disable(n,!0));const i=n.filter(s=>t.indexOf(s)<0);if(i.length&&!e)throw new Error(`MarkdownIt. Failed to disable unknown rule(s): ${i}`);return this}use(n,...e){return n.apply(n,[this,...e]),this}parse(n,e){if(typeof n!="string")throw new Error("Input data should be a String");const t=new this.core.State(n,this,e);return this.core.process(t),t.tokens}render(n,e={}){return this.renderer.render(this.parse(n,e),this.options,e)}parseInline(n,e){const t=new this.core.State(n,this,e);return t.inlineMode=!0,this.core.process(t),t.tokens}renderInline(n,e={}){return this.renderer.render(this.parseInline(n,e),this.options,e)}};Ee(qn,"Token",Wi);Ee(qn,"Ruler",Ar);Ee(qn,"Renderer",Ff);Ee(qn,"ParserCore",Of);Ee(qn,"StateCore",Uf);Ee(qn,"ParserBlock",Hf);Ee(qn,"StateBlock",Bf);Ee(qn,"ParserInline",jf);Ee(qn,"StateInline",Gf);var bE=If(qn);const yE=new bE({html:!0,linkify:!0,breaks:!1,typographer:!1}).enable("strikethrough");function ME(n){return n.replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<style[\s\S]*?<\/style>/gi,"").replace(/\son\w+\s*=\s*"[^"]*"/gi,"").replace(/\son\w+\s*=\s*'[^']*'/gi,"").replace(/(href|src)\s*=\s*"javascript:[^"]*"/gi,'$1="#"').replace(/(href|src)\s*=\s*'javascript:[^']*'/gi,"$1='#'")}function SE(n){return ME(yE.render(n))}const Jc=["随笔","日常","re周报","web周报","占位文章"],EE=["全部文章",...Jc],TE=8,wE="<p>这一分类的文章即将发布，敬请期待。</p>",AE="这一分类的文章即将发布，敬请期待。",RE={"my-first-post.md":"随笔","00-开始-搭建博客.md":"日常","RE01-第一周周报.md":"re周报","01-hugo+ananke的基础美化.md":"web周报"},CE=Object.assign({"/posts/00-开始-搭建博客.md":Xy,"/posts/01-hugo+ananke的基础美化.md":jy,"/posts/RE01-第一周周报.md":qy,"/posts/my-first-post.md":Yy});function DE(n){const e=n.match(/^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+\r?\n?([\s\S]*)$/);if(!e)return{data:{},body:n};const t={};for(const i of e[1].split(/\r?\n/)){const s=i.match(/^(\w+)\s*=\s*"([^"]*)"|^(\w+)\s*=\s*'([^']*)'/);s&&(t[s[1]||s[3]]=s[2]??s[4]??"")}return{data:t,body:e[2]}}function PE(n){for(const e of n.split(/\r?\n/)){const t=e.trim();if(!(!t||t.startsWith("#")||t.startsWith("```")||t.startsWith("|")||t.startsWith(">")||t.startsWith("-")||t.startsWith("*")))return t.replace(/[*_`~]/g,"").slice(0,120)}return""}function fc(n){return n.split("/").pop()??n}const IE=Object.entries(CE).sort(([n],[e])=>fc(n).localeCompare(fc(e))),qf={};for(const[n,e]of IE){const t=fc(n),{data:i,body:s}=DE(e);if(i.draft==="true")continue;const r=RE[t]??"随笔",a=i.title||t.replace(/\.md$/,"");(qf[r]??=[]).push({title:a,image:i.featured_image||void 0,date:(i.date||"").slice(0,10)||"未标注",body:SE(s),abstract:PE(s)||a})}const pc=[];let md=1;for(const n of Jc){const e=qf[n]??[];for(const t of e)pc.push({id:`X-${String(md++).padStart(3,"0")}`,title:t.title,en:t.title,department:n,category:n,date:t.date,lead:"MoFox-Elysia",clearance:"PUBLIC",abstract:t.abstract,findings:[],source:"",image:t.image,body:t.body});for(let t=e.length;t<TE;t++)pc.push({id:`X-${String(md++).padStart(3,"0")}`,title:"即将发布",en:"COMING SOON",department:n,category:n,date:"未标注",lead:"MoFox-Elysia",clearance:"PUBLIC",abstract:AE,findings:[],source:"",body:wE})}const LE=pc,Ot=LE,NE=EE,Ki=Jc;function Zi(n){return Ot.map((e,t)=>({record:e,index:t})).filter(({record:e})=>e.category===Ki[n]).map(({index:e})=>e)}function Ri(n){const e=Ki.indexOf(Ot[n].category),t=12+Zi(e).indexOf(n);return{lane:e,row:t,slot:e*32+t}}function il(n){const e=Zi(Math.floor(n/32));return e[Math.max(0,Math.min(e.length-1,n%32-12))]}const Yf=9,As=32,ma=5.2,ga=.62,$f=[0,1,2,3,4,-2,-1,5,6];function mc(n,e){return(n%e+e)%e}function Fa(n,e,t){return n+Math.floor((e-n+t/2)/t)*t}function gd({lane:n,row:e}){const t=Zi(mc(n,Ki.length));return t[mc(e-12,t.length)]}function FE(n,e,t){if(t&&"cell"in t)return{...t.cell};const i=Ri(n),s=Fa(i.row,e.row,Zi(i.lane).length);return t?.axis==="row"?{lane:e.lane,row:e.row+t.direction}:{lane:t?.axis==="lane"?e.lane+t.direction:Fa(i.lane,e.lane,Ki.length),row:s}}function _d(n){return{lane:$f[Math.floor(n/As)],row:n%As}}function UE(n,e){return{lane:Fa($f[Math.floor(n/As)],e.lane,Yf),row:Fa(n%As,e.row,As)}}function sl(n){return`${n.lane}:${n.row}`}function vd(n,e){return n.lane===e.lane&&n.row===e.row}const Kf='<path d="M156 75C127 48 103 15 70 15C37 15 15 39 15 70S38 128 70 128C103 128 127 96 176 52M155 75C182 99 208 128 240 128C273 128 295 105 295 73S273 15 240 15C221 15 207 23 192 38" fill="none" stroke="currentColor" stroke-width="26"/><path d="M44 70h50M69 45v50M219 70h44" fill="none" stroke="currentColor" stroke-width="15"/>',kE=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 145" color="#171713">${Kf}</svg>`,rl=`<svg viewBox="0 0 310 185" aria-label="Rhine Lab" role="img">${Kf}<text x="165" y="174" text-anchor="middle" font-family="MiSans,sans-serif" font-size="16" font-weight="700" letter-spacing="22">RHINE·LAB</text></svg>`,OE=["M295 73C295 41 273 15 240 15C221 15 207 23 192 38","M176 52C127 96 103 128 70 128C38 128 15 101 15 70C15 39 37 15 70 15C103 15 127 48 156 75","M155 75C182 99 208 128 240 128C273 128 295 105 295 73"],cn=n=>(n=Math.max(0,Math.min(1,n)),n*n*n*(10+n*(-15+6*n))),Ua=(n,e)=>Math.exp(-.5*(n/e)**2);function Zf(n,e,t){const i=t-22,s=n+(e-2)*.65,r=cn(i/.32),a=3+i*19,o=32-(i-2.3)*24,l=c=>2.5*Ua(c,3.8)-.58*Ua(c-6,3.5);return r*(l(s-a)*(1-cn((i-2.15)/.65))+l(s-o)*cn((i-2.17)/.32)*(1-cn((i-3.5)/.85)))}function BE(n){return .4*cn((n-25.58)/.82)+2.95*cn((n-27.55)/1.3)}function Jf(n,e){const t=e-25.05-Math.abs(n)*.065,i=Math.max(-.42,2.15-.17*(Math.sqrt(n*n+1)-1)),s=cn(t/.62),r=t>0?Math.sin(t*5.1)*Math.exp(-t*1.3):0;return i*(s+.18*r*cn(t/.16))}function zE(n,e){return e<0||e>3.2?0:.8*cn(e/.2)*Math.exp(-e*1.15)*Math.cos((n-e*8)*.58)*Ua(n-e*8,3.4)}function VE(n,e){return cn(n/2.5)*Math.max(0,Math.cos((n-e*8)*.58))}function Qf(n,e,t=1){return 1+(.25+.75*Ua(n-e,.55)-1)*cn(t)}function HE(n,e,t){return .075*Math.sin(t*Math.PI*2/8+n*.3-e*.45)+.027*Math.sin(t*Math.PI*2/13-n*.17+e*.3)}function GE(n,e,t,i=12,s=2){const r=cn((t-24.95)/.45),a=cn((t-25.4)/.95),o=t+.3*r*(1-a);return Zf(n,e,t)*(1-r)+Jf(n-i,o)*Qf(e,s,(t-25.4)/.95)}const xd=4.05,WE=.001;function bd(n,e,t=!1){const i=n*Math.exp(-e*(t?35:7));return Math.abs(i)<=WE?0:i}function Vi(n,e,t,i){const s=n.value-e,r=n.velocity+t*s,a=Math.exp(-t*i);n.value=e+(s+r*i)*a,n.velocity=(n.velocity-t*r*i)*a}const Et=n=>(n=$e.clamp(n,0,1),n*n*n*(n*(n*6-15)+10));class XE{constructor(e,t=zE,i=!1,s="baseline"){this.container=e,this.selectionPulse=t,this.deferSelectionPulse=i,this.lightingLook=s,this.renderer=new uf({antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)*Math.min(innerWidth/1920,innerHeight/1080)),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.info.autoReset=!1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ad,this.renderer.toneMapping=Cr,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.setAttribute("aria-label","三维研究档案阵列，可点击选择档案"),e.appendChild(this.renderer.domElement),this.scene.background=new Ne("#eae5e1"),this.scene.fog=new Xa("#eae5e1",22,47),this.light=mf(this.renderer,this.scene,s),this.light.castShadow=!0,Object.assign(this.light.shadow.camera,{left:-16,right:16,top:15,bottom:-15,near:.1,far:45}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.normalBias=s==="refined"?.018:.035,this.light.shadow.bias=s==="refined"?-12e-5:-3e-4,this.light.shadow.radius=4;const r=new ct(new Gi(200,200),new Os({color:"#d8c9b9",roughness:.95}));r.rotation.x=-Math.PI/2,r.position.y=-4.63,r.receiveShadow=!0,this.scene.add(r),this.camera.position.set(-62.26,35.98,43.28),this.cameraAim.set(-.5,1.1,.4),this.camera.fov=6.15,this.camera.lookAt(this.cameraAim),this.composer=new By(this.renderer),this.composer.addPass(new zy(this.scene,this.camera)),this.ao=new Ei(this.scene,this.camera,e.clientWidth,e.clientHeight),this.ao.kernelRadius=s==="refined"?.44:.38,this.ao.minDistance=.001,this.ao.maxDistance=.09,this.composer.addPass(this.ao),this.bokeh=new Gy(this.scene,this.camera,{focus:25,aperture:.0018,maxblur:.011}),this.composer.addPass(this.bokeh),this.composer.addPass(new Hy),this.bindPointer()}container;selectionPulse;deferSelectionPulse;lightingLook;renderer;scene=new Bc;camera=new qt(34,16/9,.1,300);composer;ao;bokeh;instances=[];model=new On;appearance=new Wy;cursor=new Le;raycaster=new s0;dummy=new mt;positions=[];cells=[];selectedCell={lane:2,row:12};looping=!1;coordinateOrigin={lane:0,row:0};lift={value:0,velocity:0};rail={value:0,velocity:0};shoulder={value:12,velocity:0};laneFocus={value:2,velocity:0};columnCamera={value:0,velocity:0};returnY=null;canInspect=!1;clearance=0;pulseGain=1;idleGain=0;lastInteraction=0;scanTime=29.1;scanBlend=0;cameraAim=new L;outgoing=[];pulses=[];pendingPulse=null;selectedSlot=76;detail=0;targetDetail=0;reveal=0;targetReveal=0;last=0;pointer=new Le;dragging=!1;rotation=0;targetRotation=0;light;clock=0;loaded=!1;labelCanvas=document.createElement("canvas");labelTexture;labelMark=new Image;reduced=!1;highQuality=!0;onSelect;onHover;async load(){this.labelMark.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(kE)}`,await this.labelMark.decode();const e=await new ku().loadAsync("/assets/archive-cassette.glb");e.scene.updateMatrixWorld(!0);const t=[];e.scene.traverse(r=>{r instanceof ct&&t.push(r)});const i=Yf*As;for(let r=0;r<i;r++){const a=_d(r);this.cells.push(a),this.positions.push(this.cellPosition(a))}for(const r of t){const a=r.geometry.clone().applyMatrix4(r.matrixWorld).scale(1,1,1),o=r.material,l=o.name.replace(/\.\d+$/,""),c=o.clone();if(c.envMapIntensity=.6,l==="Frosted_Polymer"&&(c.color.set("#fffdfa"),c.transmission=.9,c.thickness=.12,c.roughness=.21,c.ior=1.46,c.attenuationColor=new Ne("#eee6df"),c.attenuationDistance=2,c.onBeforeCompile=f=>{f.vertexShader=`varying float vArchiveHeight;
`+f.vertexShader,f.vertexShader=f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vArchiveHeight = position.y / 3.7;`),f.fragmentShader=`varying float vArchiveHeight;
`+f.fragmentShader,f.fragmentShader=f.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(0.48, 0.035, smoothstep(0.36, 0.68, vArchiveHeight));`)}),l==="Internal_Ceramic"&&(c.color.set(this.lightingLook==="refined"?"#c4baae":"#c7beb6"),c.roughness=.6),l==="Printed_Label"&&c.color.set("#eae5dc"),l==="Ivory_Edges"&&(c.color.set("#f0e7df"),c.roughness=.31,c.transmission=.65,c.thickness=.04),l==="Optical_Diffuser"&&(c.color.set("#e2dad4"),c.transmission=0,c.roughness=.7),l==="Subsurface_Optics"&&(c.color.set(this.lightingLook==="refined"?"#b9a796":"#b9aba1"),c.roughness=.48,c.metalness=.05),l==="Optical_Edges"&&(c.transmission=0,c.color.set(this.lightingLook==="refined"?"#d8c7b5":"#d4c7be"),c.roughness=.26,c.metalness=.08),l==="Amber_Lightguide"&&(c.polygonOffset=!0,c.polygonOffsetFactor=-1,c.polygonOffsetUnits=-2),l==="Carbon_Ink")continue;const h=new ct(a,c);if(h.userData.surface=l,h.castShadow=l==="Optical_Diffuser",h.receiveShadow=!0,this.model.add(h),!["Frosted_Polymer","Ivory_Edges","Titanium_Fasteners","Champagne_Index","Optical_Diffuser"].includes(l)){this.appearance.register(l,c);continue}const u=c.clone();l==="Frosted_Polymer"&&(u.transmission=.78,this.lightingLook==="refined"&&(u.thickness=.28,u.attenuationColor.set("#d4c7b4"),u.attenuationDistance=1.2),u.transparent=!1,u.color.set("#fff7ed"),u.onBeforeCompile=f=>{f.vertexShader=`varying float vPanelHeight;
`+f.vertexShader,f.vertexShader=f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vPanelHeight = position.y / 3.7;`),f.fragmentShader=`varying float vPanelHeight;
`+f.fragmentShader,f.fragmentShader=f.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= mix(vec3(0.40, 0.30, 0.20), vec3(1.0, 0.98, 0.94), smoothstep(0.1, 1.0, vPanelHeight));`)},u.roughness=.28,u.clearcoat=.3,u.clearcoatRoughness=.25),l==="Optical_Diffuser"&&u.color.set("#806447"),l==="Ivory_Edges"&&(u.transmission=0,u.color.set(this.lightingLook==="refined"?"#dcc9b0":"#fff5e9"),u.roughness=.38),l==="Champagne_Index"&&(u.color.set("#e4d6c5"),u.metalness=.05),this.appearance.register(l,c,u);const d=new Hc(a,u,i);d.instanceMatrix.setUsage(ym),d.castShadow=l==="Optical_Diffuser",d.receiveShadow=!0,d.frustumCulled=!1,this.instances.push(d),this.scene.add(d)}this.labelCanvas.width=1024,this.labelCanvas.height=440,this.labelTexture=new Oo(this.labelCanvas),this.labelTexture.colorSpace=Ct,this.labelTexture.anisotropy=this.renderer.capabilities.getMaxAnisotropy();const s=new ct(new Gi(.99,.46),new Bn({map:this.labelTexture,toneMapped:!1,transparent:!0,depthWrite:!1}));s.position.set(-1.36,3.04,.255),this.model.add(s),this.appearance.prepare(this.model),this.appearance.apply(this.model,0),this.drawLabel(0),this.scene.add(this.model),this.model.position.copy(this.positions[this.selectedSlot]),this.loaded=!0}assemblyTemplate;async createAssemblyModel(){this.assemblyTemplate??=new ku().loadAsync("/assets/archive-assembly.glb").then(o=>(o.scene.updateMatrixWorld(!0),o.scene)).catch(o=>{throw this.assemblyTemplate=void 0,o});const e=await this.assemblyTemplate,t=new On,i=[];e.traverse(o=>{if(!(o instanceof ct))return;const l=o.material.name.replace(/\.\d+$/,""),c=new ct(o.geometry.clone().applyMatrix4(o.matrixWorld),o.material);c.userData.surface=l,c.userData.assemblyPart=o.userData.assemblyPart,t.add(c),i.push(c)}),this.appearance.prepare(t),this.appearance.apply(t,1);const s=document.createElement("canvas");s.width=this.labelCanvas.width,s.height=this.labelCanvas.height,s.getContext("2d").drawImage(this.labelCanvas,0,0);const r=new Oo(s);r.colorSpace=Ct,r.anisotropy=this.renderer.capabilities.getMaxAnisotropy();const a=new ct(new Gi(.99,.46),new Bn({map:r,toneMapped:!1,transparent:!0,depthWrite:!1}));return a.position.set(-1.36,3.04,.255),a.userData.assemblyPart="cover",t.add(a),i.push(a),{model:t,dispose:()=>{for(const o of i)o.geometry.dispose(),o.material.dispose();r.dispose()}}}setMode(e){if(e!=="archive"&&(this.pendingPulse=null),this.looping=e!=="hidden",!this.looping){const t=Ri(il(this.selectedSlot));this.selectedCell={lane:t.lane,row:t.row},this.coordinateOrigin={lane:0,row:0};for(const i of this.outgoing)this.scene.remove(i.group),this.appearance.dispose(i.group);this.outgoing=[]}this.lastInteraction=this.clock,this.targetReveal=e==="hidden"?0:1,this.targetDetail=e==="detail"?1:0,this.dragging=!1,e!=="detail"?(this.targetRotation=0,this.rotation!==0&&(this.returnY=this.model.position.y)):this.returnY=null}setReduced(e){this.reduced=e}setQuality(e){this.highQuality=e,this.ao.enabled=e,this.bokeh.enabled=e,this.resize()}cellPosition(e){return new L((e.lane-2)*ma,-4.6,(e.row-15.5)*ga)}rebaseCoordinates(){const e={lane:Math.abs(this.selectedCell.lane)>2048?Math.round((this.selectedCell.lane-2)/5)*5:0,row:Math.abs(this.selectedCell.row)>2048?Math.floor((this.selectedCell.row-12)/8)*8:0};if(!(!e.lane&&!e.row)){this.selectedCell.lane-=e.lane,this.selectedCell.row-=e.row,this.coordinateOrigin.lane+=e.lane,this.coordinateOrigin.row+=e.row,this.laneFocus.value-=e.lane,this.shoulder.value-=e.row,this.columnCamera.value-=e.lane*ma,this.rail.value+=e.row*ga;for(const t of this.outgoing)t.cell.lane-=e.lane,t.cell.row-=e.row;for(const t of this.pulses)t.lane-=e.lane,t.row-=e.row;this.pendingPulse&&(this.pendingPulse.lane-=e.lane,this.pendingPulse.row-=e.row)}}select(e,t){this.lastInteraction=this.clock;const i=Ri(e).slot,s=Ri(e),r=this.looping?FE(e,this.selectedCell,t):{lane:s.lane,row:s.row},a=!vd(r,this.selectedCell);if(this.looping&&a&&this.loaded&&this.lift.value>1e-4){const l=this.model.clone(!0);this.appearance.prepare(l);const c=l.children[l.children.length-1],h=document.createElement("canvas");h.width=1024,h.height=440,h.getContext("2d").drawImage(this.labelCanvas,0,0);const u=new Oo(h);u.colorSpace=Ct,c.material=new Bn({map:u,toneMapped:!1,transparent:!0,depthWrite:!1}),this.appearance.apply(l,Et(this.lift.value/.4)),this.scene.add(l),this.outgoing.push({group:l,slot:this.selectedSlot,cell:{...this.selectedCell},lift:{...this.lift},returnY:l.rotation.y!==0?l.position.y:null}),this.lift.value=0,this.lift.velocity=0}this.selectedSlot=i,this.selectedCell=r,a&&(this.rotation=0,this.returnY=null);const o=this.outgoing.findIndex(l=>vd(l.cell,r));if(o>=0){const l=this.outgoing[o];this.lift={...l.lift},this.rotation=l.group.rotation.y,this.returnY=l.returnY,this.scene.remove(l.group),this.appearance.dispose(l.group),this.outgoing.splice(o,1)}this.deferSelectionPulse?this.pendingPulse=this.looping?{...r}:null:this.emitPulse(r),this.targetRotation=0,this.drawLabel(e)}emitPulse(e){this.pulses.push({...e,time:this.clock}),this.pulses=this.pulses.slice(-6)}drawLabel(e){if(!this.labelTexture)return;const t=this.labelCanvas.getContext("2d");t.fillStyle="#e6e2d9",t.fillRect(0,0,1024,440),t.fillStyle="#171713",t.fillRect(12,12,1e3,6),t.fillRect(12,419,1e3,3),t.font="bold 81px MiSans",t.fillText("RHINE LAB, LLC.",22,116),t.font="32px MiSans",t.fillStyle="#878476",t.fillText("INTERNAL DATABASE",25,174),t.fillStyle="#171713",t.font="bold 130px MiSans",t.fillText("NO."+String(e+1).padStart(3,"0"),22,360),t.fillRect(782,32,221,39),t.fillStyle="#eee9de",t.font="24px MiSans",t.fillText("R L / I S",809,61),t.fillStyle="#171713",t.font="bold 64px MiSans",t.fillText("INFO",830,143),t.drawImage(this.labelMark,790,242,210,98),this.labelTexture.needsUpdate=!0}resize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.renderer.setPixelRatio(Math.min(devicePixelRatio,this.highQuality?1.5:1)*Math.min(innerWidth/1920,innerHeight/1080)),this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.renderer.setSize(e,t),this.composer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}bindPointer(){const e=this.renderer.domElement;let t=0,i=0;e.addEventListener("pointerdown",s=>{t=s.clientX,i=s.clientY,this.canInspect&&(this.dragging=!0,e.setPointerCapture(s.pointerId))}),e.addEventListener("pointermove",s=>{const r=e.getBoundingClientRect();if(this.pointer.set((s.clientX-r.left)/r.width-.5,(s.clientY-r.top)/r.height-.5),this.dragging){if(!this.canInspect){this.dragging=!1;return}this.targetRotation=$e.clamp(this.targetRotation+s.movementX*.004,-.8,.8);return}if(this.reveal<.8||this.detail>.2||!this.loaded)return;this.cursor.set((s.clientX-r.left)/r.width*2-1,-(s.clientY-r.top)/r.height*2+1),this.raycaster.setFromCamera(this.cursor,this.camera);const a=this.raycaster.intersectObjects([this.instances[0],this.model],!0)[0];e.style.cursor=a?"pointer":"default",this.onHover?.(a?a.instanceId!==void 0?gd(this.cells[a.instanceId]):il(this.selectedSlot):null)}),e.addEventListener("pointerup",s=>{if(this.dragging=!1,Math.hypot(s.clientX-t,s.clientY-i)>6||this.detail>.2||this.reveal<.8||!this.loaded)return;const r=e.getBoundingClientRect();this.cursor.set((s.clientX-r.left)/r.width*2-1,-(s.clientY-r.top)/r.height*2+1),this.raycaster.setFromCamera(this.cursor,this.camera);const a=this.raycaster.intersectObjects([this.instances[0],this.model],!0)[0];a&&this.onSelect?.(a.instanceId!==void 0?gd(this.cells[a.instanceId]):il(this.selectedSlot),a.instanceId!==void 0?{...this.cells[a.instanceId]}:{...this.selectedCell})}),e.addEventListener("pointercancel",()=>this.dragging=!1),e.addEventListener("pointerleave",()=>{this.pointer.set(0,0),this.onHover?.(null)})}update(e,t){const i=Math.min(e-this.last||.016,.05);if(this.last=e,this.clock=e,!this.loaded)return;const s=1-Math.exp(-i*(this.reduced?35:2.8));this.reveal=t?t.reveal:$e.lerp(this.reveal,this.targetReveal,s),this.rotation=this.targetDetail?$e.lerp(this.rotation,this.targetRotation,s):bd(this.rotation,i,this.reduced);const r=t?.time??29.1;t?(this.scanTime=r,this.scanBlend=1):(this.scanTime+=i,this.scanBlend*=Math.exp(-i*3)),this.looping&&!t&&this.rebaseCoordinates();const a=this.cellPosition(this.selectedCell),o=this.selectedCell.row,l=this.selectedCell.lane;Vi(this.shoulder,o,this.reduced?35:5,i),Vi(this.laneFocus,l,this.reduced?35:4,i),Vi(this.columnCamera,a.x,this.reduced?35:3.7,i),Vi(this.rail,t?0:-2.17-a.z,this.reduced?35:3.7,i),t&&(this.rail.value=0,this.rail.velocity=0,this.lift.value=BE(r),this.lift.velocity=0,this.shoulder.value=o,this.laneFocus.value=l,this.laneFocus.velocity=0,this.columnCamera.value=a.x,this.columnCamera.velocity=0);const c=t?0:this.columnCamera.value,h={lane:this.columnCamera.value/ma+2,row:(-this.rail.value-2.17)/ga+15.5};for(let K=0;K<this.positions.length;K++)this.cells[K]=t||!this.looping?_d(K):UE(K,h),this.positions[K].set((this.cells[K].lane-2)*ma,-4.6,(this.cells[K].row-15.5)*ga);this.pulses=this.pulses.filter(K=>e-K.time<3.2);const u=this.outgoing.some(K=>K.returnY!==null),d=!t&&!this.reduced&&this.targetReveal>0&&!this.targetDetail&&this.detail<.01&&this.returnY===null&&!u&&e-this.lastInteraction>2.5;this.idleGain=t?0:$e.lerp(this.idleGain,d?1:0,1-Math.exp(-i*(d?.8:4))),this.pulseGain=$e.lerp(this.pulseGain,this.targetDetail||this.returnY!==null||u?0:1,1-Math.exp(-i*8));const f=(K,ce)=>{if(t)return GE(K,ce,r,this.shoulder.value,this.laneFocus.value);let Ce=Zf(K+this.coordinateOrigin.row,ce+this.coordinateOrigin.lane,this.scanTime)*this.scanBlend+HE(K+this.coordinateOrigin.row,ce+this.coordinateOrigin.lane,e)*this.idleGain;if(!t&&!this.reduced){let Z=0;for(const ee of this.pulses){const Re=Math.hypot(K-ee.row,(ce-ee.lane)*2.2),ve=e-ee.time;Z+=this.selectionPulse(Re,ve)*(this.deferSelectionPulse?VE(Re,ve):1)}Ce+=$e.clamp(Z,-.6,.6)*this.pulseGain}const W=K-this.shoulder.value;return Ce+Jf(W,26.56)*Qf(ce,this.laneFocus.value)},p=a.y+f(o,l);t||(this.returnY!==null&&this.rotation!==0?(this.lift.value=this.returnY-p,this.lift.velocity=0):(this.returnY=null,Vi(this.lift,this.targetDetail?xd:this.outgoing.some(K=>K.returnY!==null&&K.cell.lane===l&&Math.abs(K.cell.row-o)<5)?0:.4*this.targetReveal,this.reduced?35:this.deferSelectionPulse&&!this.targetDetail&&this.lift.value<.4?7.6:4.2,i)));const _=this.targetDetail?Et((this.lift.value-.8)/2.4):this.returnY!==null?this.detail:Et((this.lift.value-.4)/(xd-.4));this.detail=t?t.zoom:$e.lerp(this.detail,_,s);const m=this.detail;this.appearance.apply(this.model,Et(this.lift.value/.4));const g=t?Et((r-21.9)/.86):this.reveal,y=$e.clamp((r-21.92)/.75,0,1),S=t?-23*(1-y)**2:-28*(1-g);for(let K=this.outgoing.length-1;K>=0;K--){const ce=this.outgoing[K],Ce=this.cellPosition(ce.cell),W=Ce.y+f(ce.cell.row,ce.cell.lane);ce.group.rotation.y=bd(ce.group.rotation.y,i,this.reduced),ce.returnY!==null?(ce.lift.value=ce.returnY-W,ce.lift.velocity=0,ce.group.rotation.y===0&&(ce.returnY=null)):Vi(ce.lift,0,this.reduced?35:4.5,i),ce.group.position.set(Ce.x-c,W+ce.lift.value,Ce.z+S+this.rail.value);const Z=Et(ce.lift.value/.4);this.appearance.apply(ce.group,Z);const{row:ee,lane:Re}=ce.cell;ce.group.rotation.x=(f(ee+.5,Re)-f(ee-.5,Re))*.024*(1-m)*(1-Z),ce.lift.value<1e-4&&Math.abs(ce.group.rotation.y)<1e-4&&(this.scene.remove(ce.group),this.appearance.dispose(ce.group),this.outgoing.splice(K,1))}if(this.pendingPulse&&!t&&!this.targetDetail&&this.targetReveal){const K=p+this.lift.value,ce=this.outgoing.every(Ce=>Ce.cell.lane!==l||Math.abs(Ce.cell.row-o)>4||Ce.group.position.y+.015<K);this.lift.value>=.35&&this.returnY===null&&ce&&(this.reduced||this.emitPulse(this.pendingPulse),this.pendingPulse=null)}const v=new Set(this.outgoing.map(K=>sl(K.cell)));v.add(sl(this.selectedCell));for(let K=0;K<this.positions.length;K++){const ce=this.positions[K],{row:Ce,lane:W}=this.cells[K],Z=f(Ce+.5,W)-f(Ce-.5,W);this.dummy.position.set(ce.x-c,ce.y+f(Ce,W),ce.z+S+this.rail.value),this.dummy.rotation.set(Z*.024*(1-m),0,0),this.dummy.scale.setScalar(v.has(sl(this.cells[K]))||(t||!this.looping)&&K>=160?0:1),this.dummy.updateMatrix();for(const ee of this.instances)ee.setMatrixAt(K,this.dummy.matrix)}for(const K of this.instances)K.instanceMatrix.needsUpdate=!0;this.model.position.set(a.x-c,a.y+f(o,l)+this.lift.value,a.z+S+this.rail.value),this.model.rotation.set((f(o+.5,l)-f(o-.5,l))*.024*(1-m)*(1-Et(this.lift.value/.4)),t?0:this.rotation,0);const M=Et((r-22.6)/1.6),w=Et((r-24.25)/2.25),C=$e.degToRad(89-22*M-8*w),x=$e.degToRad(3+40*Et((r-21.96)/.22)-8*M-16*w),E=$e.lerp($e.lerp(10.8,10.3,M),7.33,w),D=$e.lerp($e.lerp(28+7*M,140,w),72,m),I=new L(-1.091,$e.lerp(-2.55+.4*M,-.045,w),$e.lerp(2.48,.481,w)).clone(),F=new L(-Math.sin(C)*Math.cos(x),Math.sin(x),Math.cos(C)*Math.cos(x));if(t){const K=Et((r-27.3)/1.3),ce=Et((r-28.6)/5.4),Ce=C-$e.degToRad(9*K+32*ce),W=x-$e.degToRad(1.5*K+3.7*ce);F.set(-Math.sin(Ce)*Math.cos(W),Math.sin(W),Math.cos(Ce)*Math.cos(W))}else F.lerp(new L(-.277,.238,.931),m).normalize();if(t){const K=Et((r-25.4)/.95),ce=new L().crossVectors(new L(0,1,0),F).normalize();I.addScaledVector(ce,-2.05*(1-K)*Et((r-24.2)/.8))}if(t&&r>=25.05&&r<=27.3){const K=Et((r-25.4)/1.05),ce=new L().crossVectors(new L(0,1,0),F).normalize(),Ce=new L().crossVectors(F,ce).normalize(),W=1080/E,Z=this.model.position.clone().add(new L(-2.5,3.7,0));Z.addScaledVector(ce,-($e.lerp(840,518,K)-960)/W),Z.addScaledVector(Ce,-(540-$e.lerp(340,288,K))/W),I.lerp(Z,Et((r-25.05)/.35))}if(t&&r>27.3){const K=Et((r-27.3)/6.7),ce=Et((r-27.3)/1.25),Ce=$e.lerp(518-98*ce,618,K),W=$e.lerp(296+34*ce,287,K),Z=1080/$e.lerp(E,5.9,m),ee=new L().crossVectors(new L(0,1,0),F).normalize(),Re=new L().crossVectors(F,ee).normalize(),ve=this.model.position.clone().add(new L(-2.5,3.7,0));ve.addScaledVector(ee,-(Ce-960)/Z),ve.addScaledVector(Re,-(540-W)/Z),I.lerp(ve,Et((r-27.3)/.5))}if(!t){const K=new L().crossVectors(new L(0,1,0),F).normalize(),ce=new L().crossVectors(F,K).normalize(),Ce=1080/$e.lerp(E,5.9,m),W=this.model.position.clone().add(new L(0,1.85,0));W.addScaledVector(K,410/Ce),W.addScaledVector(ce,20/Ce),I.lerp(W,m)}const H=I.clone().addScaledVector(F,D);!t&&!this.reduced&&(H.x+=this.pointer.x*.12,H.y-=this.pointer.y*.12);const B=t?1:1-Math.exp(-i*5);this.camera.position.lerp(H,B),this.cameraAim.lerp(I,B),this.camera.lookAt(this.cameraAim),this.camera.fov=$e.lerp(this.camera.fov,$e.radToDeg(2*Math.atan($e.lerp(E,5.9,m)/(2*D))),B);const z=this.scene.fog,k=this.camera.position.distanceTo(this.cameraAim);z.near=k+$e.lerp(5,-1,m),z.far=k+$e.lerp(25,12,m),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld();let Q=-1/0;const $=l,se=o;for(let K=se-5;K<=se+5;K++)K!==se&&(Q=Math.max(Q,-4.6+f(K,$)+3.76));for(const K of this.outgoing)K.cell.lane===$&&Math.abs(K.cell.row-se)<=5&&(Q=Math.max(Q,K.group.position.y+3.76));this.clearance=this.model.position.y-Q,this.canInspect=!t&&!!this.targetDetail&&m>.9&&this.pulseGain<.01&&this.clearance>.3,this.container.dataset.inspection=this.returnY!==null?"aligning":this.canInspect?"ready":this.targetDetail?"lifting":"preview";const he=this.model.position.clone().add(new L(0,2,0)).applyMatrix4(this.camera.matrixWorldInverse),le=this.bokeh.uniforms;le.focus.value=-he.z,le.aperture.value=$e.lerp(3e-4,8e-4,m),this.renderer.info.reset(),this.composer.render()}projectCard(e,t){this.model.updateMatrixWorld(!0);const i=this.model.localToWorld(new L(e,t,.255)).project(this.camera);return[(i.x+1)*960,(1-i.y)*540]}get detailVisibility(){return Et((this.detail-.25)/.55)}getStats(){this.model.updateMatrixWorld(!0);const e=(t,i,s)=>{const r=this.model.localToWorld(new L(t,i,s)).project(this.camera);return[Math.round((r.x+1)*960),Math.round((1-r.y)*540)]};return{topLeft:e(-2.5,3.7,0),topRight:e(2.5,3.7,0),labelTopLeft:e(-1.855,3.27,.255),labelBottomLeft:e(-1.855,2.81,.255),modelPosition:this.model.position.toArray().map(t=>Math.round(t*1e4)/1e4),cameraPosition:this.camera.position.toArray().map(t=>Math.round(t*1e4)/1e4),fieldOfView:this.camera.fov,loaded:this.loaded,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,archiveCount:this.positions.length,returningFiles:this.outgoing.length,selectionPhase:this.pendingPulse?"lifting":this.pulses.length?"wave":"settled",pendingPulse:this.pendingPulse?{...this.pendingPulse}:null,pulses:this.pulses.map(t=>({...t})),referenceTime:Math.round((this.scanTime+5)*100)/100,selectedSlot:this.selectedSlot,selectedLane:Math.floor(this.selectedSlot/32),selectedCell:{...this.selectedCell},coordinateOrigin:{...this.coordinateOrigin},poolBounds:{minLane:Math.min(...this.cells.map(t=>t.lane)),maxLane:Math.max(...this.cells.map(t=>t.lane)),minRow:Math.min(...this.cells.map(t=>t.row)),maxRow:Math.max(...this.cells.map(t=>t.row))},laneFocus:this.laneFocus.value,columnCamera:this.columnCamera.value,rotation:this.rotation,clearance:this.clearance,canInspect:this.canInspect,returnPhase:this.returnY!==null?"aligning":"lowering",extraction:Math.round(this.lift.value*1e3)/1e3,appearance:Math.round(Et(this.lift.value/.4)*1e3)/1e3,cameraDetail:Math.round(this.detail*1e3)/1e3,idleGain:this.idleGain,cameraDistance:this.camera.position.distanceTo(this.cameraAim),fogNear:this.scene.fog.near,fogFar:this.scene.fog.far,returningAppearance:this.outgoing.map(t=>({slot:t.slot,cell:{...t.cell},lift:t.lift.value,quality:Et(t.lift.value/.4),rotation:t.group.rotation.y,worldY:t.group.position.y,phase:t.returnY!==null?"aligning":"lowering"})),rail:Math.round(this.rail.value*1e3)/1e3}}}const yd={type:"change"},Qc={type:"start"},ep={type:"end"},_a=new Xs,Md=new yi,jE=Math.cos(70*$e.DEG2RAD),Dt=new L,Qt=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},al=1e-6;class qE extends r0{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ms.ROTATE,MIDDLE:Ms.DOLLY,RIGHT:Ms.PAN},this.touches={ONE:ys.ROTATE,TWO:ys.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new wn,this._lastTargetPosition=new L,this._quat=new wn().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new du,this._sphericalDelta=new du,this._scale=1,this._panOffset=new L,this._rotateStart=new Le,this._rotateEnd=new Le,this._rotateDelta=new Le,this._panStart=new Le,this._panEnd=new Le,this._panDelta=new Le,this._dollyStart=new Le,this._dollyEnd=new Le,this._dollyDelta=new Le,this._dollyDirection=new L,this._mouse=new Le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=$E.bind(this),this._onPointerDown=YE.bind(this),this._onPointerUp=KE.bind(this),this._onContextMenu=i1.bind(this),this._onMouseWheel=QE.bind(this),this._onKeyDown=e1.bind(this),this._onTouchStart=t1.bind(this),this._onTouchMove=n1.bind(this),this._onMouseDown=ZE.bind(this),this._onMouseMove=JE.bind(this),this._interceptControlDown=s1.bind(this),this._interceptControlUp=r1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(yd),this.update(),this.state=lt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Dt.copy(t).sub(this.target),Dt.applyQuaternion(this._quat),this._spherical.setFromVector3(Dt),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Qt:i>Math.PI&&(i-=Qt),s<-Math.PI?s+=Qt:s>Math.PI&&(s-=Qt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Dt.setFromSpherical(this._spherical),Dt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Dt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Dt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Dt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(_a.origin.copy(this.object.position),_a.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(_a.direction))<jE?this.object.lookAt(this.target):(Md.setFromNormalAndCoplanarPoint(this.object.up,this.target),_a.intersectPlane(Md,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>al||8*(1-this._lastQuaternion.dot(this.object.quaternion))>al||this._lastTargetPosition.distanceToSquared(this.target)>al?(this.dispatchEvent(yd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Dt.setFromMatrixColumn(t,0),Dt.multiplyScalar(-e),this._panOffset.add(Dt)}_panUp(e,t){this.screenSpacePanning===!0?Dt.setFromMatrixColumn(t,1):(Dt.setFromMatrixColumn(t,0),Dt.crossVectors(this.object.up,Dt)),Dt.multiplyScalar(e),this._panOffset.add(Dt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Dt.copy(s).sub(this.target);let r=Dt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Le,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function YE(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function $E(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function KE(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ep),this.state=lt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function ZE(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ms.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=lt.DOLLY;break;case Ms.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=lt.ROTATE}break;case Ms.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(Qc)}function JE(n){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function QE(n){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(n.preventDefault(),this.dispatchEvent(Qc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(ep))}function e1(n){this.enabled!==!1&&this._handleKeyDown(n)}function t1(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ys.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=lt.TOUCH_ROTATE;break;case ys.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case ys.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=lt.TOUCH_DOLLY_PAN;break;case ys.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(Qc)}function n1(n){switch(this._trackPointer(n),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=lt.NONE}}function i1(n){this.enabled!==!1&&n.preventDefault()}function s1(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function r1(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ol=[{id:"fasteners",label:"紧固件",en:"FASTENERS",depth:2.75},{id:"cover",label:"透明盖板",en:"OPTICAL COVER",depth:1.85},{id:"optical-lenses",label:"折射环组",en:"REFRACTIVE RINGS",depth:.75},{id:"optical-core",label:"光学核心",en:"OPTICAL CORE",depth:-.15},{id:"substrate",label:"信息基板",en:"SUBSTRATE",depth:-1.1},{id:"carrier",label:"背板与框架",en:"CARRIER",depth:-2.05}];class a1{root;canvasHost;renderer;scene=new Bc;camera=new qt(34,16/9,.3,120);controls;source;groups=new Map;spread={value:0,velocity:0};targetSpread=0;lastTime=0;request=0;reduced=!1;loading=!1;closing=!1;transitions=[];transitionId=0;status="";opener=null;siblings=[];initialCamera=new L(7.2,3.8,12);onClose;provider;isOpen=!1;constructor(e,t){this.onClose=t,this.root=document.createElement("section"),this.root.className="model-viewer",this.root.hidden=!0,this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-labelledby","viewer-title"),this.root.innerHTML=`
      <div class="viewer-canvas"></div>
      <div class="scene-atmosphere viewer-atmosphere" aria-hidden="true"></div>
      <header class="viewer-header">
        <button class="viewer-back" data-viewer="close">← <span>返回档案</span><kbd>ESC</kbd></button>
        <div class="viewer-heading"><span>RHINE LAB / OBJECT STUDY</span><h2 id="viewer-title">档案模型</h2><p id="viewer-file"></p></div>
        <span class="viewer-index">360<span>°</span></span>
      </header>
      <aside class="viewer-parts" aria-label="模型装配结构"><div>ASSEMBLY / 装配结构</div>${ol.map((i,s)=>`<p><span>${String(s+1).padStart(2,"0")}</span><strong>${i.label}</strong><small>${i.en}</small></p>`).join("")}</aside>
      <div class="viewer-loading" role="status"><span>正在载入模型…</span><button data-viewer="retry" hidden>重新载入 ↗</button></div>
      <footer class="viewer-footer">
        <div class="viewer-help"><span>拖动旋转</span><span>↑ ↓ ← → 平移</span><span>滚轮缩放</span></div>
        <div class="viewer-actions"><button data-viewer="explode" aria-pressed="false"><span>＋</span> 拆解档案</button><button data-viewer="assemble" aria-pressed="true"><span>−</span> 一键重组</button></div>
        <button class="viewer-reset" data-viewer="reset">复位视角 <span>↗</span></button>
      </footer>
      <div class="viewer-state" aria-live="polite">已组装</div>`,e.appendChild(this.root),this.canvasHost=this.root.querySelector(".viewer-canvas"),this.renderer=new uf({antialias:!0,powerPreference:"high-performance"}),this.renderer.toneMapping=Cr,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.tabIndex=0,this.renderer.domElement.setAttribute("aria-label","档案三维模型：拖动旋转，方向键平移，滚轮或加减键缩放，Home 复位"),this.canvasHost.appendChild(this.renderer.domElement),this.scene.background=new Ne("#eae5e1"),this.scene.fog=new Xa("#eae5e1",13.5,26.5),mf(this.renderer,this.scene),this.camera.position.copy(this.initialCamera),this.controls=new qE(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.085,this.controls.rotateSpeed=.65,this.controls.zoomSpeed=.7,this.controls.panSpeed=.7,this.controls.minDistance=5,this.controls.maxDistance=28,this.controls.maxTargetRadius=5,this.controls.screenSpacePanning=!0,this.controls.enabled=!1,this.controls.update(),this.root.addEventListener("click",i=>{if(this.closing)return;const s=i.target.closest("[data-viewer]")?.dataset.viewer;s==="close"&&this.close(),s==="retry"&&this.load(),!(this.loading||!this.source)&&(s==="explode"&&this.setExploded(!0),s==="assemble"&&this.setExploded(!1),s==="reset"&&this.resetView())}),this.root.addEventListener("keydown",i=>this.keydown(i))}open(e,t,i,s){this.isOpen||(this.isOpen=!0,this.closing=!1,this.reduced=s,this.provider=i,this.opener=document.activeElement,this.siblings=[...this.root.parentElement.children].filter(r=>r instanceof HTMLElement&&r!==this.root).map(r=>({node:r,inert:r.inert})),this.siblings.forEach(({node:r})=>r.inert=!0),this.root.hidden=!1,this.root.dataset.transition="opening",this.root.querySelector("#viewer-title").textContent=t,this.root.querySelector("#viewer-file").textContent="FILE "+e+" / INTERNAL DATABASE",this.spread={value:0,velocity:0},this.targetSpread=0,this.lastTime=0,this.root.dataset.exploded="false",this.resetView(),this.resize(),this.renderer.domElement.focus({preventScroll:!0}),this.enter(),this.load())}async load(){if(!this.provider||this.loading)return;const e=++this.request;this.loading=!0,this.controls.enabled=!1;const t=this.root.querySelector(".viewer-loading");t.hidden=!1,t.querySelector("span").textContent="正在载入模型…",t.querySelector("button").hidden=!0,this.setButtonsDisabled(!0);try{const i=await this.provider();if(!this.isOpen||this.closing||e!==this.request){i.dispose();return}this.source=i;for(const s of ol){const r=new On;r.name=s.id,this.groups.set(s.id,r)}for(const s of[...i.model.children])this.groups.get(s.userData.assemblyPart??"cover")?.add(s);for(const s of this.groups.values())i.model.add(s);i.model.position.set(0,-1.85,0),this.scene.add(i.model),this.loading=!1,t.hidden=!0,this.controls.enabled=!0,this.setButtonsDisabled(!1),this.setExploded(!1),this.setStatus("已组装"),this.update(this.lastTime),this.reduced||this.transitions.push(this.canvasHost.animate([{opacity:0,transform:"scale(0.97)"},{opacity:1,transform:"scale(1)"}],{duration:380,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}catch(i){if(!this.isOpen||this.closing||e!==this.request)return;this.loading=!1,t.querySelector("span").textContent="模型载入失败，请重试",t.querySelector("button").hidden=!1,console.error("Model viewer failed to load",i)}}enter(){const e=++this.transitionId;if(this.transitions.forEach(i=>i.cancel()),this.transitions=[],this.reduced){this.root.dataset.transition="open";return}const t=this.root.animate([{opacity:0},{opacity:1}],{duration:320,easing:"cubic-bezier(0.22, 1, 0.36, 1)"});this.transitions.push(t);for(const i of[".viewer-header",".viewer-footer",".viewer-state"]){const s=this.root.querySelector(i);this.transitions.push(s.animate([{opacity:0,translate:"0 10px"},{opacity:1,translate:"0 0"}],{duration:300,delay:60,fill:"backwards",easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}t.finished.then(()=>{e===this.transitionId&&(this.root.dataset.transition="open")}).catch(()=>{})}close(){if(!this.isOpen||this.closing)return;this.closing=!0,this.request++,this.loading=!1,this.controls.enabled=!1,this.setButtonsDisabled(!0);const e=++this.transitionId,t=getComputedStyle(this.root).opacity,i=getComputedStyle(this.canvasHost),s=i.opacity,r=i.transform;if(this.transitions.forEach(o=>o.cancel()),this.transitions=[],this.root.dataset.transition="closing",this.reduced){this.finishClose();return}const a=this.root.animate([{opacity:t},{opacity:0}],{duration:220,easing:"cubic-bezier(0.4, 0, 1, 1)",fill:"forwards"});this.transitions.push(a,this.canvasHost.animate([{transform:r,opacity:s},{transform:"scale(0.97)",opacity:0}],{duration:220,easing:"cubic-bezier(0.4, 0, 1, 1)",fill:"forwards"})),a.finished.then(()=>{e===this.transitionId&&this.finishClose()}).catch(()=>{})}finishClose(){this.isOpen=!1,this.closing=!1,this.root.hidden=!0,this.transitions.forEach(e=>e.cancel()),this.transitions=[],this.source&&(this.scene.remove(this.source.model),this.source.dispose(),this.source=void 0),this.groups.clear(),this.siblings.forEach(({node:e,inert:t})=>e.inert=t),this.siblings=[],this.opener?.focus({preventScroll:!0}),this.onClose()}setButtonsDisabled(e){for(const t of["explode","assemble","reset"])this.root.querySelector(`[data-viewer="${t}"]`).disabled=e}setExploded(e){this.targetSpread=e?1:0,this.root.dataset.exploded=String(e),this.root.querySelector('[data-viewer="explode"]').setAttribute("aria-pressed",String(e)),this.root.querySelector('[data-viewer="assemble"]').setAttribute("aria-pressed",String(!e)),this.setStatus(e?"正在拆解":this.spread.value>.001?"正在重组":"已组装"),this.reduced&&(this.spread={value:this.targetSpread,velocity:0})}setStatus(e){e!==this.status&&(this.status=e,this.root.querySelector(".viewer-state").textContent=e)}resetView(){this.controls.enabled=!1,this.controls.enableDamping=!1,this.controls.update(),this.controls.target.set(0,0,0),this.camera.position.copy(this.initialCamera),this.controls.enableDamping=!1,this.controls.update(),this.controls.enableDamping=!this.reduced,this.controls.enabled=this.isOpen&&!this.loading&&!!this.source}keydown(e){if(e.stopPropagation(),e.key==="Escape"){e.preventDefault(),this.close();return}if(this.closing){e.preventDefault();return}if(e.key==="Tab"){const t=[...this.root.querySelectorAll('button:not([disabled]):not([hidden]),canvas[tabindex="0"]')],i=t[0],s=t.at(-1);e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s?.focus()),!e.shiftKey&&document.activeElement===s&&(e.preventDefault(),i?.focus());return}if(!(!this.source||this.loading)){if(e.key==="Home"){e.preventDefault(),this.resetView();return}if(["+","=","-"].includes(e.key)){e.preventDefault();const t=this.camera.position.distanceTo(this.controls.target),i=$e.clamp(t*(e.key==="-"?1.12:1/1.12),5,28);this.camera.position.sub(this.controls.target).multiplyScalar(i/t).add(this.controls.target),this.controls.update();return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)){e.preventDefault();const t=new L().setFromMatrixColumn(this.camera.matrix,0),i=new L().setFromMatrixColumn(this.camera.matrix,1),s=new L,r=this.camera.position.distanceTo(this.controls.target)*.025;e.key==="ArrowLeft"&&s.addScaledVector(t,-r),e.key==="ArrowRight"&&s.addScaledVector(t,r),e.key==="ArrowUp"&&s.addScaledVector(i,r),e.key==="ArrowDown"&&s.addScaledVector(i,-r),this.camera.position.add(s),this.controls.target.add(s),this.controls.update()}}}resize(){if(!this.isOpen)return;const e=this.canvasHost.clientWidth,t=this.canvasHost.clientHeight;this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)*Math.min(innerWidth/1920,innerHeight/1080)),this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}update(e){if(!this.isOpen)return;const t=Math.min(this.lastTime?e-this.lastTime:1/60,.05);if(this.lastTime=e,this.source){Vi(this.spread,this.targetSpread,this.reduced?45:5.5,t),Math.abs(this.spread.value-this.targetSpread)<1e-4&&Math.abs(this.spread.velocity)<.001&&(this.spread={value:this.targetSpread,velocity:0},this.setStatus(this.targetSpread?"已拆解":"已组装"));for(const r of ol)this.groups.get(r.id).position.z=r.depth*this.spread.value}this.controls.update();const i=this.scene.fog,s=this.camera.position.length();i.near=Math.max(0,s-1),i.far=s+12,this.renderer.render(this.scene,this.camera),this.root.dataset.stats=JSON.stringify({ready:!!this.source,spread:this.spread.value,target:this.targetSpread,distance:this.camera.position.distanceTo(this.controls.target),targetPosition:this.controls.target.toArray(),azimuth:this.controls.getAzimuthalAngle(),polar:this.controls.getPolarAngle(),parts:[...this.groups].map(([r,a])=>({id:r,z:a.position.z,meshes:a.children.length}))})}}class o1{constructor(e){this.host=e,this.value=e.textContent??"",this.text=document.createElement("span"),this.text.textContent=this.value,e.replaceChildren(this.text),e.classList.add("scrub-title")}host;text;value;lastChange=-1/0;timer;animation;obscured=!1;update(e,t){if(!t){this.reset(),this.value=this.text.textContent=e,this.lastChange=-1/0;return}if(e===this.value)return;const i=performance.now(),s=i-this.lastChange<240;if(this.lastChange=i,this.value=e,clearTimeout(this.timer),!this.obscured&&!s){this.text.textContent=e;return}this.obscured||(this.host.style.width=`${Math.max(88,this.host.offsetWidth)}px`,this.obscured=!0,this.host.dataset.scrubbing="true",this.text.style.opacity="0",this.animation?.cancel(),this.animation=this.text.animate([{opacity:1},{opacity:.28,offset:.35},{opacity:1,offset:.7},{opacity:0}],{duration:140,easing:"steps(1, end)"})),this.text.textContent=e,this.timer=setTimeout(()=>this.reveal(),260)}reveal(){this.animation?.cancel(),this.obscured=!1,delete this.host.dataset.scrubbing,this.host.style.width="",this.text.style.opacity="",this.animation=this.host.animate([{opacity:.2},{opacity:1,offset:.35},{opacity:.5,offset:.6},{opacity:1}],{duration:180,easing:"steps(1, end)"})}reset(){clearTimeout(this.timer),this.animation?.cancel(),this.animation=void 0,this.obscured=!1,delete this.host.dataset.scrubbing,this.host.style.width="",this.text.style.opacity="",this.lastChange=-1/0}}const zt=(n,e,t)=>Math.max(0,Math.min(1,(n-e)/(t-e))),dr=n=>n*n*(3-2*n),_s=(n,e,t,i)=>n.slice(0,e<t?0:Math.min(n.length,1+Math.floor((e-t)*(n.length-1)/(i-t)))),bi=(n,e)=>e.includes(n),l1=[1,1,3,4,5,6,9,11,12,14,17,18,19,20,22,23,25,26];function c1(n){const e=n+5,t=Math.floor(e*25+1e-5),i=e<9.12?"access":e<11.12?"logo":e<19.48?"auth":e<22.76?"scan":"welcome";let s="";t<363?(s=_s("ID CONFIRMED",t,282,295),t>=320&&(s+=" : "+_s("JOYCE MOORE",t,321,339))):t<421?s=_s("REQUEST RECEIVED",t,367,389):(s=_s("START PROCESSING",t,423,440),t>=449&&(s+=".".repeat(Math.min(3,1+Math.floor((t-449)/4)))),bi(t,[479,485,486])&&(s="              SING..."));const r=248+652*Math.exp(-Math.max(0,e-20)*2.8),a=bi(t,[525,526,528,529]),o=[1,0,.28,0,1,0,0],l=t-569,c=dr(zt(e,26.56,26.92));return{t:e,f:t,step:i,auth:s,access:"ACCESS PERMISSION REQUIRED".slice(0,t<170?0:l1[Math.min(17,t-170)]),accessOpacity:t>=170&&t<227?t===226?.25:1:0,logoOpacity:e>=9.16&&e<19.48?bi(t,[461,471,475])?.55:1:0,logoLeft:1-Math.pow(1-zt(e,10.6,11.84),3),drawTop:dr(zt(e,9.16,9.4)),drawLeft:zt(e,9.36,9.64),drawRight:zt(e,9.58,10.04),logoLetters:_s("RHINE·LAB",t,232,255),plus:zt(e,9.88,10),minus:zt(e,10.08,10.24),plusAngle:90*dr(zt(e,10.24,10.72)),authOpacity:t>=281&&t<487?1:0,brand:[11.12,11.2,11.28].map(h=>zt(e,h,h+.2)),brandX:205*Math.pow(1-zt(e,11.12,11.84),3),poweredLetters:_s("POWERED BY RHINE LAB",t,279,295).length,scanVisible:e>=19.48&&e<22.76,scanRadius:r,ringScale:a?1.94:1,ringOpacity:a?.32:zt(e,19.68,19.96),scanTracking:31*(1-zt(e,19.48,20.44)),scanFont:22+14*(1-zt(e,19.48,20.44)),permissionOpacity:e<21.84?zt(e,19.48,19.88):bi(t,[547,550])?.05:0,ornament:e>=21.84,coreRadius:bi(t,[546,547,549,550])?42:5,welcomeVisible:e>=22.76&&e<26.92,welcomePanel:l>=0&&l<7?o[l]:0,welcomeInk:l>=0&&l<7?[0,0,.2,1,0,0,.25][l]:1,companyVisible:t>=588&&!bi(t,[590,591]),companyMask:bi(t,[594,595]),highlight:zt(e,23.52,24.04),databaseOpacity:t<626||bi(t,[628,629,631,634])?0:1,welcomeLogo:t>=588,welcomeScale:1-.46*c,welcomeOpacity:1-Math.pow(c,3),exitBlur:8*c,exit:c,backgroundOpacity:e<26.92?1:0,white:dr(zt(e,26.16,26.88))}}const Sd="http://www.w3.org/2000/svg",vs=(n,e,t,i=960,s=540)=>{const r=a=>`${i+Math.cos(a)*n},${s+Math.sin(a)*n}`;return`M${r(e)}A${n},${n} 0 ${t>Math.PI?1:0} 1 ${r(e+Math.min(t,Math.PI*1.999))}`};class h1{constructor(e){this.stage=e,[".access-text",".boot-logo",".auth-status","#auth-message",".scan",".scan > span",".welcome",".welcome-heading",".welcome-panel",".welcome-company",".welcome-highlight",".welcome-database",".welcome-logo",".brand",".powered","#boot-background",".boot-background svg",".boot-white"].forEach(r=>this.nodes.set(r,e.querySelector(r)));const t=e.querySelector(".boot-logo svg"),i=t.querySelector("path");this.strokes=OE.map(r=>{const a=i.cloneNode();return a.setAttribute("d",r),a.setAttribute("pathLength","1"),a.style.strokeDasharray="1",t.insertBefore(a,i),a}),i.remove();const s=t.querySelector("path:not([pathLength])");this.plus=document.createElementNS(Sd,"path"),this.plus.setAttribute("d","M44 70h50M69 45v50"),this.minus=document.createElementNS(Sd,"path"),this.minus.setAttribute("d","M219 70h44"),[this.plus,this.minus].forEach(r=>{r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","15"),t.insertBefore(r,s)}),s.remove(),this.letters=t.querySelector("text"),this.letters.setAttribute("text-anchor","start"),this.letters.setAttribute("x","20"),this.brandLines=Array.from(e.querySelector(".brand").children),this.scanPaths=Array.from(e.querySelectorAll(".scan path")),this.orbitDots=Array.from(e.querySelectorAll(".scan .orbit-dot")),this.core=e.querySelector(".scan .scan-core"),this.poweredHTML=this.el(".powered").innerHTML}stage;nodes=new Map;strokes;letters;plus;minus;brandLines;scanPaths;orbitDots;core;poweredHTML;el(e){return this.nodes.get(e)}opacity(e,t){this.el(e).style.opacity=String(Number(t))}update(e){const t=c1(e),i=t.t;return this.stage.dataset.bootFrame=String(t.f),this.el(".access-text").textContent=t.access,this.opacity(".access-text",t.accessOpacity),this.opacity(".boot-logo",t.logoOpacity),this.el(".boot-logo").style.transform=`translateX(${294*(1-t.logoLeft)}px)`,this.strokes.forEach((s,r)=>s.style.strokeDashoffset=String(1-[t.drawTop,t.drawLeft,t.drawRight][r])),this.letters.textContent=t.logoLetters,this.plus.style.opacity=String(t.plus),this.minus.style.opacity=String(t.minus),this.plus.setAttribute("transform",`rotate(${t.plusAngle} 69 70)`),this.opacity(".auth-status",t.authOpacity),this.el("#auth-message").textContent=t.auth,this.opacity(".brand",1),this.el(".brand").style.transform=`translateX(${t.brandX}px)`,this.brandLines.forEach((s,r)=>s.style.opacity=String(t.brand[r])),this.opacity(".powered",t.poweredLetters>0),this.el(".powered").style.clipPath=`inset(0 ${100*(1-t.poweredLetters/19)}% 0 0)`,this.opacity(".scan",t.scanVisible),t.scanVisible&&this.renderScan(t),this.opacity(".welcome",t.welcomeVisible?t.welcomeOpacity:0),this.el(".welcome").style.transform=`scale(${t.welcomeScale})`,this.el(".welcome").style.filter=`blur(${t.exitBlur}px) invert(${t.exit*.22}) sepia(${t.exit}) saturate(${1+t.exit*5}) hue-rotate(${t.exit*115}deg)`,this.opacity(".welcome-panel",t.welcomePanel),this.opacity(".welcome-heading",1),this.el(".welcome-heading").style.color=`rgb(${255*(1-t.welcomeInk)} ${255*(1-t.welcomeInk)} ${255*(1-t.welcomeInk)})`,this.opacity(".welcome-company",t.companyVisible),this.el(".welcome-company").style.visibility=t.companyMask?"hidden":"visible",this.el(".welcome-highlight").style.clipPath=`inset(0 ${100*(1-t.highlight)}% 0 0)`,this.opacity(".welcome-database",t.databaseOpacity),this.opacity(".welcome-logo",t.welcomeLogo),this.opacity("#boot-background",t.backgroundOpacity),this.opacity(".boot-white",t.white),this.el(".boot-background svg").style.transform=`translate(${Math.sin(i*.16)*18}px, ${-(i-6)*5}px) scale(1.08)`,t}renderScan(e){const t=e.t,i=dr(zt(t,19.76,21.8)),s=e.scanRadius,r=this.scanPaths[0].parentElement;r.setAttribute("transform",`translate(960 540) scale(${e.ringScale}) translate(-960 -540)`),r.style.opacity=String(e.ringOpacity);const a=-Math.PI/2+(1-i)*5;this.scanPaths[0].setAttribute("d",vs(s,a,Math.PI*(1.35+.64*i))),this.scanPaths[0].setAttribute("stroke-width",String(2.4*s/256)),this.scanPaths[1].setAttribute("d",vs(s*(.68+.23*i),-Math.PI/2-(1-i)*6,Math.PI*(1.15+.84*i))),this.scanPaths[1].setAttribute("stroke-width",String(3.6*s/256));const o=(t-19.64)*4;this.scanPaths[2].setAttribute("d",vs(92+28*(1-i),o,2.9)),this.scanPaths[3].setAttribute("d",vs(92+28*(1-i),o+Math.PI,1.8)),this.scanPaths[4].setAttribute("d",vs(38,-o,4.2,830,552)),this.scanPaths[5].setAttribute("d",vs(38,Math.PI-o,4.2,1090,528)),this.scanPaths.slice(4).forEach(c=>c.style.opacity=e.ornament?"1":"0"),this.core.style.opacity=e.ornament?"1":"0",this.core.setAttribute("r",String(e.coreRadius));const l=-Math.PI/2+(1-i)*7+.1*Math.sin(t*2);this.orbitDots.forEach((c,h)=>{c.setAttribute("cx",String(960+Math.cos(l+h*Math.PI)*(175+50*(1-i)))),c.setAttribute("cy",String(540+Math.sin(l+h*Math.PI)*(175+50*(1-i))))}),this.opacity(".scan > span",e.permissionOpacity),this.el(".scan > span").style.letterSpacing=`${e.scanTracking}px`,this.el(".scan > span").style.fontSize=`${e.scanFont}px`}reset(){[".brand",".powered"].forEach(e=>this.el(e).removeAttribute("style")),this.brandLines.forEach(e=>e.removeAttribute("style")),this.el(".powered").innerHTML=this.poweredHTML,this.opacity("#boot-background",0)}}class u1{enabled=!1;context;play(e="tick"){if(this.enabled)try{this.context??=new AudioContext;const t=this.context;t.state==="suspended"&&t.resume();const i=t.createOscillator(),s=t.createGain();i.type="sine";const r={tick:760,open:420,confirm:960,back:320}[e];i.frequency.setValueAtTime(r,t.currentTime),i.frequency.exponentialRampToValueAtTime(r*(e==="open"?1.8:.7),t.currentTime+.13),s.gain.setValueAtTime(1e-4,t.currentTime),s.gain.exponentialRampToValueAtTime(.035,t.currentTime+.008),s.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+.18),i.connect(s),s.connect(t.destination),i.start(),i.stop(t.currentTime+.2)}catch{}}}const de=n=>document.querySelector(n);de("#stage").innerHTML=`
  <div id="three-scene" class="three-scene"></div>
  <div class="scene-atmosphere"></div>
  <div id="boot-background" class="boot-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#fff" stroke-width="3"><path d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"/><path d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"/><circle cx="1450" cy="648" r="346"/><circle cx="1450" cy="648" r="348"/></g></svg></div>
  <header class="brand"><h1>RHINE LAB</h1><div>SYNTHESIZE INFORMATION</div><p>ANALYSIS <b>OS</b></p></header>
  <nav class="system-nav" aria-label="系统导航">
    <button data-action="search"><span class="nav-glyph">⌕</span> ARCHIVE INDEX <span class="key">/</span></button>
    <button data-action="saved" aria-label="查看收藏档案" title="收藏档案">＋ SAVED <span id="saved-count">00</span></button>
    <button data-action="settings" aria-label="系统设置" title="系统设置"><span class="settings-glyph">◷</span></button>
  </nav>
  <button id="skip" class="skip" data-action="skip">ENTER SYSTEM <span>↗</span></button>
  <section id="boot" class="boot" aria-label="系统启动">
    <div class="access-text">ACCESS</div>
    <div class="boot-logo">${rl}</div>
    <div class="auth-status"><span>▪</span> <span id="auth-message"></span><i></i></div>
    <div class="scan"><svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-width="2" stroke-linecap="round"><path/><path stroke="#fff"/><path/><path/><path/><path/><circle class="orbit-dot" r="8" fill="#ed821b" stroke="none"/><circle class="orbit-dot" r="8" fill="#ed821b" stroke="none"/><circle class="scan-core" cx="960" cy="540" r="5" fill="#080a08" stroke="none"/></g></svg><span>PERMISSION AUTHORIZED</span></div>
    <div class="welcome"><div class="welcome-panel"></div><div class="welcome-heading">WELCOME TO</div><div class="welcome-company"><strong>RHINE LAB.LLC.</strong><strong class="welcome-highlight" aria-hidden="true">RHINE LAB.LLC.</strong></div><div class="welcome-database">INTERNAL DATABASE</div><div class="welcome-logo">${rl}</div></div>
  </section>
  <div id="cinema-caption" class="cinema-caption"></div>
  <svg id="inspection-marks" viewBox="0 0 1920 1080" aria-hidden="true"><path id="inspection-lines"/><g id="inspection-corners"></g></svg>
  <div id="inspection-text" aria-hidden="true">CONFIDENTIALITY:<strong>GENERAL BUSINESS USE</strong></div>
  <section id="archive-ui" class="archive-ui" aria-label="档案选择">
    <div class="archive-callout"><div class="eyebrow">INTERNAL DATABASE <span>／</span> <span id="archive-category">机构档案</span></div><button class="file-title" data-action="open">FILE NUMBER: <span id="selected-id">X-<span id="selected-code">001</span></span><span class="file-open">↗</span></button><div class="callout-rule"><i></i></div><div class="file-summary"><span id="selected-title">莱茵生命</span><span id="selected-clearance">BUSINESS AREA</span></div><button class="read-file" data-action="open">ACCESS FILE <span>→</span></button></div>
    <div id="hover-label" class="hover-label" hidden>X-<span id="hover-code">001</span><span id="hover-title"></span></div>
    <div class="archive-counter"><span class="tiny-label">ARCHIVE / SELECT</span><div><span id="selected-number">01</span><i>/</i><span class="count-total">12</span></div></div>
    <div class="archive-navigation"><button data-action="prev" aria-label="上一个档案">↑</button><div id="file-ticks" class="file-ticks"></div><button data-action="next" aria-label="下一个档案">↓</button></div>
    <div class="column-navigation"><button data-action="column-prev" aria-label="上一列">←</button><div><span id="column-number">COLUMN <span id="column-index">03</span> / 05</span><strong id="column-name">机构档案</strong></div><button data-action="column-next" aria-label="下一列">→</button></div>
    <div class="archive-hint"><kbd>←</kbd> <kbd>→</kbd> 切换列 <span>／</span> <kbd>↑</kbd> <kbd>↓</kbd> 前后档案 <span>／</span> <kbd>ENTER</kbd> 读取</div>
  </section>
  <section id="detail-ui" class="detail-ui" aria-label="档案内容" hidden>
    <button class="back-button" data-action="back">← <span>ARCHIVE OVERVIEW</span><small>ESC</small></button>
    <div class="object-caption"><span id="object-id">NO.001</span><div>INTERNAL DATABASE</div><small>DRAG TO INSPECT <span>↔</span></small><button class="viewer-open" data-action="model-viewer">360° 查看文档模型 <span>↗</span></button></div>
    <article id="detail-content" class="detail-content"></article>
  </section>
  <div class="powered">POWERED BY <b>RHINE LAB</b><i></i></div>
  <footer class="system-footer"><span><i class="status-light"></i> SESSION AUTHORIZED</span><span>JOYCE MOORE <i>／</i> <span id="clock">00:00:00</span></span><button data-action="replay" title="重播启动流程">REINITIALIZE ↗</button></footer>
  <div id="modal-root"></div><div id="toast" class="toast" role="status"></div>
  <div id="loading" class="loading"><div class="loading-mark">${rl}</div><span>CONNECTING TO INTERNAL DATABASE</span><i></i></div>
`;de("#boot-background").insertAdjacentHTML("beforeend",'<div class="boot-white"></div>');const tp=new h1(de("#stage"));let dt="boot",bt=0,Rs=0,ka="",ji=!1,Rt=null,Cs="",Ds="全部档案",Oa="overview";const gc=new URLSearchParams(location.search);let eh=gc.get("freeze")==="1"?Number(gc.get("time")??0):null;gc.get("review")==="1"&&(de("#stage").dataset.review="true",window.addEventListener("message",n=>{if(n.origin!==location.origin||n.source!==window.parent||n.data?.type!=="rhine-review-frame")return;const e=Number(n.data.time);!Number.isFinite(e)||e<0||e>=35||(eh=e,ji&&dt!=="boot"&&Gt("boot"))}));let Ed,np=null;function ip(n,e){try{return JSON.parse(localStorage.getItem(n)??"null")??e}catch{return e}}const En=new Set(ip("rhine-saved",[])),xt=ip("rhine-settings",{sound:!1,reduced:matchMedia("(prefers-reduced-motion: reduce)").matches,quality:!0}),th={locales:"en-US",format:{minimumIntegerDigits:2,useGrouping:!1},duration:460,motionBlur:!0,animated:!xt.reduced},sp=Va(de("#selected-number"),{...th,value:1}),rp=Va(de("#column-index"),{...th,value:3}),ap={...th,format:{minimumIntegerDigits:3,useGrouping:!1},value:1},nh=new o1(de("#selected-title")),op=Va(de("#selected-code"),ap),lp=Va(de("#hover-code"),ap),tn=new u1;tn.enabled=xt.sound;let ut,Ws;const cp=[],hp=Ki.map((n,e)=>Zi(e)[0]);function d1(){cp.unshift({id:Ot[bt].id,time:new Date().toLocaleTimeString("en-GB")})}function up(){try{localStorage.setItem("rhine-settings",JSON.stringify(xt))}catch{}tn.enabled=xt.sound,xt.reduced&&nh.reset(),ut?.setReduced(xt.reduced),ut?.setQuality(xt.quality),sp.update({animated:!xt.reduced&&dt==="archive"}),rp.update({animated:!xt.reduced&&dt==="archive"}),op.update({animated:!xt.reduced&&dt==="archive"}),lp.update({animated:!xt.reduced&&dt==="archive"}),de("#stage").classList.toggle("reduce-motion",xt.reduced)}function dp(){const n=Math.min(innerWidth/1920,innerHeight/1080);de("#stage").style.transform=`translate(-50%, -50%) scale(${n})`,de("#viewport").style.setProperty("--scale",String(n)),ut?.resize(),Ws?.resize()}window.addEventListener("resize",dp);dp();de("#file-ticks").innerHTML=Ot.map((n,e)=>`<button data-select="${e}" aria-label="选择档案 ${n.id} ${n.title}" title="${n.id} · ${n.title}"></button>`).join("");function Gt(n){n!=="archive"&&nh.reset(),n==="detail"&&dt!=="detail"&&d1(),dt=n,de("#stage").dataset.mode=n,de("#boot").inert=n!=="boot",de("#boot").setAttribute("aria-hidden",String(n!=="boot")),de("#archive-ui").inert=n!=="archive",de("#archive-ui").setAttribute("aria-hidden",String(n!=="archive")),de(".system-nav").inert=n==="boot",de(".system-footer").inert=n==="boot",de("#detail-ui").hidden=n!=="detail",ut?.setMode(n==="boot"?"hidden":n),n!=="boot"&&(tp.reset(),de(".file-title").firstChild.textContent="FILE NUMBER: ",de("#stage").dataset.boot="done",de("#cinema-caption").textContent=""),n==="detail"&&fp()}function qi(n,e){bt=(n+Ot.length)%Ot.length,hp[Ri(bt).lane]=bt,dt==="detail"&&Gt("archive"),Oa="overview",ut?.select(bt,e),Qa(e),tn.play("tick")}function _c(n){const e=Zi(Ri(bt).lane);e.length<2||qi(e[(e.indexOf(bt)+n+e.length)%e.length],{axis:"row",direction:n})}function Ba(n){const e=Ri(bt).lane,t=mc(e+n,Ki.length);qi(hp[t],{axis:"lane",direction:n})}function Qa(n){const e=Ot[bt],{lane:t}=Ri(bt),i=Zi(t);nh.update(e.title,!xt.reduced&&dt==="archive"),de("#selected-clearance").textContent=e.clearance,de("#archive-category").textContent=e.category;const s=n&&"axis"in n?n.direction>0?"up":"down":"auto";op.update({value:Number(e.id.slice(2)),animated:!xt.reduced&&dt==="archive",direction:s}),sp.update({value:i.indexOf(bt)+1,animated:!xt.reduced&&dt==="archive",direction:n&&"axis"in n&&n.axis==="row"?s:"auto"}),de(".count-total").textContent=String(i.length).padStart(2,"0"),rp.update({value:t+1,animated:!xt.reduced&&dt==="archive",direction:n&&"axis"in n&&n.axis==="lane"?s:"auto"}),de("#column-name").textContent=Ki[t],de('[data-action="column-prev"]').disabled=!1,de('[data-action="column-next"]').disabled=!1,document.querySelectorAll("[data-select]").forEach(r=>{r.hidden=!i.includes(Number(r.dataset.select)),r.classList.toggle("selected",Number(r.dataset.select)===bt),r.setAttribute("aria-pressed",String(Number(r.dataset.select)===bt))}),de("#saved-count").textContent=String(En.size).padStart(2,"0"),dt==="detail"&&fp()}function za(){ji&&(Rr(),Gt("detail"),tn.play("open"),de("#detail-content").focus({preventScroll:!0}))}function f1(){const n=Ot[bt].id;En.has(n)?En.delete(n):En.add(n);try{localStorage.setItem("rhine-saved",JSON.stringify([...En]))}catch{}Qa(),de('[data-action="bookmark"]').focus({preventScroll:!0}),tn.play("confirm"),mp(En.has(n)?"档案已加入收藏":"已取消收藏")}function fp(){const n=Ot[bt];de("#object-id").textContent="NO."+String(bt+1).padStart(3,"0");const e=n.image?`<img class="detail-cover" src="${n.image}" alt="${n.title} 题图" loading="lazy">`:"",t=n.source?`<a href="${n.source}" target="_blank" rel="noopener">原文链接 ↗</a>`:"";de("#detail-content").innerHTML=`
  <div class="detail-kicker"><span>${n.id}</span><span>${n.clearance}</span></div>
  ${e}
  <h2>${n.title}</h2>
  <div class="detail-title-cn">${n.category}<span>${n.date}</span></div>
  <div class="detail-rule"></div>
  <dl class="metadata"><div><dt>DATE / 日期</dt><dd>${n.date}</dd></div><div><dt>CATEGORY / 分类</dt><dd>${n.category}</dd></div><div><dt>AUTHOR / 作者</dt><dd>${n.lead}</dd></div></dl>
  <div class="detail-body">${n.body??`<p>${n.abstract}</p>`}</div>
  <div class="detail-actions"><button class="solid-button" data-action="bookmark">${En.has(n.id)?"− 取消收藏":"＋ 收藏文章"}<span>${En.has(n.id)?"已收藏":"收藏"}</span></button><a class="export-button" href="/archives/RHINE-LAB-${n.id}.txt" download="RHINE-LAB-${n.id}.txt" aria-label="导出 ${n.id}">EXPORT <span>↓</span></a></div>
  <div class="detail-footnote">${t}<span>${String(bt+1).padStart(3,"0")} / ${String(Ot.length).padStart(3,"0")}</span></div>`,de("#detail-content").setAttribute("tabindex","-1")}function p1(){return`<div class="panel-label">ABSTRACT / 摘要</div><p>${Ot[bt].abstract}</p>`}function pp(n,e=!0){Oa=n,document.querySelectorAll("[data-tab]").forEach(i=>{const s=i.dataset.tab===n;i.classList.toggle("active",s),i.setAttribute("aria-selected",String(s)),i.setAttribute("tabindex",s?"0":"-1")});const t=Ot[bt];de("#tab-panel").innerHTML=n==="overview"?p1():n==="notes"?`<div class="panel-label">RESEARCH NOTES / 研究记录</div><ol class="research-notes">${t.findings.map((i,s)=>`<li><span>${String(s+1).padStart(2,"0")}</span>${i}</li>`).join("")}</ol>`:`<div class="panel-label">ACCESS LOG / 本次访问</div>${cp.filter(i=>i.id===t.id).slice(0,4).map(i=>`<div class="log-row"><span>${i.time}</span><span>JOYCE MOORE</span><b>READ AUTHORIZED</b></div>`).join("")}<p class="log-note">本次会话已通过身份验证。档案内容以当前终端可访问范围展示。</p>`,e&&tn.play("tick")}function mp(n){clearTimeout(Ed),de("#toast").textContent=n,de("#toast").classList.add("visible"),Ed=setTimeout(()=>de("#toast").classList.remove("visible"),2600)}function gp(n){ji&&(np=document.activeElement,Rt=n,Cs="",Ds="全部档案",tn.play("open"),_p())}function Rr(){Rt&&(Rt=null,de("#modal-root").innerHTML="",np?.focus({preventScroll:!0}))}function _p(){Rt&&(de("#modal-root").innerHTML=`<div class="modal-backdrop"><section class="terminal-modal ${Rt==="settings"?"settings-modal":""}" role="dialog" aria-modal="true" aria-label="${Rt==="settings"?"系统设置":Rt==="saved"?"收藏档案":"档案检索"}"><div class="modal-top"><span>RHINE LAB / ${Rt==="settings"?"SYSTEM PREFERENCES":"ARCHIVE DIRECTORY"}</span><button data-action="close-modal" aria-label="关闭窗口">CLOSE <span>×</span></button></div>${Rt==="settings"?m1():`<h2>${Rt==="saved"?"SAVED ARCHIVES":"ARCHIVE INDEX"}<small>${Rt==="saved"?"收藏档案":"内部档案检索"}</small></h2><div class="search-field"><span>⌕</span><input id="archive-search" type="search" autocomplete="off" placeholder="输入文章标题、编号或分类" aria-label="检索文章"/><span class="key">ESC</span></div><div class="category-filters">${NE.map((n,e)=>`<button data-filter="${n}" class="${e===0?"active":""}">${n}</button>`).join("")}</div><div class="result-header"><span>FILE / 档案</span><span>DEPARTMENT / 科室</span><span>ACCESS</span></div><div id="search-results" class="search-results"></div><div class="modal-bottom"><span id="result-count"></span><span>INTERNAL DATABASE <i>●</i> CONNECTED</span></div>`}</section></div>`,Rt!=="settings"?(ih(),requestAnimationFrame(()=>de("#archive-search").focus())):requestAnimationFrame(()=>de('[data-action="close-modal"]').focus()),de("#modal-root").querySelector(".modal-backdrop")?.addEventListener("click",n=>{n.target===n.currentTarget&&Rr()}))}function ih(){const n=Ot.map((e,t)=>({r:e,i:t})).filter(({r:e})=>(Rt!=="saved"||En.has(e.id))&&(Ds==="全部文章"||e.category===Ds)&&`${e.id} ${e.title} ${e.en} ${e.department} ${e.lead}`.toLowerCase().includes(Cs.toLowerCase()));de("#search-results").innerHTML=n.length?n.map(({r:e,i:t})=>`<button class="result-row" data-result="${t}"><span class="result-name"><b>${e.id}</b><span>${e.title}<small>${e.en}</small></span>${En.has(e.id)?"<i>＋</i>":""}</span><span>${e.department}</span><span>${e.clearance==="RESTRICTED"?"CATALOG ONLY":"AUTHORIZED"} <i>↗</i></span></button>`).join(""):`<div class="empty-results"><span>∅</span><strong>${Rt==="saved"&&!Cs?"尚无收藏档案":"没有匹配的档案"}</strong><p>${Rt==="saved"&&!Cs?"读取档案时，选择 SAVE ARCHIVE 将其保存在此处。":"尝试其他名称、档案编号，或切换科室分类。"}</p><button data-action="reset-search">${Rt==="saved"?"查看全部档案 →":"重置检索 →"}</button></div>`,de("#result-count").textContent=`${String(n.length).padStart(2,"0")} RECORDS FOUND`}function m1(){return`<h2>SYSTEM SETTINGS<small>终端偏好设置</small></h2><p class="settings-intro">JOYCE MOORE <span>·</span> SESSION AUTHORIZED</p><div class="settings-list"><label><div><strong>INTERFACE SOUND</strong><span>界面反馈音</span></div><input type="checkbox" data-pref="sound" ${xt.sound?"checked":""}/><i class="toggle"></i></label><label><div><strong>REDUCED MOTION</strong><span>减少镜头移动和过渡动效</span></div><input type="checkbox" data-pref="reduced" ${xt.reduced?"checked":""}/><i class="toggle"></i></label><label><div><strong>HIGH QUALITY RENDERING</strong><span>环境遮蔽与高分辨率渲染</span></div><input type="checkbox" data-pref="quality" ${xt.quality?"checked":""}/><i class="toggle"></i></label></div><div class="settings-shortcuts"><span>KEYBOARD CONTROLS</span><p><kbd>←</kbd><kbd>→</kbd> 切列 <kbd>↑</kbd><kbd>↓</kbd> 选档 <kbd>ENTER</kbd> 读取 <kbd>/</kbd> 检索 <kbd>ESC</kbd> 返回</p></div><div class="settings-bottom"><button data-action="fullscreen">FULLSCREEN <span>↗</span></button><button data-action="restart">REINITIALIZE SYSTEM <span>↻</span></button></div><div class="modal-bottom"><span>ANALYSIS OS / 1.0 · 使用 MiSans 字体（小米） <a href="/fonts/MiSans-license.pdf" target="_blank" rel="noopener">字体许可</a></span><span>POWERED BY RHINE LAB</span></div>`}document.addEventListener("input",n=>{n.target.id==="archive-search"&&(Cs=n.target.value,ih())});document.addEventListener("change",n=>{const e=n.target;e.dataset.pref&&(xt[e.dataset.pref]=e.checked,up(),tn.play("confirm"))});document.addEventListener("click",n=>{const e=n.target.closest("button");if(!e)return;if(e.dataset.select){qi(Number(e.dataset.select));return}if(e.dataset.result){qi(Number(e.dataset.result)),za();return}if(e.dataset.filter){Ds=e.dataset.filter,document.querySelectorAll("[data-filter]").forEach(i=>i.classList.toggle("active",i.dataset.filter===Ds)),ih();return}if(e.dataset.tab){pp(e.dataset.tab);return}const t=e.dataset.action;t==="skip"&&(Gt("archive"),tn.play("confirm")),t==="prev"&&_c(-1),t==="next"&&_c(1),t==="column-prev"&&Ba(-1),t==="column-next"&&Ba(1),t==="open"&&za(),t==="model-viewer"&&dt==="detail"&&(Ws??=new a1(de("#stage"),()=>tn.play("back")),Ws.open(Ot[bt].id,Ot[bt].title,()=>ut.createAssemblyModel(),xt.reduced),tn.play("open")),t==="back"&&(Gt("archive"),tn.play("back")),(t==="search"||t==="saved"||t==="settings")&&gp(t),t==="close-modal"&&Rr(),t==="bookmark"&&f1(),t==="reset-search"&&(Rt="search",Cs="",Ds="全部档案",_p()),(t==="replay"||t==="restart")&&(Rr(),Rs=performance.now()/1e3-1.76,eh=null,ka="",Gt(xt.reduced?"archive":"boot"),ut.select(0),bt=0,Qa(),tn.play("back")),t==="fullscreen"&&(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>mp("请使用浏览器的全屏快捷键 F11")))});document.addEventListener("keydown",n=>{if(Ws?.isOpen)return;const e=n.target instanceof HTMLInputElement;if(n.key==="Escape"){Rt?Rr():(dt==="detail"||dt==="boot"&&ji)&&Gt("archive");return}if(Rt&&n.key==="Tab"){const t=[...de("#modal-root").querySelectorAll('button,input,[tabindex="0"]')],i=t[0],s=t.at(-1);n.shiftKey&&document.activeElement===i?(n.preventDefault(),s?.focus()):!n.shiftKey&&document.activeElement===s&&(n.preventDefault(),i?.focus());return}if(!(e||Rt||!ji)){if(n.target.dataset.tab&&["ArrowLeft","ArrowRight"].includes(n.key)){n.preventDefault();const t=["overview","notes","history"];pp(t[(t.indexOf(Oa)+(n.key==="ArrowRight"?1:2))%3]),de(`[data-tab="${Oa}"]`).focus();return}n.key==="/"&&(n.preventDefault(),dt==="boot"&&Gt("archive"),gp("search")),n.key==="ArrowLeft"&&dt!=="boot"&&(n.preventDefault(),Ba(-1)),n.key==="ArrowRight"&&dt!=="boot"&&(n.preventDefault(),Ba(1)),["ArrowUp","ArrowDown"].includes(n.key)&&dt!=="boot"&&(n.preventDefault(),_c(n.key==="ArrowUp"?-1:1)),n.key==="Enter"&&(document.activeElement===document.body||document.activeElement?.id==="detail-content"||["prev","next","column-prev","column-next"].includes(document.activeElement?.dataset.action??"")||document.activeElement?.dataset.select)&&(n.preventDefault(),dt==="boot"?Gt("archive"):dt==="archive"&&za())}});const Nn=n=>(n=Math.max(0,Math.min(1,n)),n*n*(3-2*n));function g1(n){const e=tp.update(n);let t=e.step,i=e.step==="auth"?n<9.52?"身份信息确认：JOYCE MOORE":n<11.84?"请求已接收":"开始处理":e.step==="scan"?"权限验证通过":e.step==="welcome"?"欢迎访问莱茵生命内部资料档案":"";n>=22&&(t="array",i="选择档案"),n>=25.68&&(t="select",i="编号：X-001"),n>=28.3&&(t="inspect",i=n>=29.3?"保密级别：商业区":"编号：X-001"),t!==ka&&(de("#stage").dataset.boot=t,ka=t,["auth","scan","select"].includes(t)&&tn.play(t==="scan"?"confirm":"tick")),de("#cinema-caption").textContent=i,de(".file-title").firstChild.textContent=t==="array"?"SELECTING FILES...".slice(0,Math.max(0,Math.floor((n-21.94)*18))):"FILE NUMBER: ",de("#stage").style.setProperty("--entry-opacity",String(Nn((n-21.9)/.13))),de(".callout-rule").style.transform=`scaleX(${Nn((n-22.08)/.9)})`;const s=Nn((n-22)/.4),r=Nn((n-26)/1.8),a=.55*Nn((n-27.3)/1.65)+.45*Nn((n-29)/5);if(n>=35){Gt("detail");return}return{reveal:s,lift:r,zoom:a,time:n}}let Td=0,ll=0,cl=performance.now(),vc=0;function vp(n){const e=n/1e3,t=dt==="boot"&&ji?g1(eh??e-Rs):void 0;Ws?.isOpen||ut?.update(e,t),Ws?.update(e),ut&&dt==="detail"&&(de("#detail-content").style.opacity=String(ut.detailVisibility),de("#detail-content").style.transform=`translateY(${(1-ut.detailVisibility)*18}px)`,de("#detail-content").inert=ut.detailVisibility<.1);const i=t?.time??-1,s=Nn((i-29.15)/.35)*(1-Nn((i-31.4)/.5));if(de("#inspection-marks").style.opacity=String(s),de("#inspection-text").style.opacity=String(s),de("#inspection-text strong").style.opacity=String(Nn((i-30.25)/.5)),ut&&s>0){const r=[[-2.05,3.04],[2.05,3.04],[-2.05,.35],[2.05,.35]].map(([h,u])=>ut.projectCard(h,u));de("#inspection-corners").innerHTML=r.map(([h,u])=>`<rect x="${h-4}" y="${u-4}" width="8" height="8"/>`).join("");const a=ut.projectCard(-1.88,.5),o=ut.projectCard(-.36,1.7),l=ut.projectCard(.36,2.04),c=ut.projectCard(1.9,2.9);de("#inspection-lines").setAttribute("d",`M${a}L${o}M${l}L${c}`)}if(ut&&i>32.5){const[r,a]=ut.projectCard(.15,1.9);de("#inspection-marks").style.opacity=String(Nn((i-32.5)/.5)),de("#inspection-corners").innerHTML="",de("#inspection-lines").setAttribute("d",`M${r-2},${a}h4M${r},${a-2}v4`)}Math.floor(e)!==Td&&(Td=Math.floor(e),de("#clock").textContent=new Date().toLocaleTimeString("en-GB")),ll++,n-cl>1e3&&(vc=ll*1e3/(n-cl),cl=n,ll=0,de("#three-scene").dataset.fps=String(Math.round(vc)),de("#three-scene").dataset.renderStats=JSON.stringify(ut?.getStats())),requestAnimationFrame(vp)}async function _1(){try{ut=new XE(de("#three-scene")),await Promise.all([ut.load(),document.fonts.load("400 20px MiSans"),document.fonts.load("700 20px MiSans")]),ut.select(bt),ut.onSelect=(e,t)=>{dt!=="boot"&&qi(e,t?{cell:t}:void 0)},ut.onHover=e=>{const t=de("#hover-label");if(e===null){t.hidden=!0;return}lp.update({value:Number(Ot[e].id.slice(2)),animated:!t.hidden&&!xt.reduced&&dt==="archive"}),de("#hover-title").textContent=" / "+Ot[e].title,t.hidden=!1},up(),ji=!0,Rs=performance.now()/1e3,Gt("boot"),qi(0),de("#loading").classList.add("loaded"),setTimeout(()=>de("#loading").remove(),600);const n=new URLSearchParams(location.search);n.get("scene")==="archive"&&Gt("archive"),n.get("scene")==="detail"&&Gt("detail"),Rs-=n.has("time")?Number(n.get("time")):1.76,n.has("time")||(Rs+=.6),xt.reduced&&!n.has("time")&&Gt("archive"),requestAnimationFrame(vp)}catch(n){console.error(n),de("#loading").innerHTML='<div class="error-state"><strong>CONNECTION INTERRUPTED</strong><p>三维档案资源未能载入。请确认浏览器已启用硬件加速，然后重新连接。</p><button onclick="location.reload()">RECONNECT →</button></div>'}}Qa();_1();Object.assign(window,{rhine:{seek:n=>{Gt("boot"),Rs=performance.now()/1e3-n,ka=""},archive:()=>Gt("archive"),detail:()=>za(),select:n=>qi(n),stats:()=>({...ut?.getStats(),fps:Math.round(vc),mode:dt,selected:Ot[bt].id,saved:[...En]})}});
