import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { ListingItemComponent } from './components/listing-item/listing-item.component';
import { LoginComponent } from './pages/login/login.component';
import { AddPropertyComponent } from './pages/add-property/add-property.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { ServicesCardComponent } from './components/services-card/services-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { UpdatePropertyComponent } from './pages/update-property/update-property.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListingItemComponent,
    LoginComponent,
    AddPropertyComponent,
    PropertyDetailsComponent,
    SignupComponent,
    ProfileComponent,
    SearchComponent,
    ServicesCardComponent,
    FooterComponent,
    AlertComponent,
    UpdatePropertyComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
