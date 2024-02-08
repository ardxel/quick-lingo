import { Module } from '@nestjs/common';
import { YcService } from './yc.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { YcController } from './yc.controller';

@Module({
    imports: [HttpModule, ScheduleModule.forRoot()],
    providers: [YcService],
    controllers: [YcController],
})
export class YcModule {}
