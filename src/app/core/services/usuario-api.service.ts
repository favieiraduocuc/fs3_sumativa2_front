import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

interface UsuarioApi {
  idUsuario: number;
  nombre: string;
  email: string;
  rol: string;
  activo: string | boolean;
  telefono?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {

  private baseUrl = 'http://localhost:8082';

  // Credenciales temporales para pruebas (Basic Auth)
  private username = 'tonce11@empresa.com';
  private password = 'Secreta#2025';

  constructor(private http: HttpClient) {}

  /** Construye headers con Basic Auth */
  private buildHeaders(): HttpHeaders {
    const basicAuth = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${basicAuth}`,
    });
  }

  /** Normaliza el teléfono devuelto por backend */
  private normalizarTelefono(value?: string): string {
    if (!value) return '';

    // elimina espacios
    const clean = value.replace(/\s+/g, '');

    // Asegurar formato internacional
    if (clean.startsWith('+')) return clean;

    // Si viene sin +
    if (/^[0-9]{11,12}$/.test(clean)) {
      return '+' + clean;
    }

    return clean;
  }

  // -----------------------
  //  🔹 LISTAR USUARIOS
  // -----------------------
  getAll(): Observable<Usuario[]> {
    const url = `${this.baseUrl}/api/usuarios`;

    return this.http.get<UsuarioApi[]>(url, {
      headers: this.buildHeaders()
    }).pipe(
      map(lista =>
        lista.map(u => ({
          idUsuario: u.idUsuario,
          nombre: u.nombre,
          email: u.email,
          rol: u.rol as 'ADMIN' | 'USER' | 'PACIENTE',
          activo: u.activo === 'S' || u.activo === true,
          telefono: this.normalizarTelefono(u.telefono)
        }))
      )
    );
  }

  // -----------------------
  //  🔹 CREAR USUARIO
  // -----------------------
  crearUsuario(data: {
    nombre: string;
    email: string;
    password: string;
    rol: string;
    activo: string;
    telefono?: string;
  }): Observable<Usuario> {
    const url = `${this.baseUrl}/api/usuarios`;
    return this.http.post<Usuario>(url, data, {
      headers: this.buildHeaders()
    });
  }

  // -----------------------
  //  🔹 ACTUALIZAR USUARIO
  // -----------------------
  actualizarUsuario(
    id: number,
    data: {
      nombre?: string;
      email?: string;
      telefono?: string;
      rol?: string;
      password?: string;
      activo?: string;
    }
  ): Observable<Usuario> {

    const url = `${this.baseUrl}/api/usuarios/${id}`;

    // Normalizar teléfono antes de enviar
    if (data.telefono) {
      data.telefono = this.normalizarTelefono(data.telefono);
    }

    return this.http.put<Usuario>(url, data, {
      headers: this.buildHeaders()
    });
  }

  // -----------------------
  //  🔹 DESACTIVAR USUARIO (Soft Delete)
  // -----------------------
  desactivarUsuario(id: number): Observable<Usuario> {
    const url = `${this.baseUrl}/api/usuarios/${id}/desactivar`;

    // cuerpo vacío, solo usamos el id en la URL
    return this.http.patch<Usuario>(url, {}, {
      headers: this.buildHeaders()
    });
  }

  // -----------------------
  //  🔹 ACTIVAR USUARIO 
  // -----------------------
  activarUsuario(id: number): Observable<Usuario> {
  const url = `${this.baseUrl}/api/usuarios/${id}/activar`;
  return this.http.patch<Usuario>(url, {}, {
    headers: this.buildHeaders()
  });
 }

}
