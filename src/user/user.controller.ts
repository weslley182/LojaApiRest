import { UserEntity } from './user.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { v4 as uuid } from 'uuid';

@Controller('/users')
export class UserController {

    constructor(private _userRepository: UserRepository) {}    

    @Post()
    async createUser(@Body() userData: CreateUserDTO) {
        const userEntity = new UserEntity();
        userEntity.email = userData.email;
        userEntity.password = userData.password;
        userEntity.name = userData.name;
        userEntity.id = uuid();

        this._userRepository.save(userEntity);        
        return { id: userEntity.id, message: 'user created!.' }
    }

    @Get()
    async listUsers() {
        return this._userRepository.list();
    }
}