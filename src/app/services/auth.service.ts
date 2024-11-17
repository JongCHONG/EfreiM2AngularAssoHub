import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  comparePasswords(password1: string, password2: string): boolean {
    return password1 === password2;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          if (this.comparePasswords(password, user.password)) {
            // Store user ID and username in localStorage
            localStorage.setItem('userId', user.id);
            localStorage.setItem('username', user.username);
            window.location.href = '/dashboard';
            return { success: true, user };
          } else {
            return {
              success: false,
              message: 'Email ou mot de passe incorrect',
            };
          }
        } else {
          return { success: false, message: 'Utilisateur non trouvé' };
        }
      })
    );
  }

  subscribeUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
