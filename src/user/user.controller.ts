import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';

@Controller('/users')
export class UserController {

    constructor(private _userRepository: UserRepository) {}    

    @Post()
    async createUser(@Body() userData: CreateUserDTO): Promise<NestResponse> {
        
        const userEntity = new UserEntity();
        userEntity.email = userData.email;
        userEntity.password = userData.password;
        userEntity.name = userData.name;
        userEntity.id = uuid();        

        this._userRepository.save(userEntity);
        return new NestResponseBuilder()
            .withStatus(HttpStatus.CREATED)
            .withHeader({
                'Location': `/users/${userEntity.name}`
            })
            .withBody(                
                { 
                    user: userEntity, 
                    message: 'user created!.' 
                }
            )
            .build();

        // return { 
        //     user: new ListUserDTO(userEntity.id, userEntity.name), 
        //     message: 'user created!.' 
        // }
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

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDTO) {
        const user = await this._userRepository.update(id, updateData);
        return {
            user: user,
            message: 'User updated!'
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        const user = await this._userRepository.remove(id);
        return {
            user: user,
            message : "user removed"
        }
    }

    //testing interceptor
    @Get('/allUsers')
    async listNewUsers() {
        const allUsers = await this._userRepository.list();
        return allUsers;
    }

    @Get('/callError')
    async callAnError() {
        throw new Error('Calling a generic error.')
    }
}