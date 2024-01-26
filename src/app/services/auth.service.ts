import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private user: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
  };

  private baseUrl = environment.apiBaseUrl + '/api/auth';

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  get currentUser(): User {
    return this.user;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.baseUrl}/signin`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          if (response.success) {
            this.loggedIn = true;
            this.user = response.user;
          }
        })
      );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/signup`,
      {
        username,
        email,
        password,
      },
      { observe: 'response' }
    );
  }

  logout(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/signout`, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.loggedIn = false;
          this.user = {
            id: 0,
            username: '',
            email: '',
            password: '',
          };
        })
      );
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): User {
    return this.user;
  }

  printProperties(): void {
    console.log('isLoggedIn:', this.loggedIn);
    console.log('currentUser:', this.user);
  }
}
