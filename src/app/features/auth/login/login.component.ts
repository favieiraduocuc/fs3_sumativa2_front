import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LoginRequest, LoginResponse } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMsg: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMsg = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMsg = 'Debes completar todos los campos obligatorios.';
      return;
    }

    const { email, password } = this.loginForm.value as LoginRequest;
    this.loading = true;

    this.authService.login({ email, password }).subscribe({
      next: (resp: LoginResponse) => {

        // 🔐 TOKEN (para interceptor Bearer)
        if (resp?.token) {
          sessionStorage.setItem('token', resp.token);
        } else {
          console.warn('LoginResponse no trae token. Revisa backend /api/auth/login');
        }

        // 👤 Usuario completo (para UI, navbar, etc.)
        localStorage.setItem('usuario', JSON.stringify(resp));

        // ⭐ CLAVE QUE FALTABA → para "Mis Exámenes"
        if (resp?.idUsuario) {
          localStorage.setItem('idUsuario', String(resp.idUsuario));
        }

        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en login', err);
        this.loading = false;

        if (err.status === 401 || err.status === 400) {
          this.errorMsg = 'Credenciales inválidas. Verifica tu correo y contraseña.';
        } else if (err.status === 0) {
          this.errorMsg = 'No se pudo conectar con el servidor. Verifica que el backend esté arriba.';
        } else {
          this.errorMsg = 'Ocurrió un error al iniciar sesión. Inténtalo nuevamente.';
        }
      }
    });
  }
}
