import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import config from './libs/Config/config';
import { TipsModule } from './module/tips/tips.module';
import { LevelsModule } from './module/levels/level.module';
import { SubjectsModule } from './module/subjects/subject.module';
import { Level } from './module/levels/entities/level.entities';
import { Tip } from './module/tips/entities/tips.entities';
import { Subject } from './module/subjects/entities/subjects.entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.db,
      entities: [Level, Tip, Subject],
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    }),
    TypeOrmModule.forFeature([Tip, Level, Subject]),
    ScheduleModule.forRoot(),
    TipsModule,
    SubjectsModule,
    LevelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
