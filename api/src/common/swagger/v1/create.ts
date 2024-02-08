import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createSwaggerDoc = (app: INestApplication<any>): void => {
    const config = new DocumentBuilder()
        .setTitle('Quick Lingo Api')
        .setDescription('The Quick Lingo API description')
        .setVersion('1.0')
        .addTag('YC Translate Api v2')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/doc', app, document);
};
