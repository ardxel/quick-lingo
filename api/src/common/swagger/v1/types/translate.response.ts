import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

class ResponseTranslation {
    @IsArray()
    @ApiProperty()
    texts: string;
}

export class SwaggerResponseTranslate {
    @IsArray()
    @Type(() => ResponseTranslation)
    @ApiProperty({ type: [ResponseTranslation] })
    translations: ResponseTranslation;
}
