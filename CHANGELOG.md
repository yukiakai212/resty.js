# @yukiakai/resty

## 1.1.0

### Minor Changes

- f9c7121: ### Changes
  - Strict URL Validation
  - Endpoints containing query strings (e.g. `"users?page=1"`) now throw error
  - Renamed sugar methods for clarity:
    - `getBuffer()` → `getBufferResponse()`
    - `postBuffer()` → `postBufferResponse()`
    - Similar changes for `text` methods
  - Avoid ambiguity between request body and response type
