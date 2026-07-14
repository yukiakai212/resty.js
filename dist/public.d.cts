export { FetchBody, fetchAdapter } from './adapters/fetch.cjs';
import { H as HttpAdapter, R as RequestOptions } from './types-DTKySshQ.cjs';
export { A as AdapterResponse, a as HttpMethod, b as HttpRequest } from './types-DTKySshQ.cjs';

declare class HttpClient<TBody> {
    private adapter;
    private baseUrl;
    private defaultHeaders;
    private urlResolver;
    private requestOptionsNormalizer;
    constructor(adapter: HttpAdapter<TBody>, baseUrl: string, defaultHeaders?: Record<string, string>);
    private request;
    get<T>(path: string, options?: RequestOptions<TBody>): Promise<T>;
    post<T>(path: string, options?: RequestOptions<TBody>): Promise<T>;
    put<T>(path: string, options?: RequestOptions<TBody>): Promise<T>;
    patch<T>(path: string, options?: RequestOptions<TBody>): Promise<T>;
    delete<T>(path: string, options?: RequestOptions<TBody>): Promise<T>;
    getTextResponse(path: string, options?: RequestOptions<TBody>): Promise<string>;
    getBufferResponse(path: string, options?: RequestOptions<TBody>): Promise<Buffer<ArrayBufferLike>>;
    postTextResponse(path: string, options?: RequestOptions<TBody>): Promise<string>;
    postBufferResponse(path: string, options?: RequestOptions<TBody>): Promise<Buffer<ArrayBufferLike>>;
    putTextResponse(path: string, options?: RequestOptions<TBody>): Promise<string>;
    putBufferResponse(path: string, options?: RequestOptions<TBody>): Promise<Buffer<ArrayBufferLike>>;
    patchTextResponse(path: string, options?: RequestOptions<TBody>): Promise<string>;
    patchBufferResponse(path: string, options?: RequestOptions<TBody>): Promise<Buffer<ArrayBufferLike>>;
    deleteTextResponse(path: string, options?: RequestOptions<TBody>): Promise<string>;
    deleteBufferResponse(path: string, options?: RequestOptions<TBody>): Promise<Buffer<ArrayBufferLike>>;
}

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

export { HttpAdapter, HttpClient, RequestOptions, RestyConfigError, RestyError, RestyHttpError };
