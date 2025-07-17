import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
/**
 * @description Servicio que obtiene productos desde un archivo JSON.
 */
export class ProductService {
    /** @description Ruta local del archivo de productos */
  private productosUrl = 'assets/data/productos.json';

  /**
   * @description HttpClient para leer el JSON
   * @param http Cliente HTTP de Angular
   */
  constructor(private http: HttpClient) {}

  /**
   * @description Devuelve todos los productos
   * @returns Observable con la lista de productos
   */
  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  /**
   * @description Busca un producto por su id
   * @param id Identificador del producto
   * @returns Observable con el producto encontrado o undefined
   */
  getById(id: number): Observable<Producto | undefined> {
    return new Observable(observer => {
      this.getAll().subscribe(productos => {
        const producto = productos.find(p => p.id === id);
        observer.next(producto);
        observer.complete();
      });
    });
  }
}
