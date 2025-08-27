import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signupFreelancer(dto: SignupDto): Promise<{
        user: {
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            id: number;
        };
        access_token: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        email: string;
        password: string;
        fullName: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: number;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        access_token: string;
    }>;
    private signToken;
}
