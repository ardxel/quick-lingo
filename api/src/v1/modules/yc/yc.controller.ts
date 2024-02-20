import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { TranslateDTO, TranslateGptDTO } from './dto';
import { ResponseTranslateGpt, YCResponseSupportedLanguageList, YCResponseTranslate } from './interfaces';
import { YcService } from './yc.service';
import {
    SwaggerResponseSupportedLanguageList,
    SwaggerResponseTranslate,
    SwaggerResponseTranslateGpt,
} from 'common/swagger/v1/types';

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
        type: SwaggerResponseTranslate,
        description: 'the text was successfully translated and the translation was returned',
    })
    async translateSimple(@Body() dto: TranslateDTO): Promise<YCResponseTranslate> {
        return await this.ycService.translateSimple(dto);
    }

    @Post('translate-gpt')
    @HttpCode(HttpStatusCode.Ok)
    @ApiOkResponse({
        type: SwaggerResponseTranslateGpt,
        description: 'the text was successfully translated by yandex gpt model and the translation was returned',
    })
    async translateGpt(@Body() dto: TranslateGptDTO): Promise<ResponseTranslateGpt> {
        return await this.ycService.translateGpt(dto);
    }

    @Get('languages')
    @HttpCode(HttpStatusCode.Ok)
    @ApiOkResponse({
        type: SwaggerResponseSupportedLanguageList,
        description: 'gets a list of supported languages',
    })
    async supportedLanguages(): Promise<YCResponseSupportedLanguageList> {
        return await this.ycService.fetchSupportedLanguages();
    }
}
