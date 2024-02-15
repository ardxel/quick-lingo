import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { TranslateDTO } from './dto';
import { YCResponseSupportedLanguageList, YCResponseTranslate } from './interfaces';
import { YcService } from './yc.service';
import { ResponseSupportedLanguageList, ResponseTranslate } from 'common/swagger/v1/types';

@ApiTags('YC Translate Api v2')
@Controller({
    path: 'yc',
    version: '1',
})
export class YcController {
    constructor(private readonly ycService: YcService) {}

    @Post('translate')
    @HttpCode(HttpStatusCode.Ok)
    @ApiOkResponse({
        type: ResponseTranslate,
        description: 'the text was successfully translated and the translation was returned',
    })
    async translate(@Body() dto: TranslateDTO): Promise<YCResponseTranslate> {
        return await this.ycService.translate(dto);
    }

    @Get('languages')
    @HttpCode(HttpStatusCode.Ok)
    @ApiOkResponse({
        type: ResponseSupportedLanguageList,
        description: 'gets a list of supported languages',
    })
    async supportedLanguages(): Promise<YCResponseSupportedLanguageList> {
        return await this.ycService.getSupportedLanguageList();
    }
}
