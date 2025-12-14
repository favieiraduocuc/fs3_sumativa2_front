import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { Laboratorio } from '../models/laboratorio.model';
import { LabApiService, LaboratorioCreateRequest } from './lab-api.service';
import { LabDataService } from './lab-data.service';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioFacadeService {

  private laboratoriosSubject = new BehaviorSubject<Laboratorio[]>([]);
  laboratorios$: Observable<Laboratorio[]> = this.laboratoriosSubject.asObservable();

  private cargandoSubject = new BehaviorSubject<boolean>(false);
  cargando$: Observable<boolean> = this.cargandoSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor(
    private labApiService: LabApiService,
    private labDataService: LabDataService // fallback (mock) si falla el backend
  ) {}

  cargarLaboratorios(): void {
    this.cargandoSubject.next(true);
    this.errorSubject.next(null);

    this.labApiService.getAll().subscribe({
      next: (data) => {
        this.laboratoriosSubject.next(data);
        this.cargandoSubject.next(false);
      },
      error: (err) => {
        console.error('Error al obtener laboratorios desde API', err);

        // fallback mock
        this.errorSubject.next('No se pudo cargar desde el servidor. Mostrando datos locales.');
        this.laboratoriosSubject.next(this.labDataService.getLaboratorios());

        this.cargandoSubject.next(false);
      }
    });
  }

  // ✅ NUEVO: Crear laboratorio (POST)
  crearLaboratorio(dto: LaboratorioCreateRequest): void {
    this.cargandoSubject.next(true);
    this.errorSubject.next(null);

    this.labApiService.create(dto)
      .pipe(finalize(() => this.cargandoSubject.next(false)))
      .subscribe({
        next: (nuevo) => {
          const actual = this.laboratoriosSubject.value ?? [];
          this.laboratoriosSubject.next([nuevo, ...actual]);
        },
        error: (err) => {
          console.error('Error creando laboratorio', err);
          this.errorSubject.next('No se pudo crear el laboratorio.');
        }
      });
  }
}
