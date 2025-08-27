import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    @Get()
    getDashboard(): string {
        return 'Welcome to the Ituwangi Admin Dashboard 🚀';
    }
}