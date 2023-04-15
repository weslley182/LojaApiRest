import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    private users = [];

    async save(user) {
        this.users.push(user);        
    }

    async list() {
        return this.users;
    }

    async getByEmail(email: string) {
        return this.users.find(user => user.email === email);
    }
}