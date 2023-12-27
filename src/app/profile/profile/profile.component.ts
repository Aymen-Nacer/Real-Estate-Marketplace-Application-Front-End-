import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  username = '';
  password = '';

  constructor(
    public authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.authService.printProperties();
  }

  onProfileUpdate(profileForm: NgForm): void {
    if (profileForm.valid) {
      if (
        this.usersService.findUserByCredentials(
          this.authService.getCurrentUser().username,
          this.password
        )
      ) {
        const updatedUser: User = {
          ...this.authService.getCurrentUser(),
          username: this.username,
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
}
