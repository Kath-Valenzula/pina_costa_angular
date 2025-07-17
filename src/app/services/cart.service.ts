import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * @description Maneja los productos añadidos al carrito.
 */
export class CartService {
    /** @description Lista interna de productos */
  private items: Producto[] = [];
    /** @description Sujeto para emitir cambios del carrito */
  private carritoSubject = new BehaviorSubject<Producto[]>([]);

  /**
   * @description Carga el carrito guardado
   */
  constructor() {
    const data = localStorage.getItem('carrito');
    if (data) {
      this.items = JSON.parse(data);
      this.carritoSubject.next(this.items);
    }
  }

  /**
   * @description Agrega un producto al carrito
   * @param producto Producto a agregar
   * @returns void
   */
  agregar(producto: Producto): void {
    this.items.push(producto);
    this.guardar();
    this.actualizarCarrito();
  }

  /**
   * @description Devuelve los productos actuales
   * @returns Lista de productos
   */
  obtenerItems(): Producto[] {
    return this.items;
  }

  /**
   * @description Observable para notificar cambios
   * @returns Observable del carrito
   */
    obtenerCarritoObservable(): Observable<Producto[]> {
    return this.carritoSubject.asObservable();
  }

  /**
   * @description Vacía el carrito por completo
   * @returns void
   */
  limpiarCarrito(): void {
    this.items = [];
    this.guardar();
    this.actualizarCarrito();
  }

  /**
   * @description Persiste en localStorage
   * @returns void
   */
  private guardar(): void {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  /**
   * @description Actualiza los suscriptores
   * @returns void
   */
  private actualizarCarrito(): void {
    this.carritoSubject.next(this.items);
  }
}
