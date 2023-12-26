import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private listingService: ListingsService) {}

  ngOnInit() {
    this.listingService.listings$.subscribe((listings) => {
      this.listings = listings;
    });
  }

  onSubmitForm(filterForm: any) {
    console.log(filterForm.value);
  }
}
