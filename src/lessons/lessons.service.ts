import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private repo: Repository<Lesson>,
  ) {}

  findByModule(moduleId: number) {
    return this.repo.find({ where: { module: { id: moduleId } } });
  }
}