import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
/** Evita que usuarios no administradores accedan a rutas de administración. */
export class AdminGuard implements CanActivate {
  /**
   * @param router Inyectado para redirecciones si no es administrador
   */
  constructor(private router: Router) {}

  /**
   * Verifica si hay un usuario administrador logueado
   * @returns `true` si tiene permisos de administrador
   */
  canActivate(): boolean {
    const raw = localStorage.getItem('usuario');
    if (!raw) {
      this.router.navigate(['/login']);
      return false;
    }
    const user = JSON.parse(raw);
    if (user.email === 'admin@example.com') {
      return true;
    }
    this.router.navigate(['/perfil']);
    return false;
  }
}
