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

  constructor(private authService: AuthService, private router: Router) {
    this.authService.printProperties();
  }

  login(loginForm: NgForm): void {
    if (loginForm.valid) {
      if (this.authService.login(this.username, this.password)) {
        console.log('Logged in the user successfuly');
      } else {
        console.log('Encountered error in Logging in');
      }
      this.authService.printProperties();
      this.router.navigate(['']);
    } else {
      alert('Invalid username or password');
    }
  }
}
