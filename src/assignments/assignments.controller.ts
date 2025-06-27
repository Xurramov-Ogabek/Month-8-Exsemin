import { Controller, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Controller('modules/:moduleId/assignment')
export class AssignmentsController {
  constructor(private readonly service: AssignmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  submit(@Param('moduleId') moduleId: string, @Body() dto: CreateAssignmentDto, @Req() req) {
    const userId = req.user.sub;
    return this.service.submit(+moduleId, userId, dto);
  }
}