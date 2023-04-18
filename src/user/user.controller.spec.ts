import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from "./user.controller";
import { UserRepository } from './user.repository';

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
                        list: jest.fn, 
                        getByEmail: jest.fn, 
                        getById: jest.fn, 
                        update: jest.fn, 
                        remove: jest.fn
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
});