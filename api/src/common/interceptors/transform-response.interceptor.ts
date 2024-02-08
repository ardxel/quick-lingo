import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { BaseResponse } from 'common/interfaces';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, BaseResponse<T>> {
    intercept(_, next: CallHandler): Observable<BaseResponse<T>> {
        return next.handle().pipe(
            map((data) => ({
                status: 'success',
                payload: data,
            })),
        );
    }
}
