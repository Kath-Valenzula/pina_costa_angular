// Página que lista los productos en el carrito.
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Producto[] = [];

  // Servicio que gestiona el carrito
  constructor(private cartService: CartService) {}

  // Carga los productos almacenados
  ngOnInit(): void {
    this.items = this.cartService.obtenerItems();
  }

  // Vacía el carrito
  limpiarCarrito(): void {
    this.cartService.limpiarCarrito();
    this.items = [];
  }

  // Suma el precio de todos los productos
  obtenerTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.precio || 0), 0);
  }
}
