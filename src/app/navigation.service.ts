import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router : Router) { }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToCreation() {
    this.router.navigate(['/creation']);
  }

  navigateToEvaluation() {
    this.router.navigate(['/evaluation']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }

  navigateToPreferences() {
    this.router.navigate(['/preferences']);
  }
}
