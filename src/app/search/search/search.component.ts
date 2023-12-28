import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchTerm = '';
  parking = '';
  furnished = '';
  sortOrder = '';

  onSearchSubmit(profileForm: NgForm): void {
    if (profileForm.valid) {
      console.log('searchTerm :', this.searchTerm);
      console.log('parking :', this.parking);
      console.log('furnished :', this.furnished);
      console.log('sortOrder :', this.sortOrder);
    } else {
      alert('Invalid username or password');
    }
  }
}
