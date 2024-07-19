import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { Tip } from './entities/tips.entities';
import { Level } from '../levels/entities/level.entities';
import { Subject } from '../subjects/entities/subjects.entities';
import { TipService } from './service/tip.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tip, Level, Subject]), ScheduleModule],
  exports: [TypeOrmModule],
  providers: [TipService],
  controllers: [],
})
export class TipsModule {}
