import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoriesRepositoryInMemory } from '../../database/in-memory/categoryRepositoryInMemory';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoriesRepository: CategoriesRepositoryInMemory;

  beforeAll(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new category', async () => {
    const categoryData: CreateCategoryDto = { name: 'Eletrônicos' };
    const category: Category = await categoriesRepository.create(categoryData);
    expect(category.name).toBe('Eletrônicos');
    expect(category).toHaveProperty('id');
  });
  // it("should not be able to create an existing category", async () => {
  //   const categoryData: Category = { name: "Lazer" };
  //   await categoriesRepository.create(categoryData);
  //   await expect(
  //     categoriesRepository.create(categoryData)
  //   ).rejects.toThrowError("Category already exists!");
  // });
});
