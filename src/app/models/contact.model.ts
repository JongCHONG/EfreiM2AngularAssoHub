import { Category } from './category.model';

export interface Contact {
  id?: string;
  title: string;
  email: string;
  category_Id: string;
  user_Id: string;
  category?: Category;
}
