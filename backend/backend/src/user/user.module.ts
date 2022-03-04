import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity'
import { MulterModule } from '@nestjs/platform-express';
import { UserEvent } from './user.event';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      dest: './upload',
    })],
  controllers: [UserController],
  providers: [UserService, UserEvent],
  exports: [UserService]
})
export class UserModule { }
