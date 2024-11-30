import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlUser = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCurrentUser(): Observable<User | null> {
    const userId = this.authService.getUserId();

    if (userId) {
      return this.http.get<User>(`${this.apiUrlUser}/${userId}`);
    } else {
      console.error('Utilisateur non trouvé');
      return of(null);
    }
  }
}
