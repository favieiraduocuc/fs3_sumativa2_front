export interface Usuario {
  idUsuario: number;
  nombre: string;
  email: string;
  rol: 'USER' | 'ADMIN' | 'PACIENTE';
  activo: boolean;
  telefono?: string;
  password?: string;
}
