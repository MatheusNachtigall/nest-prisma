export class CreateCategoryDto {
  id?: string;
  name: string;
  description: string;
  bar_code: string;
  created_at?: Date | string;
}
