import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('courses/:courseId/modules')
export class ModulesController {
  constructor(private readonly service: ModulesService) {}

  // 🔍 Kursga tegishli modullarni olish
  @Get()
  findByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.service.findByCourse(courseId);
  }

  // ➕ Yangi modul yaratish (faqat tokenli foydalanuvchiga)
  @UseGuards(JwtAuthGuard)
  @Post()
  createModule(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() dto: CreateModuleDto,
    @Req() req: Request, // ✅ typing: express.Request
  ) {
    return this.service.create(courseId, dto, req.user);
  }
}