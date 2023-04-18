import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuid } from 'uuid';
import { UserController } from "./user.controller";
import { UserRepository } from './user.repository';
import { ListUserDTO } from './dto/listUser.dto';

const listUserDTO: ListUserDTO[] = [
    new ListUserDTO (uuid(), 'Wesley'),
    new ListUserDTO (uuid(), 'Will'),
    new ListUserDTO (uuid(), 'Natalia')
];

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
                        save: jest.fn, 
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
    })
});