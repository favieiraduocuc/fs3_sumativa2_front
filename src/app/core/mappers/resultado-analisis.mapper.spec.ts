import { mapResultadoAnalisis } from './resultado-analisis.mapper';
import { ResultadoAnalisisApi } from '../models/resultado-analisis-api.model';

describe('mapResultadoAnalisis', () => {

  it('should map correctly when fechaResultado exists', () => {
    const api: ResultadoAnalisisApi = {
      idResultado: 1,
      idUsuario: 10,
      idLab: 2,
      descripcion: 'Examen sangre',
      resultado: 'OK',
      fechaResultado: '2025-12-13T10:00:00'
    };

    const result = mapResultadoAnalisis(api);

    expect(result.idResultado).toBe(1);
    expect(result.paciente).toBe('Usuario #10');
    expect(result.laboratorio).toBe('Lab #2');
    expect(result.tipo).toBe('Examen sangre');
    expect(result.estado).toBe('PROCESADO');
    expect(result.fechaResultado).toContain('2025');
  });

  it('should fallback to fechaAnalisis when fechaResultado is null', () => {
    const api: ResultadoAnalisisApi = {
      idResultado: 2,
      idUsuario: 20,
      idLab: 3,
      descripcion: 'PCR',
      resultado: 'Positivo',
      fechaResultado: null as any,
      fechaAnalisis: '2025-11-02T02:31:34'
    };

    const result = mapResultadoAnalisis(api);

    expect(result.fechaResultado).toContain('2025');
    expect(result.estado).toBe('PROCESADO');
  });

  it('should return "Sin fecha" when no dates exist', () => {
    const api: ResultadoAnalisisApi = {
      idResultado: 3,
      idUsuario: 30,
      idLab: 4,
      descripcion: 'Examen simple',
      resultado: 'Resultado'
    };

    const result = mapResultadoAnalisis(api);

    expect(result.fechaResultado).toBe('Sin fecha');
  });

  it('should set estado as PENDIENTE when resultado is empty', () => {
    const api: ResultadoAnalisisApi = {
      idResultado: 4,
      idUsuario: 40,
      idLab: 5,
      descripcion: 'Orina',
      resultado: '   ', // vacío
      fechaAnalisis: '2025-12-01T12:00:00'
    };

    const result = mapResultadoAnalisis(api);

    expect(result.estado).toBe('PENDIENTE');
  });

  it('should use dash when descripcion is missing', () => {
    const api: ResultadoAnalisisApi = {
      idResultado: 5,
      idUsuario: 50,
      idLab: 6,
      resultado: 'OK',
      fechaAnalisis: '2025-12-01T12:00:00'
    };

    const result = mapResultadoAnalisis(api);

    expect(result.tipo).toBe('—');
  });
});
