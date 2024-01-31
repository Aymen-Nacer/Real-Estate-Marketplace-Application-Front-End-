import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { MessageService } from '../../services/message.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
})
export class PropertyDetailsComponent implements OnInit {
  listing: Listing = {
    imageUrls: ['https://i.imgur.com/n6B1Fuw.jpg'],
    name: '',
    description: '',
    address: '',
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    parking: false,
    furnished: false,
    userId: '',
  };

  landlord: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    avatar: '',
  };

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private usersService: UsersService,
    private messageService: MessageService,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    const params = this.route.snapshot.paramMap;
    const propertyId = parseInt(params.get('id') || '-1', 10);

    this.listingsService.getProperty(propertyId).subscribe({
      next: (fetchedListing) => {
        if (fetchedListing) {
          this.listing = fetchedListing;

          const userId = this.listing.userId || '-1';

          this.usersService.getUser(parseInt(userId)).subscribe({
            next: (user) => {
              this.loadingService.hide();

              if (user) {
                this.landlord = user;
              }
            },
            error: (error) => {
              this.loadingService.hide();

              this.messageService.showAlert(
                'Error fetching user. Please try again.',
                error
              );
            },
          });
        }
      },
      error: (error) => {
        this.loadingService.hide();

        this.messageService.showAlert(
          'Error fetching property. Please try again.',
          error
        );
      },
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
