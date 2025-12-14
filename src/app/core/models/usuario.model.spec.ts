import { Usuario } from './usuario.model';

describe('Usuario model', () => {
  it('should allow creating a valid Usuario object', () => {
    const usuario: Usuario = {
      idUsuario: 1,
      nombre: 'Juan Pérez',
      email: 'juan@correo.cl',
      rol: 'USER',
      activo: true,
      telefono: '+56999888777'
    };

    expect(usuario).toBeTruthy();
    expect(usuario.email).toContain('@');
  });
});
