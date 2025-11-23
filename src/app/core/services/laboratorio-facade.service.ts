import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Laboratorio } from '../models/laboratorio.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioFacadeService {

  private readonly _laboratorios = new BehaviorSubject<Laboratorio[]>([]);
  readonly laboratorios$ = this._laboratorios.asObservable();

  constructor() {}

  cargarLaboratorios(): void {
    // Lista en memoria -> simula backend
    const data: Laboratorio[] = [
      { idLab: 1, nombre: 'Lab Vida', direccion: 'Av. Central 123', telefono: '22223333', activo: true },
      { idLab: 2, nombre: 'BioLab', direccion: 'Los Robles 910', telefono: '99912233', activo: false },
      { idLab: 3, nombre: 'Sanitas', direccion: 'Calle Norte 77', telefono: '88211993', activo: true }
    ];

    // Se aplica lógica de negocio:
    const transformada = data.map(lab => ({
      ...lab,
      nombre: lab.nombre.toUpperCase() // ejemplo de regla de negocio
    }));

    this._laboratorios.next(transformada);
  }
}
