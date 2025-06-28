import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Assignment } from '../assignments/entities/assignment.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Result } from './entities/result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, User, Result]),
    AuthModule, 
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}