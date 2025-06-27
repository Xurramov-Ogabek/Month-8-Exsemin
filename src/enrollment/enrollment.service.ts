import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment) private repo: Repository<Enrollment>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Course) private courseRepo: Repository<Course>,
  ) {}

  async enroll(courseId: number, userId: number) {
    const course = await this.courseRepo.findOneBy({ id: courseId });
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!course || !user) {
      throw new Error('Foydalanuvchi yoki kurs topilmadi');
    }

    const exists = await this.repo.findOneBy({
      course: { id: courseId },
      student: { id: userId },
    });

    if (exists) {
      return { message: 'Allaqachon yozilgan' };
    }

    const enrollment = this.repo.create({
      course: { id: courseId } as Course,
      student: { id: userId } as User,
    });

    return this.repo.save(enrollment);
  }
}
