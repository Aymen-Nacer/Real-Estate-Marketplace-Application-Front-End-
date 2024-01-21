import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  username = this.authService.getCurrentUser().username;
  password = '';
  showlistings = false;
  userListings: Listing[] = [];

  constructor(
    public authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.authService.printProperties();
    console.log(this.username);
  }

  onProfileUpdate(profileForm: NgForm): void {
    if (profileForm.valid) {
      const updatedUser: User = {
        ...this.authService.getCurrentUser(),
        username: this.username,
        password: this.password,
      };

      console.log('user to be updated is ', updatedUser);

      this.usersService.updateUser(updatedUser).subscribe({
        next: (response) => {
          console.log(`The user ${this.username} was updated successfully`);
        },
        error: (updateError) => {
          console.error('Error updating user:', updateError);
        },
      });
    } else {
      alert('Invalid username or password');
    }
  }

  onDeleteAccount() {
    const currentUser = this.authService.getCurrentUser();

    this.usersService.deleteUser(currentUser.id).subscribe({
      next: () => {
        console.log(
          `The user ${currentUser.username} was deleted successfully`
        );

        this.authService.logout().subscribe({
          next: () => {
            console.log('Logout successful');
            this.usersService.printProperties();
            this.router.navigate(['']);
          },
          error: (logoutError) => {
            console.error('Error during logout:', logoutError);
          },
        });
      },
      error: (deleteError) => {
        console.log(`Error deleting the user ${currentUser.username}`);
      },
    });
  }

  onShowListings() {
    this.showlistings = true;
    const currentUserId = this.authService.getCurrentUser().id;

    this.usersService.getUserProperties(currentUserId).subscribe({
      next: (listings) => {
        console.log('Received listings:', listings);
        if (listings.length === 0) {
          console.log('No properties found for user ID', currentUserId);
        } else {
          console.log('Listings were successfully found: ');
          this.userListings = listings;
        }
      },
      error: (error) => {
        console.error('Error fetching listings:', error);
      },
    });
  }

  onSignout() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log(response);
        this.authService.printProperties();
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log('Encountered error in sign-out', error);
      },
    });
  }
}
