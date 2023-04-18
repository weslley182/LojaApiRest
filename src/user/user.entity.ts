import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
    id: string;

    @Expose({name: 'Nome'})
    name: string;
    
    email: string;
    
    //testing interceptor
    @Exclude()
    password: string;
    
    constructor(user?: Partial<UserEntity>) {
        this.id = user?.id;
        this.name = user?.name;
        this.email = user?.email;
        this.password = user?.password;
    }
}