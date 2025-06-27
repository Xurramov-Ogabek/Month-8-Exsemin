import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { Enrollment } from './entities/enrollment.entity';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { AuthModule } from '../auth/auth.module'; // ✅ JwtService uchun kerak

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment, User, Course]),
    AuthModule, // ✅ JwtAuthGuard ishlashi uchun muhim
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}