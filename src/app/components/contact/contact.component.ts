import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  contact: Contact | null = null;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      objet: ['', [Validators.required]],
      contentEmail: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const contactId = this.activatedRoute.snapshot.paramMap.get('id');
    if (contactId) {
      this.getContactDetails(contactId);
    }
  }

  getContactDetails(id: string): void {
    this.contactService.getContactById(id).subscribe(
      (contact) => {
        this.contact = contact;
        this.prefillForm(contact);
      },
      (error) => {
        this.errorMessage =
          'Erreur lors de la récupération des données du contact';
        console.error(error);
      }
    );
  }

  prefillForm(contact: Contact): void {
    this.contactForm.patchValue({
      email: contact.email,
      objet: '',
      contentEmail: '',
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Form submitted', formData);
    }
  }

  navigateToContactList(): void {
    this.router.navigate(['/dashboard']);
  }
}
