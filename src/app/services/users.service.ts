import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [
    {
      userId: 1,
      username: 'aymennacer',
      password: '123',
    },
  ];

  constructor() {}

  hasUser(username: string): boolean {
    if (this.users.some((u) => u.username === username)) {
      return true;
    }
    return false;
  }

  usersLength(): number {
    return this.users.length;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  findUserByCredentials(username: string, password: string): User | undefined {
    return this.users.find(
      (u) => u.username === username && u.password === password
    );
  }

  printProperties(): void {
    console.log('users:', this.users);
  }
}
