import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth'; 

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await authService.getUser(); 
  if (!user) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false; 
  }

  return true;
};
