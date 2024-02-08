import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';
import { AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { AppConfig } from 'common/interfaces';
import { TranslateDTO } from './dto';
import { ResponseIAMToken, ResponseListLanguages, ResponseTranslate, YcBadResponse } from './interfaces';

const YC_TOKEN_REFRESH_INTERVAL = 9 * 60 * 60 * 1000; // 9 hours in milliseconds

@Injectable()
export class YcService {
    private readonly _logger: Logger = new Logger(YcService.name);
    private iamToken: string;
    private folderId: string;
    private supportedLanguagesSet: Set<string>;

    private ycTranslateApiUrlV2: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService<AppConfig>,
    ) {
        this.fetchIamToken().then(() => {
            this.fetchSupportedLanguages();
        });
        this.folderId = this.configService.get('YC_FOLDER_ID');
        this.ycTranslateApiUrlV2 = this.configService.get('YC_TRANSLATE_API_V2');
    }
    /**
     * @see {@link https://cloud.yandex.ru/ru/docs/translate/api-ref/Translation/translate}
     */
    public async translate(dto: TranslateDTO): Promise<ResponseTranslate> {
        try {
            const [translateApiUrl, body, config] = this.prepareDefaultRequest('translate');

            body.sourceLanguageCode = dto.sourceLanguageCode;
            body.targetLanguageCode = dto.targetLanguageCode;
            body.texts = dto.texts;

            const response = await this.httpService.axiosRef.post<ResponseTranslate>(translateApiUrl, body, config);

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
    public async fetchSupportedLanguages(): Promise<void> {
        try {
            const [supportedLanguagesApiUrl, body, config] = this.prepareDefaultRequest('languages');
            const response = await this.httpService.axiosRef.post<ResponseListLanguages>(
                supportedLanguagesApiUrl,
                body,
                config,
            );
            const { languages } = response.data;
            const supportedLanguagesSet = new Set<string>();

            languages.forEach(({ code }) => supportedLanguagesSet.add(code));

            this.supportedLanguagesSet = supportedLanguagesSet;

            this._logger.log('Supported languages fetched successfully');
        } catch (error: any) {
            if (this.isYandexException(error)) {
                this.handleYandexException(error);
            } else {
                this._logger.error(`Error fetching supported languages: ${error.message}`);
                throw error;
            }
        }
    }

    /**
     * @see {@link https://cloud.yandex.ru/ru/docs/iam/operations/iam-token/create}
     * @note token lifetime - 10 hours, but for the best to update token every 9 hours
     * @see {@link YC_TOKEN_REFRESH_INTERVAL}
     */
    @Interval(YC_TOKEN_REFRESH_INTERVAL)
    private async fetchIamToken() {
        try {
            const ycUrl = this.configService.get('YC_IAM_TOKEN_REFRESH_API');
            const oauthToken = this.configService.get('YC_OAUTH_TOKEN');
            const body = { yandexPassportOauthToken: oauthToken };

            const { data } = await this.httpService.axiosRef.post<ResponseIAMToken>(ycUrl, body);

            this.iamToken = data.iamToken;
            this._logger.log('iam token updated successfully');
        } catch (error: any) {
            this._logger.error(`Error fetching IAM token: ${error.message}`);
            throw error;
        }
    }

    private prepareDefaultRequest(urlSuffix: string): [string, Record<string, any>, AxiosRequestConfig] {
        const url = this.ycTranslateApiUrlV2 + urlSuffix;
        const body: Record<string, string> = {};

        body.folderId = this.folderId;

        const headers = {};

        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = `Bearer ${this.iamToken}`;

        return [url, body, { headers }];
    }

    private isYandexException(error: any | AxiosError<YcBadResponse>): error is AxiosError<YcBadResponse> {
        return error instanceof AxiosError && error.response && 'code' in error.response.data;
    }

    /**
     * @see {@link https://cloud.yandex.ru/ru/docs/translate/api-ref/errors-handling}
     */
    private async handleYandexException(error: AxiosError<YcBadResponse>) {
        const code = error.response.data.code;
        // UNAUTHENTICATED
        if (code === 16) {
            await this.fetchIamToken();
            return;
        }

        throw new HttpException(error.response, error.response.data.code);
    }
}
