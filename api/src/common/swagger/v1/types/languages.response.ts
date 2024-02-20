import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ResponseSupportedLanguage {
    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class SwaggerResponseSupportedLanguageList {
    @IsArray()
    @IsNotEmpty()
    @Type(() => ResponseSupportedLanguage)
    @ApiProperty({ type: [ResponseSupportedLanguage] })
    languages: ResponseSupportedLanguage[];
}
