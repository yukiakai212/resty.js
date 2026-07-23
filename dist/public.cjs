"use strict";var R=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var q=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var b=(s,e)=>{for(var t in e)R(s,t,{get:e[t],enumerable:!0})},P=(s,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of q(e))!x.call(s,n)&&n!==t&&R(s,n,{get:()=>e[n],enumerable:!(r=B(e,n))||r.enumerable});return s};var w=s=>P(R({},"__esModule",{value:!0}),s);var v={};b(v,{HttpClient:()=>l,HttpMethod:()=>T,ResponseType:()=>m,RestyConfigError:()=>u,RestyError:()=>d,RestyHttpError:()=>g,fetchAdapter:()=>O});module.exports=w(v);var O=async s=>{let e=await fetch(s.url,{method:s.method,headers:s.headers,body:s.body}),t,r=!1,n,o,a={};for(let[i,y]of e.headers.entries())a[i]??=[],a[i].push(y);return{status:e.status,headers:a,ok:e.ok,async json(){return r===!1&&(t=await e.json(),r=!0),t},async text(){return n===void 0&&(n=await e.text()),n??""},async buffer(){return o===void 0&&(o=Buffer.from(await e.arrayBuffer())),o??Buffer.alloc(0)}}};var T=(o=>(o.Get="GET",o.Post="POST",o.Put="PUT",o.Patch="PATCH",o.Delete="DELETE",o))(T||{}),m=(r=>(r.Json="json",r.Text="text",r.Buffer="buffer",r))(m||{});var c=class{static async parse(e,t){switch(t){case"text":return await e.text();case"buffer":return await e.buffer();case"json":default:return await e.json()}}};var h=class{constructor(e={}){this.defaultHeaders=e}normalize(e){return{query:this.normalizeQuery(e.query),headers:this.normalizeHeaders(e.headers),body:e.body,responseType:e.responseType??"json"}}normalizeHeaders(e){return{...this.defaultHeaders,...e??{}}}normalizeQuery(e){if(!e)return new URLSearchParams;if(e instanceof URLSearchParams)return new URLSearchParams(e);let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let o of n)t.append(r,o);else t.append(r,n);return t}};var d=class extends Error{code;cause;constructor(e,t="RESTY_ERROR",r){super(e),this.name="RestyError",this.code=t,this.cause=r,Object.setPrototypeOf(this,new.target.prototype)}},u=class s extends d{constructor(e,t){super(e,"RESTY_CONFIG_ERROR",t),this.name="RestyConfigError"}static invalidBaseUrl(e){return new s(`[resty] Invalid baseUrl: "${e}"

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

`)}},g=class extends d{status;headers;data;constructor(e,t,r,n){super(e,"RESTY_HTTP_ERROR"),this.name="RestyHttpError",this.status=t,this.headers=r,this.data=n}};var f=class{constructor(e){this.baseUrl=e;let t=new URL(e);if(this.hasPathname=t.pathname!=="/"&&t.pathname!=="",this.hasPathname&&!t.pathname.endsWith("/"))throw u.missingTrailingSlash(e);if(t.search)throw u.baseUrlContainsQuery(this.baseUrl);this.assertHttpProtocol(e)}hasPathname;resolve(e,t){if(e.includes("?")||e.includes("&"))throw u.endpointContainsQuery(e);if(this.hasPathname&&e.startsWith("/"))throw u.invalidPathWithBase(this.baseUrl,e);let r=this.isAbsoluteUrl(e);r&&this.assertHttpProtocol(e);let n=r?new URL(e):new URL(e,this.baseUrl);if(t){let o=t instanceof URLSearchParams?t.entries():Object.entries(t);for(let[a,i]of o)i!=null&&(Array.isArray(i)?i.forEach(y=>n.searchParams.append(a,String(y))):n.searchParams.has(a)?n.searchParams.append(a,String(i)):n.searchParams.set(a,String(i)))}return n.href}assertHttpProtocol(e){let t=new URL(e);if(!(t.protocol==="http:"||t.protocol==="https:"))throw u.unsupportedProtocol(e,t.protocol)}isAbsoluteUrl(e){try{return new URL(e),!0}catch{return!1}}};var l=class{constructor(e,t,r={}){this.adapter=e;this.baseUrl=t;this.defaultHeaders=r;this.urlResolver=new f(t),this.requestOptionsNormalizer=new h(r)}urlResolver;requestOptionsNormalizer;async request(e,t,r={}){let n=this.urlResolver.resolve(t,r.query),o=this.requestOptionsNormalizer.normalize(r),a=await this.adapter({url:n,method:e,headers:o.headers,body:o.body});return await c.parse(a,o.responseType)}get(e,t){return this.request("GET",e,t)}post(e,t){return this.request("POST",e,t)}put(e,t){return this.request("PUT",e,t)}patch(e,t){return this.request("PATCH",e,t)}delete(e,t){return this.request("DELETE",e,t)}getTextResponse(e,t){return this.get(e,{...t,responseType:"text"})}getBufferResponse(e,t){return this.get(e,{...t,responseType:"buffer"})}postTextResponse(e,t){return this.post(e,{...t,responseType:"text"})}postBufferResponse(e,t){return this.post(e,{...t,responseType:"buffer"})}putTextResponse(e,t){return this.put(e,{...t,responseType:"text"})}putBufferResponse(e,t){return this.put(e,{...t,responseType:"buffer"})}patchTextResponse(e,t){return this.patch(e,{...t,responseType:"text"})}patchBufferResponse(e,t){return this.patch(e,{...t,responseType:"buffer"})}deleteTextResponse(e,t){return this.delete(e,{...t,responseType:"text"})}deleteBufferResponse(e,t){return this.delete(e,{...t,responseType:"buffer"})}};0&&(module.exports={HttpClient,HttpMethod,ResponseType,RestyConfigError,RestyError,RestyHttpError,fetchAdapter});
