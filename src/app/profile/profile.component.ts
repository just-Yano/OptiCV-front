import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    if (!this.isLoggedIn) {
      setTimeout(() => {
      this.router.navigate(['/login']);}
      , 5000);
    }

    // TODO 
    fetch('https://localhost:8080/api/user/getProfile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    }).then(response => {
      if (!response.ok) {
        return response.json().then(data => {
            throw new Error(data.responseMessage || 'Failed to fetch profile');
          });
        }
        return response.json(); // Read the body once for a successful response
      }).then((data : User) => {
        // binding the data to the profile component HTML
      }).catch(error => {
        // TODO redirect to home page + give error message?
        
      });
  } 
}
