import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  sortOptions = '';
  sortBy = '';
  order = '';

  listings: Listing[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listingService: ListingsService
  ) {}

  ngOnInit() {
    this.listingService.printProperties();

    this.route.queryParamMap.subscribe((queryParams) => {
      const queryParamsString = queryParams.keys
        .map((key) => `${key}=${queryParams.getAll(key).join(',')}`)
        .join('&');

      this.listingService.getProperties(queryParamsString).subscribe({
        error: (error) => {
          console.error('Error fetching listings:', error);
        }, // errorHandler
        next: (listings) => {
          this.listings = listings;
        }, // nextHandler
      });
    });
  }

  onSearchSubmit(profileForm: NgForm): void {
    if (profileForm.valid) {
      if (this.sortOptions.startsWith('price')) {
        this.sortBy = 'price';
        this.order = this.sortOptions.endsWith('desc') ? 'desc' : 'asc';
      } else if (this.sortOptions.startsWith('createdAt')) {
        this.sortBy = 'createdAt';
        this.order = this.sortOptions.endsWith('desc') ? 'desc' : 'asc';
      } else {
        console.error('Invalid sort option');
      }
      this.router.navigate(['/search'], {
        queryParams: {
          searchTerm: this.searchTerm,
          parking: this.parking || 'false',
          furnished: this.furnished || 'false',
          sortBy: this.sortBy || 'createdAt',
          order: this.order || 'desc',
        },
      });
    } else {
      alert('Invalid username or password');
    }
  }
}
