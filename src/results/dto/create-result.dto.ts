import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResultDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  assignmentId: number;

  @IsNumber()
  score: number;
}