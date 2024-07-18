import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.use(morgan('dev'));
  await app.listen(configService.get('PORT') || 3000);
  console.log(`Aplication running on: ${await app.getUrl()}`);
  
}
bootstrap();
