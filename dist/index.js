var p=class extends Error{code;cause;constructor(e,t="RESTY_ERROR",r){super(e),this.name="RestyError",this.code=t,this.cause=r,Object.setPrototypeOf(this,new.target.prototype)}},i=class n extends p{constructor(e,t){super(e,"RESTY_CONFIG_ERROR",t),this.name="RestyConfigError"}static invalidBaseUrl(e){return new n(`[resty] Invalid baseUrl: "${e}"

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

`)}},d=class extends p{status;headers;data;constructor(e,t,r,s){super(e,"RESTY_HTTP_ERROR"),this.name="RestyHttpError",this.status=t,this.headers=r,this.data=s}};var f=class{constructor(e,t,r={}){this.adapter=e;this.baseUrl=t;this.defaultHeaders=r;let s=new URL(t);if(this.hasPathname=s.pathname!=="/"&&s.pathname!=="",this.hasPathname&&!s.pathname.endsWith("/"))throw i.missingTrailingSlash(t);if(s.search)throw i.baseUrlContainsQuery(this.baseUrl);this.assertHttpProtocol(t)}hasPathname;async request(e,t,r={}){let s=this.buildUrl(t,r.query),u=await this.adapter({url:s,method:e,headers:{...this.defaultHeaders,...r.headers},body:r.body});return this.parseBody(u,r.responseType)}buildUrl(e,t){if((e.includes("?")||e.includes("&"))&&console.warn("endpoint contain query string"),this.hasPathname&&e.startsWith("/"))throw i.invalidPathWithBase(this.baseUrl,e);let r=this.isAbsoluteUrl(e);r&&this.assertHttpProtocol(e);let s=r?new URL(e):new URL(e,this.baseUrl);if(t){let u=t instanceof URLSearchParams?t.entries():Object.entries(t);for(let[o,a]of u)a!=null&&(Array.isArray(a)?a.forEach(l=>s.searchParams.append(o,String(l))):s.searchParams.has(o)?s.searchParams.append(o,String(a)):s.searchParams.set(o,String(a)))}return s.href}async parseBody(e,t="json"){switch(t){case"text":return await e.text();case"buffer":return await e.buffer();case"json":default:return await e.json()}}assertHttpProtocol(e){let t=new URL(e);if(!(t.protocol==="http:"||t.protocol==="https:"))throw i.unsupportedProtocol(e,t.protocol)}isAbsoluteUrl(e){try{return new URL(e),!0}catch{return!1}}get(e,t){return this.request("GET",e,t)}post(e,t){return this.request("POST",e,t)}put(e,t){return this.request("PUT",e,t)}patch(e,t){return this.request("PATCH",e,t)}delete(e,t){return this.request("DELETE",e,t)}getTextResponse(e,t){return this.get(e,{...t,responseType:"text"})}getBufferResponse(e,t){return this.get(e,{...t,responseType:"buffer"})}postTextResponse(e,t){return this.post(e,{...t,responseType:"text"})}postBufferResponse(e,t){return this.post(e,{...t,responseType:"buffer"})}putTextResponse(e,t){return this.put(e,{...t,responseType:"text"})}putBufferResponse(e,t){return this.put(e,{...t,responseType:"buffer"})}patchTextResponse(e,t){return this.patch(e,{...t,responseType:"text"})}patchBufferResponse(e,t){return this.patch(e,{...t,responseType:"buffer"})}deleteTextResponse(e,t){return this.delete(e,{...t,responseType:"text"})}deleteBufferResponse(e,t){return this.delete(e,{...t,responseType:"buffer"})}};var b=async n=>{let e=await fetch(n.url,{method:n.method,headers:n.headers,body:n.body}),t,r,s;return{status:e.status,headers:Object.fromEntries(e.headers.entries()),ok:e.ok,async json(){return t===void 0&&(t=await e.json()),t},async text(){return r===void 0&&(r=await e.text()),r},async buffer(){return s||(s=Buffer.from(await e.arrayBuffer())),s}}};export{f as HttpClient,i as RestyConfigError,p as RestyError,d as RestyHttpError,b as fetchAdapter};
