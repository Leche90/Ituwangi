import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AdminLoginDto {
    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}