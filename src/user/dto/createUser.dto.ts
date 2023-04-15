import { IsEmail, IsNotEmpty, IsString, MinLength, isNotEmpty } from 'class-validator';
import { IsEmailUnique } from '../validations/is-email-unique.validator';

export class CreateUserDTO {
    
    @IsNotEmpty({message: 'This name is incorrect'})
    name: string;

    @IsEmail(undefined, {message: 'email must be a valid email'})
    @IsEmailUnique({})
    email: string;

    @MinLength(6)
    password: string;
}