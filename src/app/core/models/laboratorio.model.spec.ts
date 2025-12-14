import { Laboratorio } from './laboratorio.model';

describe('Laboratorio model', () => {
  it('should allow creating a valid Laboratorio object', () => {
    const lab: Laboratorio = {
      idLab: 1,
      nombre: 'Lab Central',
      direccion: 'Av. Siempre Viva 123',
      telefono: '+56912345678',
      activo: true
    };

    expect(lab).toBeTruthy();
    expect(lab.idLab).toBe(1);
    expect(lab.activo).toBeTrue();
  });
});
