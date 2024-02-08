import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ArrayMaxSize } from 'class-validator';

export class TranslateDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    sourceLanguageCode: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    targetLanguageCode: string;

    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(1)
    @ApiProperty()
    texts: string[];
}
