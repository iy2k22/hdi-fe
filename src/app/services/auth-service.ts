import { inject, Injectable, signal } from '@angular/core';
import { TokenDTO } from '../models/token';
import { AuthApi } from './auth-api';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSignal = signal<boolean>(localStorage.getItem("token") !== null);
  
  private authApi = inject(AuthApi);

  public isAuthenticated = this.authSignal.asReadonly();
  
  authenticate(tokenDTO: TokenDTO) {
    const { token, refreshToken } = tokenDTO;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    this.authSignal.set(true);
  }
  
  async hasTokenExpired() {
    const token = localStorage.getItem("token");
    
    if (token)
      return await firstValueFrom(this.authApi.hasTokenExpired(token));
    
    return false;
  }
  
  deauthenticate() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    this.authSignal.set(false);
  }
}
