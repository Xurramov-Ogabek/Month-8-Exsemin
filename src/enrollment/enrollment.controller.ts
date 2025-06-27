import { Controller, Post, Param, Req, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('courses/:courseId/enroll')
export class EnrollmentController {
  constructor(private readonly service: EnrollmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  enroll(@Param('courseId') courseId: string, @Req() req) {
    const userId = req.user.sub;
    return this.service.enroll(+courseId, userId);
  }
}