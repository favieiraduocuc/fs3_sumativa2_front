import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';   // ⬅️ agregamos RouterLink
import { LabDataService } from '../../../core/services/lab-data.service';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // ⬅️ agregamos RouterLink acá
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private labData: LabDataService
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
      return;
    }

    const { email } = this.loginForm.value;

    const usuarios: Usuario[] = this.labData.getUsuarios();
    const user = usuarios.find(
      u => u.email.toLowerCase() === String(email).toLowerCase()
    );

    if (!user) {
      this.errorMsg = 'Credenciales inválidas. Verifica tu correo.';
      return;
    }

    localStorage.setItem('usuario', JSON.stringify(user));
    this.router.navigate(['/dashboard']);
  }
}
