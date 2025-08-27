import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}