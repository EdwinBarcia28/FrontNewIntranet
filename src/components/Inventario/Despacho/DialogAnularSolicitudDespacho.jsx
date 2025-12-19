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
import { Textarea } from "@/components/ui/textarea"; // 👈 Importamos Textarea
import { Trash2, Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

export const DialogAnularSolicitudDespacho = ({
  handleClickAnularSolicitudDespacho,
}) => {
  const { isMobile } = useSidebar();
  const [observacion, setObservacion] = useState(""); // 👈 Estado local

  const handleAceptar = () => {
    // Envías la observación al método padre
    handleClickAnularSolicitudDespacho(observacion);
    setObservacion(""); // Limpia el campo después de enviar
  };

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
            <Trash2 size={18} />
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro que desea anular esta solicitud de despacho?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La información de esta solicitu sera anulada . Una vez eliminada no podrá usarse y el operador debera , ingresar una nueva solicitud si lo requiere.  
            <br />
            <span className="text-red-500 font-medium">
              Por favor indique el motivo de anulación:
            </span>
          </AlertDialogDescription>

          {/* 📝 Campo de observación */}
          <div className="mt-3">
            <Textarea
              placeholder="Escriba aquí la razón de la anulación..."
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              className="w-full min-h-[80px] resize-none text-sm"
            />
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={!observacion.trim()} // 🔒 Evita aceptar sin observación
            onClick={handleAceptar}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogAnularSolicitudDespacho.propTypes = {
  handleClickAnularSolicitudDespacho: PropTypes.func,
};
