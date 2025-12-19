import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
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
import { RefreshCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";

export const DialogRefreshProfile = ({ onClear }) => {
  const { isMobile } = useSidebar();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          {isMobile ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <RefreshCw />
                </TooltipTrigger>
                <TooltipContent>Limpiar Informacion</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <RefreshCw /> Limpiar Informacion 
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Esta seguro que desea limpiar la informacion del Comprobante que se esta registrando?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La informacion registrada se borrara y debera empezar de nuevo
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onClear}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogRefreshProfile.propTypes = {
};
