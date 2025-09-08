import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { AdminSignupDto } from './dtos/admin-signup.dto';
import { AdminLoginDto } from './dtos/admin-login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthController {
    private readonly authService;
    private readonly prisma;
    constructor(authService: AuthService, prisma: PrismaService);
    signup(dto: SignupDto): Promise<{
        user: {
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            id: number;
        };
        access_token: string;
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
    firstAdmin(dto: AdminSignupDto): Promise<{
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
    adminSignup(dto: AdminSignupDto): Promise<{
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
    adminLogin(dto: AdminLoginDto): Promise<{
        admin: {
            id: number;
            email: string;
            fullName: string;
            role: "ADMIN";
        };
        access_token: string;
    }>;
}
