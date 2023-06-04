import { CreateCategoryDto } from '../../modules/category/dto/create-category.dto';
import { Category } from '../../modules/category/entities/category.entity';
import { v4 as uuid } from 'uuid';

class CategoriesRepositoryInMemory {
  private categories: Category[] = [];

  async create(category: CreateCategoryDto): Promise<Category> {
    const categoryExists = await this.exists(category.name);

    if (categoryExists) {
      throw new Error(`Category already exists!`);
    }

    const newCategory: Category = {
      id: uuid(),
      name: category.name,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  async exists(categoryName: string): Promise<boolean> {
    const category = this.categories.some(
      (category) => category.name === categoryName,
    );
    return category;
  }
}

export { CategoriesRepositoryInMemory };
