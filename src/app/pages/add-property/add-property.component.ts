import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { Listing } from '../../models/listing';
import { MessageService } from '../../services/message.service';

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
    private listingsService: ListingsService,
    private messageService: MessageService
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
        userId: '1',
      };

      this.listingsService.addProperty(listing).subscribe({
        next: (addedListing) => {
          this.messageService.showAlert(
            'Property added successfully.',
            'success'
          );
          this.router.navigate(['']);
        },
        error: (error) => {
          this.messageService.showAlert(
            'Error adding property. Please try again.',
            'error'
          );
        },
      });
    } else {
      this.messageService.showAlert(
        'Invalid property details. Please check your inputs and try again.',
        'error'
      );
    }
  }
}
