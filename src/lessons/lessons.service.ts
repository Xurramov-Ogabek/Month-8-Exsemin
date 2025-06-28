import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ModuleEntity } from '../modules/entities/module.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,

    @InjectRepository(ModuleEntity)
    private readonly moduleRepo: Repository<ModuleEntity>,
  ) {}

  async findByModule(moduleId: number) {
    return this.lessonRepo.find({
      where: { module: { id: moduleId } },
    });
  }

  async create(moduleId: number, dto: CreateLessonDto) {
    const module = await this.moduleRepo.findOne({
      where: { id: moduleId },
    });
    if (!module) throw new NotFoundException('Module not found');

    const lesson = this.lessonRepo.create({ ...dto, module });
    return this.lessonRepo.save(lesson);
  }

  async update(moduleId: number, lessonId: number, dto: UpdateLessonDto) {
    const lesson = await this.lessonRepo.findOne({
      where: { id: lessonId, module: { id: moduleId } },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');

    Object.assign(lesson, dto);
    return this.lessonRepo.save(lesson);
  }

  async delete(moduleId: number, lessonId: number) {
    const lesson = await this.lessonRepo.findOne({
      where: { id: lessonId, module: { id: moduleId } },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');

    return this.lessonRepo.remove(lesson);
  }
}