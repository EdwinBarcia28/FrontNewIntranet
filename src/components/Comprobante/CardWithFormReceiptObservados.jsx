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
import { Loader, Search } from "lucide-react";
import { DataTableReceipt } from "./DataTableReceipt";
import { searchComprobanteGrmRequest} from "@/services/comprobantes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableReceiptObservados } from "./DataTableReceiptObservados";

export const CardWithFormReceiptObservados = () => {


  // SECCION PRIMERA CONSULTA BANCA VIRTUAL
  const { token } = useAuthStore();


  const refreshDocument = async () => {
    await handleBuscarRegister(new Event("refresh")); // simula la búsqueda
  };


  const [loadingReceiptRegister, setLoadingReceiptRegister] = useState(false);
  const [dataReceiptBandejaRegister, setDataReceiptBandejaRegister] = useState([]);
  const [filterReceiptRegister, setFilterReceiptRegister] = useState("1");
  const [searchReceiptRegister, setSearchReceiptRegister] = useState("");


  const handleFilterReceiptRegister = (event) => {
    setDataReceiptBandejaRegister([]);
    setSearchReceiptRegister("");
    setFilterReceiptRegister(event);
  };

  const handleChangeSearchReceiptRegister = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");

    if (Number(filterReceiptRegister) === 1) {
      value = value.slice(0, 10);
    } else if (Number(filterReceiptRegister) === 2) {
      value = value.slice(0, 8);
    }

    setSearchReceiptRegister(value);
  };

  const handleBuscarRegister = async (event) => {
    event.preventDefault();


    if (Number(filterReceiptRegister) === 1 && searchReceiptRegister.length !== 10) {
      setDataReceiptBandejaRegister([]);
      return toast.error("La cédula debe tener exactamente 10 caracteres.", {
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

    if (Number(filterReceiptRegister) === 2 && searchReceiptRegister.length > 8) {
      setDataReceiptBandejaRegister([]);
      return toast.error("El valor para este filtro debe tener máximo 8 caracteres.", {
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
      Filtro: Number(filterReceiptRegister),
      Valor: searchReceiptRegister?.toString() || ""
    };

    console.log(requestComprobante);

    const responseReceipt = await searchComprobanteGrmRequest(requestComprobante, token)

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
        setDataReceiptBandejaRegister(responseReceipt.comprobantes);
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
        <CardTitle>Consulta de Comprobantes observados</CardTitle>
        <CardDescription>
          En esta opción podra consultar los tramites registrados por los operadores que tengan alguna observacion de parte de ellos para que 
          sea liberado el numero de comprobante y pueda volver a ser utilizado
        </CardDescription>

        <br />
          <>
            <div className="w-full text-center font-semibold text-base sm:text-lg my-4">
                Consulta Tramites Observados
            </div>
                  
              <br />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-3 flex flex-col space-y-1.5">
                <Label htmlFor="filterDriver">Criterio de Búsqueda</Label>
                <Select
                  id="filterDeclarante"
                  name="filterDeclarante"
                  value={filterReceiptRegister}
                  onValueChange={handleFilterReceiptRegister}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un Filtro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Seleccione un Filtro</SelectItem>
                    <SelectItem value="1">Identificación Ciudadano</SelectItem>
                    <SelectItem value="2">Número de Trámite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3 flex flex-col space-y-1.5">
                <Label htmlFor="searchReceipt">Buscar</Label>
                <Input
                  id="searchReceipt"
                  name="searchReceipt"
                  value={searchReceiptRegister}
                  onChange={handleChangeSearchReceiptRegister}
                  className="w-full"
                />
              </div>

              <div className="md:col-span-1 flex items-end">
                <Button onClick={handleBuscarRegister} disabled={loadingReceiptRegister}>
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
          <DataTableReceiptObservados data={dataReceiptBandejaRegister} onRefresh={refreshDocument} />
      </CardContent>
    </Card>
  );
};
