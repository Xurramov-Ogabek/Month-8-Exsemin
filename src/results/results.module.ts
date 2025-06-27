import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Assignment } from '../assignments/entities/assignment.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module'; // ✅ MUHIM QO‘SHIMCHA

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, User]),
    AuthModule, // ✅ JwtService uchun shart
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}