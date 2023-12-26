import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  private _users: User[] = [
    {
      userId: 1,
      username: 'aymennacer',
      password: '123',
    },
  ];

  constructor() {
    this.usersSubject.next(this._users);
  }

  hasUser(username: string): boolean {
    if (this._users.some((u) => u.username === username)) {
      return true;
    }
    return false;
  }

  usersLength(): number {
    return this._users.length;
  }

  addUser(user: User) {
    this._users.push(user);
    this.usersSubject.next([...this._users]);
  }

  findUserByCredentials(username: string, password: string): User | undefined {
    return this._users.find(
      (u) => u.username === username && u.password === password
    );
  }

  printProperties(): void {
    console.log('users:', this._users);
  }
}
