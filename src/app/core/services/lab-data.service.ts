import { Injectable } from '@angular/core';
import { Laboratorio } from '../models/laboratorio.model';
import { ResultadoAnalisis } from '../models/resultado-analisis.model';
import { Usuario } from '../models/usuario.model';
import { UsuarioLocalService } from '../services/usuario-local.service'; // ajusta la ruta

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
      nombre: 'Nuevo Lab 2',
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

  constructor(private usuarioLocalService: UsuarioLocalService) {}

  getLaboratorios(): Laboratorio[] {
    return this.laboratorios;
  }

  getResultados(): ResultadoAnalisis[] {
    return this.resultados;
  }

  getUsuarios(): Usuario[] {
    return this.usuarioLocalService.getAll();
  }
}
