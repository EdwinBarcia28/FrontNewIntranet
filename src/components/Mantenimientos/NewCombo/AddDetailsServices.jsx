
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";

export const AddDetailsServices = ({ onOpen }) => {
  const { isMobile } = useSidebar();

  return (
    <Button onClick={onOpen}>
      {isMobile ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Plus />
            </TooltipTrigger>
            <TooltipContent>Añadir Detalles</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <>
          <Plus /> Añadir Detalles
        </>
      )}
    </Button>
  );
};


