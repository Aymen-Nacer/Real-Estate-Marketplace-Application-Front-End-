import { Component } from '@angular/core';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  listing: Listing = {
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
  };

  onSubmitForm(filterForm: any) {
    console.log(filterForm.value);
  }
}
