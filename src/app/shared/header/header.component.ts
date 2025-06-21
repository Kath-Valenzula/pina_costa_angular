import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cantidad = 0;
  estaAutenticado = false;
  nombreUsuario = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
 
    
      this.cartService.obtenerCarritoObservable().subscribe((items: any[]) => {
      this.cantidad = items.length;
    });


    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.estaAutenticado = true;
      const datos = JSON.parse(usuario);
      this.nombreUsuario = datos.nombre || datos.email;
    }
  }


  irALogin(): void {
    this.router.navigate(['/login']);
  }
  
 
  get rutaPerfil(): string {
    const raw = localStorage.getItem('usuario');
    if (!raw) return '/login';
    const datos = JSON.parse(raw);
    return datos.email === 'admin@example.com' ? '/admin' : '/perfil';
  }

 
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.estaAutenticado = false;
    this.nombreUsuario = '';
    this.router.navigate(['/login']);
  }
}
