import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { ResultadoAnalisisApi } from '../models/resultado-analisis-api.model';
import { ResultadoAnalisis } from '../models/resultado-analisis.model';
import { mapResultadoAnalisis } from '../mappers/resultado-analisis.mapper';

@Injectable({ providedIn: 'root' })
export class ResultadoAnalisisService {

  // AJUSTA este baseUrl al puerto/ruta real del microservicio exam
  private readonly baseUrl = 'http://localhost:8084/api/resultados';

  constructor(private http: HttpClient) {}

  /** Trae resultados por idUsuario (BDD) 
  getByUsuario(idUsuario: number): Observable<ResultadoAnalisis[]> {
    const params = new HttpParams().set('idUsuario', idUsuario);

    // OJO: si tu backend usa otra forma (path), te dejo abajo alternativa
    return this.http.get<ResultadoAnalisisApi[]>(this.baseUrl, { params }).pipe(
      map(list => list.map(mapResultadoAnalisis))
    );
  }
*/
  /** Alternativa si tu backend es /usuario/{idUsuario} */
  getByUsuario(idUsuario: number): Observable<ResultadoAnalisis[]> {
  return this.http
    .get<ResultadoAnalisisApi[]>(`${this.baseUrl}/listar-usuario/${idUsuario}`)
    .pipe(map(list => list.map(mapResultadoAnalisis)));
 }
}