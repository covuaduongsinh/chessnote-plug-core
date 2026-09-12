var sn=Object.defineProperty;var wt=(r,t)=>{for(var e in t)sn(r,e,{get:t[e],enumerable:!0})};function Tt(r){let t=atob(r),e=t.length,n=new Uint8Array(e);for(let s=0;s<e;s++)n[s]=t.charCodeAt(s);return n}function Fe(r){typeof r=="string"&&(r=new TextEncoder().encode(r));let t="",e=r.byteLength;for(let n=0;n<e;n++)t+=String.fromCharCode(r[n]);return btoa(t)}var Qs=new Uint8Array(16);var Oe=class{constructor(t="",e=1e3){this.prefix=t;this.maxCaptureSize=e;this.prefix=t,this.originalConsole={log:console.log.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),debug:console.debug.bind(console)},this.patchConsole()}originalConsole;logBuffer=[];patchConsole(){let t=e=>(...n)=>{let s=this.prefix?[this.prefix,...n]:n;this.originalConsole[e](...s),this.captureLog(e,n)};console.log=t("log"),console.info=t("info"),console.warn=t("warn"),console.error=t("error"),console.debug=t("debug")}captureLog(t,e){let n={level:t,timestamp:Date.now(),message:e.map(s=>{if(typeof s=="string")return s;try{return JSON.stringify(s)}catch{return String(s)}}).join(" ")};this.logBuffer.push(n),this.logBuffer.length>this.maxCaptureSize&&this.logBuffer.shift()}async postToServer(t,e){if(this.logBuffer.length>0){let s=[...this.logBuffer];this.logBuffer=[];try{if(!(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s.map(a=>({...a,source:e})))})).ok)throw new Error("Failed to post logs to server")}catch(i){console.warn("Could not post logs to server",i.message),this.logBuffer.unshift(...s)}}}},Ct;function kt(r=""){return Ct=new Oe(r),Ct}var ge=r=>{throw new Error("Not initialized yet")},Ke=typeof window>"u"&&typeof globalThis.WebSocketPair>"u",De=new Map,Ne=0;Ke&&(globalThis.syscall=async(r,...t)=>await new Promise((e,n)=>{Ne++,De.set(Ne,{resolve:e,reject:n}),ge({type:"sys",id:Ne,name:r,args:t})}));function Bt(r,t,e){Ke&&(ge=e,self.addEventListener("message",n=>{(async()=>{let s=n.data;switch(s.type){case"inv":{let i=r[s.name];if(!i)throw new Error(`Function not loaded: ${s.name}`);try{let a=await Promise.resolve(i(...s.args||[]));ge({type:"invr",id:s.id,result:a})}catch(a){console.error("An exception was thrown as a result of invoking function",s.name,"error:",a.message),ge({type:"invr",id:s.id,error:a.message})}}break;case"sysr":{let i=s.id,a=De.get(i);if(!a)throw Error("Invalid request id");De.delete(i),s.error?a.reject(new Error(s.error)):a.resolve(s.result)}break}})().catch(console.error)}),ge({type:"manifest",manifest:t}),kt(`[${t.name} plug]`))}async function on(r,t){if(typeof r!="string"){let e=new Uint8Array(await r.arrayBuffer()),n=e.length>0?Fe(e):void 0;t={method:r.method,headers:Object.fromEntries(r.headers.entries()),base64Body:n},r=r.url}return syscall("sandboxFetch.fetch",r,t)}globalThis.nativeFetch=globalThis.fetch;function an(){globalThis.fetch=async(r,t)=>{let e=t?.body?Fe(new Uint8Array(await new Response(t.body).arrayBuffer())):void 0,n=await on(r,t&&{method:t.method,headers:t.headers,base64Body:e});return new Response(n.base64Body?Tt(n.base64Body):null,{status:n.status,headers:n.headers})}}Ke&&an();function At(r,t){return ln(r,e=>e.type===t)}function $t(r,t,e){if(t(r)){e.push(r);return}if(r.children)for(let n of r.children)$t(n,t,e)}function ln(r,t){let e=[];return $t(r,t,e),e}function Ee(r,t){if(r.type===t)return r;if(r.children)for(let e of r.children){let n=Ee(e,t);if(n)return n}return null}function Se(r){if(!r)return"";if(r.text!==void 0)return r.text;let t=r.children;if(t.length===1)return Se(t[0]);let e="";for(let n of t)e+=Se(n);return e}typeof globalThis.syscall>"u"&&(globalThis.syscall=()=>{throw new Error("Not implemented here")});function g(r,...t){return globalThis.syscall(r,...t)}var Pe={};wt(Pe,{aspiringPages:()=>Mn,clearFileIndex:()=>On,deleteObject:()=>Nn,describeSchema:()=>Kn,documents:()=>En,ensureFullIndex:()=>In,getObjectByRef:()=>Rn,headers:()=>Cn,indexObjects:()=>vn,isAvailable:()=>$n,items:()=>kn,links:()=>Pn,objects:()=>xn,pages:()=>_n,paragraphs:()=>Bn,previewProcessedObjects:()=>yn,queryLuaObjects:()=>qn,reindexSpace:()=>Fn,relations:()=>wn,resolveAnchor:()=>Dn,subPages:()=>Sn,tables:()=>An,tagSchema:()=>Un,tags:()=>Ln,tasks:()=>Tn,validateObjects:()=>bn});function vn(r,t){return g("index.indexObjects",r,t)}function bn(r,t){return g("index.validateObjects",r,t)}function yn(r,t){return g("index.previewProcessedObjects",r,t)}function xn(r){return g("index.objects",r)}function _n(r){return g("index.pages",r)}function Sn(r){return g("index.subPages",r)}function En(){return g("index.documents")}function Pn(){return g("index.links")}function wn(r){return g("index.relations",r)}function Tn(r){return g("index.tasks",r)}function Cn(r){return g("index.headers",r)}function kn(r){return g("index.items",r)}function Bn(r){return g("index.paragraphs",r)}function An(r){return g("index.tables",r)}function $n(){return g("index.isAvailable")}function Mn(){return g("index.aspiringPages")}function Ln(){return g("index.tags")}function qn(r,t,e){return g("index.queryLuaObjects",r,t,e)}function Rn(r,t,e){return g("index.getObjectByRef",r,t,e)}function In(){return g("index.ensureFullIndex")}function Fn(){return g("index.reindexSpace")}function On(r){return g("index.clearFileIndex",r)}function Nn(r,t,e){return g("index.deleteObject",r,t,e)}function Dn(r,t){return g("index.resolveAnchor",r,t)}function Kn(){return g("index.describeSchema")}function Un(r){return g("index.tagSchema",r)}var we={};wt(we,{cleanDatabases:()=>bs,getBaseURI:()=>us,getConfig:()=>ms,getMode:()=>ls,getProfile:()=>fs,getURLPrefix:()=>cs,getVersion:()=>ds,hasServerProxy:()=>hs,invokeCommand:()=>Zn,invokeFunction:()=>Xn,isCapacitor:()=>ps,listAccounts:()=>gs,listCommands:()=>es,listPaletteCommands:()=>ts,listSyscalls:()=>ns,loadPlug:()=>os,reboot:()=>is,reloadPlugs:()=>ss,runPaletteCommand:()=>rs,unloadPlug:()=>as,wipeClient:()=>vs});function Xn(r,...t){return g("system.invokeFunction",r,...t)}function Zn(r,t){return g("system.invokeCommand",r,t)}function es(){return g("system.listCommands")}function ts(){return g("system.listPaletteCommands")}function rs(r){return g("system.runPaletteCommand",r)}function ns(){return g("system.listSyscalls")}function ss(){return g("system.reloadPlugs")}function is(){return g("system.reboot")}function os(r){return g("system.loadPlug",r)}function as(r){return g("system.unloadPlug",r)}function ls(){return g("system.getMode")}function cs(){return g("system.getURLPrefix")}function us(){return g("system.getBaseURI")}function ds(){return g("system.getVersion")}function ps(){return g("system.isCapacitor")}function hs(){return g("system.hasServerProxy")}function fs(){return g("system.getProfile")}function gs(){return g("system.listAccounts")}function ms(r,t=void 0){return g("system.getConfig",r,t)}function vs(r=!1){return g("system.wipeClient",r)}function bs(){return g("system.cleanDatabases")}function ys(r){return r!==null?{comment:r,variations:[]}:{variations:[]}}function xs(r,t,e,n,s){let i={move:r,variations:s};return t&&(i.suffix=t),e&&(i.nag=e),n!==null&&(i.comment=n),i}function _s(...r){let[t,...e]=r,n=t;for(let s of e)s!==null&&(n.variations=[s,...s.variations],s.variations=[],n=s);return t}function Ss(r,t){if(t.marker&&t.marker.comment){let e=t.root;for(;;){let n=e.variations[0];if(!n){e.comment=t.marker.comment;break}e=n}}return{headers:r,root:t.root,result:(t.marker&&t.marker.result)??void 0}}function Es(r,t){function e(){this.constructor=r}e.prototype=t.prototype,r.prototype=new e}function ce(r,t,e,n){var s=Error.call(this,r);return Object.setPrototypeOf&&Object.setPrototypeOf(s,ce.prototype),s.expected=t,s.found=e,s.location=n,s.name="SyntaxError",s}Es(ce,Error);function Ue(r,t,e){return e=e||" ",r.length>t?r:(t-=r.length,e+=e.repeat(t),r+e.slice(0,t))}ce.prototype.format=function(r){var t="Error: "+this.message;if(this.location){var e=null,n;for(n=0;n<r.length;n++)if(r[n].source===this.location.source){e=r[n].text.split(/\r\n|\n|\r/g);break}var s=this.location.start,i=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(s):s,a=this.location.source+":"+i.line+":"+i.column;if(e){var c=this.location.end,p=Ue("",i.line.toString().length," "),h=e[s.line-1],b=s.line===c.line?c.column:h.length+1,P=b-s.column||1;t+=`
 --> `+a+`
`+p+` |
`+i.line+" | "+h+`
`+p+" | "+Ue("",s.column-1," ")+Ue("",P,"^")}else t+=`
 at `+a}return t};ce.buildMessage=function(r,t){var e={literal:function(h){return'"'+s(h.text)+'"'},class:function(h){var b=h.parts.map(function(P){return Array.isArray(P)?i(P[0])+"-"+i(P[1]):i(P)});return"["+(h.inverted?"^":"")+b.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(h){return h.description}};function n(h){return h.charCodeAt(0).toString(16).toUpperCase()}function s(h){return h.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(b){return"\\x0"+n(b)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(b){return"\\x"+n(b)})}function i(h){return h.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(b){return"\\x0"+n(b)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(b){return"\\x"+n(b)})}function a(h){return e[h.type](h)}function c(h){var b=h.map(a),P,m;if(b.sort(),b.length>0){for(P=1,m=1;P<b.length;P++)b[P-1]!==b[P]&&(b[m]=b[P],m++);b.length=m}switch(b.length){case 1:return b[0];case 2:return b[0]+" or "+b[1];default:return b.slice(0,-1).join(", ")+", or "+b[b.length-1]}}function p(h){return h?'"'+s(h)+'"':"end of input"}return"Expected "+c(r)+" but "+p(t)+" found."};function Ps(r,t){t=t!==void 0?t:{};var e={},n=t.grammarSource,s={pgn:yt},i=yt,a="[",c='"',p="]",h=".",b="O-O-O",P="O-O",m="0-0-0",y="0-0",C="$",B="{",M="}",G=";",_="(",J=")",k="1-0",X="0-1",D="1/2-1/2",L="*",f=/^[a-zA-Z]/,$=/^[^"]/,Y=/^[0-9]/,ie=/^[.]/,oe=/^[a-zA-Z1-8\-=]/,Q=/^[+#]/,it=/^[!?]/,ot=/^[^}]/,at=/^[^\r\n]/,lt=/^[ \t\r\n]/,ir=j("tag pair"),or=F("[",!1),ct=F('"',!1),ar=F("]",!1),lr=j("tag name"),Re=V([["a","z"],["A","Z"]],!1,!1),cr=j("tag value"),ut=V(['"'],!0,!1),ur=j("move number"),ye=V([["0","9"]],!1,!1),dr=F(".",!1),dt=V(["."],!1,!1),pr=j("standard algebraic notation"),hr=F("O-O-O",!1),fr=F("O-O",!1),gr=F("0-0-0",!1),mr=F("0-0",!1),pt=V([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),vr=V(["+","#"],!1,!1),br=j("suffix annotation"),ht=V(["!","?"],!1,!1),yr=j("NAG"),xr=F("$",!1),_r=j("brace comment"),Sr=F("{",!1),ft=V(["}"],!0,!1),Er=F("}",!1),Pr=j("rest of line comment"),wr=F(";",!1),gt=V(["\r",`
`],!0,!1),Tr=j("variation"),Cr=F("(",!1),kr=F(")",!1),Br=j("game termination marker"),Ar=F("1-0",!1),$r=F("0-1",!1),Mr=F("1/2-1/2",!1),Lr=F("*",!1),qr=j("whitespace"),mt=V([" ","	","\r",`
`],!1,!1),Rr=function(o,u){return Ss(o,u)},Ir=function(o){return Object.fromEntries(o)},Fr=function(o,u){return[o,u]},Or=function(o,u){return{root:o,marker:u}},Nr=function(o,u){return _s(ys(o),...u.flat())},Dr=function(o,u,d,S,E){return xs(o,u,d,S,E)},Kr=function(o){return o},Ur=function(o){return o.replace(/[\r\n]+/g," ")},Gr=function(o){return o.trim()},zr=function(o){return o},Hr=function(o,u){return{result:o,comment:u}},l=t.peg$currPos|0,ae=[{line:1,column:1}],W=l,xe=t.peg$maxFailExpected||[],v=t.peg$silentFails|0,fe;if(t.startRule){if(!(t.startRule in s))throw new Error(`Can't start parsing from rule "`+t.startRule+'".');i=s[t.startRule]}function F(o,u){return{type:"literal",text:o,ignoreCase:u}}function V(o,u,d){return{type:"class",parts:o,inverted:u,ignoreCase:d}}function jr(){return{type:"end"}}function j(o){return{type:"other",description:o}}function vt(o){var u=ae[o],d;if(u)return u;if(o>=ae.length)d=ae.length-1;else for(d=o;!ae[--d];);for(u=ae[d],u={line:u.line,column:u.column};d<o;)r.charCodeAt(d)===10?(u.line++,u.column=1):u.column++,d++;return ae[o]=u,u}function bt(o,u,d){var S=vt(o),E=vt(u),A={source:n,start:{offset:o,line:S.line,column:S.column},end:{offset:u,line:E.line,column:E.column}};return A}function x(o){l<W||(l>W&&(W=l,xe=[]),xe.push(o))}function Wr(o,u,d){return new ce(ce.buildMessage(o,u),o,u,d)}function yt(){var o,u,d;return o=l,u=Qr(),d=Yr(),o=Rr(u,d),o}function Qr(){var o,u,d;for(o=l,u=[],d=xt();d!==e;)u.push(d),d=xt();return d=U(),o=Ir(u),o}function xt(){var o,u,d,S,E,A,re;return v++,o=l,U(),r.charCodeAt(l)===91?(u=a,l++):(u=e,v===0&&x(or)),u!==e?(U(),d=Vr(),d!==e?(U(),r.charCodeAt(l)===34?(S=c,l++):(S=e,v===0&&x(ct)),S!==e?(E=Jr(),r.charCodeAt(l)===34?(A=c,l++):(A=e,v===0&&x(ct)),A!==e?(U(),r.charCodeAt(l)===93?(re=p,l++):(re=e,v===0&&x(ar)),re!==e?o=Fr(d,E):(l=o,o=e)):(l=o,o=e)):(l=o,o=e)):(l=o,o=e)):(l=o,o=e),v--,o===e&&v===0&&x(ir),o}function Vr(){var o,u,d;if(v++,o=l,u=[],d=r.charAt(l),f.test(d)?l++:(d=e,v===0&&x(Re)),d!==e)for(;d!==e;)u.push(d),d=r.charAt(l),f.test(d)?l++:(d=e,v===0&&x(Re));else u=e;return u!==e?o=r.substring(o,l):o=u,v--,o===e&&(u=e,v===0&&x(lr)),o}function Jr(){var o,u,d;for(v++,o=l,u=[],d=r.charAt(l),$.test(d)?l++:(d=e,v===0&&x(ut));d!==e;)u.push(d),d=r.charAt(l),$.test(d)?l++:(d=e,v===0&&x(ut));return o=r.substring(o,l),v--,u=e,v===0&&x(cr),o}function Yr(){var o,u,d;return o=l,u=_t(),U(),d=nn(),d===e&&(d=null),U(),o=Or(u,d),o}function _t(){var o,u,d,S;for(o=l,u=Ie(),u===e&&(u=null),d=[],S=St();S!==e;)d.push(S),S=St();return o=Nr(u,d),o}function St(){var o,u,d,S,E,A,re,_e;if(o=l,U(),Xr(),U(),u=Zr(),u!==e){for(d=en(),d===e&&(d=null),S=[],E=Et();E!==e;)S.push(E),E=Et();for(E=U(),A=Ie(),A===e&&(A=null),re=[],_e=Pt();_e!==e;)re.push(_e),_e=Pt();o=Dr(u,d,S,A,re)}else l=o,o=e;return o}function Xr(){var o,u,d,S,E,A;for(v++,o=l,u=[],d=r.charAt(l),Y.test(d)?l++:(d=e,v===0&&x(ye));d!==e;)u.push(d),d=r.charAt(l),Y.test(d)?l++:(d=e,v===0&&x(ye));if(r.charCodeAt(l)===46?(d=h,l++):(d=e,v===0&&x(dr)),d!==e){for(S=U(),E=[],A=r.charAt(l),ie.test(A)?l++:(A=e,v===0&&x(dt));A!==e;)E.push(A),A=r.charAt(l),ie.test(A)?l++:(A=e,v===0&&x(dt));u=[u,d,S,E],o=u}else l=o,o=e;return v--,o===e&&(u=e,v===0&&x(ur)),o}function Zr(){var o,u,d,S,E,A;if(v++,o=l,u=l,r.substr(l,5)===b?(d=b,l+=5):(d=e,v===0&&x(hr)),d===e&&(r.substr(l,3)===P?(d=P,l+=3):(d=e,v===0&&x(fr)),d===e&&(r.substr(l,5)===m?(d=m,l+=5):(d=e,v===0&&x(gr)),d===e&&(r.substr(l,3)===y?(d=y,l+=3):(d=e,v===0&&x(mr)),d===e))))if(d=l,S=r.charAt(l),f.test(S)?l++:(S=e,v===0&&x(Re)),S!==e){if(E=[],A=r.charAt(l),oe.test(A)?l++:(A=e,v===0&&x(pt)),A!==e)for(;A!==e;)E.push(A),A=r.charAt(l),oe.test(A)?l++:(A=e,v===0&&x(pt));else E=e;E!==e?(S=[S,E],d=S):(l=d,d=e)}else l=d,d=e;return d!==e?(S=r.charAt(l),Q.test(S)?l++:(S=e,v===0&&x(vr)),S===e&&(S=null),d=[d,S],u=d):(l=u,u=e),u!==e?o=r.substring(o,l):o=u,v--,o===e&&(u=e,v===0&&x(pr)),o}function en(){var o,u,d;for(v++,o=l,u=[],d=r.charAt(l),it.test(d)?l++:(d=e,v===0&&x(ht));d!==e;)u.push(d),u.length>=2?d=e:(d=r.charAt(l),it.test(d)?l++:(d=e,v===0&&x(ht)));return u.length<1?(l=o,o=e):o=u,v--,o===e&&(u=e,v===0&&x(br)),o}function Et(){var o,u,d,S,E;if(v++,o=l,U(),r.charCodeAt(l)===36?(u=C,l++):(u=e,v===0&&x(xr)),u!==e){if(d=l,S=[],E=r.charAt(l),Y.test(E)?l++:(E=e,v===0&&x(ye)),E!==e)for(;E!==e;)S.push(E),E=r.charAt(l),Y.test(E)?l++:(E=e,v===0&&x(ye));else S=e;S!==e?d=r.substring(d,l):d=S,d!==e?o=Kr(d):(l=o,o=e)}else l=o,o=e;return v--,o===e&&v===0&&x(yr),o}function Ie(){var o;return o=tn(),o===e&&(o=rn()),o}function tn(){var o,u,d,S,E;if(v++,o=l,r.charCodeAt(l)===123?(u=B,l++):(u=e,v===0&&x(Sr)),u!==e){for(d=l,S=[],E=r.charAt(l),ot.test(E)?l++:(E=e,v===0&&x(ft));E!==e;)S.push(E),E=r.charAt(l),ot.test(E)?l++:(E=e,v===0&&x(ft));d=r.substring(d,l),r.charCodeAt(l)===125?(S=M,l++):(S=e,v===0&&x(Er)),S!==e?o=Ur(d):(l=o,o=e)}else l=o,o=e;return v--,o===e&&(u=e,v===0&&x(_r)),o}function rn(){var o,u,d,S,E;if(v++,o=l,r.charCodeAt(l)===59?(u=G,l++):(u=e,v===0&&x(wr)),u!==e){for(d=l,S=[],E=r.charAt(l),at.test(E)?l++:(E=e,v===0&&x(gt));E!==e;)S.push(E),E=r.charAt(l),at.test(E)?l++:(E=e,v===0&&x(gt));d=r.substring(d,l),o=Gr(d)}else l=o,o=e;return v--,o===e&&(u=e,v===0&&x(Pr)),o}function Pt(){var o,u,d,S;return v++,o=l,U(),r.charCodeAt(l)===40?(u=_,l++):(u=e,v===0&&x(Cr)),u!==e?(d=_t(),d!==e?(U(),r.charCodeAt(l)===41?(S=J,l++):(S=e,v===0&&x(kr)),S!==e?o=zr(d):(l=o,o=e)):(l=o,o=e)):(l=o,o=e),v--,o===e&&v===0&&x(Tr),o}function nn(){var o,u,d;return v++,o=l,r.substr(l,3)===k?(u=k,l+=3):(u=e,v===0&&x(Ar)),u===e&&(r.substr(l,3)===X?(u=X,l+=3):(u=e,v===0&&x($r)),u===e&&(r.substr(l,7)===D?(u=D,l+=7):(u=e,v===0&&x(Mr)),u===e&&(r.charCodeAt(l)===42?(u=L,l++):(u=e,v===0&&x(Lr))))),u!==e?(U(),d=Ie(),d===e&&(d=null),o=Hr(u,d)):(l=o,o=e),v--,o===e&&(u=e,v===0&&x(Br)),o}function U(){var o,u;for(v++,o=[],u=r.charAt(l),lt.test(u)?l++:(u=e,v===0&&x(mt));u!==e;)o.push(u),u=r.charAt(l),lt.test(u)?l++:(u=e,v===0&&x(mt));return v--,u=e,v===0&&x(qr),o}if(fe=i(),t.peg$library)return{peg$result:fe,peg$currPos:l,peg$FAILED:e,peg$maxFailExpected:xe,peg$maxFailPos:W};if(fe!==e&&l===r.length)return fe;throw fe!==e&&l<r.length&&x(jr()),Wr(xe,W<r.length?r.charAt(W):null,W<r.length?bt(W,W+1):bt(W,W))}var Ce=0xffffffffffffffffn;function Ge(r,t){return(r<<t|r>>64n-t)&0xffffffffffffffffn}function Mt(r,t){return r*t&Ce}function ws(r){return function(){let t=BigInt(r&Ce),e=BigInt(r>>64n&Ce),n=Mt(Ge(Mt(t,5n),7n),9n);return e^=t,t=(Ge(t,24n)^e^e<<16n)&Ce,e=Ge(e,37n),r=e<<64n|t,n}}var Be=ws(0xa187eb39cdcaed8f31c4b365b102e01en),Ts=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Be()))),Cs=Array.from({length:8},()=>Be()),ks=Array.from({length:16},()=>Be()),ze=Be(),K="w",z="b",q="p",Ve="n",ke="b",ve="r",te="q",I="k",He="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",le=class{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(t,e){let{color:n,piece:s,from:i,to:a,flags:c,captured:p,promotion:h}=e,b=O(i),P=O(a);this.color=n,this.piece=s,this.from=b,this.to=P,this.san=t._moveToSan(e,t._moves({legal:!0})),this.lan=b+P,this.before=t.fen(),t._makeMove(e),this.after=t.fen(),t._undoMove(),this.flags="";for(let m in T)T[m]&c&&(this.flags+=ne[m]);p&&(this.captured=p),h&&(this.promotion=h,this.lan+=h)}isCapture(){return this.flags.indexOf(ne.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(ne.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(ne.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(ne.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(ne.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(ne.BIG_PAWN)>-1}},N=-1,ne={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"};var T={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},Je={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Bs={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},As={...Je,...Bs},w={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},je={b:[16,32,17,15],w:[-16,-32,-17,-15]},Lt={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},$s=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],Ms=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],Ls={p:1,n:2,b:4,r:8,q:16,k:32},qs="pnbrqkPNBRQK",qt=[Ve,ke,ve,te],Rs=7,Is=6,Fs=1,Os=0,Te={[I]:T.KSIDE_CASTLE,[te]:T.QSIDE_CASTLE},Z={w:[{square:w.a1,flag:T.QSIDE_CASTLE},{square:w.h1,flag:T.KSIDE_CASTLE}],b:[{square:w.a8,flag:T.QSIDE_CASTLE},{square:w.h8,flag:T.KSIDE_CASTLE}]},Ns={b:Fs,w:Is},We="--";function se(r){return r>>4}function be(r){return r&15}function It(r){return"0123456789".indexOf(r)!==-1}function O(r){let t=be(r),e=se(r);return"abcdefgh".substring(t,t+1)+"87654321".substring(e,e+1)}function me(r){return r===K?z:K}function Ds(r){let t=r.split(/\s+/);if(t.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};let e=parseInt(t[5],10);if(isNaN(e)||e<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};let n=parseInt(t[4],10);if(isNaN(n)||n<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(t[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(t[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(t[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};let s=t[0].split("/");if(s.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let a=0;a<s.length;a++){let c=0,p=!1;for(let h=0;h<s[a].length;h++)if(It(s[a][h])){if(p)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};c+=parseInt(s[a][h],10),p=!0}else{if(!/^[prnbqkPRNBQK]$/.test(s[a][h]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};c+=1,p=!1}if(c!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(t[3][1]=="3"&&t[1]=="w"||t[3][1]=="6"&&t[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};let i=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(let{color:a,regex:c}of i){if(!c.test(t[0]))return{ok:!1,error:`Invalid FEN: missing ${a} king`};if((t[0].match(c)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${a} kings`}}return Array.from(s[0]+s[7]).some(a=>a.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function Ks(r,t){let e=r.from,n=r.to,s=r.piece,i=0,a=0,c=0;for(let p=0,h=t.length;p<h;p++){let b=t[p].from,P=t[p].to,m=t[p].piece;s===m&&e!==b&&n===P&&(i++,se(e)===se(b)&&a++,be(e)===be(b)&&c++)}return i>0?a>0&&c>0?O(e):c>0?O(e).charAt(1):O(e).charAt(0):""}function ee(r,t,e,n,s,i=void 0,a=T.NORMAL){let c=se(n);if(s===q&&(c===Rs||c===Os))for(let p=0;p<qt.length;p++){let h=qt[p];r.push({color:t,from:e,to:n,piece:s,captured:i,promotion:h,flags:a|T.PROMOTION})}else r.push({color:t,from:e,to:n,piece:s,captured:i,flags:a})}function Rt(r){let t=r.charAt(0);return t>="a"&&t<="h"?r.match(/[a-h]\d.*[a-h]\d/)?void 0:q:(t=t.toLowerCase(),t==="o"?I:t)}function Qe(r){return r.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}var H=class{_board=new Array(128);_turn=K;_header={};_kings={w:N,b:N};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(t=He,{skipValidation:e=!1}={}){this.load(t,{skipValidation:e})}clear({preserveHeaders:t=!1}={}){this._board=new Array(128),this._kings={w:N,b:N},this._turn=K,this._castling={w:0,b:0},this._epSquare=N,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=t?this._header:{...As},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(t,{skipValidation:e=!1,preserveHeaders:n=!1}={}){let s=t.split(/\s+/);if(s.length>=2&&s.length<6){let c=["-","-","0","1"];t=s.concat(c.slice(-(6-s.length))).join(" ")}if(s=t.split(/\s+/),!e){let{ok:c,error:p}=Ds(t);if(!c)throw new Error(p)}let i=s[0],a=0;this.clear({preserveHeaders:n});for(let c=0;c<i.length;c++){let p=i.charAt(c);if(p==="/")a+=8;else if(It(p))a+=parseInt(p,10);else{let h=p<"a"?K:z;this._put({type:p.toLowerCase(),color:h},O(a)),a++}}this._turn=s[1],s[2].indexOf("K")>-1&&(this._castling.w|=T.KSIDE_CASTLE),s[2].indexOf("Q")>-1&&(this._castling.w|=T.QSIDE_CASTLE),s[2].indexOf("k")>-1&&(this._castling.b|=T.KSIDE_CASTLE),s[2].indexOf("q")>-1&&(this._castling.b|=T.QSIDE_CASTLE),this._epSquare=s[3]==="-"?N:w[s[3]],this._halfMoves=parseInt(s[4],10),this._moveNumber=parseInt(s[5],10),this._hash=this._computeHash(),this._updateSetup(t),this._incPositionCount()}fen({forceEnpassantSquare:t=!1}={}){let e=0,n="";for(let a=w.a8;a<=w.h1;a++){if(this._board[a]){e>0&&(n+=e,e=0);let{color:c,type:p}=this._board[a];n+=c===K?p.toUpperCase():p.toLowerCase()}else e++;a+1&136&&(e>0&&(n+=e),a!==w.h1&&(n+="/"),e=0,a+=8)}let s="";this._castling[K]&T.KSIDE_CASTLE&&(s+="K"),this._castling[K]&T.QSIDE_CASTLE&&(s+="Q"),this._castling[z]&T.KSIDE_CASTLE&&(s+="k"),this._castling[z]&T.QSIDE_CASTLE&&(s+="q"),s=s||"-";let i="-";if(this._epSquare!==N)if(t)i=O(this._epSquare);else{let a=this._epSquare+(this._turn===K?16:-16),c=[a+1,a-1];for(let p of c){if(p&136)continue;let h=this._turn;if(this._board[p]?.color===h&&this._board[p]?.type===q){this._makeMove({color:h,from:p,to:this._epSquare,piece:q,captured:q,flags:T.EP_CAPTURE});let b=!this._isKingAttacked(h);if(this._undoMove(),b){i=O(this._epSquare);break}}}}return[n,this._turn,s,i,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(t){if(!this._board[t])return 0n;let{color:e,type:n}=this._board[t],s={w:0,b:1}[e],i={p:0,n:1,b:2,r:3,q:4,k:5}[n];return Ts[s][i][t]}_epKey(){return this._epSquare===N?0n:Cs[this._epSquare&7]}_castlingKey(){let t=this._castling.w>>5|this._castling.b>>3;return ks[t]}_computeHash(){let t=0n;for(let e=w.a8;e<=w.h1;e++){if(e&136){e+=7;continue}this._board[e]&&(t^=this._pieceKey(e))}return t^=this._epKey(),t^=this._castlingKey(),this._turn==="b"&&(t^=ze),t}_updateSetup(t){this._history.length>0||(t!==He?(this._header.SetUp="1",this._header.FEN=t):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(He)}get(t){return this._board[w[t]]}findPiece(t){let e=[];for(let n=w.a8;n<=w.h1;n++){if(n&136){n+=7;continue}!this._board[n]||this._board[n]?.color!==t.color||this._board[n].color===t.color&&this._board[n].type===t.type&&e.push(O(n))}return e}put({type:t,color:e},n){return this._put({type:t,color:e},n)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(t,e){this._hash^=this._pieceKey(t),this._board[t]=e,this._hash^=this._pieceKey(t)}_put({type:t,color:e},n){if(qs.indexOf(t.toLowerCase())===-1||!(n in w))return!1;let s=w[n];if(t==I&&!(this._kings[e]==N||this._kings[e]==s))return!1;let i=this._board[s];return i&&i.type===I&&(this._kings[i.color]=N),this._set(s,{type:t,color:e}),t===I&&(this._kings[e]=s),!0}_clear(t){this._hash^=this._pieceKey(t),delete this._board[t]}remove(t){let e=this.get(t);return this._clear(w[t]),e&&e.type===I&&(this._kings[e.color]=N),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),e}_updateCastlingRights(){this._hash^=this._castlingKey();let t=this._board[w.e1]?.type===I&&this._board[w.e1]?.color===K,e=this._board[w.e8]?.type===I&&this._board[w.e8]?.color===z;(!t||this._board[w.a1]?.type!==ve||this._board[w.a1]?.color!==K)&&(this._castling.w&=-65),(!t||this._board[w.h1]?.type!==ve||this._board[w.h1]?.color!==K)&&(this._castling.w&=-33),(!e||this._board[w.a8]?.type!==ve||this._board[w.a8]?.color!==z)&&(this._castling.b&=-65),(!e||this._board[w.h8]?.type!==ve||this._board[w.h8]?.color!==z)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===N)return;let t=this._epSquare+(this._turn===K?-16:16),e=this._epSquare+(this._turn===K?16:-16),n=[e+1,e-1];if(this._board[t]!==null||this._board[this._epSquare]!==null||this._board[e]?.color!==me(this._turn)||this._board[e]?.type!==q){this._hash^=this._epKey(),this._epSquare=N;return}let s=i=>!(i&136)&&this._board[i]?.color===this._turn&&this._board[i]?.type===q;n.some(s)||(this._hash^=this._epKey(),this._epSquare=N)}_attacked(t,e,n){let s=[];for(let i=w.a8;i<=w.h1;i++){if(i&136){i+=7;continue}if(this._board[i]===void 0||this._board[i].color!==t)continue;let a=this._board[i],c=i-e;if(c===0)continue;let p=c+119;if($s[p]&Ls[a.type]){if(a.type===q){if(c>0&&a.color===K||c<=0&&a.color===z)if(n)s.push(O(i));else return!0;continue}if(a.type==="n"||a.type==="k")if(n){s.push(O(i));continue}else return!0;let h=Ms[p],b=i+h,P=!1;for(;b!==e;){if(this._board[b]!=null){P=!0;break}b+=h}if(!P)if(n){s.push(O(i));continue}else return!0}}return n?s:!1}attackers(t,e){return e?this._attacked(e,w[t],!0):this._attacked(this._turn,w[t],!0)}_isKingAttacked(t){let e=this._kings[t];return e===-1?!1:this._attacked(me(t),e)}hash(){return this._hash.toString(16)}isAttacked(t,e){return this._attacked(e,w[t])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){let t={b:0,n:0,r:0,q:0,k:0,p:0},e=[],n=0,s=0;for(let i=w.a8;i<=w.h1;i++){if(s=(s+1)%2,i&136){i+=7;continue}let a=this._board[i];a&&(t[a.type]=a.type in t?t[a.type]+1:1,a.type===ke&&e.push(s),n++)}if(n===2)return!0;if(n===3&&(t[ke]===1||t[Ve]===1))return!0;if(n===t[ke]+2){let i=0,a=e.length;for(let c=0;c<a;c++)i+=e[c];if(i===0||i===a)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:t=!1,square:e=void 0,piece:n=void 0}={}){let s=this._moves({square:e,piece:n});return t?s.map(i=>new le(this,i)):s.map(i=>this._moveToSan(i,s))}_moves({legal:t=!0,piece:e=void 0,square:n=void 0}={}){let s=n?n.toLowerCase():void 0,i=e?.toLowerCase(),a=[],c=this._turn,p=me(c),h=w.a8,b=w.h1,P=!1;if(s)if(s in w)h=b=w[s],P=!0;else return[];for(let y=h;y<=b;y++){if(y&136){y+=7;continue}if(!this._board[y]||this._board[y].color===p)continue;let{type:C}=this._board[y],B;if(C===q){if(i&&i!==C)continue;B=y+je[c][0],this._board[B]||(ee(a,c,y,B,q),B=y+je[c][1],Ns[c]===se(y)&&!this._board[B]&&ee(a,c,y,B,q,void 0,T.BIG_PAWN));for(let M=2;M<4;M++)B=y+je[c][M],!(B&136)&&(this._board[B]?.color===p?ee(a,c,y,B,q,this._board[B].type,T.CAPTURE):B===this._epSquare&&ee(a,c,y,B,q,q,T.EP_CAPTURE))}else{if(i&&i!==C)continue;for(let M=0,G=Lt[C].length;M<G;M++){let _=Lt[C][M];for(B=y;B+=_,!(B&136);){if(!this._board[B])ee(a,c,y,B,C);else{if(this._board[B].color===c)break;ee(a,c,y,B,C,this._board[B].type,T.CAPTURE);break}if(C===Ve||C===I)break}}}}if((i===void 0||i===I)&&(!P||b===this._kings[c])){if(this._castling[c]&T.KSIDE_CASTLE){let y=this._kings[c],C=y+2;!this._board[y+1]&&!this._board[C]&&!this._attacked(p,this._kings[c])&&!this._attacked(p,y+1)&&!this._attacked(p,C)&&ee(a,c,this._kings[c],C,I,void 0,T.KSIDE_CASTLE)}if(this._castling[c]&T.QSIDE_CASTLE){let y=this._kings[c],C=y-2;!this._board[y-1]&&!this._board[y-2]&&!this._board[y-3]&&!this._attacked(p,this._kings[c])&&!this._attacked(p,y-1)&&!this._attacked(p,C)&&ee(a,c,this._kings[c],C,I,void 0,T.QSIDE_CASTLE)}}if(!t||this._kings[c]===-1)return a;let m=[];for(let y=0,C=a.length;y<C;y++)this._makeMove(a[y]),this._isKingAttacked(c)||m.push(a[y]),this._undoMove();return m}move(t,{strict:e=!1}={}){let n=null;if(typeof t=="string")n=this._moveFromSan(t,e);else if(t===null)n=this._moveFromSan(We,e);else if(typeof t=="object"){let i=this._moves();for(let a=0,c=i.length;a<c;a++)if(t.from===O(i[a].from)&&t.to===O(i[a].to)&&(!("promotion"in i[a])||t.promotion===i[a].promotion)){n=i[a];break}}if(!n)throw typeof t=="string"?new Error(`Invalid move: ${t}`):new Error(`Invalid move: ${JSON.stringify(t)}`);if(this.isCheck()&&n.flags&T.NULL_MOVE)throw new Error("Null move not allowed when in check");let s=new le(this,n);return this._makeMove(n),this._incPositionCount(),s}_push(t){this._history.push({move:t,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(t,e){this._hash^=this._pieceKey(t),this._board[e]=this._board[t],delete this._board[t],this._hash^=this._pieceKey(e)}_makeMove(t){let e=this._turn,n=me(e);if(this._push(t),t.flags&T.NULL_MOVE){e===z&&this._moveNumber++,this._halfMoves++,this._turn=n,this._epSquare=N;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),t.captured&&(this._hash^=this._pieceKey(t.to)),this._movePiece(t.from,t.to),t.flags&T.EP_CAPTURE&&(this._turn===z?this._clear(t.to-16):this._clear(t.to+16)),t.promotion&&(this._clear(t.to),this._set(t.to,{type:t.promotion,color:e})),this._board[t.to].type===I){if(this._kings[e]=t.to,t.flags&T.KSIDE_CASTLE){let s=t.to-1,i=t.to+1;this._movePiece(i,s)}else if(t.flags&T.QSIDE_CASTLE){let s=t.to+1,i=t.to-2;this._movePiece(i,s)}this._castling[e]=0}if(this._castling[e]){for(let s=0,i=Z[e].length;s<i;s++)if(t.from===Z[e][s].square&&this._castling[e]&Z[e][s].flag){this._castling[e]^=Z[e][s].flag;break}}if(this._castling[n]){for(let s=0,i=Z[n].length;s<i;s++)if(t.to===Z[n][s].square&&this._castling[n]&Z[n][s].flag){this._castling[n]^=Z[n][s].flag;break}}if(this._hash^=this._castlingKey(),t.flags&T.BIG_PAWN){let s;e===z?s=t.to-16:s=t.to+16,!(t.to-1&136)&&this._board[t.to-1]?.type===q&&this._board[t.to-1]?.color===n||!(t.to+1&136)&&this._board[t.to+1]?.type===q&&this._board[t.to+1]?.color===n?(this._epSquare=s,this._hash^=this._epKey()):this._epSquare=N}else this._epSquare=N;t.piece===q?this._halfMoves=0:t.flags&(T.CAPTURE|T.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,e===z&&this._moveNumber++,this._turn=n,this._hash^=ze}undo(){let t=this._hash,e=this._undoMove();if(e){let n=new le(this,e);return this._decPositionCount(t),n}return null}_undoMove(){let t=this._history.pop();if(t===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();let e=t.move;this._kings=t.kings,this._turn=t.turn,this._castling=t.castling,this._epSquare=t.epSquare,this._halfMoves=t.halfMoves,this._moveNumber=t.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=ze;let n=this._turn,s=me(n);if(e.flags&T.NULL_MOVE)return e;if(this._movePiece(e.to,e.from),e.piece&&(this._clear(e.from),this._set(e.from,{type:e.piece,color:n})),e.captured)if(e.flags&T.EP_CAPTURE){let i;n===z?i=e.to-16:i=e.to+16,this._set(i,{type:q,color:s})}else this._set(e.to,{type:e.captured,color:s});if(e.flags&(T.KSIDE_CASTLE|T.QSIDE_CASTLE)){let i,a;e.flags&T.KSIDE_CASTLE?(i=e.to+1,a=e.to-1):(i=e.to-2,a=e.to+1),this._movePiece(a,i)}return e}pgn({newline:t=`
`,maxWidth:e=0}={}){let n=[],s=!1;for(let m in this._header)this._header[m]&&n.push(`[${m} "${this._header[m]}"]`+t),s=!0;s&&this._history.length&&n.push(t);let i=m=>{let y=this._comments[this.fen()];if(typeof y<"u"){let C=m.length>0?" ":"";m=`${m}${C}{${y}}`}return m},a=[];for(;this._history.length>0;)a.push(this._undoMove());let c=[],p="";for(a.length===0&&c.push(i(""));a.length>0;){p=i(p);let m=a.pop();if(!m)break;if(!this._history.length&&m.color==="b"){let y=`${this._moveNumber}. ...`;p=p?`${p} ${y}`:y}else m.color==="w"&&(p.length&&c.push(p),p=this._moveNumber+".");p=p+" "+this._moveToSan(m,this._moves({legal:!0})),this._makeMove(m)}if(p.length&&c.push(i(p)),c.push(this._header.Result||"*"),e===0)return n.join("")+c.join(" ");let h=function(){return n.length>0&&n[n.length-1]===" "?(n.pop(),!0):!1},b=function(m,y){for(let C of y.split(" "))if(C){if(m+C.length>e){for(;h();)m--;n.push(t),m=0}n.push(C),m+=C.length,n.push(" "),m++}return h()&&m--,m},P=0;for(let m=0;m<c.length;m++){if(P+c[m].length>e&&c[m].includes("{")){P=b(P,c[m]);continue}P+c[m].length>e&&m!==0?(n[n.length-1]===" "&&n.pop(),n.push(t),P=0):m!==0&&(n.push(" "),P++),n.push(c[m]),P+=c[m].length}return n.join("")}header(...t){for(let e=0;e<t.length;e+=2)typeof t[e]=="string"&&typeof t[e+1]=="string"&&(this._header[t[e]]=t[e+1]);return this._header}setHeader(t,e){return this._header[t]=e??Je[t]??null,this.getHeaders()}removeHeader(t){return t in this._header?(this._header[t]=Je[t]||null,!0):!1}getHeaders(){let t={};for(let[e,n]of Object.entries(this._header))n!==null&&(t[e]=n);return t}loadPgn(t,{strict:e=!1,newlineChar:n=`\r?
`}={}){n!==`\r?
`&&(t=t.replace(new RegExp(n,"g"),`
`));let s=Ps(t);this.reset();let i=s.headers,a="";for(let h in i)h.toLowerCase()==="fen"&&(a=i[h]),this.header(h,i[h]);if(!e)a&&this.load(a,{preserveHeaders:!0});else if(i.SetUp==="1"){if(!("FEN"in i))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(i.FEN,{preserveHeaders:!0})}let c=s.root;for(;c;){if(c.move){let h=this._moveFromSan(c.move,e);if(h==null)throw new Error(`Invalid move in PGN: ${c.move}`);this._makeMove(h),this._incPositionCount()}c.comment!==void 0&&(this._comments[this.fen()]=c.comment),c=c.variations[0]}let p=s.result;p&&Object.keys(this._header).length&&this._header.Result!==p&&this.setHeader("Result",p)}_moveToSan(t,e){let n="";if(t.flags&T.KSIDE_CASTLE)n="O-O";else if(t.flags&T.QSIDE_CASTLE)n="O-O-O";else{if(t.flags&T.NULL_MOVE)return We;if(t.piece!==q){let s=Ks(t,e);n+=t.piece.toUpperCase()+s}t.flags&(T.CAPTURE|T.EP_CAPTURE)&&(t.piece===q&&(n+=O(t.from)[0]),n+="x"),n+=O(t.to),t.promotion&&(n+="="+t.promotion.toUpperCase())}return this._makeMove(t),this.isCheck()&&(this.isCheckmate()?n+="#":n+="+"),this._undoMove(),n}_moveFromSan(t,e=!1){let n=Qe(t);if(e||(n==="0-0"?n="O-O":n==="0-0-0"&&(n="O-O-O")),n==We)return{color:this._turn,from:0,to:0,piece:"k",flags:T.NULL_MOVE};let s=Rt(n),i=this._moves({legal:!0,piece:s});for(let m=0,y=i.length;m<y;m++)if(n===Qe(this._moveToSan(i[m],i)))return i[m];if(e)return null;let a,c,p,h,b,P=!1;if(c=n.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),c?(a=c[1],p=c[2],h=c[3],b=c[4],p.length==1&&(P=!0)):(c=n.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),c&&(a=c[1],p=c[2],h=c[3],b=c[4],p.length==1&&(P=!0))),s=Rt(n),i=this._moves({legal:!0,piece:a||s}),!h)return null;for(let m=0,y=i.length;m<y;m++)if(p){if((!a||a.toLowerCase()==i[m].piece)&&w[p]==i[m].from&&w[h]==i[m].to&&(!b||b.toLowerCase()==i[m].promotion))return i[m];if(P){let C=O(i[m].from);if((!a||a.toLowerCase()==i[m].piece)&&w[h]==i[m].to&&(p==C[0]||p==C[1])&&(!b||b.toLowerCase()==i[m].promotion))return i[m]}}else if(n===Qe(this._moveToSan(i[m],i)).replace("x",""))return i[m];return null}ascii(){let t=`   +------------------------+
`;for(let e=w.a8;e<=w.h1;e++){if(be(e)===0&&(t+=" "+"87654321"[se(e)]+" |"),this._board[e]){let n=this._board[e].type,i=this._board[e].color===K?n.toUpperCase():n.toLowerCase();t+=" "+i+" "}else t+=" . ";e+1&136&&(t+=`|
`,e+=8)}return t+=`   +------------------------+
`,t+="     a  b  c  d  e  f  g  h",t}perft(t){let e=this._moves({legal:!1}),n=0,s=this._turn;for(let i=0,a=e.length;i<a;i++)this._makeMove(e[i]),this._isKingAttacked(s)||(t-1>0?n+=this.perft(t-1):n++),this._undoMove();return n}setTurn(t){return this._turn==t?!1:(this.move("--"),!0)}turn(){return this._turn}board(){let t=[],e=[];for(let n=w.a8;n<=w.h1;n++)this._board[n]==null?e.push(null):e.push({square:O(n),type:this._board[n].type,color:this._board[n].color}),n+1&136&&(t.push(e),e=[],n+=8);return t}squareColor(t){if(t in w){let e=w[t];return(se(e)+be(e))%2===0?"light":"dark"}return null}history({verbose:t=!1}={}){let e=[],n=[];for(;this._history.length>0;)e.push(this._undoMove());for(;;){let s=e.pop();if(!s)break;t?n.push(new le(this,s)):n.push(this._moveToSan(s,this._moves())),this._makeMove(s)}return n}_getPositionCount(t){return this._positionCount.get(t)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(t){let e=this._positionCount.get(t)??0;e===1?this._positionCount.delete(t):this._positionCount.set(t,e-1)}_pruneComments(){let t=[],e={},n=s=>{s in this._comments&&(e[s]=this._comments[s])};for(;this._history.length>0;)t.push(this._undoMove());for(n(this.fen());;){let s=t.pop();if(!s)break;this._makeMove(s),n(this.fen())}this._comments=e}getComment(){return this._comments[this.fen()]}setComment(t){this._comments[this.fen()]=t.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){let t=this._comments[this.fen()];return delete this._comments[this.fen()],t}getComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>({fen:t,comment:this._comments[t]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(t=>{let e=this._comments[t];return delete this._comments[t],{fen:t,comment:e}})}setCastlingRights(t,e){for(let s of[I,te])e[s]!==void 0&&(e[s]?this._castling[t]|=Te[s]:this._castling[t]&=~Te[s]);this._updateCastlingRights();let n=this.getCastlingRights(t);return(e[I]===void 0||e[I]===n[I])&&(e[te]===void 0||e[te]===n[te])}getCastlingRights(t){return{[I]:(this._castling[t]&Te[I])!==0,[te]:(this._castling[t]&Te[te])!==0}}moveNumber(){return this._moveNumber}};function Ye(r){return r.normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase()}var Us=new Set(["la","va","co","khong","cua","the","toi","ban","hay","voi","trong","nhung","mot","nao","gi","vi","sao","nhu","de","cho","o","tren","duoc","ve","da","se","lam","nhieu","it","nay","do","kia","ay","tai","tim","cac"]);function Ft(r){let t=Ye(r).split(/[^a-z0-9]+/).filter(e=>e.length>=2);return[...new Set(t.filter(e=>!Us.has(e)))]}async function Ot(r,t={}){let{frontmatter:e}=await g("index.extractFrontmatter",Se(r),t);return e}function Nt(r){return g("chess.engine.buildMoveList",r)}function Dt(r){return g("chess.themes.getPieceSet",r)}function Ae(){return g("chess.themes.getAllPieceSets")}function ue(r){return g("chess.themes.getBoardTheme",r)}function $e(){return g("chess.themes.getAllBoardThemes")}function de(r){return g("chess.themes.generateBoardThemeCss",r)}function Kt(r){return g("chessSql.upsertGames",r)}function Xe(r){return g("chessSql.deleteGamesForPage",r)}function Ut(r){return g("chessSql.syncAiAnnotationFromFrontmatter",r)}function Ze(r){return g("chessSql.deleteAiAnnotationsForPage",r)}function Gt(r){return g("chessSql.deleteRepertoireLinesForPage",r)}function et(r){return g("chessSql.deleteEmbeddingsForPage",r)}function zt(r){return g("chessSql.queryRelatedGames",r)}function rt(r,t){let e=[];for(let n of At(t,"FencedCode")){let s=Ee(n,"CodeInfo");if(!s||s.children[0].text!=="pgn")continue;let i=Ee(n,"CodeText");if(!i)continue;let a=i.children[0].text.trim();if(!a)continue;let c,p;try{let h=new H;h.loadPgn(a),c=h.header(),p=h.getComments().map(b=>b.comment).join(" ")}catch{continue}e.push({ref:`${r}@${n.from}`,tag:"chess-game",range:[i.from,i.to],page:r,pgn:a,white:c.White||"",black:c.Black||"",result:c.Result||"*",date:c.Date||"",eco:c.ECO||"",event:c.Event||"",comments:p,whiteElo:c.WhiteElo||"",blackElo:c.BlackElo||"",timeControl:c.TimeControl||"",opening:c.Opening||"",variation:c.Variation||""})}return e}function Gs(r){return(r.tags||[]).some(t=>t==="meta/template"||t.startsWith("meta/template/"))}function nt(r){return(r.tags||[]).includes("repertoire")}function tt(r){return typeof r.chessSummary=="string"?r.chessSummary:""}function zs(r,t){let e=(t.tags||[]).join(" ");return Ye([r.white,r.black,r.eco,r.event,e,tt(t),r.comments].filter(Boolean).join(" "))}async function Ht({name:r,tree:t}){let e=await Ot(t);if(Gs(e)||nt(e))return;let n=rt(r,t);if(n.length>0&&await Pe.indexObjects(r,n),await Xe(r),await Ze(r),await et(r),n.length>0){await Kt(n.map(s=>({ref:s.ref,page:s.page,white:s.white,black:s.black,result:s.result,dateRaw:s.date,eco:s.eco,event:s.event,summary:tt(e),searchBlob:zs(s,e),whiteEloRaw:s.whiteElo,blackEloRaw:s.blackElo,timeControl:s.timeControl,opening:s.opening,variation:s.variation})));for(let s of n)await Ut({ref:s.ref,page:s.page,summary:tt(e),tags:e.tags||[]})}}async function jt(r){await Xe(r),await Ze(r),await et(r),await Gt(r)}function Me(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}async function Wt(r,t={}){let e=t.orientation==="black"?"black":"white",n=await Dt(t.pieceSet),s=await ue(t.boardTheme),i;try{i=new H(r).board()}catch(h){return`<div class="chess-error-banner">FEN kh\xF4ng h\u1EE3p l\u1EC7: ${Me(r)} (${h instanceof Error?Me(h.message):""})</div>`}let a="";for(let h=0;h<8;h++)for(let b=0;b<8;b++){let P=e==="white"?h:7-h,m=e==="white"?b:7-b,y=8-P,C=String.fromCharCode(97+m),B=(m+(y-1))%2===1,M=i[P][m],G=M?`<div class="chess-piece">${n[`${M.color}${M.type.toUpperCase()}`]??""}</div>`:"",_=b===0?`<span class="chess-coord coord-rank">${y}</span>`:"",J=h===7?`<span class="chess-coord coord-file">${C}</span>`:"";a+=`<div class="chess-sq ${B?"light":"dark"}">${_}${J}${G}</div>`}let c=t.title?`<div class="chess-title">${Me(t.title)}</div>`:"",p=t.showFen===!1?"":`<div class="fen-footer"><span>${Me(r)}</span></div>`;return`
<div class="chessnote-static-board">
  ${c}
  <div class="chess-board" style="${await de(s)}">${a}</div>
  ${p}
</div>`}function Qt(){return pe}var pe=`
:root {
  --sq-light: #ffffff;
  --sq-dark: #d8dce2;
  --sq-select: rgba(44, 62, 80, 0.4);
  --sq-highlight: rgba(255, 215, 0, 0.45);
  --sq-dest: rgba(44, 62, 80, 0.25);
  --board-border: #2c3e50;
  --bg-panel: var(--sidebar-background, #1e293b);
  --text-main: var(--text-color, #f1f5f9);
  --text-muted: #94a3b8;
  --btn-bg: #334155;
  --btn-hover: #475569;
  --btn-active: #2563eb;
  --accent: #38bdf8;
}

[data-theme="light"] {
  --sq-light: #ffffff;
  --sq-dark: #d8dce2;
  --sq-select: rgba(44, 62, 80, 0.4);
  --sq-highlight: rgba(255, 215, 0, 0.45);
  --sq-dest: rgba(44, 62, 80, 0.25);
  --board-border: #2c3e50;
  --bg-panel: #f8fafc;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --btn-bg: #e2e8f0;
  --btn-hover: #cbd5e1;
  --btn-active: #2563eb;
}

html, body {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
  background: transparent;
}

* {
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.chessnote-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg-panel);
  color: var(--text-main);
  padding: 14px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  max-width: 100%;
  margin: 0;
}

.chessnote-layout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 14px;
  align-items: flex-start;
}

.chessnote-board-container {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: stretch;
}

/* Evaluation Bar */
.chess-eval-bar-wrapper {
  width: 22px;
  height: 360px;
  background: #262626;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.chess-eval-bar-fill {
  background: #ffffff;
  width: 100%;
  height: 50%;
  transition: height 0.3s ease-out;
}

.chess-eval-bar-text {
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  font-size: 10px;
  font-weight: 800;
  text-align: center;
  color: #0f172a;
  z-index: 5;
  pointer-events: none;
}

.chessnote-board-wrapper {
  position: relative;
  width: 360px;
  height: 360px;
  flex-shrink: 0;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 600px) {
  .chessnote-layout {
    flex-direction: column;
    align-items: center;
  }
  .chessnote-board-container {
    width: 100%;
    justify-content: center;
  }
  .chessnote-board-wrapper {
    width: min(340px, calc(100vw - 50px));
    height: min(340px, calc(100vw - 50px));
  }
  .chess-eval-bar-wrapper {
    height: min(340px, calc(100vw - 50px)) !important;
  }
  .chessnote-panel {
    width: 100%;
    min-width: 0;
  }
  .chess-controls {
    justify-content: center;
  }
  .chess-btn {
    min-width: 42px;
    min-height: 38px;
    font-size: 13px;
  }
}

.chess-board {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 100%;
  height: 100%;
  position: relative;
}

.chess-sq {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.chess-sq.light { background-color: var(--sq-light); }
.chess-sq.dark { background-color: var(--sq-dark); }
.chess-sq.selected { background-color: var(--sq-select) !important; }
.chess-sq.highlight { background-color: var(--sq-highlight) !important; }

.chess-sq.dest::after {
  content: "";
  position: absolute;
  width: 28%;
  height: 28%;
  background-color: var(--sq-dest);
  border-radius: 50%;
  pointer-events: none;
}

.chess-sq.dest.has-piece::after {
  width: 88%;
  height: 88%;
  background: transparent;
  border: 4px solid var(--sq-dest);
  border-radius: 50%;
}

.chess-piece {
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: transform 0.1s ease;
}

.chess-coord {
  position: absolute;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  pointer-events: none;
  opacity: 0.75;
}

.coord-file { bottom: 2px; right: 3px; }
.coord-rank { top: 2px; left: 3px; }
.chess-sq.light .chess-coord { color: var(--sq-dark); }
.chess-sq.dark .chess-coord { color: var(--sq-light); }

.chess-arrows-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  overflow: visible;
}

.chessnote-panel {
  flex: 1;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chess-header {
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  padding-bottom: 6px;
}

.chess-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 2px;
}

.chess-subtitle {
  font-size: 12px;
  color: var(--text-muted);
}

.chess-controls {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.chess-btn {
  background: var(--btn-bg);
  color: var(--text-main);
  border: 1px solid rgba(148, 163, 184, 0.25);
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s ease;
}

.chess-btn:hover {
  background: var(--btn-hover);
  border-color: rgba(148, 163, 184, 0.4);
}

.chess-btn:active {
  transform: translateY(1px);
}

.chess-btn.active {
  background: var(--btn-active);
  color: #ffffff;
  border-color: var(--btn-active);
}

.chess-btn.btn-engine {
  background: #1e3a8a;
  color: #93c5fd;
  border-color: #3b82f6;
}
.chess-btn.btn-engine.active {
  background: #2563eb;
  color: #ffffff;
}

.chess-engine-panel {
  background: rgba(30, 58, 138, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  padding: 8px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.engine-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.engine-score {
  font-weight: 800;
  font-size: 13px;
  color: #38bdf8;
}

.engine-bestmove {
  font-weight: 600;
  color: #4ade80;
}

.chess-pgn-tree {
  max-height: 200px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 8px;
  font-size: 13px;
  line-height: 1.8;
}

.move-num {
  font-weight: 700;
  color: var(--text-muted);
  margin-right: 4px;
}

.move-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 5px;
  border-radius: 4px;
  cursor: pointer;
  margin: 1px 2px;
  font-weight: 500;
}

.move-item:hover {
  background: rgba(56, 189, 248, 0.2);
}

.move-item.active {
  background: var(--btn-active);
  color: #ffffff;
  font-weight: 700;
}

.badge-brilliant { color: #06b6d4; font-weight: 900; }
.badge-great { color: #3b82f6; font-weight: 900; }
.badge-best { color: #22c55e; font-weight: 700; }
.badge-inaccuracy { color: #eab308; font-weight: 700; }
.badge-mistake { color: #f97316; font-weight: 700; }
.badge-blunder { color: #ef4444; font-weight: 900; }

.review-report-box {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.accuracy-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
}

.accuracy-white { color: #f8fafc; }
.accuracy-black { color: #94a3b8; }

.review-status {
  font-size: 12px;
  color: #94a3b8;
}
.review-status.error {
  color: #ef4444;
  font-weight: 600;
}

.chess-btn.btn-ai {
  background: #4c1d95;
  color: #d8b4fe;
  border-color: #7c3aed;
}
.chess-btn.btn-ai.active {
  background: #7c3aed;
  color: #ffffff;
}

.ai-coach-panel {
  background: rgba(76, 29, 149, 0.2);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 8px;
  padding: 10px;
  font-size: 13px;
  line-height: 1.5;
  color: #e9d5ff;
  white-space: pre-wrap;
}
.ai-coach-panel.error {
  color: #ef4444;
  font-weight: 600;
}

.puzzle-banner {
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.puzzle-banner.pending { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
.puzzle-banner.correct { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
.puzzle-banner.wrong { background: rgba(239, 68, 68, 0.2); color: #ef4444; }

.chess-error-banner {
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.promotion-picker {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background: rgba(15, 23, 42, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.promotion-picker button {
  width: 48px;
  height: 48px;
  border: 2px solid #38bdf8;
  border-radius: 8px;
  background: #1e293b;
  cursor: pointer;
  padding: 4px;
}

.promotion-picker button:hover { background: #334155; }

.puzzle-hint-box {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  border-left: 3px solid #f59e0b;
}

.fen-footer {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  color: var(--text-muted);
  background: rgba(0, 0, 0, 0.2);
  padding: 6px 10px;
  border-radius: 6px;
  word-break: break-all;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.chess-related-games {
  margin-top: 4px;
  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 12px;
}

.chess-related-title {
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-muted);
}

.chess-related-item {
  display: flex;
  flex-direction: column;
  padding: 4px 0;
}

.chess-related-item a {
  color: inherit;
  text-decoration: underline;
}

.chess-related-reason {
  font-size: 11px;
  color: var(--text-muted);
}

.chess-theme-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--bg-panel, #1e293b);
  border: 1px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 14px;
  z-index: 50;
  min-width: 250px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--text-main, #f1f5f9);
}

.chess-theme-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  padding-bottom: 6px;
}

.chess-theme-modal-close {
  background: transparent;
  border: none;
  color: var(--text-muted, #94a3b8);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 2px 4px;
  border-radius: 4px;
}
.chess-theme-modal-close:hover {
  background: rgba(148, 163, 184, 0.2);
  color: var(--text-main, #f1f5f9);
}

.chess-theme-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chess-theme-field label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.chess-theme-select {
  background: var(--btn-bg, #334155);
  color: var(--text-main, #f1f5f9);
  border: 1px solid rgba(148, 163, 184, 0.3);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
}
.chess-theme-select:focus {
  border-color: var(--btn-active, #2563eb);
}
.chess-theme-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
}
.chess-theme-btn-default {
  background: #2563eb;
  color: #ffffff;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: background 0.15s ease;
}
.chess-theme-btn-default:hover {
  background: #1d4ed8;
}
.chess-theme-btn-reset {
  background: transparent;
  color: var(--text-muted, #94a3b8);
  border: 1px solid rgba(148, 163, 184, 0.3);
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}
.chess-theme-btn-reset:hover {
  background: rgba(148, 163, 184, 0.15);
  color: var(--text-main, #f1f5f9);
}
.chess-theme-status {
  font-size: 11px;
  color: #10b981;
  text-align: center;
  font-weight: 600;
  padding: 2px 0;
}
`;var Hs=new Set(["","white","black"]);function Le(r){let t=r.trim();return Hs.has(t.toLowerCase())?null:t}function js(r,t){let e=[];r.eco&&t.eco&&r.eco===t.eco&&e.push(`c\xF9ng m\xE3 khai cu\u1ED9c ECO ${t.eco}`);let n=new Set([r.white,r.black].map(Le).filter(a=>a!==null).map(a=>a.toLowerCase())),i=[t.white,t.black].map(Le).filter(a=>a!==null).filter(a=>n.has(a.toLowerCase()));return i.length>0&&e.push(`c\xF9ng ng\u01B0\u1EDDi ch\u01A1i: ${[...new Set(i)].join(", ")}`),e}async function Vt(r,t=5){return(await zt({page:r.page,white:Le(r.white),black:Le(r.black),eco:r.eco,limit:t})).map(n=>({page:n.page,white:n.white,black:n.black,result:n.result,eco:n.eco,score:n.score,reasons:js(r,n)}))}function R(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}async function he(r,t){try{return await we.getConfig(r,t)}catch{return t}}function st(r){return`
  <div class="chess-theme-modal" id="${r}_theme_modal" style="display: none;">
    <div class="chess-theme-modal-header">
      <span>\u{1F3A8} Tu\u1EF3 Ch\u1EC9nh & C\xE0i \u0110\u1EB7t Giao Di\u1EC7n C\u1EDD</span>
      <button class="chess-theme-modal-close" id="${r}_theme_close" title="\u0110\xF3ng">\u2715</button>
    </div>
    <div class="chess-theme-field">
      <label for="${r}_piece_select">B\u1ED9 qu\xE2n c\u1EDD (Piece Set)</label>
      <select class="chess-theme-select" id="${r}_piece_select">
        <option value="merida">Merida (Chu\u1EA9n gi\xE1o khoa / S\xE1ch b\xE1o)</option>
        <option value="alpha">Alpha (S\xE1ch c\u1EDD ch\xE2u \xC2u)</option>
        <option value="leipzig">Leipzig (Truy\u1EC1n th\u1ED1ng \u0110\u1EE9c)</option>
        <option value="cburnett">Staunton Hi\u1EC7n \u0111\u1EA1i (Cburnett)</option>
        <option value="maestro">Maestro (T\u1EA1p ch\xED FIDE / Informator)</option>
        <option value="spatial">B\xE1o in / \u0110\u01A1n s\u1EAFc (Spatial)</option>
      </select>
    </div>
    <div class="chess-theme-field">
      <label for="${r}_board_select">M\xE0u b\xE0n c\u1EDD (Board Theme)</label>
      <select class="chess-theme-select" id="${r}_board_select">
        <option value="textbook">Gi\xE1o khoa / S\xE1ch b\xE1o (Textbook)</option>
        <option value="wood">G\u1ED7 kinh \u0111i\u1EC3n (Classic Wood)</option>
        <option value="green">Xanh thi \u0111\u1EA5u (Tournament Green)</option>
        <option value="blue">Xanh d\u01B0\u01A1ng hi\u1EC7n \u0111\u1EA1i (ChessBase Blue)</option>
        <option value="maple">G\u1ED7 \xF3c ch\xF3 cao c\u1EA5p (Walnut / Maple)</option>
        <option value="monochrome">B\xE1o in \u0111en tr\u1EAFng (Newspaper B&W)</option>
        <option value="parchment">Gi\u1EA5y da c\u1ED5 \u0111i\u1EC3n (Parchment)</option>
        <option value="dark">Giao di\u1EC7n t\u1ED1i (Dark Slate)</option>
      </select>
    </div>
    <div class="chess-theme-actions">
      <button class="chess-theme-btn-default" id="${r}_save_default_btn" title="L\u01B0u giao di\u1EC7n n\xE0y l\xE0m m\u1EB7c \u0111\u1ECBnh cho t\u1EA5t c\u1EA3 t\xE0i li\u1EC7u">
        \u2B50 \u0110\u1EB7t l\xE0m m\u1EB7c \u0111\u1ECBnh cho m\u1ECDi t\xE0i li\u1EC7u
      </button>
      <button class="chess-theme-btn-reset" id="${r}_reset_default_btn" title="Kh\xF4i ph\u1EE5c m\u1EB7c \u0111\u1ECBnh chu\u1EA9n Textbook & Merida">
        \u{1F504} Kh\xF4i ph\u1EE5c chu\u1EA9n Textbook
      </button>
      <div class="chess-theme-status" id="${r}_theme_status" style="display: none;"></div>
    </div>
  </div>`}function qe(r,t){return`
<style>${pe}</style>
<div class="chessnote-container">
  <div class="chess-header">
    <div class="chess-title">\u26A0\uFE0F ${R(r)}</div>
  </div>
  <div style="padding: 8px 4px; color: var(--text-muted, #94a3b8);">${R(t)}</div>
</div>`}function Jt(r,t){try{return new H(r).moves({square:t,verbose:!0}).map(s=>({to:s.to,san:s.san,promotion:!!s.promotion}))}catch{return[]}}function Yt(r,t,e){return{fen:r.fen(),san:t,captured:e,turn:r.turn(),inCheck:r.inCheck(),isCheckmate:r.isCheckmate(),isStalemate:r.isStalemate(),isDraw:r.isDraw(),isGameOver:r.isGameOver()}}function Xt(r,t,e,n){try{let s=new H(r),i=s.move({from:t,to:e,promotion:n||void 0});return Yt(s,i.san,i.captured)}catch(s){return{error:s instanceof Error?s.message:"illegal move"}}}function Zt(r,t){try{let e=new H(r),n=e.move(t);return Yt(e,n.san,n.captured)}catch(e){return{error:e instanceof Error?e.message:"illegal move"}}}async function er(r,t){let e=r.trim().split(`
`),n=e[0].trim(),s="white",i="Chess Position",a=[],c={},{sets:p,default:h}=await Ae(),{themes:b,default:P}=await $e(),m=await he("chess.pieceSet",h),y=await he("chess.boardTheme",P),C=m,B=y,M=!1,G=!1;for(let D=1;D<e.length;D++){let L=e[D].trim();if(L.startsWith("| orientation:"))s=L.includes("black")?"black":"white";else if(L.startsWith("| title:"))i=L.replace("| title:","").trim();else if(L.startsWith("| arrows:")){let f=L.replace("| arrows:","").trim().split(",");a.push(...f.map($=>$.trim()).filter(Boolean))}else if(L.startsWith("| highlights:")){let f=L.replace("| highlights:","").trim().split(",");for(let $ of f){let[Y,ie]=$.split(":").map(oe=>oe.trim());Y&&(c[Y]=ie||"yellow")}}else L.startsWith("| pieceSet:")||L.startsWith("| pieces:")?(C=L.replace(/\| (pieceSet|pieces):/,"").trim(),M=!0):(L.startsWith("| boardTheme:")||L.startsWith("| theme:")||L.startsWith("| board:"))&&(B=L.replace(/\| (boardTheme|theme|board):/,"").trim(),G=!0)}try{new H(n)}catch(D){return{html:qe("FEN kh\xF4ng h\u1EE3p l\u1EC7",`Kh\xF4ng th\u1EC3 \u0111\u1ECDc chu\u1ED7i FEN: "${n}". ${D instanceof Error?D.message:""}`.trim())}}let _=`chess_fen_${Math.random().toString(36).substring(2,9)}`,J=await ue(B),k=`
<style>${pe}</style>
<div class="chessnote-container" id="${_}" style="${await de(J)}">
  ${st(_)}
  <div class="chess-header">
    <div class="chess-title">${R(i)}</div>
    <div class="chess-subtitle">FEN Interactive Board \u2022 Arasan Engine (NNUE, WASM)</div>
  </div>
  <div class="chessnote-layout">
    <div class="chessnote-board-container">
      <div class="chess-eval-bar-wrapper" id="${_}_eval_bar" style="display: none;">
        <div class="chess-eval-bar-fill" id="${_}_eval_fill"></div>
        <span class="chess-eval-bar-text" id="${_}_eval_text">0.0</span>
      </div>
      <div class="chessnote-board-wrapper">
        <div class="chess-board" id="${_}_board"></div>
        <svg class="chess-arrows-layer" id="${_}_arrows" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
      </div>
    </div>
    <div class="chessnote-panel">
      <div class="chess-error-banner" id="${_}_error" style="display: none;"></div>
      <div class="chess-controls">
        <button class="chess-btn btn-engine" id="${_}_eval_toggle">\u26A1 Engine Eval</button>
        <button class="chess-btn" id="${_}_theme_btn" title="Tu\u1EF3 ch\u1EC9nh b\xE0n c\u1EDD v\xE0 qu\xE2n c\u1EDD">\u{1F3A8} Theme</button>
        <button class="chess-btn" id="${_}_flip">\u{1F504} Flip</button>
        <button class="chess-btn" id="${_}_reset">\u23EE Reset</button>
        <button class="chess-btn" id="${_}_copy_fen">\u{1F4CB} Copy FEN</button>
        <button class="chess-btn" id="${_}_lichess">\u{1F50D} Lichess Analysis</button>
      </div>
      <div class="chess-engine-panel" id="${_}_engine_panel" style="display: none;">
        <div class="engine-line">
          <span>Engine: <strong>Arasan (NNUE, WASM)</strong></span>
          <span class="engine-score" id="${_}_engine_score">Eval: 0.0</span>
        </div>
        <div class="engine-line">
          <span>Best move: <strong class="engine-bestmove" id="${_}_best_move">-</strong></span>
        </div>
      </div>
      <div class="fen-footer">
        <span id="${_}_fen_text">${R(n)}</span>
      </div>
    </div>
  </div>
</div>
`,X=`
(function() {
  const PIECE_SETS = ${JSON.stringify(p)};
  const BOARD_THEMES = ${JSON.stringify(b)};
  const initialFen = ${JSON.stringify(n)};
  let currentFen = initialFen;
  let orientation = ${JSON.stringify(s)};
  const baseArrows = ${JSON.stringify(a)};
  const highlights = ${JSON.stringify(c)};
  const hasExplicitPieceSet = ${JSON.stringify(M)};
  const hasExplicitBoardTheme = ${JSON.stringify(G)};

  let currentPieceSet = ${JSON.stringify(C)};
  let currentBoardTheme = ${JSON.stringify(B)};
  try {
    const defaultPiece = localStorage.getItem("chessnote_default_piece_set") || localStorage.getItem("chessnote_piece_set");
    const defaultBoard = localStorage.getItem("chessnote_default_board_theme") || localStorage.getItem("chessnote_board_theme");
    if (!hasExplicitPieceSet && defaultPiece && PIECE_SETS[defaultPiece]) currentPieceSet = defaultPiece;
    if (!hasExplicitBoardTheme && defaultBoard && BOARD_THEMES[defaultBoard]) currentBoardTheme = defaultBoard;
  } catch (_e) {}
  
  let selectedSquare = null;
  let legalMoves = []; // [{to, san, promotion}] for the currently selected square
  let isEngineOn = false;
  let currentBestMove = null;
  let isBusy = false; // true while a move syscall round-trip is in flight

  const boardEl = document.getElementById("${_}_board");
  const arrowsEl = document.getElementById("${_}_arrows");
  const fenTextEl = document.getElementById("${_}_fen_text");
  const errorEl = document.getElementById("${_}_error");
  const flipBtn = document.getElementById("${_}_flip");
  const resetBtn = document.getElementById("${_}_reset");
  const copyFenBtn = document.getElementById("${_}_copy_fen");
  const lichessBtn = document.getElementById("${_}_lichess");
  const evalToggleBtn = document.getElementById("${_}_eval_toggle");
  const evalBarEl = document.getElementById("${_}_eval_bar");
  const evalFillEl = document.getElementById("${_}_eval_fill");
  const evalTextEl = document.getElementById("${_}_eval_text");
  const enginePanel = document.getElementById("${_}_engine_panel");
  const engineScoreEl = document.getElementById("${_}_engine_score");
  const bestMoveEl = document.getElementById("${_}_best_move");

  const themeBtn = document.getElementById("${_}_theme_btn");
  const themeModal = document.getElementById("${_}_theme_modal");
  const themeCloseBtn = document.getElementById("${_}_theme_close");
  const pieceSelect = document.getElementById("${_}_piece_select");
  const boardSelect = document.getElementById("${_}_board_select");
  const saveDefaultBtn = document.getElementById("${_}_save_default_btn");
  const resetDefaultBtn = document.getElementById("${_}_reset_default_btn");
  const themeStatus = document.getElementById("${_}_theme_status");

  if (pieceSelect) pieceSelect.value = currentPieceSet;
  if (boardSelect) boardSelect.value = currentBoardTheme;

  function applyTheme(boardKey, pieceKey, saveAsDefault = false) {
    if (BOARD_THEMES[boardKey]) currentBoardTheme = boardKey;
    if (PIECE_SETS[pieceKey]) currentPieceSet = pieceKey;
    try {
      localStorage.setItem("chessnote_piece_set", currentPieceSet);
      localStorage.setItem("chessnote_board_theme", currentBoardTheme);
      if (saveAsDefault) {
        localStorage.setItem("chessnote_default_piece_set", currentPieceSet);
        localStorage.setItem("chessnote_default_board_theme", currentBoardTheme);
      }
    } catch (_e) {}

    const theme = BOARD_THEMES[currentBoardTheme] || BOARD_THEMES["textbook"];
    const container = document.getElementById("${_}");
    if (container) {
      container.style.setProperty("--sq-light", theme.light);
      container.style.setProperty("--sq-dark", theme.dark);
      container.style.setProperty("--board-border", theme.border);
      container.style.setProperty("--sq-select", theme.select);
      container.style.setProperty("--sq-highlight", theme.highlight);
      container.style.setProperty("--sq-dest", theme.dest);
    }
    renderBoard();
  }

  // Initial theme application
  applyTheme(currentBoardTheme, currentPieceSet, false);

  if (themeBtn && themeModal) {
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeModal.style.display = themeModal.style.display === "none" ? "flex" : "none";
    });
  }
  if (themeCloseBtn && themeModal) {
    themeCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeModal.style.display = "none";
    });
  }
  if (pieceSelect) {
    pieceSelect.addEventListener("change", (e) => {
      applyTheme(boardSelect ? boardSelect.value : currentBoardTheme, e.target.value, false);
    });
  }
  if (boardSelect) {
    boardSelect.addEventListener("change", (e) => {
      applyTheme(e.target.value, pieceSelect ? pieceSelect.value : currentPieceSet, false);
    });
  }
  if (saveDefaultBtn) {
    saveDefaultBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const p = pieceSelect ? pieceSelect.value : currentPieceSet;
      const b = boardSelect ? boardSelect.value : currentBoardTheme;
      applyTheme(b, p, true);
      try {
        window.dispatchEvent(new CustomEvent("chessnote_theme_changed", {
          detail: { pieceSet: p, boardTheme: b }
        }));
      } catch (_e) {}
      if (themeStatus) {
        themeStatus.textContent = "\u2713 \u0110\xE3 l\u01B0u l\xE0m m\u1EB7c \u0111\u1ECBnh cho m\u1ECDi t\xE0i li\u1EC7u!";
        themeStatus.style.display = "block";
        setTimeout(() => { themeStatus.style.display = "none"; }, 3000);
      }
    });
  }
  if (resetDefaultBtn) {
    resetDefaultBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      try {
        localStorage.removeItem("chessnote_default_piece_set");
        localStorage.removeItem("chessnote_default_board_theme");
        localStorage.removeItem("chessnote_piece_set");
        localStorage.removeItem("chessnote_board_theme");
      } catch (_e) {}
      if (pieceSelect) pieceSelect.value = "merida";
      if (boardSelect) boardSelect.value = "textbook";
      applyTheme("textbook", "merida", false);
      try {
        window.dispatchEvent(new CustomEvent("chessnote_theme_changed", {
          detail: { pieceSet: "merida", boardTheme: "textbook" }
        }));
      } catch (_e) {}
      if (themeStatus) {
        themeStatus.textContent = "\u2713 \u0110\xE3 kh\xF4i ph\u1EE5c chu\u1EA9n Textbook & Merida!";
        themeStatus.style.display = "block";
        setTimeout(() => { themeStatus.style.display = "none"; }, 3000);
      }
    });
  }

  window.addEventListener("chessnote_theme_changed", (e) => {
    if (!e || !e.detail) return;
    if (!hasExplicitBoardTheme && e.detail.boardTheme) {
      currentBoardTheme = e.detail.boardTheme;
      if (boardSelect) boardSelect.value = currentBoardTheme;
    }
    if (!hasExplicitPieceSet && e.detail.pieceSet) {
      currentPieceSet = e.detail.pieceSet;
      if (pieceSelect) pieceSelect.value = currentPieceSet;
    }
    applyTheme(currentBoardTheme, currentPieceSet, false);
  });

  function showError(msg) {
    if (!msg) {
      errorEl.style.display = "none";
      return;
    }
    errorEl.textContent = "\u26A0\uFE0F " + msg;
    errorEl.style.display = "block";
  }

  function gameOverMessage(result) {
    if (result.isCheckmate) return "Chi\u1EBFu h\u1EBFt! " + (result.turn === "w" ? "\u0110en" : "Tr\u1EAFng") + " th\u1EAFng.";
    if (result.isStalemate) return "H\u1EBFt n\u01B0\u1EDBc \u0111i h\u1EE3p l\u1EC7 (Stalemate) \u2014 h\xF2a.";
    if (result.isDraw) return "V\xE1n \u0111\u1EA5u h\xF2a.";
    return null;
  }

  function askPromotion(moverColor) {
    return new Promise((resolve) => {
      const picker = document.createElement("div");
      picker.className = "promotion-picker";
      const currentPieces = PIECE_SETS[currentPieceSet] || PIECE_SETS["merida"];
      ["q", "r", "b", "n"].forEach((p) => {
        const btn = document.createElement("button");
        btn.innerHTML = currentPieces[moverColor + p.toUpperCase()] || p;
        btn.addEventListener("click", () => {
          picker.remove();
          resolve(p);
        });
        picker.appendChild(btn);
      });
      boardEl.parentElement.appendChild(picker);
    });
  }

  function parseFenBoard(f) {
    const parts = f.split(" ");
    const rows = parts[0].split("/");
    const board = {};
    for (let r = 0; r < 8; r++) {
      let col = 0;
      for (const ch of rows[r]) {
        if (!isNaN(ch)) {
          col += parseInt(ch, 10);
        } else {
          const file = String.fromCharCode(97 + col);
          const rank = 8 - r;
          const isWhite = ch === ch.toUpperCase();
          board[file + rank] = (isWhite ? "w" : "b") + ch.toUpperCase();
          col++;
        }
      }
    }
    return board;
  }

  let lastEvalFen = null;
  let evalRequestSeq = 0;

  async function updateEngineEval() {
    if (!isEngineOn) return;
    if (currentFen === lastEvalFen) return;
    const mySeq = ++evalRequestSeq;
    engineScoreEl.innerText = "\u0110ang ph\xE2n t\xEDch...";
    bestMoveEl.innerText = "\u2026";
    try {
      const result = await syscall("chess.engineEval", currentFen, 12);
      if (mySeq !== evalRequestSeq) return;
      lastEvalFen = currentFen;
      let scoreStr;
      let winChance;
      if (result.mateIn !== null && result.mateIn !== undefined) {
        scoreStr = (result.mateIn > 0 ? "M" + result.mateIn : "-M" + Math.abs(result.mateIn));
        winChance = result.mateIn > 0 ? 99 : 1;
      } else {
        const cp = result.scoreCp || 0;
        const pawns = (cp / 100).toFixed(1);
        scoreStr = cp > 0 ? "+" + pawns : String(pawns);
        winChance = 100 / (1 + Math.exp(-0.00368208 * cp));
      }
      engineScoreEl.innerText = "Arasan eval: " + scoreStr + (result.depth ? " (depth " + result.depth + ")" : "");
      evalTextEl.innerText = scoreStr;
      bestMoveEl.innerText = result.bestMove || "-";
      evalFillEl.style.height = Math.max(5, Math.min(95, winChance)) + "%";
      currentBestMove = result.bestMove && result.bestMove.length >= 4
        ? result.bestMove.slice(0, 2) + "-" + result.bestMove.slice(2, 4)
        : null;
      renderArrows();
    } catch (e) {
      if (mySeq !== evalRequestSeq) return;
      lastEvalFen = null;
      engineScoreEl.innerText = "\u26A0\uFE0F " + (e && e.message ? e.message : "Kh\xF4ng th\u1EC3 ph\xE2n t\xEDch");
      evalTextEl.innerText = "\u2013";
      bestMoveEl.innerText = "-";
    }
  }

  function renderBoard() {
    boardEl.innerHTML = "";
    const boardState = parseFenBoard(currentFen);
    const files = orientation === "white" ? ["a","b","c","d","e","f","g","h"] : ["h","g","f","e","d","c","b","a"];
    const ranks = orientation === "white" ? [8,7,6,5,4,3,2,1] : [1,2,3,4,5,6,7,8];
    const destSquares = {};
    legalMoves.forEach((m) => { destSquares[m.to] = m; });
    const currentPieces = PIECE_SETS[currentPieceSet] || PIECE_SETS["merida"];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const file = files[c];
        const rank = ranks[r];
        const sq = file + rank;
        const isLight = (file.charCodeAt(0) - 97 + rank) % 2 !== 0;

        const sqDiv = document.createElement("div");
        sqDiv.className = "chess-sq " + (isLight ? "light" : "dark");
        sqDiv.dataset.sq = sq;

        if (selectedSquare === sq) {
          sqDiv.classList.add("selected");
        }
        if (highlights[sq]) {
          sqDiv.classList.add("highlight");
        }
        if (destSquares[sq]) {
          sqDiv.classList.add("dest");
          if (boardState[sq]) sqDiv.classList.add("has-piece");
        }

        if (boardState[sq]) {
          const piece = boardState[sq];
          const pieceDiv = document.createElement("div");
          pieceDiv.className = "chess-piece";
          pieceDiv.innerHTML = currentPieces[piece] || "";
          sqDiv.appendChild(pieceDiv);
        }

        if (c === 7) {
          const rankLabel = document.createElement("span");
          rankLabel.className = "chess-coord coord-rank";
          rankLabel.innerText = rank;
          sqDiv.appendChild(rankLabel);
        }
        if (r === 7) {
          const fileLabel = document.createElement("span");
          fileLabel.className = "chess-coord coord-file";
          fileLabel.innerText = file;
          sqDiv.appendChild(fileLabel);
        }

        sqDiv.addEventListener("click", () => handleSquareClick(sq, boardState));
        boardEl.appendChild(sqDiv);
      }
    }
    renderArrows();
    updateEngineEval();
  }

  function renderArrows() {
    arrowsEl.innerHTML = "";
    const activeArrows = [...baseArrows];
    if (currentBestMove) activeArrows.push(currentBestMove + ":green");

    activeArrows.forEach(arrowStr => {
      const [fromTo, color] = arrowStr.split(":");
      const [from, to] = fromTo.split("-");
      if (!from || !to) return;

      const strokeColor = color === "green" ? "#22c55e" : color === "red" ? "#ef4444" : "#38bdf8";
      const files = orientation === "white" ? ["a","b","c","d","e","f","g","h"] : ["h","g","f","e","d","c","b","a"];
      const ranks = orientation === "white" ? [8,7,6,5,4,3,2,1] : [1,2,3,4,5,6,7,8];

      const fromC = files.indexOf(from[0]);
      const fromR = ranks.indexOf(parseInt(from[1], 10));
      const toC = files.indexOf(to[0]);
      const toR = ranks.indexOf(parseInt(to[1], 10));

      if (fromC === -1 || fromR === -1 || toC === -1 || toR === -1) return;

      // The <svg> has viewBox="0 0 100 100" (see the html template above) so
      // these coordinates are percentages of the board \u2014 scale-invariant
      // regardless of how large the board is actually rendered (fixes
      // arrows drifting off-square on the narrower mobile board width).
      const sqSize = 100 / 8;
      const x1 = fromC * sqSize + sqSize / 2;
      const y1 = fromR * sqSize + sqSize / 2;
      const x2 = toC * sqSize + sqSize / 2;
      const y2 = toR * sqSize + sqSize / 2;

      const markerId = "arrowhead_" + Math.random().toString(36).substring(2, 7);
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
      marker.setAttribute("id", markerId);
      marker.setAttribute("viewBox", "0 0 10 10");
      marker.setAttribute("refX", "5");
      marker.setAttribute("refY", "5");
      marker.setAttribute("markerWidth", "2.2");
      marker.setAttribute("markerHeight", "2.2");
      marker.setAttribute("orient", "auto-start-reverse");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M 0 1 L 10 5 L 0 9 z");
      path.setAttribute("fill", strokeColor);
      marker.appendChild(path);
      defs.appendChild(marker);
      arrowsEl.appendChild(defs);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", strokeColor);
      line.setAttribute("stroke-width", "1.2");
      line.setAttribute("stroke-opacity", "0.85");
      line.setAttribute("marker-end", "url(#" + markerId + ")");
      arrowsEl.appendChild(line);
    });
  }

  async function handleSquareClick(sq, boardState) {
    if (isBusy) return;

    // Clicking a highlighted legal destination while a piece is selected:
    // attempt the move for real via chess.js (through the syscall bridge).
    const attemptedMove = selectedSquare
      ? legalMoves.find((m) => m.to === sq)
      : null;
    if (selectedSquare && attemptedMove) {
      const from = selectedSquare;
      isBusy = true;
      selectedSquare = null;
      legalMoves = [];
      try {
        let promotion = undefined;
        if (attemptedMove.promotion) {
          const moverColor = currentFen.split(" ")[1] === "w" ? "w" : "b";
          promotion = await askPromotion(moverColor);
        }
        const result = await syscall("chess.applyMove", currentFen, from, sq, promotion);
        if (result && result.error) {
          showError("N\u01B0\u1EDBc \u0111i kh\xF4ng h\u1EE3p l\u1EC7: " + result.error);
          renderBoard();
          return;
        }
        showError(null);
        currentFen = result.fen;
        fenTextEl.innerText = currentFen;
        const overMsg = gameOverMessage(result);
        if (overMsg) showError(overMsg);
        renderBoard();
      } finally {
        isBusy = false;
      }
      return;
    }

    if (selectedSquare === sq) {
      selectedSquare = null;
      legalMoves = [];
      renderBoard();
      return;
    }

    if (!boardState[sq]) {
      selectedSquare = null;
      legalMoves = [];
      renderBoard();
      return;
    }

    // Only allow selecting a piece belonging to the side to move (FEN's
    // active-color field), so you can't "select" the opponent's pieces.
    const activeColor = currentFen.split(" ")[1] === "w" ? "w" : "b";
    if (boardState[sq][0] !== activeColor) {
      selectedSquare = null;
      legalMoves = [];
      renderBoard();
      return;
    }

    selectedSquare = sq;
    isBusy = true;
    try {
      legalMoves = await syscall("chess.legalMoves", currentFen, sq) || [];
    } finally {
      isBusy = false;
    }
    renderBoard();
  }

  evalToggleBtn.addEventListener("click", () => {
    isEngineOn = !isEngineOn;
    evalToggleBtn.classList.toggle("active", isEngineOn);
    evalBarEl.style.display = isEngineOn ? "flex" : "none";
    enginePanel.style.display = isEngineOn ? "flex" : "none";
    if (!isEngineOn) {
      evalRequestSeq++; // invalidate any in-flight analysis
      lastEvalFen = null;
      currentBestMove = null;
      renderArrows();
    }
    updateEngineEval();
  });

  flipBtn.addEventListener("click", () => {
    orientation = orientation === "white" ? "black" : "white";
    renderBoard();
  });

  resetBtn.addEventListener("click", () => {
    currentFen = initialFen;
    selectedSquare = null;
    legalMoves = [];
    showError(null);
    fenTextEl.innerText = currentFen;
    renderBoard();
  });

  copyFenBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(currentFen);
    copyFenBtn.innerText = "\u2713 Copied!";
    setTimeout(() => { copyFenBtn.innerText = "\u{1F4CB} Copy FEN"; }, 1500);
  });

  lichessBtn.addEventListener("click", () => {
    const url = "https://lichess.org/analysis/" + encodeURIComponent(currentFen.replace(/ /g, "_"));
    window.open(url, "_blank");
  });

  renderBoard();
})();
`;return{html:k,script:X}}async function tr(r,t){let e=r.trim(),n;try{n=new H,e&&n.loadPgn(e)}catch(Q){return{html:qe("PGN kh\xF4ng h\u1EE3p l\u1EC7",`Kh\xF4ng th\u1EC3 \u0111\u1ECDc bi\xEAn b\u1EA3n v\xE1n \u0111\u1EA5u n\xE0y. ${Q instanceof Error?Q.message:""}`.trim())}}let s=n.header(),i=s.White||"White",a=s.Black||"Black",c=s.Event||"Game Analysis",p=s.Result||"*",h=s.Date||"",b=s.ECO||"",{sets:P,default:m}=await Ae(),{themes:y,default:C}=await $e(),B=await he("chess.pieceSet",m),M=await he("chess.boardTheme",C),G=!!(s.PieceSet||s.Pieces),_=!!(s.BoardTheme||s.Theme),J=s.PieceSet||s.Pieces||B,k=s.BoardTheme||s.Theme||M,X=await Nt(r.trim()),D=[];try{D=await Vt({page:t,white:i,black:a,eco:b})}catch{D=[]}let L="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK2R w KQkq - 0 1",f=`chess_pgn_${Math.random().toString(36).substring(2,9)}`,$=await ue(k),Y=D.length===0?"":`
      <div class="chess-related-games">
        <div class="chess-related-title">\u{1F517} V\xE1n li\xEAn quan</div>
        ${D.map(Q=>`
        <div class="chess-related-item">
          <a href="/${encodeURIComponent(Q.page)}" target="_top">${R(Q.white)} vs ${R(Q.black)} (${R(Q.result)})</a>
          <span class="chess-related-reason">${R(Q.reasons.join(", "))}</span>
        </div>`).join("")}
      </div>`,ie=`
<style>${pe}</style>
<div class="chessnote-container" id="${f}" style="${await de($)}">
  ${st(f)}
  <div class="chess-header">
    <div class="chess-title">${R(i)} vs ${R(a)} (${R(p)})</div>
    <div class="chess-subtitle">${R(c)} ${h?"\u2022 "+R(h):""} ${b?"\u2022 ECO: "+R(b):""}</div>
  </div>
  <div class="chessnote-layout">
    <div class="chessnote-board-container">
      <div class="chess-eval-bar-wrapper" id="${f}_eval_bar" style="display: none;">
        <div class="chess-eval-bar-fill" id="${f}_eval_fill"></div>
        <span class="chess-eval-bar-text" id="${f}_eval_text">0.0</span>
      </div>
      <div class="chessnote-board-wrapper">
        <div class="chess-board" id="${f}_board"></div>
        <svg class="chess-arrows-layer" id="${f}_arrows" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
      </div>
    </div>
    <div class="chessnote-panel">
      <div class="chess-controls">
        <button class="chess-btn btn-engine" id="${f}_eval_toggle">\u26A1 Engine Eval</button>
        <button class="chess-btn" id="${f}_review_toggle">\u{1F4CA} Game Review</button>
        <button class="chess-btn" id="${f}_theme_btn" title="Tu\u1EF3 ch\u1EC9nh b\xE0n c\u1EDD v\xE0 qu\xE2n c\u1EDD">\u{1F3A8} Theme</button>
        <button class="chess-btn btn-ai" id="${f}_ai_explain_toggle">\u{1F9D1}\u200D\u{1F3EB} AI Gi\u1EA3i th\xEDch</button>
        <button class="chess-btn btn-ai" id="${f}_ai_annotate_toggle">\u{1F4DD} AI B\xECnh lu\u1EADn v\xE1n</button>
        <button class="chess-btn btn-ai" id="${f}_ai_tag_toggle">\u{1F3F7}\uFE0F AI G\u1EE3i \xFD tag</button>
        <button class="chess-btn" id="${f}_first">\u23EE First</button>
        <button class="chess-btn" id="${f}_prev">\u25C0 Prev</button>
        <button class="chess-btn" id="${f}_next">\u25B6 Next</button>
        <button class="chess-btn" id="${f}_last">\u23ED Last</button>
        <button class="chess-btn" id="${f}_flip">\u{1F504} Flip</button>
        <button class="chess-btn" id="${f}_copy_pgn">\u{1F4CB} Copy PGN</button>
      </div>
      
      <div class="review-report-box" id="${f}_review_box" style="display: none;">
        <div class="accuracy-row" id="${f}_accuracy_row" style="display: none;">
          <span class="accuracy-white">\u26AA ${R(i)}: <strong id="${f}_white_acc">-</strong></span>
          <span class="accuracy-black">\u26AB ${R(a)}: <strong id="${f}_black_acc">-</strong></span>
        </div>
        <div class="review-status-line" id="${f}_review_status"></div>
      </div>

      <div class="ai-explain-panel" id="${f}_ai_explain_panel" style="display: none;"></div>
      <div class="ai-annotate-panel" id="${f}_ai_annotate_panel" style="display: none;"></div>
      <div class="ai-tag-panel" id="${f}_ai_tag_panel" style="display: none;"></div>

      <div class="chess-engine-panel" id="${f}_engine_panel" style="display: none;">
        <div class="engine-line">
          <span>Engine: <strong>Arasan (NNUE, WASM)</strong></span>
          <span class="engine-score" id="${f}_engine_score">Eval: 0.0</span>
        </div>
      </div>

      <div class="chess-tree" id="${f}_tree"></div>
      ${Y}
      <div class="fen-footer">
        <span id="${f}_fen_text">${L}</span>
      </div>
    </div>
  </div>
</div>
`,oe=`
(function() {
  const PIECE_SETS = ${JSON.stringify(P)};
  const BOARD_THEMES = ${JSON.stringify(y)};
  const initialFen = ${JSON.stringify(L)};
  const reviewedMoves = ${JSON.stringify(X)};
  const rawPgn = ${JSON.stringify(r.trim())};
  const gameHeaders = ${JSON.stringify({white:i,black:a,result:p,eco:b,event:c})};
  const pageName = ${JSON.stringify(t)};
  const hasExplicitPieceSet = ${JSON.stringify(G)};
  const hasExplicitBoardTheme = ${JSON.stringify(_)};

  let currentPieceSet = ${JSON.stringify(J)};
  let currentBoardTheme = ${JSON.stringify(k)};
  try {
    const defaultPiece = localStorage.getItem("chessnote_default_piece_set") || localStorage.getItem("chessnote_piece_set");
    const defaultBoard = localStorage.getItem("chessnote_default_board_theme") || localStorage.getItem("chessnote_board_theme");
    if (!hasExplicitPieceSet && defaultPiece && PIECE_SETS[defaultPiece]) currentPieceSet = defaultPiece;
    if (!hasExplicitBoardTheme && defaultBoard && BOARD_THEMES[defaultBoard]) currentBoardTheme = defaultBoard;
  } catch (_e) {}

  let currentIdx = -1;
  let orientation = "white";
  let isEngineOn = false;
  let isReviewOn = false;
  let fullReview = null;
  let reviewRequestSeq = 0;
  let lastEvalFen = null;
  let evalRequestSeq = 0;
  let isAiExplainOn = false;
  let aiExplainSeq = 0;
  const aiExplainCache = {};
  let isAnnotateOn = false;
  let annotateRequestSeq = 0;
  let annotateResult = null;
  let isTagSuggestOn = false;
  let tagSuggestRequestSeq = 0;
  let tagSuggestResult = null; // { tags, summary, model } | { error }
  // AI features need a server (proxied through /.proxy/... to ai-sidecar) that
  // the offline Capacitor mobile build doesn't have \u2014 set once at init below,
  // checked before every AI call so mobile gets a clear message instead of a
  // raw network-failure error.
  let isCapacitorEnv = false;
  const AI_UNAVAILABLE_MESSAGE =
    "T\xEDnh n\u0103ng AI c\u1EA7n b\u1EA3n Web ho\u1EB7c Desktop, ch\u01B0a h\u1ED7 tr\u1EE3 tr\xEAn Mobile.";

  const boardEl = document.getElementById("${f}_board");
  const arrowsEl = document.getElementById("${f}_arrows");
  const treeEl = document.getElementById("${f}_tree");
  const fenTextEl = document.getElementById("${f}_fen_text");
  const firstBtn = document.getElementById("${f}_first");
  const prevBtn = document.getElementById("${f}_prev");
  const nextBtn = document.getElementById("${f}_next");
  const lastBtn = document.getElementById("${f}_last");
  const flipBtn = document.getElementById("${f}_flip");
  const copyPgnBtn = document.getElementById("${f}_copy_pgn");
  const evalToggleBtn = document.getElementById("${f}_eval_toggle");
  const reviewToggleBtn = document.getElementById("${f}_review_toggle");
  const evalBarEl = document.getElementById("${f}_eval_bar");
  const evalFillEl = document.getElementById("${f}_eval_fill");
  const evalTextEl = document.getElementById("${f}_eval_text");
  const enginePanel = document.getElementById("${f}_engine_panel");
  const engineScoreEl = document.getElementById("${f}_engine_score");
  const reviewBox = document.getElementById("${f}_review_box");
  const accuracyRowEl = document.getElementById("${f}_accuracy_row");
  const whiteAccEl = document.getElementById("${f}_white_acc");
  const blackAccEl = document.getElementById("${f}_black_acc");
  const reviewStatusEl = document.getElementById("${f}_review_status");
  const aiExplainToggleBtn = document.getElementById("${f}_ai_explain_toggle");
  const aiExplainPanel = document.getElementById("${f}_ai_explain_panel");
  const aiAnnotateToggleBtn = document.getElementById("${f}_ai_annotate_toggle");
  const aiAnnotatePanel = document.getElementById("${f}_ai_annotate_panel");
  const aiTagToggleBtn = document.getElementById("${f}_ai_tag_toggle");
  const aiTagPanel = document.getElementById("${f}_ai_tag_panel");

  const themeBtn = document.getElementById("${f}_theme_btn");
  const themeModal = document.getElementById("${f}_theme_modal");
  const themeCloseBtn = document.getElementById("${f}_theme_close");
  const pieceSelect = document.getElementById("${f}_piece_select");
  const boardSelect = document.getElementById("${f}_board_select");
  const saveDefaultBtn = document.getElementById("${f}_save_default_btn");
  const resetDefaultBtn = document.getElementById("${f}_reset_default_btn");
  const themeStatus = document.getElementById("${f}_theme_status");

  if (pieceSelect) pieceSelect.value = currentPieceSet;
  if (boardSelect) boardSelect.value = currentBoardTheme;

  function applyTheme(boardKey, pieceKey, saveAsDefault = false) {
    if (BOARD_THEMES[boardKey]) currentBoardTheme = boardKey;
    if (PIECE_SETS[pieceKey]) currentPieceSet = pieceKey;
    try {
      localStorage.setItem("chessnote_piece_set", currentPieceSet);
      localStorage.setItem("chessnote_board_theme", currentBoardTheme);
      if (saveAsDefault) {
        localStorage.setItem("chessnote_default_piece_set", currentPieceSet);
        localStorage.setItem("chessnote_default_board_theme", currentBoardTheme);
      }
    } catch (_e) {}

    const theme = BOARD_THEMES[currentBoardTheme] || BOARD_THEMES["textbook"];
    const container = document.getElementById("${f}");
    if (container) {
      container.style.setProperty("--sq-light", theme.light);
      container.style.setProperty("--sq-dark", theme.dark);
      container.style.setProperty("--board-border", theme.border);
      container.style.setProperty("--sq-select", theme.select);
      container.style.setProperty("--sq-highlight", theme.highlight);
      container.style.setProperty("--sq-dest", theme.dest);
    }
    renderBoard();
  }

  // Initial theme application
  applyTheme(currentBoardTheme, currentPieceSet, false);

  if (themeBtn && themeModal) {
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeModal.style.display = themeModal.style.display === "none" ? "flex" : "none";
    });
  }
  if (themeCloseBtn && themeModal) {
    themeCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeModal.style.display = "none";
    });
  }
  if (pieceSelect) {
    pieceSelect.addEventListener("change", (e) => {
      applyTheme(boardSelect ? boardSelect.value : currentBoardTheme, e.target.value, false);
    });
  }
  if (boardSelect) {
    boardSelect.addEventListener("change", (e) => {
      applyTheme(e.target.value, pieceSelect ? pieceSelect.value : currentPieceSet, false);
    });
  }
  if (saveDefaultBtn) {
    saveDefaultBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const p = pieceSelect ? pieceSelect.value : currentPieceSet;
      const b = boardSelect ? boardSelect.value : currentBoardTheme;
      applyTheme(b, p, true);
      try {
        window.dispatchEvent(new CustomEvent("chessnote_theme_changed", {
          detail: { pieceSet: p, boardTheme: b }
        }));
      } catch (_e) {}
      if (themeStatus) {
        themeStatus.textContent = "\u2713 \u0110\xE3 l\u01B0u l\xE0m m\u1EB7c \u0111\u1ECBnh cho m\u1ECDi t\xE0i li\u1EC7u!";
        themeStatus.style.display = "block";
        setTimeout(() => { themeStatus.style.display = "none"; }, 3000);
      }
    });
  }
  if (resetDefaultBtn) {
    resetDefaultBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      try {
        localStorage.removeItem("chessnote_default_piece_set");
        localStorage.removeItem("chessnote_default_board_theme");
        localStorage.removeItem("chessnote_piece_set");
        localStorage.removeItem("chessnote_board_theme");
      } catch (_e) {}
      if (pieceSelect) pieceSelect.value = "merida";
      if (boardSelect) boardSelect.value = "textbook";
      applyTheme("textbook", "merida", false);
      try {
        window.dispatchEvent(new CustomEvent("chessnote_theme_changed", {
          detail: { pieceSet: "merida", boardTheme: "textbook" }
        }));
      } catch (_e) {}
      if (themeStatus) {
        themeStatus.textContent = "\u2713 \u0110\xE3 kh\xF4i ph\u1EE5c chu\u1EA9n Textbook & Merida!";
        themeStatus.style.display = "block";
        setTimeout(() => { themeStatus.style.display = "none"; }, 3000);
      }
    });
  }

  window.addEventListener("chessnote_theme_changed", (e) => {
    if (!e || !e.detail) return;
    if (!hasExplicitBoardTheme && e.detail.boardTheme) {
      currentBoardTheme = e.detail.boardTheme;
      if (boardSelect) boardSelect.value = currentBoardTheme;
    }
    if (!hasExplicitPieceSet && e.detail.pieceSet) {
      currentPieceSet = e.detail.pieceSet;
      if (pieceSelect) pieceSelect.value = currentPieceSet;
    }
    applyTheme(currentBoardTheme, currentPieceSet, false);
  });

  syscall("system.isCapacitor").then((v) => {
    isCapacitorEnv = v;
    if (!v) return;
    for (const btn of [aiExplainToggleBtn, aiAnnotateToggleBtn, aiTagToggleBtn]) {
      btn.disabled = true;
      btn.title = AI_UNAVAILABLE_MESSAGE;
    }
  }).catch(() => {});

  function parseFenBoard(f) {
    const parts = f.split(" ");
    const rows = parts[0].split("/");
    const board = {};
    for (let r = 0; r < 8; r++) {
      let col = 0;
      for (const ch of rows[r]) {
        if (!isNaN(ch)) {
          col += parseInt(ch, 10);
        } else {
          const file = String.fromCharCode(97 + col);
          const rank = 8 - r;
          const isWhite = ch === ch.toUpperCase();
          board[file + rank] = (isWhite ? "w" : "b") + ch.toUpperCase();
          col++;
        }
      }
    }
    return board;
  }

  function getCurrentFen() {
    return currentIdx === -1 ? initialFen : reviewedMoves[currentIdx].fenAfter;
  }

  // Real Arasan (NNUE, WASM) analysis of whatever position is currently
  // shown, via the same chess.engineEval syscall fenWidget uses \u2014 analyzes
  // one position at a time as the user steps through the game, independent
  // of the (much slower, on-demand) full-game "Game Review" below.
  async function updateEngineEval() {
    if (!isEngineOn) return;
    const fen = getCurrentFen();
    if (fen === lastEvalFen) return;
    const mySeq = ++evalRequestSeq;
    engineScoreEl.innerText = "\u0110ang ph\xE2n t\xEDch...";
    evalTextEl.innerText = "\u2026";
    try {
      const result = await syscall("chess.engineEval", fen, 12);
      if (mySeq !== evalRequestSeq) return; // a newer position was requested meanwhile
      lastEvalFen = fen;
      let scoreStr;
      let winChance;
      if (result.mateIn !== null && result.mateIn !== undefined) {
        scoreStr = (result.mateIn > 0 ? "M" + result.mateIn : "-M" + Math.abs(result.mateIn));
        winChance = result.mateIn > 0 ? 99 : 1;
      } else {
        const cp = result.scoreCp || 0;
        const pawns = (cp / 100).toFixed(1);
        scoreStr = cp > 0 ? "+" + pawns : String(pawns);
        winChance = 100 / (1 + Math.exp(-0.00368208 * cp));
      }
      engineScoreEl.innerText = "Arasan eval: " + scoreStr + (result.depth ? " (depth " + result.depth + ")" : "");
      evalTextEl.innerText = scoreStr;
      evalFillEl.style.height = Math.max(5, Math.min(95, winChance)) + "%";
    } catch (e) {
      if (mySeq !== evalRequestSeq) return;
      lastEvalFen = null;
      engineScoreEl.innerText = "\u26A0\uFE0F " + (e && e.message ? e.message : "Kh\xF4ng th\u1EC3 ph\xE2n t\xEDch");
      evalTextEl.innerText = "\u2013";
    }
  }

  // AI Coach: gi\u1EA3i th\xEDch n\u01B0\u1EDBc \u0111ang ch\u1ECDn, CH\u1EC8 kh\u1EA3 d\u1EE5ng sau khi "Game Review" \u0111\xE3
  // g\xE1n cpl/classification/bestMoveSan v\xE0o reviewedMoves[idx] (xem
  // ensureFullReview() b\xEAn d\u01B0\u1EDBi) \u2014 n\u1EBFu ch\u01B0a \u0111\u1EE7 s\u1ED1 li\u1EC7u, kh\xF4ng g\u1ECDi AI, ch\u1EC9 nh\u1EAFc.
  // K\u1EBFt qu\u1EA3 cache theo idx \u0111\u1EC3 xem l\u1EA1i n\u01B0\u1EDBc c\u0169 kh\xF4ng t\u1ED1n ti\u1EC1n g\u1ECDi l\u1EA1i.
  async function ensureAiExplain(idx) {
    if (!isAiExplainOn) return;
    if (isCapacitorEnv) {
      aiExplainPanel.classList.add("error");
      aiExplainPanel.innerText = "\u26A0\uFE0F " + AI_UNAVAILABLE_MESSAGE;
      return;
    }
    if (idx < 0 || !reviewedMoves[idx] || reviewedMoves[idx].classification == null) {
      aiExplainPanel.classList.remove("error");
      aiExplainPanel.innerText = "B\u1EADt \\"Game Review\\" r\u1ED3i ch\u1ECDn m\u1ED9t n\u01B0\u1EDBc \u0111\u1EC3 xem gi\u1EA3i th\xEDch.";
      return;
    }
    if (aiExplainCache[idx]) {
      aiExplainPanel.classList.remove("error");
      aiExplainPanel.innerText = aiExplainCache[idx];
      return;
    }
    const mySeq = ++aiExplainSeq;
    aiExplainPanel.classList.remove("error");
    aiExplainPanel.innerText = "\u23F3 \u0110ang h\u1ECFi AI Coach...";
    try {
      const result = await syscall("chess.ai.explainMove", reviewedMoves[idx]);
      if (mySeq !== aiExplainSeq) return; // ng\u01B0\u1EDDi d\xF9ng \u0111\xE3 chuy\u1EC3n sang n\u01B0\u1EDBc kh\xE1c
      if (result.ok) {
        aiExplainCache[idx] = result.text;
        aiExplainPanel.innerText = result.text;
      } else {
        aiExplainPanel.classList.add("error");
        aiExplainPanel.innerText = "\u26A0\uFE0F " + result.error;
      }
    } catch (e) {
      if (mySeq !== aiExplainSeq) return;
      aiExplainPanel.classList.add("error");
      aiExplainPanel.innerText = "\u26A0\uFE0F " + (e && e.message ? e.message : "Kh\xF4ng g\u1ECDi \u0111\u01B0\u1EE3c AI.");
    }
  }

  function updateAiExplain() {
    if (isAiExplainOn) ensureAiExplain(currentIdx);
  }

  // B\xECnh lu\u1EADn to\xE0n v\xE1n: CH\u1EC8 1 l\u1EA7n g\u1ECDi AI cho c\u1EA3 v\xE1n (kh\xF4ng l\u1EB7p theo t\u1EEBng n\u01B0\u1EDBc),
  // d\xF9ng to\xE0n b\u1ED9 fullReview (\u0111\xE3 c\xF3 sau khi b\u1EADt Game Review) l\xE0m ng\u1EEF c\u1EA3nh.
  async function ensureAnnotate() {
    if (isCapacitorEnv) {
      aiAnnotatePanel.classList.add("error");
      aiAnnotatePanel.innerText = "\u26A0\uFE0F " + AI_UNAVAILABLE_MESSAGE;
      return;
    }
    if (annotateResult) {
      aiAnnotatePanel.classList.remove("error");
      aiAnnotatePanel.innerText = annotateResult;
      return;
    }
    if (!fullReview) {
      aiAnnotatePanel.classList.remove("error");
      aiAnnotatePanel.innerText = "B\u1EADt \\"Game Review\\" tr\u01B0\u1EDBc \u0111\u1EC3 AI c\xF3 \u0111\u1EE7 s\u1ED1 li\u1EC7u b\xECnh lu\u1EADn.";
      return;
    }
    const mySeq = ++annotateRequestSeq;
    aiAnnotatePanel.classList.remove("error");
    aiAnnotatePanel.innerText = "\u23F3 \u0110ang nh\u1EDD AI b\xECnh lu\u1EADn to\xE0n v\xE1n...";
    try {
      const result = await syscall("chess.ai.annotateGame", fullReview, gameHeaders);
      if (mySeq !== annotateRequestSeq) return;
      if (result.ok) {
        annotateResult = result.text;
        aiAnnotatePanel.innerText = result.text;
      } else {
        aiAnnotatePanel.classList.add("error");
        aiAnnotatePanel.innerText = "\u26A0\uFE0F " + result.error;
      }
    } catch (e) {
      if (mySeq !== annotateRequestSeq) return;
      aiAnnotatePanel.classList.add("error");
      aiAnnotatePanel.innerText = "\u26A0\uFE0F " + (e && e.message ? e.message : "Kh\xF4ng g\u1ECDi \u0111\u01B0\u1EE3c AI.");
    }
  }

  // G\u1EE3i \xFD tag + t\xF3m t\u1EAFt: 1 l\u1EA7n g\u1ECDi AI (cache trong phi\xEAn widget n\xE0y), ng\u01B0\u1EDDi d\xF9ng
  // ph\u1EA3i b\u1EA5m "\xC1p d\u1EE5ng" m\u1EDBi th\u1EADt s\u1EF1 ghi v\xE0o frontmatter \u2014 kh\xF4ng c\xF3 g\xEC t\u1EF1 \u0111\u1ED9ng ghi
  // \u0111\xE8 d\u1EEF li\u1EC7u ghi ch\xFA ch\u1EC9 v\xEC m\u1EDF widget l\xEAn xem.
  function renderTagSuggest() {
    if (!tagSuggestResult) return;
    aiTagPanel.innerHTML = "";
    if (tagSuggestResult.error) {
      aiTagPanel.classList.add("error");
      aiTagPanel.innerText = "\u26A0\uFE0F " + tagSuggestResult.error;
      return;
    }
    aiTagPanel.classList.remove("error");
    const tagsLine = document.createElement("div");
    tagsLine.innerText = "Tag g\u1EE3i \xFD: " + tagSuggestResult.tags.map((t) => "#" + t).join(" ");
    const summaryLine = document.createElement("div");
    summaryLine.innerText = "T\xF3m t\u1EAFt: " + tagSuggestResult.summary;
    const applyRow = document.createElement("div");
    applyRow.style.marginTop = "6px";
    const applyBtn = document.createElement("button");
    applyBtn.className = "chess-btn btn-ai";
    applyBtn.innerText = "\u2705 \xC1p d\u1EE5ng v\xE0o ghi ch\xFA";
    const applyStatus = document.createElement("span");
    applyStatus.style.marginLeft = "8px";
    applyBtn.addEventListener("click", async () => {
      applyBtn.disabled = true;
      applyStatus.innerText = "\u23F3 \u0110ang \xE1p d\u1EE5ng...";
      try {
        const result = await syscall(
          "chess.applyTagSuggestion",
          pageName,
          tagSuggestResult.tags,
          tagSuggestResult.summary,
          tagSuggestResult.model || "",
        );
        if (result && result.ok) {
          applyStatus.innerText = "\u2713 \u0110\xE3 \xE1p d\u1EE5ng v\xE0o frontmatter.";
        } else {
          applyBtn.disabled = false;
          applyStatus.innerText = "\u26A0\uFE0F " + ((result && result.error) || "Kh\xF4ng \xE1p d\u1EE5ng \u0111\u01B0\u1EE3c.");
        }
      } catch (e) {
        applyBtn.disabled = false;
        applyStatus.innerText = "\u26A0\uFE0F " + (e && e.message ? e.message : "Kh\xF4ng \xE1p d\u1EE5ng \u0111\u01B0\u1EE3c.");
      }
    });
    applyRow.appendChild(applyBtn);
    applyRow.appendChild(applyStatus);
    aiTagPanel.appendChild(tagsLine);
    aiTagPanel.appendChild(summaryLine);
    aiTagPanel.appendChild(applyRow);
  }

  async function ensureTagSuggest() {
    if (isCapacitorEnv) {
      tagSuggestResult = { error: AI_UNAVAILABLE_MESSAGE };
      renderTagSuggest();
      return;
    }
    if (tagSuggestResult) {
      renderTagSuggest();
      return;
    }
    const mySeq = ++tagSuggestRequestSeq;
    aiTagPanel.classList.remove("error");
    aiTagPanel.innerText = "\u23F3 \u0110ang h\u1ECFi AI g\u1EE3i \xFD tag...";
    try {
      const openingMoves = reviewedMoves.slice(0, 12).map((m) => m.san).join(" ");
      const result = await syscall("chess.ai.suggestTags", { ...gameHeaders, openingMoves });
      if (mySeq !== tagSuggestRequestSeq) return;
      tagSuggestResult = result.ok
        ? { tags: result.tags, summary: result.summary, model: result.model }
        : { error: result.error };
      renderTagSuggest();
    } catch (e) {
      if (mySeq !== tagSuggestRequestSeq) return;
      tagSuggestResult = { error: (e && e.message) || "Kh\xF4ng g\u1ECDi \u0111\u01B0\u1EE3c AI." };
      renderTagSuggest();
    }
  }

  function renderBoard() {
    boardEl.innerHTML = "";
    const currentFen = getCurrentFen();
    fenTextEl.innerText = currentFen;
    const boardState = parseFenBoard(currentFen);
    const files = orientation === "white" ? ["a","b","c","d","e","f","g","h"] : ["h","g","f","e","d","c","b","a"];
    const ranks = orientation === "white" ? [8,7,6,5,4,3,2,1] : [1,2,3,4,5,6,7,8];
    const currentPieces = PIECE_SETS[currentPieceSet] || PIECE_SETS["merida"];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const file = files[c];
        const rank = ranks[r];
        const sq = file + rank;
        const isLight = (file.charCodeAt(0) - 97 + rank) % 2 !== 0;

        const sqDiv = document.createElement("div");
        sqDiv.className = "chess-sq " + (isLight ? "light" : "dark");
        sqDiv.dataset.sq = sq;

        if (boardState[sq]) {
          const piece = boardState[sq];
          const pieceDiv = document.createElement("div");
          pieceDiv.className = "chess-piece";
          pieceDiv.innerHTML = currentPieces[piece] || "";
          sqDiv.appendChild(pieceDiv);
        }

        if (c === 7) {
          const rankLabel = document.createElement("span");
          rankLabel.className = "chess-coord coord-rank";
          rankLabel.innerText = rank;
          sqDiv.appendChild(rankLabel);
        }
        if (r === 7) {
          const fileLabel = document.createElement("span");
          fileLabel.className = "chess-coord coord-file";
          fileLabel.innerText = file;
          sqDiv.appendChild(fileLabel);
        }

        boardEl.appendChild(sqDiv);
      }
    }
    updateTreeHighlight();
    updateEngineEval();
    updateAiExplain();
  }

  function getBadgeHtml(cls) {
    if (!isReviewOn) return "";
    switch (cls) {
      case "brilliant": return '<span class="badge-brilliant" title="Brilliant">!!</span>';
      case "great": return '<span class="badge-great" title="Great Move">!</span>';
      case "best": return '<span class="badge-best" title="Best Move">\u2605</span>';
      case "inaccuracy": return '<span class="badge-inaccuracy" title="Inaccuracy">?!</span>';
      case "mistake": return '<span class="badge-mistake" title="Mistake">?</span>';
      case "blunder": return '<span class="badge-blunder" title="Blunder">??</span>';
      default: return "";
    }
  }

  function renderTree() {
    treeEl.innerHTML = "";
    let currentNum = 0;

    reviewedMoves.forEach((m, idx) => {
      if (m.isWhite) {
        currentNum = m.moveNum;
        const numSpan = document.createElement("span");
        numSpan.className = "move-num";
        numSpan.innerText = currentNum + ".";
        treeEl.appendChild(numSpan);
      }

      const moveSpan = document.createElement("span");
      moveSpan.className = "move-item";
      moveSpan.id = "${f}_m_" + idx;
      moveSpan.innerHTML = m.san + " " + getBadgeHtml(m.classification);
      moveSpan.addEventListener("click", () => {
        currentIdx = idx;
        renderBoard();
      });
      treeEl.appendChild(moveSpan);
    });
  }

  function updateTreeHighlight() {
    const activeMoves = treeEl.querySelectorAll(".move-item.active");
    activeMoves.forEach(el => el.classList.remove("active"));

    if (currentIdx >= 0) {
      const currentEl = document.getElementById("${f}_m_" + currentIdx);
      if (currentEl) {
        currentEl.classList.add("active");
        currentEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }

  function goToMove(idx) {
    if (idx < -1) idx = -1;
    if (idx >= reviewedMoves.length) idx = reviewedMoves.length - 1;
    currentIdx = idx;
    renderBoard();
  }

  firstBtn.addEventListener("click", () => goToMove(-1));
  prevBtn.addEventListener("click", () => goToMove(currentIdx - 1));
  nextBtn.addEventListener("click", () => goToMove(currentIdx + 1));
  lastBtn.addEventListener("click", () => goToMove(reviewedMoves.length - 1));

  flipBtn.addEventListener("click", () => {
    orientation = orientation === "white" ? "black" : "white";
    renderBoard();
  });

  evalToggleBtn.addEventListener("click", () => {
    isEngineOn = !isEngineOn;
    evalToggleBtn.classList.toggle("active", isEngineOn);
    evalBarEl.style.display = isEngineOn ? "flex" : "none";
    enginePanel.style.display = isEngineOn ? "flex" : "none";
    if (!isEngineOn) {
      evalRequestSeq++; // invalidate any in-flight analysis
      lastEvalFen = null;
    }
    updateEngineEval();
  });

  // Full-game review is a real (slow) engine batch job \u2014 fetched lazily on
  // first toggle-on via the chess.reviewGame syscall, then cached in
  // fullReview so re-toggling doesn't re-run it.
  async function ensureFullReview() {
    if (fullReview) return;
    const mySeq = ++reviewRequestSeq;
    reviewStatusEl.classList.remove("error");
    reviewStatusEl.style.display = "block";
    reviewStatusEl.innerText = "\u23F3 \u0110ang ph\xE2n t\xEDch to\xE0n b\u1ED9 v\xE1n b\u1EB1ng Arasan th\u1EADt (" +
      reviewedMoves.length + " n\u01B0\u1EDBc \u0111i \u2014 c\xF3 th\u1EC3 m\u1EA5t kh\xE1 l\xE2u)...";
    accuracyRowEl.style.display = "none";
    try {
      const report = await syscall("chess.reviewGame", rawPgn, 12);
      if (mySeq !== reviewRequestSeq) return;
      fullReview = report;
      report.moves.forEach((m, idx) => {
        if (reviewedMoves[idx]) Object.assign(reviewedMoves[idx], m);
      });
      whiteAccEl.innerText = report.whiteAccuracy + "%";
      blackAccEl.innerText = report.blackAccuracy + "%";
      accuracyRowEl.style.display = "flex";
      reviewStatusEl.style.display = "none";
      renderTree();
    } catch (e) {
      if (mySeq !== reviewRequestSeq) return;
      reviewStatusEl.classList.add("error");
      reviewStatusEl.style.display = "block";
      reviewStatusEl.innerText = "\u26A0\uFE0F " + (e && e.message ? e.message : "Kh\xF4ng th\u1EC3 ph\xE2n t\xEDch v\xE1n n\xE0y.");
    }
  }

  reviewToggleBtn.addEventListener("click", () => {
    isReviewOn = !isReviewOn;
    reviewToggleBtn.classList.toggle("active", isReviewOn);
    reviewBox.style.display = isReviewOn ? "flex" : "none";
    if (isReviewOn) ensureFullReview();
    renderTree();
  });

  aiExplainToggleBtn.addEventListener("click", () => {
    isAiExplainOn = !isAiExplainOn;
    aiExplainToggleBtn.classList.toggle("active", isAiExplainOn);
    aiExplainPanel.style.display = isAiExplainOn ? "block" : "none";
    if (!isAiExplainOn) {
      aiExplainSeq++; // hu\u1EF7 m\u1ECDi l\u01B0\u1EE3t g\u1ECDi AI \u0111ang bay d\u1EDF
      return;
    }
    ensureAiExplain(currentIdx);
  });

  aiAnnotateToggleBtn.addEventListener("click", () => {
    isAnnotateOn = !isAnnotateOn;
    aiAnnotateToggleBtn.classList.toggle("active", isAnnotateOn);
    aiAnnotatePanel.style.display = isAnnotateOn ? "block" : "none";
    if (!isAnnotateOn) {
      annotateRequestSeq++;
      return;
    }
    ensureAnnotate();
  });

  aiTagToggleBtn.addEventListener("click", () => {
    isTagSuggestOn = !isTagSuggestOn;
    aiTagToggleBtn.classList.toggle("active", isTagSuggestOn);
    aiTagPanel.style.display = isTagSuggestOn ? "block" : "none";
    if (!isTagSuggestOn) {
      tagSuggestRequestSeq++;
      return;
    }
    ensureTagSuggest();
  });

  copyPgnBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(rawPgn);
    copyPgnBtn.innerText = "\u2713 Copied!";
    setTimeout(() => { copyPgnBtn.innerText = "\u{1F4CB} Copy PGN"; }, 1500);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goToMove(currentIdx - 1);
    else if (e.key === "ArrowRight") goToMove(currentIdx + 1);
    else if (e.key.toLowerCase() === "f") {
      orientation = orientation === "white" ? "black" : "white";
      renderBoard();
    }
  });

  renderTree();
  renderBoard();
})();
`;return{html:ie,script:oe}}async function rr(r,t){let e=r.trim().split(`
`),n="r1bqk2r/pp2bppp/2n1p3/2ppP3/3P4/2PB1N2/P1P2PPP/R1BQK2R w KQkq - 0 8",s="white",i="",a="",c="",p="",{sets:h,default:b}=await Ae(),{themes:P,default:m}=await $e(),y=await he("chess.pieceSet",b),C=await he("chess.boardTheme",m),B=y,M=C,G=!1,_=!1;for(let f of e){let $=f.trim();$.startsWith("fen:")?n=$.replace("fen:","").trim():$.startsWith("turn:")?s=$.replace("turn:","").trim().toLowerCase():$.startsWith("solution:")?i=$.replace("solution:","").trim():$.startsWith("hint:")?a=$.replace("hint:","").trim():$.startsWith("themes:")?c=$.replace("themes:","").trim():$.startsWith("rating:")?p=$.replace("rating:","").trim():$.startsWith("pieceSet:")||$.startsWith("pieces:")?(B=$.replace(/(pieceSet|pieces):/,"").trim(),G=!0):($.startsWith("boardTheme:")||$.startsWith("theme:")||$.startsWith("board:"))&&(M=$.replace(/(boardTheme|theme|board):/,"").trim(),_=!0)}try{new H(n)}catch(f){return{html:qe("FEN c\u1EE7a b\xE0i t\u1EADp kh\xF4ng h\u1EE3p l\u1EC7",`Kh\xF4ng th\u1EC3 \u0111\u1ECDc chu\u1ED7i FEN: "${n}". ${f instanceof Error?f.message:""}`.trim())}}if(!i)return{html:qe("B\xE0i t\u1EADp thi\u1EBFu \u0111\xE1p \xE1n",'C\u1EA7n khai b\xE1o d\xF2ng "solution: ..." (c\xE1c n\u01B0\u1EDBc \u0111i SAN c\xE1ch nhau b\u1EB1ng d\u1EA5u c\xE1ch) \u0111\u1EC3 c\xF3 th\u1EC3 ch\u1EA5m \u0111\xFAng/sai.')};let J=i.split(" ").map(f=>f.trim()).filter(Boolean),k=`chess_puzzle_${Math.random().toString(36).substring(2,9)}`,X=await ue(M),D=`
<style>${pe}</style>
<div class="chessnote-container" id="${k}" style="${await de(X)}">
  ${st(k)}
  <div class="chess-header">
    <div class="chess-title">Tactics Puzzle ${p?"\u2022 Rating: "+R(p):""}</div>
    <div class="chess-subtitle">${s==="white"?"\u26AA White to move":"\u26AB Black to move"} ${c?"\u2022 "+R(c):""}</div>
  </div>
  <div class="chessnote-layout">
    <div class="chessnote-board-wrapper">
      <div class="chess-board" id="${k}_board"></div>
    </div>
    <div class="chessnote-panel">
      <div class="chess-error-banner" id="${k}_error" style="display: none;"></div>
      <div class="puzzle-banner pending" id="${k}_status">
        <span>\u{1F914} ${s==="white"?"White":"Black"} to move and win!</span>
      </div>
      <div class="chess-controls">
        <button class="chess-btn" id="${k}_reset">\u{1F504} Reset Puzzle</button>
        <button class="chess-btn" id="${k}_theme_btn" title="Tu\u1EF3 ch\u1EC9nh b\xE0n c\u1EDD v\xE0 qu\xE2n c\u1EDD">\u{1F3A8} Theme</button>
        ${a?`<button class="chess-btn" id="${k}_hint_btn">\u{1F4A1} Hint</button>`:""}
        <button class="chess-btn" id="${k}_solution_btn">\u{1F441} Show Solution</button>
      </div>
      <div class="puzzle-hint-box" id="${k}_hint_box" style="display: none;">
        <strong>Hint:</strong> ${R(a)}
      </div>
      <div class="fen-footer">
        <span id="${k}_solution_display" style="display: none; color: #22c55e;"><strong>Solution:</strong> ${R(i)}</span>
      </div>
    </div>
  </div>
</div>
`,L=`
(function() {
  const PIECE_SETS = ${JSON.stringify(h)};
  const BOARD_THEMES = ${JSON.stringify(P)};
  const startFen = ${JSON.stringify(n)};
  const solutionMoves = ${JSON.stringify(J)};
  const orientation = ${JSON.stringify(s)};
  const hasExplicitPieceSet = ${JSON.stringify(G)};
  const hasExplicitBoardTheme = ${JSON.stringify(_)};

  let currentPieceSet = ${JSON.stringify(B)};
  let currentBoardTheme = ${JSON.stringify(M)};
  try {
    const defaultPiece = localStorage.getItem("chessnote_default_piece_set") || localStorage.getItem("chessnote_piece_set");
    const defaultBoard = localStorage.getItem("chessnote_default_board_theme") || localStorage.getItem("chessnote_board_theme");
    if (!hasExplicitPieceSet && defaultPiece && PIECE_SETS[defaultPiece]) currentPieceSet = defaultPiece;
    if (!hasExplicitBoardTheme && defaultBoard && BOARD_THEMES[defaultBoard]) currentBoardTheme = defaultBoard;
  } catch (_e) {}

  let currentFen = startFen;
  let currentStep = 0; // index into solutionMoves the solver must play next
  let selectedSquare = null;
  let legalMoves = [];
  let solved = false;
  let isBusy = false;

  const boardEl = document.getElementById("${k}_board");
  const statusEl = document.getElementById("${k}_status");
  const errorEl = document.getElementById("${k}_error");
  const resetBtn = document.getElementById("${k}_reset");
  const hintBtn = document.getElementById("${k}_hint_btn");
  const hintBox = document.getElementById("${k}_hint_box");
  const solutionBtn = document.getElementById("${k}_solution_btn");
  const solutionDisplay = document.getElementById("${k}_solution_display");

  const themeBtn = document.getElementById("${k}_theme_btn");
  const themeModal = document.getElementById("${k}_theme_modal");
  const themeCloseBtn = document.getElementById("${k}_theme_close");
  const pieceSelect = document.getElementById("${k}_piece_select");
  const boardSelect = document.getElementById("${k}_board_select");
  const saveDefaultBtn = document.getElementById("${k}_save_default_btn");
  const resetDefaultBtn = document.getElementById("${k}_reset_default_btn");
  const themeStatus = document.getElementById("${k}_theme_status");

  if (pieceSelect) pieceSelect.value = currentPieceSet;
  if (boardSelect) boardSelect.value = currentBoardTheme;

  function applyTheme(boardKey, pieceKey, saveAsDefault = false) {
    if (BOARD_THEMES[boardKey]) currentBoardTheme = boardKey;
    if (PIECE_SETS[pieceKey]) currentPieceSet = pieceKey;
    try {
      localStorage.setItem("chessnote_piece_set", currentPieceSet);
      localStorage.setItem("chessnote_board_theme", currentBoardTheme);
      if (saveAsDefault) {
        localStorage.setItem("chessnote_default_piece_set", currentPieceSet);
        localStorage.setItem("chessnote_default_board_theme", currentBoardTheme);
      }
    } catch (_e) {}

    const theme = BOARD_THEMES[currentBoardTheme] || BOARD_THEMES["textbook"];
    const container = document.getElementById("${k}");
    if (container) {
      container.style.setProperty("--sq-light", theme.light);
      container.style.setProperty("--sq-dark", theme.dark);
      container.style.setProperty("--board-border", theme.border);
      container.style.setProperty("--sq-select", theme.select);
      container.style.setProperty("--sq-highlight", theme.highlight);
      container.style.setProperty("--sq-dest", theme.dest);
    }
    renderBoard();
  }

  // Initial theme application
  applyTheme(currentBoardTheme, currentPieceSet, false);

  if (themeBtn && themeModal) {
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeModal.style.display = themeModal.style.display === "none" ? "flex" : "none";
    });
  }
  if (themeCloseBtn && themeModal) {
    themeCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeModal.style.display = "none";
    });
  }
  if (pieceSelect) {
    pieceSelect.addEventListener("change", (e) => {
      applyTheme(boardSelect ? boardSelect.value : currentBoardTheme, e.target.value, false);
    });
  }
  if (boardSelect) {
    boardSelect.addEventListener("change", (e) => {
      applyTheme(e.target.value, pieceSelect ? pieceSelect.value : currentPieceSet, false);
    });
  }
  if (saveDefaultBtn) {
    saveDefaultBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const p = pieceSelect ? pieceSelect.value : currentPieceSet;
      const b = boardSelect ? boardSelect.value : currentBoardTheme;
      applyTheme(b, p, true);
      try {
        window.dispatchEvent(new CustomEvent("chessnote_theme_changed", {
          detail: { pieceSet: p, boardTheme: b }
        }));
      } catch (_e) {}
      if (themeStatus) {
        themeStatus.textContent = "\u2713 \u0110\xE3 l\u01B0u l\xE0m m\u1EB7c \u0111\u1ECBnh cho m\u1ECDi t\xE0i li\u1EC7u!";
        themeStatus.style.display = "block";
        setTimeout(() => { themeStatus.style.display = "none"; }, 3000);
      }
    });
  }
  if (resetDefaultBtn) {
    resetDefaultBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      try {
        localStorage.removeItem("chessnote_default_piece_set");
        localStorage.removeItem("chessnote_default_board_theme");
        localStorage.removeItem("chessnote_piece_set");
        localStorage.removeItem("chessnote_board_theme");
      } catch (_e) {}
      if (pieceSelect) pieceSelect.value = "merida";
      if (boardSelect) boardSelect.value = "textbook";
      applyTheme("textbook", "merida", false);
      try {
        window.dispatchEvent(new CustomEvent("chessnote_theme_changed", {
          detail: { pieceSet: "merida", boardTheme: "textbook" }
        }));
      } catch (_e) {}
      if (themeStatus) {
        themeStatus.textContent = "\u2713 \u0110\xE3 kh\xF4i ph\u1EE5c chu\u1EA9n Textbook & Merida!";
        themeStatus.style.display = "block";
        setTimeout(() => { themeStatus.style.display = "none"; }, 3000);
      }
    });
  }

  window.addEventListener("chessnote_theme_changed", (e) => {
    if (!e || !e.detail) return;
    if (!hasExplicitBoardTheme && e.detail.boardTheme) {
      currentBoardTheme = e.detail.boardTheme;
      if (boardSelect) boardSelect.value = currentBoardTheme;
    }
    if (!hasExplicitPieceSet && e.detail.pieceSet) {
      currentPieceSet = e.detail.pieceSet;
      if (pieceSelect) pieceSelect.value = currentPieceSet;
    }
    applyTheme(currentBoardTheme, currentPieceSet, false);
  });

  function showError(msg) {
    if (!msg) { errorEl.style.display = "none"; return; }
    errorEl.textContent = "\u26A0\uFE0F " + msg;
    errorEl.style.display = "block";
  }

  function sameSan(a, b) {
    return a.replace(/[+#]+$/, "") === b.replace(/[+#]+$/, "");
  }

  function parseFenBoard(f) {
    const parts = f.split(" ");
    const rows = parts[0].split("/");
    const board = {};
    for (let r = 0; r < 8; r++) {
      let col = 0;
      for (const ch of rows[r]) {
        if (!isNaN(ch)) {
          col += parseInt(ch, 10);
        } else {
          const file = String.fromCharCode(97 + col);
          const rank = 8 - r;
          const isWhite = ch === ch.toUpperCase();
          board[file + rank] = (isWhite ? "w" : "b") + ch.toUpperCase();
          col++;
        }
      }
    }
    return board;
  }

  function askPromotion(moverColor) {
    return new Promise((resolve) => {
      const picker = document.createElement("div");
      picker.className = "promotion-picker";
      const currentPieces = PIECE_SETS[currentPieceSet] || PIECE_SETS["merida"];
      ["q", "r", "b", "n"].forEach((p) => {
        const btn = document.createElement("button");
        btn.innerHTML = currentPieces[moverColor + p.toUpperCase()] || p;
        btn.addEventListener("click", () => {
          picker.remove();
          resolve(p);
        });
        picker.appendChild(btn);
      });
      boardEl.parentElement.appendChild(picker);
    });
  }

  function renderBoard() {
    boardEl.innerHTML = "";
    const boardState = parseFenBoard(currentFen);
    const files = orientation === "white" ? ["a","b","c","d","e","f","g","h"] : ["h","g","f","e","d","c","b","a"];
    const ranks = orientation === "white" ? [8,7,6,5,4,3,2,1] : [1,2,3,4,5,6,7,8];
    const destSquares = {};
    legalMoves.forEach((m) => { destSquares[m.to] = m; });
    const currentPieces = PIECE_SETS[currentPieceSet] || PIECE_SETS["merida"];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const file = files[c];
        const rank = ranks[r];
        const sq = file + rank;
        const isLight = (file.charCodeAt(0) - 97 + rank) % 2 !== 0;

        const sqDiv = document.createElement("div");
        sqDiv.className = "chess-sq " + (isLight ? "light" : "dark");
        sqDiv.dataset.sq = sq;

        if (selectedSquare === sq) {
          sqDiv.classList.add("selected");
        }
        if (destSquares[sq]) {
          sqDiv.classList.add("dest");
          if (boardState[sq]) sqDiv.classList.add("has-piece");
        }

        if (boardState[sq]) {
          const piece = boardState[sq];
          const pieceDiv = document.createElement("div");
          pieceDiv.className = "chess-piece";
          pieceDiv.innerHTML = currentPieces[piece] || "";
          sqDiv.appendChild(pieceDiv);
        }

        if (c === 7) {
          const rankLabel = document.createElement("span");
          rankLabel.className = "chess-coord coord-rank";
          rankLabel.innerText = rank;
          sqDiv.appendChild(rankLabel);
        }
        if (r === 7) {
          const fileLabel = document.createElement("span");
          fileLabel.className = "chess-coord coord-file";
          fileLabel.innerText = file;
          sqDiv.appendChild(fileLabel);
        }

        sqDiv.addEventListener("click", () => handleSquareClick(sq, boardState));
        boardEl.appendChild(sqDiv);
      }
    }
  }

  async function playOpponentReply() {
    if (currentStep >= solutionMoves.length) return;
    const san = solutionMoves[currentStep];
    const result = await syscall("chess.applySan", currentFen, san);
    if (result && result.error) {
      // Solution data itself is malformed \u2014 surface it instead of silently
      // getting stuck.
      showError("D\u1EEF li\u1EC7u \u0111\xE1p \xE1n b\u1ECB l\u1ED7i \u1EDF n\u01B0\u1EDBc \\"" + san + "\\": " + result.error);
      return;
    }
    currentFen = result.fen;
    currentStep++;
    renderBoard();
  }

  async function handleSquareClick(sq, boardState) {
    if (isBusy || solved) return;

    const attemptedMove = selectedSquare ? legalMoves.find((m) => m.to === sq) : null;
    if (selectedSquare && attemptedMove) {
      const from = selectedSquare;
      isBusy = true;
      selectedSquare = null;
      legalMoves = [];
      try {
        let promotion = undefined;
        if (attemptedMove.promotion) {
          const moverColor = currentFen.split(" ")[1] === "w" ? "w" : "b";
          promotion = await askPromotion(moverColor);
        }
        const result = await syscall("chess.applyMove", currentFen, from, sq, promotion);
        if (result && result.error) {
          renderBoard();
          return;
        }
        const expected = solutionMoves[currentStep];
        if (!expected || !sameSan(result.san, expected)) {
          statusEl.className = "puzzle-banner wrong";
          statusEl.innerHTML = "<span>\u274C Ch\u01B0a \u0111\xFAng, th\u1EED l\u1EA1i (n\u01B0\u1EDBc v\u1EEBa \u0111i s\u1EBD kh\xF4ng \u0111\u01B0\u1EE3c t\xEDnh).</span>";
          renderBoard();
          return;
        }

        // Correct: commit the move, then auto-play any forced opponent reply.
        currentFen = result.fen;
        currentStep++;
        showError(null);

        if (currentStep >= solutionMoves.length) {
          solved = true;
          statusEl.className = "puzzle-banner correct";
          statusEl.innerHTML = "<span>\u{1F389} Ch\xEDnh x\xE1c! B\u1EA1n \u0111\xE3 gi\u1EA3i xong b\xE0i t\u1EADp.</span>";
          renderBoard();
          return;
        }

        statusEl.className = "puzzle-banner correct";
        statusEl.innerHTML = "<span>\u2705 \u0110\xFAng! \u0110\u1ED1i ph\u01B0\u01A1ng \u0111ang \u0111i ti\u1EBFp...</span>";
        renderBoard();
        await new Promise((r) => setTimeout(r, 500));
        await playOpponentReply();
        if (currentStep >= solutionMoves.length) {
          solved = true;
          statusEl.className = "puzzle-banner correct";
          statusEl.innerHTML = "<span>\u{1F389} Ch\xEDnh x\xE1c! B\u1EA1n \u0111\xE3 gi\u1EA3i xong b\xE0i t\u1EADp.</span>";
        } else {
          statusEl.className = "puzzle-banner pending";
          statusEl.innerHTML = "<span>\u{1F914} Ti\u1EBFp t\u1EE5c n\xE0o!</span>";
        }
      } finally {
        isBusy = false;
      }
      return;
    }

    if (selectedSquare === sq) {
      selectedSquare = null;
      legalMoves = [];
      renderBoard();
      return;
    }

    if (!boardState[sq]) {
      selectedSquare = null;
      legalMoves = [];
      renderBoard();
      return;
    }

    const activeColor = currentFen.split(" ")[1] === "w" ? "w" : "b";
    if (boardState[sq][0] !== activeColor) {
      selectedSquare = null;
      legalMoves = [];
      renderBoard();
      return;
    }

    selectedSquare = sq;
    isBusy = true;
    try {
      legalMoves = await syscall("chess.legalMoves", currentFen, sq) || [];
    } finally {
      isBusy = false;
    }
    renderBoard();
  }

  resetBtn.addEventListener("click", () => {
    currentFen = startFen;
    currentStep = 0;
    selectedSquare = null;
    legalMoves = [];
    solved = false;
    showError(null);
    statusEl.className = "puzzle-banner pending";
    statusEl.innerHTML = "<span>\u{1F914} Puzzle reset. Find the best move!</span>";
    renderBoard();
  });

  if (hintBtn && hintBox) {
    hintBtn.addEventListener("click", () => {
      hintBox.style.display = hintBox.style.display === "none" ? "block" : "none";
    });
  }

  solutionBtn.addEventListener("click", () => {
    solutionDisplay.style.display = "inline";
    solutionBtn.innerText = "\u2713 Solution Shown";
  });

  renderBoard();
})();
`;return{html:D,script:L}}var nr={indexChessGames:Ht,deleteChessGamesForPage:jt,fenWidget:er,pgnWidget:tr,puzzleWidget:rr,chessLegalMoves:Jt,chessApplyMove:Xt,chessApplySan:Zt,chessRenderStaticBoardHtml:Wt,chessGetCss:Qt,chessExtractChessGames:rt,chessTextExtractKeywords:Ft,chessIsRepertoirePage:nt},sr={name:"chess",functions:{indexChessGames:{path:"./index.ts:indexChessGames",events:["page:index"]},deleteChessGamesForPage:{path:"./index.ts:deleteChessGamesForPage",events:["page:deleted"]},fenWidget:{path:"./chess.ts:fenWidget",codeWidget:"fen",renderMode:"iframe"},pgnWidget:{path:"./chess.ts:pgnWidget",codeWidget:"pgn",renderMode:"iframe"},puzzleWidget:{path:"./chess.ts:puzzleWidget",codeWidget:"puzzle",renderMode:"iframe"},chessLegalMoves:{path:"./chess.ts:legalMoves",syscall:{name:"chess.legalMoves",description:"Legal destination squares for the piece on a given square in a FEN position.",parameters:[{name:"fen",type:"string"},{name:"square",type:"string"}],returns:[{type:"array"}]}},chessApplyMove:{path:"./chess.ts:applyMove",syscall:{name:"chess.applyMove",description:"Applies a from/to (+ optional promotion) move to a FEN position using chess.js.",parameters:[{name:"fen",type:"string"},{name:"from",type:"string"},{name:"to",type:"string"},{name:"promotion",type:"string"}],returns:[{type:"object"}]}},chessApplySan:{path:"./chess.ts:applySan",syscall:{name:"chess.applySan",description:"Applies a move given in SAN notation to a FEN position using chess.js.",parameters:[{name:"fen",type:"string"},{name:"san",type:"string"}],returns:[{type:"object"}]}},chessRenderStaticBoardHtml:{path:"./board_renderer.ts:renderStaticBoardHtml",syscall:{name:"chess.renderStaticBoardHtml",description:"A fully static rendering of a FEN position (every square/piece baked into the returned HTML, no iframe/interactivity) \u2014 used by chess-pdf-export for print output.",parameters:[{name:"fen",type:"string"},{name:"opts",type:"object"}],returns:[{type:"string"}]}},chessGetCss:{path:"./board_renderer.ts:getChessCss",syscall:{name:"chess.getCss",description:"The shared CSS for chessnote-container/chess-board markup.",returns:[{type:"string"}]}},chessExtractChessGames:{path:"./index.ts:extractChessGames",syscall:{name:"chess.extractChessGames",description:"Extracts one chess-game object per ```pgn``` code block found on a page's parse tree \u2014 the same header-parsing logic the page:index indexer itself uses.",parameters:[{name:"pageName",type:"string"},{name:"tree",type:"object"}],returns:[{type:"array"}]}},chessTextExtractKeywords:{path:"./text_normalize.ts:extractKeywords",syscall:{name:"chess.textExtractKeywords",description:"Normalizes (strip diacritics, lowercase) and tokenizes a Vietnamese question into search keywords, dropping common stopwords \u2014 used to keep search-side tokenization identical to the FTS5 index-side one.",parameters:[{name:"question",type:"string"}],returns:[{type:"array"}]}},chessIsRepertoirePage:{path:"./index.ts:isRepertoirePage",syscall:{name:"chess.isRepertoirePage",description:"True if a page's frontmatter marks it as an opening-repertoire page (`tags: repertoire`) rather than a real played game.",parameters:[{name:"frontmatter",type:"object"}],returns:[{type:"boolean"}]}}},assets:{}},ao={manifest:sr,functionMapping:nr};Bt(nr,sr,self.postMessage);export{ao as plug};
/*! Bundled license information:

chess.js/dist/esm/chess.js:
  (**
   * @license
   * Copyright (c) 2025, Jeff Hlywa (jhlywa@gmail.com)
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice,
   *    this list of conditions and the following disclaimer.
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   *    this list of conditions and the following disclaimer in the documentation
   *    and/or other materials provided with the distribution.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
   * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
   * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
   * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
   * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
   * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   * POSSIBILITY OF SUCH DAMAGE.
   *)
*/
//# sourceMappingURL=chess.plug.js.map
