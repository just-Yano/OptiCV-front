import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreationComponent } from './creation/creation.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent },
    { path: 'creation', component: CreationComponent}, 
    { path: 'evaluation', component: EvaluateComponent},
    { path: 'login', component: LogInComponent}, 
    { path: 'registration', component: RegisterComponent}, 
];
