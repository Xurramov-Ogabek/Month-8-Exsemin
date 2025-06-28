import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ModuleEntity } from './entities/module.entity';
import { Course } from '../courses/entities/course.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModuleEntity, Course]),
    AuthModule,
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [TypeOrmModule], 
})
export class ModulesModule {}