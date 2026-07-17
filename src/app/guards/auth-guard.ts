import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);
  
  if (authSvc.isAuthenticated())
    return true;
  
  return router.createUrlTree(['/login'], {
    queryParams: {
      returnUrl: state.url
    }
  });
};
