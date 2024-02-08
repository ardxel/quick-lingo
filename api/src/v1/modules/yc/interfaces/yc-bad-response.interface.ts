import { HttpStatusCode } from 'axios';

interface YcBadResponse {
    code: number;
    message: string;
    details: Array<{ '@type': string; requestId: string }>;
}

export type { YcBadResponse };
