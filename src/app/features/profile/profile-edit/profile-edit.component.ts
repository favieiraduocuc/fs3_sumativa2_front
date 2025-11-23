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

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
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

    // Si no desea cambiar contraseña
    if (!nueva && !repetir) return null;

    // Si nueva contraseña aún tiene errores de reglas, esperar
    if (group.get('nuevaPassword')?.errors?.['reglasPassword']) return null;

    // Si quiere cambiarla, debe ingresar password actual
    if (!actual) return { faltaPasswordActual: true };

    // Mismatch entre nueva y repetida
    if (nueva !== repetir) return { mismatch: true };

    return null;
  }

  onSubmit(): void {
    this.successMsg = null;

    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    const formValue = this.perfilForm.value;

    if (this.usuario) {
      this.usuario = {
        ...this.usuario,
        nombre: formValue.nombre,
        email: formValue.correo,
        telefono: formValue.telefono
      };

      // Si cambió la contraseña, guardarla
      if (formValue.nuevaPassword) {
        (this.usuario as any).password = formValue.nuevaPassword;
      }

      localStorage.setItem('usuario', JSON.stringify(this.usuario));
    }

    // Limpiar campos de cambio de contraseña
    this.perfilForm.get('passwordActual')?.reset();
    this.perfilForm.get('nuevaPassword')?.reset();
    this.perfilForm.get('repetirPassword')?.reset();

    this.successMsg = 'Tu perfil se actualizó correctamente.';
  }

  get f() {
    return this.perfilForm.controls;
  }
}
