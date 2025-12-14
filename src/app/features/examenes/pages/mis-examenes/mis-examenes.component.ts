import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadoAnalisisService } from '../../../../core/services/resultado-analisis.service';
import { ResultadoAnalisis } from '../../../../core/models/resultado-analisis.model';

@Component({
  selector: 'app-mis-examenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-examenes.component.html',
})
export class MisExamenesComponent implements OnInit {

  private resultadoSrv = inject(ResultadoAnalisisService);

  examenes: ResultadoAnalisis[] = [];
  loading = false;
  errorMsg = '';

  ngOnInit(): void {
    this.loading = true;
    this.errorMsg = '';
    this.examenes = [];

    // 1) Verificar idUsuario en localStorage
    const idUsuarioStr = localStorage.getItem('idUsuario'); // AJUSTA key si es otra
    const idUsuario = idUsuarioStr ? Number(idUsuarioStr) : NaN;

    console.log('[MisExamenes] idUsuarioStr:', idUsuarioStr);
    console.log('[MisExamenes] idUsuario:', idUsuario);

    if (!idUsuarioStr || Number.isNaN(idUsuario) || idUsuario <= 0) {
      this.errorMsg = 'No se encontró el usuario logeado (idUsuario) en localStorage.';
      this.loading = false;
      return;
    }

    // 2) Llamar backend
    this.resultadoSrv.getByUsuario(idUsuario).subscribe({
      next: (data) => {
        console.log('[MisExamenes] data:', data);
        this.examenes = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('[MisExamenes] error:', err);
        // Si el backend manda mensaje más específico, lo mostramos
        this.errorMsg = err?.error?.message || `Error cargando exámenes (status ${err?.status ?? '??'}).`;
        this.loading = false;
      }
    });
  }
}
