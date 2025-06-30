/**
 * @description Barra superior con navegación y login.
 */
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

  /**
   * @description Inyecta el servicio de carrito y router
   * @param cartService Servicio del carrito
   * @param router Manejador de rutas
   */
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  /**
   * @description Se suscribe al carrito y lee la sesión
   * @returns void
   */
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


  /**
   * @description Navega a la página de login
   * @returns void
   */
  irALogin(): void {
    this.router.navigate(['/login']);
  }
  
 
  /**
   * @description Devuelve la ruta al perfil según el usuario
   * @returns ruta de perfil
   */
  get rutaPerfil(): string {
    const raw = localStorage.getItem('usuario');
    if (!raw) return '/login';
    const datos = JSON.parse(raw);
    return datos.email === 'admin@example.com' ? '/admin' : '/perfil';
  }

 
  /**
   * @description Limpia la sesión actual
   * @returns void
   */
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.estaAutenticado = false;
    this.nombreUsuario = '';
    this.router.navigate(['/login']);
  }
}
