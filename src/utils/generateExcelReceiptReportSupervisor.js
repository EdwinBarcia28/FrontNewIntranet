import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function formatearFechaExcel(fecha) {
  if (!fecha) return "";

  const d = new Date(fecha);

  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();

  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");

  return `${mm}-${dd}-${yyyy} ${hh}:${min}:${ss}`;
}

export function generateExcelReceiptReportSupervisor(data, filtros = {}) {
  const rows = data.map((item, index) => ({
    Id: index + 1,
    "N° Trámite": item.numero ?? "",
    "Tipo Trámite": item.tramite ?? "",
    "Cédula": item.cedula ?? "",
    "Ciudadano": item.ciudadano ?? "",
    "Oficina": item.oficina ?? "",
    "Operador": item.operador ?? "",
    "Fecha Trámite": formatearFechaExcel(item.fechaTramite),
    "Plataforma": item.sistema ?? "",
    "Usuario Consulta": item.usuarioConsulta ?? "",
    "Plataforma Pago": item.sistemaPago ?? "",
  }));

  const ws = XLSX.utils.json_to_sheet(rows);

  // ✅ (opcional) auto ancho de columnas
  ws["!cols"] = [
    { wch: 5 },   // Id
    { wch: 12 },  // N° Trámite
    { wch: 30 },  // Tipo Trámite
    { wch: 15 },  // Cédula
    { wch: 30 },  // Ciudadano
    { wch: 15 },  // Oficina
    { wch: 15 },  // Operador
    { wch: 20 },  // Fecha
    { wch: 12 },  // Plataforma
    { wch: 18 },  // Usuario consulta
    { wch: 18 },  // Plataforma pago
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Comprobantes");

  const fileName = `reporte_comprobantes_${filtros.fechaDesde || "NA"}_${filtros.fechaHasta || "NA"}_${filtros.oficina || "NA"}.xlsx`;

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, fileName);
}
