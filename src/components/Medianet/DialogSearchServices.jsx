import {  Loader, Search } from "lucide-react";
import { AlertDialogHeader } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import {  searchServiceRequest, serviceRequest } from "@/services/comprobantes";
import { DataTableServicio } from "./DataTableServicio";
//import { infoDeclaranteRequest, searchDeclaranteRequest } from "@/services/Declarante";
//import { DataTableDeclarante } from "./DataTableDeclarante";

export function DialogSearchServices({onSelectServicio}) {
  const { token } = useAuthStore();


  const [loadingServicio, setLoadingServicio] = useState(false);
  const [dataServicio, setDataServicio] = useState([]);
  const [filterServicio, setFilterServicio] = useState("1");
  const [searchServicio, setSearchServicio] = useState("");


  const handleFilterServicio = (event) => {
    setFilterServicio(event);
  };

  const handleChangeSearchServicio = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 10);
    setSearchServicio(value);
  };


  const handleBuscar = async (event) => {
      event.preventDefault();
      setLoadingServicio(true);

      const services = {
        Opcion: filterServicio,
        Filtro: searchServicio,
      };

      const responseServicio = await searchServiceRequest(services, token);

      if (searchServicio === null || searchServicio === "" || searchServicio === undefined) {
        const responseService = await serviceRequest(token);
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
                  setDataServicio(responseService.servicios);
                }
              }
      }

      if (responseServicio === null || responseServicio === undefined) {
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
      }else if (responseServicio !== null || responseServicio !== undefined) {
        if (responseServicio.error === 1) {
          setLoadingServicio(false);
          return toast.error(responseServicio.message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (responseServicio.error === 0) {
          setDataServicio(responseServicio.servicios);
          setLoadingServicio(false);
          return toast.success(responseServicio.message, {
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
  
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button >
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-full sm:max-w-[1200px] px-4 py-6 overflow-y-auto max-h-[90vh] sm:max-h-[100vh]">
        <AlertDialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
            Buscar Servicio
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center sm:text-left">
            Ingrese el parametro de Busqueda y Filtre el Servicio.
          </DialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="filterDeclarante">Criterio de Busqueda</Label>
            <Select
              id="filterDeclarante"
              name="filterDeclarante"
              value={filterServicio}
              onValueChange={handleFilterServicio}
            >
              <SelectTrigger id="filterDeclarante" name="filterDeclarante">
                <SelectValue placeholder="Seleccione un de Filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Codigo</SelectItem>
                <SelectItem value="2">Nombre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="searchMadre">Buscar</Label>
            <Input
              id="searchMadre"
              name="searchMadre"
              value={searchServicio}
              onChange={handleChangeSearchServicio}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleBuscar}
              disabled={loadingServicio}
            >
              {loadingServicio? 
                <Loader className="animate-spin" /> 
                : 
                <Search />
              } 
            </Button>
          </div>
        </div>
        <DataTableServicio data={dataServicio}
                onSelectServicio={(servicio) => {
                  onSelectServicio(servicio);
                  setOpen(false);
                }} />
      </DialogContent>
    </Dialog>
  );
}