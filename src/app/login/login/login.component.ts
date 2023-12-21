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

  constructor(private authService: AuthService, private router: Router) {}

  login(loginForm: NgForm): void {
    if (
      loginForm.valid &&
      this.authService.login(this.username, this.password)
    ) {
      this.router.navigate(['/home/1']);
    } else {
      alert('Invalid username or password');
    }
  }
}
