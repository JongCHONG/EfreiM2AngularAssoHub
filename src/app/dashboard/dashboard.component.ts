import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { forkJoin } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  errorMessage: string | null = null;
  username: string | null = null;
  userId: string | null = null;
  contacts: Contact[] = [];
  categories: Category[] = [];
  groupedContacts: Map<string, Contact[]> = new Map();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
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
      this.groupedContacts.clear();
      contacts.forEach((contact) => {
        const category = categories.find(
          (cat) => cat.id === contact.category_id
        ) || { id: '', category_name: 'Autre' };

        contact.category = category;

        const categoryName = contact.category.category_name;
        if (!this.groupedContacts.has(categoryName)) {
          this.groupedContacts.set(categoryName, []);
        }
        this.groupedContacts.get(categoryName)?.push(contact);
      });
    });
  }
}
