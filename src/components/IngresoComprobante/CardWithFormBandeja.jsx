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
import { DataTableReceiptBolivariano } from "./DataTableReceiptBolivariano";
import { searchComprobanteBanco } from "@/services/comprobantes";

export const CardWithFormBandeja = () => {
  
  const { token } = useAuthStore();
  const [loadingReceipt, setLoadingReceipt] = useState(false);
  const [dataReceipt, setDataReceipt] = useState([]);
  //const [searchReceipt, setSearchReceipt] = useState("");
  const [searchIdentificacion, setSearchIdentificacion] = useState("");


//   const handleChangeSearchReceipt = (event) => {
//     let value = event.target.value;
//     value = value.replace(/\D/g, "");
//     value = value.slice(0, 8);
//     setSearchReceipt(value);
//   };

  const handleChangeSearchIdentification= (event) => {
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

    // if (searchReceipt.length > 8) {
    //   setDataReceipt([]);
    //   return toast.error("El numero de comprobante debe tener máximo 8 caracteres.", {
    //     position: "top-right",
    //     autoClose: 4000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // }
    setLoadingReceipt(true);

    const requestComprobante = {
      Cedula: searchIdentificacion?.toString() || ""
    };

    const responseReceipt = await searchComprobanteBanco(requestComprobante,token)

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
            setDataReceipt(responseReceipt.comprobantes);
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
        <CardTitle>Consulta de Comprobantes de Banco Bolivariano o Transferencias</CardTitle>
        <CardDescription>
          En esta opción podra consultar los comprobantes registrados de la banca virtual de banco bolivariano o transferencias.
        </CardDescription>

        <br/>
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

      
          {/* <div className="md:col-span-3 flex flex-col space-y-1.5">
            <Label htmlFor="searchReceipt">Numero Comprobante</Label>
            <Input
              id="searchReceipt"
              name="searchReceipt"
              value={searchReceipt}
              onChange={handleChangeSearchReceipt}
              className="w-full"
            />
          </div> */}

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
        <DataTableReceiptBolivariano data={dataReceipt} />
      </CardContent>
    </Card>
  );
};




