import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/users')
export class UserController {

    constructor(private _userRepository: UserRepository) {}    

    @Post()
    async createUser(@Body() userData: CreateUserDTO): Promise<NestResponse> {        

        let userEntity = await this._userRepository.save(userData);
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
    @ApiOperation({ summary: 'Search for all registered user on system' })
    @ApiResponse({ 
        status: 200, 
        description: 'User created' })
    @ApiResponse({ status: 400, description: 'User has missing/invalid values' })
    @ApiResponse({ status: 500, description: 'Oops! Cant create your user right now' })
    async listUsers() {
        const allUsers = await this._userRepository.list();
        
        if(allUsers.length == 0){
            throw new NotFoundException();
        }
        
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