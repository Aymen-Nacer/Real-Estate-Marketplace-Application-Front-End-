import { Component } from '@angular/core';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
})
export class PropertyDetailsComponent {
  listing: Listing = {
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
  };
}
