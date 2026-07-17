import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApi } from '../../services/auth-api';
import { Footer } from '../footer/footer';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  login!: FormGroup;
  error: boolean = false;
  errorMsg!: string;
  
  returnUrl: string = '/home-page';

  constructor(
    private fb: FormBuilder,
    private authApi: AuthApi,
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService
  ) {
    this.login = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    const queryUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (queryUrl)
      this.returnUrl = queryUrl;
  }
  
  tryLogin() {
    this.error = false;
    this.authApi.login(this.login.value).subscribe({
      next: (res) => {
        this.authSvc.authenticate(res);
        this.router.navigate([this.returnUrl]);
      },
      error: (err) => {
        this.error = true;
        console.log('Error!');
        console.error(err);
      }
    })
  }
}
