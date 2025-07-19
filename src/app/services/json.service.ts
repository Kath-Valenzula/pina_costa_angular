import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encargo } from '../models/encargo.model';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
/**
 * @description Servicio para interactuar con los archivos JSON de la aplicación.
 * Las rutas apuntan a la carpeta `assets`, de modo que estén
 * disponibles incluso sin un backend externo. Las operaciones de
 * escritura (POST/PUT/DELETE) solo funcionarán si el servidor
 * responde a dichas peticiones.
 */
export class JsonService {
   /** Ruta al archivo de encargos */
  private encargosUrl = 'assets/data/encargos.json';
  /** Ruta al archivo de productos */
  private productosUrl = 'assets/data/productos.json';

  /**
   * @description Inyecta HttpClient para realizar las peticiones.
   * @param http Cliente HTTP de Angular
   * @returns void
   */
  constructor(private http: HttpClient) {}

  /**
   * @description Obtiene la lista completa de encargos.
   * @returns Observable con el arreglo de encargos
   */
  getEncargos(): Observable<Encargo[]> {
    return this.http.get<Encargo[]>(this.encargosUrl);
  }

  /**
   * @description Crea un nuevo encargo (requiere API con permisos de escritura).
   * @param encargo Encargo a agregar
   * @returns Observable con el encargo creado
   */
  addEncargo(encargo: Encargo): Observable<Encargo> {
    return this.http.post<Encargo>(this.encargosUrl, encargo);
  }

  /**
   * @description Actualiza un encargo existente por su id.
   * @param encargo Encargo con datos actualizados
   * @returns Observable con el encargo actualizado
   */
  updateEncargo(encargo: Encargo): Observable<Encargo> {
    return this.http.put<Encargo>(`${this.encargosUrl}/${encargo.id}`, encargo);
  }

  /**
   * @description Elimina un encargo por su id.
   * @param id Identificador del encargo
   * @returns Observable vacío cuando finaliza
   */
  deleteEncargo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.encargosUrl}/${id}`);
  }

  /**
   * @description Obtiene la lista completa de productos.
   * @returns Observable con el arreglo de productos
   */
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  /**
   * @description Crea un nuevo producto (requiere API con permisos de escritura).
   * @param producto Producto a agregar
   * @returns Observable con el producto creado
   */
  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.productosUrl, producto);
  }

  /**
   * @description Actualiza un producto existente por su id.
   * @param producto Producto con datos actualizados
   * @returns Observable con el producto actualizado
   */
  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.productosUrl}/${producto.id}`, producto);
  }

  /**
   * @description Elimina un producto por su id.
   * @param id Identificador del producto
   * @returns Observable vacío cuando finaliza
   */
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productosUrl}/${id}`);
  }
}
