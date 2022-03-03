import { NestFactory } from '@nestjs/core';
//import { FastifyAdapter } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as https from 'https';
import * as express from 'express';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('API')
    .setDescription('My API')
    .build());

  SwaggerModule.setup('api', app, document);

  app.enableCors();

  var cors = require('cors');

  var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Origin, Accept");
    next();
}

  app.use(allowCrossDomain);
  //some other code
  
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();