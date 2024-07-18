import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { Tip } from './entities/tips.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Tip]), ScheduleModule],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class TipsModule {}
