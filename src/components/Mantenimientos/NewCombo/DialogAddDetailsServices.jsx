import { AlertDialogHeader } from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTableServicesEdicion } from "./DataTableServicesEdicion";
//import { useAuthStore } from "@/store/auth";
//import { useState } from "react";
//import { DataTableDetalleCombo } from "./DataTableDetalleCombo";


export function DialogAddDetailsServices({ open , onClose , onAddRows}) {

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full sm:max-w-[1200px] px-4 py-6 overflow-y-auto max-h-[90vh] sm:max-h-[100vh]">
        <AlertDialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
            Consulta de Servicios
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center sm:text-left">
            Seleccione los servicios adicionales que desee agregar a su combo. 
          </DialogDescription>
        </AlertDialogHeader>
        <DataTableServicesEdicion onAddRows={onAddRows} onClose={onClose} />
        {/* <DataTableEdicionCombo combo={data} onClose={onClose} />  */}
      </DialogContent>
    </Dialog>
  );
}