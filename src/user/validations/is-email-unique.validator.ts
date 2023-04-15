import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
    
    constructor(private _userRepository: UserRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const user = await this._userRepository.getByEmail(value);        
        return user === undefined;
    }
    
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return 'this email is already in use';
    }
}

export const IsEmailUnique = (options: ValidationOptions) => {
    return (object: Object, prop: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: prop,
            options: options,
            constraints : [],
            validator: IsEmailUniqueValidator
        });
    }
}
