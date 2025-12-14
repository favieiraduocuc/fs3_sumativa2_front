import { ResultadoAnalisisApi } from './resultado-analisis-api.model';

describe('ResultadoAnalisisApi model', () => {
  it('should allow creating a valid API response object', () => {
    const api: ResultadoAnalisisApi = {
      idResultado: 20,
      idUsuario: 3,
      idLab: 1,
      descripcion: 'PCR',
      resultado: 'Negativo',
      fechaAnalisis: '2025-11-02T02:31:34'
    };

    expect(api).toBeTruthy();
    expect(api.idUsuario).toBe(3);
  });
});
