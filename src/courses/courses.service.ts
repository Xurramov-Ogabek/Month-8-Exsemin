import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepo.find();
  }

  create(dto: CreateCourseDto) {
    const course = this.courseRepo.create(dto);
    return this.courseRepo.save(course);
  }

  async update(id: number, dto: CreateCourseDto) {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) throw new NotFoundException('Course topilmadi');
    Object.assign(course, dto);
    return this.courseRepo.save(course);
  }

  async delete(id: number) {
    const res = await this.courseRepo.delete(id);
    if (!res.affected) throw new NotFoundException('Course topilmadi');
    return { message: 'O‘chirildi' };
  }
}
