import { Module } from '@nestjs/common';
import { YcService } from './yc.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { YcController } from './yc.controller';
import { YcTranslateService } from './yc.translate.service';
import { YcConfigService } from './yc.config.service';
import { YcTranslateGptService } from './yc.translate-gpt.service';

@Module({
    imports: [HttpModule, ScheduleModule.forRoot()],
    providers: [YcService, YcConfigService, YcTranslateService, YcTranslateGptService],
    controllers: [YcController],
})
export class YcModule {}
