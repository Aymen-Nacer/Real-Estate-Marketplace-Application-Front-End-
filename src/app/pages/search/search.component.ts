import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ListingFilter } from '../../models/listingFilter';
import { ListingsService } from '../../services/listings.service';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  parking = '';
  furnished = '';
  sortBy = '';

  listings: Listing[] = [];

  constructor(
    private router: Router,
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
      this.sortBy = queryParams.get('sortBy') || '';
      // clean the the retreived values from query params and get a filter to be applied
      const filter = this.cleaningQueryParams();
      // filter the local database according to the filter applied
      const filteredListings = this.listingService.filterListings(filter);
      this.listings = filteredListings;
    });
  }

  onSearchSubmit(profileForm: NgForm): void {
    if (profileForm.valid) {
      this.router.navigate(['/search'], {
        queryParams: {
          searchTerm: this.searchTerm,
          parking: this.parking,
          furnished: this.furnished,
          sortBy: this.sortBy,
        },
      });
    } else {
      alert('Invalid username or password');
    }
  }

  cleaningQueryParams(): ListingFilter {
    const filter: ListingFilter = {
      name: '',
      furnished: [true, false],
      parking: [true, false],
      sortBy: -1,
    };

    filter.name = this.searchTerm;
    filter.parking =
      this.parking === '' || this.parking === 'false' ? [true, false] : [true];
    filter.furnished =
      this.furnished === '' || this.furnished === 'false'
        ? [true, false]
        : [true];
    if (this.sortBy === 'latest') {
      filter.sortBy = 0;
    }

    return filter;
  }
}
