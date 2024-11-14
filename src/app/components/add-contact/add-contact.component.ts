import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Contact } from 'src/app/models/contact.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  addContact: FormGroup;
  categories: Category[] = [];
  @Output() contactAdded = new EventEmitter<Contact>();

  constructor(private dashboardService: DashboardService) {
    this.addContact = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        this.emailExtensionValidator(),
      ]),
      category_Id: new FormControl(''),
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

  emailExtensionValidator(): ValidatorFn {
    return (control: AbstractControl): null | { [key: string]: boolean } => {
      if (!control.value) {
        return null;
      }

      const emailRegex = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailRegex.test(control.value);

      return isValid ? null : { invalidEmailExtension: true };
    };
  }

  onSubmit() {
    if (this.addContact.valid) {
      const newContact: Contact = this.addContact.value;

      this.dashboardService.addContact(newContact).subscribe(
        (response) => {
          console.log('Contact ajouté avec succès', response);
          this.contactAdded.emit(response);
          this.addContact.reset({ category_id: '' });
        },
        (error) => {
          console.error("Erreur lors de l'ajout du contact", error);
        }
      );
    } else {
      console.error('Formulaire invalide');
    }
  }
}
