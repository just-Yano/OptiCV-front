import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation/navigation.service';
import { AuthService } from '../services/authentication/auth.service';
import { LoadingModalComponent } from '../shared/loading-modal/loading-modal.component';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingModalComponent],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  errorMessage: string = '';
  isLoading: boolean = false;
  shakeForm: boolean = false;

  constructor(
    private navigationService: NavigationService,
    private auth: AuthService
  ) {}

  onSubmit(loginForm: NgForm) {
    const formData = loginForm.value;
    this.isLoading = true;
    this.errorMessage = '';
   

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) throw new Error('Identifiants invalides.');
        return response.json();
      })
      .then(data => {
        this.auth.login(data.token);
        loginForm.reset();

        // Keep loading spinner a bit, then redirect
        setTimeout(() => {
          this.isLoading = false;
          this.navigationService.navigateToHome();
        }, 1500);
      })
      .catch(error => {
        this.isLoading = false; // hide loader
        this.errorMessage = error.message;
        this.shakeForm = true;

        setTimeout(() => {
          this.errorMessage = '';
          this.shakeForm = false;
        }, 3000);
      });
  }

  navigateToHome() {
    this.navigationService.navigateToHome();
  }

  navigateToRegistration() {
    this.navigationService.navigateToRegistration();
  }
}
