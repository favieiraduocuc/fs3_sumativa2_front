import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Resultado, ResultadoApiService } from './resultado-api.service';

@Injectable({ providedIn: 'root' })
export class ResultadoFacadeService {

  private resultadosSubject = new BehaviorSubject<Resultado[]>([]);
  resultados$: Observable<Resultado[]> = this.resultadosSubject.asObservable();

  private cargandoSubject = new BehaviorSubject<boolean>(false);
  cargando$: Observable<boolean> = this.cargandoSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor(private api: ResultadoApiService) {}

  cargarResultados(): void {
    this.cargandoSubject.next(true);
    this.errorSubject.next(null);

    this.api.getAll()
      .pipe(finalize(() => this.cargandoSubject.next(false)))
      .subscribe({
        next: (data) => this.resultadosSubject.next(data),
        error: (err) => {
          console.error('Error resultados', err);
          this.errorSubject.next('No se pudo cargar resultados (API).');
        }
      });
  }
}
