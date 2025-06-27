import { Controller, Get, Param } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('modules/:moduleId/lessons')
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  @Get()
  findByModule(@Param('moduleId') moduleId: string) {
    return this.service.findByModule(+moduleId);
  }
}
