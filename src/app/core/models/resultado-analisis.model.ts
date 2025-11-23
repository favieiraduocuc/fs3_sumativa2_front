export interface ResultadoAnalisis {
  idResultado: number;
  paciente: string;
  laboratorio: string;
  tipo: string;
  fechaResultado: string;   // lo mostramos como string legible
  estado: 'PENDIENTE' | 'PROCESADO' | 'ENTREGADO';
}
