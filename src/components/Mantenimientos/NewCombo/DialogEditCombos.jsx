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

export const DialogEditCombos = ({
  handleClickAcceptReceiptRegistration,
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
                <TooltipContent>Guardar Edicion</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Save /> Guardar Edicion
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Esta seguro que desea editar la informacion de este Combo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La informacion del combo sera editada, una vez sea usada en alguna transaccion no podra editarse, cualquier duda con alguna
            campo informarlo a soporte
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
              handleClickAcceptReceiptRegistration();
            }}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogEditCombos.propTypes = {
  handleClickAcceptReceiptRegistration: PropTypes.func,
};
