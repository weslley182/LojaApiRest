import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    async save(user: CreateUserDTO) {
        const userEntity = new UserEntity();
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.name = user.name;
        userEntity.id = uuid();

        this.users.push(userEntity);
        return userEntity;
    }

    async list() {
        return this.users;
    }

    async getByEmail(email: string) {
        return this.users.find(user => user.email === email);
    }

    private async getById(id: string) {
        const user = this.users.find(user => user.id === id);
        if(!user) {
            throw new Error('User not exists');
        }

        return user;
    }

    async update(id: string, updateData: Partial<UserEntity>) {
        const user = await this.getById(id);        

        Object.entries(updateData).forEach( ([key, value]) => {
            if(key === id) {
                return;
            }
            user[key] = value;
        })

        return user;

    }

    async remove(id: string) {
        const user = await this.getById(id);
        this.users = this.users.filter(
            u => u.id !== id
        )
        return user;
    }
}