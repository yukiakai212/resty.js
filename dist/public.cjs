"use strict";var R=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var q=Object.prototype.hasOwnProperty;var x=(s,e)=>{for(var t in e)R(s,t,{get:e[t],enumerable:!0})},b=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of B(e))!q.call(s,r)&&r!==t&&R(s,r,{get:()=>e[r],enumerable:!(n=g(e,r))||n.enumerable});return s};var w=s=>b(R({},"__esModule",{value:!0}),s);var P={};x(P,{HttpClient:()=>l,HttpMethod:()=>T,RestyConfigError:()=>p,RestyError:()=>d,RestyHttpError:()=>m,fetchAdapter:()=>O});module.exports=w(P);var O=async s=>{let e=await fetch(s.url,{method:s.method,headers:s.headers,body:s.body}),t,n=!1,r,o,a={};for(let[i,y]of e.headers.entries())a[i]??=[],a[i].push(y);return{status:e.status,headers:a,ok:e.ok,async json(){return n===!1&&(t=await e.json(),n=!0),t},async text(){return r===void 0&&(r=await e.text()),r??""},async buffer(){return o===void 0&&(o=Buffer.from(await e.arrayBuffer())),o??Buffer.alloc(0)}}};var T=(o=>(o.Get="GET",o.Post="POST",o.Put="PUT",o.Patch="PATCH",o.Delete="DELETE",o))(T||{});var c=class{static async parse(e,t){switch(t){case"text":return await e.text();case"buffer":return await e.buffer();case"json":default:return await e.json()}}};var h=class{constructor(e={}){this.defaultHeaders=e}normalize(e){return{query:this.normalizeQuery(e.query),headers:this.normalizeHeaders(e.headers),body:e.body,responseType:e.responseType??"json"}}normalizeHeaders(e){return{...this.defaultHeaders,...e??{}}}normalizeQuery(e){if(!e)return new URLSearchParams;if(e instanceof URLSearchParams)return new URLSearchParams(e);let t=new URLSearchParams;for(let[n,r]of Object.entries(e))if(Array.isArray(r))for(let o of r)t.append(n,o);else t.append(n,r);return t}};var d=class extends Error{code;cause;constructor(e,t="RESTY_ERROR",n){super(e),this.name="RestyError",this.code=t,this.cause=n,Object.setPrototypeOf(this,new.target.prototype)}},p=class s extends d{constructor(e,t){super(e,"RESTY_CONFIG_ERROR",t),this.name="RestyConfigError"}static invalidBaseUrl(e){return new s(`[resty] Invalid baseUrl: "${e}"

Expected a valid URL.

Example:
  https://api.com/v1/`)}static missingTrailingSlash(e){return new s(`[resty] baseUrl must end with "/" when baseUrl has a pathname.

Received: "${e}"

Fix:
  https://api.com/v1/`)}static invalidPathWithBase(e,t){return new s(`[resty] Invalid path: "${t}"

When baseUrl contains a pathname, path must NOT start with "/".

baseUrl: ${e}

Reason:
  "/path" overrides base pathname in URL()

Fix:
  use "users" instead of "/users"

See: https://github.com/yukiakai212/resty/issues/1`)}static baseUrlContainsQuery(e){return new s(`[resty] baseUrl must NOT contain query string.

Received: "${e}"

Reason:
  URL(path, base) will drop query string from baseUrl.

Fix:
  Move query to request options instead.

Example:
  https://api.com/v1?token=abc
  https://api.com/v1/

  http.get('users', {
    query: { token: 'abc' }
  })`)}static unsupportedProtocol(e,t){return new s(`[resty] Unsupported URL protocol.

Received: "${e}"
`+(t?`Protocol: "${t}"

`:`
`)+'Only "http:" and "https:" are supported.')}static endpointContainsQuery(e){return new s(`[resty] Endpoint must NOT contain query string.

Received: "${e}"

`)}},m=class extends d{status;headers;data;constructor(e,t,n,r){super(e,"RESTY_HTTP_ERROR"),this.name="RestyHttpError",this.status=t,this.headers=n,this.data=r}};var f=class{constructor(e){this.baseUrl=e;let t=new URL(e);if(this.hasPathname=t.pathname!=="/"&&t.pathname!=="",this.hasPathname&&!t.pathname.endsWith("/"))throw p.missingTrailingSlash(e);if(t.search)throw p.baseUrlContainsQuery(this.baseUrl);this.assertHttpProtocol(e)}hasPathname;resolve(e,t){if(e.includes("?")||e.includes("&"))throw p.endpointContainsQuery(e);if(this.hasPathname&&e.startsWith("/"))throw p.invalidPathWithBase(this.baseUrl,e);let n=this.isAbsoluteUrl(e);n&&this.assertHttpProtocol(e);let r=n?new URL(e):new URL(e,this.baseUrl);if(t){let o=t instanceof URLSearchParams?t.entries():Object.entries(t);for(let[a,i]of o)i!=null&&(Array.isArray(i)?i.forEach(y=>r.searchParams.append(a,String(y))):r.searchParams.has(a)?r.searchParams.append(a,String(i)):r.searchParams.set(a,String(i)))}return r.href}assertHttpProtocol(e){let t=new URL(e);if(!(t.protocol==="http:"||t.protocol==="https:"))throw p.unsupportedProtocol(e,t.protocol)}isAbsoluteUrl(e){try{return new URL(e),!0}catch{return!1}}};var l=class{constructor(e,t,n={}){this.adapter=e;this.baseUrl=t;this.defaultHeaders=n;this.urlResolver=new f(t),this.requestOptionsNormalizer=new h(n)}urlResolver;requestOptionsNormalizer;async request(e,t,n={}){let r=this.urlResolver.resolve(t,n.query),o=this.requestOptionsNormalizer.normalize(n),a=await this.adapter({url:r,method:e,headers:o.headers,body:o.body});return await c.parse(a,o.responseType)}get(e,t){return this.request("GET",e,t)}post(e,t){return this.request("POST",e,t)}put(e,t){return this.request("PUT",e,t)}patch(e,t){return this.request("PATCH",e,t)}delete(e,t){return this.request("DELETE",e,t)}getTextResponse(e,t){return this.get(e,{...t,responseType:"text"})}getBufferResponse(e,t){return this.get(e,{...t,responseType:"buffer"})}postTextResponse(e,t){return this.post(e,{...t,responseType:"text"})}postBufferResponse(e,t){return this.post(e,{...t,responseType:"buffer"})}putTextResponse(e,t){return this.put(e,{...t,responseType:"text"})}putBufferResponse(e,t){return this.put(e,{...t,responseType:"buffer"})}patchTextResponse(e,t){return this.patch(e,{...t,responseType:"text"})}patchBufferResponse(e,t){return this.patch(e,{...t,responseType:"buffer"})}deleteTextResponse(e,t){return this.delete(e,{...t,responseType:"text"})}deleteBufferResponse(e,t){return this.delete(e,{...t,responseType:"buffer"})}};0&&(module.exports={HttpClient,HttpMethod,RestyConfigError,RestyError,RestyHttpError,fetchAdapter});
