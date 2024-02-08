import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { TranslateDTO } from './dto';
import { YcService } from './yc.service';
import { ResponseTranslate } from './interfaces';
import { HttpStatusCode } from 'axios';

@Controller({
    path: 'yc',
    version: '1',
})
export class YcController {
    constructor(private readonly ycService: YcService) {}

    @Post('translate')
    @HttpCode(HttpStatusCode.Ok)
    async translate(@Body() dto: TranslateDTO): Promise<ResponseTranslate> {
        return await this.ycService.translate(dto);
    }
}
