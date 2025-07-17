import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encargo } from '../models/encargo.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio que obtiene encargos desde un archivo JSON local.
 */
export class EncargosService {
  /** Ruta al archivo de encargos */
  private encargosUrl = 'assets/data/encargos.json';

  /**
   * Crea una instancia de EncargosService.
   * @param http Cliente HTTP utilizado para las peticiones
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los encargos almacenados.
   * @returns Observable con la lista de encargos
   */

  getAll(): Observable<Encargo[]> {
    return this.http.get<Encargo[]>(this.encargosUrl);
  }
}
