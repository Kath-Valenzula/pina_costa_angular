import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService, Usuario } from './user.service';

/**
 * @description Servicio de autenticación. Gestiona login, logout y persistencia en localStorage.
 * 
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * @description Usuario actualmente autenticado, almacenado como observable.
   * 
   */
  private current$ = new BehaviorSubject<Usuario | null>(null);

  /**
   * @description Constructor que carga una sesión previa desde localStorage si existe.
   * 
   * @param userSvc Servicio de usuarios para validar credenciales.
   */
  constructor(private userSvc: UserService) {
    const raw = localStorage.getItem('currentUser');
    if (raw) this.current$.next(JSON.parse(raw));
  }

  /**
   * @description Inicia sesión si las credenciales son válidas. Persiste la sesión en localStorage.
   * 
   * @param username Nombre de usuario.
   * @param password Contraseña del usuario.
   * @returns `true` si las credenciales coinciden, `false` en caso contrario.
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
   * @description Cierra la sesión actual y elimina el usuario del localStorage.
   * 
   * @returns void
   */
  logout(): void {
    this.current$.next(null);
    localStorage.removeItem('currentUser');
  }

  /**
   * @description Devuelve el usuario actualmente autenticado.
   * 
   * @returns Objeto `Usuario` o `null` si no hay sesión activa.
   */
  getCurrent(): Usuario | null {
    return this.current$.value;
  }
}
