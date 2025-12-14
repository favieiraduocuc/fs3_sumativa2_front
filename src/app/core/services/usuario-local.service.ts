import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

const STORAGE_KEY = 'usuarios_fallback';

@Injectable({
  providedIn: 'root',
})
export class UsuarioLocalService {
  constructor() {
    this.initDataIfEmpty();
  }

  /** Datos de demostración para fallback si el backend no responde */
  private initDataIfEmpty(): void {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      const seed: Usuario[] = [
        {
          idUsuario: 99,
          nombre: 'Usuario Local Demo 1',
          email: 'demo1@local.com',
          rol: 'USER',
          activo: true,
          telefono: '+56 9 1111 1111'
        },
        {
          idUsuario: 98,
          nombre: 'Usuario Local Demo 2',
          email: 'demo2@local.com',
          rol: 'ADMIN',
          activo: true,
          telefono: '+56 9 2222 2222'
        }
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    }
  }

  getAll(): Usuario[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) as Usuario[] : [];
  }
}
