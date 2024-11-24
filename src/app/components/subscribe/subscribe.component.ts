import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent {
  subscribeForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.subscribeForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
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
            this.snackBar.open('Compte créé avec succès', 'Fermer', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['custom-snackbar'], // Optionnel : classe CSS personnalisée
            });
          },
          (error) => {
            console.error(error);
            this.errorMessage = 'An error occurred while subscribing.';
          }
        );
      } else {
        this.errorMessage = 'Mot de passe et confirmation ne correspondent pas';
      }
    }
  }
}
