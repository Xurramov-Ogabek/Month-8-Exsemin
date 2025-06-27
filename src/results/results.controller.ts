import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private readonly service: ResultsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findMine(@Req() req) {
    return this.service.findByStudent(req.user.sub);
  }
}
