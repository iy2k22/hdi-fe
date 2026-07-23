import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);
  
  if (authSvc.isAuthenticated()) {
    const hasExpired = await authSvc.hasTokenExpired();
    
    if (!hasExpired)
      return true;
  }
  
  return router.createUrlTree(['/login'], {
    queryParams: {
      returnUrl: state.url
    }
  });
};
