import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { Contact } from '../models/contact.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  addContact: FormGroup;
  categories: Category[] = [];

  constructor(private dashboardService: DashboardService) {
    this.addContact = new FormGroup({
      title: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      category_id: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.dashboardService.getCategories().subscribe(
      (categories) => {
        this.categories = [...categories, { id: '', category_name: 'Autre' }];

        this.addContact.get('category_name')?.setValue('autre');
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories', error);
      }
    );
  }

  onSubmit() {
    if (this.addContact.valid) {
      const newContact: Contact = this.addContact.value;

      this.dashboardService.addContact(newContact).subscribe(
        (response) => {
          console.log('Contact ajouté avec succès', response);
          this.addContact.reset({ category_id: '' });
        },
        (error) => {
          console.error("Erreur lors de l'ajout du contact", error);
        }
      );
    }
  }
}
