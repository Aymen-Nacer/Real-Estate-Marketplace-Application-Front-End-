import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
})
export class PropertyDetailsComponent implements OnInit {
  listing: Listing | undefined;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {}

  ngOnInit() {
    let propertyId = -1;
    this.route.paramMap.subscribe((params) => {
      propertyId = parseInt(params.get('id') || '-1', 10);
      this.listingsService.getProperty(propertyId).subscribe({
        next: (fetchedListing: Listing | undefined) => {
          this.listing = fetchedListing;
        },
        error: (error) => {
          console.error('Error fetching property:', error);
        },
      });
    });
  }

  submitForm(contactForm: NgForm): void {
    if (contactForm.valid) {
      console.log(contactForm.value);
    } else {
      alert('Invalid username or password');
    }
  }
}
