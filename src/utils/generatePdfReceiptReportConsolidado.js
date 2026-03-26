import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

async function cargarImagenBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

function formatearFecha(fecha) {
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


export async function generarPdfReceiptReportConsolidado(data, filtros = {}) {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [353, 250], // B4 horizontal
    });

  const pageWidth = doc.internal.pageSize.getWidth();

  /* ======================================================
     LOGO
  ====================================================== */
  const logoBase64 = await cargarImagenBase64("/logoCRCG.png");
  doc.addImage(logoBase64, "PNG", 10, 10, 45, 18);

  /* ======================================================
     TÍTULO
  ====================================================== */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(
    "Reporte consolidado de comprobantes",
    125,
    18,
    { align: "center" }
  );

  /* ======================================================
     METADATOS (DERECHA)
  ====================================================== */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  const metaX = pageWidth - 90;
  let metaY = 14;

  doc.text(`Fecha generación:`, metaX, metaY);
  doc.text(new Date().toLocaleString(), metaX + 40, metaY);

  metaY += 5;
  doc.text(`Fecha consulta:`, metaX, metaY);
  doc.text(filtros.fecha || "-", metaX + 40, metaY);

  metaY += 5;
  doc.text(`Oficina:`, metaX, metaY);
  doc.text(filtros.oficina || "-", metaX + 40, metaY);

  metaY += 5;
  doc.text(`Usuario:`, metaX, metaY);
  doc.text(filtros.usuario || "-", metaX + 40, metaY);

  /* ======================================================
     LÍNEA SEPARADORA
  ====================================================== */
  doc.setLineWidth(0.3);
  doc.line(8, 34, pageWidth - 8, 34);

  /* ======================================================
     SECCIÓN
  ====================================================== */
  let yActual = 42;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Comprobantes", 10, yActual);

  /* ======================================================
     TABLA
  ====================================================== */
  const headers = [[
    "Id",
    "N° Trámite",
    "Tipo Trámite",
    "Cédula",
    "Ciudadano",
    "Oficina",
    "Usuario Tramite",
    "Fecha Trámite",
    "Plataforma",
    "Usuario Consulta",
    "Plataforma Pago"
  ]];

  const body = data.map((item,index) => [
    index + 1, // ✅ ID autoincrementable
    item.numero ?? "",
    item.tramite ?? "",
    item.cedula ?? "",
    item.ciudadano ?? "",
    item.oficina ?? "",
    item.operador ?? "",
    //item.fechaTramite ?? "",
    formatearFecha(item.fechaTramite),
    item.sistema ?? "",
    item.usuarioConsulta ?? "",
    item.sistemaPago ?? "",
  ]);

  autoTable(doc, {
    startY: yActual + 5,
    head: headers,
    body: body,
    theme: "grid",
    margin: { left: 8, right: 8 },
    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: 1.5,
      valign: "middle",
      overflow: "linebreak",
      textColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [30, 64, 175],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
      fontSize: 8,
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 24 },
      2: { cellWidth: 58 },
      3: { cellWidth: 26 },
      4: { cellWidth: 58 },
      5: { cellWidth: 26 },
      6: { cellWidth: 26 },
      7: { cellWidth: 36 },
      8: { cellWidth: 26 },
      9: { cellWidth: 26 },
      10: { cellWidth: 26 }
    },
  });

  /* ======================================================
     PIE DE PÁGINA
  ====================================================== */
  // const pageCount = doc.getNumberOfPages();
  // for (let i = 1; i <= pageCount; i++) {
  //   doc.setPage(i);
  //   doc.setFontSize(8);
  //   doc.text(
  //     `Página ${i} de ${pageCount}`,
  //     pageWidth - 15,
  //     205,
  //     { align: "right" }
  //   );
  // }

  return doc.output("blob");
}
