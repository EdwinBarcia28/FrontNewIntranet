import { AlertDialogHeader } from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { EditFormReceipt } from "./EditFormReceipt";


export function DialodEditRecepit({data , open , onClose , onRefresh }) {

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full sm:max-w-[1200px] px-4 py-6 overflow-y-auto max-h-[90vh] sm:max-h-[100vh]">
        <AlertDialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
            Editar Tramite
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center sm:text-left">
            Aqui se podra realizar el cambio de beneficiario del tramite pagado. 
          </DialogDescription>
        </AlertDialogHeader>
        <div className="w-full text-center font-semibold text-base sm:text-lg my-4">
            Nª Comprobante: {data?.numeroComprobante}
        </div>
        <EditFormReceipt receipt={data} onClose={onClose} onRefresh={onRefresh} /> 
      </DialogContent>
    </Dialog>
  );
}