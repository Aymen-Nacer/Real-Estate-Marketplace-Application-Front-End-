import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  username = '';
  password = '';
  email = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.printProperties();
  }

  signup(signupForm: NgForm): void {
    console.log('email is', this.email);
    console.log('username is', this.username);
    console.log('password is', this.password);
    if (signupForm.valid) {
      if (this.authService.signup(this.username, this.password)) {
        console.log('signed up the user successfuly');
      } else {
        console.log('Encountered error in signing up');
      }
      this.authService.printProperties();

      this.router.navigate(['']);
    } else {
      alert('Invalid username or password');
    }
  }
}
