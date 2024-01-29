import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { Listing } from '../../models/listing';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { ImageUploadService } from '../../services/image-upload.service';
import { FileUpload } from '../../models/fileUpload';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent {
  propertyName = '';
  propertyDescription = '';
  address = '';
  bedrooms = 0;
  bathrooms = 0;
  parking = false;
  furnished = false;
  propertyPrice = 0;
  selectedFiles: FileList | null = null;
  currentFileUpload?: FileUpload;
  percentage = 0;
  uploading = false;
  currentUploadedFiles: FileUpload[] = [];

  constructor(
    private router: Router,
    private listingsService: ListingsService,
    private messageService: MessageService,
    private authService: AuthService,
    private imageUploadService: ImageUploadService
  ) {
    window.scrollTo(0, 0);
    this.imageUploadService.uploadedFiles$.subscribe((uploadedFiles) => {
      this.currentUploadedFiles = uploadedFiles;
    });
  }

  selectFile(event: any): void {
    if (
      event.target.files.length > 0 &&
      event.target.files.length + this.currentUploadedFiles.length < 7
    ) {
      this.selectedFiles = event.target.files;
    } else {
      event.target.value = null;
      this.selectedFiles = null;
      this.messageService.showAlert(
        'You can only upload 6 images per listing',
        'error'
      );
    }
  }

  onUpload(): void {
    this.uploading = true;
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file: File = this.selectedFiles[i];

        this.currentFileUpload = new FileUpload(file);

        this.imageUploadService
          .pushFileToStorage(this.currentFileUpload)
          .subscribe({
            next: (percentage) => {
              this.percentage = Math.round(percentage ? percentage : 0);
            },
            error: (error) => {
              this.messageService.showAlert(
                'Image upload failed (2 mb max per image)',
                'error'
              );
              this.uploading = false;
            },
            complete: () => {
              this.uploading = false;
              this.percentage = 0;
            },
          });
      }
      this.selectedFiles = null;
    }
  }

  handleRemoveImage(index: number) {
    this.imageUploadService.deleteFileAtIndex(index);
  }

  onAddProperty(newPropertyForm: NgForm): void {
    if (newPropertyForm.valid) {
      const listing: Listing = {
        imageUrls: [],
        address: this.address,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms,
        price: this.propertyPrice,
        parking: this.parking,
        furnished: this.furnished,
        name: this.propertyName,
        description: this.propertyDescription,
        userId: this.authService.getCurrentUser().id.toString(),
      };

      listing.imageUrls = this.currentUploadedFiles.map((file) => file.url);

      if (listing.imageUrls.length === 0) {
        listing.imageUrls.push('https://i.imgur.com/n6B1Fuw.jpg');
      }

      console.log('listing to be added is', listing);

      this.listingsService.addProperty(listing).subscribe({
        next: (addedListing) => {
          this.messageService.showAlert(
            'Property added successfully.',
            'success'
          );
          this.router.navigate(['']);
        },
        error: (error) => {
          this.messageService.showAlert(
            'Error adding property. Please try again.',
            'error'
          );
        },
      });
    } else {
      this.messageService.showAlert(
        'Invalid property details. Please check your inputs and try again.',
        'error'
      );
    }
  }

  isExceedingLimit(): boolean {
    const selectedFilesCount = this.selectedFiles
      ? this.selectedFiles.length
      : 0;
    const totalFiles = selectedFilesCount + this.currentUploadedFiles.length;
    return totalFiles > 6 || selectedFilesCount === 0;
  }
}
