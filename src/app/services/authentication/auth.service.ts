import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly EMAIL_KEY = 'email';

  constructor() {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  // TODO remove and use only the token
  getEmail(): string | null {
    return sessionStorage.getItem(this.EMAIL_KEY);
  }

  login(token: string, email : string): void { // param email
    sessionStorage.setItem(this.TOKEN_KEY, token);
    sessionStorage.setItem(this.EMAIL_KEY, email); // TODO remove and use only the token
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.EMAIL_KEY); // TODO remove and use only the token
  }
}
