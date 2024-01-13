import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private usersService: UsersService) {}

  private currentUser: User = {
    userId: 0,
    username: '',
    email: '',
    password: '',
  };

  signup(username: string, email: string, password: string): boolean {
    if (this.usersService.hasUser(username)) {
      return false;
    }

    const newUser: User = {
      userId: this.usersService.usersLength() + 1,
      username,
      password,
      email,
    };

    this.usersService.addUser(newUser);
    this.isLoggedIn = true;
    this.currentUser = newUser;

    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.usersService.findUserByCredentials(email, password);

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
      email: '',
    };
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  printProperties(): void {
    console.log('isLoggedIn:', this.isLoggedIn);
    console.log('currentUser:', this.currentUser);
    console.log('users:', this.usersService.printProperties());
  }
}
