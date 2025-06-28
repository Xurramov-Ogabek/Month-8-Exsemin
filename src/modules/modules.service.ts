import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from './entities/module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/entities/user.entity'; 

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepo: Repository<ModuleEntity>,

    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  async findByCourse(courseId: number): Promise<ModuleEntity[]> {
    return this.moduleRepo.find({
      where: { course: { id: courseId } },
      relations: ['lessons'],
    });
  }

  async create(
    courseId: number,
    dto: CreateModuleDto,
    user: Partial<User> | any, 
  ): Promise<ModuleEntity> {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const newModule = this.moduleRepo.create({
      name: dto.name,
      course,

    });

    return this.moduleRepo.save(newModule);
  }
}