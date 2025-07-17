import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @description Datos de un usuario registrado.
 * @property username Nombre de usuario
 * @property password Contraseña del usuario
 * @property role Rol asignado al usuario
 */
export interface Usuario {
  username: string;
  password: string;
  role: 'admin' | 'usuario';
}

@Injectable({ providedIn: 'root' })
/**
 * @description Servicio para gestionar usuarios en localStorage.
 */
export class UserService {
    /** @description Clave utilizada para guardar en localStorage */
  private STORAGE_KEY = 'pinna-users';
    /** @description Lista observable de usuarios registrados */
  private users$ = new BehaviorSubject<Usuario[]>([]);

  /**
   * @description Carga usuarios del almacenamiento o crea uno por defecto
   */
  constructor() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      // Seed: un solo admin por defecto
      const admin: Usuario = { username: 'admin', password: 'admin', role: 'admin' };
      this.users$.next([admin]);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([admin]));
    } else {
      this.users$.next(JSON.parse(raw));
    }
  }

  /**
   * @description Guarda la lista en localStorage
   * @param list Lista de usuarios
   * @returns void
   */
  private save(list: Usuario[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    this.users$.next(list);
  }

  /**
   * @description Devuelve todos los usuarios
   * @returns Lista de usuarios
   */
  getAll(): Usuario[] {
    return this.users$.value;
  }

  /**
   * @description Busca un usuario por nombre
   * @param username Nombre de usuario
   * @returns Usuario encontrado o undefined
   */
  find(username: string): Usuario | undefined {
    return this.getAll().find(u => u.username === username);
  }

  /**
   * @description Agrega un nuevo usuario
   * @param user Usuario a agregar
   * @returns void
   */
  add(user: Usuario): void {
    const list = this.getAll();
    list.push(user);
    this.save(list);
  }

  /**
   * @description Actualiza un usuario existente
   * @param user Usuario a actualizar
   * @returns void
   */
  update(user: Usuario): void {
    const list = this.getAll().map(u => u.username === user.username ? user : u);
    this.save(list);
  }
}
