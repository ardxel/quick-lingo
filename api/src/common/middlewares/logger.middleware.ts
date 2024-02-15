import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');
    use(req: Request, res: Response, next: () => void) {
        const { ip, method, originalUrl } = req;
        res.on('finish', () => {
            const { statusCode } = res;
            this.logger.log(`${method} ${originalUrl} ${statusCode} ${ip}`);
        });
        next();
    }
}
