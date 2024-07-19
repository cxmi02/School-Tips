import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));

  const options = new DocumentBuilder()
    .setTitle('API for managing school tips')
    .setDescription(
      'An API tailored for efficient management of educational tips related to school levels, and grades, facilitating the organization, retrieval, and modification of educational content to enhance learning experiences.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
