import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../services/listings.service';

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
      const fetchedProperty = this.listingsService.findPropertyById(propertyId);

      if (fetchedProperty) {
        this.listing = fetchedProperty;
      } else {
        console.log(
          `Property with ID ${propertyId} does not exist in the database.`
        );
      }
    });
  }
}
