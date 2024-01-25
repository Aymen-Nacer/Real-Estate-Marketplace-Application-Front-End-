import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  username = '';
  password = '';
  email = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    window.scrollTo(0, 0);
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
            this.messageService.showAlert(
              'Signup successful. Welcome!',
              'success'
            );
            this.authService.printProperties();
            this.router.navigate(['']);
          },
          error: (error) => {
            if (error.status === 200) {
              this.messageService.showAlert(
                'Signup successful. Welcome!',
                'success'
              );
              this.authService.printProperties();
              this.router.navigate(['']);
            } else {
              this.messageService.showAlert(
                'Encountered error in signing up. Please try again.',
                'error'
              );
            }
          },
        });
    } else {
      this.messageService.showAlert(
        'Invalid username or password. Please check your inputs and try again.',
        'error'
      );
    }
  }
}
