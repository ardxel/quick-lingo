import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { AppEnvConfig } from 'common/interfaces';
import { TranslateDTO } from './dto';
import { YCResponseSupportedLanguageList, YCResponseTranslate, YcBadResponse } from './interfaces';
import { YcConfigService } from './yc.config.service';

@Injectable()
export class YcTranslateService {
    private readonly _logger: Logger = new Logger(YcTranslateService.name);
    private ycTranslateApiUrlV2: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService<AppEnvConfig>,
        private readonly ycConfigService: YcConfigService,
    ) {
        this.ycTranslateApiUrlV2 = this.configService.get('YC_TRANSLATE_API_V2');
    }

    /**
     * @see {@link https://cloud.yandex.ru/ru/docs/translate/api-ref/Translation/translate}
     */
    public async translate(dto: TranslateDTO): Promise<YCResponseTranslate> {
        try {
            const [translateApiUrl, body, config] = this.prepareRequest('translate');

            body.sourceLanguageCode = dto.sourceLanguageCode;
            body.targetLanguageCode = dto.targetLanguageCode;
            body.texts = dto.texts;

            const response = await this.httpService.axiosRef.post<YCResponseTranslate>(translateApiUrl, body, config);

            return response.data;
        } catch (error: AxiosError | any) {
            if (this.isYandexException(error)) {
                this.handleYandexException(error);
            } else {
                this._logger.error(error);
            }
        }
    }

    /**
     * @see {@link https://cloud.yandex.ru/ru/docs/translate/api-ref/Translation/listLanguages}
     */
    public async fetchSupportedLanguages(): Promise<YCResponseSupportedLanguageList> {
        try {
            const [supportedLanguagesApiUrl, body, config] = this.prepareRequest('languages');
            const response = await this.httpService.axiosRef.post<YCResponseSupportedLanguageList>(
                supportedLanguagesApiUrl,
                body,
                config,
            );

            return response.data;
        } catch (error: any) {
            console.log(error);
            if (this.isYandexException(error)) {
                this.handleYandexException(error);
            } else {
                this._logger.error(`Error fetching supported languages: ${error.message}`);
                throw error;
            }
        }
    }

    /**
     * @param urlSuffix - endpoints in yandex cloud REST API translation
     * @see {@link https://cloud.yandex.ru/ru/docs/translate/api-ref/Translation/}
     *
     * @description
     * prepare default request data  for workflow to yandex cloud api
     * @returns tuple array:
     * url - yandex cloud api url
     * body - data request (mutable)
     * config - axios request config with default headers which already contain Authorization and content-type (mutable)
     */
    private prepareRequest(
        urlSuffix: 'detect' | 'languages' | 'translate',
    ): [string, Record<string, any>, AxiosRequestConfig] {
        const config = this.ycConfigService.getRequestConfig();
        const url = this.ycTranslateApiUrlV2 + urlSuffix;
        const body: Record<string, string> = {};

        body.folderId = config.folderId;

        const headers = {};

        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = `Bearer ${config.iamToken}`;

        return [url, body, { headers }];
    }

    private isYandexException(error: any | AxiosError<YcBadResponse>): error is AxiosError<YcBadResponse> {
        return error instanceof AxiosError && error.response && 'code' in error.response.data;
    }

    /**
     * @see {@link https://cloud.yandex.ru/ru/docs/translate/api-ref/errors-handling}
     */
    private async handleYandexException(error: AxiosError<YcBadResponse>) {
        // TODO: write some code
        throw new HttpException(error.response, error.response.data.code);
    }
}
