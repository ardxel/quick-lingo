import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TranslateDTO, TranslateGptDTO } from './dto';
import { YcConfigService } from './yc.config.service';
import { YcTranslateService } from './yc.translate.service';
import { YcTranslateGptService } from './yc.translate-gpt.service';

const YC_TOKEN_REFRESH_INTERVAL = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

@Injectable()
export class YcService {
    private readonly _logger: Logger = new Logger(YcService.name);

    constructor(
        private readonly ycConfigService: YcConfigService,
        private readonly ycTranslateService: YcTranslateService,
        private readonly ycTranslateGptService: YcTranslateGptService,
    ) {
        this.fetchIamToken();
    }

    public async translateSimple(dto: TranslateDTO) {
        return await this.ycTranslateService.translate(dto);
    }

    public async translateGpt(dto: TranslateGptDTO) {
        try {
            return await this.ycTranslateGptService.translateWithAI(dto);
        } catch (error) {
            this._logger.warn(error);
            return await this.ycTranslateService.translate(dto);
        }
    }

    public fetchSupportedLanguages() {
        return this.ycTranslateService.fetchSupportedLanguages();
    }

    /**
     * @see {@link https://cloud.yandex.ru/ru/docs/iam/operations/iam-token/create}
     * @note token lifetime - 10 hours, but for the best to update token every hour
     * @see {@link YC_TOKEN_REFRESH_INTERVAL}
     */
    @Interval(YC_TOKEN_REFRESH_INTERVAL)
    private async fetchIamToken() {
        await this.ycConfigService.fetchIamToken();
    }
}
