import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() data: BookDTO): Promise<BookDTO> {
    return this.bookService.create(data);
  }

  @Get()
  async get(): Promise<Array<BookDTO>> {
    return this.bookService.get();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: BookDTO,
  ): Promise<BookDTO> {
    return this.bookService.update(id, data);
  }
}
