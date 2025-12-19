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

export async function generarPdfReceiptReportSupervisor(data, intranet, grm, filtros = {}) {
  const doc = new jsPDF("p", "pt", "letter");

  const logoBase64 = await cargarImagenBase64("/logoCRCG.png");
  doc.addImage(logoBase64, "PNG", 20, 20, 130, 60);

  // TÍTULO
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Reporte general de comprobantes", 150, 50);

  // FECHA
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 150, 70);

  // FILTROS
  doc.setFont("helvetica", "bold");
  doc.text(`Fecha Desde: `, 420, 30);
  doc.setFont("helvetica", "normal");
  doc.text(filtros.fechaDesde, 460, 30);

  doc.setFont("helvetica", "bold");
  doc.text(`Fecha Desde: `, 480, 30);
  doc.setFont("helvetica", "normal");
  doc.text(filtros.fechaHasta, 500, 30);

  doc.setFont("helvetica", "bold");
  doc.text(`Oficina: `, 420, 50);
  doc.setFont("helvetica", "normal");
  doc.text(filtros.oficina, 470, 50);

  doc.setFont("helvetica", "bold");
  doc.text(`Usuario Generación: `, 420, 70);
  doc.setFont("helvetica", "normal");
  doc.text(filtros.usuario, 525, 70);

  let yActual = 145; // Posición inicial

  const headers = [
    ["Número", "Identificación", "Nombre", "Servicio", "Oficina", "Fecha Registro" , "Usuario"],
  ];

  const headersGrm = [
    ["Número", "Identificación", "Nombre", "Servicio", "Fecha Registro", "Usuario"],
  ];

  // -----------------------------------------
  // TABLA 1 - Comprobantes Consultados
  // -----------------------------------------
  if (data.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Comprobantes Consultados", 40, yActual);

    const body = data.map((item) => [
      item.numeroComprobante,
      item.identificacion,
      item.ciudadano,
      item.servicio,
      item.oficina,
      item.fechaComprobante,
      item.usuario
    ]);

    autoTable(doc, {
      startY: yActual + 15,
      head: headers,
      body: body,
      theme: "grid",
      styles: { fontSize: 9, halign: "center" },
      headStyles: { fillColor: [30, 64, 175], textColor: 255 },
    });

    yActual = doc.lastAutoTable.finalY + 30;
  }

  // -----------------------------------------
  // TABLA 2 - Trámites Intranet
  // -----------------------------------------
  if (intranet.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Trámites Intranet", 40, yActual);

    const bodyIntranet = intranet.map((item) => [
      item.numeroComprobante,
      item.identificacion,
      item.ciudadano,
      item.servicio,
      item.oficina,
      item.fechaComprobante,
      item.usuario
    ]);

    autoTable(doc, {
      startY: yActual + 15,
      head: headers,
      body: bodyIntranet,
      theme: "grid",
      styles: { fontSize: 9, halign: "center" },
      headStyles: { fillColor: [30, 64, 175], textColor: 255 },
    });

    yActual = doc.lastAutoTable.finalY + 30;
  }

  // -----------------------------------------
  // TABLA 3 - Trámites GRM
  // -----------------------------------------
  if (grm.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Trámites GRM", 40, yActual);

    const bodyGrm = grm.map((item) => [
      item.numeroComprobante,
      item.identificacion,
      item.ciudadano,
      item.servicio,
      item.fechaComprobante,
      item.usuario
    ]);

    autoTable(doc, {
      startY: yActual + 15,
      head: headersGrm,
      body: bodyGrm,
      theme: "grid",
      styles: { fontSize: 9, halign: "center" },
      headStyles: { fillColor: [30, 64, 175], textColor: 255 },
    });

    yActual = doc.lastAutoTable.finalY + 30;
  }

  doc.save("reporte-recibos-grm.pdf");
}
