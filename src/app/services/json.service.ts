import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encargo } from '../models/encargo.model';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
/**
 * Servicio que consume los archivos JSON publicados en GitHub Pages.
 * Incluye operaciones CRUD que solo funcionarán si el servidor
 * permite peticiones de escritura.
 */
export class JsonService {
  private encargosUrl =
    'https://kath-valenzula.github.io/my-json-repo-pina-costa/encargos.json';
  private productosUrl =
    'https://kath-valenzula.github.io/my-json-repo-pina-costa/productos.json';

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
