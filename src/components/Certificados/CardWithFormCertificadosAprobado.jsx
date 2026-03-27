import { useCallback, useEffect, useState } from "react";
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
import { Loader, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { certificadoRequestAprobado, searchCertificadoAprobadoRequest} from "@/services/certificado";
import { DataTableCertificadosAprobado } from "./DataTableCertificadosAprobado";

export const CardWithFormCertificadosAprobado = () => {

  //const [filterSearch, setFilterSearch] = useState("1");

  // SECCION PRIMERA CONSULTA BANCA VIRTUAL
  const { token } = useAuthStore();
  //const [searchReceipt, setSearchReceipt] = useState("");

  // const handleFilterSearch = (value) => {
  //   setFilterSearch(value);
  //   setDataReceiptBandejaRegister([]);
  //   setSearchReceipt("");
  //   setSearchReceiptRegister("");
  //   setLoadingReceiptRegister(false);
  // };





  // SECCION SEGUNDA CONSULTA REGISTRO COMPROBANTES

  // const refreshDocument = async () => {
  //   await handleBuscarRegister(new Event("refresh")); // simula la búsqueda
  // };

//   const refreshDocument = async () => {
//     if (
//       searchCertificadoRegister !== "" ||
//       fechaDesde !== "" ||
//       fechaHasta !== ""
//     ) {
//       await handleBuscarRegister(new Event("refresh"));
//     } else {
//       await fetchDataCertificado(token);
//     }

//   };


  const [loadingReceiptRegister, setLoadingReceiptRegister] = useState(false);
  const [dataCertificadoBandejaRegister, setDataCertificadoBandejaRegister] = useState([]);
  const [filterCertificadoRegister, setFilterReceiptRegister] = useState("1");
  const [searchCertificadoRegister, setSearchCertificadoRegister] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");


  const handleFilterReceiptRegister = (event) => {
    setDataCertificadoBandejaRegister([]);
    setSearchCertificadoRegister("");
    setFilterReceiptRegister(event);
  };

  const handleChangeSearchReceiptRegister = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");

    if (Number(filterCertificadoRegister) === 1) {
      value = value.slice(0, 10);
    } else if (Number(filterCertificadoRegister) === 2) {
      value = value.slice(0, 10);
    }

    setSearchCertificadoRegister(value);
  };

  const fetchDataCertificado = useCallback(async (token) => {
    try {
      const responseService = await certificadoRequestAprobado(token);
      if (responseService == null) {
        return toast.error(
          "Comunicacion con el Servidor , se dio de forma interrumpida",
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      } else if (responseService !== null) {
        if (responseService.error == 1) {
          return toast.error(responseService.message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (responseService.error == 0) {
          setDataCertificadoBandejaRegister(responseService.certificados);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDataCertificado();
  }, [fetchDataCertificado]);

  const handleBuscarRegister = async (event) => {
    event.preventDefault();

    if (Number(filterCertificadoRegister) === 1 && searchCertificadoRegister.length !== 10) {
      setDataCertificadoBandejaRegister([]);
      return toast.error("La cédula del solicitante debe tener exactamente 10 caracteres.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (Number(filterCertificadoRegister) === 2 && searchCertificadoRegister.length !== 10) {
      setDataCertificadoBandejaRegister([]);
      return toast.error("La cédula del titular debe tener exactamente 10 caracteres.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setLoadingReceiptRegister(true);

    const requestComprobante = {
      Filtro: Number(filterCertificadoRegister),
      Valor: searchCertificadoRegister?.toString() || "",
      FechaDesde: fechaDesde === "" ? null : fechaDesde,
      FechaHasta: fechaHasta === "" ? null : fechaHasta,
    };

    console.log(requestComprobante);

    const responseReceipt = await searchCertificadoAprobadoRequest(requestComprobante, token)

    if (responseReceipt === null || responseReceipt === undefined) {
      return toast.error(
        "Comunicacion con el Servidor , se dio de forma interrumpida",
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else if (responseReceipt !== null || responseReceipt !== undefined) {
      if (responseReceipt.error === 1) {
        setLoadingReceiptRegister(false);
        return toast.error(responseReceipt.mensaje, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (responseReceipt.error === 0) {
        setDataCertificadoBandejaRegister(responseReceipt.certificados);
        setLoadingReceiptRegister(false);
        return toast.success(responseReceipt.mensaje, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }


  return (
    <Card className="w-full px-4 md:px-8">
      <CardHeader>
        <CardTitle>Consulta de certificados aprobados</CardTitle>
        <CardDescription>
          En esta opción podra consultar los certificados que ya fueron aprobados , revisados y enviados al usuario
        </CardDescription>

        <br />

        <br />
        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-3 flex flex-col space-y-1.5">
              <Label htmlFor="filterDriver">Criterio de Búsqueda</Label>
              <Select
                id="filterDeclarante"
                name="filterDeclarante"
                value={filterCertificadoRegister}
                onValueChange={handleFilterReceiptRegister}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un Filtro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Seleccione un Filtro</SelectItem>
                  <SelectItem value="1">Identificación Solicitante</SelectItem>
                  <SelectItem value="2">Identificación Titular</SelectItem>
                  <SelectItem value="3">Rango de fechas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div
              className={`flex flex-col space-y-1.5 ${Number(filterCertificadoRegister) === 3 ? "md:col-span-6" : "md:col-span-3"
                }`}
            >
              {Number(filterCertificadoRegister) === 1 && (
                <>
                  <Label htmlFor="searchReceipt">Buscar</Label>
                  <Input
                    id="searchReceipt"
                    name="searchReceipt"
                    value={searchCertificadoRegister}
                    onChange={handleChangeSearchReceiptRegister}
                    className="w-full"
                  />
                </>
              )}

              {Number(filterCertificadoRegister) === 2 && (
                <>
                  <Label htmlFor="searchReceipt">Buscar</Label>
                  <Input
                    id="searchReceipt"
                    name="searchReceipt"
                    value={searchCertificadoRegister}
                    onChange={handleChangeSearchReceiptRegister}
                    className="w-full"
                  />
                </>
              )}

              {Number(filterCertificadoRegister) === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label>Fecha Desde</Label>
                    <Input
                      type="date"
                      value={fechaDesde}
                      onChange={(e) => setFechaDesde(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label>Fecha Hasta</Label>
                    <Input
                      type="date"
                      value={fechaHasta}
                      onChange={(e) => setFechaHasta(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex items-end">
              <Button
                onClick={handleBuscarRegister}
                disabled={loadingReceiptRegister}
                className="w-full md:w-12"
              >
                {loadingReceiptRegister ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Search />
                )}
              </Button>
            </div>
          </div>
        </>

      </CardHeader>

      <br />

      <CardContent className="overflow-x-auto">
        {/* onRefresh={refreshDocument} */}
        <DataTableCertificadosAprobado data={dataCertificadoBandejaRegister}  />
      </CardContent>
    </Card>
  );
};




