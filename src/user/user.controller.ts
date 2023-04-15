import { UserRepository } from './user.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';


@Controller('/users')
export class UserController {

    private userRepository = new UserRepository();

    @Post()
    async createUser(@Body() userData) {
        this.userRepository.save(userData);
        
        return userData;        
    }

    @Get()
    async listUsers() {
        return this.userRepository.list();
    }
}