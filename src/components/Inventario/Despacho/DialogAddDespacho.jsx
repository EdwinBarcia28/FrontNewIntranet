import { AlertDialogHeader } from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { DataTableAddDespacho } from "./DataTableAddDespacho";


export function DialogAddDespacho({data , open , onClose }) {

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full sm:max-w-[1200px] px-4 py-6 overflow-y-auto max-h-[90vh] sm:max-h-[100vh]">
        <AlertDialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
            Agregar Despachos
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center sm:text-left">
            Aqui se podra agregar despachos ligados a una solicitud hecha por los operadores en la oficina. 
          </DialogDescription>
        </AlertDialogHeader>
        <div className="w-full text-center font-semibold text-base sm:text-lg my-4">
            Nª Solicitud: {data?.id}
        </div>
        <DataTableAddDespacho solicitud={data} onClose={onClose} /> 
      </DialogContent>
    </Dialog>
  );
}