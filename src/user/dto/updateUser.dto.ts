import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validations/is-email-unique.validator';


export class UpdateUserDTO {
    
    @IsOptional()
    @IsNotEmpty({message: 'This name is incorrect'})
    name: string;

    @IsOptional()
    @IsEmail(undefined, {message: 'email must be a valid email'})
    @IsEmailUnique({})
    email: string;

    @IsOptional()
    @MinLength(6)
    password: string;
}