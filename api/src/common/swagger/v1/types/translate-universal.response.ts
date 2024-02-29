import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

class SwaggerTranslateResponseUniversalBasic {}

export class SwaggerTranslateResponseUniversal {
    @ApiProperty()
    @IsString()
    sourceText: string;

    @IsArray()
    @ApiProperty()
    translated: string[];

    @IsArray()
    @ApiProperty()
    synonyms: string[];

    @IsArray()
    @ApiProperty()
    examples: string[];
}
