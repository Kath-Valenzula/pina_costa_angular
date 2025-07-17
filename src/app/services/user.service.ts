import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @description Datos de un usuario registrado.
 * @property username Nombre de usuario
 * @property password Contraseña del usuario
 * @property role Rol asignado al usuario ('admin' o 'usuario')
 */
export interface Usuario {
  username: string;
  password: string;
  role: 'admin' | 'usuario';
}

/**
 * @description Servicio para gestionar usuarios utilizando localStorage.
 *
 * Permite obtener, agregar, actualizar y buscar usuarios.
 */
export class UserService {
  /**
   * @description Clave usada para almacenar los usuarios en localStorage.
   */
  private STORAGE_KEY = 'pinna-users';

  /**
   * @description Lista observable de usuarios registrados.
   */
  private users$ = new BehaviorSubject<Usuario[]>([]);

  /**
   * @description Constructor del servicio. Carga los usuarios desde localStorage o inicializa uno por defecto (admin).
   */
  constructor() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      const admin: Usuario = { username: 'admin', password: 'admin', role: 'admin' };
      this.users$.next([admin]);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([admin]));
    } else {
      this.users$.next(JSON.parse(raw));
    }
  }

  /**
   * @description Guarda la lista de usuarios en localStorage y actualiza el observable.
   * @param list Lista completa de usuarios.
   * @returns void
   */
  private save(list: Usuario[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    this.users$.next(list);
  }

  /**
   * @description Retorna todos los usuarios registrados.
   * @returns Arreglo de objetos Usuario.
   */
  getAll(): Usuario[] {
    return this.users$.value;
  }

  /**
   * @description Busca un usuario por su nombre de usuario.
   * @param username Nombre del usuario a buscar.
   * @returns El objeto Usuario si existe, o undefined si no se encuentra.
   */
  find(username: string): Usuario | undefined {
    return this.getAll().find(u => u.username === username);
  }

  /**
   * @description Agrega un nuevo usuario a la lista y actualiza el almacenamiento.
   * @param user Objeto Usuario a agregar.
   * @returns void
   */
  add(user: Usuario): void {
    const list = this.getAll();
    list.push(user);
    this.save(list);
  }

  /**
   * @description Actualiza la información de un usuario existente.
   * @param user Objeto Usuario actualizado.
   * @returns void
   */
  update(user: Usuario): void {
    const list = this.getAll().map(u => u.username === user.username ? user : u);
    this.save(list);
  }

  /**
   * @description Elimina un usuario de la lista por su nombre de usuario.
   * @param username Nombre del usuario a eliminar.
   * @returns void
   */
  delete(username: string): void {
    const list = this.getAll().filter(u => u.username !== username);
    this.save(list);
  }
}

/**
 * @description Decorador que hace disponible el servicio UserService a toda la app.
 */
@Injectable({
  providedIn: 'root'
})
export class InjectableUserService extends UserService {}