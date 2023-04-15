import { UserEntity } from './user.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/listUser.dto';

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
        return { 
            user: new ListUserDTO(userEntity.id, userEntity.name), 
            message: 'user created!.' 
        }
    }

    @Get()
    async listUsers() {
        const allUsers = await this._userRepository.list();
        const list = allUsers.map(
            user => new ListUserDTO(
                user.id,
                user.name
            )
        );

        return list;
    }
}