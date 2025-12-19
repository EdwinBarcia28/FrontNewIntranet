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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader, Search } from "lucide-react";
import { DataTableSearchDespacho } from "./DataTableSearchDespacho";
import { searchDespachoRequest } from "@/services/inventario";
import { DialogSearchOficinaDestino } from "./DialogSearchOficinaDestino";


export const CardWithFormSearchDespacho = () => {

  const { token } = useAuthStore();

  const [filterDespacho, setFilterDespacho] = useState("0");
  const [searchDespacho, setSearchDespacho] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [loadingDespacho, setLoadingDespacho] = useState(false);
  const [dataSearchDespacho, setDataSearchDespacho] = useState([]);
  
  const [IdOficinaDestino, setIdOficinaDestino] = useState("");
  const [oficinaDestino, setOficinaDestino] = useState("");


  // const handleFilterDespacho = (event) => {
  //   setDataSearchDespacho([]);
  //   setSearchDespacho("");
  //   setFilterDespacho(event);
  // };

  const handleFilterDespacho = (event) => {
    setFilterDespacho(event);
    setSearchDespacho("");
    setFechaDesde("");
    setFechaHasta("");
    setIdOficinaDestino("");
    setOficinaDestino("");
  };


  const handleChangeSearchDespacho = (event) => {
    let value = event.target.value;

    if (Number(filterDespacho) === 1) {
      value = value.replace(/[^a-zA-Z0-9\s]/g, "");
    } else if (Number(filterDespacho) === 2) {
      value = value.replace(/\D/g, "");
      value = value.slice(0, 10);
    }

    setSearchDespacho(value);
  };

  // const handleChangeSearchDespacho = (event) => {
  //   let value = event.target.value;

  //   if (Number(filterDespacho) === 1) {
  //     value = value.replace(/[^a-zA-Z0-9\s]/g, "");
  //   } else if (Number(filterDespacho) === 2) {
  //     value = value.replace(/\D/g, "");
  //     value = value.slice(0, 10);
  //   }

  //   setSearchDespacho(value);
  // };

  const handleSeleccionOficinaDestino = (office) => {
    setIdOficinaDestino(office.id);
    setOficinaDestino(office.oficina);
  };



  const handleBuscar = async (event) => {
    event.preventDefault();

    if (Number(filterDespacho) === 1) {
      if (!searchDespacho.trim()) {
        return toast.error("Debe ingresar un motivo para buscar");
      }
    } else if (Number(filterDespacho) === 2) {
      if (!fechaDesde || !fechaHasta) {
        return toast.error("Debe seleccionar un rango de fechas válido");
      }
    }
    setLoadingDespacho(true);

    const resquestDespacho = {
      filtro: Number(filterDespacho),
      valor: Number(filterDespacho) === 1 ? searchDespacho : null,
      fechaDesde: Number(filterDespacho) === 2 ? fechaDesde : null,
      fechaHasta: Number(filterDespacho) === 2 ? fechaHasta : null,
      idOficina: Number(filterDespacho) === 3 ? Number(IdOficinaDestino) : null
    };

    const responseDespacho = await searchDespachoRequest(resquestDespacho, token)

    if (responseDespacho === null || responseDespacho === undefined) {
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
    } else if (responseDespacho !== null || responseDespacho !== undefined) {
      if (responseDespacho.error === 1) {
        setLoadingDespacho(false);
        return toast.error(responseDespacho.mensaje, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (responseDespacho.error === 0) {
        setDataSearchDespacho(responseDespacho.despachos);
        setLoadingDespacho(false);
        return toast.success(responseDespacho.mensaje, {
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

  const refreshDocument = async () => {
    await handleBuscar(new Event("refresh")); // simula la búsqueda
  };

  return (
    <Card className="w-full px-4 md:px-10 max-w-[1400px] mx-auto">
      <CardHeader>
        <CardTitle>Consulta de Despachos a Oficinas</CardTitle>
        <CardDescription>
          En esta opción podra consultar los despachos registrados a las distintas oficinas por el bodega , aqui se podra filtrar por el criterio de busqueda.
        </CardDescription>

        <br />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-3 flex flex-col space-y-1.5">
            <Label htmlFor="filterDespacho">Criterio de Búsqueda</Label>
            <Select
              id="filterDespacho"
              name="filterDespacho"
              value={filterDespacho}
              onValueChange={handleFilterDespacho}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un Filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Todos</SelectItem>
                <SelectItem value="1">Motivo de despacho</SelectItem>
                <SelectItem value="2">Rango de fechas</SelectItem>
                <SelectItem value="3">Oficina de destino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Columna: buscador (texto o rango de fechas) */}
          <div className="md:col-span-7 flex flex-col space-y-1.5">


            {Number(filterDespacho) === 1 && (
              <>
                <Label>Buscar</Label>
                <Input
                  id="searchReceipt"
                  name="searchReceipt"
                  value={searchDespacho}
                  onChange={handleChangeSearchDespacho}
                  className="w-full"
                />
              </>

            )}

            {Number(filterDespacho) === 2 && (
              <div className="flex gap-4">

                <div className="flex flex-col space-y-1.5 flex-1 min-w-[180px]">
                  <Label>Fecha Desde</Label>
                  <Input
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-1.5 flex-1 min-w-[180px]">
                  <Label>Fecha Hasta</Label>
                  <Input
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                  />
                </div>

              </div>
            )}

            {Number(filterDespacho) === 0 && (
              <p className="text-sm text-gray-500 italic mt-2">
                Se mostrarán todas las solicitudes registradas por el usuario.
              </p>
            )}

            {Number(filterDespacho) === 3 && (
              <div className="flex gap-4">
                <div className="flex flex-col space-y-1.5 flex-5">
                  <Label htmlFor="oficinaPedido">Oficina de pedido de inventario</Label>
                  <Input
                    id="oficinaPedido"
                    placeholder="Ingrese oficina de pedido"
                    value={oficinaDestino}
                    disabled
                  />
                </div>

                <div className="flex items-end">
                  <DialogSearchOficinaDestino onSelectOficina={handleSeleccionOficinaDestino} valor={false} />
                </div>
              </div>
            )}

          </div>

          {/* Columna: botón buscar (separado y alineado abajo) */}
          <div className="md:col-span-2 flex md:justify-start justify-end">
            <Button
              onClick={handleBuscar}
              className="w-full md:w-auto px-6"
              title="Buscar"
            >
              {loadingDespacho ? <Loader className="animate-spin" /> : <Search />}
            </Button>
          </div>
        </div>

      </CardHeader>

      <CardContent className="overflow-x-auto mt-2">
        <DataTableSearchDespacho data={dataSearchDespacho} onRefresh={refreshDocument} />
      </CardContent>
    </Card>
  );
};


