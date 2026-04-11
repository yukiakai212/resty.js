var p=class extends Error{code;cause;constructor(t,e="RESTY_ERROR",n){super(t),this.name="RestyError",this.code=e,this.cause=n,Object.setPrototypeOf(this,new.target.prototype)}},i=class r extends p{constructor(t,e){super(t,"RESTY_CONFIG_ERROR",e),this.name="RestyConfigError"}static invalidBaseUrl(t){return new r(`[resty] Invalid baseUrl: "${t}"

Expected a valid URL.

Example:
  https://api.com/v1/`)}static missingTrailingSlash(t){return new r(`[resty] baseUrl must end with "/" when baseUrl has a pathname.

Received: "${t}"

Fix:
  https://api.com/v1/`)}static invalidPathWithBase(t,e){return new r(`[resty] Invalid path: "${e}"

When baseUrl contains a pathname, path must NOT start with "/".

baseUrl: ${t}

Reason:
  "/path" overrides base pathname in URL()

Fix:
  use "users" instead of "/users"

See: https://github.com/yukiakai212/resty/issues/1`)}static baseUrlContainsQuery(t){return new r(`[resty] baseUrl must NOT contain query string.

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
  })`)}static unsupportedProtocol(t,e){return new r(`[resty] Unsupported URL protocol.

Received: "${t}"
`+(e?`Protocol: "${e}"

`:`
`)+'Only "http:" and "https:" are supported.')}static endpointContainsQuery(t){return new r(`[resty] Endpoint must NOT contain query string.

Received: "${t}"

`)}},f=class extends p{status;headers;data;constructor(t,e,n,s){super(t,"RESTY_HTTP_ERROR"),this.name="RestyHttpError",this.status=e,this.headers=n,this.data=s}};var l=class{constructor(t,e,n={}){this.adapter=t;this.baseUrl=e;this.defaultHeaders=n;let s=new URL(e);if(this.hasPathname=s.pathname!=="/"&&s.pathname!=="",this.hasPathname&&!s.pathname.endsWith("/"))throw i.missingTrailingSlash(e);if(s.search)throw i.baseUrlContainsQuery(this.baseUrl);this.assertHttpProtocol(e)}hasPathname;async request(t,e,n={}){let s=this.buildUrl(e,n.query),a=await this.adapter({url:s,method:t,headers:{...this.defaultHeaders,...n.headers},body:n.body});return this.parseBody(a,n.responseType)}buildUrl(t,e){if((t.includes("?")||t.includes("&"))&&console.warn("endpoint contain query string"),this.hasPathname&&t.startsWith("/"))throw i.invalidPathWithBase(this.baseUrl,t);let n=this.isAbsoluteUrl(t);n&&this.assertHttpProtocol(t);let s=n?new URL(t):new URL(t,this.baseUrl);if(e){let a=e instanceof URLSearchParams?e.entries():Object.entries(e);for(let[u,o]of a)o!=null&&(Array.isArray(o)?o.forEach(g=>s.searchParams.append(u,String(g))):s.searchParams.has(u)?s.searchParams.append(u,String(o)):s.searchParams.set(u,String(o)))}return s.href}async parseBody(t,e="json"){switch(e){case"text":return await t.text();case"buffer":return await t.buffer();case"json":default:return await t.json()}}assertHttpProtocol(t){let e=new URL(t);if(!(e.protocol==="http:"||e.protocol==="https:"))throw i.unsupportedProtocol(t,e.protocol)}isAbsoluteUrl(t){try{return new URL(t),!0}catch{return!1}}get(t,e){return this.request("GET",t,e)}post(t,e){return this.request("POST",t,e)}put(t,e){return this.request("PUT",t,e)}patch(t,e){return this.request("PATCH",t,e)}delete(t,e){return this.request("DELETE",t,e)}getTextResponse(t,e){return this.get(t,{...e,responseType:"text"})}getBufferResponse(t,e){return this.get(t,{...e,responseType:"buffer"})}postTextResponse(t,e){return this.post(t,{...e,responseType:"text"})}postBufferResponse(t,e){return this.post(t,{...e,responseType:"buffer"})}putTextResponse(t,e){return this.put(t,{...e,responseType:"text"})}putBufferResponse(t,e){return this.put(t,{...e,responseType:"buffer"})}patchTextResponse(t,e){return this.patch(t,{...e,responseType:"text"})}patchBufferResponse(t,e){return this.patch(t,{...e,responseType:"buffer"})}deleteTextResponse(t,e){return this.delete(t,{...e,responseType:"text"})}deleteBufferResponse(t,e){return this.delete(t,{...e,responseType:"buffer"})}};var x=async r=>{let t=await fetch(r.url,{method:r.method,headers:r.headers,body:r.body}),e,n,s;return{status:t.status,headers:Object.fromEntries(t.headers.entries()),ok:t.ok,async json(){return e===void 0&&(e=await t.json()),e},async text(){return n===void 0&&(n=await t.text()),n},async buffer(){return s||(s=Buffer.from(await t.arrayBuffer())),s}}};var c;async function y(){if(!c)try{c=(await import("got")).default}catch{throw new Error('Please install "got" to use gotAdapter')}return c}var v=async r=>{let e=await(await y())(r.url,{method:r.method,headers:r.headers,body:r.body,throwHttpErrors:!1}),n,s,a;return{status:e.statusCode,headers:e.headers,ok:e.statusCode>=200&&e.statusCode<300,async text(){return n===void 0&&(n=e.body),n},async json(){return s===void 0&&(s=JSON.parse(e.body)),s},async buffer(){return a||(a=Buffer.from(e.rawBody)),a}}};export{l as HttpClient,i as RestyConfigError,p as RestyError,f as RestyHttpError,x as fetchAdapter,v as gotAdapter};
