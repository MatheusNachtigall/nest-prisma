import { CreateBookDto } from '../../modules/book/dto/create-book.dto';
import { Book } from '../../modules/book/entities/book.entity';
import { v4 as uuid } from 'uuid';

class BooksRepositoryInMemory {
  private books: Book[] = [];

  async create(book: CreateBookDto): Promise<Book> {
    const bookExists = await this.exists(book.name);

    if (bookExists) {
      throw new Error(`Book already exists!`);
    }

    const newBook: Book = {
      id: uuid(),
      name: book.name,
      description: book.description,
      bar_code: book.bar_code,
      category_id: book.category_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.books.push(newBook);
    return newBook;
  }

  async exists(bookName: string): Promise<boolean> {
    const book = this.books.some((book) => book.name === bookName);
    return book;
  }
}

export { BooksRepositoryInMemory };
