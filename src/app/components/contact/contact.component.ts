import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { EmailData } from 'src/app/models/email-data.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  user: User | null = null;
  contact: Contact | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private emailService: EmailService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    public dialogRef?: MatDialogRef<ContactComponent>
  ) {
    this.contactForm = this.fb.group({
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      object: ['', [Validators.required]],
      contentEmail: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error(error);
        this.snackBar.open(
          "Erreur lors de la récupération de l'utilisateur",
          'Fermer',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          }
        );
      }
    );
  }

  onSubmit(): void {
    if (this.contactForm.valid && this.user) {
      const formData = this.contactForm.value;
      const emailData: EmailData = {
        senderEmail: this.user.email,
        recipientEmail: formData.email,
        object: formData.object,
        contentEmail: formData.contentEmail,
      };

      this.emailService.sendEmail(emailData).subscribe(
        (response) => {
          console.log('Email envoyé avec succès', response);

          this.snackBar.open('Email envoyé avec succès', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
        (error) => {
          console.error("Erreur lors de l'envoi de l'email", error);
          this.snackBar.open("Erreur lors de l'envoi de l'email", 'Fermer', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      );
    } else {
      this.snackBar.open(
        "Le formulaire est invalide ou l'utilisateur n'est pas connecté",
        'Fermer',
        {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        }
      );
    }
  }

  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
