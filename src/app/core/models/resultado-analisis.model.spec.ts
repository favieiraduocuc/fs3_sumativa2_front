import { ResultadoAnalisis } from './resultado-analisis.model';

describe('ResultadoAnalisis model', () => {
  it('should allow creating a valid ResultadoAnalisis object', () => {
    const resultado: ResultadoAnalisis = {
      idResultado: 10,
      paciente: 'Usuario #1',
      laboratorio: 'Lab #2',
      tipo: 'Examen sangre',
      fechaResultado: '2025-12-13 10:00',
      estado: 'PROCESADO',
      idUsuario: 1,
      idLab: 2
    };

    expect(resultado).toBeTruthy();
    expect(resultado.estado).toBe('PROCESADO');
  });
});
