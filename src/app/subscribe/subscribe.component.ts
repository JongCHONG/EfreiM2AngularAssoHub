import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent {
  subscribeForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.subscribeForm = this.fb.group({
      username: ['Jong', Validators.required],
      email: ['jong@test.com', [Validators.required, Validators.email]],
      password: ['jong', Validators.required],
      confirmPassword: ['jong', Validators.required],
    });
  }

  addUser() {
    if (this.subscribeForm.valid) {
      const password = this.subscribeForm.get('password')!.value;
      const confirmPassword = this.subscribeForm.get('confirmPassword')!.value;

      if (this.authService.comparePasswords(password, confirmPassword)) {
        const { confirmPassword, ...userData } = this.subscribeForm.value;
        this.authService.subscribeUser(userData).subscribe(
          (response) => {
            console.log(response);
            this.errorMessage = null; // Clear error message on success
          },
          (error) => {
            console.error(error);
            this.errorMessage = 'An error occurred while subscribing.';
          }
        );
      } else {
        this.errorMessage = 'Mot de passe incorrect';
      }
    }
  }
}
