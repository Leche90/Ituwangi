import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('freelancer/finance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('FREELANCER')
export class FreelancerFinanceController {
  constructor(private readonly prisma: PrismaService) {}

  // Earnings over months
  @Get('earnings')
  async getEarnings() {
    // Dummy response — replace with DB query later
    return [
      { month: 'Jan', value: 1200 },
      { month: 'Feb', value: 2300 },
      { month: 'Mar', value: 1800 },
      { month: 'Apr', value: 2500 },
    ];
  }

  // Summary card
  @Get('summary')
  async getFinanceSummary() {
    return {
      totalEarned: 7800,
      pendingInvoices: 3,
      overdueInvoices: 1,
    };
  }
}
