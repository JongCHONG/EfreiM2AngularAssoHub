import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrlContact = 'http://localhost:3000/contacts';
  private apiUrlCategories = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getContactsByUserId(userId: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrlContact}?user_Id=${userId}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    const userId = localStorage.getItem('userId');

    if (userId) {
      contact.user_Id = userId;
    }
    return this.http.post<Contact>(this.apiUrlContact, contact);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrlCategories}`);
  }
}
