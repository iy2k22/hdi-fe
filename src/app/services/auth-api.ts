import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../models/login-dto';
import { TokenDTO } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  baseUrl: string = 'http://localhost:5098/api/Authentication';
  
  constructor(
    private http: HttpClient
  ) {}
  
  login(dto: LoginDTO) {
    return this.http.post<TokenDTO>(`${this.baseUrl}/login`, dto);
  }
  
  refreshToken(token: string, refreshToken: string) {
    return this.http.post<TokenDTO>(`${this.baseUrl}/refreshToken`, {
      token,
      refreshToken
    });
  }
  
  hasTokenExpired(token: string) {
    return this.http.post<boolean>(`${this.baseUrl}/hasTokenExpired`, token);
  }
}
