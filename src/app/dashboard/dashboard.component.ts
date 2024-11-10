import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  errorMessage: string | null = null;
  username: string | null = null;
  userId: string | null = null;
  contacts: any[] = [];

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
      contacts: this.dashboardService.getContactsByUser(userId!),
      categories: this.dashboardService.getCategories(),
    }).subscribe(({ contacts, categories }) => {
      this.contacts = contacts.map((contact) => {
        const category = categories.find(
          (cat) => cat.id === contact.category_id
        );

        return {
          ...contact,
          category: category ? category : 'Non spécifié',
        };
      });
    });
  }
}
