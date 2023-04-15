import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';


@Controller('/users')
export class UserController {

    constructor(private _userRepository: UserRepository) {}    

    @Post()
    async createUser(@Body() userData) {
        this._userRepository.save(userData);
        
        return userData;        
    }

    @Get()
    async listUsers() {
        return this._userRepository.list();
    }
}