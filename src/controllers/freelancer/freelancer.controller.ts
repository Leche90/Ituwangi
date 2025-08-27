import { Controller, Get } from "@nestjs/common";

@Controller('/')
export class FreelancerController {
    @Get()
    getHome(): string {
        return 'Welcome to the Ituwangi Freelancer SaaS API 🚀';
    }
}