import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  private users: User[] = [
    {
      userId: 2,
      username: 'aymennacer',
      password: '123', // Make sure to use string for the password
    },
    // Add more users as needed
  ];

  private currentUser: User = {
    userId: 0,
    username: '',
    password: '', // Add a password property to the currentUser
  };

  signup(username: string, password: string): boolean {
    if (this.users.some((u) => u.username === username)) {
      return false;
    }

    const newUser: User = {
      userId: this.users.length + 1,
      username,
      password,
    };

    this.users.push(newUser);
    this.isLoggedIn = true;
    this.currentUser = newUser;

    return true;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.isLoggedIn = true;
      this.currentUser = user;
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
      password: '',
    };
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}
