import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Listing } from '../../models/listing';
import { MessageService } from '../../services/message.service';

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
    private router: Router,
    private messageService: MessageService
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

      this.usersService.updateUser(updatedUser).subscribe({
        next: (response) => {
          this.messageService.showAlert(
            `Profile updated successfully for ${this.username}`,
            'success'
          );
        },
        error: (updateError) => {
          this.messageService.showAlert(
            'Error updating profile. Please try again later.',
            'error'
          );
        },
      });
    } else {
      this.messageService.showAlert(
        'Invalid username or password. Please check your inputs and try again.',
        'error'
      );
    }
  }

  onDeleteAccount() {
    const currentUser = this.authService.getCurrentUser();

    this.usersService.deleteUser(currentUser.id).subscribe({
      next: () => {
        this.messageService.showAlert(
          `User ${currentUser.username} deleted successfully`,
          'success'
        );

        this.authService.logout().subscribe({
          next: () => {
            this.messageService.showAlert('Logout successful', 'success');
            this.usersService.printProperties();
            this.router.navigate(['']);
          },
          error: (logoutError) => {
            this.messageService.showAlert(
              'Error during logout. Please try again.',
              'error'
            );
          },
        });
      },
      error: (deleteError) => {
        this.messageService.showAlert(
          `Error deleting the user ${currentUser.username}. Please try again.`,
          'error'
        );
      },
    });
  }

  onShowListings() {
    this.showlistings = true;
    const currentUserId = this.authService.getCurrentUser().id;

    this.usersService.getUserProperties(currentUserId).subscribe({
      next: (listings) => {
        this.userListings = listings;
      },
      error: (error) => {
        this.messageService.showAlert(
          'Error fetching listings. Please try again.',
          'error'
        );
      },
    });
  }

  onSignout() {
    this.authService.logout().subscribe({
      next: (response) => {
        this.messageService.showAlert('Logout successful', 'success');
        this.authService.printProperties();
        this.router.navigate(['']);
      },
      error: (error) => {
        this.messageService.showAlert(
          'Encountered error during sign-out. Please try again.',
          'error'
        );
      },
    });
  }
}
