export interface Contact {
  id?: string;
  title: string;
  email: string;
  category_id: string;
  user_Id: string;
  category?: Category;
}

export interface Category {
  id: string;
  category_nma: string;
}
