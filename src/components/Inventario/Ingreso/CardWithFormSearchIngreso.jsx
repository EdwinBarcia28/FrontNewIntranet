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
import { searchIngresoStockRequest, solicitudDespachoRequest } from "@/services/inventario";
import { useAuthStore } from "@/store/auth";
import { DataTablesearchIngresoStock } from "./DataTablesearchIngresoStock";


export const CardWithFormSearchIngreso = () => {

  const { token, dataUser } = useAuthStore();
  const [filterIngresoStock, setFilterIngresoStock] = useState("0");
  const [searchIngresoStock, setSearchIngresoStock] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [dataIngresoStock, setDataIngresoStock] = useState([]);
  const [loadingIngresoStock, setloadingIngresoStock] = useState(false);

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
        setDataIngresoStock(responseSolicitud.solicitudes);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [token, dataUser]);

  useEffect(() => {
    fetchDataSolicitud();
  }, [fetchDataSolicitud]);


  const handlefilterIngresoStock = (event) => {
    setFilterIngresoStock(event);
    setSearchIngresoStock("");
    setFechaDesde("");
    setFechaHasta("");
  };

  const handleChangesearchIngresoStock = (event) => {
    let value = event.target.value;

    if (Number(filterIngresoStock) === 1) {
      value = value.replace(/[^a-zA-Z0-9\s]/g, "");
    } else if (Number(filterIngresoStock) === 2) {
      value = value.replace(/\D/g, "");
      value = value.slice(0, 10);
    }

    setSearchIngresoStock(value);
  };



  const handleBuscar = async (event) => {
    event.preventDefault();

    if (Number(filterIngresoStock) === 1) {
      if (!searchIngresoStock.trim()) {
        return toast.error("Debe ingresar un motivo para buscar");
      }
    } else if (Number(filterIngresoStock) === 2) {
      if (!fechaDesde || !fechaHasta) {
        return toast.error("Debe seleccionar un rango de fechas válido");
      }
    }

    setloadingIngresoStock(true);

    const request = {
      filtro: Number(filterIngresoStock),
      valor: Number(filterIngresoStock) === 1 ? searchIngresoStock : null,
      fechaDesde: Number(filterIngresoStock) === 2 ? fechaDesde : null,
      fechaHasta: Number(filterIngresoStock) === 2 ? fechaHasta : null,
      usuario: dataUser?.nombreUsuario ?? "Desconocido",
    };

    try {
      const response = await searchIngresoStockRequest(request, token);

      if (!response) {
        toast.error("No se pudo comunicar con el servidor");
      } else if (response.error === 0) {
        setDataIngresoStock(response.solicitudes);
        toast.success(response.mensaje);
      } else {
        setDataIngresoStock([]);
        toast.error(response.mensaje);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al procesar la búsqueda");
    } finally {
      setloadingIngresoStock(false);
    }
  };


  const refreshSolicitud = async () => {
    await handleBuscar(new Event("refresh"));
  };

  return (
    <Card className="w-full px-4 md:px-10 max-w-[1400px] mx-auto">
      <CardHeader>
        <CardTitle>Consulta de ingreso de stock</CardTitle>
        <CardDescription>
          En esta opción podra consultar los ingresos iniciales de stock registradas, aqui se podra filtrar por el criterio de busqueda.
        </CardDescription>

        <br />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-3 flex flex-col space-y-1.5">
            <Label htmlFor="filterSolicitudIngreso">Criterio de Búsqueda</Label>
            <Select
              id="filterSolicitudIngreso"
              name="filterSolicitudIngreso"
              value={filterIngresoStock}
              onValueChange={handlefilterIngresoStock}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un Filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Todos</SelectItem>
                <SelectItem value="1">Motivo de Ingreso</SelectItem>
                <SelectItem value="2">Rango de Fechas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Columna: buscador (texto o rango de fechas) */}
          <div className="md:col-span-7 flex flex-col space-y-1.5">


            {Number(filterIngresoStock) === 1 && (
              <>
                <Label>Buscar</Label>
                <Input
                  id="searchReceipt"
                  name="searchReceipt"
                  value={searchIngresoStock}
                  onChange={handleChangesearchIngresoStock}
                  className="w-full"
                />
              </>

            )}

            {Number(filterIngresoStock) === 2 && (
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

            {Number(filterIngresoStock) === 0 && (
              <p className="text-sm text-gray-500 italic mt-2">
                Se mostrarán todas los ingresos registrados por el usuario.
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
              {loadingIngresoStock ? <Loader className="animate-spin" /> : <Search />}
            </Button>
          </div>
        </div>


      </CardHeader>

      <CardContent className="overflow-x-auto mt-2">
        <DataTablesearchIngresoStock data={dataIngresoStock} onRefresh={refreshSolicitud} />
        {/* <DataTableSearchDespacho data={datasearchIngresoStock} onRefresh={refreshDocument} /> */}
      </CardContent>
    </Card>
  );
};


