import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Usuario {
  username: string;
  password: string;
  role: 'admin' | 'usuario';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private STORAGE_KEY = 'pinna-users';
  private users$ = new BehaviorSubject<Usuario[]>([]);

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

  private save(list: Usuario[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    this.users$.next(list);
  }

  getAll(): Usuario[] {
    return this.users$.value;
  }

  find(username: string): Usuario | undefined {
    return this.getAll().find(u => u.username === username);
  }

  add(user: Usuario): void {
    const list = this.getAll();
    list.push(user);
    this.save(list);
  }

  update(user: Usuario): void {
    const list = this.getAll().map(u => u.username === user.username ? user : u);
    this.save(list);
  }
}
