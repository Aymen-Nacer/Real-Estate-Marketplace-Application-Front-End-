import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JavaScript (and its dependencies)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { HomeComponent } from './home/home/home.component';
import { FormsModule } from '@angular/forms';
import { ListingItemComponent } from './listing-item/listing-item/listing-item.component';
import { LoginComponent } from './login/login/login.component';
import { AddPropertyComponent } from './add-property/add-property/add-property.component';
import { PropertyDetailsComponent } from './property-details/property-details/property-details.component';
import { SignupComponent } from './signup/signup/signup.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { SearchComponent } from './search/search/search.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, ListingItemComponent, LoginComponent, AddPropertyComponent, PropertyDetailsComponent, SignupComponent, ProfileComponent, SearchComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
