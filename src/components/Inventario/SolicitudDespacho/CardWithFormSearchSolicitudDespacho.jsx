import { useCallback, useEffect, useState } from "react";
//import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import { useAuthStore } from "@/store/auth";
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
import { toast } from "react-toastify";
import { searchSolicitudDespachoRequest, solicitudDespachoRequest } from "@/services/inventario";
import { useAuthStore } from "@/store/auth";
import { DataTableSearchSolicitudDespacho } from "./DataTableSearchSolicitudDespacho";


export const CardWithFormSearchSolicitudDespacho = () => {

  const { token, dataUser } = useAuthStore();
  const [filterSolicitudDespacho, setFilterSolicitudDespacho] = useState("0");
  const [searchSolicitudDespacho, setSearchSolicitudDespacho] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [dataSolicitudDespacho, setDataSolicitudDespacho] = useState([]);
  const [loadingSolicitudDespacho, setLoadingSolicitudDespacho] = useState(false);

  const fetchDataSolicitud = useCallback(async () => {
    try {
      const responseSolicitud = await solicitudDespachoRequest(token, dataUser ? dataUser.nombreUsuario : "Desconocido");

      if (!responseSolicitud) {
        return toast.error("Comunicacion con el Servidor , se dio de forma interrumpida");
      }

      if (responseSolicitud.error === 1) {
        return toast.error(responseSolicitud.message);
      }

      if (responseSolicitud.error === 0) {
        setDataSolicitudDespacho(responseSolicitud.solicitudes);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [token, dataUser]);

  useEffect(() => {
    fetchDataSolicitud();
  }, [fetchDataSolicitud]);


  const handleFilterSolicitudDespacho = (event) => {
    setFilterSolicitudDespacho(event);
    setSearchSolicitudDespacho("");
    setFechaDesde("");
    setFechaHasta("");
  };

  const handleChangeSearchSolicitudDespacho = (event) => {
    let value = event.target.value;

    if (Number(filterSolicitudDespacho) === 1) {
      value = value.replace(/[^a-zA-Z0-9\s]/g, "");
    } else if (Number(filterSolicitudDespacho) === 2) {
      value = value.replace(/\D/g, "");
      value = value.slice(0, 10);
    }

    setSearchSolicitudDespacho(value);
  };



  const handleBuscar = async (event) => {
    event.preventDefault();

    if (Number(filterSolicitudDespacho) === 1) {
      if (!searchSolicitudDespacho.trim()) {
        return toast.error("Debe ingresar un motivo para buscar");
      }
    } else if (Number(filterSolicitudDespacho) === 2) {
      if (!fechaDesde || !fechaHasta) {
        return toast.error("Debe seleccionar un rango de fechas válido");
      }
    }

    setLoadingSolicitudDespacho(true);

    const request = {
      filtro: Number(filterSolicitudDespacho),
      valor: Number(filterSolicitudDespacho) === 1 ? searchSolicitudDespacho : null,
      fechaDesde: Number(filterSolicitudDespacho) === 2 ? fechaDesde : null,
      fechaHasta: Number(filterSolicitudDespacho) === 2 ? fechaHasta : null,
      usuario: dataUser?.nombreUsuario ?? "Desconocido",
    };

    try {
      const response = await searchSolicitudDespachoRequest(request, token);

      if (!response) {
        toast.error("No se pudo comunicar con el servidor");
      } else if (response.error === 0) {
        setDataSolicitudDespacho(response.solicitudes);
        toast.success(response.mensaje);
      } else {
        setDataSolicitudDespacho([]);
        toast.error(response.mensaje);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al procesar la búsqueda");
    } finally {
      setLoadingSolicitudDespacho(false);
    }
  };


  const refreshSolicitud = async () => {
    await handleBuscar(new Event("refresh"));
  };

  return (
    <Card className="w-full px-4 md:px-10 max-w-[1400px] mx-auto">
      <CardHeader>
        <CardTitle>Consulta de solicitud de despacho</CardTitle>
        <CardDescription>
          En esta opción podra consultar los solicitudes de despacho registradas, aqui se podra filtrar por el criterio de busqueda.
        </CardDescription>

        <br />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-3 flex flex-col space-y-1.5">
            <Label htmlFor="filterSolicitudDespacho">Criterio de Búsqueda</Label>
            <Select
              id="filterSolicitudDespacho"
              name="filterSolicitudDespacho"
              value={filterSolicitudDespacho}
              onValueChange={handleFilterSolicitudDespacho}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un Filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Todos</SelectItem>
                <SelectItem value="1">Motivo de Despacho</SelectItem>
                <SelectItem value="2">Rango de Fechas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Columna: buscador (texto o rango de fechas) */}
          <div className="md:col-span-7 flex flex-col space-y-1.5">


            {Number(filterSolicitudDespacho) === 1 && (
              <>
                <Label>Buscar</Label>
                <Input
                  id="searchReceipt"
                  name="searchReceipt"
                  value={searchSolicitudDespacho}
                  onChange={handleChangeSearchSolicitudDespacho}
                  className="w-full"
                />
              </>

            )}

            {Number(filterSolicitudDespacho) === 2 && (
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

            {Number(filterSolicitudDespacho) === 0 && (
              <p className="text-sm text-gray-500 italic mt-2">
                Se mostrarán todas las solicitudes registradas por el usuario.
              </p>
            )}

          </div>

          {/* Columna: botón buscar (separado y alineado abajo) */}
          <div className="md:col-span-2 flex md:justify-start justify-end">
            <Button
              onClick={handleBuscar}
              className="w-full md:w-auto px-6"
              title="Buscar"
            >
              {loadingSolicitudDespacho ? <Loader className="animate-spin" /> : <Search />}
            </Button>
          </div>
        </div>


      </CardHeader>

      <CardContent className="overflow-x-auto mt-2">
        <DataTableSearchSolicitudDespacho data={dataSolicitudDespacho} onRefresh={refreshSolicitud} />
        {/* <DataTableSearchDespacho data={dataSearchSolicitudDespacho} onRefresh={refreshDocument} /> */}
      </CardContent>
    </Card>
  );
};


