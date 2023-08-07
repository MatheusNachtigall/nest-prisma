import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BooksRepositoryInMemory } from '../../database/in-memory/bookRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '../../database/in-memory/categoryRepositoryInMemory';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { Category } from '../category/entities/category.entity';
import { PrismaService } from '../../database/PrismaService';

describe('BookService', () => {
  let service: BookService;
  let booksRepository: BooksRepositoryInMemory;
  let categoriesRepository: CategoriesRepositoryInMemory;

  beforeAll(() => {
    booksRepository = new BooksRepositoryInMemory();
    categoriesRepository = new CategoriesRepositoryInMemory();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, PrismaService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be able to create a book with a category_id (need to create category first)', async () => {
    const category: Category = await categoriesRepository.create({
      name: 'Aventura',
    });

    const bookData: CreateBookDto = {
      name: 'Harry Potter',
      description: 'Bruxo muito maneiro',
      bar_code: '987654321',
      category_id: category.id,
    };

    const book: Book = await booksRepository.create(bookData);
    expect(book.name).toBe('Harry Potter');
    expect(book).toHaveProperty('id');
  });
  // it("should not be able to create an existing book", async () => {
  //   const bookData: Book = { name: "Lazer" };
  //   await booksRepository.create(bookData);
  //   await expect(
  //     booksRepository.create(bookData)
  //   ).rejects.toThrowError("Book already exists!");
  // });
});
