import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() description: string;
  @IsNumber() price: number;
  @IsString() teacher: string;
  @IsString() category: string;
  @IsString() level: string;
}