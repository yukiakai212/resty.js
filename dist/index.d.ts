import { c as HttpAdapter, a as RequestOptions } from './types-DYxFrMAt.js';
export { A as AdapterResponse, H as HttpMethod, b as HttpRequest, Q as QueryOptions, R as ResponseType } from './types-DYxFrMAt.js';
export { fetchAdapter } from './adapters/fetch.js';

declare class RestyError extends Error {
    readonly code: string;
    readonly cause?: unknown;
    constructor(message: string, code?: string, cause?: unknown);
}
declare class RestyConfigError extends RestyError {
    constructor(message: string, cause?: unknown);
    static invalidBaseUrl(baseUrl: string): RestyConfigError;
    static missingTrailingSlash(baseUrl: string): RestyConfigError;
    static invalidPathWithBase(baseUrl: string, path: string): RestyConfigError;
    static baseUrlContainsQuery(baseUrl: string): RestyConfigError;
    static unsupportedProtocol(input: string, protocol?: string): RestyConfigError;
    static endpointContainsQuery(path: string): RestyConfigError;
}
declare class RestyHttpError<T = unknown> extends RestyError {
    readonly status: number;
    readonly headers: Record<string, string>;
    readonly data?: T;
    constructor(message: string, status: number, headers: Record<string, string>, data?: T);
}

declare class HttpClient {
    private adapter;
    private baseUrl;
    private defaultHeaders;
    private hasPathname;
    constructor(adapter: HttpAdapter, baseUrl: string, defaultHeaders?: Record<string, string>);
    private request;
    private buildUrl;
    private parseBody;
    private assertHttpProtocol;
    private isAbsoluteUrl;
    get<T>(path: string, options?: RequestOptions): Promise<T>;
    post<T>(path: string, options?: RequestOptions): Promise<T>;
    put<T>(path: string, options?: RequestOptions): Promise<T>;
    patch<T>(path: string, options?: RequestOptions): Promise<T>;
    delete<T>(path: string, options?: RequestOptions): Promise<T>;
    getTextResponse(path: string, options?: RequestOptions): Promise<string>;
    getBufferResponse(path: string, options?: RequestOptions): Promise<Buffer<ArrayBufferLike>>;
    postTextResponse(path: string, options?: RequestOptions): Promise<string>;
    postBufferResponse(path: string, options?: RequestOptions): Promise<Buffer<ArrayBufferLike>>;
    putTextResponse(path: string, options?: RequestOptions): Promise<string>;
    putBufferResponse(path: string, options?: RequestOptions): Promise<Buffer<ArrayBufferLike>>;
    patchTextResponse(path: string, options?: RequestOptions): Promise<string>;
    patchBufferResponse(path: string, options?: RequestOptions): Promise<Buffer<ArrayBufferLike>>;
    deleteTextResponse(path: string, options?: RequestOptions): Promise<string>;
    deleteBufferResponse(path: string, options?: RequestOptions): Promise<Buffer<ArrayBufferLike>>;
}

export { HttpAdapter, HttpClient, RequestOptions, RestyConfigError, RestyError, RestyHttpError };
