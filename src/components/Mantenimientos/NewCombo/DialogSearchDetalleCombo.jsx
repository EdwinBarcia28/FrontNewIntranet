import {  Loader, Search } from "lucide-react";
import { AlertDialogHeader } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
//import { useAuthStore } from "@/store/auth";
//import { useState } from "react";
import { DataTableDetalleCombo } from "./DataTableDetalleCombo";


export function DialogSearchDetalleCombo({data , open , onClose}) {
  //onst { token } = useAuthStore();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full sm:max-w-[1200px] px-4 py-6 overflow-y-auto max-h-[90vh] sm:max-h-[100vh]">
        <AlertDialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
            Detalle de Servicios
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center sm:text-left">
            Aqui se detallan los servicios relacionados con el combo seleccionado.
          </DialogDescription>
        </AlertDialogHeader>
        <DataTableDetalleCombo combo={data} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}