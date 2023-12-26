import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { ListingsService } from '../../services/listings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  listings: Listing[] = [];
  private listingsSubscription: Subscription | undefined;

  constructor(private listingService: ListingsService) {}

  ngOnInit() {
    this.listingsSubscription = this.listingService.listings$.subscribe(
      (listings) => {
        this.listings = listings;
      }
    );
  }

  onSubmitForm(filterForm: any) {
    console.log(filterForm.value);
  }

  ngOnDestroy() {
    if (this.listingsSubscription) {
      this.listingsSubscription.unsubscribe();
    }
  }
}
