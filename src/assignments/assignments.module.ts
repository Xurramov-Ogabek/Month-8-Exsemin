import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { Assignment } from './entities/assignment.entity';
import { ModuleEntity } from '../modules/entities/module.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module'; // ✅ JwtService uchun kerak

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, ModuleEntity, User]),
    AuthModule, // ✅ JwtAuthGuard ishlashi uchun muhim
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}