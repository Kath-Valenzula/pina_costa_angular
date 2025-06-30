// Maneja los productos añadidos al carrito.
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>([]);

  // Carga el carrito guardado
  constructor() {
    const data = localStorage.getItem('carrito');
    if (data) {
      this.items = JSON.parse(data);
      this.carritoSubject.next(this.items);
    }
  }

  // Agrega un producto al carrito
  agregar(producto: Producto): void {
    this.items.push(producto);
    this.guardar();
    this.actualizarCarrito();
  }

  // Devuelve los productos actuales
  obtenerItems(): Producto[] {
    return this.items;
  }

  // Observable para notificar cambios
  obtenerCarritoObservable() {
    return this.carritoSubject.asObservable();
  }

  // Vacía el carrito por completo
  limpiarCarrito(): void {
    this.items = [];
    this.guardar();
    this.actualizarCarrito();
  }

  // Persiste en localStorage
  private guardar(): void {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  // Actualiza los suscriptores
  private actualizarCarrito(): void {
    this.carritoSubject.next(this.items);
  }
}
