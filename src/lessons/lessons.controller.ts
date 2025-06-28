import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('modules/:moduleId/lessons')
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  // 1. GET: Barcha darslarni ko‘rish
  @Get()
  findByModule(@Param('moduleId') moduleId: string) {
    return this.service.findByModule(+moduleId);
  }

  // 2. POST: Yangi dars qo‘shish
  @Post()
  create(
    @Param('moduleId') moduleId: string,
    @Body() dto: CreateLessonDto,
  ) {
    return this.service.create(+moduleId, dto);
  }

  // 3. PUT: Darsni yangilash
  @Put(':lessonId')
  update(
    @Param('moduleId') moduleId: string,
    @Param('lessonId') lessonId: string,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.service.update(+moduleId, +lessonId, dto);
  }

  // 4. DELETE: Darsni o‘chirish
  @Delete(':lessonId')
  delete(
    @Param('moduleId') moduleId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.service.delete(+moduleId, +lessonId);
  }
}