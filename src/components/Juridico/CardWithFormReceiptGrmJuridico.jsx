import {  useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader, Search } from "lucide-react";
import { searchComprobanteGrmRequest } from "@/services/comprobantes";
import { DataTableReceiptGrm } from "./DataTableReceiptGrm";


export const CardWithFormReceiptGrmJuridico = () => {
  
  const { token } = useAuthStore();


  const [loadingReceipt, setLoadingReceipt] = useState(false);
  const [dataReceiptBandeja, setDataReceiptBandeja] = useState([]);
  const [filterReceipt, setFilterReceipt] = useState("1");
  const [searchReceipt, setSearchReceipt] = useState("");


  const handleFilterReceipt = (event) => {
    setDataReceiptBandeja([]);
    setSearchReceipt("");
    setFilterReceipt(event);
  };

  const handleChangeSearchReceipt = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");

    if (Number(filterReceipt) === 1) {
      value = value.slice(0, 10);
    } else if (Number(filterReceipt) === 2) {
      value = value.slice(0, 8);
    }

    setSearchReceipt(value);
  };

  const handleBuscar = async (event) => {
    event.preventDefault();
    
    if (Number(filterReceipt) === 1 && searchReceipt.length !== 10) {
      setDataReceiptBandeja([]);
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

    if (Number(filterReceipt) === 2 && searchReceipt.length > 8) {
      setDataReceiptBandeja([]);
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
    setLoadingReceipt(true);

    const requestComprobante = {
      Filtro: Number(filterReceipt),
      Valor: searchReceipt?.toString() || "" 
    };

    const responseReceipt = await searchComprobanteGrmRequest(requestComprobante,token)

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
      }else if (responseReceipt !== null || responseReceipt !== undefined) {
        if (responseReceipt.error === 1) {
            setLoadingReceipt(false);
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
        }else if (responseReceipt.error === 0) {
            setDataReceiptBandeja(responseReceipt.comprobantes);
            setLoadingReceipt(false);
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
    <Card className="w-full px-4 md:px-10 max-w-[1400px] mx-auto">
      <CardHeader>
        <CardTitle>Registro de Documentos Jurídicos</CardTitle>
        <CardDescription>
          En esta opción podra consultar los comprobantes registrados por los distintos operadores en todas las oficinas y a su vez
          registrar los documentos juridicos asociados a los comprobantes.
        </CardDescription>

        <br/>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-3 flex flex-col space-y-1.5">
            <Label htmlFor="filterDriver">Criterio de Búsqueda</Label>
            <Select
              id="filterDeclarante"
              name="filterDeclarante"
              value={filterReceipt}
              onValueChange={handleFilterReceipt}
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
              value={searchReceipt}
              onChange={handleChangeSearchReceipt}
              className="w-full"
            />
          </div>

          <div className="md:col-span-1 flex items-end">
            <Button onClick={handleBuscar} disabled={loadingReceipt}>
              {loadingReceipt ? (
                <Loader className="animate-spin" />
              ) : (
                <Search />
              )}
            </Button>
          </div>
        </div>

      </CardHeader>

      <br />
      <CardContent className="overflow-x-auto">
        <DataTableReceiptGrm data={dataReceiptBandeja} />
      </CardContent>
    </Card>
  );
};


