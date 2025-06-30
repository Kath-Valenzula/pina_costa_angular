import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

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
