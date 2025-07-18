import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Representa un usuario registrado en el sistema.
 */
export interface Usuario {
  /** Correo del usuario */
  email: string;
  /** Contraseña del usuario */
  password: string;
  /** Rol del usuario ('admin' o 'usuario') */
  rol: 'admin' | 'usuario';
}

/**
 * Interfaz que define las operaciones del servicio de usuarios.
 */
export interface IUserService {
  /** Obtiene todos los usuarios */
  getAll(): Usuario[];

  /** Busca un usuario por email */
  find(email: string): Usuario | undefined;

  /** Agrega un nuevo usuario */
  add(user: Usuario): void;

  /** Actualiza un usuario existente */
  update(user: Usuario): void;

  /** Elimina un usuario por email */
  delete(email: string): void;

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
  /** Ruta al archivo JSON con usuarios */
  private usersUrl = 'assets/data/usuarios.json';

  constructor(private http: HttpClient) {}

  /** Lista observable de usuarios */
  private users$ = new BehaviorSubject<Usuario[]>([]);

  /**
   * Inicializa el servicio sin cargar datos automáticamente.
   * Para cargar usuarios se debe llamar explícitamente al método `init()`.
   */

  /**
   * Inicializa el almacenamiento con usuarios desde localStorage.
   * Si no existen, crea un admin por defecto.
   */
  public init(): Promise<void> {
    return new Promise(resolve => {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        this.users$.next(JSON.parse(raw));
        resolve();
        return;
      }
      this.http.get<Usuario[]>(this.usersUrl).subscribe(data => {
        this.users$.next(data);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        resolve();
      }, () => resolve());
    });
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
   * Busca un usuario por su email.
   * @param email Correo electrónico
   * @returns Usuario encontrado o undefined
   */
  public find(email: string): Usuario | undefined {
    return this.getAll().find(u => u.email === email);
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
    const list = this.getAll().map(u => u.email === user.email ? user : u);
    this.save(list);
  }

  /**
   * Elimina un usuario por su email.
   * @param email Correo electrónico a eliminar
   */
  public delete(email: string): void {
    const list = this.getAll().filter(u => u.email !== email);
    this.save(list);
  }
}
