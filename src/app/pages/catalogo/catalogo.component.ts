// Listado de productos disponibles en la tienda.
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/models/producto.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}

  // Al iniciar, carga la lista de productos
  ngOnInit(): void {
    this.cargarProductos();
  }

  // Obtiene los productos desde un archivo
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

  // Añade un producto al carrito
  agregarAlCarrito(producto: Producto): void {
    this.cartService.agregar(producto);
  }
}
