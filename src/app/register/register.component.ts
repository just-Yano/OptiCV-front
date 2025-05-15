import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation/navigation.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { LoadingModalComponent } from '../shared/loading-modal/loading-modal.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingModalComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  shakeForm: boolean = false;

  form = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private navigationService: NavigationService,
    private router: Router,
    private aut: AuthService
  ) {}

  onSubmit(registerForm: NgForm) {
    if (!registerForm.valid || this.form.password !== this.form.confirmPassword) {
      this.shakeForm = true;
      setTimeout(() => (this.shakeForm = false), 400);
      return;
    }

    const { username, email, password } = registerForm.value;
    const formData = { username, email, password };

    this.isLoading = true;

    fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.responseMessage || 'Registration failed');
          });
        }
        return response.json();
      })
      .then(data => {
        // Handle the success case
        this.aut.login(data.token, formData.email); // TODO remove the email and keep the token only
        this.successMessage = '🎉 Votre compte a été créé avec succès !';
        registerForm.reset();

        setTimeout(() => {
          this.successMessage = '';
          this.isLoading = false;
          this.router.navigate(['/home']);
        }, 3000);
      })
      .catch(error => {
        this.isLoading = false;
        this.errorMessage = error.message;
        this.shakeForm = true;

        setTimeout(() => {
          this.errorMessage = '';
          this.shakeForm = false;
        }, 3000);
      });
  }

  navigateToLogin() {
    this.navigationService.navigateToLogin();
  }
}
