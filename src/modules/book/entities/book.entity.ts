import { Category } from '@prisma/client';

export class Book {
  id: string;
  name: string;
  description: string;
  bar_code: string;
  created_at: Date;
  updated_at: Date;
  category?: Category;
}
