var q=async n=>{let e=await fetch(n.url,{method:n.method,headers:n.headers,body:n.body}),t,r=!1,s,o,i={};for(let[u,R]of e.headers.entries())i[u]??=[],i[u].push(R);return{status:e.status,headers:i,ok:e.ok,async json(){return r===!1&&(t=await e.json(),r=!0),t},async text(){return s===void 0&&(s=await e.text()),s??""},async buffer(){return o===void 0&&(o=Buffer.from(await e.arrayBuffer())),o??Buffer.alloc(0)}}};var m=(o=>(o.Get="GET",o.Post="POST",o.Put="PUT",o.Patch="PATCH",o.Delete="DELETE",o))(m||{}),g=(r=>(r.Json="json",r.Text="text",r.Buffer="buffer",r))(g||{});var h=class{static async parse(e,t){switch(t){case"text":return await e.text();case"buffer":return await e.buffer();case"json":default:return await e.json()}}};var y=class{constructor(e){this.defaultHeaders=e}normalize(e){return{query:this.normalizeQuery(e.query),headers:this.normalizeHeaders(e.headers),body:e.body,responseType:e.responseType??"json"}}normalizeHeaders(e){return{...this.defaultHeaders,...e??{}}}normalizeQuery(e){if(!e)return new URLSearchParams;if(e instanceof URLSearchParams)return new URLSearchParams(e);let t=new URLSearchParams;for(let[r,s]of Object.entries(e))if(Array.isArray(s))for(let o of s)t.append(r,o);else t.append(r,s);return t}};var f=class extends Error{code;cause;constructor(e,t="RESTY_ERROR",r){super(e),this.name="RestyError",this.code=t,this.cause=r,Object.setPrototypeOf(this,new.target.prototype)}},d=class n extends f{constructor(e,t){super(e,"RESTY_CONFIG_ERROR",t),this.name="RestyConfigError"}static invalidBaseUrl(e){return new n(`[resty] Invalid baseUrl: "${e}"

Expected a valid URL.

Example:
  https://api.com/v1/`)}static missingTrailingSlash(e){return new n(`[resty] baseUrl must end with "/" when baseUrl has a pathname.

Received: "${e}"

Fix:
  https://api.com/v1/`)}static invalidPathWithBase(e,t){return new n(`[resty] Invalid path: "${t}"

When baseUrl contains a pathname, path must NOT start with "/".

baseUrl: ${e}

Reason:
  "/path" overrides base pathname in URL()

Fix:
  use "users" instead of "/users"

See: https://github.com/yukiakai212/resty/issues/1`)}static baseUrlContainsQuery(e){return new n(`[resty] baseUrl must NOT contain query string.

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
  })`)}static unsupportedProtocol(e,t){return new n(`[resty] Unsupported URL protocol.

Received: "${e}"
`+(t?`Protocol: "${t}"

`:`
`)+'Only "http:" and "https:" are supported.')}static endpointContainsQuery(e){return new n(`[resty] Endpoint must NOT contain query string.

Received: "${e}"

`)}},B=class extends f{status;headers;data;constructor(e,t,r,s){super(e,"RESTY_HTTP_ERROR"),this.name="RestyHttpError",this.status=t,this.headers=r,this.data=s}};var l=class{constructor(e){this.baseUrl=e;let t=new URL(e);if(this.hasPathname=t.pathname!=="/"&&t.pathname!=="",this.hasPathname&&!t.pathname.endsWith("/"))throw d.missingTrailingSlash(e);if(t.search)throw d.baseUrlContainsQuery(this.baseUrl);this.assertHttpProtocol(e)}hasPathname;resolve(e,t){if(e.includes("?")||e.includes("&"))throw d.endpointContainsQuery(e);if(this.hasPathname&&e.startsWith("/"))throw d.invalidPathWithBase(this.baseUrl,e);let r=this.isAbsoluteUrl(e);r&&this.assertHttpProtocol(e);let s=r?new URL(e):new URL(e,this.baseUrl),o=t.entries();for(let[i,u]of o)u!=null&&(Array.isArray(u)?u.forEach(R=>s.searchParams.append(i,String(R))):s.searchParams.has(i)?s.searchParams.append(i,String(u)):s.searchParams.set(i,String(u)));return s.href}assertHttpProtocol(e){let t=new URL(e);if(!(t.protocol==="http:"||t.protocol==="https:"))throw d.unsupportedProtocol(e,t.protocol)}isAbsoluteUrl(e){try{return new URL(e),!0}catch{return!1}}};var c=class{constructor(e,t,r){this.adapter=e;this.baseUrl=t;this.defaultHeaders=r;this.urlResolver=new l(t),this.requestOptionsNormalizer=new y(r)}urlResolver;requestOptionsNormalizer;async request(e,t,r){let s=this.requestOptionsNormalizer.normalize(r),o=this.urlResolver.resolve(t,s.query),i=await this.adapter({url:o,method:e,headers:s.headers,body:s.body});return await h.parse(i,s.responseType)}get(e,t){return this.request("GET",e,t)}post(e,t){return this.request("POST",e,t)}put(e,t){return this.request("PUT",e,t)}patch(e,t){return this.request("PATCH",e,t)}delete(e,t){return this.request("DELETE",e,t)}};var T=class extends c{constructor(e,t,r={}){super(e,t,r)}get(e,t={}){return super.get(e,t)}post(e,t={}){return super.post(e,t)}put(e,t={}){return super.put(e,t)}patch(e,t={}){return super.patch(e,t)}delete(e,t={}){return super.delete(e,t)}getTextResponse(e,t={}){return this.get(e,{...t,responseType:"text"})}getBufferResponse(e,t={}){return this.get(e,{...t,responseType:"buffer"})}postTextResponse(e,t={}){return this.post(e,{...t,responseType:"text"})}postBufferResponse(e,t={}){return this.post(e,{...t,responseType:"buffer"})}putTextResponse(e,t={}){return this.put(e,{...t,responseType:"text"})}putBufferResponse(e,t={}){return this.put(e,{...t,responseType:"buffer"})}patchTextResponse(e,t={}){return this.patch(e,{...t,responseType:"text"})}patchBufferResponse(e,t={}){return this.patch(e,{...t,responseType:"buffer"})}deleteTextResponse(e,t={}){return this.delete(e,{...t,responseType:"text"})}deleteBufferResponse(e,t={}){return this.delete(e,{...t,responseType:"buffer"})}};export{T as HttpClient,m as HttpMethod,g as ResponseType,d as RestyConfigError,f as RestyError,B as RestyHttpError,c as _HttpClient,q as fetchAdapter};
