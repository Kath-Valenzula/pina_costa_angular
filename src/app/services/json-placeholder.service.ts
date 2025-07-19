import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
/**
 * @description Servicio para interactuar con jsonplaceholder.typicode.com.
 */
export class JsonPlaceholderService {
  /** Endpoint base de la API */
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  /**
   * @description Crea una instancia del servicio.
   * @param http Cliente HTTP para enviar solicitudes
   * @returns void
   */
  constructor(private http: HttpClient) {}

  /**
   * @description Obtiene todas las publicaciones.
   * @returns Observable con la lista de posts
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  /**
   * @description Crea una nueva publicación.
   * @param post Post a agregar
   * @returns Observable con el post creado
   */
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }

  /**
   * @description Actualiza una publicación existente.
   * @param id Identificador de la publicación
   * @param post Datos a actualizar
   * @returns Observable con el post actualizado
   */
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post);
  }

  /**
   * @description Elimina una publicación por id.
   * @param id Identificador de la publicación
   * @returns Observable vacío cuando finaliza
   */
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}