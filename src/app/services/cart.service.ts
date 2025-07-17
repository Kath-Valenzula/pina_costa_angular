import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * @description Servicio que maneja los productos añadidos al carrito, incluyendo almacenamiento en localStorage y emisión de cambios.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  /**
   * @description Lista interna de productos del carrito.
   */
  private items: Producto[] = [];

  /**
   * @description Sujeto observable que emite los cambios del carrito a los componentes suscritos.
   */
  private carritoSubject = new BehaviorSubject<Producto[]>([]);

  /**
   * @description Constructor que carga el carrito guardado desde localStorage, si existe.
   */
  constructor() {
    const data = localStorage.getItem('carrito');
    if (data) {
      this.items = JSON.parse(data);
      this.carritoSubject.next(this.items);
    }
  }

  /**
   * @description Agrega un producto al carrito, lo guarda y emite el nuevo estado.
   * @param producto Producto que se desea agregar al carrito.
   * @returns void
   */
  agregar(producto: Producto): void {
    this.items.push(producto);
    this.guardar();
    this.actualizarCarrito();
  }

  /**
   * @description Devuelve todos los productos actualmente almacenados en el carrito.
   * @returns Arreglo de productos en el carrito.
   */
  obtenerItems(): Producto[] {
    return this.items;
  }

  /**
   * @description Devuelve un observable para suscribirse a los cambios del carrito.
   * @returns Observable que emite la lista de productos actualizada.
   */
  obtenerCarritoObservable(): Observable<Producto[]> {
    return this.carritoSubject.asObservable();
  }

  /**
   * @description Elimina todos los productos del carrito y actualiza el almacenamiento y observable.
   * @returns void
   */
  limpiarCarrito(): void {
    this.items = [];
    this.guardar();
    this.actualizarCarrito();
  }

  /**
   * @description Guarda el contenido actual del carrito en localStorage.
   * @returns void
   */
  private guardar(): void {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  /**
   * @description Notifica a los observadores con la versión actualizada del carrito.
   * @returns void
   */
  private actualizarCarrito(): void {
    this.carritoSubject.next(this.items);
  }
}