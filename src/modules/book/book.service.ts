import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BookDTO } from './book.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  private async bookExists(data: BookDTO): Promise<boolean> {
    const bookExists: BookDTO = await this.prisma.book.findFirst({
      where: {
        OR: {
          bar_code: data.bar_code || '',
          id: data.id || '',
        },
      },
    });
    return !!bookExists;
  }

  async create(data: BookDTO): Promise<BookDTO> {
    if (await this.bookExists(data)) {
      throw new Error(`Book already exists`);
    }

    const book = await this.prisma.book.create({ data });
    return book;
  }

  async get(): Promise<Array<BookDTO>> {
    return await this.prisma.book.findMany();
  }

  async update(id: string, data: BookDTO): Promise<BookDTO> {
    if (!(await this.bookExists(data))) {
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
