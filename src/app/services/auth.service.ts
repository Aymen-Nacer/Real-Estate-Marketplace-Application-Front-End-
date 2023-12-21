import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  private currentUser = {
    userId: 0,
    username: '',
  };

  login(username: string, password: string): boolean {
    if (username === 'example' && password === 'password') {
      this.isLoggedIn = true;
      this.currentUser = {
        userId: 1,
        username: username,
      };
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = {
      userId: 0,
      username: '',
    };
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
