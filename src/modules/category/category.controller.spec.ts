/**
 * asdasd@jest-environment ./prisma/prisma-environment-jest
 */

import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../../database/PrismaService';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, PrismaService],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    expect(await controller.create({ name: 'Eletrodomesticos' })).toEqual({
      id: expect.any(String),
      name: 'Eletrodomesticos',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  // it('should NOT create a category with an empty name', async () => {
  //   expect(await controller.create({ name: '' })).toThrowError();
  // });
});
