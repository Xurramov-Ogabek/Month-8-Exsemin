import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module'; // ✅ AuthModule import qilindi

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule], // ✅ TypeORM + AuthModule
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}