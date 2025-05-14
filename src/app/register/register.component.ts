import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation/navigation.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

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

  constructor(private navigationService: NavigationService, private router : Router, private aut : AuthService) {}

  onSubmit(registerForm: NgForm) {
  // double check if the form is valid
  if (registerForm.valid) {
    // get the form data
    const { username, email, password } = registerForm.value;
    const formData = {
      username: username,
      email: email,
      password: password
    };

    // sending the form data to the server
    fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          // Only read the response body once if there's an error
          return response.json().then(data => {
            throw new Error(data.responseMessage || 'Registration failed');
          });
        }
        return response.json(); // Read the body once for a successful response
      })
      .then(data => {
        // Handle the success case
        this.aut.login(data.token);
        this.successMessage = 'Welcome to OptiCV!';
        registerForm.reset();
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/home']);
        }, 3000);
      })
      .catch(error => {
        // Handle the error
        this.errorMessage = error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
  }
}


  navigateToLogin() {
    this.navigationService.navigateToLogin();
  }
}
