export type YcBadResponse = {
    code: number;
    message: string;
    details: Array<{ '@type': string; requestId: string }>;
};
