import { NestFactory } from '@nestjs/core';
//import { FastifyAdapter } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as https from 'https';
import * as express from 'express';
import * as passport from 'passport';
import * as session from 'express-session';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
const { createProxyMiddleware } = require('http-proxy-middleware');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('API')
    .setDescription('My API')
    .build());

  SwaggerModule.setup('api', app, document);

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

    //req.header('Accept', '*/*');
    //res.header('Origin', 'http://localhost:3000/')
    req.header('Upgrade-Insecure-Request', '1');
    req.header('If-None-Match', 'W/"412-6jijLV/iKmZdVXiUqdbJ0tQC0co');
    //req.header('Access-Control-Allow-Origin', 'http://localhost:3000/api/42auth/login');
    //res.header('Accept-Encoding', 'gzip, deflate');
    //res.header('Accept-Language', 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3');
    //res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Accept-Ranges', 'bytes');
    res.header('Connection', 'keep-alive');
    res.header('Vary', 'Origin');
    next();
  });

    /*
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8080/', //original url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, X-Request-With, Set-Cookie, Cookie, Bearer, Authorization';
       proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE, OPTIONS';
       proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    }

}));
*/

  app.enableCors({origin: true,
    credentials: true});

  await app.listen(3000);
}
bootstrap();
