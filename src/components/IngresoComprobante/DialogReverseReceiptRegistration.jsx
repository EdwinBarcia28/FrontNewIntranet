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
import { Loader,  Trash } from "lucide-react";
import PropTypes from "prop-types";

export const DialogReverseReceiptRegistration = ({ handleClickReverseReceiptRegistration , loadingReverseReceipt }) => {
  const { isMobile } = useSidebar();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {loadingReverseReceipt ? (
            <Button  disabled={loadingReverseReceipt}>
            {isMobile ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Loader className="animate-spin" />
                  </TooltipTrigger>
                  <TooltipContent>Reversar Comprobante</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <>
                <Loader className="animate-spin" /> Reversar Comprobante
              </>
            )}
          </Button>
        ) : (
          <Button  disabled={loadingReverseReceipt}>
          {isMobile ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Trash />
                </TooltipTrigger>
                <TooltipContent>Reversar Comprobante</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Trash /> Reversar Comprobante
            </>
          )}
        </Button>
      )}
        
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Esta seguro que desea agregar la informacion de este Comprobante?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La informacion del comprobante sera guardada, cualquier duda con algun
            campo informarlo a soporte
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClickReverseReceiptRegistration} >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogReverseReceiptRegistration.propTypes = {
  handleClickAcceptReceiptRegistration: PropTypes.func,
};
