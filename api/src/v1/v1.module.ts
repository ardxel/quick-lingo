import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { YcModule } from './modules/yc';

@Module({
    imports: [YcModule],
})
export class V1Module implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL, version: '1' });
    }
}
