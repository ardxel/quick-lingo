import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

class ResponseTranslation {
    @IsString()
    @ApiProperty()
    text: string;

    @IsString()
    @ApiProperty()
    detectedLanguageCode?: string;
}

export class SwaggerResponseTranslate {
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => ResponseTranslation)
    @ApiProperty({ type: [ResponseTranslation] })
    translations: ResponseTranslation[];
}
