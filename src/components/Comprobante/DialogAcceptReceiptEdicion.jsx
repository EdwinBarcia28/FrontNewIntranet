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

export const DialogAcceptReceiptEdicion = ({
  onAccept,
}) => {
  const { isMobile } = useSidebar();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          {isMobile ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Save />
                </TooltipTrigger>
                <TooltipContent>Editar Comprobante</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Save /> Editar Comprobante
            </>
          )}
          {/* <Save /> Guardar Conductor */}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Esta seguro que desea cambiar la informacion del beneficiario de este Comprobante?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La informacion del comprobante sera editada, cualquier duda con algun
            campo informarlo a soporte
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
              onAccept();
            }}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogAcceptReceiptEdicion.propTypes = {
  onAccept: PropTypes.func,
};
