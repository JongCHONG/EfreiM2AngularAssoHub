import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { forkJoin } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Category } from 'src/app/models/category.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { Router } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  errorMessage: string | null = null;
  userId: string | null = null;
  contacts: Contact[] = [];
  categories: Category[] = [];
  sortColumn: string = '';
  sortAscending: boolean = true;
  public dialogRef?: MatDialogRef<AddContactComponent>; // Injecter MatDialogRef ici

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) // private router: Router
  {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.getContacts();
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    window.location.href = '';
  }

  getContacts(): void {
    const userId = this.userId;

    forkJoin({
      contacts: this.dashboardService.getContactsByUserId(userId!),
      categories: this.dashboardService.getCategories(),
    }).subscribe(({ contacts, categories }) => {
      this.categories = categories;
      this.contacts = contacts.map((contact) => {
        contact.category = categories.find(
          (cat) => cat.id === contact.category_Id
        ) || { id: '', category_name: 'Autre' };
        return contact;
      });
    });
  }

  toggleSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }
  }

  onContactDeleted(): void {
    this.getContacts();
  }

  openAddContactModal(): void {
    this.dialogRef = this.dialog.open(AddContactComponent, {
      width: '50%',
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getContacts();
      }
    });
  }

  openContactModal(email: string): void {
    const dialogRef = this.dialog.open(ContactComponent, {
      width: '50%',
      data: { email },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getContacts();
      }
    });
  }
}
