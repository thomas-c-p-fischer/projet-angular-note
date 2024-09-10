import { Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: "full" },
  { path: 'cards', component: CardsComponent }
];
