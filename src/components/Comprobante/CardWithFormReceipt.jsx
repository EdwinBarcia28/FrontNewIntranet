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
import { searchComprobanteGrmRequest, searchComprobanteRequest } from "@/services/comprobantes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableReceiptGrm } from "./DataTableReceiptGrm";

export const CardWithFormReceipt = () => {

  const [filterSearch, setFilterSearch] = useState("1");

  // SECCION PRIMERA CONSULTA BANCA VIRTUAL
  const { dataUser, selectEstablishments, token } = useAuthStore();
  const [loadingReceipt, setLoadingReceipt] = useState(false);
  const [dataReceipt, setDataReceipt] = useState([]);
  const [searchReceipt, setSearchReceipt] = useState("");
  const [searchIdentificacion, setSearchIdentificacion] = useState("");

  const handleFilterSearch = (event) => {
    setFilterSearch(event);
  };


  const handleChangeSearchReceipt = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 8);
    setSearchReceipt(value);
  };

  const handleChangeSearchIdentification = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 10);
    setSearchIdentificacion(value);
  };

  const handleBuscar = async (event) => {
    event.preventDefault();

    if (searchIdentificacion.length !== 10) {
      setDataReceipt([]);
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

    if (searchReceipt.length > 8) {
      setDataReceipt([]);
      return toast.error("El numero de comprobante debe tener máximo 8 caracteres.", {
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
      Comprobante: Number(searchReceipt),
      Cedula: searchIdentificacion?.toString() || "",
      Oficina: selectEstablishments || "",
      Usuario: dataUser ? dataUser.nombreUsuario : "Desconocido",
    };

    const responseReceipt = await searchComprobanteRequest(requestComprobante, token)

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
      } else if (responseReceipt.error === 0) {
        setDataReceipt(responseReceipt.ciudadanos);
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

  // SECCION SEGUNDA CONSULTA REGISTRO COMPROBANTES

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

    if (Number(filterReceiptRegister) === 2 && searchReceipt.length > 8) {
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
    <Card className="w-full px-4 md:px-10 max-w-[1400px] mx-auto">
      <CardHeader>
        <CardTitle>Consulta de Comprobantes</CardTitle>
        <CardDescription>
          En esta opción podra consultar los comprobantes los comprobantes de la banca virtual , si al consultar sale un mensaje que el comprobante ya fue usado o consultado
          debe escoger la opcion comprobantes registrados , para verificar el estado en el que esta dicho comprobante y quien lo consulto previamente
        </CardDescription>

        <br />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
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
                <SelectItem value="1">Consulta Banca Virtual</SelectItem>
                <SelectItem value="2">Consulta Tramites Registrados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <br />

        {Number(filterSearch) === 1 && (
          <>
            <div className="w-full text-center font-semibold text-base sm:text-lg my-4">
                Consulta Banca Virtual
            </div>

            <br />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-3 flex flex-col space-y-1.5">
                <Label htmlFor="searchIdentificacion">Identificacion</Label>
                <Input
                  id="searchIdentificacion"
                  name="searchIdentificacion"
                  value={searchIdentificacion}
                  onChange={handleChangeSearchIdentification}
                  className="w-full"
                />
              </div>


              <div className="md:col-span-3 flex flex-col space-y-1.5">
                <Label htmlFor="searchReceipt">Numero Comprobante</Label>
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
          </>

          
        )}

        {Number(filterSearch) === 2 && (
          <>
            <div className="w-full text-center font-semibold text-base sm:text-lg my-4">
                Consulta Tramites Registrados
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
          
        )}

      </CardHeader>

      <br />

      <CardContent className="overflow-x-auto">
        {Number(filterSearch) === 1 && (
          <DataTableReceipt data={dataReceipt} />
        )}

        {Number(filterSearch) === 2 && (
          <DataTableReceiptGrm data={dataReceiptBandejaRegister} onRefresh={refreshDocument} />
        )}
      </CardContent>
    </Card>
  );
};




