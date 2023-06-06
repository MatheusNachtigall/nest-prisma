import { Category } from '@prisma/client';
import { IsString } from 'class-validator';

export class Book {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  bar_code: string;

  created_at: Date;
  updated_at: Date;

  @IsString()
  category_id: string;

  category?: Category;
}
