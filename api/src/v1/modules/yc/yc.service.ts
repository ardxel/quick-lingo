import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TranslateDTO, TranslateGptDTO } from './dto';
import { YcConfigService } from './yc.config.service';
import { YcTranslateService } from './yc.translate.service';
import { YcTranslateGptService } from './yc.translate-gpt.service';

const YC_TOKEN_REFRESH_INTERVAL = 9 * 60 * 60 * 1000; // 9 hours in milliseconds

@Injectable()
export class YcService {
    constructor(
        private readonly ycConfigService: YcConfigService,
        private readonly ycTranslateService: YcTranslateService,
        private readonly ycTranslateGptService: YcTranslateGptService,
    ) {
        this.fetchIamToken();
    }

    public translateSimple(dto: TranslateDTO) {
        return this.ycTranslateService.translate(dto);
    }

    public translateGpt(dto: TranslateGptDTO) {
        return this.ycTranslateGptService.translateWithAI(dto);
    }

    public fetchSupportedLanguages() {
        return this.ycTranslateService.fetchSupportedLanguages();
    }

    /**
     * @see {@link https://cloud.yandex.ru/ru/docs/iam/operations/iam-token/create}
     * @note token lifetime - 10 hours, but for the best to update token every 9 hours
     * @see {@link YC_TOKEN_REFRESH_INTERVAL}
     */
    @Interval(YC_TOKEN_REFRESH_INTERVAL)
    private async fetchIamToken() {
        await this.ycConfigService.fetchIamToken();
    }
}
