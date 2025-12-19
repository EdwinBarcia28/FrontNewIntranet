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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash, Trash2, Truck } from "lucide-react";
import PropTypes from "prop-types";

export const DialogEnviarDespacho = ({
  handleClickEnviarDespacho,
}) => {
  const { isMobile } = useSidebar();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
            variant="ghost" 
            className="text-green-600 hover:text-green-800"
            title="Enviar"
        >
          {isMobile ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Truck />
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Truck size={18} />
            </>
          )}
          {/* <Save /> Guardar Conductor */}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Esta seguro que desea enviar la distribucion de tarjetas de este despacho ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La informacion del despacho sera enviada para su uso, una vez sea enviada no podra reversarse el inventario debido, cualquier duda con alguna
            campo informarlo a soporte
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
              handleClickEnviarDespacho();
            }}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogEnviarDespacho.propTypes = {
  handleClickEnviarDespacho: PropTypes.func,
};