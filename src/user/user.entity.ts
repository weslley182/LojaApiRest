import { Exclude } from 'class-transformer';

export class UserEntity {
    id: string;
    name: string;
    email: string;
    
    //testing interceptor
    @Exclude()
    password: string;
}