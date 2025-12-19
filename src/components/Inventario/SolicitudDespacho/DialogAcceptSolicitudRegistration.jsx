import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Save } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

export const DialogAcceptSolicitudRegistration = ({ onAccept  }) => {
  const { isMobile } = useSidebar();
  const [open, setOpen] = useState(false);

  const handleClickAccept = async () => {
    await onAccept();   
    setOpen(false);    
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
      <Button>
          {isMobile ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Save />
                </TooltipTrigger>
                <TooltipContent>Guardar Solicitud de Despacho</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Save /> Guardar Solicitud de Despacho
            </>
          )}
      </Button>
        
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Esta seguro que desea  registrar la información de la solicitud de despacho , verificar que todo este bien ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            El registro de la solicitud de despacho no se podra deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClickAccept}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogAcceptSolicitudRegistration.propTypes = {
  onAccept: PropTypes.func,
};
