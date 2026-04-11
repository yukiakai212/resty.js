# @yukiakai/resty

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

> A minimal, clean, and type-safe HTTP client for REST APIs.

`@yukiakai/resty` is a lightweight HTTP client designed specifically for RESTful APIs.
It provides a simple, predictable API with zero over-engineering — no streaming, no magic, just clean requests.

---

## Features

* Adapter-based (fetch, got, or custom)
* Type-safe (TypeScript first)
* Clean API (data-first, no `.json()` chaining)
* Lightweight & minimal
* Extensible (easy to add retry, middleware, etc.)
* REST-focused (no streaming, no complexity)

---

## Installation

```bash
npm install @yukiakai/resty
```

Optional (if using got adapter):

```bash
npm install got
```

---

## Quick Start

```ts
import { HttpClient, fetchAdapter } from '@yukiakai/resty';

const http = new HttpClient(fetchAdapter, 'https://api.example.com', {
  Authorization: 'Bearer token',
});

// JSON (default)
const user = await http.get<{ id: string }>('/users/1');

// Query
const users = await http.get('/users', {
  query: { page: 1, limit: 10 },
});

// Text
const html = await http.getText('/page');

// Buffer
const file = await http.getBuffer('/file.zip');

// POST
await http.post('/users', {
  body: JSON.stringify({ name: 'yuki' }),
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## API

See docs: [API Docs][api-docs-url]

### Core Methods

```ts
http.get<T>(path, options?)
http.post<T>(path, options?)
http.put<T>(path, options?)
http.patch<T>(path, options?)
http.delete<T>(path, options?)
```

### Sugar Methods

```ts
http.getTextResponse(path, options?)
http.getBufferResponse(path, options?)

...
```

---

## Request Options

```ts
type RequestOptions = {
  query?: Record<string, string | string[]> | URLSearchParams;
  headers?: Record<string, string>;
  body?: any;
  responseType?: 'json' | 'text' | 'buffer';
};
```

### Example

```ts
await http.get('/users', {
  query: { page: 1 },
  headers: { 'x-custom': '123' },
});
```

---

## Adapters

`@yukiakai/resty` uses adapters to support different HTTP clients.

### Fetch (built-in)

```ts
import { fetchAdapter } from '@yukiakai/resty';

const http = new HttpClient(fetchAdapter, baseUrl);
```

---

### Got (optional)

```ts
import { HttpClient } from '@yukiakai/resty';
import { gotAdapter } from '@yukiakai/resty/adapters/got';

const http = new HttpClient(gotAdapter, baseUrl);
```

> You must install `got` manually.

---

### Custom Adapter

```ts
import type { HttpAdapter } from '@yukiakai/resty';

const customAdapter: HttpAdapter = async (req) => {
  return {
    status: 200,
    headers: {},
    ok: true,
    json: async () => ({}),
    text: async () => '',
    buffer: async () => Buffer.from(''),
  };
};
```

---

## Query Handling

```ts
await http.get('/users', {
  query: {
    page: 1,
    tags: ['a', 'b'],
  },
});
```

→ Result:

```
/users?page=1&tags=a&tags=b
```

---

## Design Goals

* Keep API surface small
* Avoid unnecessary abstractions
* Make behavior predictable
* Optimize for developer experience (DX)

---

## Non-Goals

* Streaming APIs
* Multipart/form-data helpers
* Browser polyfills
* Complex middleware system

If you need those, consider other libraries.

---

## Testing

```bash
npm run test
```

Built with [Vitest](https://vitest.dev/).

---

## Changelog

See full release notes in [CHANGELOG.md][changelog-url]

---

## License

MIT © [Yuki Akai](https://github.com/yukiakai212)

---

## Support

If you find this useful, consider giving it a star ⭐


---

[npm-downloads-image]: https://badgen.net/npm/dm/@yukiakai/resty
[npm-downloads-url]: https://www.npmjs.com/package/@yukiakai/resty
[npm-url]: https://www.npmjs.com/package/@yukiakai/resty
[npm-version-image]: https://badgen.net/npm/v/@yukiakai/resty
[changelog-url]: https://github.com/yukiakai212/resty.js/blob/main/CHANGELOG.md
[api-docs-url]: https://yukiakai212.github.io/resty.js/
