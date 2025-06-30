// Obtiene productos desde un archivo JSON.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productosUrl = 'assets/data/productos.json';

  // HttpClient para leer el JSON
  constructor(private http: HttpClient) {}

  // Devuelve todos los productos
  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  // Busca un producto por su id
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
