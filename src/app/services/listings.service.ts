import { Injectable } from '@angular/core';
import { Listing } from '../models/listing';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private listings: Listing[] = [
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

  constructor() {}

  addProperty(listing: Listing) {
    this.listings.push(listing);
  }

  findPropertyById(propertyId: number): Listing | undefined {
    return this.listings.find((listing) => listing.propertyId === propertyId);
  }

  printProperties(): void {
    console.log('listings:', this.listings);
  }
}
