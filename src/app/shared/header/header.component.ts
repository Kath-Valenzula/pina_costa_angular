// Barra superior con navegación y login.
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

  // Inyecta el servicio de carrito y router
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  // Se suscribe al carrito y lee la sesión
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


  // Navega a la página de login
  irALogin(): void {
    this.router.navigate(['/login']);
  }
  
 
  // Devuelve la ruta al perfil según el usuario
  get rutaPerfil(): string {
    const raw = localStorage.getItem('usuario');
    if (!raw) return '/login';
    const datos = JSON.parse(raw);
    return datos.email === 'admin@example.com' ? '/admin' : '/perfil';
  }

 
  // Limpia la sesión actual
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.estaAutenticado = false;
    this.nombreUsuario = '';
    this.router.navigate(['/login']);
  }
}
