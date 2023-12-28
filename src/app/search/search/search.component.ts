import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListingFilter } from '../../models/listingFilter';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  parking = '';
  furnished = '';
  sortOrder = '';

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingsService
  ) {}

  ngOnInit() {
    this.listingService.printProperties();
    this.route.queryParamMap.subscribe((queryParams) => {
      // retreive values of query params
      this.searchTerm = queryParams.get('searchTerm') || '';
      this.parking = queryParams.get('parking') || '';
      this.furnished = queryParams.get('furnished') || '';
      this.sortOrder = queryParams.get('sortOrder') || '';
      // clean the the retreived values from query params and get a filter to be applied
      const filter = this.cleaningQueryParams();
      // filter the local database according to the filter applied
      const filteredListings = this.listingService.filterListings(filter);
      console.log('filtered Listings is', filteredListings);
    });
  }

  onSearchSubmit(profileForm: NgForm): void {
    if (profileForm.valid) {
      console.log('searchTerm :', this.searchTerm);
      console.log('parking :', this.parking);
      console.log('furnished :', this.furnished);
      console.log('sortOrder :', this.sortOrder);
    } else {
      alert('Invalid username or password');
    }
  }

  cleaningQueryParams(): ListingFilter {
    const filter: ListingFilter = {
      name: '',
      furnished: [true, false],
      parking: [true, false],
    };

    filter.name = this.searchTerm;
    filter.parking =
      this.parking === '' || this.parking === 'false' ? [true, false] : [true];
    filter.furnished =
      this.furnished === '' || this.furnished === 'false'
        ? [true, false]
        : [true];

    return filter;
  }
}
