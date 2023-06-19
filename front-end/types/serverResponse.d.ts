interface ServerResponse {

    success: boolean;
    message: string;

}

interface ServerWithStringResponse extends ServerResponse {

    response: string;

}

interface ServerWithJsonResponse extends ServerResponse {

    response: {
        originalUrl: string;
        shortenedUrl: string;
        visitors: number;
        creator: {
            firstName: string | null,
            _id: string | null
        };
    };

}