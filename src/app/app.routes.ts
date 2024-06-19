import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { title: 'Dasig', path: '', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
