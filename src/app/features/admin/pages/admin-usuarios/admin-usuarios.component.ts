import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../../core/models/usuario.model';
import { UsuarioApiService } from '../../../../core/services/usuario-api.service';
import { UsuarioLocalService } from '../../../../core/services/usuario-local.service';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando = false;
  error?: string;

  // 🔹 Estado del modal
  mostrarModal = false;
  usuarioSeleccionado: Usuario | null = null;
  motivo = '';
  solicitante = '';
  jefatura = 'gerencia-ti';

  constructor(
    private usuarioApiService: UsuarioApiService,
    private usuarioLocalService: UsuarioLocalService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.error = undefined;

    this.usuarioApiService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios desde API', err);
        this.error = 'No se pudo cargar la lista desde el servidor. Usando datos locales.';
        // 🔁 Fallback a localStorage
        this.usuarios = this.usuarioLocalService.getAll();
        this.cargando = false;
      }
    });
  }

  // 🔹 Desactivar usuario (soft delete)
  desactivar(u: Usuario): void {
    if (!u.idUsuario) {
      console.warn('Usuario sin id, no se puede desactivar');
      return;
    }

    const confirmar = confirm(`¿Seguro que quieres desactivar a ${u.nombre}?`);
    if (!confirmar) return;

    this.usuarioApiService.desactivarUsuario(u.idUsuario).subscribe({
      next: () => {
        u.activo = false;
        alert('Usuario desactivado correctamente');
      },
      error: (err) => {
        console.error('Error al desactivar usuario', err);
        alert('No se pudo desactivar el usuario');
      }
    });
  }

  // 🔹 Activar usuario
  activar(u: Usuario): void {
    if (!u.idUsuario) {
      console.warn('Usuario sin ID, no se puede activar');
      return;
    }

    const confirmar = confirm(`¿Deseas activar nuevamente a ${u.nombre}?`);
    if (!confirmar) return;

    this.usuarioApiService.activarUsuario(u.idUsuario).subscribe({
      next: () => {
        u.activo = true;
        alert('Usuario activado correctamente');
      },
      error: (err) => {
        console.error('Error al activar usuario', err);
        alert('No se pudo activar el usuario');
      }
    });
  }

  // 🔹 Abrir modal de solicitud de eliminación
  abrirSolicitudEliminacion(u: Usuario): void {
    this.usuarioSeleccionado = u;
    this.motivo = '';
    this.solicitante = '';
    this.jefatura = 'gerencia-ti';
    this.mostrarModal = true;
  }

  // 🔹 Cerrar modal
  cerrarModal(): void {
    this.mostrarModal = false;
  }

  // 🔹 Enviar solicitud (por ahora solo simulamos)
  enviarSolicitud(): void {
    if (!this.usuarioSeleccionado) return;

    if (!this.motivo || !this.solicitante) {
      alert('Debes indicar motivo y quién solicita.');
      return;
    }

    console.log('Solicitud de eliminación enviada:', {
      usuario: this.usuarioSeleccionado,
      motivo: this.motivo,
      solicitante: this.solicitante,
      jefatura: this.jefatura
    });

    alert('Solicitud enviada a jefatura para revisión.');
    this.cerrarModal();
  }
}
