import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';


@Controller('/users')
export class UserController {

    constructor(private _userRepository: UserRepository) {}    

    @Post()
    async createUser(@Body() userData: CreateUserDTO) {
        this._userRepository.save(userData);
        
        return userData;        
    }

    @Get()
    async listUsers() {
        return this._userRepository.list();
    }
}