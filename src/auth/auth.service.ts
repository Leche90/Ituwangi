import { Injectable, ConflictException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { AdminSignupDto } from './dtos/admin-signup.dto';
import { AdminLoginDto } from './dtos/admin-login.dto';

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

  // Admin signup
  async signupAdmin(dto: AdminSignupDto, createdById?: number) {
    const adminCount = await this.prisma.user.count({ where: { role: 'ADMIN' } });
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    // If no admin exists, create first one automatically
    if (adminCount === 0) {      
      const admin = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          fullName: dto.fullName,
          role: 'ADMIN',
        },      
      });

      return { message: 'First admin created sccessfully', 
        admin };
      }       
      
      // If admins exist, create a new one (requires role guard)
      const newAdmin = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          fullName: dto.fullName,
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

      return { message: 'Admin created successfully', newAdmin };
    }   

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);

    // Ensure freelancers login here only
    if (user.role !== 'FREELANCER') {
      throw new UnauthorizedException('Access denied');
    }
    const token = this.signToken(user.id, user.email, user.role);
    
    // Return safe user (no password)
    const safeUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
    
    return { user: safeUser, access_token: token };
  }

  // Admin login
  async loginAdmin(dto: AdminLoginDto) {
    const user = await this.validateUser(dto.email, dto.password);

    // Ensure only admins login here
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('You are not authorized to access');
    }

    const token = this.signToken(user.id, user.email, user.role);

    const safeAdmin = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };

    return { admin: safeAdmin, access_token: token };
  }

  private signToken(userId: number, email: string, role: string) {
    return this.jwtService.sign(
      { sub: userId, email, role },
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    );
  }

    // Token generator
  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role};
    return {
      access_token: this.jwtService.sign(payload)
    };
  } 
}
