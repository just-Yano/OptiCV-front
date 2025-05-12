import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreationComponent } from './creation/creation.component';
import { EvaluateComponent } from './evaluate/evaluate.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent },
    { path: 'creation', component: CreationComponent}, 
    { path: 'evaluation', component: EvaluateComponent},
];
