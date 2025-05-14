import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string = '';
  successMessage: string = '';  
  form = {
      username: '',
      email: '',
      password: '', 
      confirmPassword: ''
    };

  constructor(private navigationService: NavigationService, private router : Router) {}

  onSubmit(registerForm: NgForm) {
    // double check if the form is valid
    if (registerForm.valid) {
      // get the form data
      const formData = registerForm.value;

      // sending the form data to the server
      fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(response => {
        if (!response.ok) {
          this.errorMessage = 'Registration failed. Please try again.';
          setTimeout(() => {
            this.errorMessage = '';
          }
          , 3000);
        }
      }).then(data => {
        this.successMessage = 'Welcome to OptiCV!';
        registerForm.reset();
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/home']);
        }, 3000);
      });
    }
  }

  navigateToLogin() {
    this.navigationService.navigateToLogin();
  }
}
