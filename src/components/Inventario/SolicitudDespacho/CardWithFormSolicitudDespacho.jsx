import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { DialogAcceptSolicitudRegistration } from "./DialogAcceptSolicitudRegistration";
import { Textarea } from "../../ui/textarea";
import { toast } from "react-toastify";
import { registerSolicitudDespachoRequest } from "@/services/inventario";
import { useAuthStore } from "@/store/auth";
import { DialogSearchOficinaPedido } from "./DialogSearchOficinaPedido";
import { DialogRefreshSolicitud } from "./DialogRefreshSolicitud";


export const CardWithFormSolicitudDespacho = () => {
  const { dataUser, token } = useAuthStore();

  const [IdOficinaPedido, setIdOficinaPedido] = useState("");
  const [oficinaPedido, setOficinaPedido] = useState("");
  const [stockPedido, setStockPedido] = useState("");
  const [motivo, setMotivo] = useState("");
  const [cantidadPedida, setCantidadPedida] = useState(null);



  const handleSeleccionOficinaPedido = (office) => {
    setIdOficinaPedido(office.id);
    setOficinaPedido(office.oficina);
    setStockPedido(office.stock);
  };

  const handleCantidadPedidaChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setCantidadPedida(value);
    }
  };


  const handleClear = async () => {
    setIdOficinaPedido("");
    setOficinaPedido("");
    setStockPedido("");
    setCantidadPedida("");
    setMotivo("");

  };

  const handleDescripcionMotivoChange = (e) => {
    setMotivo(e.target.value);
  }


  const handleRegistrar = async () => {
    if (IdOficinaPedido === null || IdOficinaPedido === undefined || IdOficinaPedido === "") {
      return toast.error(
        "Debe seleccionar una oficina de Pedido de stock",
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


    if (cantidadPedida === null || cantidadPedida === undefined || cantidadPedida === 0) {
      return toast.error(
        "Pase por el lector el secuencial desde el cual se va a realizar el despacho",
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

    if (motivo === null || motivo === undefined || motivo === "") {
      return toast.error(
        "Debe ingresar una descripcion del despacho que se va a realizar",
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


    const requestDespacho = {
      IdOficinaPedido: IdOficinaPedido,
      OficinaPedido: oficinaPedido,
      CantidadPedida: cantidadPedida,
      Motivo: motivo,
      UsuarioRegistro: dataUser ? dataUser.nombreUsuario : "Desconocido",
      Correo: dataUser ? dataUser.email : "Desconocido",
    };

    try {
      const responseDespacho = await registerSolicitudDespachoRequest(requestDespacho, token);
      if (responseDespacho === null || responseDespacho === undefined) {
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
      } else if (responseDespacho !== null || responseDespacho !== undefined) {
        if (responseDespacho.error === 1) {
          return toast.error(responseDespacho.mensaje, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (responseDespacho.error === 0) {
          //setLoadingDespacho(false);
          await handleClear();
          return toast.success(responseDespacho.mensaje, {
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
        <CardTitle>Solicitud de despacho de Inventario</CardTitle>
        <CardDescription>
          En esta opción se puede solicitar nuevo stock de cedulas al area de bodega de cedula de la corporacion registro civil.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end mb-4">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="oficinaPedido">Oficina de Pedido de inventario</Label>
            <Input
              id="oficinaPedido"
              placeholder="Ingrese número de documento"
              value={oficinaPedido}
              disabled />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="stockPedido">Stock de oficina de pedido de inventario</Label>
            <Input
              id="stockPedido"
              placeholder="Ingrese nombre del ciudadano"
              value={stockPedido}
              disabled />
          </div>

          <div className="flex items-end">
            <DialogSearchOficinaPedido onSelectOficina={handleSeleccionOficinaPedido} />
          </div>

        </div>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end mb-4">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="cantidadPedida">Cantidad Pedida</Label>
            <Input
              type="number"
              placeholder="00"
              value={cantidadPedida ?? ""}
              onChange={handleCantidadPedidaChange}
              onKeyDown={(e) => {
                if (
                  e.key === "Backspace" ||
                  e.key === "Tab" ||
                  e.key === "ArrowLeft" ||
                  e.key === "ArrowRight"
                ) return;

                if (!/^[0-9]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />


          </div>


          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="descripcionMotivo">Descripción de Motivo</Label>
            <Textarea
              id="descripcionMotivo"
              placeholder="Ingrese descripción de motivo"
              value={motivo}
              onChange={handleDescripcionMotivoChange}
              className="h-[44px] resize-none"
            />
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <DialogRefreshSolicitud onClear={handleClear} />
            <DialogAcceptSolicitudRegistration onAccept={handleRegistrar} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
