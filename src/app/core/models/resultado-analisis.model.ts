export interface ResultadoAnalisis {
  idResultado: number;

  // UI (por ahora strings)
  paciente: string;
  laboratorio: string;

  tipo: string;
  fechaResultado: string; // string legible para tabla

  estado: 'PENDIENTE' | 'PROCESADO' | 'ENTREGADO';

  // ✅ NUEVO: para poder filtrar por usuario logeado (sin mostrarlo si no quieres)
  idUsuario?: number;
  idLab?: number;

  // ✅ NUEVO: opcionales por si después los muestras
  resultado?: string;
  descripcion?: string;
  valor?: string;
  unidad?: string;
  observacion?: string;
  fechaAnalisis?: string; // si la necesitas
}
