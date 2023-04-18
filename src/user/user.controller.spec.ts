import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuid } from 'uuid';
import { UserController } from "./user.controller";
import { UserRepository } from './user.repository';
import { ListUserDTO } from './dto/listUser.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { NestResponseBuilder } from '../core/http/nest-response-builder';

const listUserDTO: ListUserDTO[] = [
    new ListUserDTO (uuid(), 'Wesley'),
    new ListUserDTO (uuid(), 'Will'),
    new ListUserDTO (uuid(), 'Natalia')
];

const newUserEntity = new UserEntity({id: uuid(), name: 'Will', email: 'will@hotmail.com', password : '123456'});
const newUserEntityNoMail = new UserEntity({id: uuid(), name: 'Will', password : '123456'});
const nestResponse =  new NestResponseBuilder().withStatus(HttpStatus.CREATED).withHeader({'Location': `/users/${newUserEntity.name}`
    }).withBody({user: newUserEntity, message: 'user created!.' }).build();

describe('UserController', () => {
    let userController: UserController;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                { 
                    provide: UserRepository,
                    useValue: {
                        save: jest.fn(),
                        list: jest.fn().mockResolvedValue(listUserDTO), 
                        getByEmail: jest.fn(), 
                        getById: jest.fn(), 
                        update: jest.fn(), 
                        remove: jest.fn()
                    },
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    describe('listUsers', () => {
        it('Should return a list of users', async () => {
            //Arrange
            //Act
            const result = await userController.listUsers();
            //Assert
            expect(result).toEqual(listUserDTO);
            expect(typeof result).toEqual('object');
            expect(userRepository.list).toHaveBeenCalledTimes(1);
        });

        it('Should throw a NotFoundException', async () => {
            try {
                await userController.listUsers();
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);            
            }
        });

        it('Should throw a Exception', async () => {    
            //arrange        
            jest.spyOn(userRepository, 'list').mockRejectedValueOnce(new Error());
            //assert
            expect(userController.listUsers()).rejects.toThrowError();
        });
    });

    describe('createUser', () => {
        it('Should return an user created', async () => {
            //Arrange
            jest.spyOn(userRepository, 'save').mockResolvedValueOnce(newUserEntity);

            const userData = new CreateUserDTO({
                name: newUserEntity.name, 
                email: newUserEntity.email, 
                password: newUserEntity.password
            });
            //Act
            const result = await userController.createUser(userData);
            //Assert
            expect(result).toEqual(nestResponse);
            expect(typeof result).toEqual('object');
            expect(userRepository.save).toHaveBeenCalledTimes(1);
            expect(userRepository.save).toHaveBeenCalledWith(userData);
        });

        it('Should throw a Email Exception', async () => {
            //arrange
            jest.spyOn(userRepository, 'list').mockRejectedValueOnce(new Error());

            const userData = new CreateUserDTO({
                name: newUserEntity.name,                 
                password: newUserEntity.password
            });
   
            //Assert
            expect(userController.createUser(userData)).rejects.toThrowError();        
        });
    });
});