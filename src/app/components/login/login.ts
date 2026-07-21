import { Component, OnInit, signal } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApi } from '../../services/auth-api';
import { Footer } from '../footer/footer';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  login!: FormGroup;
  error = signal<boolean>(false);

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
  
  async tryLogin() {
    this.error.set(false);

    try {
      const res = await firstValueFrom(this.authApi.login(this.login.value));
      this.authSvc.authenticate(res);
      this.router.navigate([this.returnUrl]);
    } catch (ex) {
      this.error.set(true);
      console.error(ex);
    }
  }
}
