"use strict";var T=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var O=Object.prototype.hasOwnProperty;var b=(r,e)=>{for(var t in e)T(r,t,{get:e[t],enumerable:!0})},v=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of x(e))!O.call(r,s)&&s!==t&&T(r,s,{get:()=>e[s],enumerable:!(n=q(e,s))||n.enumerable});return r};var H=r=>v(T({},"__esModule",{value:!0}),r);var w={};b(w,{HttpClient:()=>l,HttpMethod:()=>m,ResponseType:()=>g,RestyConfigError:()=>u,RestyError:()=>c,RestyHttpError:()=>B,_HttpClient:()=>d,fetchAdapter:()=>P});module.exports=H(w);var P=async r=>{let e=await fetch(r.url,{method:r.method,headers:r.headers,body:r.body}),t,n=!1,s,o,i={};for(let[p,R]of e.headers.entries())i[p]??=[],i[p].push(R);return{status:e.status,headers:i,ok:e.ok,async json(){return n===!1&&(t=await e.json(),n=!0),t},async text(){return s===void 0&&(s=await e.text()),s??""},async buffer(){return o===void 0&&(o=Buffer.from(await e.arrayBuffer())),o??Buffer.alloc(0)}}};var m=(o=>(o.Get="GET",o.Post="POST",o.Put="PUT",o.Patch="PATCH",o.Delete="DELETE",o))(m||{}),g=(n=>(n.Json="json",n.Text="text",n.Buffer="buffer",n))(g||{});var h=class{static async parse(e,t){switch(t){case"text":return await e.text();case"buffer":return await e.buffer();case"json":default:return await e.json()}}};var y=class{constructor(e){this.defaultHeaders=e}normalize(e){return{query:this.normalizeQuery(e.query),headers:this.normalizeHeaders(e.headers),body:e.body,responseType:e.responseType??"json"}}normalizeHeaders(e){return{...this.defaultHeaders,...e??{}}}normalizeQuery(e){if(!e)return new URLSearchParams;if(e instanceof URLSearchParams)return new URLSearchParams(e);let t=new URLSearchParams;for(let[n,s]of Object.entries(e))if(Array.isArray(s))for(let o of s)t.append(n,o);else t.append(n,s);return t}};var c=class extends Error{code;cause;constructor(e,t="RESTY_ERROR",n){super(e),this.name="RestyError",this.code=t,this.cause=n,Object.setPrototypeOf(this,new.target.prototype)}},u=class r extends c{constructor(e,t){super(e,"RESTY_CONFIG_ERROR",t),this.name="RestyConfigError"}static invalidBaseUrl(e){return new r(`[resty] Invalid baseUrl: "${e}"

Expected a valid URL.

Example:
  https://api.com/v1/`)}static missingTrailingSlash(e){return new r(`[resty] baseUrl must end with "/" when baseUrl has a pathname.

Received: "${e}"

Fix:
  https://api.com/v1/`)}static invalidPathWithBase(e,t){return new r(`[resty] Invalid path: "${t}"

When baseUrl contains a pathname, path must NOT start with "/".

baseUrl: ${e}

Reason:
  "/path" overrides base pathname in URL()

Fix:
  use "users" instead of "/users"

See: https://github.com/yukiakai212/resty/issues/1`)}static baseUrlContainsQuery(e){return new r(`[resty] baseUrl must NOT contain query string.

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
  })`)}static unsupportedProtocol(e,t){return new r(`[resty] Unsupported URL protocol.

Received: "${e}"
`+(t?`Protocol: "${t}"

`:`
`)+'Only "http:" and "https:" are supported.')}static endpointContainsQuery(e){return new r(`[resty] Endpoint must NOT contain query string.

Received: "${e}"

`)}},B=class extends c{status;headers;data;constructor(e,t,n,s){super(e,"RESTY_HTTP_ERROR"),this.name="RestyHttpError",this.status=t,this.headers=n,this.data=s}};var f=class{constructor(e){this.baseUrl=e;let t=new URL(e);if(this.hasPathname=t.pathname!=="/"&&t.pathname!=="",this.hasPathname&&!t.pathname.endsWith("/"))throw u.missingTrailingSlash(e);if(t.search)throw u.baseUrlContainsQuery(this.baseUrl);this.assertHttpProtocol(e)}hasPathname;resolve(e,t){if(e.includes("?")||e.includes("&"))throw u.endpointContainsQuery(e);if(this.hasPathname&&e.startsWith("/"))throw u.invalidPathWithBase(this.baseUrl,e);let n=this.isAbsoluteUrl(e);n&&this.assertHttpProtocol(e);let s=n?new URL(e):new URL(e,this.baseUrl),o=t.entries();for(let[i,p]of o)p!=null&&(Array.isArray(p)?p.forEach(R=>s.searchParams.append(i,String(R))):s.searchParams.has(i)?s.searchParams.append(i,String(p)):s.searchParams.set(i,String(p)));return s.href}assertHttpProtocol(e){let t=new URL(e);if(!(t.protocol==="http:"||t.protocol==="https:"))throw u.unsupportedProtocol(e,t.protocol)}isAbsoluteUrl(e){try{return new URL(e),!0}catch{return!1}}};var d=class{constructor(e,t,n){this.adapter=e;this.baseUrl=t;this.defaultHeaders=n;this.urlResolver=new f(t),this.requestOptionsNormalizer=new y(n)}urlResolver;requestOptionsNormalizer;async request(e,t,n){let s=this.requestOptionsNormalizer.normalize(n),o=this.urlResolver.resolve(t,s.query),i=await this.adapter({url:o,method:e,headers:s.headers,body:s.body});return await h.parse(i,s.responseType)}get(e,t){return this.request("GET",e,t)}post(e,t){return this.request("POST",e,t)}put(e,t){return this.request("PUT",e,t)}patch(e,t){return this.request("PATCH",e,t)}delete(e,t){return this.request("DELETE",e,t)}};var l=class extends d{constructor(e,t,n={}){super(e,t,n)}get(e,t={}){return super.get(e,t)}post(e,t={}){return super.post(e,t)}put(e,t={}){return super.put(e,t)}patch(e,t={}){return super.patch(e,t)}delete(e,t={}){return super.delete(e,t)}getTextResponse(e,t={}){return this.get(e,{...t,responseType:"text"})}getBufferResponse(e,t={}){return this.get(e,{...t,responseType:"buffer"})}postTextResponse(e,t={}){return this.post(e,{...t,responseType:"text"})}postBufferResponse(e,t={}){return this.post(e,{...t,responseType:"buffer"})}putTextResponse(e,t={}){return this.put(e,{...t,responseType:"text"})}putBufferResponse(e,t={}){return this.put(e,{...t,responseType:"buffer"})}patchTextResponse(e,t={}){return this.patch(e,{...t,responseType:"text"})}patchBufferResponse(e,t={}){return this.patch(e,{...t,responseType:"buffer"})}deleteTextResponse(e,t={}){return this.delete(e,{...t,responseType:"text"})}deleteBufferResponse(e,t={}){return this.delete(e,{...t,responseType:"buffer"})}};0&&(module.exports={HttpClient,HttpMethod,ResponseType,RestyConfigError,RestyError,RestyHttpError,_HttpClient,fetchAdapter});
