import { Component, Input } from '@angular/core';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrl: './listing-item.component.css',
})
export class ListingItemComponent {
  @Input() listing: Listing = {
    propertyId: 1,
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    parking: false,
    furnished: false,
    user: {
      userId: 0,
      username: '',
      password: '',
    },
  };
}
