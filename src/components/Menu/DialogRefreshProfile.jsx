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
import { useSidebar } from "../ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const DialogRefreshProfile = ({ handleClickRefreshProfile }) => {
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
                <TooltipContent>Refrescar Perfil</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <RefreshCw /> Refresca Informacion Perfil
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Esta seguro que desea refrescar la informacion del Perfil?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La informacion del perfil se refrescara con la informacion
            disponible en la Base de Datos, cualquier duda con algun campo
            informarlo a soporte.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClickRefreshProfile}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogRefreshProfile.propTypes = {
  handleClickRefreshProfile: PropTypes.func,
};
