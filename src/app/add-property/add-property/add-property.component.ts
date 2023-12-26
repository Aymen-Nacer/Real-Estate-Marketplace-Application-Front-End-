import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { AuthService } from '../../services/auth.service';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent {
  propertyName = '';
  propertyDescription = '';

  constructor(
    private router: Router,
    private listingsService: ListingsService,
    private authService: AuthService
  ) {}

  onAddProperty(newPropertyForm: NgForm): void {
    if (newPropertyForm.valid) {
      const listing: Listing = {
        propertyId: 2,
        imageUrls: [
          'https://picsum.photos/800/300?random=1',
          'https://picsum.photos/800/300?random=1',
        ],
        address: '123 Main St',
        bedrooms: 3,
        bathrooms: 2,
        price: 100000,
        parking: true,
        furnished: false,
        name: this.propertyName,
        description: this.propertyDescription,
        user: this.authService.getCurrentUser(),
      };
      this.listingsService.addProperty(listing);

      console.log('added successfuly!');
      console.log('listings', this.listingsService.printProperties());
      this.router.navigate(['']);
    } else {
      alert('Invalid username or password');
    }
  }
}
