import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  usuario: Usuario | null = null;

  ngOnInit(): void {
    const stored = localStorage.getItem('usuario');
    this.usuario = stored ? JSON.parse(stored) : null;
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.usuario = null;
    window.location.href = '/login';
  }
}
