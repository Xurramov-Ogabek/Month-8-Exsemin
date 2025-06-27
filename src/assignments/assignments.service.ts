import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { ModuleEntity } from '../modules/entities/module.entity';
import { User } from '../users/entities/user.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private repo: Repository<Assignment>,

    @InjectRepository(ModuleEntity)
    private moduleRepo: Repository<ModuleEntity>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async submit(moduleId: number, userId: number, dto: CreateAssignmentDto) {
    const module = await this.moduleRepo.findOneBy({ id: moduleId });
    if (!module) throw new NotFoundException('Modul topilmadi');

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    const assignment = this.repo.create({
      content: dto.content,
      grade: null,
      module: { id: moduleId } as ModuleEntity,
      student: { id: userId } as User,
    });

    return this.repo.save(assignment);
  }
}
