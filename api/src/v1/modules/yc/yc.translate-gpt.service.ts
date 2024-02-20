import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { YcConfigService } from './yc.config.service';
import { AppEnvConfig } from 'common/interfaces';
import { HttpService } from '@nestjs/axios';
import { TranslateGptDTO } from './dto';
import { YcGptResponseTextGeneration } from './interfaces/yandex-cloud';
import { ResponseTranslateGpt } from './interfaces';

@Injectable()
export class YcTranslateGptService {
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

    public async translateWithAI(dto: TranslateGptDTO): Promise<ResponseTranslateGpt> {
        try {
            const config = this.getRequestSampleConfig('completion', dto);
            config.body.messages.push({
                role: 'user',
                text: dto.texts.join(''),
            });

            const response = await this.httpService.axiosRef.post<YcGptResponseTextGeneration>(
                config.url,
                config.body,
                { headers: config.headers },
            );
            const translatedText = response.data.result.alternatives[0].text;
            const translatedData = JSON.parse(translatedText) as { texts: string[] };

            return {
                translations: translatedData,
            };
        } catch (error) {}
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

        const languageInstruction = `Исходный язык текста: ${dto.sourceLanguageCode}, Язык на который нужно перевести: ${dto.targetLanguageCode}`;
        const body = {
            modelUri: `gpt://${defaultConfig.folderId}/yandexgpt-lite`,
            compilerOptions: {
                stream: false,
                temperature: 1,
                maxTokens: '1000',
            },
            messages: [
                {
                    role: 'system',
                    text: this.ycGptTranslateSystemInstructionText + languageInstruction,
                },
            ],
        };

        return { url, headers, body };
    }
}
