import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { AdminSignupDto } from './dtos/admin-signup.dto';
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

  // Login (both freelancer & admin)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // create admin - first admin i automatic, others require authentication
  @Post('admin/signup')
  async signupAdmin(@Req() req: Request, @Body() dto: AdminSignupDto) {
    const adminCount = await this.prisma.user.count({ where: { role: 'ADMIN' } });

    //  First admin - no authentication required
    if (adminCount === 0) {
      return this.authService.signupAdmin(dto);
    }

    // Other admins - authentication & role guard required
    if (!req.user) {
      throw new UnauthorizedException('Login as admin to create another admin')
    }

    // Check if current user is admin
    const currentUser = req.user as any;
    if (currentUser.role !== 'ADMIN') {
      throw new UnauthorizedException('Only admins can create new admins');
    }

    return this.authService.signupAdmin(dto);
  }
}
