import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  private async bookExists({ id, bar_code }): Promise<boolean> {
    const bookExists: Book = await this.prisma.book.findFirst({
      where: {
        OR: {
          bar_code,
          id,
        },
      },
    });
    return !!bookExists;
  }

  async create(data: CreateBookDto): Promise<Book> {
    if (await this.bookExists({ id: '', bar_code: data.bar_code })) {
      throw new Error(`Book already exists`);
    }

    const book: Book = await this.prisma.book.create({ data });
    return book;
  }

  async get(): Promise<Array<Book>> {
    return await this.prisma.book.findMany({ include: { category: true } });
  }

  async update(id: string, data: UpdateBookDto): Promise<Book> {
    if (!(await this.bookExists({ id, bar_code: data.bar_code }))) {
      throw new Error(`Book doesn't exist`);
    }
    return await this.prisma.book.update({
      data,
      where: {
        id: id,
      },
    });
  }
}
