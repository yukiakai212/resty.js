import { H as HttpAdapter } from '../types-Cddp90w2.js';
import { Options } from 'got';

type GotBody = Options['body'];
declare const gotAdapter: HttpAdapter<GotBody>;

export { type GotBody, gotAdapter };
