import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
    id: string;

    @Expose({name: 'Nome'})
    name: string;
    
    email: string;
    
    //testing interceptor
    @Exclude()
    password: string;
}