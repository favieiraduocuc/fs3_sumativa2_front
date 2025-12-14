import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/** ====== DTOs ====== */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  idUsuario: number;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  telefono: string;
  token: string; // 👈 IMPORTANTE (JWT)
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Ajusta el puerto si tu MS Users usa otro
  private baseUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/api/auth/login`,
      data
    );
  }
}
