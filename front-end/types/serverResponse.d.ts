interface ServerResponse {

    success: boolean;
    message: string;

}

interface UrlObjectFromServer {

    originalUrl: string;
    shortenedUrl: string;
    visitors: number;
    creator: {
        firstName: string | null,
        _id: string | null
    };
    createdAt: date;
    _id: string;

}

interface ServerWithJsonResponse extends ServerResponse {

    response: UrlObjectFromServer;

}

interface ServerWithStringResponse extends ServerResponse {

    response: string;

}