import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { Level } from './entities/level.entities';
import { LevelService } from './service/level.service';
import { Tip } from '../tips/entities/tips.entities';
import { LevelController } from './controllers/level.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Level, Tip]), ScheduleModule],
  exports: [TypeOrmModule],
  providers: [LevelService],
  controllers: [LevelController],
})
export class LevelsModule {}
