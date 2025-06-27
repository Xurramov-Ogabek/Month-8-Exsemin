import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from './entities/module.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity) private repo: Repository<ModuleEntity>,
  ) {}

  findByCourse(courseId: number) {
    return this.repo.find({ where: { course: { id: courseId } }, relations: ['lessons'] });
  }
}