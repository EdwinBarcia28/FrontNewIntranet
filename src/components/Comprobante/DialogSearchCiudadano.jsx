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
import { searchCiudadanoRequest } from "@/services/comprobantes";
import { DataTableCiudadano } from "./DataTableCiudadano";
//import { infoDeclaranteRequest, searchDeclaranteRequest } from "@/services/Declarante";
//import { DataTableDeclarante } from "./DataTableDeclarante";

export function DialogSearchCiudadano({  onSelectCiudadano}) {
  const { token } = useAuthStore();


  const [loadingCiudadano, setLoadingCiudadano] = useState(false);
  const [dataCiudadano, setDataCiudadano] = useState([]);
  const [filterCiudadano, setFilterCiudadano] = useState("1");
  const [searchCiudadano, setSearchCiudadano] = useState("");


  const handleFilterCiudadano = (event) => {
    setFilterCiudadano(event);
  };

  const handleChangeSearchCiudadano = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 10);
    setSearchCiudadano(value);
  };


  const handleBuscar = async (event) => {
    event.preventDefault();
    setLoadingCiudadano(true);
    
    if(searchCiudadano === null || searchCiudadano === undefined || searchCiudadano === ""){
      setLoadingCiudadano(false);
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
    }

    const responseCiudadano = await searchCiudadanoRequest(searchCiudadano,token);

      if (responseCiudadano === null || responseCiudadano === undefined) {
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
      }else if (responseCiudadano !== null || responseCiudadano !== undefined) {
        if (responseCiudadano.error === 1) {
          setLoadingCiudadano(false);
          return toast.error(responseCiudadano.message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (responseCiudadano.error === 0) {
          setDataCiudadano(responseCiudadano.ciudadanos);
          setLoadingCiudadano(false);
          return toast.success(responseCiudadano.message, {
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
        <Button  >
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-full sm:max-w-[1200px] px-4 py-6 overflow-y-auto max-h-[90vh] sm:max-h-[100vh]">
        <AlertDialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
            Buscar Ciudadano
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center sm:text-left">
            Ingrese el parametro de Busqueda y Filtre el Ciudadano.
          </DialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="filterDeclarante">Criterio de Busqueda</Label>
            <Select
              id="filterDeclarante"
              name="filterDeclarante"
              value={filterCiudadano}
              onValueChange={handleFilterCiudadano}
            >
              <SelectTrigger id="filterDeclarante" name="filterDeclarante">
                <SelectValue placeholder="Seleccione un de Filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Identificacion</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="searchMadre">Buscar</Label>
            <Input
              id="searchMadre"
              name="searchMadre"
              value={searchCiudadano}
              onChange={handleChangeSearchCiudadano}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleBuscar}
              disabled={loadingCiudadano}
            >
              {loadingCiudadano? 
                <Loader className="animate-spin" /> 
                : 
                <Search />
              } 
            </Button>
          </div>
        </div>
        <DataTableCiudadano data={dataCiudadano}
                onSelectCiudadano={(ciudadano) => {
                  onSelectCiudadano(ciudadano);
                  setOpen(false);
                }} />
      </DialogContent>
    </Dialog>
  );
}