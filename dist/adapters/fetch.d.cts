import { H as HttpAdapter } from '../types-DTKySshQ.cjs';

type FetchBody = BodyInit | null | undefined;
declare const fetchAdapter: HttpAdapter<FetchBody>;

export { type FetchBody, fetchAdapter };
