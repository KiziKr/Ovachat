import * as express from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    constructor(
    ) {}

    public error(error: HttpError, req, res, next): void {
        res.status(error.httpCode || 500);
        res.json({
            name: error.name,
            message: error.message,
            errors: error['errors'] || []
        })
    }
}