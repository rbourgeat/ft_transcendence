import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('API')
    .setDescription('My API')
    .build());

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
