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
import { FileText, Loader, Search } from "lucide-react";
import { consultarComprobanteGeneral } from "@/services/comprobantes";
import { DataTableReportReceipt } from "./DataTableReportReceipt";
import { DataTableReportIntranet } from "./DataTableReportIntranet";
import { DataTableReportGrm } from "./DataTableReportGrm";
import { generarPdfReceiptReport } from "@/utils/generatePdfReceiptReport";

export const CardWithFormReceiptReport = () => {

  const { selectEstablishments, dataUser, token } = useAuthStore();

  const [loadingReceiptReport, setLoadingReceiptReport] = useState(false);
  const [dataReceiptBandeja, setDataReceiptBandeja] = useState([]);
  const [dataReceiptIntranet, setDataReceiptIntranet] = useState([]);
  const [dataReceiptGrm, setDataReceiptGrm] = useState([]);
  const [fechaGeneracion, setFechaGeneracion] = useState("");

  const handleBuscar = async (event) => {
    event.preventDefault();

    const requestComprobante = {
      FechaComprobante: fechaGeneracion,
      //Oficina: selectEstablishments || "",
      Usuario: dataUser ? dataUser.nombreUsuario : "Desconocido",
    };

    setLoadingReceiptReport(true);
    const responseReceipt = await consultarComprobanteGeneral(requestComprobante, token);

    if (!responseReceipt) {
      setLoadingReceiptReport(false);
      return toast.error("Comunicación con el servidor fallida");
    }

    setLoadingReceiptReport(false);

    if (responseReceipt.error === 1) {
      return toast.error(responseReceipt.mensaje);
    } else {
      setDataReceiptBandeja(responseReceipt.comprobantes);
      setDataReceiptIntranet(responseReceipt.intranet);
      setDataReceiptGrm(responseReceipt.grm);
      toast.success(responseReceipt.mensaje);
    }


  };

  return (
    <Card className="w-full max-w-[1400px] mx-auto px-6 py-4">
      <CardHeader>
        <CardTitle>
          Reporte de Comprobantes Generados
        </CardTitle>

        <CardDescription>
          En esta opción podrá consultar los comprobantes consultados en la banca, utilizados en el GRM y la intranet.
        </CardDescription>

        <br />
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
      </CardHeader>


      {/* TABLA */}
      <CardContent className="mt-6 overflow-x-auto">
        {(dataReceiptBandeja.length > 0 ||
          dataReceiptIntranet.length > 0 ||
          dataReceiptGrm.length > 0) && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h6 className="font-semibold leading-none tracking-tight">
                  Comprobantes Registrados
                </h6>

                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() =>
                    generarPdfReceiptReport(
                      dataReceiptBandeja,
                      dataReceiptIntranet,
                      dataReceiptGrm,
                      {
                        fecha: fechaGeneracion,
                        oficina: selectEstablishments || "",
                        usuario: dataUser ? dataUser.nombreUsuario : "Desconocido",
                      }
                    )
                  }
                >
                  <FileText size={18} />
                  Exportar a PDF
                </Button>
              </div>
            </>
          )}


        {/* TABLA PRINCIPAL BANCADA */}
        {dataReceiptBandeja.length > 0 && (
          <>
            <DataTableReportReceipt
              data={dataReceiptBandeja}
              intranet={dataReceiptIntranet}
              grm={dataReceiptGrm}
              filtros={{
                fecha: fechaGeneracion,
                oficina: selectEstablishments || "",
                usuario: dataUser ? dataUser.nombreUsuario : "Desconocido",
              }}
            />
            <br />
          </>
        )}

        {/* TABLA INTRANET */}
        {dataReceiptIntranet.length > 0 && (
          <>
            <DataTableReportIntranet data={dataReceiptIntranet} />
            <br />
          </>
        )}

        {/* TABLA GRM */}
        {dataReceiptGrm.length > 0 && (
          <>
            <DataTableReportGrm data={dataReceiptGrm} />
            <br />
          </>
        )}
      </CardContent>
    </Card>
  );
};
