import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation/navigation.service';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private navigationService: NavigationService, private auth : AuthService) { }

  onSubmit(loginForm: NgForm) {
    // get the form data
    const formData = loginForm.value;
    this.isLoading = true;

    // sending the form data to the server
    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
      }).then(response => {
        if (!response.ok) {
          throw new Error('Invalid username or password.');
        }
        return response.json();
      }).then(data => {
        // store the token in session storage
        this.auth.login(data.token, formData.email); // TODO remove the email and keep the token only
        // reset the form
        loginForm.reset();
        // show success message
        this.successMessage = 'Welcome back! Your are being redirected to the home page.';
        // navigate to the home page
        setTimeout(() => {
          this.isLoading = false;
          this.navigationService.navigateToHome();
          this.successMessage = '';
        }
        , 3000);
       }).catch(error => {
          // handle the error
          this.errorMessage = error.message;
          setTimeout(() => {
            this.isLoading = false;
            this.errorMessage = '';
        }
        , 3000);
      }); 
  }

  navigateToHome() {
    this.navigationService.navigateToHome();
  }

  navigateToRegistration() {
    this.navigationService.navigateToRegistration();
  }
}
