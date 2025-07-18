import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/models/producto.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
/**
 * @description Listado de productos disponibles en la tienda.
 * 
 */
export class CatalogoComponent implements OnInit {
  /** @description Productos cargados para mostrar */
  productos: Producto[] = [];

  /**
   * @description Constructor con servicios
   * @param http Cliente HTTP para cargar datos
   * 
   * @param cartService Servicio del carrito
   */
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private title: Title,
    private meta: Meta
  ) {}

  /**
   * @description Al iniciar, carga la lista de productos
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.title.setTitle('Catálogo - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Descubre nuestra colección de productos en Piña Costa.'
    });

    this.cargarProductos();
  }

  /**
   * @description Obtiene los productos desde un archivo
   * 
   * @returns void
   */
  cargarProductos(): void {
    this.http.get<Producto[]>('assets/data/productos.json').subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  /**
   * @description Añade un producto al carrito
   * 
   * @param producto Producto a agregar
   * @returns void
   */
  agregarAlCarrito(producto: Producto): void {
    this.cartService.agregar(producto);
  }
}
