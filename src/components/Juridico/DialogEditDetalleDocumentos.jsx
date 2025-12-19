import { AlertDialogHeader } from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { DataTableDetalleDocumentos } from "./DataTableDetalleDocumentos";


export function DialogEditDetalleDocumentos({ data, open, onClose, setShowVisor, setVisorDoc , onRefresh }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full sm:max-w-[1200px] px-4 py-6 overflow-y-auto max-h-[90vh] sm:max-h-[100vh]">
        <AlertDialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
            Edición de Documentos
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center sm:text-left">
            Aquí se podrá editar la información de los documentos guardados por el área jurídica
          </DialogDescription>
        </AlertDialogHeader>

        <DataTableDetalleDocumentos
          comprobante={data}
          onClose={onClose}
          setShowVisor={setShowVisor}
          setVisorDoc={setVisorDoc}
          onRefresh={onRefresh}
        />
      </DialogContent>
    </Dialog>
  );
}