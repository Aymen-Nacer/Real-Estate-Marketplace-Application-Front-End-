import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Listing } from '../../models/listing';
import { MessageService } from '../../services/message.service';
import { ListingsService } from '../../services/listings.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  username = this.authService.getCurrentUser().username;
  password = '';
  showlistings = false;
  userListings: Listing[] = [
    {
      id: 1,
      imageUrls: ['url1.jpg', 'url2.jpg'],
      name: 'Cozy Apartment',
      description: 'A beautiful apartment with a great view.',
      address: '123 Main Street',
      bedrooms: 2,
      bathrooms: 1,
      price: 1500,
      parking: true,
      furnished: false,
      userId: 'user123',
    },
  ];

  constructor(
    public authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private messageService: MessageService,
    private listingService: ListingsService,
    public loadingService: LoadingService
  ) {
    window.scrollTo(0, 0);
    this.authService.printProperties();
    console.log(this.username);
  }

  onProfileUpdate(profileForm: NgForm): void {
    this.loadingService.show();
    if (profileForm.valid) {
      const updatedUser: User = {
        ...this.authService.getCurrentUser(),
        username: this.username,
        password: this.password,
      };

      this.usersService.updateUser(updatedUser).subscribe({
        next: (response) => {
          this.loadingService.hide();
          this.messageService.showAlert(
            `Profile updated successfully for ${this.username}`,
            'success'
          );
        },
        error: (updateError) => {
          this.loadingService.hide();
          this.messageService.showAlert(
            'Error updating profile. Please try again later.',
            'error'
          );
        },
      });
    } else {
      this.loadingService.hide();
      this.messageService.showAlert(
        'Invalid username or password. Please check your inputs and try again.',
        'error'
      );
    }
  }

  onDeleteAccount() {
    this.loadingService.show();
    const currentUser = this.authService.getCurrentUser();

    this.usersService.deleteUser(currentUser.id).subscribe({
      next: () => {
        this.messageService.showAlert(
          `User ${currentUser.username} deleted successfully`,
          'success'
        );

        this.authService.logout().subscribe({
          next: () => {
            this.loadingService.hide();
            this.messageService.showAlert('Logout successful', 'success');
            this.usersService.printProperties();
            this.router.navigate(['']);
          },
          error: (logoutError) => {
            this.loadingService.hide();
            this.messageService.showAlert(
              'Error during logout. Please try again.',
              'error'
            );
          },
        });
      },
      error: (deleteError) => {
        this.loadingService.hide();
        this.messageService.showAlert(
          `Error deleting the user ${currentUser.username}. Please try again.`,
          'error'
        );
      },
    });
  }

  onShowListings() {
    this.loadingService.show();

    this.showlistings = !this.showlistings;
    const currentUserId = this.authService.getCurrentUser().id;

    this.usersService.getUserProperties(currentUserId).subscribe({
      next: (listings) => {
        this.loadingService.hide();

        this.userListings = listings;
      },

      error: (error) => {
        this.loadingService.hide();

        this.messageService.showAlert(
          'Error fetching listings. Please try again.',
          'error'
        );
      },
    });
  }

  onSignout() {
    this.loadingService.show();

    this.authService.logout().subscribe({
      next: (response) => {
        this.loadingService.hide();

        this.messageService.showAlert('Logout successful', 'success');
        this.authService.printProperties();
        this.router.navigate(['']);
      },
      error: (error) => {
        this.loadingService.hide();

        this.messageService.showAlert(
          'Encountered error during sign-out. Please try again.',
          'error'
        );
      },
    });
  }

  onListingDelete(id: number | undefined) {
    this.loadingService.show();

    if (id !== undefined) {
      this.listingService.deleteProperty(id).subscribe({
        next: (response) => {
          this.loadingService.hide();

          this.messageService.showAlert(
            'Property deleted successfully',
            'success'
          );

          const index = this.userListings.findIndex(
            (listing) => listing.id === id
          );

          if (index !== -1) {
            this.userListings.splice(index, 1);
          }
        },
        error: (error) => {
          this.loadingService.hide();

          if (error.status === 200) {
            this.messageService.showAlert(
              'Property deleted successfully',
              'success'
            );

            const index = this.userListings.findIndex(
              (listing) => listing.id === id
            );

            if (index !== -1) {
              this.userListings.splice(index, 1);
            }
          } else {
            this.loadingService.hide();

            this.messageService.showAlert(
              'Error deleting property. Please try again.',
              'error'
            );
          }
        },
      });
    } else {
      this.loadingService.hide();

      this.messageService.showAlert(
        'Cannot delete property: Property ID is undefined.',
        'error'
      );
    }
  }
}
