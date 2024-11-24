import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailData } from 'src/app/models/email-data.models';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrlSendEmail = 'http://localhost:3001/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(emailData: EmailData): Observable<EmailData> {
    return this.http.post<EmailData>(this.apiUrlSendEmail, emailData);
  }
}
