import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Listing } from '../models/listing';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUserProperties(userId: number): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.baseUrl}/listings/${userId}`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${userId}`);
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/update/${updatedUser.id}`,
      updatedUser
    );
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  printProperties(): void {
    console.log('users:');
  }
}
