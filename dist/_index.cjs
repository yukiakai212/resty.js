"use strict";var R=Object.create;var d=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var b=Object.getPrototypeOf,w=Object.prototype.hasOwnProperty;var x=(s,t)=>{for(var e in t)d(s,e,{get:t[e],enumerable:!0})},g=(s,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of T(t))!w.call(s,r)&&r!==e&&d(s,r,{get:()=>t[r],enumerable:!(n=m(t,r))||n.enumerable});return s};var O=(s,t,e)=>(e=s!=null?R(b(s)):{},g(t||!s||!s.__esModule?d(e,"default",{value:s,enumerable:!0}):e,s)),q=s=>g(d({},"__esModule",{value:!0}),s);var B={};x(B,{HttpClient:()=>f,RestyConfigError:()=>a,RestyError:()=>u,RestyHttpError:()=>c,fetchAdapter:()=>v,gotAdapter:()=>P});module.exports=q(B);var u=class extends Error{code;cause;constructor(t,e="RESTY_ERROR",n){super(t),this.name="RestyError",this.code=e,this.cause=n,Object.setPrototypeOf(this,new.target.prototype)}},a=class s extends u{constructor(t,e){super(t,"RESTY_CONFIG_ERROR",e),this.name="RestyConfigError"}static invalidBaseUrl(t){return new s(`[resty] Invalid baseUrl: "${t}"

Expected a valid URL.

Example:
  https://api.com/v1/`)}static missingTrailingSlash(t){return new s(`[resty] baseUrl must end with "/" when baseUrl has a pathname.

Received: "${t}"

Fix:
  https://api.com/v1/`)}static invalidPathWithBase(t,e){return new s(`[resty] Invalid path: "${e}"

When baseUrl contains a pathname, path must NOT start with "/".

baseUrl: ${t}

Reason:
  "/path" overrides base pathname in URL()

Fix:
  use "users" instead of "/users"

See: https://github.com/yukiakai212/resty/issues/1`)}static baseUrlContainsQuery(t){return new s(`[resty] baseUrl must NOT contain query string.

Received: "${t}"

Reason:
  URL(path, base) will drop query string from baseUrl.

Fix:
  Move query to request options instead.

Example:
  https://api.com/v1?token=abc
  https://api.com/v1/

  http.get('users', {
    query: { token: 'abc' }
  })`)}static unsupportedProtocol(t,e){return new s(`[resty] Unsupported URL protocol.

Received: "${t}"
`+(e?`Protocol: "${e}"

`:`
`)+'Only "http:" and "https:" are supported.')}static endpointContainsQuery(t){return new s(`[resty] Endpoint must NOT contain query string.

Received: "${t}"

`)}},c=class extends u{status;headers;data;constructor(t,e,n,r){super(t,"RESTY_HTTP_ERROR"),this.name="RestyHttpError",this.status=e,this.headers=n,this.data=r}};var f=class{constructor(t,e,n={}){this.adapter=t;this.baseUrl=e;this.defaultHeaders=n;let r=new URL(e);if(this.hasPathname=r.pathname!=="/"&&r.pathname!=="",this.hasPathname&&!r.pathname.endsWith("/"))throw a.missingTrailingSlash(e);if(r.search)throw a.baseUrlContainsQuery(this.baseUrl);this.assertHttpProtocol(e)}hasPathname;async request(t,e,n={}){let r=this.buildUrl(e,n.query),i=await this.adapter({url:r,method:t,headers:{...this.defaultHeaders,...n.headers},body:n.body});return this.parseBody(i,n.responseType)}buildUrl(t,e){if((t.includes("?")||t.includes("&"))&&console.warn("endpoint contain query string"),this.hasPathname&&t.startsWith("/"))throw a.invalidPathWithBase(this.baseUrl,t);let n=this.isAbsoluteUrl(t);n&&this.assertHttpProtocol(t);let r=n?new URL(t):new URL(t,this.baseUrl);if(e){let i=e instanceof URLSearchParams?e.entries():Object.entries(e);for(let[p,o]of i)o!=null&&(Array.isArray(o)?o.forEach(y=>r.searchParams.append(p,String(y))):r.searchParams.has(p)?r.searchParams.append(p,String(o)):r.searchParams.set(p,String(o)))}return r.href}async parseBody(t,e="json"){switch(e){case"text":return await t.text();case"buffer":return await t.buffer();case"json":default:return await t.json()}}assertHttpProtocol(t){let e=new URL(t);if(!(e.protocol==="http:"||e.protocol==="https:"))throw a.unsupportedProtocol(t,e.protocol)}isAbsoluteUrl(t){try{return new URL(t),!0}catch{return!1}}get(t,e){return this.request("GET",t,e)}post(t,e){return this.request("POST",t,e)}put(t,e){return this.request("PUT",t,e)}patch(t,e){return this.request("PATCH",t,e)}delete(t,e){return this.request("DELETE",t,e)}getTextResponse(t,e){return this.get(t,{...e,responseType:"text"})}getBufferResponse(t,e){return this.get(t,{...e,responseType:"buffer"})}postTextResponse(t,e){return this.post(t,{...e,responseType:"text"})}postBufferResponse(t,e){return this.post(t,{...e,responseType:"buffer"})}putTextResponse(t,e){return this.put(t,{...e,responseType:"text"})}putBufferResponse(t,e){return this.put(t,{...e,responseType:"buffer"})}patchTextResponse(t,e){return this.patch(t,{...e,responseType:"text"})}patchBufferResponse(t,e){return this.patch(t,{...e,responseType:"buffer"})}deleteTextResponse(t,e){return this.delete(t,{...e,responseType:"text"})}deleteBufferResponse(t,e){return this.delete(t,{...e,responseType:"buffer"})}};var v=async s=>{let t=await fetch(s.url,{method:s.method,headers:s.headers,body:s.body}),e,n,r;return{status:t.status,headers:Object.fromEntries(t.headers.entries()),ok:t.ok,async json(){return e===void 0&&(e=await t.json()),e},async text(){return n===void 0&&(n=await t.text()),n},async buffer(){return r||(r=Buffer.from(await t.arrayBuffer())),r}}};var l;async function U(){if(!l)try{l=(await import("got")).default}catch{throw new Error('Please install "got" to use gotAdapter')}return l}var P=async s=>{let e=await(await U())(s.url,{method:s.method,headers:s.headers,body:s.body,throwHttpErrors:!1}),n,r,i;return{status:e.statusCode,headers:e.headers,ok:e.statusCode>=200&&e.statusCode<300,async text(){return n===void 0&&(n=e.body),n},async json(){return r===void 0&&(r=JSON.parse(e.body)),r},async buffer(){return i||(i=Buffer.from(e.rawBody)),i}}};0&&(module.exports={HttpClient,RestyConfigError,RestyError,RestyHttpError,fetchAdapter,gotAdapter});
