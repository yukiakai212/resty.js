import { H as HttpAdapter } from '../types-DTKySshQ.cjs';
import { Options } from 'got';

type GotBody = Options['body'];
declare const gotAdapter: HttpAdapter<GotBody>;

export { type GotBody, gotAdapter };
