import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },

  // ✅ ADD THIS LINE
  { path: 'products/:id', component: ProductDetailsComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
