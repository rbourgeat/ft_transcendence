import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity'
import { MulterModule } from '@nestjs/platform-express';
import { UserEvent } from './user.event';
import { UsersRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UsersRepository]),
    MulterModule.register({
      dest: './upload',
    })],
  controllers: [UserController],
  providers: [UserService, UserEvent],
  exports: [UserService]
})
export class UserModule { }
