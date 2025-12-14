import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { Usuario } from '../../../core/models/usuario.model';
import { UsuarioApiService } from '../../../core/services/usuario-api.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent implements OnInit {

  perfilForm: FormGroup;
  usuario: Usuario | null = null;
  successMsg: string | null = null;
  errorMsg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioApi: UsuarioApiService
  ) {
    this.perfilForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        correo: ['', [Validators.required, Validators.email]],
        // si quieres estrictamente 12 dígitos, cambia el patrón
        telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{9,12}$/)]],
        passwordActual: [''],
        nuevaPassword: ['', this.reglasPassword.bind(this)],
        repetirPassword: ['']
      },
      { validators: this.validarCambioPassword }
    );
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      this.usuario = JSON.parse(stored) as Usuario;
      this.perfilForm.patchValue({
        nombre: this.usuario.nombre,
        correo: this.usuario.email,
        telefono: (this.usuario as any).telefono ?? ''
      });
    }
  }

  // Validación de reglas de contraseña
  reglasPassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null;

    const reglas = [
      /[A-Z]/.test(value),
      /[0-9]/.test(value),
      /[!@#$%^&*()_\-]/.test(value),
      value.length >= 8
    ];

    return reglas.every(r => r)
      ? null
      : { reglasPassword: true };
  }

  // Validación general del formulario
  validarCambioPassword(group: AbstractControl): ValidationErrors | null {
    const actual = group.get('passwordActual')?.value;
    const nueva = group.get('nuevaPassword')?.value;
    const repetir = group.get('repetirPassword')?.value;

    if (!nueva && !repetir) return null;

    if (group.get('nuevaPassword')?.errors?.['reglasPassword']) return null;

    if (!actual) return { faltaPasswordActual: true };

    if (nueva !== repetir) return { mismatch: true };

    return null;
  }

  onSubmit(): void {
    this.successMsg = null;
    this.errorMsg = null;

    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    if (!this.usuario || !this.usuario.idUsuario) {
      this.errorMsg = 'No se encontró el usuario logueado en la sesión.';
      return;
    }

    const formValue = this.perfilForm.value;

    // Payload para el backend
    const payload: any = {
      nombre: formValue.nombre,
      email: formValue.correo,
      telefono: formValue.telefono
    };

    if (formValue.nuevaPassword) {
      payload.password = formValue.nuevaPassword;
    }

    this.usuarioApi.actualizarUsuario(this.usuario.idUsuario, payload)
      .subscribe({
        next: (actualizado) => {
          // Actualizamos el usuario en memoria y en localStorage
          this.usuario = {
            ...this.usuario!,
            nombre: actualizado.nombre,
            email: actualizado.email,
            telefono: (actualizado as any).telefono
          };

          localStorage.setItem('usuario', JSON.stringify(this.usuario));

          // Limpiar campos de password
          this.perfilForm.get('passwordActual')?.reset();
          this.perfilForm.get('nuevaPassword')?.reset();
          this.perfilForm.get('repetirPassword')?.reset();

          this.successMsg = 'Tu perfil se actualizó correctamente en el servidor.';
        },
        error: (err) => {
          console.error('Error al actualizar perfil', err);
          this.errorMsg = 'Ocurrió un error al guardar los cambios en el servidor.';
        }
      });
  }

  get f() {
    return this.perfilForm.controls;
  }
}
