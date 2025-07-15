import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encargo } from '../models/encargo.model';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
/**
 * Servicio para interactuar con los archivos JSON de la aplicación.
 * Las rutas apuntan a la carpeta `assets`, de modo que estén
 * disponibles incluso sin un backend externo. Las operaciones de
 * escritura (POST/PUT/DELETE) solo funcionarán si el servidor
 * responde a dichas peticiones.
 */
export class JsonService {
  /**
   * Rutas a los archivos JSON. Se sirven desde `assets` para evitar
   * dependencias externas que puedan producir errores 404.
   */
  private encargosUrl = 'assets/data/encargos.json';
  private productosUrl = 'assets/data/productos.json';

  constructor(private http: HttpClient) {}

  /** Obtiene la lista completa de encargos. */
  getEncargos(): Observable<Encargo[]> {
    return this.http.get<Encargo[]>(this.encargosUrl);
  }

  /** Crea un nuevo encargo (requiere API con permisos de escritura). */
  addEncargo(encargo: Encargo): Observable<Encargo> {
    return this.http.post<Encargo>(this.encargosUrl, encargo);
  }

  /** Actualiza un encargo existente por su id. */
  updateEncargo(encargo: Encargo): Observable<Encargo> {
    return this.http.put<Encargo>(`${this.encargosUrl}/${encargo.id}`, encargo);
  }

  /** Elimina un encargo por su id. */
  deleteEncargo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.encargosUrl}/${id}`);
  }

  /** Obtiene la lista completa de productos. */
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  /** Crea un nuevo producto (requiere API con permisos de escritura). */
  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.productosUrl, producto);
  }

  /** Actualiza un producto existente por su id. */
  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.productosUrl}/${producto.id}`, producto);
  }

  /** Elimina un producto por su id. */
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productosUrl}/${id}`);
  }
}
