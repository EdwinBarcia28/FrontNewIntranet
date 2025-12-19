
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



export function DialogViewReceiptRegister({ data, open, onClose }) {
  if (!data) return null;

  return (
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
            <p className="text-muted-foreground">Usuario Registro</p>
            <p className="font-semibold">{data.usuario}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Fecha de Consulta</p>
            <p className="font-semibold">{data.fechaRegistro}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Sistema Usado</p>
            <p className="font-semibold">{data.sistemaSincronizacion}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Fecha de Uso</p>
            <p className="font-semibold">{data.fechaSincronizacion}</p>
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

        {/* FOOTER */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>

          {/* FUTURO */}
          {/* <Button>
            Imprimir
          </Button> */}
        </div>

      </DialogContent>
    </Dialog>
  );
}
