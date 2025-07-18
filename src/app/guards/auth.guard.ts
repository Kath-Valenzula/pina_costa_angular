import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
/** Protege rutas que requieren un usuario autenticado. */
export class AuthGuard implements CanActivate {
  /**
   * @param router Router usado para redirigir a login si no hay sesión
   */
  constructor(private router: Router, private auth: AuthService) {}

  /**
   * Comprueba si existe una sesión activa
   * @returns `true` cuando hay usuario autenticado
   */
  canActivate(): boolean {
    const user = this.auth.getCurrent();
    if (user) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
