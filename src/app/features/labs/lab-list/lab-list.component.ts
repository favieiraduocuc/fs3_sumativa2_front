import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

import { LaboratorioFacadeService } from '../../../core/services/laboratorio-facade.service';
import { LabApiService } from '../../../core/services/lab-api.service'; // ✅ NUEVO
import { Laboratorio } from '../../../core/models/laboratorio.model';

@Component({
  selector: 'app-lab-list',
  standalone: true,
  imports: [CommonModule, NgClass, NgForOf, RouterLink],
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.scss']
})
export class LabListComponent implements OnInit {

  laboratorios$!: Observable<Laboratorio[]>;
  cargando$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(
    private laboratorioFacade: LaboratorioFacadeService,
    private labApiService: LabApiService // ✅ NUEVO
  ) {}

  ngOnInit(): void {
    // 🔗 conectar streams del facade
    this.laboratorios$ = this.laboratorioFacade.laboratorios$;
    this.cargando$ = this.laboratorioFacade.cargando$;
    this.error$ = this.laboratorioFacade.error$;

    // cargar datos
    this.laboratorioFacade.cargarLaboratorios();
  }

  // ✅ Soft delete: desactivar
  desactivar(lab: Laboratorio): void {
    if (!lab.idLab) return;

    const confirmar = confirm(`¿Seguro que quieres desactivar el laboratorio "${lab.nombre}"?`);
    if (!confirmar) return;

    this.labApiService.desactivarLab(lab.idLab).subscribe({
      next: () => {
        lab.activo = false;
        alert('Laboratorio desactivado correctamente');
      },
      error: (err) => {
        console.error('Error al desactivar laboratorio', err);
        alert('No se pudo desactivar el laboratorio');
      }
    });
  }

  // ✅ Activar
  activar(lab: Laboratorio): void {
    if (!lab.idLab) return;

    const confirmar = confirm(`¿Deseas activar nuevamente el laboratorio "${lab.nombre}"?`);
    if (!confirmar) return;

    this.labApiService.activarLab(lab.idLab).subscribe({
      next: () => {
        lab.activo = true;
        alert('Laboratorio activado correctamente');
      },
      error: (err) => {
        console.error('Error al activar laboratorio', err);
        alert('No se pudo activar el laboratorio');
      }
    });
  }
}
