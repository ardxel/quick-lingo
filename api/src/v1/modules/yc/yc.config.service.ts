import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { YCResponseIAMToken } from './interfaces';
import { AppEnvConfig } from 'common/interfaces';

export type RequestConfigData = {
    iamToken: string;
    folderId: string;
};

@Injectable()
export class YcConfigService {
    private readonly _logger: Logger = new Logger(YcConfigService.name);
    private iamToken: string;
    private folderId: string;

    constructor(
        private readonly nestConfigService: ConfigService<AppEnvConfig>,
        private readonly httpService: HttpService,
    ) {
        this.folderId = this.nestConfigService.get('YC_FOLDER_ID');
    }

    public async fetchIamToken() {
        try {
            const ycUrl = this.nestConfigService.get('YC_IAM_TOKEN_REFRESH_API');
            const oauthToken = this.nestConfigService.get('YC_OAUTH_TOKEN');
            const body = { yandexPassportOauthToken: oauthToken };

            const { data } = await this.httpService.axiosRef.post<YCResponseIAMToken>(ycUrl, body);

            this.iamToken = data.iamToken;
            this._logger.log('iam token updated successfully');
        } catch (error: any) {
            this._logger.error(`Error fetching IAM token: ${error.message}`);
            throw error;
        }
    }

    public getRequestConfig(): RequestConfigData {
        return {
            iamToken: this.iamToken,
            folderId: this.folderId,
        };
    }
}
