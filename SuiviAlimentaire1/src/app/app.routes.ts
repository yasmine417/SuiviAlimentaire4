import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { OcrComponent } from './features/ocr/ocr.component';
import { IaCaloriesComponent } from './features/ia/ia-calories.component';
import { AlimentsComponent } from './features/aliments/aliments.component';
import { HistoryComponent } from './features/history/history.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ocr', component: OcrComponent },
  { path: 'ia-calories', component: IaCaloriesComponent },
  { path: 'aliments', component: AlimentsComponent },
  { path: 'history', component: HistoryComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
