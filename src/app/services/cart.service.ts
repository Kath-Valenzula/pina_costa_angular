import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>([]);

  constructor() {
    const data = localStorage.getItem('carrito');
    if (data) {
      this.items = JSON.parse(data);
      this.carritoSubject.next(this.items);
    }
  }

  agregar(producto: Producto): void {
    this.items.push(producto);
    this.guardar();
    this.actualizarCarrito();
  }

  obtenerItems(): Producto[] {
    return this.items;
  }

  obtenerCarritoObservable() {
    return this.carritoSubject.asObservable();
  }

  limpiarCarrito(): void {
    this.items = [];
    this.guardar();
    this.actualizarCarrito();
  }

  private guardar(): void {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  private actualizarCarrito(): void {
    this.carritoSubject.next(this.items);
  }
}
