
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



export function DialogViewReceipt({ data, open, onClose }) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          <div>
            <p className="text-muted-foreground">Identificación</p>
            <p className="font-semibold">{data.identificacion}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Ciudadano</p>
            <p className="font-semibold">{data.ciudadano}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Número de Comprobante</p>
            <p className="font-semibold">{data.numeroComprobante}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Fecha de Pago</p>
            <p className="font-semibold">{data.fechaComprobante}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Institucion de Pago</p>
            <p className="font-semibold">{data.terminal}</p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* SERVICIO */}
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-muted-foreground">Servicio Pagado</p>
            <p className="font-semibold">{data.servicio}</p>
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
