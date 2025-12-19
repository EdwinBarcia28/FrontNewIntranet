import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { DialogAcceptReceiptRegistration } from "./DialogAcceptReceiptRegistration";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { LimpiarSecuenciales, OficinaPrincipalRequest,registerIngresoRequest, secuencialDesdeRequest, secuencialHastaRequest } from "@/services/inventario";
import { useAuthStore } from "@/store/auth";
import { DialogRefreshProfile } from "./DialogRefreshProfile";


export const CardWithFormIngreso = () => {
  const { dataUser, token } = useAuthStore();

  useEffect(() => {
    const limpiarTablaLecturas = async () => {
      try {
        const response = await LimpiarSecuenciales(token);
        if (response?.error === 0) {
          console.log("Tabla de lecturas limpiada al cargar la página.");
        } else {
          console.warn("No se pudo limpiar la tabla:", response?.mensaje);
        }
      } catch (err) {
        console.error("Error al limpiar tabla de lecturas:", err);
      }
    };

    limpiarTablaLecturas();
  }, [token]);

  //const [loadingDespacho, setLoadingDespacho] = useState(false);
  const [IdOficinaDestino, setIdOficinaDestino] = useState("");
  const [oficinaDestino, setOficinaDestino] = useState("");
  const [stockDestino, setStockDestino] = useState("");
  const [secuencialDesde, setSecuencialDesde] = useState("");
  const [secuencialHasta, setSecuencialHasta] = useState("");
  const [descripcionIngreso, setDescripcionIngreso] = useState("");


  const handleClear = async () => {
    setSecuencialDesde("");
    setSecuencialHasta("");
    setDescripcionIngreso("");

    try {
      const response = await LimpiarSecuenciales(token);
      if (response?.error === 0) {
        toast.success("Tabla de lecturas limpiada correctamente");
      } else {
        toast.error(response?.mensaje || "No se pudo limpiar la tabla");
      }
    } catch (err) {
      toast.error("Error al limpiar lecturas",err);
    }
  };

  const handleDescripcionIngresoChange = (e) => {
    setDescripcionIngreso(e.target.value);
  }

  const fetchSecuencialDesde = useCallback(async (token) => {
    try {
      const responseSecuencial= await secuencialDesdeRequest(token);

      if (responseSecuencial == null) {
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
      } else if (responseSecuencial !== null) {
          // if (responseSecuencial.error == 1) {
          //     return toast.error(responseSecuencial.message, {
          //             position: "top-right",
          //             autoClose: 4000,
          //             hideProgressBar: false,
          //             closeOnClick: true,
          //             pauseOnHover: true,
          //             draggable: true,
          //             progress: undefined,
          //             theme: "dark",
          //     });
          // }else 
          if (responseSecuencial.error == 0) {
            setSecuencialDesde(responseSecuencial.secuencial);
          }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
    
  useEffect(() => {
    fetchSecuencialDesde();

    const interval = setInterval(() => {
      fetchSecuencialDesde();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchSecuencialDesde]);

  const fetchSecuencialHasta = useCallback(async (token) => {
    try {
      const responseSecuencial= await secuencialHastaRequest(token);

      if (responseSecuencial == null) {
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
      } else if (responseSecuencial !== null) {
          // if (responseSecuencial.error == 1) {
          //     return toast.error(responseSecuencial.message, {
          //             position: "top-right",
          //             autoClose: 4000,
          //             hideProgressBar: false,
          //             closeOnClick: true,
          //             pauseOnHover: true,
          //             draggable: true,
          //             progress: undefined,
          //             theme: "dark",
          //     });
          // }else 
          if (responseSecuencial.error == 0) {
            setSecuencialHasta(responseSecuencial.secuencial);
          }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
    
  useEffect(() => {
    fetchSecuencialHasta();

    const interval = setInterval(() => {
      fetchSecuencialHasta();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchSecuencialHasta]);

  const fetchOficinaPrincipal = useCallback(async (token) => {
    try {
      const responseOficina= await OficinaPrincipalRequest(token);

      if (responseOficina == null) {
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
      } else if (responseOficina !== null) {
          if (responseOficina.error == 0) {
            setIdOficinaDestino(responseOficina.oficina.id);
            setOficinaDestino(responseOficina.oficina.oficina);
            setStockDestino(responseOficina.oficina.stock); 
          }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
    
  useEffect(() => {
    fetchOficinaPrincipal();
  }, [fetchOficinaPrincipal]);


  const handleRegistrar = async () => {

    if(secuencialDesde === null || secuencialDesde === undefined || secuencialDesde === ""){
      return toast.error(
                "Pase por el lector el secuencial desde el cual se va a realizar el ingreso",
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

    if(secuencialHasta === null || secuencialHasta === undefined || secuencialHasta === ""){
      return toast.error(
                "Pase por el lector el secuencial (hasta) el cual se va a realizar el ingreso",
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

    if(descripcionIngreso === null || descripcionIngreso === undefined || descripcionIngreso === ""){
      return toast.error(
                "Debe ingresar una descripcion del ingreso que se va a realizar",
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


    if (Number(secuencialDesde) >= Number(secuencialHasta)) {
      return toast.error(
        "El secuencial 'Desde' no puede ser mayor o igual al secuencial 'Hasta'.",
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
  
    const requestIngreso = {
      IdOficina: IdOficinaDestino,
      CantidadDesde: Number(secuencialDesde) || 0,
      CantidadHasta: Number(secuencialHasta) || 0,
      Descripcion: descripcionIngreso || "",
      UsuarioCreacion: dataUser ? dataUser.nombreUsuario : "Desconocido",
      Correo: dataUser ? dataUser.email : "Desconocido",
    };

      try {
        const responseIngreso = await registerIngresoRequest(requestIngreso, token);
        if (responseIngreso === null || responseIngreso === undefined) {
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
        }else if (responseIngreso !== null || responseIngreso !== undefined) {
            if (responseIngreso.error === 1) {
                return toast.error(responseIngreso.mensaje, {
                      position: "top-right",
                      autoClose: 4000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                });
            }else if (responseIngreso.error === 0) {
                handleClear();
                return toast.success(responseIngreso.mensaje, {
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
      } catch (error) {
        console.error("Error al registrar comprobante:", error);
      }
    }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingreso de stock inicial</CardTitle>
        <CardDescription>
          En esta opción se puede gestionar el ingreso de stock inicial de cedulas a la oficina principal de la corporacion .
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end mb-4">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="numeroDocumento">Oficina de Destino de inventario</Label>
            <Input 
              id="numeroDocumento" 
              placeholder="Ingrese número de documento"
              value={oficinaDestino}
              onChange={(e) => setOficinaDestino(e.target.value)} 
              disabled />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nombreCiudadano">Stock de oficina de destino de inventario</Label>
            <Input 
              id="nombreCiudadano" 
              placeholder="Ingrese nombre del ciudadano"
              value={stockDestino} 
              onChange={(e) => setStockDestino(e.target.value)} 
              disabled />
          </div>

          {/* <div className="flex items-end">
            <DialogSearchOficinaDestino onSelectOficina={handleSeleccionOficinaDestino} valor={false} />
          </div> */}
        </div>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end mb-4">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="numeroDocumento">Secuencial Desde</Label>
            <Input 
              id="numeroDocumento" 
              placeholder="Pase la cedula por el lector"
              value={secuencialDesde} 
              disabled />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nombreCiudadano">Secuencial Hasta</Label>
            <Input 
              id="nombreCiudadano" 
              placeholder="Pase la cedula por el lector"
              value={secuencialHasta} 
              disabled />
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] items-end">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="descripcionIngreso">Descripción de Ingresos</Label>
            <Textarea
              id="descripcionIngreso"
              placeholder="Ingrese descripción de ingreso"
              value={descripcionIngreso}
              onChange={handleDescripcionIngresoChange}
              className="h-[44px] resize-none"
            />
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <DialogRefreshProfile onClear={handleClear} />
            <DialogAcceptReceiptRegistration  onAccept={handleRegistrar} />
          </div>
        </div> 
      </CardContent>
    </Card>
  );
};
