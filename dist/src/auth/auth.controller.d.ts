import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { AdminSignupDto } from './dtos/admin-signup.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
            role: import(".prisma/client").$Enums.UserRole;
        };
        access_token: string;
    }>;
    signupAdmin(req: Request, dto: AdminSignupDto): Promise<{
        email: string;
        fullName: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        id: number;
    }>;
}
