import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrlContact = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {}

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrlContact}/${id}`);
  }
}
