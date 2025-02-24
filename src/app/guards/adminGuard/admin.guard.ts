import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);

  const role = authService.getUserRole();
  if(role === 'ADMIN'){
    return true;
  } else{
    router.navigate(['/login']);
    return false;
  }

};
