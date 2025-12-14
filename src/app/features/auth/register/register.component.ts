import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioApiService } from '../../../core/services/usuario-api.service'; // 👈 ajusta la ruta si es distinta

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioApiService: UsuarioApiService   // 👈 nuevo
  ) {
    this.registerForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordValidator]],
        repetirPassword: ['', Validators.required],
        rol: ['', Validators.required],
        telefono: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\+[0-9]{11,14}$/) // ej: +56912345678
          ]
        ]
      },
      { validators: this.matchPasswords }
    );
  }

  // Validación personalizada de contraseña
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const rules = [
      /[A-Z]/.test(value),
      /[0-9]/.test(value),
      /[!@#$%^&*()_\-]/.test(value),
      value.length >= 8
    ];

    return rules.every(rule => rule) ? null : { passwordRules: true };
  }

  // Coincidencia de contraseñas
  matchPasswords(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const repeat = group.get('repetirPassword')?.value;

    if (group.get('password')?.errors?.['passwordRules']) return null;
    if (!pass || !repeat) return null;

    return pass === repeat ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    const formValue = this.registerForm.value;

    // 👇 Payload EXACTO que espera tu backend (UsuarioCreateDTO)
    const nuevoUsuario = {
      nombre: formValue.nombre,
      email: formValue.correo,
      password: formValue.password,
      rol: formValue.rol,
      activo: 'S',
      telefono: formValue.telefono
    };

    this.usuarioApiService.crearUsuario(nuevoUsuario).subscribe({
      next: (resp) => {
        this.loading = false;
        this.successMsg = 'Usuario registrado correctamente';
        alert('Usuario registrado correctamente');

        // limpiar formulario
        this.registerForm.reset();

        // opcional: ir a la tabla de admin usuarios
        // this.router.navigate(['/dashboard/admin/usuarios']);
      },
      error: (err) => {
        console.error('Error al crear usuario', err);
        this.loading = false;
        this.errorMsg = err.error?.message || 'Error al registrar usuario';
      }
    });
  }
}
