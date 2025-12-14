import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

import { ResultadoFacadeService } from '../../../../core/services/resultado-facade.service';
import { Resultado } from '../../../../core/services/resultado-api.service';

@Component({
  selector: 'app-resultado-list',
  standalone: true,
  imports: [CommonModule, NgForOf, NgIf],
  templateUrl: './resultado-list.component.html',
  styleUrl: './resultado-list.component.scss'
})
export class ResultadoListComponent implements OnInit {

  resultados$!: Observable<Resultado[]>;
  cargando$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private facade: ResultadoFacadeService) {}

  ngOnInit(): void {
    this.resultados$ = this.facade.resultados$;
    this.cargando$ = this.facade.cargando$;
    this.error$ = this.facade.error$;

    this.facade.cargarResultados();
  }
}
