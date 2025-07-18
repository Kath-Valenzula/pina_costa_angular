import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
/** Evita que usuarios no administradores accedan a rutas de administración. */
export class AdminGuard implements CanActivate {
  /**
   * @param router Inyectado para redirecciones si no es administrador
   */
  constructor(private router: Router, private auth: AuthService) {}

  /**
   * Verifica si hay un usuario administrador logueado
   * @returns `true` si tiene permisos de administrador
   */
  canActivate(): boolean {
    const user = this.auth.getCurrent();
    if (user && user.rol === 'admin') {
      return true;
    }
    this.router.navigate([user ? '/perfil' : '/login']);
    return false;
  }
}
