import { Category } from './category.model';

export interface Contact {
  id: string;
  title: string;
  email: string;
  category_id: string;
  user_id: string;
  category?: Category;
}
