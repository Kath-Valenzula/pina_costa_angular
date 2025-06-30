// Servicio de autenticación guardado en localStorage.
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService, Usuario } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private current$ = new BehaviorSubject<Usuario | null>(null);

  // Carga la sesión existente si la hay
  constructor(private userSvc: UserService) {
    // restore session si existe
    const raw = localStorage.getItem('currentUser');
    if (raw) this.current$.next(JSON.parse(raw));
  }

  // Intenta iniciar sesión con un usuario
  login(username: string, password: string): boolean {
    const u = this.userSvc.find(username);
    if (u && u.password === password) {
      this.current$.next(u);
      localStorage.setItem('currentUser', JSON.stringify(u));
      return true;
    }
    return false;
  }

  // Cierra la sesión actual
  logout(): void {
    this.current$.next(null);
    localStorage.removeItem('currentUser');
  }

  // Devuelve el usuario autenticado o null
  getCurrent(): Usuario | null {
    return this.current$.value;
  }
}
