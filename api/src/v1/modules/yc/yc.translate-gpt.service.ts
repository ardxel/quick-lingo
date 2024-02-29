import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnvConfig } from 'common/interfaces';
import { TranslateGptDTO } from './dto';
import { ResponsePayloadTranslate } from './interfaces';
import { YcGptResponseTextGeneration } from './interfaces/yandex-cloud';
import { YcConfigService } from './yc.config.service';

@Injectable()
export class YcTranslateGptService {
    private readonly _logger: Logger = new Logger(YcTranslateGptService.name);
    private ycGptApiUrlV1: string;
    private ycGptTranslateSystemInstructionText: string;

    constructor(
        private readonly nestConfigService: ConfigService<AppEnvConfig>,
        private readonly ycConfigService: YcConfigService,
        private readonly httpService: HttpService,
    ) {
        this.ycGptApiUrlV1 = this.nestConfigService.get('YC_GPT_MODEL_API_V1');
        this.ycGptTranslateSystemInstructionText = this.nestConfigService.get('YC_GPT_MODEL_TRANSLATE_SYSTEM_TEXT');
    }

    public async translateWithAI(dto: TranslateGptDTO): Promise<ResponsePayloadTranslate> {
        const config = this.getRequestSampleConfig('completion', dto);

        config.body.messages.push({
            role: 'user',
            text: dto.texts.join(''),
        });

        console.log(dto);

        const response = await this.httpService.axiosRef.post<YcGptResponseTextGeneration>(config.url, config.body, {
            headers: config.headers,
        });
        const responseText = response.data.result.alternatives[0].message.text;
        console.log(responseText);
        const extractedPayload =
            this.extractValidJSONFromString<Omit<ResponsePayloadTranslate, 'sourceText'>>(responseText);

        if (!extractedPayload) throw new BadGatewayException();

        const normalizedPayload = this.normalizeBadGptResponse(extractedPayload);

        return {
            ...normalizedPayload,
            sourceText: dto.texts.join(' '),
        };
    }

    /**
     * @see {@link https://cloud.yandex.ru/ru/docs/yandexgpt/quickstart}
     */
    private getRequestSampleConfig(urlSuffix: 'completion' | 'completionAsync', dto: TranslateGptDTO) {
        const defaultConfig = this.ycConfigService.getRequestConfig();

        const url = this.ycGptApiUrlV1 + urlSuffix;

        const headers = {
            Authorization: `Bearer ${defaultConfig.iamToken}`,
        };
        const languageInstruction = ` Исходный язык: ${dto.sourceLanguageCode}, Язык на который нужно перевести: ${dto.targetLanguageCode}. `;
        const body = {
            modelUri: `gpt://${defaultConfig.folderId}/yandexgpt/latest`,
            compilerOptions: {
                stream: false,
                temperature: 0,
                maxTokens: '1000',
            },
            messages: [
                {
                    role: 'system',
                    text: languageInstruction + this.ycGptTranslateSystemInstructionText,
                },
            ],
        };

        return { url, headers, body };
    }

    private extractValidJSONFromString<T>(inputString: string): T | null {
        const startIndex = inputString.indexOf('{');
        const endIndex = inputString.lastIndexOf('}');

        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
            const jsonString = inputString.substring(startIndex, endIndex + 1);

            try {
                return JSON.parse(jsonString);
            } catch (error) {
                this._logger.warn('Parsing error: ', +error);
                return null;
            }
        } else {
            return null;
        }
    }

    private normalizeBadGptResponse<
        T extends Omit<ResponsePayloadTranslate, 'sourceText'> = Omit<ResponsePayloadTranslate, 'sourceText'>,
    >(object: T): T {
        if (!Array.isArray(object.examples) || typeof object.examples[0] !== 'string') {
            object.examples = [];
        }
        if (!Array.isArray(object.synonyms) || typeof object.synonyms[0] !== 'string') {
            object.synonyms = [];
        }
        if (!Array.isArray(object.translations) || typeof object.synonyms[0] !== 'string') {
            object.translations = [];
        }

        return object;
    }
}
