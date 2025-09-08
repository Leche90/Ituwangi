import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { AdminSignupDto } from './dtos/admin-signup.dto';
import { AdminLoginDto } from './dtos/admin-login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  // Public signup for freelancers
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signupFreelancer(dto);
  }

  // Login for freelancers
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

    // create first admin (no auth required)    
  @Post('admin/first-admin')
  async firstAdmin(@Body() dto: AdminSignupDto) {
    const adminCount = await this.prisma.user.count({ 
      where: { role: 'ADMIN' } 
    });
    
    if (adminCount > 0) {
      throw new UnauthorizedException('First admin already exists. Use /admin/signup instead.');
    }
    
    return this.authService.signupAdmin(dto);
  }

  // PROTECTED: Endpoint for creating additional admins (requires admin auth)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('admin/signup')
  async adminSignup(@Body() dto: AdminSignupDto) {
    return this.authService.signupAdmin(dto);
  }

  // Login for admins
  @HttpCode(HttpStatus.OK)
  @Post('admin/login')
  async adminLogin(@Body() dto: AdminLoginDto) {
    return this.authService.loginAdmin(dto);
  }
}
