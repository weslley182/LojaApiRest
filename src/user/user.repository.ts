import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    async save(user: UserEntity) {
        this.users.push(user);        
    }

    async list() {
        return this.users;
    }

    async getByEmail(email: string) {
        return this.users.find(user => user.email === email);
    }

    async getById(id: string) {
        return this.users.find(user => user.id === id);
    }

    async update(id: string, updateData: Partial<UserEntity>) {
        const user = await this.getById(id);
        if(!user) {
            throw new Error('User not exists');
        }

        Object.entries(updateData).forEach( ([key, value]) => {
            if(key === id) {
                return;
            }
            user[key] = value;
        })

        return user;

    }
}