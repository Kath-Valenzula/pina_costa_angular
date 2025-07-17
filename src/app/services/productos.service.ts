import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

/**
 * @description Servicio que gestiona la obtención de productos desde un archivo JSON.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /**
   * @description Ruta relativa al archivo de productos almacenado localmente.
   */
  private productosUrl = 'assets/data/productos.json';

  /**
   * @description Constructor del servicio. Inyecta HttpClient para realizar peticiones HTTP.
   * @param http Cliente HTTP proporcionado por Angular para consumo de datos remotos o locales.
   */
  constructor(private http: HttpClient) {}

  /**
   * @description Devuelve todos los productos disponibles desde el archivo JSON.
   * @returns Observable que emite un array de productos.
   */
  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  /**
   * @description Busca un producto específico por su identificador.
   * @param id Identificador único del producto a buscar.
   * @returns Observable que emite el producto encontrado o undefined si no existe.
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