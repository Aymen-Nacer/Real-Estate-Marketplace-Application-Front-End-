import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Listing } from '../../models/listing';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  username = this.authService.getCurrentUser().username;
  password = '';
  email = this.authService.getCurrentUser().email;
  showlistings = false;
  userListings: Listing[] = [
    {
      propertyId: 2,
      imageUrls: [
        'https://picsum.photos/800/300?random=1',
        'https://picsum.photos/800/300?random=1',
      ],
      address: '123 Main St',
      bedrooms: 3,
      bathrooms: 2,
      price: 100000,
      parking: true,
      furnished: false,
      name: 'test name',
      description: 'test description',
      user: this.authService.getCurrentUser(),
    },
  ];

  constructor(
    public authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private listingsService: ListingsService
  ) {
    this.authService.printProperties();
    console.log(this.username);
  }

  onProfileUpdate(profileForm: NgForm): void {
    if (profileForm.valid) {
      if (
        this.usersService.findUserByCredentials(
          this.authService.getCurrentUser().email,
          this.password
        )
      ) {
        const updatedUser: User = {
          ...this.authService.getCurrentUser(),
          username: this.username,
          email: this.email,
        };
        if (this.usersService.updateUser(updatedUser)) {
          console.log(`the user ${this.username} was updated successfuly`);
          this.authService.login(this.username, this.password);
        } else {
          console.log(`the user ${this.username} was not found for updating!`);
        }
      } else {
        console.log(
          `the user ${this.username} credentials are wrong try again!`
        );
      }
      this.usersService.printProperties();
    } else {
      alert('Invalid username or password');
    }
  }

  onDeleteAccount() {
    const currentUser = this.authService.getCurrentUser();
    if (this.usersService.DeleteUser(currentUser)) {
      console.log(`the user ${currentUser.username} was deleted successfuly`);
      this.authService.logout();
      this.router.navigate(['']);
    } else {
      console.log(`the user ${currentUser.username} was not found`);
    }
    this.usersService.printProperties();
  }

  onShowListings() {
    this.showlistings = true;
    const currentUserId = this.authService.getCurrentUser().userId;
    const listingsByUserId =
      this.listingsService.findPropertiesByUserId(currentUserId);

    if (listingsByUserId.length === 0) {
      console.log('No properties found for user ID', currentUserId);
    } else {
      console.log('listings was successfuly found: ', listingsByUserId);
      this.userListings = listingsByUserId;
    }
  }
}
