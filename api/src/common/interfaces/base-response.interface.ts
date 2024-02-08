/**
 * success - успешный response ответ с предоставлением всех или частичных данных
 * fail - ошибка по вине клиента (неправильные данные, невалидный body и тд.)
 * error - ошибка по вине сервера (утеряна связь с базой данных, ошибки в коде и тд.)
 */
export type BaseResponseStatus = 'success' | 'fail' | 'error';

/**
 * JSend Response Pattern
 * @see {@link https://github.com/omniti-labs/jsend}
 */
export interface BaseResponse<T> {
    status: BaseResponseStatus;
    /* вместо data используется payload чтобы было удобнее извлекать данные на клиенте из axios */
    payload: T;
    /* message связан только с fail и error статусом. Если response успешный (success), то message не используется */
    message?: string | string[];
    /* Если режим разработки, то при возникновении исключений в response будет добавлен stack ошибки. */
    stack?: any;
}
