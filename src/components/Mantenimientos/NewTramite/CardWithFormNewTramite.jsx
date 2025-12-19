import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { DialogRefreshProfile } from "./DialogRefreshProfile";
import { DialogAcceptReceiptRegistration } from "./DialogAcceptReceiptRegistration";



export const CardWithFormNewTramite = () => {
   const [descripcionTramite, setDescripcionTramite] = useState("");
   const [tramite, setTramite] = useState("");


   const handleDescripcionTramiteChange = (event) => {
    setDescripcionTramite(event.target.value);
   };

  const handleTramiteChange = (event) => {
    setTramite(event.target.value);
  };

  const handleLimpiar = () => {
    setDescripcionTramite("");
    setTramite("");
  };

//   const handleRegister = async (event) => {
//     event.preventDefault();
  
//     const requestTramite = {
//         Secuencial: secuencial,
//         NumeroDocumento: identidad || "",
//         Ciudadano: ciudadano || "",
//         IdServicio: Number(idServicio) || 0,
//         Codigo: codigo || "",
//         Servicio: servicio || "",
//         Valor: Number(valor) || 0.0,
//         Oficina: selectEstablishments || "",
//         Usuario: dataUser ? dataUser.nombreUsuario : "Desconocido",
//     };
  
//       setLoadingReceipt(true);
  
//     try {
//         const responseReceipt = await registerComprobanteBolivariano(requestComprobante, token);
//         if (responseReceipt === null || responseReceipt === undefined) {
//             return toast.error(
//                 "Comunicacion con el Servidor , se dio de forma interrumpida",
//                 {
//                     position: "top-right",
//                     autoClose: 4000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "dark",
//                 }
//               );
//         }else if (responseReceipt !== null || responseReceipt !== undefined) {
//             if (responseReceipt.error === 1) {
//                 setLoadingReceipt(false);
//                 return toast.error(responseReceipt.mensaje, {
//                       position: "top-right",
//                       autoClose: 4000,
//                       hideProgressBar: false,
//                       closeOnClick: true,
//                       pauseOnHover: true,
//                       draggable: true,
//                       progress: undefined,
//                       theme: "dark",
//                 });
//             }else if (responseReceipt.error === 0) {
//                 setLoadingReceipt(false);
//                 handleClear();
//                 return toast.success(responseReceipt.mensaje, {
//                       position: "top-right",
//                       autoClose: 4000,
//                       hideProgressBar: false,
//                       closeOnClick: true,
//                       pauseOnHover: true,
//                       draggable: true,
//                       progress: undefined,
//                       theme: "dark",
//                     });
//                 }
//               }
//     } catch (error) {
//        console.error("Error al registrar comprobante:", error);
//     }
//   }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Creacion de Tramite</CardTitle>
        <CardDescription>
          En esta opción se puede crear, editar y anular los diversos tipos de tramites.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 md:grid-cols-2 items-start">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tramite">Tramite</Label>
            <Input
              type="text"
              id="tramite"
              placeholder="Nombre del tramite"
              value={tramite ?? ""}
              onChange={handleTramiteChange}
              className="h-[44px]"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="descripcionCombo">Descripción de Tramite</Label>
            <Textarea
              id="descripcionTramite"
              placeholder="Ingrese descripción de tramite"
              value={descripcionTramite}
              onChange={handleDescripcionTramiteChange}
              className="h-[44px] resize-none"
            />
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <DialogRefreshProfile onClear={handleLimpiar} />
            <DialogAcceptReceiptRegistration  />
        </div>
      </CardContent>
    </Card>
  );
};

