import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';

@Controller('results')
export class ResultsController {
  constructor(private readonly service: ResultsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findMine(@Req() req) {
    return this.service.findByStudent(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() dto: CreateResultDto) {
    const user = req.user;

    if (user.role !== 'admin' && user.role !== 'teacher') {
      throw new ForbiddenException('Faqat o‘qituvchi yoki admin qo‘shishi mumkin');
    }

    return this.service.create(dto);
  }
}