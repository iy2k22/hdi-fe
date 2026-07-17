import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApi } from '../../services/auth-api';
import { Footer } from '../footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  login!: FormGroup;
  error: boolean = false;
  errorMsg!: string;

  constructor(
    private fb: FormBuilder,
    private authApi: AuthApi,
    private router: Router
  ) {
    this.login = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  tryLogin() {
    this.error = false;
    this.authApi.login(this.login.value).subscribe({
      next: (res) => {
        const { token, refreshToken } = res;
        console.log('Success!');
        console.log(res);
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
        localStorage.setItem("token", JSON.stringify(token));
        this.router.navigate(['/home-page']);
      },
      error: (err) => {
        this.error = true;
        console.log('Error!');
        console.error(err);
      }
    })
  }
}
