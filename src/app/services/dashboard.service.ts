import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, Category } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrlContact = 'http://localhost:3000/contacts';
  private apiUrlCategories = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getContactsByUser(userId: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrlContact}?user_Id=${userId}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrlCategories}`);
  }
}
