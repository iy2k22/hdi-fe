import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Hdi.FE');

  private authSvc = inject(AuthService);
  private router = inject(Router);
  
  constructor() {
    effect(() => {
      const loggedIn = this.authSvc.isAuthenticated();
      
      if (!loggedIn)
        this.router.navigateByUrl(this.router.url);
    })
  }
  
  ngOnInit(): void {
    // log the user out every time
    this.authSvc.deauthenticate();
  }
}
