
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Loader, Search, X } from "lucide-react";
import { consultarComprobanteGeneralSupervisores } from "@/services/comprobantes";
import { ReceiptPdfViewer } from "./ReceiptPdfViewer";
import { generatePdfReceiptReportSupervisor } from "@/utils/generatePdfReceiptReportSupervisor";
import { DialogSearchOficina } from "./DialogSearchOficina";
import { generateExcelReceiptReportSupervisor } from "@/utils/generateExcelReceiptReportSupervisor";
import { useUIStore } from "@/store/ui";

export const CardWithFormReceiptReportSupervisores = () => {
  const { setGlobalLoading } = useUIStore();
  const { dataUser, token } = useAuthStore();
  const [pdfBlob, setPdfBlob] = useState(null);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [oficina, setOficina] = useState("");
  const [dataReporte, setDataReporte] = useState([]);

  const handleSeleccionOficina = (office) => {
    setOficina(office.oficina);
  };

  const handleLimpiarOficina = () => {
    setOficina("");
  };



  const [loadingReceiptReport, setLoadingReceiptReport] = useState(false);

  const handleBuscar = async (event) => {
    event.preventDefault();

    setGlobalLoading(true, `Generando reporte con fechas: ${fechaDesde} - ${fechaHasta}`);
    setLoadingReceiptReport(true);

    try {
      const requestComprobante = {
        FechaDesde: fechaDesde,
        FechaHasta: fechaHasta,
        Oficina: oficina,
      };

      setLoadingReceiptReport(true);

      const responseReceipt = await consultarComprobanteGeneralSupervisores(
        requestComprobante,
        token
      );

      console.log(responseReceipt);

      setLoadingReceiptReport(false);

      if (!responseReceipt) {
        return toast.error("Comunicación con el servidor fallida");
      }

      if (responseReceipt.error === 1) {
        return toast.error(responseReceipt.mensaje);
      }


      toast.success(responseReceipt.mensaje);
      setDataReporte(responseReceipt.consolidado);


      const blob = await generatePdfReceiptReportSupervisor(
        responseReceipt.consolidado,
        {
          fechaDesde: fechaDesde,
          fechaHasta: fechaHasta,
          oficina: oficina || "",
          usuario: dataUser?.nombreUsuario || "Desconocido",
        }
      );

      setPdfBlob(blob);
    }catch (error) {
      toast.error(`Error inesperado: ${error.message || error}`);
    } finally {
      setLoadingReceiptReport(false);
      setGlobalLoading(false);
    }
    
  };

  const handleDescargarExcel = () => {
    if (!dataReporte || dataReporte.length === 0) {
      return toast.info("Primero genera el reporte para poder exportar a Excel");
    }

    generateExcelReceiptReportSupervisor(dataReporte, {
      fechaDesde: fechaDesde,
      fechaHasta: fechaHasta,
      oficina: oficina,
      usuario: dataUser?.nombreUsuario || "Desconocido",
    });
  };


  return (
    <Card className="w-full px-4 md:px-8">
      <CardHeader>
        <CardTitle>
          Reporte de Comprobantes Generados
        </CardTitle>

        <CardDescription>
          En esta opción podrá consultar los comprobantes utilizados en el todos los sistemas de la corporacion de todos operadores en las distintas oficinas.
        </CardDescription>

        <div className="mt-6 grid grid-cols-12 gap-6 items-end">
          {/* Fecha Desde */}
          <div className="col-span-12 md:col-span-3 flex flex-col space-y-1.5">
            <Label className="text-sm mb-1">Fecha Desde</Label>
            <Input
              type="date"
              className="h-10"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
            />
          </div>

          {/* Fecha Hasta */}
          <div className="col-span-12 md:col-span-3 flex flex-col space-y-1.5">
            <Label className="text-sm mb-1">Fecha Hasta</Label>
            <Input
              type="date"
              className="h-10"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
            />
          </div>

          {/* Oficina */}
          <div className="col-span-12 md:col-span-4 flex gap-4 items-end">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="oficinaPedido">Oficina</Label>
              <Input
                id="oficinaPedido"
                placeholder="Ingrese oficina de busqueda"
                value={oficina}
                disabled
              />
            </div>

            <div className="flex gap-2 items-end">
              {/* Buscar oficina */}
              <DialogSearchOficina
                onSelectOficina={handleSeleccionOficina}
                valor={false}
              />

              {/* Limpiar oficina */}
              {oficina && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={handleLimpiarOficina}
                  title="Limpiar oficina"
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          </div>

          {/* Botón Buscar (GRANDE Y A LA DERECHA) */}
          <div className="col-span-12 md:col-span-2 flex justify-end gap-2">
            <Button
              onClick={handleBuscar}
              disabled={loadingReceiptReport}
              className="h-10 px-8"
            >
              {loadingReceiptReport ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                <>
                  <Search size={18} className="mr-2" />
                  Buscar
                </>
              )}
            </Button>

            {/* <Button
              type="button"
              variant="outline"
              className="h-10"
              onClick={handleDescargarExcel}
              disabled={!dataReporte || dataReporte.length === 0}
            >
              <FileSpreadsheet size={18} className="mr-2" />
              Excel
            </Button> */}
          </div>
        </div>



      </CardHeader>


      {/* TABLA */}
      <CardContent className="mt-6 overflow-x-auto">
        <div className="w-full">
          {/* ✅ BARRA SUPERIOR DEL VISOR */}
          <div className="mb-3 flex items-center justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-10"
              onClick={handleDescargarExcel}
              disabled={!dataReporte || dataReporte.length === 0}
            >
              <FileSpreadsheet size={18} className="mr-2" />
              Excel
            </Button>
          </div>

          {/* ✅ VISOR */}
          {pdfBlob && <ReceiptPdfViewer pdfBlob={pdfBlob} />}
        </div>
      </CardContent>

    </Card>
  );
};

