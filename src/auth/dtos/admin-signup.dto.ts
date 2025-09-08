import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AdminSignupDto {
    @IsEmail({}, { message: 'Please enter a valid email' })
    email: string;

    @IsNotEmpty({ message: 'Full name is required' })
    fullName: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;
}