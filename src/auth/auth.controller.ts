import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { AdminSignupDto } from './dtos/admin-signup.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Public signup for freelancers
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signupFreelancer(dto);
  }

  // Login (both freelancer & admin)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // create admin manually
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('admin/signup')
  async signupAdmin(@Req() req: Request, @Body() dto: AdminSignupDto) {
    const creatorId = req.user['id'];
    return this.authService.signupAdmin(dto, creatorId);
  }
}
