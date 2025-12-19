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
import { CheckCircle} from "lucide-react";
import PropTypes from "prop-types";

export const DialogAprobarSolicitudDespacho = ({
  handleClickAprobarSolicitudDespacho,
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
                  <CheckCircle />
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <CheckCircle size={18} />
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Esta seguro que desea aprobar el despacho de la cantidad de tarjetas Solicitu hechas por el operador?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La informacion de la solicitud de despacho sera aprobada y se hablitara la pestaña para envio de inventario, una vez sea aprobada esta solicitud
             no podra reversarse el inventario , cualquier duda con alguna campo informarlo a soporte
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
              handleClickAprobarSolicitudDespacho();
            }}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogAprobarSolicitudDespacho.propTypes = {
  handleClickAprobarSolicitudDespacho: PropTypes.func,
};