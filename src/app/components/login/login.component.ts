import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['jong@test.com', [Validators.required, Validators.email]],
      password: ['jong', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log(response);
          if (!response.success) {
            this.errorMessage = response.message;
          } else {
            this.errorMessage = null; // Clear error message on success
          }
        },
        (error) => {
          console.error(error);
          this.errorMessage = 'An error occurred during login.';
        }
      );
    }
  }
}
