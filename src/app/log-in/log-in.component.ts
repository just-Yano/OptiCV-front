import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  errorMessage: string = '';

  constructor(private navigationService: NavigationService) { }

  onSubmit(loginForm: NgForm) {
    // double check if the form is valid
    if (loginForm.valid) {
      // get the form data
      const formData = loginForm.value;

      // sending the form data to the server
      fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(response => {
        if (!response.ok) {
          this.errorMessage = 'Invalid username or password.';
          setTimeout(() => {
            this.errorMessage = '';
          }
          , 3000);
        }
        }).then(data => {
          // handle the response data
          console.log(data); // TODO check for the cookies
          // reset the form
          loginForm.reset();
        }); 
    } else {
      this.errorMessage = 'Please use a valid email address and password.';
      setTimeout(() => {
        this.errorMessage = '';
      }
      , 3000);
    }
  }

  navigateToHome() {
    this.navigationService.navigateToHome();
  }

  navigateToRegistration() {
    this.navigationService.navigateToRegistration();
  }
}
