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
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OficinaInventarioRequest, searchOficinaInventarioRequest } from "@/services/inventario";
import { useAuthStore } from "@/store/auth";
import { DataTableOficina } from "./DataTableOficina";

export function DialogSearchOficinaSalida({onSelectOficina}) {
  const { token } = useAuthStore();

  const [oficinas, setOficinas] = useState([]);
  const [filterOficina, setFilterOficina] = useState("1");
  const [searchOficina, setSearchOficina] = useState("");
  const [loadingOficina, setLoadingOficina] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFilterOficina = (event) => {
    setFilterOficina(event);
  };

  const handleChangeSearchOficina = (event) => {
    let value = event.target.value;
    setSearchOficina(value);
  };

  const fetchDataOffice = useCallback(async (token) => {
    try {
      const responseOffice = await OficinaInventarioRequest(token);
      console.log(responseOffice);  
      if (responseOffice == null) {
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
        } else if (responseOffice !== null) {
          if (responseOffice.error == 1) {
            return toast.error(responseOffice.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
            });
          } else if (responseOffice.error == 0) {
            setOficinas(responseOffice.oficinas);
          }
        }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  
  useEffect(() => {
    fetchDataOffice();
  }, [fetchDataOffice]);

  const handleBuscar = async (event) => {
      event.preventDefault();
      setLoadingOficina(true);
      
      if(searchOficina === null || searchOficina === undefined || searchOficina === ""){
        setLoadingOficina(false);
        return toast.error(
            "Debe ingresar un parametro de busqueda",
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
      }
  
      const responseOficina = await searchOficinaInventarioRequest(searchOficina,token);
  
        if (responseOficina === null || responseOficina === undefined) {
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
        }else if (responseOficina !== null || responseOficina !== undefined) {
          if (responseOficina.error === 1) {
            setLoadingOficina(false);
            return toast.error(responseOficina.message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else if (responseOficina.error === 0) {
            setOficinas(responseOficina.oficinas);
            setLoadingOficina(false);
            return toast.success(responseOficina.message, {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button  >
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-full sm:max-w-[1200px] px-4 py-6 overflow-y-auto max-h-[90vh] sm:max-h-[100vh]">
        <AlertDialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
            Buscar Oficina
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center sm:text-left">
            Ingrese el parametro de Busqueda y Filtre la oficina.
          </DialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="filterOficina">Criterio de Busqueda</Label>
            <Select
              id="filterOficina"
              name="filterOficina"
              value={filterOficina}
              onValueChange={handleFilterOficina}
            >
              <SelectTrigger id="filterOficina" name="filterOficina">
                <SelectValue placeholder="Seleccione un de Filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Nombre Oficina</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="searchMadre">Buscar</Label>
            <Input
              id="searchMadre"
              name="searchMadre"
              value={searchOficina}
              onChange={handleChangeSearchOficina}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleBuscar}
              disabled={loadingOficina}
            >
              {loadingOficina? 
                <Loader className="animate-spin" /> 
                : 
                <Search />
              } 
            </Button>
          </div>
        </div>
        <DataTableOficina dataOficina={oficinas} onSelectOficina={(office) => { onSelectOficina(office); setOpen(false); }} />  
      </DialogContent>
    </Dialog>
  );
}