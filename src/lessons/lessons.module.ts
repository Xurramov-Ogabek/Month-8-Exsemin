import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from './entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])], // 🟢 MUHIM
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [TypeOrmModule], // Agar boshqa joyda kerak bo‘lsa
})
export class LessonsModule {}