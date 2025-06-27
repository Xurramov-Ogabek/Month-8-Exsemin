// import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards } from '@nestjs/common';
// import { CoursesService } from './courses.service';
// import { CreateCourseDto } from './dto/create-course.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { Roles } from '../auth/roles.decorator';
// import { RolesGuard } from '../auth/roles.guard';

// @Controller('courses')
// export class CoursesController {
//   constructor(private readonly service: CoursesService) {}

//   @Get()
//   findAll() {
//     return this.service.findAll();
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   @Post()
//   create(@Body() dto: CreateCourseDto) {
//     return this.service.create(dto);
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   @Put(':id')
//   update(@Param('id') id: string, @Body() dto: CreateCourseDto) {
//     return this.service.update(+id, dto);
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   @Delete(':id')
//   delete(@Param('id') id: string) {
//     return this.service.delete(+id);
//   }
// }

import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  // 👥 All users (no roles)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 🔐 Only admin can create
  @Post()
  @Roles('admin')
  create(@Body() dto: CreateCourseDto) {
    return this.service.create(dto);
  }

  // 🔐 Only admin can update
  @Put(':id')
  @Roles('admin')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCourseDto,
  ) {
    return this.service.update(id, dto);
  }

  // 🔐 Only admin can delete
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}