export interface Contact {
  id: string;
  title: string;
  email: string;
  category_id: string;
  user_id: string;
  category?: Category;
}

export interface Category {
  id: string;
  category_nma: string;
}
