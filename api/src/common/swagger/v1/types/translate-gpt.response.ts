import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

class ResponseTranslationGpt {
    @IsArray()
    @ApiProperty()
    texts: string;
}

export class SwaggerResponseTranslateGpt {
    @IsArray()
    @Type(() => ResponseTranslationGpt)
    @ApiProperty({ type: ResponseTranslationGpt })
    translations: ResponseTranslationGpt;
}
