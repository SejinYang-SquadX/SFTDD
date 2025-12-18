export class HttpException extends Error {
    public status: number;
    public message: string;
    public timestamp: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.timestamp = new Date().toISOString();
    }
}

export class BadRequestException extends HttpException {
    constructor(message: string = 'Bad Request') {
        super(400, message);
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string = 'Not Found') {
        super(404, message);
    }
}

export class InternalServerErrorException extends HttpException {
    constructor(message: string = 'Internal Server Error') {
        super(500, message);
    }
}
