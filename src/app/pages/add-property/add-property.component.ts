import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { Listing } from '../../models/listing';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { ImageUploadService } from '../../services/image-upload.service';
import { FileUpload } from '../../models/fileUpload';
import { LoadingService } from '../../services/loading.service';

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
    private imageUploadService: ImageUploadService,
    public loadingService: LoadingService
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

    const uploadFiles = async () => {
      if (this.selectedFiles) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          const file: File = this.selectedFiles[i];
          this.currentFileUpload = new FileUpload(file);

          try {
            const percentage = await this.uploadFileAsync(
              this.currentFileUpload
            );
            this.percentage = Math.round(percentage ? percentage : 0);
          } catch (error) {
            this.messageService.showAlert(
              'Image upload failed (2 mb max per image)',
              'error'
            );
            this.uploading = false;
            return;
          }
        }

        this.uploading = false;
        this.percentage = 0;
        this.selectedFiles = null;
      }
    };

    uploadFiles();
  }

  private uploadFileAsync(fileUpload: FileUpload): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      this.imageUploadService.pushFileToStorage(fileUpload).subscribe({
        next: (percentage) => resolve(percentage),
        error: (error) => reject(error),
        complete: () => resolve(undefined),
      });
    });
  }

  handleRemoveImage(index: number) {
    this.imageUploadService.deleteFileAtIndex(index);
  }

  onAddProperty(newPropertyForm: NgForm): void {
    this.loadingService.show();
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
          this.imageUploadService.clearUploadedFiles();
          this.loadingService.hide();
          this.router.navigate(['']);
        },
        error: (error) => {
          this.messageService.showAlert(
            'Error adding property. Please try again.',
            'error'
          );
          this.loadingService.hide();
        },
      });
    } else {
      this.messageService.showAlert(
        'Invalid property details. Please check your inputs and try again.',
        'error'
      );
      this.loadingService.hide();
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
