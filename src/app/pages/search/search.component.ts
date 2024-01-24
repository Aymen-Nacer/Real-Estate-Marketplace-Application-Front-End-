import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { Listing } from '../../models/listing';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  parking = false;
  furnished = false;
  sortOptions = 'createdAt_desc';
  sort = '';
  order = '';

  listings: Listing[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listingService: ListingsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.searchTerm = queryParams.get('searchTerm') || '';
      this.furnished = queryParams.get('furnished') === 'true' ? true : false;
      this.parking = queryParams.get('parking') === 'true' ? true : false;
      const sortParam = queryParams.get('sort');
      const orderParam = queryParams.get('order');

      if (sortParam && orderParam) {
        this.sortOptions = `${sortParam}_${orderParam}`;
      }

      const queryParamsString = queryParams.keys
        .map((key) => `${key}=${queryParams.getAll(key).join(',')}`)
        .join('&');

      this.listingService.getProperties(queryParamsString).subscribe({
        error: (error) => {
          this.messageService.showAlert(
            'Error fetching listings. Please try again.',
            'error'
          );
        },
        next: (listings) => {
          this.listings = listings;
        },
      });
    });
  }

  onSearchSubmit(profileForm: NgForm): void {
    if (profileForm.valid) {
      if (this.sortOptions.startsWith('price')) {
        this.sort = 'price';
        this.order = this.sortOptions.endsWith('desc') ? 'desc' : 'asc';
      } else if (this.sortOptions.startsWith('createdAt')) {
        this.sort = 'createdAt';
        this.order = this.sortOptions.endsWith('desc') ? 'desc' : 'asc';
      } else {
        this.messageService.showAlert('Invalid sort option', 'error');
      }
      this.router.navigate(['/search'], {
        queryParams: {
          searchTerm: this.searchTerm,
          parking: this.parking || 'false',
          furnished: this.furnished || 'false',
          sort: this.sort || 'createdAt',
          order: this.order || 'desc',
        },
      });
    } else {
      this.messageService.showAlert(
        'Invalid search criteria. Please check your inputs and try again.',
        'error'
      );
    }
  }
}
