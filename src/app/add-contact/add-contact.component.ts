import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { Contact, Category } from '../models/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  addContact: FormGroup;

  constructor(private dashboardService: DashboardService) {
    this.addContact = new FormGroup({
      title: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.addContact.valid) {
      const newContact: Contact = this.addContact.value;

      this.dashboardService.addContact(newContact).subscribe(
        (response) => {
          console.log('Contact ajouté avec succès', response);
          this.addContact.reset();
        },
        (error) => {
          console.error("Erreur lors de l'ajout du contact", error);
        }
      );
    }
  }
}
