import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { AddPropertyComponent } from './add-property/add-property/add-property.component';
import { PropertyDetailsComponent } from './property-details/property-details/property-details.component';
import { SignupComponent } from './signup/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'addProperty', component: AddPropertyComponent },
  { path: 'propertyDetails/:id', component: PropertyDetailsComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
