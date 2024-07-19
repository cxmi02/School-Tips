import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subject } from './entities/subjects.entities';
import { Tip } from '../tips/entities/tips.entities';
import { SubjectsService } from './service/subjects.service';
import { SubjectController } from './controllers/subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Tip]), ScheduleModule],
  exports: [TypeOrmModule],
  providers: [SubjectsService],
  controllers: [SubjectController],
})
export class SubjectsModule {}
