import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Listing } from '../models/listing';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private listingsSubject = new BehaviorSubject<Listing[]>([]);
  listings$: Observable<Listing[]> = this.listingsSubject.asObservable();

  private baseUrl = 'http://localhost:8080/api/listings';

  constructor(private http: HttpClient) {
    this.loadListings();
  }

  private _listings: Listing[] = [];

  get listing(): Listing[] {
    return this._listings;
  }

  addProperty(listing: Listing): Observable<Listing> {
    return this.http.post<Listing>(`${this.baseUrl}/create`, listing);
  }

  deleteProperty(propertyId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${propertyId}`);
  }

  updateProperty(
    propertyId: number,
    updatedListing: Listing
  ): Observable<Listing> {
    return this.http.put<Listing>(
      `${this.baseUrl}/update/${propertyId}`,
      updatedListing
    );
  }

  getProperty(propertyId: number): Observable<Listing | undefined> {
    return this.http.get<Listing>(`${this.baseUrl}/get/${propertyId}`);
  }

  getProperties(filter: string) {
    return this.http.get<Listing[]>(`${this.baseUrl}/get?${filter}`);
  }

  printProperties(): void {
    console.log('listings:', this._listings);
  }

  loadListings(): void {
    this.getProperties('searchTerm=').subscribe({
      error: (error) => {
        console.error('Error fetching listings:', error);
      },
      next: (listings) => {
        this._listings = listings;

        this.listingsSubject.next([...this._listings]);
      },
    });
  }
}
