import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Laboratorio } from '../models/laboratorio.model';

interface LaboratorioApi {
  idLab: number;
  nombre: string;
  direccion: string;
  telefono?: string;
  activo: string | boolean;
}

export interface LaboratorioCreateRequest {
  nombre: string;
  direccion: string;
  telefono?: string;
  activo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LabApiService {

  private baseUrl = 'http://localhost:8083';

  // mismas credenciales que para UsuarioApiService
  private username = 'tonce11@empresa.com';
  private password = 'Secreta#2025';

  constructor(private http: HttpClient) {}

  private buildHeaders(): HttpHeaders {
    const basicAuth = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${basicAuth}`,
    });
  }

  private normalizarTelefono(value?: string): string {
    if (!value) return '';
    const clean = value.replace(/\s+/g, '');
    if (clean.startsWith('+')) return clean;
    if (/^[0-9]{9,12}$/.test(clean)) return '+' + clean;
    return clean;
  }

  // 🔹 LISTAR LABORATORIOS DESDE BACKEND
  getAll(): Observable<Laboratorio[]> {
  const url = `${this.baseUrl}/api/labs`;

  return this.http.get<LaboratorioApi[]>(url, {
    headers: this.buildHeaders()
  }).pipe(
    map(lista =>
      lista.map(l => ({
        idLab: l.idLab,
        nombre: l.nombre,
        direccion: l.direccion,
        telefono: this.normalizarTelefono(l.telefono),
        activo: l.activo === 'S' || l.activo === true
      }))
    )
  );
}
create(dto: LaboratorioCreateRequest): Observable<Laboratorio> {
  const url = `${this.baseUrl}/api/labs`;

  const payload: any = {
    nombre: dto.nombre,
    direccion: dto.direccion,
    telefono: dto.telefono ?? null,
    activo: dto.activo ? 'S' : 'N'   // ✅ clave
  };

  return this.http.post<LaboratorioApi>(url, payload).pipe(
    map(l => ({
      idLab: l.idLab,
      nombre: l.nombre,
      direccion: l.direccion,
      telefono: this.normalizarTelefono(l.telefono),
      activo: l.activo === 'S' || l.activo === true
    }))
  );
}
desactivarLab(idLab: number) {
  const url = `${this.baseUrl}/api/labs/${idLab}/desactivar`;
  return this.http.put<void>(url, {});
}

activarLab(idLab: number) {
  const url = `${this.baseUrl}/api/labs/${idLab}/activar`;
  return this.http.put<void>(url, {});
}

}
