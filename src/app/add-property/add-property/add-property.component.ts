import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent {
  propertyName = '';
  propertyDescription = '';

  constructor(private router: Router) {}

  onAddProperty(newPropertyForm: NgForm): void {
    if (newPropertyForm.valid) {
      alert('added successfuly!');
      console.log('property name ', this.propertyName);
      console.log('property description ', this.propertyDescription);
    } else {
      alert('Invalid username or password');
    }
  }
}
