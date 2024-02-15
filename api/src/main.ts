import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformResponseInterceptor } from 'common/interceptors';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { createSwaggerDoc } from 'common/swagger/v1';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.useGlobalInterceptors(new TransformResponseInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.enableCors({ origin: '*' });

    createSwaggerDoc(app);

    const PORT = configService.get<number>('PORT');
    app.listen(PORT, () => {
        console.log(`Server listen in ${PORT} port`);
    });
}
bootstrap();
