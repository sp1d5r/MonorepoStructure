export default interface Article {
    id: string;
    properties: {
        [key: string]: any;
    };
    cover: {
        type: string;
        external?: {
            url: string;
        };
        file?: {
            url: string;
            expiry_time: string;
        };
    } | null;
    url: string | null;
    content?: string;
}
