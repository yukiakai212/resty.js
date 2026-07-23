declare enum HttpMethod {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Patch = "PATCH",
    Delete = "DELETE"
}
declare enum ResponseType {
    Json = "json",
    Text = "text",
    Buffer = "buffer"
}
type QueryInput = Record<string, string | string[]> | URLSearchParams;
type HttpRequestHeaders = Record<string, string>;
interface RequestOptions<TBody> {
    query?: QueryInput;
    headers?: HttpRequestHeaders;
    body?: TBody;
    responseType?: ResponseType;
}
interface HttpRequest<TBody> {
    url: string;
    method: HttpMethod;
    headers: HttpRequestHeaders;
    body: TBody | undefined;
}
interface AdapterResponse {
    status: number;
    headers: Record<string, string[]>;
    ok: boolean;
    json(): Promise<unknown>;
    text(): Promise<string>;
    buffer(): Promise<Buffer>;
}
type HttpAdapter<TBody> = (req: HttpRequest<TBody>) => Promise<AdapterResponse>;

export { type AdapterResponse as A, type HttpAdapter as H, type QueryInput as Q, type RequestOptions as R, HttpMethod as a, ResponseType as b, type HttpRequest as c, type HttpRequestHeaders as d };
