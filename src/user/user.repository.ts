import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

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