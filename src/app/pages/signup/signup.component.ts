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
      this.authService
        .signup(this.username, this.email, this.password)
        .subscribe({
          next: (response) => {
            console.log('Signup successful');
            this.authService.printProperties();
            this.router.navigate(['']);
          },
          error: (error) => {
            if (error.status === 200) {
              console.log('Signup successful');
              this.authService.printProperties();
              this.router.navigate(['']);
            } else {
              console.log('Encountered error in signing up');
            }
          },
        });
    } else {
      alert('Invalid username or password');
    }
  }
}
