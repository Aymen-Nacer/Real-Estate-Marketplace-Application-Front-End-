import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent {
  propertyName = '';
  propertyDescription = '';
  address = '';
  bedrooms = 0;
  bathrooms = 0;
  parking = false;
  furnished = false;
  propertyPrice = 0;

  constructor(
    private router: Router,
    private listingsService: ListingsService
  ) {}

  onAddProperty(newPropertyForm: NgForm): void {
    if (newPropertyForm.valid) {
      const listing: Listing = {
        imageUrls: [
          'https://picsum.photos/800/300?random=1',
          'https://picsum.photos/800/300?random=1',
        ],
        address: this.address,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms,
        price: this.propertyPrice,
        parking: this.parking,
        furnished: this.furnished,
        name: this.propertyName,
        description: this.propertyDescription,
        userRef: '1',
      };

      console.log('before adding', listing);
      this.listingsService.addProperty(listing).subscribe({
        next: (addedListing) => {
          console.log('Property added successfully:', addedListing);
          console.log('listings', this.listingsService.printProperties());
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Error adding property:', error);
        },
      });
    } else {
      alert('Invalid username or password');
    }
  }
}
