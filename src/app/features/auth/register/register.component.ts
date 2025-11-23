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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordValidator]],
        repetirPassword: ['', Validators.required],
        rol: ['', Validators.required]
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

    const formValue = this.registerForm.value;

    const nuevoUsuario = {
      idUsuario: Date.now(),
      nombre: formValue.nombre,
      email: formValue.correo,
      rol: formValue.rol,
      activo: true,
      telefono: '',
      password: formValue.password
    };

    // Guardar en la “BD” mock
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

    alert('Usuario registrado correctamente');

    // Opciones:
    // 1) Limpiar el formulario y quedarse en la misma página
    this.registerForm.reset();

    // 2) (Opcional) Navegar de vuelta al dashboard:
    // this.router.navigate(['/dashboard']);
  }
}
