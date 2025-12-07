import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Verificar si la ruta requiere roles específicos
    const requiredRoles = route.data['roles'] as Array<string>;
    
    if (requiredRoles) {
      const userRole = authService.getUserRole();
      
      if (userRole && requiredRoles.includes(userRole)) {
        return true;
      } else {
        // Redirigir según el rol del usuario
        if (userRole === 'administrador' || userRole === 'medico') {
          router.navigate(['/admin/index']);
        } else if (userRole === 'paciente') {
          router.navigate(['/MediCore']);
        }
        return false;
      }
    }
    
    return true;
  }

  // No autenticado, redirigir al login
  router.navigate(['/login']);
  return false;
};
