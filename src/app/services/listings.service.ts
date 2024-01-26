import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Listing } from '../models/listing';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private listingsSubject = new BehaviorSubject<Listing[]>([]);
  listings$: Observable<Listing[]> = this.listingsSubject.asObservable();

  private baseUrl = environment.apiBaseUrl + '/api/listings';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
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

  updateProperty(updatedListing: Listing): Observable<Listing> {
    return this.http.put<Listing>(
      `${this.baseUrl}/update/${updatedListing.id}`,
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
    this.getProperties('searchTerm=&limit=3').subscribe({
      error: (error) => {
        this.messageService.showAlert(
          'Error fetching listings. Please try again.',
          'error'
        );
      },
      next: (listings) => {
        this._listings = listings;

        this.listingsSubject.next([...this._listings]);
      },
    });
  }
}
