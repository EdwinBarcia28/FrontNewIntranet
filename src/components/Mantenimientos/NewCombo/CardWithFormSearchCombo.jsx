import {  useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import { DataTableReceipt } from "./DataTableReceipt";
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
import { searchComboRequest, tipoComboRequest } from "@/services/medianet";
import { DataTableCombos } from "./DataTableCombos";

export const CardWithFormSearchCombo = () => {
  
  const { token } = useAuthStore();


  const [loadingReceipt, setLoadingReceipt] = useState(false);
  const [dataReceiptBandeja, setDataReceiptBandeja] = useState([]);

  const [nombreCombo, setNombreCombo] = useState("");


  const [dataTipoCombo, setDataTipoCombo] = useState([]);
  const [tipoCombo, setTipoCombo] = useState("0");



  const handleTipoComboChange = (value) => {
    setTipoCombo(value);
  };

  const handleNombreChange = (event) => {
      setNombreCombo(event.target.value); 
   };

  const fetchTipoCombo = useCallback(async (token) => {
        try {
          const responseTipo = await tipoComboRequest(token);
          if (responseTipo == null) {
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
          } else if (responseTipo !== null) {
            if (responseTipo.error == 1) {
              return toast.error(responseTipo.message, {
                      position: "top-right",
                      autoClose: 4000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
              });
            } else if (responseTipo.error == 0) {
              setDataTipoCombo(responseTipo.tipoCombos);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
  }, []);
  
    useEffect(() => {
        fetchTipoCombo(token);
    }, [fetchTipoCombo,token]);
  

  const handleBuscar = async (event) => {
    event.preventDefault();
    setLoadingReceipt(true);

    const requestCombo = {
      Tipo: Number(tipoCombo),
      Nombre: nombreCombo?.toString() || "" 
    };

    const responseCombo = await searchComboRequest(requestCombo,token)

      if (responseCombo === null || responseCombo === undefined) {
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
      }else if (responseCombo !== null || responseCombo !== undefined) {
        if (responseCombo.error === 1) {
            setLoadingReceipt(false);
            return toast.error(responseCombo.mensaje, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
        }else if (responseCombo.error === 0) {
            setDataReceiptBandeja(responseCombo.combos);
            setLoadingReceipt(false);
            return toast.success(responseCombo.mensaje, {
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

  const refreshCombos = async () => {
    await handleBuscar(new Event("refresh")); // simula la búsqueda
  };


  return (
    <Card className="w-full px-4 md:px-10 max-w-[1400px] mx-auto">
      <CardHeader>
        <CardTitle>Consulta de Combos Registrados </CardTitle>
        <CardDescription>
          En esta opción podra consultar los combos registrados.
        </CardDescription>

        <br/>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-3 flex flex-col space-y-1.5">
            <Label htmlFor="tipoCombo">Tipo de Combo</Label>
            <Select onValueChange={handleTipoComboChange} value={tipoCombo}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione Tipo de Combo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="0" value="0">TODOS
                  </SelectItem>
                {dataTipoCombo.map((element) => (
                  <SelectItem key={element.id} value={`${element.id}`}>
                    {element.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

      
          <div className="md:col-span-3 flex flex-col space-y-1.5">
            <Label htmlFor="searchReceipt">Nombre de Combo</Label>
            <Input
              id="searchReceipt"
              name="searchReceipt"
              value={nombreCombo}
              onChange={handleNombreChange}
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
        <DataTableCombos data={dataReceiptBandeja} onRefresh={refreshCombos} />
      </CardContent>
    </Card>
  );
};
