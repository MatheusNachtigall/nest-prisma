import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() data: CreateBookDto): Promise<Book> {
    return this.bookService.create(data);
  }

  @Get()
  async get(): Promise<Array<Book>> {
    return this.bookService.get();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Book): Promise<Book> {
    return this.bookService.update(id, data);
  }
}
