import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
/** Servicio para interactuar con jsonplaceholder.typicode.com. */
export class JsonPlaceholderService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  /** Obtiene todas las publicaciones. */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  /** Crea una nueva publicación. */
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }

  /** Actualiza una publicación existente. */
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post);
  }

  /** Elimina una publicación por id. */
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}