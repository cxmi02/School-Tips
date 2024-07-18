import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './libs/Config/config';
import { TipsModule } from './module/tips/tips.module';
import { SubjectModule } from './module/subject/subject.module';
import { LevelModule } from './module/level/level.module';
import { GradesModule } from './module/grades/grades.module';

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
      database: config().database.db ,
      autoLoadEntities: true,
      synchronize: true,
      extra: {
          ssl: true,
      },
    }),
    TipsModule,
    SubjectModule,
    LevelModule,
    GradesModule,
  ],
  controllers: [],  
  providers: [],  
})
export class AppModule {}
