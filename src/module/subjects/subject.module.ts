import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subject } from 'typeorm/persistence/Subject';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), ScheduleModule],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class SubjectsModule {}
