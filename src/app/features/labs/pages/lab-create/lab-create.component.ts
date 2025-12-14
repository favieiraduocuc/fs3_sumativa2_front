import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LaboratorioFacadeService } from '../../../../core/services/laboratorio-facade.service';
import { LaboratorioCreateRequest } from '../../../../core/services/lab-api.service';

@Component({
  selector: 'app-lab-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lab-create.component.html',
  styleUrl: './lab-create.component.scss'
})
export class LabCreateComponent implements OnInit {

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private facade: LaboratorioFacadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading$ = this.facade.cargando$;
    this.error$ = this.facade.error$;

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      telefono: [''],
      activo: [true]
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const dto: LaboratorioCreateRequest = {
      nombre: v.nombre,
      direccion: v.direccion,
      telefono: v.telefono || undefined,
      activo: v.activo ?? true
    };

    this.facade.crearLaboratorio(dto);

    this.router.navigate(['/dashboard/laboratorios']);
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/laboratorios']);
  }
}
