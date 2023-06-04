import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  private async categoryExists({ id }): Promise<boolean> {
    const categoryExists: Category = await this.prisma.category.findUnique({
      where: { id: id },
    });
    return !!categoryExists;
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    if (await this.categoryExists({ id: '' })) {
      throw new Error(`Category already exists`);
    }

    const category: Category = await this.prisma.category.create({ data });
    return category;
  }

  async findAll(): Promise<Array<Category>> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string): Promise<Category> {
    return await this.prisma.category.findUnique({ where: { id: id } });
  }

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    if (!(await this.categoryExists({ id }))) {
      throw new Error(`Category doesn't exist`);
    }
    return await this.prisma.category.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    if (!(await this.categoryExists({ id }))) {
      throw new Error(`Category doesn't exist`);
    }
    await this.prisma.category.delete({
      where: {
        id: id,
      },
    });

    return;
  }
}
