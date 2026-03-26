import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function DialogViewReceiptRegisterObservados({
  data,
  open,
  onClose,
  onLiberar, // ✅ opcional: función para liberar (si quieres)
}) {
  const [openConfirm, setOpenConfirm] = useState(false);

  if (!data) return null;

  const observacion = data?.observacion || data?.Observacion || "";

  const handleLiberarClick = () => {
    setOpenConfirm(true);
  };

  const handleConfirmLiberar = async () => {
    try {
      // ✅ aquí ejecutas tu lógica real
      if (onLiberar) {
        await onLiberar(data);
      }

      setOpenConfirm(false);
      onClose(); // ✅ cierra el dialog principal
    } catch (error) {
      console.error("Error liberando comprobante:", error);
      setOpenConfirm(false);
    }
  };

  return (
    <>
      {/* ✅ DIALOG PRINCIPAL */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-[900px] px-6 py-6 overflow-y-auto max-h-[90vh]">
          {/* HEADER */}
          <div className="text-center space-y-1">
            <DialogTitle className="text-xl font-bold uppercase">
              Comprobante de Pago
            </DialogTitle>
            <DialogDescription className="text-sm">
              Registro Civil – Consulta de Comprobantes
            </DialogDescription>
          </div>

          <Separator className="my-4" />

          {/* ✅ OBSERVACIÓN ELEGANTE */}
          {observacion?.trim() && (
            <>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-red-700 uppercase tracking-wide">
                      Observación
                    </p>

                    <p className="text-sm text-red-800 leading-relaxed whitespace-pre-line">
                      {observacion}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
            </>
          )}

          {/* INFO PRINCIPAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Identificación</p>
              <p className="font-semibold">{data.identificacionCiudadano}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Ciudadano</p>
              <p className="font-semibold">{data.nombreCiudadano}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Número de Comprobante</p>
              <p className="font-semibold">{data.numeroComprobante}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Fecha de Pago</p>
              <p className="font-semibold">{data.fechaPago}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Usuario Consulta</p>
              <p className="font-semibold">{data.usuarioConsulta}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Fecha de Consulta</p>
              <p className="font-semibold">{data.fechaRegistro}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Usuario Registro</p>
              <p className="font-semibold">{data.usuario}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Sistema Usado</p>
              <p className="font-semibold">{data.sistemaSincronizacion}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Fecha de Uso</p>
              <p className="font-semibold">{data.fechaSincronizacion}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Institución de Pago</p>
              <p className="font-semibold">{data.terminal}</p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* SERVICIO */}
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-muted-foreground">Servicio Pagado</p>
              <p className="font-semibold">{data.servicioPagado}</p>
            </div>

            <div className="flex justify-between items-center bg-muted p-4 rounded-md">
              <div>
                <p className="text-muted-foreground">Valor Pagado</p>
                <p className="text-lg font-bold">
                  ${Number(data.valor).toFixed(2)}
                </p>
              </div>

              <Badge
                variant={
                  data.estado === "PAGADO"
                    ? "success"
                    : data.estado === "ANULADO"
                    ? "destructive"
                    : "secondary"
                }
                className="text-sm px-4 py-1"
              >
                {data.estado}
              </Badge>
            </div>
          </div>

          <Separator className="my-4" />

          {/* ✅ FOOTER CON BOTÓN ROJO */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>

            <Button variant="destructive" onClick={handleLiberarClick}>
              Liberar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ CONFIRMACIÓN DE LIBERAR */}
      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Liberar comprobante?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción liberará el comprobante{" "}
              <b>{data.numeroComprobante}</b>. <br />
              ¿Estás seguro de continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>No, cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLiberar}>
              Sí, liberar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
