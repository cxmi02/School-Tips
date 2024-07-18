import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { Level } from './entities/level.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), ScheduleModule],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class LevelsModule {}
