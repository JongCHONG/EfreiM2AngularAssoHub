import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortContacts'
})
export class SortContactsPipe implements PipeTransform {
  transform(contacts: any[], sortColumn: string, sortAscending: boolean): any[] {
    if (!contacts || !sortColumn) return contacts;
    return contacts.sort((a, b) => {
      let comparison = 0;
      if (a[sortColumn] > b[sortColumn]) {
        comparison = 1;
      } else if (a[sortColumn] < b[sortColumn]) {
        comparison = -1;
      }
      return sortAscending ? comparison : -comparison;
    });
  }
}