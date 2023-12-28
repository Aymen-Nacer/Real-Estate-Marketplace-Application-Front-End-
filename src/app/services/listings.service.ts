import { Injectable } from '@angular/core';
import { Listing } from '../models/listing';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private listingsSubject = new BehaviorSubject<Listing[]>([]);
  listings$: Observable<Listing[]> = this.listingsSubject.asObservable();

  private _listings: Listing[] = [
    {
      propertyId: 1,
      imageUrls: [
        'https://picsum.photos/800/300?random=1',
        'https://picsum.photos/800/300?random=1',
      ],
      name: 'Example Listing',
      description: 'This is a sample description.',
      address: '123 Main St',
      bedrooms: 3,
      bathrooms: 2,
      price: 100000,
      parking: true,
      furnished: false,
      user: {
        userId: 1,
        username: 'aymennacer',
        password: '123',
      },
    },
  ];

  constructor() {
    this.listingsSubject.next(this._listings);
  }
  get listing(): Listing[] {
    return this._listings;
  }

  addProperty(listing: Listing) {
    this._listings.push(listing);
    this.listingsSubject.next([...this._listings]); // Notify subscribers
  }

  findPropertyById(propertyId: number): Listing | undefined {
    return this._listings.find((listing) => listing.propertyId === propertyId);
  }

  findPropertiesByUserId(userId: number): Listing[] {
    return this._listings.filter(
      (listing) => listing.user && listing.user.userId === userId
    );
  }

  printProperties(): void {
    console.log('listings:', this._listings);
  }
}
