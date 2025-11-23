import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import { LaboratorioFacadeService } from '../../../core/services/laboratorio-facade.service';
import { Laboratorio } from '../../../core/models/laboratorio.model';

@Component({
  selector: 'app-lab-list',
  standalone: true,
  imports: [CommonModule, NgClass, NgForOf],
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.scss']
})
export class LabListComponent implements OnInit {
  laboratorios$!: Observable<Laboratorio[]>;

  constructor(private laboratorioFacade: LaboratorioFacadeService) {}

  ngOnInit(): void {
    this.laboratorios$ = this.laboratorioFacade.laboratorios$;
    this.laboratorioFacade.cargarLaboratorios();
  }
}
