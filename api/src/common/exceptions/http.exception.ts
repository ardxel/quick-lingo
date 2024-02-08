import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        let message = exception['response'] ? exception['response']['message'] : exception.message;
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let status = 'error';

        /**
         * Если исключение наследуется от общего класса HttpException, то тогда присвоить статус код.
         * в противном случае может быть ошибка.
         */
        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
        }

        /**
         * Если статус исключения в диапозоне от 400 до 500, то ошибка клиента (fail)
         * если нет, то она остается ошибкой сервера (error)
         */
        if (statusCode >= 400 && statusCode < 500) {
            status = 'fail';
        }
        /* В dev режиме будет добавлен stack ошибки */
        // const stack = isDevMode() ? exception.stack : undefined;

        const stack = process.env.NODE_ENV === 'development' ? exception.stack : undefined;

        response.status(statusCode).json({ status, message, stack });
    }

    // handleHttpException(exception: HttpException) {}
    // handleWsException(exception: WsException) {}
}
