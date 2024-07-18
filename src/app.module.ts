import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import config from './libs/Config/config';
import { TipsModule } from './module/tips/tips.module';
import { LevelsModule } from './module/levels/level.module';
import { SubjectsModule } from './module/subjects/subject.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.connection.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.db,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    TipsModule,
    SubjectsModule,
    LevelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
