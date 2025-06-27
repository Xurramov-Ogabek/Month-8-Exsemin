import { IsEmail, IsNotEmpty, MinLength, IsIn, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Ism majburiy maydon' })
  name: string;

  @IsNotEmpty({ message: 'Email majburiy maydon' })
  @IsEmail({}, { message: 'Email formati noto‘g‘ri' })
  email: string;

  @IsNotEmpty({ message: 'Parol majburiy maydon' })
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  password: string;

  @IsOptional()
  @IsIn(['admin', 'teacher', 'student'], { message: 'Role faqat admin, teacher yoki student bo‘lishi mumkin' })
  role?: 'admin' | 'teacher' | 'student';
}