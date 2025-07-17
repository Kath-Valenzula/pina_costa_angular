import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
/**
 * @description Página que lista los productos en el carrito.
 */
export class CartComponent implements OnInit {
  /** @description Productos actualmente en el carrito */
  items: Producto[] = [];

  /**
   * @description Servicio que gestiona el carrito
   * @param cartService Servicio del carrito
   */
  constructor(
    private cartService: CartService,
    private title: Title,
    private meta: Meta
  ) {}

  /**
   * @description Carga los productos almacenados
   * @returns void
   */
  ngOnInit(): void {
    this.title.setTitle('Carrito - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Revisa los productos añadidos a tu carrito en Piña Costa.'
    });

    this.items = this.cartService.obtenerItems();
  }

  /**
   * @description Vacía el carrito
   * @returns void
   */
  limpiarCarrito(): void {
    this.cartService.limpiarCarrito();
    this.items = [];
  }

  /**
   * @description Suma el precio de todos los productos
   * @returns total acumulado
   */
  obtenerTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.precio || 0), 0);
  }
}
