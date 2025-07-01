import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
/** Protege rutas que requieren un usuario autenticado. */
export class AuthGuard implements CanActivate {
  /**
   * @param router Router usado para redirigir a login si no hay sesión
   */
  constructor(private router: Router) {}

  /**
   * Comprueba si existe una sesión activa
   * @returns `true` cuando hay usuario autenticado
   */
  canActivate(): boolean {
    const raw = localStorage.getItem('usuario');
    if (raw) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
