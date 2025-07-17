import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService, Usuario } from './user.service';

@Injectable({ providedIn: 'root' })
/**
 * @description Servicio de autenticación guardado en localStorage.
 */
export class AuthService {
    /** @description Usuario actualmente autenticado */
  private current$ = new BehaviorSubject<Usuario | null>(null);

  /**
   * @description Carga la sesión existente si la hay
   * @param userSvc Servicio de usuarios
   */
  constructor(private userSvc: UserService) {
    // restore session si existe
    const raw = localStorage.getItem('currentUser');
    if (raw) this.current$.next(JSON.parse(raw));
  }

  /**
   * @description Intenta iniciar sesión con un usuario
   * @param username Nombre de usuario
   * @param password Contraseña
   * @returns true si las credenciales son válidas
   */
  login(username: string, password: string): boolean {
    const u = this.userSvc.find(username);
    if (u && u.password === password) {
      this.current$.next(u);
      localStorage.setItem('currentUser', JSON.stringify(u));
      return true;
    }
    return false;
  }

  /**
   * @description Cierra la sesión actual
   * @returns void
   */
  logout(): void {
    this.current$.next(null);
    localStorage.removeItem('currentUser');
  }

  /**
   * @description Devuelve el usuario autenticado o null
   * @returns Usuario actual o null
   */
  getCurrent(): Usuario | null {
    return this.current$.value;
  }
}
