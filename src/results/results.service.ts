import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from '../assignments/entities/assignment.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Assignment) private repo: Repository<Assignment>,
  ) {}

  findByStudent(studentId: number) {
    return this.repo.find({ where: { student: { id: studentId } }, relations: ['module'] });
  }
}
