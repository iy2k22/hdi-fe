import { Injectable, signal } from '@angular/core';
import { TokenDTO } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSignal = signal<boolean>(localStorage.getItem("token") !== null);

  public isAuthenticated = this.authSignal.asReadonly();
  
  authenticate(tokenDTO: TokenDTO) {
    const { token, refreshToken } = tokenDTO;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    this.authSignal.set(true);
  }
  
  deauthenticate() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    this.authSignal.set(false);
  }
}
