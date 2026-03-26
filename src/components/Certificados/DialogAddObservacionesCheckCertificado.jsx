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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea"; // 👈 Importamos Textarea
import { Trash2, Trash, Check } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

export const DialogAddObservacionesCheckCertificado = ({
  handleClickObservacionesCertificado, tipoCertificado
}) => {
  const { isMobile } = useSidebar();
  const [observacion, setObservacion] = useState(""); // 👈 Estado local
  const [parentesco, setParentesco] = useState("PADRE");

  const handleAceptar = () => {
    // Envías la observación al método padre
    handleClickObservacionesCertificado(observacion, parentesco);
    setObservacion(""); // Limpia el campo después de enviar
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-800 ml-4"
          title="Aprobar"
        >
          {isMobile ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Check />
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Check size={18} />
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="px-6 py-5">
        <AlertDialogHeader className="space-y-5">

          {tipoCertificado === "NACIMIENTO" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Escoja el parentesco
              </Label>

              <Select
                value={parentesco}
                onValueChange={(value) => setParentesco(value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccione parentesco" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="PADRE">Padre</SelectItem>
                  <SelectItem value="MADRE">Madre</SelectItem>
                  {/* <SelectItem value="ABUELO">Abuelo</SelectItem>
                  <SelectItem value="ABUELA">Abuela</SelectItem>
                  <SelectItem value="TIO">Tío</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <AlertDialogTitle>
              ¿Está seguro que desea agregar una observación?
            </AlertDialogTitle>

            <AlertDialogDescription>
              <span className="text-red-500 font-medium">
                Por favor indique el motivo de la observación:
              </span>
            </AlertDialogDescription>
          </div>

          {/* 📝 Campo de observación */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Observación
            </Label>

            <Textarea
              placeholder="Escriba aquí la razón de la observación..."
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              className="w-full min-h-[100px] resize-none text-sm mt-1"
            />
          </div>

        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            disabled={!observacion.trim()}
            onClick={handleAceptar}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DialogAddObservacionesCheckCertificado.propTypes = {
  handleClickObservacionesCertificado: PropTypes.func,
};
