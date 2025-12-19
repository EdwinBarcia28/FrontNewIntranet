
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";

export const DialogSearchAddServices = ({ handleAgregar , disabled }) => {
  const { isMobile } = useSidebar();

  return (
    <Button  onClick={handleAgregar} disabled={disabled}>
      {isMobile ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Save />
            </TooltipTrigger>
            <TooltipContent>Guardar </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <>
          <Save  /> Guardar
        </>
      )}
    </Button>
  );
};
