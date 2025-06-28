import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { User } from '../users/entities/user.entity';
import { Assignment } from '../assignments/entities/assignment.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepo: Repository<Result>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,
  ) {}

  async findByStudent(studentId: number) {
    return this.resultRepo.find({
      where: { student: { id: studentId } },
      relations: ['student', 'assignment', 'assignment.module'],
    });
  }

  async create(dto: CreateResultDto) {
    const student = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!student) throw new NotFoundException('Foydalanuvchi topilmadi');

    const assignment = await this.assignmentRepo.findOne({ where: { id: dto.assignmentId } });
    if (!assignment) throw new NotFoundException('Assignment topilmadi');

    const result = this.resultRepo.create({
      score: dto.score,
      student,
      assignment,
    });

    return this.resultRepo.save(result);
  }
}