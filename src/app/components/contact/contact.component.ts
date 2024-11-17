import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { EmailData } from 'src/app/models/email-data.models';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private contactService: ContactService,
    private userService: UserService,
    private emailService: EmailService,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      object: ['', [Validators.required]],
      contentEmail: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const contactId = this.activatedRoute.snapshot.paramMap.get('id');
    if (contactId) {
      this.getContactDetails(contactId);
    }

    this.getUser();
  }

  getContactDetails(id: string): void {
    this.contactService.getContactById(id).subscribe(
      (contact) => {
        this.contact = contact;
        this.prefillForm(contact);
      },
      (error) => {
        console.error(error);
        this.snackBar.open(
          'Erreur de la récupération des informations du contact',
          'Fermer',
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          }
        );
      }
    );
  }

  prefillForm(contact: Contact): void {
    this.contactForm.patchValue({
      email: contact.email,
      object: '',
      contentEmail: '',
    });
  }

  getUser(): void {
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
            duration: 3000,
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
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
        (error) => {
          console.error("Erreur lors de l'envoi de l'email", error);
          this.snackBar.open("Erreur lors de l'envoi de l'email", 'Fermer', {
            duration: 3000,
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
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        }
      );
    }
  }

  navigateToContactList(): void {
    this.router.navigate(['/dashboard']);
  }
}
