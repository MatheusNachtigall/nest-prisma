import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [BookModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
