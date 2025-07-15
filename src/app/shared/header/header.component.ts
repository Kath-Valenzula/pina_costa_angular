import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
/** Barra superior con navegación y login. */
export class HeaderComponent implements OnInit {
  cantidad = 0;
  estaAutenticado = false;
  nombreUsuario = '';

  private leerSesion(): void {
    const usuario = localStorage.getItem('usuario');
    this.estaAutenticado = !!usuario;
    this.nombreUsuario = usuario ? JSON.parse(usuario).nombre || JSON.parse(usuario).email : '';
  }

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
    this.cartService.obtenerCarritoObservable().subscribe((items: Producto[]) => {
      this.cantidad = items.length;
    });

    this.leerSesion();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.leerSesion();
      }
    });
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
    return datos.rol === 'admin' ? '/admin' : '/perfil';
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
