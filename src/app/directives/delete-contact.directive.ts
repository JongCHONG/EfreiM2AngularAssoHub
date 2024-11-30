import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../services/dashboard.service';

@Directive({
  selector: '[appDeleteContact]'
})
export class DeleteContactDirective {
  @Input('appDeleteContact') contactId!: string;
  @Output() contactDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dashboardService: DashboardService, private snackBar: MatSnackBar) {}

  @HostListener('click') onClick() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      this.dashboardService.deleteContact(this.contactId).subscribe(() => {
        this.snackBar.open('Contact supprimé avec succès', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top', // Position en haut
          horizontalPosition: 'center' // Position centrée horizontalement
        });
        this.contactDeleted.emit();
      });
    }
  }
}