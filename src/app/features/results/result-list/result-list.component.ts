import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabDataService } from '../../../core/services/lab-data.service';
import { ResultadoAnalisis } from '../../../core/models/resultado-analisis.model';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-result-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-list.component.html',
  styleUrl: './result-list.component.scss'
})
export class ResultListComponent implements OnInit {

  resultados: ResultadoAnalisis[] = [];
  usuario: Usuario | null = null;

  constructor(private labService: LabDataService) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      this.usuario = JSON.parse(stored) as Usuario;
    }

    const all = this.labService.getResultados();

    if (this.usuario?.rol === 'PACIENTE') {
      // PACIENTE: solo sus resultados (por nombre)
      this.resultados = all.filter(
        r => r.paciente.toLowerCase() === this.usuario!.nombre.toLowerCase()
      );
    } else {
      // ADMIN y USER: ven todos
      this.resultados = all;
    }
  }
}
