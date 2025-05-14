import { Component } from '@angular/core';
import { NavigationService } from '../navigation.service';  
import { AuthService } from '../services/authentication/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public isLoggedIn: boolean = false;
  constructor(private navigationService: NavigationService, private auth : AuthService) { 
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

  navigateToPreferences() {
    this.navigationService.navigateToPreferences();
  }

  logOut() {
    this.auth.logout();
    this.navigationService.navigateToHome();
  }
}
