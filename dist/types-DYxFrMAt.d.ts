type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type ResponseType = 'json' | 'text' | 'buffer';
type QueryOptions = Record<string, string | string[]> | URLSearchParams;
type RequestOptions = {
    query?: QueryOptions;
    headers?: Record<string, string>;
    body?: any;
    responseType?: ResponseType;
};
type HttpRequest = {
    url: string;
    method: HttpMethod;
    headers?: Record<string, string>;
    body?: any;
};
type AdapterResponse = {
    status: number;
    headers: Record<string, string | string[] | undefined>;
    ok: boolean;
    json(): Promise<any>;
    text(): Promise<string | undefined>;
    buffer(): Promise<Buffer>;
};
type HttpAdapter = (req: HttpRequest) => Promise<AdapterResponse>;

export type { AdapterResponse as A, HttpMethod as H, QueryOptions as Q, ResponseType as R, RequestOptions as a, HttpRequest as b, HttpAdapter as c };
