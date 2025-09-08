import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { AdminSignupDto } from './dtos/admin-signup.dto';
import { AdminLoginDto } from './dtos/admin-login.dto';
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
    signupAdmin(dto: AdminSignupDto, createdById?: number): Promise<{
        message: string;
        admin: {
            email: string;
            password: string;
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        newAdmin?: undefined;
    } | {
        message: string;
        newAdmin: {
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            id: number;
        };
        admin?: undefined;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: number;
            email: string;
            fullName: string;
            role: "FREELANCER";
        };
        access_token: string;
    }>;
    loginAdmin(dto: AdminLoginDto): Promise<{
        admin: {
            id: number;
            email: string;
            fullName: string;
            role: "ADMIN";
        };
        access_token: string;
    }>;
    private signToken;
    private generateToken;
}
