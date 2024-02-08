import { IsString, IsNotEmpty, IsArray, ArrayMaxSize } from 'class-validator';

export class TranslateDTO {
    @IsString()
    @IsNotEmpty()
    sourceLanguageCode: string;

    @IsString()
    @IsNotEmpty()
    targetLanguageCode: string;

    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(1)
    texts: string[];
}
