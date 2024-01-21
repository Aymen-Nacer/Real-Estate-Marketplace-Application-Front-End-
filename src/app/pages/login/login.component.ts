import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  email = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.printProperties();
  }

  login(loginForm: NgForm): void {
    console.log('email is ', this.email);
    console.log('password is ', this.password);

    if (loginForm.valid) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Logged in the user successfully');
            this.authService.printProperties();
            this.router.navigate(['']);
          } else {
            console.log(response.message);
          }
        },
        error: (error) => {
          console.log('Encountered error in logging in', error);
        },
      });
    } else {
      alert('Invalid username or password');
    }
  }
}
