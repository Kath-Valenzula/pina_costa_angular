import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encargo } from '../models/encargo.model';

@Injectable({
  providedIn: 'root'
})
/** Servicio que obtiene encargos desde un JSON. */
export class EncargosService {
  private encargosUrl = 'assets/data/encargos.json';

  constructor(private http: HttpClient) {}

  /** Obtiene todos los encargos. */
  getAll(): Observable<Encargo[]> {
    return this.http.get<Encargo[]>(this.encargosUrl);
  }
}
