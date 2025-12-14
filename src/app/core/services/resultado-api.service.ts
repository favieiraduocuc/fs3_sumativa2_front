import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Resultado {
  idResultado: number;
  idLab: number;
  idUsuario: number;
  descripcion: string;
  resultado: string;
  fechaAnalisis: string; // o Date si lo parseas
}

@Injectable({ providedIn: 'root' })
export class ResultadoApiService {

  private baseUrl = 'http://localhost:8084'; // ✅ AJUSTA TU PUERTO

  constructor(private http: HttpClient) {}

  getAll(): Observable<Resultado[]> {
    const url = `${this.baseUrl}/api/resultados`;
    return this.http.get<Resultado[]>(url);
  }
}
