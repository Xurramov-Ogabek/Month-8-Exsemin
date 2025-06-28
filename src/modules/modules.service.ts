import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from './entities/module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/entities/user.entity'; // Agar foydalanuvchi tipidan foydalanilsa

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepo: Repository<ModuleEntity>,

    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  // 📥 Kursga tegishli barcha modullarni olish
  async findByCourse(courseId: number): Promise<ModuleEntity[]> {
    return this.moduleRepo.find({
      where: { course: { id: courseId } },
      relations: ['lessons'], // darslar bilan birga qaytaradi
    });
  }

  // ➕ Yangi modul yaratish
  async create(
    courseId: number,
    dto: CreateModuleDto,
    user: Partial<User> | any, // agar user modeli bor bo‘lsa `Partial<User>`
  ): Promise<ModuleEntity> {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const newModule = this.moduleRepo.create({
      name: dto.name,
      course,
      // createdBy: user, // kerak bo‘lsa bu yerga qo‘shiladi
    });

    return this.moduleRepo.save(newModule);
  }
}