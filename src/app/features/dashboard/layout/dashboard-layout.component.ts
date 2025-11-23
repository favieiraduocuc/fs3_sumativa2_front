import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit {

  usuario: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      this.usuario = JSON.parse(stored);
    }
  }

  onLogout(): void {
    // Limpia la sesión
    localStorage.removeItem('usuario');

    // (opcional) limpia otras cosas si después agregas token
    // localStorage.removeItem('token');

    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
