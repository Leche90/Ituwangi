import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './controllers/admin/admin.controller';
import { FreelancerController } from './controllers/freelancer/freelancer.controller';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database module
    PrismaModule,

    // Core features
    AuthModule,
    FreelancerModule,
    AdminModule,
  ],
  
  controllers: [FreelancerController, AdminController],
})
export class AppModule {}
