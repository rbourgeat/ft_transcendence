import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as passport from 'passport';
import * as session from 'express-session';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('API')
    .setDescription('My API')
    .build());

  SwaggerModule.setup('api', app, document);

  app.use('/upload', express.static(join(__dirname, '..', 'upload')));

  //42auth
  app.use(
    session({ resave: false, saveUninitialized: false, secret: '!Seoul' }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //others
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'static'));

  app.use((req, res, next) => {
    next();
  });


  //Tres utile pour les appels sur notre api !
  app.enableCors({
    origin: true,
    credentials: true
  });

  await app.listen(3000);
}
bootstrap();
