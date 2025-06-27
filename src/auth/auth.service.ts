import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const password = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password });
    return this.userRepo.save(user);
  }

  async login(dto: LoginDto, response: any) {
    const user = await this.userRepo.findOneBy({ email: dto.email });
    if (!user) throw new UnauthorizedException('Email xato');
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Parol xato');

    const accessToken = this.jwtService.sign({ sub: user.id, role: user.role });
    const refreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

    response.cookie('refresh_token', refreshToken, { httpOnly: true });
    return { accessToken };
  }

  async refresh(userId: number) {
    const accessToken = this.jwtService.sign({ sub: userId });
    return { accessToken };
  }
}
