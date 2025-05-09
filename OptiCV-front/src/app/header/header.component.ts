import { Component } from '@angular/core';
import { NavigationService } from '../navigation.service';  
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private navigationService: NavigationService) { }
  
  navigateToHome() {
    this.navigationService.navigateToHome();
  }

  navigateToCreation() {
    this.navigationService.navigateToCreation();
  }

  navigateToEvaluation() {
    this.navigationService.navigateToEvaluation();
  }
}
