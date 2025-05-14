import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  constructor() {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  login(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
