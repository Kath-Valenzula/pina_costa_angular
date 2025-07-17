import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Representa un usuario registrado en el sistema.
 */
export interface Usuario {
  /** Nombre de usuario */
  username: string;
  /** Contraseña del usuario */
  password: string;
  /** Rol del usuario ('admin' o 'usuario') */
  role: 'admin' | 'usuario';
}

/**
 * Interfaz que define las operaciones del servicio de usuarios.
 */
export interface IUserService {
  /** Obtiene todos los usuarios */
  getAll(): Usuario[];

  /** Busca un usuario por nombre */
  find(username: string): Usuario | undefined;

  /** Agrega un nuevo usuario */
  add(user: Usuario): void;

  /** Actualiza un usuario existente */
  update(user: Usuario): void;

  /** Elimina un usuario por nombre */
  delete(username: string): void;

  /** Inicializa los datos desde localStorage */
  init(): void;
}

/**
 * Servicio para manejar usuarios usando localStorage.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  /** Clave usada para almacenar usuarios */
  private STORAGE_KEY = 'pinna-users';

  /** Lista observable de usuarios */
  private users$ = new BehaviorSubject<Usuario[]>([]);

  /**
   * Constructor del servicio. No realiza carga de datos.
   * Se debe invocar el método `init()` para cargar usuarios.
   */
  constructor() {}

  /**
   * Inicializa el almacenamiento con usuarios desde localStorage.
   * Si no existen, crea un admin por defecto.
   */
  public init(): void {
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
   * Guarda la lista en localStorage.
   * @param list Lista de usuarios
   */
  private save(list: Usuario[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    this.users$.next(list);
  }

  /**
   * Retorna todos los usuarios registrados.
   * @returns Arreglo de usuarios
   */
  public getAll(): Usuario[] {
    return this.users$.value;
  }

  /**
   * Busca un usuario por nombre.
   * @param username Nombre de usuario
   * @returns Usuario encontrado o undefined
   */
  public find(username: string): Usuario | undefined {
    return this.getAll().find(u => u.username === username);
  }

  /**
   * Agrega un nuevo usuario a la lista.
   * @param user Usuario a agregar
   */
  public add(user: Usuario): void {
    const list = this.getAll();
    list.push(user);
    this.save(list);
  }

  /**
   * Actualiza un usuario existente.
   * @param user Usuario con datos actualizados
   */
  public update(user: Usuario): void {
    const list = this.getAll().map(u => u.username === user.username ? user : u);
    this.save(list);
  }

  /**
   * Elimina un usuario por su nombre.
   * @param username Nombre de usuario a eliminar
   */
  public delete(username: string): void {
    const list = this.getAll().filter(u => u.username !== username);
    this.save(list);
  }
}
