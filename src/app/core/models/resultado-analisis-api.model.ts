export interface ResultadoAnalisisApi {
  idResultado: number;

  idUsuario: number;
  idLab: number;

  tipo?: string;

  // backend (DB) típicamente devuelve ISO: "2025-12-13T16:33:..."
  fechaResultado?: string;

  resultado?: string;
  descripcion?: string;

  valor?: string;
  unidad?: string;
  observacion?: string;
  fechaAnalisis?: string;
}
