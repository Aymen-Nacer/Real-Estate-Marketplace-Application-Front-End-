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

  constructor(private router: Router) {}

  signup(signupForm: NgForm): void {
    if (signupForm.valid) {
      console.log('added successfuly');
      this.router.navigate(['']);
    } else {
      alert('Invalid username or password');
    }
  }
}
