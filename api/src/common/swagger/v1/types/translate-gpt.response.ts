import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray } from 'class-validator';

class ResponseTranslationGpt {
    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty()
    texts: string;
}

export class SwaggerResponseTranslateGpt {
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => ResponseTranslationGpt)
    @ApiProperty({ type: [ResponseTranslationGpt] })
    translations: ResponseTranslationGpt[];
}
