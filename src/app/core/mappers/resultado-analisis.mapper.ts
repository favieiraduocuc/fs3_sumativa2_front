import { ResultadoAnalisis } from '../models/resultado-analisis.model';
import { ResultadoAnalisisApi } from '../models/resultado-analisis-api.model';

export function mapResultadoAnalisis(
  api: ResultadoAnalisisApi
): ResultadoAnalisis {

  // 🔁 Fecha inteligente (fallback real)
  const fechaVisible =
    api.fechaResultado
      ? new Date(api.fechaResultado).toLocaleString()
      : api.fechaAnalisis
        ? new Date(api.fechaAnalisis).toLocaleString()
        : 'Sin fecha';

  return {
    idResultado: api.idResultado,
    idUsuario: api.idUsuario,
    idLab: api.idLab,

    // UI honesta
    paciente: `Usuario #${api.idUsuario}`,
    laboratorio: `Lab #${api.idLab}`,

    // usamos descripción como tipo (lo único real hoy)
    tipo: api.descripcion ?? '—',

    // ✅ AHORA SÍ SE VE LA FECHA
    fechaResultado: fechaVisible,

    // estado derivado real
    estado: api.resultado && api.resultado.trim().length > 0
      ? 'PROCESADO'
      : 'PENDIENTE',

    // extras (para futuro)
    resultado: api.resultado,
    descripcion: api.descripcion,
    valor: api.valor,
    unidad: api.unidad,
    observacion: api.observacion,

    fechaAnalisis: api.fechaAnalisis
      ? new Date(api.fechaAnalisis).toLocaleString()
      : undefined
  };
}
