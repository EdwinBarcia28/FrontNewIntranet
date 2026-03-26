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
import { FileSpreadsheet, FileText, Loader, Search } from "lucide-react";
import { consultarComprobanteConsolidado, } from "@/services/comprobantes";
import { DataTableReportReceipt } from "./DataTableReportReceipt";
import { DataTableReportIntranet } from "./DataTableReportIntranet";
import { DataTableReportGrm } from "./DataTableReportGrm";
//import { generarPdfReceiptReport } from "@/utils/generatePdfReceiptReport";
//import { FileText } from "lucide-react";
//import { generarPdfReceiptReport } from "@/utils/generatePdfReceiptReport";
import { ReceiptPdfViewer } from "./ReceiptPdfViewer";
import { generarPdfReceiptReportConsolidado } from "@/utils/generatePdfReceiptReportConsolidado";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateExcelReceiptReport } from "@/utils/generateExcelReceiptReport";
import { useUIStore } from "@/store/ui";

export const CardWithFormReceiptReport = () => {
  const { setGlobalLoading } = useUIStore();

  const { selectEstablishments, dataUser, token } = useAuthStore();
  //const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfBlobConsolidado, setPdfBlobConsolidado] = useState(null);
  const [dataReporte, setDataReporte] = useState([]);

  //const [filterSearch, setFilterSearch] = useState("1");


  //const [loadingReceiptReport, setLoadingReceiptReport] = useState(false);
  //const [fechaGeneracion, setFechaGeneracion] = useState("");

  const [loadingReceiptReportConsolidado, setLoadingReceiptReportConsolidado] = useState(false);
  const [fechaGeneracionConsolidado, setFechaGeneracionConsolidado] = useState("");

  // const handleFilterSearch = (event) => {
  //   setFilterSearch(event);
  // };

  // const handleBuscar = async (event) => {
  //   event.preventDefault();

  //   const requestComprobante = {
  //     FechaComprobante: fechaGeneracion,
  //     Usuario: dataUser ? dataUser.nombreUsuario : "Desconocido",
  //   };

  //   setLoadingReceiptReport(true);

  //   const responseReceipt = await consultarComprobanteGeneral(
  //     requestComprobante,
  //     token
  //   );

  //   setLoadingReceiptReport(false);

  //   if (!responseReceipt) {
  //     return toast.error("Comunicación con el servidor fallida");
  //   }

  //   if (responseReceipt.error === 1) {
  //     return toast.error(responseReceipt.mensaje);
  //   }


  //   toast.success(responseReceipt.mensaje);



  //   const blob = await generarPdfReceiptReport(
  //     responseReceipt.comprobantes,
  //     responseReceipt.intranet,
  //     responseReceipt.grm,
  //     {
  //       fecha: fechaGeneracion,
  //       oficina: selectEstablishments || "",
  //       usuario: dataUser?.nombreUsuario || "Desconocido",
  //     }
  //   );

  //   setPdfBlob(blob);
  // };

  const handleBuscarConsolidado = async (event) => {
    event.preventDefault();

    setGlobalLoading(true, `Generando reporte con fecha ${fechaGeneracionConsolidado}...`);
    setLoadingReceiptReportConsolidado(true);

    try {
      const requestComprobante = {
        FechaComprobante: fechaGeneracionConsolidado,
        Usuario: dataUser ? dataUser.nombreUsuario : "Desconocido",
      };

      const responseReceipt = await consultarComprobanteConsolidado(
        requestComprobante,
        token
      );

      if (!responseReceipt) {
        toast.error("Comunicación con el servidor fallida");
        return;
      }

      if (responseReceipt.error === 1) {
        toast.error(responseReceipt.mensaje);
        return;
      }

      toast.success(responseReceipt.mensaje);

      setDataReporte(responseReceipt.consolidado);

      const blob = await generarPdfReceiptReportConsolidado(
        responseReceipt.consolidado,
        {
          fecha: fechaGeneracionConsolidado,
          oficina: selectEstablishments || "",
          usuario: dataUser?.nombreUsuario || "Desconocido",
        }
      );

      setPdfBlobConsolidado(blob);
    } catch (error) {
      toast.error(`Error inesperado: ${error.message || error}`);
    } finally {
      setLoadingReceiptReportConsolidado(false);
      setGlobalLoading(false);
    }
  };


  const handleDescargarExcel = () => {
    if (!dataReporte || dataReporte.length === 0) {
      return toast.info("Primero genera el reporte para poder exportar a Excel");
    }

    generateExcelReceiptReport(dataReporte, {
      fecha: fechaGeneracionConsolidado,
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
          En esta opción podrá consultar los comprobantes utilizados en el todos los sistemas de la corporacion.
        </CardDescription>

        {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-3 flex flex-col space-y-1.5">
            <Label htmlFor="filterDriver">Tipo de Consulta</Label>
            <Select
              id="filterDeclarante"
              name="filterDeclarante"
              value={filterSearch}
              onValueChange={handleFilterSearch}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un Filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tramites Detallados</SelectItem>
                <SelectItem value="2">Consulta Consolidados </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div> */}

        <br />
        {/* {Number(filterSearch) === 1 && (
          <>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-3 flex flex-col space-y-1.5">
                <Label className="text-sm mb-1">Fecha Comprobante</Label>
                <Input
                  type="date"
                  className="w-52 h-10"
                  value={fechaGeneracion}
                  onChange={(e) => setFechaGeneracion(e.target.value)}
                />
              </div>

              <div className="md:col-span-1 flex items-end">
                <Button
                  onClick={handleBuscar}
                  disabled={loadingReceiptReport}
                  className="h-10"
                >
                  {loadingReceiptReport ? (
                    <Loader className="animate-spin" size={18} />
                  ) : (
                    <Search size={18} />
                  )}
                </Button>
              </div>
            </div>
          </>
        )} */}


        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-3 flex flex-col space-y-1.5">
              <Label className="text-sm mb-1">Fecha Comprobante</Label>
              <Input
                type="date"
                className="w-52 h-10"
                value={fechaGeneracionConsolidado}
                onChange={(e) => setFechaGeneracionConsolidado(e.target.value)}
              />
            </div>

            {/* <div className="md:col-span-1 flex items-end">
                <Button
                  onClick={handleBuscarConsolidado}
                  disabled={loadingReceiptReportConsolidado}
                  className="h-10"
                >
                  {loadingReceiptReportConsolidado ? (
                    <Loader className="animate-spin" size={18} />
                  ) : (
                    <Search size={18} />
                  )}
                </Button>
              </div> */}

            <div className="col-span-12 md:col-span-2 flex justify-end gap-2">
              <Button
                onClick={handleBuscarConsolidado}
                disabled={loadingReceiptReportConsolidado}
                className="h-10 px-8"
              >
                {loadingReceiptReportConsolidado ? (
                  <Loader className="animate-spin" size={18} />
                ) : (
                  <>
                    <Search size={18} className="mr-2" />
                    Buscar
                  </>
                )}
              </Button>

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

          </div>
        </>

      </CardHeader>


      {/* TABLA */}
      <CardContent className="mt-6 overflow-x-auto">
        <div className="w-full">
          {/* {Number(filterSearch) === 1 && ( */}
          {/* <> */}
          {/* VISOR */}
          {/* {pdfBlob && <ReceiptPdfViewer pdfBlob={pdfBlob} />} */}
          {/* </> */}
          {/* )} */}

          <>
            {/* VISOR */}
            {pdfBlobConsolidado && <ReceiptPdfViewer pdfBlob={pdfBlobConsolidado} />}
          </>
        </div>
      </CardContent>
    </Card>
  );
};


