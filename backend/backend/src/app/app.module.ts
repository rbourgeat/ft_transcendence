import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //JWT_SECRET: process.env.JWT_SECRET,
      //JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      //autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
      migrationsRun: true //run migration query on start (creating factice data)..
    }),
    UserModule,
    AuthModule,
    GameModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
