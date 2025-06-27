import { Controller, Get, Param } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('courses/:courseId/modules')
export class ModulesController {
  constructor(private readonly service: ModulesService) {}

  @Get()
  findByCourse(@Param('courseId') courseId: string) {
    return this.service.findByCourse(+courseId);
  }
}
