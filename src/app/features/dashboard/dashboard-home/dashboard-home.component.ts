import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabDataService } from '../../../core/services/lab-data.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent implements OnInit {

  usuario: any = null;

  totalLabs = 0;
  totalPacientes = 0;
  totalResultados = 0;

  pendientes = 0;
  procesados = 0;
  entregados = 0;

  constructor(private labService: LabDataService) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      this.usuario = JSON.parse(stored);
    }

    const labs = this.labService.getLaboratorios();
    const resultados = this.labService.getResultados();
    const usuarios = this.labService.getUsuarios();

    this.totalLabs = labs.length;
    this.totalResultados = resultados.length;
    this.totalPacientes = usuarios.filter(u => u.rol === 'PACIENTE').length;

    this.pendientes = resultados.filter(r => r.estado === 'PENDIENTE').length;
    this.procesados = resultados.filter(r => r.estado === 'PROCESADO').length;
    this.entregados = resultados.filter(r => r.estado === 'ENTREGADO').length;
  }
    get rolDescripcion(): string {
    if (!this.usuario) return '';
    switch (this.usuario.rol) {
      case 'ADMIN': return 'Administrador del Sistema';
      case 'PACIENTE': return 'Paciente';
      case 'USER': return 'Usuario Estándar';
      default: return 'Usuario';
    }
  }

}
