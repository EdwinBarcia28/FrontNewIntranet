import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogSearchCiudadano } from "./DialogSearchCiudadano";
import { useState } from "react";
import { DialogRefreshProfile } from "./DialogRefreshProfile";
import { DialogAcceptReceiptRegistration } from "./DialogAcceptReceiptRegistration";
import { DialogSearchServices } from "./DialogSearchServices";
import { useAuthStore } from "@/store/auth";
import { registerComprobanteBolivariano } from "@/services/comprobantes";
import { toast } from "react-toastify";


export const CardWithFormMedianet = () => {
  const { dataUser, selectEstablishments , token } = useAuthStore();

  const [loadingReceipt, setLoadingReceipt] = useState(false);
  //const [dataReceipt, setDataReceipt] = useState([]);
  const [secuencial, setSecuencial] = useState("");
  const [tipo, setTipo] = useState("cargar");
  const [validacion, setValidacion] = useState(true);
  const [identidad, setIdentidad] = useState("");
  const [ciudadano, setCiudadano] = useState("");
  const [idServicio, setIdServicio] = useState("");
  const [codigo, setCodigo] = useState("");
  const [servicio, setServicio] = useState("");
  const [valor, setValor] = useState("");

  const handleChangeSecuencial = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 16);
    setSecuencial(value);
  };

  const handleTipoChange = (value) => {
    setTipo(value);
    if (value === "cargar") {
      setTipo("cargar");
      setValidacion(true);
    } else {
      setTipo("textual");
      setValidacion(false);
    }
  };

  const handleSeleccionCiudadano = (ciudadano) => {
    setIdentidad(ciudadano.identificacion);
    setCiudadano(ciudadano.ciudadano);
  };


  const handleSeleccionServicio = (servicio) => {
    setCodigo(servicio.codigo);
    setServicio(servicio.nombre);
    setValor(servicio.valor);
    setIdServicio(servicio.idServicio);
  };

  const botonDesactivados = tipo === "cargar" ? false : true;

  const handleClear = () => {
    setSecuencial("");
    setTipo("cargar");
    setValidacion(true);
    setIdentidad("");
    setCiudadano("");
    setCodigo("");
    setServicio("");
    setValor("");
  };

  const handleBuscar = async (event) => {
    event.preventDefault();

    const requestComprobante = {
      Secuencial: secuencial,
      NumeroDocumento: identidad || "",
      Ciudadano: ciudadano || "",
      IdServicio: Number(idServicio) || 0,
      Codigo: codigo || "",
      Servicio: servicio || "",
      Valor: Number(valor) || 0.0,
      Oficina: selectEstablishments || "",
      Usuario: dataUser ? dataUser.nombreUsuario : "Desconocido",
    };

    setLoadingReceipt(true);

    try {
      const responseReceipt = await registerComprobanteBolivariano(requestComprobante, token);
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
              setLoadingReceipt(false);
              handleClear();
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
    } catch (error) {
      console.error("Error al registrar comprobante:", error);
    }
  }

    

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Comprobantes</CardTitle>
        <CardDescription>
          En esta opción se puede registrar la información del comprobantes por transferencias o banco bolivariano.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="secuencial">Secuencial Bolivariano</Label>
            <Input
              id="secuencial"
              className="w-full"
              placeholder="Ingrese número secuencial"
              value={secuencial}
              onChange={handleChangeSecuencial}
            />
          </div>

    
          <div className="h-10 flex items-center">
            <RadioGroup
              name="typeIdentificationClient"
              value={tipo}
              onValueChange={handleTipoChange}
              className="flex items-center gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cargar" id="cargarClient2" />
                <Label htmlFor="cargarClient2" className="leading-none">Cargar</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="textual" id="textualClient2" />
                <Label htmlFor="textualClient2" className="leading-none">Textual</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="hidden md:block" />

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="numeroDocumento">Número de Documento</Label>
            <Input 
              id="numeroDocumento" 
              placeholder="Ingrese número de documento"
              value={identidad} 
              disabled={validacion} />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nombreCiudadano">Nombre del Ciudadano</Label>
            <Input 
              id="nombreCiudadano" 
              placeholder="Ingrese nombre del ciudadano"
              value={ciudadano} 
              disabled={validacion} />
          </div>

          <div className="flex items-end">
            <DialogSearchCiudadano valor={botonDesactivados} onSelectCiudadano={handleSeleccionCiudadano} />
          </div>

          <div className="col-span-full w-full grid gap-4 
                grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] 
                items-end">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="codigoServicio">Código de Servicio</Label>
              <Input id="codigoServicio" value={codigo} className="w-full" disabled />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="servicioPagado">Servicio Pagado</Label>
              <Input id="servicioPagado" value={servicio} className="w-full" disabled />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="valor">Valor</Label>
              <Input id="valor" value={valor} className="w-full" disabled />
            </div>

            {/* Botón alineado al borde derecho */}
            <div className="flex flex-col">
              <Label className="invisible">Buscar</Label>
              <div className="flex justify-end">
                <DialogSearchServices onSelectServicio={handleSeleccionServicio} />
              </div>
            </div>
          </div>



          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <DialogRefreshProfile onClear={handleClear} />
            <DialogAcceptReceiptRegistration onAccept={handleBuscar} loadingReceipt={loadingReceipt} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
