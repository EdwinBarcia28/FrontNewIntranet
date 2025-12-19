import {  Loader, Search } from "lucide-react";
import { AlertDialogHeader } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { DataTableAddDocumentsJuridico } from "./DataTableAddDocumentsJuridico";


export function DialogAddDocumentsJuridico({data , open , onClose }) {

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full sm:max-w-[1200px] px-4 py-6 overflow-y-auto max-h-[90vh] sm:max-h-[100vh]">
        <AlertDialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
            Agregar Documentos
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center sm:text-left">
            Aqui se podra agregar documentos a numeros de trámite ya registrados. 
          </DialogDescription>
        </AlertDialogHeader>
        <DataTableAddDocumentsJuridico comprobante={data} onClose={onClose} /> 
      </DialogContent>
    </Dialog>
  );
}