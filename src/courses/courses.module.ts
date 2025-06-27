import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { AuthModule } from '../auth/auth.module'; // ✅ AuthModule import qilindi

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    AuthModule, // ✅ AuthModule qo‘shildi
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}