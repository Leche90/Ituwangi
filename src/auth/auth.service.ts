import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { AdminSignupDto } from './dtos/admin-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Signup only for freelancers (public)
  async signupFreelancer(dto: SignupDto) {
    // Prevent duplicates
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        password: hashed,
        role: 'FREELANCER',              
      },

      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });

    const token = this.signToken(user.id, user.email, user.role);
    return { user, access_token: token };
  }

  // Validate credentials for login (both freelancer & admin)
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  // Create admin (only by another admin)
  async signupAdmin(dto: AdminSignupDto, creatorId: number) {
    const creator = await this.prisma.user.findUnique({ where: { id: creatorId } });
    if (!creator || creator.role !== 'ADMIN') {
      throw new UnauthorizedException('Only admins can create new admin accounts');
    }
    
    // Prevent duplicates
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        fullName:dto.fullName,
        password: hashed,
        role: 'ADMIN',
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });
  }


  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const token = this.signToken(user.id, user.email, user.role);
    // return safe user (no password)
    const safeUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
    return { user: safeUser, access_token: token };
  }

  private signToken(userId: number, email: string, role: string) {
    return this.jwtService.sign(
      { sub: userId, email, role },
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    );
  }
}
