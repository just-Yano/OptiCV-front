import { Component } from '@angular/core';
import { NavigationService } from '../services/navigation/navigation.service';  
import { AuthService } from '../services/authentication/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public isLoggedIn: boolean = false;
  constructor(private navigationService: NavigationService, private auth : AuthService, private router: Router) { 
    this.isLoggedIn = this.auth.isLoggedIn();
  }
  
  navigateToHome() {
    this.navigationService.navigateToHome();
  }

  navigateToCreation() {
    this.navigationService.navigateToCreation();
  }

  navigateToEvaluation() {
    this.navigationService.navigateToEvaluation();
  }

  navigateToLogin() {
    this.navigationService.navigateToLogin();
  }

  navigateToProfile() {
    this.navigationService.navigateToProfile();
  }

  logOut() {
    this.auth.logout();
    this.isLoggedIn = false;
    if (this.router.url !== '/home') {
      this.navigationService.navigateToHome();
    }   
  }

  navigateToTailoring() {
    this.navigationService.navigateToTailoring();
  }
}
