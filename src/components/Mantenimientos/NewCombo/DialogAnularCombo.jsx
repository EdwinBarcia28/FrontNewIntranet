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
import { Save, Trash, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

export const DialogAnularCombo = ({
  handleClickAnularCombo,
}) => {
  const { isMobile } = useSidebar();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
            variant="ghost" 
            className="text-red-600 hover:text-red-800"
            title="Anular"
        >
          {isMobile ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Trash />
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Trash2 size={18} />
            </>
          )}
          {/* <Save /> Guardar Conductor */}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Esta seguro que desea anular la informacion de este Combo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La informacion del combo sera eliminada, una vez sea eliminado no podra usarse nuevamente y debe crear uno desde cero, cualquier duda con alguna
            campo informarlo a soporte
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
              handleClickAnularCombo();
            }}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogAnularCombo.propTypes = {
  handleClickAnularCombo: PropTypes.func,
};