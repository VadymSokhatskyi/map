export interface IWSMessage {
    type: 'request' | 'response';
    payload: IWSRequest | IWSResponse;
}

export interface IWSRequest {
    section: string;
    action: string;
    data: any;
}

export interface IWSResponse {
    status: number;
    message: string | null;
    data: any;
}