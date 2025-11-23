import { Injectable } from '@angular/core';
import { Laboratorio } from '../models/laboratorio.model';
import { ResultadoAnalisis } from '../models/resultado-analisis.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LabDataService {

  private laboratorios: Laboratorio[] = [
    {
      idLab: 1,
      nombre: 'Lab Ajustado',
      direccion: 'Av. Principal 123',
      telefono: '+56 2 2222 1111',
      activo: true
    },
    {
      idLab: 2,
      nombre: 'BioLab Norte',
      direccion: 'Calle Secundaria 456',
      telefono: '+56 2 3333 2222',
      activo: true
    },
    {
      idLab: 3,
      nombre: 'Nuevo Lab',
      direccion: 'Calle 123',
      telefono: '+56 2 4444 5555',
      activo: true
    }
  ];

  private resultados: ResultadoAnalisis[] = [
    {
      idResultado: 1,
      paciente: 'Juan Pérez',
      laboratorio: 'Lab Ajustado',
      tipo: 'Hemograma Completo',
      fechaResultado: '2025-11-20',
      estado: 'ENTREGADO'
    },
    {
      idResultado: 2,
      paciente: 'María López',
      laboratorio: 'BioLab Norte',
      tipo: 'Perfil Lipídico',
      fechaResultado: '2025-11-21',
      estado: 'PROCESADO'
    },
    {
      idResultado: 3,
      paciente: 'Carlos Díaz',
      laboratorio: 'Nuevo Lab',
      tipo: 'Examen de Glucosa',
      fechaResultado: '2025-11-22',
      estado: 'PENDIENTE'
    }
  ];

  private usuarios: Usuario[] = [
    {
      idUsuario: 2,
      nombre: 'Juan Perez',
      email: 'juan@empresa.com',
      rol: 'PACIENTE',
      activo: true,
      // @ts-ignore si tu interfaz no tiene teléfono todavía
      telefono: '987654321'
    },
    {
      idUsuario: 12,
      nombre: 'Pedro Silva',
      email: 'pedro.admin@empresa.com',
      rol: 'ADMIN',
      activo: true,
      // @ts-ignore
      telefono: '987654320'
    },
    {
      idUsuario: 13,
      nombre: 'Luis Martínez',
      email: 'luis.user@empresa.com',
      rol: 'USER',
      activo: true,
      // @ts-ignore
      telefono: '987654319'
    }
  ];

  constructor() {}

  getLaboratorios(): Laboratorio[] {
    return this.laboratorios;
  }

  getResultados(): ResultadoAnalisis[] {
    return this.resultados;
  }

  getUsuarios(): Usuario[] {
    //  Aquí mezclamos los “mock” + los registrados en el formulario
    const guardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return [...this.usuarios, ...guardados];
  }
}
